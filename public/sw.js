// MTSA Holdings Property Management Software
// Bump this version when branding or offline resources change.
const CACHE_NAME = 'mtsa-property-management-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/mtsa-logo.svg',
  '/offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) =>
            key !== CACHE_NAME &&
            (key.startsWith('granite-installs-') || key.startsWith('mtsa-property-management-'))
          )
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return (await caches.match('/')) || (await caches.match('/offline.html')) || Response.error();
        }
        return Response.error();
      })
  );
});
