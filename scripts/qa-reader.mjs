import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const failures = []
const check = (condition, message) => { if (!condition) failures.push(message) }
const read = path => readFileSync(path, 'utf8')

const main = read('src/main.tsx')
const contentLoader = read('src/lib/contentLoader.ts')
const pwa = read('src/pwa.ts')
const manifest = JSON.parse(read('public/manifest.webmanifest'))
const sw = read('public/sw.js')
const index = read('index.html')
const toc = JSON.parse(read('data/toc.json'))

function walkMarkdownIds(dir) {
  if (!existsSync(dir)) return []
  const ids = []
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) ids.push(...walkMarkdownIds(path))
    else if (/^\d+\.\d+\.md$/.test(name)) ids.push(name.replace(/\.md$/, ''))
  }
  return ids
}

const markdownIds = walkMarkdownIds('content').sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
const tocIds = new Set((toc.parts ?? []).flatMap(part => part.chapters ?? []).flatMap(chapter => chapter.topics ?? []).map(topic => String(topic.id)))
const missingFromToc = markdownIds.filter(id => !tocIds.has(id))

check(main.includes("import './pwa'"), 'src/main.tsx must import ./pwa so the service worker is registered')
check(pwa.includes('navigator.serviceWorker.register'), 'src/pwa.ts must register a service worker')
check(existsSync('public/sw.js'), 'public/sw.js must exist')
check(sw.includes('fetch'), 'public/sw.js must implement a fetch handler')
check(index.includes('manifest.webmanifest'), 'index.html must link the web app manifest')
check(manifest.start_url === './', 'manifest start_url must be relative for GitHub Pages project hosting')
check(manifest.scope === './', 'manifest scope must be relative for GitHub Pages project hosting')
check(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'manifest must define at least one icon')
check(main.includes('loadTopic'), 'Reader must load topic content through the content loader')
check(contentLoader.includes("import.meta.glob('../../content/part-*/chapter-*/*.md'"), 'Content loader must discover Markdown across every content part/chapter')
check(!contentLoader.includes('eager: true'), 'Reader Markdown content must not be eagerly bundled into the initial JavaScript')
check(contentLoader.includes('.flatMap((part: any) => part.chapters ?? [])'), 'Content loader must build topics from every TOC part')
check(main.includes('availableParts'), 'Reader TOC must be derived from all available content parts')
check(!main.includes('ค้นหาใน Chapter 1–2'), 'Reader UI must not claim search is limited to Chapter 1–2')
check(missingFromToc.length === 0, `Every real Markdown topic must exist in data/toc.json; missing: ${missingFromToc.join(', ')}`)
check(markdownIds.includes('3.1') && markdownIds.includes('3.12'), 'Chapter 3 content must be present in the Reader source tree')
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
console.log(`- all available Markdown topics discoverable (${markdownIds.length} topics)`)
console.log('- Chapter 3 present and eligible for TOC/search/reader navigation')
console.log('- lazy Markdown loading preserved across all parts')
console.log('- full-text search loader present')
console.log('- Book Mode and interaction overlay wired')
