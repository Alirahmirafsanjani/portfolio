"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { content, localeMeta, locales } from "@/content";
import type { Locale, PortfolioContent } from "@/content/types";
import { useHydrated } from "@/lib/use-hydrated";

const STORAGE_KEY = "portfolio-locale";
const CHANGE_EVENT = "portfolio-locale-change";

interface LanguageContextValue {
  locale: Locale;
  t: PortfolioContent;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && locales.includes(stored as Locale)) return stored as Locale;
  } catch {
    /* storage may be unavailable (private mode) */
  }
  return null;
}

/** The visitor's preferred locale: persisted choice first, browser language second. */
function readBrowserLocale(): Locale {
  const stored = readStoredLocale();
  if (stored) return stored;

  const preferred = window.navigator.language?.toLowerCase() ?? "en";
  return preferred.startsWith("id") ? "id" : "en";
}

function subscribeToLocale(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function getClientLocale(): Locale {
  return readBrowserLocale();
}

function getServerLocale(): Locale {
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The locale lives in an external store (localStorage). React renders the
  // server snapshot ("en") during hydration and swaps to the visitor's choice
  // straight afterwards — no setState inside an effect, no hydration mismatch.
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getClientLocale,
    getServerLocale,
  );
  const isReady = useHydrated();

  // Keep the document language in sync for screen readers and SEO.
  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable — the language still switches */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "id" : "en");
  }, [locale, setLocale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      t: content[locale],
      setLocale,
      toggleLocale,
      isReady,
    }),
    [locale, setLocale, toggleLocale, isReady],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within <LanguageProvider>");
  }
  return ctx;
}
