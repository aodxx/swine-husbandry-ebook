import { test, expect } from '@playwright/test'

test('static boot shell prevents a blank page when the app bundle fails', async ({ page }) => {
  await page.route('**/assets/index-*.js', route => route.abort())
  await page.goto('./', { waitUntil: 'domcontentloaded' })

  const shell = page.locator('#reader-boot-shell')
  await expect(shell).toBeVisible()
  await expect(page.getByRole('heading', { name: 'กำลังเปิดตำรา' })).toBeVisible()
  await expect(page.locator('.boot-meta')).toContainText('boot-recovery-v1')
})

test('boot shell exposes recovery controls after timeout without clearing reader data', async ({ page }) => {
  await page.addInitScript(() => {
    const original = window.setTimeout
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: any[]) => {
      const nextTimeout = timeout === 9000 ? 20 : timeout
      return original(handler, nextTimeout, ...args)
    }) as typeof window.setTimeout
  })
  await page.route('**/assets/index-*.js', route => route.abort())
  await page.goto('./', { waitUntil: 'domcontentloaded' })

  const shell = page.locator('#reader-boot-shell')
  await expect(shell).toHaveAttribute('data-state', 'recovery', { timeout: 1500 })
  await expect(page.getByRole('button', { name: 'ลองเปิดอีกครั้ง' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'เปิดหน้าเริ่มต้น' })).toBeVisible()
  await expect(page.locator('#reader-boot-status')).toContainText('บุ๊กมาร์ก')
})
