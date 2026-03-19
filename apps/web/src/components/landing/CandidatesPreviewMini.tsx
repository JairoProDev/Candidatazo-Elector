"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";
import { LiveSearchInput } from "@/components/ui/LiveSearchInput";

type SortOption =
  | "rank"
  | "name-asc"
  | "name-desc"
  | "antivote-asc"
  | "digital-desc";

export function CandidatesPreviewMini() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [showEnum, setShowEnum] = useState(true);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = OFFICIAL_CANDIDATES_2026.filter((c) => {
      if (!q) return true;
      return c.name.toLowerCase().includes(q) || c.party.toLowerCase().includes(q);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "rank") return a.rank - b.rank;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "antivote-asc") return a.antiVote - b.antiVote;
      return b.digitalAgendaScore - a.digitalAgendaScore;
    });
  }, [query, sortBy]);

  const top = results.slice(0, 8);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto] items-end">
        <div className="min-w-0">
          <LiveSearchInput
            id="landing-candidate-search"
            label="Buscar candidato o partido"
            placeholder="Ej: Keiko, APP, Renovación..."
            value={query}
            onChange={(v) => setQuery(v)}
            onClear={() => setQuery("")}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-extrabold text-gray-800 whitespace-nowrap">
            Enumerar
          </label>
          <button
            type="button"
            aria-pressed={showEnum}
            onClick={() => setShowEnum((s) => !s)}
            className={[
              "inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-extrabold transition-colors",
              showEnum ? "bg-primary-50 border-primary-200 text-primary" : "bg-white border-gray-200 text-gray-800 hover:border-primary-200 hover:text-primary",
            ].join(" ")}
          >
            {showEnum ? "Sí" : "No"}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-sm font-extrabold text-gray-900">Top resultados</div>
            <div className="text-xs text-gray-500">
              {results.length} candidatos coinciden
            </div>
          </div>
          <div>
            <label className="sr-only" htmlFor="landing-candidate-sort">
              Ordenar por
            </label>
            <select
              id="landing-candidate-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="rank"># oficial</option>
              <option value="name-asc">Nombre (A-Z)</option>
              <option value="name-desc">Nombre (Z-A)</option>
              <option value="antivote-asc">Antivoto (menor)</option>
              <option value="digital-desc">Digital (mayor)</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {top.map((c) => (
            <Link
              key={c.slug}
              href={`/candidatos/${c.slug}`}
              className={[
                "group rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:border-primary-200",
                "bg-gradient-to-b from-white to-gray-50",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-gray-900 truncate">
                    {showEnum ? `#${c.rank} · ` : ""}
                    {c.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 truncate">{c.party}</div>
                </div>
                <div
                  className="shrink-0 w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-xs font-extrabold text-primary">#{c.rank}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-[11px] font-extrabold rounded-full bg-white/80 border border-gray-100 px-2 py-1 text-gray-700">
                  antivoto {c.antiVote}%
                </span>
                <span className="text-[11px] font-extrabold rounded-full bg-white/80 border border-gray-100 px-2 py-1 text-gray-700">
                  digital {c.digitalAgendaScore}/100
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center md:justify-start">
        <Link
          href="/candidatos"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-3 px-5 rounded-xl hover:bg-primary-600 transition-colors"
        >
          Ver tablero completo
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

