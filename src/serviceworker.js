import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { registerRoute, setCatchHandler } from "workbox-routing";
import { precacheAndRoute, cleanupOutdatedCaches, matchPrecache } from "workbox-precaching";
import { ExpirationPlugin } from "workbox-expiration";

// 1. Automatically delete old assets from previous Vite builds
cleanupOutdatedCaches();

// 2. Pre-cache handles your core app scripts using a "Cache-First" model.
// Since Vite hashes files, this is perfectly safe and ensures instant loading.
precacheAndRoute(self.__WB_MANIFEST || []);

const MAX_RETRIES = 5;
let retryQueue = [];

// 3. Keep a dedicated, self-cleaning strategy for non-pre-cached scripts
const runtimeScriptStrategy = new CacheFirst({
    cacheName: "scripts",
    plugins: [
        // Automatically leak-proofs your storage by removing old files
        new ExpirationPlugin({
            maxEntries: 256,           // Caps total scripts held
            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days expiration
        })
    ]
});

let addToQueue = (request, resolve, reject) => {
    // Prevent duplicate tasks for the same exact URL sitting in the queue simultaneously
    if (retryQueue.some(task => task.url === request.url)) {
        return;
    }

    retryQueue.push({
        url: request.url,
        attempts: 0,
        resolve,
        reject,
        execute: async () => {
            try {
                // Fetch directly from network safely without breaking internal Workbox state
                let response = await fetch(request.url);
                if (response && response.ok) {
                    // Cache the successful response so it works offline next time
                    let cache = await caches.open("scripts");
                    await cache.put(request.url, response.clone());
                    
                    resolve(response);
                    return true;
                }
            } catch (err) { /* Silent catch to keep loop moving */ }
            return false;
        }
    });
};

let flushQueue = async () => {
    // Process backwards to safely splice items without disrupting loop indexing
    for (let i = retryQueue.length - 1; i >= 0; i--) {
        let task = retryQueue[i];
        task.attempts++;

        let success = await task.execute();

        if (success === true) {
            retryQueue.splice(i, 1);
        } else if (task.attempts >= MAX_RETRIES) {
            retryQueue.splice(i, 1);
            task.reject(new Error(`Max retries reached for: ${task.url}`));
        }
    }
};

self.addEventListener("message", (event) => {
    if ((event.data ?? {}).type === "CONNECTED") {
        flushQueue();
    }
});

self.addEventListener("install", () => { self.skipWaiting(); });
self.addEventListener("activate", (event) => { event.waitUntil(clients.claim()); flushQueue(); });

// 4. Global fetch listener for scripts
self.addEventListener("fetch", (event) => {
    let url = new URL(event.request.url);

    // Only handle scripts belonging to the core website
    if (event.request.destination === "script" && url.origin === self.location.origin) {
        // STRATEGY: Check if Workbox pre-cache already has it.
        // If it does, let it serve instantly from cache.
        event.respondWith(
            caches.match(event.request).then((preCachedResponse) => {
                if (preCachedResponse) {
                    return preCachedResponse;
                }

                // If it's not in the pre-cache, use our runtime strategy with retry logic
                return runtimeScriptStrategy.handle({ event, request: event.request }).catch(() => {
                    return new Promise((resolve, reject) => {
                        addToQueue(event.request, resolve, reject);
                    });
                });
            })
        );
    }
});

// 5. Non-script assets with built-in storage caps to prevent leaks
registerRoute(
    ({ request }) => request.destination === "image",
    new StaleWhileRevalidate({
        cacheName: "images",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
            })
        ]
    })
);

registerRoute(
    ({ request }) => request.destination === "style",
    new StaleWhileRevalidate({
        cacheName: "styles",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
            })
        ]
    })
);

// This fires whenever ANY registered route fails to provide a response
setCatchHandler(async ({ request }) => {
    switch (request.destination) {
        case "image":
            // If you have a default offline placeholder image pre-cached by Vite:
            // return matchPrecache('/images/offline-placeholder.svg');
            
            // Or fallback to a runtime transparent pixel so the UI doesn't break:
            return new Response(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"/>`, 
                { headers: { "Content-Type": "image/svg+xml" } }
            );

        default:
            // If we don't have a fallback for this asset type, return an explicit error response
            return Response.error();
    }
});