"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Candidate2026ListItem } from "@/lib/data/candidates2026";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";
import type { ContinuityPreference, SecondRoundWeights } from "@/lib/strategy/election2026";
import { predictSecondRound, transferCompatibilityScore } from "@/lib/strategy/election2026";

type PresetId = "equilibrado" | "antivoto" | "tech";

const PRESETS: { id: PresetId; label: string; weights: SecondRoundWeights }[] = [
  {
    id: "equilibrado",
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
    label: "Foco tech",
    weights: { antiVote: 0.35, legalRisk: 0.12, truth: 0.1, digital: 0.28, continuity: 0.15 },
  },
];

function continuityLabel(block: Candidate2026ListItem["continuityBlock"]) {
  if (block === "continuidad") return "Continuidad";
  if (block === "disrupcion") return "Disrupción";
  return "Mixto";
}

function riskBadgeClass(risk: Candidate2026ListItem["legalRisk"]) {
  if (risk === "alto") return "bg-red-50 border-red-200 text-red-700";
  if (risk === "medio") return "bg-amber-50 border-amber-200 text-amber-700";
  return "bg-emerald-50 border-emerald-200 text-emerald-700";
}

function pct(n01: number) {
  return Math.round(n01 * 1000) / 10;
}

function heatmapToneClass(score01: number) {
  if (score01 >= 0.7) return "bg-emerald-50 border-emerald-200 text-emerald-900";
  if (score01 >= 0.55) return "bg-amber-50 border-amber-200 text-amber-900";
  if (score01 >= 0.4) return "bg-slate-50 border-slate-200 text-slate-900";
  return "bg-red-50 border-red-200 text-red-800";
}

export default function TransferCompatibilityPanel({
  defaultPivotSlug,
}: {
  defaultPivotSlug?: string;
}) {
  const router = useRouter();
  const [pivotSlug, setPivotSlug] = useState<string>(
    defaultPivotSlug ?? OFFICIAL_CANDIDATES_2026[0]?.slug ?? "",
  );
  const [presetId, setPresetId] = useState<PresetId>("equilibrado");
  const [continuityPreference, setContinuityPreference] =
    useState<ContinuityPreference>("mixto");

  // Señales visuales configurables (thresholds).
  const [signalTop01, setSignalTop01] = useState<number>(0.7);
  const [signalBottom01, setSignalBottom01] = useState<number>(0.35);
  const [signalDigitalHigh, setSignalDigitalHigh] = useState<number>(70);
  const [signalClashPivotWin01, setSignalClashPivotWin01] = useState<number>(0.5);

  const pivot = useMemo(
    () =>
      OFFICIAL_CANDIDATES_2026.find((c) => c.slug === pivotSlug) ??
      OFFICIAL_CANDIDATES_2026[0],
    [pivotSlug],
  );

  const preset = useMemo(
    () => PRESETS.find((p) => p.id === presetId) ?? PRESETS[0],
    [presetId],
  );

  const rivals = useMemo(
    () => OFFICIAL_CANDIDATES_2026.filter((c) => c.slug !== pivot.slug),
    [pivot.slug],
  );

  const results = useMemo(() => {
    const weights = preset.weights;
    const rows = rivals.map((rival) => {
      const score = transferCompatibilityScore(pivot, rival, {
        continuityPreference,
        weights,
      });

      const pred = predictSecondRound(pivot, rival, {
        continuityPreference,
        weights,
      });
      const pPivotWins =
        pred.winnerSlug === pivot.slug ? pred.winnerProbability : 100 - pred.winnerProbability;

      return {
        rival,
        score,
        pPivotWins,
      };
    });

    rows.sort((a, b) => b.score.overallScore - a.score.overallScore);
    return rows;
  }, [pivot, rivals, continuityPreference, preset.weights]);

  const top = results.slice(0, 8);
  const bottom = results.slice(-8).reverse();

  const getSignals = (opts: {
    rival: Candidate2026ListItem;
    score01: number;
    pPivotWinsPercent: number;
  }) => {
    const transferFlag:
      | { key: string; label: string; className: string }
      | undefined =
      opts.score01 >= signalTop01
        ? {
            key: "top",
            label: "Top transferencia",
            className: "bg-emerald-50 border-emerald-200 text-emerald-900",
          }
        : opts.score01 <= signalBottom01
          ? {
              key: "low",
              label: "Baja transferencia",
              className: "bg-red-50 border-red-200 text-red-900",
            }
          : undefined;

    const riskFlag =
      opts.rival.legalRisk === "alto"
        ? {
            key: "risk",
            label: "Riesgo alto",
            className: "bg-amber-50 border-amber-200 text-amber-900",
          }
        : undefined;

    const digitalFlag =
      opts.rival.digitalAgendaScore >= signalDigitalHigh
        ? {
            key: "digital",
            label: "Tech fuerte",
            className: "bg-blue-50 border-blue-200 text-blue-900",
          }
        : undefined;

    const pPivotWin01 = opts.pPivotWinsPercent / 100;
    const clashFlag =
      pPivotWin01 <= signalClashPivotWin01
        ? {
            key: "clash",
            label: "Choque alto",
            className: "bg-slate-50 border-slate-200 text-slate-800",
          }
        : undefined;

    // Orden de prioridad pensado para que “riesgo + tech” coexistan.
    const ordered = [riskFlag, digitalFlag, transferFlag, clashFlag].filter(
      Boolean,
    ) as { key: string; label: string; className: string }[];

    return ordered.slice(0, 3);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Compatibilidad de transferencia (2da vuelta)
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Si tu candidato pivot pasa al balotaje, este módulo estima qué rivales tienen mayor afinidad para transferir votos hacia él.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label htmlFor="tw-pivot" className="text-sm font-extrabold text-gray-900">
                Pivot
              </label>
              <select
                id="tw-pivot"
                value={pivotSlug}
                onChange={(e) => setPivotSlug(e.target.value)}
                className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
              >
                {OFFICIAL_CANDIDATES_2026.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    #{c.rank} · {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tw-preset" className="text-sm font-extrabold text-gray-900">
                Preset
              </label>
              <select
                id="tw-preset"
                value={presetId}
                onChange={(e) => setPresetId(e.target.value as PresetId)}
                className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-sm font-extrabold text-gray-900">
              Preferencia continuidad vs disrupción
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
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
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-extrabold text-gray-900">
            Heatmap de compatibilidad (candidatos que mejor encajan como “transferencia”)
          </div>
          <div className="text-xs text-gray-500">
            Pivot: <span className="font-extrabold text-gray-700">{pivot.name}</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="text-xs text-gray-600">
              Señales por umbrales (aparecen como badges en heatmap y tabla):
              <span className="font-extrabold"> Top/Baja transferencia</span>,
              <span className="font-extrabold"> Tech fuerte</span>,
              <span className="font-extrabold"> Riesgo alto</span>,
              <span className="font-extrabold"> Choque alto</span>.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3">
              <div className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wide">
                Top transferencia
              </div>
              <div className="text-xs font-bold text-gray-900 mt-1">
                {'>='} {Math.round(signalTop01 * 100)}%
              </div>
              <input
                type="range"
                min={0.5}
                max={0.9}
                step={0.01}
                value={signalTop01}
                onChange={(e) => setSignalTop01(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3">
              <div className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wide">
                Baja transferencia
              </div>
              <div className="text-xs font-bold text-gray-900 mt-1">
                {'<='} {Math.round(signalBottom01 * 100)}%
              </div>
              <input
                type="range"
                min={0.1}
                max={0.5}
                step={0.01}
                value={signalBottom01}
                onChange={(e) => setSignalBottom01(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3">
              <div className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wide">
                Tech fuerte
              </div>
              <div className="text-xs font-bold text-gray-900 mt-1">
                {'>='} {signalDigitalHigh}/100
              </div>
              <input
                type="range"
                min={40}
                max={100}
                step={1}
                value={signalDigitalHigh}
                onChange={(e) => setSignalDigitalHigh(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3">
              <div className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wide">
                Choque alto (pivot win)
              </div>
              <div className="text-xs font-bold text-gray-900 mt-1">
                {'<='} {Math.round(signalClashPivotWin01 * 100)}%
              </div>
              <input
                type="range"
                min={0.2}
                max={0.6}
                step={0.01}
                value={signalClashPivotWin01}
                onChange={(e) => setSignalClashPivotWin01(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {results.map(({ rival, score, pPivotWins }) => {
              const signals = getSignals({
                rival,
                score01: score.overallScore,
                pPivotWinsPercent: pPivotWins,
              });

              return (
                <button
                  key={rival.slug}
                  type="button"
                  onClick={() => router.push(`/segunda-vuelta?a=${pivot.slug}&b=${rival.slug}`)}
                  className={[
                    "text-left rounded-2xl border p-4 transition-transform hover:-translate-y-0.5",
                    heatmapToneClass(score.overallScore),
                  ].join(" ")}
                >
              <div className="text-xs font-extrabold uppercase tracking-wide opacity-90">
                #{rival.rank}
              </div>
              <div className="text-sm font-extrabold mt-1 truncate">{rival.name}</div>
              <div className="text-xs opacity-90 mt-0.5 truncate">{rival.party}</div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[10px] font-extrabold opacity-90">
                  score
                </span>
                <span className="text-xs font-extrabold">{pct(score.overallScore)}%</span>
              </div>

              {signals.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {signals.map((s) => (
                    <span
                      key={s.key}
                      className={`text-[10px] font-extrabold border px-2 py-1 rounded-full ${s.className}`}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-[10px] font-extrabold rounded-full bg-white/60 border border-white/40 px-2 py-1">
                  antivoto {rival.antiVote}%
                </span>
                <span className="text-[10px] font-extrabold rounded-full bg-white/60 border border-white/40 px-2 py-1">
                  digital {rival.digitalAgendaScore}/100
                </span>
              </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-extrabold text-gray-900">
              Top rivales transferibles (hacia {pivot.name})
            </div>
            <span className="text-xs font-bold text-primary">mientras caen</span>
          </div>

          <div className="mt-3 space-y-2">
            {top.map(({ rival, score }) => (
              <div
                key={rival.slug}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-gray-900 truncate">
                    #{rival.rank} · {rival.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 truncate">{rival.party}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`text-[10px] font-extrabold border px-2 py-1 rounded-full ${riskBadgeClass(rival.legalRisk)}`}>
                      riesgo {rival.legalRisk}
                    </span>
                    <span className="text-[10px] font-extrabold bg-white border border-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      continuidad {continuityLabel(rival.continuityBlock)}
                    </span>
                    <span className="text-[10px] font-extrabold bg-white border border-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      digital {rival.digitalAgendaScore}/100
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    afinidad total
                  </div>
                  <div className="text-lg font-extrabold text-primary">
                    {pct(score.overallScore)}%
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/segunda-vuelta?a=${pivot.slug}&b=${rival.slug}`)
                    }
                    className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Ver escenario <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-extrabold text-gray-900">
              Menos compatibles (menos transferencia)
            </div>
            <span className="text-xs font-bold text-red-700">alto choque</span>
          </div>

          <div className="mt-3 space-y-2">
            {bottom.map(({ rival, score }) => (
              <div
                key={rival.slug}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-gray-900 truncate">
                    #{rival.rank} · {rival.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 truncate">{rival.party}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`text-[10px] font-extrabold border px-2 py-1 rounded-full ${riskBadgeClass(rival.legalRisk)}`}>
                      riesgo {rival.legalRisk}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    afinidad total
                  </div>
                  <div className="text-lg font-extrabold text-primary">
                    {pct(score.overallScore)}%
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/segunda-vuelta?a=${pivot.slug}&b=${rival.slug}`)
                    }
                    className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Ver escenario <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-extrabold text-gray-900">
            Tabla completa (35 rivales)
          </div>
          <div className="text-xs text-gray-500">
            Pivot: <span className="font-bold text-gray-700">{pivot.name}</span>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto max-h-[420px] overflow-y-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm text-gray-700 bg-white">
            <thead className="sticky top-0 bg-white border-b border-gray-100">
              <tr className="text-left">
                <th className="px-4 py-3 font-extrabold">#</th>
                <th className="px-4 py-3 font-extrabold">Rival</th>
                <th className="px-4 py-3 font-extrabold">Partido</th>
                <th className="px-4 py-3 font-extrabold">Transfer score</th>
                <th className="px-4 py-3 font-extrabold">Antivoto</th>
                <th className="px-4 py-3 font-extrabold">Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ rival, score, pPivotWins }) => {
                const signals = getSignals({
                  rival,
                  score01: score.overallScore,
                  pPivotWinsPercent: pPivotWins,
                });

                return (
                <tr key={rival.slug} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-bold">{rival.rank}</td>
                  <td className="px-4 py-3 font-extrabold text-gray-900">{rival.name}</td>
                  <td className="px-4 py-3 text-gray-600">{rival.party}</td>
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-primary">
                      {pct(score.overallScore)}%
                    </div>
                    {signals.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {signals.map((s) => (
                          <span
                            key={s.key}
                            className={`text-[10px] font-extrabold border px-2 py-1 rounded-full ${s.className}`}
                          >
                            {s.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">{rival.antiVote}%</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-extrabold border px-2 py-1 rounded-full ${riskBadgeClass(rival.legalRisk)}`}
                    >
                      {rival.legalRisk}
                    </span>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-xs text-gray-500 leading-relaxed">
          Nota: estimación heurística. “Transfer score” combina afinidad ideológica/continuidad/digital + probabilidad de que el pivot gane el balotaje.
        </div>
      </div>
    </div>
  );
}

