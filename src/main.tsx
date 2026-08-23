import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import tocData from '../data/toc.json'
import glossaryData from '../data/glossary.json'
import sourcesData from '../data/sources.json'
import { BookReader } from './components/BookReader'
import { ReaderOverlay, type GlossaryDetail, type OverlayState, type SourceDetail } from './components/ReaderOverlay'
import { loadSearchCorpus, loadTopic, topics, type SearchEntry, type Topic } from './lib/contentLoader'
import { loadBookmarks, loadPrefs, loadProgress, saveBookmarks, savePrefs, saveProgress, type ReaderPrefs, type Theme } from './lib/storage'
import './pwa'
import './styles.css'

type View = 'cover' | 'toc' | 'read'

const glossaryTerms = (glossaryData as { terms: GlossaryDetail[] }).terms
const sources = (sourcesData as { sources: SourceDetail[] }).sources
const sourceMap = new Map(sources.map(source => [source.id, source]))
const glossaryMap = new Map(glossaryTerms.map(term => [term.id, term]))
const defaultPrefs: ReaderPrefs = { theme: 'light', fontScale: 1, lineHeight: 1.85, readingMode: 'reading', soundEnabled: false }
const titleSearchEntries: SearchEntry[] = topics.map(topic => ({ ...topic, searchText: topic.title.toLocaleLowerCase('th') }))
const availableTopicIds = new Set(topics.map(topic => topic.id))
const availableParts = ((tocData as any).parts ?? [])
  .map((part: any) => ({
    ...part,
    chapters: (part.chapters ?? [])
      .map((chapter: any) => ({
        ...chapter,
        topics: (chapter.topics ?? []).filter((item: any) => availableTopicIds.has(String(item.id)))
      }))
      .filter((chapter: any) => chapter.topics.length > 0)
  }))
  .filter((part: any) => part.chapters.length > 0)

function App() {
  const [view, setView] = useState<View>('cover')
  const [topicId, setTopicId] = useState(topics[0]?.id ?? '1.1')
  const [topic, setTopic] = useState<Topic | null>(null)
  const [topicLoading, setTopicLoading] = useState(false)
  const [topicError, setTopicError] = useState('')
  const [prefs, setPrefs] = useState<ReaderPrefs>(defaultPrefs)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [resume, setResume] = useState<{ topicId: string; scrollY: number } | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchEntries, setSearchEntries] = useState<SearchEntry[]>(titleSearchEntries)
  const [searchIndexReady, setSearchIndexReady] = useState(false)
  const [overlay, setOverlay] = useState<OverlayState>(null)

  const currentMeta = useMemo(() => topics.find(item => item.id === topicId), [topicId])
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('th')
    if (!query) return []
    return searchEntries.filter(item => item.id.toLocaleLowerCase().includes(query) || item.searchText.includes(query)).slice(0, 20)
  }, [searchQuery, searchEntries])

  useEffect(() => {
    Promise.all([loadPrefs(), loadBookmarks(), loadProgress()]).then(([savedPrefs, savedBookmarks, progress]) => {
      setPrefs(savedPrefs)
      setBookmarks(savedBookmarks)
      if (progress && availableTopicIds.has(progress.topicId)) setResume({ topicId: progress.topicId, scrollY: progress.scrollY })
    })
  }, [])

  useEffect(() => { document.documentElement.dataset.theme = prefs.theme }, [prefs.theme])
  useEffect(() => { savePrefs(prefs) }, [prefs])

  useEffect(() => {
    if (!searchQuery.trim() || searchIndexReady) return
    let cancelled = false
    loadSearchCorpus().then(entries => {
      if (!cancelled) {
        setSearchEntries(entries)
        setSearchIndexReady(true)
      }
    }).catch(() => undefined)
    return () => { cancelled = true }
  }, [searchQuery, searchIndexReady])

  useEffect(() => {
    if (view !== 'read') return
    let cancelled = false
    setTopicLoading(true)
    setTopicError('')
    loadTopic(topicId).then(loaded => {
      if (!cancelled) setTopic(loaded)
    }).catch(() => {
      if (!cancelled) setTopicError('ไม่สามารถเปิดเนื้อหาหัวข้อนี้ได้')
    }).finally(() => {
      if (!cancelled) setTopicLoading(false)
    })
    return () => { cancelled = true }
  }, [view, topicId])

  useEffect(() => {
    if (view !== 'read' || prefs.readingMode !== 'reading' || !topic) return
    const targetScroll = resume?.topicId === topicId ? resume.scrollY : 0
    const timer = window.setTimeout(() => window.scrollTo(0, targetScroll), 0)
    const onScroll = () => {
      const next = { topicId, scrollY: window.scrollY, updatedAt: Date.now() }
      setResume({ topicId, scrollY: window.scrollY })
      saveProgress(next)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [view, topicId, prefs.readingMode, topic])

  function openTopic(id: string, scrollY = 0) {
    setTopicId(id)
    setTopic(null)
    setResume({ topicId: id, scrollY })
    saveProgress({ topicId: id, scrollY, updatedAt: Date.now() })
    setView('read')
  }

  function toggleBookmark(id: string) {
    const next = bookmarks.includes(id) ? bookmarks.filter(item => item !== id) : [...bookmarks, id]
    setBookmarks(next)
    saveBookmarks(next)
  }

  function updatePrefs(patch: Partial<ReaderPrefs>) { setPrefs(current => ({ ...current, ...patch })) }

  function handleContentClick(event: React.MouseEvent<HTMLElement>) {
    if (!topic || !(event.target instanceof Element)) return
    const citation = event.target.closest<HTMLElement>('[data-citation-index]')
    if (citation) {
      const citationIndex = Number(citation.dataset.citationIndex)
      const sourceId = topic.sourceIds[citationIndex - 1]
      const source = sourceId ? sourceMap.get(sourceId) : undefined
      if (source) setOverlay({ kind: 'source', source, citationIndex })
      return
    }
    const glossary = event.target.closest<HTMLElement>('[data-glossary-id]')
    if (glossary?.dataset.glossaryId) {
      const term = glossaryMap.get(glossary.dataset.glossaryId)
      if (term) setOverlay({ kind: 'glossary', term })
      return
    }
    const image = event.target.closest('img') as HTMLImageElement | null
    if (image?.src) setOverlay({ kind: 'image', src: image.src, alt: image.alt || 'ภาพประกอบ' })
  }

  if (view === 'cover') {
    const resumeTopic = resume && topics.find(item => item.id === resume.topicId)
    return <main className="cover"><section className="cover-card"><p className="eyebrow">ตำราประจำฟาร์ม • ฉบับดิจิทัล</p><h1>ตำรา<br/><strong>นิพนธ์ฟาร์ม</strong></h1><h2>ศาสตร์และวิถีการเลี้ยงสุกร</h2><p>จากภูมิปัญญาหน้าคอก สู่การจัดการฟาร์มสมัยใหม่</p><div className="cover-art" aria-hidden="true">🐖</div><button className="primary" onClick={() => openTopic(topics[0]?.id ?? '1.1')}>เปิดตำรา</button>{resumeTopic && <button className="resume" onClick={() => openTopic(resumeTopic.id, resume?.scrollY ?? 0)}><strong>อ่านต่อ</strong><small>{resumeTopic.id} · {resumeTopic.title}</small></button>}<button onClick={() => setView('toc')}>สารบัญ</button></section></main>
  }

  if (view === 'toc') {
    return <main className="shell"><header className="topbar"><button onClick={() => setView('cover')}>←</button><div><small>ตำรา นิพนธ์ฟาร์ม</small><h1>สารบัญ</h1></div></header><section className="search-panel"><label htmlFor="reader-search">ค้นหาในเนื้อหาที่มีในเล่ม</label><input id="reader-search" type="search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="เช่น พฤติกรรม, Duroc, เงินทุน" />{searchQuery.trim() && <div className="search-results" aria-live="polite">{searchResults.length ? searchResults.map(item => <button key={item.id} onClick={() => openTopic(item.id)}><span>{item.id}</span><div><strong>{item.title}</strong><small>บทที่ {item.chapter}</small></div></button>) : <p>{searchIndexReady ? 'ไม่พบคำที่ค้นหา' : 'กำลังค้นหาเนื้อหา…'}</p>}</div>}</section>{bookmarks.length > 0 && <section className="bookmark-strip"><strong>บุ๊กมาร์ก</strong>{bookmarks.map(id => { const item = topics.find(t => t.id === id); return item ? <button key={id} onClick={() => openTopic(id)}>{id} · {item.title}</button> : null })}</section>}{!searchQuery.trim() && availableParts.map((part: any) => <section key={part.part}><p className="eyebrow">ภาคที่ {part.part} · {part.title}</p>{part.chapters.map((chapter: any) => <section className="chapter" key={chapter.chapter}><h2>บทที่ {chapter.chapter} · {chapter.title}</h2>{chapter.topics.map((item: any) => <button key={item.id} onClick={() => openTopic(item.id)}><span>{item.id}</span><strong>{item.title}</strong>{bookmarks.includes(item.id) && <em aria-label="บุ๊กมาร์ก">★</em>}</button>)}</section>)}</section>)}</main>
  }

  if (!currentMeta) return <main className="shell"><p>ไม่พบหัวข้อนี้</p><button onClick={() => setView('toc')}>กลับสารบัญ</button></main>
  if (topicLoading || !topic) return <main className="shell"><p>{topicError || 'กำลังเปิดหัวข้อ…'}</p>{topicError && <button onClick={() => setView('toc')}>กลับสารบัญ</button>}</main>

  const index = topics.findIndex(item => item.id === topic.id)
  const previous = topics[index - 1]
  const next = topics[index + 1]
  const bookmarked = bookmarks.includes(topic.id)
  const readerStyle = { '--reader-scale': prefs.fontScale, '--reader-leading': prefs.lineHeight } as React.CSSProperties

  return <main className={`reader mode-${prefs.readingMode}`} style={readerStyle}>
    <header className="readerbar"><button onClick={() => setView('toc')} aria-label="เปิดสารบัญ">☰</button><div><small>บทที่ {topic.chapter}</small><strong>{topic.title}</strong></div><div className="reader-actions"><button className={bookmarked ? 'active' : ''} onClick={() => toggleBookmark(topic.id)} aria-label={bookmarked ? 'ลบบุ๊กมาร์ก' : 'เพิ่มบุ๊กมาร์ก'}>{bookmarked ? '★' : '☆'}</button><button onClick={() => setSettingsOpen(true)} aria-label="การตั้งค่าการอ่าน">Aa</button></div></header>
    {prefs.readingMode === 'book' ? <BookReader html={topic.html} title={topic.title} chapter={topic.chapter} fontScale={prefs.fontScale} lineHeight={prefs.lineHeight} hasPreviousTopic={Boolean(previous)} hasNextTopic={Boolean(next)} onPreviousTopic={() => previous && openTopic(previous.id)} onNextTopic={() => next && openTopic(next.id)} onOpenToc={() => setView('toc')} onContentClick={handleContentClick} /> : <><article className="prose" onClick={handleContentClick} dangerouslySetInnerHTML={{ __html: topic.html }} /><nav className="bottomnav"><button disabled={!previous} onClick={() => previous && openTopic(previous.id)}>← ก่อนหน้า</button><button onClick={() => setView('toc')}>สารบัญ</button><button disabled={!next} onClick={() => next && openTopic(next.id)}>ถัดไป →</button></nav></>}
    {settingsOpen && <div className="modal-backdrop" role="presentation" onClick={() => setSettingsOpen(false)}><section className="settings-sheet" role="dialog" aria-modal="true" aria-label="การตั้งค่าการอ่าน" onClick={event => event.stopPropagation()}><header><div><small>Reader Settings</small><h2>การตั้งค่าการอ่าน</h2></div><button onClick={() => setSettingsOpen(false)} aria-label="ปิด">×</button></header><fieldset><legend>โหมดอ่าน</legend><div className="theme-grid mode-grid"><button className={prefs.readingMode === 'reading' ? 'selected' : ''} onClick={() => updatePrefs({ readingMode: 'reading' })}>Reading Mode</button><button className={prefs.readingMode === 'book' ? 'selected' : ''} onClick={() => updatePrefs({ readingMode: 'book' })}>Book Mode</button></div></fieldset><label>ขนาดตัวอักษร <output>{Math.round(prefs.fontScale * 100)}%</output><input type="range" min="0.9" max="1.3" step="0.05" value={prefs.fontScale} onChange={event => updatePrefs({ fontScale: Number(event.target.value) })}/></label><label>ระยะห่างบรรทัด <output>{prefs.lineHeight.toFixed(2)}</output><input type="range" min="1.55" max="2.15" step="0.1" value={prefs.lineHeight} onChange={event => updatePrefs({ lineHeight: Number(event.target.value) })}/></label><fieldset><legend>ธีม</legend><div className="theme-grid">{(['light','sepia','dark'] as Theme[]).map(theme => <button key={theme} className={prefs.theme === theme ? 'selected' : ''} onClick={() => updatePrefs({ theme })}>{theme === 'light' ? 'กระดาษอุ่น' : theme === 'sepia' ? 'ซีเปีย' : 'กลางคืน'}</button>)}</div></fieldset><p className="settings-note">Book Mode แบ่งหน้าใหม่ตามขนาดจอและตัวอักษรแบบ runtime หากไม่ต้องการ motion ระบบรองรับ reduced motion และสามารถสลับกลับ Reading Mode ได้ตลอดเวลา</p></section></div>}
    <ReaderOverlay overlay={overlay} onClose={() => setOverlay(null)} />
  </main>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
