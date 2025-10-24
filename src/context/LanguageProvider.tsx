// src/context/LanguageProvider.tsx
"use client";

import type { LanguageKeys } from "@/lib/translations";
import { LanguageContext } from "./language";

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: LanguageKeys;
}) {
  return (
    <LanguageContext initialLang={initialLang}>{children}</LanguageContext>
  );
}
