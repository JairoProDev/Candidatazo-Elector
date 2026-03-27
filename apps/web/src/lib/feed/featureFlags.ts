"use client";

export function getFeedRolloutPercent(): number {
  const raw = process.env.NEXT_PUBLIC_FEED_ROLLOUT_PERCENT;
  const n = raw ? Number(raw) : 20;
  if (!Number.isFinite(n)) return 20;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function getOrCreateBucket(storageKey: string, rolloutPercent: number) {
  try {
    const existing = localStorage.getItem(storageKey);
    if (existing) return Number(existing);
    const bucket = Math.floor(Math.random() * 100);
    localStorage.setItem(storageKey, String(bucket));
    return bucket;
  } catch {
    // Fallback determinístico: no bloquear UX.
    return Math.floor(Math.random() * Math.max(1, Math.min(rolloutPercent, 100)));
  }
}

export function isFeedEnabled(): boolean {
  const rolloutPercent = getFeedRolloutPercent();
  if (rolloutPercent >= 100) return true;
  const bucket = getOrCreateBucket("candidatazo:feed:bucket", rolloutPercent);
  return bucket < rolloutPercent;
}

