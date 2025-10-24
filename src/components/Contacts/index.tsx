"use client";

import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contacts() {
  const { language: lang } = useLanguage();
  const t = translations[lang].contacts;

  return (
    <div className="px-6 py-8 md:py-20 max-w-[1200px] mx-auto scroll-mt-20">
      <h2 className="text-center text-2xl font-semibold text-[#014283] mb-10">
        {t.title}
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Francisco */}
        <div className="flex-1 text-center text-[#014283]">
          <h3 className="text-xl font-semibold">{t.francisco.name}</h3>
          <div className="my-4 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-lg text-[#014283]"
              />
              <span>{t.francisco.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-lg text-[#014283]"
              />
              <span>{t.francisco.email}</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href={t.francisco.facebook}
              aria-label="Facebook"
              className="text-xl text-[#014283] hover:text-[#012a5c] transition-colors"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href={t.francisco.instagram}
              aria-label="Instagram"
              className="text-xl text-[#014283] hover:text-[#012a5c] transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-48 bg-gray-300"></div>
        <div className="block md:hidden w-full h-px bg-gray-300 my-6"></div>

        {/* Murilo */}
        <div className="flex-1 text-center text-[#014283]">
          <h3 className="text-xl font-semibold">{t.murilo.name}</h3>
          <div className="my-4 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-lg text-[#014283]"
              />
              <span>{t.murilo.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-lg text-[#014283]"
              />
              <span>{t.murilo.email}</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href={t.murilo.facebook}
              aria-label="Facebook"
              className="text-xl text-[#014283] hover:text-[#012a5c] transition-colors"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href={t.murilo.instagram}
              aria-label="Instagram"
              className="text-xl text-[#014283] hover:text-[#012a5c] transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
