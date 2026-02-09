🎮 PARTE 6: COMPONENTES Y PATRONES DE INTERACCIÓN
6.1 - SISTEMA DE BOTONES
Jerarquía de CTAs:
PRIMARY (Acciones principales):
┌─────────────────────────┐
│   Empezar DNA Test →    │ ← Lleno, Primary color
└─────────────────────────┘   Bold text, shadow Level 2
Hover: Elevate + darken 10%
Pressed: Scale 98%

SECONDARY (Acciones alternativas):
┌─────────────────────────┐
│     Ver detalles        │ ← Outline, Primary color
└─────────────────────────┘   Medium text, no shadow
Hover: Fondo primary 10% opacity
Pressed: 20% opacity

TERTIARY (Acciones terciarias):
Ver más →                    ← Solo text, no bordes
                                Underline on hover

DESTRUCTIVE (Acciones peligrosas):
┌─────────────────────────┐
│    Eliminar cuenta      │ ← Error color
└─────────────────────────┘   Require confirmation

SIZES:
- Large: 56px height (mobile thumbs)
- Medium: 44px height (default)
- Small: 32px height (secondary actions)
- Tiny: 24px height (inline actions)

ESTADOS:
- Default: Normal
- Hover: Cursor pointer, elevate
- Pressed: Scale down
- Loading: Spinner + disabled
- Disabled: 40% opacity, no pointer
- Success: ✓ checkmark animado

6.2 - CARDS (Building Block Principal)
Anatomía de Card:
┌────────────────────────────┐
│ [Optional: Image/Visual]   │ ← Header visual (0-200px)
├────────────────────────────┤
│ 🏷️ CATEGORY BADGE         │ ← Pequeño, colored
│                            │
│ Headline Text              │ ← Bold, 18-24px
│                            │
│ Supporting description     │ ← Regular, 14-16px
│ text that explains the...  │   Max 3 líneas
│                            │
│ ━━━ Metadata ━━━          │ ← Divider opcional
│                            │
│ 👤 Author  ⏰ 2h ago       │ ← Icons + text pequeño
│                            │
├────────────────────────────┤
│ [Primary CTA] [Secondary]  │ ← Footer actions
└────────────────────────────┘

VARIANTES:
- Fact-Check Card: Badge de verdad en header
- Candidate Card: Foto circular, % match
- News Card: Imagen full-bleed, timestamp
- Achievement Card: Ilustración, progress bar
- Community Card: Avatars stack, member count

INTERACCIONES:
- Hover: Elevate shadow
- Click: Navigate o expand
- Long-press: Context menu (mobile)
- Swipe: Quick actions (mobile)

6.3 - FORMULARIOS E INPUTS
Text Input:
IDLE STATE:
┌────────────────────────────┐
│ Buscar candidato...        │ ← Placeholder gray
└────────────────────────────┘
Border: 1px Gray 300

FOCUSED STATE:
┌────────────────────────────┐
│ María│                     │ ← Texto ingresado
└────────────────────────────┘
Border: 2px Primary
Label: Sube arriba (floating)

ERROR STATE:
┌────────────────────────────┐
│ [email mal formado]        │
└────────────────────────────┘
Border: 2px Error
❌ Mensaje de error debajo

SUCCESS STATE:
┌────────────────────────────┐
│ maria@gmail.com            │
└────────────────────────────┘
Border: 2px Success
✅ Sin mensaje (obvio que está bien)

DISABLED STATE:
┌────────────────────────────┐
│ [No editable]              │
└────────────────────────────┘
Background: Gray 100
Opacity: 60%

Select/Dropdown:
┌────────────────────────────┐
│ Departamento         ▼     │ ← Chevron indica acción
└────────────────────────────┘

ABIERTO:
┌────────────────────────────┐
│ Departamento         ▲     │
├────────────────────────────┤
│ 🔍 Buscar...              │ ← Searchable
├────────────────────────────┤
│ Lima ✓                     │ ← Checkmark si selected
│ Cusco                      │
│ Arequipa                   │
│ ...                        │
└────────────────────────────┘
Max height: 300px, scroll dentro

Radio Buttons (DNA Test):
○ Totalmente de acuerdo      ← Empty circle
● De acuerdo                  ← Filled cuando selected
○ Neutral
○ En desacuerdo
○ Totalmente en desacuerdo

Tamaño: 24px circles
Tap target: 44px (área alrededor)
Spacing: 16px entre opciones

Checkboxes (Multi-select):
☐ Economía                    ← Empty
☑ Educación                   ← Checked
☐ Salud

Mismo sizing que radios
Permite multiple selection

Sliders (Para ajustes):
Importancia de Economía:
━━━━●━━━━━━━━━━━━━━
Baja         Alta

Track: 4px height, Gray 300
Thumb: 20px circle, Primary
Active: Toda la track se llena
Value label: Aparece on drag

6.4 - MODALS Y OVERLAYS
Modal Structure:
┌────────────────────────────┐ ← Overlay 60% black
│                            │
│  ┌──────────────────────┐  │
│  │ ✕                    │  │ ← Close button
│  │                      │  │
│  │ TÍTULO DEL MODAL     │  │ ← Header 24px
│  │                      │  │
│  ├──────────────────────┤  │
│  │                      │  │
│  │ Contenido scrollable │  │ ← Body
│  │ del modal...         │  │   Max 80vh
│  │                      │  │
│  ├──────────────────────┤  │
│  │ [Cancel] [Confirmar] │  │ ← Footer sticky
│  └──────────────────────┘  │
│                            │
└────────────────────────────┘

ANIMACIÓN:
- Aparece: Fade in + scale from 95%
- Desaparece: Fade out + scale to 95%
- Duration: 0.2s ease

MOBILE:
- Bottom sheet preferido
- Deslizar para cerrar

Bottom Sheet (Mobile-Specific):
┌────────────────────────────┐
│                            │
│ [Contenido principal]      │
│                            │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Drag handle
├────────────────────────────┤
│                            │
│ ━                          │ ← Handle visual
│                            │
│ OPCIONES                   │
│                            │
│ ⚙️ Configuración           │
│ 📤 Compartir               │
│ ❌ Reportar                │
│                            │
└────────────────────────────┘

Gesture: Swipe down to dismiss
Snap points: 25%, 50%, 100%

Toast Notifications:
Mobile (Bottom):
┌────────────────────────────┐
│                            │
│ [Contenido]                │
│                            │
┌────────────────────────────┐ ← Slide up from bottom
│ ✅ Guardado exitosamente   │   Auto-dismiss 3 seg
└────────────────────────────┘

Desktop (Top-Right):
                 ┌──────────────────┐
                 │ ✅ Guardado!     │ ← Fade in
                 │ [Deshacer]       │   Stack múltiples
                 └──────────────────┘

TIPOS:
- Success: ✅ Green background
- Error: ❌ Red background
- Warning: ⚠️ Yellow background
- Info: ℹ️ Blue background

6.5 - LOADING STATES
Skeleton Screens (Preferred):
CARD SKELETON:
┌────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓        │ ← Gray shimmer
│                            │   Animado left→right
│ ▓▓▓▓▓▓▓▓▓▓▓▓              │
│ ▓▓▓▓▓▓▓▓                  │
│                            │
│ ▓▓▓▓  ▓▓▓▓▓▓              │
└────────────────────────────┘

Ventaja: Muestra estructura
Usuario sabe qué esperar

Spinners (Cuando necesario):
INLINE SPINNER:
Loading... ⚪ ← Small 16px, Primary color

FULL-SCREEN LOADER:
┌────────────────────────────┐
│                            │
│         ⚪⚪⚪              │ ← Animated dots
│      Cargando...          │   o Candidatazo logo pulse
│                            │
└────────────────────────────┘

Progress Bars:
DETERMINATE (Sabemos %)
Subiendo archivo...
████████░░░░░░░░░░░░  42%

INDETERMINATE (No sabemos cuánto falta)
Procesando...
▓▓▓▓▓▓░░░░░░░░░░░░░░  ← Shimmer infinito