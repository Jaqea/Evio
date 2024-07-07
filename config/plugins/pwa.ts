import { VitePWA } from "vite-plugin-pwa";

export default function setupPwa() {
  return VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico"],
    manifest: {
      name: "AiChat",
      short_name: "AiChat",
      theme_color: "#fff",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  });
}
