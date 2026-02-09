// Un Momento en el Tiempo - Service Worker
const CACHE_NAME = 'momento-en-el-tiempo-v35';
const ASSETS_TO_CACHE = [
    '/amomentintime/esp/',
    '/amomentintime/esp/index.html',
    '/amomentintime/esp/view.html',
    '/amomentintime/esp/config.js',
    '/amomentintime/esp/calculations.js',
    '/amomentintime/esp/readings.js',
    '/amomentintime/esp/house-readings.js',
    '/amomentintime/esp/aspect-readings.js',
    '/amomentintime/esp/advanced-readings.js',
    '/amomentintime/esp/love-blueprint.js',
    '/amomentintime/esp/tone-variations.js',
    '/amomentintime/esp/save-share.js',
    '/amomentintime/esp/manifest.json',
    '/amomentintime/esp/Amomentintime.jpg'
];

// Caché para lecturas compartidas (almacenadas por separado para acceso sin conexión)
const READINGS_CACHE = 'momento-lecturas-v1';

// Evento de instalación - almacenar activos en caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Almacenando activos de Un Momento en el Tiempo en caché');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Evento de activación - limpiar TODAS las cachés antiguas agresivamente
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME && name !== READINGS_CACHE)
                    .map((name) => {
                        console.log('Eliminando caché antigua:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            console.log('Service worker activado, reclamando clientes');
            return self.clients.claim();
        })
    );
});

// Evento de fetch - servir desde caché, recurrir a la red
self.addEventListener('fetch', (event) => {
    // Omitir solicitudes que no sean GET
    if (event.request.method !== 'GET') return;
    
    // Omitir solicitudes externas
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    const url = new URL(event.request.url);
    
    // Manejo especial para llamadas API de datos de lectura
    if (url.pathname.includes('/api/get-reading')) {
        event.respondWith(handleReadingApiRequest(event.request));
        return;
    }
    
    // Manejo especial para páginas de lecturas compartidas /amomentintime/esp/r/*
    if (url.pathname.match(/\/amomentintime\/esp\/r\//)) {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match('/amomentintime/esp/view.html'))
        );
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Devolver versión en caché
                    return cachedResponse;
                }
                
                // Obtener de la red
                return fetch(event.request)
                    .then((response) => {
                        // No almacenar en caché respuestas no exitosas
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        // Clonar y almacenar la respuesta en caché
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Respaldo sin conexión para páginas HTML
                        if (event.request.headers.get('accept')?.includes('text/html')) {
                            return caches.match('/amomentintime/esp/index.html');
                        }
                    });
            })
    );
});

// Manejar solicitudes API de lectura con caché para soporte sin conexión
async function handleReadingApiRequest(request) {
    const cache = await caches.open(READINGS_CACHE);
    
    try {
        // Intentar obtener de la red primero
        const response = await fetch(request);
        
        if (response.ok) {
            // Clonar y almacenar la respuesta exitosa en caché
            const responseToCache = response.clone();
            await cache.put(request, responseToCache);
        }
        
        return response;
    } catch (error) {
        // Red fallida, intentar caché
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // No hay caché disponible
        return new Response(JSON.stringify({
            error: 'Sin conexión',
            message: 'Esta lectura no está disponible sin conexión. Por favor conecta a internet.'
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
