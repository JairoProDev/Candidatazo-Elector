"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { OFFICIAL_CANDIDATES_2026 } from "@/lib/data/candidates2026";

const navLinks = [
  { href: "/quiz", label: "Quick Match", description: "Descubre tu match en 60 segundos", icon: "bolt", hot: true },
  { href: "/cedula", label: "Practica tu Voto", description: "Simulador de cédula oficial", icon: "checklist", hot: true },
  { href: "/candidatos", label: "36 Candidatos", description: "Perfiles completos verificados", icon: "users" },
  { href: "/comparador", label: "Comparador", description: "Compara candidatos lado a lado", icon: "scale" },
  { href: "/comparador-estrategico", label: "Comparador Estrategico", description: "Ranking por pesos (antivoto/tech)", icon: "brain" },
  { href: "/encuestas", label: "Encuestas", description: "Datos en tiempo real", icon: "chart" },
  { href: "/planes", label: "Planes", description: "Planes de gobierno oficiales", icon: "document" },
  { href: "/verificador", label: "Verificador", description: "Fact-checking con fuentes", icon: "search" },
  { href: "/desafio", label: "Desafío", description: "Quiz diario con XP y racha", icon: "trophy" },
  { href: "/academia", label: "Academia", description: "Aprende jugando", icon: "book" },
  { href: "/analisis-2026", label: "Análisis 2026", description: "Guía estratégica con datos", icon: "pulse" },
  { href: "/segunda-vuelta", label: "Segunda Vuelta", description: "Simula balotaje con modelo", icon: "shuffle" },
  { href: "/radar-oportunidad", label: "Radar Tech", description: "Oportunidad de agenda digital", icon: "radar" },
  { href: "/watchlist", label: "Watchlist", description: "Guarda tus candidatos", icon: "bell" },
];

type IconName =
  | "bolt"
  | "checklist"
  | "users"
  | "scale"
  | "brain"
  | "chart"
  | "document"
  | "search"
  | "trophy"
  | "book"
  | "pulse"
  | "shuffle"
  | "radar"
  | "bell";

function MobileNavIcon({ name, className = "w-5 h-5" }: { name: IconName; className?: string }) {
  switch (name) {
    case "bolt":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" /></svg>;
    case "checklist":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h11M9 12h11M9 19h11M4 5h.01M4 12h.01M4 19h.01" /></svg>;
    case "users":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m18 0v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    case "scale":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m0-18l7 4m-7-4L5 7m14 10a3 3 0 11-6 0h6zm-8 0a3 3 0 11-6 0h6z" /></svg>;
    case "brain":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 3a3.5 3.5 0 00-3.5 3.5V8A3 3 0 003 11v2a3 3 0 003 3v1.5A3.5 3.5 0 009.5 21H11v-8H9m3-10a3.5 3.5 0 013.5 3.5V8A3 3 0 0121 11v2a3 3 0 01-3 3v1.5A3.5 3.5 0 0114.5 21H13v-8h2" /></svg>;
    case "chart":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M7 14l4-4 3 3 5-6" /></svg>;
    case "document":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm7 1v5h5" /></svg>;
    case "search":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-4.35-4.35" /></svg>;
    case "trophy":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21h8M12 17v4M7 4h10v3a5 5 0 01-10 0V4zm10 1h3a3 3 0 01-3 3M7 5H4a3 3 0 003 3" /></svg>;
    case "book":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a2 2 0 012-2h6v18H6a2 2 0 01-2-2V5zm16 0a2 2 0 00-2-2h-6v18h6a2 2 0 002-2V5z" /></svg>;
    case "pulse":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h4l2-4 4 8 2-4h6" /></svg>;
    case "shuffle":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3h5v5M4 20l6-6m4-4l7-7M16 21h5v-5M4 4l6 6" /></svg>;
    case "radar":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l7-7M12 12a7 7 0 11-7-7 7 7 0 017 7zm0 0l4 4" /></svg>;
    case "bell":
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .53-.21 1.04-.59 1.42L4 17h5m6 0a3 3 0 11-6 0h6z" /></svg>;
    default:
      return null;
  }
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileQuery, setMobileQuery] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(pathname === "/");

  const primaryLinks = navLinks.filter((l) =>
    ["/cedula", "/candidatos", "/comparador", "/planes", "/academia"].includes(
      l.href,
    ),
  );

  const toolLinks = navLinks.filter((l) =>
    [
      "/encuestas",
      "/comparador-estrategico",
      "/verificador",
      "/analisis-2026",
      "/segunda-vuelta",
      "/radar-oportunidad",
      "/watchlist",
      "/desafio",
    ].includes(l.href),
  );

  const activeToolHref =
    toolLinks.find((l) => pathname.startsWith(l.href))?.href ?? "";

  const mobileQuickLinks = navLinks;

  const searchIndex = useMemo(() => {
    const candidateEntries = OFFICIAL_CANDIDATES_2026.map((c) => ({
      href: `/candidatos/${c.slug}`,
      label: c.name,
      description: `${c.party} · candidato`,
      keywords: [c.party, c.slug, "candidato", "perfil"],
    }));
    const toolEntries = navLinks.map((l) => ({
      href: l.href,
      label: l.label,
      description: l.description,
      keywords: [l.label, l.description, l.href.replace("/", "")],
    }));
    const staticEntries = [
      { href: "/metodologia", label: "Metodología", description: "Cómo analizamos datos", keywords: ["fuentes", "metodo", "verificado"] },
      { href: "/transparencia", label: "Transparencia", description: "Compromiso de confianza", keywords: ["confianza", "equipo"] },
      { href: "/privacidad", label: "Privacidad", description: "Datos y seguridad", keywords: ["datos", "seguridad"] },
      { href: "/feed", label: "Feed", description: "Experiencia personalizada", keywords: ["feed", "tiktok", "cards"] },
    ];
    return [...toolEntries, ...candidateEntries, ...staticEntries];
  }, []);

  const mobileSearchResults = useMemo(() => {
    const q = mobileQuery.trim().toLowerCase();
    if (!q) return [];
    const score = (text: string) => (text.includes(q) ? (text.startsWith(q) ? 3 : 1) : 0);
    return searchIndex
      .map((entry) => {
        const haystack = `${entry.label} ${entry.description} ${entry.keywords.join(" ")}`.toLowerCase();
        const s = score(haystack);
        return { ...entry, score: s };
      })
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [mobileQuery, searchIndex]);

  const bannerItems = useMemo(
    () =>
      navLinks.map((link) => ({
        href: link.href,
        title: link.label.replace("Quick ", ""),
        subtitle: link.description,
        icon: link.icon as IconName,
        color:
          link.href === "/quiz" || link.href === "/cedula"
            ? "from-gold-500 to-primary"
            : link.href === "/verificador"
              ? "from-primary to-red-700"
              : link.href === "/encuestas"
                ? "from-gold-500 to-amber-700"
                : "from-secondary to-primary-700",
        cta: `Abrir ${link.label.replace("Quick ", "")}`,
      })),
    [],
  );

  useEffect(() => {
    const t = window.setInterval(() => {
      setBannerIndex((p) => (p + 1) % bannerItems.length);
    }, 3500);
    return () => window.clearInterval(t);
  }, [bannerItems.length]);

  // When user navigates to a tool/page, collapse the mobile utility panel.
  useEffect(() => {
    if (pathname !== "/") {
      setMobilePanelOpen(false);
    }
  }, [pathname]);

  const iconToneByHref: Record<string, string> = {
    "/quiz": "bg-gold-100 text-gold-700",
    "/cedula": "bg-red-100 text-primary",
    "/candidatos": "bg-blue-100 text-blue-700",
    "/comparador": "bg-indigo-100 text-indigo-700",
    "/comparador-estrategico": "bg-purple-100 text-purple-700",
    "/encuestas": "bg-amber-100 text-amber-700",
    "/planes": "bg-orange-100 text-orange-700",
    "/verificador": "bg-emerald-100 text-emerald-700",
    "/desafio": "bg-pink-100 text-pink-700",
    "/academia": "bg-yellow-100 text-yellow-700",
    "/analisis-2026": "bg-cyan-100 text-cyan-700",
    "/segunda-vuelta": "bg-fuchsia-100 text-fuchsia-700",
    "/radar-oportunidad": "bg-sky-100 text-sky-700",
    "/watchlist": "bg-slate-100 text-slate-700",
  };

  return (
    <>
      {/* Thin red band at the top like the Peruvian flag */}
      <div className="h-1 bg-gradient-to-r from-primary-700 via-primary to-primary-700" />

      <header className="z-50 bg-white/95 backdrop-blur-sm border-b border-primary-100 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Stylized "C" in red/gold gradient */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-gold rounded-xl flex items-center justify-center shadow-card group-hover:shadow-hover transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-extrabold text-xl drop-shadow-sm">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent leading-tight">
                  Candidatazo
                </span>
                <span className="text-[10px] font-medium text-gold-600 tracking-wider uppercase leading-tight hidden sm:block">
                  Perú 2026
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {primaryLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                      ? "bg-primary-50 text-primary border border-primary-100"
                      : "text-secondary-400 hover:bg-primary-50 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Group tools into a compact selector to avoid header overflow */}
              <div className="ml-2">
                <label className="sr-only" htmlFor="tools-select">
                  Herramientas
                </label>
                <select
                  id="tools-select"
                  aria-label="Herramientas"
                  value={activeToolHref}
                  onChange={(e) => {
                    const href = e.target.value;
                    if (!href) return;
                    router.push(href);
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-secondary-400 outline-none focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Herramientas</option>
                  {toolLinks.map((link) => (
                    <option key={link.href} value={link.href}>
                      {link.label}
                    </option>
                  ))}
                </select>
              </div>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-card hover:shadow-hover transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Mi Match
              </Link>
            </div>

            {/* Mobile primary shortcut */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobilePanelOpen((v) => !v)}
                className={`inline-flex items-center justify-center h-9 w-9 rounded-lg border transition-colors ${
                  mobilePanelOpen
                    ? "bg-gold-100 text-gold-700 border-gold-300"
                    : "bg-white text-secondary-500 border-gold-200"
                }`}
                aria-label="Abrir buscador y herramientas"
                title="Buscar y abrir herramientas"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-4.35-4.35" />
                </svg>
              </button>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-600 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-card transition-colors"
              >
                Mi Match
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile top nav like app tabs (3+ rows, 4 columns) */}
        {mobilePanelOpen && (
        <div className="lg:hidden border-t border-gold-200 bg-gradient-to-b from-white via-gold-50 to-white">
          <div className="px-3 py-3">
            <div className="relative mb-3">
              <input
                type="text"
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && mobileSearchResults[0]) {
                    router.push(mobileSearchResults[0].href);
                    setMobileQuery("");
                  }
                }}
                placeholder="Buscar en toda la app..."
                className="w-full rounded-xl border border-gold-300 bg-white pl-10 pr-10 py-2.5 text-sm font-medium text-secondary outline-none focus:ring-2 focus:ring-gold-300"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-4.35-4.35" />
                </svg>
              </span>
              {mobileQuery && (
                <button
                  type="button"
                  onClick={() => setMobileQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-700 text-sm"
                  aria-label="Limpiar búsqueda"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {mobileQuery.trim() && mobileSearchResults.length > 0 && (
                <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                  {mobileSearchResults.map((item) => (
                    <button
                      key={`${item.href}-${item.label}`}
                      type="button"
                      onClick={() => {
                        router.push(item.href);
                        setMobileQuery("");
                        setMobilePanelOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="text-xs font-bold text-secondary">{item.label}</div>
                      <div className="text-[11px] text-gray-500">{item.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-2 flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-wide text-gray-500 font-extrabold">
                Herramientas
              </div>
              <Link href="/feed" className="text-[11px] font-bold text-primary">
                Ver todo
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {mobileQuickLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobilePanelOpen(false)}
                    className={`px-2 py-2 rounded-xl text-[11px] font-bold text-center leading-tight transition-all shadow-sm min-h-[74px] flex flex-col items-center justify-center ${
                      isActive
                        ? "bg-white text-primary border border-gold-300 ring-1 ring-gold-200"
                        : "bg-white text-secondary-400 border border-gold-100 hover:bg-gold-50 hover:text-primary"
                    }`}
                    title={link.description}
                  >
                    <span
                      className={`mx-auto mb-1 inline-flex h-7 w-7 items-center justify-center rounded-lg ${
                        iconToneByHref[link.href] ?? "bg-gold-100 text-gold-700"
                      }`}
                    >
                      <MobileNavIcon name={link.icon as IconName} className="w-4 h-4" />
                    </span>
                    <span className="block leading-tight">{link.label.replace("Quick ", "").replace(" tu Voto", " Voto")}</span>
                  </Link>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-gold-200 shadow-card">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
              >
                {bannerItems.map((banner) => (
                  <Link
                    key={banner.href}
                    href={banner.href}
                    onClick={() => setMobilePanelOpen(false)}
                    className={`min-w-full px-4 py-4 bg-gradient-to-r ${banner.color} text-white`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 shrink-0">
                        <MobileNavIcon name={banner.icon} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-extrabold truncate">{banner.title}</div>
                        <div className="text-xs text-white/90 line-clamp-2">{banner.subtitle}</div>
                      </div>
                      <span className="inline-flex h-8 items-center rounded-lg bg-white text-primary px-3 text-[11px] font-extrabold shrink-0">
                        {banner.cta}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {bannerItems.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setBannerIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === bannerIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"
                    }`}
                    aria-label={`Ir banner ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </header>
    </>
  );
}
