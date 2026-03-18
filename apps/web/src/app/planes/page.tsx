"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────
   DATA: Planes de Gobierno - Elecciones Peru 2026
   Los PDFs van en /public/planes/ con nombres slug
   ────────────────────────────────────────────────────────────────────── */

interface PlanDeGobierno {
  id: string;
  numero: number;
  partido: string;
  candidato: string;
  /** Slug filename without extension, e.g. "ahora-nacion" -> /planes/ahora-nacion.pdf */
  slug: string;
  color: string;
  siglas: string;
  /** Approximate page count for UI display */
  paginas: number;
  /** PDF size in KB */
  sizeKB: number;
  disponible: boolean;
  temas: string[];
}

const PLANES: PlanDeGobierno[] = [
  { id: "ahora-nacion", numero: 1, partido: "Ahora Nacion", candidato: "Alfonso Lopez Chau Nava", slug: "ahora-nacion", color: "#2563EB", siglas: "AN", paginas: 180, sizeKB: 2031, disponible: true, temas: ["Economia", "Educacion", "Industria"] },
  { id: "alianza-electoral-venceremos", numero: 2, partido: "Alianza Electoral Venceremos", candidato: "Ronald Darwin Atencio Sotomayor", slug: "alianza-electoral-venceremos", color: "#7C3AED", siglas: "AEV", paginas: 75, sizeKB: 859, disponible: true, temas: ["Social", "Seguridad"] },
  { id: "alianza-para-el-progreso", numero: 3, partido: "Alianza para el Progreso", candidato: "Cesar Acuna Peralta", slug: "alianza-para-el-progreso", color: "#2563EB", siglas: "APP", paginas: 70, sizeKB: 834, disponible: true, temas: ["Educacion", "Infraestructura"] },
  { id: "avanza-pais", numero: 4, partido: "Avanza Pais - Partido de Integracion Social", candidato: "Jose Williams Zapata", slug: "avanza-pais", color: "#1E40AF", siglas: "AP", paginas: 100, sizeKB: 1177, disponible: true, temas: ["Seguridad", "Economia"] },
  { id: "fuerza-popular", numero: 5, partido: "Fuerza Popular", candidato: "Keiko Fujimori Higuchi", slug: "fuerza-popular", color: "#FF6B00", siglas: "FP", paginas: 200, sizeKB: 2343, disponible: true, temas: ["Seguridad", "Economia", "Social"] },
  { id: "fuerza-y-libertad", numero: 6, partido: "Fuerza y Libertad", candidato: "Fiorella Giannina Molinelli Aristondo", slug: "fuerza-y-libertad", color: "#DC2626", siglas: "FyL", paginas: 150, sizeKB: 1705, disponible: true, temas: ["Libertad economica", "Reforma"] },
  { id: "juntos-por-el-peru", numero: 7, partido: "Juntos por el Peru", candidato: "Roberto Helbert Sanchez Palomino", slug: "juntos-por-el-peru", color: "#DC2626", siglas: "JP", paginas: 105, sizeKB: 1233, disponible: true, temas: ["Social", "Medio ambiente", "Pueblos indigenas"] },
  { id: "libertad-popular", numero: 8, partido: "Libertad Popular", candidato: "Rafael Jorge Belaunde Llosa", slug: "libertad-popular", color: "#059669", siglas: "LP", paginas: 110, sizeKB: 1246, disponible: true, temas: ["Institucional", "Economia"] },
  { id: "partido-aprista", numero: 9, partido: "Partido Aprista Peruano", candidato: "Pitter Enrique Valderrama Pena", slug: "partido-aprista", color: "#DC2626", siglas: "APRA", paginas: 65, sizeKB: 777, disponible: true, temas: ["Social", "Economia", "Justicia"] },
  { id: "civico-obras", numero: 10, partido: "Partido Civico Obras", candidato: "Ricardo Pablo Belmont Cassinelli", slug: "civico-obras", color: "#D97706", siglas: "PCO", paginas: 10, sizeKB: 102, disponible: true, temas: ["Infraestructura"] },
  { id: "buen-gobierno", numero: 12, partido: "Partido del Buen Gobierno", candidato: "Jorge Nieto Montesinos", slug: "buen-gobierno", color: "#7C3AED", siglas: "PBG", paginas: 95, sizeKB: 1123, disponible: true, temas: ["Institucional", "Reforma"] },
  { id: "democrata-unido", numero: 13, partido: "Partido Democrata Unido Peru", candidato: "Charlie Carrasco Salazar", slug: "democrata-unido", color: "#2563EB", siglas: "PDU", paginas: 15, sizeKB: 181, disponible: true, temas: ["Democracia"] },
  { id: "democrata-verde", numero: 14, partido: "Partido Democrata Verde", candidato: "Alex Gonzalez Castillo", slug: "democrata-verde", color: "#059669", siglas: "PDV", paginas: 220, sizeKB: 2635, disponible: true, temas: ["Medio ambiente", "Social"] },
  { id: "somos-peru", numero: 16, partido: "Partido Democratico Somos Peru", candidato: "George Patrick Forsyth Sommer", slug: "somos-peru", color: "#059669", siglas: "SP", paginas: 130, sizeKB: 1472, disponible: true, temas: ["Seguridad", "Deporte", "Juventud"] },
  { id: "frente-esperanza", numero: 17, partido: "Partido Frente de la Esperanza 2021", candidato: "Luis Fernando Olivera Vega", slug: "frente-esperanza", color: "#D97706", siglas: "FE", paginas: 40, sizeKB: 476, disponible: true, temas: ["Economia"] },
  { id: "partido-morado", numero: 18, partido: "Partido Morado", candidato: "Mesias Antonio Guevara Amasifuen", slug: "partido-morado", color: "#7C3AED", siglas: "PM", paginas: 215, sizeKB: 2570, disponible: true, temas: ["Institucional", "Educacion", "Tecnologia"] },
  { id: "pais-para-todos", numero: 19, partido: "Partido Pais para Todos", candidato: "Carlos Gonsalo Alvarez Loayza", slug: "pais-para-todos", color: "#D97706", siglas: "PPT", paginas: 75, sizeKB: 874, disponible: true, temas: ["Social", "Salud"] },
  { id: "patriotico-del-peru", numero: 20, partido: "Partido Patriotico del Peru", candidato: "Herbert Caller Gutierrez", slug: "patriotico-del-peru", color: "#8B0000", siglas: "PPP", paginas: 35, sizeKB: 405, disponible: true, temas: ["Seguridad", "Nacional"] },
  { id: "cooperacion-popular", numero: 21, partido: "Partido Politico Cooperacion Popular", candidato: "Yonhy Lescano Ancieta", slug: "cooperacion-popular", color: "#2563EB", siglas: "CP", paginas: 40, sizeKB: 472, disponible: true, temas: ["Social", "Agricultura"] },
  { id: "integridad-democratica", numero: 23, partido: "Partido Politico Integridad Democratica", candidato: "Wolfgang Mario Grozo Costa", slug: "integridad-democratica", color: "#059669", siglas: "ID", paginas: 160, sizeKB: 1822, disponible: true, temas: ["Institucional", "Anticorrupcion", "Descentralizacion"] },
  { id: "peru-libre", numero: 24, partido: "Partido Politico Nacional Peru Libre", candidato: "Vladimir Roy Cerron Rojas", slug: "peru-libre", color: "#DC2626", siglas: "PL", paginas: 60, sizeKB: 697, disponible: true, temas: ["Social", "Nacionalizacion"] },
  { id: "peru-accion", numero: 25, partido: "Partido Politico Peru Accion", candidato: "Francisco Ernesto Diez-Canseco Tavara", slug: "peru-accion", color: "#1E40AF", siglas: "PA", paginas: 35, sizeKB: 416, disponible: true, temas: ["Economia", "Reforma"] },
  { id: "peru-primero", numero: 26, partido: "Partido Politico Peru Primero", candidato: "Mario Enrique Vizcarra Cornejo", slug: "peru-primero", color: "#D97706", siglas: "PP", paginas: 260, sizeKB: 3086, disponible: true, temas: ["Economia", "Infraestructura", "Educacion"] },
  { id: "prin", numero: 27, partido: "Partido Politico PRIN", candidato: "Walter Gilmer Chirinos Purizaga", slug: "prin", color: "#7C3AED", siglas: "PRIN", paginas: 35, sizeKB: 418, disponible: true, temas: ["Social"] },
  { id: "si-creo", numero: 28, partido: "Partido SiCreo", candidato: "Carlos Espa Y Garces-Alvear", slug: "si-creo", color: "#059669", siglas: "SC", paginas: 37, sizeKB: 430, disponible: true, temas: ["Economia", "Innovacion"] },
  { id: "peru-moderno", numero: 29, partido: "Peru Moderno", candidato: "Carlos Ernesto Jaico Carranza", slug: "peru-moderno", color: "#2563EB", siglas: "PMo", paginas: 45, sizeKB: 520, disponible: true, temas: ["Tecnologia", "Modernizacion"] },
  { id: "podemos-peru", numero: 30, partido: "Podemos Peru", candidato: "Jose Luna Galvez", slug: "podemos-peru", color: "#7C3AED", siglas: "PdP", paginas: 320, sizeKB: 3872, disponible: true, temas: ["Educacion", "Infraestructura", "Social"] },
  { id: "progresemos", numero: 32, partido: "Progresemos", candidato: "Paul Davis Jaimes Blanco", slug: "progresemos", color: "#059669", siglas: "PRO", paginas: 85, sizeKB: 992, disponible: true, temas: ["Economia", "Reforma"] },
  { id: "renovacion-popular", numero: 33, partido: "Renovacion Popular", candidato: "Rafael Lopez Aliaga", slug: "renovacion-popular", color: "#7C3AED", siglas: "RP", paginas: 28, sizeKB: 327, disponible: true, temas: ["Seguridad", "Privatizacion"] },
  { id: "salvemos-al-peru", numero: 34, partido: "Salvemos al Peru", candidato: "Antonio Ortiz Villano", slug: "salvemos-al-peru", color: "#DC2626", siglas: "SAP", paginas: 135, sizeKB: 1581, disponible: true, temas: ["Social", "Seguridad"] },
  { id: "un-camino-diferente", numero: 35, partido: "Un Camino Diferente", candidato: "Rosario del Pilar Fernandez Bazan", slug: "un-camino-diferente", color: "#D97706", siglas: "UCD", paginas: 110, sizeKB: 1282, disponible: true, temas: ["Mujer", "Social", "Educacion"] },
  { id: "unidad-nacional", numero: 36, partido: "Unidad Nacional", candidato: "Roberto Enrique Chiabra Leon", slug: "unidad-nacional", color: "#1E40AF", siglas: "UN", paginas: 110, sizeKB: 1282, disponible: true, temas: ["Seguridad", "Defensa"] },
];

const ALL_TEMAS = Array.from(new Set(PLANES.flatMap((p) => p.temas))).sort();

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

/* ──────────────────────────────────────────────────────────────────────
   PDF VIEWER MODAL
   ────────────────────────────────────────────────────────────────────── */

function PDFViewer({
  plan,
  onClose,
}: {
  plan: PlanDeGobierno;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const pdfUrl = `/planes/${plan.slug}.pdf`;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-gray-950/95 backdrop-blur-sm animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: plan.color }}
          >
            {plan.siglas.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-bold text-sm truncate">
              {plan.partido}
            </h2>
            <p className="text-gray-400 text-xs truncate">
              Plan de Gobierno - {plan.candidato}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-gray-500 text-xs hidden sm:inline">
            ~{plan.paginas} pags | {formatSize(plan.sizeKB)}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 relative">
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-950 z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white font-medium">Cargando plan de gobierno...</p>
              <p className="text-gray-500 text-sm mt-1">{formatSize(plan.sizeKB)}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-950 z-10">
            <div className="text-center max-w-md px-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-white font-bold text-lg mb-2">PDF no disponible aun</p>
              <p className="text-gray-400 text-sm">
                Este plan de gobierno se esta cargando al repositorio. Vuelve pronto para revisarlo.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Volver a la lista
              </button>
            </div>
          </div>
        )}

        {/*
          Embed PDF using iframe.
          #toolbar=0&navpanes=0 hides Chrome's default download toolbar.
          The contextmenu is disabled to discourage right-click save.
        */}
        <iframe
          ref={iframeRef}
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
          className="w-full h-full border-0"
          title={`Plan de Gobierno - ${plan.partido}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          style={{ display: error ? "none" : "block" }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* Bottom hint bar (mobile) */}
      <div className="sm:hidden bg-gray-900 border-t border-white/10 px-4 py-2 text-center shrink-0">
        <p className="text-gray-500 text-xs">
          Desliza para leer | Pellizca para hacer zoom
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   PLAN CARD
   ────────────────────────────────────────────────────────────────────── */

function PlanCard({
  plan,
  onOpen,
}: {
  plan: PlanDeGobierno;
  onOpen: (plan: PlanDeGobierno) => void;
}) {
  return (
    <button
      onClick={() => plan.disponible && onOpen(plan)}
      className={`group text-left w-full rounded-2xl border transition-all duration-200 overflow-hidden ${
        plan.disponible
          ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 cursor-pointer hover:-translate-y-1"
          : "border-white/5 bg-white/[0.01] opacity-50 cursor-not-allowed"
      }`}
    >
      {/* Colored top strip */}
      <div className="h-1.5 w-full" style={{ backgroundColor: plan.color }} />

      <div className="p-4">
        {/* Number + Siglas */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md"
            style={{ backgroundColor: plan.color }}
          >
            {plan.numero}
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-bold text-sm leading-tight truncate group-hover:text-white/90">
              {plan.partido}
            </h3>
            <p className="text-gray-500 text-xs truncate">{plan.candidato}</p>
          </div>
        </div>

        {/* Topic pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {plan.temas.slice(0, 3).map((tema) => (
            <span
              key={tema}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 font-medium"
            >
              {tema}
            </span>
          ))}
        </div>

        {/* Footer: size + pages */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              ~{plan.paginas} pags
            </span>
            <span>{formatSize(plan.sizeKB)}</span>
          </div>
          {plan.disponible ? (
            <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              Leer →
            </span>
          ) : (
            <span className="text-xs text-gray-600">Proximamente</span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   STATS BAR
   ────────────────────────────────────────────────────────────────────── */

function StatsBar() {
  const totalPlanes = PLANES.filter((p) => p.disponible).length;
  const totalPages = PLANES.reduce((s, p) => s + p.paginas, 0);
  const totalSizeMB = (PLANES.reduce((s, p) => s + p.sizeKB, 0) / 1024).toFixed(1);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 text-center">
        <p className="text-2xl font-extrabold text-white">{totalPlanes}</p>
        <p className="text-xs text-gray-500">Planes disponibles</p>
      </div>
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 text-center">
        <p className="text-2xl font-extrabold text-white">{totalPages.toLocaleString()}</p>
        <p className="text-xs text-gray-500">Paginas totales</p>
      </div>
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 text-center">
        <p className="text-2xl font-extrabold text-white">{totalSizeMB} MB</p>
        <p className="text-xs text-gray-500">De informacion</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────────────────────── */

export default function PlanesDeGobiernoPage() {
  const [viewingPlan, setViewingPlan] = useState<PlanDeGobierno | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTema, setSelectedTema] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"numero" | "nombre" | "tamano">("numero");

  const filteredPlanes = PLANES.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.partido.toLowerCase().includes(search.toLowerCase()) ||
      p.candidato.toLowerCase().includes(search.toLowerCase());
    const matchesTema = selectedTema === null || p.temas.includes(selectedTema);
    return matchesSearch && matchesTema;
  }).sort((a, b) => {
    if (sortBy === "numero") return a.numero - b.numero;
    if (sortBy === "nombre") return a.partido.localeCompare(b.partido);
    return b.sizeKB - a.sizeKB;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,16,35,0.12),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">&#128214;</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              Planes de Gobierno
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mb-2">
            Lee los planes de gobierno oficiales de los {PLANES.length} partidos
            que presentaron su propuesta al JNE. Todo en un solo lugar, sin
            salir de la plataforma.
          </p>
          <p className="text-gray-500 text-sm">
            Fuente: Jurado Nacional de Elecciones (JNE) | Elecciones Generales 2026
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <StatsBar />

        {/* Educational banner */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">&#128161;</span>
          <div>
            <h3 className="text-blue-400 font-bold text-sm mb-1">
              ¿Por que leer los planes de gobierno?
            </h3>
            <p className="text-gray-300 text-sm">
              Segun el JNE, solo el <strong className="text-white">12%</strong>{" "}
              de los votantes lee el plan de gobierno antes de votar. Leerlos te
              ayuda a comparar propuestas concretas, no solo carisma o promesas
              de campaña. ¡Se parte del 12% informado!
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar por partido o candidato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all text-sm"
            />
          </div>

          {/* Theme filter + sort */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mr-1">
              Tema:
            </span>
            <button
              onClick={() => setSelectedTema(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTema === null
                  ? "bg-primary text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Todos
            </button>
            {ALL_TEMAS.map((tema) => (
              <button
                key={tema}
                onClick={() => setSelectedTema(selectedTema === tema ? null : tema)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTema === tema
                    ? "bg-primary text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {tema}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Ordenar:
            </span>
            {(
              [
                ["numero", "N° de lista"],
                ["nombre", "Nombre"],
                ["tamano", "Tamaño"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  sortBy === key
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-gray-500 hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm">
          Mostrando {filteredPlanes.length} de {PLANES.length} planes
        </p>

        {/* Grid of plans */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPlanes.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onOpen={setViewingPlan} />
          ))}
        </div>

        {filteredPlanes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg font-medium">
              No se encontraron planes con ese filtro
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedTema(null);
              }}
              className="mt-4 text-primary text-sm font-semibold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Missing plans notice */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-bold text-sm mb-2">
            ¿Faltan planes?
          </h3>
          <p className="text-gray-400 text-sm">
            Estamos trabajando en obtener los planes de gobierno de todos los
            partidos. Los numeros 11, 15, 22, y 31 no se encontraron disponibles
            en el JNE al momento de la recopilacion. Si los encuentras,
            ¡compartelos con nosotros!
          </p>
        </div>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/comparador"
            className="block bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 hover:from-purple-500 hover:to-blue-500 transition-all group"
          >
            <h3 className="text-white font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
              Compara candidatos
            </h3>
            <p className="text-white/70 text-sm">
              ¿Ya leiste los planes? Compara las posiciones de los candidatos
              lado a lado en nuestro comparador interactivo.
            </p>
            <span className="inline-block mt-3 text-white font-semibold text-sm">
              Ir al comparador →
            </span>
          </Link>
          <Link
            href="/quiz"
            className="block bg-white/[0.06] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.1] transition-all group"
          >
            <h3 className="text-white font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
              ¿Con quien haces mas match?
            </h3>
            <p className="text-gray-400 text-sm">
              Responde 10 preguntas y descubre que candidato se alinea mas con
              tus ideas politicas.
            </p>
            <span className="inline-block mt-3 text-purple-400 font-semibold text-sm">
              Hacer el quiz →
            </span>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center pt-4 pb-12">
          <Link
            href="/"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {viewingPlan && (
        <PDFViewer plan={viewingPlan} onClose={() => setViewingPlan(null)} />
      )}
    </div>
  );
}
