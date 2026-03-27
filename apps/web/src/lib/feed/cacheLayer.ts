type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

// Simple in-memory cache with TTL.
// NOTE: This is a placeholder for SWR/React Query migration (see docs).
const mem = new Map<string, CacheEntry<unknown>>();

export async function cachedFetch<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const existing = mem.get(key) as CacheEntry<T> | undefined;
  if (existing && existing.expiresAt > now) return existing.value;

  const value = await fetcher();
  mem.set(key, { value, expiresAt: now + Math.max(0, ttlMs) });
  return value;
}

export function clearCache(keyPrefix?: string) {
  if (!keyPrefix) {
    mem.clear();
    return;
  }
  for (const k of mem.keys()) {
    if (k.startsWith(keyPrefix)) mem.delete(k);
  }
}

