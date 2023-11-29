const options = <%= JSON.stringify(options) %>

importScripts(options.workboxUrl)
const wb_manifest=new Array({revision:'adsfjlsd', url:'http://localhost:3000/manifest.json'},{revision:'adssdlsd', url:'http://localhost:3000/'},{revision:'adfadfaa',url:'http://localhost:3000/WurzelIcon.png'});
async function fetchAndPrecacheManifest() {
  try {
    const response = await fetch('_nuxt/wb_manifest.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch manifest file`);
    }

    response.json().then((manifestData)=>{manifestData.map((e)=>wb_manifest.push(e))});
    // Precache routes based on the manifest  
  } catch (error) {
    console.error('Error fetching or precaching manifest:', error);
  }
}

self.addEventListener('install', (event) => event.waitUntil(precacheStatic().then(()=>self.skipWaiting())))

//self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())



// function reloadAllClients() {
//   self.clients.matchAll().then(clients => {
//     clients.forEach(client => {
//       client.postMessage({ action: 'reload' });
//     });
//   });
// }


// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     fetch('_nuxt/wb_manifest.json')
//       .then(response => response.json())
//       .then(filesToCache => {
//         // Get all cache names
//         return caches.keys().then(cacheNames=>cacheNames).then(cacheNames => {
//           // Delete all existing caches
//           return Promise.all(
//             cacheNames.map(cacheName => caches.delete(cacheName))
//           );
//         })
//         .then(()=>console.log('filestocache',filesToCache)).then(() => {
//           // Open a new cache and add files to it
//           return caches.open('your-cache-name').then(cache => {
//             return Promise.all(
//               filesToCache.map(file => {
//                 return cache.add(file.url);
//               })
//             );
//           });
//         });
//       })
//   );
// });



// self.addEventListener('fetch', (event) => {
//   // console.log('event.request',event.request)
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       return response || fetch(event.request);
//     })
//   );
// });

const { registerRoute } = workbox.routing
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { ExpirationPlugin } = workbox.expiration
const { precacheAndRoute } = workbox.precaching


// // Cache page navigations (html) with a Network First strategy
// registerRoute(
//   ({ request }) => {
//     return request.mode === 'navigate'
//   },
//   new NetworkFirst({
//     cacheName: 'pages',
//     plugins: [
//       new CacheableResponsePlugin({ statuses: [200] })
//     ]
//   })
// )

// // Cache Web Manifest, CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
// registerRoute(
//   ({ request }) =>
//     request.destination === 'manifest' ||
//     request.destination === 'style' ||
//     request.destination === 'script' ||
//     request.destination === 'worker',
//   new StaleWhileRevalidate({
//     cacheName: 'assets',
//     plugins: [
//       new CacheableResponsePlugin({ statuses: [200] })
//     ]
//   })
// )

// // Cache images with a Cache First strategy
// registerRoute(
//   ({ request }) => request.destination === 'image',
//   new CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new CacheableResponsePlugin({ statuses: [200] }),
//       // 50 entries max, 30 days max
//       new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })
//     ]
//   })
// )


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

// registerRoute(
//   ({ request }) => request.url && request.url.includes('/_nuxt/builds/meta/'),
//   new CacheFirst({
//     cacheName: 'metaFile',
//     plugins: [
//       new CacheableResponsePlugin({ statuses: [200] }),
//       new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })
//     ]
//   })
// );
async function precacheStatic(){
  precacheAndRoute(wb_manifest);
}

precacheStatic();

fetch('_nuxt/wb_manifest.json').then(res=>res.json()).then(res=>{precacheAndRoute(res,{cleanURLs:true})});


