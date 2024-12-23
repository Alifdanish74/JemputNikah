import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite dev server port
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
