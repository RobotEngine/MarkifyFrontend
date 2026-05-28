import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from "workbox-strategies";
import { registerRoute } from "workbox-routing";
import { precacheAndRoute, cleanupOutdatedCaches, matchPrecache } from "workbox-precaching";
import { ExpirationPlugin, CacheExpiration } from "workbox-expiration";

cleanupOutdatedCaches();

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(clients.claim()));

// Images — serve from cache, update in background
registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 3 * 30 * 24 * 60 * 60 // 90 Days
      })
    ]
  })
);

// Fonts/styles — cache first, they rarely change
registerRoute(
  ({ request }) => request.destination === "style" || request.destination === "font",
  new CacheFirst({
    cacheName: "styles-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 3 * 30 * 24 * 60 * 60 // 90 Days
      })
    ]
  })
);

// Scripts - proxy to prevent failed load state from bricking the app
const MAX_QUEUE_LENGTH = 100;
const MAX_TRIES = 5;

/*const SCRIPT_CACHE = "runtime-scripts";
const scriptCacheExpiration = new CacheExpiration(SCRIPT_CACHE, {
  maxEntries: 100,
  maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
});*/

let pendingRequests = {};
let requestQueue = [];
let queueRunning = false;

let addToQueue = (id, request, resolve, reject, run, tries) => {
  if (requestQueue.length > MAX_QUEUE_LENGTH) {
    let firstItem = requestQueue.shift(); // Remove first request
    if ((pendingRequests[firstItem.id] ?? { count: 0 }).count < 2) {
      delete pendingRequests[firstItem.id];
    }
    firstItem.reject(new Error("Exceeded max queue length"));
  }

  requestQueue.push({ id, request, resolve, reject, run, tries: (tries ?? 1) });
}

let flushQueue = async () => {
  if (queueRunning == true) {
    return;
  }
  queueRunning = true;

  while (requestQueue.length > 0) {
    let item = requestQueue.shift();

    let result = await item.run();

    if (result != true) {
      if (item.tries < MAX_TRIES) {
        addToQueue(item.id, item.request, item.resolve, item.reject, item.run, item.tries + 1);
      } else {
        delete pendingRequests[item.id];
        item.reject(new Error("Exceeded max tries"));
      }
      break;
    }
  }

  queueRunning = false;
}

self.addEventListener("message", (event) => {
  if ((event.data ?? {}).type === "CONNECTED") {
    flushQueue();
  }
});

registerRoute(
  ({ request, url }) => request.destination === "script" || url.pathname.endsWith(".js") || url.pathname.endsWith(".mjs"),
  async ({ request, url }) => {
    // Check Workbox precache:
    let cachedResponse = await matchPrecache(url.pathname);
    if (cachedResponse != null) {
      //return cachedResponse;
    }

    // Check runtime cache:
    /*let runtimeCached = await caches.match(request);
    if (runtimeCached != null) {
      return runtimeCached;
    }*/

    let id = url.pathname + url.search;

    let exitingRequest = pendingRequests[id];
    if (exitingRequest != null) {
      exitingRequest.count++;
      return exitingRequest.promise;
    }

    let requestPromise = new Promise(async (resolve, reject) => {
      let run = async () => {
        try {
          let response = await fetch(request); // Handle the fetch

          /*if (response.ok && response.headers.get("content-type")?.includes("javascript")) {
            let cache = await caches.open(SCRIPT_CACHE);
            await cache.put(request, response.clone());
            await scriptCacheExpiration.updateTimestamp(request.url);
            await scriptCacheExpiration.expireEntries();
          }*/

          resolve(response);

          delete pendingRequests[id];
          return true;
        } catch (error) {
          if ((error instanceof TypeError) == false) {
            reject(error);
            delete pendingRequests[id];
            return true;
          }
        }
        return false;
      };
      
      //if (navigator.onLine == true) {
      let result = await run();
      if (result == true) {
        return flushQueue();
      }
      //}

      addToQueue(id, request, resolve, reject, run);
    });

    pendingRequests[id] = {promise: requestPromise, count: 1 };

    return requestPromise;
  }
);

// Precache the app shell (JS, HTML, CSS bundles)
precacheAndRoute(self.__WB_MANIFEST || []);