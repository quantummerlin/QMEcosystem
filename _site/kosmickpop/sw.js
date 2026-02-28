// Kosmic K-Pop Service Worker v1.0
const CACHE_NAME = 'kosmickpop-v1';
const OFFLINE_URL = 'offline.html';

// Assets to cache immediately
const PRECACHE_ASSETS = [
    '/kosmickpop/',
    '/kosmickpop/index.html',
    '/kosmickpop/kpop_styles.css',
    '/kosmickpop/kpop_data.js',
    '/kosmickpop/kpop_branding.js',
    '/kosmickpop/kpop_icon.png',
    '/kosmickpop/kpop_archetype_quiz.html',
    '/kosmickpop/kpop_life_path.html',
    '/kosmickpop/kpop_tools_index.html'
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('✨ Kosmic K-Pop: Caching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip external requests
    if (!event.request.url.includes('/kosmickpop/')) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version and update cache in background
                    event.waitUntil(updateCache(event.request));
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Cache successful responses
                        if (response.ok) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => cache.put(event.request, responseClone));
                        }
                        return response;
                    })
                    .catch(() => {
                        // Offline fallback for HTML pages
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/kosmickpop/index.html');
                        }
                    });
            })
    );
});

// Update cache in background (stale-while-revalidate)
async function updateCache(request) {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(request);
    if (response.ok) {
        await cache.put(request, response);
    }
}

// Handle push notifications (future feature)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data?.text() || 'New kosmic energy awaits! ✨',
        icon: '/kosmickpop/kpop_icon.png',
        badge: '/kosmickpop/kpop_icon.png',
        vibrate: [100, 50, 100],
        data: { url: '/kosmickpop/' }
    };
    
    event.waitUntil(
        self.registration.showNotification('Kosmic K-Pop 🎤', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/kosmickpop/')
    );
});
