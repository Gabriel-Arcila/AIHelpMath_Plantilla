/**
 * md-to-notion.js — Markdown to Notion Block JSON Converter
 *
 * Converts a Markdown (.md) file into Notion API-compatible block JSON,
 * split into chunks of ≤25 blocks each (Notion API limit).
 *
 * Usage:
 *   node md-to-notion.js <input.md> <output-directory>
 *
 * Output:
 *   <output-directory>/chunk_0.json
 *   <output-directory>/chunk_1.json
 *   ...
 *
 * Supported Markdown elements:
 *   - Headings (#, ##, ###, ####+)
 *   - Paragraphs
 *   - Bold (**text**), Italic (*text*), Inline code (`text`)
 *   - Strikethrough (~~text~~)
 *   - Links [text](url)
 *   - Bulleted lists (- item, * item)
 *   - Numbered lists (1. item)
 *   - Task lists (- [x] done, - [ ] todo)
 *   - Code blocks (```lang ... ```)
 *   - Blockquotes (> text)
 *   - GitHub-style alerts (> [!NOTE], > [!WARNING], etc.)
 *   - Horizontal rules (---)
 *   - Tables (| col | col |)
 *
 * Limitations:
 *   - No nested list support (items are flattened)
 *   - No image support (local images can't be uploaded via API)
 *   - No HTML tag parsing
 *   - No footnotes or anchor links
 */

const fs = require('fs');
const path = require('path');

// ── CLI Arguments ──────────────────────────────────────────────
const inputFile = process.argv[2];
const outputDir = process.argv[3];

if (!inputFile || !outputDir) {
    console.error('Usage: node md-to-notion.js <input.md> <output-directory>');
    process.exit(1);
}

if (!fs.existsSync(inputFile)) {
    console.error(`Error: Input file not found: ${inputFile}`);
    process.exit(1);
}

// ── Constants ──────────────────────────────────────────────────
const MAX_RICH_TEXT_LENGTH = 2000;
const CHUNK_SIZE = 25;

// ── Rich Text Parser ───────────────────────────────────────────
/**
 * Parses inline Markdown formatting into Notion rich_text objects.
 * Supports: **bold**, *italic*, `code`, ~~strikethrough~~, [link](url)
 */
function parseRichText(text) {
    const parts = [];
    // Order matters: bold before italic, strikethrough, links, code
    const regex = /(\*\*[^*]+\*\*|~~[^~]+~~|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Push plain text before this match
        if (match.index > lastIndex) {
            pushTextSegments(parts, text.substring(lastIndex, match.index));
        }

        const token = match[0];

        if (token.startsWith('**')) {
            // Bold
            pushTextSegments(parts, token.slice(2, -2), { bold: true });
        } else if (token.startsWith('~~')) {
            // Strikethrough
            pushTextSegments(parts, token.slice(2, -2), { strikethrough: true });
        } else if (token.startsWith('`')) {
            // Inline code
            pushTextSegments(parts, token.slice(1, -1), { code: true });
        } else if (token.startsWith('[')) {
            // Link: [text](url)
            const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
                parts.push({
                    type: 'text',
                    text: { content: linkMatch[1], link: { url: linkMatch[2] } }
                });
            } else {
                pushTextSegments(parts, token);
            }
        } else if (token.startsWith('*')) {
            // Italic
            pushTextSegments(parts, token.slice(1, -1), { italic: true });
        }

        lastIndex = regex.lastIndex;
    }

    // Push remaining plain text
    if (lastIndex < text.length) {
        pushTextSegments(parts, text.substring(lastIndex));
    }

    return parts.length > 0
        ? parts
        : [{ type: 'text', text: { content: text } }];
}

/**
 * Splits text into ≤2000 character segments and pushes as rich_text objects.
 * Notion limits each rich_text content to 2000 characters.
 */
function pushTextSegments(parts, content, annotations) {
    for (let i = 0; i < content.length; i += MAX_RICH_TEXT_LENGTH) {
        const segment = content.substring(i, i + MAX_RICH_TEXT_LENGTH);
        const obj = { type: 'text', text: { content: segment } };
        if (annotations) {
            obj.annotations = annotations;
        }
        parts.push(obj);
    }
}

// ── GitHub Alert → Emoji Map ───────────────────────────────────
const ALERT_EMOJI_MAP = {
    'NOTE': 'ℹ️',
    'TIP': '💡',
    'IMPORTANT': '❗',
    'WARNING': '⚠️',
    'CAUTION': '🔴',
};

// ── Main Parser ────────────────────────────────────────────────
const lines = fs.readFileSync(inputFile, 'utf-8').split('\n');
const blocks = [];
let i = 0;

while (i < lines.length) {
    const line = lines[i].trimEnd();    // preserve leading spaces for indentation detection
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) { i++; continue; }

    // ── Horizontal Rule ────────────────────────────────────────
    if (/^-{3,}$/.test(trimmed) || /^\*{3,}$/.test(trimmed) || /^_{3,}$/.test(trimmed)) {
        blocks.push({ type: 'divider', divider: {} });
        i++;
        continue;
    }

    // ── Headings ───────────────────────────────────────────────
    if (/^#{1,6}\s/.test(trimmed)) {
        let level = trimmed.match(/^#+/)[0].length;
        const text = trimmed.replace(/^#+\s*/, '').trim();
        if (level > 3) level = 3; // Notion only supports h1-h3
        blocks.push({
            type: `heading_${level}`,
            [`heading_${level}`]: { rich_text: parseRichText(text) }
        });
        i++;
        continue;
    }

    // ── Code Blocks ────────────────────────────────────────────
    if (trimmed.startsWith('```')) {
        let lang = trimmed.slice(3).trim() || 'plain text';
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
            codeLines.push(lines[i]);
            i++;
        }
        i++; // skip closing ```

        // Notion doesn't support "mermaid" as a language
        if (lang === 'mermaid') lang = 'plain text';

        const codeContent = codeLines.join('\n');

        // Split long code blocks into ≤2000 char segments
        const richText = [];
        for (let c = 0; c < codeContent.length; c += MAX_RICH_TEXT_LENGTH) {
            richText.push({
                type: 'text',
                text: { content: codeContent.substring(c, c + MAX_RICH_TEXT_LENGTH) }
            });
        }
        if (richText.length === 0) {
            richText.push({ type: 'text', text: { content: '' } });
        }

        blocks.push({
            type: 'code',
            code: { rich_text: richText, language: lang }
        });
        continue;
    }

    // ── GitHub-style Alerts (> [!TYPE]) ─────────────────────────
    if (trimmed.startsWith('> [!')) {
        const alertMatch = trimmed.match(/> \[!([A-Z]+)\]/);
        const alertType = alertMatch ? alertMatch[1] : 'NOTE';
        const emoji = ALERT_EMOJI_MAP[alertType] || 'ℹ️';

        const calloutLines = [];
        i++;
        while (i < lines.length && lines[i].trim().startsWith('>')) {
            const cl = lines[i].trim().replace(/^>\s*/, '');
            if (cl !== '') calloutLines.push(cl);
            i++;
        }
        blocks.push({
            type: 'callout',
            callout: {
                rich_text: parseRichText(calloutLines.join('\n')),
                icon: { type: 'emoji', emoji }
            }
        });
        continue;
    }

    // ── Blockquotes ────────────────────────────────────────────
    if (trimmed.startsWith('>')) {
        const quoteLines = [];
        while (i < lines.length && lines[i].trim().startsWith('>')) {
            quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
            i++;
        }
        blocks.push({
            type: 'quote',
            quote: { rich_text: parseRichText(quoteLines.join('\n')) }
        });
        continue;
    }

    // ── Task Lists (- [x] / - [ ]) ────────────────────────────
    if (/^[-*]\s\[[ xX]\]\s/.test(trimmed)) {
        const checked = /\[[xX]\]/.test(trimmed);
        const text = trimmed.replace(/^[-*]\s\[.\]\s*/, '');
        blocks.push({
            type: 'to_do',
            to_do: { rich_text: parseRichText(text), checked }
        });
        i++;
        continue;
    }

    // ── Bulleted Lists ─────────────────────────────────────────
    if (/^[-*]\s/.test(trimmed)) {
        const text = trimmed.replace(/^[-*]\s/, '');
        blocks.push({
            type: 'bulleted_list_item',
            bulleted_list_item: { rich_text: parseRichText(text) }
        });
        i++;
        continue;
    }

    // ── Numbered Lists ─────────────────────────────────────────
    if (/^\d+\.\s/.test(trimmed)) {
        const text = trimmed.replace(/^\d+\.\s/, '');
        blocks.push({
            type: 'numbered_list_item',
            numbered_list_item: { rich_text: parseRichText(text) }
        });
        i++;
        continue;
    }

    // ── Tables ─────────────────────────────────────────────────
    if (trimmed.startsWith('|')) {
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
            const rowLine = lines[i].trim();
            // Skip separator rows (|---|---|)
            if (/^\|[\s\-:|]+\|$/.test(rowLine)) { i++; continue; }
            const cells = rowLine.split('|').slice(1, -1).map(c => c.trim());
            const notionCells = cells.map(c => parseRichText(c));
            rows.push({
                type: 'table_row',
                table_row: { cells: notionCells }
            });
            i++;
        }
        if (rows.length > 0) {
            blocks.push({
                type: 'table',
                table: {
                    table_width: rows[0].table_row.cells.length,
                    has_column_header: true,
                    has_row_header: false,
                    children: rows
                }
            });
        }
        continue;
    }

    // ── Default: Paragraph ─────────────────────────────────────
    blocks.push({
        type: 'paragraph',
        paragraph: { rich_text: parseRichText(trimmed) }
    });
    i++;
}

// ── Chunking (≤25 blocks per file) ────────────────────────────
const chunks = [];
for (let j = 0; j < blocks.length; j += CHUNK_SIZE) {
    chunks.push(blocks.slice(j, j + CHUNK_SIZE));
}

// ── Write Output (cross-platform paths) ────────────────────────
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

chunks.forEach((chunk, idx) => {
    const filePath = path.join(outputDir, `chunk_${idx}.json`);
    fs.writeFileSync(filePath, JSON.stringify(chunk, null, 2));
});

console.log(`✅ Done — ${blocks.length} blocks → ${chunks.length} chunk(s) written to ${outputDir}`);
