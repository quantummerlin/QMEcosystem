// A Moment in Time - Service Worker
const CACHE_NAME = 'moment-in-time-v36';
const ASSETS_TO_CACHE = [
    '/amomentintime/',
    '/amomentintime/index.html',
    '/amomentintime/view.html',
    '/amomentintime/config.js',
    '/amomentintime/calculations.js',
    '/amomentintime/readings.js',
    '/amomentintime/house-readings.js',
    '/amomentintime/aspect-readings.js',
    '/amomentintime/advanced-readings.js',
    '/amomentintime/love-blueprint.js',
    '/amomentintime/tone-variations.js',
    '/amomentintime/save-share.js',
    '/amomentintime/manifest.json',
    '/amomentintime/Amomentintime.jpg'
];

// Cache for shared readings (stored separately for offline access)
const READINGS_CACHE = 'moment-readings-v1';

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching A Moment in Time assets');
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
                    .filter((name) => name !== CACHE_NAME && name !== READINGS_CACHE)
                    .map((name) => {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            console.log('Service worker activated, claiming clients');
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
    
    const url = new URL(event.request.url);
    
    // Special handling for API calls to get reading data
    if (url.pathname.includes('/api/get-reading')) {
        event.respondWith(handleReadingApiRequest(event.request));
        return;
    }
    
    // Special handling for shared reading pages /amomentintime/r/*
    if (url.pathname.match(/\/amomentintime\/r\//)) {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match('/amomentintime/view.html'))
        );
        return;
    }
    
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
                        if (event.request.headers.get('accept')?.includes('text/html')) {
                            return caches.match('/amomentintime/index.html');
                        }
                    });
            })
    );
});

// Handle reading API requests with caching for offline support
async function handleReadingApiRequest(request) {
    const cache = await caches.open(READINGS_CACHE);
    
    try {
        // Try to fetch from network first
        const response = await fetch(request);
        
        if (response.ok) {
            // Clone and cache the successful response
            const responseToCache = response.clone();
            await cache.put(request, responseToCache);
        }
        
        return response;
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // No cache available
        return new Response(JSON.stringify({
            error: 'Offline',
            message: 'This reading is not available offline. Please connect to the internet.'
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
