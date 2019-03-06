const version = "0.6.11";
const cacheName = `chat-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/chat.html`,
        `/css/styles.css`,
        `/js/libs/deparam.js`,
        `/js/libs/jquery-3.3.1.min.js`,
        `/js/libs/moment.js`,
        `/js/libs/mustache.js`,
        `/js/chat.js`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});