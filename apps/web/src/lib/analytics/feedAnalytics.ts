import type { FeedAnalyticsPayload, FeedCardType } from "@/lib/feed/feedTypes";

type ActionName = FeedAnalyticsPayload["action"];

function getGtag(): ((...args: any[]) => void) | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  if (!w || typeof w.gtag !== "function") return null;
  return w.gtag;
}

export function trackFeedEvent(
  eventName: string,
  payload: Omit<FeedAnalyticsPayload, "action"> & { action: ActionName; cardType?: FeedCardType },
): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", eventName, payload ?? {});
}

export function trackFeedEventDev(payload: FeedAnalyticsPayload, eventName: string): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(`[feed analytics] ${eventName}`, payload);
  }
  trackFeedEvent(eventName, payload as any);
}

