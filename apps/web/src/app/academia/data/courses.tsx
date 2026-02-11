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
    }
    // Add other courses here later...
];
