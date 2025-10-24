"use client";

import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";

export default function Features() {
  const { language: lang } = useLanguage();
  const t = (translations[lang] ?? translations.en).features;

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      {/* Primeira linha - Texto à esquerda, imagem à direita */}
      <div className="flex items-center gap-8 mb-16 md:flex-row flex-col">
        <div className="flex-1 text-[#333]">
          <h2>{t.section1.title}</h2>
          <p>{t.section1.text}</p>
        </div>
        <div className="flex-1">
          <img
            src="/assets/fetures/image1.webp"
            alt="Feature 1"
            className="w-full h-auto rounded-lg block"
          />
        </div>
      </div>

      {/* Segunda linha - Texto à direita, imagem à esquerda */}
      <div className="flex items-center gap-8 mb-16 md:flex-row flex-col-reverse">
        <div className="flex-1">
          <img
            src="/assets/fetures/image2.jpg"
            alt="Feature 2"
            className="w-full h-auto rounded-lg block"
          />
        </div>
        <div className="flex-1 text-[#333]">
          <h2>{t.section2.title}</h2>
          <p>{t.section2.text}</p>
        </div>
      </div>
    </div>
  );
}
