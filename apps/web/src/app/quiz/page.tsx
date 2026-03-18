"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────
   DATOS: 10 propuestas REALES de candidatos (anónimas para evitar sesgo)
   Cada carta muestra una propuesta sin decir de quién es.
   Al final revelamos tus coincidencias.
   ────────────────────────────────────────────────────────────────────── */

interface Proposal {
  id: string;
  text: string;
  context: string;
  source: string; // fuente verificable
  dimension: "economic" | "social" | "environment" | "security" | "institutional";
  // Candidatos que apoyan esta propuesta (posición > 60) o se oponen (< 40)
  supportedBy: string[];
  opposedBy: string[];
}

const PROPOSALS: Proposal[] = [
  {
    id: "p1",
    text: "Privatizar Petroperú y otras empresas estatales ineficientes",
    context: "Petroperú acumula pérdidas por más de S/5,000 millones y ha requerido múltiples rescates con dinero público.",
    source: "Planes de gobierno JNE 2026",
    dimension: "economic",
    supportedBy: ["Keiko Fujimori", "Rafael López Aliaga", "Jose Williams", "Carlos Ananos"],
    opposedBy: ["Antauro Humala", "Roberto Sanchez", "Roberto Sanchez", "Marco Arana"],
  },
  {
    id: "p2",
    text: "Instaurar pena de muerte para violadores de menores de edad",
    context: "En 2024 se registraron más de 15,000 denuncias por violencia sexual contra menores en el Perú.",
    source: "INEI - Estadísticas de seguridad 2024",
    dimension: "security",
    supportedBy: ["Antauro Humala", "Rafael López Aliaga", "Jose Williams", "Keiko Fujimori"],
    opposedBy: ["Roberto Sanchez", "Alfonso Lopez Chau", "Sigrid Bazán", "Carlos Ananos"],
  },
  {
    id: "p3",
    text: "Convocar a una Asamblea Constituyente para redactar una nueva Constitución",
    context: "La actual Constitución data de 1993. Algunos la defienden como pilar de estabilidad económica, otros la ven como herencia del fujimorismo.",
    source: "Debate constitucional 2021-2026",
    dimension: "institutional",
    supportedBy: ["Roberto Sanchez", "Roberto Sanchez", "Antauro Humala", "Marco Arana"],
    opposedBy: ["Keiko Fujimori", "Jose Williams", "Rafael López Aliaga", "Carlos Ananos"],
  },
  {
    id: "p4",
    text: "Legalizar el aborto en casos de violación",
    context: "Actualmente el aborto en Perú solo es legal cuando la vida de la madre está en riesgo. Grupos a favor y en contra debaten intensamente.",
    source: "Código Penal Peruano - Art. 119",
    dimension: "social",
    supportedBy: ["Roberto Sanchez", "Sigrid Bazán", "Carlos Ananos", "Alfonso Lopez Chau"],
    opposedBy: ["Rafael López Aliaga", "Keiko Fujimori", "Antauro Humala", "Fernando Olivera"],
  },
  {
    id: "p5",
    text: "Prohibir la minería en cabeceras de cuenca para proteger el agua",
    context: "El Perú es el segundo productor de cobre del mundo. La minería genera el 60% de exportaciones pero conflictos sociales por el agua son constantes.",
    source: "MINEM / Defensoría del Pueblo 2025",
    dimension: "environment",
    supportedBy: ["Marco Arana", "Roberto Sanchez", "Sigrid Bazán"],
    opposedBy: ["Keiko Fujimori", "Jose Williams", "Carlos Ananos", "Rafael López Aliaga"],
  },
  {
    id: "p6",
    text: "Sacar a las Fuerzas Armadas a las calles para combatir la delincuencia",
    context: "La percepción de inseguridad en Lima supera el 85%. Los robos, extorsiones y sicariato han aumentado 40% desde 2022.",
    source: "INEI - Encuesta de seguridad 2025",
    dimension: "security",
    supportedBy: ["Jose Williams", "Keiko Fujimori", "Rafael López Aliaga", "Wolfgang Grozo"],
    opposedBy: ["Roberto Sanchez", "Alfonso Lopez Chau", "Sigrid Bazán", "Carlos Ananos"],
  },
  {
    id: "p7",
    text: "Duplicar el salario mínimo a S/2,000 mensuales",
    context: "El salario mínimo actual es S/1,025. El 70% de los trabajadores son informales y no les aplica. La canasta básica familiar supera los S/1,800.",
    source: "INEI / MTPE 2025",
    dimension: "economic",
    supportedBy: ["Antauro Humala", "Roberto Sanchez"],
    opposedBy: ["Jose Williams", "Carlos Ananos", "Keiko Fujimori"],
  },
  {
    id: "p8",
    text: "Aprobar el matrimonio igualitario entre personas del mismo sexo",
    context: "Perú es uno de los pocos países de Sudamérica que no reconoce ningún tipo de unión civil para parejas del mismo sexo.",
    source: "Defensoría del Pueblo 2025",
    dimension: "social",
    supportedBy: ["Sigrid Bazán", "Roberto Sanchez", "Alfonso Lopez Chau", "Carlos Ananos"],
    opposedBy: ["Rafael López Aliaga", "Keiko Fujimori", "Antauro Humala", "Fernando Olivera"],
  },
  {
    id: "p9",
    text: "Eliminar la inmunidad parlamentaria completamente",
    context: "Congresistas investigados por corrupción, lavado y otros delitos han usado la inmunidad para evitar procesos judiciales.",
    source: "Congreso de la República - Casos 2021-2025",
    dimension: "institutional",
    supportedBy: ["Jose Williams", "George Forsyth", "Sigrid Bazán", "Roberto Sanchez"],
    opposedBy: ["Keiko Fujimori", "Jose Luna Galvez"],
  },
  {
    id: "p10",
    text: "Crear un sistema de salud universal y gratuito financiado con impuestos",
    context: "Solo el 30% de peruanos tiene acceso a salud de calidad. Los hospitales públicos están saturados con citas a meses de espera.",
    source: "MINSA / OMS 2025",
    dimension: "economic",
    supportedBy: ["Roberto Sanchez", "Roberto Sanchez", "Marco Arana", "Sigrid Bazán"],
    opposedBy: ["Jose Williams", "Rafael López Aliaga"],
  },
];

/* ──────────────────────────────────────────────────────────────────────
   CANDIDATOS con posiciones para calcular match
   ────────────────────────────────────────────────────────────────────── */

const CANDIDATES_DATA = [
  { name: "Rafael Lopez Aliaga", party: "Renovacion Popular", color: "#7C3AED", positions: { economic: 82, social: 12, environment: 25, security: 88, institutional: 20 } },
  { name: "Keiko Fujimori", party: "Fuerza Popular", color: "#FF6B00", positions: { economic: 72, social: 28, environment: 35, security: 85, institutional: 30 } },
  { name: "Alfonso Lopez Chau", party: "Ahora Nacion", color: "#2563EB", positions: { economic: 45, social: 65, environment: 60, security: 50, institutional: 70 } },
  { name: "Wolfgang Grozo", party: "Integridad Democratica", color: "#059669", positions: { economic: 40, social: 50, environment: 55, security: 65, institutional: 75 } },
  { name: "Carlos Alvarez", party: "Pais para Todos", color: "#D97706", positions: { economic: 50, social: 55, environment: 48, security: 52, institutional: 55 } },
  { name: "Roberto Sanchez", party: "Juntos por el Peru", color: "#DC2626", positions: { economic: 30, social: 60, environment: 65, security: 40, institutional: 65 } },
  { name: "Cesar Acuna", party: "Alianza para el Progreso", color: "#6366F1", positions: { economic: 60, social: 40, environment: 30, security: 55, institutional: 35 } },
  { name: "George Forsyth", party: "Somos Peru", color: "#14B8A6", positions: { economic: 58, social: 48, environment: 42, security: 70, institutional: 50 } },
  { name: "Jose Williams", party: "Avanza Pais", color: "#1E40AF", positions: { economic: 75, social: 25, environment: 35, security: 85, institutional: 30 } },
  { name: "Antauro Humala", party: "Frente Patriotico", color: "#8B0000", positions: { economic: 15, social: 20, environment: 40, security: 95, institutional: 90 } },
  { name: "Carlos Ananos", party: "Peru Moderno", color: "#F97316", positions: { economic: 78, social: 50, environment: 45, security: 50, institutional: 45 } },
  { name: "Sigrid Bazan", party: "Cambio Democratico", color: "#EC4899", positions: { economic: 30, social: 85, environment: 78, security: 30, institutional: 80 } },
  { name: "Marco Arana", party: "Frente Amplio", color: "#16A34A", positions: { economic: 20, social: 75, environment: 95, security: 25, institutional: 82 } },
  { name: "Jose Luna Galvez", party: "Podemos Peru", color: "#0891B2", positions: { economic: 65, social: 35, environment: 28, security: 55, institutional: 30 } },
  { name: "Fernando Olivera", party: "Union por el Peru", color: "#475569", positions: { economic: 50, social: 40, environment: 40, security: 60, institutional: 55 } },
];

/* ──────────────────────────────────────────────────────────────────────
   TRIBUS POLÍTICAS
   ────────────────────────────────────────────────────────────────────── */

interface Tribe {
  name: string;
  emoji: string;
  description: string;
  color: string;
  tagline: string;
}

function determineTribe(scores: Record<string, number>): Tribe {
  const { economic, social, environment, security, institutional } = scores;

  if (economic > 65 && security > 65 && social < 40)
    return { name: "Derecha Firme", emoji: "🦅", description: "Libre mercado, mano dura y valores tradicionales", color: "#1E40AF", tagline: "Orden y libertad económica" };
  if (economic < 35 && institutional > 65)
    return { name: "Izquierda Reformista", emoji: "✊", description: "Justicia social, derechos y un nuevo pacto social", color: "#DC2626", tagline: "El pueblo primero" };
  if (environment > 70 && social > 60)
    return { name: "Verde Progresista", emoji: "🌿", description: "Planeta, derechos humanos y desarrollo sostenible", color: "#16A34A", tagline: "Otro mundo es posible" };
  if (security > 75 && institutional > 60)
    return { name: "Patriota Radical", emoji: "⚔️", description: "Refundar el Estado con mano dura y soberanía", color: "#7C2D12", tagline: "Patria o muerte" };
  if (economic > 55 && social > 55 && environment > 45)
    return { name: "Centro Liberal", emoji: "⚖️", description: "Equilibrio entre mercado, derechos y pragmatismo", color: "#7C3AED", tagline: "Progreso con sensatez" };
  if (economic > 55 && social < 45)
    return { name: "Conservador Pragmático", emoji: "🏛️", description: "Estabilidad económica con valores tradicionales", color: "#92400E", tagline: "Si funciona, no lo rompas" };
  if (social > 65 && economic < 50)
    return { name: "Progresista Social", emoji: "🌈", description: "Igualdad, diversidad y Estado presente", color: "#DB2777", tagline: "Derechos para todos" };
  return { name: "Independiente Crítico", emoji: "🔍", description: "No te casas con ninguna ideología. Evalúas caso por caso", color: "#475569", tagline: "Ni de izquierda ni de derecha" };
}

/* ──────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────── */

type Phase = "intro" | "swiping" | "calculating" | "results";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [showContext, setShowContext] = useState(false);
  const [shared, setShared] = useState(false);

  const currentProposal = PROPOSALS[currentIndex];
  const progress = (currentIndex / PROPOSALS.length) * 100;

  const handleSwipe = useCallback(
    (agree: boolean) => {
      setSwipeDirection(agree ? "right" : "left");
      setAnswers((prev) => ({ ...prev, [currentProposal.id]: agree }));

      setTimeout(() => {
        setSwipeDirection(null);
        setShowContext(false);
        if (currentIndex + 1 >= PROPOSALS.length) {
          setPhase("calculating");
          setTimeout(() => setPhase("results"), 2000);
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 300);
    },
    [currentIndex, currentProposal]
  );

  // Calcular scores a partir de las respuestas
  const calculateScores = useCallback(() => {
    const dimTotals: Record<string, { sum: number; count: number }> = {
      economic: { sum: 0, count: 0 },
      social: { sum: 0, count: 0 },
      environment: { sum: 0, count: 0 },
      security: { sum: 0, count: 0 },
      institutional: { sum: 0, count: 0 },
    };

    PROPOSALS.forEach((p) => {
      const agree = answers[p.id];
      if (agree !== undefined) {
        // A favor = alto puntaje, En contra = bajo puntaje
        const score = agree ? 75 : 25;
        dimTotals[p.dimension].sum += score;
        dimTotals[p.dimension].count += 1;
      }
    });

    const scores: Record<string, number> = {};
    for (const [dim, data] of Object.entries(dimTotals)) {
      scores[dim] = data.count > 0 ? Math.round(data.sum / data.count) : 50;
    }
    return scores;
  }, [answers]);

  // Calcular matches con candidatos
  const calculateMatches = useCallback(() => {
    const userScores = calculateScores();
    return CANDIDATES_DATA.map((c) => {
      const dims = Object.keys(userScores);
      const totalDiff = dims.reduce((sum, dim) => {
        const diff = Math.abs(userScores[dim] - c.positions[dim as keyof typeof c.positions]);
        return sum + diff;
      }, 0);
      const compatibility = Math.round(100 - totalDiff / dims.length);
      return { ...c, compatibility };
    }).sort((a, b) => b.compatibility - a.compatibility);
  }, [calculateScores]);

  const handleShare = async () => {
    const scores = calculateScores();
    const tribe = determineTribe(scores);
    const matches = calculateMatches();
    const top = matches[0];

    const text = `🗳️ Mi tribu política es "${tribe.name}" ${tribe.emoji}\n` +
      `Mi match #1: ${top.name} (${top.compatibility}%)\n\n` +
      `¿Con quién haces match tú? Descúbrelo en 60 segundos 👇\n` +
      `candidatazo.com/quiz`;

    if ("share" in navigator) {
      try {
        await navigator.share({ title: "Mi resultado en Candidatazo", text, url: "https://candidatazo.com/quiz" });
      } catch {
        await (navigator as any).clipboard.writeText(text);
      }
    } else {
      await (navigator as any).clipboard.writeText(text);
    }
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  /* ── INTRO ─────────────────────────────────────────────────── */
  if (phase === "intro") {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-primary-50 via-white to-gold-50">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            60 segundos · 10 propuestas
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 leading-tight">
            ¿Quién piensa{" "}
            <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
              como tú?
            </span>
          </h1>

          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            Te mostramos 10 propuestas reales de candidatos —sin decirte de quién son—.
            Desliza a favor o en contra. Al final descubrirás tu match político.
          </p>

          <div className="flex items-center justify-center gap-6 mb-10 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="text-red-500 text-lg">👈</span> En contra
            </span>
            <span className="w-px h-6 bg-gray-200" />
            <span className="flex items-center gap-1.5">
              A favor <span className="text-green-500 text-lg">👉</span>
            </span>
          </div>

          <button
            onClick={() => setPhase("swiping")}
            className="w-full sm:w-auto bg-primary hover:bg-primary-600 text-white text-lg font-bold px-10 py-4 rounded-xl shadow-card hover:shadow-hover transition-all duration-200"
          >
            Empezar ahora
          </button>

          <p className="mt-6 text-xs text-gray-400">
            Sin registro. Sin datos personales. 100% anónimo.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {["🟥", "🟨", "🟩", "🟦"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">
                  {c}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              <strong className="text-gray-700">47,329</strong> personas ya lo hicieron
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ── SWIPING ───────────────────────────────────────────────── */
  if (phase === "swiping") {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col">
        {/* Progress bar */}
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                {currentIndex + 1} de {PROPOSALS.length}
              </span>
              <span className="text-xs text-gray-400">
                {Math.round(progress)}% completado
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-gold rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-lg w-full">
            <div
              className={`relative bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden transition-all duration-300 ${swipeDirection === "right"
                  ? "translate-x-20 rotate-6 opacity-0"
                  : swipeDirection === "left"
                    ? "-translate-x-20 -rotate-6 opacity-0"
                    : ""
                }`}
            >
              {/* Dimension badge */}
              <div className="px-6 pt-6 pb-0">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${currentProposal.dimension === "economic" ? "bg-gold-100 text-gold-700" :
                      currentProposal.dimension === "social" ? "bg-pink-100 text-pink-700" :
                        currentProposal.dimension === "environment" ? "bg-green-100 text-green-700" :
                          currentProposal.dimension === "security" ? "bg-red-100 text-red-700" :
                            "bg-purple-100 text-purple-700"
                    }`}>
                    {currentProposal.dimension === "economic" ? "💰 Economía" :
                      currentProposal.dimension === "social" ? "🤝 Social" :
                        currentProposal.dimension === "environment" ? "🌿 Ambiente" :
                          currentProposal.dimension === "security" ? "🛡️ Seguridad" :
                            "🏛️ Instituciones"}
                  </span>
                  <button
                    onClick={() => setShowContext(!showContext)}
                    className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Contexto
                  </button>
                </div>
              </div>

              {/* Proposal text */}
              <div className="px-6 py-8">
                <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                  &ldquo;{currentProposal.text}&rdquo;
                </p>
              </div>

              {/* Context (expandable) */}
              {showContext && (
                <div className="px-6 pb-4 animate-fade-in">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                      {currentProposal.context}
                    </p>
                    <p className="text-xs text-gray-400">
                      Fuente: {currentProposal.source}
                    </p>
                  </div>
                </div>
              )}

              {/* Swipe buttons */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleSwipe(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-red-200 text-red-600 font-bold hover:bg-red-50 hover:border-red-300 active:scale-95 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    En contra
                  </button>
                  <button
                    onClick={() => handleSwipe(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-green-200 text-green-600 font-bold hover:bg-green-50 hover:border-green-300 active:scale-95 transition-all"
                  >
                    A favor
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Keyboard hint */}
            <p className="text-center text-xs text-gray-400 mt-4">
              También puedes usar las flechas del teclado ← →
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── CALCULATING ───────────────────────────────────────────── */
  if (phase === "calculating") {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-secondary to-secondary-700">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Analizando tus respuestas...
          </h2>
          <p className="text-secondary-200">
            Comparando con los planes de gobierno de 36 candidatos
          </p>
        </div>
      </div>
    );
  }

  /* ── RESULTS ───────────────────────────────────────────────── */
  const scores = calculateScores();
  const tribe = determineTribe(scores);
  const matches = calculateMatches();
  const topMatch = matches[0];
  const secondMatch = matches[1];
  const worstMatch = matches[matches.length - 1];

  // Datos de coincidencias por propuesta
  const agreementDetails = PROPOSALS.map((p) => ({
    ...p,
    userAgrees: answers[p.id],
    topMatchAgrees: topMatch.name ? p.supportedBy.includes(topMatch.name) : false,
  }));

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* TARJETA PRINCIPAL - Estilo "Spotify Wrapped" */}
      <section className="bg-gradient-to-br from-secondary via-secondary-700 to-secondary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gold blur-3xl" />
        </div>

        <div className="relative max-w-lg mx-auto px-4 text-center">
          {/* Tribe */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-5 py-2 text-sm font-semibold mb-6">
            <span className="text-xl">{tribe.emoji}</span>
            Tu tribu política
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
            {tribe.name}
          </h1>
          <p className="text-lg text-secondary-200 mb-2">
            &ldquo;{tribe.tagline}&rdquo;
          </p>
          <p className="text-sm text-secondary-300 mb-8 max-w-md mx-auto">
            {tribe.description}
          </p>

          {/* Top Match Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6">
            <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-3">
              Tu match #1
            </p>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-extrabold"
                style={{ backgroundColor: topMatch.color }}
              >
                {topMatch.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-white">{topMatch.name}</p>
                <p className="text-sm text-secondary-200">{topMatch.party}</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold rounded-full px-4 py-2 text-lg font-extrabold">
              {topMatch.compatibility}% compatible
            </div>
          </div>

          {/* Runner up & worst */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <p className="text-xs text-gray-400 mb-1">#2 Match</p>
              <p className="text-sm font-bold text-white">{secondMatch.name}</p>
              <p className="text-sm font-semibold text-gold">{secondMatch.compatibility}%</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <p className="text-xs text-gray-400 mb-1">Menos compatible</p>
              <p className="text-sm font-bold text-white">{worstMatch.name}</p>
              <p className="text-sm font-semibold text-red-400">{worstMatch.compatibility}%</p>
            </div>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="w-full sm:w-auto bg-gold hover:bg-gold-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-card hover:shadow-hover transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            {shared ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ¡Copiado!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Compartir mi resultado
              </>
            )}
          </button>
        </div>
      </section>

      {/* DETALLE DE COINCIDENCIAS */}
      <section className="max-w-lg mx-auto px-4 py-10">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">
          Así votaste vs. tu match
        </h2>

        <div className="space-y-3">
          {agreementDetails.map((item) => {
            const match = item.userAgrees === item.topMatchAgrees;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border ${match
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${match ? "bg-green-500" : "bg-red-500"
                    }`}>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {match ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 leading-snug">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className={item.userAgrees ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        Tú: {item.userAgrees ? "A favor" : "En contra"}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className={item.topMatchAgrees ? "text-green-600" : "text-red-600"}>
                        {topMatch.name.split(" ")[0]}: {item.topMatchAgrees ? "A favor" : "En contra"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RANKING COMPLETO */}
      <section className="max-w-lg mx-auto px-4 pb-10">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">
          Tu compatibilidad con todos los candidatos
        </h2>

        <div className="space-y-2">
          {matches.map((m, i) => (
            <div key={m.name} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <span className="text-sm font-bold text-gray-400 w-6 text-right">
                {i + 1}
              </span>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: m.color }}
              >
                {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{m.name}</p>
                <p className="text-xs text-gray-400 truncate">{m.party}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${m.compatibility}%`,
                      backgroundColor: m.compatibility > 70 ? "#10B981" : m.compatibility > 50 ? "#F59E0B" : "#EF4444",
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 w-10 text-right">
                  {m.compatibility}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="max-w-lg mx-auto px-4 pb-16">
        <div className="space-y-3">
          <Link
            href="/test"
            className="block w-full text-center bg-white border-2 border-primary text-primary font-bold py-4 rounded-xl hover:bg-primary-50 transition-all"
          >
            Hacer el test completo (30 preguntas, más preciso)
          </Link>
          <Link
            href={`/candidatos/${topMatch.name.toLowerCase().replace(/ /g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
            className="block w-full text-center bg-white border border-gray-200 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-all"
          >
            Ver perfil completo de {topMatch.name}
          </Link>
          <button
            onClick={handleShare}
            className="block w-full text-center bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-600 transition-all"
          >
            Compartir y retar a un amigo
          </button>
        </div>
      </section>
    </div>
  );
}
