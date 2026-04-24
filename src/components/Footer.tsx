import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="bg-brand-dark border-t border-white/5"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 select-none shrink-0"
            aria-label="Inbox Buster home"
          >
            <BrandIcon size={20} />
            <span className="text-lg font-black uppercase tracking-widest leading-none">
              <span className="text-white">INBOX</span>
              <span className="text-brand-green">BUSTER</span>
            </span>
          </Link>

          <nav aria-label="Footer navigation">
            <ul
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              role="list"
            >
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center md:items-end gap-0.5 shrink-0">
            <span className="text-sm text-white/60">
              Available on Android and web
            </span>
            <span className="text-xs text-white/30">iOS coming soon</span>
          </div>
        </div>

        <div className="my-8 border-t border-white/5" />

        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <p className="text-xs text-white/30">
            🌱 Stripe Climate member. 1% to carbon removal.
          </p>
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Inbox Buster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
