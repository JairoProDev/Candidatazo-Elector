"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ELECTION_CHESS_2026 } from "@/lib/data/electionChess2026";
import { ELECTION_2026_CONTEXT, INSIDER_INSIGHTS_2026 } from "@/lib/data/candidates2026";
import { LiveSearchInput } from "@/components/ui/LiveSearchInput";

export function AnalisisPreviewMini() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ELECTION_CHESS_2026;
    return ELECTION_CHESS_2026.filter((sec) => {
      const haystack = [
        sec.title,
        sec.summary ?? "",
        ...(sec.bullets ?? []),
        sec.body ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(s);
    });
  }, [q]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-gray-900">Análisis 2026 (preview)</div>
            <div className="text-xs text-gray-500 mt-1">
              Mini-tablero: busca una idea y expande el bloque.
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wide">
              Contexto
            </div>
            <div className="text-sm font-extrabold text-primary">
              {ELECTION_2026_CONTEXT.totalCandidates} candidatos
            </div>
          </div>
        </div>

        <div className="mt-4">
          <LiveSearchInput
            id="landing-analisis-search"
            label="Buscar dentro del tablero"
            placeholder="Ej: antivoto, cisne negro, bicameralidad..."
            value={q}
            onChange={setQ}
            onClear={() => setQ("")}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <div className="text-sm font-extrabold text-gray-900">Insider insights</div>
        <div className="text-xs text-gray-500 mt-1 leading-relaxed">
          {INSIDER_INSIGHTS_2026[0]}
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {INSIDER_INSIGHTS_2026.slice(0, 4).map((t) => (
            <div key={t} className="rounded-2xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-700 leading-relaxed">
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-extrabold text-gray-900">Tablero de ajedrez 2026</div>
          <div className="text-xs text-gray-500">{filtered.length} bloques</div>
        </div>

        <div className="mt-4 space-y-3">
          {filtered.map((sec) => (
            <details key={sec.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 group">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-extrabold text-gray-900">{sec.title}</span>
                  <span className="text-xs font-bold text-primary group-open:rotate-180 transition-transform">
                    +/-
                  </span>
                </div>
                {sec.summary && <div className="text-xs text-gray-600 mt-2">{sec.summary}</div>}
              </summary>
              {sec.body && (
                <div className="mt-3 text-sm text-gray-700 leading-relaxed">{sec.body}</div>
              )}
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

        <div className="mt-4 flex items-center justify-center md:justify-start">
          <Link
            href="/analisis-2026"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-3 px-5 rounded-xl hover:bg-primary-600 transition-colors"
          >
            Abrir análisis completo
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

