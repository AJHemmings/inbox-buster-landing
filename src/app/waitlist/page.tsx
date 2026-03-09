"use client";

import { useState } from "react";
import Link from "next/link";

const PLATFORMS = ["Android", "iOS", "Web Browser"] as const;
const SOURCES = [
  { value: "google", label: "Google / Search" },
  { value: "social", label: "Social media" },
  { value: "friend", label: "Friend or word of mouth" },
  { value: "reddit", label: "Reddit" },
  { value: "other", label: "Other" },
] as const;

type Platform = (typeof PLATFORMS)[number];

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    source?: string;
    platforms?: string;
  }>({});

  function togglePlatform(p: Platform) {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function validate() {
    const errors: typeof fieldErrors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address";
    }
    if (!source) {
      errors.source = "Please tell us how you heard about us";
    }
    if (platforms.length === 0) {
      errors.platforms = "Please select at least one platform";
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError("");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, platforms }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#0F0A1E" }}
    >
      {/* ── Background blooms (mirrors Hero) ──────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          top: "-10%",
          left: "-15%",
          width: "70vw",
          height: "70vw",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.05) 45%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          bottom: "-5%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at center, rgba(74,222,128,0.08) 0%, transparent 65%)",
          filter: "blur(1px)",
        }}
      />

      {/* ── Nav ───────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
          <span className="text-brand-green font-black text-lg">⚡</span>
          <span
            className="font-black uppercase tracking-widest text-sm"
            style={{
              background: "linear-gradient(110deg, #8B5CF6 10%, #4ADE80 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            INBOXBUSTER
          </span>
        </Link>

        <Link
          href="/"
          className="text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          ← Back to home
        </Link>
      </nav>

      {/* ── Page content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-lg px-6 pb-20 pt-8 lg:px-0">
        {success ? (
          /* ── Success state ──────────────────────────────────────── */
          <div className="flex flex-col items-center text-center gap-6 pt-12">
            <div className="text-6xl">🎉</div>
            <h1 className="text-3xl font-black text-white">
              You&apos;re on the list!
            </h1>
            <p className="text-white/60 leading-relaxed">
              We&apos;ll email you at{" "}
              <span className="font-semibold text-white/80">{email}</span> when
              Inbox Buster launches.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center rounded-full border border-brand-purple/60 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white/80 transition-all duration-200 hover:border-brand-purple hover:text-white hover:bg-brand-purple/10"
            >
              ← Back to home
            </Link>
          </div>
        ) : (
          /* ── Form state ─────────────────────────────────────────── */
          <>
            {/* Header copy */}
            <div className="mb-8">
              <h1 className="mb-3 text-4xl font-black text-white leading-tight">
                Get early access.
              </h1>
              <p className="mb-4 text-white/60 leading-relaxed">
                Be among the first to use Inbox Buster and take back control of
                your inbox.
              </p>
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  borderColor: "rgba(139,92,246,0.35)",
                }}
              >
                <span>🎁</span>
                <span className="text-xs font-bold text-brand-purple">
                  First 100 sign-ups get their first year free.
                </span>
              </div>
            </div>

            {/* Form card */}
            <div
              className="rounded-2xl border p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-white/80"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: fieldErrors.email
                        ? "1px solid rgba(239,68,68,0.7)"
                        : "1px solid rgba(255,255,255,0.10)",
                      boxShadow: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(139,92,246,0.70)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(139,92,246,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = fieldErrors.email
                        ? "rgba(239,68,68,0.7)"
                        : "rgba(255,255,255,0.10)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-400">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Source */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="source"
                    className="text-sm font-semibold text-white/80"
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="source"
                    value={source}
                    onChange={(e) => {
                      setSource(e.target.value);
                      setFieldErrors((prev) => ({
                        ...prev,
                        source: undefined,
                      }));
                    }}
                    className="rounded-xl px-4 py-3 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: fieldErrors.source
                        ? "1px solid rgba(239,68,68,0.7)"
                        : "1px solid rgba(255,255,255,0.10)",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.4)' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(139,92,246,0.70)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(139,92,246,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = fieldErrors.source
                        ? "rgba(239,68,68,0.7)"
                        : "rgba(255,255,255,0.10)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="" disabled style={{ background: "#1a1030" }}>
                      Select an option…
                    </option>
                    {SOURCES.map((s) => (
                      <option
                        key={s.value}
                        value={s.value}
                        style={{ background: "#1a1030" }}
                      >
                        {s.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.source && (
                    <p className="text-xs text-red-400">{fieldErrors.source}</p>
                  )}
                </div>

                {/* Platforms */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-white/80">
                    Which platforms interest you?
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {PLATFORMS.map((p) => {
                      const checked = platforms.includes(p);
                      return (
                        <label
                          key={p}
                          className="flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 transition-all select-none"
                          style={{
                            background: checked
                              ? "rgba(139,92,246,0.15)"
                              : "rgba(255,255,255,0.05)",
                            borderColor: checked
                              ? "rgba(139,92,246,0.60)"
                              : "rgba(255,255,255,0.10)",
                          }}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            onChange={() => {
                              togglePlatform(p);
                              setFieldErrors((prev) => ({
                                ...prev,
                                platforms: undefined,
                              }));
                            }}
                          />
                          <span
                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all"
                            style={{
                              background: checked
                                ? "#8B5CF6"
                                : "transparent",
                              borderColor: checked
                                ? "#8B5CF6"
                                : "rgba(255,255,255,0.30)",
                            }}
                          >
                            {checked && (
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                              >
                                <path
                                  d="M1 4l3 3 5-6"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <span className="text-sm font-medium text-white/80">
                            {p}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {fieldErrors.platforms && (
                    <p className="text-xs text-red-400">
                      {fieldErrors.platforms}
                    </p>
                  )}
                </div>

                {/* API-level error */}
                {apiError && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {apiError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full py-3.5 text-sm font-black uppercase tracking-wider text-brand-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: loading
                      ? "rgba(74,222,128,0.7)"
                      : "#4ADE80",
                    boxShadow: loading
                      ? "none"
                      : "0 0 0 1px rgba(74,222,128,0.3), 0 8px 32px rgba(74,222,128,0.25)",
                  }}
                >
                  {loading ? "Joining…" : "Join the Waiting List →"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
