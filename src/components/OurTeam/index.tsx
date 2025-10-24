"use client";

import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";

export default function OurTeam() {
  const { language: lang } = useLanguage();
  const t = translations[lang].aboutUs;

  return (
    <div className="px-6 py-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Francisco */}
        <div className="flex-1 text-center text-[#014283]">
          <img
            src="/assets/profile1.png"
            alt={t.francisco.name}
            className="w-[150px] h-[150px] rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">{t.francisco.name}</h3>
          <p className="mt-2 text-sm md:text-base">{t.francisco.description}</p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-48 bg-gray-300"></div>
        <div className="block md:hidden w-full h-px bg-gray-300 my-6"></div>

        {/* Murilo */}
        <div className="flex-1 text-center text-[#014283]">
          <img
            src="/assets/profile2.png"
            alt={t.murilo.name}
            className="w-[150px] h-[150px] rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">{t.murilo.name}</h3>
          <p className="mt-2 text-sm md:text-base">{t.murilo.description}</p>
        </div>
      </div>
    </div>
  );
}
