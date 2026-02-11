import { Course } from "../types";

export const COURSES: Course[] = [
    {
        id: 1,
        slug: "bicameralidad",
        title: "Cómo funciona el Congreso",
        subtitle: "Bicameralidad, funciones legislativas y fiscalización",
        description: "Bicameralidad, funciones legislativas, fiscalización y representación. Entiende el rol del Congreso en la democracia peruana.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        difficulty: "Básico",
        difficultyColor: "bg-green-100 text-green-700",
        time: "15 min",
        xp: 150,
        tags: ["Congreso", "Bicameralidad", "Senado", "Diputados"],
        topics: ["Unicameralidad vs Bicameralidad", "Comisiones", "Proceso legislativo"],
        lessons: [], // This course has a custom implementation
        quiz: { title: "", questions: [] }
    },
    {
        id: 2,
        slug: "poder-del-voto",
        title: "El poder del voto",
        subtitle: "Tu voto cambia el Perú",
        description: "Tu voto cambia el Perú. Conoce cómo funciona el sistema de votación, qué impacto tiene tu voto y por qué cada elección importa.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        difficulty: "Básico",
        difficultyColor: "bg-green-100 text-green-700",
        time: "12 min",
        xp: 100,
        tags: ["Voto", "Elecciones", "Democracia"],
        topics: ["Voto obligatorio", "Cifra repartidora", "Segunda vuelta"],
        lessons: [
            {
                id: "l1",
                title: "Tu voto tiene más poder del que crees",
                content: `
En Perú, tu voto no solo elige al Presidente. En una sola jornada electoral, defines:

- Quién gobierna el país (Presidente y vicepresidentes)
- Quiénes hacen las leyes (Senadores y Diputados)
- Quiénes te representan internacionalmente (Parlamentarios Andinos)

**Dato impactante:**

Con 10% de votos válidos, un candidato puede pasar a segunda vuelta presidencial. Esto significa que en un escenario fragmentado (como el 2026 con 40+ partidos), **tu voto vale mucho más** de lo que piensas.

**Tipos de voto:**

1. **Voto válido:** Marca clara en un solo partido/candidato
2. **Voto nulo:** Marca en varios o ningún partido
3. **Voto en blanco:** No marca nada
4. **Voto viciado:** Maltrata la cédula

Solo los votos válidos cuentan para elegir autoridades. Los votos en blanco y nulos se contabilizan pero no definen ganadores.`
            },
            {
                id: "l2",
                title: "¿Cómo se cuentan los votos?",
                content: `
**El sistema proporcional:**

Perú usa la **cifra repartidora** (método D'Hondt) para asignar escaños parlamentarios:

1. Se cuentan los votos de cada partido
2. Se dividen los votos entre 1, 2, 3, 4... hasta el número de escaños disponibles
3. Se ordenan los cocientes de mayor a menor
4. Los partidos con los cocientes más altos obtienen escaños

**Ejemplo simple:**

Si en Lima hay 36 diputados y 3 partidos:
- Partido A: 100,000 votos
- Partido B: 60,000 votos  
- Partido C: 40,000 votos

Las divisiones se ordenan y se asignan escaños hasta completar 36.

**La valla electoral:**

Para obtener representación en el Congreso, los partidos deben:
- **Partidos solos:** 5% de votos válidos nacionales
- **Alianzas:** 6% de votos válidos (más 1% por cada partido adicional en la alianza)

O alternativamente:
- **Senado:** Mínimo 3 senadores electos
- **Diputados:** Mínimo 7 diputados electos`
            },
            {
                id: "l3",
                title: "Votación Presidencial",
                content: `
**Primera vuelta (12 de abril de 2026):**

- Si un candidato obtiene **más del 50%** de votos válidos → Gana directamente
- Si ninguno alcanza el 50% → Los dos más votados pasan a segunda vuelta

**Segunda vuelta (junio de 2026):**

- Solo compiten los 2 candidatos más votados
- Gana quien obtenga más votos (mayoría simple)
- No hay voto preferencial en segunda vuelta

**Realidad peruana:**

Desde 1990, **ningún candidato ha ganado en primera vuelta**. Siempre ha habido balotaje.

En 2021, Pedro Castillo pasó a segunda vuelta con solo **18.9%** de votos en primera vuelta, pero ganó en el balotaje.`
            },
            {
                id: "l4",
                title: "Voto Preferencial",
                content: `
En las elecciones parlamentarias (Senado y Diputados), tienes dos opciones:

**Opción 1: Votar por el partido**
- Marcas solo el símbolo del partido
- Se cuentan los votos en el orden de la lista

**Opción 2: Voto preferencial**
- Marcas el símbolo del partido
- Escribes el número de tu candidato favorito
- Ese candidato sube en la lista de su partido

**¿Cómo funciona?**

Si un partido obtiene 5 escaños:
- Sin voto preferencial: Entran los primeros 5 de la lista
- Con voto preferencial: Entran los 5 candidatos más votados (aunque estén más abajo en la lista)

**El problema:**

El voto preferencial debilita la cohesión partidaria porque los candidatos compiten entre sí dentro del mismo partido, promoviendo el personalismo sobre el proyecto político.`
            },
            {
                id: "l5",
                title: "Tu voto en números",
                content: `
**Elecciones 2021:**

- Total de votantes: 25,287,954
- Votos válidos: 17,858,283 (70.6%)
- Votos blancos y nulos: 7,429,671 (29.4%)

**Si hubieran votado los ausentistas:**

- Ausentismo Lima 2021: 2+ millones de personas
- Eso equivale al **8% del padrón nacional**

**En un escenario fragmentado como 2026:**

- 8% adicional podría **cambiar completamente** quién pasa a segunda vuelta
- Podría definir qué partidos obtienen representación en el Congreso

**Tu voto = Tu voz**

No votar no es "protesta" - es ceder tu poder de decisión a quienes sí votan.`
            }
        ],
        quiz: {
            title: "Evaluación: El Poder del Voto",
            questions: [
                {
                    id: 1,
                    question: "¿Qué se necesita para ganar en primera vuelta presidencial?",
                    options: ["40% de votos válidos", "Más del 50% de votos válidos", "30% de votos totales", "Ser el más votado"],
                    correctAnswer: 1, // Index 1: Más del 50%
                    explanation: "Para ganar en primera vuelta se requiere más del 50% de los votos válidos."
                },
                {
                    id: 2,
                    question: "¿Cuál es la valla electoral para partidos individuales en el Congreso?",
                    options: ["3% de votos válidos", "4% de votos válidos", "5% de votos válidos", "10% de votos válidos"],
                    correctAnswer: 2, // Index 2: 5%
                    explanation: "La valla es del 5% de votos válidos a nivel nacional o tener un número mínimo de congresistas."
                },
                {
                    id: 3,
                    question: "¿Qué es el voto preferencial?",
                    options: ["Votar por tu candidato favorito dentro del partido", "Votar en blanco", "Votar por varios partidos", "Votar solo por el presidente"],
                    correctAnswer: 0,
                    explanation: "Permite elegir hasta 2 candidatos específicos dentro de la lista del partido."
                },
                {
                    id: 4,
                    question: "¿Cuánto fue el ausentismo en Lima en las elecciones 2021?",
                    options: ["500,000 personas", "1 millón de personas", "Más de 2 millones de personas", "3 millones de personas"],
                    correctAnswer: 2,
                    explanation: "Más de 2 millones de limeños no fueron a votar en 2021."
                },
                {
                    id: 5,
                    question: "¿Los votos en blanco y nulos se cuentan para elegir autoridades?",
                    options: ["Sí, cuentan igual que los válidos", "No, solo se contabilizan pero no definen ganadores", "Solo los nulos se cuentan", "Solo los en blanco se cuentan"],
                    correctAnswer: 1,
                    explanation: "Solo los votos válidos se usan para repartir escaños o definir al presidente."
                }
            ]
        }
    },
    {
        id: 3,
        slug: "que-es-constitucion",
        title: "¿Qué es la Constitución?",
        description: "La carta magna explicada en términos simples. Derechos, deberes, organización del Estado y cómo se modifica.",
        difficulty: "Básico",
        difficultyColor: "bg-green-100 text-green-700",
        time: "20 min",
        xp: 150,
        tags: ["Constitución", "Derechos", "Estado"],
        topics: ["Derechos fundamentales", "Poderes del Estado", "Reforma constitucional"],
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        lessons: [
            {
                id: "l1",
                title: "La Constitución en Términos Simples",
                content: `
**¿Qué es la Constitución?**

La Constitución Política del Perú es la **ley suprema** del país. Es como el "manual de reglas" que:

1. Define qué tipo de país somos (democrático, social, independiente, soberano)
2. Establece tus derechos fundamentales que nadie puede quitarte
3. Organiza cómo funciona el Estado (poderes, instituciones)
4. Limita el poder del gobierno para proteger a los ciudadanos

**Dato clave:**

La Constitución está **por encima** de cualquier otra ley. Si una ley contradice la Constitución, esa ley es **inconstitucional** y no vale.

**La Constitución de 1993:**

- Promulgada: 29 de diciembre de 1993
- Aprobada mediante referéndum tras el autogolpe de Fujimori (1992)
- Ha tenido **30 reformas** desde su promulgación
- Consta actualmente de 212 artículos vigentes

**Contexto histórico:**

Reemplazó a la Constitución de 1979, que establecía un Congreso bicameral. Fujimori disolvió el Congreso en 1992, convocó un Congreso Constituyente y creó esta nueva Constitución con un Congreso unicameral (que ahora se está revirtiendo en 2026).`
            },
            {
                id: "l2",
                title: "Tus Derechos Fundamentales",
                content: `
La Constitución garantiza tus derechos en el **Título I - Capítulos I, II y III:**

**CAPÍTULO I: Derechos Fundamentales de la Persona (Art. 1-3)**

Artículo 1: "La defensa de la persona humana y el respeto de su dignidad son el fin supremo de la sociedad y del Estado"

Artículo 2 enumera 24 derechos fundamentales, incluyendo:

1. **A la vida, identidad, integridad** (física, moral, psíquica)
2. **A la igualdad ante la ley** (sin discriminación)
3. **Libertad de conciencia y religión**
4. **Libertad de expresión, opinión e información**
5. **Derecho a solicitar información pública** (transparencia)
6. **Honor, intimidad y buena reputación**
7. **Libertad de tránsito**
8. **Libertad de reunión y asociación**
9. **Trabajo y libertad de contratar**
10. **Propiedad y herencia**
11. **Participación política** (elegir y ser elegido)
12. **Identidad étnica y cultural**
13. **Educación, salud, seguridad social**

Artículo 3: **Catálogo abierto** - existen otros derechos no enumerados que también están protegidos si se fundan en la dignidad humana.`
            },
            {
                id: "l3",
                title: "Derechos Sociales y Económicos",
                content: `
**Protección a grupos vulnerables:**

- **Niños y adolescentes**: Protección especial del Estado
- **Familia y matrimonio**: Institutos fundamentales de la sociedad
- **Madres y ancianos en abandono**: Protección prioritaria

**Derechos laborales:**

- Trabajo es un deber y derecho
- Jornada máxima de 8 horas diarias y 48 semanales
- Descanso semanal y vacaciones remuneradas
- Protección contra despido arbitrario
- Derecho a sindicación, negociación colectiva y huelga

**Educación:**

- Educación obligatoria y gratuita en instituciones públicas
- Libertad de enseñanza
- Formación ética y cívica obligatoria
- Enseñanza de la Constitución y derechos humanos

**Salud:**

- Todos tienen derecho a la protección de su salud
- El Estado determina la política nacional de salud
- Acceso equitativo a servicios de salud`
            },
            {
                id: "l4",
                title: "Organización del Estado",
                content: `
**Separación de poderes:**

**1. PODER EJECUTIVO**
- Presidente de la República (Jefe de Estado y Gobierno)
- Consejo de Ministros
- Ministros de Estado

**2. PODER LEGISLATIVO**
- Congreso de la República
- Desde 2026: Bicameral (Senado + Diputados)
- Función: Hacer leyes, fiscalizar al gobierno

**3. PODER JUDICIAL**
- Corte Suprema
- Cortes Superiores
- Juzgados especializados y de paz
- Función: Impartir justicia

**ORGANISMOS AUTÓNOMOS:**
- Jurado Nacional de Elecciones (JNE)
- Oficina Nacional de Procesos Electorales (ONPE)
- Registro Nacional de Identificación y Estado Civil (RENIEC)
- Tribunal Constitucional
- Banco Central de Reserva (BCR)
- Contraloría General de la República
- Defensoría del Pueblo
- Ministerio Público
- Consejo Nacional de la Magistratura / Junta Nacional de Justicia

**Gobierno descentralizado:**

- **Nivel Nacional:** Gobierno central
- **Nivel Regional:** Gobiernos regionales (26)
- **Nivel Local:** Municipalidades provinciales y distritales`
            },
            {
                id: "l5",
                title: "¿Cómo se Reforma la Constitución?",
                content: `
**Procedimiento:**

1. **Iniciativa:** Puede proponer el Presidente o el Congreso
2. **Aprobación en el Congreso:**
   - Requiere mayoría absoluta (más del 50% de congresistas)
   - Se vota **DOS VECES** en diferentes legislaturas
3. **Referéndum:**
   - El Presidente puede someter la reforma a referéndum
   - El Congreso puede aprobar SIN referéndum si obtiene 2/3 de votos

**Reforma total vs. parcial:**

- **Reforma parcial:** Modifica algunos artículos (como la bicameralidad en 2024)
- **Reforma total:** Nueva Constitución completa (requiere Asamblea Constituyente)

**El debate actual:**

Desde 2016, hay propuestas para cambiar completamente la Constitución de 1993:
- Unos argumentan que fue hecha tras un golpe de estado
- Otros dicen que ha traído estabilidad económica
- Varios candidatos presidenciales proponen una nueva Constitución`
            }
        ],
        quiz: {
            title: "Evaluación: ¿Qué es la Constitución?",
            questions: [
                {
                    id: 1,
                    question: "¿Qué es la Constitución?",
                    options: ["Un conjunto de leyes ordinarias", "La ley suprema del país", "Una guía moral sin valor legal", "El reglamento del Congreso"],
                    correctAnswer: 1,
                    explanation: "Es la norma suprema que fundamenta todo el ordenamiento jurídico."
                },
                {
                    id: 2,
                    question: "¿Cuál de estos NO es un derecho fundamental en la Constitución?",
                    options: ["Derecho a la vida", "Libertad de expresión", "Derecho a tener auto propio", "Derecho a la educación"],
                    correctAnswer: 2,
                    explanation: "La propiedad es un derecho, pero tener un 'auto propio' específico no es un derecho fundamental garantizado."
                },
                {
                    id: 3,
                    question: "¿Cuántos poderes del Estado establece la Constitución peruana?",
                    options: ["2", "3 (Ejecutivo, Legislativo, Judicial)", "4", "5"],
                    correctAnswer: 1,
                    explanation: "La clásica división de tres poderes: Ejecutivo, Legislativo y Judicial."
                },
                {
                    id: 4,
                    question: "¿Qué se necesita para reformar la Constitución en el Congreso?",
                    options: ["Mayoría simple", "Una sola votación", "Aprobación dos veces en diferentes legislaturas", "Solo el Presidente puede"],
                    correctAnswer: 2,
                    explanation: "Se requiere votación calificada en dos legislaturas ordinarias sucesivas o referéndum."
                },
                {
                    id: 5,
                    question: "¿En qué año fue promulgada la Constitución vigente?",
                    options: ["1979", "1993", "2000", "1933"],
                    correctAnswer: 1,
                    explanation: "La Constitución actual es la de 1993."
                }
            ]
        }
    },
    {
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
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
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
    },
    {
        id: 5,
        slug: "corrupcion",
        title: "Corrupción: cómo combatirla",
        description: "Herramientas cívicas contra la corrupción. Mecanismos de fiscalización, transparencia y participación ciudadana.",
        difficulty: "Intermedio",
        difficultyColor: "bg-yellow-100 text-yellow-700",
        time: "20 min",
        xp: 200,
        tags: ["Corrupción", "Fiscalización", "Transparencia"],
        topics: ["Odebrecht", "Contraloría", "Denuncia ciudadana"],
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        lessons: [
            {
                id: "l1",
                title: "La Corrupción en Números",
                content: `
**Datos alarmantes:**
- **6,152 casos de corrupción en trámite** (2024).
- 37% en municipalidades, 17% en gobiernos regionales.
- **99% aún en investigación fiscal** - solo 1% llegó a juicio.

**El costo económico:**
La corrupción le cuesta al Perú **S/. 23,297 millones al año** (3% del PBI). Es más del presupuesto anual de salud (10%).

**Ranking global:**
Perú: puesto **127 de 180 países** (Transparencia Internacional 2024). Entre los más corruptos de Sudamérica.

**Regiones más afectadas:** Lima (21%), Junín (6%), Áncash (6%), Cusco (5%).`
            },
            {
                id: "l2",
                title: "Tipos de Corrupción",
                content: `
**Delitos más comunes:**
1. **Negociación incompatible** (23%): Funcionario usa cargo para favorecerse.
2. **Peculado** (20%): Apropiación de bienes del Estado.
3. **Colusión** (18%): Acuerdo ilegal con contratistas.

**Pequeña vs. Gran Corrupción:**
- **Pequeña:** Sobornos en trámites, coimas a policías. Afecta al ciudadano de a pie.
- **Gran:** Sobornos en megaproyectos (Lava Jato), desfalco regional. Millones robados.

**Casos emblemáticos:**
- **Lava Jato / Odebrecht:** Sobornos a 4 expresidentes.
- **Caso Cócteles:** Financiamiento ilegal.
- **Club de la Construcción:** Cartel de licitaciones.`
            },
            {
                id: "l3",
                title: "Mecanismos Institucionales",
                content: `
**1. Contraloría General:** Fiscaliza recursos públicos, audita entidades.
**2. Ministerio Público (Fiscalía):** Investiga y acusa delitos. Fiscalías especializadas.
**3. Procuraduría Anticorrupción:** Abogados del Estado en casos de corrupción.
**4. Defensoría del Pueblo:** Supervisa derechos, lucha contra corrupción.
**5. Tribunal Constitucional:** Última instancia constitucional.
**6. Junta Nacional de Justicia:** Nombra/ratifica jueces y fiscales.`
            },
            {
                id: "l4",
                title: "Herramientas Ciudadanas",
                content: `
**Transparencia:**
Ley de Transparencia (2002): Todo ciudadano puede pedir información pública.
- Portal de Transparencia.
- Solicitudes de acceso (plazo 10 días).
- Información disponible: Contratos, planillas, proyectos.

**Cómo denunciar:**
1. **Contraloría:** 0-800-VIGILA.
2. **Ministerio Público:** Fiscalías provinciales o web.
3. **Defensoría del Pueblo.**

**Protección al denunciante:**
Ley Nº 29542 protege confidencialidad y prohíbe represalias (aunque en práctica es débil).`
            },
            {
                id: "l5",
                title: "Vigilancia Ciudadana",
                content: `
**Participación:**
1. **Presupuesto Participativo:** Decidir obras locales.
2. **Rendición de Cuentas:** Exigir explicaciones a alcaldes.
3. **Revocatoria:** Destituir autoridades (25% firmas).
4. **Veedurías ciudadanas:** Observar obras públicas.

**Sociedad Civil:**
Organizaciones como Proética, OjoPúblico, IDL-Reporteros.

**El poder del voto:**
No votes por candidatos con antecedentes. Revisa hojas de vida en Infogob.
75% de jóvenes rechaza la corrupción, pero 75% no sabe cómo denunciar. **Edúcate. Denuncia. Vigila.**`
            }
        ],
        quiz: {
            title: "Evaluación: Combatiendo la Corrupción",
            questions: [
                {
                    id: 1,
                    question: "¿Cuánto le cuesta la corrupción al Perú anualmente?",
                    options: ["S/. 5,000 millones", "S/. 12,000 millones", "S/. 23,297 millones", "S/. 50,000 millones"],
                    correctAnswer: 2,
                    explanation: "Equivale aproximadamente al 3% del PBI nacional."
                },
                {
                    id: 2,
                    question: "¿Qué porcentaje de casos de corrupción están aún en investigación fiscal?",
                    options: ["50%", "75%", "90%", "99%"],
                    correctAnswer: 3,
                    explanation: "La gran mayoría de casos no llega a juicio, quedando en etapa preliminar."
                },
                {
                    id: 3,
                    question: "¿Cuál es el delito de corrupción más común en Perú?",
                    options: ["Peculado", "Negociación incompatible", "Colusión", "Soborno"],
                    correctAnswer: 1,
                    explanation: "Representa el 23% de los casos reportados."
                },
                {
                    id: 4,
                    question: "¿Qué institución fiscaliza el uso de recursos públicos?",
                    options: ["Ministerio Público", "Defensoría del Pueblo", "Contraloría General", "Poder Judicial"],
                    correctAnswer: 2,
                    explanation: "La Contraloría es el ente rector del Sistema Nacional de Control."
                },
                {
                    id: 5,
                    question: "¿Qué ley protege a los denunciantes de corrupción?",
                    options: ["Ley Nº 28094", "Ley Nº 29542", "Ley Nº 30057", "Ley Nº 26300"],
                    correctAnswer: 1,
                    explanation: "Establece medidas de protección y beneficios para denunciantes."
                }
            ]
        }
    },
    {
        id: 6,
        slug: "derechos-fundamentales",
        title: "Derechos fundamentales",
        description: "Conoce tus derechos como ciudadano peruano. Derechos civiles, políticos, económicos y sociales que la Constitución te garantiza.",
        difficulty: "Básico",
        difficultyColor: "bg-green-100 text-green-700",
        time: "15 min",
        xp: 150,
        tags: ["Derechos", "Constitución", "Ciudadanía"],
        topics: ["Habeas corpus", "Libertad de expresión", "Derecho a la salud"],
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
        ),
        lessons: [
            {
                id: "l1",
                title: "Tus Derechos Fundamentales - La Base",
                content: `
**Artículo 1 de la Constitución:**
"La defensa de la persona humana y el respeto de su dignidad son el fin supremo de la sociedad y del Estado"

**Los 10 derechos más importantes:**
1. **Vida e integridad**: Nadie puede matarte ni torturarte.
2. **Igualdad ante la ley**: No discriminación.
3. **Libertad de conciencia y religión**.
4. **Libertad de expresión e información**.
5. **Honor e intimidad**: Tu reputación y vida privada están protegidas.
6. **Libertad de tránsito**: Moverte libremente por el país.
7. **Derecho al trabajo**: Trabajar libremente, no trabajos forzados.
8. **Propiedad**: Tener bienes y que nadie te los quite arbitrariamente.
9. **Participación política**: Votar y ser elegido.
10. **Identidad étnica y cultural**.`
            },
            {
                id: "l2",
                title: "Derechos Civiles y Políticos",
                content: `
**Derechos políticos:**

1. **Derecho de sufragio (votar):**
   - Obligatorio hasta los 70 años.
   - Facultativo después de 70.

2. **Participación ciudadana:**
   - Referéndum, Iniciativa legislativa, Revocatoria, Rendición de cuentas.

3. **Derecho a ser elegido:**
   - Postular a cargos públicos.

**Suspensión de derechos:**
Pierdes tu derecho a votar si tienes sentencia con inhabilitación o por delitos graves.`
            },
            {
                id: "l3",
                title: "Derechos Sociales y Económicos",
                content: `
**Educación:**
- Obligatoria y gratuita en instituciones públicas.
- Libertad de enseñanza.

**Salud:**
- Todos tienen derecho a protección de salud.

**Derechos laborales:**
1. **Jornada:** Máximo 8 horas diarias o 48 semanales.
2. **Remuneración:** Salario mínimo (S/. 1,025), pago oportuno.
3. **Protección:** Contra despido arbitrario.
4. **Derechos colectivos:** Sindicación, huelga.

**Protección especial:** Madres trabajadoras, menores de edad.`
            },
            {
                id: "l4",
                title: "Mecanismos de Defensa",
                content: `
**Garantías constitucionales:**

1. **Hábeas Corpus:** Detención ilegal.
2. **Acción de Amparo:** Vulneración de otros derechos (ej. despido embarazada).
3. **Hábeas Data:** Acceso/corrección de información personal.
4. **Acción de Inconstitucionalidad:** Contra leyes que violan la Constitución.
5. **Acción Popular:** Contra normas administrativas inconstitucionales.
6. **Acción de Cumplimiento:** Exigir que autoridad cumpla la ley.`
            },
            {
                id: "l5",
                title: "Situaciones Especiales",
                content: `
**Estado de emergencia:**
Se pueden suspender: Libertad de tránsito, reunión, seguridad personal e inviolabilidad de domicilio.
**NUNCA se suspenden:** Derecho a la vida, integridad, ni derechos laborales.

**Grupos especiales:**
- **Pueblos indígenas:** Identidad cultural, consulta previa.
- **Personas con discapacidad:** Accesibilidad, no discriminación.
- **Adultos mayores:** Protección especial, pensiones.`
            }
        ],
        quiz: {
            title: "Evaluación: Derechos Fundamentales",
            questions: [
                {
                    id: 1,
                    question: "¿Cuál es el 'fin supremo' del Estado según la Constitución?",
                    options: ["Crecimiento económico", "Defensa de la persona humana y su dignidad", "Seguridad nacional", "Orden público"],
                    correctAnswer: 1,
                    explanation: "El Estado está al servicio de la persona humana."
                },
                {
                    id: 2,
                    question: "¿Cuál es la jornada laboral máxima establecida en la Constitución?",
                    options: ["6 horas diarias", "8 horas diarias o 48 semanales", "10 horas diarias", "No hay límite"],
                    correctAnswer: 1,
                    explanation: "Es el límite constitucional para proteger al trabajador."
                },
                {
                    id: 3,
                    question: "¿Qué garantía constitucional usas si te detienen ilegalmente?",
                    options: ["Acción de Amparo", "Hábeas Corpus", "Hábeas Data", "Acción Popular"],
                    correctAnswer: 1,
                    explanation: "Protege la libertad individual ante detenciones arbitrarias."
                },
                {
                    id: 4,
                    question: "¿Cuándo es obligatorio el voto en Perú?",
                    options: ["Siempre", "Hasta los 70 años", "Mayores de 21", "Voluntario"],
                    correctAnswer: 1,
                    explanation: "A partir de los 70 años el voto es facultativo."
                },
                {
                    id: 5,
                    question: "¿Qué derechos NO se pueden suspender ni en estado de emergencia?",
                    options: ["Tránsito", "Vida e integridad", "Domicilio", "Reunión"],
                    correctAnswer: 1,
                    explanation: "Son derechos absolutos que el Estado debe respetar siempre."
                }
            ]
        }
    },
    {
        id: 7,
        slug: "sistema-electoral",
        title: "El sistema electoral peruano",
        description: "JNE, ONPE, RENIEC: las tres instituciones que hacen posible las elecciones. Cómo se organizan, se cuentan votos y se resuelven disputas.",
        difficulty: "Intermedio",
        difficultyColor: "bg-yellow-100 text-yellow-700",
        time: "20 min",
        xp: 200,
        tags: ["JNE", "ONPE", "Elecciones"],
        topics: ["JNE", "ONPE", "RENIEC", "Actas electorales"],
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        lessons: [
            {
                id: "l1",
                title: "Los Tres Pilares",
                content: `
**El Sistema Electoral Peruano:**
Conformado por 3 organismos autónomos para evitar concentración de poder:

1. **JNE (Jurado Nacional de Elecciones):** Administra justicia electoral.
2. **ONPE (Oficina Nacional de Procesos Electorales):** Organiza las elecciones.
3. **RENIEC (Registro Nacional de Identificación y Estado Civil):** Mantiene el padrón electoral.

**Principio fundamental:**
Asegurar que las votaciones traduzcan la expresión auténtica, libre y espontánea de los ciudadanos.`
            },
            {
                id: "l2",
                title: "JNE - El Juez Electoral",
                content: `
**Función principal:** Administrar justicia electoral.

**¿Qué hace?**
1. **Fiscaliza legalidad:** Supervisa procesos, verifica cumplimiento de ley.
2. **Registro de Organizaciones Políticas (ROP):** Inscribe y cancela partidos.
3. **Resuelve controversias:** Tachas, apelaciones. Sus fallos son inapelables.
4. **Proclama resultados oficiales:** Entrega credenciales a ganadores.

**Estructura:** Pleno de 5 miembros (elegidos por Corte Suprema, Fiscalía, Abogados, Universidades).`
            },
            {
                id: "l3",
                title: "ONPE - El Organizador",
                content: `
**Función principal:** Organizar y ejecutar elecciones.

**¿Qué hace?**
1. **Planifica:** Cédulas, material electoral.
2. **Logística:** Instala mesas, distribuye material.
3. **Miembros de mesa:** Sorteo y capacitación.
4. **Cómputo:** Procesa actas y publica resultados.
5. **Supervisa fondos:** Controla financiamiento de partidos.

**Nota:** ONPE publica resultados ("al 100% de actas procesadas"), pero solo el JNE proclama al ganador oficial.`
            },
            {
                id: "l4",
                title: "RENIEC - Tu Identidad",
                content: `
**Función principal:** Identificar peruanos y mantener el padrón.

**¿Qué hace?**
1. **DNI:** Emite documento de identidad.
2. **Registro Civil:** Nacimientos, matrimonios, defunciones.
3. **Padrón Electoral:** Lista de votantes aptos (nombre, DNI, domicilio).
4. **Georreferenciación:** Asigna locales cercanos a tu casa.`
            },
            {
                id: "l5",
                title: "Coordinación y Fiscalización",
                content: `
**Cómo trabajan juntos:**
1. **RENIEC** entrega padrón.
2. **JNE** aprueba padrón.
3. **ONPE** organiza votación usando el padrón.
4. **JNE** fiscaliza y proclama resultados.

**Tu rol como ciudadano:**
- Verifica local de votación (web RENIEC).
- Consulta candidatos (Infogob).
- Denuncia irregularidades (JNE, Fiscalía).
- Sé miembro de mesa si sales sorteado.`
            }
        ],
        quiz: {
            title: "Evaluación: Sistema Electoral",
            questions: [
                {
                    id: 1,
                    question: "¿Cuál es la función principal del JNE?",
                    options: ["Organizar elecciones", "Emitir DNI", "Administrar justicia electoral", "Contar votos"],
                    correctAnswer: 2,
                    explanation: "El JNE es el máximo ente de justicia en materia electoral."
                },
                {
                    id: 2,
                    question: "¿Quién designa a los miembros de mesa?",
                    options: ["JNE", "ONPE", "RENIEC", "Ciudadanos voluntarios"],
                    correctAnswer: 1,
                    explanation: "La ONPE realiza el sorteo de miembros de mesa."
                },
                {
                    id: 3,
                    question: "¿Qué organismo mantiene el padrón electoral?",
                    options: ["JNE", "ONPE", "RENIEC", "Congreso"],
                    correctAnswer: 2,
                    explanation: "El RENIEC actualiza el registro de ciudadanos aptos para votar."
                },
                {
                    id: 4,
                    question: "¿Quién proclama oficialmente a los ganadores?",
                    options: ["ONPE", "JNE", "RENIEC", "Tribunal Constitucional"],
                    correctAnswer: 1,
                    explanation: "Solo el JNE tiene la potestad de declarar oficialmente a los ganadores."
                },
                {
                    id: 5,
                    question: "¿Cuál es el presupuesto estimado para las Elecciones 2026?",
                    options: ["S/. 500 millones", "S/. 864 millones", "S/. 1,500 millones", "S/. 2,000 millones"],
                    correctAnswer: 2,
                    explanation: "Serán las elecciones más complejas y costosas."
                }
            ]
        }
    },
    {
        id: 8,
        slug: "economia-ciudadanos",
        title: "Economía para ciudadanos",
        description: "PBI, inflación, impuestos y presupuesto explicados sin jerga. Entiende la economía para evaluar las propuestas de los candidatos.",
        difficulty: "Avanzado",
        difficultyColor: "bg-primary-100 text-primary-700",
        time: "30 min",
        xp: 300,
        tags: ["Economía", "PBI", "Impuestos"],
        topics: ["PBI", "Inflación", "Política fiscal", "Deuda pública"],
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        lessons: [
            {
                id: "l1",
                title: "PBI - El Termómetro",
                content: `
**¿Qué es el PBI?**
Valor total de todos los bienes y servicios producidos en el país en un año.
Si Perú fuera una tienda, es la **suma de todo lo que vendiste**.

**PBI de Perú 2024:** ~S/. 1,100,000 millones (1.1 billones).
**PBI per cápita:** ~US$ 8,000 (Chile tiene US$ 16,000).

**¿Por qué importa?**
- **Crecimiento alto:** Más empleos, mejores salarios.
- **Recesión (2023):** Menos empleos, crisis.`
            },
            {
                id: "l2",
                title: "Inflación - Enemigo del Bolsillo",
                content: `
**¿Qué es?** Aumento generalizado de precios.
Si compras arroz a S/. 3 y sube a S/. 3.50, hubo inflación.

**Meta del BCRP:** 1% a 3% anual.
**Inflación reciente:**
- 2021: 6.4%
- 2022: 8.5% (pico histórico reciente)
- 2023: 3.2%
- 2024: 2.1% (proyección)

**¿Cómo te afecta?** Tu sueldo compra menos. Ahorros pierden valor.
**BCRP:** Controla la inflación (política monetaria).`
            },
            {
                id: "l3",
                title: "Política Fiscal (Ingresos y Gastos)",
                content: `
**Ingresos del Estado:**
1. **Impuestos** (70-75%): IGV (18%), Impuesto a la Renta.
2. **Canon:** Minero y petrolero.

**Gastos del Estado:**
1. Educación (~20%)
2. Transporte e infraestructura (~15%)
3. Salud (~10%)
4. Protección social (~10%)
5. Deuda pública (~8%)

**Presupuesto 2024:** ~S/. 211,000 millones.`
            },
            {
                id: "l4",
                title: "Déficit y Deuda Pública",
                content: `
**Déficit fiscal:** Estado gasta más de lo que recauda.
- Déficit 2024: -2.3% del PBI.
- **Límite sano:** 2-3% del PBI.

**Deuda pública:** Dinero que el Estado debe.
- Nivel actual: ~32% del PBI.
- **Límite legal:** 40% del PBI.

**Financiamiento:** Bonos y préstamos internacionales.`
            },
            {
                id: "l5",
                title: "Evaluando Propuestas Económicas",
                content: `
**Checklist para no ser engañado:**

1. **¿De dónde sale el dinero?** (Si imprimen dinero = Inflación).
2. **¿Es sostenible?** (Regalos de una vez vs. planes a largo plazo).
3. **¿Costo-beneficio?**

**Ejemplos:**
- *Populista:* "Condonar todas las deudas agrarias" (Quiebra bancos).
- *Responsable:* "Refinanciar con tasas bajas" (Ayuda real).
- *Populista:* "Eliminar impuestos a empresas" (Estado quiebra).
- *Responsable:* "Reducir impuestos gradualmente a quienes formalicen".`
            }
        ],
        quiz: {
            title: "Evaluación: Economía Ciudadana",
            questions: [
                {
                    id: 1,
                    question: "¿Qué mide el PBI?",
                    options: ["Valor de exportaciones", "Valor total de bienes y servicios producidos", "Ingresos del gobierno", "Riqueza de ciudadanos"],
                    correctAnswer: 1,
                    explanation: "Es el indicador principal del tamaño de la economía."
                },
                {
                    id: 2,
                    question: "¿Cuál es la meta de inflación del BCRP?",
                    options: ["0% a 2%", "1% a 3%", "3% a 5%", "No hay meta"],
                    correctAnswer: 1,
                    explanation: "El rango meta busca estabilidad de precios."
                },
                {
                    id: 3,
                    question: "¿Qué es el déficit fiscal?",
                    options: ["Estado recauda más de lo que gasta", "Estado gasta más de lo que recauda", "Deuda total", "Impuestos de empresas"],
                    correctAnswer: 1,
                    explanation: "Ocurre cuando los gastos superan a los ingresos."
                },
                {
                    id: 4,
                    question: "¿Cuál es el límite legal de deuda pública en Perú?",
                    options: ["30%", "35%", "40% del PBI", "50%"],
                    correctAnswer: 2,
                    explanation: "Establecido por la Ley de Responsabilidad Fiscal."
                },
                {
                    id: 5,
                    question: "¿Qué institución controla la inflación en Perú?",
                    options: ["MEF", "BCRP", "SUNAT", "Congreso"],
                    correctAnswer: 1,
                    explanation: "El Banco Central es constitucionalmente autónomo."
                }
            ]
        }
    },
];
