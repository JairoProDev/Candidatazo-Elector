import { Course } from "../../types";

export const course5: Course = {
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
    icon: null,
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
};
