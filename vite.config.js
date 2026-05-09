import { defineConfig } from "vite";
import path from "path";

import legacy from "@vitejs/plugin-legacy";
import { visualizer } from "rollup-plugin-visualizer";

// sudo npm run dev

// sudo npm run build
// sudo npm run preview

export default defineConfig({
  plugins: [
    legacy({
      targets: [
        "defaults", "not IE 11"
      ] 
    }),
    /*visualizer({
      template: "treemap",
      open: true,
      gzipSize: true,
      filename: "bundle-analysis.html"
    })*/
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
  },
  /*build: {
    sourcemap: true
  }*/
  /*build: {
    rollupOptions: {
      output: {
        manualChunks(id) {

          // Setup core crucial files:
          if (
            id.includes("src/modules/crucial")
            || id.includes("src/modules/utility/")
          ) {
            return "crucial";
          }

          // Merge annotation object files:
          if (id.includes("src/modules/editor/render/annotations/")) {
            return "editor-annotations";
          }

          // Merge tool files:
          if (id.includes("src/modules/editor/toolbar/tools/")) {
            return "editor-tools";
          }

        }
      }
    }
  }*/
});