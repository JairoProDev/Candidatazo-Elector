import { Course } from "../../types";

export const course7: Course = {
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
    icon: null,
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
};
