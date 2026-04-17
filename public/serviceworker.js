//self.__WB_DISABLE_DEV_LOGS = true;

importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

self.addEventListener("install", () => { self.skipWaiting() });
self.addEventListener("activate", (event) => { event.waitUntil(clients.claim()); });

const MAX_RETRIES = 5;
let retryQueue = [];

if (location.hostname != "localhost" && location.hostname != "127.0.0.1") {

    // Handle scripts:
    const scriptStrategy = new workbox.strategies.NetworkFirst({
        cacheName: "scripts"
    });
    self.addEventListener("fetch", (event) => {
        if (event.request.destination == "script") {
            event.respondWith(
                scriptStrategy.handle({ event, request: event.request }).catch(() => {
                    return new Promise((resolve, reject) => {
                        let task = {
                            attempts: 0,
                            resolved: false,
                            reject,
                            execute: async () => {
                                try {
                                    let response = await scriptStrategy.handle({ event, request: event.request });
                                    if (response && response.ok) {
                                        task.resolved = true;
                                        resolve(response);
                                        return true;
                                    }
                                } catch (err) { }
                                return false;
                            }
                        };
                        retryQueue.push(task);
                    });
                })
            );
        }
    });

    // Handle images:
    workbox.routing.registerRoute(new workbox.routing.Route(({ request }) => {
        return request.destination === "image"
    }, new workbox.strategies.StaleWhileRevalidate({
        cacheName: "images"
    })));

    // Handle scripts:
    /*workbox.routing.registerRoute(new workbox.routing.Route(({ request }) => {
        return request.destination === "script";
    }, new workbox.strategies.NetworkFirst({
        cacheName: "scripts"
    })));*/

    // Handle styles (In Markify, this is only for FONTS):
    workbox.routing.registerRoute(new workbox.routing.Route(({ request }) => {
        return request.destination === "style";
    }, new workbox.strategies.CacheFirst({
        cacheName: "styles"
    })));
}

/*
workbox.routing.registerRoute(
    new RegExp(/.*\.(?:js|css)/g),
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    new RegExp(/.*\.(?:png|jpg|jpeg|svg|gif|webp|mp3|mp4)/g),
    workbox.strategies.cacheFirst()
);
*/

let flushQueue = async () => {
    if (retryQueue.length < 1) {
        return;
    }

    await Promise.all(retryQueue.map(async (task) => {
        task.attempts++;
        await task.execute(); 
    }));

    for (let i = retryQueue.length - 1; i >= 0; i--) {
        let task = retryQueue[i];
        if (task.resolved == true) {
            retryQueue.splice(i, 1);
        } else if (task.attempts >= MAX_RETRIES) {
            retryQueue.splice(i, 1);
            task.reject(new Error("Max retries reached."));
        }
    }
}

self.addEventListener("message", (event) => {
    if (event.data == null) {
        return;
    }
    if (event.data.type == "CONNECTED") {
        flushQueue();
    }
});