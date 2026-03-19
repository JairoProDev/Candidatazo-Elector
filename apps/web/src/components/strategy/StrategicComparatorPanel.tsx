"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Candidate2026ListItem, CandidateDimension } from "@/lib/data/candidates2026";
import {
  scoreCandidateStrategic,
  type StrategyWeights,
} from "@/lib/strategy/election2026";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";

type PresetId = "seguridad" | "equilibrio" | "tech" | "segunda_vuelta";

const PRESETS: Record<
  PresetId,
  {
    label: string;
    weights: StrategyWeights;
  }
> = {
  seguridad: {
    label: "Seguridad y orden",
    weights: {
      economic: 12,
      social: 10,
      environment: 6,
      security: 30,
      institutional: 12,
      digital: 8,
      antiVote: 10,
      legalRisk: 12,
    },
  },
  equilibrio: {
    label: "Equilibrio ciudadano",
    weights: {
      economic: 16,
      social: 16,
      environment: 12,
      security: 16,
      institutional: 16,
      digital: 10,
      antiVote: 6,
      legalRisk: 8,
    },
  },
  tech: {
    label: "Tech y antifragilidad",
    weights: {
      economic: 10,
      social: 10,
      environment: 10,
      security: 14,
      institutional: 18,
      digital: 28,
      antiVote: 6,
      legalRisk: 4,
    },
  },
  segunda_vuelta: {
    label: "Segunda vuelta (antivoto)",
    weights: {
      economic: 10,
      social: 10,
      environment: 8,
      security: 14,
      institutional: 12,
      digital: 8,
      antiVote: 28,
      legalRisk: 10,
    },
  },
};

function Range({
  id,
  label,
  value,
  min = 0,
  max = 40,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-xs text-gray-600">
        <span className="font-bold text-gray-900">{label}</span>
        <span className="font-semibold text-gray-700">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

function weightClone(w: StrategyWeights): StrategyWeights {
  return { ...w };
}

function scoreToPercent(v: number) {
  return Math.round(v * 1000) / 10;
}

function CandidateMiniRow({ candidate, score }: { candidate: Candidate2026ListItem; score: number }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4">
      <div className="min-w-0">
        <div className="text-sm font-extrabold text-gray-900 truncate">
          #{candidate.rank} · {candidate.name}
        </div>
        <div className="text-xs text-gray-500 mt-1 truncate">
          {candidate.party}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            veracidad {candidate.truthScore}%
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            antivoto {candidate.antiVote}%
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            digital {candidate.digitalAgendaScore}/100
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">
          score
        </div>
        <div className="text-lg font-extrabold text-primary mt-1">
          {scoreToPercent(score)}%
        </div>
      </div>
    </div>
  );
}

export default function StrategicComparatorPanel() {
  const [presetId, setPresetId] = useState<PresetId>("segunda_vuelta");
  const preset = PRESETS[presetId];

  const [weights, setWeights] = useState<StrategyWeights>(() => weightClone(preset.weights));

  const dims: CandidateDimension[] = ["economic", "social", "environment", "security", "institutional"];

  const [compareSlugA, setCompareSlugA] = useState(OFFICIAL_CANDIDATES_2026[0]?.slug ?? "");
  const [compareSlugB, setCompareSlugB] = useState(OFFICIAL_CANDIDATES_2026[1]?.slug ?? "");

  const a = useMemo(() => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === compareSlugA) ?? OFFICIAL_CANDIDATES_2026[0], [compareSlugA]);
  const b = useMemo(() => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === compareSlugB) ?? OFFICIAL_CANDIDATES_2026[1], [compareSlugB]);

  const topRanked = useMemo(() => {
    return OFFICIAL_CANDIDATES_2026
      .map((c) => ({ c, s: scoreCandidateStrategic(c, weights).overallScore }))
      .sort((x, y) => y.s - x.s)
      .slice(0, 8);
  }, [weights]);

  const aScore = useMemo(() => scoreCandidateStrategic(a, weights), [a, weights]);
  const bScore = useMemo(() => scoreCandidateStrategic(b, weights), [b, weights]);

  const options = OFFICIAL_CANDIDATES_2026.map((c) => ({
    value: c.slug,
    label: `#${c.rank} · ${c.name} (${c.party})`,
  }));

  const onApplyPreset = (id: PresetId) => {
    setPresetId(id);
    setWeights(weightClone(PRESETS[id].weights));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Comparador Estratégico por Pesos 2026
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Ajusta pesos por dimensión y por señales estratégicas (agenda digital, antivoto, riesgo legal). El resultado te devuelve un ranking consistente para decidir con criterio.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as PresetId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onApplyPreset(id)}
              className={[
                "text-sm font-bold px-3 py-2 rounded-xl border transition-colors",
                presetId === id
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-gray-200 text-gray-800 hover:border-primary-200 hover:text-primary",
              ].join(" ")}
            >
              {PRESETS[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
            <div className="text-sm font-extrabold text-gray-900">Pesos</div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <Range
                id="w-economic"
                label="Economía"
                value={weights.economic}
                onChange={(v) => setWeights((prev) => ({ ...prev, economic: v }))}
              />
              <Range
                id="w-social"
                label="Social"
                value={weights.social}
                onChange={(v) => setWeights((prev) => ({ ...prev, social: v }))}
              />
              <Range
                id="w-environment"
                label="Ambiente"
                value={weights.environment}
                onChange={(v) => setWeights((prev) => ({ ...prev, environment: v }))}
              />
              <Range
                id="w-security"
                label="Seguridad"
                value={weights.security}
                onChange={(v) => setWeights((prev) => ({ ...prev, security: v }))}
              />
              <Range
                id="w-institutional"
                label="Institucional"
                value={weights.institutional}
                onChange={(v) => setWeights((prev) => ({ ...prev, institutional: v }))}
              />
              <Range
                id="w-digital"
                label="Agenda digital"
                value={weights.digital}
                min={0}
                max={40}
                onChange={(v) => setWeights((prev) => ({ ...prev, digital: v }))}
              />
              <Range
                id="w-antiVote"
                label="Antivoto"
                value={weights.antiVote}
                min={0}
                max={40}
                onChange={(v) => setWeights((prev) => ({ ...prev, antiVote: v }))}
              />
              <Range
                id="w-legalRisk"
                label="Riesgo legal"
                value={weights.legalRisk}
                min={0}
                max={40}
                onChange={(v) => setWeights((prev) => ({ ...prev, legalRisk: v }))}
              />
            </div>

            <div className="mt-3 text-xs text-gray-500 leading-relaxed">
              El score se calcula con normalización automática. Cambiar pesos reordena el ranking de forma “suave” y consistente.
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
            <div className="text-sm font-extrabold text-gray-900">Top recomendado</div>
            <div className="mt-3 space-y-3">
              {topRanked.map(({ c, s }) => (
                <CandidateMiniRow key={c.slug} candidate={c} score={s} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
            <div className="text-sm font-extrabold text-gray-900">Comparar dos candidatos</div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-extrabold text-gray-900" htmlFor="cmp-a">
                  A
                </label>
                <select
                  id="cmp-a"
                  value={compareSlugA}
                  onChange={(e) => setCompareSlugA(e.target.value)}
                  className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
                >
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-extrabold text-gray-900" htmlFor="cmp-b">
                  B
                </label>
                <select
                  id="cmp-b"
                  value={compareSlugB}
                  onChange={(e) => setCompareSlugB(e.target.value)}
                  className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
                >
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">A</div>
                <div className="text-base font-extrabold text-gray-900 mt-1">{a.name}</div>
                <div className="text-sm text-gray-700 mt-2">
                  Score: <span className="font-extrabold text-primary">{scoreToPercent(aScore.overallScore)}%</span>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-100 text-gray-700">
                    digital {a.digitalAgendaScore}/100
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-100 text-gray-700">
                    antivoto {a.antiVote}%
                  </span>
                </div>
                <div className="mt-3">
                  <Link
                    href={`/candidatos/${a.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Ver perfil
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">B</div>
                <div className="text-base font-extrabold text-gray-900 mt-1">{b.name}</div>
                <div className="text-sm text-gray-700 mt-2">
                  Score: <span className="font-extrabold text-primary">{scoreToPercent(bScore.overallScore)}%</span>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-100 text-gray-700">
                    digital {b.digitalAgendaScore}/100
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-100 text-gray-700">
                    antivoto {b.antiVote}%
                  </span>
                </div>
                <div className="mt-3">
                  <Link
                    href={`/candidatos/${b.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Ver perfil
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
            <div className="text-sm font-extrabold text-gray-900">Qué aprender</div>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-700 list-disc pl-5">
              <li>Si el ranking cambia mucho al subir “antivoto”, tu escenario es de segunda vuelta.</li>
              <li>Si gana “agenda digital”, el indeciso puede transferir por narrativa y ejecución.</li>
              <li>Si sube “riesgo legal”, el modelo penaliza incertidumbre/inestabilidad.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

