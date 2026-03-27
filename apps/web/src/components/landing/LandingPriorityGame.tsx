"use client";

import { useEffect, useMemo, useState } from "react";
import type { Candidate2026ListItem } from "@/lib/data/candidates2026";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";
import {
  type StrategyWeights,
  scoreCandidateStrategic,
} from "@/lib/strategy/election2026";
import Link from "next/link";
import { useFeedStore } from "@/lib/feed/feedStore";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function pct01(n: number) {
  return `${Math.round(n * 100)}%`;
}

type SliderKey =
  | "economic"
  | "social"
  | "security"
  | "digital"
  | "antiVote"
  | "legalRisk";

const DEFAULTS: Record<SliderKey, number> = {
  economic: 18,
  social: 16,
  security: 22,
  digital: 18,
  antiVote: 10,
  legalRisk: 16,
};

const SLIDERS: { key: SliderKey; label: string; hint: string; min: number; max: number }[] =
  [
    { key: "economic", label: "Economía", hint: "Modelo fiscal y crecimiento", min: 0, max: 30 },
    { key: "social", label: "Social", hint: "Derechos y cohesión", min: 0, max: 30 },
    { key: "security", label: "Seguridad", hint: "Orden y delincuencia", min: 0, max: 30 },
    { key: "digital", label: "Agenda digital", hint: "Ejecución y tecnología pública", min: 0, max: 30 },
    { key: "antiVote", label: "Antivoto", hint: "Evita rechazo duro", min: 0, max: 30 },
    { key: "legalRisk", label: "Riesgo legal", hint: "Menos incertidumbre", min: 0, max: 30 },
  ];

export function LandingPriorityGame() {
  const [weights, setWeights] = useState<StrategyWeights>({
    economic: DEFAULTS.economic,
    social: DEFAULTS.social,
    environment: 0, // no lo usamos aquí para mantener el juego rápido
    security: DEFAULTS.security,
    institutional: 10, // peso fijo para que el modelo no se rompa
    digital: DEFAULTS.digital,
    antiVote: DEFAULTS.antiVote,
    legalRisk: DEFAULTS.legalRisk,
  });

  const setMatchWeights = useFeedStore((s) => s.setMatchWeights);

  // Persist user's “Match” sliders so `/feed` can personalize ordering.
  useEffect(() => {
    const t = window.setTimeout(() => setMatchWeights(weights), 250);
    return () => window.clearTimeout(t);
  }, [setMatchWeights, weights]);

  const top = useMemo(() => {
    let best: Candidate2026ListItem | null = null;
    let bestScore = -1;

    for (const c of OFFICIAL_CANDIDATES_2026) {
      const breakdown = scoreCandidateStrategic(c, weights);
      if (breakdown.overallScore > bestScore) {
        bestScore = breakdown.overallScore;
        best = c;
      }
    }

    if (!best) return null;
    return {
      candidate: best,
      breakdown: scoreCandidateStrategic(best, weights),
    };
  }, [weights]);

  const xp = useMemo(() => {
    const sum = SLIDERS.reduce((acc, s) => acc + weights[s.key], 0);
    // Normalize-ish to 0..100
    return clamp(Math.round((sum / (SLIDERS.length * 30)) * 100), 0, 100);
  }, [weights]);

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/15 via-gold/10 to-secondary/10 blur-2xl rounded-[2rem]" />
      <div className="relative bg-white/90 backdrop-blur border border-gray-100 rounded-[2rem] p-5 md:p-6 shadow-card overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide">
              Gamificado · Calibra tu match
            </div>
            <h3 className="mt-3 text-xl md:text-2xl font-extrabold text-secondary">
              Ajusta prioridades y mira a quién “favorece” tu modelo
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Esto es una demo educativa: el algoritmo usa tus pesos para estimar afinidad estratégica.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs font-extrabold text-gray-600 uppercase tracking-wide">
              Nivel
            </div>
            <div className="text-2xl font-extrabold text-primary">{xp}</div>
            <div className="text-xs text-gray-500">XP de calibración</div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {SLIDERS.map((s, idx) => {
            const value = weights[s.key];
            return (
              <div key={s.key} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-xs text-gray-600">
                  <span className="font-extrabold text-gray-800">
                    {idx + 1}. {s.label}
                  </span>
                  <span className="font-bold text-gray-900">{value}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={1}
                  value={value}
                  onChange={(e) => {
                    const next = Number(e.target.value);
                    setWeights((prev) => ({
                      ...prev,
                      [s.key]: next,
                    }));
                  }}
                  className="w-full accent-primary"
                  aria-label={s.label}
                />
                <div className="text-[11px] text-gray-500 leading-relaxed">
                  {s.hint}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-4">
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
              Tu recomendación (demo)
            </div>
            {top?.candidate ? (
              <>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-gray-900 truncate">
                      #{top.candidate.rank} · {top.candidate.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {top.candidate.party}
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-extrabold border border-primary-100 bg-primary-50 text-primary">
                    {pct01(top.breakdown.overallScore)}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    ["Posiciones", top.breakdown.positionsComponent],
                    ["Digital", top.breakdown.digitalComponent],
                    ["Antivoto", top.breakdown.antiVoteComponent],
                  ].map(([label, n]) => (
                    <div key={String(label)} className="text-[11px]">
                      <div className="text-gray-500">{label}</div>
                      <div className="font-extrabold text-gray-900">{pct01(Number(n))}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-600 mt-2">
                Ajusta los pesos para ver resultados.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col">
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
              Siguiente paso
            </div>
            <div className="mt-2 text-sm font-semibold text-gray-800">
              ¿Quieres el match completo (10 propuestas reales + share)?
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-3 px-4 rounded-xl hover:bg-primary-600 transition-colors"
              >
                Abrir “Mi Match”
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/comparador-estrategico"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 font-extrabold py-3 px-4 rounded-xl transition-colors"
              >
                Comparar con pesos
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="mt-4 text-[11px] text-gray-500 leading-relaxed">
              Demo: usa datos y heurísticas de tu modelo para estimar afinidad; no es pronóstico oficial.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

