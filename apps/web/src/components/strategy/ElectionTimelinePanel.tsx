"use client";

import { TIMELINE_2026 } from "@/lib/data/electionTimeline2026";

export default function ElectionTimelinePanel() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <h2 className="text-2xl font-extrabold text-gray-900">Timeline 2026</h2>
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        Un recordatorio de fechas clave para que puedas ajustar tu estrategia por etapa.
      </p>

      <div className="mt-4 space-y-3">
        {TIMELINE_2026.map((e) => (
          <div
            key={e.title}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="text-xs font-extrabold text-primary uppercase tracking-wide">
              {e.dateLabel}
            </div>
            <div className="text-sm font-extrabold text-gray-900 mt-1">{e.title}</div>
            <div className="text-sm text-gray-700 mt-2 leading-relaxed">
              {e.description}
            </div>
            <div className="mt-2 text-xs text-gray-600 font-bold">{e.impact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

