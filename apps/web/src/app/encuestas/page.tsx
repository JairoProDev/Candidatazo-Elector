"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────
   DATOS: Encuestas Elecciones Perú 2026
   Fuentes: IEP, Datum, Ipsos, CPI - Marzo 2026
   ────────────────────────────────────────────────────────────────────── */

interface PollSource {
  name: string;
  weight: number;
  date: string;
}

const POLL_SOURCES: PollSource[] = [
  { name: "IEP", weight: 0.30, date: "8-10 Mar 2026" },
  { name: "Datum", weight: 0.25, date: "5-9 Mar 2026" },
  { name: "Ipsos", weight: 0.25, date: "7-11 Mar 2026" },
  { name: "CPI", weight: 0.20, date: "3-8 Mar 2026" },
];

interface CandidatePoll {
  name: string;
  party: string;
  color: string;
  percentage: number;
  trend: "up" | "down" | "stable";
  trendDelta: number;
  // Monthly data: Jan, Feb, Mar 2026
  timeline: [number, number, number];
  // Per-source data
  sources: Record<string, number>;
}

const CANDIDATES: CandidatePoll[] = [
  {
    name: "Rafael López Aliaga",
    party: "Renovación Popular",
    color: "#7C3AED",
    percentage: 11.7,
    trend: "up",
    trendDelta: 1.8,
    timeline: [8.2, 9.9, 11.7],
    sources: { IEP: 12.1, Datum: 11.4, Ipsos: 11.8, CPI: 11.2 },
  },
  {
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    color: "#FF6B00",
    percentage: 9.4,
    trend: "down",
    trendDelta: -0.8,
    timeline: [10.5, 10.2, 9.4],
    sources: { IEP: 9.8, Datum: 9.1, Ipsos: 9.6, CPI: 9.0 },
  },
  {
    name: "Alfonso López Chau",
    party: "Ahora Nación",
    color: "#2563EB",
    percentage: 6.8,
    trend: "up",
    trendDelta: 2.1,
    timeline: [3.2, 4.7, 6.8],
    sources: { IEP: 7.2, Datum: 6.5, Ipsos: 6.9, CPI: 6.4 },
  },
  {
    name: "Wolfgang Grozo",
    party: "Integridad Democrática",
    color: "#059669",
    percentage: 4.3,
    trend: "up",
    trendDelta: 3.9,
    timeline: [0.4, 1.8, 4.3],
    sources: { IEP: 4.5, Datum: 4.1, Ipsos: 4.4, CPI: 4.0 },
  },
  {
    name: "Carlos Álvarez",
    party: "País para Todos",
    color: "#D97706",
    percentage: 3.9,
    trend: "up",
    trendDelta: 1.2,
    timeline: [1.8, 2.7, 3.9],
    sources: { IEP: 4.2, Datum: 3.6, Ipsos: 3.8, CPI: 3.9 },
  },
  {
    name: "Roberto Sánchez",
    party: "Juntos por el Perú",
    color: "#DC2626",
    percentage: 3.7,
    trend: "stable",
    trendDelta: 0.2,
    timeline: [3.2, 3.5, 3.7],
    sources: { IEP: 3.9, Datum: 3.5, Ipsos: 3.7, CPI: 3.6 },
  },
  {
    name: "César Acuña",
    party: "APP",
    color: "#7C3AED",
    percentage: 2.7,
    trend: "down",
    trendDelta: -1.1,
    timeline: [4.5, 3.8, 2.7],
    sources: { IEP: 2.9, Datum: 2.5, Ipsos: 2.8, CPI: 2.6 },
  },
  {
    name: "George Forsyth",
    party: "Somos Perú",
    color: "#059669",
    percentage: 1.8,
    trend: "down",
    trendDelta: -0.5,
    timeline: [2.8, 2.3, 1.8],
    sources: { IEP: 1.9, Datum: 1.7, Ipsos: 1.8, CPI: 1.7 },
  },
  {
    name: "Antauro Humala",
    party: "Frente Patriótico",
    color: "#8B0000",
    percentage: 1.5,
    trend: "down",
    trendDelta: -1.3,
    timeline: [3.8, 2.8, 1.5],
    sources: { IEP: 1.6, Datum: 1.4, Ipsos: 1.5, CPI: 1.4 },
  },
  {
    name: "José Williams",
    party: "Avanza País",
    color: "#1E40AF",
    percentage: 1.2,
    trend: "stable",
    trendDelta: 0.1,
    timeline: [1.0, 1.1, 1.2],
    sources: { IEP: 1.3, Datum: 1.1, Ipsos: 1.2, CPI: 1.1 },
  },
];

interface RegionalData {
  region: string;
  leader: string;
  leaderColor: string;
  percentage: number;
  secondPlace: string;
  secondPercentage: number;
}

const REGIONAL_DATA: RegionalData[] = [
  { region: "Lima/Callao", leader: "Rafael López Aliaga", leaderColor: "#7C3AED", percentage: 15.2, secondPlace: "Keiko Fujimori", secondPercentage: 11.8 },
  { region: "Norte", leader: "César Acuña", leaderColor: "#7C3AED", percentage: 8.4, secondPlace: "Keiko Fujimori", secondPercentage: 7.1 },
  { region: "Sur", leader: "Alfonso López Chau", leaderColor: "#2563EB", percentage: 12.3, secondPlace: "Wolfgang Grozo", secondPercentage: 8.7 },
  { region: "Centro", leader: "Wolfgang Grozo", leaderColor: "#059669", percentage: 9.1, secondPlace: "Alfonso López Chau", secondPercentage: 6.8 },
  { region: "Oriente", leader: "Roberto Sánchez", leaderColor: "#DC2626", percentage: 7.6, secondPlace: "Carlos Álvarez", secondPercentage: 5.2 },
];

interface Insight {
  id: string;
  icon: string;
  title: string;
  text: string;
  tag: string;
  tagColor: string;
}

const KEY_INSIGHTS: Insight[] = [
  {
    id: "indecisos",
    icon: "?",
    title: "Los indecisos mandan",
    text: "35-42% de votantes están INDECISOS - más que cualquier candidato. Quien logre capturar este voto definirá la elección.",
    tag: "CRUCIAL",
    tagColor: "#DC2626",
  },
  {
    id: "voto-oculto",
    icon: "!",
    title: "El voto oculto de Carlos Álvarez",
    text: "3.9% en encuestas pero 8.9% en simulacro de cédula. La diferencia sugiere un electorado vergonzante que no declara su voto.",
    tag: "REVELADOR",
    tagColor: "#D97706",
  },
  {
    id: "grozo-surge",
    icon: "↑",
    title: "El fenómeno Grozo",
    text: "Wolfgang Grozo: de 0.4% en diciembre a 4.3% en marzo. Crecimiento explosivo de 975% en 3 meses. El outsider que nadie veía venir.",
    tag: "TENDENCIA",
    tagColor: "#059669",
  },
  {
    id: "segunda-vuelta",
    icon: "2",
    title: "Segunda vuelta casi segura",
    text: "Ningún candidato supera el 15%. Con este nivel de fragmentación, la segunda vuelta es matemáticamente casi inevitable.",
    tag: "ANÁLISIS",
    tagColor: "#2563EB",
  },
];

const MONTHS = ["Ene 2026", "Feb 2026", "Mar 2026"];

/* ──────────────────────────────────────────────────────────────────────
   COMPONENTES
   ────────────────────────────────────────────────────────────────────── */

function AnimatedCounter({ target, suffix = "%" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1200;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Number((eased * target).toFixed(1)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function TrendArrow({ trend, delta }: { trend: "up" | "down" | "stable"; delta: number }) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-0.5 text-green-400 text-xs font-semibold">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        +{Math.abs(delta).toFixed(1)}
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center gap-0.5 text-red-400 text-xs font-semibold">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {delta.toFixed(1)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-gray-400 text-xs font-semibold">
      <span className="w-3 text-center">=</span>
      {delta > 0 ? "+" : ""}{delta.toFixed(1)}
    </span>
  );
}

function CandidateRankingBar({ candidate, rank, maxPercentage }: { candidate: CandidatePoll; rank: number; maxPercentage: number }) {
  const barWidth = (candidate.percentage / maxPercentage) * 100;

  return (
    <div className="flex items-center gap-3 group">
      <span className="text-gray-500 text-sm font-mono w-5 text-right">{rank}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-semibold">{candidate.name}</span>
            <span className="text-gray-500 text-xs hidden sm:inline">({candidate.party})</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendArrow trend={candidate.trend} delta={candidate.trendDelta} />
            <span className="text-white font-bold text-sm">{candidate.percentage}%</span>
          </div>
        </div>
        <div className="w-full h-6 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out relative group-hover:brightness-125"
            style={{
              width: `${barWidth}%`,
              backgroundColor: candidate.color,
              minWidth: "2rem",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineChart({ candidates }: { candidates: CandidatePoll[] }) {
  // Simple timeline using positioned dots connected by lines
  const top6 = candidates.slice(0, 6);
  const maxVal = Math.max(...top6.flatMap((c) => c.timeline));
  const chartHeight = 200;
  const padding = 20;

  const getY = (val: number) => chartHeight - padding - ((val / maxVal) * (chartHeight - 2 * padding));
  const getX = (monthIdx: number) => padding + (monthIdx / 2) * (100 - 2 * (padding / 3));

  return (
    <div className="relative">
      {/* Month labels */}
      <div className="flex justify-between mb-2 px-4">
        {MONTHS.map((m) => (
          <span key={m} className="text-xs text-gray-500">{m}</span>
        ))}
      </div>

      {/* Chart area */}
      <div className="relative bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden" style={{ height: chartHeight }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 right-0 border-t border-white/5"
            style={{ top: `${pct}%` }}
          />
        ))}

        {/* SVG lines and dots */}
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 100 ${chartHeight}`} preserveAspectRatio="none">
          {top6.map((c) => {
            const points = c.timeline.map((val, i) => `${getX(i)},${getY(val)}`).join(" ");
            return (
              <g key={c.name}>
                <polyline
                  points={points}
                  fill="none"
                  stroke={c.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
                {c.timeline.map((val, i) => (
                  <circle
                    key={i}
                    cx={getX(i)}
                    cy={getY(val)}
                    r="2.5"
                    fill={c.color}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="0.5"
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 px-1">
        {top6.map((c) => (
          <div key={c.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="text-xs text-gray-400">{c.name.split(" ").slice(-1)[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShareInsightButton({ insight }: { insight: Insight }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = `${insight.title}: ${insight.text}\n\nVer más en Candidatazo - Encuestas Perú 2026`;
    if (navigator.share) {
      navigator.share({ title: `Candidatazo - ${insight.title}`, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? "Copiado" : "Compartir"}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   PAGINA PRINCIPAL
   ────────────────────────────────────────────────────────────────────── */

export default function EncuestasPage() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);

  const maxPercentage = Math.max(...CANDIDATES.map((c) => c.percentage)) + 2;
  const totalDeclared = CANDIDATES.reduce((sum, c) => sum + c.percentage, 0);
  const undecided = 100 - totalDeclared;

  const displayCandidates = selectedSource
    ? CANDIDATES.map((c) => ({
        ...c,
        percentage: c.sources[selectedSource] ?? c.percentage,
      })).sort((a, b) => b.percentage - a.percentage)
    : CANDIDATES;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">&#128202;</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              Encuestas en vivo
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            Agregador de encuestas para las Elecciones Presidenciales Perú 2026. Promedio ponderado de IEP, Datum, Ipsos y CPI.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Última actualización: 12 de marzo, 2026 | Margen de error: ±2.1%
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Blackout Warning */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">&#9888;</span>
          <div>
            <h3 className="text-red-400 font-bold text-sm mb-1">Veda electoral de encuestas</h3>
            <p className="text-gray-300 text-sm">
              A partir del <strong className="text-white">5 de abril de 2026</strong>, no se pueden publicar encuestas electorales hasta después de las elecciones del 13 de abril. Esta sección se congelará con los últimos datos disponibles.
            </p>
          </div>
        </div>

        {/* Undecided Banner */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-yellow-400 font-bold text-lg mb-1">
                Indecisos: <AnimatedCounter target={undecided} />
              </h3>
              <p className="text-gray-400 text-sm">Más que cualquier candidato. El voto indeciso definirá esta elección.</p>
            </div>
            <div className="w-full sm:w-64 h-6 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000"
                style={{ width: `${undecided}%` }}
              />
            </div>
          </div>
        </div>

        {/* Source Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Fuente:</span>
          <button
            onClick={() => setSelectedSource(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedSource === null
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Promedio ponderado
          </button>
          {POLL_SOURCES.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelectedSource(s.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedSource === s.name
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {s.name}
              <span className="text-gray-500 ml-1">({(s.weight * 100).toFixed(0)}%)</span>
            </button>
          ))}
        </div>

        {/* Candidate Ranking */}
        <section className="bg-white/[0.03] rounded-2xl p-5 md:p-8 border border-white/10">
          <h2 className="text-white font-bold text-xl mb-6">
            Intención de voto presidencial
            {selectedSource && (
              <span className="text-blue-400 text-sm font-normal ml-2">
                Fuente: {selectedSource}
              </span>
            )}
          </h2>
          <div className="space-y-4">
            {displayCandidates.map((c, i) => (
              <CandidateRankingBar
                key={c.name}
                candidate={c}
                rank={i + 1}
                maxPercentage={maxPercentage}
              />
            ))}
            {/* Others + Undecided */}
            <div className="flex items-center gap-3 opacity-60 pt-2 border-t border-white/5">
              <span className="text-gray-500 text-sm font-mono w-5 text-right">-</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-sm">Otros candidatos / Blanco / Viciado</span>
                  <span className="text-gray-400 font-bold text-sm">{(100 - undecided - totalDeclared + (100 - totalDeclared - undecided)).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-white/[0.03] rounded-2xl p-5 md:p-8 border border-white/10">
          <h2 className="text-white font-bold text-xl mb-2">Tendencia Ene-Mar 2026</h2>
          <p className="text-gray-400 text-sm mb-6">Evolución de intención de voto en los últimos 3 meses (top 6 candidatos)</p>
          <TimelineChart candidates={CANDIDATES} />
        </section>

        {/* Regional Breakdown */}
        <section className="bg-white/[0.03] rounded-2xl p-5 md:p-8 border border-white/10">
          <h2 className="text-white font-bold text-xl mb-6">Liderazgo por región</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONAL_DATA.map((r) => (
              <div
                key={r.region}
                className="rounded-xl p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-sm">{r.region}</h3>
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: r.leaderColor }}
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-xs">{r.leader.split(" ").slice(-2).join(" ")}</span>
                      <span className="text-white font-bold text-xs">{r.percentage}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(r.percentage / 20) * 100}%`, backgroundColor: r.leaderColor }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-xs">{r.secondPlace.split(" ").slice(-2).join(" ")}</span>
                      <span className="text-gray-400 font-bold text-xs">{r.secondPercentage}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gray-500/50 transition-all duration-700"
                        style={{ width: `${(r.secondPercentage / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Insights */}
        <section>
          <h2 className="text-white font-bold text-xl mb-4">Datos clave</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {KEY_INSIGHTS.map((insight) => (
              <div
                key={insight.id}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold text-white"
                      style={{ backgroundColor: insight.tagColor + "30" }}
                    >
                      {insight.icon}
                    </span>
                    <div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: insight.tagColor + "25", color: insight.tagColor }}
                      >
                        {insight.tag}
                      </span>
                    </div>
                  </div>
                  <ShareInsightButton insight={insight} />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{insight.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Source Details */}
        <section className="bg-white/[0.03] rounded-2xl p-5 md:p-8 border border-white/10">
          <h2 className="text-white font-bold text-xl mb-4">Fuentes de encuestas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POLL_SOURCES.map((s) => (
              <div key={s.name} className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                <h3 className="text-white font-bold text-lg">{s.name}</h3>
                <p className="text-gray-400 text-xs mt-1">Peso: {(s.weight * 100).toFixed(0)}%</p>
                <p className="text-gray-500 text-xs mt-1">{s.date}</p>
                <div className="h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-700"
                    style={{ width: `${s.weight * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="w-full p-5 md:p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
          >
            <h2 className="text-white font-bold text-lg">Metodología y margen de error</h2>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${showMethodology ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showMethodology && (
            <div className="px-5 md:px-6 pb-6 border-t border-white/5 pt-4 space-y-3">
              <div className="text-gray-400 text-sm leading-relaxed space-y-3">
                <p>
                  <strong className="text-white">Promedio ponderado:</strong> Calculamos el promedio de encuestas ponderando por
                  tamaño de muestra, metodología y track record histórico de cada encuestadora. IEP y Datum reciben mayor peso
                  por su mayor precisión en elecciones anteriores.
                </p>
                <p>
                  <strong className="text-white">Muestra:</strong> Las encuestas utilizan muestras de entre 1,200 y 2,500 personas
                  a nivel nacional, con muestreo probabilístico polietápico y estratificado.
                </p>
                <p>
                  <strong className="text-white">Margen de error:</strong> ±2.1 puntos porcentuales para el promedio ponderado,
                  con un nivel de confianza del 95%. Encuestas individuales tienen margenes de ±2.8 a ±3.1 pp.
                </p>
                <p>
                  <strong className="text-white">Limitaciones:</strong> Las encuestas miden intención de voto declarada, no voto
                  efectivo. El voto oculto, el efecto de la cédula y la volatilidad del electorado peruano (35-42% de indecisos)
                  hacen que las encuestas tengan una incertidumbre mayor a la que sugiere el margen de error técnico.
                </p>
                <p>
                  <strong className="text-white">Nota legal:</strong> Según la Ley Orgánica de Elecciones (Art. 191), queda
                  prohibida la publicación de encuestas electorales desde 7 días antes de la elección.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/comparador"
            className="block bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 hover:from-purple-500 hover:to-blue-500 transition-all group"
          >
            <h3 className="text-white font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
              Compara candidatos lado a lado
            </h3>
            <p className="text-white/70 text-sm">
              Elige 2 o 3 candidatos y compara sus posiciones, propuestas y trayectoria en detalle.
            </p>
            <span className="inline-block mt-3 text-white font-semibold text-sm">Ir al comparador →</span>
          </Link>
          <Link
            href="/quiz"
            className="block bg-white/[0.06] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.1] transition-all group"
          >
            <h3 className="text-white font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
              ¿Con quién haces más match?
            </h3>
            <p className="text-gray-400 text-sm">
              Responde 10 preguntas y descubre qué candidato se alinea más con tus ideas políticas.
            </p>
            <span className="inline-block mt-3 text-purple-400 font-semibold text-sm">Hacer el quiz →</span>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center pt-4 pb-12">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
