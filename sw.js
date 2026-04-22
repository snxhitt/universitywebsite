const CACHE_NAME = 'global-tech-cache-v1';

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
  './script.js'
];

// Install Event: Pre-cache local assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Event: Clean up old caches if the cache name changes (e.g., v2)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event: Cache First, Network Fallback strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});
