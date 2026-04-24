"use client";

import { useEffect, useState } from "react";
import PhoneShell, { HomeIndicator } from "@/components/PhoneShell";

const SENDERS = [
  { id: 1, name: "Medium Daily", count: 47 },
  { id: 2, name: "LinkedIn", count: 112 },
  { id: 3, name: "Groupon", count: 23 },
  { id: 4, name: "Twitter/X", count: 89 },
  { id: 5, name: "Substack", count: 34 },
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
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(() => {
        fn();
        timeouts = timeouts.filter((timeoutId) => timeoutId !== id);
      }, delay);
      timeouts.push(id);
    };

    const runCycle = () => {
      schedule(() => setPhase("confirming"), 800);

      const removingStartAt = 800 + 1400;
      schedule(() => setPhase("removing"), removingStartAt);

      SENDERS.forEach((sender, index) => {
        const strikeAt = removingStartAt + index * 350;
        schedule(
          () => setStruckIds((prev) => new Set([...prev, sender.id])),
          strikeAt,
        );
        schedule(() => {
          setDissolvedIds((prev) => new Set([...prev, sender.id]));
          setDeletedEmailCount((prev) => prev + sender.count);
          setRemovedSenderCount((prev) => prev + 1);
        }, strikeAt + 200);
      });

      const lastSenderDissolvedAt =
        removingStartAt + (SENDERS.length - 1) * 350 + 200;

      schedule(() => setPhase("done"), lastSenderDissolvedAt + 400);

      schedule(
        () => {
          setPhase("idle");
          setStruckIds(new Set());
          setDissolvedIds(new Set());
          setDeletedEmailCount(0);
          setRemovedSenderCount(0);
          runCycle();
        },
        lastSenderDissolvedAt + 400 + 2500,
      );
    };

    runCycle();

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const isConfirming = phase === "confirming";
  const isRemoving = phase === "removing";
  const isDone = phase === "done";
  const showCounter = isRemoving && removedSenderCount > 0;

  return (
    <PhoneShell>
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
          Senders
        </span>
        <span
          className="text-[10px] font-semibold transition-colors duration-300"
          style={{
            color:
              isRemoving || isDone
                ? "rgba(249,115,22,0.8)"
                : "rgba(255,255,255,0.30)",
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
              className="flex items-center gap-2 rounded-[10px] px-2.5 py-2"
              style={{
                background: isStruck ? "rgba(249,115,22,0.08)" : "#1e1e2a",
                border: isStruck
                  ? "1px solid rgba(249,115,22,0.18)"
                  : "1px solid rgba(255,255,255,0.04)",
                opacity: isDissolved ? 0 : 1,
                transform: isDissolved
                  ? "translateX(32px) scale(0.95)"
                  : "translateX(0) scale(1)",
                transitionProperty: "opacity, transform, background, border",
                transitionDuration: isDissolved ? "300ms" : "220ms",
                transitionTimingFunction: isDissolved
                  ? "cubic-bezier(0.4, 0, 1, 1)"
                  : "ease",
              }}
            >
              {/* Letter avatar */}
              <div
                className="shrink-0 flex items-center justify-center rounded-[6px] text-[9px] font-bold transition-all duration-200"
                style={{
                  width: 22,
                  height: 22,
                  background: isStruck ? "rgba(249,115,22,0.12)" : "#2a2a38",
                  color: isStruck
                    ? "rgba(249,115,22,0.8)"
                    : "rgba(255,255,255,0.55)",
                }}
              >
                {sender.name.charAt(0)}
              </div>

              {/* Stacked name + count - name retains strikethrough when struck */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[11px] font-semibold leading-tight transition-all duration-200"
                  style={{
                    color: isStruck
                      ? "rgba(249,115,22,0.9)"
                      : "rgba(255,255,255,0.85)",
                    textDecorationLine: isStruck ? "line-through" : "none",
                    textDecorationColor: "rgba(249,115,22,0.7)",
                    textDecorationThickness: "1.5px",
                  }}
                >
                  {sender.name}
                </p>
                <p
                  className="text-[9px] transition-colors duration-200"
                  style={{
                    color: isStruck
                      ? "rgba(249,115,22,0.45)"
                      : "rgba(255,255,255,0.30)",
                  }}
                >
                  {sender.count.toLocaleString()} emails
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-3 pb-5 pt-2">
        <div
          className="mb-2 px-2 text-center transition-all duration-300"
          style={{
            opacity: showCounter ? 1 : 0,
            transform: showCounter ? "translateY(0)" : "translateY(4px)",
          }}
        >
          <span
            className="text-[9px] font-medium tracking-wide"
            style={{ color: "rgba(249,115,22,0.7)" }}
          >
            Deleted {deletedEmailCount} emails
          </span>
          <span
            className="text-[9px] mx-1.5"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            ·
          </span>
          <span
            className="text-[9px] font-medium tracking-wide"
            style={{ color: "rgba(249,115,22,0.5)" }}
          >
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
                style={{
                  width: 16,
                  height: 16,
                  background: "#4ADE80",
                  boxShadow: "0 0 8px rgba(74,222,128,0.5)",
                }}
              >
                <span style={{ fontSize: 9, color: "#000", fontWeight: 900 }}>
                  ✓
                </span>
              </div>
              <span
                className="text-[11px] font-bold tracking-wide"
                style={{ color: "#4ADE80" }}
              >
                Done
              </span>
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{ color: "rgba(74,222,128,0.85)" }}
            >
              Deleted {TOTAL_EMAILS} emails
            </span>
            <span
              className="text-[9px]"
              style={{ color: "rgba(74,222,128,0.55)" }}
            >
              Unsubscribed from {TOTAL_SENDERS} senders
            </span>
          </div>
        ) : (
          <div className="flex gap-2">
            {/* DELETE - always disabled */}
            <button
              disabled
              aria-disabled
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-[9px] font-bold tracking-wide uppercase"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.20)",
                border: "1px solid rgba(255,255,255,0.07)",
                pointerEvents: "none",
              }}
            >
              🗑 Delete
            </button>

            {/* UNSUB & DELETE - active */}
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-[9px] font-bold tracking-wide uppercase transition-all duration-300"
              style={
                isRemoving
                  ? {
                      background: "rgba(249,115,22,0.35)",
                      color: "rgba(255,255,255,0.60)",
                      border: "1px solid rgba(249,115,22,0.20)",
                    }
                  : isConfirming
                    ? { background: "#F97316", color: "#fff", border: "none" }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.25)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
              }
            >
              🔕 {isRemoving ? "Removing..." : "Unsub & Delete"}
            </button>
          </div>
        )}

        <HomeIndicator />
      </div>
    </PhoneShell>
  );
}
