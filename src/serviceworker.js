import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from "workbox-strategies";
import { registerRoute } from "workbox-routing";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

cleanupOutdatedCaches();

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(clients.claim()));

// Images — serve from cache, update in background
registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate({ cacheName: "images" })
);

// Fonts/styles — cache first, they rarely change
registerRoute(
  ({ request }) => request.destination === "style" || request.destination === "font",
  new CacheFirst({ cacheName: "styles-fonts" })
);

// Precache the app shell (JS, HTML, CSS bundles)
precacheAndRoute(self.__WB_MANIFEST || []);