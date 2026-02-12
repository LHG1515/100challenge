
const CACHE_NAME = 'challenge-100-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://esm.sh/run-tsx',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './hooks/useChallenge.ts',
  './components/DailyView.tsx',
  './components/InputView.tsx',
  './components/GridView.tsx',
  './components/SettingsModal.tsx',
  './components/SetupScreen.tsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
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
