import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5177,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000'
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
