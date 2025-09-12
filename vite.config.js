import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" ? "/oasis-fe-portal-vue/" : "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: 'http://172.16.57.60:31800',
        target: "http://localhost:51800",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
