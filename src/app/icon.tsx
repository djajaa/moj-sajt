import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#B85708",
          borderRadius: 40,
        }}
      >
        <span style={{ display: "flex", color: "#fff", fontSize: 120, fontWeight: 800, fontFamily: "sans-serif" }}>
          S
        </span>
      </div>
    ),
    { ...size }
  );
}
