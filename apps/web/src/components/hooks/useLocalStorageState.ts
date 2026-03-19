"use client";

import { useEffect, useMemo, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
) {
  const initial = useMemo(() => initialValue, [initialValue]);
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return;
      setState(JSON.parse(raw) as T);
    } catch {
      // ignore parse errors
    }
  }, [key]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [key, state]);

  return [state, setState] as const;
}

