"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DIMENSION_CONFIG } from "@candidatazo/types";
import type { Dimension } from "@candidatazo/types";
import {
  ELECTION_2026_CONTEXT,
  INSIDER_INSIGHTS_2026,
  OFFICIAL_CANDIDATES_2026,
} from "@/lib/data/candidates2026";
import { ELECTION_CHESS_2026 } from "@/lib/data/electionChess2026";
import { LiveSearchInput } from "@/components/ui/LiveSearchInput";

type SortOption =
  | "rank"
  | "name-asc"
  | "name-desc"
  | "party-asc"
  | "truth-desc"
  | "antivote-asc"
  | "digital-desc";

type ContinuityFilter = "all" | "continuidad" | "disrupcion" | "mixto";
type LegalRiskFilter = "all" | "bajo" | "medio" | "alto";
type StatusFilter = "all" | "estable" | "incierta";

export default function CandidatosPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [showEnumeration, setShowEnumeration] = useState(true);
  const [continuityFilter, setContinuityFilter] = useState<ContinuityFilter>("all");
  const [legalRiskFilter, setLegalRiskFilter] = useState<LegalRiskFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [maxAntiVote, setMaxAntiVote] = useState(100);
  const [minDigitalScore, setMinDigitalScore] = useState(0);

  const filtered = useMemo(
    () =>
      OFFICIAL_CANDIDATES_2026.filter((candidate) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          candidate.name.toLowerCase().includes(q) ||
          candidate.party.toLowerCase().includes(q);

        const matchesContinuity =
          continuityFilter === "all" || candidate.continuityBlock === continuityFilter;
        const matchesRisk = legalRiskFilter === "all" || candidate.legalRisk === legalRiskFilter;
        const matchesStatus =
          statusFilter === "all" || candidate.candidacyStatus === statusFilter;
        const matchesAntiVote = candidate.antiVote <= maxAntiVote;
        const matchesDigital = candidate.digitalAgendaScore >= minDigitalScore;

        return (
          matchesQuery &&
          matchesContinuity &&
          matchesRisk &&
          matchesStatus &&
          matchesAntiVote &&
          matchesDigital
        );
      }),
    [
      continuityFilter,
      legalRiskFilter,
      maxAntiVote,
      minDigitalScore,
      query,
      statusFilter,
    ],
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (sortBy === "rank") return a.rank - b.rank;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "party-asc") return a.party.localeCompare(b.party);
        if (sortBy === "antivote-asc") return a.antiVote - b.antiVote;
        if (sortBy === "digital-desc") return b.digitalAgendaScore - a.digitalAgendaScore;
        return b.truthScore - a.truthScore;
      }),
    [filtered, sortBy],
  );

  const strategicStats = useMemo(() => {
    const unstable = OFFICIAL_CANDIDATES_2026.filter((c) => c.candidacyStatus === "incierta").length;
    const continuity = OFFICIAL_CANDIDATES_2026.filter((c) => c.continuityBlock === "continuidad").length;
    const disruption = OFFICIAL_CANDIDATES_2026.filter((c) => c.continuityBlock === "disrupcion").length;
    const avgDigital =
      Math.round(
        (OFFICIAL_CANDIDATES_2026.reduce((acc, c) => acc + c.digitalAgendaScore, 0) /
          OFFICIAL_CANDIDATES_2026.length) *
          10,
      ) / 10;
    return { unstable, continuity, disruption, avgDigital };
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Candidatos Presidenciales 2026
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Oferta oficial consolidada al {ELECTION_2026_CONTEXT.dateLabel}. Analiza la
              fragmentacion, filtra por riesgo y detecta oportunidades de segunda vuelta.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ContextCard
            title="Fragmentacion Historica"
            value={`${ELECTION_2026_CONTEXT.totalCandidates} candidaturas`}
            note={ELECTION_2026_CONTEXT.fragmentationNote}
          />
          <ContextCard
            title="Bicameralidad"
            value={`${ELECTION_2026_CONTEXT.bicameralSeats.senate} Senado + ${ELECTION_2026_CONTEXT.bicameralSeats.deputies} Diputados`}
            note="La estrategia presidencial y congresal se desacopla por primera vez en tres decadas."
          />
          <ContextCard
            title="Valla Electoral"
            value={`${ELECTION_2026_CONTEXT.electoralThreshold.votePercent}% o ${ELECTION_2026_CONTEXT.electoralThreshold.congressionalSeats} escanos`}
            note="Se anticipa una masacre de partidos tras la primera vuelta."
          />
          <ContextCard
            title="Cisne Negro"
            value="Ultima semana decisiva"
            note={ELECTION_2026_CONTEXT.blackSwanNote}
          />
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-white border border-primary-100 rounded-2xl p-4 md:p-5">
          <h2 className="text-sm font-extrabold text-gray-900 mb-2">Lectura avanzada (Insider)</h2>
          <ul className="grid gap-2 md:grid-cols-2 text-sm text-gray-700">
            {INSIDER_INSIGHTS_2026.map((insight) => (
              <li key={insight} className="bg-white border border-gray-100 rounded-xl px-3 py-2">
                {insight}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
          <h2 className="text-sm font-extrabold text-gray-900 mb-2">Tablero de Ajedrez 2026</h2>
          <div className="text-sm text-gray-600 leading-relaxed mb-4">
            Usa este bloque como mapa mental para interpretar decisiones bajo alta fragmentación.
          </div>

          <div className="space-y-3">
            {ELECTION_CHESS_2026.map((sec) => (
              <details
                key={sec.title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 group"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-extrabold text-gray-900">{sec.title}</span>
                    <span className="text-xs font-bold text-primary group-open:rotate-180 transition-transform">
                      +/-
                    </span>
                  </div>
                  {sec.summary && (
                    <div className="text-sm text-gray-600 mt-2">{sec.summary}</div>
                  )}
                </summary>

                {sec.body && <p className="mt-3 text-sm text-gray-700 leading-relaxed">{sec.body}</p>}
                {sec.bullets && (
                  <ul className="mt-3 space-y-1.5 text-sm text-gray-700 list-disc pl-5">
                    {sec.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <LiveSearchInput
              id="candidate-search"
              label="Buscar candidato o partido"
              placeholder="Ej: Keiko, APP, Renovacion Popular..."
              value={query}
              onChange={setQuery}
              onClear={() => setQuery("")}
            />

            <div>
              <label className="text-sm font-bold text-gray-900" htmlFor="candidate-sort">
                Ordenar por
              </label>
              <select
                id="candidate-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
              >
                <option value="rank">Orden oficial (#)</option>
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="name-desc">Nombre (Z-A)</option>
                <option value="party-asc">Partido (A-Z)</option>
                <option value="truth-desc">Veracidad (mayor a menor)</option>
                <option value="antivote-asc">Antivoto (menor a mayor)</option>
                <option value="digital-desc">Agenda digital (mayor a menor)</option>
              </select>
            </div>

            <SelectFilter
              id="continuity-filter"
              label="Continuidad vs Disrupcion"
              value={continuityFilter}
              onChange={(value) => setContinuityFilter(value as ContinuityFilter)}
              options={[
                { value: "all", label: "Todos" },
                { value: "continuidad", label: "Continuidad" },
                { value: "disrupcion", label: "Disrupcion" },
                { value: "mixto", label: "Mixto" },
              ]}
            />

            <SelectFilter
              id="risk-filter"
              label="Riesgo legal"
              value={legalRiskFilter}
              onChange={(value) => setLegalRiskFilter(value as LegalRiskFilter)}
              options={[
                { value: "all", label: "Todos" },
                { value: "bajo", label: "Bajo" },
                { value: "medio", label: "Medio" },
                { value: "alto", label: "Alto" },
              ]}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3 mt-4">
            <SelectFilter
              id="status-filter"
              label="Estado de candidatura"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as StatusFilter)}
              options={[
                { value: "all", label: "Todos" },
                { value: "estable", label: "Estable" },
                { value: "incierta", label: "Incierta" },
              ]}
            />

            <RangeFilter
              id="antivote-filter"
              label={`Antivoto maximo: ${maxAntiVote}%`}
              value={maxAntiVote}
              min={0}
              max={100}
              onChange={setMaxAntiVote}
            />

            <RangeFilter
              id="digital-filter"
              label={`Agenda digital minima: ${minDigitalScore}`}
              value={minDigitalScore}
              min={0}
              max={100}
              onChange={setMinDigitalScore}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
              <input
                type="checkbox"
                checked={showEnumeration}
                onChange={(e) => setShowEnumeration(e.target.checked)}
              />
              Mostrar numeracion
            </label>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSortBy("rank");
                setShowEnumeration(true);
                setContinuityFilter("all");
                setLegalRiskFilter("all");
                setStatusFilter("all");
                setMaxAntiVote(100);
                setMinDigitalScore(0);
              }}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Limpiar todos los filtros
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Mostrando <span className="font-bold text-gray-900">{sorted.length}</span> de{" "}
            <span className="font-bold text-gray-900">{OFFICIAL_CANDIDATES_2026.length}</span> candidatos.
          </p>

          <div className="mt-3 text-xs text-gray-500">
            Continuidad: <span className="font-semibold">{strategicStats.continuity}</span> | Disrupcion:{" "}
            <span className="font-semibold">{strategicStats.disruption}</span> | Candidaturas inciertas:{" "}
            <span className="font-semibold">{strategicStats.unstable}</span> | Promedio agenda digital:{" "}
            <span className="font-semibold">{strategicStats.avgDigital}</span>
          </div>
        </div>
      </section>

      {/* Candidates grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {sorted.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center mb-6">
            <h3 className="text-lg font-extrabold text-gray-900">Sin resultados con esos filtros</h3>
            <p className="text-sm text-gray-600 mt-2">
              Prueba bajar el antivoto maximo, reducir la agenda digital minima o limpiar filtros.
            </p>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((candidate) => (
            <CandidateCard
              key={candidate.slug}
              candidate={candidate}
              showEnumeration={showEnumeration}
            />
          ))}
        </div>
      </section>

      {/* Tooling quick access */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-r from-primary-50 via-white to-gold-50 border border-primary-100 rounded-2xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">
                Herramientas de decisión 2026
              </h2>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Transforma tu lectura del tablero en decisiones: simula segunda vuelta, compara por pesos, explora oportunidad tech y arma tu watchlist.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/segunda-vuelta"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
              >
                Segunda vuelta
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/comparador-estrategico"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary-200 hover:text-primary text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
              >
                Comparador por pesos
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/radar-oportunidad"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary-200 hover:text-primary text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
              >
                Radar Tech
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/watchlist"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary-200 hover:text-primary text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
              >
                Watchlist
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Quieres saber con quien haces match?
          </h3>
          <p className="text-gray-500 mb-6">
            Completa el ADN Test para comparar tu perfil con todos los candidatos.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/test" className="btn-primary">
              Hacer el ADN Test
            </Link>
            <Link
              href="/analisis-2026"
              className="inline-flex items-center justify-center gap-2 bg-white border border-primary-200 hover:border-primary-300 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
            >
              Ver radar estrategico 2026
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContextCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4">
      <div className="text-xs font-extrabold uppercase tracking-wide text-primary">{title}</div>
      <div className="mt-1 text-lg font-extrabold text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-600 leading-relaxed">{note}</div>
    </div>
  );
}

function SelectFilter({
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
      <label className="text-sm font-bold text-gray-900" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function RangeFilter({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-gray-900">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-primary"
      />
    </div>
  );
}

function CandidateCard({
  candidate,
  showEnumeration,
}: {
  candidate: (typeof OFFICIAL_CANDIDATES_2026)[0];
  showEnumeration: boolean;
}) {
  const dimensions: { key: string; dimension: Dimension }[] = [
    { key: "economic", dimension: "ECONOMIC" },
    { key: "social", dimension: "SOCIAL" },
    { key: "environment", dimension: "ENVIRONMENT" },
    { key: "security", dimension: "SECURITY" },
    { key: "institutional", dimension: "INSTITUTIONAL" },
  ];

  return (
    <Link
      href={`/candidatos/${candidate.slug}`}
      className="card group p-5 cursor-pointer"
    >
      {showEnumeration && (
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary text-xs font-extrabold px-2.5 py-1">
            #{candidate.rank}
          </span>
        </div>
      )}

      {/* Photo + Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <span className="text-2xl font-bold text-primary">
            {candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors truncate">
            {candidate.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{candidate.party}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {candidate.continuityBlock}
            </span>
            <span
              className={[
                "text-[10px] px-2 py-0.5 rounded-full",
                candidate.legalRisk === "alto"
                  ? "bg-red-50 text-red-700"
                  : candidate.legalRisk === "medio"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-emerald-50 text-emerald-700",
              ].join(" ")}
            >
              riesgo {candidate.legalRisk}
            </span>
          </div>
        </div>
      </div>

      {/* Truth Score */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-500">Veracidad:</span>
        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${candidate.truthScore}%`,
              backgroundColor:
                candidate.truthScore > 60
                  ? "#10B981"
                  : candidate.truthScore > 40
                    ? "#F59E0B"
                    : "#EF4444",
            }}
          />
        </div>
        <span className="text-xs font-semibold text-gray-600">
          {candidate.truthScore}%
        </span>
      </div>

      {/* Mini dimension bars */}
      <div className="space-y-2">
        {dimensions.map(({ key, dimension }) => {
          const config = DIMENSION_CONFIG[dimension];
          const score = candidate.positions[key as keyof typeof candidate.positions];
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16 truncate">
                {config.label}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${score}%`,
                    backgroundColor: config.color,
                  }}
                />
              </div>
              <span className="text-[10px] font-medium text-gray-500 w-7 text-right">
                {score}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="text-xs text-gray-400">
          <div>{candidate.promiseCount} propuestas</div>
          <div>antivoto: {candidate.antiVote}%</div>
          <div>agenda digital: {candidate.digitalAgendaScore}/100</div>
        </div>
        <span className="text-xs font-medium text-primary group-hover:underline">
          Ver perfil
        </span>
      </div>
    </Link>
  );
}
