"use client";

import { useEffect, useState } from "react";
import { Check, BellOff } from "lucide-react";
import PhoneShell, { HomeIndicator } from "@/components/PhoneShell";

const SENDERS = [
  { id: 1, name: "Medium Daily", count: 47 },
  { id: 2, name: "LinkedIn",     count: 112 },
  { id: 3, name: "Groupon",      count: 23 },
  { id: 4, name: "Twitter/X",    count: 89 },
  { id: 5, name: "Substack",     count: 34 },
];

const TOTAL_EMAILS = 305;
const TOTAL_SENDERS = SENDERS.length;

type Phase = "idle" | "confirming" | "removing" | "done";

export default function UnsubscribeAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [struckIds, setStruckIds] = useState<Set<number>>(new Set());
  const [dissolvedIds, setDissolvedIds] = useState<Set<number>>(new Set());
  const [deletedEmailCount, setDeletedEmailCount] = useState(0);
  const [removedSenderCount, setRemovedSenderCount] = useState(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(fn, delay));
    };

    schedule(() => setPhase("confirming"), 800);

    const removingStartAt = 800 + 1400;
    schedule(() => setPhase("removing"), removingStartAt);

    SENDERS.forEach((sender, index) => {
      const strikeAt = removingStartAt + index * 350;
      schedule(() => setStruckIds((prev) => new Set([...prev, sender.id])), strikeAt);
      schedule(() => {
        setDissolvedIds((prev) => new Set([...prev, sender.id]));
        setDeletedEmailCount((prev) => prev + sender.count);
        setRemovedSenderCount((prev) => prev + 1);
      }, strikeAt + 200);
    });

    const lastSenderDissolvedAt = removingStartAt + (SENDERS.length - 1) * 350 + 200;

    schedule(() => setPhase("done"), lastSenderDissolvedAt + 400);

    schedule(() => {
      setPhase("idle");
      setStruckIds(new Set());
      setDissolvedIds(new Set());
      setDeletedEmailCount(0);
      setRemovedSenderCount(0);
    }, lastSenderDissolvedAt + 400 + 2500);

    return () => timeouts.forEach(clearTimeout);
  }, [phase === "idle" ? "reset" : "running"]);

  const isConfirming = phase === "confirming";
  const isRemoving = phase === "removing";
  const isDone = phase === "done";
  const showCounter = isRemoving && removedSenderCount > 0;

  return (
    <PhoneShell>
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Senders</span>
        <span
          className="text-[10px] font-semibold transition-colors duration-300"
          style={{
            color: isRemoving || isDone ? "rgba(248,113,113,0.8)" : "rgba(255,255,255,0.30)",
          }}
        >
          {isDone
            ? "All cleared"
            : isRemoving
            ? `${removedSenderCount}/${TOTAL_SENDERS} removed`
            : `${TOTAL_SENDERS} senders`}
        </span>
      </div>

      <div className="mx-4 h-px bg-white/5" />

      <div className="flex-1 overflow-hidden px-3 pt-2 pb-1 flex flex-col gap-1.5">
        {SENDERS.map((sender) => {
          const isStruck = struckIds.has(sender.id);
          const isDissolved = dissolvedIds.has(sender.id);

          return (
            <div
              key={sender.id}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2"
              style={{
                background: isStruck ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.03)",
                border: isStruck ? "1px solid rgba(239,68,68,0.18)" : "1px solid rgba(255,255,255,0.05)",
                opacity: isDissolved ? 0 : 1,
                transform: isDissolved ? "translateX(32px) scale(0.95)" : "translateX(0) scale(1)",
                transitionProperty: "opacity, transform, background, border",
                transitionDuration: isDissolved ? "300ms" : "220ms",
                transitionTimingFunction: isDissolved ? "cubic-bezier(0.4, 0, 1, 1)" : "ease",
              }}
            >
              <div
                className="shrink-0 flex items-center justify-center rounded-lg text-[9px] font-bold"
                style={{
                  width: 22,
                  height: 22,
                  background: isStruck ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.06)",
                  color: isStruck ? "rgba(248,113,113,0.8)" : "rgba(255,255,255,0.35)",
                  transition: "background 220ms ease, color 220ms ease",
                }}
              >
                {sender.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className="block text-[11px] font-semibold leading-tight transition-all duration-200"
                  style={{
                    color: isStruck ? "rgba(248,113,113,0.75)" : "rgba(255,255,255,0.75)",
                    textDecorationLine: isStruck ? "line-through" : "none",
                    textDecorationColor: "rgba(239,68,68,0.7)",
                    textDecorationThickness: "1.5px",
                  }}
                >
                  {sender.name}
                </span>
                <span
                  className="text-[9px] transition-colors duration-200"
                  style={{ color: isStruck ? "rgba(239,68,68,0.45)" : "rgba(255,255,255,0.25)" }}
                >
                  {sender.count} emails
                </span>
              </div>

              <div
                className="shrink-0 transition-all duration-200"
                style={{ opacity: isStruck ? 1 : 0, transform: isStruck ? "scale(1)" : "scale(0.7)" }}
              >
                <BellOff size={11} strokeWidth={2} style={{ color: "rgba(248,113,113,0.65)" }} aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-3 pb-5 pt-1">
        <div
          className="mb-2 px-2 text-center transition-all duration-300"
          style={{
            opacity: showCounter ? 1 : 0,
            transform: showCounter ? "translateY(0)" : "translateY(4px)",
          }}
        >
          <span className="text-[9px] font-medium tracking-wide" style={{ color: "rgba(248,113,113,0.7)" }}>
            Deleted {deletedEmailCount} emails
          </span>
          <span className="text-[9px] mx-1.5" style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <span className="text-[9px] font-medium tracking-wide" style={{ color: "rgba(248,113,113,0.5)" }}>
            Unsubscribed from {removedSenderCount}
          </span>
        </div>

        {isDone ? (
          <div
            className="rounded-xl py-3 px-3 flex flex-col items-center gap-1 transition-all duration-500"
            style={{
              border: "1px solid rgba(74,222,128,0.35)",
              background: "rgba(74,222,128,0.07)",
              boxShadow: "0 0 20px rgba(74,222,128,0.10)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{ width: 16, height: 16, background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.5)" }}
              >
                <Check size={9} strokeWidth={3} className="text-gray-900" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-bold tracking-wide" style={{ color: "#4ADE80" }}>Done</span>
            </div>
            <span className="text-[10px] font-semibold" style={{ color: "rgba(74,222,128,0.85)" }}>
              Deleted {TOTAL_EMAILS} emails
            </span>
            <span className="text-[9px]" style={{ color: "rgba(74,222,128,0.55)" }}>
              Unsubscribed from {TOTAL_SENDERS} senders
            </span>
          </div>
        ) : (
          <button
            disabled
            aria-label="Unsubscribe and delete all emails from selected senders"
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
            style={
              isRemoving
                ? { background: "rgba(239,68,68,0.35)", color: "rgba(255,255,255,0.60)", border: "1px solid rgba(239,68,68,0.20)" }
                : isConfirming
                ? { background: "rgb(239,68,68)", color: "rgba(255,255,255,1)", border: "1px solid rgba(239,68,68,0.50)", transform: "scale(1.05)", boxShadow: "0 4px 24px rgba(239,68,68,0.35)" }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.07)" }
            }
          >
            {!isRemoving && <BellOff size={11} strokeWidth={2.5} aria-hidden="true" />}
            {isRemoving ? "Removing..." : "Unsubscribe & Delete All"}
          </button>
        )}

        <HomeIndicator />
      </div>
    </PhoneShell>
  );
}
