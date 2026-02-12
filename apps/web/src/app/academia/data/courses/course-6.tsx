import { Course } from "../../types";

export const course6: Course = {
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
    icon: null,
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
};
