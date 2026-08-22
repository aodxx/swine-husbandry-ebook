import { test, expect } from '@playwright/test'

test('mobile reader core journey works', async ({ page }) => {
  await page.goto('./')

  await expect(page.getByRole('heading', { name: /นิพนธ์ฟาร์ม/ })).toBeVisible()
  await page.getByRole('button', { name: 'สารบัญ' }).click()
  await expect(page.getByRole('heading', { name: 'สารบัญ' })).toBeVisible()

  const search = page.getByRole('searchbox')
  await search.fill('Duroc')
  await expect(page.getByText(/Duroc/i).first()).toBeVisible()
  await search.clear()

  await page.getByRole('button', { name: /1\.1/ }).first().click()
  await expect(page.locator('article.prose')).toBeVisible()

  await page.getByRole('button', { name: 'เพิ่มบุ๊กมาร์ก' }).click()
  await page.getByRole('button', { name: 'เปิดสารบัญ' }).click()
  await expect(page.locator('.bookmark-strip')).toContainText('1.1')

  await page.locator('.bookmark-strip button').first().click()
  await page.getByRole('button', { name: 'การตั้งค่าการอ่าน' }).click()
  await page.getByRole('button', { name: 'ซีเปีย' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sepia')
  await page.getByRole('button', { name: 'Book Mode' }).click()
  await page.getByRole('button', { name: 'ปิด', exact: true }).click()
  await expect(page.locator('.book-mode')).toBeVisible()

  const citation = page.locator('.citation-ref').first()
  await expect(citation).toBeVisible()
  await citation.click()
  await expect(page.getByRole('dialog', { name: /แหล่งอ้างอิง/ })).toBeVisible()
  await expect(page.getByText(/Citation \[\d+\]/)).toBeVisible()
})

test('reader settings and bookmark survive reload', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'เปิดตำรา' }).click()
  await page.getByRole('button', { name: 'เพิ่มบุ๊กมาร์ก' }).click()
  await page.getByRole('button', { name: 'การตั้งค่าการอ่าน' }).click()
  await page.getByRole('button', { name: 'กลางคืน' }).click()
  await page.getByRole('button', { name: 'ปิด', exact: true }).click()

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'สารบัญ' }).click()
  await expect(page.locator('.bookmark-strip')).toContainText('1.1')
})

test('glossary browser opens accessible term details', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'เปิดตำรา' }).click()
  await page.getByRole('button', { name: 'เปิดอภิธานศัพท์' }).click()
  await expect(page.getByRole('dialog', { name: 'อภิธานศัพท์', exact: true })).toBeVisible()

  const firstTerm = page.locator('.glossary-browser-list button').first()
  await expect(firstTerm).toBeVisible()
  const termName = (await firstTerm.locator('strong').textContent())?.trim() ?? ''
  expect(termName.length).toBeGreaterThan(0)
  await firstTerm.click()
  await expect(page.getByRole('dialog', { name: new RegExp(`อภิธานศัพท์ ${termName}`) })).toBeVisible()
  await expect(page.locator('.reference-body')).toBeVisible()
})

test('book mode paginates and honors reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await page.getByRole('button', { name: 'เปิดตำรา' }).click()
  await page.getByRole('button', { name: 'การตั้งค่าการอ่าน' }).click()
  await page.getByRole('button', { name: 'Book Mode' }).click()
  await page.getByRole('button', { name: 'ปิด', exact: true }).click()

  const pageNumber = page.locator('.book-page-number')
  await expect(pageNumber).toContainText('/')
  const before = await pageNumber.textContent()
  await expect(page.getByRole('button', { name: 'หน้าถัดไป' })).toBeEnabled()
  await page.getByRole('button', { name: 'หน้าถัดไป' }).click()
  await expect.poll(() => pageNumber.textContent()).not.toBe(before)

  const transitionSeconds = await page.locator('.book-paper').evaluate(element => {
    const duration = getComputedStyle(element).transitionDuration.split(',')[0]?.trim() ?? '0s'
    if (duration.endsWith('ms')) return Number.parseFloat(duration) / 1000
    return Number.parseFloat(duration)
  })
  expect(transitionSeconds).toBeLessThan(0.02)
})

test('service worker registers on localhost preview', async ({ page }) => {
  await page.goto('./')
  const supported = await page.evaluate(() => 'serviceWorker' in navigator)
  expect(supported).toBeTruthy()
  await page.waitForFunction(async () => {
    if (!('serviceWorker' in navigator)) return false
    const registration = await navigator.serviceWorker.getRegistration()
    return Boolean(registration)
  }, undefined, { timeout: 15000 })
})

test('reader reloads offline after first online visit', async ({ page, context }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { name: /นิพนธ์ฟาร์ม/ })).toBeVisible()
  await page.evaluate(async () => {
    if ('serviceWorker' in navigator) await navigator.serviceWorker.ready
  })
  await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), undefined, { timeout: 15000 })

  const cacheState = await page.evaluate(async () => {
    const scriptUrl = (document.querySelector('script[type="module"]') as HTMLScriptElement | null)?.src ?? ''
    const styleUrls = [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')].map(link => link.href)
    const keys = await caches.keys()
    const requests = (await Promise.all(keys.map(async key => (await caches.open(key)).keys()))).flat()
    const cachedUrls = requests.map(request => request.url)
    return {
      scriptUrl,
      styleUrls,
      cachedUrls,
      scriptCached: scriptUrl ? Boolean(await caches.match(scriptUrl)) : false,
      stylesCached: await Promise.all(styleUrls.map(async url => Boolean(await caches.match(url))))
    }
  })
  expect(cacheState.scriptUrl, JSON.stringify(cacheState, null, 2)).toBeTruthy()
  expect(cacheState.scriptCached, JSON.stringify(cacheState, null, 2)).toBeTruthy()
  expect(cacheState.styleUrls.length, JSON.stringify(cacheState, null, 2)).toBeGreaterThan(0)
  expect(cacheState.stylesCached.every(Boolean), JSON.stringify(cacheState, null, 2)).toBeTruthy()

  await context.setOffline(true)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: /นิพนธ์ฟาร์ม/ })).toBeVisible()
  await context.setOffline(false)
})
