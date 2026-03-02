"use client";

export default function FooterCTA() {
  return (
    <section
      className="bg-white py-24 px-6"
      aria-label="Final call to action"
    >
      <div className="mx-auto max-w-3xl">
        {/* Gradient-border card: outer div provides the gradient "border" via 1px padding */}
        <div
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #4ADE80)",
            padding: "1px",
            borderRadius: "1.25rem",
          }}
        >
          {/* Inner white card */}
          <div
            className="bg-white flex flex-col items-center text-center px-10 py-16 gap-6"
            style={{ borderRadius: "calc(1.25rem - 1px)" }}
          >
            {/* Headline */}
            <h2 className="font-black leading-[1.05] tracking-tight text-gray-900"
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

            {/* Subhead */}
            <p className="text-base text-gray-500 lg:text-lg max-w-sm leading-relaxed">
              Start with 500 emails free. No card required.
            </p>

            {/* CTA button */}
            <a
              href="#pricing"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-4 text-base font-black uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
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
