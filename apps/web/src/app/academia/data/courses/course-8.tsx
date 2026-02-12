import { Course } from "../../types";

export const course8: Course = {
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
    icon: null,
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
};
