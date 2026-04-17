import { defineConfig } from "vite";
import path from "path";
import legacy from "@vitejs/plugin-legacy";

// sudo npm run dev

// sudo npm run build
// sudo npm run preview

export default defineConfig({
  plugins: [
    legacy({
      targets: [
        "defaults", "not IE 11"
      ] 
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@assets": path.resolve(__dirname, "./src/assets")
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    open: false
  }
});