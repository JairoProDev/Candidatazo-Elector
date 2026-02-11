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
        lessons: [],
        quiz: { title: "", questions: [] }
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
        lessons: [],
        quiz: { title: "", questions: [] }
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
        lessons: [],
        quiz: { title: "", questions: [] }
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
        lessons: [],
        quiz: { title: "", questions: [] }
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
        lessons: [],
        quiz: { title: "", questions: [] }
    },
];
