import { readFileSync, existsSync } from 'node:fs'

const failures = []
const check = (condition, message) => { if (!condition) failures.push(message) }
const read = path => readFileSync(path, 'utf8')

const main = read('src/main.tsx')
const contentLoader = read('src/lib/contentLoader.ts')
const pwa = read('src/pwa.ts')
const manifest = JSON.parse(read('public/manifest.webmanifest'))
const sw = read('public/sw.js')
const index = read('index.html')

check(main.includes("import './pwa'"), 'src/main.tsx must import ./pwa so the service worker is registered')
check(pwa.includes('navigator.serviceWorker.register'), 'src/pwa.ts must register a service worker')
check(existsSync('public/sw.js'), 'public/sw.js must exist')
check(sw.includes('fetch'), 'public/sw.js must implement a fetch handler')
check(index.includes('manifest.webmanifest'), 'index.html must link the web app manifest')
check(manifest.start_url === './', 'manifest start_url must be relative for GitHub Pages project hosting')
check(manifest.scope === './', 'manifest scope must be relative for GitHub Pages project hosting')
check(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'manifest must define at least one icon')
check(main.includes('loadTopic'), 'Reader must load topic content through the content loader')
check(contentLoader.includes("import.meta.glob('../../content/part-01/chapter-*/*.md'"), 'Content loader must load Chapter 1–2 Markdown files')
check(!contentLoader.includes('eager: true'), 'Reader Markdown content must not be eagerly bundled into the initial JavaScript')
check(contentLoader.includes('loadSearchCorpus'), 'Content loader must preserve full-text search corpus loading')
check(main.includes("prefs.readingMode === 'book'"), 'Reader must retain Book Mode fallback switching')
check(main.includes('ReaderOverlay'), 'Reader interaction overlay must remain wired')

if (failures.length) {
  console.error('Reader QA failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Reader QA passed')
console.log('- PWA registration wired')
console.log('- manifest/service worker baseline present')
console.log('- Chapter 1–2 lazy Markdown loader present')
console.log('- full-text search loader present')
console.log('- Book Mode and interaction overlay wired')
