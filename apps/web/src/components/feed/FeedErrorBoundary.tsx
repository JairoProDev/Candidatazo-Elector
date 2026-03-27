"use client";

import type { ReactNode } from "react";
import React from "react";
import { trackFeedEventDev } from "@/lib/analytics/feedAnalytics";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class FeedErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Observabilidad mínima en consola + analytics dev.
    // We intentionally avoid failing the whole route on preview errors.
    // eslint-disable-next-line no-console
    console.error("[FeedErrorBoundary]", error);
    trackFeedEventDev(
      {
        cardId: "feed",
        cardType: "match",
        action: "view_card",
        meta: { message: error instanceof Error ? error.message : String(error) },
      } as any,
      "feed_error_boundary",
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-white px-4">
          <div className="max-w-lg text-center">
            <h2 className="text-xl font-extrabold text-secondary">Ups: algo falló</h2>
            <p className="mt-2 text-gray-600">
              Estamos cargando la próxima tarjeta. Si el problema persiste, recarga la página.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

