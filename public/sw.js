const CACHE_NAME = 'niphon-farm-reader-v0.1.2'
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg']

async function cacheBuiltShell(cache) {
  const indexResponse = await fetch('./index.html', { cache: 'no-store' })
  if (!indexResponse.ok) throw new Error('Unable to fetch reader shell')
  const html = await indexResponse.clone().text()
  await cache.put('./index.html', indexResponse)

  const scopeUrl = new URL('./', self.location.href)
  const assetUrls = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
    .map(match => new URL(match[1], scopeUrl))
    .filter(url => url.origin === self.location.origin && url.pathname.startsWith(scopeUrl.pathname))

  await Promise.all(assetUrls.map(async url => {
    const response = await fetch(url, { cache: 'no-store' })
    if (response.ok) await cache.put(url, response)
  }))
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        await cache.addAll(CORE)
        await cacheBuiltShell(cache)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        const copy = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy))
        return response
      }).catch(async () => (await caches.match(request)) || (await caches.match('./index.html')))
    )
    return
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()))
        return response
      }).catch(() => cached)
      return cached || network
    })
  )
})
