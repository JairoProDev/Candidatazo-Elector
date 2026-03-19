"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { COURSES } from "@/app/academia/data/courses";
import type { Course } from "@/app/academia/types";

const courseUrl = (c: Course) =>
  c.slug === "bicameralidad" ? "/academia/bicameralidad" : `/academia/courses/${c.slug}`;

export function AcademiaPreviewMini() {
  const [selectedSlug, setSelectedSlug] = useState(COURSES[0]?.slug ?? "");
  const selected = useMemo(
    () => COURSES.find((c) => c.slug === selectedSlug) ?? COURSES[0],
    [selectedSlug],
  );

  const xpProgress = useMemo(() => {
    if (!selected) return 0;
    // normalize 0..100 for a quick UI bar
    return Math.max(8, Math.min(100, Math.round((selected.xp / 600) * 100)));
  }, [selected]);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-gray-900">
            Academia Cívica (demo)
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Elige un curso y mira su ruta de aprendizaje.
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wide">
            XP estimado
          </div>
          <div className="text-2xl font-extrabold text-primary">{selected?.xp ?? 0}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] items-end">
        <div>
          <label htmlFor="landing-course" className="text-sm font-extrabold text-gray-900">
            Curso
          </label>
          <select
            id="landing-course"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-200"
          >
            {COURSES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div className="text-right">
          <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
            {selected?.time}
          </div>
          <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <div className="text-sm font-extrabold text-gray-800">{selected?.difficulty}</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3 text-xs text-gray-600">
          <div className="font-extrabold text-gray-900">Ruta rápida</div>
          <div className="font-extrabold text-gray-700">{xpProgress}/100</div>
        </div>
        <div className="mt-2 h-3 rounded-full bg-gray-100 overflow-hidden border border-gray-100">
          <div
            className="h-full bg-gradient-to-r from-primary to-gold transition-all"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
          Tags
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(selected?.tags ?? []).slice(0, 6).map((t) => (
            <span
              key={t}
              className="text-[11px] font-extrabold rounded-full bg-gray-50 border border-gray-100 px-3 py-1 text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-gray-900 truncate">{selected?.subtitle}</div>
          <div className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
            {selected?.description}
          </div>
        </div>
        <Link
          href={selected ? courseUrl(selected) : "/academia"}
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold py-3 px-4 rounded-xl hover:bg-primary-600 transition-colors"
        >
          Empezar
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

