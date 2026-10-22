
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
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
      "/sanctum": {
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
      "/storage": {
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
      "/login": {
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
      "/logout": {
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
      "/register": {
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
      "/forgot-password": {
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
      "/reset-password": {
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
      "/user": {
        target: "https://satisfy-api.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
