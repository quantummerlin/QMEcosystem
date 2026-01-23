// Service Worker for Genesis Frequency Generator
const CACHE_NAME = 'genesis-fg-v1.0.5';
const urlsToCache = [
  '/Frequency-Generator/',
  '/Frequency-Generator/index.html',
  '/Frequency-Generator/Genesis%20FG%20Freemium.html',
  '/Frequency-Generator/Genesis.png',
  '/Frequency-Generator/manifest.json',
  '/Frequency-Generator/styles.css',
  '/Frequency-Generator/app.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Service Worker: Cache failed', err);
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache when offline, network first when online
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response for caching
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        // Fallback to cache when offline
        return caches.match(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});