
const CACHE_NAME = 'challenge-100-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // 네트워크 우선 전략으로 변경하여 최신 파일을 가져오도록 함
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
