"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/quiz", label: "Quick Match", description: "Descubre tu match en 60 segundos", hot: true },
  { href: "/cedula", label: "Practica tu Voto", description: "Simulador de cédula oficial", hot: true },
  { href: "/candidatos", label: "36 Candidatos", description: "Perfiles completos verificados" },
  { href: "/comparador", label: "Comparador", description: "Compara candidatos lado a lado" },
  { href: "/encuestas", label: "Encuestas", description: "Datos en tiempo real" },
  { href: "/planes", label: "Planes", description: "Planes de gobierno oficiales" },
  { href: "/verificador", label: "Verificador", description: "Fact-checking con fuentes" },
  { href: "/desafio", label: "Desafío", description: "Quiz diario con XP y racha" },
  { href: "/academia", label: "Academia", description: "Aprende jugando" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Thin red band at the top like the Peruvian flag */}
      <div className="h-1 bg-gradient-to-r from-primary-700 via-primary to-primary-700" />

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-primary-100 shadow-subtle">
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
              {navLinks.map((link) => {
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
                    {('hot' in link && link.hot) && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
                    )}
                  </Link>
                );
              })}
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

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-primary-100 bg-white animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all ${isActive
                        ? "bg-primary-50 text-primary border-l-4 border-primary"
                        : "text-secondary-400 hover:bg-primary-50 hover:text-primary"
                      }`}
                  >
                    <span className="font-medium">{link.label}</span>
                    <span className="block text-xs text-gray-400 mt-0.5">
                      {link.description}
                    </span>
                  </Link>
                );
              })}
              <div className="pt-3 pb-1">
                <Link
                  href="/quiz"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-primary hover:bg-primary-600 text-white font-bold py-3 rounded-lg shadow-card transition-all"
                >
                  Descubrir mi Match
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
