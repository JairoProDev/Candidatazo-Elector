"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";

export function CedulaPreviewMini() {
  const [pickMode, setPickMode] = useState<1 | 2>(1);
  const [firstSlug, setFirstSlug] = useState(OFFICIAL_CANDIDATES_2026[0]?.slug ?? "");
  const [secondSlug, setSecondSlug] = useState(OFFICIAL_CANDIDATES_2026[1]?.slug ?? "");

  const first = useMemo(
    () => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === firstSlug) ?? OFFICIAL_CANDIDATES_2026[0],
    [firstSlug],
  );
  const second = useMemo(
    () => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === secondSlug) ?? OFFICIAL_CANDIDATES_2026[1],
    [secondSlug],
  );

  const voteIsNull = pickMode === 2;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-gray-900">Cédula (preview interactivo)</div>
          <div className="text-xs text-gray-500 mt-1">
            Entiende la regla clave: marcar más de un candidato presidencial = voto nulo.
          </div>
        </div>
        <Link
          href="/cedula"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
        >
          Abrir simulador <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
            ¿Cuántos candidatos presidenciales marcas?
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[1, 2].map((n) => {
              const pressed = pickMode === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPickMode(n as 1 | 2)}
                  className={[
                    "text-xs font-extrabold px-3 py-2 rounded-xl border transition-colors",
                    pressed
                      ? "bg-primary text-white border-primary"
                      : "bg-white border-gray-200 text-gray-900 hover:border-primary-200 hover:text-primary",
                  ].join(" ")}
                >
                  {n} candidato{n === 1 ? "" : "s"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
            Alertas instantáneas
          </div>
          <div className="mt-3">
            {voteIsNull ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                <div className="text-sm font-extrabold text-red-800">
                  VOTO NULO detectado
                </div>
                <div className="mt-1 text-xs text-red-700 leading-relaxed">
                  Si marcas más de un candidato presidencial, tu voto es nulo.
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="text-sm font-extrabold text-emerald-800">
                  Diseño válido
                </div>
                <div className="mt-1 text-xs text-emerald-700 leading-relaxed">
                  Estás marcando un solo candidato presidencial.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-extrabold text-gray-900" htmlFor="cedula-first">
            Candidato 1
          </label>
          <select
            id="cedula-first"
            value={firstSlug}
            onChange={(e) => setFirstSlug(e.target.value)}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
          >
            {OFFICIAL_CANDIDATES_2026.slice(0, 18).map((c) => (
              <option key={c.slug} value={c.slug}>
                #{c.rank} · {c.name}
              </option>
            ))}
          </select>
          <div className="mt-2 text-xs text-gray-500">
            (Mostrando 18 para mantener la landing liviana)
          </div>
        </div>

        <div>
          <label className="text-sm font-extrabold text-gray-900" htmlFor="cedula-second">
            Candidato 2 (solo si eliges 2)
          </label>
          <select
            id="cedula-second"
            value={secondSlug}
            onChange={(e) => setSecondSlug(e.target.value)}
            disabled={pickMode === 1}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {OFFICIAL_CANDIDATES_2026.slice(0, 18).map((c) => (
              <option key={c.slug} value={c.slug}>
                #{c.rank} · {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
          Resumen
        </div>
        <div className="mt-2 text-sm font-extrabold text-gray-900">
          {voteIsNull ? (
            <>
              Marcaste 2 candidatos: <span className="text-red-700">voto nulo</span>.
            </>
          ) : (
            <>
              Voto válido para <span className="text-primary">{first.name}</span>.
            </>
          )}
        </div>
      </div>
    </div>
  );
}

