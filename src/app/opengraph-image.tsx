import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "InboxBuster: Clean Your Inbox in Minutes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0A1E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft purple glow behind content */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.1)",
            top: -35,
            left: 250,
          }}
        />

        {/* Brand icon */}
        <svg width="130" height="130" viewBox="0 0 100 100" fill="none">
          <path
            d="M25 35H75V65H25V35Z"
            stroke="#22C55E"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M25 35L50 52L75 35"
            stroke="#22C55E"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M85 15L70 35H85L70 55" fill="#F59E0B" />
        </svg>

        {/* App name — gradient */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            background: "linear-gradient(135deg, #8B5CF6 0%, #4ADE80 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginTop: 20,
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          InboxBuster
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: 16,
            letterSpacing: "-0.5px",
          }}
        >
          Clean Your Inbox in Minutes
        </div>

        {/* Feature pill */}
        <div
          style={{
            marginTop: 44,
            padding: "9px 26px",
            borderRadius: 999,
            border: "1px solid rgba(139, 92, 246, 0.35)",
            background: "rgba(139, 92, 246, 0.1)",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: 21,
          }}
        >
          Sort your chaos
        </div>
      </div>
    ),
    size
  );
}
