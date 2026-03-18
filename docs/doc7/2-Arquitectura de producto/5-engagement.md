# 5. SISTEMA DE CAPAS DE ENGAGEMENT

## 5.1 - Overview de las 4 Capas

Candidatazo se construye en capas progresivas. Cada capa funciona SOLA, pero se potencia con las siguientes.

```
CAPA 4: SUPER USUARIO (10%)
├── Debates en vivo
├── Prediction markets
├── Crowdsourced fact-checking
├── Tribes avanzadas
└── Content creation

CAPA 3: COMUNIDAD ACTIVA (30%)
├── Feed personalizado
├── Tribes básicas
├── Comparaciones con amigos
└── Engagement regular

CAPA 2: USUARIO INFORMADO (50%)
├── Fact-checking
├── Comparador de candidatos
├── Análisis de propuestas
└── Uso ocasional

CAPA 1: HERRAMIENTA BÁSICA (100%)
├── DNA Test político
├── Match con candidatos
├── Resultado visual
└── Share en redes sociales
```

**Filosofía:** 100% de users obtienen valor en Capa 1. Solo quien quiere más profundiza.

---

## 5.2 - CAPA 1: HERRAMIENTA INDIVIDUAL (Core Value Prop)

### DNA Test Político

**Objetivo:** Usuario descubre su perfil político en 5-8 minutos

**Flujo:**
1. Usuario descarga app
2. Onboarding rápido (30 seg)
3. DNA Test (20 preguntas)
4. Resultado visual hermoso
5. Share en Instagram/TikTok

**Preguntas del DNA Test (20 preguntas en 4 categorías):**

**ECONOMÍA (5 preguntas):**
1. "¿El estado debe controlar empresas estratégicas o dejarlas al sector privado?"
   - Escala 1-5: Estado total → Privado total

2. "¿Impuestos más altos para ricos o impuestos bajos para todos?"
   - Escala 1-5: Redistribución → Libre mercado

3. "¿Subsidios sociales o que cada quien se sostenga?"
   - Escala 1-5: Estado benefactor → Meritocracia pura

4. "¿Proteccionismo comercial o libre comercio internacional?"
   - Escala 1-5: Proteccionismo → Globalización

5. "¿Salario mínimo más alto o dejarlo al mercado?"
   - Escala 1-5: Regulación → Mercado

**SOCIAL (5 preguntas):**
1. "¿Matrimonio igualitario?"
   - Escala 1-5: En contra → A favor

2. "¿Legalización del aborto?"
   - Escala 1-5: Prohibición → Descriminalización

3. "¿Legalización de marihuana?"
   - Escala 1-5: Prohibición → Legalización

4. "¿Enfoque en crimen: rehabilitación o castigo?"
   - Escala 1-5: Mano dura → Rehabilitación

5. "¿Educación sexual en colegios?"
   - Escala 1-5: No → Sí

**POLÍTICO (5 preguntas):**
1. "¿Más o menos congresistas?"
   - Escala 1-5: Reducir → Aumentar

2. "¿Reelección presidencial?"
   - Escala 1-5: Nunca → Sí

3. "¿Voto obligatorio o voluntario?"
   - Escala 1-5: Obligatorio → Voluntario

4. "¿Descentralización o centralización?"
   - Escala 1-5: Lima decide todo → Regiones autónomas

5. "¿Bicameral (2 cámaras) o unicameral (1 cámara)?"
   - Escala 1-5: Unicameral → Bicameral

**MEDIOAMBIENTAL (5 preguntas):**
1. "¿Minería vs protección ambiental?"
   - Escala 1-5: Desarrollo → Ambiente

2. "¿Inversión en energías renovables?"
   - Escala 1-5: No prioritario → Urgente

3. "¿Regulación ambiental estricta o flexible?"
   - Escala 1-5: Flexible → Estricta

4. "¿Cambio climático: urgencia?"
   - Escala 1-5: No urgente → Crisis inmediata

5. "¿Áreas protegidas: ampliar o reducir?"
   - Escala 1-5: Reducir → Ampliar

**UX del Test:**

```
Pantalla de Pregunta:
┌─────────────────────────────┐
│  Pregunta 1 de 20           │
│  [==========>-----] 50%     │
│                             │
│  ¿El estado debe controlar  │
│  empresas estratégicas?     │
│                             │
│  ●─────○─────○─────○─────●  │
│  Estado         Privado     │
│  Total          Total       │
│                             │
│  [i] ¿Qué significa esto?   │
│                             │
│  [Siguiente →]              │
└─────────────────────────────┘
```

**Features Especiales:**
- Tooltip contextual (i) explica cada pregunta
- Ejemplos concretos peruanos
- Progreso visible
- Skip permitido (marca como "neutral")
- Tiempo estimado restante

---

### Resultado del DNA Test

**Pantalla de Resultado:**

```
┌─────────────────────────────────────┐
│         TU DNA POLÍTICO             │
│                                     │
│      ╱─────────────╲                │
│    ╱  ECONÓMICO: 73% ╲              │
│   │   SOCIAL: 45%     │             │
│    ╲  POLÍTICO: 61%  ╱              │
│      ╲─────────────╱                │
│       AMBIENTAL: 82%                │
│                                     │
│  Tu Perfil:                         │
│  🏛️ CENTRO-IZQUIERDA VERDE          │
│                                     │
│  [Compartir en Instagram]           │
│  [Ver Mis Matches →]                │
└─────────────────────────────────────┘
```

**Elementos del Resultado:**

1. **Gráfico Radial:**
   - 4 ejes (Económico, Social, Político, Ambiental)
   - Colores vibrantes
   - Animación al aparecer

2. **Etiqueta de Perfil:**
   - Auto-generada basada en scores
   - Ejemplos:
     - "Centro-Izquierda Verde"
     - "Derecha Económica Liberal"
     - "Izquierda Progresista"
     - "Centro Pragmático"

3. **Share Button:**
   - Un tap genera imagen para Instagram
   - Formato: 1080x1920 (Stories)
   - Watermark: "candidatazo.com"

---

### Match con Candidatos

Después del resultado, user ve:

```
┌──────────────────────────────────────┐
│      TUS MATCHES CON CANDIDATOS      │
│                                      │
│  🥇 Rafael López Aliaga: 87%  [Ver]  │
│     ████████████████████░░           │
│                                      │
│  🥈 Keiko Fujimori: 76%       [Ver]  │
│     ███████████████░░░░░             │
│                                      │
│  🥉 Hernando de Soto: 71%     [Ver]  │
│     ██████████████░░░░░░             │
│                                      │
│  4️⃣ Verónika Mendoza: 45%     [Ver]  │
│     █████████░░░░░░░░░░░             │
│                                      │
│  5️⃣ George Forsyth: 42%       [Ver]  │
│     ████████░░░░░░░░░░░░             │
│                                      │
│  [Ver todos los 36 candidatos]       │
│  [Comparar Top 3]                    │
└──────────────────────────────────────┘
```

**Cómo Funciona el Match:**

**Algoritmo Simple:**
```
match_score = (
    0.30 * similarity(user.economic, candidate.economic) +
    0.25 * similarity(user.social, candidate.social) +
    0.25 * similarity(user.political, candidate.political) +
    0.20 * similarity(user.environmental, candidate.environmental)
)

similarity(a, b) = 100 - abs(a - b)
```

**Ejemplo:**
- User económico: 70 (derecha)
- Candidato económico: 85 (derecha fuerte)
- Similarity: 100 - |70-85| = 85%

**Data de Candidatos:**
- Extraída de propuestas oficiales
- Planes de gobierno (JNE)
- Votaciones previas en Congreso (si aplica)
- Statements públicos
- Verificada por OjoPúblico

---

## 5.3 - CAPA 2: UTILIDAD ADICIONAL

Esta capa agrega herramientas que NO requieren otros usuarios, pero hacen que regreses a la app.

### Feature #1: Comparador de Candidatos

**Problema que Resuelve:** "Quiero ver diferencias entre candidatos lado a lado"

**UX:**

```
┌────────────────────────────────────┐
│  COMPARADOR                        │
│                                    │
│  [RLA ▼] vs [KF ▼] vs [HDS ▼]     │
│                                    │
│  ECONOMÍA                          │
│  RLA: Libre mercado total          │
│  KF:  Mercado con regulación       │
│  HDS: Economía social de mercado   │
│                                    │
│  IMPUESTOS                         │
│  RLA: Reducir a 15%                │
│  KF:  Mantener actual (29.5%)      │
│  HDS: Reducir a 25%                │
│                                    │
│  SALUD                             │
│  RLA: Privada + vouchers           │
│  KF:  Mixta público-privada        │
│  HDS: Universal pública            │
│                                    │
│  [Agregar otro candidato]          │
│  [Exportar comparación PDF]        │
└────────────────────────────────────┘
```

**Features:**
- Compara hasta 4 candidatos simultáneamente
- 20+ categorías de comparación
- Fuentes citadas en cada claim
- Exportable a PDF
- Shareable

---

### Feature #2: Fact-Checker

**Problema que Resuelve:** "¿Es verdad lo que dice este candidato?"

**UX - Versión Proactiva:**

User está viendo perfil de candidato. Ve claim:

```
┌────────────────────────────────────┐
│  Rafael López Aliaga                │
│  @RafaelLopezAliaga                 │
│                                    │
│  "Durante mi gestión como           │
│   alcalde, reduje el crimen         │
│   en 40%"                           │
│                                    │
│  [⚠️ VERIFICADO]                    │
│  ├─ Parcialmente verdadero          │
│  ├─ Crimen bajó 28%, no 40%         │
│  ├─ Fuente: INEI, 2023              │
│  └─ [Ver análisis completo]         │
└────────────────────────────────────┘
```

**UX - Versión Reactiva:**

User puede verificar cualquier claim:

```
┌────────────────────────────────────┐
│  FACT-CHECKER                      │
│                                    │
│  Pega el texto o link:             │
│  [_________________________]       │
│                                    │
│  [Verificar ✓]                     │
└────────────────────────────────────┘

Resultado:
┌────────────────────────────────────┐
│  ✅ VERDADERO                       │
│                                    │
│  Claim: "Perú creció 7% en 2022"   │
│                                    │
│  Verificación:                     │
│  ✓ Confirmado por INEI              │
│  ✓ GDP creció 7.1% en 2022          │
│  ✓ Fuente oficial                   │
│                                    │
│  Confianza: 95%                    │
│  [Compartir fact-check]            │
└────────────────────────────────────┘
```

**Sistema de Fact-Checking:**

**NIVEL 1: AI Automático (Instant)**
- Gemini Flash 2.0 query a database
- Fuentes oficiales: INEI, BCR, JNE, Contraloría
- Response en <2 segundos

**NIVEL 2: Profesional (24 horas)**
- Partnership con OjoPúblico
- Claims complejos van a verificadores humanos
- Report detallado

**NIVEL 3: Community (Ongoing)**
- Users votan si claim es verdadero/falso
- Presentan evidencia
- Reputación system (como Stack Overflow)

**Semáforo:**
- 🟢 Verdadero (evidencia sólida)
- 🟡 Mayormente verdadero (con matices)
- 🟠 A medias verdadero/falso
- 🔴 Falso (evidencia de lo contrario)
- ⚫ Engañoso (técnicamente verdadero pero misleading)

---

### Feature #3: Simulador de Políticas

**Problema que Resuelve:** "¿Cómo me afectaría esta propuesta?"

**Ejemplo: Simulador de Impuestos**

```
┌────────────────────────────────────┐
│  SIMULA TU IMPUESTO                │
│                                    │
│  Tu ingreso mensual:               │
│  [S/ 5,000____]                    │
│                                    │
│  Propuesta de:                     │
│  [Rafael López Aliaga ▼]           │
│                                    │
│  RESULTADO:                        │
│                                    │
│  Actual: S/ 625/mes (12.5%)        │
│  Propuesta RLA: S/ 375/mes (7.5%)  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━        │
│  AHORRAS: S/ 250/mes               │
│           S/ 3,000/año             │
│                                    │
│  [Comparar con otro candidato]     │
└────────────────────────────────────┘
```

**Otros Simuladores:**
- Pensiones (AFP vs ONP vs nuevas propuestas)
- Costo de servicios básicos
- Empleo en tu sector
- Educación (becas, subsidios)

---

### Feature #4: Academia Cívica

**Problema que Resuelve:** "No entiendo cómo funciona el gobierno"

**Módulos:**

1. **¿Cómo Funciona el Congreso Bicameral?**
   - Lección de 3 minutos
   - Animación explicativa
   - Quiz al final (+50 XP)

2. **Separación de Poderes**
   - Ejecutivo, Legislativo, Judicial
   - Checks and balances
   - Quiz (+50 XP)

3. **Proceso Electoral**
   - Primera vuelta vs segunda
   - Cómo se cuentan votos
   - Quiz (+50 XP)

4. **Tu Voto: Qué Elegir**
   - Presidente
   - 2 Senadores
   - 130 Diputados
   - Parlamentarios Andinos
   - Quiz (+100 XP)

**Gamificación:**
- XP por completar módulos
- Badges por temas
- Leaderboard de "Más Educados Cívicamente"

---

## 5.4 - CAPA 3: COMUNIDAD

Aquí empiezan los network effects. Features que MEJORAN con más usuarios.

### Feature #1: Tribes (Auto-Generadas)

**Concepto:** Grupos automáticos basados en DNA político

**Cómo Funciona:**

Cuando completas DNA test:
1. Sistema identifica tu perfil (ej: "Centro-Izquierda Verde")
2. Te asigna automáticamente a tribes relevantes:
   - "Progresistas Económicos" (si economic < 50)
   - "Liberales Sociales" (si social > 60)
   - "Ambientalistas" (si environmental > 70)

**Types de Tribes:**

**Tribes Ideológicas (Auto-join):**
- Izquierda Económica
- Derecha Económica
- Centro Pragmático
- Progresistas Sociales
- Conservadores Sociales
- Ambientalistas
- Desarrollistas

**Tribes Demográficas (Opt-in):**
- Gen Z Político
- Millennials Informados
- Profesionales de [sector]
- [Ciudad/Región]

**Tribes de Candidatos (Opt-in):**
- Supporters de RLA
- Supporters de KF
- Indecisos
- etc.

**UX de Tribe:**

```
┌────────────────────────────────────┐
│  PROGRESISTAS ECONÓMICOS           │
│  👥 127,450 miembros               │
│                                    │
│  Descripción:                      │
│  Para quienes creen en Estado      │
│  activo en economía, redistribución│
│  y protección social.              │
│                                    │
│  FEED DE LA TRIBE:                 │
│  ┌──────────────────────────────┐  │
│  │ @maria_pe                    │  │
│  │ ¿Qué opinan del subsidio     │  │
│  │ propuesto por VM?            │  │
│  │ 45 💬  120 ❤️                │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ @carlos_lima                 │  │
│  │ Análisis: Por qué necesitamos│  │
│  │ impuesto a grandes fortunas  │  │
│  │ 89 💬  340 ❤️                │  │
│  └──────────────────────────────┘  │
│                                    │
│  [Nueva publicación]               │
└────────────────────────────────────┘
```

**Reglas de Tribes:**
- Moderación (AI + community mods)
- Zero tolerance a insultos
- Fact-based discussions
- Reports públicos de moderación

---

### Feature #2: Feed Personalizado

**Algoritmo del Feed:**

```python
feed_score(post) = (
    0.30 * ideological_match(user.dna, post.author.dna) +
    0.20 * engagement_rate(post) +
    0.15 * recency(post) +
    0.15 * factcheck_score(post) +
    0.10 * diversity_bonus(post) +  # Viewpoints opuestos
    0.10 * user_interaction_history(user, post.author)
)
```

**Composición del Feed:**

- 40% Posts de tus tribes
- 25% Posts de gente con DNA similar (no necesariamente en tus tribes)
- 20% Posts trending nacional
- 10% Posts de candidatos que sigues
- 5% Posts de viewpoints opuestos (anti-echo chamber)

**Types de Posts Permitidos:**

1. **Texto (280 caracteres max, como Twitter)**
2. **Análisis Largo (hasta 2000 palabras, con formatting)**
3. **Fact-Check** (con fuentes obligatorias)
4. **Poll**
5. **Propuesta** (formato especial para propuestas de políticas)

**NO Permitimos (al inicio):**
- Fotos/Videos (para evitar memes tóxicos)
- Links externos (para evitar spam)
- GIFs/Emojis excesivos

**Por Qué Limitamos Formatos:**
- Focus en CONTENIDO de calidad
- Evitar distracciones visuales
- Mantener signal-to-noise alto

---

### Feature #3: Debates Estructurados

**Problema:** Twitter debates son caos. Threads infinitos, off-topic, trolls.

**Solución Candidatazo:**

**Formato de Debate:**

1. **Propuesta Inicial** (200 palabras max)
   - User X propone tema
   - "Deberíamos aumentar salario mínimo a S/ 1500"

2. **Posiciones** (2 sides)
   - PRO (3 minutos de argumentos)
   - CONTRA (3 minutos de argumentos)

3. **Rebattal** (1 minuto cada lado)

4. **Community Vote**
   - Qué lado argumentó mejor (NO cuál estás de acuerdo)
   - Winner gets XP

**UX:**

```
┌────────────────────────────────────┐
│  DEBATE EN VIVO                    │
│  🔴 LIVE - 1,247 espectadores      │
│                                    │
│  "¿Aumentar salario mínimo?"       │
│                                    │
│  PRO (3:00)  ■■■■■■░░░  CONTRA     │
│                                    │
│  @maria_eco está argumentando PRO: │
│  "El salario mínimo actual no      │
│   cubre canasta básica. INEI       │
│   reporta..."                      │
│                                    │
│  [👍 2,340]  [👎 890]              │
│                                    │
│  PRÓXIMO: @carlos_econ (CONTRA)    │
│  Empieza en 2:15                   │
└────────────────────────────────────┘
```

**Moderación:**
- AI detecta off-topic → warning
- Time limits estrictos
- Community puede reportar
- Mods humanos para debates grandes

---

### Feature #4: Comparación con Amigos

**UX:**

```
┌────────────────────────────────────┐
│  TU DNA vs AMIGOS                  │
│                                    │
│  Invita amigos para comparar       │
│  [Copiar link de invitación]       │
│                                    │
│  AMIGOS QUE YA SE UNIERON:         │
│                                    │
│  María Rodríguez                   │
│  Match: 87% 🟢                     │
│  [Ver comparación detallada]       │
│                                    │
│  Carlos Pérez                      │
│  Match: 34% 🔴                     │
│  [Ver comparación detallada]       │
│                                    │
│  INVITACIONES PENDIENTES:          │
│  - Juan (visto hace 2 días)        │
│  - Sofia (aún no abre link)        │
│                                    │
│  [Invitar más amigos]              │
└────────────────────────────────────┘
```

**Viral Loop:**
1. User completa DNA test
2. Ve "Compara con 3 amigos para desbloquear insights"
3. Invita amigos (WhatsApp, Instagram, etc.)
4. Amigos se registran → completan DNA test
5. Amigos TAMBIÉN quieren comparar con SUS amigos
6. **Loop infinito**

**Insights Desbloqueados:**
- "Eres más de izquierda que 78% de tus amigos"
- "En promedio, tus amigos son 23% más conservadores socialmente"
- "Solo 2 de 10 amigos comparten tu visión ambiental"

---

## 5.5 - CAPA 4: SUPER USUARIO

Esta capa es para los 10% más engaged. Features avanzadas.

### Feature #1: Prediction Markets

**Concepto:** Apuesta puntos virtuales en resultados políticos

**UX:**

```
┌────────────────────────────────────┐
│  PREDICTION MARKETS                │
│                                    │
│  ¿Quién ganará primera vuelta?     │
│                                    │
│  Rafael López Aliaga               │
│  Odds: 2.3x                        │
│  Apuesta: [___] puntos             │
│  [Apostar]                         │
│                                    │
│  Keiko Fujimori                    │
│  Odds: 4.1x                        │
│  Apuesta: [___] puntos             │
│  [Apostar]                         │
│                                    │
│  TUS APUESTAS:                     │
│  500pts en RLA (ganas 1,150 si win)│
│  200pts en VM (ganas 1,400 si win) │
│                                    │
│  BALANCE: 10,450 puntos            │
│  RANK: #234 de 45,000              │
└────────────────────────────────────┘
```

**Por Qué Es Útil:**
- Gamificación masiva
- Insights de "sabiduría de las masas"
- Engagement continuo hasta elecciones
- No es dinero real (evita problemas legales)

**Leaderboard:**
- Top 100 predictores
- Premios: Badges especiales, mentions, premium gratis

---

### Feature #2: Crowdsourced Fact-Checking

**Concepto:** Community verifica claims de políticos

**Proceso:**

1. **Claim Submission**
   - User reporta claim de candidato
   - "RLA dijo que redujo crimen en 40%"

2. **Evidence Gathering**
   - Community busca evidencia
   - Presenta fuentes

3. **Voting**
   - Users votan: Verdadero / Falso / Necesita más evidencia
   - Users con alto Trust Score tienen más peso

4. **Consensus**
   - Si >70% coincide → Fact-check publicado
   - Si no hay consenso → Escalado a profesionales (OjoPúblico)

**Trust Score System:**

```
trust_score = (
    0.40 * accuracy_of_past_factchecks +
    0.30 * quality_of_sources_provided +
    0.20 * community_upvotes +
    0.10 * account_age
)
```

**Gamificación:**
- XP por fact-checks correctos
- Badge "Fact-Checker Verified"
- Leaderboard

---

### Feature #3: Content Creation Avanzado

**Para Super Users:**

1. **Análisis Largos**
   - Artículos de hasta 2000 palabras
   - Formatting completo
   - Fuentes citadas

2. **Propuestas de Política**
   - Template estructurado
   - Problema → Solución → Implementación → Costo
   - Community vota viabilidad

3. **AMAs (Ask Me Anything)**
   - Expertos pueden hacer sesiones
   - Community pregunta
   - Verificación de credenciales

---
