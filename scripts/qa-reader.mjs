import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const failures = []
const check = (condition, message) => { if (!condition) failures.push(message) }
const read = path => readFileSync(path, 'utf8')

const main = read('src/main.tsx')
const contentLoader = read('src/lib/contentLoader.ts')
const bookReader = read('src/components/BookReader.tsx')
const flipbookCss = read('src/flipbook.css')
const storage = read('src/lib/storage.ts')
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

check(existsSync('src/flipbook.css'), 'Flipbook styling must exist')
check(main.includes("import './flipbook.css'"), 'Reader must load flipbook styling')
check(bookReader.includes('rotateY(var(--flip-angle))') || flipbookCss.includes('rotateY(var(--flip-angle))'), 'Flipbook must rotate a paper leaf in 3D')
check(bookReader.includes('onPointerDown') && bookReader.includes('onPointerMove') && bookReader.includes('setPointerCapture'), 'Flipbook must support pointer/touch drag page turns')
check(bookReader.includes('leaf-front') && bookReader.includes('leaf-back'), 'Flipbook must render front and back faces for the turning page')
check(flipbookCss.includes('backface-visibility:hidden'), 'Turning page faces must hide their reverse side during 3D rotation')
check(flipbookCss.includes('page-curl-highlight') && flipbookCss.includes('page-cast-shadow'), 'Flipbook must include page edge highlight and moving shadow layers')
check(bookReader.includes('playPageFlipSound') && bookReader.includes('AudioContext'), 'Page flip sound must be generated locally with Web Audio')
check(main.includes('soundEnabled={prefs.soundEnabled}'), 'Reader must pass sound preference into BookReader')
check(storage.includes('soundEnabled: true'), 'Page flip sound must default to enabled')
check(main.includes('เสียงพลิกหน้ากระดาษ'), 'Reader Settings must expose page flip sound control')
check(bookReader.includes('prefers-reduced-motion'), 'Flipbook must preserve reduced-motion fallback')

if (failures.length) {
  console.error('Reader QA failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Reader QA passed')
console.log('- PWA registration wired')
console.log('- manifest/service worker baseline present')
console.log(`- all available Markdown topics discoverable (${markdownIds.length} topics)`)
console.log('- lazy Markdown loading preserved across all parts')
console.log('- 3D front/back page leaf wired')
console.log('- pointer/touch drag page turning wired')
console.log('- paper curl highlight/shadow layers present')
console.log('- offline Web Audio page-flip sound wired and default ON')
console.log('- reduced-motion fallback preserved')
