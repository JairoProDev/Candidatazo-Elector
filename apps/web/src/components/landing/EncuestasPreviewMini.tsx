"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type CandidateTrend = {
  name: string;
  party: string;
  color: string;
  percentage: number;
  trend: "up" | "down" | "stable";
  trendDelta: number;
  timeline: [number, number, number]; // Jan, Feb, Mar
};

const CANDIDATES: CandidateTrend[] = [
  {
    name: "Rafael López Aliaga",
    party: "Renovación Popular",
    color: "#7C3AED",
    percentage: 11.7,
    trend: "up",
    trendDelta: 1.8,
    timeline: [8.2, 9.9, 11.7],
  },
  {
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    color: "#FF6B00",
    percentage: 9.4,
    trend: "down",
    trendDelta: -0.8,
    timeline: [10.5, 10.2, 9.4],
  },
  {
    name: "Alfonso López Chau",
    party: "Ahora Nación",
    color: "#2563EB",
    percentage: 6.8,
    trend: "up",
    trendDelta: 2.1,
    timeline: [3.2, 4.7, 6.8],
  },
  {
    name: "Wolfgang Grozo",
    party: "Integridad Democrática",
    color: "#059669",
    percentage: 4.3,
    trend: "up",
    trendDelta: 3.9,
    timeline: [0.4, 1.8, 4.3],
  },
  {
    name: "George Forsyth",
    party: "Somos Perú",
    color: "#14B8A6",
    percentage: 1.8,
    trend: "down",
    trendDelta: -0.5,
    timeline: [2.8, 2.3, 1.8],
  },
];

const MONTHS = ["Ene 2026", "Feb 2026", "Mar 2026"];

export function EncuestasPreviewMini() {
  const [name, setName] = useState(CANDIDATES[0]?.name ?? "");
  const selected = useMemo(
    () => CANDIDATES.find((c) => c.name === name) ?? CANDIDATES[0],
    [name],
  );

  const tone =
    selected.trend === "up" ? "text-emerald-700" : selected.trend === "down" ? "text-red-700" : "text-gray-700";

  const maxVal = useMemo(() => Math.max(...CANDIDATES.map((c) => c.timeline[2])), []);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-gray-900">Encuestas (mini)</div>
          <div className="text-xs text-gray-500 mt-1">
            Selecciona un candidato y mira el movimiento en 3 meses.
          </div>
        </div>
        <Link
          href="/encuestas"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
        >
          Ver detalle <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] items-end">
        <div>
          <label htmlFor="enc-select" className="text-sm font-extrabold text-gray-900">
            Candidato
          </label>
          <select
            id="enc-select"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
          >
            {CANDIDATES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-right">
          <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
            Mar 2026
          </div>
          <div className="text-2xl font-extrabold text-primary">{selected.percentage}%</div>
          <div className={`text-sm font-extrabold ${tone}`}>
            {selected.trend === "up" ? "+" : ""}
            {selected.trendDelta}% vs anterior
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {selected.timeline.map((v, i) => {
          const h = Math.round((v / maxVal) * 100);
          return (
            <div key={MONTHS[i]} className="rounded-2xl border border-gray-100 bg-gray-50 p-3 text-center">
              <div
                className="mx-auto rounded-xl w-6 sm:w-7"
                style={{
                  height: `${Math.max(6, h)}%`,
                  backgroundColor: selected.color,
                  transition: "height 300ms ease",
                }}
                aria-hidden="true"
              />
              <div className="mt-2 text-xs font-extrabold text-gray-700">{MONTHS[i]}</div>
              <div className="text-xs text-gray-500">{v}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

