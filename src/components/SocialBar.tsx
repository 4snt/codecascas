"use client";

import type { SocialLinkItem } from "@/lib/social";
import { SocialLink } from "./SocialLinks";

type SocialBarProps = {
  links: SocialLinkItem[];
  className?: string;
  /**
   * Posição: "overSlides" centraliza no rodapé, acima dos indicadores.
   * (padrão) */
  position?: "overSlides" | "topRight";
  /** altura da navbar – só usado em topRight */
  navHeight?: number;
};

export function SocialBar({
  links,
  className,
  position = "overSlides",
  navHeight = 70,
}: SocialBarProps) {
  const base =
    "z-[1005] flex items-center gap-3 rounded-full bg-black/30 backdrop-blur-md px-3 py-1.5 text-[var(--brand-white)]";

  if (position === "topRight") {
    return (
      <div
        className={`${base} absolute right-3 ${className ?? ""}`}
        style={{ top: Math.max(8, navHeight + 8) }}
      >
        {links.map((item) => (
          <SocialLink
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    );
  }

  // ===== overSlides: centralizado acima dos dots =====
  return (
    <div
      className={`${base} absolute left-1/2 -translate-x-1/2 ${
        className ?? ""
      }`}
      // distância do fundo para ficar acima dos indicadores
      // ajuste fino conforme seu espaçamento:
      style={{ bottom: "calc(clamp(14px,5vh,36px) + 40px)" }}
    >
      {links.map((item) => (
        <SocialLink
          key={item.label}
          href={item.href}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
