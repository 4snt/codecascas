"use client";

import { QuoteForm } from "@/components/QuoteForm";
import { SocialBar } from "@/components/SocialBar";
import { useLanguage } from "@/context/language";
import { defaultSocialLinks, type SocialLinkItem } from "@/lib/social";
import { translations, type LanguageKeys } from "@/lib/translations";
import { useEffect, useMemo, useState } from "react";

type Props = {
  navHeight?: number;
  videoSrc?: string;
  socialLinks?: SocialLinkItem[];
};

export default function Hero({
  navHeight = 70,
  videoSrc = "/assets/bannerVideo1.mp4.mp4",
  socialLinks = defaultSocialLinks,
}: Props) {
  const { language: lang } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((p) => ((p % 4) + 1) as 1 | 2 | 3 | 4);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const dict = (translations[lang as LanguageKeys] ?? translations.en) as any;
  const t = dict?.[`carousel${currentSlide}`];

  const [line1, line2] = useMemo(() => {
    const raw = String(t?.title ?? "");
    if (!raw) return ["", ""];
    if (raw.includes("\n")) {
      const [a, b] = raw.split("\n");
      return [a, b];
    }
    const mid = Math.floor(raw.length / 2);
    const cut = raw.lastIndexOf(
      " ",
      Math.min(raw.length - 1, mid + Math.floor(raw.length * 0.1))
    );
    const idx = cut >= 0 ? cut : mid;
    return [raw.slice(0, idx).trim(), raw.slice(idx).trim()];
  }, [t?.title]);

  return (
    <>
      <section
        className="
          relative w-full overflow-hidden isolate
          h-[clamp(460px,70vh,760px)]
          md:-mt-[70px]
        "
      >
        {/* Socials */}
        <SocialBar
          navHeight={navHeight}
          links={socialLinks}
          position="overSlides"
        />

        {/* BG video + overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <video
            className="
              w-full h-full
              object-cover
              md:object-[50%_35%]  /* ajusta o ponto focal em telas maiores */
              sm:object-[50%_45%]  /* ajusta zoom em telas menores */
              xs:object-[50%_50%]  /* mais zoom em telas muito pequenas */
              scale-[1.1]  /* pequeno zoom adicional para garantir cobertura */
            "
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* um pouco mais de escurecimento à esquerda pra legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* Conteúdo + Form */}
        <div className="relative z-[2] h-full">
          {/* bloco de texto com gutter responsivo */}
          <div
            className="
              absolute
              left-[clamp(20px,8vw,90px)] right-[clamp(16px,6vw,60px)]
              top-1/2 -translate-y-[44%]
              max-w-[min(880px,92vw)]
              text-[var(--brand-white)]
              md:absolute md:top-1/2 md:-translate-y-1/2 
              md:px-[clamp(20px,8vw,90px)]
            "
          >
            <h1
              className="
                m-0 mb-3 font-extrabold leading-[1.15]
                /* ajuste do tamanho do texto */
                text-[clamp(24px,4vw,32px)]
                md:text-[clamp(28px,3.5vw,38px)]
                /* centraliza no mobile, alinha à esquerda no md+ */
                text-center md:text-left
                text-balance
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]
              "
            >
              <span className="text-[var(--brand-white)]">{line1}</span>
              {!!line2 && (
                <>
                  <br />
                  {/* mesmo azul do subtítulo, sem neon */}
                  <span className="text-[var(--brand-cyan)]">{line2}</span>
                </>
              )}
            </h1>

            <p
              className="
                m-0 font-medium
                text-[clamp(16px,2vw,18px)]
                text-[var(--brand-cyan)]
                text-center md:text-left
                max-w-[66ch]
                drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]
              "
            >
              {t?.subtitle}
            </p>
          </div>

          {/* form à direita (≥ lg) */}
          <div
            className="
              hidden lg:block
              absolute right-[clamp(60px,6.5vw,120px)] top-1/2 -translate-y-1/2
              w-[clamp(320px,24vw,420px)]
            "
          >
            <QuoteForm lang={lang as LanguageKeys} />
          </div>
        </div>

        {/* indicadores */}
        <div className="absolute z-[3] left-1/2 -translate-x-1/2 bottom-[clamp(14px,5vh,36px)] flex gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i as 1 | 2 | 3 | 4)}
              aria-label={`Go to slide ${i}`}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === i
                  ? "bg-[var(--brand-cyan)] shadow-[0_0_8px_rgba(72,198,224,0.7)] scale-110"
                  : "bg-[var(--brand-white)]/90"
              }`}
            />
          ))}
        </div>
      </section>

      {/* FORM ABAIXO (MOBILE/TABLET) */}
      <div className="lg:hidden relative z-[2] px-4 py-8">
        <div className="mx-auto w-full max-w-[560px] min-h-[48vh] grid place-items-center">
          <QuoteForm lang={lang as LanguageKeys} />
        </div>
      </div>
    </>
  );
}
