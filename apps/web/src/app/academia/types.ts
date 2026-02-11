export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

export interface Quiz {
    title: string;
    questions: Question[];
}

export interface Lesson {
    id: string;
    title: string;
    content: string; // Markdown supported
}

export interface Course {
    id: number;
    slug: string;
    title: string;
    subtitle?: string;
    description: string;
    icon: string | React.ReactNode; // Can be a string (emoji) or a component in the main page
    difficulty: "Básico" | "Intermedio" | "Avanzado";
    time: string;
    xp: number;
    tags: string[];
    lessons: Lesson[];
    quiz: Quiz;
    // Metadata for the card
    topics: string[];
    difficultyColor?: string;
}
