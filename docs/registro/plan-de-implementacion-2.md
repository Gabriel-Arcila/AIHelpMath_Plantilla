# 📋 Plan de Implementación — Página de Registro de MathIA

> **Proyecto:** MathIA — Plataforma Educativa con IA  
> **Página:** Registro de nuevos usuarios (`registro.html`)  
> **Fecha:** 2026-06-04  
> **Referencia de diseño:** [agent.md](../../agent.md) · [login.html](../../login.html)

---

## 🎯 Objetivo

Crear una página de registro que permita a nuevos usuarios crear una cuenta en MathIA de forma rápida, confiable e intuitiva. La página debe:

1. Mantener **coherencia visual total** con la página de login existente y el sistema de diseño definido en `agent.md`.
2. Aplicar las **mejores prácticas de UX/UI** para formularios de registro (reducción de fricción, feedback en tiempo real, accesibilidad WCAG 2.1 AA).
3. Transmitir la identidad de marca MathIA: **inteligencia, confianza y modernidad**.
4. Ser **mobile-first** y 100% responsiva.

---

## 🏗️ Arquitectura de Archivos

```
📁 Proyecto MathIA
├── registro.html          ← [NUEVO] Página de registro
├── css/
│   ├── main.css           ← Sin cambios (ya importa los módulos necesarios)
│   ├── tokens.css         ← Sin cambios (design tokens compartidos)
│   ├── reset.css          ← Sin cambios
│   ├── global.css         ← Sin cambios (utilidades, animaciones, glows)
│   ├── components.css     ← [MODIFICAR] Agregar componentes reutilizables nuevos
│   └── registro.css       ← [NUEVO] Estilos específicos del registro
├── js/
│   └── registro.js        ← [NUEVO] Lógica de validación y UX
└── login.html             ← [MODIFICAR] Actualizar enlace "Regístrate gratis"
```

---

## 📐 Especificación de Diseño UI/UX

### Layout General
- **Mobile (< 640px):** Formulario a ancho completo sin card frame (idéntico al patrón de `login.html`).
- **Tablet (≥ 640px):** Card glassmorphism centrada con `max-width: 480px`.
- **Desktop (≥ 1024px):** Card centrada. Sin panel visual lateral (consistente con login actual).

### Campos del Formulario
| # | Campo | Tipo | Icono | Validación |
|---|-------|------|-------|------------|
| 1 | Nombre completo | `text` | 👤 Persona | Requerido, mín. 2 caracteres, solo letras y espacios |
| 2 | Correo electrónico | `email` | ✉️ Sobre | Requerido, formato email válido (regex) |
| 3 | Contraseña | `password` | 🔒 Candado | Requerido, mín. 8 caracteres, indicador de fuerza |
| 4 | Confirmar contraseña | `password` | 🔒 Candado | Requerido, debe coincidir con campo 3 |

### Componentes Adicionales
- **Indicador de fuerza de contraseña:** Barra visual con 4 niveles (Débil → Fuerte) usando colores semánticos (`--error`, `--accent-warm`, `--success`).
- **Botón de toggle de visibilidad:** En ambos campos de contraseña (reutilizar patrón de `login.html`).
- **Checkbox de Términos y Condiciones:** Requerido para enviar el formulario.
- **Botón primario "Crear Cuenta":** Gradiente indigo-violeta con spinner de carga.
- **Separador "o regístrate con":** Seguido de botones sociales (Google, GitHub).
- **Footer:** Enlace "¿Ya tienes cuenta? Inicia sesión" → `login.html`.

### Principios UX Aplicados
1. **Reducción de fricción:** Solo 4 campos esenciales. Sin campos superfluos.
2. **Feedback inmediato:** Validación en tiempo real al perder foco (`blur`) y al escribir (`input`) cuando hay errores.
3. **Estados visuales claros:** Error (borde rojo + mensaje), Éxito (borde verde + check), Foco (borde indigo + glow).
4. **Divulgación progresiva:** El indicador de fuerza aparece solo cuando el usuario comienza a escribir la contraseña.
5. **Prevención de errores:** Toggle de visibilidad para verificar contraseñas antes de enviar.
6. **Accesibilidad:** Labels vinculados, `aria-live` para errores, `role="alert"`, navegación por teclado completa, contraste WCAG AA.

---

## 🚀 Fases de Implementación

---

### FASE 1: Estructura HTML Semántica
> **Objetivo:** Crear el markup completo de `registro.html` con HTML5 semántico, accesible y preparado para estilos.

#### Checklist de Tareas

- [x] **1.1** Crear archivo `registro.html` en la raíz del proyecto.
- [x] **1.2** Configurar el `<head>` con:
  - `<meta charset="UTF-8">` y `<meta name="viewport">`
  - `<title>` descriptivo: `"Crear Cuenta — MathIA"`
  - `<meta name="description">` con copy orientado a conversión
  - Open Graph metas (`og:title`, `og:description`, `og:type`)
  - `<meta name="theme-color" content="#0a0e1a">`
  - Favicon SVG (`assets/icons/favicon.svg`)
  - Preconnect a Google Fonts
  - Hojas de estilo: `css/main.css` + `css/registro.css`
- [x] **1.3** Crear la estructura del `<body>`:
  - Glow backdrops decorativos (2 divs con `class="glow-backdrop"`)
  - `<main class="registro-container">` como contenedor principal
  - `<section class="form-panel">` para centrar el formulario
  - Enlace de retorno móvil (`class="back-link mobile-only"`) → `index.html`
- [x] **1.4** Construir la card del formulario (`class="card registro-card"`):
  - Header con logo SVG de MathIA + título `<h1>` "Crear Cuenta"
  - Subtítulo descriptivo: "Únete a MathIA y transforma tu aprendizaje"
- [x] **1.5** Crear el formulario `<form id="registro-form" novalidate>`:
  - **Campo nombre:** `<div class="form-group" id="group-nombre">` con label, input-container, icono SVG, success-indicator, y div error
  - **Campo email:** Reutilizar la misma estructura que en `login.html`
  - **Campo contraseña:** Con toggle de visibilidad + contenedor para indicador de fuerza
  - **Campo confirmar contraseña:** Con toggle de visibilidad independiente
- [x] **1.6** Agregar el indicador de fuerza de contraseña:
  - `<div class="password-strength" id="password-strength">` (oculto por defecto)
  - Barra visual: `<div class="strength-bar">` con `<div class="strength-fill">`
  - Label de texto: `<span class="strength-label">`
- [x] **1.7** Agregar checkbox de términos:
  - Reutilizar clase `.checkbox-container` del login
  - Texto: "Acepto los Términos de Servicio y la Política de Privacidad"
  - Enlace `<a>` en los textos de términos y política
- [x] **1.8** Agregar botón de submit:
  - `<button type="submit" class="btn btn-primary btn-submit" id="btn-submit-registro">`
  - Texto: "Crear Cuenta"
  - Spinner oculto por defecto
- [x] **1.9** Agregar sección de login social:
  - Separador con texto "o regístrate con"
  - Grid de botones sociales (Google, GitHub) — misma estructura que login
- [x] **1.10** Agregar footer del formulario:
  - Texto: "¿Ya tienes cuenta?" + enlace "Inicia sesión" → `login.html`
- [x] **1.11** Agregar el SVG decorativo de patrón matemático (reutilizar del login, visible solo en mobile)
- [x] **1.12** Vincular script `js/registro.js` antes del cierre de `</body>`

#### Criterios de Aceptación
- ✅ El HTML pasa validación W3C sin errores.
- ✅ Todos los inputs tienen `<label>` vinculado con `for`/`id`.
- ✅ Los contenedores de error tienen `role="alert"` y `aria-live="assertive"`.
- ✅ El formulario usa `novalidate` para control manual de validaciones.
- ✅ Todos los elementos interactivos tienen IDs únicos y descriptivos.

---

### FASE 2: Estilos CSS (Mobile-First + Glassmorphism)
> **Objetivo:** Crear `registro.css` siguiendo la metodología mobile-first y reutilizando los design tokens de `tokens.css`.

#### Checklist de Tareas

- [x] **2.1** Crear archivo `css/registro.css`.
- [x] **2.2** Estilos base mobile (< 640px):
  - `.registro-container`: Flex column, `min-height: 100vh`, fondo `--bg-primary`
  - `.registro-card`: Sin borde, sin fondo, sin sombra (transparente sobre el fondo oscuro)
  - `.form-panel`: Flex column centrado, padding con tokens del sistema
  - Header del formulario: Título `1.8rem`, peso 800, color `--text-primary`
- [x] **2.3** Estilos del indicador de fuerza de contraseña:
  - `.password-strength`: Oculto por defecto (`display: none`), transición suave al mostrarse
  - `.strength-bar`: Altura 4px, fondo `--bg-tertiary`, border-radius `--radius-full`
  - `.strength-fill`: Transición de ancho y color con `--transition-smooth`
  - Clases de estado: `.strength-weak` (rojo), `.strength-fair` (ámbar), `.strength-good` (ámbar-verde), `.strength-strong` (verde)
  - `.strength-label`: Texto pequeño, color dinámico según el nivel
- [x] **2.4** Estilos del checkbox de términos:
  - Reutilizar las clases `.checkbox-container`, `.checkmark`, `.checkbox-label` de `login.css`
  - Añadir estilo para el enlace inline dentro del label
  - Estado de error en el checkbox (borde rojo cuando no está marcado al intentar enviar)
- [x] **2.5** Estilos para el botón de submit y spinner:
  - Reutilizar `.btn-submit` y `.spinner` de `login.css`
- [x] **2.6** Media query `@media (min-width: 640px)`:
  - Restaurar card frame: fondo `--bg-secondary`, borde sutil, `backdrop-filter: blur(16px)`, sombra
  - Padding interno del card con tokens del sistema
- [x] **2.7** Media query `@media (min-width: 1024px)`:
  - Ocultar elementos `.mobile-only`
  - Ajustar tamaños de inputs y labels (reducir ligeramente como en login desktop)
  - Mantener card centrada sin panel visual lateral
- [x] **2.8** Agregar micro-animaciones de entrada:
  - Animación `fadeInUp` escalonada para los campos del formulario (usando `animation-delay`)
  - Solo animar `transform` y `opacity` (regla de rendimiento del `agent.md`)

#### Criterios de Aceptación
- ✅ Los estilos usan exclusivamente variables de `tokens.css` (cero colores hardcoded).
- ✅ Responsive correcto en 3 breakpoints: mobile, tablet (640px), desktop (1024px).
- ✅ El indicador de fuerza cambia de color y ancho con transiciones suaves.
- ✅ Las animaciones usan solo `transform` y `opacity` (60fps garantizados).
- ✅ Contraste de texto cumple WCAG 2.1 AA (ratio ≥ 4.5:1 para texto normal).

---

### FASE 3: Lógica JavaScript (Validación + UX Interactiva)
> **Objetivo:** Crear `registro.js` con validación en tiempo real, indicador de fuerza de contraseña, y feedback visual premium.

#### Checklist de Tareas

- [x] **3.1** Crear archivo `js/registro.js`.
- [x] **3.2** Inicialización (`DOMContentLoaded`):
  - Cachear referencias a todos los elementos del DOM (inputs, groups, error containers, botones)
- [x] **3.3** Implementar toggle de visibilidad de contraseña:
  - Reutilizar la lógica del `login.js` para ambos campos de contraseña
  - Cada campo tiene su propio botón toggle independiente
  - Actualizar `aria-label` dinámicamente ("Mostrar"/"Ocultar")
- [x] **3.4** Implementar funciones de validación individuales:
  - `validateNombre()`: Requerido, mín. 2 caracteres, regex `/^[a-záéíóúüñ\s]+$/i`
  - `validateEmail()`: Reutilizar regex y lógica del `login.js`
  - `validatePassword()`: Requerido, mín. 8 caracteres
  - `validateConfirmPassword()`: Debe coincidir exactamente con el campo contraseña
  - `validateTerms()`: Checkbox debe estar marcado
- [x] **3.5** Implementar funciones utilitarias de feedback visual:
  - `showInputError(group, errorContainer, message)`: Reutilizar de `login.js`
  - `clearInputError(group, errorContainer)`: Reutilizar de `login.js`
  - `setInputSuccess(inputElement)`: Reutilizar de `login.js`
  - `clearInputSuccess(inputElement)`: Reutilizar de `login.js`
- [x] **3.6** Implementar indicador de fuerza de contraseña:
  - Función `calculatePasswordStrength(password)` que evalúe:
    - Longitud (8+, 12+, 16+ caracteres)
    - Presencia de mayúsculas y minúsculas
    - Presencia de números
    - Presencia de caracteres especiales
  - Retorna un objeto `{ level: 0-4, label: string, className: string }`
  - Niveles: 0 = Vacío, 1 = Débil, 2 = Regular, 3 = Buena, 4 = Fuerte
  - Función `updateStrengthIndicator(strength)` que actualice:
    - Ancho de `.strength-fill` (25%, 50%, 75%, 100%)
    - Color de la barra según el nivel
    - Texto del label
  - Mostrar el indicador solo cuando el campo contraseña tiene contenido
- [x] **3.7** Vincular event listeners:
  - `blur` en cada input → ejecutar su validación correspondiente
  - `input` en cada input → limpiar error si el campo se corrige, limpiar éxito si se modifica
  - `input` en campo contraseña → actualizar indicador de fuerza + re-validar confirmar contraseña si tiene contenido
  - `change` en checkbox de términos → limpiar error del checkbox si se marca
- [x] **3.8** Implementar submit del formulario:
  - `event.preventDefault()` 
  - Ejecutar todas las validaciones secuencialmente
  - Si todas pasan:
    - Deshabilitar botón, mostrar spinner, ocultar texto
    - Simular delay de 1.5s (como en `login.js`)
    - Mostrar mensaje de éxito "¡Cuenta creada! Redirigiendo..."
    - Reset del formulario después de 1.5s adicionales
  - Si alguna falla:
    - Hacer scroll al primer campo con error (`element.scrollIntoView({ behavior: 'smooth', block: 'center' })`)

#### Criterios de Aceptación
- ✅ Todos los campos se validan en `blur` y al enviar.
- ✅ Los errores se corrigen automáticamente al escribir (sin esperar nuevo `blur`).
- ✅ El indicador de fuerza actualiza en tiempo real con cada keystroke.
- ✅ El campo "confirmar contraseña" se re-valida si la contraseña original cambia.
- ✅ El scroll al primer error funciona suavemente en todos los breakpoints.
- ✅ No hay `console.error` ni excepciones no manejadas.

---

### FASE 4: Integración y Navegación
> **Objetivo:** Conectar la página de registro con el flujo de navegación existente del proyecto.

#### Checklist de Tareas

- [x] **4.1** Actualizar `login.html`:
  - Cambiar el `href="#"` del enlace "Regístrate gratis" (línea 146) por `href="registro.html"`
- [x] **4.2** Actualizar `registro.html`:
  - Verificar que el enlace "Inicia sesión" en el footer apunte a `login.html`
  - Verificar que el enlace "Volver a la página principal" apunte a `index.html`
- [x] **4.3** Verificar `index.html`:
  - Si existe un CTA de registro en la landing, actualizar su `href` a `registro.html`
- [x] **4.4** Revisar consistencia de navegación bidireccional:
  - Landing → Registro ✅
  - Login → Registro ✅ 
  - Registro → Login ✅
  - Registro → Landing ✅

#### Criterios de Aceptación
- ✅ Todos los enlaces entre páginas funcionan sin errores 404.
- ✅ No hay enlaces `href="#"` restantes que deberían apuntar a `registro.html`.
- ✅ La navegación es fluida y consistente.

---

### FASE 5: QA, Accesibilidad y Pulido Final
> **Objetivo:** Validar la calidad, accesibilidad y rendimiento de la página de registro.

#### Checklist de Tareas

- [x] **5.1** Validación de accesibilidad:
  - Navegar todo el formulario usando solo el teclado (Tab, Shift+Tab, Enter, Space)
  - Verificar que los focus rings (`focus-visible`) son visibles en todos los elementos interactivos
  - Verificar que los errores se anuncian por lectores de pantalla (`aria-live="assertive"`)
  - Comprobar contraste de colores con herramienta (ratio ≥ 4.5:1 texto normal, ≥ 3:1 texto grande)
- [x] **5.2** Pruebas de responsive:
  - Probar en viewport de 320px (iPhone SE)
  - Probar en viewport de 375px (iPhone estándar)
  - Probar en viewport de 768px (iPad portrait)
  - Probar en viewport de 1024px (iPad landscape / desktop pequeño)
  - Probar en viewport de 1440px (desktop estándar)
- [x] **5.3** Pruebas de validación del formulario:
  - Enviar formulario completamente vacío → todos los campos muestran error
  - Enviar con nombre de 1 carácter → error en nombre
  - Enviar con email inválido (`"abc"`, `"@test"`, `"test@"`) → error en email
  - Enviar con contraseña < 8 caracteres → error en contraseña
  - Enviar con contraseñas que no coinciden → error en confirmar contraseña
  - Enviar sin aceptar términos → error en checkbox
  - Corregir cada campo y verificar que el error se limpia automáticamente
  - Enviar formulario válido → spinner, mensaje de éxito, reset
- [x] **5.4** Pruebas de indicador de fuerza:
  - Contraseña `"12345678"` → Débil (rojo)
  - Contraseña `"Abc12345"` → Regular (ámbar)
  - Contraseña `"Abc12345!"` → Buena (ámbar-verde)
  - Contraseña `"MyP@ssw0rd!2026"` → Fuerte (verde)
  - Borrar contraseña → indicador se oculta
- [x] **5.5** Revisión visual final:
  - Verificar que la página se ve idéntica en estilo al login (misma identidad visual)
  - Verificar que los glows ambientales se ven correctamente
  - Verificar que las micro-animaciones de entrada funcionan suavemente
  - Verificar que no hay overflow horizontal en ningún breakpoint
  - Verificar que los botones sociales tienen hover effects
- [x] **5.6** Validación HTML:
  - Pasar el HTML por el validador W3C
  - Corregir cualquier warning o error
- [x] **5.7** Revisión de rendimiento:
  - Verificar que no se cargan recursos innecesarios
  - Verificar que las animaciones no causan jank (60fps)
  - Verificar que el CSS no tiene propiedades redundantes

#### Criterios de Aceptación
- ✅ La página cumple WCAG 2.1 AA en todos los criterios relevantes.
- ✅ Funciona correctamente en Chrome, Firefox, Safari y Edge.
- ✅ Sin errores en consola del navegador.
- ✅ Performance visual fluida (sin stuttering en animaciones).
- ✅ Coherencia visual 100% con la página de login existente.

---

## 📎 Referencias Técnicas

| Recurso | Ubicación |
|---------|-----------|
| Design Tokens | [css/tokens.css](../../css/tokens.css) |
| Componentes Base | [css/components.css](../../css/components.css) |
| Estilos Globales | [css/global.css](../../css/global.css) |
| Referencia de Login (HTML) | [login.html](../../login.html) |
| Referencia de Login (CSS) | [css/login.css](../../css/login.css) |
| Referencia de Login (JS) | [js/login.js](../../js/login.js) |
| Directrices del Agente | [agent.md](../../agent.md) |
| Skill UI/UX Designer | [SKILL.md](../../.agents/skills/ui-ux-designer/SKILL.md) |

---

## 📊 Resumen de Archivos

| Acción | Archivo | Descripción |
|--------|---------|-------------|
| 🆕 Crear | `registro.html` | Página de registro con estructura semántica |
| 🆕 Crear | `css/registro.css` | Estilos específicos mobile-first |
| 🆕 Crear | `js/registro.js` | Validación y lógica interactiva |
| ✏️ Modificar | `css/components.css` | Agregar componentes reutilizables si es necesario |
| ✏️ Modificar | `login.html` | Actualizar enlace de "Regístrate gratis" |
| 🔍 Revisar | `index.html` | Verificar/actualizar CTAs hacia registro |
