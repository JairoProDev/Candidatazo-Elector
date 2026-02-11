"use client";

import { useState } from "react";
import { Quiz } from "@/app/academia/types";

export default function QuizRenderer({ quiz }: { quiz: Quiz }) {
    const [currentQuestionIndices, setCurrentQuestionIndices] = useState<number[]>([]);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showResults, setShowResults] = useState(false);

    // Initialize randomized quiz (pick 5 random questions if quiz has more, or shuffle)
    // For simplicity, just use all questions for now
    const questions = quiz.questions;

    const handleAnswer = (questionIndex: number, optionIndex: number) => {
        if (showResults) return;
        setAnswers({ ...answers, [questionIndex]: optionIndex });
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    const handleFinish = () => {
        // Validate all questions answered? Optional
        setShowResults(true);
        // Here we would call analytics.trackGameCompleted
    };

    const handleRetry = () => {
        setAnswers({});
        setShowResults(false);
    };

    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    if (showResults) {
        return (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center border border-green-200 mt-8 mb-12">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    ¡Quiz Completado!
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                    Has obtenido <span className="font-bold text-primary">{score} / {questions.length}</span> aciertos ({percentage}%)
                </p>

                <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
                    {questions.map((q, i) => {
                        const userAnswer = answers[i];
                        const isCorrect = userAnswer === q.correctAnswer;
                        return (
                            <div key={i} className={`mb-4 p-3 rounded-lg border-l-4 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                                <p className="font-semibold text-left mb-1">{q.question}</p>
                                <p className="text-sm text-left">
                                    Tu respuesta: <span className={isCorrect ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                                        {q.options[userAnswer]} {isCorrect ? "✓" : "✗"}
                                    </span>
                                </p>
                                {!isCorrect && (
                                    <p className="text-sm text-left text-green-700 mt-1">
                                        Correcta: <strong>{q.options[q.correctAnswer]}</strong>
                                    </p>
                                )}
                                {q.explanation && (
                                    <div className="mt-2 text-xs text-gray-500 text-left italic">
                                        💡 {q.explanation}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <button
                    onClick={handleRetry}
                    className="bg-primary hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                    Intentar de nuevo
                </button>

                <div className="mt-4">
                    <a href="/academia" className="text-sm text-gray-500 underline hover:text-primary">
                        Volver a la Academia
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 mt-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                📝 {quiz.title || "Evaluación Final"}
            </h2>

            {questions.map((q, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-lg text-gray-900 mb-4">
                        {i + 1}. {q.question}
                    </p>
                    <div className="space-y-3">
                        {q.options.map((option, optIdx) => (
                            <button
                                key={optIdx}
                                onClick={() => handleAnswer(i, optIdx)}
                                className={`w-full text-left p-4 rounded-lg border transition-all ${answers[i] === optIdx
                                        ? "bg-primary-50 border-primary text-primary-900 ring-2 ring-primary-200"
                                        : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[i] === optIdx ? "border-primary bg-primary" : "border-gray-400"}`}>
                                        {answers[i] === optIdx && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <span>{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex justify-end pt-6">
                <button
                    onClick={handleFinish}
                    disabled={Object.keys(answers).length < questions.length}
                    className="bg-primary hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    Ver Resultados
                </button>
            </div>
        </div>
    );
}
