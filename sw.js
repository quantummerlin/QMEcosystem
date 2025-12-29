/**
 * Quantum Reality Codes - Service Worker
 * Provides offline support and caching for PWA functionality
 */

const CACHE_NAME = 'qrc-cache-v2';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/shared/css/quantum-core.css',
    '/shared/css/quantum-variables.css',
    '/shared/css/quantum-base.css',
    '/shared/css/quantum-animations.css',
    '/shared/css/quantum-backgrounds.css',
    '/shared/css/quantum-components.css',
    '/shared/css/quantum-navigation.css',
    '/shared/js/quantum-core.js',
    '/shared/js/quantum-analytics.js',
    '/shared/images/logo.svg',
    '/manifest.json'
];

// Tool pages to cache on first visit
const TOOL_PAGES = [
    '/quantum-merlin-hub/codes-new.html',
    '/quantum-merlin-hub/tarot-new.html',
    '/quantum-merlin-hub/gematria-new.html',
    '/quantum-merlin-hub/sigils-new.html',
    '/quantum-merlin-hub/astrology-new.html',
    '/quantum-merlin-hub/chinese-new.html',
    '/quantum-merlin-hub/crystals-new.html',
    '/quantum-merlin-hub/water-new.html',
    '/quantum-merlin-hub/forecasts-new.html',
    '/quantum-merlin-hub/jukebox-new.html',
    '/angel-number-calculator-new.html',
    '/quantum-sigil-generator-new.html',
    '/genesis'
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Precaching app shell...');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('[SW] Precaching complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Precaching failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle navigation requests (HTML pages)
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache the page for offline use
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Try to serve from cache
                    return caches.match(request)
                        .then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            // Serve offline page as fallback
                            return caches.match(OFFLINE_URL);
                        });
                })
        );
        return;
    }
    
    // Handle other requests with cache-first strategy
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }
                
                // Fetch from network and cache
                return fetch(request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response.ok) {
                            return response;
                        }
                        
                        // Cache the response
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });
                        
                        return response;
                    })
                    .catch((error) => {
                        console.error('[SW] Fetch failed:', error);
                        
                        // Return offline fallback for images
                        if (request.destination === 'image') {
                            return new Response(
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#1a1a2e" width="100" height="100"/><text x="50" y="50" text-anchor="middle" fill="#00f5ff" font-size="12">Offline</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                        
                        throw error;
                    });
            })
    );
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_TOOL') {
        const toolUrl = event.data.url;
        caches.open(CACHE_NAME).then((cache) => {
            cache.add(toolUrl);
        });
    }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-jukebox') {
        event.waitUntil(syncJukeboxData());
    }
});

async function syncJukeboxData() {
    // Sync any pending jukebox saves when back online
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
        client.postMessage({
            type: 'SYNC_COMPLETE',
            message: 'Your saved items have been synced!'
        });
    });
}

console.log('[SW] Service Worker loaded');
