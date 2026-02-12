import { Course } from "../../types";

export const course3: Course = {
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
    icon: null,
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
};
