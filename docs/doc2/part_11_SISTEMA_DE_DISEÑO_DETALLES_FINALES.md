🎨 PARTE 11: SISTEMA DE DISEÑO - DETALLES FINALES
11.1 - ICONOGRAFÍA
Estilo de Íconos:
SISTEMA: Lucide Icons (React/Vue)
https://lucide.dev

CARACTERÍSTICAS:
- Outline style (no filled)
- 24x24px default
- Stroke width: 2px
- Consistentes, modernos
- Open source

ICONOS CLAVE:
🏠 Home
🧬 DNA (helix)
🎯 Target (matching)
✓ Check (verificado)
✗ X (falso)
⚠ Alert-triangle (dudoso)
👥 Users (comunidad)
📊 Bar-chart (stats)
🏆 Trophy (achievements)
⚡ Zap (quick actions)

Custom Icons:
Cuando Lucide no tiene lo necesario:

DISEÑO CUSTOM:
- Mismo stroke width (2px)
- Mismo grid (24x24px)
- Esquinas redondeadas (matching)
- Exportar como SVG inline

EJEMPLO - Ícono "Political Spectrum":
<svg viewBox="0 0 24 24" stroke-width="2">
  <path d="M 3,12 L 21,12" /> ← Línea horizontal
  <circle cx="8" cy="12" r="2" /> ← Punto izquierda
  <circle cx="16" cy="12" r="2" /> ← Punto derecha
</svg>

11.2 - ILUSTRACIONES
Estilo Visual:
ESTILO: Geometric, modern, minimal
COLORES: Primarios de la paleta
COMPLEJIDAD: Media (ni muy simple ni muy detallado)

USOS:
- Onboarding screens
- Empty states
- Error pages
- Achievement unlocks

TÉCNICA:
- Vectorial (SVG)
- Max 3 colores por ilustración
- Animatable (si necesario)

EJEMPLO - Empty State:
"No has guardado candidatos aún"
[Ilustración: Persona mirando lista vacía]
Colores: Primary + Purple + Gray
Mood: Friendly, not sad

Personas/Avatars:
DEFAULT AVATARS:
- Generados con initiales
- Background: Random from palette
- Text: White, bold

EJEMPLO:
┌────────┐
│   MG   │ ← María González
│        │   Background: Primary
└────────┘

CUSTOM AVATARS:
- Upload foto
- Auto-crop circular
- Compresión optimizada

11.3 - MICROINTERACCIONES
Like/Heart Animation:
ESTADOS:
1. Idle: ♡ outline, gray
2. Hover: ♡ outline, primary, scale 110%
3. Click: ♥ filled, primary
   - Pop animation (scale 130% → 100%)
   - Rotation (0° → 360°)
   - Partículas pequeñas
   - Haptic feedback (mobile)
4. Active: ♥ filled, primary

TIMING:
- Total animation: 0.4s
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

Pull to Refresh:
MOBILE:
1. Pull down → Arrow ↓ aparece
2. Pull más → Arrow gira 180° (↑)
3. Release → Spinner reemplaza arrow
4. Mientras carga → Spinner
5. Completado → ✓ Check (0.5s) → Desaparece

SATISFACCIÓN:
- Feedback visual claro
- Haptic al release
- Smooth animations

Swipe Actions (Mobile):
En cards (ejemplo: candidato guardado):

SWIPE LEFT:
┌────────────────────────────┐
│ [Card]                  ❌ │ ← Reveal delete
└────────────────────────────┘
Swipe 50%+ → Auto-complete delete
Swipe <50% → Snap back

SWIPE RIGHT:
┌────────────────────────────┐
│ ⭐ [Card]                  │ ← Reveal favorite
└────────────────────────────┘

VISUAL:
- Background color reveals
- Icon fades in
- Haptic at 50% threshold

11.4 - RESPONSIVE BREAKPOINTS
Grid System:
BREAKPOINTS:
- xs: 0-639px (Mobile)
- sm: 640-767px (Large mobile)
- md: 768-1023px (Tablet)
- lg: 1024-1279px (Small desktop)
- xl: 1280-1535px (Desktop)
- 2xl: 1536px+ (Large desktop)

CONTAINER MAX-WIDTHS:
- xs: 100% (no max)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

PADDING:
- xs/sm: 16px
- md: 24px
- lg/xl/2xl: 48px

COLUMNS:
- xs: 4 columns
- sm: 6 columns
- md: 8 columns
- lg: 12 columns
- xl/2xl: 12 columns

Component Adaptations:
NAVIGATION:
xs/sm: Bottom tab bar
md+: Top nav + sidebar

CARDS:
xs: 1 column, stack
sm: 1-2 columns
md: 2 columns
lg: 2-3 columns
xl: 3-4 columns

MODALS:
xs/sm: Full screen / bottom sheet
md+: Centered modal, max 600px

TABLES:
xs/sm: Convert to cards
md+: Actual table


🚀 CONCLUSIÓN Y PRÓXIMOS PASOS
Jairo, este es el diseño más completo y pensado que he creado. Hemos cubierto:
✅ Sistema de diseño profesional (colores, tipografía, espaciado) ✅ Arquitectura de información (navegación, jerarquía) ✅ Diseños mobile-first detallados ✅ Diseños desktop-specific aprovechando espacio ✅ Componentes reutilizables (botones, cards, forms) ✅ Patrones de interacción (microinteracciones, gestures) ✅ Psicología y persuasión integradas ✅ Accesibilidad universal (WCAG AAA) ✅ Viralidad by design (share mechanics, referrals) ✅ Confianza y transparencia (privacidad, fuentes) ✅ Detalles finales (iconos, ilustraciones)
ESTE DISEÑO LOGRA:
♿ Usable por abuelitas de 60 y jóvenes de 18
🎯 Intuitivo sin tutorial
🔥 Adictivo con gamificación
📤 Viral con share mechanics
🏆 Diferenciado (océano azul)
🛡️ Defensible con network effects
PARA IMPLEMENTAR:
Paso 1: Crear design tokens (colores, tipografía en código)
Paso 1-2: Componentes base (buttons, cards, inputs)
Paso  2: Pantallas core (onboarding, DNA test, match)
Paso 3: Features secundarias (fact-check, community)
Paso 3-4: Polish (animaciones, microinteracciones)
¿Necesitas que profundice en alguna sección específica? ¿O pasamos a la arquitectura técnica (stack, base de datos, APIs)?