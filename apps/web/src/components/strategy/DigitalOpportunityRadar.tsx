"use client";

import { useMemo, useState } from "react";
import {
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  RadarChart,
} from "recharts";
import type { Candidate2026ListItem } from "@/lib/data/candidates2026";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";
import Link from "next/link";

function getRadarData(candidate: Candidate2026ListItem) {
  // Ejes: normalizamos todo a 0..100.
  return [
    { axis: "Digital", value: candidate.digitalAgendaScore },
    { axis: "Veracidad", value: candidate.truthScore },
    { axis: "Seguridad", value: candidate.positions.security },
    { axis: "Institucional", value: candidate.positions.institutional },
    { axis: "Antivoto (mejor)", value: 100 - candidate.antiVote },
  ];
}

export default function DigitalOpportunityRadar() {
  const [slug, setSlug] = useState(OFFICIAL_CANDIDATES_2026[0]?.slug ?? "");

  const candidate = useMemo(
    () => OFFICIAL_CANDIDATES_2026.find((c) => c.slug === slug) ?? OFFICIAL_CANDIDATES_2026[0],
    [slug],
  );

  const topTech = useMemo(() => {
    return [...OFFICIAL_CANDIDATES_2026]
      .sort((a, b) => b.digitalAgendaScore - a.digitalAgendaScore)
      .slice(0, 6);
  }, []);

  const radarData = useMemo(() => (candidate ? getRadarData(candidate) : []), [candidate]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Radar de Oportunidad Tech 2026
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Visualiza quién combina agenda digital + credibilidad + señales de viabilidad. Ideal para diseñar narrativa con foco en “ejecución”.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="tech-slug" className="text-sm font-extrabold text-gray-900">
              Elegir candidato
            </label>
            <select
              id="tech-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
            >
              {OFFICIAL_CANDIDATES_2026.map((c) => (
                <option key={c.slug} value={c.slug}>
                  #{c.rank} · {c.name} ({c.party})
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl bg-primary-50 border border-primary-100 p-4">
            <div className="text-xs font-bold text-primary uppercase tracking-wide">
              Recomendación
            </div>
            <div className="text-lg font-extrabold text-gray-900 mt-1">
              {candidate?.name}
            </div>
            <div className="text-sm text-gray-700 mt-1">
              Digital: <span className="font-extrabold">{candidate.digitalAgendaScore}/100</span>
              {" · "}
              Antivoto (mejor): <span className="font-extrabold">{100 - candidate.antiVote}%</span>
            </div>
            <div className="mt-3">
              <Link
                href={`/candidatos/${candidate.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-2 px-3 rounded-xl hover:bg-primary-600 transition-colors"
              >
                Ver perfil
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <div className="text-sm font-extrabold text-gray-900">Radar (normalizado)</div>
        <div className="mt-4 h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="85%">
              <PolarGrid />
              <PolarAngleAxis dataKey="axis" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="value"
                dataKey="value"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.18}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
        <div className="text-sm font-extrabold text-gray-900">Top por agenda digital</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {topTech.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSlug(c.slug)}
              className={[
                "text-left rounded-2xl border p-4 transition-colors",
                c.slug === slug
                  ? "border-primary-200 bg-primary-50"
                  : "border-gray-200 hover:border-primary-200",
              ].join(" ")}
            >
              <div className="text-sm font-extrabold text-gray-900 truncate">#{c.rank} · {c.name}</div>
              <div className="text-xs text-gray-500 mt-1 truncate">{c.party}</div>
              <div className="mt-2 text-xs text-gray-700 font-bold">
                Digital: {c.digitalAgendaScore}/100
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

