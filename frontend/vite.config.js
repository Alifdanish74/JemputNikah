import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", 
  build: {
    outDir: "dist", // Ensure your output directory is 'dist' (default for Vite)
  },
  server: {
    port: 4000, // Your local development server port
  },
  define: {
    "process.env": {}, // Helps mimic Node.js `process.env` in Vite
  },
});
