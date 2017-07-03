'use strict';

const cacheVersion = 1;
const currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          'manifest.json',
          'offline.html',
          'app/images/icon-128.png',
          'app/images/icon-152.png',
          'app/images/icon-144.png',
          'app/images/icon-192.png',
          'app/images/icon-256.png',
          'app/images/icon-512.png',
          offlineUrl
      ]);
    })
  );
});

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) || (event.request.url.match('/wp-admin/') || event.request.url.match('/preview=true/'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
          // Return the offline page
          return caches.match(offlineUrl);
      })
    );
  }
  else{
      // Respond with everything else if we can
      event.respondWith(caches.match(event.request)
            .then(function (response) {
            return response || fetch(event.request);
        })
      );
    }
});