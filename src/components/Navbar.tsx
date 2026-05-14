"use client";

import { useState } from "react";
import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { CTA_HREF } from "@/lib/launch";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "See It In Action", href: "#action" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-brand-dark/75 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 select-none"
          aria-label="InboxBuster home"
        >
          <BrandIcon size={22} />
          <span className="text-xl font-black uppercase tracking-widest leading-none">
            <span className="text-white">INBOX</span>
            <span className="text-brand-green">BUSTER</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-semibold uppercase tracking-wider text-white/60 transition-colors duration-200 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://app.inboxbuster.com/login"
            className="hidden md:inline-flex text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
          >
            Sign In
          </a>
          <a
            href={CTA_HREF}
            className="hidden md:inline-flex items-center rounded-full bg-brand-green px-5 py-2 text-sm font-bold uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
          >
            Get Started Free
          </a>

          <button
            className="flex md:hidden flex-col justify-center items-center w-8 h-8 gap-1.5 shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`block h-0.5 w-5 bg-white transition-all duration-200 origin-center ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-200 origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-brand-dark/95 backdrop-blur-lg px-6 py-5">
          <ul className="flex flex-col gap-5" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block text-sm font-semibold uppercase tracking-wider text-white/70 transition-colors duration-200 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-white/10 pt-5">
            <a
              href="https://app.inboxbuster.com/login"
              className="block text-sm font-semibold uppercase tracking-wider text-white/70 transition-colors duration-200 hover:text-white mb-4"
              onClick={() => setOpen(false)}
            >
              Sign In
            </a>
            <a
              href={CTA_HREF}
              className="block w-full rounded-full bg-brand-green py-3 text-center text-sm font-bold uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 active:scale-95"
              onClick={() => setOpen(false)}
            >
              Get Started Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
