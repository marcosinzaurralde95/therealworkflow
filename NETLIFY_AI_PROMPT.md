# Netlify AI Context — IA Tools 2026

## Proyecto

**IA Tools 2026** es un sitio web tipo guía/directorio que cataloga y compara **91+ herramientas de Inteligencia Artificial** para el año 2026. El contenido está en **español** y el autor es **Marcos Inzaurralde**. El sitio tiene licencia Creative Commons BY-SA 4.0.

El objetivo del sitio es ser una **referencia exhaustiva, visual y premium** para profesionales, startups y empresas que quieren adoptar herramientas de IA de forma estratégica.

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 19.2 | UI framework |
| **Vite** | 7.3 | Build tool + dev server |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 12.x | Animaciones y transiciones |
| **Lucide React** | 0.564 | Iconografía (ArrowRight, Star, Cpu, Globe, Search, ChevronDown, ChevronUp) |
| **react-markdown** | 10.x | Renderizado de contenido markdown |
| **remark-gfm** | 4.x | Soporte para tablas GFM en markdown |
| **clsx + tailwind-merge** | latest | Merge condicional de clases Tailwind |
| **PostCSS + Autoprefixer** | latest | Procesamiento CSS |

**Build command:** `npm run build` → produce `dist/`
**Dev command:** `npm run dev`

---

## Arquitectura del Proyecto

```
src/
├── App.jsx              # Componente raíz: Layout > Hero > ToolGrid > Sections
├── App.css              # Estilos legacy (no activos, del boilerplate Vite)
├── index.css            # Design tokens CSS variables + Tailwind base
├── main.jsx             # Entry point React
├── components/
│   ├── Layout.jsx       # Shell principal: nav + main + footer + grid background
│   ├── Hero.jsx         # Sección héroe con animación fade-in
│   ├── ToolCard.jsx     # Tarjeta individual de herramienta IA
│   ├── ToolGrid.jsx     # Grid de tarjetas con buscador/filtro
│   ├── Section.jsx      # Sección colapsable accordion para categorías
│   └── MarkdownRenderer.jsx  # Renderizador markdown con estilos prose
├── data/
│   ├── content.json     # Contenido estructurado (hero, topTools, categories)
│   └── raw.md           # Contenido original en markdown
└── lib/
    └── utils.js         # Utility: cn() para clsx + tailwind-merge
```

---

## Sistema de Diseño y Estilo Visual

### Filosofía de Diseño
- **Dark mode exclusivo** — No hay light mode. El sitio siempre es oscuro.
- **Estética premium/tech** — Inspirado en dashboards de herramientas developer como Linear, Vercel, y Raycast.
- **Glassmorphism sutil** — Fondos con `backdrop-blur-sm` y bordes `border-white/5`.
- **Grid de fondo** — Patrón de cuadrícula sutil con líneas `#80808012` cada 24px.
- **Micro-animaciones** — Todo usa Framer Motion con `whileInView`, `initial/animate`, transiciones suaves.

### Paleta de Colores (HSL CSS Variables)

```css
/* MODO OSCURO (siempre activo) */
--background: 222.2 84% 4.9%;       /* slate-950 — Fondo principal */
--foreground: 210 40% 98%;           /* Texto principal */
--card: 222.2 84% 4.9%;             /* Fondo tarjetas */
--card-foreground: 210 40% 98%;      /* Texto tarjetas */
--primary: 210 40% 98%;              /* Elementos primarios */
--secondary: 217.2 32.6% 17.5%;      /* Fondos secundarios */
--muted: 217.2 32.6% 17.5%;          /* Elementos silenciados */
--muted-foreground: 215 20.2% 65.1%; /* Texto secundario */
--border: 217.2 32.6% 17.5%;         /* Bordes */
--ring: 212.7 26.8% 83.9%;           /* Focus rings */
--radius: 0.5rem;                    /* Border radius base */
```

### Colores Tailwind usados directamente

| Color | Uso |
|---|---|
| `slate-950` | Fondo principal del body |
| `slate-900` | Fondo de tarjetas, secciones, inputs |
| `slate-900/50` | Fondos con transparencia |
| `slate-800` | Bordes, separadores, tags |
| `slate-700` | Bordes de tablas |
| `slate-500` | Texto terciario, placeholders |
| `slate-400` | Texto secundario, subtítulos |
| `slate-200` | Texto en thead de tablas |
| `white` | Títulos principales, texto bold |
| **`indigo-500`** | **Color accent primario** — bordes hover, badges, barra vertical en secciones |
| `indigo-500/50` | Focus rings, bordes hover |
| `indigo-500/30` | Selection text highlight |
| `indigo-500/20` | Bordes sutiles en badges |
| `indigo-500/10` | Fondos de iconos |
| `indigo-500/5` | Overlay hover en tarjetas |
| `indigo-400` | Links, texto accent, iconos activos |
| `indigo-300` | Subtítulos, código inline, hover links |
| `indigo-200` | Hover en títulos de tarjetas |
| `indigo-100` | Headings en prose |
| `amber-400` | Ratings/estrellas |
| `amber-400/10` | Fondo del badge de rating |
| `blue-400` → `indigo-400` | Gradiente del logo en navbar |

### Tipografía
- **Font family:** `font-sans` (system font stack de Tailwind).
- **Títulos:** `font-extrabold`, `tracking-tight` (hero), `font-bold` (secciones).
- **Badges/tags:** `text-xs`, `font-medium`, `tracking-wider`, `uppercase`.
- **Cuerpo:** `text-sm` a `text-base`, `prose prose-invert prose-slate`.
- **Código inline:** `font-mono` en precios.

### Componentes — Patrones de Estilo

#### Tarjetas (ToolCard)
```
- Fondo: bg-slate-900
- Borde: border border-slate-800 rounded-2xl
- Hover: hover:border-indigo-500/50 + overlay bg-indigo-500/5
- Padding: p-6
- Animación: whileInView scale 0.9→1, opacity 0→1
- Icono: bg-indigo-500/10 rounded-lg, text-indigo-400
- Rating badge: text-amber-400, bg-amber-400/10, Star icon filled
- Tags: bg-slate-800 text-slate-400 rounded-md border border-slate-700
- Footer: border-t border-slate-800, precio en font-mono
- CTA: text-indigo-400 hover:text-indigo-300 + ArrowRight icon
```

#### Secciones Colapsables (Section)
```
- Container: border border-white/5, bg-slate-900/40, rounded-xl, backdrop-blur-sm
- Header: clickable, hover:bg-white/5
- Título: text-2xl font-bold, barra vertical indigo-500 rounded-full a la izquierda
- Chevron: text-slate-500
- Content: p-6, border-t border-white/5
- Animación: whileInView, y: 20→0
```

#### Hero
```
- Badge: bg-indigo-500/10, border border-indigo-500/20, text-indigo-400, uppercase tracking-wider
- Título: text-4xl md:text-6xl font-extrabold tracking-tight text-white
- Subtítulo: text-xl text-slate-400
- Metadata pills: bg-slate-900/50 rounded-lg border border-white/5
- Animación: fade-in + slide-up (y: 20→0)
```

#### Layout
```
- Background: bg-slate-950
- Patrón grid: linear-gradient lines #80808012, 24px spacing, pointer-events-none
- Navbar: border-b border-white/10, logo con gradiente blue-400→indigo-400
- Footer: border-t border-white/10, text-slate-500
- Max width: max-w-7xl mx-auto
- Padding responsivo: px-4 sm:px-6 lg:px-8
```

#### Buscador (ToolGrid)
```
- Input: bg-slate-900/60, border border-slate-800, rounded-lg
- Placeholder: placeholder-slate-500
- Focus: ring-2 ring-indigo-500/50 border-indigo-500/50
- Icono Search: text-slate-500, absolute left
- Counter badge: bg-slate-900 border border-slate-800 rounded-full
```

#### Markdown Content
```
- Base: prose prose-invert prose-slate max-w-none
- Headings: prose-headings:text-indigo-100
- Links: text-indigo-400 hover:underline
- Strong: prose-strong:text-white
- Tables: overflow-x-auto, border border-slate-800 rounded-lg
- Thead: bg-slate-900/50 text-slate-200
- Th: font-semibold, border-b border-slate-700
- Td: text-slate-400, border-b border-slate-800
- Blockquote: border-l-4 border-indigo-500, bg-slate-900/30 rounded-r-lg
- Code inline: bg-slate-800 text-indigo-300 rounded
- Code block: bg-slate-950 border border-slate-800 rounded-lg
```

### Separadores
```
- Horizontal rule entre secciones: h-px bg-slate-800
- Con texto centrado: flex items-center gap-4, texto uppercase tracking-widest text-slate-400
```

---

## Contenido y Estructura de Datos

El sitio consume `src/data/content.json` con esta estructura:

```json
{
  "hero": {
    "title": "HERRAMIENTAS DE INTELIGENCIA ARTIFICIAL 2026",
    "subtitle": "Guía Completa, Detallada y Exhaustiva",
    "metadata": {}
  },
  "topTools": [...],       // Array de herramientas destacadas
  "categories": [          // Secciones de contenido
    {
      "title": "🎯 INTRODUCCIÓN DETALLADA",
      "content": [
        {
          "subtitle": "**El Panorama de IA en 2026**",
          "text": ["línea 1", "línea 2", ...]
        }
      ]
    }
  ]
}
```

### Categorías del contenido:
1. 🎯 Introducción Detallada
2. 🧠 Modelos de Lenguaje & IA Autónoma
3. 🎨 Generación de Contenido (texto, imágenes, video, audio)
4. 💻 Desarrollo & Programación
5. 🔄 Automatización & Flujos de Trabajo
6. 📊 Gestión de Proyectos & Productividad
7. 💰 Estimador de Presupuesto
8. 🚀 Roadmap Profesional
9. ⚠️ Trampas Comunes y Soluciones
10. 📖 Recursos Adicionales
11. ✨ Conclusión Final
12. 📎 Apéndices

---

## Idioma y Tono

- **Idioma:** Español (la UI y todo el contenido están en español).
- **Tono:** Profesional pero accesible. Directo, práctico, orientado a decisiones.
- **Pronombre:** Segunda persona informal (tú/vos).
- **Emojis:** Se usan extensivamente en títulos de categorías como identificadores visuales.
- **Terminología técnica:** Se mantiene en inglés cuando es estándar (LLM, API, open source, stack, ROI, etc).

---

## Reglas de Estilo para IA de Netlify

1. **SIEMPRE dark mode.** Nunca sugerir estilos claros. Fondos siempre slate-950 o slate-900.
2. **Color accent = indigo.** Todo elemento interactivo, focus, hover, CTA, y accent usa la familia indigo (400–500 primariamente).
3. **Bordes sutiles.** Usar `border-white/5` o `border-white/10` en vez de bordes sólidos visibles.
4. **Sin efectos bruscos.** Toda animación es suave: duración 0.3–0.5s, easing ease-out.
5. **Componentes con glassmorphism.** Usar `backdrop-blur-sm` + fondos con transparencia (ej: `bg-slate-900/40`).
6. **Grid background siempre presente.** El patrón de cuadrícula debe mantenerse como capa decorativa.
7. **Usar Framer Motion** para animaciones, no CSS animations directas (excepto keyframes del Tailwind config).
8. **Markdown es ciudadano de primera clase.** El contenido viene en markdown; siempre renderizar con estilos prose-invert completos.
9. **Tablas estilizadas.** Las tablas comparativas son centrales al contenido; deben verse premium con bordes redondeados y fondos alternados.
10. **Espaciado generoso.** Secciones con `space-y-20`, secciones internas con `space-y-6`. No comprimir contenido.
11. **Responsive.** Grid de tarjetas: 1 columna mobile, 2 columnas en md+. Max-width 7xl centrado.
12. **Iconos de Lucide.** No usar otros icon packs. Lucide-react es el estándar del proyecto.
13. **Utility function `cn()`** para merge de clases Tailwind (clsx + tailwind-merge).
14. **Contenido en español.** Labels de UI como "Buscar herramientas, tags...", "Ver análisis", "Top Herramientas", "Guía Completa", etc.
15. **El rating usa estrellas amber.** Star icon llenado, texto amber-400, fondo amber-400/10.

---

## Qué NO hacer

- ❌ No usar light mode ni colores claros de fondo.
- ❌ No usar TailwindCSS v4 syntax (el proyecto usa v3).
- ❌ No usar CSS-in-JS, styled-components, ni otro sistema de estilos.
- ❌ No remover la capa de grid background decorativa.
- ❌ No usar iconos que no sean de lucide-react.
- ❌ No cambiar el idioma a inglés.
- ❌ No simplificar la estética — el sitio debe verse premium y sofisticado.
- ❌ No usar colores primarios genéricos (rojo, azul puro, verde básico).
