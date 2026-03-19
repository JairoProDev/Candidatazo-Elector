"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import type { AnalisisSection } from "@/lib/analisis-2026/parseDoc";
import { trackAnalysis2026EventDev } from "@/lib/analytics/analysis2026";
import { LiveSearchInput } from "@/components/ui/LiveSearchInput";

const STORAGE_KEY_LAST_SECTION = "analisis2026:lastSectionId";
const STORAGE_KEY_LAST_PROGRESS = "analisis2026:lastProgress";
const STORAGE_KEY_AUTO_DISMISSED = "analisis2026:autoResumeDismissed";

const EXEC_TLDR = [
  {
    title: "Seguridad primero, pero con viabilidad",
    description:
      "Las propuestas tienden a endurecer el control; la pregunta clave es si son implementables y respetan el marco legal.",
  },
  {
    title: "Economía sólida, pero con brechas",
    description:
      "El reto no es el crecimiento en abstracto: es pobreza, empleo y servicios públicos que deben sostenerse con presupuesto real.",
  },
  {
    title: "Minería: trazabilidad o expansión del riesgo",
    description:
      "El debate gira entre formalización, control de insumos y prevención de la minería ilegal e informal.",
  },
  {
    title: "Bicameralidad como “filtro”",
    description:
      "La vuelta a dos cámaras busca mejorar calidad legislativa y reducir impulsos populistas, aunque requiere coordinación.",
  },
  {
    title: "Verificación: el antídoto a la infodemia",
    description:
      "La evidencia y las fuentes importan: el verificador compara afirmaciones, contextualiza y corrige narrativas.",
  },
] as const;

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countQueryOccurrences(haystack: string, query: string) {
  if (!query.trim()) return 0;
  const regex = new RegExp(escapeRegExp(query), "ig");
  const matches = haystack.match(regex);
  return matches ? matches.length : 0;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;

  const regex = new RegExp(escapeRegExp(query), "ig");

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null = null;
  while ((match = regex.exec(text)) !== null) {
    const { index } = match;
    const matched = match[0];

    parts.push(text.slice(lastIndex, index));
    parts.push(
      <mark
        key={`${index}-${matched}`}
        className="bg-primary/20 text-primary px-1 rounded-sm"
      >
        {matched}
      </mark>,
    );
    lastIndex = index + matched.length;
  }

  if (parts.length === 0) return text;

  parts.push(text.slice(lastIndex));
  return parts;
}

function formatTextWithTables(text: string, query: string) {
  // UX-friendly formatting:
  // - Agrupa filas con tabs (\\t) en una tabla HTML real.
  // - Para texto normal, agrupa líneas contiguas en párrafos (mejor a11y/lectura).
  const lines = text.split("\n");
  const rendered: React.ReactNode[] = [];

  const normalizeRow = (row: string[], colCount: number) => {
    const copy = [...row];
    while (copy.length < colCount) copy.push("");
    return copy;
  };

  const looksLikeHeaderRow = (row: string[]) => {
    const joined = row.join(" ").trim();
    if (!joined) return false;
    // Un encabezado suele tener “texto” (no solo números).
    return /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(joined);
  };

  const pushParagraph = (startIndex: number, paragraphLines: string[]) => {
    const paragraph = paragraphLines.join("\n");
    rendered.push(
      <p key={`p-${startIndex}`} className="whitespace-pre-line text-gray-700 leading-relaxed">
        {highlightText(paragraph, query)}
      </p>,
    );
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();

    // Table block
    if (line.includes("\t") && trimmed.length > 0) {
      const tableLines: string[] = [];
      const startIndex = i;

      while (i < lines.length && lines[i].includes("\t") && lines[i].trim().length > 0) {
        tableLines.push(lines[i]);
        i += 1;
      }

      const rawRows = tableLines.map((l) => l.split("\t"));
      const colCount = Math.max(...rawRows.map((r) => r.length));
      const rows = rawRows.map((r) => normalizeRow(r, colCount));

      const firstRow = rows[0];
      const hasHeader = looksLikeHeaderRow(firstRow);

      rendered.push(
        <div key={`tbl-${startIndex}`} className="my-4 overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
            {hasHeader && (
              <thead className="bg-gray-100">
                <tr>
                  {Array.from({ length: colCount }).map((_, colIdx) => (
                    <th
                      key={colIdx}
                      className="text-left px-3 py-2 font-semibold text-gray-800 border-b border-gray-200 whitespace-pre-line"
                    >
                      {highlightText(firstRow[colIdx] ?? "", query)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="bg-white">
              {(hasHeader ? rows.slice(1) : rows).map((row, rowIdx) => (
                <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {Array.from({ length: colCount }).map((_, colIdx) => (
                    <td
                      key={colIdx}
                      className="px-3 py-2 border-b border-gray-100 whitespace-pre-line align-top"
                    >
                      {highlightText(row[colIdx] ?? "", query)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );

      continue;
    }

    // Empty line spacing
    if (trimmed.length === 0) {
      rendered.push(<div key={`sp-${i}`} className="h-2" aria-hidden="true" />);
      i += 1;
      continue;
    }

    // Paragraph block (until blank or table start)
    const startIndex = i;
    const paragraphLines: string[] = [line];
    i += 1;

    while (i < lines.length) {
      const l = lines[i] ?? "";
      const t = l.trim();
      if (t.length === 0) break;
      if (l.includes("\t") && t.length > 0) break;
      paragraphLines.push(l);
      i += 1;
    }

    pushParagraph(startIndex, paragraphLines);
  }

  return rendered;
}

function renderEjesHeader(sectionTitle: string) {
  const t = sectionTitle.toLowerCase();
  const chips: string[] = [];
  if (t.includes("seguridad")) chips.push("Seguridad");
  if (t.includes("econom")) chips.push("Economía");
  if (t.includes("minería") || t.includes("minero")) chips.push("Minería");

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4" aria-label="Ejes temáticos">
      {chips.map((c) => (
        <span
          key={c}
          className="inline-flex items-center rounded-full bg-primary/10 border border-primary-100 text-primary px-3 py-1 text-xs font-extrabold"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function renderFactCheckStyle(section: AnalisisSection, query: string) {
  const title = section.title.toLowerCase();
  const isFactCheckSection =
    title.includes("análisis detallado de discursos políticos") ||
    title.includes("análisis detallado");

  if (!isFactCheckSection) return null;

  const verdictForLine = (line: string) => {
    const t = line.toLowerCase();
    if (t.includes("engañosa")) return "Engañosa";
    if (t.includes("enganoso") || t.includes("engañoso")) return "Engañosa";
    if (t.includes("falsa") || t.includes("falso")) return "Falsa";
    return null;
  };

  const lines = section.content.split("\n").map((l) => l.trim());
  const claims = lines.filter((l) => l.length > 0 && l.includes(":") && !l.includes("\t"));

  if (!claims.length) return null;

  return (
    <div className="space-y-3">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <div className="text-sm font-extrabold text-gray-900">Fact-check style</div>
        <div className="text-sm text-gray-700 mt-1 leading-relaxed">
          Cada afirmación se etiqueta con su veredicto detectado en el texto base.
        </div>
      </div>

      {claims.map((claim, idx) => {
        const verdict = verdictForLine(claim);
        const verdictTone =
          verdict === "Falsa"
            ? "bg-red-50 border-red-200 text-red-900"
            : verdict === "Engañosa"
              ? "bg-amber-50 border-amber-200 text-amber-900"
              : "bg-gray-50 border-gray-200 text-gray-800";

        return (
          <div
            key={`${section.id}-${idx}`}
            className={`rounded-2xl border p-4 ${verdictTone}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-extrabold">
                {highlightText(claim.split(":")[0] ?? claim, query)}
              </div>
              {verdict && (
                <span className="text-xs font-extrabold rounded-full bg-white/70 border border-white/50 px-3 py-1">
                  {verdict}
                </span>
              )}
            </div>
            <div className="text-sm mt-2 leading-relaxed whitespace-pre-line text-gray-700">
              {highlightText(claim, query)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderSectionBody(section: AnalisisSection, query: string) {
  const titleLower = section.title.toLowerCase();

  if (titleLower.includes("ejes program") || titleLower.includes("ejes")) {
    return (
      <>
        {renderEjesHeader(section.title)}
        {renderFactCheckStyle(section, query) ?? formatTextWithTables(section.content, query)}
      </>
    );
  }

  return renderFactCheckStyle(section, query) ?? formatTextWithTables(section.content, query);
}

function shouldShowCtaForSection(section: AnalisisSection) {
  const t = section.title.toLowerCase();
  if (t.includes("verificador")) return "verificador";
  if (t.includes("ejes program") || t.includes("ejes programáticos")) return "planes";
  if (t.includes("seguridad")) return "verificador";
  if (t.includes("econom") || t.includes("pobreza")) return "quiz";
  if (t.includes("minero") || t.includes("formalización")) return "transparencia";
  if (t.includes("conclusiones")) return "quiz";
  return null;
}

function jumpToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Analisis2026Client({ sections }: { sections: AnalisisSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [progress, setProgress] = useState<number>(0);
  const [resumeDismissed, setResumeDismissed] = useState<boolean>(false);

  const [query, setQuery] = useState("");
  const [onlyMatches, setOnlyMatches] = useState(true);

  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => setHasHydrated(true), []);

  useEffect(() => {
    if (!hasHydrated) return;
    trackAnalysis2026EventDev("analysis2026_page_view", { page: "/analisis-2026" });
  }, [hasHydrated]);

  const sectionsById = useMemo(() => {
    const map = new Map<string, AnalisisSection>();
    sections.forEach((s) => map.set(s.id, s));
    return map;
  }, [sections]);

  const search = useMemo(() => {
    const q = query.trim();
    if (!q) {
      return {
        totalMatches: 0,
        matchedSectionIds: new Set<string>(),
        perSectionCounts: new Map<string, number>(),
      };
    }

    let totalMatches = 0;
    const matchedSectionIds = new Set<string>();
    const perSectionCounts = new Map<string, number>();

    sections.forEach((s) => {
      const matches = countQueryOccurrences(s.searchText, q);
      if (matches > 0) matchedSectionIds.add(s.id);
      perSectionCounts.set(s.id, matches);
      totalMatches += matches;
    });

    return { totalMatches, matchedSectionIds, perSectionCounts };
  }, [query, sections]);

  const visibleSections = useMemo(() => {
    if (!query.trim() || !onlyMatches) return sections;
    return sections.filter((s) => search.matchedSectionIds.has(s.id));
  }, [query, onlyMatches, search.matchedSectionIds, sections]);

  const nextSection = useMemo(() => {
    const idx = sections.findIndex((s) => s.id === activeId);
    if (idx < 0) return null;
    return sections[idx + 1] ?? null;
  }, [activeId, sections]);

  const sectionEnterAtRef = useRef<number>(Date.now());
  const sectionViewTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;
    const q = query.trim();
    if (!q) return;

    const timer = window.setTimeout(() => {
      trackAnalysis2026EventDev("analysis2026_search_used", {
        query: q,
        totalMatches: search.totalMatches,
        matchedSections: search.matchedSectionIds.size,
      });
    }, 450);

    return () => window.clearTimeout(timer);
  }, [hasHydrated, query, search.matchedSectionIds.size, search.totalMatches]);

  useEffect(() => {
    if (!sections.length) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max <= 0 ? 0 : (doc.scrollTop / max) * 100;
      setProgress(Math.max(0, Math.min(100, pct)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections.length]);

  // Resume + persistencia básica
  useEffect(() => {
    if (!hasHydrated) return;

    try {
      const autoDismissed = localStorage.getItem(STORAGE_KEY_AUTO_DISMISSED);
      if (autoDismissed === "1") setResumeDismissed(true);
    } catch {
      // ignore
    }

    // IntersectionObserver para la sección activa
    const ids = sections.map((s) => s.id).filter(Boolean);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).id;
          setActiveId(id);
        }
      },
      { root: null, threshold: [0.08, 0.2, 0.35, 0.5], rootMargin: "-15% 0px -70% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hasHydrated, sections]);

  // Analítica: trackear "tiempo de lectura" por sección (solo si se mantiene un rato).
  useEffect(() => {
    if (!hasHydrated) return;
    if (!activeId) return;

    if (sectionViewTimeoutRef.current) {
      window.clearTimeout(sectionViewTimeoutRef.current);
    }

    const enteredAt = Date.now();
    sectionEnterAtRef.current = enteredAt;
    const id = activeId;
    const title = sectionsById.get(id)?.title ?? "";

    sectionViewTimeoutRef.current = window.setTimeout(() => {
      const timeMs = Date.now() - sectionEnterAtRef.current;
      trackAnalysis2026EventDev("analysis2026_section_view", {
        sectionId: id,
        sectionTitle: title,
        timeMs,
      });
    }, 2400);

    return () => {
      if (sectionViewTimeoutRef.current) {
        window.clearTimeout(sectionViewTimeoutRef.current);
      }
    };
  }, [activeId, hasHydrated, sectionsById]);

  // Persistir la sección activa y progreso (throttle simple por rAF).
  useEffect(() => {
    if (!hasHydrated) return;
    if (!activeId) return;

    let raf = 0;
    const write = () => {
      try {
        localStorage.setItem(STORAGE_KEY_LAST_SECTION, activeId);
        localStorage.setItem(STORAGE_KEY_LAST_PROGRESS, String(Math.round(progress)));
      } catch {
        // ignore
      }
    };

    raf = window.requestAnimationFrame(write);
    return () => window.cancelAnimationFrame(raf);
  }, [activeId, progress, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (resumeDismissed) return;

    try {
      const savedId = localStorage.getItem(STORAGE_KEY_LAST_SECTION) ?? "";
      const savedProgressRaw = localStorage.getItem(STORAGE_KEY_LAST_PROGRESS) ?? "0";
      const savedProgress = Number.parseInt(savedProgressRaw, 10);

      if (!savedId || !sectionsById.has(savedId)) return;
      // No reanudar si el usuario casi no se movió.
      if (!Number.isFinite(savedProgress) || savedProgress < 12) return;

      // Evitar chocar contra hash del usuario.
      if (window.location.hash) return;

      // Pequeño delay para que el layout esté listo.
      trackAnalysis2026EventDev("analysis2026_auto_resume", {
        sectionId: savedId,
        progress: savedProgress,
      });
      window.setTimeout(() => jumpToId(savedId), 250);
    } catch {
      // ignore
    }
  }, [hasHydrated, resumeDismissed, sectionsById]);

  const resumeSectionTitle = useMemo(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_LAST_SECTION) ?? "";
      const s = sectionsById.get(savedId);
      return s?.title;
    } catch {
      return undefined;
    }
  }, [sectionsById, hasHydrated]);

  const resumeAvailable = Boolean(resumeSectionTitle) && !resumeDismissed;

  const handleClearResume = () => {
    trackAnalysis2026EventDev("analysis2026_resume_cleared");
    setResumeDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY_AUTO_DISMISSED, "1");
      localStorage.removeItem(STORAGE_KEY_LAST_SECTION);
      localStorage.removeItem(STORAGE_KEY_LAST_PROGRESS);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const trackProductLinkClick = (destination: string, context: string) => {
    trackAnalysis2026EventDev("analysis2026_product_link_click", {
      destination,
      context,
      activeSectionId: activeId,
      query: query.trim() || undefined,
    });
  };

  const heroTitle = sections[0]?.title ?? "Análisis 2026";
  const heroSubtitle =
    "Una guía estratégica para entender el panorama electoral (bicameralidad, candidaturas, ejes programáticos, verificación de datos y más).";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Progress bar */}
      <div
        className="h-1 bg-primary"
        style={{ width: `${progress}%`, position: "fixed", top: 16, left: 0, zIndex: 60 }}
        aria-hidden="true"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-medium">Análisis 2026</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-gold-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{heroTitle}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{heroSubtitle}</p>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXEC_TLDR.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-subtle transition-shadow"
              >
                <div className="font-extrabold text-gray-900 text-sm">{item.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed mt-1">{item.description}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-3 px-5 rounded-xl shadow-card transition-all duration-200"
              onClick={() => trackProductLinkClick("/quiz", "hero_cta")}
            >
              Hacer el quiz
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/verificador"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary-200 text-gray-900 text-sm font-bold py-3 px-5 rounded-xl transition-all duration-200"
              onClick={() => trackProductLinkClick("/verificador", "hero_cta")}
            >
              Ver fact-checks
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {resumeAvailable && (
            <div className="mt-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
              <div className="text-sm text-gray-700">
                Continúa desde:{" "}
                <span className="font-bold text-gray-900">{resumeSectionTitle}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    trackAnalysis2026EventDev("analysis2026_resume_clicked");
                    jumpToId(localStorage.getItem(STORAGE_KEY_LAST_SECTION) ?? "");
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Reanudar
                </button>
                <button
                  type="button"
                  onClick={handleClearResume}
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-lg hover:border-primary-200 transition-colors"
                >
                  Desde el inicio
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-[1fr_360px] gap-10">
          {/* Main */}
          <div>
            {/* Search */}
            <section className="mb-8 bg-white border border-gray-100 rounded-2xl p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                <div className="flex-1">
                  <LiveSearchInput
                    id="analysis-search"
                    label="Buscar en esta guia"
                    placeholder="Ej: seguridad, mineria, pobreza, verificador..."
                    value={query}
                    onChange={setQuery}
                    onClear={() => {
                      setQuery("");
                      setOnlyMatches(true);
                    }}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700 select-none">
                    <input
                      type="checkbox"
                      checked={onlyMatches}
                      onChange={(e) => setOnlyMatches(e.target.checked)}
                    />
                    Solo coincidencias
                  </label>
                </div>
              </div>

              {query.trim() && (
                <div className="mt-3 flex flex-col gap-2">
                  <div className="text-sm text-gray-700">
                    Encontradas <span className="font-bold text-gray-900">{search.totalMatches}</span>{" "}
                    coincidencias en{" "}
                    <span className="font-bold text-gray-900">{search.matchedSectionIds.size}</span>{" "}
                    secciones.
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sections
                      .map((s) => ({ s, c: search.perSectionCounts.get(s.id) ?? 0 }))
                      .filter(({ c }) => c > 0)
                      .slice(0, 10)
                      .sort((a, b) => b.c - a.c)
                      .map(({ s, c }) => (
                        <button
                          key={s.id}
                          type="button"
                          className="text-left text-sm px-3 py-2 rounded-xl border border-gray-200 text-gray-700 hover:border-primary-200 hover:text-primary transition-colors bg-white"
                          onClick={() => {
                            setOnlyMatches(false);
                            trackAnalysis2026EventDev("analysis2026_search_jump", {
                              targetSectionId: s.id,
                              targetSectionTitle: s.title,
                              query: query.trim() || undefined,
                            });
                            jumpToId(s.id);
                          }}
                        >
                          <span className="font-bold text-gray-900">{s.title}</span>
                          <span className="block text-xs text-gray-500">{c} coincidencias</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </section>

            {/* Mobile TOC */}
            <div className="lg:hidden sticky top-24 z-40 mb-6">
              <details className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-extrabold text-gray-900">Contenido</span>
                    <span className="text-xs text-gray-500">
                      {activeId ? "Leyendo..." : "Navegar"}
                    </span>
                  </div>
                </summary>
                <nav className="mt-3 space-y-2" aria-label="Tabla de contenidos (móvil)">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      aria-current={activeId === s.id ? "page" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        trackAnalysis2026EventDev("analysis2026_toc_click", {
                          targetSectionId: s.id,
                          targetSectionTitle: s.title,
                          mobile: true,
                        });
                        setOnlyMatches(false);
                        jumpToId(s.id);
                      }}
                      className={[
                        "block text-sm px-3 py-2 rounded-xl border transition-colors",
                        activeId === s.id
                          ? "bg-primary/10 border-primary-200 text-primary font-bold"
                          : "bg-white border-gray-200 text-gray-700 hover:border-primary-200 hover:text-primary",
                      ].join(" ")}
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </details>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {visibleSections.map((section, index) => {
                const ctaKind = shouldShowCtaForSection(section);
                const isMain = index === 0 && section.id === sections[0]?.id;

                return (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    {!isMain && (
                      <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{section.title}</h2>
                    )}

                    <div className="bg-white border border-gray-100 rounded-2xl p-6">
                      <div className="space-y-3">{renderSectionBody(section, query)}</div>
                    </div>

                    {ctaKind && (
                      <div className="mt-5">
                        {ctaKind === "verificador" && (
                          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
                            <div className="font-extrabold text-gray-900">Siguiente paso: Verificador</div>
                            <div className="text-gray-700 text-sm mt-1 leading-relaxed">
                              Si la narrativa compite con datos, aquí contrastas afirmaciones con fuentes.
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Link
                                href="/verificador"
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                                onClick={() => trackProductLinkClick("/verificador", "section_cta_verificador")}
                              >
                                Abrir verificador
                                <span aria-hidden="true">→</span>
                              </Link>
                              <Link
                                href="/quiz"
                                className="inline-flex items-center justify-center gap-2 bg-white border border-primary-200 hover:border-primary-300 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                                onClick={() => trackProductLinkClick("/quiz", "section_cta_quiz")}
                              >
                                Hacer quiz
                                <span aria-hidden="true">→</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {ctaKind === "planes" && (
                          <div className="bg-white border border-gray-200 rounded-2xl p-5">
                            <div className="font-extrabold text-gray-900">Siguiente paso: Planes de gobierno</div>
                            <div className="text-gray-700 text-sm mt-1 leading-relaxed">
                              Conecta estos ejes con planes concretos y revisa qué proponen y con qué enfoque.
                            </div>
                            <div className="mt-3">
                              <Link
                                href="/planes"
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                                onClick={() => trackProductLinkClick("/planes", "section_cta_planes")}
                              >
                                Ver planes
                                <span aria-hidden="true">→</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {ctaKind === "quiz" && (
                          <div className="bg-gradient-to-r from-gold-50 via-white to-primary-50 border border-gray-200 rounded-2xl p-5">
                            <div className="font-extrabold text-gray-900">Practica tu criterio</div>
                            <div className="text-gray-700 text-sm mt-1 leading-relaxed">
                              Responde el quiz y refuerza lo que acabas de leer con una dinámica rápida.
                            </div>
                            <div className="mt-3">
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Link
                                  href="/quiz"
                                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                                  onClick={() => trackProductLinkClick("/quiz", "section_cta_quiz")}
                                >
                                  Ir al quiz
                                  <span aria-hidden="true">→</span>
                                </Link>
                                <Link
                                  href="/cedula"
                                  className="inline-flex items-center justify-center gap-2 bg-white border border-primary-200 hover:border-primary-300 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                                  onClick={() => trackProductLinkClick("/cedula", "section_cta_cedula")}
                                >
                                  Practica tu voto
                                  <span aria-hidden="true">→</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {ctaKind === "transparencia" && (
                          <div className="bg-white border border-gray-200 rounded-2xl p-5">
                            <div className="font-extrabold text-gray-900">Siguiente paso: Transparencia</div>
                            <div className="text-gray-700 text-sm mt-1 leading-relaxed">
                              En minería y formalización, la trazabilidad y el seguimiento institucional son claves.
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Link
                                href="/transparencia"
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                                onClick={() => trackProductLinkClick("/transparencia", "section_cta_transparencia")}
                              >
                                Ver transparencia
                                <span aria-hidden="true">→</span>
                              </Link>
                              <Link
                                href="/verificador"
                                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary-200 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                                onClick={() => trackProductLinkClick("/verificador", "section_cta_verificador")}
                              >
                                Verificar datos
                                <span aria-hidden="true">→</span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <section className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-extrabold text-gray-900">Contenido</h3>
                  <div className="text-xs text-gray-500">
                    {query.trim()
                      ? `${visibleSections.length}/${sections.length}`
                      : `${sections.length} secciones`}
                  </div>
                </div>

                <nav className="mt-3 space-y-2" aria-label="Tabla de contenidos">
                  {sections
                    .filter((s) => !onlyMatches || !query.trim() || search.matchedSectionIds.has(s.id))
                    .map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        aria-current={activeId === s.id ? "page" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          trackAnalysis2026EventDev("analysis2026_toc_click", {
                            targetSectionId: s.id,
                            targetSectionTitle: s.title,
                          });
                          setOnlyMatches(false);
                          jumpToId(s.id);
                        }}
                        className={[
                          "block text-sm px-3 py-2 rounded-xl border transition-colors",
                          activeId === s.id
                            ? "bg-primary/10 border-primary-200 text-primary font-bold"
                            : "bg-white border-gray-200 text-gray-700 hover:border-primary-200 hover:text-primary",
                        ].join(" ")}
                      >
                        {s.title}
                      </a>
                    ))}
                </nav>
              </section>

              {nextSection && (
                <section className="mt-4 bg-white border border-gray-100 rounded-2xl p-4">
                  <div className="text-sm font-extrabold text-gray-900">Leer hasta aquí</div>
                  <div className="text-sm text-gray-700 mt-1 leading-relaxed">
                    Siguiente sección recomendada:
                    <span className="font-bold text-gray-900 ml-1">{nextSection.title}</span>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        trackAnalysis2026EventDev("analysis2026_next_section_click", {
                          targetSectionId: nextSection.id,
                          targetSectionTitle: nextSection.title,
                        });
                        setOnlyMatches(false);
                        jumpToId(nextSection.id);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                    >
                      Ir a la sección
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </section>
              )}

              <section className="mt-4 bg-white border border-gray-100 rounded-2xl p-4">
                <div className="text-sm font-extrabold text-gray-900">Conclusiones rápidas</div>
                <ul className="mt-2 space-y-2 text-sm text-gray-700 list-disc pl-5">
                  <li>La gobernabilidad post-electoral exige coordinación real en la bicameralidad.</li>
                  <li>Endurecer la respuesta no reemplaza el marco legal: se mide la viabilidad.</li>
                  <li>La economía debe traducirse en servicios: pobreza y brechas son el núcleo.</li>
                  <li>Minería y formalización requieren trazabilidad y control efectivo.</li>
                  <li>La verificación es el filtro contra narrativas engañosas.</li>
                </ul>
              </section>

              <section className="mt-4 bg-primary-50 border border-primary-100 rounded-2xl p-4">
                <div className="text-sm font-extrabold text-gray-900">Acciones rápidas</div>
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href="/planes"
                    className="inline-flex items-center justify-center gap-2 bg-white border border-primary-200 hover:border-primary-300 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                    onClick={() => trackProductLinkClick("/planes", "sidebar_quick_action")}
                  >
                    Explorar planes
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/verificador"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                    onClick={() => trackProductLinkClick("/verificador", "sidebar_quick_action")}
                  >
                    Ir al verificador
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

