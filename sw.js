var cacheStore = 'v1'

var cacheAssets = [
  '/index.html',
  '/android-chrome-192x192.png',
  '/app.js',
  '/apple-touch-icon.png',
  '/browserconfig.xml',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/icon.png'
]

// call install event to cache assets
self.addEventListener('install', (e) => {
  console.log('Service worker installed')

  e.waitUntil(
    caches.open(cacheStore).then((cache) => {
      console.log('caching files')
      cache.addAll(cacheAssets)
    })
  )
})

//call fetch event
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})

//call the activate event
self.addEventListener('activate', (e) => {
  console.log('worker activated')
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheStore) {
            console.log('clearing old cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})
