"use client";

import { useMemo } from "react";
import type { Candidate2026ListItem } from "@/lib/data/candidates2026";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";

function legalRiskNum(risk: Candidate2026ListItem["legalRisk"]) {
  if (risk === "alto") return 0.3;
  if (risk === "medio") return 0.6;
  return 1;
}

function riskLabelFromAvg(avg: number) {
  if (avg <= 0.45) return "Alto";
  if (avg <= 0.8) return "Medio";
  return "Bajo";
}

export default function PartyRiskPanel() {
  const partyStats = useMemo(() => {
    const map = new Map<
      string,
      {
        party: string;
        count: number;
        inciertas: number;
        avgLegal: number;
      }
    >();

    OFFICIAL_CANDIDATES_2026.forEach((c) => {
      const prev = map.get(c.party);
      if (!prev) {
        map.set(c.party, {
          party: c.party,
          count: 1,
          inciertas: c.candidacyStatus === "incierta" ? 1 : 0,
          avgLegal: legalRiskNum(c.legalRisk),
        });
      } else {
        const nextCount = prev.count + 1;
        prev.count = nextCount;
        prev.inciertas += c.candidacyStatus === "incierta" ? 1 : 0;
        prev.avgLegal = (prev.avgLegal * (nextCount - 1) + legalRiskNum(c.legalRisk)) / nextCount;
      }
    });

    return [...map.values()].sort((a, b) => b.avgLegal - a.avgLegal);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <h2 className="text-2xl font-extrabold text-gray-900">Riesgo por partidos (proxy)</h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          No tenemos todavía el dataset completo de desempeño partidario (valla/cobertura parlamentaria).
          Este proxy usa señales internas: <span className="font-extrabold">riesgo legal</span> +{" "}
          <span className="font-extrabold">incertidumbre</span> del candidato presidencial.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <div className="text-sm font-extrabold text-gray-900">Ranking de partidos</div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="text-left">
                <th className="px-3 py-2 font-extrabold">Partido</th>
                <th className="px-3 py-2 font-extrabold">Candidatos</th>
                <th className="px-3 py-2 font-extrabold">Inciertas</th>
                <th className="px-3 py-2 font-extrabold">Riesgo legal (proxy)</th>
              </tr>
            </thead>
            <tbody>
              {partyStats.map((p) => {
                const label = riskLabelFromAvg(p.avgLegal);
                return (
                  <tr key={p.party} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-bold">{p.party}</td>
                    <td className="px-3 py-2">{p.count}</td>
                    <td className="px-3 py-2">{p.inciertas}</td>
                    <td className="px-3 py-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold border",
                          label === "Alto"
                            ? "bg-red-50 border-red-200 text-red-700"
                            : label === "Medio"
                              ? "bg-amber-50 border-amber-200 text-amber-700"
                              : "bg-emerald-50 border-emerald-200 text-emerald-700",
                        ].join(" ")}
                      >
                        {label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-gray-500 leading-relaxed">
          Siguiente paso recomendado: conectar el cálculo a métricas de desempeño partidario (encuestas agregadas, historial de bancada, etc.).
        </div>
      </div>
    </div>
  );
}

