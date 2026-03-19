"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Question = {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const BANK: Question[] = [
  {
    id: 1,
    category: "Sistema electoral",
    question: "¿Cuántos senadores elegiremos en las elecciones 2026?",
    options: ["40", "50", "60", "80"],
    correctIndex: 2,
    explanation:
      "El Senado tendrá 60 miembros, elegidos en distrito nacional único.",
  },
  {
    id: 4,
    category: "Candidatos 2026",
    question:
      "¿Cuántos candidatos presidenciales se inscribieron para las elecciones 2026?",
    options: ["24", "30", "36", "42"],
    correctIndex: 2,
    explanation:
      "Un total de 36 candidatos presidenciales se inscribieron para el proceso 2026.",
  },
  {
    id: 5,
    category: "Sistema electoral",
    question: "¿Qué es la valla electoral en Perú?",
    options: [
      "3% de votos válidos",
      "5% de votos válidos",
      "7% de votos válidos",
      "10% de votos válidos",
    ],
    correctIndex: 1,
    explanation:
      "La valla electoral proxy es 5% de votos válidos para obtener representación.",
  },
  {
    id: 12,
    category: "Historia política",
    question:
      "¿Cuántas constituciones ha tenido el Perú en su historia republicana?",
    options: ["8", "10", "12", "15"],
    correctIndex: 2,
    explanation:
      "Perú ha tenido 12 constituciones desde su independencia (estimado general).",
  },
  {
    id: 18,
    category: "Datos electorales",
    question:
      "¿Cuál es el porcentaje de indecisos para las elecciones presidenciales 2026?",
    options: ["15%", "25%", "35%", "Más de 40%"],
    correctIndex: 3,
    explanation:
      "Se estima que más de 40% del electorado se declara indeciso o planea votar en blanco/nulo.",
  },
];

export function DesafioPreviewMini() {
  const [idx, setIdx] = useState(0);
  const q = useMemo(() => BANK[idx] ?? BANK[0], [idx]);

  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  const progress = Math.round(((idx + 1) / BANK.length) * 100);

  const score = (isCorrect: boolean) => {
    if (!isCorrect) return 0;
    const base = 15;
    const bonus = Math.min(20, streak * 2);
    return base + bonus;
  };

  const onSubmit = () => {
    if (locked || selected === null) return;
    setLocked(true);
    const isCorrect = selected === q.correctIndex;
    const deltaXp = score(isCorrect);
    setXp((x) => x + deltaXp);
    setStreak((s) => (isCorrect ? s + 1 : 0));
  };

  const onNext = () => {
    if (idx + 1 >= BANK.length) return;
    setIdx((i) => i + 1);
    setSelected(null);
    setLocked(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-gray-900">Desafío (mini)</div>
          <div className="text-xs text-gray-500 mt-1">
            Responde rápido, sube tu racha y gana XP.
          </div>
        </div>
        <Link
          href="/desafio"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
        >
          Jugar completo <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
          Progreso
        </div>
        <div className="text-sm font-extrabold text-primary">
          {idx + 1}/{BANK.length} · {progress}%
        </div>
      </div>

      <div className="mt-2 h-3 rounded-full bg-gray-100 border border-gray-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-gold transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
          {q.category}
        </div>
        <div className="mt-2 text-sm font-extrabold text-gray-900 leading-relaxed">
          {q.question}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === q.correctIndex;
            const isWrong = locked && isSelected && !isCorrect;
            const isRight = locked && isSelected && isCorrect;

            const classes = [
              "text-sm font-extrabold rounded-2xl border px-3 py-3 transition-colors text-left",
              "hover:border-primary-200",
              isRight
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : isWrong
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-white border-gray-200 text-gray-900",
            ].join(" ");

            return (
              <button
                key={opt}
                type="button"
                onClick={() => !locked && setSelected(i)}
                className={classes}
                aria-pressed={isSelected}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {locked && selected !== null && (
          <div className="mt-3 text-sm text-gray-700 leading-relaxed">
            {selected === q.correctIndex ? (
              <span className="font-extrabold text-emerald-800">
                Correcto. +{score(true)} XP
              </span>
            ) : (
              <span className="font-extrabold text-red-700">
                Casi. Respuesta correcta: {q.options[q.correctIndex]}
              </span>
            )}
            <div className="mt-2 text-xs text-gray-500 font-bold">
              Explicación
            </div>
            <div className="mt-1">{q.explanation}</div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3 justify-between">
          <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
            Racha: <span className="text-primary">{streak}</span> · XP:{" "}
            <span className="text-primary">{xp}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSubmit}
              disabled={locked || selected === null}
              className={[
                "inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl transition-colors",
                locked || selected === null
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-primary-600",
              ].join(" ")}
            >
              Verificar
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!locked || idx + 1 >= BANK.length}
              className={[
                "inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 font-extrabold py-2.5 px-4 rounded-xl transition-colors",
                !locked || idx + 1 >= BANK.length
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:border-primary-200 hover:text-primary",
              ].join(" ")}
            >
              Siguiente
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

