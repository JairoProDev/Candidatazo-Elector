type GtagFn = (command: string, eventName: string, params?: Record<string, any>) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  if (!w || typeof w.gtag !== "function") return null;
  return w.gtag as GtagFn;
}

export function trackAnalysis2026Event(
  eventName: string,
  params?: Record<string, any>,
): void {
  const gtag = getGtag();

  if (!gtag) return;
  gtag("event", eventName, params ?? {});
}

export function trackAnalysis2026EventDev(
  eventName: string,
  params?: Record<string, any>,
): void {
  // Útil para QA/dev aunque no exista gtag todavía.
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(`[Analysis2026 analytics] ${eventName}`, params ?? {});
  }

  trackAnalysis2026Event(eventName, params);
}

