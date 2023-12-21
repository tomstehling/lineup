async function addToCache(urls: string[]) {
  const cache = await window.caches.open("precache");
  await cache.addAll(urls);
}
