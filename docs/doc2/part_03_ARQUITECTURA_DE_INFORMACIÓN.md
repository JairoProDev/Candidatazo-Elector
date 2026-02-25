🏗️ PARTE 3: ARQUITECTURA DE INFORMACIÓN
3.1 - ESTRUCTURA DE NAVEGACIÓN
FILOSOFÍA: Progressive Disclosure
No mostrar todo a la vez
Revelar features conforme usuario avanza
Gamificación del descubrimiento
MOBILE NAV (Bottom Tab Bar - 5 items max):
┌─────────────────────────────┐
│                             │
│     CONTENT AREA            │
│                             │
│                             │
├─────┬─────┬─────┬─────┬────┤
│ 🏠  │ 🧬  │ ➕  │ 👥  │ 👤 │
│Inicio│ADN │Nuevo│Tribu│ Yo │
└─────┴─────┴─────┴─────┴────┘

INICIO:
- Feed personalizado
- Últimas noticias verificadas
- Debates próximos
- Quick actions

ADN (Political ADN Test):
- Start/Continue test
- Ver resultados
- Comparar con amigos
- Retake

NUEVO (Action Center):
- Fact-check algo
- Crear consulta ciudadana
- Reportar corrupción
- Invitar amigos

TRIBU (Community):
- Tu grupo político
- Debates activos
- Leaderboards
- Eventos

YO (Profile):
- Tus datos
- Achievements
- Settings
- Premium upgrade

DESKTOP NAV (Top + Sidebar):
┌──────────────────────────────────────────┐
│ Candidatazo  [Buscar]  🔔  👤               │
└──────────────────────────────────────────┘
│                                          │
│ ┌────────┬──────────────────────────────┤
│ │🏠 Inicio│                              │
│ │🧬 Mi ADN│     MAIN CONTENT             │
│ │🎯 Match │     (Wider, más data)        │
│ │🔍 Verify│                              │
│ │👥 Tribu │                              │
│ │📚 Aprende│                              │
│ │⚡ Rápido│                              │
│ │         │                              │
│ │━━━━━━━━│                              │
│ │📊 Stats │                              │
│ │🏆 Premios│                              │
│ │⚙️ Config│                              │
│ └────────┴──────────────────────────────┤

Sidebar width: 240px (collapsible to 64px icons-only)
Contenido: Usa espacio horizontal para dashboards

3.2 - JERARQUÍA DE CONTENIDO (Pirámide Invertida)
Level 1: HERO (Lo más importante primero)
Principio periodístico adaptado:
- Primera pantalla = gancho emocional + CTA
- 3 segundos para captar atención
- Grande, visual, emotivo

Ejemplos:
- Onboarding: "Descubre quién eres políticamente" + foto impactante
- Home: "73% de match con candidato sorpresa" (si tienes resultados)
- Fact-check: "FALSO" en grande rojo antes de explicación

Level 2: CORE INFO (Lo esencial)
- Explicación clara de hero
- Datos clave visualizados
- Primera acción posible

Regla: Párrafos <3 líneas
Si necesitas más, usar collapse/expand

Level 3: SUPPORTING (Detalles opcionales)
- Metodología
- Fuentes
- Contexto adicional
- FAQs

Presentación:
- Tabs
- Accordions  
- "Ver más" links
- Modals para deep dives

Level 4: META (Para nerds y profesionales)
- Data raw
- Exportar
- APIs
- Configuración avanzada

Escondido por default
Accesible via menu overflow "⋮"

3.3 - FLUJO DE ONBOARDING (Crítico para Retención)
OBJETIVO: De descarga a "aha moment" en <3 minutos
STEP 1: SPLASH (2 segundos)
┌──────────────────┐
│                  │
│    🏛️ Candidatazo    │
│                  │
│  Tu voz cuenta   │
│                  │
│   ⚡Loading...   │
└──────────────────┘

- Logo animado (fade in)
- Tagline emocional
- Progress bar real (cargando candidatos, etc.)

STEP 2: VALUE PROP (Swipeable - 3 screens, skippable)
Screen 1:
┌──────────────────┐
│   [Ilustración]  │
│  Persona confusa │
│                  │
│  36 candidatos?  │
│  Te ayudamos a   │
│  decidir         │
│                  │
│  ○ ○ ○  [Skip]  │
└──────────────────┘

Screen 2:
┌──────────────────┐
│   [Ilustración]  │
│   Fact-checker   │
│                  │
│  Verificamos la  │
│  verdad en       │
│  tiempo real     │
│                  │
│  ○ ● ○  [Skip]  │
└──────────────────┘

Screen 3:
┌──────────────────┐
│   [Ilustración]  │
│  Comunidad       │
│                  │
│  Encuentra tu    │
│  tribu política  │
│  y participa     │
│                  │
│  ○ ○ ●  [Empezar]│
└──────────────────┘

Interacción:
- Swipe horizontal (familiar)
- Auto-advance 3 seg (pero pausable)
- Skip siempre visible (respeto)

STEP 3: QUICK SIGNUP (Friction mínimo)
┌──────────────────────────┐
│ Regístrate en 10 segundos│
│                          │
│ [📱 Continuar con Google]│
│ [📘 Continuar con Facebook]│
│ [📧 Usar email]          │
│                          │
│ Al continuar, aceptas... │
│ Términos | Privacidad    │
└──────────────────────────┘

Orden estratégico:
1. Google (más usado en Android)
2. Facebook (más usado en +40)
3. Email (para paranoides)

Privacy note: Pequeño, legal, link

STEP 4: PERSONALIZACIÓN BÁSICA (Captura data crítica)
Screen A - Ubicación:
┌──────────────────────────┐
│ ¿Dónde votas?            │
│                          │
│ [Departamento ▼]         │
│ Lima ▼                   │
│                          │
│ [Provincia ▼]            │
│ Lima ▼                   │
│                          │
│ [Auto-detectar GPS] 📍   │
│                          │
│         [Continuar →]    │
└──────────────────────────┘

Screen B - Edad:
┌──────────────────────────┐
│ ¿Cuántos años tienes?    │
│                          │
│  [18-25] [26-40]        │
│  [41-55] [56+]          │
│                          │
│  💡 Esto ajusta la app   │
│     a tu experiencia     │
│                          │
│         [Continuar →]    │
└──────────────────────────┘

Screen C - Interés:
┌──────────────────────────┐
│ ¿Qué te interesa más?    │
│                          │
│ ☑️ Economía              │
│ ☐ Seguridad             │
│ ☑️ Educación            │
│ ☐ Salud                 │
│ ☑️ Medio Ambiente       │
│ ☐ Derechos Sociales     │
│                          │
│ (Selecciona 2-3)         │
│         [Listo →]        │
└──────────────────────────┘

Por qué este orden:
1. Ubicación = esencial para matching
2. Edad = ajusta UI/UX
3. Intereses = personaliza contenido

STEP 5: AHA MOMENT (Entrega valor INMEDIATO)
┌──────────────────────────┐
│ ✨ Tu feed está listo    │
│                          │
│ Basado en tus intereses: │
│                          │
│ ┌──────────────────────┐ │
│ │📰 Debate sobre       │ │
│ │   educación hoy 8PM  │ │
│ │   [Ver detalles]     │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │🎯 3 candidatos       │ │
│ │   priorizan economía │ │
│ │   [Ver quiénes]      │ │
│ └──────────────────────┘ │
│                          │
│    [Empezar ADN Test →] │
│    [Explorar app]        │
└──────────────────────────┘

Inmediatamente:
- Contenido relevante (no genérico)
- CTA claro al siguiente paso
- Sensación de "esto me entiende"

STEP 6: GENTLE PUSH AL CORE FEATURE
┌──────────────────────────┐
│ 🧬 Descubre tu ADN       │
│    Político              │
│                          │
│ [Animación ADN helix]    │
│                          │
│ 30 preguntas             │
│ 5 minutos                │
│ Resultados compartibles  │
│                          │
│ [Empezar ahora]          │
│ [Recordarme luego]       │
└──────────────────────────┘

Nota: "Recordarme luego" = NO perder usuario
Push notification después de 2 horas