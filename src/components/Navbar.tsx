"use client";

import { Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "See It In Action", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{ backgroundColor: "rgba(15, 10, 30, 0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Wordmark */}
        <a href="/" className="flex items-center gap-2 select-none" aria-label="Inbox Buster home">
          <Zap
            size={22}
            className="text-brand-green"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden="true"
          />
          <span className="text-xl font-black uppercase tracking-widest leading-none">
            <span className="text-white">INBOX</span>
            <span className="text-brand-green">BUSTER</span>
          </span>
        </a>

        {/* Desktop nav links */}
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

        {/* CTA */}
        <a
          href="#pricing"
          className="inline-flex items-center rounded-full bg-brand-green px-5 py-2 text-sm font-bold uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
        >
          Get Started Free
        </a>

      </nav>
    </header>
  );
}
