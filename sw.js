const options = <%= JSON.stringify(options) %>

function storeGif(){

// The base64-encoded image data
const base64Image = 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

// Convert base64 to binary
const binaryImage = atob(base64Image);

// Convert binary to ArrayBuffer
const arrayBufferImage = new Uint8Array(binaryImage.length);
for (let i = 0; i < binaryImage.length; i++) {
  arrayBufferImage[i] = binaryImage.charCodeAt(i);
}

// Create a Blob from ArrayBuffer
const blobImage = new Blob([arrayBufferImage], { type: 'image/gif' });

return blobImage
}
const dataUrl=storeGif();

importScripts(options.workboxUrl)
const wb_manifest=new Array({revision:'NLHRuWqfd833', url:'/manifest.json'},{revision:'TIKpeiTK9QoJ', url:'/'},{revision:'s2Uf3DA5dMPQ',url:'/WurzelIcon.png'},{revision:'2XrpcJQ7AWod', url:dataUrl});
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

//self.addEventListener('install', (event) => event.waitUntil(precacheStatic().then(()=>self.skipWaiting())))

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())



// function reloadAllClients() {
//   self.clients.matchAll().then(clients => {
//     clients.forEach(client => {
//       client.postMessage({ action: 'reload' });
//     });
//   });
// }




const { registerRoute } = workbox.routing
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { ExpirationPlugin } = workbox.expiration
const { precacheAndRoute } = workbox.precaching


// Cache page navigations (html) with a Network First strategy
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

// Cache Web Manifest, CSS, JS, and Web Worker requests with a Stale While Revalidate strategy


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

// // Cache images 
// registerRoute(
//   ({ request }) => request.destination === 'image',
//   new StaleWhileRevalidate({
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

registerRoute(
  ({ request }) => request.url && request.url.includes('/_nuxt/builds/meta/'),
  new CacheFirst({
    cacheName: 'metaFile',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })
    ]
  })
);



precacheAndRoute(wb_manifest,{cleanURLs:true});

fetch('_nuxt/wb_manifest.json').then(res=>res.json()).then(res=>{precacheAndRoute(res,{cleanURLs:true});console.log('res',res)});


