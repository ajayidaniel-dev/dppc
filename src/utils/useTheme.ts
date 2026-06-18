import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "dppc-theme";

const isBrowser = typeof window !== "undefined";

const systemQuery = (): MediaQueryList | null =>
  isBrowser ? window.matchMedia("(prefers-color-scheme: dark)") : null;

const getStoredTheme = (): Theme => {
  if (!isBrowser) return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
};

export const resolveTheme = (theme: Theme): ResolvedTheme => {
  if (theme === "system") {
    return systemQuery()?.matches ? "dark" : "light";
  }
  return theme;
};

/** Apply the resolved theme to the <html> element. */
const applyTheme = (theme: Theme): void => {
  if (!isBrowser) return;
  const resolved = resolveTheme(theme);
  document.documentElement.classList.toggle("dark", resolved === "dark");
};

let currentTheme: Theme = getStoredTheme();
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

export const setTheme = (theme: Theme): void => {
  currentTheme = theme;
  if (isBrowser) window.localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  emit();
};

// Keep the document in sync with OS changes while in "system" mode.
if (isBrowser) {
  applyTheme(currentTheme);
  systemQuery()?.addEventListener("change", () => {
    if (currentTheme === "system") {
      applyTheme(currentTheme);
      emit();
    }
  });
}

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = (): Theme => currentTheme;

const getServerSnapshot = (): Theme => "system";

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    theme,
    resolvedTheme: resolveTheme(theme),
    setTheme,
  };
};
