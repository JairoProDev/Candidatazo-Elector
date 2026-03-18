## 7. USER FLOWS COMPLETOS

### 7.1 ONBOARDING FLOW - Primera Experiencia Crítica

#### Flow Principal: De Descarga a Primera Acción
```
1. App Download
   ↓
2. Splash Screen (2s)
   - Logo Candidatazo
   - "Tu voz cuenta"
   ↓
3. Welcome Carousel (3 screens, swipeable)
   Screen 1: "Descubre tu ADN Político"
   - Visual: Animación de match
   - Copy: "¿Con quién compartes valores?"
   
   Screen 2: "Únete a la conversación"
   - Visual: Burbujas de debates
   - Copy: "Miles debaten los temas que importan"
   
   Screen 3: "Toma decisiones informadas"
   - Visual: Gráfico de propuestas
   - Copy: "Compara candidatos en tiempo real"
   ↓
4. Permission Requests
   - Notificaciones (crítico para retention)
   - Ubicación (opcional, para eventos locales)
   ↓
5. Método de Registro
   ┌─────────────┬──────────────┬─────────────┐
   │   Google    │   Facebook   │    Email    │
   └─────────────┴──────────────┴─────────────┘
   ↓
6. Creación de Perfil Básico
   - Nombre (prefilled si OAuth)
   - Username único (@usuario)
   - Foto (opcional, puede agregar después)
   - Distrito (dropdown, crítico para matching local)
   ↓
7. Pregunta Clave de Segmentación
   "¿Qué te trae a Candidatazo?"
   □ Quiero decidir mi voto
   □ Me interesa la política
   □ Quiero debatir temas importantes
   □ Solo curiosidad
   
   (Determina el primer flow a mostrar)
   ↓
8. Primer CTA Principal
   ┌─────────────────────────────────┐
   │  🧬 DESCUBRE TU ADN POLÍTICO    │
   │     (Test de 10 minutos)        │
   └─────────────────────────────────┘
   
   "Antes de empezar a explorar..."
   [Empezar Test] [Explorar primero →]
   ↓
9A. Si elige Test → DNA Test Flow (ver 7.2)
9B. Si elige Explorar → Feed con Tutorial Overlay
```

**Métricas de Éxito del Onboarding:**
- Completion rate target: 75%
- Time to first action: <3 minutos
- Permission acceptance: >60% notificaciones
- Registro completado: >85% de descargas

**Puntos de Fricción Identificados:**
1. **Registro con email**: Más fricción que OAuth
   - Solución: Pre-fill con magic link
2. **Selección de distrito**: Puede ser confuso
   - Solución: Auto-detectar por ubicación + confirmación
3. **Foto de perfil**: Detiene el flow
   - Solución: Hacer opcional con incentivo posterior

---

### 7.2 DNA TEST FLOW - La Experiencia Core

#### Estructura del Test Completo

```
FASE 1: INTRODUCCIÓN (1 screen)
┌────────────────────────────────────┐
│  "Responde 30 preguntas sobre los  │
│   temas más importantes de Perú"   │
│                                    │
│  ⏱️ ~10 minutos                     │
│  📊 100% anónimo                    │
│  🎯 Matching científico             │
│                                    │
│     [Comenzar Test →]              │
└────────────────────────────────────┘

↓

FASE 2: PREGUNTAS (30 cards)
┌────────────────────────────────────┐
│  Pregunta 1/30                  [i]│
│                                    │
│  "¿Deberían las empresas mineras  │
│   pagar más impuestos?"            │
│                                    │
│  ○ Totalmente en contra            │
│  ○ En contra                       │
│  ○ Neutral                         │
│  ○ De acuerdo                      │
│  ○ Totalmente de acuerdo           │
│                                    │
│  [←]                          [→]  │
│                                    │
│  🔥 Este tema es: ▁▂▃▄▅▆▇█        │
│     (Importancia para ti)          │
└────────────────────────────────────┘

[i] = Tooltip explicativo:
"Esta pregunta mide tu postura sobre
 distribución de riqueza extractiva"

↓

FASE 3: PROCESAMIENTO (1 screen con animación)
┌────────────────────────────────────┐
│                                    │
│     🧬 Analizando tu ADN           │
│        Político...                 │
│                                    │
│     [Animación de loading]         │
│     [Barra de progreso]            │
│                                    │
│  ✓ Comparando con 130 candidatos   │
│  ✓ Analizando coincidencias        │
│  ✓ Calculando match...             │
│                                    │
└────────────────────────────────────┘

↓

FASE 4: RESULTADOS PRINCIPALES (Primera pantalla)
┌────────────────────────────────────┐
│     TU ADN POLÍTICO 🧬              │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  📍 TU PERFIL IDEOLÓGICO     │ │
│  │                              │ │
│  │  [Gráfico de radar 8 ejes]   │ │
│  │                              │ │
│  │  • Económico: Centro-Izq     │ │
│  │  • Social: Progresista       │ │
│  │  • Institucional: Reformista │ │
│  │  • Ambiental: Proteccionista │ │
│  │  [+4 ejes más]               │ │
│  └──────────────────────────────┘ │
│                                    │
│     [Ver mis matches →]            │
└────────────────────────────────────┘

↓

FASE 5: TOP MATCHES (Scroll vertical)
┌────────────────────────────────────┐
│     TUS MEJORES MATCHES 🎯          │
│                                    │
│  1. [Foto] Juan Pérez             │
│     Candidato al Congreso         │
│     Lima - Distrito 15            │
│     ████████░░ 87% Match           │
│     [Ver perfil] [Seguir]         │
│                                    │
│  2. [Foto] María García            │
│     Candidata al Senado           │
│     Lima - Circunscripción 1      │
│     ███████░░░ 82% Match           │
│     [Ver perfil] [Seguir]         │
│                                    │
│  3. [Foto] Carlos Ruiz             │
│     Candidato Presidencial        │
│     Partido X                     │
│     ███████░░░ 79% Match           │
│     [Ver perfil] [Seguir]         │
│                                    │
│  [Ver todos los matches (130) →]   │
└────────────────────────────────────┘

↓

FASE 6: BREAKDOWN DETALLADO
┌────────────────────────────────────┐
│  COINCIDENCIAS CON JUAN PÉREZ      │
│                                    │
│  Temas en los que coinciden:       │
│  ✓ Minería y medio ambiente (95%)  │
│  ✓ Educación pública (92%)         │
│  ✓ Reforma tributaria (88%)        │
│  ✓ Salud universal (87%)           │
│                                    │
│  Temas donde difieren:             │
│  ✗ Política exterior (45%)         │
│  ✗ Seguridad ciudadana (52%)       │
│                                    │
│  [Ver comparación completa →]      │
└────────────────────────────────────┘

↓

FASE 7: LLAMADO A ACCIÓN SOCIAL
┌────────────────────────────────────┐
│  ¡Comparte tus resultados! 📊       │
│                                    │
│  [Imagen generada para compartir]  │
│                                    │
│  "Mi ADN Político: Centro-Izq      │
│   Progresista 🧬                   │
│   87% match con Juan Pérez         │
│   Descubre el tuyo en              │
│   candidatazo.com"                 │
│                                    │
│  [📱 Compartir] [⏭️ Siguiente]     │
└────────────────────────────────────┘

↓

FASE 8: ACTIVACIÓN DE FEATURES SOCIALES
┌────────────────────────────────────┐
│  ¿Qué quieres hacer ahora?         │
│                                    │
│  🔍 Explorar propuestas            │
│     Ver qué plantea cada candidato │
│                                    │
│  💬 Unirte a debates               │
│     Miles están discutiendo ahora  │
│                                    │
│  📅 Eventos cerca de ti            │
│     3 debates esta semana          │
│                                    │
│  👥 Seguir candidatos              │
│     Recibe sus actualizaciones     │
│                                    │
│  [Explorar feed →]                 │
└────────────────────────────────────┘
```

**Optimizaciones del Test:**
1. **Adaptive Testing**: Después de 15 preguntas, ya tenemos 70% de certeza
   - Opción de terminar early para usuarios impacientes
2. **Progress Gamification**: 
   - "Pregunta 10/30 - ¡Ya vas a mitad!"
   - Badges cada 10 preguntas
3. **Engagement Hooks**:
   - Mostrar % de personas que respondieron igual
   - "85% de peruanos están de acuerdo contigo"
4. **Save & Resume**: Auto-save cada 5 preguntas

---

### 7.3 FEED & DISCOVERY FLOW

#### Feed Principal - Algoritmo y Presentación

```
FEED HOME (Tab principal)
┌────────────────────────────────────┐
│  [Tabs superiores]                 │
│  Para ti | Siguiendo | Popular     │
│  ────────                          │
│                                    │
│  [Stories - Swipeable horizontal]  │
│  ○ ○ ○ ○ ○ ○ ○ ○                   │
│  Candidatos Vivos | Debates | Tu   │
│                                    │
├────────────────────────────────────┤
│                                    │
│  📊 ENCUESTA RÁPIDA (Card)          │
│  "¿Debe eliminarse la inmunidad    │
│   parlamentaria?"                  │
│                                    │
│  Sí [████████] 73%                 │
│  No [██░░░░░░] 18%                 │
│  NS [█░░░░░░░] 9%                  │
│                                    │
│  12.4K votos • Termina en 2h       │
│  [Votar y ver resultados]          │
│                                    │
├────────────────────────────────────┤
│                                    │
│  💬 DEBATE TRENDING (Card)          │
│  🔥 #ReformaJudicial               │
│                                    │
│  "¿Es suficiente el proyecto de    │
│   reforma del sistema judicial?"   │
│                                    │
│  👤 @maria_legal (postura A)       │
│  "El proyecto no ataca la raíz..." │
│  ❤️ 234  💬 45                      │
│                                    │
│  👤 @juan_abogado (postura B)      │
│  "Es un primer paso necesario..."  │
│  ❤️ 189  💬 32                      │
│                                    │
│  [Unirme al debate →] 892 personas │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🎙️ POST DE CANDIDATO (Card)       │
│  👤 Juan Pérez (@juanperez) • 87%  │
│  Candidato al Congreso - Lima 15   │
│  [Verificado ✓]                    │
│                                    │
│  [Video 0:45]                      │
│  "Nuestra propuesta para reducir   │
│   la brecha digital en educación"  │
│                                    │
│  ❤️ 1.2K  💬 234  🔄 89  📊 Ver más │
│                                    │
│  💬 Principales comentarios:        │
│  @usuario1: "¿Y el presupuesto?"   │
│  👍 23 💬 Reply                     │
│                                    │
├────────────────────────────────────┤
│                                    │
│  📈 PROPUESTA COMPARADA (Card)      │
│  "Salud: Propuestas de candidatos  │
│   presidenciales"                  │
│                                    │
│  [Tabla interactiva]               │
│  Tema     │ Cand A │ Cand B │ Tú   │
│  ──────────────────────────────────│
│  Hospital │  ✓✓✓  │   ✓✓   │  ✓✓✓ │
│  Salario  │  ✓✓   │  ✓✓✓   │  ✓✓  │
│  [...]                             │
│                                    │
│  [Ver comparación completa →]      │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🎯 PREDICCIÓN MERCADO (Card)       │
│  "¿Quién crees que ganará en       │
│   Lima Centro?"                    │
│                                    │
│  Candidato A  [Buy] S/.0.42        │
│  Candidato B  [Buy] S/.0.31        │
│  Candidato C  [Buy] S/.0.18        │
│                                    │
│  Tu portafolio: +124 pts (top 8%)  │
│  [Ver mercado completo →]          │
│                                    │
└────────────────────────────────────┘
```

**Algoritmo de Feed - Ranking Factors:**

```javascript
function calculateFeedScore(item, user) {
  let score = 0;
  
  // 1. Relevancia Ideológica (30%)
  if (item.type === 'candidate_post') {
    const matchScore = user.dna_match[item.candidate_id];
    score += matchScore * 0.3;
  }
  
  // 2. Engagement Reciente (25%)
  const engagementRate = (
    item.likes + 
    item.comments * 3 + 
    item.shares * 5
  ) / item.impressions;
  score += normalize(engagementRate) * 0.25;
  
  // 3. Temporalidad (20%)
  const ageHours = (Date.now() - item.created_at) / 3600000;
  score += Math.exp(-ageHours / 24) * 0.2; // Decae exponencialmente
  
  // 4. Diversidad de Perspectivas (15%)
  const recentPoliticalLean = user.recent_feed_lean;
  if (item.political_lean !== recentPoliticalLean) {
    score += 0.15; // Bonus por diversidad
  }
  
  // 5. Tipo de Contenido Preferido (10%)
  const userPreference = user.content_type_preferences[item.type];
  score += userPreference * 0.1;
  
  return score;
}

// Content Mix Targets
const FEED_MIX = {
  candidate_posts: 0.35,      // 35% posts de candidatos
  debates: 0.25,              // 25% debates comunitarios
  polls: 0.15,                // 15% encuestas
  analysis: 0.15,             // 15% análisis y comparaciones
  prediction_markets: 0.10    // 10% mercados de predicción
};
```

**Anti-Echo Chamber Mechanics:**
1. **Diversity Injection**: 1 de cada 5 posts es de postura contraria
2. **"Different Perspective" Label**: Claramente marcado
3. **Constructive Framing**: "X personas que piensan diferente argumentan..."
4. **No Penalty**: No afecta negativamente el engagement

---

### 7.4 CANDIDATE PROFILE FLOW

#### Perfil de Candidato - Información Completa

```
HEADER (Fixed top)
┌────────────────────────────────────┐
│  [← Back]           [...] [Share]  │
│                                    │
│  [Foto grande]                     │
│  Juan Pérez ✓                      │
│  @juanperez                        │
│                                    │
│  Candidato al Congreso             │
│  Lima - Distrito 15                │
│  Partido Liberal Democrático       │
│                                    │
│  ████████░░ 87% Match contigo      │
│                                    │
│  [Seguir] [Mensaje] [Comparar]     │
│                                    │
│  14.2K seguidores                  │
└────────────────────────────────────┘

↓ [Tabs]

TAB 1: RESUMEN
┌────────────────────────────────────┐
│  📊 COINCIDENCIAS CLAVE             │
│                                    │
│  Están de acuerdo en:              │
│  ✓ Reforma tributaria progresiva   │
│  ✓ Protección ambiental estricta   │
│  ✓ Educación pública universal     │
│  ✓ Transparencia total             │
│                                    │
│  Difieren en:                      │
│  ✗ Política de seguridad           │
│  ✗ Relaciones internacionales      │
│                                    │
│  [Ver análisis completo →]         │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🎯 PROPUESTAS PRINCIPALES          │
│                                    │
│  1. Plan de Banda Ancha Rural      │
│     "100% de escuelas con internet │
│      de alta velocidad en 3 años"  │
│     ⏰ Plazo: 2027-2029             │
│     💰 S/. 450M presupuesto         │
│     [Ver detalles →]               │
│                                    │
│  2. Reforma del Sistema de Salud   │
│     "Hospital por distrito en 5    │
│      años"                         │
│     ⏰ Plazo: 2026-2030             │
│     💰 S/. 2.3B presupuesto         │
│     [Ver detalles →]               │
│                                    │
│  [Ver todas las propuestas (12) →] │
│                                    │
├────────────────────────────────────┤
│                                    │
│  📈 VERIFICACIÓN DE FACTS           │
│  Por OjoPúblico                    │
│                                    │
│  ✓ 8 afirmaciones verificadas      │
│  ⚠️ 2 afirmaciones cuestionables   │
│  ✗ 0 afirmaciones falsas           │
│                                    │
│  Rating de Verdad: 8.5/10          │
│  [Ver fact-checks →]               │
│                                    │
└────────────────────────────────────┘

TAB 2: PROPUESTAS (Lista filterable)
┌────────────────────────────────────┐
│  [Filtros]                         │
│  Todas | Economía | Salud | Edu... │
│                                    │
│  [Ordenar por]                     │
│  Relevancia | Presupuesto | Plazo  │
│                                    │
├────────────────────────────────────┤
│                                    │
│  PROPUESTA: Banda Ancha Rural      │
│                                    │
│  📝 Descripción:                    │
│  "Dotar a todas las escuelas       │
│   rurales del Perú de conexión..."│
│                                    │
│  🎯 Objetivo cuantificable:         │
│  • 15,000 escuelas conectadas      │
│  • Velocidad mínima: 100 Mbps      │
│  • Cobertura: 100% zonas rurales   │
│                                    │
│  💰 Presupuesto:                    │
│  S/. 450,000,000                   │
│  Fuente: Reasignación + Préstamo   │
│  BID                               │
│                                    │
│  ⏰ Timeline:                        │
│  2027: Licitación                  │
│  2028: Instalación 60%             │
│  2029: Completado 100%             │
│                                    │
│  📊 Factibilidad:                   │
│  Técnica:   ████████░░ 85%         │
│  Financiera: ███████░░░ 70%        │
│  Política:  ██████░░░░ 60%         │
│  (Evaluado por expertos)           │
│                                    │
│  💬 Discusión (234)                 │
│  ❤️ Apoyo (89%) | 👎 Críticas (11%)│
│                                    │
│  [Opinar] [Comparar con otros]     │
│                                    │
└────────────────────────────────────┘

TAB 3: TRAYECTORIA
┌────────────────────────────────────┐
│  🎓 EDUCACIÓN                       │
│  Universidad Nacional Mayor de     │
│  San Marcos                        │
│  Economía (2008-2012)              │
│  Tesis: "Impacto de la minería..." │
│                                    │
│  London School of Economics        │
│  MSc Development Economics (2014)  │
│                                    │
├────────────────────────────────────┤
│                                    │
│  💼 EXPERIENCIA PROFESIONAL         │
│  2015-2018: Economista Senior      │
│  Banco Central de Reserva          │
│                                    │
│  2018-2022: Asesor Económico       │
│  Ministerio de Economía            │
│                                    │
│  2022-2025: Consultor              │
│  Independiente                     │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🏛️ EXPERIENCIA POLÍTICA            │
│  2020: Candidato a Regidor         │
│  Municipalidad de Lima             │
│  Resultado: No elegido (5to puesto)│
│                                    │
│  2023-2024: Militante              │
│  Partido Liberal Democrático       │
│                                    │
├────────────────────────────────────┤
│                                    │
│  📜 DECLARACIÓN JURADA              │
│  [PDF] Bienes e ingresos 2025      │
│  [PDF] Vinculaciones económicas    │
│  [PDF] Sentencias judiciales       │
│  (Ninguna)                         │
│                                    │
│  ✓ Verificado por RENIEC/JNE       │
│                                    │
└────────────────────────────────────┘

TAB 4: ACTIVITY (Posts & Updates)
┌────────────────────────────────────┐
│  [Posts del candidato en orden     │
│   cronológico inverso, mismo       │
│   formato que feed]                │
└────────────────────────────────────┘

TAB 5: DEBATES (Participación)
┌────────────────────────────────────┐
│  DEBATES PRÓXIMOS                  │
│                                    │
│  📅 15 Feb - 7:00 PM               │
│  "Política Económica 2026"         │
│  vs. María García, Carlos Ruiz     │
│  [Recordarme] [Ver detalles]       │
│                                    │
│  DEBATES PASADOS                   │
│                                    │
│  ✓ 8 Feb - "Salud Universal"       │
│     [Ver grabación] [Resumen IA]   │
│                                    │
│  ✓ 2 Feb - "Seguridad Ciudadana"   │
│     [Ver grabación] [Resumen IA]   │
│                                    │
└────────────────────────────────────┘
```

**Comparison Tool:**
```
Al presionar [Comparar]:
┌────────────────────────────────────┐
│  COMPARAR CON:                     │
│                                    │
│  🔍 [Buscar candidato...]          │
│                                    │
│  TUS MATCHES:                      │
│  □ María García (82%)              │
│  □ Carlos Ruiz (79%)               │
│  □ Ana López (76%)                 │
│                                    │
│  [Comparar seleccionados →]        │
└────────────────────────────────────┘

Resultado:
┌────────────────────────────────────┐
│  COMPARACIÓN: Juan vs María        │
│                                    │
│  [Tabla lado a lado]               │
│  Tema      │ Juan    │ María       │
│  ─────────────────────────────────│
│  Salud     │ Hosp.   │ Seguro      │
│            │ público │ universal   │
│            │ S/.2.3B │ S/.1.8B     │
│  ─────────────────────────────────│
│  Educación │ +30%    │ +25%        │
│            │ presupu │ presupu     │
│  ─────────────────────────────────│
│  [Continúa...]                     │
│                                    │
│  🎯 Match contigo:                 │
│  Juan: 87%  vs  María: 82%         │
│                                    │
│  [Exportar PDF] [Compartir]        │
└────────────────────────────────────┘
```

---

### 7.5 DEBATE FLOW - Participación Estructurada

#### Estructura de un Debate

```
FASE 1: DISCOVERY
Feed muestra:
┌────────────────────────────────────┐
│  🔥 DEBATE TRENDING                │
│  #ReformaJudicial                  │
│                                    │
│  "¿Es suficiente el proyecto de    │
│   reforma del sistema judicial?"   │
│                                    │
│  👥 892 participantes              │
│  💬 1,243 argumentos               │
│  ⏰ Termina en 2 días              │
│                                    │
│  Top posturas:                     │
│  A: Insuficiente (58%)             │
│  B: Adecuado (32%)                 │
│  C: Excesivo (10%)                 │
│                                    │
│  [Unirme al debate →]              │
└────────────────────────────────────┘

↓

FASE 2: ONBOARDING AL DEBATE
┌────────────────────────────────────┐
│  Antes de participar...            │
│                                    │
│  📜 REGLAS DEL DEBATE:             │
│  ✓ Respeto obligatorio             │
│  ✓ Argumentos con fuentes          │
│  ✓ No ataques personales           │
│  ✓ Debate la idea, no la persona   │
│                                    │
│  Tu reputación: ⭐⭐⭐⭐⭐ (5.0)      │
│  Violar reglas afecta tu score     │
│                                    │
│  [Entendido, continuar →]          │
└────────────────────────────────────┘

↓

FASE 3: ELEGIR POSTURA
┌────────────────────────────────────┐
│  ¿Cuál es tu postura?              │
│                                    │
│  ○ A: La reforma es insuficiente   │
│     No ataca problemas de fondo    │
│     58% están aquí (516 personas)  │
│                                    │
│  ○ B: La reforma es adecuada       │
│     Es un primer paso necesario    │
│     32% están aquí (285 personas)  │
│                                    │
│  ○ C: La reforma es excesiva       │
│     Sobrerregula el sistema        │
│     10% están aquí (91 personas)   │
│                                    │
│  [Elegir y continuar →]            │
│                                    │
│  💡 Podrás ver argumentos de todas │
│     las posturas                   │
└────────────────────────────────────┘

↓

FASE 4: VISTA DEL DEBATE (Main Screen)
┌────────────────────────────────────┐
│  [Tabs]                            │
│  Todos | Mi postura | Contrarias   │
│  ────────                          │
│                                    │
│  [Ordenar por]                     │
│  Relevancia | Recientes | Votos    │
│                                    │
├────────────────────────────────────┤
│                                    │
│  💬 ARGUMENTO (Card)                │
│  👤 @maria_legal                   │
│  Abogada constitucionalista        │
│  Reputación: ⭐⭐⭐⭐⭐ 4.8           │
│  Postura A                         │
│                                    │
│  "El proyecto de reforma no aborda │
│   la captura política de la        │
│   Junta Nacional de Justicia..."   │
│                                    │
│   📎 Fuentes:                      │
│   • Informe IDL 2024               │
│   • Estudio PUCP sobre JNJ         │
│                                    │
│  👍 234 👎 12  💬 45 respuestas     │
│                                    │
│  [Responder] [Guardar]             │
│                                    │
├────────────────────────────────────┤
│                                    │
│  💬 ARGUMENTO (Card)                │
│  👤 @juan_abogado                  │
│  Especialista en reforma judicial  │
│  Reputación: ⭐⭐⭐⭐⭐ 4.6           │
│  Postura B (contraria a ti)        │
│                                    │
│  "Si bien es cierto que el         │
│   proyecto tiene limitaciones,     │
│   establece mecanismos..."         │
│                                    │
│   📎 Fuentes:                      │
│   • Texto del proyecto de ley      │
│   • Comparativa regional           │
│                                    │
│  👍 189 👎 8  💬 32 respuestas      │
│                                    │
│  [Responder] [Guardar]             │
│                                    │
└────────────────────────────────────┘

↓

FASE 5: PARTICIPAR - Agregar Argumento
[Botón flotante: + Agregar argumento]
┌────────────────────────────────────┐
│  NUEVO ARGUMENTO                   │
│                                    │
│  Tu postura: A - Insuficiente      │
│                                    │
│  [Área de texto expandible]        │
│  "Escribe tu argumento aquí..."    │
│                                    │
│  0/1000 caracteres                 │
│                                    │
│  📎 Agregar fuentes (opcional)     │
│  [+ URL o subir PDF]               │
│                                    │
│  💡 Tips para buenos argumentos:   │
│  • Sé específico y concreto        │
│  • Usa datos verificables          │
│  • Respeta posturas contrarias     │
│                                    │
│  [Cancelar] [Publicar →]           │
└────────────────────────────────────┘

AI Moderation Pre-publish:
┌────────────────────────────────────┐
│  ⚠️ Revisión Automática            │
│                                    │
│  Tu argumento será visible una vez │
│  verificado por nuestro sistema    │
│                                    │
│  Verificando:                      │
│  ✓ Lenguaje respetuoso             │
│  ✓ Sin ataques personales          │
│  ✓ Relevante al tema               │
│  ⏳ Verificando fuentes...         │
│                                    │
│  [Procesando...]                   │
└────────────────────────────────────┘

Si pasa:
✓ Tu argumento está publicado!
  Recibirás notificación de respuestas

Si no pasa:
⚠️ Hay un problema con tu argumento:
  - "politico corrupto" → lenguaje ofensivo
  Sugerencia: "político con acusaciones"
  [Editar] [Cancelar]
```

**Sistema de Reputación en Debates:**
- Empiezas con 5.0 ⭐
- +0.1 por argumento bien recibido (ratio positivo)
- +0.2 por argumento con fuentes verificadas
- -0.3 por argumento reportado y confirmado como problemático
- -1.0 por ban temporal
- Reputación afecta visibilidad de argumentos

---

### 7.6 NOTIFICATION FLOW - Engagement Engine

#### Tipos de Notificaciones Estratégicas

```
NOTIFICACIONES PUSH (Ejemplos reales)

1. ENGAGEMENT CON TU CONTENIDO
┌────────────────────────────────────┐
│  🔔 @juan_abogado respondió a tu   │
│     argumento en #ReformaJudicial  │
│                                    │
│  "Entiendo tu punto, pero creo que│
│   pasas por alto..."               │
│                                    │
│  Hace 5 min · [Ver respuesta →]    │
└────────────────────────────────────┘

2. MATCH NUEVO DETECTADO
┌────────────────────────────────────┐
│  🎯 ¡Nuevo candidato con 91% match!│
│                                    │
│  María Fernández acaba de          │
│  registrarse para Senado Lima      │
│                                    │
│  Coinciden en:                     │
│  ✓ Educación ✓ Salud ✓ Ambiente   │
│                                    │
│  [Ver perfil →]                    │
└────────────────────────────────────┘

3. DEBATE ACTIVO EN TU TEMA
┌────────────────────────────────────┐
│  🔥 Debate trending en un tema     │
│     que te importa                 │
│                                    │
│  #ReformaLaboral está explotando   │
│  234 nuevos argumentos hoy         │
│                                    │
│  Tu postura tiene 67% de apoyo     │
│                                    │
│  [Unirme al debate →]              │
└────────────────────────────────────┘

4. CANDIDATO QUE SIGUES PUBLICÓ
┌────────────────────────────────────┐
│  📢 Juan Pérez publicó una nueva   │
│     propuesta                      │
│                                    │
│  "Plan de Conectividad Rural:      │
│   Internet para todas las escuelas"│
│                                    │
│  Hace 15 min · [Ver detalles →]    │
└────────────────────────────────────┘

5. PREDICCIÓN QUE HICISTE CAMBIANDO
┌────────────────────────────────────┐
│  📈 Tu predicción está ganando     │
│                                    │
│  "Candidato A gana Lima Centro"    │
│  subió de 42% → 51%                │
│                                    │
│  +87 puntos en tu portafolio       │
│                                    │
│  [Ver mercado →]                   │
└────────────────────────────────────┘

6. EVENTO PRÓXIMO
┌────────────────────────────────────┐
│  📅 Debate presidencial en 1 hora  │
│                                    │
│  "Economía y Empleo"               │
│  Los 5 candidatos principales      │
│                                    │
│  🔴 Transmisión en vivo            │
│  [Configurar recordatorio]         │
└────────────────────────────────────┘

7. ENCUESTA RÁPIDA DIARIA
┌────────────────────────────────────┐
│  📊 Pregunta del día               │
│                                    │
│  "¿Debería ser obligatorio el voto│
│   para mayores de 70 años?"        │
│                                    │
│  [Sí] [No] [No sé]                 │
│                                    │
│  Solo toma 3 segundos              │
└────────────────────────────────────┘

8. LOGRO DESBLOQUEADO
┌────────────────────────────────────┐
│  🏆 ¡Nuevo badge!                  │
│                                    │
│  "Debatiente Activo"               │
│  Participaste en 10 debates        │
│                                    │
│  +50 puntos de reputación          │
│                                    │
│  [Ver perfil →]                    │
└────────────────────────────────────┘

9. CONTENT CURADO SEMANAL
┌────────────────────────────────────┐
│  📬 Tu resumen semanal está listo  │
│                                    │
│  • 3 propuestas nuevas de tus      │
│    candidatos                      │
│  • 2 debates que te perdiste       │
│  • 5 verificaciones importantes    │
│                                    │
│  [Leer resumen (5 min) →]          │
└────────────────────────────────────┘

10. URGENCIA PRE-ELECTORAL
┌────────────────────────────────────┐
│  ⚠️ QUEDAN 7 DÍAS PARA VOTAR       │
│                                    │
│  ¿Ya decidiste tu voto?            │
│                                    │
│  Tus matches actuales:             │
│  1. Juan Pérez (87%)               │
│  2. María García (82%)             │
│                                    │
│  [Ver mis opciones →]              │
└────────────────────────────────────┘
```

**Estrategia de Timing:**
- **Mañana (7-9 AM)**: Resumen diario, encuesta rápida
- **Mediodía (12-2 PM)**: Debates trending, nuevos matches
- **Tarde (6-8 PM)**: Actividad de candidatos, eventos
- **Noche (9-11 PM)**: Engagement con tu contenido
- **Nunca**: 11 PM - 7 AM (Do Not Disturb)

**Frecuencia Máxima:**
- Usuarios nuevos: Max 3 notificaciones/día (primeros 7 días)
- Usuarios activos: Max 5 notificaciones/día
- Power users: Max 8 notificaciones/día
- NUNCA: Spam consecutivo (min 2h entre notificaciones similares)

---
