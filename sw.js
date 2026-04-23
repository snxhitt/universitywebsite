const CACHE_NAME = 'global-tech-cache-v2';
const RUNTIME_CACHE = 'global-tech-runtime';

// Core local assets to cache immediately on install
const urlsToCache = [
  './',
  './index.html',
  './about.html',
  './courses.html',
  './admissions.html',
  './faculty.html',
  './gallery.html',
  './contact.html',
  './style.css',
  './script.js',
  './sw.js'
];

// Install Event: Pre-cache local assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate Event: Clean up old caches when new cache names appear
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event: Cache-first for local assets; runtime cache for images and remote content
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (event.request.destination === 'image' || requestUrl.hostname.includes('picsum.photos')) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          const networkFetch = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(() => cachedResponse);
          return cachedResponse || networkFetch;
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
