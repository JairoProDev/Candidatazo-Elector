"use client";

import { useState } from "react";
import { Question } from "@/app/academia/types";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface LessonQuizRendererProps {
    questions: Question[];
    onComplete: (score: number) => void;
}

export default function LessonQuizRenderer({ questions, onComplete }: LessonQuizRendererProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (index: number) => {
        if (isChecked) return;
        setSelectedOption(index);
    };

    const handleCheck = () => {
        if (selectedOption === null) return;
        setIsChecked(true);
        if (selectedOption === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 0 : 0)); // Score already updated? No, wait.
            // If I just checked and it was correct, score is already updated.
            // However, onComplete should probably receive the final score.
            // My score update logic is: click Check -> update score state.
            // So 'score' is current.
            onComplete(score);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsChecked(false);
        }
    };

    if (!currentQuestion) return <div>No hay preguntas.</div>;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="mb-6 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Pregunta {currentQuestionIndex + 1} de {questions.length}
                </span>
                <div className="h-1 flex-1 mx-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-6">
                {currentQuestion.question}
            </h3>

            <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                    let optionStyle = "border-gray-200 hover:bg-gray-50";
                    if (selectedOption === idx) {
                        optionStyle = "border-primary bg-primary-50 text-primary-900 ring-1 ring-primary";
                    }

                    if (isChecked) {
                        if (idx === currentQuestion.correctAnswer) {
                            optionStyle = "border-green-500 bg-green-50 text-green-900 ring-1 ring-green-500";
                        } else if (idx === selectedOption) {
                            optionStyle = "border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500";
                        } else {
                            optionStyle = "border-gray-200 opacity-50";
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={isChecked}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionStyle}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 
                                    ${isChecked && idx === currentQuestion.correctAnswer ? "border-green-500 bg-green-500 text-white" : ""}
                                    ${isChecked && idx === selectedOption && idx !== currentQuestion.correctAnswer ? "border-red-500 bg-red-500 text-white" : ""}
                                    ${!isChecked && selectedOption === idx ? "border-primary bg-primary text-white" : "border-gray-300"}
                                `}>
                                    {isChecked && idx === currentQuestion.correctAnswer && <CheckCircle className="w-4 h-4" />}
                                    {isChecked && idx === selectedOption && idx !== currentQuestion.correctAnswer && <XCircle className="w-4 h-4" />}
                                </div>
                                <span className="font-medium">{option}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {isChecked && (
                <div className={`mb-6 p-4 rounded-xl ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <p className="font-bold mb-1">
                        {isCorrect ? "¡Correcto!" : "Incorrecto"}
                    </p>
                    <p className="text-sm">
                        {currentQuestion.explanation}
                    </p>
                </div>
            )}

            <div className="flex justify-end">
                {!isChecked ? (
                    <button
                        onClick={handleCheck}
                        disabled={selectedOption === null}
                        className="bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Comprobar
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                        {isLastQuestion ? "Finalizar" : "Siguiente"} <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
