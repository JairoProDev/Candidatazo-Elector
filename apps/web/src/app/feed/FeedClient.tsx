"use client";

import { FeedShell } from "@/components/feed/FeedShell";
import { isFeedEnabled } from "@/lib/feed/featureFlags";
import { useEffect, useState } from "react";

export function FeedClient() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    setEnabled(isFeedEnabled());
  }, []);

  if (enabled === false) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-white px-4">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-secondary">Feed en beta</h1>
          <p className="mt-3 text-gray-600">
            Estamos activando el acceso progresivo. Vuelve pronto o prueba con una navegación a herramienta completa.
          </p>
          <p className="mt-3 text-[12px] text-gray-400">Tip: agrega `?forceFeed=1` para desbloquear en QA.</p>
          {typeof window !== "undefined" && (
            <a
              href={`/quiz?forceFeed=1`}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white font-extrabold px-6 py-3 rounded-xl shadow-card transition-all duration-200"
            >
              Ir a Mi Match
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  return <FeedShell />;
}

