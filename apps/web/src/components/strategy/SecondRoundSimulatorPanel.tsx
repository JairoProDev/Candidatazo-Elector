"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Candidate2026ListItem } from "@/lib/data/candidates2026";
import {
  DEFAULT_SECOND_ROUND_WEIGHTS,
  predictSecondRound,
  type ContinuityPreference,
  type SecondRoundWeights,
} from "@/lib/strategy/election2026";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";
import { useLocalStorageState } from "@/components/hooks/useLocalStorageState";

const WATCHLIST_KEY = "candidatos2026:watchlist";

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-extrabold text-gray-900">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function WeightTuner({
  weights,
  onChange,
}: {
  weights: SecondRoundWeights;
  onChange: (next: SecondRoundWeights) => void;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-extrabold text-gray-900">Pesos del modelo</div>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_SECOND_ROUND_WEIGHTS)}
          className="text-xs font-bold text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {(
          [
            ["antiVote", "Antivoto"],
            ["legalRisk", "Riesgo legal"],
            ["truth", "Veracidad"],
            ["digital", "Agenda digital"],
            ["continuity", "Continuidad vs disrupción"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="space-y-1">
            <div className="flex items-center justify-between gap-3 text-xs text-gray-600">
              <span className="font-bold text-gray-900">{label}</span>
              <span className="font-semibold text-gray-700">
                {Math.round(weights[key] * 100) / 100}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={0.6}
              step={0.01}
              value={weights[key]}
              onChange={(e) =>
                onChange({
                  ...weights,
                  [key]: Number(e.target.value),
                })
              }
              className="w-full accent-primary"
            />
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-500 leading-relaxed">
        Modelo heurístico para aprendizaje: úsalo para comparar escenarios, no como pronóstico oficial.
      </div>
    </div>
  );
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs text-gray-600">
        <span className="font-bold text-gray-900">{label}</span>
        <span className="font-semibold text-gray-700">{Math.round(v)}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mt-2">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

export default function SecondRoundSimulatorPanel() {
  const [aSlug, setASlug] = useState(OFFICIAL_CANDIDATES_2026[0]?.slug ?? "");
  const [bSlug, setBSlug] = useState(OFFICIAL_CANDIDATES_2026[1]?.slug ?? "");

  const [watchSlugs] = useLocalStorageState<string[]>(WATCHLIST_KEY, []);

  const [continuityPreference, setContinuityPreference] =
    useState<ContinuityPreference>("mixto");

  const [weights, setWeights] = useState<SecondRoundWeights>(DEFAULT_SECOND_ROUND_WEIGHTS);

  const a = useMemo(
    () => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === aSlug) ?? OFFICIAL_CANDIDATES_2026[0],
    [aSlug],
  );
  const b = useMemo(
    () => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === bSlug) ?? OFFICIAL_CANDIDATES_2026[1],
    [bSlug],
  );

  const prediction = useMemo(() => {
    if (!a || !b) throw new Error("Missing candidates");
    return predictSecondRound(a, b, { continuityPreference, weights });
  }, [a, b, continuityPreference, weights]);

  const winner = prediction.winnerSlug === a.slug ? a : b;

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const shareText = useMemo(() => {
    const w = prediction.winnerName;
    const l = prediction.loserName;
    return `Candidatazo 2026 - Simulador segunda vuelta: ${w} gana vs ${l} (≈${prediction.winnerProbability}%).`;
  }, [prediction]);

  const scenarioForA = useMemo(() => {
    if (!a) return null;
    const others = OFFICIAL_CANDIDATES_2026.filter((c) => c.slug !== a.slug);
    const scored = others.map((opp) => {
      const pred = predictSecondRound(a, opp, { continuityPreference, weights });
      const pA =
        pred.winnerSlug === a.slug ? pred.winnerProbability : 100 - pred.winnerProbability;
      return { opp, pA };
    });
    scored.sort((x, y) => y.pA - x.pA);
    return {
      best: scored.slice(0, 3),
      worst: scored.slice(-3).reverse(),
    };
  }, [a, continuityPreference, weights]);

  const winnerCta = (
    <div className="mt-4">
      <Link
        href={`/candidatos/${winner.slug}`}
        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
      >
        Ver perfil de {winner.name}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );

  const continuityOptions: { id: ContinuityPreference; label: string }[] = [
    { id: "disrupcion", label: "Disrupción" },
    { id: "mixto", label: "Mixto" },
    { id: "continuidad", label: "Continuidad" },
  ];

  useEffect(() => {
    // Si el usuario ya tiene watchlist y el simulador está en un estado inicial, sugerimos autocompletar.
    if (watchSlugs.length < 2) return;

    // Si el usuario no tocó todavía, usamos los dos primeros guardados.
    const currentDefaultA = aSlug === OFFICIAL_CANDIDATES_2026[0]?.slug;
    const currentDefaultB = bSlug === OFFICIAL_CANDIDATES_2026[1]?.slug;
    if (currentDefaultA && currentDefaultB) {
      setASlug(watchSlugs[0]);
      setBSlug(watchSlugs[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Simulador de Segunda Vuelta 2026
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Selecciona dos candidatos y compara el escenario usando el enfoque “antivoto + viabilidad + alineación de continuidad/disrupción + agenda digital”.
        </p>

        {watchSlugs.length >= 2 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setASlug(watchSlugs[0]);
                setBSlug(watchSlugs[1]);
              }}
              className="text-sm font-bold px-3 py-2 rounded-xl border border-primary-200 bg-primary-50 text-primary hover:bg-primary-100 transition-colors"
            >
              Usar mis 2 watchlist
            </button>
          </div>
        )}

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Select
            id="sr-a"
            label="Candidato A"
            value={aSlug}
            onChange={setASlug}
            options={OFFICIAL_CANDIDATES_2026.map((c) => ({
              value: c.slug,
              label: `#${c.rank} · ${c.name} (${c.party})`,
            }))}
          />
          <Select
            id="sr-b"
            label="Candidato B"
            value={bSlug}
            onChange={setBSlug}
            options={OFFICIAL_CANDIDATES_2026.map((c) => ({
              value: c.slug,
              label: `#${c.rank} · ${c.name} (${c.party})`,
            }))}
          />
        </div>

        <div className="mt-4">
          <div className="text-sm font-extrabold text-gray-900">
            Preferencia emocional (continuidad vs disrupción)
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {continuityOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setContinuityPreference(opt.id)}
                className={[
                  "text-sm font-bold px-3 py-2 rounded-xl border transition-colors",
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

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
          <div className="text-sm font-extrabold text-gray-900">Resultado</div>
          <div className="mt-3 p-4 rounded-2xl bg-primary-50 border border-primary-100">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs font-bold text-primary uppercase tracking-wide">
                  Ganador probable
                </div>
                <div className="text-xl md:text-2xl font-extrabold text-gray-900 mt-1">
                  {prediction.winnerName}
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  Probabilidad aproximada:{" "}
                  <span className="font-extrabold">{prediction.winnerProbability}%</span>
                </div>
                {winnerCta}
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-gray-500">Perdedor</div>
                <div className="text-sm font-extrabold text-gray-900 mt-1">
                  {prediction.loserName}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  En el modelo, el antivoto y la viabilidad pesan más.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="text-sm font-extrabold text-gray-900">
                Desglose ganador
              </div>
              <ProgressBar
                value={prediction.breakdownWinner.antiVoteComponent * 100}
                label="Antivoto (menor => mejor)"
              />
              <ProgressBar
                value={prediction.breakdownWinner.legalRiskComponent * 100}
                label="Riesgo legal (viabilidad)"
              />
              <ProgressBar
                value={prediction.breakdownWinner.digitalComponent * 100}
                label="Agenda digital"
              />
              <ProgressBar
                value={prediction.breakdownWinner.continuityComponent * 100}
                label="Alineación emocional"
              />
            </div>
            <div className="space-y-3">
              <div className="text-sm font-extrabold text-gray-900">
                Desglose perdedor
              </div>
              <ProgressBar
                value={prediction.breakdownLoser.antiVoteComponent * 100}
                label="Antivoto (menor => mejor)"
              />
              <ProgressBar
                value={prediction.breakdownLoser.legalRiskComponent * 100}
                label="Riesgo legal (viabilidad)"
              />
              <ProgressBar
                value={prediction.breakdownLoser.digitalComponent * 100}
                label="Agenda digital"
              />
              <ProgressBar
                value={prediction.breakdownLoser.continuityComponent * 100}
                label="Alineación emocional"
              />
            </div>
          </div>

          <div className="mt-5 bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <div className="text-sm font-extrabold text-gray-900">Por qué (explicación)</div>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 list-disc pl-5">
              <li>
                Antivoto: el ganador tiende a tener{" "}
                <span className="font-extrabold">
                  menor antivoto
                </span>{" "}
                (en el modelo).
              </li>
              <li>
                Viabilidad: su{" "}
                <span className="font-extrabold">
                  riesgo legal
                </span>{" "}
                compite mejor.
              </li>
              <li>
                Competencia técnica: la{" "}
                <span className="font-extrabold">agenda digital</span>{" "}
                puede activar transferencia de indecisos.
              </li>
              <li>
                Capa emocional: la{" "}
                <span className="font-extrabold">preferencia</span>{" "}
                continuidad/disrupción modifica el peso final.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <WeightTuner weights={weights} onChange={setWeights} />

          {scenarioForA && (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
              <div className="text-sm font-extrabold text-gray-900">Rivales sugeridos para {a.name}</div>
              <div className="mt-3 space-y-4">
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wide">
                    Mejores escenarios
                  </div>
                  <div className="mt-2 space-y-2">
                    {scenarioForA.best.map(({ opp, pA }) => (
                      <div key={opp.slug} className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setBSlug(opp.slug)}
                          className="text-sm font-extrabold text-gray-900 hover:text-primary transition-colors truncate"
                        >
                          {opp.name}
                        </button>
                        <span className="text-xs font-extrabold text-primary bg-primary-50 border border-primary-100 px-2 py-1 rounded-xl">
                          {Math.round(pA * 10) / 10}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wide">
                    Peores escenarios
                  </div>
                  <div className="mt-2 space-y-2">
                    {scenarioForA.worst.map(({ opp, pA }) => (
                      <div key={opp.slug} className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setBSlug(opp.slug)}
                          className="text-sm font-extrabold text-gray-900 hover:text-primary transition-colors truncate"
                        >
                          {opp.name}
                        </button>
                        <span className="text-xs font-extrabold text-primary bg-primary-50 border border-primary-100 px-2 py-1 rounded-xl">
                          {Math.round(pA * 10) / 10}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
            <div className="text-sm font-extrabold text-gray-900">Acciones</div>
            <div className="mt-3 space-y-2">
              <Link
                href="/comparador-estrategico"
                className="block text-center bg-primary text-white text-sm font-bold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
              >
                Comparar por pesos (mi perfil)
              </Link>
              <Link
                href="/candidatos"
                className="block text-center bg-white border border-gray-200 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl hover:border-primary-200 hover:text-primary transition-colors"
              >
                Volver al tablero de candidatos
              </Link>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareText);
                    setCopyStatus("copied");
                    window.setTimeout(() => setCopyStatus("idle"), 1200);
                  } catch {
                    // ignore
                  }
                }}
                className="block w-full text-center bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl hover:border-primary-200 hover:text-primary transition-colors"
              >
                {copyStatus === "copied" ? "Copiado" : "Copiar resumen"}
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500 leading-relaxed">
              Tip: prueba escenarios distintos moviendo “preferencia emocional” y los pesos.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

