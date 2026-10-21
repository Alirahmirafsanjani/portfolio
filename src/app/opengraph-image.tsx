import { ImageResponse } from "next/og";
import { content } from "@/content";

export const alt = content.en.meta.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 500px at 12% -10%, rgba(34,211,238,0.28) 0%, transparent 60%), radial-gradient(800px 500px at 92% 108%, rgba(139,92,246,0.30) 0%, transparent 58%), #05060a",
          padding: "72px",
          color: "#e8eaf2",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            RW
          </div>
          <div style={{ fontSize: "24px", letterSpacing: "-0.01em" }}>
            Raka Wijaya
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "18px",
              color: "#8a90a6",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: "#22d3ee",
              }}
            />
            Available for work
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "78px", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1.02 }}>
            Full-stack Developer
          </div>
          <div
            style={{
              fontSize: "78px",
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
              color: "#22d3ee",
            }}
          >
            &amp; Motion Engineer
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "22px",
            color: "#8a90a6",
          }}
        >
          <div style={{ width: "60px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
          Next.js · TypeScript · Motion · Three.js · WebGL
        </div>
      </div>
    ),
    size,
  );
}
