if (location.hostname != "localhost" && location.hostname != "127.0.0.1") {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

    function isCacheOld(cache) {
        const maxAge = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
        const cacheTimestamp = cache ? cache.timestamp : 0;
        return (Date.now() - cacheTimestamp) > maxAge;
    }

    // Handle images:
    workbox.routing.registerRoute(new workbox.routing.Route(({ request }) => {
        return request.destination === "image";
    }, new workbox.strategies.StaleWhileRevalidate({
        cacheName: "images"
    })));

    // Handle scripts:
    workbox.routing.registerRoute(new workbox.routing.Route(({ request }) => {
        return request.destination === "script";
    }, async (args) => {
        const { request } = args;
        const cache = await caches.open("scripts");

        const cachedResponse = await cache.match(request);
        if (cachedResponse && !isCacheOld(cachedResponse)) {
            return cachedResponse;
        } else {
            const fetchResponse = await fetch(request);
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
        }
    }));

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