"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type PlanMini = {
  slug: string;
  numero: number;
  partido: string;
  candidato: string;
  temas: string[];
  color: string;
};

const PLANS: PlanMini[] = [
  {
    slug: "ahora-nacion",
    numero: 1,
    partido: "Ahora Nacion",
    candidato: "Alfonso Lopez Chau Nava",
    temas: ["Economia", "Educacion", "Industria"],
    color: "#2563EB",
  },
  {
    slug: "fuerza-popular",
    numero: 5,
    partido: "Fuerza Popular",
    candidato: "Keiko Fujimori Higuchi",
    temas: ["Seguridad", "Economia", "Social"],
    color: "#FF6B00",
  },
  {
    slug: "alianza-para-el-progreso",
    numero: 3,
    partido: "Alianza para el Progreso",
    candidato: "Cesar Acuna Peralta",
    temas: ["Educacion", "Infraestructura"],
    color: "#7C3AED",
  },
  {
    slug: "avanza-pais",
    numero: 4,
    partido: "Avanza Pais",
    candidato: "Jose Williams Zapata",
    temas: ["Seguridad", "Economia"],
    color: "#1E40AF",
  },
  {
    slug: "juntos-por-el-peru",
    numero: 7,
    partido: "Juntos por el Peru",
    candidato: "Roberto Helbert Sanchez Palomino",
    temas: ["Social", "Medio ambiente", "Pueblos indigenas"],
    color: "#DC2626",
  },
  {
    slug: "libertad-popular",
    numero: 8,
    partido: "Libertad Popular",
    candidato: "Rafael Jorge Belaunde Llosa",
    temas: ["Institucional", "Economia"],
    color: "#059669",
  },
];

export function PlanesPreviewMini() {
  const allTopics = useMemo(() => {
    const set = new Set<string>();
    PLANS.forEach((p) => p.temas.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const [topic, setTopic] = useState<string>("all");

  const list = useMemo(() => {
    if (topic === "all") return PLANS;
    return PLANS.filter((p) => p.temas.includes(topic));
  }, [topic]);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-gray-900">Planes de Gobierno (demo)</div>
          <div className="text-xs text-gray-500 mt-1">
            Filtra por temas y mira qué partidos priorizan el enfoque.
          </div>
        </div>
        <Link
          href="/planes"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-2.5 px-4 rounded-xl hover:bg-primary-600 transition-colors"
        >
          Ver todos <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-end gap-3">
        <div className="flex-1">
          <label className="text-sm font-extrabold text-gray-900" htmlFor="planes-topic">
            Tema
          </label>
          <select
            id="planes-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="all">Todos</option>
            {allTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs text-gray-500 font-bold">
          Mostrando {list.length} planes
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {list.map((p) => (
          <div key={p.slug} className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-gray-900 truncate">
                  #{p.numero} · {p.partido}
                </div>
                <div className="text-xs text-gray-500 mt-1 truncate">{p.candidato}</div>
              </div>
              <div className="w-10 h-10 rounded-xl border border-gray-100" style={{ backgroundColor: p.color }} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.temas.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-extrabold rounded-full bg-white/80 border border-gray-100 px-2 py-1 text-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

