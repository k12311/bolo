// 📦 PWA Service Worker for 中信兄弟語錄挑戰版

const CACHE_NAME = 'brothers-cache-v11';
const CACHE_FILES = [
  '/bolo/',
  '/bolo/index.html',
  '/bolo/manifest.json',
  '/bolo/icon-192.png',
  '/bolo/icon-512.png',
  '/bolo/bgm.mp3'
];

// 🔧 安裝階段：快取必要資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_FILES);
    })
  );
  self.skipWaiting();
});

// 🔄 啟用階段：清除舊快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// 🌐 攔截 fetch 請求：快取優先
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
