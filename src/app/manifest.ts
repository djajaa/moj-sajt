import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sergej Janjić — Personal Coaching",
    short_name: "Sergej Janjić",
    description: "1:1 personal coaching, uživo i online. Banja Luka.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090b",
    theme_color: "#B85708",
    icons: [{ src: "/icon", sizes: "192x192", type: "image/png" }],
  };
}
