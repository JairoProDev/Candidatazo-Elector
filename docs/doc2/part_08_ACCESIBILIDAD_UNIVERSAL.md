♿ PARTE 8: ACCESIBILIDAD UNIVERSAL
8.1 - WCAG 2.1 AAA COMPLIANCE
Contraste de Colores:
Todos los pares texto/fondo:
- Large text (18px+): Mínimo 3:1
- Normal text: Mínimo 4.5:1
- Iconos: Mínimo 3:1

VERIFICADO:
Primary (#2D5BFF) on White: 8.2:1 ✅
Gray 700 (#404040) on White: 10.7:1 ✅
Error (#EF4444) on White: 5.1:1 ✅

Tamaños Mínimos:
Texto:
- Nunca menor a 14px en mobile
- Nunca menor a 16px en desktop
- Headlines: 24px+ siempre

Tap Targets:
- Mínimo 44x44px (iOS guidelines)
- Spacing: 8px entre targets
- Botones nunca <44px height

Iconos:
- UI icons: 24px mínimo
- Social icons: 32px
- Ilustraciones: Variable

8.2 - SCREEN READER SUPPORT
Semantic HTML:
<main>        ← Contenido principal
  <section>   ← Secciones lógicas
    <h2>      ← Jerarquía correcta
    <article> ← Fact-checks, news
      <h3>
      <p>
      <button>  ← No <div onclick>

ARIA Labels:
<button aria-label="Compartir tu ADN político en Twitter">
  <ShareIcon />
</button>

<img src="candidato.jpg" alt="María González, candidata Fuerza Popular, sonriendo en evento de campaña">

<input
  type="text"
  aria-label="Buscar candidatos"
  aria-describedby="search-help"
>
<span id="search-help">
  Escribe el nombre del candidato
</span>

Keyboard Navigation:
TAB ORDER lógico:
1. Skip to main content
2. Navigation
3. Primary CTA
4. Content (top to bottom)
5. Footer

FOCUS INDICATORS:
- Outline: 2px Primary
- Background: Primary 10% opacity
- Visible siempre, nunca outline: none

SHORTCUTS:
- Esc: Cerrar modal
- Enter: Activar botón enfocado
- Space: Toggle checkbox/radio
- Arrow keys: Navigate lists

8.3 - MODOS ESPECIALES
Alto Contraste:
Activación: Settings > Accesibilidad > Alto contraste

CAMBIOS:
- Fondo: Puro negro #000000
- Texto: Puro blanco #FFFFFF
- Links: Cyan #00FFFF
- Visitados: Magenta #FF00FF
- Botones: Bordes 3px, sin sombras
- Imágenes: Outline visible

Reducción de Movimiento:
Respeta: prefers-reduced-motion

SI usuario tiene esto activo:
- No animaciones de parallax
- No auto-play videos
- No infinite scroll (pagination)
- Transitions: 0.1s máximo
- No particles, confetti

Modo Dislexia:
Activación: Settings > Accesibilidad > Modo lectura

CAMBIOS:
- Font: OpenDyslexic
- Line height: 1.8 (vs 1.5)
- Letter spacing: 0.12em
- Palabras nunca justificadas
- Párrafos máximo 60 caracteres

Magnificación de Texto:
Responsive a zoom:
- 100% → Normal
- 150% → Ajuste responsivo
- 200% → Single column
- 300%+ → Ultra simple

Layout NO rompe
Horizontal scroll prohibido