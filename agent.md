# 🤖 Perfil y Directrices Generales del Agente

Este archivo (`agent.md`) funciona como el documento de orientación principal para los agentes de IA en este espacio de trabajo. Según las mejores prácticas, su propósito es definir el contexto del proyecto y listar las capacidades extendidas (skills) disponibles. Proporciona al agente una visión clara de las herramientas especializadas a su disposición, explicando cuándo usarlas y dónde encontrar sus instrucciones detalladas.

---

## 🛠️ Skills Disponibles

| Skill | Propósito | Cuándo usarlo | Ubicación |
|---|---|---|---|
| **`notion-md-to-page`** | Convertir archivos Markdown a páginas de Notion (vía MCP). Maneja el parseo y la segmentación (chunking). | Para exportar documentación, subir notas o migrar archivos `.md` a Notion. | [.agents/skills/notion-md-to-page/SKILL.md](./.agents/skills/notion-md-to-page/SKILL.md) |
| **`ui-ux-designer`** | Diseñar interfaces, wireframes y sistemas de diseño, aplicando accesibilidad (WCAG) y estética premium. | Para crear/mejorar interfaces (UI/UX), definir paletas, animaciones o estructurar componentes web. | [.agents/skills/ui-ux-designer/SKILL.md](./.agents/skills/ui-ux-designer/SKILL.md) |

> [!TIP]
> **Instrucción para el Agente:** Antes de utilizar un skill, usa la herramienta de lectura de archivos para revisar su `SKILL.md` y seguir sus instrucciones al pie de la letra.

---

## 🔌 Servidores MCP Disponibles

| Servidor MCP | Propósito | Cuándo usarlo | Integración |
|---|---|---|---|
| **`notion-mcp-server`** | Integración directa con la API de Notion. Permite recuperar usuarios, leer/escribir bloques, páginas, bases de datos y realizar búsquedas de forma nativa. | Para realizar operaciones directas sobre el espacio de trabajo de Notion sin necesidad de crear scripts manuales. | `~/.gemini/antigravity/mcp/notion-mcp-server` |

---

## 🎯 Contexto y Marca del Proyecto: MathIA

**MathIA** es una plataforma web educativa impulsada por inteligencia artificial diseñada para ayudar a estudiantes a comprender, practicar y dominar las ciencias matemáticas (álgebra, cálculo, geometría) de forma personalizada e interactiva. El objetivo es reemplazar las frustrantes explicaciones estáticas y videos largos por una retroalimentación dinámica y paso a paso.

### Objetivos de Diseño y UX
1. **Impacto Visual Inmediato:** Transmitir confianza, profesionalismo y un enfoque "premium" desde el primer segundo.
2. **Claridad sobre el Valor:** Comunicación instantánea (en menos de 5 segundos) de qué hace la plataforma y por qué es útil.
3. **Conversión Fluida:** Flujos de usuario intuitivos y sin fricciones hacia el inicio de sesión y la práctica.
4. **Accesibilidad Integral:** Cumplimiento de estándares WCAG 2.1 AA (contraste de colores adecuado, navegación por teclado completa, HTML semántico e indicaciones visuales claras).

### Sistema de Diseño e Identidad Visual (Design Tokens)

El diseño debe transmitir siempre **inteligencia, confianza y modernidad**, apoyándose en un ecosistema visual puramente tecnológico y amigable.

#### 1. Paleta de Colores
* **Fondos (Dark Mode Nativo):** El proyecto respira sobre un tono azul medianoche casi negro (`#0a0e1a`). Se utiliza fuertemente el efecto *glassmorphism* combinando fondos translúcidos (`hsla(225, 30%, 12%, 0.85)`) con sutiles bordes iluminados (`rgba(255, 255, 255, 0.08)`) para definir tarjetas y secciones sin recargar la interfaz.
* **Acentos (Tecnología e IA):** Gradientes vibrantes de Índigo (`#6366f1`) a Violeta (`#8b5cf6`). Son la identidad central, utilizados en botones principales, estados activos y hermosos brillos ambientales de fondo (*glows*).
* **Acentos Secundarios y Semánticos:** Ámbar (`#f59e0b`) para destacar logros o advertencias, Esmeralda (`#10b981`) para el éxito o validación correcta, y Rojo (`#ef4444`) exclusivo para mensajes de error.
* **Tipografía y Textos:** Tonos fríos de grises azulados (`#f1f5f9` para lectura principal, `#94a3b8` para descripciones y `#64748b` para texto desactivado).

#### 2. Tipografía Estratégica
* **Textos de UI (`Outfit`):** Una fuente sans-serif limpia y geométrica, usada para dar un carácter moderno a los títulos principales, textos descriptivos y botones.
* **Matemáticas y Datos (`JetBrains Mono`):** Una fuente monospaciada reservada metódicamente para las fórmulas matemáticas, ecuaciones, pasos numéricos, líneas de código y estadísticas. 

#### 3. Formas, Profundidad y Movimiento
* **Radios de Borde:** Contornos suaves (`8px` a `20px`) para aportar amabilidad al aspecto "tech" de la IA.
* **Luces y Sombras:** Uso extensivo de sombras flotantes para las tarjetas (`0 8px 32px rgba(0,0,0,0.25)`) y destellos de color (`0 0 40px rgba(99,102,241,0.15)`) para destacar interacciones, como si la interfaz emitiera luz propia.
* **Micro-animaciones de Alto Rendimiento:** Transiciones suaves usando una curva especial de Bézier (`0.3s cubic-bezier(0.4, 0, 0.2, 1)`). Para asegurar 60 cuadros por segundo, toda animación de entrada o interacción modifica única y exclusivamente `transform` (translaciones, escalas) y `opacity`, prohibiendo la animación de propiedades de layout (width, margin, etc.) para evitar reflows.
