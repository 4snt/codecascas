"use client";

import ClientsStrip from "@/components/ClientStrip";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <Hero />
      <ClientsStrip />
      <Features />
    </>
  );
}
