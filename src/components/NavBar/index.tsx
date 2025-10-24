"use client";

import { useLanguage } from "@/context/language";
import { navbar } from "@/dictionary/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { language: lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const t = navbar[lang] ?? navbar.en;

  const goTo = (path: string, hash?: string) => {
    const p = path.startsWith("/") ? path : `/${path}`;
    let finalPath = `/${lang}${p}`;
    if (p === "/") finalPath = `/${lang}`;
    if (hash) finalPath += `#${hash}`;
    router.push(finalPath);
    setIsOpen(false);
  };

  const goPortal = () => goTo("/Portal");

  return (
    <nav
      className="sticky top-0 z-[1000] w-full text-[var(--color-bg)]"
      role="navigation"
      aria-label="Main"
    >
      <div
        className="
          mx-auto my-0
          w-full md:w-[92%] max-w-[1200px]
          h-[64px] md:h-[70px]
          px-4 md:px-8
          flex items-center justify-between
          rounded-none md:rounded-2xl
          bg-[color:var(--glass-bg,rgba(15,18,28,0.45))]
          backdrop-blur-xl
          ring-1 ring-white/10
          shadow-[0_8px_30px_rgba(0,0,0,0.18)]
          md:translate-y-3  
          pointer-events-auto
        "
      >
        <button
          onClick={() => goTo("/")}
          className="flex items-center shrink-0 cursor-pointer"
          aria-label="Home"
        >
          <img
            src="/assets/logosquare.png"
            alt="Achei Solutions"
            className="h-[44px] w-auto md:h-[50px]"
          />
        </button>

        {/* Toggle ONLY mobile */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="block md:hidden text-[28px] text-[var(--color-bg)]"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>

        <ul className="hidden md:flex list-none items-center gap-7 m-0 p-0">
          <NavLink onClick={() => goTo("/")}>{t.navbar.home}</NavLink>
          <NavLink onClick={() => goTo("/Services")}>
            {t.navbar.services}
          </NavLink>

          {/* Tel */}
          <li>
            <a
              href="tel:7272484349"
              className="text-[1.05rem] font-semibold whitespace-nowrap text-[var(--color-bg)] hover:text-[var(--color-secondary)] transition-colors"
            >
              (727) 248-4349
            </a>
          </li>

          {/* CTA PORTAL (destacado) */}
          <li>
            <button
              onClick={goPortal}
              className="
                ml-2 inline-flex items-center justify-center
                rounded-xl px-4 py-2
                font-semibold text-[0.98rem]
                bg-[var(--color-secondary)]/90 text-[var(--color-dark)]
                hover:bg-[var(--color-secondary)] transition-colors
                shadow-[0_6px_20px_rgba(72,198,224,0.25)]
                ring-1 ring-[var(--color-secondary)]/40
              "
              aria-label="Portal"
            >
              Portal
            </button>
          </li>
        </ul>
      </div>

      {/* Drawer mobile */}
      <ul
        id="mobile-menu"
        className={`
          ${isOpen ? "flex" : "hidden"}
          md:hidden flex-col gap-3
          absolute left-0 right-0 top-[64px]
          bg-[rgba(15,18,28,0.92)] backdrop-blur-lg
          border-t border-white/10 p-4
        `}
      >
        <NavLink mobile onClick={() => goTo("/")}>
          {t.navbar.home}
        </NavLink>
        <NavLink mobile onClick={() => goTo("/Services")}>
          {t.navbar.services}
        </NavLink>

        {/* Tel mobile */}
        <li>
          <a
            href="tel:7272484349"
            className="block text-center w-full text-[1.15rem] font-semibold text-[var(--color-bg)] hover:text-[var(--color-secondary)] rounded-lg hover:bg-white/10 py-2 transition-colors"
          >
            (727) 248-4349
          </a>
        </li>

        {/* CTA PORTAL mobile (full-width) */}
        <li>
          <button
            onClick={goPortal}
            className="
              w-full rounded-xl px-4 py-3 mt-1
              font-semibold
              bg-[var(--color-secondary)]/95 text-[var(--color-dark)]
              hover:bg-[var(--color-secondary)] transition-colors
              shadow-[0_6px_20px_rgba(72,198,224,0.28)]
              ring-1 ring-[var(--color-secondary)]/40
            "
          >
            Portal
          </button>
        </li>
      </ul>
    </nav>
  );
}

function NavLink({
  children,
  onClick,
  mobile,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  mobile?: boolean;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`
          relative cursor-pointer font-semibold leading-tight
          ${
            mobile ? "w-full text-center text-[1.15rem] py-2" : "text-[1.05rem]"
          }
          text-[var(--color-bg)] hover:text-[var(--color-secondary)] transition-colors
          after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
          after:bg-[var(--color-secondary)] hover:after:w-full after:transition-all
          ${mobile ? "rounded-lg hover:bg-white/10" : ""}
        `}
      >
        {children}
      </button>
    </li>
  );
}
