"use client";

import { useState } from "react";
import { LAW_PROJECTS, type LawProjectQuestion } from "../data/lawProjects";
import { useModuleAnalytics } from "../utils/analytics";

export default function PowerSimulator() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [gameCompleted, setGameCompleted] = useState(false);

  const analytics = useModuleAnalytics();
  const currentQuestion = LAW_PROJECTS[currentQuestionIndex];
  const totalQuestions = LAW_PROJECTS.length;

  const handleAnswerSelect = (answerId: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.respuestaCorrecta;
    const currentAttempts = (attempts[currentQuestion.id] || 0) + 1;

    setAttempts({ ...attempts, [currentQuestion.id]: currentAttempts });
    setShowExplanation(true);

    // Track analytics
    analytics.trackQuestionAnswered(
      "simulador",
      currentQuestion.id,
      isCorrect,
      currentAttempts
    );

    if (isCorrect) {
      const xpEarned = currentAttempts === 1 ? currentQuestion.xp : Math.floor(currentQuestion.xp / 2);
      setScore(prev => prev + xpEarned);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);

      // Track game completion
      const correctAnswers = Object.entries(attempts).filter(
        ([id, attemptCount]) => {
          const q = LAW_PROJECTS.find(p => p.id === id);
          return q && attemptCount === 1;
        }
      ).length;

      analytics.trackGameCompleted("simulador", score, correctAnswers, totalQuestions);
    }
  };

  if (gameCompleted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center border border-green-200">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          ¡Juego Completado!
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Has ganado <span className="font-bold text-primary">{score} XP</span>
        </p>
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Tu rendimiento:</p>
          <div className="flex justify-around">
            <div>
              <p className="text-2xl font-bold text-primary">{totalQuestions}</p>
              <p className="text-xs text-gray-500">Proyectos completados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{score}</p>
              <p className="text-xs text-gray-500">XP Total</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Ahora entiendes cómo funciona el proceso legislativo mejor que muchos congresistas 😉
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">🏛️ Simulador Legislativo</h3>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            Pregunta {currentQuestionIndex + 1} de {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Contexto */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <p className="text-sm font-semibold text-blue-900 mb-1">📋 Contexto:</p>
          <p className="text-gray-700 leading-relaxed">{currentQuestion.contexto}</p>
        </div>

        {/* Pregunta */}
        <div className="mb-6">
          <p className="text-lg font-bold text-gray-900 mb-4">
            {currentQuestion.pregunta}
          </p>

          {/* Opciones */}
          <div className="space-y-3">
            {currentQuestion.opciones.map((opcion) => {
              const isSelected = selectedAnswer === opcion.id;
              const isCorrect = opcion.id === currentQuestion.respuestaCorrecta;
              const showResult = showExplanation;

              let bgColor = "bg-gray-50 hover:bg-gray-100 border-gray-200";
              if (showResult && isCorrect) {
                bgColor = "bg-green-100 border-green-500";
              } else if (showResult && isSelected && !isCorrect) {
                bgColor = "bg-red-100 border-red-500";
              } else if (isSelected) {
                bgColor = "bg-primary-50 border-primary-500";
              }

              return (
                <button
                  key={opcion.id}
                  onClick={() => handleAnswerSelect(opcion.id)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${bgColor} ${
                    showExplanation ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{opcion.texto}</span>
                    {showResult && isCorrect && <span className="text-green-600 text-xl">✓</span>}
                    {showResult && isSelected && !isCorrect && <span className="text-red-600 text-xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explicación */}
        {showExplanation && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-4 animate-slide-up">
            <p className="text-sm font-semibold text-blue-900 mb-2">💡 Explicación:</p>
            <p className="text-gray-700 leading-relaxed">{currentQuestion.explicacion}</p>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3">
          {!showExplanation ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="flex-1 bg-primary hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              Verificar respuesta
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              {currentQuestionIndex < totalQuestions - 1 ? "Siguiente proyecto →" : "Ver resultados"}
            </button>
          )}
        </div>

        {/* Score display */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">
            XP acumulado: <span className="font-bold text-primary">{score}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
