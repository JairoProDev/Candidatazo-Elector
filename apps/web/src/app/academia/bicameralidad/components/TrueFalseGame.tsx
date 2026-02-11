"use client";

import { useState } from "react";
import { STATEMENTS, BADGE, type Statement } from "../data/statements";
import { useModuleAnalytics } from "../utils/analytics";

export default function TrueFalseGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const analytics = useModuleAnalytics();
  const currentStatement = STATEMENTS[currentIndex];
  const totalStatements = STATEMENTS.length;

  const handleAnswer = (answer: boolean) => {
    if (showExplanation) return;

    setUserAnswer(answer);
    const isCorrect = answer === currentStatement.esVerdadero;

    setShowExplanation(true);

    // Track analytics
    analytics.trackQuestionAnswered(
      "verdadero-falso",
      currentStatement.id,
      isCorrect,
      1
    );

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setScore(prev => prev + currentStatement.xp);
    }
  };

  const handleNext = () => {
    setUserAnswer(null);
    setShowExplanation(false);

    if (currentIndex < totalStatements - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);

      // Track game completion
      analytics.trackGameCompleted("verdadero-falso", score, correctCount, totalStatements);

      // Check if badge earned (4 of 5)
      if (correctCount >= BADGE.requisito) {
        analytics.trackBadgeEarned(BADGE.id, BADGE.nombre);
      }
    }
  };

  if (gameCompleted) {
    const percentage = Math.round((correctCount / totalStatements) * 100);
    const earnedBadge = correctCount >= BADGE.requisito;

    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200">
        <div className="text-6xl mb-4">{earnedBadge ? "🔍" : "📚"}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {earnedBadge ? "¡Badge Desbloqueado!" : "¡Juego Completado!"}
        </h3>

        {earnedBadge && (
          <div className="bg-white rounded-xl p-4 mb-4 border-2 border-gold">
            <div className="text-4xl mb-2">{BADGE.icono}</div>
            <p className="font-bold text-lg text-gray-900">{BADGE.nombre}</p>
            <p className="text-sm text-gray-600">{BADGE.descripcion}</p>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-3xl font-bold text-green-600">{correctCount}</p>
              <p className="text-xs text-gray-500">Correctas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{percentage}%</p>
              <p className="text-xs text-gray-500">Precisión</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">{score}</p>
              <p className="text-xs text-gray-500">XP Ganado</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {percentage >= 80
            ? "¡Excelente! Puedes detectar falacias políticas como un experto."
            : percentage >= 60
            ? "Buen trabajo. Con más práctica serás un cazador de falacias."
            : "Sigue aprendiendo. Vuelve a leer el contenido y reintenta."}
        </p>
      </div>
    );
  }

  const isCorrectAnswer = userAnswer === currentStatement.esVerdadero;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">🔍 ¿Congresista o Farsante?</h3>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {currentIndex + 1} de {totalStatements}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalStatements) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Statement */}
        <div className="mb-6">
          {currentStatement.tieneTrampa && (
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              ⚠️ Atención: Tiene trampa
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 mb-6">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              &ldquo;{currentStatement.afirmacion}&rdquo;
            </p>
          </div>

          {/* Botones Verdadero/Falso */}
          {!showExplanation && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all hover:scale-105 shadow-lg"
              >
                ✓ Verdadero
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all hover:scale-105 shadow-lg"
              >
                ✗ Falso
              </button>
            </div>
          )}
        </div>

        {/* Resultado y Explicación */}
        {showExplanation && (
          <div className="space-y-4 animate-slide-up">
            {/* Resultado */}
            <div
              className={`rounded-xl p-4 border-2 text-center ${
                isCorrectAnswer
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <p
                className={`text-2xl font-bold mb-1 ${
                  isCorrectAnswer ? "text-green-700" : "text-red-700"
                }`}
              >
                {isCorrectAnswer ? "¡Correcto! ✓" : "Incorrecto ✗"}
              </p>
              <p className="text-sm text-gray-600">
                La respuesta correcta es:{" "}
                <span className="font-bold">
                  {currentStatement.esVerdadero ? "Verdadero" : "Falso"}
                </span>
              </p>
            </div>

            {/* Explicación */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-5">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                💡 Explicación:
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                {currentStatement.explicacion}
              </p>
              {currentStatement.contextoAdicional && (
                <div className="bg-white rounded p-3 border border-blue-200">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    📌 Contexto adicional:
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentStatement.contextoAdicional}
                  </p>
                </div>
              )}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={handleNext}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
            >
              {currentIndex < totalStatements - 1
                ? "Siguiente afirmación →"
                : "Ver resultados"}
            </button>
          </div>
        )}

        {/* Score */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-600">
          <span>
            Correctas: <span className="font-bold text-green-600">{correctCount}</span>
          </span>
          <span>
            XP: <span className="font-bold text-primary">{score}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
