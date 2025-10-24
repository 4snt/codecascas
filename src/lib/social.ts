// lib/social.ts
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export type SocialLinkItem = {
  href: string;
  label: string;
  icon: IconDefinition;
};

export const defaultSocialLinks: SocialLinkItem[] = [
  { href: "https://facebook.com", label: "Facebook", icon: faFacebook },
  {
    href: "https://www.instagram.com/achei_solutions",
    label: "Instagram",
    icon: faInstagram,
  },
  { href: "https://wa.me/17272484349", label: "WhatsApp", icon: faWhatsapp },
];
