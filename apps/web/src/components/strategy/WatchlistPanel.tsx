"use client";

import { useEffect, useMemo, useState } from "react";
import { OFFICIAL_CANDIDATES_2026, type Candidate2026ListItem } from "@/lib/data/candidates2026";
import { useLocalStorageState } from "@/components/hooks/useLocalStorageState";
import Link from "next/link";
import type { CandidateDimension } from "@/lib/data/candidates2026";

const STORAGE_KEY = "candidatos2026:watchlist";
const STORAGE_KEY_SNAPSHOT = "candidatos2026:watchlist:snapshot";

type MetricSnapshot = {
  legalRisk: Candidate2026ListItem["legalRisk"];
  candidacyStatus: Candidate2026ListItem["candidacyStatus"];
  digitalAgendaScore: number;
  antiVote: number;
};

type AlertEvent = {
  slug: string;
  name: string;
  party: string;
  metric: string;
  from: string;
  to: string;
};

function formatRisk(risk: Candidate2026ListItem["legalRisk"]) {
  if (risk === "alto") return "Alto";
  if (risk === "medio") return "Medio";
  return "Bajo";
}

export default function WatchlistPanel() {
  const [watchSlugs, setWatchSlugs] = useLocalStorageState<string[]>(STORAGE_KEY, []);
  const [addSlug, setAddSlug] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [alertEvents, setAlertEvents] = useState<AlertEvent[]>([]);

  const watchCandidates = useMemo(() => {
    const set = new Set(watchSlugs);
    return OFFICIAL_CANDIDATES_2026.filter((c) => set.has(c.slug));
  }, [watchSlugs]);

  const addCandidate = () => {
    if (!addSlug) return;
    setWatchSlugs((prev) => {
      if (prev.includes(addSlug)) return prev;
      return [...prev, addSlug];
    });
    setAddSlug("");
  };

  const removeCandidate = (slug: string) => {
    setWatchSlugs((prev) => prev.filter((s) => s !== slug));
  };

  const clearWatchlist = () => setWatchSlugs([]);

  const copyWatchlist = async () => {
    try {
      const text = watchCandidates
        .map((c) => `#${c.rank} ${c.name} - ${c.party}`)
        .join("\n");
      await navigator.clipboard.writeText(text || "(watchlist vacía)");
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1200);
    } catch {
      // ignore
    }
  };

  const summary = useMemo(() => {
    if (!watchCandidates.length) {
      return null;
    }
    const avgAnti = watchCandidates.reduce((acc, c) => acc + c.antiVote, 0) / watchCandidates.length;
    const avgDigital =
      watchCandidates.reduce((acc, c) => acc + c.digitalAgendaScore, 0) / watchCandidates.length;
    const inciertas = watchCandidates.filter((c) => c.candidacyStatus === "incierta").length;
    return { avgAnti, avgDigital, inciertas };
  }, [watchCandidates]);

  const availableToAdd = useMemo(() => {
    const set = new Set(watchSlugs);
    return OFFICIAL_CANDIDATES_2026.filter((c) => !set.has(c.slug));
  }, [watchSlugs]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const prevRaw = window.localStorage.getItem(STORAGE_KEY_SNAPSHOT);
      const prev = prevRaw ? (JSON.parse(prevRaw) as Record<string, MetricSnapshot>) : {};

      const next: Record<string, MetricSnapshot> = {};
      watchCandidates.forEach((c) => {
        next[c.slug] = {
          legalRisk: c.legalRisk,
          candidacyStatus: c.candidacyStatus,
          digitalAgendaScore: c.digitalAgendaScore,
          antiVote: c.antiVote,
        };
      });

      const events: AlertEvent[] = [];
      watchCandidates.forEach((c) => {
        const p = prev[c.slug];
        if (!p) return;

        if (p.legalRisk !== c.legalRisk) {
          events.push({
            slug: c.slug,
            name: c.name,
            party: c.party,
            metric: "riesgo legal",
            from: p.legalRisk,
            to: c.legalRisk,
          });
        }

        if (p.candidacyStatus !== c.candidacyStatus) {
          events.push({
            slug: c.slug,
            name: c.name,
            party: c.party,
            metric: "estado de candidatura",
            from: p.candidacyStatus,
            to: c.candidacyStatus,
          });
        }

        if (p.digitalAgendaScore !== c.digitalAgendaScore) {
          events.push({
            slug: c.slug,
            name: c.name,
            party: c.party,
            metric: "agenda digital",
            from: String(p.digitalAgendaScore),
            to: String(c.digitalAgendaScore),
          });
        }

        if (p.antiVote !== c.antiVote) {
          events.push({
            slug: c.slug,
            name: c.name,
            party: c.party,
            metric: "antivoto",
            from: String(p.antiVote),
            to: String(c.antiVote),
          });
        }
      });

      setAlertEvents(events);
      window.localStorage.setItem(STORAGE_KEY_SNAPSHOT, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, [watchSlugs]); // trigger cuando cambie watchlist

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Watchlist Estratégica (2026)
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Guarda candidatos que quieres monitorear. Se persiste localmente en tu navegador.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label htmlFor="watch-add" className="text-sm font-extrabold text-gray-900">
              Agregar candidato
            </label>
            <select
              id="watch-add"
              value={addSlug}
              onChange={(e) => setAddSlug(e.target.value)}
              className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="" disabled>
                Selecciona...
              </option>
              {availableToAdd.map((c) => (
                <option key={c.slug} value={c.slug}>
                  #{c.rank} · {c.name} ({c.party})
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={addCandidate}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
          >
            Agregar
            <span aria-hidden="true">+</span>
          </button>
        </div>

        {summary && (
          <div className="mt-4 rounded-2xl bg-primary-50 border border-primary-100 p-4">
            <div className="text-sm font-extrabold text-gray-900">Resumen del portafolio</div>
            <div className="mt-2 text-sm text-gray-700">
              Antivoto promedio: <span className="font-extrabold">{Math.round(summary.avgAnti)}%</span> ·
              Agenda digital promedio: <span className="font-extrabold">{Math.round(summary.avgDigital)}/100</span> ·
              Candidaturas inciertas: <span className="font-extrabold">{summary.inciertas}</span>
            </div>
          </div>
        )}

        <div className="mt-4">
          <div className="text-sm font-extrabold text-gray-900">Alertas (cambios detectados)</div>
          {!watchCandidates.length ? (
            <div className="mt-2 text-sm text-gray-600">
              Agrega candidatos para habilitar el monitoreo.
            </div>
          ) : alertEvents.length ? (
            <div className="mt-2 space-y-2 text-sm text-gray-700">
              {alertEvents.map((e, idx) => (
                <div key={`${e.slug}-${e.metric}-${idx}`} className="rounded-xl bg-white border border-gray-100 p-3">
                  <div className="font-extrabold text-gray-900">
                    {e.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{e.party}</div>
                  <div className="mt-2">
                    {e.metric}: <span className="font-extrabold">{e.from}</span> →{" "}
                    <span className="font-extrabold text-primary">{e.to}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-2 text-sm text-gray-600">
              Sin cambios detectados en tus candidatos vigilados (snapshot actualizado).
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <div className="text-sm font-extrabold text-gray-900">Tu watchlist</div>
        {!watchCandidates.length && (
          <div className="mt-3 text-sm text-gray-600">
            Aún no tienes candidatos guardados. Agrega algunos para comparar escenarios.
          </div>
        )}

        {watchCandidates.length > 0 && (
          <div className="mt-3 space-y-3">
            <div className="flex flex-wrap gap-2 items-center justify-end">
              <button
                type="button"
                onClick={copyWatchlist}
                className="inline-flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl hover:border-primary-200 hover:text-primary transition-colors"
              >
                {copyStatus === "copied" ? "Copiado" : "Copiar lista"}
              </button>
              <button
                type="button"
                onClick={clearWatchlist}
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl hover:border-red-200 hover:text-red-700 transition-colors"
              >
                Vaciar
              </button>
            </div>

            {watchCandidates
              .slice()
              .sort((a, b) => a.antiVote - b.antiVote)
              .map((c) => (
                <div
                  key={c.slug}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-gray-900 truncate">
                      #{c.rank} · {c.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{c.party}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-100 text-gray-700">
                        antivoto {c.antiVote}%
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-100 text-gray-700">
                        digital {c.digitalAgendaScore}/100
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-100 text-gray-700">
                        riesgo {formatRisk(c.legalRisk)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Link
                      href={`/candidatos/${c.slug}`}
                      className="inline-flex items-center justify-center bg-primary text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
                    >
                      Ver
                      <span aria-hidden="true">→</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeCandidate(c.slug)}
                      className="text-xs font-bold text-gray-600 hover:text-red-600"
                      aria-label={`Eliminar ${c.name} de la watchlist`}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

