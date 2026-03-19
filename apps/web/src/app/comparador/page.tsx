"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────
   DATOS: Candidatos principales Elecciones Perú 2026
   Fuente: Encuestas IEP, Datum, Ipsos - Marzo 2026
   ────────────────────────────────────────────────────────────────────── */

type Dimension = "economic" | "social" | "environment" | "security" | "institutional";

interface Candidate {
  id: string;
  name: string;
  party: string;
  age: number;
  color: string;
  pollPercentage: number;
  antiVote: number;
  truthScore: number;
  judicialCases: number;
  judicialDetail: string;
  bio: string;
  positions: Record<Dimension, number>;
  proposals: string[];
}

const DIMENSION_LABELS: Record<Dimension, string> = {
  economic: "Economía",
  social: "Social",
  environment: "Medio Ambiente",
  security: "Seguridad",
  institutional: "Institucional",
};

const DIMENSION_COLORS: Record<Dimension, string> = {
  economic: "#2563EB",
  social: "#D946EF",
  environment: "#059669",
  security: "#DC2626",
  institutional: "#D97706",
};

const CANDIDATES: Candidate[] = [
  {
    id: "lopez-aliaga",
    name: "Rafael López Aliaga",
    party: "Renovación Popular",
    age: 65,
    color: "#7C3AED",
    pollPercentage: 11.7,
    antiVote: 38.2,
    truthScore: 35,
    judicialCases: 2,
    judicialDetail: "Investigaciones por financiamiento irregular de campañas y presunta evasión tributaria",
    bio: "Empresario del sector ferroviario y alcalde de Lima. Ultraconservador, se define como pro-vida y pro-familia. Propone mano dura y privatizaciones agresivas.",
    positions: { economic: 85, social: 15, environment: 25, security: 80, institutional: 30 },
    proposals: [
      "Privatizar Petroperú y empresas estatales deficitarias",
      "Pena de muerte para violadores y sicarios",
      "Reducir ministerios de 19 a 12",
      "Eliminar el impuesto a la renta para MYPES",
      "Militarizar zonas de alta criminalidad",
    ],
  },
  {
    id: "keiko-fujimori",
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    age: 50,
    color: "#FF6B00",
    pollPercentage: 9.4,
    antiVote: 52.1,
    truthScore: 42,
    judicialCases: 4,
    judicialDetail: "Proceso por lavado de activos (caso Odebrecht/cócteles), organización criminal y obstrucción de justicia",
    bio: "Lideresa de Fuerza Popular, hija de Alberto Fujimori. Tres veces candidata presidencial. Pro mercado con enfoque en seguridad ciudadana.",
    positions: { economic: 72, social: 28, environment: 35, security: 85, institutional: 30 },
    proposals: [
      "Bonos Obras por Impuestos para infraestructura",
      "Estado de emergencia permanente en zonas de crimen",
      "Eliminar trabas burocráticas para la inversión",
      "Plan de vivienda popular con subsidios directos",
    ],
  },
  {
    id: "lopez-chau",
    name: "Alfonso López Chau",
    party: "Ahora Nación",
    age: 70,
    color: "#2563EB",
    pollPercentage: 6.8,
    antiVote: 12.5,
    truthScore: 58,
    judicialCases: 0,
    judicialDetail: "Sin procesos judiciales conocidos",
    bio: "Economista y académico. Rector universitario. Propone un modelo económico heterodoxo con planificación estatal e industrialización.",
    positions: { economic: 30, social: 72, environment: 65, security: 45, institutional: 70 },
    proposals: [
      "Banco de Desarrollo Nacional para industrialización",
      "Reforma tributaria progresiva: más impuestos a grandes fortunas",
      "Educación pública gratuita hasta posgrado",
      "Renegociar contratos mineros para mayor canon",
      "Plan Nacional de Ciencia y Tecnología",
    ],
  },
  {
    id: "grozo",
    name: "Wolfgang Grozo",
    party: "Integridad Democrática",
    age: 42,
    color: "#059669",
    pollPercentage: 4.3,
    antiVote: 8.7,
    truthScore: 52,
    judicialCases: 0,
    judicialDetail: "Sin procesos judiciales conocidos",
    bio: "Abogado constitucionalista y outsider político. Creció explosivamente en encuestas desde diciembre. Propone reforma institucional profunda.",
    positions: { economic: 50, social: 60, environment: 70, security: 55, institutional: 90 },
    proposals: [
      "Reforma constitucional parcial (no asamblea constituyente)",
      "Eliminar la inmunidad parlamentaria completamente",
      "Sistema anticorrupción autónomo con dientes",
      "Descentralización real con presupuesto directo a regiones",
    ],
  },
  {
    id: "alvarez",
    name: "Carlos Álvarez",
    party: "País para Todos",
    age: 58,
    color: "#D97706",
    pollPercentage: 3.9,
    antiVote: 10.3,
    truthScore: 48,
    judicialCases: 0,
    judicialDetail: "Sin procesos judiciales conocidos",
    bio: "Comediante, actor y comunicador. Voto oculto significativo (8.9% en simulacro de cédula). Conecta con sectores populares a través del humor.",
    positions: { economic: 45, social: 65, environment: 50, security: 50, institutional: 55 },
    proposals: [
      "Programa 'Perú Digno': salario mínimo a S/1,500",
      "Hospital de primer nivel en cada provincia",
      "Comedores populares gestionados por comunidades",
      "Presupuesto participativo obligatorio en municipios",
    ],
  },
  {
    id: "sanchez",
    name: "Roberto Sánchez",
    party: "Juntos por el Perú",
    age: 55,
    color: "#DC2626",
    pollPercentage: 3.7,
    antiVote: 22.4,
    truthScore: 40,
    judicialCases: 1,
    judicialDetail: "Investigación por presunta gestión de intereses durante el gobierno de Castillo",
    bio: "Exministro de Comercio Exterior. Aliado de la izquierda progresista. Fuerte presencia en la selva y comunidades nativas.",
    positions: { economic: 20, social: 80, environment: 82, security: 35, institutional: 75 },
    proposals: [
      "Nueva Constitución vía referéndum",
      "Nacionalización de recursos estratégicos (gas, litio)",
      "Ley de consulta previa vinculante para pueblos indígenas",
      "Renta básica universal de S/500 para extrema pobreza",
    ],
  },
  {
    id: "acuna",
    name: "César Acuña",
    party: "APP",
    age: 72,
    color: "#7C3AED",
    pollPercentage: 2.7,
    antiVote: 35.8,
    truthScore: 32,
    judicialCases: 3,
    judicialDetail: "Investigaciones por plagio académico, entrega de dinero en campaña y presunta compra de votos",
    bio: "Empresario educativo, fundador de la UCV. Exgobernador de La Libertad. Base fuerte en el norte del Perú.",
    positions: { economic: 60, social: 40, environment: 30, security: 55, institutional: 35 },
    proposals: [
      "Un colegio de calidad en cada distrito",
      "Programa 'Becas Acuña' para 100,000 jóvenes",
      "Carreteras y puentes para conectar el Perú",
      "Agua y desagüe para el 100% de peruanos en 5 años",
    ],
  },
  {
    id: "forsyth",
    name: "George Forsyth",
    party: "Somos Perú",
    age: 42,
    color: "#059669",
    pollPercentage: 1.8,
    antiVote: 18.5,
    truthScore: 44,
    judicialCases: 1,
    judicialDetail: "Investigación por presunto uso irregular de fondos municipales durante alcaldía de La Victoria",
    bio: "Exfutbolista profesional y exalcalde de La Victoria. Perfil joven y mediático. Se presenta como renovación de la política.",
    positions: { economic: 55, social: 55, environment: 50, security: 65, institutional: 50 },
    proposals: [
      "Serenazgo integrado con Policía Nacional",
      "App ciudadana de denuncias en tiempo real",
      "Programa deportivo nacional para jóvenes en riesgo",
      "Simplificación de trámites municipales",
    ],
  },
  {
    id: "antauro",
    name: "Antauro Humala",
    party: "Frente Patriótico",
    age: 61,
    color: "#8B0000",
    pollPercentage: 1.5,
    antiVote: 55.3,
    truthScore: 25,
    judicialCases: 1,
    judicialDetail: "Sentenciado por el Andahuaylazo (2005). Cumplió condena. Sin nuevos procesos abiertos",
    bio: "Exmilitar etnocacerista. Estuvo preso por el Andahuaylazo. Propone refundación radical del Estado y nacionalismo extremo.",
    positions: { economic: 15, social: 20, environment: 40, security: 95, institutional: 90 },
    proposals: [
      "Pena de muerte para corruptos y narcotraficantes",
      "Servicio militar obligatorio",
      "Nacionalización total de minería y gas",
      "Expulsión de inmigrantes ilegales en 90 días",
      "Refundación del Estado mediante Asamblea Constituyente militar",
    ],
  },
  {
    id: "williams",
    name: "José Williams",
    party: "Avanza País",
    age: 72,
    color: "#1E40AF",
    pollPercentage: 1.2,
    antiVote: 28.7,
    truthScore: 46,
    judicialCases: 1,
    judicialDetail: "Investigación por presuntas ejecuciones extrajudiciales durante operativo Chavín de Huántar (archivada)",
    bio: "General retirado, héroe del operativo Chavín de Huántar. Expresidente del Congreso. Perfil conservador y de orden.",
    positions: { economic: 70, social: 30, environment: 35, security: 88, institutional: 45 },
    proposals: [
      "Cadena perpetua sin beneficios para sicarios",
      "Reformar el INPE para cárceles productivas",
      "Zona Económica Especial en cada región",
      "Reactivación de la industria naval y aeronáutica nacional",
    ],
  },
];

const POPULAR_COMPARISONS: [string, string][] = [
  ["lopez-aliaga", "keiko-fujimori"],
  ["lopez-aliaga", "lopez-chau"],
  ["keiko-fujimori", "grozo"],
  ["lopez-chau", "sanchez"],
  ["grozo", "alvarez"],
  ["antauro", "lopez-aliaga"],
];

function getCandidate(id: string): Candidate | undefined {
  return CANDIDATES.find((c) => c.id === id);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ──────────────────────────────────────────────────────────────────────
   COMPONENTES
   ────────────────────────────────────────────────────────────────────── */

function CandidateSelector({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {CANDIDATES.map((c) => {
        const isSelected = selected.includes(c.id);
        const isDisabled = !isSelected && selected.length >= 3;
        return (
          <button
            key={c.id}
            onClick={() => !isDisabled && onToggle(c.id)}
            disabled={isDisabled}
            className={`relative rounded-xl border-2 p-3 text-left transition-all duration-200 ${
              isSelected
                ? "border-white/60 bg-white/10 shadow-lg scale-[1.02]"
                : isDisabled
                  ? "border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed"
                  : "border-white/10 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.08] cursor-pointer"
            }`}
          >
            {isSelected && (
              <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] font-bold text-white">
                {selected.indexOf(c.id) + 1}
              </span>
            )}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
              style={{ backgroundColor: c.color }}
            >
              {getInitials(c.name)}
            </div>
            <p className="text-white text-sm font-semibold leading-tight truncate">{c.name}</p>
            <p className="text-gray-400 text-xs truncate">{c.party}</p>
            <p className="text-gray-500 text-xs mt-1">{c.pollPercentage}%</p>
          </button>
        );
      })}
    </div>
  );
}

function PositionBar({
  label,
  values,
  dimension,
}: {
  label: string;
  values: { value: number; color: string; name: string }[];
  dimension: Dimension;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-300 font-medium">{label}</span>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: DIMENSION_COLORS[dimension] + "30", color: DIMENSION_COLORS[dimension] }}
        >
          {dimension === "economic"
            ? "Izq ← → Der"
            : dimension === "social"
              ? "Conserv ← → Progre"
              : dimension === "environment"
                ? "Extractivo ← → Verde"
                : dimension === "security"
                  ? "Garantista ← → Mano Dura"
                  : "Statu Quo ← → Reforma"}
        </span>
      </div>
      <div className="space-y-1.5">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-24 truncate">{v.name.split(" ").slice(-1)[0]}</span>
            <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                style={{
                  width: `${v.value}%`,
                  backgroundColor: v.color,
                  minWidth: "2rem",
                }}
              >
                <span className="text-[10px] font-bold text-white">{v.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.04] rounded-2xl p-5 md:p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-blue-500" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function AgreementHighlights({ candidates }: { candidates: Candidate[] }) {
  const dimensions: Dimension[] = ["economic", "social", "environment", "security", "institutional"];

  const agreements: { dimension: Dimension; spread: number; avg: number }[] = [];
  const disagreements: { dimension: Dimension; spread: number; avg: number }[] = [];

  dimensions.forEach((dim) => {
    const vals = candidates.map((c) => c.positions[dim]);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const spread = max - min;
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const entry = { dimension: dim, spread, avg };

    if (spread <= 25) {
      agreements.push(entry);
    } else if (spread >= 40) {
      disagreements.push(entry);
    }
  });

  agreements.sort((a, b) => a.spread - b.spread);
  disagreements.sort((a, b) => b.spread - a.spread);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
        <h4 className="text-green-400 font-bold text-sm mb-3">Donde COINCIDEN</h4>
        {agreements.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay coincidencias significativas en estas dimensiones</p>
        ) : (
          <ul className="space-y-2">
            {agreements.map((a) => (
              <li key={a.dimension} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-gray-300 text-sm">
                  {DIMENSION_LABELS[a.dimension]}: posiciones similares (~{Math.round(a.avg)}/100)
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
        <h4 className="text-red-400 font-bold text-sm mb-3">Donde DIFIEREN MAS</h4>
        {disagreements.length === 0 ? (
          <p className="text-gray-400 text-sm">Las diferencias son moderadas en todas las dimensiones</p>
        ) : (
          <ul className="space-y-2">
            {disagreements.map((d) => (
              <li key={d.dimension} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-gray-300 text-sm">
                  {DIMENSION_LABELS[d.dimension]}: diferencia de {d.spread} puntos
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   PAGINA PRINCIPAL
   ────────────────────────────────────────────────────────────────────── */

export default function ComparadorPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [showShareToast, setShowShareToast] = useState(false);
  const [comparisonsMade, setComparisonsMade] = useState(0);

  const selectedCandidates = useMemo(
    () => selected.map((id) => getCandidate(id)).filter(Boolean) as Candidate[],
    [selected]
  );

  const handleToggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      const next = [...prev, id];
      if (next.length >= 2) {
        setXpEarned((x) => x + 25);
        setComparisonsMade((c) => c + 1);
      }
      return next;
    });
  };

  const handlePopularComparison = (ids: [string, string]) => {
    setSelected([...ids]);
    setXpEarned((x) => x + 25);
    setComparisonsMade((c) => c + 1);
  };

  const handleShare = () => {
    const names = selectedCandidates.map((c) => c.name).join(" vs ");
    const text = `Compara a ${names} en Candidatazo - Elecciones Perú 2026`;
    if (navigator.share) {
      navigator.share({ title: "Candidatazo - Comparador", text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const isComparing = selectedCandidates.length >= 2;
  const dimensions: Dimension[] = ["economic", "social", "environment", "security", "institutional"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">&#9878;</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              Comparador de Candidatos
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            Compara lado a lado las posiciones, propuestas y trayectoria de los candidatos presidenciales. Elige 2 o 3 para comenzar.
          </p>

          {/* XP Badge */}
          {xpEarned > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-1.5">
              <span className="text-yellow-400 font-bold text-sm">+{xpEarned} XP</span>
              <span className="text-yellow-400/60 text-xs">
                {comparisonsMade} {comparisonsMade === 1 ? "comparación" : "comparaciones"}
              </span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Popular Comparisons */}
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Comparaciones populares
          </h2>
          <div className="flex flex-wrap gap-2">
            {POPULAR_COMPARISONS.map(([a, b]) => {
              const ca = getCandidate(a);
              const cb = getCandidate(b);
              if (!ca || !cb) return null;
              const lastName = (name: string) => name.split(" ").slice(-1)[0];
              return (
                <button
                  key={`${a}-${b}`}
                  onClick={() => handlePopularComparison([a, b])}
                  className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 rounded-full px-4 py-2 transition-all"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ backgroundColor: ca.color }}
                  >
                    {getInitials(ca.name)}
                  </span>
                  <span className="text-white text-sm font-medium">
                    {lastName(ca.name)} vs {lastName(cb.name)}
                  </span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ backgroundColor: cb.color }}
                  >
                    {getInitials(cb.name)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Candidate Selector */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Selecciona 2-3 candidatos
            </h2>
            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Limpiar selección
              </button>
            )}
          </div>
          <CandidateSelector selected={selected} onToggle={handleToggle} />
          {selected.length === 1 && (
            <p className="text-yellow-400/80 text-sm mt-3">Selecciona al menos 1 candidato más para comparar</p>
          )}
        </section>

        {/* Comparison Content */}
        {isComparing && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Basic Info Cards */}
            <ComparisonSection title="Información básica">
              <div className={`grid gap-4 ${selectedCandidates.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {selectedCandidates.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl p-5 border border-white/10"
                    style={{ backgroundColor: c.color + "15" }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                        style={{ backgroundColor: c.color }}
                      >
                        {getInitials(c.name)}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{c.name}</h3>
                        <p className="text-sm" style={{ color: c.color }}>
                          {c.party}
                        </p>
                        <p className="text-gray-400 text-xs">{c.age} años</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{c.bio}</p>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            {/* Position Comparison */}
            <ComparisonSection title="Posiciones políticas (0-100)">
              <div className="space-y-1">
                {dimensions.map((dim) => (
                  <PositionBar
                    key={dim}
                    label={DIMENSION_LABELS[dim]}
                    dimension={dim}
                    values={selectedCandidates.map((c) => ({
                      value: c.positions[dim],
                      color: c.color,
                      name: c.name,
                    }))}
                  />
                ))}
              </div>
            </ComparisonSection>

            {/* Political Radar (CSS bars) */}
            <ComparisonSection title="Perfil político comparado">
              <div className={`grid gap-6 ${selectedCandidates.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {selectedCandidates.map((c) => (
                  <div key={c.id} className="space-y-3">
                    <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.name}
                    </h4>
                    {dimensions.map((dim) => (
                      <div key={dim} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-20 truncate">{DIMENSION_LABELS[dim]}</span>
                        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${c.positions[dim]}%`,
                              backgroundColor: DIMENSION_COLORS[dim],
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-6 text-right">{c.positions[dim]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </ComparisonSection>

            {/* Key Proposals */}
            <ComparisonSection title="Propuestas clave">
              <div className={`grid gap-4 ${selectedCandidates.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {selectedCandidates.map((c) => (
                  <div key={c.id}>
                    <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.name}
                    </h4>
                    <ul className="space-y-2">
                      {c.proposals.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                          <span className="text-gray-300 text-sm">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            {/* Truth Score */}
            <ComparisonSection title="Puntaje de verdad (fact-checking)">
              <div className={`grid gap-4 ${selectedCandidates.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {selectedCandidates.map((c) => (
                  <div key={c.id} className="text-center">
                    <div
                      className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2 border-4"
                      style={{
                        borderColor: c.truthScore >= 50 ? "#22c55e" : c.truthScore >= 35 ? "#eab308" : "#ef4444",
                        backgroundColor: c.color + "30",
                      }}
                    >
                      {c.truthScore}
                    </div>
                    <p className="text-white text-sm font-semibold">{c.name.split(" ").slice(-1)[0]}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {c.truthScore >= 50 ? "Relativamente confiable" : c.truthScore >= 35 ? "Cuestionable" : "Poco confiable"}
                    </p>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            {/* Poll Numbers */}
            <ComparisonSection title="Números en encuestas">
              <div className={`grid gap-4 ${selectedCandidates.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {selectedCandidates.map((c) => (
                  <div key={c.id} className="text-center p-4 rounded-xl bg-white/[0.03]">
                    <p className="text-3xl font-extrabold text-white mb-1">{c.pollPercentage}%</p>
                    <p className="text-sm text-gray-400 mb-3">Intención de voto</p>
                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(c.pollPercentage / 15) * 100}%`,
                          backgroundColor: c.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            {/* Anti-Vote Comparison */}
            <ComparisonSection title="Anti-voto (rechazo)">
              <div className={`grid gap-4 ${selectedCandidates.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {selectedCandidates.map((c) => (
                  <div key={c.id} className="text-center p-4 rounded-xl bg-white/[0.03]">
                    <p className="text-3xl font-extrabold mb-1" style={{ color: c.antiVote > 40 ? "#ef4444" : c.antiVote > 25 ? "#eab308" : "#22c55e" }}>
                      {c.antiVote}%
                    </p>
                    <p className="text-sm text-gray-400 mb-1">{c.name.split(" ").slice(-1)[0]}</p>
                    <p className="text-xs text-gray-500">
                      {c.antiVote > 40
                        ? '"No votaría por él/ella jamás"'
                        : c.antiVote > 25
                          ? "Rechazo moderado"
                          : "Bajo rechazo - margen de crecimiento"}
                    </p>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full rounded-full bg-red-500/70 transition-all duration-700"
                        style={{ width: `${c.antiVote}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            {/* Judicial Cases */}
            <ComparisonSection title="Casos judiciales">
              <div className={`grid gap-4 ${selectedCandidates.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {selectedCandidates.map((c) => (
                  <div
                    key={c.id}
                    className={`p-4 rounded-xl border ${
                      c.judicialCases === 0
                        ? "border-green-500/20 bg-green-500/5"
                        : c.judicialCases <= 2
                          ? "border-yellow-500/20 bg-yellow-500/5"
                          : "border-red-500/20 bg-red-500/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-2xl font-bold ${
                          c.judicialCases === 0 ? "text-green-400" : c.judicialCases <= 2 ? "text-yellow-400" : "text-red-400"
                        }`}
                      >
                        {c.judicialCases}
                      </span>
                      <div>
                        <p className="text-white text-sm font-semibold">{c.name.split(" ").slice(-1)[0]}</p>
                        <p className="text-xs text-gray-400">
                          {c.judicialCases === 0
                            ? "proceso(s)"
                            : c.judicialCases === 1
                              ? "proceso"
                              : "procesos"}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{c.judicialDetail}</p>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            {/* Agreement/Disagreement */}
            <ComparisonSection title="Acuerdos y desacuerdos">
              <AgreementHighlights candidates={selectedCandidates} />
            </ComparisonSection>

            {/* CTAs */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Quiz CTA */}
              <Link
                href="/quiz"
                className="block bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 hover:from-purple-500 hover:to-blue-500 transition-all group"
              >
                <h3 className="text-white font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
                  ¿Con quién haces más match?
                </h3>
                <p className="text-white/70 text-sm">
                  Toma nuestro quiz de 10 preguntas y descubre qué candidato se alinea más con tus ideas.
                </p>
                <span className="inline-block mt-3 text-white font-semibold text-sm">
                  Hacer el quiz →
                </span>
              </Link>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.1] transition-all text-left"
              >
                <h3 className="text-white font-bold text-lg mb-2">Compartir comparación</h3>
                <p className="text-gray-400 text-sm">
                  Compara a {selectedCandidates.map((c) => c.name.split(" ").slice(-1)[0]).join(" vs ")} en Candidatazo
                </p>
                <span className="inline-block mt-3 text-purple-400 font-semibold text-sm">
                  Copiar enlace
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isComparing && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-30">&#9878;</div>
            <h3 className="text-white text-xl font-bold mb-2">Selecciona candidatos para comparar</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Elige 2 o 3 candidatos de la lista de arriba, o prueba una de las comparaciones populares.
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center pt-4 pb-12">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl z-50 animate-bounce">
          Enlace copiado al portapapeles
        </div>
      )}
    </div>
  );
}
