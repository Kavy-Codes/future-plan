/* Future Plan service worker: app shell plus the first build's hashed assets. */
const VERSION = 'future-plan-v1';
const CACHE = `${VERSION}-shell`;

const scoped = (path) => new URL(path, self.registration.scope).href;
const INDEX = () => scoped('index.html');
const ROOT = () => scoped('./');

function shellUrls() {
  return [
    ROOT(),
    INDEX(),
    scoped('manifest.webmanifest'),
    scoped('favicon.svg'),
    scoped('icons/icon-192.png'),
    scoped('icons/icon-512.png'),
    scoped('icons/icon-maskable-512.png'),
    scoped('icons/icon.svg'),
    scoped('icons/apple-touch-icon.png'),
  ];
}

function buildAssets(html, base) {
  const urls = new Set();
  const matches = html.matchAll(/(?:src|href)="([^"]+)"/g);
  for (const match of matches) {
    try {
      const url = new URL(match[1], base);
      if (url.origin !== self.location.origin) continue;
      if (!url.href.startsWith(self.registration.scope)) continue;
      if (/\/(assets|icons)\//.test(url.pathname)) urls.add(url.href);
    } catch {
      /* ignore malformed tags */
    }
  }
  return [...urls];
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await Promise.allSettled(shellUrls().map((url) => cache.add(url)));

      try {
        const response = await fetch(INDEX(), { cache: 'reload' });
        if (response.ok) {
          await cache.put(INDEX(), response.clone());
          const html = await response.text();
          await Promise.allSettled(buildAssets(html, INDEX()).map((url) => cache.add(url)));
        }
      } catch {
        /* the shell still works if one asset is unavailable */
      }

      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/sw.js')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          if (response.ok) {
            const cache = await caches.open(CACHE);
            await cache.put(INDEX(), response.clone());
          }
          return response;
        } catch {
          const cache = await caches.open(CACHE);
          return (
            (await cache.match(INDEX(), { ignoreVary: true })) ||
            (await cache.match(ROOT(), { ignoreVary: true })) ||
            new Response('Future Plan is offline. Open it once online to save it.', {
              status: 503,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            })
          );
        }
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(request, { ignoreVary: true });
      if (cached) return cached;

      try {
        const response = await fetch(request);
        if (response.ok && response.type === 'basic') {
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return new Response('', { status: 504, statusText: 'Offline' });
      }
    })(),
  );
});
