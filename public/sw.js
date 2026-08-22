const CACHE_NAME = 'niphon-farm-reader-v0.1.3'
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg']

async function cacheBuiltShell(cache) {
  const indexResponse = await fetch('./index.html', { cache: 'no-store' })
  if (!indexResponse.ok) throw new Error('Unable to fetch reader shell')
  const html = await indexResponse.clone().text()
  await cache.put('./index.html', indexResponse)

  const scopeUrl = new URL('./', self.location.href)
  const assetUrls = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
    .map(match => new URL(match[1], scopeUrl).href)
    .filter(url => {
      const parsed = new URL(url)
      return parsed.origin === self.location.origin && parsed.pathname.startsWith(scopeUrl.pathname)
    })

  await Promise.all(assetUrls.map(async url => {
    const response = await fetch(url, { cache: 'no-store' })
    if (response.ok) await cache.put(url, response.clone())
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

async function cachedResponseFor(request) {
  const direct = await caches.match(request)
  if (direct) return direct
  return caches.match(request, { ignoreSearch: true })
}

self.addEventListener('fetch', event => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request)
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME)
          await cache.put('./index.html', response.clone())
        }
        return response
      } catch {
        return (await cachedResponseFor(request)) || (await caches.match('./index.html'))
      }
    })())
    return
  }

  event.respondWith((async () => {
    const cached = await cachedResponseFor(request)
    if (cached) return cached

    try {
      const response = await fetch(request)
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME)
        await cache.put(request, response.clone())
      }
      return response
    } catch {
      return Response.error()
    }
  })())
})
