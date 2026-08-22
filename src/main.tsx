import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { marked } from 'marked'
import tocData from '../data/toc.json'
import { loadBookmarks, loadPrefs, loadProgress, saveBookmarks, savePrefs, saveProgress, type ReaderPrefs, type Theme } from './lib/storage'
import './styles.css'

type Topic = { id: string; title: string; chapter: number; html: string; searchText: string }
type View = 'cover' | 'toc' | 'read'

const rawFiles = import.meta.glob('../content/part-01/chapter-*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function stripMarkdown(value: string) {
  return value
    .replace(/^---[\s\S]*?---/m, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseTopic(raw: string): Topic | null {
  if (!raw.startsWith('---')) return null
  const end = raw.indexOf('\n---', 3)
  if (end < 0) return null
  const fm = raw.slice(3, end)
  const body = raw.slice(end + 4).trim()
  const get = (key: string) => fm.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1]
  const id = get('id')
  const title = get('title')
  const chapter = Number(get('chapter'))
  if (!id || !title || ![1, 2].includes(chapter)) return null
  return { id, title, chapter, html: marked.parse(body, { async: false }) as string, searchText: `${title} ${stripMarkdown(body)}`.toLocaleLowerCase('th') }
}

const topics = Object.values(rawFiles).map(parseTopic).filter(Boolean) as Topic[]
topics.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))

const defaultPrefs: ReaderPrefs = { theme: 'light', fontScale: 1, lineHeight: 1.85, readingMode: 'reading', soundEnabled: false }

function App() {
  const [view, setView] = useState<View>('cover')
  const [topicId, setTopicId] = useState(topics[0]?.id ?? '1.1')
  const [prefs, setPrefs] = useState<ReaderPrefs>(defaultPrefs)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [resume, setResume] = useState<{ topicId: string; scrollY: number } | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const topic = useMemo(() => topics.find(item => item.id === topicId), [topicId])
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('th')
    if (!query) return []
    return topics.filter(item => item.id.toLocaleLowerCase().includes(query) || item.searchText.includes(query)).slice(0, 20)
  }, [searchQuery])

  useEffect(() => {
    Promise.all([loadPrefs(), loadBookmarks(), loadProgress()]).then(([savedPrefs, savedBookmarks, progress]) => {
      setPrefs(savedPrefs)
      setBookmarks(savedBookmarks)
      if (progress) setResume({ topicId: progress.topicId, scrollY: progress.scrollY })
    })
  }, [])

  useEffect(() => { document.documentElement.dataset.theme = prefs.theme }, [prefs.theme])
  useEffect(() => { savePrefs(prefs) }, [prefs])

  useEffect(() => {
    if (view !== 'read') return
    const targetScroll = resume?.topicId === topicId ? resume.scrollY : 0
    const timer = window.setTimeout(() => window.scrollTo(0, targetScroll), 0)
    const onScroll = () => {
      const next = { topicId, scrollY: window.scrollY, updatedAt: Date.now() }
      setResume({ topicId, scrollY: window.scrollY })
      saveProgress(next)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [view, topicId])

  function openTopic(id: string, scrollY = 0) {
    setTopicId(id)
    setResume({ topicId: id, scrollY })
    setView('read')
  }

  function toggleBookmark(id: string) {
    const next = bookmarks.includes(id) ? bookmarks.filter(item => item !== id) : [...bookmarks, id]
    setBookmarks(next)
    saveBookmarks(next)
  }

  function updatePrefs(patch: Partial<ReaderPrefs>) { setPrefs(current => ({ ...current, ...patch })) }

  if (view === 'cover') {
    const resumeTopic = resume && topics.find(item => item.id === resume.topicId)
    return <main className="cover">
      <section className="cover-card">
        <p className="eyebrow">ตำราประจำฟาร์ม • ฉบับดิจิทัล</p>
        <h1>ตำรา<br/><strong>นิพนธ์ฟาร์ม</strong></h1>
        <h2>ศาสตร์และวิถีการเลี้ยงสุกร</h2>
        <p>จากภูมิปัญญาหน้าคอก สู่การจัดการฟาร์มสมัยใหม่</p>
        <div className="cover-art" aria-hidden="true">🐖</div>
        <button className="primary" onClick={() => openTopic(topics[0]?.id ?? '1.1')}>เปิดตำรา</button>
        {resumeTopic && <button className="resume" onClick={() => openTopic(resumeTopic.id, resume?.scrollY ?? 0)}><strong>อ่านต่อ</strong><small>{resumeTopic.id} · {resumeTopic.title}</small></button>}
        <button onClick={() => setView('toc')}>สารบัญ</button>
      </section>
    </main>
  }

  if (view === 'toc') {
    const part = (tocData as any).parts?.[0]
    return <main className="shell">
      <header className="topbar"><button onClick={() => setView('cover')}>←</button><div><small>ตำรา นิพนธ์ฟาร์ม</small><h1>สารบัญ</h1></div></header>
      <section className="search-panel">
        <label htmlFor="reader-search">ค้นหาใน Chapter 1–2</label>
        <input id="reader-search" type="search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="เช่น พฤติกรรม, Duroc, heterosis" />
        {searchQuery.trim() && <div className="search-results" aria-live="polite">{searchResults.length ? searchResults.map(item => <button key={item.id} onClick={() => openTopic(item.id)}><span>{item.id}</span><div><strong>{item.title}</strong><small>บทที่ {item.chapter}</small></div></button>) : <p>ไม่พบคำที่ค้นหา</p>}</div>}
      </section>
      {bookmarks.length > 0 && <section className="bookmark-strip"><strong>บุ๊กมาร์ก</strong>{bookmarks.map(id => { const item = topics.find(t => t.id === id); return item ? <button key={id} onClick={() => openTopic(id)}>{id} · {item.title}</button> : null })}</section>}
      {!searchQuery.trim() && part?.chapters?.filter((chapter: any) => [1, 2].includes(chapter.chapter)).map((chapter: any) => <section className="chapter" key={chapter.chapter}>
        <h2>บทที่ {chapter.chapter} · {chapter.title}</h2>
        {chapter.topics.map((item: any) => <button key={item.id} onClick={() => openTopic(item.id)}>
          <span>{item.id}</span><strong>{item.title}</strong>{bookmarks.includes(item.id) && <em aria-label="บุ๊กมาร์ก">★</em>}
        </button>)}
      </section>)}
    </main>
  }

  if (!topic) return <main className="shell"><p>ไม่พบหัวข้อนี้</p><button onClick={() => setView('toc')}>กลับสารบัญ</button></main>
  const index = topics.findIndex(item => item.id === topic.id)
  const previous = topics[index - 1]
  const next = topics[index + 1]
  const bookmarked = bookmarks.includes(topic.id)
  const readerStyle = { '--reader-scale': prefs.fontScale, '--reader-leading': prefs.lineHeight } as React.CSSProperties

  return <main className="reader" style={readerStyle}>
    <header className="readerbar">
      <button onClick={() => setView('toc')} aria-label="เปิดสารบัญ">☰</button>
      <div><small>บทที่ {topic.chapter}</small><strong>{topic.title}</strong></div>
      <div className="reader-actions"><button className={bookmarked ? 'active' : ''} onClick={() => toggleBookmark(topic.id)} aria-label={bookmarked ? 'ลบบุ๊กมาร์ก' : 'เพิ่มบุ๊กมาร์ก'}>{bookmarked ? '★' : '☆'}</button><button onClick={() => setSettingsOpen(true)} aria-label="การตั้งค่าการอ่าน">Aa</button></div>
    </header>
    <article className="prose" dangerouslySetInnerHTML={{ __html: topic.html }} />
    <nav className="bottomnav">
      <button disabled={!previous} onClick={() => previous && openTopic(previous.id)}>← ก่อนหน้า</button>
      <button onClick={() => setView('toc')}>สารบัญ</button>
      <button disabled={!next} onClick={() => next && openTopic(next.id)}>ถัดไป →</button>
    </nav>
    {settingsOpen && <div className="modal-backdrop" role="presentation" onClick={() => setSettingsOpen(false)}>
      <section className="settings-sheet" role="dialog" aria-modal="true" aria-label="การตั้งค่าการอ่าน" onClick={event => event.stopPropagation()}>
        <header><div><small>Reader Settings</small><h2>การตั้งค่าการอ่าน</h2></div><button onClick={() => setSettingsOpen(false)} aria-label="ปิด">×</button></header>
        <label>ขนาดตัวอักษร <output>{Math.round(prefs.fontScale * 100)}%</output><input type="range" min="0.9" max="1.3" step="0.05" value={prefs.fontScale} onChange={event => updatePrefs({ fontScale: Number(event.target.value) })}/></label>
        <label>ระยะห่างบรรทัด <output>{prefs.lineHeight.toFixed(2)}</output><input type="range" min="1.55" max="2.15" step="0.1" value={prefs.lineHeight} onChange={event => updatePrefs({ lineHeight: Number(event.target.value) })}/></label>
        <fieldset><legend>ธีม</legend><div className="theme-grid">{(['light','sepia','dark'] as Theme[]).map(theme => <button key={theme} className={prefs.theme === theme ? 'selected' : ''} onClick={() => updatePrefs({ theme })}>{theme === 'light' ? 'กระดาษอุ่น' : theme === 'sepia' ? 'ซีเปีย' : 'กลางคืน'}</button>)}</div></fieldset>
        <p className="settings-note">Book Mode และเสียงพลิกหน้าจะเปิดในขั้นถัดไป โดยค่าการอ่านชุดนี้จะคงอยู่ในเครื่องผ่าน IndexedDB</p>
      </section>
    </div>}
  </main>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
