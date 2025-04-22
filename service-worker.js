self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('brothers-cache').then(cache => {
      return cache.addAll([
        '/bolo/',
        '/bolo/index.html',
        '/bolo/manifest.json',
        '/bolo/icon-192.png',
        '/bolo/icon-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
