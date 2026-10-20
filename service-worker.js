/*
  Service worker for the site's PWA support.

  Bump CACHE_VERSION whenever you deploy a change to make sure everyone's
  browser drops the old cached files instead of getting stuck on them.
*/
const CACHE_VERSION = "v1.5.2";
const CORE_CACHE = "for-you-core-" + CACHE_VERSION;
const RUNTIME_CACHE = "for-you-runtime-" + CACHE_VERSION;

// The app shell — small, same-origin files needed for the site to boot.
// Photos aren't precached here (there are many, and they're large); they're
// cached on demand instead, the first time each one is actually viewed.
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/enhancements.css",
  "./css/modern.css",
  "./js/data/config.js",
  "./js/data/quotes.js",
  "./js/data/quizzes.js",
  "./js/data/games.js",
  "./js/app.js",
  "./js/enhancements.js",
  "./js/haptics.js",
  "./js/photobooth-studio.js",
  "./js/pwa.js",
  "./css/photobooth-studio.css",
  "./manifest.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-192.png",
  "./assets/icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CORE_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle same-origin GET requests. Everything else (Firestore/Firebase
  // calls, Google Fonts, any cross-origin request) goes straight to the
  // network untouched, so live data is never served stale from cache.
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isCoreAsset =
    req.mode === "navigate" || /\.(?:html|js|css|json)$/.test(url.pathname);

  if (isCoreAsset) {
    // Network-first: always try to get the latest version first (so a new
    // deploy shows up right away), falling back to the cached copy when
    // there's no connection. `cache: "no-store"` matters here — without it
    // the browser's own HTTP cache can quietly hand back a stale response
    // (per whatever Cache-Control the host sends) without ever touching the
    // network, which is what made deploys look like they weren't updating.
    event.respondWith(
      fetch(req, { cache: "no-store" })
        .then((res) => {
          const copy = res.clone();
          caches.open(CORE_CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(req)
            .then((cached) => cached || caches.match("./index.html")),
        ),
    );
    return;
  }

  // Everything else same-origin (photos, icons, etc.): cache-first, and
  // save a copy the first time it's fetched so it works offline afterward.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
        return res;
      });
    }),
  );
});
