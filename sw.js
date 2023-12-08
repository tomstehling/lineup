const options = <%= JSON.stringify(options) %>

//get workbox 
importScripts(options.workboxUrl)

//make sw take control immediately and all clients
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())

const { registerRoute } = workbox.routing
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { ExpirationPlugin } = workbox.expiration
const { precacheAndRoute } = workbox.precaching

//precache static files
precacheAndRoute(options.preCaching,{cleanURLs:true});

//fetch and cache precache-manifest 
fetch('_nuxt/_v8_manifest.json').then(res=>res.json()).then(res=>{precacheAndRoute(res,{cleanURLs:true});console.log('res',res)});


//Cache Web Manifest, CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === 'manifest' ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] })
    ]
  })
)

// Cache images 
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      // 50 entries max, 30 days max
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })
    ]
  })
)

//runtime cache contentful requests
registerRoute(
  ({ request }) => request.url && request.url.startsWith('https://cdn.contentful.com'),
  new CacheFirst({
    cacheName: 'contentful',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })
    ]
  })
);

