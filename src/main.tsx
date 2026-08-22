import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { marked } from 'marked'
import tocData from '../data/toc.json'
import './styles.css'

type Topic = { id: string; title: string; chapter: number; html: string }

const rawFiles = import.meta.glob('../content/part-01/chapter-*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

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
  return { id, title, chapter, html: marked.parse(body, { async: false }) as string }
}

const topics = Object.values(rawFiles)
  .map(parseTopic)
  .filter(Boolean) as Topic[]

topics.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))

function App() {
  const [view, setView] = useState<'cover' | 'toc' | 'read'>('cover')
  const [topicId, setTopicId] = useState(topics[0]?.id ?? '1.1')
  const topic = useMemo(() => topics.find(item => item.id === topicId), [topicId])

  if (view === 'cover') {
    return <main className="cover">
      <section className="cover-card">
        <p className="eyebrow">ตำราประจำฟาร์ม • ฉบับดิจิทัล</p>
        <h1>ตำรา<br/><strong>นิพนธ์ฟาร์ม</strong></h1>
        <h2>ศาสตร์และวิถีการเลี้ยงสุกร</h2>
        <p>จากภูมิปัญญาหน้าคอก สู่การจัดการฟาร์มสมัยใหม่</p>
        <div className="cover-art" aria-hidden="true">🐖</div>
        <button className="primary" onClick={() => setView('read')}>เปิดตำรา</button>
        <button onClick={() => setView('toc')}>สารบัญ</button>
      </section>
    </main>
  }

  if (view === 'toc') {
    const part = (tocData as any).parts?.[0]
    return <main className="shell">
      <header className="topbar"><button onClick={() => setView('cover')}>←</button><div><small>ตำรา นิพนธ์ฟาร์ม</small><h1>สารบัญ</h1></div></header>
      {part?.chapters?.filter((chapter: any) => [1, 2].includes(chapter.chapter)).map((chapter: any) => <section className="chapter" key={chapter.chapter}>
        <h2>บทที่ {chapter.chapter} · {chapter.title}</h2>
        {chapter.topics.map((item: any) => <button key={item.id} onClick={() => { setTopicId(item.id); setView('read') }}>
          <span>{item.id}</span><strong>{item.title}</strong>
        </button>)}
      </section>)}
    </main>
  }

  if (!topic) return <main className="shell"><p>ไม่พบหัวข้อนี้</p><button onClick={() => setView('toc')}>กลับสารบัญ</button></main>
  const index = topics.findIndex(item => item.id === topic.id)
  const previous = topics[index - 1]
  const next = topics[index + 1]

  return <main className="reader">
    <header className="readerbar"><button onClick={() => setView('toc')}>☰</button><div><small>บทที่ {topic.chapter}</small><strong>{topic.title}</strong></div><button aria-label="การตั้งค่าการอ่าน">Aa</button></header>
    <article className="prose" dangerouslySetInnerHTML={{ __html: topic.html }} />
    <nav className="bottomnav">
      <button disabled={!previous} onClick={() => previous && setTopicId(previous.id)}>← ก่อนหน้า</button>
      <button onClick={() => setView('toc')}>สารบัญ</button>
      <button disabled={!next} onClick={() => next && setTopicId(next.id)}>ถัดไป →</button>
    </nav>
  </main>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
