"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  Candidate2026ListItem,
  CandidateDimension,
} from "@/lib/data/candidates2026";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";

type Weights = Record<CandidateDimension, number>;

const DEFAULTS: Weights = {
  economic: 18,
  social: 18,
  environment: 10,
  security: 22,
  institutional: 10,
};

const DIMENSIONS: { key: CandidateDimension; label: string; min: number; max: number }[] =
  [
    { key: "economic", label: "Economía", min: 0, max: 30 },
    { key: "social", label: "Social", min: 0, max: 30 },
    { key: "environment", label: "Ambiente", min: 0, max: 30 },
    { key: "security", label: "Seguridad", min: 0, max: 30 },
    { key: "institutional", label: "Institucional", min: 0, max: 30 },
  ];

function weightedScore(candidate: Candidate2026ListItem, w: Weights) {
  const total = Object.values(w).reduce((a, b) => a + b, 0) || 1;
  const score =
    (candidate.positions.economic * w.economic +
      candidate.positions.social * w.social +
      candidate.positions.environment * w.environment +
      candidate.positions.security * w.security +
      candidate.positions.institutional * w.institutional) /
    (total * 1);
  return score / 100; // 0..1-ish
}

export function ComparadorPreviewMini() {
  const [aSlug, setASlug] = useState(OFFICIAL_CANDIDATES_2026[0]?.slug ?? "");
  const [bSlug, setBSlug] = useState(OFFICIAL_CANDIDATES_2026[1]?.slug ?? "");
  const [weights, setWeights] = useState<Weights>(DEFAULTS);

  const a = useMemo(
    () => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === aSlug) ?? OFFICIAL_CANDIDATES_2026[0],
    [aSlug],
  );
  const b = useMemo(
    () => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === bSlug) ?? OFFICIAL_CANDIDATES_2026[1],
    [bSlug],
  );

  const scoreA = useMemo(() => weightedScore(a, weights), [a, weights]);
  const scoreB = useMemo(() => weightedScore(b, weights), [b, weights]);

  const winner = scoreA >= scoreB ? a : b;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-gray-900">Comparador (preview)</div>
          <div className="text-xs text-gray-500 mt-1">
            Ajusta prioridades por dimensión y compara dos candidatos con un puntaje.
          </div>
        </div>
        <Link
          href="/comparador"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
        >
          Abrir comparador <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr]">
        <div>
          <label className="text-sm font-extrabold text-gray-900" htmlFor="comp-a">
            Candidato A
          </label>
          <select
            id="comp-a"
            value={aSlug}
            onChange={(e) => setASlug(e.target.value)}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
          >
            {OFFICIAL_CANDIDATES_2026.map((c) => (
              <option key={c.slug} value={c.slug}>
                #{c.rank} · {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-extrabold text-gray-900" htmlFor="comp-b">
            Candidato B
          </label>
          <select
            id="comp-b"
            value={bSlug}
            onChange={(e) => setBSlug(e.target.value)}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
          >
            {OFFICIAL_CANDIDATES_2026.map((c) => (
              <option key={c.slug} value={c.slug}>
                #{c.rank} · {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
          Resultado (por prioridades)
        </div>
        <div className="mt-2 flex flex-wrap gap-4 items-center justify-between">
          <div className="min-w-[200px]">
            <div className="text-sm font-extrabold text-gray-900 truncate">A: {a.name}</div>
            <div className="text-xs text-gray-500 mt-1">{a.party}</div>
            <div className="mt-2 h-3 rounded-full bg-white border border-gray-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-gold"
                style={{ width: `${Math.round(scoreA * 100)}%` }}
              />
            </div>
          </div>
          <div className="min-w-[200px]">
            <div className="text-sm font-extrabold text-gray-900 truncate">B: {b.name}</div>
            <div className="text-xs text-gray-500 mt-1">{b.party}</div>
            <div className="mt-2 h-3 rounded-full bg-white border border-gray-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-gold"
                style={{ width: `${Math.round(scoreB * 100)}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
              Ventaja actual
            </div>
            <div className="mt-2 text-lg font-extrabold text-primary">{winner.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {winner.slug === a.slug ? `A (${Math.round(scoreA * 100)}%)` : `B (${Math.round(scoreB * 100)}%)`}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {DIMENSIONS.map((d) => (
          <div key={d.key} className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-xs text-gray-600">
              <span className="font-extrabold text-gray-800">{d.label}</span>
              <span className="font-bold text-gray-900">{weights[d.key]}</span>
            </div>
            <input
              type="range"
              min={d.min}
              max={d.max}
              step={1}
              value={weights[d.key]}
              onChange={(e) => {
                const next = Number(e.target.value);
                setWeights((prev) => ({ ...prev, [d.key]: next }));
              }}
              className="w-full accent-primary"
              aria-label={d.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

