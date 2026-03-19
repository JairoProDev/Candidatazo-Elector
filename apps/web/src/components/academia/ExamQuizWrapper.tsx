"use client";

import { Question } from "@/app/academia/types";
import LessonQuizRenderer from "./LessonQuizRenderer";
import { useGamificationStore } from "@/lib/gamification";
import { useMemo } from "react";

interface ExamQuizWrapperProps {
    questions: Question[];
    courseTitle: string;
    xp: number;
}

export default function ExamQuizWrapper({ questions, courseTitle, xp }: ExamQuizWrapperProps) {
    const addXP = useGamificationStore((s) => s.addXP);
    const incrementStat = useGamificationStore((s) => s.incrementStat);

    const totalQuestions = useMemo(() => questions.length, [questions.length]);
    const completionKey = useMemo(
        () => `candidatazo-academia:completed-exams:${encodeURIComponent(courseTitle)}`,
        [courseTitle],
    );
    const awardedKey = useMemo(
        () => `candidatazo-academia:awarded-exam-xp:${encodeURIComponent(courseTitle)}`,
        [courseTitle],
    );

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
                    // Save progress locally & award XP once per exam completion.
                    if (typeof window === "undefined") return;

                    try {
                        const alreadyAwarded = window.localStorage.getItem(awardedKey) === "1";

                        const completedAt = new Date().toISOString();
                        const percentage =
                            totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

                        window.localStorage.setItem(
                            completionKey,
                            JSON.stringify({ completedAt, score, percentage }),
                        );

                        if (!alreadyAwarded) {
                            addXP(xp, `Academia: examen final - ${courseTitle}`);
                            // We reuse the "academiaLessonsCompleted" stat to unlock academia-related achievements.
                            incrementStat("academiaLessonsCompleted");
                            window.localStorage.setItem(awardedKey, "1");
                        }
                    } catch {
                        // If localStorage is blocked, we still want the UX to complete; XP notification might fail silently.
                    }
                }}
            />
        </main>
    );
}
