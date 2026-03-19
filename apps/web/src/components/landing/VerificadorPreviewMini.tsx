"use client";

import { useMemo, useState } from "react";
import type { VerdictType } from "@candidatazo/types";
import { VERDICT_CONFIG } from "@candidatazo/types";

type FactCheckPreview = {
  id: string;
  claim: string;
  candidate: string;
  verdict: VerdictType;
  summary: string;
  explanation: string;
  sources: { title: string; url: string }[];
};

const FACTS: FactCheckPreview[] = [
  {
    id: "fc-001",
    claim: "El 70% de la economía peruana es informal",
    candidate: "Hernando de Soto",
    verdict: "TRUE",
    summary:
      "La informalidad en empleo se ubica en rangos altos según INEI (2023).",
    explanation:
      "Según INEI, el empleo informal alcanza ~72.7% (2023). La afirmación es consistente con fuentes oficiales.",
    sources: [
      { title: "INEI - Estadísticas de empleo informal", url: "https://www.inei.gob.pe" },
      { title: "OIT - Economía informal", url: "https://www.ilo.org" },
    ],
  },
  {
    id: "fc-002",
    claim: "Durante el gobierno de mi padre, la economía creció 7% anual",
    candidate: "Keiko Fujimori",
    verdict: "HALF_TRUE",
    summary:
      "Hay años de crecimiento alto, pero 7% anual promedio resulta exagerado.",
    explanation:
      "El crecimiento promedio en el periodo 1990-2000 se aproxima a 4.5% anual; algunos años superaron el 7% mientras otros fueron negativos.",
    sources: [
      { title: "BCRP - Series históricas de PBI", url: "https://www.bcrp.gob.pe" },
      { title: "Banco Mundial - Perú", url: "https://data.worldbank.org" },
    ],
  },
  {
    id: "fc-004",
    claim: "El 80% de la riqueza del Perú se va al extranjero",
    candidate: "Antauro Humala",
    verdict: "FALSE",
    summary:
      "No hay sustento en indicadores oficiales para la cifra del 80%.",
    explanation:
      "Los reportes oficiales no respaldan el 80%. La cifra real de utilidades repatriadas y efectos macro no alcanza ese orden de magnitud.",
    sources: [
      { title: "BCRP - Balanza de pagos", url: "https://www.bcrp.gob.pe" },
      { title: "ProInversión - IED", url: "https://www.proinversion.gob.pe" },
    ],
  },
  {
    id: "fc-008",
    claim: "La pobreza se redujo a 11% con el modelo económico de la Constitución del 93",
    candidate: "Keiko Fujimori",
    verdict: "MISLEADING",
    summary:
      "La pobreza baja, pero nunca llega a 11% y no se explica solo por la Constitución.",
    explanation:
      "La pobreza en el periodo no alcanza 11%; además el descenso depende de múltiples factores (commodities, políticas sociales y ciclo global).",
    sources: [
      { title: "INEI - Evolución de pobreza", url: "https://www.inei.gob.pe" },
      { title: "Banco Mundial - Perú", url: "https://www.worldbank.org" },
    ],
  },
];

export function VerificadorPreviewMini() {
  const [selectedId, setSelectedId] = useState(FACTS[0]?.id ?? "");
  const [showSources, setShowSources] = useState(false);

  const selected = useMemo(
    () => FACTS.find((f) => f.id === selectedId) ?? FACTS[0],
    [selectedId],
  );

  const verdictConfig = VERDICT_CONFIG[selected.verdict];

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-gray-900">
              Verificador (demo)
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Elige una afirmación y mira el veredicto con fuentes.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowSources((s) => !s)}
            className={[
              "text-xs font-extrabold px-3 py-2 rounded-xl border transition-colors",
              showSources
                ? "bg-primary-50 border-primary-200 text-primary"
                : "bg-white border-gray-200 hover:border-primary-200 hover:text-primary",
            ].join(" ")}
          >
            {showSources ? "Ocultar fuentes" : "Ver fuentes"}
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] items-end">
          <div>
            <label className="text-sm font-extrabold text-gray-900" htmlFor="verif-select">
              Afirmación
            </label>
            <select
              id="verif-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
            >
              {FACTS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.claim.slice(0, 48)}...
                </option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
              Veredicto
            </div>
            <div
              className={[
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-extrabold border border-gray-100",
              ].join(" ")}
              style={{
                backgroundColor: verdictConfig.bgColor,
                color: verdictConfig.color,
              }}
            >
              {selected.verdict}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-4">
          <div className="text-xs text-gray-500 font-extrabold uppercase tracking-wide">
            Candidato: {selected.candidate}
          </div>
          <div className="mt-2 text-sm font-extrabold text-gray-900 leading-relaxed">
            “{selected.claim}”
          </div>
          <div className="mt-3 text-sm text-gray-600 leading-relaxed">
            {selected.summary}
          </div>
          {showSources && (
            <div className="mt-4">
              <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
                Explicación
              </div>
              <div className="mt-1 text-sm text-gray-700 leading-relaxed">
                {selected.explanation}
              </div>
              <div className="mt-4 grid gap-2">
                {selected.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-primary font-extrabold hover:underline"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

