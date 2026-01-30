// Soul Blueprint - Service Worker
const CACHE_NAME = 'soul-blueprint-v1';
const ASSETS_TO_CACHE = [
    '/soulblueprint/',
    '/soulblueprint/index.html',
    '/soulblueprint/config.js',
    '/soulblueprint/calculations.js',
    '/soulblueprint/readings.js',
    '/soulblueprint/house-readings.js',
    '/soulblueprint/aspect-readings.js',
    '/soulblueprint/advanced-readings.js',
    '/soulblueprint/love-blueprint.js',
    '/soulblueprint/save-share.js',
    '/soulblueprint/manifest.json',
    '/soulblueprint/icon.svg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Caching Soul Blueprint assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean ALL old caches aggressively
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('🗑️ Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            console.log('✅ Service worker activated, claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }
                
                // Fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        // Clone and cache the response
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Offline fallback for HTML pages
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/soulblueprint/index.html');
                        }
                    });
            })
    );
});
