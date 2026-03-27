"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { FeedCardModel, FeedCardType } from "@/lib/feed/feedTypes";

const typeToBadge: Partial<Record<FeedCardType, { label: string; tone: "primary" | "gold" | "neutral" }>> =
  {
    verificador: { label: "Evidencia + fuentes", tone: "gold" },
    watchlist: { label: "Persistencia local", tone: "neutral" },
    encuestas: { label: "Snapshot (Marzo 2026)", tone: "neutral" },
    planes: { label: "Propuestas reunidas", tone: "primary" },
    match: { label: "Demo educativa", tone: "primary" },
    "analisis-2026": { label: "Contexto y guía", tone: "neutral" },
  };

function Badge({ label, tone }: { label: string; tone: "primary" | "gold" | "neutral" }) {
  const cls =
    tone === "primary"
      ? "bg-primary-50 border border-primary-100 text-primary"
      : tone === "gold"
        ? "bg-gold-50 border border-gold-200 text-gold-700"
        : "bg-white border border-gray-200 text-gray-700";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold border ${cls}`}>
      {label}
    </span>
  );
}

function Disclaimer() {
  return (
    <p className="mt-3 text-[11px] leading-relaxed text-gray-500">
      No es pronóstico oficial. Usa este contenido como guía para decidir con conocimiento y fuentes verificables.
    </p>
  );
}

export function ToolCardFrame({
  card,
  preview,
  onCta,
  onOpenFocus,
}: {
  card: FeedCardModel;
  preview: ReactNode;
  onCta?: () => void;
  onOpenFocus?: () => void;
}) {
  return (
    <div
      className="relative w-full rounded-[2rem] border border-gray-100 bg-white/95 backdrop-blur-sm shadow-card overflow-hidden"
      aria-label={card.title}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-gold/10 pointer-events-none" />

      <div className="relative p-5 md:p-7 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg md:text-xl font-extrabold text-secondary truncate">{card.title}</h2>
              {typeToBadge[card.type] && (
                <Badge label={typeToBadge[card.type]!.label} tone={typeToBadge[card.type]!.tone} />
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{card.benefit}</p>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wide">
              Por qué ahora
            </div>
            <p className="mt-1 text-xs font-bold text-gray-900 max-w-[180px]">{card.rankingReason}</p>
          </div>
        </div>

        <div className="mt-4 flex-1">{preview}</div>

        <div className="mt-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Prueba</div>
            <div className="mt-1 text-sm font-semibold text-gray-800 leading-relaxed">{card.proof}</div>
            {process.env.NODE_ENV === "development" && (
              <div className="mt-2 text-[10px] text-gray-400 font-mono leading-relaxed">
                debug: type={card.type} · score={(card.score ?? 0).toFixed(3)} · variant={card.variant ?? 0}
                <div className="mt-1">reason: {card.rankingReason}</div>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <Link
              href={card.cta.href}
              onClick={onCta}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white font-extrabold px-6 py-3 rounded-xl shadow-card transition-all duration-200 active:scale-[0.99]"
            >
              {card.cta.label}
              <span aria-hidden="true">→</span>
            </Link>

            {onOpenFocus && (
              <button
                type="button"
                onClick={onOpenFocus}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-extrabold px-6 py-3 rounded-xl border border-gray-200 transition-colors active:scale-[0.99]"
              >
                Enfocarme aquí
                <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

