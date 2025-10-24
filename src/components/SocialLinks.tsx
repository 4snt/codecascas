import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: any;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="
        grid place-items-center w-9 h-9 rounded-full
        text-[1.15rem] text-[var(--brand-white)]
        transition hover:text-[var(--brand-cyan)] hover:[text-shadow:0_0_8px_#48c6e0]
        hover:-translate-y-[1px] hover:scale-[1.05]
      "
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
