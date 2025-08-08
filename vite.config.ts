import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  workbox: {
    maximumFileSizeToCacheInBytes: 3 * 1024 ** 2,
  },
  manifest: {
    name: "Quiz Maker",
    short_name: "Quiz Maker",
    icons: [
      {
        src: "icons/48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icons/72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icons/96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icons/128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "icons/144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icons/152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "icons/192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "icons/384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "icons/512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    start_url: "/",
    display: "standalone",
    background_color: "#f1f1f1",
    theme_color: "#f1f1f1",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
