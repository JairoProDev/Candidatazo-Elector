"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Candidate2026ListItem } from "@/lib/data/candidates2026";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";
import type React from "react";
import type { ContinuityPreference, SecondRoundWeights } from "@/lib/strategy/election2026";
import { predictSecondRound } from "@/lib/strategy/election2026";
import Link from "next/link";

type NormalizedWeights = SecondRoundWeights & { _normalized: true };

function normalizeWeights(w: SecondRoundWeights): NormalizedWeights {
  const total = w.antiVote + w.legalRisk + w.truth + w.digital + w.continuity;
  const factor = total > 0 ? 1 / total : 1;
  return {
    antiVote: w.antiVote * factor,
    legalRisk: w.legalRisk * factor,
    truth: w.truth * factor,
    digital: w.digital * factor,
    continuity: w.continuity * factor,
    _normalized: true,
  };
}

const MATRIX_PRESETS: { id: string; label: string; weights: SecondRoundWeights }[] = [
  {
    id: "equilibrio",
    label: "Equilibrado",
    weights: { antiVote: 0.45, legalRisk: 0.15, truth: 0.15, digital: 0.1, continuity: 0.15 },
  },
  {
    id: "antivoto",
    label: "Foco antivoto",
    weights: { antiVote: 0.6, legalRisk: 0.14, truth: 0.08, digital: 0.08, continuity: 0.1 },
  },
  {
    id: "tech",
    label: "Foco agenda digital",
    weights: { antiVote: 0.35, legalRisk: 0.12, truth: 0.1, digital: 0.28, continuity: 0.15 },
  },
];

function scoreWinProbabilityForA(
  pivot: Candidate2026ListItem,
  opponent: Candidate2026ListItem,
  continuityPreference: ContinuityPreference,
  weights: SecondRoundWeights,
) {
  const pred = predictSecondRound(pivot, opponent, { continuityPreference, weights });
  if (pred.winnerSlug === pivot.slug) return pred.winnerProbability;
  return 100 - pred.winnerProbability;
}

function Chip({ tone, children }: { tone: "red" | "amber" | "emerald" | "slate"; children: React.ReactNode }) {
  const cls =
    tone === "red"
      ? "bg-red-50 border-red-200 text-red-700"
      : tone === "amber"
        ? "bg-amber-50 border-amber-200 text-amber-700"
        : tone === "emerald"
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-slate-50 border-slate-200 text-slate-700";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold border ${cls}`}>
      {children}
    </span>
  );
}

function riskTone(risk: Candidate2026ListItem["legalRisk"]) {
  if (risk === "alto") return "red";
  if (risk === "medio") return "amber";
  return "emerald";
}

export default function SecondRoundMatrixPanel({
  defaultAPivotSlug,
}: {
  defaultAPivotSlug?: string;
}) {
  const router = useRouter();

  const [pivotSlug, setPivotSlug] = useState<string>(
    defaultAPivotSlug ?? OFFICIAL_CANDIDATES_2026[0]?.slug ?? "",
  );
  const [continuityPreference, setContinuityPreference] =
    useState<ContinuityPreference>("mixto");
  const [presetId, setPresetId] = useState<string>(MATRIX_PRESETS[0].id);

  const preset = useMemo(
    () => MATRIX_PRESETS.find((p) => p.id === presetId) ?? MATRIX_PRESETS[0],
    [presetId],
  );

  const pivot = useMemo(
    () => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === pivotSlug) ?? OFFICIAL_CANDIDATES_2026[0],
    [pivotSlug],
  );

  const opponents = useMemo(
    () => OFFICIAL_CANDIDATES_2026.filter((c) => c.slug !== pivot.slug),
    [pivot.slug],
  );

  const results = useMemo(() => {
    const weights = normalizeWeights(preset.weights);
    const rows = opponents.map((opp) => {
      const pA = scoreWinProbabilityForA(
        pivot,
        opp,
        continuityPreference,
        weights,
      );
      return { opp, pA };
    });
    rows.sort((x, y) => y.pA - x.pA);
    return rows;
  }, [opponents, pivot, continuityPreference, preset.weights]);

  const top = results.slice(0, 10);
  const bottom = results.slice(-10).reverse();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <h2 className="text-2xl font-extrabold text-gray-900">
        Matriz de Segunda Vuelta (Pivot vs Rivales)
      </h2>
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        Elige un candidato “pivot” y calcula la probabilidad aproximada de que gane contra cada rival. Luego puedes enviar el rival más interesante al simulador con un click.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div>
          <label htmlFor="pivot-slug" className="text-sm font-extrabold text-gray-900">
            Pivot (A)
          </label>
          <select
            id="pivot-slug"
            value={pivotSlug}
            onChange={(e) => setPivotSlug(e.target.value)}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
          >
            {OFFICIAL_CANDIDATES_2026.map((c) => (
              <option key={c.slug} value={c.slug}>
                #{c.rank} · {c.name} ({c.party})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="matrix-preset" className="text-sm font-extrabold text-gray-900">
            Preset de pesos
          </label>
          <select
            id="matrix-preset"
            value={presetId}
            onChange={(e) => setPresetId(e.target.value)}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
          >
            {MATRIX_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-extrabold text-gray-900">
            Continuidad vs disrupción
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [
                { id: "disrupcion", label: "Disrupción" },
                { id: "mixto", label: "Mixto" },
                { id: "continuidad", label: "Continuidad" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setContinuityPreference(opt.id)}
                className={[
                  "text-xs font-bold px-3 py-2 rounded-xl border transition-colors",
                  continuityPreference === opt.id
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-gray-200 text-gray-800 hover:border-primary-200 hover:text-primary",
                ].join(" ")}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-extrabold text-gray-900">Top rivales (A gana)</div>
            <Chip tone="emerald">A prob. alta</Chip>
          </div>

          <div className="mt-3 space-y-2">
            {top.map(({ opp, pA }) => (
              <div
                key={opp.slug}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-gray-900 truncate">
                    #{opp.rank} · {opp.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{opp.party}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Chip tone={riskTone(opp.legalRisk)}>{`riesgo ${opp.legalRisk}`}</Chip>
                    <span className="text-[10px] font-extrabold rounded-full bg-white border border-gray-100 text-gray-700 px-2 py-1">
                      antivoto {opp.antiVote}%
                    </span>
                    <span className="text-[10px] font-extrabold rounded-full bg-white border border-gray-100 text-gray-700 px-2 py-1">
                      digital {opp.digitalAgendaScore}/100
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    prob. A
                  </div>
                  <div className="text-lg font-extrabold text-primary">{Math.round(pA * 10) / 10}%</div>
                  <button
                    type="button"
                    onClick={() => router.push(`/segunda-vuelta?a=${pivot.slug}&b=${opp.slug}`)}
                    className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Enviar a simulador <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-extrabold text-gray-900">Bottom rivales (A pierde)</div>
            <Chip tone="red">A prob. baja</Chip>
          </div>

          <div className="mt-3 space-y-2">
            {bottom.map(({ opp, pA }) => (
              <div
                key={opp.slug}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-gray-900 truncate">
                    #{opp.rank} · {opp.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{opp.party}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Chip tone={riskTone(opp.legalRisk)}>{`riesgo ${opp.legalRisk}`}</Chip>
                    <span className="text-[10px] font-extrabold rounded-full bg-white border border-gray-100 text-gray-700 px-2 py-1">
                      antivoto {opp.antiVote}%
                    </span>
                    <span className="text-[10px] font-extrabold rounded-full bg-white border border-gray-100 text-gray-700 px-2 py-1">
                      digital {opp.digitalAgendaScore}/100
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    prob. A
                  </div>
                  <div className="text-lg font-extrabold text-primary">{Math.round(pA * 10) / 10}%</div>
                  <button
                    type="button"
                    onClick={() => router.push(`/segunda-vuelta?a=${pivot.slug}&b=${opp.slug}`)}
                    className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Enviar a simulador <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-extrabold text-gray-900">Tabla completa (A vs 35 rivales)</div>
          <Link
            href={`/candidatos/${pivot.slug}`}
            className="text-xs font-extrabold text-primary hover:underline"
          >
            Ver pivot
          </Link>
        </div>
        <div className="mt-3 overflow-x-auto max-h-[460px] overflow-y-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm text-gray-700 bg-white">
            <thead className="sticky top-0 bg-white border-b border-gray-100">
              <tr className="text-left">
                <th className="px-4 py-3 font-extrabold">#</th>
                <th className="px-4 py-3 font-extrabold">Rival</th>
                <th className="px-4 py-3 font-extrabold">Partido</th>
                <th className="px-4 py-3 font-extrabold">Antivoto</th>
                <th className="px-4 py-3 font-extrabold">Digital</th>
                <th className="px-4 py-3 font-extrabold">Riesgo</th>
                <th className="px-4 py-3 font-extrabold">Prob. A</th>
                <th className="px-4 py-3 font-extrabold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ opp, pA }) => (
                <tr key={opp.slug} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-bold">{opp.rank}</td>
                  <td className="px-4 py-3 font-extrabold">{opp.name}</td>
                  <td className="px-4 py-3 text-gray-600">{opp.party}</td>
                  <td className="px-4 py-3">{opp.antiVote}%</td>
                  <td className="px-4 py-3">{opp.digitalAgendaScore}/100</td>
                  <td className="px-4 py-3">
                    <span className={`font-extrabold text-xs ${opp.legalRisk === "alto" ? "text-red-700" : opp.legalRisk === "medio" ? "text-amber-700" : "text-emerald-700"}`}>
                      {opp.legalRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-extrabold text-primary">
                    {Math.round(pA * 10) / 10}%
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/segunda-vuelta?a=${pivot.slug}&b=${opp.slug}`)
                      }
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
                    >
                      Usar <span aria-hidden="true">→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-xs text-gray-500 leading-relaxed">
          Nota: probabilidades basadas en señales internas del modelo (antivoto, viabilidad proxy, veracidad y agenda digital). No es pronóstico oficial.
        </div>
      </div>
    </div>
  );
}

