// ── TASKORA SERVICE WORKER ──────────────────────────────────────────────────
// Bump CACHE_VER on every deploy — this is what the browser uses to detect
// a changed SW file and trigger the update flow.
const CACHE_VER = 'taskora-2026-04-01-v2';
const STATIC_CACHE = CACHE_VER + '-static';

const PRECACHE = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js'
];

// INSTALL — pre-cache CDN assets. Do NOT skipWaiting — let app show banner.
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(STATIC_CACHE).then(c => c.addAll(PRECACHE)).catch(() => {})
  );
  // No skipWaiting() — new SW waits politely for app to trigger it
});

// ACTIVATE — clean old caches, then claim clients
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== STATIC_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// MESSAGE — app sends SKIP_WAITING when user taps the update banner
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// FETCH — smart routing
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Supabase API — always network only
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // HTML navigation — NETWORK FIRST (always serve latest app code)
  if (e.request.mode === 'navigate' ||
      (e.request.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // CDN static assets — CACHE FIRST
  if (url.hostname.includes('jsdelivr.net') ||
      url.hostname.includes('cdnjs.cloudflare.com') ||
      e.request.url.match(/\.(png|jpg|ico|woff2|css)$/)) {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
      )
    );
    return;
  }

  // Everything else — network with cache fallback
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
