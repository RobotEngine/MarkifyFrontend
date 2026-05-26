import { defineConfig } from "vite";
import path from "path";

import legacy from "@vitejs/plugin-legacy";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

import resilientImportsPlugin from "./plugins/resilient-imports";

// sudo npm run dev

// sudo npm run build
// sudo npm run preview

export default defineConfig({
  plugins: [
    /*visualizer({
      template: "treemap",
      open: true,
      gzipSize: true,
      filename: "bundle-analysis.html"
    }),*/
    //resilientImportsPlugin(),
    legacy({
      targets: [
        "defaults", "not IE 11"
      ] 
    }),
    VitePWA({
      //devOptions: { enabled: true, type: "module" },
      manifest: false,
      strategies: "injectManifest",
      srcDir: "src", // Directory where your sw.js lives
      filename: "serviceworker.js", // Name of your service worker file
      registerType: "autoUpdate", // Automatically activates new versions
      buildBase: "/",
      injectManifest: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
        globPatterns: ["index.html", "assets/**/*.{js,css,woff2,svg}"], // Files to precache
        globIgnores: ["**/images/**", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp", "**/*.gif", "**/*.mp3", "**/*.mp4"]
      }
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
    host: "0.0.0.0",
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