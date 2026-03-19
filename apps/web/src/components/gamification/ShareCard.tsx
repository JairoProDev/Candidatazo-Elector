"use client";

import { useState } from "react";
import { useGamificationStore, XP_REWARDS } from "@/lib/gamification";

// ==================== Types ====================

export type ShareResultType = "quiz" | "dna" | "cedula" | "comparison" | "level";

export interface ShareResult {
  type: ShareResultType;
  title: string;
  /** Main metric or result line */
  headline: string;
  /** Secondary detail, e.g. candidate name or score */
  subtitle?: string;
  /** Optional numeric score 0-100 for visual display */
  score?: number;
  /** Extra data rendered below headline */
  details?: string[];
}

interface ShareCardProps {
  result: ShareResult;
  /** Called after any share action fires */
  onShare?: () => void;
}

// ==================== Helpers ====================

const SITE_URL = "https://candidatazo.com";

function buildShareText(result: ShareResult): string {
  const lines: string[] = [];
  switch (result.type) {
    case "dna":
      lines.push(`Mi ADN Politico es: ${result.headline}`);
      if (result.subtitle) lines.push(result.subtitle);
      break;
    case "quiz":
      lines.push(`Obtuve: ${result.headline} en el quiz`);
      if (result.subtitle) lines.push(result.subtitle);
      break;
    case "cedula":
      lines.push("Ya practique mi voto en el simulador de cedula");
      lines.push(result.headline);
      break;
    case "comparison":
      lines.push(`Compare candidatos: ${result.headline}`);
      break;
    case "level":
      lines.push(`Subi a ${result.headline} en Candidatazo`);
      break;
    default:
      lines.push(result.headline);
  }
  lines.push("");
  lines.push("Descubrelo tu tambien en candidatazo.com");
  return lines.join("\n");
}

function shareWhatsApp(text: string) {
  const encoded = encodeURIComponent(text + "\n" + SITE_URL);
  window.open(`https://wa.me/?text=${encoded}`, "_blank");
}

function shareFacebook() {
  const encoded = encodeURIComponent(SITE_URL);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encoded}`, "_blank");
}

function shareTwitter(text: string) {
  const encoded = encodeURIComponent(text);
  const url = encodeURIComponent(SITE_URL);
  window.open(`https://twitter.com/intent/tweet?text=${encoded}&url=${url}`, "_blank");
}

async function copyLink(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(SITE_URL);
    return true;
  } catch {
    return false;
  }
}

// ==================== Result Type Config ====================

const TYPE_CONFIG: Record<ShareResultType, { label: string; gradient: string; icon: string }> = {
  dna: {
    label: "ADN Politico",
    gradient: "from-red-600 via-red-500 to-white",
    icon: "\u{1F9EC}",
  },
  quiz: {
    label: "Resultado Quiz",
    gradient: "from-indigo-600 via-purple-500 to-pink-400",
    icon: "\u{1F4DD}",
  },
  cedula: {
    label: "Simulador de Cedula",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    icon: "\u{1F5F3}\uFE0F",
  },
  comparison: {
    label: "Comparacion",
    gradient: "from-amber-600 via-orange-500 to-yellow-400",
    icon: "\u2696\uFE0F",
  },
  level: {
    label: "Nuevo Nivel",
    gradient: "from-purple-700 via-indigo-500 to-blue-400",
    icon: "\u2B50",
  },
};

// ==================== Component ====================

export default function ShareCard({ result, onShare }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const incrementStat = useGamificationStore((s) => s.incrementStat);
  const addXP = useGamificationStore((s) => s.addXP);
  const config = TYPE_CONFIG[result.type];
  const shareText = buildShareText(result);

  function handleShare(platform: "whatsapp" | "facebook" | "twitter" | "copy") {
    incrementStat("sharesCount");
    addXP(XP_REWARDS.SHARE_RESULT, "Compartir resultado");
    onShare?.();

    switch (platform) {
      case "whatsapp":
        shareWhatsApp(shareText);
        break;
      case "facebook":
        shareFacebook();
        break;
      case "twitter":
        shareTwitter(shareText);
        break;
      case "copy":
        copyLink().then((ok) => {
          if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        });
        break;
    }
  }

  return (
    <div className="share-card-wrapper w-full max-w-md mx-auto">
      {/* ── Visual Card ── */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.gradient} p-[2px]`}
      >
        <div className="relative rounded-[22px] bg-gray-950 p-6">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Header */}
          <div className="relative flex items-center gap-2 mb-4">
            <span className="text-2xl">{config.icon}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {config.label}
            </span>
          </div>

          {/* Score ring (optional) */}
          {result.score !== undefined && (
            <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center">
              <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-gray-800"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${result.score * 2.76} 276`}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-3xl font-black text-white">{result.score}%</span>
            </div>
          )}

          {/* Main result */}
          <div className="relative text-center mb-3">
            <h3 className="text-xl font-black text-white leading-tight mb-1">{result.headline}</h3>
            {result.subtitle && (
              <p className="text-sm text-gray-400 font-medium">{result.subtitle}</p>
            )}
          </div>

          {/* Detail pills */}
          {result.details && result.details.length > 0 && (
            <div className="relative flex flex-wrap justify-center gap-2 mb-4">
              {result.details.map((detail, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-300"
                >
                  {detail}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="relative mt-4 border-t border-white/10 pt-4 text-center">
            <p className="text-sm font-bold text-gray-400">
              Descubrelo en{" "}
              <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent font-black">
                candidatazo.com
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Share Buttons ── */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {/* WhatsApp - Primary */}
        <button
          onClick={() => handleShare("whatsapp")}
          className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#25D366]/40 active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare("facebook")}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/20 transition-all hover:scale-105 active:scale-95"
          aria-label="Compartir en Facebook"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* Twitter / X */}
        <button
          onClick={() => handleShare("twitter")}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white shadow-lg shadow-black/20 transition-all hover:scale-105 active:scale-95 border border-gray-700"
          aria-label="Compartir en X"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* Copy Link */}
        <button
          onClick={() => handleShare("copy")}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all hover:scale-105 active:scale-95 ${
            copied
              ? "border-green-500 bg-green-500/10 text-green-400"
              : "border-gray-700 bg-gray-800 text-gray-400 hover:text-white"
          }`}
          aria-label="Copiar enlace"
        >
          {copied ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>
      </div>

      {copied && (
        <p className="mt-2 text-center text-xs font-medium text-green-400 animate-pulse">
          Enlace copiado al portapapeles
        </p>
      )}
    </div>
  );
}
