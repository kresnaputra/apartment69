import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const isTauri = !!process.env.TAURI_ENV_PLATFORM;
const isCapacitor = !!process.env.CAPACITOR_BUILD;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isCapacitor ? "./" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    host: "localhost",
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: isTauri
      ? ["es2021", "chrome100", "safari13"]
      : ["es2021", "chrome100"],
    minify: isTauri && !process.env.TAURI_DEBUG ? "oxc" : true,
    sourcemap: isTauri ? !!process.env.TAURI_DEBUG : false,
  },
});
