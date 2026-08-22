export function registerPwa() {
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
      updateViaCache: 'none'
    }).then(registration => {
      registration.update().catch(() => undefined)
    }).catch(() => {
      // Reader remains fully usable online if service worker registration fails.
    })
  })
}

registerPwa()
