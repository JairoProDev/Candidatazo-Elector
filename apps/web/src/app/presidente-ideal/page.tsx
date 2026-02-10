"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";

// ─── Policy Issues (15 total) ────────────────────────────────────────────────
interface PolicyIssue {
  id: string;
  name: string;
  labelLeft: string;
  labelRight: string;
  emoji: string;
  category: "economia" | "social" | "seguridad" | "institucional" | "ambiente";
}

const POLICY_ISSUES: PolicyIssue[] = [
  {
    id: "economia",
    name: "Economia",
    labelLeft: "Intervencionismo estatal",
    labelRight: "Libre mercado",
    emoji: "\u{1F4B0}",
    category: "economia",
  },
  {
    id: "impuestos",
    name: "Impuestos",
    labelLeft: "Mas impuestos a ricos",
    labelRight: "Menos impuestos",
    emoji: "\u{1F4B8}",
    category: "economia",
  },
  {
    id: "programas_sociales",
    name: "Programas sociales",
    labelLeft: "Ampliar bonos",
    labelRight: "Eliminar asistencialismo",
    emoji: "\u{1F91D}",
    category: "economia",
  },
  {
    id: "salario_minimo",
    name: "Salario minimo",
    labelLeft: "Aumentar mucho",
    labelRight: "El mercado decide",
    emoji: "\u{1F4CA}",
    category: "economia",
  },
  {
    id: "matrimonio_igualitario",
    name: "Matrimonio igualitario",
    labelLeft: "Oponerse",
    labelRight: "Apoyar",
    emoji: "\u{1F3F3}\u{FE0F}",
    category: "social",
  },
  {
    id: "aborto",
    name: "Aborto",
    labelLeft: "Mantener prohibido",
    labelRight: "Despenalizar",
    emoji: "\u{2695}\u{FE0F}",
    category: "social",
  },
  {
    id: "inmigracion",
    name: "Inmigracion",
    labelLeft: "Restriccion total",
    labelRight: "Puertas abiertas",
    emoji: "\u{1F30D}",
    category: "social",
  },
  {
    id: "mineria_ambiente",
    name: "Mineria vs Ambiente",
    labelLeft: "Priorizar mineria",
    labelRight: "Proteger ambiente",
    emoji: "\u{1F332}",
    category: "ambiente",
  },
  {
    id: "energia",
    name: "Energia",
    labelLeft: "Fosiles",
    labelRight: "Renovables",
    emoji: "\u{26A1}",
    category: "ambiente",
  },
  {
    id: "seguridad",
    name: "Seguridad",
    labelLeft: "Derechos civiles",
    labelRight: "Mano dura",
    emoji: "\u{1F6E1}\u{FE0F}",
    category: "seguridad",
  },
  {
    id: "pena_muerte",
    name: "Pena de muerte",
    labelLeft: "En contra",
    labelRight: "A favor",
    emoji: "\u{2696}\u{FE0F}",
    category: "seguridad",
  },
  {
    id: "ffaa_calles",
    name: "Fuerzas Armadas en calles",
    labelLeft: "No",
    labelRight: "Si",
    emoji: "\u{1F396}\u{FE0F}",
    category: "seguridad",
  },
  {
    id: "nueva_constitucion",
    name: "Nueva Constitucion",
    labelLeft: "Mantenerla",
    labelRight: "Cambiarla",
    emoji: "\u{1F4DC}",
    category: "institucional",
  },
  {
    id: "descentralizacion",
    name: "Descentralizacion",
    labelLeft: "Centralizar",
    labelRight: "Mas autonomia regional",
    emoji: "\u{1F3D7}\u{FE0F}",
    category: "institucional",
  },
  {
    id: "corrupcion",
    name: "Corrupcion",
    labelLeft: "Rehabilitacion",
    labelRight: "Pena de muerte a corruptos",
    emoji: "\u{1F6A8}",
    category: "institucional",
  },
];

// ─── Candidate Data ──────────────────────────────────────────────────────────
// Positions mapped to the 15 issues on a 0-100 scale
// Derived from the existing 5-dimension positions (economic, social, environment, security, institutional)

interface CandidateData {
  slug: string;
  name: string;
  party: string;
  initials: string;
  color: string;
  positions: Record<string, number>;
}

const CANDIDATES: CandidateData[] = [
  {
    slug: "keiko-fujimori",
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    initials: "KF",
    color: "#F97316",
    positions: {
      economia: 78,
      impuestos: 75,
      programas_sociales: 65,
      salario_minimo: 70,
      matrimonio_igualitario: 15,
      aborto: 10,
      inmigracion: 25,
      mineria_ambiente: 30,
      energia: 35,
      seguridad: 90,
      pena_muerte: 80,
      ffaa_calles: 85,
      nueva_constitucion: 10,
      descentralizacion: 35,
      corrupcion: 70,
    },
  },
  {
    slug: "antauro-humala",
    name: "Antauro Humala",
    party: "Frente Patriotico",
    initials: "AH",
    color: "#DC2626",
    positions: {
      economia: 10,
      impuestos: 8,
      programas_sociales: 20,
      salario_minimo: 15,
      matrimonio_igualitario: 5,
      aborto: 5,
      inmigracion: 5,
      mineria_ambiente: 40,
      energia: 30,
      seguridad: 95,
      pena_muerte: 95,
      ffaa_calles: 95,
      nueva_constitucion: 90,
      descentralizacion: 80,
      corrupcion: 98,
    },
  },
  {
    slug: "cesar-acuna",
    name: "Cesar Acuna",
    party: "Alianza para el Progreso",
    initials: "CA",
    color: "#3B82F6",
    positions: {
      economia: 62,
      impuestos: 55,
      programas_sociales: 45,
      salario_minimo: 50,
      matrimonio_igualitario: 25,
      aborto: 20,
      inmigracion: 30,
      mineria_ambiente: 30,
      energia: 35,
      seguridad: 60,
      pena_muerte: 50,
      ffaa_calles: 55,
      nueva_constitucion: 20,
      descentralizacion: 50,
      corrupcion: 55,
    },
  },
  {
    slug: "daniel-urresti",
    name: "Daniel Urresti",
    party: "Podemos Peru",
    initials: "DU",
    color: "#7C3AED",
    positions: {
      economia: 55,
      impuestos: 50,
      programas_sociales: 40,
      salario_minimo: 48,
      matrimonio_igualitario: 15,
      aborto: 12,
      inmigracion: 20,
      mineria_ambiente: 28,
      energia: 30,
      seguridad: 92,
      pena_muerte: 85,
      ffaa_calles: 90,
      nueva_constitucion: 15,
      descentralizacion: 40,
      corrupcion: 80,
    },
  },
  {
    slug: "veronika-mendoza",
    name: "Veronika Mendoza",
    party: "Juntos por el Peru",
    initials: "VM",
    color: "#EC4899",
    positions: {
      economia: 15,
      impuestos: 12,
      programas_sociales: 10,
      salario_minimo: 12,
      matrimonio_igualitario: 90,
      aborto: 88,
      inmigracion: 85,
      mineria_ambiente: 90,
      energia: 88,
      seguridad: 15,
      pena_muerte: 8,
      ffaa_calles: 8,
      nueva_constitucion: 92,
      descentralizacion: 85,
      corrupcion: 30,
    },
  },
  {
    slug: "hernando-de-soto",
    name: "Hernando de Soto",
    party: "Avanza Pais",
    initials: "HS",
    color: "#14B8A6",
    positions: {
      economia: 90,
      impuestos: 85,
      programas_sociales: 72,
      salario_minimo: 82,
      matrimonio_igualitario: 55,
      aborto: 45,
      inmigracion: 60,
      mineria_ambiente: 40,
      energia: 50,
      seguridad: 45,
      pena_muerte: 30,
      ffaa_calles: 35,
      nueva_constitucion: 30,
      descentralizacion: 65,
      corrupcion: 50,
    },
  },
  {
    slug: "julio-guzman",
    name: "Julio Guzman",
    party: "Partido Morado",
    initials: "JG",
    color: "#8B5CF6",
    positions: {
      economia: 65,
      impuestos: 55,
      programas_sociales: 40,
      salario_minimo: 50,
      matrimonio_igualitario: 72,
      aborto: 65,
      inmigracion: 70,
      mineria_ambiente: 68,
      energia: 72,
      seguridad: 35,
      pena_muerte: 20,
      ffaa_calles: 22,
      nueva_constitucion: 55,
      descentralizacion: 75,
      corrupcion: 40,
    },
  },
  {
    slug: "george-forsyth",
    name: "George Forsyth",
    party: "Somos Peru",
    initials: "GF",
    color: "#06B6D4",
    positions: {
      economia: 60,
      impuestos: 55,
      programas_sociales: 48,
      salario_minimo: 50,
      matrimonio_igualitario: 35,
      aborto: 30,
      inmigracion: 35,
      mineria_ambiente: 42,
      energia: 45,
      seguridad: 72,
      pena_muerte: 60,
      ffaa_calles: 65,
      nueva_constitucion: 30,
      descentralizacion: 55,
      corrupcion: 65,
    },
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────
type Phase = "build" | "results" | "share";

interface CandidateResult {
  candidate: CandidateData;
  compatibility: number;
  agreements: { issue: PolicyIssue; diff: number }[];
  disagreements: { issue: PolicyIssue; diff: number }[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function calculateCompatibility(
  userPositions: Record<string, number>,
  candidatePositions: Record<string, number>
): number {
  let totalDiff = 0;
  let count = 0;
  for (const issue of POLICY_ISSUES) {
    const userVal = userPositions[issue.id];
    const candidateVal = candidatePositions[issue.id];
    if (userVal !== undefined && candidateVal !== undefined) {
      totalDiff += Math.abs(userVal - candidateVal);
      count++;
    }
  }
  if (count === 0) return 0;
  const avgDiff = totalDiff / count;
  return Math.round(Math.max(0, 100 - avgDiff));
}

function getCategoryColor(category: PolicyIssue["category"]): string {
  const colors: Record<string, string> = {
    economia: "#D4A017",
    social: "#EC4899",
    seguridad: "#D91023",
    institucional: "#7C3AED",
    ambiente: "#10B981",
  };
  return colors[category] || "#6B7280";
}

function getCategoryLabel(category: PolicyIssue["category"]): string {
  const labels: Record<string, string> = {
    economia: "Economia",
    social: "Social",
    seguridad: "Seguridad",
    institucional: "Institucional",
    ambiente: "Ambiente",
  };
  return labels[category] || category;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PresidenteIdealPage() {
  const [phase, setPhase] = useState<Phase>("build");
  const [positions, setPositions] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const issue of POLICY_ISSUES) {
      initial[issue.id] = 50;
    }
    return initial;
  });
  const [currentIssue, setCurrentIssue] = useState(0);
  const [touchedIssues, setTouchedIssues] = useState<Set<string>>(new Set());

  const handleSliderChange = useCallback(
    (issueId: string, value: number) => {
      setPositions((prev) => ({ ...prev, [issueId]: value }));
      setTouchedIssues((prev) => {
        const next = new Set(prev);
        next.add(issueId);
        return next;
      });
    },
    []
  );

  const results = useMemo<CandidateResult[]>(() => {
    return CANDIDATES.map((candidate) => {
      const compatibility = calculateCompatibility(
        positions,
        candidate.positions
      );

      const issueDiffs = POLICY_ISSUES.map((issue) => ({
        issue,
        diff: Math.abs(
          (positions[issue.id] ?? 50) - (candidate.positions[issue.id] ?? 50)
        ),
      }));

      const sorted = [...issueDiffs].sort((a, b) => a.diff - b.diff);
      const agreements = sorted.slice(0, 3);
      const disagreements = [...issueDiffs]
        .sort((a, b) => b.diff - a.diff)
        .slice(0, 3);

      return { candidate, compatibility, agreements, disagreements };
    }).sort((a, b) => b.compatibility - a.compatibility);
  }, [positions]);

  if (phase === "build") {
    return (
      <BuildPhase
        positions={positions}
        currentIssue={currentIssue}
        touchedIssues={touchedIssues}
        onSliderChange={handleSliderChange}
        onCurrentIssueChange={setCurrentIssue}
        onComplete={() => setPhase("results")}
      />
    );
  }

  if (phase === "results") {
    return (
      <ResultsPhase
        positions={positions}
        results={results}
        onShare={() => setPhase("share")}
        onBack={() => setPhase("build")}
      />
    );
  }

  return (
    <SharePhase
      results={results}
      onBack={() => setPhase("results")}
    />
  );
}

// ─── Phase 1: Build ──────────────────────────────────────────────────────────
function BuildPhase({
  positions,
  currentIssue,
  touchedIssues,
  onSliderChange,
  onCurrentIssueChange,
  onComplete,
}: {
  positions: Record<string, number>;
  currentIssue: number;
  touchedIssues: Set<string>;
  onSliderChange: (id: string, value: number) => void;
  onCurrentIssueChange: (index: number) => void;
  onComplete: () => void;
}) {
  const issue = POLICY_ISSUES[currentIssue];
  const progress = touchedIssues.size;
  const allTouched = progress >= POLICY_ISSUES.length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white">
      {/* Header band */}
      <div className="bg-gradient-to-r from-[#D91023] via-[#D91023] to-[#D4A017]">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            Construye tu Presidente Ideal
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Elige tu posicion en 15 temas clave y descubre que candidato se
            parece mas a tu ideal.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Progreso: {progress}/{POLICY_ISSUES.length} temas ajustados
            </span>
            <span className="text-sm font-bold text-[#D91023]">
              {Math.round((progress / POLICY_ISSUES.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(progress / POLICY_ISSUES.length) * 100}%`,
                background: "linear-gradient(90deg, #D91023, #D4A017)",
              }}
            />
          </div>
        </div>

        {/* Issue navigation dots */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {POLICY_ISSUES.map((iss, idx) => {
            const isCurrent = idx === currentIssue;
            const isTouched = touchedIssues.has(iss.id);
            return (
              <button
                key={iss.id}
                onClick={() => onCurrentIssueChange(idx)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-200 border-2 ${
                  isCurrent
                    ? "border-[#D91023] bg-[#D91023] text-white scale-110 shadow-card"
                    : isTouched
                      ? "border-[#D4A017] bg-[#D4A017]/10 text-[#D4A017]"
                      : "border-gray-300 bg-white text-gray-400 hover:border-gray-400"
                }`}
                title={iss.name}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Current issue card */}
        <div
          className="bg-white rounded-2xl shadow-card p-6 sm:p-8 mb-6 animate-fade-in"
          key={issue.id}
        >
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: getCategoryColor(issue.category) }}
            >
              {getCategoryLabel(issue.category)}
            </span>
            <span className="text-sm text-gray-400">
              Tema {currentIssue + 1} de {POLICY_ISSUES.length}
            </span>
          </div>

          {/* Issue name */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">
            <span className="mr-2">{issue.emoji}</span>
            {issue.name}
          </h2>

          {/* Slider */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="range"
                min={0}
                max={100}
                value={positions[issue.id]}
                onChange={(e) =>
                  onSliderChange(issue.id, parseInt(e.target.value, 10))
                }
                className="slider-peru w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, #D91023 0%, #D4A017 50%, #10B981 100%)`,
                }}
              />
            </div>

            {/* Value indicator */}
            <div className="flex justify-center mt-3">
              <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-4 py-1.5 text-sm font-bold text-gray-800">
                {positions[issue.id]}
              </span>
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-1 bg-red-50 rounded-lg px-3 py-2">
                <span className="text-xs sm:text-sm font-semibold text-[#D91023]">
                  0 - {issue.labelLeft}
                </span>
              </div>
            </div>
            <div className="flex-1 text-right">
              <div className="inline-flex items-center gap-1 bg-emerald-50 rounded-lg px-3 py-2">
                <span className="text-xs sm:text-sm font-semibold text-emerald-700">
                  100 - {issue.labelRight}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() =>
              onCurrentIssueChange(Math.max(0, currentIssue - 1))
            }
            disabled={currentIssue === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Anterior
          </button>

          {currentIssue < POLICY_ISSUES.length - 1 ? (
            <button
              onClick={() =>
                onCurrentIssueChange(
                  Math.min(POLICY_ISSUES.length - 1, currentIssue + 1)
                )
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D91023] text-white font-semibold hover:bg-[#C40D1F] transition-all shadow-subtle"
            >
              Siguiente
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white transition-all shadow-card hover:shadow-hover"
              style={{
                background: "linear-gradient(135deg, #D91023, #D4A017)",
              }}
            >
              Ver Resultados
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Quick complete button when not all touched */}
        {!allTouched && currentIssue === POLICY_ISSUES.length - 1 && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Puedes ver resultados en cualquier momento. Ajusta mas temas para
            resultados mas precisos.
          </p>
        )}

        {/* All issues overview (mini list) */}
        <div className="mt-8 bg-white rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-bold text-gray-700 mb-3">
            Vista rapida de tus posiciones
          </h3>
          <div className="space-y-2">
            {POLICY_ISSUES.map((iss, idx) => {
              const val = positions[iss.id];
              const touched = touchedIssues.has(iss.id);
              return (
                <button
                  key={iss.id}
                  onClick={() => onCurrentIssueChange(idx)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all hover:bg-gray-50 ${
                    idx === currentIssue ? "bg-red-50 ring-1 ring-[#D91023]/20" : ""
                  }`}
                >
                  <span className="text-xs font-bold text-gray-400 w-5">
                    {idx + 1}
                  </span>
                  <span
                    className={`text-sm font-medium flex-1 ${touched ? "text-gray-800" : "text-gray-400"}`}
                  >
                    {iss.emoji} {iss.name}
                  </span>
                  <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${val}%`,
                        background: touched
                          ? "linear-gradient(90deg, #D91023, #D4A017)"
                          : "#D1D5DB",
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold w-8 text-right ${touched ? "text-gray-700" : "text-gray-300"}`}
                  >
                    {val}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slider custom styles */}
        <style jsx>{`
          .slider-peru {
            -webkit-appearance: none;
            appearance: none;
            outline: none;
          }
          .slider-peru::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: white;
            border: 3px solid #D91023;
            box-shadow: 0 2px 8px rgba(217, 16, 35, 0.3);
            cursor: pointer;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          }
          .slider-peru::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(217, 16, 35, 0.4);
          }
          .slider-peru::-webkit-slider-thumb:active {
            transform: scale(1.2);
          }
          .slider-peru::-moz-range-thumb {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: white;
            border: 3px solid #D91023;
            box-shadow: 0 2px 8px rgba(217, 16, 35, 0.3);
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
}

// ─── Phase 2: Results ────────────────────────────────────────────────────────
function ResultsPhase({
  positions,
  results,
  onShare,
  onBack,
}: {
  positions: Record<string, number>;
  results: CandidateResult[];
  onShare: () => void;
  onBack: () => void;
}) {
  const top3 = results.slice(0, 3);
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(
    null
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D91023] via-[#D91023] to-[#D4A017]">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Ajustar posiciones
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            Tu Presidente Ideal
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Asi se comparan los candidatos reales con tu perfil ideal.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Your ideal profile card */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-8 animate-fade-in">
          <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D91023] to-[#D4A017] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            Tu Perfil Ideal
          </h2>

          {/* Bar chart of positions */}
          <div className="space-y-3">
            {POLICY_ISSUES.map((issue) => {
              const val = positions[issue.id];
              return (
                <div key={issue.id} className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">{issue.emoji}</span>
                    <span className="text-xs font-semibold text-gray-700 flex-1">
                      {issue.name}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      {val}
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${val}%`,
                        background:
                          "linear-gradient(90deg, #D91023, #D4A017, #10B981)",
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[10px] text-gray-400">
                      {issue.labelLeft}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {issue.labelRight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 3 podium */}
        <h2 className="text-lg font-extrabold text-gray-900 mb-4">
          Top 3 Candidatos Mas Compatibles
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {top3.map((result, idx) => (
            <div
              key={result.candidate.slug}
              className={`bg-white rounded-2xl shadow-card p-5 text-center relative overflow-hidden animate-slide-up ${
                idx === 0 ? "ring-2 ring-[#D4A017] sm:scale-105" : ""
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Rank badge */}
              <div
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold text-white ${
                  idx === 0
                    ? "bg-[#D4A017]"
                    : idx === 1
                      ? "bg-gray-400"
                      : "bg-amber-700"
                }`}
              >
                {idx + 1}
              </div>

              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-extrabold"
                style={{ backgroundColor: result.candidate.color }}
              >
                {result.candidate.initials}
              </div>

              <h3 className="font-bold text-gray-900 text-sm">
                {result.candidate.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {result.candidate.party}
              </p>

              {/* Compatibility score */}
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg width={80} height={80} className="transform -rotate-90">
                  <circle
                    cx={40}
                    cy={40}
                    r={34}
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth={5}
                  />
                  <circle
                    cx={40}
                    cy={40}
                    r={34}
                    fill="none"
                    stroke={
                      result.compatibility >= 70
                        ? "#10B981"
                        : result.compatibility >= 50
                          ? "#D4A017"
                          : "#D91023"
                    }
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeDasharray={213.6}
                    strokeDashoffset={
                      213.6 - (result.compatibility / 100) * 213.6
                    }
                    style={{
                      transition: "stroke-dashoffset 1.5s ease-out",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-extrabold text-gray-900">
                    {result.compatibility}%
                  </span>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-500">
                Compatibilidad
              </p>
            </div>
          ))}
        </div>

        {/* All candidates ranking */}
        <h2 className="text-lg font-extrabold text-gray-900 mb-4">
          Ranking Completo
        </h2>
        <div className="space-y-3 mb-8">
          {results.map((result, idx) => {
            const isExpanded = expandedCandidate === result.candidate.slug;
            return (
              <div
                key={result.candidate.slug}
                className="bg-white rounded-xl shadow-subtle overflow-hidden animate-fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Main row */}
                <button
                  onClick={() =>
                    setExpandedCandidate(
                      isExpanded ? null : result.candidate.slug
                    )
                  }
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-extrabold text-gray-400 w-6 text-center">
                    {idx + 1}
                  </span>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: result.candidate.color }}
                  >
                    {result.candidate.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm truncate">
                      {result.candidate.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {result.candidate.party}
                    </p>
                  </div>

                  {/* Compatibility bar */}
                  <div className="w-20 sm:w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${result.compatibility}%`,
                            backgroundColor:
                              result.compatibility >= 70
                                ? "#10B981"
                                : result.compatibility >= 50
                                  ? "#D4A017"
                                  : "#D91023",
                          }}
                        />
                      </div>
                      <span className="text-sm font-extrabold text-gray-700 w-10 text-right">
                        {result.compatibility}%
                      </span>
                    </div>
                  </div>

                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 animate-fade-in">
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      {/* Agreements */}
                      <div>
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                          Mayor coincidencia
                        </h4>
                        <div className="space-y-2">
                          {result.agreements.map(({ issue, diff }) => (
                            <div
                              key={issue.id}
                              className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2"
                            >
                              <span className="text-sm">{issue.emoji}</span>
                              <span className="text-xs font-medium text-emerald-800 flex-1">
                                {issue.name}
                              </span>
                              <span className="text-xs font-bold text-emerald-600">
                                {diff}pts diff
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Disagreements */}
                      <div>
                        <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                          Mayor diferencia
                        </h4>
                        <div className="space-y-2">
                          {result.disagreements.map(({ issue, diff }) => (
                            <div
                              key={issue.id}
                              className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2"
                            >
                              <span className="text-sm">{issue.emoji}</span>
                              <span className="text-xs font-medium text-red-800 flex-1">
                                {issue.name}
                              </span>
                              <span className="text-xs font-bold text-red-600">
                                {diff}pts diff
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Per-issue comparison */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Comparacion tema por tema
                      </h4>
                      <div className="space-y-2">
                        {POLICY_ISSUES.map((issue) => {
                          const userVal = positions[issue.id];
                          const candVal =
                            result.candidate.positions[issue.id];
                          const diff = Math.abs(userVal - candVal);
                          return (
                            <div key={issue.id} className="flex items-center gap-2">
                              <span className="text-xs w-5">{issue.emoji}</span>
                              <span className="text-[11px] font-medium text-gray-600 w-28 truncate">
                                {issue.name}
                              </span>
                              <div className="flex-1 relative h-4">
                                {/* Track */}
                                <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                                  <div className="w-full bg-gray-100 rounded-full h-1.5" />
                                </div>
                                {/* User marker */}
                                <div
                                  className="absolute top-0 w-4 h-4 rounded-full bg-[#D91023] border-2 border-white shadow-sm z-10"
                                  style={{ left: `calc(${userVal}% - 8px)` }}
                                  title={`Tu: ${userVal}`}
                                />
                                {/* Candidate marker */}
                                <div
                                  className="absolute top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10"
                                  style={{
                                    left: `calc(${candVal}% - 8px)`,
                                    backgroundColor: result.candidate.color,
                                  }}
                                  title={`${result.candidate.name}: ${candVal}`}
                                />
                              </div>
                              <span
                                className={`text-[11px] font-bold w-8 text-right ${
                                  diff <= 15
                                    ? "text-emerald-600"
                                    : diff <= 35
                                      ? "text-amber-600"
                                      : "text-red-600"
                                }`}
                              >
                                {diff}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D91023]" />
                          Tu posicion
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: result.candidate.color,
                            }}
                          />
                          {result.candidate.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-[#D91023] text-[#D91023] font-semibold hover:bg-red-50 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Ajustar Posiciones
          </button>
          <button
            onClick={onShare}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-bold shadow-card hover:shadow-hover transition-all"
            style={{
              background: "linear-gradient(135deg, #D91023, #D4A017)",
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Compartir Resultados
          </button>
          <Link
            href="/candidatos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
          >
            Ver todos los candidatos
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Phase 3: Share ──────────────────────────────────────────────────────────
function SharePhase({
  results,
  onBack,
}: {
  results: CandidateResult[];
  onBack: () => void;
}) {
  const [shared, setShared] = useState(false);
  const top3 = results.slice(0, 3);

  const shareText = useMemo(() => {
    const parts = top3.map(
      (r) => `${r.compatibility}% ${r.candidate.name}`
    );
    return `Mi presidente ideal seria: ${parts.join(", ")}. Descubre el tuyo en Candidatazo!`;
  }, [top3]);

  const handleShare = async () => {
    const shareData = {
      title: "Mi Presidente Ideal - Candidatazo",
      text: shareText,
      url: typeof window !== "undefined" ? window.location.origin + "/presidente-ideal" : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShared(true);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        setShared(true);
        setTimeout(() => setShared(false), 3000);
      }
    } catch {
      // User cancelled or error
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D91023] via-[#D91023] to-[#D4A017]">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver a resultados
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            Comparte tu Resultado
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Muestra a tus amigos como luce tu presidente ideal.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Share card */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-8 animate-slide-up">
          {/* Card header gradient */}
          <div
            className="px-6 py-4"
            style={{
              background: "linear-gradient(135deg, #D91023, #D4A017)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold text-lg">C</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Candidatazo</p>
                <p className="text-white/70 text-xs">Peru 2026</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-extrabold text-gray-900 mb-1">
              Mi Presidente Ideal
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Basado en mis posiciones en 15 temas clave
            </p>

            {/* Top candidates summary */}
            <div className="space-y-4 mb-6">
              {top3.map((result, idx) => (
                <div
                  key={result.candidate.slug}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${
                      idx === 0
                        ? "ring-2 ring-[#D4A017] ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: result.candidate.color }}
                  >
                    {result.candidate.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm">
                      {result.candidate.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {result.candidate.party}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-extrabold ${
                        result.compatibility >= 70
                          ? "text-emerald-600"
                          : result.compatibility >= 50
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {result.compatibility}%
                    </span>
                    <p className="text-[10px] text-gray-400">compatible</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Blend text */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                {shareText}
              </p>
            </div>

            {/* Share buttons */}
            <div className="space-y-3">
              <button
                onClick={handleShare}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-base transition-all shadow-card hover:shadow-hover"
                style={{
                  background: "linear-gradient(135deg, #D91023, #D4A017)",
                }}
              >
                {shared ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {"share" in navigator ? "Compartido!" : "Copiado al portapapeles!"}
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Compartir
                  </>
                )}
              </button>

              {/* Social share links */}
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.origin + "/presidente-ideal" : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X (Twitter)
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + (typeof window !== "undefined" ? "\n" + window.location.origin + "/presidente-ideal" : ""))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1EBE57] transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#166FE5] transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl shadow-card p-6 text-center animate-slide-up">
          <h3 className="font-bold text-gray-800 mb-2">
            Quieres saber mas sobre los candidatos?
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Haz el DNA Test completo o explora los perfiles detallados de cada
            candidato.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/test"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all shadow-subtle"
              style={{
                background: "linear-gradient(135deg, #D91023, #D4A017)",
              }}
            >
              Hacer el DNA Test
            </Link>
            <Link
              href="/candidatos"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              Ver Candidatos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
