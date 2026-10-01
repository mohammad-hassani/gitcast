"use client";

import { createContext, Fragment, useContext, useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import {
  defaultLocale,
  isLocale,
  translate,
  translations,
} from "@/content/i18n/translations";
import type { Locale, TranslationKey, TranslationValues } from "@/content/i18n/translations";

export type { Locale } from "@/content/i18n/translations";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const LOCALE_STORAGE_KEY = "gitcast:locale";
const localeListeners = new Set<() => void>();

function subscribeToLocale(listener: () => void) {
  localeListeners.add(listener);
  return () => localeListeners.delete(listener);
}

function getStoredLocale(): Locale {
  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return storedLocale && isLocale(storedLocale) ? storedLocale : defaultLocale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getStoredLocale,
    () => defaultLocale,
  );

  useEffect(() => {
    document.documentElement.lang = translations[locale].intlLocale;
    document.documentElement.dir = translations[locale].direction;
  }, [locale]);

  function setLocale(nextLocale: Locale) {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    localeListeners.forEach((listener) => listener());
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider.");
  }
  return context;
}

export function useTranslation() {
  const { locale } = useLocale();
  return (key: TranslationKey, values?: TranslationValues) =>
    translate(locale, key, values);
}

export function LocaleText({
  id,
  values,
}: {
  id: TranslationKey;
  values?: TranslationValues;
}) {
  const t = useTranslation();
  return <>{t(id, values).split("\n").map((line, index) => (
    <Fragment key={`${id}-${index}`}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ))}</>;
}
