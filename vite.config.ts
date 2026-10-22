
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/sanctum": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/login": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/logout": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/register": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/forgot-password": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/reset-password": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/user": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
