import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const indexPath = path.join(dist, 'index.html')
if (!fs.existsSync(indexPath)) {
  console.error('Performance QA: dist/index.html not found. Run npm run build first.')
  process.exit(1)
}

const html = fs.readFileSync(indexPath, 'utf8')
const assetPaths = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css))["']/g)].map(match => match[1])
const assets = assetPaths.map(asset => {
  const assetRelative = asset.match(/assets\/.+$/)?.[0] ?? asset.replace(/^\.?\//, '')
  const file = path.join(dist, assetRelative)
  if (!fs.existsSync(file)) throw new Error(`Missing initial asset: ${asset}`)
  return { asset, size: fs.statSync(file).size, type: asset.endsWith('.js') ? 'js' : 'css' }
})

const jsBytes = assets.filter(asset => asset.type === 'js').reduce((sum, asset) => sum + asset.size, 0)
const cssBytes = assets.filter(asset => asset.type === 'css').reduce((sum, asset) => sum + asset.size, 0)
const totalBytes = jsBytes + cssBytes

const budgets = {
  js: 500 * 1024,
  css: 100 * 1024,
  total: 600 * 1024
}

const kb = bytes => `${(bytes / 1024).toFixed(1)} KB`
console.log('Reader initial bundle performance budget')
for (const asset of assets) console.log(`- ${asset.asset}: ${kb(asset.size)}`)
console.log(`Initial JS: ${kb(jsBytes)} / ${kb(budgets.js)}`)
console.log(`Initial CSS: ${kb(cssBytes)} / ${kb(budgets.css)}`)
console.log(`Initial total: ${kb(totalBytes)} / ${kb(budgets.total)}`)

const failures = []
if (jsBytes > budgets.js) failures.push(`Initial JavaScript exceeds budget: ${kb(jsBytes)} > ${kb(budgets.js)}`)
if (cssBytes > budgets.css) failures.push(`Initial CSS exceeds budget: ${kb(cssBytes)} > ${kb(budgets.css)}`)
if (totalBytes > budgets.total) failures.push(`Initial bundle exceeds budget: ${kb(totalBytes)} > ${kb(budgets.total)}`)

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`)
  process.exit(1)
}

console.log('Performance QA: PASS')
