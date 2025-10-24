"use client";

import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";

interface Card {
  title: string;
  description: string;
}

export default function AvonMap() {
  const { language: lang } = useLanguage();
  const currentTranslations = translations[lang] || translations["pt"];

  const formatText = (text: string) => {
    const paragraphs = text.split("\n\n");
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith("- ")) {
        const listItems = paragraph.split("\n- ").filter(Boolean);
        return (
          <ul key={index} className="my-5 pl-5">
            {listItems.map((item, i) => (
              <li
                key={i}
                className="mb-2 relative list-none before:content-['•'] before:absolute before:-left-5 before:text-green-500 before:font-bold"
              >
                {item}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="mb-6 text-justify">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-2 font-inter bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1200px] mx-auto pb-5">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {currentTranslations?.fetures2.Cards?.map(
              (card: Card, index: number) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow transition-transform duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-[#102240] mb-4 text-lg font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2 pb-5 md:order-first">
          <img
            src="/assets/topavonmap.png"
            alt="Descrição da imagem"
            className="w-full max-w-[500px] mx-auto mb-5 block text-center"
          />
          <div className="text-justify text-[#014283] leading-relaxed text-sm md:text-base md:max-w-[1000px] md:px-10 md:text-[1.1rem] mx-auto mb-8">
            {formatText(currentTranslations?.fetures2.Text || "")}
          </div>
        </div>
      </div>
    </div>
  );
}
