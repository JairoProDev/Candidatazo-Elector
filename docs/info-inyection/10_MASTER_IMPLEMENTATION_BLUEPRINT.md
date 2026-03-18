# CANDIDATAZO — MASTER IMPLEMENTATION BLUEPRINT
## For Claude Code | Version 1.0 | 18 marzo 2026
## "Build the platform that 27 million Peruvians can't stop using"

---

# TABLE OF CONTENTS

1. [CONTEXT & CURRENT STATE](#context)
2. [CRITICAL DATA FIX — DO THIS FIRST](#data-fix)
3. [ARCHITECTURE OVERVIEW](#architecture)
4. [PHASE 1: DATA INJECTION & CANDIDATE DATABASE](#phase-1)
5. [PHASE 2: ENHANCED CANDIDATE PROFILES](#phase-2)
6. [PHASE 3: LIVE ELECTION DASHBOARD](#phase-3)
7. [PHASE 4: SIMULADOR DE CÉDULA](#phase-4)
8. [PHASE 5: ENHANCED PREDICTOR](#phase-5)
9. [PHASE 6: GAMIFICATION ENGINE OVERHAUL](#phase-6)
10. [PHASE 7: VIRAL SHARING SYSTEM](#phase-7)
11. [PHASE 8: VERIFICADOR DE DATOS 2.0](#phase-8)
12. [PHASE 9: ACADEMIA CÍVICA EXPANSION](#phase-9)
13. [PHASE 10: COUNTDOWN & URGENCY ENGINE](#phase-10)
14. [DESIGN SYSTEM & UX PRINCIPLES](#design-system)
15. [ANIMATION & MICROINTERACTION SPEC](#animations)
16. [DOPAMINE LOOP ARCHITECTURE](#dopamine)
17. [SHAREABILITY ENGINEERING](#shareability)
18. [PERFORMANCE & ACCESSIBILITY](#performance)
19. [LAUNCH CHECKLIST](#launch)

---

<a name="context"></a>
# 1. CONTEXT & CURRENT STATE

## What Candidatazo IS
A civic technology platform for Peru's April 12, 2026 elections. Web-first (Next.js / React), designed to help 27.3 million voters make informed decisions. The platform must feel like a product from the future — addictive, beautiful, gamified, and genuinely useful.

## Tech Stack (Current)
- **Frontend:** React (web), likely Next.js or Vite
- **Backend:** Fastify + PostgreSQL + Prisma ORM + Redis
- **AI:** Gemini Flash 2.0 API
- **Styling:** Tailwind CSS (or similar utility-first)
- **State:** Zustand / React Query
- **Charts:** Victory / Recharts / D3

## Current Pages (from screenshots)
1. **Homepage** — Hero + Quick Match CTA + Academia Cívica preview + Verificaciones recientes
2. **Candidatos** — Grid of 24+ candidate cards with 5-dimension radar bars
3. **Verificador** — Fact-check feed with verdicts (Verdadero, Falso, A medias, Engañoso)
4. **Simulador IA** — Chat with AI candidates (select candidate → chat interface)
5. **Predictor** — Community voting predictions with regional breakdown
6. **Guía Cívica / Academia** — 8 courses with XP system and levels
7. **ADN Completo** — Full political DNA test

## Navigation Structure (Current)
```
Quick Match | Candidatos | Verificador | Simulador IA | ADN Completo | Predictor | Guía Cívica
```
Plus: "Mi Match" CTA button (top right, red)

## The Problem (URGENT)
The candidate database contains data from 2021 elections, NOT 2026. Names like Daniel Urresti, Verónika Mendoza, Hernando de Soto, Antauro Humala are shown as candidates when they are NOT running in 2026. This must be fixed IMMEDIATELY.

## Data Files Available
All source data is in `/docs/info-injection/`:
- `01_RESUMEN_EJECUTIVO.md` — Political situation overview
- `02_CANDIDATOS_36_COMPLETO.md` — All 36 candidates with full formulas
- `03_TOP10_PERFILES_JSON.md` — Top 10 detailed profiles in JSON
- `04_ENCUESTAS_MARZO_2026.md` — All March 2026 polls
- `05_ANALISIS_COYUNTURA.md` — Political analysis
- `06_FUENTES_APIS_INTEGRACIONES.md` — APIs and data sources
- `07_IDEAS_FEATURES_NUEVAS.md` — New feature ideas
- `08_VERIFICACION_CORRECCIONES.md` — Data corrections needed
- `09_ESTADISTICAS_ELECTORALES.md` — Electoral statistics

## The Goal
Make Candidatazo THE app that all of Peru talks about. TV media covers it. Content creators share it. Families discuss it at dinner. Friends challenge each other. It becomes a verb: "¿Ya candidateaste?"

---

<a name="data-fix"></a>
# 2. CRITICAL DATA FIX — DO THIS FIRST

## Priority: BLOCKER — Nothing else matters until this is fixed

### Step 1: Replace the entire candidates database
The current database has WRONG candidates from 2021. Replace with the correct 36 candidates from 2026.

**Source file:** `/docs/info-injection/02_CANDIDATOS_36_COMPLETO.md`

### Candidates to REMOVE (they are NOT running in 2026):
- Daniel Urresti → Podemos Perú candidate is José Luna Gálvez
- Verónika Mendoza → Juntos por el Perú candidate is Roberto Sánchez Palomino
- Hernando de Soto → Avanza País candidate is José Williams Zapata
- Julio Guzmán → Partido Morado candidate is Mesías Guevara Amasifuén
- Antauro Humala → Verify — likely NOT inscribed as presidential candidate
- Pedro Castillo → IN PRISON. Not a candidate.
- Alejandro Toledo → NOT running
- Flor Pablo → NOT a presidential candidate
- Patricia Chirinos → NOT a presidential candidate
- Sigrid Bazán → NOT a presidential candidate in 2026
- Marco Arana → NOT a presidential candidate (verify)
- Luis Arce → NOT a presidential candidate in 2026

### Candidates to ADD (missing from current database):
Use the complete list of 36 from the source file. Key additions include:
- Alfonso López Chau (Ahora Nación) — 3rd in polls!
- Wolfgang Grozo (Integridad Democrática) — 4th and rising fast!
- Roberto Sánchez Palomino (Juntos por el Perú)
- Fiorella Molinelli (Fuerza y Libertad)
- Jorge Nieto (Partido del Buen Gobierno)
- Marisol Pérez Tello (Primero la Gente)
- And all others from the official JNE list

### Step 2: Update all poll numbers
Replace any old poll data with March 2026 numbers from `/docs/info-injection/04_ENCUESTAS_MARZO_2026.md`

### Step 3: Update the countdown
The countdown currently shows "60 DIAS RESTANTES" in some pages and "25" in others. It must be dynamic: `Math.ceil((new Date('2026-04-12') - new Date()) / (1000*60*60*24))`

---

<a name="architecture"></a>
# 3. ARCHITECTURE OVERVIEW

## New Navigation Structure
```
Home | Quick Match | Candidatos | Verificador | Simulador IA | ADN Test | Predictor | Academia | [NEW] Cédula 2026
```

## Data Model Additions

### candidates table (update schema)
```
id, nombre_completo, nombre_corto, iniciales, 
partido_politico, siglas_partido, numero_partido,
ideologia_etiqueta, espectro_politico,
fecha_nacimiento, lugar_nacimiento, genero,
educacion (JSON), experiencia_laboral (JSON),
trayectoria_politica (JSON), antecedentes (JSON),
controversias (JSON), redes_sociales (JSON),
propuestas_clave (JSON), 
primera_vp_nombre, segunda_vp_nombre,
estado_inscripcion (ENUM: inscrito, excluido, tachado, en_revision),
color_partido, foto_url, logo_partido_url,
created_at, updated_at
```

### polls table (new)
```
id, encuestadora, fecha_campo, fecha_publicacion,
tipo (ENUM: intencion, simulacro, segunda_vuelta),
muestra, margen_error, nivel_confianza,
fuente_url, created_at
```

### poll_results table (new)
```
id, poll_id (FK), candidate_id (FK),
porcentaje, variacion, posicion,
notas
```

### candidate_dimensions table (update)
```
id, candidate_id (FK),
economia (0-100), social (0-100), 
medio_ambiente (0-100), seguridad (0-100),
instituciones (0-100),
fuente, verificado (boolean)
```

---

<a name="phase-1"></a>
# 4. PHASE 1: DATA INJECTION & CANDIDATE DATABASE

## Goal: Correct, complete, verified data for all 36 candidates

### Task 1.1: Seed the database
Parse the JSON from `/docs/info-injection/03_TOP10_PERFILES_JSON.md` and create a seed script that populates the candidates table with all 36 candidates.

For candidates not in the Top 10, use the basic data from `/docs/info-injection/02_CANDIDATOS_36_COMPLETO.md`.

### Task 1.2: Candidate card redesign
Each candidate card on the `/candidatos` page needs to show:

```
┌──────────────────────────────────┐
│  [Circular avatar/initials]      │
│  NOMBRE COMPLETO                 │
│  Partido Político                │
│                                  │
│  Encuesta: ████████░░ 11.7%     │ ← Animated bar, color by party
│  Tendencia: ↓ -2.9              │ ← Red if down, green if up
│                                  │
│  ┌──┬──┬──┬──┬──┐               │
│  │EC│SO│MA│SE│IN│               │ ← 5 mini dimension bars
│  └──┴──┴──┴──┴──┘               │
│                                  │
│  Estado: ✅ Inscrito             │
│  14 propuestas    [Ver perfil →] │
└──────────────────────────────────┘
```

### Task 1.3: Sorting and filtering
The candidatos page needs:
- **Sort by:** Encuesta (default), Nombre A-Z, Partido, Ideología
- **Filter by:** Espectro (Izquierda, Centro, Derecha), Estado inscripción, Con/sin antecedentes
- **Search:** By name or party
- **View toggle:** Grid (current) / List view / Map view (by regional strength)

### Task 1.4: "Candidatos que no conoces" section
Below the main grid, add a section: "¿Sabías que hay 24 candidatos con menos de 1% en las encuestas? Conócelos aquí." This drives engagement to the less-known candidates.

---

<a name="phase-2"></a>
# 5. PHASE 2: ENHANCED CANDIDATE PROFILES

## Goal: The most complete candidate profile page in Peru

### Profile page structure (route: `/candidato/[slug]`)

```
HERO SECTION
├── Large avatar / photo
├── Name, Party, Ideology tag
├── Poll position badge (#1, #2, etc)
├── Trend indicator (↑↓→ with animation)
├── "Hacer match con este candidato" CTA
└── Share button

TAB NAVIGATION (sticky)
├── Resumen
├── Propuestas
├── Biografía
├── Antecedentes
├── Verificaciones
├── Comparar
└── Steelman

RESUMEN TAB (default)
├── 5-dimension radar chart (animated on scroll)
├── Key stats row (edad, experiencia, propuestas, verificaciones)
├── "Lo que dice" — Top 3 quotes with fact-check status
├── Encuestas timeline chart (line chart, Dec 2025 → Mar 2026)
├── Fórmula vicepresidencial cards
└── Redes sociales links

PROPUESTAS TAB
├── Filter by category (Economía, Social, Seguridad, etc)
├── Each proposal as expandable card
├── Source: Plan de gobierno (PDF link to JNE)
├── Community rating: "¿Viable?" (thumbs up/down)
└── Related fact-checks inline

BIOGRAFÍA TAB
├── Timeline component (vertical, animated)
│   ├── Educación (with Sunedu verification badge)
│   ├── Experiencia laboral
│   ├── Cargos políticos
│   └── Hitos relevantes
├── Patrimonio declarado (if available)
└── Source: Declaración Jurada de Vida (JNE link)

ANTECEDENTES TAB
├── Procesos judiciales (with status badges)
├── Controversias (chronological)
├── Sanciones electorales previas
├── Promesas incumplidas (if previous candidate)
└── ⚠️ Alertas (e.g., "Candidato prófugo" for Cerrón)

VERIFICACIONES TAB
├── All fact-checks related to this candidate
├── "Truth Score" — % of verified true statements
├── Filter by verdict (Verdadero, Falso, A medias)
└── Contribute a fact-check CTA

COMPARAR TAB
├── Select 1-3 other candidates to compare
├── Side-by-side radar chart overlay
├── Dimension-by-dimension comparison
├── Proposal comparison by category
└── Shareable comparison card generator

STEELMAN TAB (NEW — differentiator)
├── "El mejor argumento A FAVOR" 
│   └── Best case for this candidate (3-5 points, curated)
├── "Los puntos DÉBILES"
│   └── Legitimate concerns and weaknesses (3-5 points, curated)
├── Methodology explanation
└── "¿Estás de acuerdo?" — Community vote
```

### Interaction details for Profile page
- **Radar chart:** Animates on page load — each axis fills from 0 to value with spring physics
- **Poll timeline:** Smooth line chart that draws itself on scroll intersection
- **Tabs:** Smooth horizontal scroll with indicator line animation
- **Antecedentes:** Red/yellow alert styling for judicial cases, with collapsible detail
- **Share:** One-tap generates a profile card image (1080x1920 for Stories, 1200x630 for OG)

---

<a name="phase-3"></a>
# 6. PHASE 3: LIVE ELECTION DASHBOARD

## Goal: A real-time election hub that users check daily

### New component: Election Pulse (appears on Homepage)

```
┌────────────────────────────────────────────┐
│  🔴 EN VIVO — PULSO ELECTORAL              │
│  25 días para las elecciones               │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │  [Animated bar chart — top 5]        │  │
│  │  RLA ████████████████░ 11.7% ↓       │  │
│  │  KF  ██████████████░░ 10.9%          │  │
│  │  ALC ████████████░░░░  6.8% ↑↑       │  │
│  │  WG  ██████████░░░░░░  5.1% ↑↑↑     │  │
│  │  CA  ████████░░░░░░░░  3.9%          │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Fuente: Datum Mar 2026 | IEP Mar 2026    │
│                                            │
│  ⚡ TRENDING:                              │
│  "Wolfgang Grozo sube 10x en 3 meses"     │
│  "53% no conoce el símbolo de su partido"  │
│                                            │
│  [Ver análisis completo →]                 │
└────────────────────────────────────────────┘
```

### New page: `/dashboard` — Centro de Mando Electoral

Sections:
1. **Countdown timer** — Large, animated, with urgency that increases as days decrease (color shifts from blue → yellow → red)
2. **Latest polls comparison** — Multi-source chart (IEP, Datum, Ipsos, CPI) showing all encuestadoras on same axes
3. **Trend alerts** — "Who's up, who's down" with animated arrows
4. **Candidato del día** — Auto-rotating spotlight on one candidate per day
5. **"Dato que no sabías"** — Daily electoral fact (pulls from stats database)
6. **Community predictor summary** — Aggregate of user predictions
7. **Map view** — Peru map colored by regional leader (interactive)
8. **Upcoming events** — Debates, deadlines, key dates

### Interaction: The bars in the poll chart must animate like a living organism
- On page load: Bars grow from 0 to current value with staggered timing (first bar starts, then second 100ms later, etc.)
- On data update: Bars smoothly transition to new values with spring physics
- Trend arrows pulse gently to draw attention
- Hovering/tapping a bar shows detailed tooltip with all encuestadoras

---

<a name="phase-4"></a>
# 7. PHASE 4: SIMULADOR DE CÉDULA (New Feature — HIGH VIRAL POTENTIAL)

## Goal: Let users practice voting before election day

### Why this is critical
- 53% of voters don't know their party's symbol
- The ballot will be ~40cm long with 36+ options
- 81% don't know how the bicameral vote works
- This is the MOST shareable feature we can build

### Route: `/cedula`

### Experience flow:

**Step 1: Intro screen**
```
"¿Podrás encontrar a tu candidato en la cédula real?"
"El 53% de peruanos no puede. ¿Tú sí?"
[Empezar simulación →]
Timer starts counting
```

**Step 2: Presidential ballot simulator**
- Faithful replica of the ONPE ballot design
- Horizontal scroll container (mimicking the 40cm paper)
- All 36 parties with official symbols (NO candidate names — just like real ballot)
- User must find and tap their preferred party
- Timer running in corner
- Confetti animation when they find it

**Step 3: Senate ballot simulator**
- Explain: "Ahora vota por tus senadores. Recuerda: votas 2 veces — una nacional, una regional."
- Two-step voting simulation
- Educational tooltips throughout

**Step 4: Results screen**
```
"Encontraste tu partido en [X] segundos"
"Eres más rápido que el 67% de usuarios"
"¿Sabías que también debes votar por senadores Y diputados?"
[Compartir mi tiempo →] [Retar a un amigo →] [Aprender más sobre la cédula →]
```

### Shareability
Generate image: "Encontré mi partido en la cédula en 8 segundos. ¿Tú puedes? 🗳️ #Candidatazo #Elecciones2026"

### Technical notes
- The ballot symbols should be actual official party logos (scrape from JNE/ONPE)
- The scroll should feel physical — like sliding actual paper
- Add subtle paper texture to the ballot background
- Sound effects: Paper sliding, stamp when voting

---

<a name="phase-5"></a>
# 8. PHASE 5: ENHANCED PREDICTOR

## Goal: The most engaging prediction game in Peru

### Current state improvements needed
The Predictor page already exists but needs to be much more dynamic and addictive.

### New Predictor Features

**1. Prediction Types (multiple markets)**
```
MERCADO 1: ¿Quién pasa a segunda vuelta?
  → Select 2 candidates, bet virtual points

MERCADO 2: ¿Quién será presidente?
  → Select 1 candidate, bet points

MERCADO 3: ¿Cuántos partidos pasarán la valla?
  → Numeric prediction (slider: 3-15)

MERCADO 4: ¿Cuál será el % de voto blanco/nulo?
  → Slider prediction

MERCADO 5: ¿Quién ganará en tu región?
  → Regional prediction with auto-detect location

MERCADO 6: Mini-predicciones semanales
  → "¿Subirá o bajará López Aliaga en la próxima encuesta?"
  → Quick binary bet, resolved when new poll drops
```

**2. Points economy**
- Start with 1,000 Puntos Cívicos
- Bet 50-500 points per prediction
- Correct predictions multiply (odds calculated from community distribution)
- Weekly leaderboard with badges
- "Oráculo de la Semana" badge for best predictor

**3. Social pressure mechanics**
- Show friends' predictions (after they bet)
- "María apostó 300 puntos a López Aliaga. ¿Tú qué crees?"
- Regional leaderboards: "Cusco vs Lima — ¿quién predice mejor?"
- Streak counter: "5 predicciones correctas seguidas 🔥"

**4. Prediction resolution**
- When new poll drops → resolve mini-predictions → award points → notification push
- Election day → resolve all markets → MASSIVE notification + celebration screen
- Post-election leaderboard becomes permanent hall of fame

---

<a name="phase-6"></a>
# 9. PHASE 6: GAMIFICATION ENGINE OVERHAUL

## Goal: Make every interaction feel rewarding

### XP Actions (expanded)
| Action | XP | Frequency |
|--------|-----|-----------|
| Complete ADN Test | +500 | Once |
| Complete Quick Match | +100 | Once |
| Complete a course in Academia | +200 | Per course |
| Complete Simulador de Cédula | +150 | Once |
| Make a prediction | +30 | Per prediction |
| Correct prediction | +100 | Per correct |
| Submit a fact-check | +50 | Per submission |
| Share result to social media | +25 | Per share (max 3/day) |
| Daily login streak | +10×day_count | Daily (resets on miss) |
| Invite friend who registers | +200 | Per friend |
| View a candidate profile completely | +15 | Per candidate |
| Vote in community poll | +10 | Per vote |
| Complete daily quiz | +30 | Daily |
| Beat Cédula challenge under 10s | +100 | Once |

### Level System (redesigned with Peruvian flavor)
```
Level 1: Ciudadano Curioso       (0 - 500 XP)
Level 2: Votante Informado       (500 - 1,500 XP)
Level 3: Analista Cívico         (1,500 - 3,500 XP)
Level 4: Guardián de la Verdad   (3,500 - 7,000 XP)
Level 5: Líder de Opinión        (7,000 - 15,000 XP)
Level 6: Oráculo Electoral       (15,000 - 30,000 XP)
Level 7: Leyenda Democrática     (30,000+ XP)
```

### Badges (collectible, shareable)
Design each as a circular medal with Peruvian-inspired art:
- 🗳️ **Primer Voto** — Completed ADN Test
- 🔍 **Cazador de Falacias** — 5 fact-checks verified
- 🏆 **Oráculo** — 5 correct predictions in a row
- ⚡ **Velocista** — Found party in cédula in <5 seconds
- 📚 **Sabio Cívico** — Completed all 8 Academia courses
- 🤝 **Embajador** — Invited 10 friends
- 🔥 **En Racha** — 7-day login streak
- 🗺️ **Explorador** — Viewed all 36 candidate profiles
- ⚖️ **Neutral** — Viewed steelman for 5+ candidates
- 🎯 **Francotirador** — Predicted exact poll result within 1%

### Achievement Notifications
Every XP gain and badge unlock should trigger:
1. A micro-animation on the XP counter (bounce + particle burst)
2. A toast notification that slides in from top
3. If it's a badge: Full-screen celebration with confetti, badge reveal animation, and share prompt
4. Sound: Subtle "ding" for XP, triumphant sound for badges

### Persistent XP bar
Show in the header/navbar: A thin progress bar showing current level progress. When it fills, animate the level-up with a golden glow effect.

---

<a name="phase-7"></a>
# 10. PHASE 7: VIRAL SHARING SYSTEM

## Goal: Every feature produces a shareable artifact

### Share Card Generator (core system)
Build a reusable system that generates beautiful share images for any content.

**Template 1: ADN Result**
```
1080×1920 (Stories) — Full screen
┌─────────────────────────┐
│  Candidatazo logo        │
│                          │
│  MI ADN POLÍTICO         │
│  [Radar chart, large]    │
│                          │
│  "Centro-Liberal"        │
│  "Progresista con        │
│   sentido económico"     │
│                          │
│  Mi match: López Chau 87%│
│                          │
│  ¿Y tú qué eres?        │
│  candidatazo.com         │
│  QR Code                 │
└─────────────────────────┘
```

**Template 2: Cédula Challenge**
```
"Encontré mi partido en 6.2 segundos ⚡"
"Solo el 23% fue más rápido"
Progress bar visualization
candidatazo.com/cedula
```

**Template 3: Prediction**
```
"Mi predicción: López Aliaga vs López Chau en segunda vuelta"
"Tengo 2,340 puntos apostados"
"¿Tú qué crees?"
```

**Template 4: Fact-Check**
```
"❌ FALSO: [Claim]"
"Según [Fuente], el dato real es..."
"Verifica antes de compartir"
candidatazo.com/verificador
```

**Template 5: Comparison**
```
"Comparé a [Candidato A] vs [Candidato B]"
[Side-by-side radar]
"¿Con cuál haces match?"
```

**Template 6: Level Up**
```
"¡Subí a Nivel 4: Guardián de la Verdad! 🏆"
"Ya llevo 7,230 XP"
"¿Cuánto sabes de las elecciones?"
```

### Technical implementation
- Use HTML Canvas or SVG → PNG conversion on client
- Pre-render templates with dynamic data injection
- One-tap share to WhatsApp (primary), Instagram Stories, Twitter/X, Facebook, TikTok
- Deep link in every share that opens the exact feature the user was using
- UTM parameters for tracking: `?ref=share&type=adn&user=xxx`

### WhatsApp optimization (CRITICAL — most-used platform in Peru)
- Share as image + text, NOT just link
- Text template: "Acabo de descubrir mi ADN político en Candidatazo 🧬 Mi match es [Candidato] al [X]%. ¿Quién es el tuyo? 👉 [link]"
- The link should show a rich preview (OG tags optimized)

---

<a name="phase-8"></a>
# 11. PHASE 8: VERIFICADOR DE DATOS 2.0

## Goal: Become Peru's #1 election fact-checker

### Enhancements needed

**1. Real-time debate fact-checking**
During televised debates, launch a live mode:
- Stream of claims as they're made
- Real-time verdict badges appearing
- Users can vote "agree/disagree" with verdicts
- Engagement timer: "Debate en vivo — 12,345 personas verificando"

**2. Candidate Truth Score**
New metric displayed on every candidate card:
```
VERACIDAD: 45% 🟡
Basado en 14 declaraciones verificadas
├── 3 Verdaderas (21%)
├── 4 A medias (29%)
├── 5 Falsas (36%)
└── 2 Engañosas (14%)
```

**3. Community fact-checking pipeline**
```
User submits claim → AI pre-analysis → Community votes on evidence → 
If >70% consensus → Published with community badge
If <70% → Escalated to editorial review
```

**4. "Before you share" feature**
- URL checker: Paste a news link → Get instant credibility score
- Claim checker: Type a claim → AI checks against database
- This is the WhatsApp forward killer

---

<a name="phase-9"></a>
# 12. PHASE 9: ACADEMIA CÍVICA EXPANSION

## Goal: The most fun civic education in Peru

### Current courses (8) — keep and enhance

### New urgent course: "Cómo votar el 12 de abril"
```
Lesson 1: Tu cédula explicada (interactive cédula walkthrough)
Lesson 2: Senado vs Diputados — qué votas y por qué
Lesson 3: Voto válido, blanco y nulo — qué pasa con cada uno
Lesson 4: La valla electoral — por qué importa tu voto congresal
Lesson 5: Segunda vuelta — cuándo, cómo, por qué
```

### Gamification enhancements for courses
- **Progress bar per course** with micro-celebrations at 25%, 50%, 75%, 100%
- **Mini-games between lessons:** Drag-and-drop, true/false speed rounds, matching pairs
- **Audio option:** Every lesson can be listened to (TTS or recorded)
- **Completion certificate:** Beautiful shareable image: "Completé el curso [X] en Candidatazo 📜"
- **Course streak:** "Completa 1 lección por día durante 7 días" → Special badge

---

<a name="phase-10"></a>
# 13. PHASE 10: COUNTDOWN & URGENCY ENGINE

## Goal: Create FOMO and urgency that drives daily returns

### The Countdown Component (persistent across all pages)
```
┌──────────────────────────────────────┐
│  FALTAN                              │
│  24 días : 14 horas : 32 min : 08 s │
│  para las Elecciones 2026            │
│  [Barra de progreso visual]          │
└──────────────────────────────────────┘
```

### Urgency mechanics
- **Color shift:** Blue (>30 days) → Yellow (15-30) → Orange (7-15) → Red (<7) → Pulsing red (<3)
- **Daily notification:** "Faltan X días. ¿Ya sabes por quién votar?"
- **Weekly milestone:** "Esta semana se publicará la última encuesta antes del silencio."
- **Silencio encuestador alert:** "A partir del 5 de abril, no se publicarán más encuestas. Nuestro Predictor comunitario será la única fuente."
- **Election day:** Full celebration mode with real-time results integration

### "Sabías que..." daily facts engine
Rotate through electoral facts daily:
- "Hoy: La cédula presidencial tendrá 36 opciones — la más larga de la historia"
- "Mañana: 81% de peruanos no sabe cuántos senadores se eligen. ¿Tú sí?"
- "Pasado: El voto en blanco NO le da tu voto a nadie. Es simplemente un voto no contado."

---

<a name="design-system"></a>
# 14. DESIGN SYSTEM & UX PRINCIPLES

## Color Palette
```
Primary Red: #DC2626 (Candidatazo brand — CTAs, accents)
Dark Red: #991B1B (hover states, headers)
Gold: #F59E0B (achievements, premium, highlights)
Dark: #1F2937 (text, backgrounds)
Light: #F9FAFB (backgrounds)
Success Green: #10B981
Warning Yellow: #F59E0B
Error Red: #EF4444
Info Blue: #3B82F6

Party colors: Each of the 36 parties should have a unique color. Use the official party colors from JNE/ONPE when available.
```

## Typography
```
Headlines: Bold, large, punchy — "Vota con conocimiento, no con intuición"
Body: Clean, readable, 16px minimum
Numbers: Tabular figures for data alignment
Spanish: Use proper tildes, ñ, ¿¡ always
```

## Cards everywhere
Everything is a card. Cards have:
- Subtle shadow (0 1px 3px rgba(0,0,0,0.1))
- Rounded corners (8-12px)
- Hover: Slight lift (translateY(-2px)) + shadow increase
- Tap: Scale down slightly (0.98) then bounce back

## Mobile-first but desktop-excellent
- All layouts should be responsive
- Desktop: Take advantage of multi-column layouts
- Navigation: Horizontal on desktop, hamburger or bottom tabs on mobile
- Touch targets: Minimum 44x44px

---

<a name="animations"></a>
# 15. ANIMATION & MICROINTERACTION SPEC

## Philosophy: Every state change should be visible and delightful

### Page transitions
- Smooth fade + slide (not hard cuts)
- Skeleton loading states (shimmer effect) for all data-dependent content
- Never show empty states without explanation

### Number animations
- All poll percentages animate from 0 to value on first view
- Use `framer-motion` or CSS `@keyframes` with `counter-increment`
- Duration: 800ms with ease-out
- Stagger multiple numbers by 100ms each

### Chart animations
- Radar charts: Each axis grows from center outward with spring physics
- Bar charts: Bars grow from bottom with stagger
- Line charts: Line draws itself left-to-right
- Pie/donut: Segments fill clockwise

### Scroll-triggered animations
- Elements fade in + slide up as they enter viewport
- Use Intersection Observer
- Stagger children by 50-100ms
- Only animate ONCE (not on every scroll)

### Micro-interactions
- **Button press:** Scale to 0.95, then back with spring
- **Like/vote:** Heart/thumb animation with particle burst
- **Toggle:** Smooth slide with color transition
- **Form input focus:** Label floats up, border color changes
- **Error:** Gentle shake animation (2-3 cycles)
- **Success:** Checkmark draws itself + green pulse

### Celebration animations (for achievements, level-ups, correct predictions)
- Full-screen confetti (use canvas-confetti or similar library)
- Badge reveal: Starts small + blurred, scales up + sharpens with golden glow
- Number counter: Rapid count-up to final XP value
- Sound: Optional but recommended — subtle "achievement unlocked" chime

---

<a name="dopamine"></a>
# 16. DOPAMINE LOOP ARCHITECTURE

## The core loop that keeps users coming back

```
TRIGGER (external)
├── Push notification: "Nueva encuesta publicada"
├── Push notification: "Tu predicción fue correcta! +100 XP"
├── Push notification: "Faltan 20 días — ¿ya completaste tu ADN?"
├── WhatsApp share from friend: "Mira mi resultado"
└── Social media: See someone else's share card

↓

ACTION (low effort, high reward)
├── Open app → See what changed
├── Complete daily quiz (30 seconds)
├── Make a quick prediction
├── Check if prediction resolved
└── View new candidate spotlight

↓

VARIABLE REWARD
├── XP gain (variable amounts)
├── Badge unlock (surprise)
├── Leaderboard position change
├── New fact-check dropped
├── Friend joined
└── Streak continuation

↓

INVESTMENT (increases future value)
├── Complete more of ADN test
├── View more candidates
├── Make more predictions
├── Invite friends
└── Build login streak
```

### Daily engagement hooks
| Time | Hook | Notification |
|------|------|-------------|
| 8am | Daily quiz available | "Tu pregunta del día te espera 🧠" |
| 12pm | Candidato del día | "Hoy te presentamos a [Candidato]. ¿Lo conocías?" |
| 5pm | Prediction update | "Tu predicción sobre [X] se resolvió. ¿Acertaste?" |
| 8pm | Streak reminder (if not logged in) | "¡No pierdas tu racha de 5 días! 🔥" |

### Weekly engagement hooks
- Monday: "Resumen semanal: Así cambió el panorama electoral"
- Wednesday: "Nueva verificación publicada — ¿Verdadero o falso?"
- Friday: "Predicción del fin de semana: ¿Quién subirá en la próxima encuesta?"
- Sunday: "Leaderboard semanal — ¿Llegaste al Top 100?"

---

<a name="shareability"></a>
# 17. SHAREABILITY ENGINEERING

## Every feature should have a share moment

| Feature | Share trigger | Share format |
|---------|-------------|-------------|
| ADN Test result | On completion | Image card + deep link |
| Quick Match | On seeing matches | Image card with top 3 matches |
| Cédula simulator | On completion | Time result image |
| Predictor | After betting | Prediction card |
| Fact-check | After viewing | Fact-check card |
| Academia course completion | On graduation | Certificate image |
| Level up | On leveling | Level badge image |
| Badge unlock | On unlock | Badge image |
| Comparison | After comparing | Comparison image |
| Daily quiz | On correct answer | Score streak image |

### Share CTAs should be contextual, not generic
Bad: "Compartir"
Good: "Reta a un amigo" / "¿Tus amigos saben esto?" / "Compara con tu grupo"

### Challenge system (P2P viral loops)
- "Reta a [Nombre] a completar el ADN Test"
- "Reta a [Nombre] a encontrar su partido en la cédula"
- "¿Quién sabe más sobre las elecciones? Quiz challenge"
- Send via WhatsApp → Friend opens deep link → Completes challenge → Both get XP

---

<a name="performance"></a>
# 18. PERFORMANCE & ACCESSIBILITY

## Performance targets
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse score: >90
- Bundle size: Monitor and optimize
- Images: Use WebP, lazy load all below-fold images
- Data: Paginate all lists, infinite scroll where appropriate

## Accessibility
- All images have alt text
- Color contrast: WCAG AA minimum
- Keyboard navigation for all interactive elements
- Screen reader compatible
- Language: Spanish (Peru) as default

## SEO (critical for organic traffic)
- Each candidate profile should be its own indexable page
- Each fact-check should be indexable
- OG tags optimized for every page
- Structured data (JSON-LD) for candidates and fact-checks
- Sitemap updated with all routes

---

<a name="launch"></a>
# 19. LAUNCH CHECKLIST

## Before going live, verify:
- [ ] All 36 candidates are correct and verified
- [ ] No 2021 candidates remain in database
- [ ] Countdown is dynamic and accurate
- [ ] All poll data is from March 2026
- [ ] Share images generate correctly
- [ ] Deep links work for all share types
- [ ] OG tags are correct for all pages
- [ ] Gamification XP awards correctly
- [ ] Cédula simulator has all 36 party symbols
- [ ] Mobile responsive on iPhone SE through iPad
- [ ] Load time < 3s on 3G connection
- [ ] Analytics tracking on all key events
- [ ] Error handling for all API calls
- [ ] Rate limiting on API endpoints
- [ ] CORS configured correctly

---

# FINAL NOTES FOR CLAUDE CODE

## Priority order
1. **FIX THE DATA** — Replace 2021 candidates with correct 2026 list (Phase 1)
2. **Enhanced profiles** — Make candidate pages the best in Peru (Phase 2)
3. **Cédula simulator** — Highest viral potential feature (Phase 4)
4. **Sharing system** — Every feature needs share output (Phase 7)
5. **Gamification overhaul** — Make it addictive (Phase 6)
6. **Election dashboard** — Daily return reason (Phase 3)
7. **Enhanced predictor** — Engagement engine (Phase 5)
8. Everything else in parallel

## Code quality standards
- TypeScript strict mode
- Components: Small, single-responsibility, reusable
- Data fetching: React Query with proper cache invalidation
- State: Zustand for global, React state for local
- Testing: At minimum, test critical paths (ADN test, share generation, candidate data)
- Git: Feature branches, meaningful commits

## Creative freedom
Claude Code has full creative authority on:
- Exact component implementation
- Animation libraries and techniques
- CSS approaches
- File structure
- Utility functions
- Any technical decision not specified here

The vision is clear. The data is ready. Build something that makes Peru proud.

---

*Blueprint created: March 18, 2026*
*For: Candidatazo / ADIS Technological Platforms*
*By: Electoral Intelligence Analysis — Claude AI*
*"25 days to change how Peru votes."*
