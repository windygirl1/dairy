const staticCacheName = 's-app-v1'

const assetsUrls = [
  'index.html',
  'offline.html'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache =>{
      return cache.addAll(assetsUrls)
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(res => {
      return fetch(event.request)
      .catch(() => caches.match('offline.html'))
    }) 
  )
})

self.addEventListener('activate', event => {
  const cacheWhiteList = []
  cacheWhiteList.push(staticCacheName)
  event.waitUntil(caches.keys()
  .then(cachesNames =>  Promise.all(
    cachesNames.map(cacheName => {
      if (!cacheWhiteList.includes(cacheName)) {
        return caches.delete(cacheName)
      }
    })
  )))
})