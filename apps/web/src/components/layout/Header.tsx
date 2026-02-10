"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/test", label: "DNA Test", description: "Descubre tu perfil politico" },
  { href: "/candidatos", label: "Candidatos", description: "Conoce a los 36 candidatos" },
  { href: "/verificador", label: "Verificador", description: "Fact-checking con IA" },
  { href: "/simulador", label: "Simulador IA", description: "Conversa con candidatos IA" },
  { href: "/predictor", label: "Predictor", description: "Predicciones electorales" },
  { href: "/academia", label: "Academia", description: "Aprende sobre politica" },
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
                  Peru 2026
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
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary-50 text-primary border border-primary-100"
                        : "text-secondary-400 hover:bg-primary-50 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/test"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-card hover:shadow-hover transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Hacer el Test
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
                    className={`block px-4 py-3 rounded-lg transition-all ${
                      isActive
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
                  href="/test"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-primary hover:bg-primary-600 text-white font-bold py-3 rounded-lg shadow-card transition-all"
                >
                  Hacer el Test
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
