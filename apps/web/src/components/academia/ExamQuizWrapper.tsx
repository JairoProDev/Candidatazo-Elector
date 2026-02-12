"use client";

import { Question } from "@/app/academia/types";
import LessonQuizRenderer from "./LessonQuizRenderer";

interface ExamQuizWrapperProps {
    questions: Question[];
    courseTitle: string;
    xp: number;
}

export default function ExamQuizWrapper({ questions, courseTitle, xp }: ExamQuizWrapperProps) {
    return (
        <main className="max-w-2xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Evaluación Final</h1>
                <p className="text-gray-600">
                    Demuestra lo que has aprendido en <strong>{courseTitle}</strong> para ganar tus {xp} XP.
                </p>
            </div>

            <LessonQuizRenderer
                questions={questions}
                onComplete={(score) => {
                    console.log(`Final Exam for ${courseTitle} Completed with score:`, score);
                    // TODO: call API to save progress / awarded XP
                }}
            />
        </main>
    );
}
