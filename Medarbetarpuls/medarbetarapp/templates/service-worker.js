self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-cache-v1').then((cache) => {
      return cache.addAll([
        '/',                         // homepage
        '/static/manifest.json',     // manifest
        '/static/styles.css',
        '/static/images/logo.png'
        // add CSS, JS, and other pages if you want offline access
      ]);
    })
  );
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== 'static-cache-v1') {
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
