# 📋 Plan de Implementación — Dashboard de MathIA

> **Proyecto:** MathIA — Plataforma Educativa con IA  
> **Página:** Panel principal del usuario autenticado (`dashboard.html`)  
> **Fecha:** 2026-06-04  
> **Referencia de diseño:** [agent.md](../../agent.md) · [login.html](../../login.html) · [registro.html](../../registro.html)

---

## 🎯 Objetivo

Crear la página de **Dashboard** — el panel central post-autenticación donde el estudiante visualiza su progreso, accede a sus módulos de estudio y recibe recomendaciones personalizadas de la IA. Esta página es el **corazón funcional** de MathIA una vez el usuario ha iniciado sesión. Debe:

1. Transmitir **control, claridad y motivación** al estudiante desde el primer segundo.
2. Presentar información educativa compleja de forma **visual, digerible y accionable** (gráficos de progreso, estadísticas, módulos).
3. Mantener **coherencia visual total** con el sistema de diseño definido en `agent.md` (dark mode, glassmorphism, gradientes indigo-violeta).
4. Ser **mobile-first** y 100% responsiva con un layout de sidebar colapsable para desktop.
5. Cumplir con **WCAG 2.1 AA** en accesibilidad (contraste, navegación por teclado, ARIA).
6. Incluir **micro-animaciones de alto rendimiento** (solo `transform` y `opacity`) para crear una experiencia premium y viva.

---

## 🏗️ Arquitectura de Archivos

```
📁 Proyecto MathIA
├── dashboard.html               ← [NUEVO] Página principal del dashboard
├── css/
│   ├── main.css                 ← [MODIFICAR] Agregar import de dashboard.css (condicional por página)
│   ├── tokens.css               ← Sin cambios (design tokens compartidos)
│   ├── reset.css                ← Sin cambios
│   ├── global.css               ← Sin cambios (utilidades, animaciones, glows)
│   ├── components.css           ← [MODIFICAR] Agregar componentes reutilizables: sidebar, stat-card, progress-ring
│   └── dashboard.css            ← [NUEVO] Estilos específicos del dashboard
├── js/
│   ├── main.js                  ← Sin cambios
│   └── dashboard.js             ← [NUEVO] Lógica interactiva del dashboard
├── login.html                   ← [MODIFICAR] Redirigir submit exitoso a dashboard.html
└── registro.html                ← [MODIFICAR] Redirigir submit exitoso a dashboard.html
```

---

## 📐 Especificación de Diseño UI/UX

### Layout General

El dashboard emplea un layout de **aplicación con sidebar** que cambia según el viewport:

| Breakpoint | Comportamiento |
|---|---|
| **Mobile (<768px)** | Sidebar oculta como overlay lateral (hamburger toggle). Contenido a ancho completo. Bottom-nav fijo opcional. |
| **Tablet (768px–1024px)** | Sidebar colapsada (solo iconos, ~64px ancho). Contenido ocupa el resto. |
| **Desktop (>1024px)** | Sidebar expandida (~260px). Contenido principal en grid de tarjetas. |

### Estructura de Secciones

El dashboard se compone de las siguientes zonas:

#### 1. Sidebar de Navegación
- **Logo** MathIA (link a dashboard)
- **Navegación principal:**
  - 🏠 Inicio (Dashboard) — activo por defecto
  - 📚 Mis Módulos
  - 📊 Mi Progreso
  - 🤖 Tutor IA (chat)
  - 🏆 Logros
- **Separador visual**
- **Navegación secundaria (pie de sidebar):**
  - ⚙️ Configuración
  - 🚪 Cerrar Sesión
- **Avatar del usuario** con nombre y correo en la parte inferior

#### 2. Top Bar (Header)
- **Saludo dinámico:** "Buenos días, [Nombre]" (basado en la hora del día)
- **Barra de búsqueda:** Input con icono de lupa (placeholder: "Buscar módulos, temas...")
- **Notificaciones:** Icono de campana con badge numérico
- **Avatar del usuario** (mobile: trigger del sidebar)

#### 3. Área de Contenido Principal — Grid de Cards

##### Fila 1: Estadísticas Rápidas (Stat Cards)
Cuatro tarjetas compactas en fila horizontal con datos clave:

| Card | Icono | Dato | Subtexto |
|---|---|---|---|
| Racha Activa | 🔥 | `12 días` | "¡Sigue así!" |
| Ejercicios Hoy | ✅ | `8 / 15` | "53% completado" |
| Precisión Global | 🎯 | `87%` | "+3% esta semana" |
| Tiempo de Estudio | ⏱️ | `2h 35m` | "Hoy" |

##### Fila 2: Contenido Principal (2 columnas en desktop)

**Columna Izquierda (ancha — ~60%):**
- **Card "Continúa donde lo dejaste":** Módulo actual con barra de progreso, título del tema, última actividad y botón CTA "Continuar →".
- **Card "Actividad Reciente":** Lista estilizada de las últimas 5 actividades con iconos, títulos, fechas relativas ("Hace 2h") y estado (completado ✅ / en progreso 🔄).

**Columna Derecha (estrecha — ~40%):**
- **Card "Progreso por Área":** Gráfico de barras verticales o anillos (rings) de progreso por cada área (Álgebra, Cálculo, Geometría, Estadística) con porcentajes.
- **Card "Recomendación IA":** Tarjeta especial con borde gradiente indigo-violeta. Icono de IA (🤖 o sparkle ✨), título "MathIA sugiere...", texto de recomendación personalizada y botón secundario "Explorar →".

##### Fila 3: Módulos Disponibles
- **Grid tipo bento** con 3–4 tarjetas de módulos (Álgebra, Cálculo, Geometría, Estadística).
- Cada tarjeta muestra: icono/emoji, nombre del módulo, progreso (barra + porcentaje), número de lecciones, y un badge de estado ("En progreso", "Nuevo", "Completado").

### Principios UX Aplicados

1. **Jerarquía visual clara:** La stat-card row da contexto inmediato, el módulo activo invita a la acción, y los secundarios refuerzan la motivación.
2. **Reducción de carga cognitiva:** Agrupación lógica por secciones con encabezados y separación visual.
3. **Gamificación sutil:** Rachas, logros, barras de progreso y recomendaciones de IA fomentan el engagement.
4. **Divulgación progresiva:** Solo los datos más relevantes en el dashboard; los detalles se alcanzan navegando a sub-páginas.
5. **Accesibilidad:** Landmarks ARIA (`nav`, `main`, `aside`), roles semánticos, contraste AA, focus visible.

### Paleta de Colores (basada en `tokens.css`)

| Uso | Token / Valor |
|---|---|
| Fondo principal | `--bg-primary` (#0a0e1a) |
| Cards glassmorphism | `--bg-secondary` (translúcido + blur) |
| Sidebar fondo | `hsla(225, 30%, 10%, 0.95)` + blur |
| Acentos/CTA | `--accent-gradient` (indigo → violeta) |
| Progreso completado | `--success` (#10b981) |
| Datos numéricos | `--font-mono` (JetBrains Mono) |
| Textos principales | `--text-primary` (#f1f5f9) |
| Textos secundarios | `--text-secondary` (#94a3b8) |

---

## 🚀 Fases de Implementación

---

### FASE 1: Estructura HTML Semántica
> **Objetivo:** Crear el markup completo de `dashboard.html` con HTML5 semántico, landmarks ARIA, y estructura preparada para estilos.

#### Checklist de Tareas

- [x] **1.1** Crear archivo `dashboard.html` en la raíz del proyecto.
- [x] **1.2** Configurar el `<head>` con:
  - `<meta charset="UTF-8">` y `<meta name="viewport">`
  - `<title>` descriptivo: `"Mi Dashboard — MathIA"`
  - `<meta name="description">` orientada al usuario autenticado
  - Open Graph metas (`og:title`, `og:description`, `og:type`)
  - `<meta name="theme-color" content="#0a0e1a">`
  - Favicon SVG (`assets/icons/favicon.svg`)
  - Preconnect a Google Fonts
  - Hojas de estilo: `css/main.css` + `css/dashboard.css`
- [x] **1.3** Crear la estructura base del `<body>`:
  - `<div class="dashboard-layout">` como wrapper del grid sidebar + contenido
  - Glow backdrops decorativos (2 divs `class="glow-backdrop"`) posicionados estratégicamente
- [x] **1.4** Construir el `<aside class="sidebar" id="sidebar" role="navigation" aria-label="Navegación principal">`:
  - **Header del sidebar:** Logo SVG MathIA (reutilizar SVG del `index.html`) + texto "MathIA"
  - **Navegación principal** (`<nav>`): Lista `<ul>` con 5 links (Dashboard, Módulos, Progreso, Tutor IA, Logros), cada uno con icono SVG inline + texto
  - Item activo con clase `.sidebar-link--active`
  - **Separador** `<hr>` decorativo
  - **Navegación secundaria** (`<nav>`): Configuración + Cerrar Sesión
  - **Perfil de usuario** (`<div class="sidebar-profile">`): Avatar circular con iniciales, nombre y correo truncado
  - **Botón de colapso** (`<button class="sidebar-toggle" id="sidebar-toggle">`) con icono chevron
- [x] **1.5** Construir el `<main class="dashboard-main" id="main-content">`:
  - **Top bar** (`<header class="topbar">`):
    - Botón hamburger para mobile (`class="topbar-hamburger"`, `aria-label="Abrir menú"`)
    - Saludo dinámico `<h1 class="topbar-greeting">` (ej: "Buenos días, Gabriel")
    - Barra de búsqueda: `<div class="search-bar">` con `<input type="search">` + icono SVG lupa
    - Icono de notificaciones: `<button class="topbar-notifications">` con SVG campana + `<span class="notification-badge">3</span>`
    - Avatar circular del usuario (duplicado para mobile)
- [x] **1.6** Construir la sección de **Stat Cards** (`<section class="stats-row" aria-label="Estadísticas rápidas">`):
  - 4 tarjetas `<div class="card stat-card">`, cada una con:
    - `<div class="stat-icon">` con emoji
    - `<div class="stat-value font-mono">` con el dato numérico
    - `<div class="stat-label">` con el nombre
    - `<div class="stat-change">` con el subtexto de tendencia (positivo/negativo)
- [x] **1.7** Construir la **fila principal de contenido** (`<section class="content-grid">`):
  - **Columna izquierda** (`<div class="content-primary">`):
    - **Card "Continúa donde lo dejaste"** (`class="card continue-card"`):
      - Badge de categoría (ej: "Álgebra Lineal")
      - Título del tema `<h3>`
      - Barra de progreso: `<div class="progress-bar">` con `<div class="progress-fill" style="width: 65%">`
      - Texto de progreso: `<span class="font-mono">65% completado</span>`
      - Texto de última actividad: "Última sesión: Hace 2 horas"
      - Botón CTA: `<a class="btn btn-primary">Continuar →</a>`
    - **Card "Actividad Reciente"** (`class="card activity-card"`):
      - `<h3>` "Actividad Reciente"
      - Lista `<ul class="activity-list">` con 5 items, cada uno:
        - Icono de estado (✅ completado, 🔄 en progreso)
        - Título de la actividad
        - Fecha relativa (`<time class="text-muted">`)
  - **Columna derecha** (`<div class="content-secondary">`):
    - **Card "Progreso por Área"** (`class="card progress-areas-card"`):
      - `<h3>` "Progreso por Área"
      - 4 anillos SVG de progreso (`<svg class="progress-ring">`) o barras, cada uno con nombre del área + porcentaje `font-mono`
    - **Card "Recomendación IA"** (`class="card ai-recommendation-card"`):
      - Icono decorativo ✨
      - `<h3>` "MathIA sugiere..."
      - `<p>` con texto de recomendación
      - `<a class="btn btn-secondary">Explorar →</a>`
- [x] **1.8** Construir la sección de **Módulos Disponibles** (`<section class="modules-section" aria-label="Módulos de estudio">`):
  - `<h2>` "Tus Módulos"
  - Grid de 4 tarjetas `<div class="card module-card">`, cada una con:
    - Icono grande emoji/SVG
    - `<h3>` nombre del módulo
    - Badge de estado ("En progreso", "Nuevo", "Completado") con clases semánticas
    - Barra de progreso + porcentaje
    - Subtexto: "X lecciones · Y ejercicios"
- [x] **1.9** Vincular script `js/dashboard.js` antes del cierre de `</body>`
- [x] **1.10** Agregar **overlay mobile** (`<div class="sidebar-overlay" id="sidebar-overlay">`) para cerrar sidebar al tocar fuera

#### Criterios de Aceptación
- ✅ El HTML pasa validación W3C sin errores.
- ✅ Se usan landmarks ARIA apropiados: `<aside>` con `role="navigation"`, `<main>`, `<header>`, `<nav>`.
- ✅ Todos los botones interactivos tienen `aria-label` descriptivo.
- ✅ Los datos numéricos usan `class="font-mono"` para JetBrains Mono.
- ✅ Todos los elementos interactivos tienen IDs únicos y descriptivos.
- ✅ El heading principal `<h1>` es el saludo del topbar (un solo `<h1>` por página).

---

### FASE 2: Estilos CSS — Layout y Sidebar (Mobile-First)
> **Objetivo:** Crear `dashboard.css` con el sistema de layout sidebar + contenido, enfoque mobile-first, y reutilización de design tokens.

#### Checklist de Tareas

- [x] **2.1** Crear archivo `css/dashboard.css`.
- [x] **2.2** Estilos del layout base (mobile-first):
  - `.dashboard-layout`: `display: flex; min-height: 100vh; background: var(--bg-primary);`
  - `.dashboard-main`: `flex: 1; display: flex; flex-direction: column; overflow-y: auto;`
  - Padding del contenido principal con tokens del sistema (`--space-md` a `--space-lg`)
- [x] **2.3** Estilos del **Sidebar** — Mobile (`<768px`):
  - `.sidebar`: Posición fija, `transform: translateX(-100%)`, ancho `280px`, altura 100vh
  - Fondo glassmorphism: `background: hsla(225, 30%, 10%, 0.95); backdrop-filter: blur(20px);`
  - Borde derecho sutil: `border-right: 1px solid var(--border-subtle);`
  - Transición con `--transition-smooth` sobre `transform` (rendimiento 60fps)
  - `.sidebar.is-open`: `transform: translateX(0);`
  - `z-index: 200;` para estar sobre el contenido
  - `.sidebar-overlay`: Fondo `rgba(0,0,0,0.5)`, fijo, `opacity: 0; pointer-events: none;`, transición sobre `opacity`
  - `.sidebar-overlay.is-active`: `opacity: 1; pointer-events: auto;`
- [x] **2.4** Estilos de los **links del sidebar**:
  - `.sidebar-link`: Flex row, gap `--space-sm`, padding `--space-sm --space-md`, border-radius `--radius-sm`
  - Color base: `var(--text-secondary)`
  - Hover: `background: rgba(255,255,255,0.05); color: var(--text-primary);`
  - `.sidebar-link--active`: `background: rgba(99,102,241,0.15); color: var(--accent-primary);` con borde izquierdo de 3px gradiente
  - Iconos SVG: `width: 20px; height: 20px; flex-shrink: 0;`
  - Transiciones sobre `background`, `color` con `--transition-fast`
- [x] **2.5** Estilos del **perfil en sidebar** (`.sidebar-profile`):
  - Avatar circular `40px × 40px` con fondo gradiente indigo-violeta, texto blanco centrado, `font-mono`
  - Nombre truncado con `text-overflow: ellipsis`
  - Correo en `--text-muted`, tamaño `--fs-small`
- [x] **2.6** Estilos del **Top Bar** (`.topbar`):
  - `display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md) var(--space-lg);`
  - `.topbar-greeting`: Font size `--fs-h3`, peso 700
  - `.search-bar`: Flex, fondo `var(--bg-tertiary)`, border-radius `--radius-full`, borde sutil, icono de lupa a la izquierda
  - `.search-bar input`: Sin borde, fondo transparente, color `--text-primary`, placeholder `--text-muted`
  - `.search-bar:focus-within`: Borde `var(--accent-primary)`, glow sutil
  - `.topbar-notifications`: Posición relativa, botón con SVG campana
  - `.notification-badge`: Absolute, `top: -4px; right: -4px;`, fondo `--error`, border-radius full, tamaño `18px`, texto `11px` centrado, `font-mono`
- [x] **2.7** Media query `@media (min-width: 768px)` — Sidebar colapsada:
  - `.sidebar`: `position: static; transform: none; width: 64px;` (solo iconos)
  - Ocultar textos de los links (`.sidebar-link span { display: none; }`)
  - Ocultar perfil de usuario y secciones secundarias
  - `.sidebar-toggle` visible para expandir/colapsar
  - `.topbar-hamburger`: Ocultar
- [x] **2.8** Media query `@media (min-width: 1024px)` — Sidebar expandida:
  - `.sidebar`: `width: 260px;`
  - Mostrar textos de links nuevamente
  - Mostrar perfil y navegación secundaria
  - `.sidebar.is-collapsed`: `width: 64px;` (toggle manual)

#### Criterios de Aceptación
- ✅ El sidebar se abre/cierra como overlay en mobile con animación fluida sobre `transform`.
- ✅ En tablet, el sidebar se muestra colapsado (solo iconos) de forma estática.
- ✅ En desktop, el sidebar se muestra completo (260px) con opción de colapsar.
- ✅ No hay scroll horizontal en ningún viewport.
- ✅ Todos los colores provienen de `tokens.css`.

---

### FASE 3: Estilos CSS — Cards, Estadísticas y Contenido
> **Objetivo:** Estilizar todas las tarjetas de contenido, stat cards, barras de progreso, anillos y la cuadrícula de módulos.

#### Checklist de Tareas

- [x] **3.1** Estilos de las **Stat Cards** (`.stats-row`):
  - Layout: `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md);`
  - Mobile: Stack a 2 columnas (`grid-template-columns: repeat(2, 1fr);`)
  - `.stat-card`: Padding `--space-lg`, flex column centrado, glassmorphism heredado de `.card`
  - `.stat-icon`: Font-size `1.75rem`, margin-bottom `--space-sm`
  - `.stat-value`: Font-size `1.75rem`, peso 800, `font-mono`, color `--text-primary`
  - `.stat-label`: Font-size `--fs-small`, color `--text-secondary`, peso 500
  - `.stat-change`: Font-size `0.75rem`, color `--success` si positivo, `--error` si negativo, con icono flecha
  - Hover: Leve `translateY(-4px)` + glow sutil (heredado de `.card`)
- [x] **3.2** Estilos de la **cuadrícula de contenido** (`.content-grid`):
  - Desktop: `display: grid; grid-template-columns: 3fr 2fr; gap: var(--space-lg);`
  - Mobile/Tablet: `grid-template-columns: 1fr;` (stack vertical)
- [x] **3.3** Estilos de la **card "Continúa donde lo dejaste"** (`.continue-card`):
  - Badge de categoría: Reutilizar `.badge` de `components.css`
  - Título `<h3>`: `--fs-h3`, peso 700
  - `.progress-bar`: Altura `8px`, fondo `var(--bg-tertiary)`, border-radius `--radius-full`
  - `.progress-fill`: Altura 100%, fondo `var(--accent-gradient)`, border-radius `--radius-full`, `transition: width 0.5s ease;`
  - Botón CTA alineado a la derecha o full-width en mobile
- [x] **3.4** Estilos de la **card "Actividad Reciente"** (`.activity-card`):
  - `.activity-list`: Lista sin viñetas, con separadores sutiles (`border-bottom: 1px solid var(--border-subtle)`)
  - Cada item: Flex row, gap `--space-sm`, padding vertical `--space-sm`
  - Iconos de estado: `width: 24px; height: 24px;` con color semántico
  - Hover en items: `background: rgba(255,255,255,0.03);`
- [x] **3.5** Estilos de la **card "Progreso por Área"** (`.progress-areas-card`):
  - Anillos SVG de progreso (`.progress-ring`):
    - `width: 64px; height: 64px;` cada anillo
    - Círculo de fondo: `stroke: var(--bg-tertiary); stroke-width: 6;`
    - Círculo de progreso: `stroke: var(--accent-gradient); stroke-width: 6; stroke-linecap: round;`
    - Uso de `stroke-dasharray` y `stroke-dashoffset` para controlar el porcentaje
    - Animación de entrada con `transition: stroke-dashoffset 1s ease;`
  - Layout: Grid `2x2` para los 4 anillos, o flex-wrap
  - Porcentaje centrado dentro del anillo: Position absolute, `font-mono`, peso 700
  - Nombre del área debajo: `--fs-small`, `--text-secondary`
- [x] **3.6** Estilos de la **card "Recomendación IA"** (`.ai-recommendation-card`):
  - Borde especial: `border: 1px solid rgba(99,102,241,0.3);` + `box-shadow: var(--shadow-glow);`
  - Fondo con toque de gradiente: `background: linear-gradient(135deg, hsla(225,30%,12%,0.9), hsla(260,30%,14%,0.9));`
  - Icono ✨ con animación sutil de pulso (`@keyframes pulse`)
  - Texto de recomendación: `--fs-body`, `--text-secondary`, line-height generoso
- [x] **3.7** Estilos de la **sección de Módulos** (`.modules-section`):
  - Título `<h2>`: `--fs-h3`, peso 700, margin-bottom `--space-lg`
  - Grid: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-md);`
  - `.module-card`: Flex column, padding `--space-lg`
  - Icono grande: Font-size `2.5rem`, margin-bottom `--space-sm`
  - Badge de estado:
    - "En progreso": `.badge` base (indigo)
    - "Nuevo": `.badge-warm` (ámbar)
    - "Completado": clase con fondo verde sutil, color `--success`
  - Barra de progreso: Reutilizar `.progress-bar` / `.progress-fill`
  - Hover: `translateY(-4px)`, glow sutil, cursor pointer
- [x] **3.8** Micro-animaciones de entrada:
  - Animación `fadeInUp` escalonada para stat-cards (usando `animation-delay: 0.1s, 0.2s, 0.3s, 0.4s`)
  - Animación `fadeIn` para las secciones del content-grid
  - Solo `transform` y `opacity` (regla de rendimiento de `agent.md`)
  - Añadir clase `.reveal-element` a las secciones principales para el IntersectionObserver de `main.js`

#### Criterios de Aceptación
- ✅ Las stat-cards se muestran en grid responsivo (2 cols en mobile, 4 en desktop).
- ✅ Las barras de progreso usan el gradiente del sistema y transiciones suaves.
- ✅ Los anillos de progreso se animan al entrar en viewport.
- ✅ La card de recomendación IA tiene un aspecto diferenciado (borde glow, fondo especial).
- ✅ Todas las animaciones usan solo `transform` y `opacity` (60fps).
- ✅ Cero colores hardcoded — todo vía `tokens.css`.

---

### FASE 4: Lógica JavaScript (Interactividad + Datos Simulados)
> **Objetivo:** Crear `dashboard.js` con la lógica del sidebar, saludo dinámico, anillos de progreso animados y datos de demo simulados.

#### Checklist de Tareas

- [x] **4.1** Crear archivo `js/dashboard.js`.
- [x] **4.2** Inicialización (`DOMContentLoaded`):
  - Cachear referencias a todos los elementos del DOM (sidebar, overlay, toggles, topbar, etc.)
- [x] **4.3** Implementar **toggle del sidebar**:
  - **Mobile:** Botón hamburger abre sidebar (`sidebar.classList.add('is-open')`) + activa overlay
  - Overlay click → cierra sidebar
  - Tecla `Escape` → cierra sidebar
  - Bloquear scroll del body cuando sidebar está abierto (`overflow: hidden`)
  - **Desktop:** Botón sidebar-toggle colapsa/expande (`sidebar.classList.toggle('is-collapsed')`)
  - Guardar preferencia de colapsado en `localStorage`
- [x] **4.4** Implementar **saludo dinámico**:
  - Obtener hora actual con `new Date().getHours()`
  - 5–11: "Buenos días", 12–17: "Buenas tardes", 18–23 / 0–4: "Buenas noches"
  - Nombre del usuario: hardcoded como "Gabriel" (dato demo)
  - Actualizar el contenido de `.topbar-greeting`
- [x] **4.5** Implementar **anillos de progreso SVG**:
  - Función `animateProgressRing(ringElement, percentage)`:
    - Calcular `circumference = 2 * π * r`
    - Calcular `offset = circumference - (percentage / 100) * circumference`
    - Animar `stroke-dashoffset` desde `circumference` hasta `offset`
  - Usar IntersectionObserver para activar la animación cuando los rings entran en viewport
  - Actualizar el texto del porcentaje central simultáneamente
- [x] **4.6** Implementar **datos de demo simulados**:
  - Objeto `demoData` con:
    - `stats`: { racha: 12, ejerciciosHoy: "8/15", precision: "87%", tiempoEstudio: "2h 35m" }
    - `moduloActual`: { nombre: "Ecuaciones Cuadráticas", area: "Álgebra Lineal", progreso: 65, ultimaSesion: "Hace 2 horas" }
    - `actividadReciente`: Array de 5 actividades con título, fecha, estado
    - `progresoAreas`: { algebra: 85, calculo: 45, geometria: 70, estadistica: 30 }
    - `modulosDisponibles`: Array de 4 módulos con nombre, icono, progreso, lecciones, estado
  - Función `renderDashboard(data)` que inyecte todos los datos en el DOM
- [x] **4.7** Implementar **búsqueda** (filtro visual):
  - Event listener `input` en la barra de búsqueda
  - Filtrar módulos visibles según el texto escrito (comparando con `data-module-name`)
  - Si no hay resultados, mostrar un mensaje "No se encontraron módulos"
- [x] **4.8** Implementar **responsive helpers**:
  - `matchMedia('(min-width: 768px)')` listener para manejar transiciones entre mobile y tablet
  - Cerrar sidebar automáticamente si se redimensiona de mobile a desktop
  - Limpiar clases residuales al cambiar de breakpoint
- [x] **4.9** Integrar con **IntersectionObserver de `main.js`**:
  - Si `main.js` se incluye, reutilizar el observer existente
  - Si no, crear observer propio para las reveal-elements del dashboard
  - Targets: `.stat-card`, `.continue-card`, `.activity-card`, `.progress-areas-card`, `.ai-recommendation-card`, `.module-card`

#### Criterios de Aceptación
- ✅ El sidebar se abre/cierra suavemente en mobile con overlay.
- ✅ El sidebar se colapsa/expande en desktop con preferencia persistida.
- ✅ El saludo cambia según la hora del día.
- ✅ Los anillos de progreso se animan al entrar en viewport (no al cargar).
- ✅ La búsqueda filtra módulos en tiempo real.
- ✅ No hay `console.error` ni excepciones no manejadas.
- ✅ El sidebar se cierra con `Escape` y click en overlay.

---

### FASE 5: Integración y Navegación
> **Objetivo:** Conectar la página de dashboard con el flujo de navegación existente y actualizar las redirecciones post-autenticación.

#### Checklist de Tareas

- [x] **5.1** Actualizar `login.html` / `js/login.js`:
  - Tras submit exitoso del login, redirigir a `dashboard.html` en lugar del comportamiento actual (ej: `window.location.href = 'dashboard.html'`)
- [x] **5.2** Actualizar `registro.html` / `js/registro.js`:
  - Tras registro exitoso y el mensaje "¡Cuenta creada!", redirigir a `dashboard.html`
- [x] **5.3** Verificar la **navegación interna del sidebar**:
  - Link "Dashboard" → `dashboard.html` (activo)
  - Links "Módulos", "Progreso", "Tutor IA", "Logros" → `#` (placeholder, con `title="Próximamente"`)
  - Link "Cerrar Sesión" → `login.html`
  - Link "Configuración" → `#` (placeholder)
- [x] **5.4** Agregar componentes reutilizables a `css/components.css`:
  - Estilos de `.progress-bar` y `.progress-fill` si no existen como componente global
  - Estilos genéricos de `.sidebar-link` si se planean reutilizar en futuras páginas
- [x] **5.5** Verificar que `css/main.css` no necesita cambios:
  - `dashboard.css` se carga solo en `dashboard.html` (como `login.css` se carga solo en `login.html`)
  - `main.css` sigue importando: reset + tokens + global + components

#### Criterios de Aceptación
- ✅ Login exitoso → redirige a `dashboard.html`.
- ✅ Registro exitoso → redirige a `dashboard.html`.
- ✅ "Cerrar Sesión" → redirige a `login.html`.
- ✅ Logo del sidebar → recarga `dashboard.html`.
- ✅ Todos los enlaces son funcionales o tienen tooltip "Próximamente".

---

### FASE 6: QA, Accesibilidad y Pulido Final
> **Objetivo:** Validar la calidad, accesibilidad, rendimiento y coherencia visual de toda la página del dashboard.

#### Checklist de Tareas

- [x] **6.1** Validación de **accesibilidad**:
  - Navegar todo el dashboard usando solo teclado (Tab, Shift+Tab, Enter, Space, Escape)
  - Verificar focus rings (`focus-visible`) en: links del sidebar, botones del topbar, búsqueda, botones CTA de cards, tarjetas de módulos
  - Verificar que los landmarks ARIA están correctos: `<nav>` (sidebar), `<main>` (contenido), `<header>` (topbar)
  - Comprobar contraste de colores con herramienta (ratio ≥ 4.5:1 texto normal, ≥ 3:1 texto grande/iconos)
  - Verificar atributos `aria-label` en botones de solo-icono (hamburger, notificaciones, toggle sidebar)
- [x] **6.2** Pruebas de **responsive**:
  - Viewport **320px** (iPhone SE): Sidebar overlay, stats 2x2, contenido stacked, no overflow-x
  - Viewport **375px** (iPhone estándar): Similiar a 320px, espaciado correcto
  - Viewport **768px** (iPad portrait): Sidebar colapsada (iconos), contenido a ancho completo
  - Viewport **1024px** (iPad landscape): Sidebar expandida, grid de 2 columnas en contenido
  - Viewport **1440px** (Desktop): Layout completo, ancho máximo respetado
- [x] **6.3** Pruebas de **interacciones**:
  - Toggle sidebar mobile: Abre/cierra con animación fluida
  - Toggle sidebar desktop: Colapsa/expande con persistencia en localStorage
  - Cerrar sidebar con Escape y click en overlay
  - Búsqueda filtra módulos correctamente
  - Hover effects en todas las cards y links del sidebar
  - Anillos de progreso se animan al scroll
  - Click en links placeholder muestra tooltip o estado visual de "Próximamente"
- [x] **6.4** Revisión **visual** final:
  - Coherencia con identidad visual de MathIA (login, registro, landing)
  - Glows ambientales correctos y no intrusivos
  - Glassmorphism consistente en sidebar y cards
  - Tipografía correcta: `Outfit` para UI, `JetBrains Mono` para datos numéricos
  - Gradientes indigo-violeta en los acentos y el botón primario
  - Sin overflow horizontal en ningún breakpoint
- [x] **6.5** Validación **HTML**:
  - Pasar por validador W3C
  - Corregir warnings y errores
  - Verificar que hay un solo `<h1>` por página
- [x] **6.6** Revisión de **rendimiento**:
  - Verificar que las animaciones corren a 60fps (no animan `width`, `margin`, `padding`)
  - Verificar que `backdrop-filter: blur()` no causa drops de rendimiento en mobile
  - Verificar que no se cargan recursos innecesarios
  - Verificar que los SVGs inline están optimizados (sin metadatos de editor)
- [x] **6.7** Prueba de **flujo completo** end-to-end:
  - Landing → Login → Dashboard ✅
  - Landing → Registro → Dashboard ✅
  - Dashboard → Cerrar Sesión → Login ✅

#### Criterios de Aceptación
- ✅ La página cumple WCAG 2.1 AA en todos los criterios relevantes.
- ✅ Funciona correctamente en Chrome, Firefox, Safari y Edge.
- ✅ Sin errores en la consola del navegador.
- ✅ Performance visual fluida (sin stuttering ni jank en animaciones).
- ✅ Coherencia visual 100% con el ecosistema MathIA existente (landing, login, registro).
- ✅ El flujo de navegación completo (landing → auth → dashboard → logout) funciona sin errores.

---

## ✅ Criterios de Aceptación Globales

Para dar por **exitosa** la implementación completa del dashboard, se deben cumplir **todas** estas condiciones:

1. **Visual:** La página transmite la identidad MathIA (dark mode, glassmorphism, gradientes indigo-violeta, tipografía Outfit + JetBrains Mono) con calidad premium.
2. **Responsiva:** Funciona correctamente en 5 breakpoints (320px, 375px, 768px, 1024px, 1440px) con sidebar adaptable.
3. **Accesible:** Cumple WCAG 2.1 AA: contraste ≥ 4.5:1, navegación por teclado completa, landmarks ARIA, focus rings visibles.
4. **Interactiva:** Sidebar toggle, anillos animados, búsqueda funcional, micro-animaciones a 60fps.
5. **Integrada:** Login y registro redirigen al dashboard. "Cerrar Sesión" redirige al login. Todos los enlaces funcionan.
6. **Rendimiento:** Animaciones usan exclusivamente `transform` y `opacity`. Sin propiedades de layout animadas. Sin errores en consola.
7. **Código limpio:** HTML semántico válido (W3C), CSS modular usando tokens del sistema, JS sin errores ni excepciones.

---

## 📎 Referencias Técnicas

| Recurso | Ubicación |
|---------|-----------|
| Design Tokens | [css/tokens.css](../../css/tokens.css) |
| Componentes Base | [css/components.css](../../css/components.css) |
| Estilos Globales | [css/global.css](../../css/global.css) |
| CSS Reset | [css/reset.css](../../css/reset.css) |
| Entry CSS | [css/main.css](../../css/main.css) |
| Referencia de Login (HTML) | [login.html](../../login.html) |
| Referencia de Login (CSS) | [css/login.css](../../css/login.css) |
| Referencia de Login (JS) | [js/login.js](../../js/login.js) |
| Referencia de Registro (HTML) | [registro.html](../../registro.html) |
| Referencia de Registro (CSS) | [css/registro.css](../../css/registro.css) |
| Referencia de Registro (JS) | [js/registro.js](../../js/registro.js) |
| Referencia de Landing | [index.html](../../index.html) |
| JS Global | [js/main.js](../../js/main.js) |
| Directrices del Agente | [agent.md](../../agent.md) |
| Skill UI/UX Designer | [SKILL.md](../../.agents/skills/ui-ux-designer/SKILL.md) |

---

## 📊 Resumen de Archivos

| Acción | Archivo | Descripción |
|--------|---------|-------------|
| 🆕 Crear | `dashboard.html` | Página principal del dashboard con layout sidebar + contenido |
| 🆕 Crear | `css/dashboard.css` | Estilos completos: sidebar, topbar, stat cards, progress rings, módulos |
| 🆕 Crear | `js/dashboard.js` | Lógica: sidebar toggle, saludo dinámico, anillos animados, búsqueda, datos demo |
| ✏️ Modificar | `css/components.css` | Agregar componentes reutilizables (progress-bar, etc.) si aplica |
| ✏️ Modificar | `js/login.js` | Redirigir submit exitoso a `dashboard.html` |
| ✏️ Modificar | `js/registro.js` | Redirigir registro exitoso a `dashboard.html` |
| 🔍 Revisar | `css/main.css` | Verificar que no requiere cambios (imports condicionales por página) |
| 🔍 Revisar | `index.html` | Verificar que no hay CTAs que deban apuntar al dashboard |
