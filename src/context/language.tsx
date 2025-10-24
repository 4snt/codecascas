// src/context/language.tsx
"use client";

import type { LanguageKeys } from "@/lib/translations";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LangContext = {
  language: LanguageKeys;
  setLanguage: (lang: LanguageKeys) => void;
};

const SUPPORTED: LanguageKeys[] = ["en", "pt", "es"];
const Context = createContext<LangContext | null>(null);

export function LanguageContext({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: LanguageKeys;
}) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<LanguageKeys>(initialLang);

  // 1) URL -> Context (URL sempre vence)
  useEffect(() => {
    if (!pathname) return;
    const seg1 = pathname.split("/")[1] as LanguageKeys | undefined;
    if (seg1 && SUPPORTED.includes(seg1) && seg1 !== language) {
      setLanguage(seg1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 2) Carrega cache SÓ se não houver idioma válido na URL
  useEffect(() => {
    try {
      const seg1 = pathname?.split("/")[1] as LanguageKeys | undefined;
      if (seg1 && SUPPORTED.includes(seg1)) return; // já resolvido pela URL
      const stored = localStorage.getItem("lang") as LanguageKeys | null;
      if (stored && SUPPORTED.includes(stored) && stored !== language) {
        setLanguage(stored);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3) Salva cache
  useEffect(() => {
    try {
      localStorage.setItem("lang", language);
    } catch {}
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useLanguage = () => {
  const ctx = useContext(Context);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageContext>");
  return ctx;
};
