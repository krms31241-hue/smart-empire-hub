const CACHE_NAME = 'smarthub-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/apps/web/index.html',
  '/assets/css/main.css',
  '/assets/css/home.css',
  '/assets/js/utils.js',
  '/assets/js/home.js',
  '/tools-index.json'
];

// Install Event: Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching core assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});
