import { Course } from "../../types";

export const course1: Course = {
    id: 1,
    slug: "bicameralidad",
    title: "Cómo funciona el Congreso",
    subtitle: "Bicameralidad, funciones legislativas y fiscalización",
    description: "Bicameralidad, funciones legislativas, fiscalización y representación. Entiende el rol del Congreso en la democracia peruana.",
    icon: null, // Will be handled in the index or component to avoid JSX in .ts if possible, or I'll use .tsx
    difficulty: "Básico",
    difficultyColor: "bg-green-100 text-green-700",
    time: "15 min",
    xp: 150,
    tags: ["Congreso", "Bicameralidad", "Senado", "Diputados"],
    topics: ["Unicameralidad vs Bicameralidad", "Comisiones", "Proceso legislativo"],
    lessons: [], // This course has a custom implementation
    quiz: { title: "", questions: [] }
};
