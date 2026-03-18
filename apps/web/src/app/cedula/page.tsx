"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// DATA: Partidos políticos peruanos - Elecciones 2026
// ═══════════════════════════════════════════════════════════════════

interface Partido {
  numero: number;
  nombre: string;
  sigla: string;
  candidatoPresidente: string;
  color: string;
  simbolo: string; // Emoji representation of party symbol
}

const PARTIDOS: Partido[] = [
  { numero: 1, nombre: "Alianza Popular Revolucionaria Americana", sigla: "APRA", candidatoPresidente: "Por definir", color: "#E53E3E", simbolo: "⭐" },
  { numero: 2, nombre: "Acción Popular", sigla: "AP", candidatoPresidente: "Por definir", color: "#2B6CB0", simbolo: "🔺" },
  { numero: 3, nombre: "Alianza para el Progreso", sigla: "APP", candidatoPresidente: "Por definir", color: "#38A169", simbolo: "🌾" },
  { numero: 4, nombre: "Avanza País", sigla: "AVANZA PAÍS", candidatoPresidente: "Por definir", color: "#D69E2E", simbolo: "🏃" },
  { numero: 5, nombre: "Renovación Popular", sigla: "RP", candidatoPresidente: "Rafael López Aliaga", color: "#1A365D", simbolo: "🔵" },
  { numero: 6, nombre: "Fuerza Popular", sigla: "FP", candidatoPresidente: "Keiko Fujimori", color: "#ED8936", simbolo: "🍊" },
  { numero: 7, nombre: "Perú Libre", sigla: "PL", candidatoPresidente: "Por definir", color: "#C53030", simbolo: "✊" },
  { numero: 8, nombre: "Juntos por el Perú", sigla: "JP", candidatoPresidente: "Por definir", color: "#805AD5", simbolo: "🤝" },
  { numero: 9, nombre: "Podemos Perú", sigla: "PP", candidatoPresidente: "José Luna Gálvez", color: "#4299E1", simbolo: "💪" },
  { numero: 10, nombre: "Partido Morado", sigla: "PM", candidatoPresidente: "Por definir", color: "#9F7AEA", simbolo: "🟣" },
  { numero: 11, nombre: "Somos Perú", sigla: "SP", candidatoPresidente: "Por definir", color: "#48BB78", simbolo: "🇵🇪" },
  { numero: 12, nombre: "Victoria Nacional", sigla: "VN", candidatoPresidente: "Por definir", color: "#2C5282", simbolo: "🏆" },
  { numero: 13, nombre: "Democracia Directa", sigla: "DD", candidatoPresidente: "Por definir", color: "#C05621", simbolo: "📜" },
  { numero: 14, nombre: "Frente de la Esperanza", sigla: "FE", candidatoPresidente: "Fernando Olivera", color: "#276749", simbolo: "🌅" },
  { numero: 15, nombre: "Partido Patriótico del Perú", sigla: "PPP", candidatoPresidente: "Por definir", color: "#9B2C2C", simbolo: "🛡️" },
  { numero: 16, nombre: "Fe en el Perú", sigla: "FEP", candidatoPresidente: "Por definir", color: "#2A4365", simbolo: "✝️" },
  { numero: 17, nombre: "Partido Popular Cristiano", sigla: "PPC", candidatoPresidente: "Por definir", color: "#3182CE", simbolo: "⚓" },
  { numero: 18, nombre: "Unión por el Perú", sigla: "UPP", candidatoPresidente: "Antauro Humala", color: "#E53E3E", simbolo: "🔴" },
  { numero: 19, nombre: "Perú Patria Segura", sigla: "PPS", candidatoPresidente: "Por definir", color: "#2D3748", simbolo: "🔒" },
  { numero: 20, nombre: "País Para Todos", sigla: "PPT", candidatoPresidente: "Por definir", color: "#DD6B20", simbolo: "🏠" },
];

// Blank vote option
const VOTO_BLANCO = { numero: 0, nombre: "VOTO EN BLANCO", sigla: "BLANCO", candidatoPresidente: "", color: "#E2E8F0", simbolo: "⬜" };

// ═══════════════════════════════════════════════════════════════════
// Educational facts
// ═══════════════════════════════════════════════════════════════════

const FACTS = {
  presidente: [
    "Si marcas más de un candidato presidencial, tu voto es NULO.",
    "El voto en blanco se contabiliza pero NO favorece a ningún candidato.",
    "Para ganar en primera vuelta se necesita más del 50% de los votos válidos.",
    "Si ningún candidato supera el 50%, los dos primeros pasan a segunda vuelta.",
  ],
  senadores: [
    "El Senado tendrá 60 miembros — regresa después de 36 años.",
    "Los senadores se eligen en distrito nacional único (todo el Perú).",
    "El voto preferencial te permite elegir TUS senadores específicos dentro de la lista.",
    "Puedes marcar hasta 2 números de candidatos preferenciales para Senado.",
  ],
  diputados: [
    "La Cámara de Diputados tendrá 130 miembros.",
    "Los diputados se eligen por distrito electoral (por región).",
    "El voto preferencial te permite elegir TUS diputados específicos.",
    "Puedes marcar hasta 2 números de candidatos preferenciales para Diputados.",
  ],
  general: [
    "Votar por diferentes partidos en presidente y congreso es VÁLIDO.",
    "El sistema es bicameral por primera vez en 36 años.",
    "La valla electoral es del 5% — los partidos que no la superen pierden su inscripción.",
    "El voto es obligatorio para ciudadanos de 18 a 70 años.",
    "No votar genera una multa de S/ 22 a S/ 88 según tu zona.",
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

type Screen = "intro" | "ballot" | "results";
type BallotSection = "presidente" | "senadores" | "diputados";

interface VotoPreferencial {
  first: string;
  second: string;
}

interface BallotState {
  presidente: number | null;
  senadores: number | null;
  diputados: number | null;
  preferencialSenadores: VotoPreferencial;
  preferencialDiputados: VotoPreferencial;
}

// ═══════════════════════════════════════════════════════════════════
// Utility: days until election
// ═══════════════════════════════════════════════════════════════════

function daysUntilElection(): number {
  const election = new Date("2026-04-12T00:00:00-05:00");
  const now = new Date();
  const electionDate = new Date(election.getFullYear(), election.getMonth(), election.getDate());
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffTime = electionDate.getTime() - nowDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

// ═══════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════

function AnimatedX({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <svg
        viewBox="0 0 100 100"
        className="w-16 h-16 md:w-20 md:h-20 animate-stamp"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
      >
        <line x1="15" y1="15" x2="85" y2="85" stroke="#D91023" strokeWidth="12" strokeLinecap="round">
          <animate attributeName="x2" from="15" to="85" dur="0.15s" fill="freeze" />
          <animate attributeName="y2" from="15" to="85" dur="0.15s" fill="freeze" />
        </line>
        <line x1="85" y1="15" x2="15" y2="85" stroke="#D91023" strokeWidth="12" strokeLinecap="round">
          <animate attributeName="x2" from="85" to="15" dur="0.15s" begin="0.1s" fill="freeze" />
          <animate attributeName="y2" from="15" to="85" dur="0.15s" begin="0.1s" fill="freeze" />
        </line>
      </svg>
    </div>
  );
}

function FactBubble({ fact, onClose }: { fact: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-5 shadow-modal max-w-sm w-full border-l-4 border-gold animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">💡</span>
          <div className="flex-1">
            <p className="font-bold text-sm text-gold-700 mb-1">¿Sabías que?</p>
            <p className="text-gray-700 text-sm leading-relaxed">{fact}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-3 w-full text-center text-sm font-semibold text-primary hover:text-primary-700 transition-colors"
        >
          Entendido ✓
        </button>
      </div>
    </div>
  );
}

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="cursor-help"
      >
        {children}
      </span>
      {show && (
        <span className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-secondary text-white text-xs rounded-lg px-3 py-2 whitespace-normal max-w-[240px] shadow-modal animate-fade-in">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-secondary" />
        </span>
      )}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function CedulaSimuladorPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [activeSection, setActiveSection] = useState<BallotSection>("presidente");
  const [ballot, setBallot] = useState<BallotState>({
    presidente: null,
    senadores: null,
    diputados: null,
    preferencialSenadores: { first: "", second: "" },
    preferencialDiputados: { first: "", second: "" },
  });
  const [showFact, setShowFact] = useState<string | null>(null);
  const [factShownCount, setFactShownCount] = useState(0);
  const [startTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [xp, setXp] = useState(0);
  const [showNuloWarning, setShowNuloWarning] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<BallotSection>>(new Set());
  const lastVoteRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const daysLeft = daysUntilElection();

  // Timer for results
  useEffect(() => {
    if (screen === "results") {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }
  }, [screen, startTime]);

  // Show random fact occasionally after voting
  const maybeShowFact = useCallback((section: BallotSection) => {
    if (factShownCount >= 6) return; // Don't overwhelm
    const shouldShow = Math.random() > 0.5;
    if (shouldShow) {
      const facts = FACTS[section];
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setShowFact(randomFact);
      setFactShownCount((c) => c + 1);
    }
  }, [factShownCount]);

  // Handle vote selection
  const handleVote = useCallback((section: BallotSection, partyNum: number) => {
    setBallot((prev) => {
      const current = prev[section];
      // Toggle: if same party, deselect
      const newValue = current === partyNum ? null : partyNum;
      return { ...prev, [section]: newValue };
    });

    // Visual feedback - briefly flash
    lastVoteRef.current = partyNum;
    setTimeout(() => { lastVoteRef.current = null; }, 300);

    // XP for first vote in section
    if (!completedSections.has(section)) {
      setXp((x) => x + 50);
      setCompletedSections((s) => new Set(s).add(section));
    }

    maybeShowFact(section);
  }, [completedSections, maybeShowFact]);

  // Handle preferential vote input
  const handlePreferencial = useCallback((
    section: "senadores" | "diputados",
    position: "first" | "second",
    value: string
  ) => {
    // Only allow numbers
    const cleaned = value.replace(/\D/g, "").slice(0, 3);
    const key = section === "senadores" ? "preferencialSenadores" : "preferencialDiputados";
    setBallot((prev) => ({
      ...prev,
      [key]: { ...prev[key], [position]: cleaned },
    }));
  }, []);

  // Calculate vote validity
  const getVoteValidity = useCallback(() => {
    const issues: string[] = [];
    const valid: string[] = [];

    if (ballot.presidente !== null) {
      if (ballot.presidente === 0) {
        valid.push("Voto presidencial en blanco - se contabiliza pero no favorece a nadie.");
      } else {
        const party = PARTIDOS.find((p) => p.numero === ballot.presidente);
        valid.push(`Voto presidencial por ${party?.sigla} es VÁLIDO.`);
      }
    } else {
      issues.push("No seleccionaste candidato presidencial. Tu cédula presidencial quedará en blanco.");
    }

    if (ballot.senadores !== null) {
      if (ballot.senadores === 0) {
        valid.push("Voto para Senado en blanco.");
      } else {
        const party = PARTIDOS.find((p) => p.numero === ballot.senadores);
        valid.push(`Voto para Senado por ${party?.sigla} es VÁLIDO.`);
      }
    } else {
      issues.push("No seleccionaste partido para el Senado.");
    }

    if (ballot.diputados !== null) {
      if (ballot.diputados === 0) {
        valid.push("Voto para Diputados en blanco.");
      } else {
        const party = PARTIDOS.find((p) => p.numero === ballot.diputados);
        valid.push(`Voto para Diputados por ${party?.sigla} es VÁLIDO.`);
      }
    } else {
      issues.push("No seleccionaste partido para Diputados.");
    }

    // Check if different parties (valid but educational)
    if (
      ballot.presidente !== null &&
      ballot.senadores !== null &&
      ballot.diputados !== null &&
      ballot.presidente !== 0 &&
      ballot.senadores !== 0 &&
      ballot.diputados !== 0
    ) {
      const allSame = ballot.presidente === ballot.senadores && ballot.senadores === ballot.diputados;
      if (!allSame) {
        valid.push("Votaste por diferentes partidos — esto es completamente VÁLIDO.");
      }
    }

    return { issues, valid, isValid: true }; // Single selection per section = always valid
  }, [ballot]);

  // Submit vote
  const handleSubmit = useCallback(() => {
    // Award XP for completing
    setXp((x) => x + 200);
    setScreen("results");
    // Show a general fact
    const generalFact = FACTS.general[Math.floor(Math.random() * FACTS.general.length)];
    setTimeout(() => setShowFact(generalFact), 800);
  }, []);

  // Share functions
  const shareText = "Ya practiqué mi voto para las elecciones 2026 en Candidatazo. ¡Practica el tuyo! 🗳️🇵🇪";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://candidatazo.pe/cedula";

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
  };
  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, "_blank");
  };
  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  // ═════════════════════════════════════════════════════════════
  // RENDER: INTRO SCREEN
  // ═════════════════════════════════════════════════════════════

  if (screen === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-gold-50">
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-full px-5 py-2 text-sm font-bold mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              Faltan {daysLeft} días para las elecciones
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-secondary mb-4 leading-tight">
              Simulador de <span className="text-primary">Cédula</span> Electoral
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
              Practica tu voto antes del <strong>12 de abril</strong>. Conoce la nueva cédula bicameral y vota con confianza.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3 mb-8 animate-slide-up">
            <div className="bg-white rounded-xl p-4 shadow-card border-l-4 border-primary">
              <p className="text-3xl font-extrabold text-primary">53%</p>
              <p className="text-sm text-gray-600 mt-1">de votantes NO reconoce el símbolo de su partido</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-card border-l-4 border-gold">
              <p className="text-3xl font-extrabold text-gold">81%</p>
              <p className="text-sm text-gray-600 mt-1">NO entiende el nuevo sistema bicameral</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-card border-l-4 border-blue-500">
              <p className="text-3xl font-extrabold text-blue-600">36</p>
              <p className="text-sm text-gray-600 mt-1">años sin Senado en el Perú — ¡regresa en 2026!</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-card border-l-4 border-green-500">
              <p className="text-3xl font-extrabold text-green-600">3</p>
              <p className="text-sm text-gray-600 mt-1">votos distintos en una sola elección</p>
            </div>
          </div>

          {/* What you'll learn */}
          <div className="bg-white rounded-2xl p-6 shadow-card mb-8 animate-slide-up">
            <h2 className="font-bold text-lg text-secondary mb-4">En este simulador aprenderás:</h2>
            <ul className="space-y-3">
              {[
                "Cómo se ve la nueva cédula bicameral con 3 secciones",
                "Cómo funciona el voto preferencial para Senado y Diputados",
                "Qué hace que un voto sea válido, en blanco, o nulo",
                "Los símbolos y números de los partidos políticos",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">✓</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* XP teaser */}
          <div className="bg-gradient-to-r from-gold-50 to-gold-100 rounded-2xl p-5 mb-8 border border-gold-200 animate-slide-up">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-bold text-gold-800">+200 XP por completar</p>
                <p className="text-sm text-gold-700">Desbloquea la insignia &quot;Ciudadano Preparado&quot;</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              setScreen("ballot");
              // Show first fact
              setTimeout(() => setShowFact("El sistema es bicameral por primera vez en 36 años. Votarás en 3 secciones separadas: Presidente, Senado y Diputados."), 600);
            }}
            className="w-full btn-primary text-lg py-4 rounded-xl shadow-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span className="text-2xl">🗳️</span>
            Comenzar Simulador
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Simulador educativo. No es un voto real. Datos basados en información pública del JNE y ONPE.
          </p>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════
  // RENDER: RESULTS SCREEN
  // ═════════════════════════════════════════════════════════════

  if (screen === "results") {
    const validity = getVoteValidity();
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    const getPartyName = (num: number | null) => {
      if (num === null) return "No votaste";
      if (num === 0) return "Voto en blanco";
      return PARTIDOS.find((p) => p.numero === num)?.sigla ?? "Desconocido";
    };

    const getPartySymbol = (num: number | null) => {
      if (num === null) return "—";
      if (num === 0) return "⬜";
      return PARTIDOS.find((p) => p.numero === num)?.simbolo ?? "?";
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gold-50">
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">¡Práctica Completada!</h1>
            <p className="text-gray-600">Así quedaría tu voto en las elecciones del 12 de abril</p>
          </div>

          {/* XP Animation */}
          <div className="bg-gradient-to-r from-gold-100 to-gold-200 rounded-2xl p-5 mb-6 border border-gold-300 animate-scale-in text-center">
            <p className="text-4xl font-extrabold text-gold-800">+{xp} XP</p>
            <p className="text-gold-700 font-semibold mt-1">🏆 Insignia: Ciudadano Preparado</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-sm text-gold-600">Tiempo: {minutes > 0 ? `${minutes}m ` : ""}{seconds}s</span>
            </div>
          </div>

          {/* Vote Summary */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-6 animate-slide-up">
            <div className="bg-secondary text-white px-5 py-3 text-center">
              <h2 className="font-bold text-lg">RESUMEN DE TU VOTO</h2>
            </div>

            {(["presidente", "senadores", "diputados"] as BallotSection[]).map((section) => {
              const num = ballot[section];
              const label = section === "presidente" ? "PRESIDENTE" : section === "senadores" ? "SENADORES" : "DIPUTADOS";
              return (
                <div key={section} className="px-5 py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="font-bold text-secondary text-lg mt-0.5">
                        {getPartySymbol(num)} {getPartyName(num)}
                      </p>
                      {section !== "presidente" && num !== null && num !== 0 && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          Preferencial: {
                            (section === "senadores"
                              ? [ballot.preferencialSenadores.first, ballot.preferencialSenadores.second]
                              : [ballot.preferencialDiputados.first, ballot.preferencialDiputados.second]
                            ).filter(Boolean).join(", ") || "No marcado"
                          }
                        </p>
                      )}
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${num !== null ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {num !== null ? "✓" : "—"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Validity Analysis */}
          <div className="bg-white rounded-2xl shadow-card p-5 mb-6 animate-slide-up">
            <h3 className="font-bold text-secondary mb-3">Análisis de tu voto</h3>

            {validity.valid.map((v, i) => (
              <div key={`v-${i}`} className="flex items-start gap-2 mb-2">
                <span className="text-green-500 flex-shrink-0 mt-0.5">✅</span>
                <p className="text-sm text-gray-700">{v}</p>
              </div>
            ))}
            {validity.issues.map((v, i) => (
              <div key={`i-${i}`} className="flex items-start gap-2 mb-2">
                <span className="text-yellow-500 flex-shrink-0 mt-0.5">⚠️</span>
                <p className="text-sm text-gray-700">{v}</p>
              </div>
            ))}

            {/* Threshold info */}
            <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm font-bold text-blue-800 mb-1">📊 Valla Electoral (5%)</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Los partidos necesitan al menos 5% de los votos válidos a nivel nacional para mantener su inscripción
                y obtener escaños en el Congreso. Si tu partido no supera la valla, sus votos congresales se redistribuyen.
              </p>
            </div>
          </div>

          {/* Share Card */}
          <div className="bg-gradient-to-br from-primary-50 via-white to-gold-50 rounded-2xl shadow-card p-6 mb-6 border border-primary-100 animate-slide-up">
            <div className="text-center mb-4">
              <p className="font-extrabold text-xl text-secondary">Ya practiqué mi voto</p>
              <p className="text-primary font-bold">en Candidatazo 🇵🇪</p>
              <p className="text-xs text-gray-500 mt-1">Elecciones 2026 — Simulador de cédula bicameral</p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">+{xp} XP</span>
              <span className="bg-gold-100 text-gold-700 text-xs font-bold px-3 py-1 rounded-full">🏆 Ciudadano Preparado</span>
            </div>

            <p className="text-center text-sm text-gray-600 mb-4">Comparte y ayuda a otros a estar preparados:</p>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={shareWhatsApp}
                className="flex flex-col items-center gap-1 bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 transition-all active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                <span className="text-xs font-semibold">WhatsApp</span>
              </button>
              <button
                onClick={shareFacebook}
                className="flex flex-col items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition-all active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                <span className="text-xs font-semibold">Facebook</span>
              </button>
              <button
                onClick={shareTwitter}
                className="flex flex-col items-center gap-1 bg-black hover:bg-gray-800 text-white rounded-xl py-3 transition-all active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                <span className="text-xs font-semibold">X</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 animate-slide-up">
            <button
              onClick={() => {
                setBallot({
                  presidente: null,
                  senadores: null,
                  diputados: null,
                  preferencialSenadores: { first: "", second: "" },
                  preferencialDiputados: { first: "", second: "" },
                });
                setCompletedSections(new Set());
                setScreen("ballot");
                setActiveSection("presidente");
              }}
              className="w-full btn-primary py-3 rounded-xl"
            >
              🔄 Practicar de nuevo
            </button>
            <a
              href="/"
              className="block w-full text-center btn-outline py-3 rounded-xl"
            >
              Volver a Candidatazo
            </a>
          </div>
        </div>

        {showFact && <FactBubble fact={showFact} onClose={() => setShowFact(null)} />}
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════
  // RENDER: BALLOT SCREEN
  // ═════════════════════════════════════════════════════════════

  const sectionConfig = {
    presidente: {
      title: "PRESIDENTE DE LA REPÚBLICA",
      subtitle: "Elige 1 candidato",
      color: "bg-primary",
      icon: "🏛️",
      showPreferencial: false,
    },
    senadores: {
      title: "SENADORES",
      subtitle: "Elige 1 partido + hasta 2 preferenciales",
      color: "bg-blue-600",
      icon: "🏛️",
      showPreferencial: true,
      preferencialLabel: "VOTO PREFERENCIAL SENADO (hasta 2 números)",
      totalMembers: 60,
    },
    diputados: {
      title: "DIPUTADOS",
      subtitle: "Elige 1 partido + hasta 2 preferenciales",
      color: "bg-green-600",
      icon: "🏛️",
      showPreferencial: true,
      preferencialLabel: "VOTO PREFERENCIAL DIPUTADOS (hasta 2 números)",
      totalMembers: 130,
    },
  };

  const currentConfig = sectionConfig[activeSection];
  const currentVote = ballot[activeSection];
  const allPartiesWithBlank = [...PARTIDOS, VOTO_BLANCO];

  const sections: BallotSection[] = ["presidente", "senadores", "diputados"];
  const currentIdx = sections.indexOf(activeSection);

  const goNext = () => {
    if (currentIdx < 2) {
      setActiveSection(sections[currentIdx + 1]);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setActiveSection(sections[currentIdx - 1]);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" ref={sectionRef}>
      {/* Custom keyframes injected via style tag */}
      <style>{`
        @keyframes stamp {
          0% { transform: scale(1.8) rotate(-15deg); opacity: 0; }
          50% { transform: scale(0.9) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-stamp {
          animation: stamp 0.25s ease-out forwards;
        }
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217, 16, 35, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(217, 16, 35, 0); }
        }
        .pulse-border {
          animation: pulse-border 1s ease-in-out;
        }
        @keyframes checkmark-pop {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animate-checkmark {
          animation: checkmark-pop 0.3s ease-out forwards;
        }
      `}</style>

      {/* Top Progress Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-subtle">
        <div className="max-w-3xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Simulador de Cédula</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full">{xp} XP</span>
              <Tooltip text="Este es un simulador educativo. No es un voto real.">
                <span className="text-xs text-gray-400 cursor-help">ⓘ</span>
              </Tooltip>
            </div>
          </div>
          {/* Section tabs */}
          <div className="flex gap-1">
            {sections.map((sec, i) => {
              const isActive = sec === activeSection;
              const isComplete = ballot[sec] !== null;
              return (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? `${sectionConfig[sec].color} text-white shadow-subtle`
                      : isComplete
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <span className="hidden sm:inline">{i + 1}. </span>
                  {sec === "presidente" ? "Presidente" : sec === "senadores" ? "Senadores" : "Diputados"}
                  {isComplete && !isActive && " ✓"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ballot Content */}
      <div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-6">
        {/* Section Header */}
        <div className={`${currentConfig.color} text-white rounded-t-2xl px-5 py-4 text-center`}>
          <p className="text-sm font-medium opacity-80 mb-1">OFICINA NACIONAL DE PROCESOS ELECTORALES — SIMULADOR</p>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-wide">{currentConfig.title}</h2>
          <p className="text-sm opacity-90 mt-1">{currentConfig.subtitle}</p>
          {activeSection !== "presidente" && (
            <p className="text-xs opacity-75 mt-1">
              {activeSection === "senadores" ? "60 senadores — Distrito nacional único" : "130 diputados — Por distrito electoral"}
            </p>
          )}
        </div>

        {/* Nulo Warning Banner */}
        {showNuloWarning && (
          <div className="bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2 animate-fade-in">
            <span className="text-red-500 text-lg flex-shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-bold text-red-700">¡Cuidado! Si marcas más de un candidato, tu voto será NULO</p>
              <p className="text-xs text-red-600 mt-0.5">En este simulador solo puedes marcar 1 opción (como en la vida real)</p>
              <button onClick={() => setShowNuloWarning(false)} className="text-xs text-red-500 underline mt-1">Cerrar</button>
            </div>
          </div>
        )}

        {/* Grid of Parties */}
        <div className="bg-white border-x-2 border-b-2 border-gray-300 rounded-b-2xl overflow-hidden">
          {/* Instruction bar */}
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Toca el partido de tu elección para marcarlo con una <strong className="text-primary">X</strong>
            </p>
            <Tooltip text={activeSection === "presidente" ? "Solo puedes elegir 1 candidato presidencial." : "Elige 1 partido. Luego podrás agregar voto preferencial."}>
              <span className="text-xs text-primary font-bold cursor-help">Ayuda</span>
            </Tooltip>
          </div>

          {/* Party Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {allPartiesWithBlank.map((party) => {
              const isSelected = currentVote === party.numero;
              const isBlank = party.numero === 0;

              return (
                <button
                  key={party.numero}
                  onClick={() => {
                    handleVote(activeSection, party.numero);
                  }}
                  className={`relative border border-gray-200 p-3 md:p-4 text-center transition-all duration-150 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    isSelected ? "bg-primary-50 ring-2 ring-primary pulse-border" : ""
                  } ${isBlank ? "col-span-2 sm:col-span-3 md:col-span-4 bg-gray-50 border-t-2 border-gray-300" : ""}`}
                  aria-label={`Votar por ${party.nombre}`}
                  aria-pressed={isSelected}
                >
                  <AnimatedX visible={isSelected} />

                  {!isBlank ? (
                    <>
                      {/* Party number */}
                      <div className="absolute top-1 left-2 text-[10px] font-bold text-gray-400">
                        N.° {party.numero}
                      </div>
                      {/* Symbol */}
                      <div className="text-3xl md:text-4xl mb-1 mt-2" style={{ filter: isSelected ? "none" : "grayscale(0)" }}>
                        {party.simbolo}
                      </div>
                      {/* Name */}
                      <p className="text-[10px] md:text-xs font-bold text-secondary leading-tight line-clamp-2 h-6">
                        {party.sigla}
                      </p>
                      {activeSection === "presidente" && (
                        <p className="text-[9px] text-gray-500 leading-tight mt-0.5 truncate">
                          {party.candidatoPresidente}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-3 py-2">
                      <span className="text-2xl">⬜</span>
                      <div>
                        <p className="font-bold text-gray-600 text-sm">VOTO EN BLANCO</p>
                        <p className="text-[10px] text-gray-400">Se contabiliza pero no favorece a ningún partido</p>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Preferential Vote Section */}
          {currentConfig.showPreferencial && currentVote !== null && currentVote !== 0 && (
            <div className="border-t-2 border-gray-300 bg-blue-50 p-4 animate-fade-in">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-xl">✏️</span>
                <div>
                  <p className="font-bold text-sm text-blue-800">
                    {activeSection === "senadores" ? "VOTO PREFERENCIAL — SENADO" : "VOTO PREFERENCIAL — DIPUTADOS"}
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    Escribe hasta 2 números de candidatos de la lista de{" "}
                    {PARTIDOS.find((p) => p.numero === currentVote)?.sigla ?? "tu partido"}.
                    Esto te permite elegir qué candidatos específicos prefieres.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs font-bold text-blue-700 mb-1 block">Preferencial 1</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    placeholder="N.°"
                    value={activeSection === "senadores" ? ballot.preferencialSenadores.first : ballot.preferencialDiputados.first}
                    onChange={(e) => handlePreferencial(activeSection as "senadores" | "diputados", "first", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-blue-200 text-center text-lg font-bold text-blue-800 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-blue-700 mb-1 block">Preferencial 2</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    placeholder="N.°"
                    value={activeSection === "senadores" ? ballot.preferencialSenadores.second : ballot.preferencialDiputados.second}
                    onChange={(e) => handlePreferencial(activeSection as "senadores" | "diputados", "second", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-blue-200 text-center text-lg font-bold text-blue-800 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              <Tooltip text="El voto preferencial te permite elegir a los candidatos específicos que prefieres dentro de la lista de tu partido. Si no lo marcas, tu voto igual cuenta para el partido.">
                <p className="text-xs text-blue-500 mt-2 cursor-help underline decoration-dotted">¿Qué es el voto preferencial?</p>
              </Tooltip>
            </div>
          )}

          {/* Voto Nulo Education */}
          <div className="border-t-2 border-gray-300 bg-red-50 px-4 py-3">
            <button
              onClick={() => setShowNuloWarning(!showNuloWarning)}
              className="flex items-center gap-2 text-sm w-full text-left"
            >
              <span className="text-red-500">🚫</span>
              <span className="font-bold text-red-700 text-xs">¿Qué es un VOTO NULO?</span>
              <span className="text-red-400 ml-auto text-xs">{showNuloWarning ? "▲" : "▼"}</span>
            </button>
            {showNuloWarning && (
              <div className="mt-2 text-xs text-red-700 space-y-1 animate-fade-in">
                <p>Tu voto es <strong>NULO</strong> si:</p>
                <ul className="list-disc ml-4 space-y-0.5">
                  <li>Marcas <strong>más de un</strong> candidato/partido en la misma sección</li>
                  <li>Escribes palabras, dibujos o marcas adicionales en la cédula</li>
                  <li>La marca no es clara o cubre múltiples casillas</li>
                </ul>
                <p className="mt-1 font-bold">En este simulador, solo puedes marcar 1 opción por sección (como debe ser).</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {currentIdx > 0 && (
            <button
              onClick={goPrev}
              className="flex-1 btn-ghost bg-white border border-gray-200 py-3 rounded-xl font-semibold text-gray-600"
            >
              ← {sections[currentIdx - 1] === "presidente" ? "Presidente" : sections[currentIdx - 1] === "senadores" ? "Senadores" : "Diputados"}
            </button>
          )}

          {currentIdx < 2 ? (
            <button
              onClick={goNext}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                currentVote !== null
                  ? "btn-primary"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentVote === null}
            >
              Siguiente: {sections[currentIdx + 1] === "senadores" ? "Senadores" : "Diputados"} →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all active:scale-95 shadow-card"
            >
              ✅ Ver resultados de mi voto
            </button>
          )}
        </div>

        {/* Quick info banner */}
        <div className="mt-4 bg-white rounded-xl p-4 shadow-subtle flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <p className="text-xs font-bold text-secondary mb-0.5">Recuerda</p>
            <p className="text-xs text-gray-600">
              {activeSection === "presidente"
                ? "Puedes votar por un presidente de un partido y senadores/diputados de otro. ¡Es completamente válido!"
                : activeSection === "senadores"
                  ? "El Senado regresa después de 36 años. Los 60 senadores se eligen en distrito nacional único."
                  : "Los 130 diputados se eligen por distrito electoral. Usa el voto preferencial para elegir a tus favoritos."
              }
            </p>
          </div>
        </div>

        {/* Progress summary */}
        <div className="mt-4 mb-8 bg-white rounded-xl p-4 shadow-subtle">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tu progreso</p>
          <div className="flex gap-2">
            {sections.map((sec) => {
              const hasVote = ballot[sec] !== null;
              const label = sec === "presidente" ? "Pres." : sec === "senadores" ? "Sen." : "Dip.";
              return (
                <div
                  key={sec}
                  className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all ${
                    hasVote
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {hasVote ? "✓ " : ""}{label}
                </div>
              );
            })}
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-gold h-full rounded-full transition-all duration-500"
              style={{ width: `${(([ballot.presidente, ballot.senadores, ballot.diputados].filter((v) => v !== null).length) / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Fact overlay */}
      {showFact && <FactBubble fact={showFact} onClose={() => setShowFact(null)} />}
    </div>
  );
}
