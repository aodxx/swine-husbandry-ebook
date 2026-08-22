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
  await page.getByRole('button', { name: 'ปิด' }).click()
  await expect(page.locator('.book-mode')).toBeVisible()

  const citation = page.locator('.citation-ref').first()
  await expect(citation).toBeVisible()
  await citation.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByText(/Citation \[\d+\]/)).toBeVisible()
})

test('reader settings and bookmark survive reload', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'เปิดตำรา' }).click()
  await page.getByRole('button', { name: 'เพิ่มบุ๊กมาร์ก' }).click()
  await page.getByRole('button', { name: 'การตั้งค่าการอ่าน' }).click()
  await page.getByRole('button', { name: 'กลางคืน' }).click()
  await page.getByRole('button', { name: 'ปิด' }).click()

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'สารบัญ' }).click()
  await expect(page.locator('.bookmark-strip')).toContainText('1.1')
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
