const CACHE_NAME = "nolla-v2";
const STATIC_ASSETS = ["/manifest.json"];

// Install: cache only the manifest
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: delete ALL old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: bypass cache for HTML / navigation / API requests entirely.
// Only cache truly static assets (images, fonts) — never pages.
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Always go to network for non-GET
  if (req.method !== "GET") return;

  // Always bypass for Supabase
  if (req.url.includes("supabase.co")) return;

  // Always bypass for navigations / HTML documents (prevents stale child data)
  if (req.mode === "navigate") return;
  const accept = req.headers.get("accept") || "";
  if (accept.includes("text/html")) return;

  // Always bypass for Next.js data / API routes
  const url = new URL(req.url);
  if (url.pathname.startsWith("/_next/data")) return;
  if (url.pathname.startsWith("/api/")) return;

  // For remaining static assets: network-first, cache fallback
  event.respondWith(
    fetch(req)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return response;
      })
      .catch(() => caches.match(req))
  );
});
