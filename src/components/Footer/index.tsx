"use client";

import { useLanguage } from "@/context/language";
import { footer } from "@/dictionary/footer";
import { navbar } from "@/dictionary/navbar";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const { language: lang } = useLanguage();

  const nav = (navbar[lang] ?? navbar.en).navbar;
  const t = (footer[lang] ?? footer.en).footer;

  const currentYear = new Date().getFullYear();

  const goTo = (path: string, hash?: string) => {
    const formattedPath = path.startsWith("/") ? path : `/${path}`;
    let finalPath = `/${lang}${formattedPath}`;
    if (formattedPath === "/") finalPath = `/${lang}`;
    if (hash) finalPath += `#${hash}`;
    router.push(finalPath);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.subscribeSuccess);
  };

  return (
    <footer className="w-full bg-[var(--color-dark)] text-white pt-[60px]">
      <div className="mx-auto max-w-[1200px] px-[4%] flex flex-wrap justify-between">
        {/* Col 1 */}
        <div className="flex-1 min-w-[250px] mb-10 pr-[30px] md:pr-0">
          <button onClick={() => goTo("/")} className="mb-5 cursor-pointer">
            <img
              src="/assets/logobranca.png"
              alt="Achei LLC Logo"
              className="h-[70px] w-auto"
            />
          </button>
          <p className="text-[14px] leading-[1.6]">{t.companyDescription}</p>
        </div>

        {/* Col 2 */}
        <div className="flex-1 min-w-[250px] mb-10 pr-[30px] md:pr-0">
          <h3 className="text-[18px] font-semibold mb-5">{t.sitemap}</h3>
          <ul className="list-none m-0 p-0 space-y-3">
            <FooterLink onClick={() => goTo("/")}>{nav.home}</FooterLink>
            <FooterLink onClick={() => goTo("/Services")}>
              {nav.services}
            </FooterLink>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="flex-1 min-w-[250px] mb-10 pr-[30px] md:pr-0">
          <h3 className="text-[18px] font-semibold mb-5">{t.subscribe}</h3>

          <form onSubmit={onSubmit} className="flex mb-5 max-w-[300px]">
            <input
              type="email"
              required
              placeholder={t.emailPlaceholder}
              className="
                flex-1 px-4 py-2.5 text-[14px]
                outline-none border-0
                rounded-l-md
                text-black
              "
            />
            <button
              type="submit"
              className="
                w-[45px] flex items-center justify-center
                rounded-r-md border-0
                text-white
                transition-colors
                bg-[var(--brand-light)] hover:bg-[#7bd2d0]
              "
              aria-label="Subscribe"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <div className="flex gap-[15px]">
            <SocialIcon
              href="https://www.instagram.com/achei_solutions?igsh=NDQ2aWhucDJ2cjFk&utm_source=qr"
              label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </SocialIcon>
            <a
              href="tel:7272484349"
              aria-label="Phone"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-black/10 text-white text-[18px] transition-all hover:bg-[var(--brand-light)] hover:-translate-y-[3px]"
            >
              <FontAwesomeIcon icon={faPhone} />
            </a>
            <SocialIcon href="https://wa.me/17272484349" label="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </SocialIcon>
          </div>
        </div>
      </div>

      <div
        className="
          mt-5 px-[4%] py-5
          border-t border-white/10
          bg-[#001628]
          flex flex-wrap items-center justify-between gap-3
          text-[13px]
        "
      >
        <p className="m-0">
          © {currentYear} Achei LLC. {t.allRightsReserved}
        </p>
        <div className="flex gap-5">
          <button
            onClick={() => goTo("/privacy")}
            className="hover:text-[var(--brand-light)] transition-colors"
          >
            {t.privacyPolicy}
          </button>
          <span className="hover:text-[var(--brand-light)] transition-colors">
            {t.cookieSettings}
          </span>
        </div>
      </div>
    </footer>
  );
}

/* --- subcomponents --- */
function FooterLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-left text-[14px] hover:text-[var(--brand-light)] transition-colors"
      >
        {children}
      </button>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex items-center justify-center w-9 h-9
        rounded-full bg-black/10 text-white text-[18px]
        transition-all hover:bg-[var(--brand-light)] hover:-translate-y-[3px]
      "
    >
      {children}
    </a>
  );
}
