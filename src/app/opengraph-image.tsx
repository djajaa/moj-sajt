import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sergej Janjić — Personal Coaching";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #08090b 0%, #1a1108 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#B85708",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#B85708", fontWeight: 700 }}>
            Personal Coaching
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 74, fontWeight: 800, lineHeight: 1.08, color: "#fff", maxWidth: 980 }}>
          Sistem, ne nagadjanje.
        </div>
        <div style={{ display: "flex", fontSize: 74, fontWeight: 800, lineHeight: 1.08, color: "#B85708" }}>
          Rezultat koji ostaje.
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 36, color: "rgba(255,255,255,0.6)" }}>
          Sergej Janjic — 1:1 coaching, uzivo i online, Banja Luka
        </div>
      </div>
    ),
    { ...size }
  );
}
