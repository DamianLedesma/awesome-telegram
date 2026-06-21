"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppState } from "@/lib/types";
import { defaultState, loadState, saveState } from "@/lib/storage";

interface Ctx {
  state: AppState;
  setState: (updater: (prev: AppState) => AppState) => void;
  ready: boolean;
}

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setRaw] = useState<AppState>(defaultState);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR/client mismatch.
  useEffect(() => {
    setRaw(loadState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveState(state);
  }, [state, ready]);

  const value = useMemo<Ctx>(
    () => ({
      state,
      ready,
      setState: (updater) => setRaw((prev) => updater(prev)),
    }),
    [state, ready],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
