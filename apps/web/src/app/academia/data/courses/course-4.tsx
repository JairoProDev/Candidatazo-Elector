import { Course } from "../../types";

export const course4: Course = {
    id: 4,
    slug: "partidos-politicos",
    title: "Partidos políticos en Perú",
    description: "Historia y actualidad del sistema de partidos. Desde los primeros partidos hasta la fragmentación actual.",
    difficulty: "Intermedio",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    time: "25 min",
    xp: 200,
    tags: ["Partidos", "Política", "Historia"],
    topics: ["APRA y su legado", "Fragmentación", "Partidos vientre de alquiler"],
    icon: null,
    lessons: [
        {
            id: "l1",
            title: "De la Estabilidad al Caos",
            content: `
**La era dorada (1829-1992):**

Perú tuvo partidos políticos institucionalizados durante más de 160 años:

- **Partido Civil** (1871): Primer partido moderno, fundado por Manuel Pardo
- **APRA** (1924): Alianza Popular Revolucionaria Americana, liderada por Víctor Raúl Haya de la Torre
- **Acción Popular** (1956): Fundado por Fernando Belaúnde Terry
- **Partido Popular Cristiano - PPC** (1966)
- **Izquierda Unida** (1980s): Coalición de partidos de izquierda

**El quiebre: Autogolpe de 1992**

Alberto Fujimori disolvió el Congreso bicameral, eliminó el sistema de partidos tradicional y creó un nuevo orden político basado en:
- Liderazgo personalista (no partidario)
- Constitución de 1993
- Congreso unicameral

**La década de 1990-2021:**

- 8 elecciones generales
- Surgimiento de partidos "efímeros" (duran 1 o 2 elecciones)
- Alta volatilidad electoral
- Dominio de "outsiders" y movimientos personalistas

**Récord de participaciones 1990-2021:**

- APRA: 7 elecciones (ausente solo en 2021)
- Acción Popular: 6 elecciones
- Fuerza Popular: 3 elecciones (2011, 2016, 2021)
- Perú Posible: 3 elecciones (2001, 2006, 2011)
- Alianza para el Progreso: 3 elecciones

La mayoría de partidos participó solo 1-2 veces.`
        },
        {
            id: "l2",
            title: "La Fragmentación Política",
            content: `
**Los números hablan:**

- **2006:** 24 partidos, 7 obtuvieron escaños
- **2011:** 14 partidos, 6 obtuvieron escaños
- **2016:** 20 partidos, 10 obtuvieron escaños
- **2021:** 18 partidos, 9 obtuvieron escaños en un Congreso de 130
- **2026:** 43 partidos inscritos, 38-40 competirán

**¿Qué causa esta fragmentación?**

1. **Baja valla de entrada:**
   - Solo 0.1% del padrón electoral en firmas para inscribirse
   - 43 partidos han logrado inscripción

2. **Eliminación de las PASO:**
   - En 2019 se establecieron Primarias Abiertas Simultáneas y Obligatorias
   - En 2024 el Congreso las eliminó
   - Ahora los partidos eligen candidatos internamente (delegados)

3. **Sistema de voto preferencial:**
   - Incentiva competencia individual sobre cohesión partidaria
   - Candidatos se promocionan a sí mismos, no al partido

4. **Crisis de legitimidad:**
   - Congreso con 93% de desaprobación ciudadana
   - Partidos con baja confianza ciudadana
   - 30% de voto blanco/nulo en encuestas`
        },
        {
            id: "l3",
            title: "Actores Políticos 2026",
            content: `
**DERECHA Y CENTRO-DERECHA (Fragmentada):**

- **Fuerza Popular** - Keiko Fujimori: Herencia fujimorista, pro-mercado, conservador.
- **Renovación Popular** - Rafael López Aliaga: Ultraconservador, empresario.
- **Avanza País**: Liberal económico, pro-formalización.
- **Alianza para el Progreso** - César Acuña: Regionalista con alcance nacional.

**IZQUIERDA Y CENTRO-IZQUIERDA (Muy fragmentada):**

- **Juntos por el Perú** - Verónika Mendoza: Izquierda progresista, ambientalismo.
- **Perú Libre** - Vladimir Cerrón: Marxista-leninista, partido de Castillo.
- **Nuevo Perú**: Izquierda moderada.

**CENTRO:**

- **APRA**: Histórico, liderazgo en reconstrucción.
- **Acción Popular**: Histórico, centro-derecha democrático.

**OUTSIDERS Y NUEVOS:**
Más de 25 partidos nuevos o recientes sin trayectoria clara.`
        },
        {
            id: "l4",
            title: "¿Por qué son tan débiles?",
            content: `
**Diagnóstico de expertos:**

**1. "Grupos de amigos, no partidos políticos"**
Los partidos peruanos no son organizaciones con ideología clara, estructura territorial o planes serios. Son "vehículos electorales" que se arman cada 5 años.

**2. Colapso partidario:**
Partidos que fueron gobierno y desaparecieron: Perú Posible, Partido Nacionalista, Peruanos Por el Kambio.

**3. Transfuguismo:**
En el Congreso 2021-2026, 55 de 130 congresistas cambiaron de bancada.

**4. Financiamiento opaco:**
Múltiples denuncias de financiamiento ilegal (Caso Odebrecht, Lava Jato).`
        },
        {
            id: "l5",
            title: "Consecuencias de la Fragmentación",
            content: `
**Gobernabilidad imposible:**
Con 40+ partidos, ningún partido obtendrá mayoría. El Presidente podría ganar con 10-15% en primera vuelta.

**"8 presidentes en 10 años":**
Inestabilidad crónica desde 2016 (PPK, Vizcarra, Merino, Sagasti, Castillo, Boluarte).

**Círculo vicioso:**
Partidos débiles → Candidatos de mala calidad → Gobierno débil → Ciudadanos descontentos → Más fragmentación.

**¿Hay solución?**
Propuestas: Elevar valla electoral, prohibir transfuguismo, democracia interna, limitar número de partidos. Pero el Congreso actual no tiene incentivos para reformarse.`
        }
    ],
    quiz: {
        title: "Evaluación: Partidos Políticos",
        questions: [
            {
                id: 1,
                question: "¿Cuántos partidos políticos están inscritos para competir en 2026?",
                options: ["20 partidos", "30 partidos", "43 partidos", "60 partidos"],
                correctAnswer: 2,
                explanation: "Un récord histórico de fragmentación partidaria."
            },
            {
                id: 2,
                question: "¿Qué partido tiene el récord de participaciones desde 1990?",
                options: ["Fuerza Popular", "APRA", "Perú Libre", "Acción Popular"],
                correctAnswer: 1,
                explanation: "El APRA es el partido histórico con más presencias electorales."
            },
            {
                id: 3,
                question: "¿Cuál es la principal causa de fragmentación política en Perú?",
                options: ["Prohibición de reelección", "Baja valla de entrada para nuevos partidos", "Voto obligatorio", "Bicameralidad"],
                correctAnswer: 1,
                explanation: "Los requisitos mínimos para inscribir un partido facilitan la proliferación."
            },
            {
                id: 4,
                question: "¿Cuántos congresistas cambiaron de bancada en el periodo 2021-2026?",
                options: ["20", "35", "55", "80"],
                correctAnswer: 2,
                explanation: "El transfuguismo afectó a más del 40% del congreso."
            },
            {
                id: 5,
                question: "¿Qué son las PASO que fueron eliminadas en 2024?",
                options: ["Primarias Abiertas Simultáneas y Obligatorias", "Plan Anticorrupción", "Programa Social", "Partido Político"],
                correctAnswer: 0,
                explanation: "Eran un mecanismo para democratizar la elección de candidatos."
            }
        ]
    }
};
