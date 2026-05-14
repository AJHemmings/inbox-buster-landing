"use client";

import { CTA_HREF } from "@/lib/launch";

export default function FooterCTA() {
  return (
    <section
      className="py-24 px-6 bg-brand-dark"
      aria-label="Final call to action"
    >
      <div className="mx-auto max-w-3xl">
        <div
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #4ADE80)",
            padding: "1px",
            borderRadius: "1.25rem",
          }}
        >
          <div
            className="flex flex-col items-center text-center px-5 sm:px-10 py-10 sm:py-16 gap-6"
            style={{
              background: "#160D2E",
              borderRadius: "calc(1.25rem - 1px)",
            }}
          >
            <h2
              className="font-black leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Your inbox won&apos;t{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #4ADE80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                clean itself.
              </span>
            </h2>

            <p className="text-base text-white/55 lg:text-md max-w-sm leading-relaxed">
              Start with 1000 emails free. No card required.
            </p>

            <a
              href={CTA_HREF}
              className="inline-flex items-center rounded-full bg-brand-green px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base font-black uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(74,222,128,0.35), 0 8px 40px rgba(74,222,128,0.35)",
              }}
            >
              Get Started Free&nbsp;&rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
