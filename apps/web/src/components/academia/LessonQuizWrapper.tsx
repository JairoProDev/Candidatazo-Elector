"use client";

import { Question } from "@/app/academia/types";
import LessonQuizRenderer from "./LessonQuizRenderer";

interface LessonQuizWrapperProps {
    questions: Question[];
    lessonTitle: string;
}

export default function LessonQuizWrapper({ questions, lessonTitle }: LessonQuizWrapperProps) {
    return (
        <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-yellow-100 text-yellow-700 p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </span>
                <h2 className="text-xl font-bold text-gray-800">Ponte a prueba: {lessonTitle}</h2>
            </div>
            <LessonQuizRenderer
                questions={questions}
                onComplete={(score) => {
                    console.log(`Quiz for ${lessonTitle} completed with score:`, score);
                }}
            />
        </div>
    );
}
