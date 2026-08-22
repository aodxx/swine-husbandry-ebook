import { useEffect, useRef, useState } from 'react'

type Props = {
  html: string
  title: string
  chapter: number
  fontScale: number
  lineHeight: number
  hasPreviousTopic: boolean
  hasNextTopic: boolean
  onPreviousTopic: () => void
  onNextTopic: () => void
  onOpenToc: () => void
}

export function BookReader({ html, title, chapter, fontScale, lineHeight, hasPreviousTopic, hasNextTopic, onPreviousTopic, onNextTopic, onOpenToc }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLElement>(null)
  const touchStart = useRef<number | null>(null)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [pageWidth, setPageWidth] = useState(320)
  const [spread, setSpread] = useState(1)
  const [turning, setTurning] = useState<'next' | 'previous' | null>(null)

  useEffect(() => { setPage(0) }, [html])

  useEffect(() => {
    const viewport = viewportRef.current
    const content = contentRef.current
    if (!viewport || !content) return

    const measure = () => {
      const nextSpread = viewport.clientWidth >= 920 ? 2 : 1
      const nextWidth = Math.max(280, Math.floor(viewport.clientWidth / nextSpread))
      setSpread(nextSpread)
      setPageWidth(nextWidth)
      requestAnimationFrame(() => {
        const total = Math.max(1, Math.ceil(content.scrollWidth / nextWidth))
        setPageCount(total)
        setPage(current => Math.min(current, Math.max(0, total - nextSpread)))
      })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(content)
    measure()
    return () => observer.disconnect()
  }, [html, fontScale, lineHeight])

  const maxStart = Math.max(0, pageCount - spread)

  function animate(direction: 'next' | 'previous') {
    setTurning(direction)
    window.setTimeout(() => setTurning(null), 260)
  }

  function nextPage() {
    if (page < maxStart) {
      animate('next')
      setPage(current => Math.min(maxStart, current + spread))
    } else if (hasNextTopic) onNextTopic()
  }

  function previousPage() {
    if (page > 0) {
      animate('previous')
      setPage(current => Math.max(0, current - spread))
    } else if (hasPreviousTopic) onPreviousTopic()
  }

  function onTouchStart(event: React.TouchEvent) { touchStart.current = event.changedTouches[0]?.clientX ?? null }
  function onTouchEnd(event: React.TouchEvent) {
    if (touchStart.current == null) return
    const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current
    touchStart.current = null
    if (Math.abs(delta) < 48) return
    if (delta < 0) nextPage(); else previousPage()
  }

  const firstVisible = page + 1
  const lastVisible = Math.min(page + spread, pageCount)

  return <section className="book-mode" aria-label="โหมดหนังสือ">
    <div className="book-stage" ref={viewportRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className={`book-paper ${turning ? `turn-${turning}` : ''}`}>
        <div className="book-running-head"><span>บทที่ {chapter}</span><strong>{title}</strong></div>
        <article
          ref={contentRef}
          className="book-columns prose"
          style={{
            '--book-page-width': `${pageWidth}px`,
            '--book-offset': `${page * pageWidth}px`,
            '--reader-scale': fontScale,
            '--reader-leading': lineHeight,
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="book-page-number" aria-live="polite">{spread === 2 && lastVisible !== firstVisible ? `${firstVisible}–${lastVisible}` : firstVisible} / {pageCount}</div>
      </div>
    </div>
    <nav className="book-controls" aria-label="ควบคุมหน้าหนังสือ">
      <button onClick={previousPage} disabled={page === 0 && !hasPreviousTopic}>←</button>
      <button onClick={onOpenToc}>สารบัญ</button>
      <span>{spread === 2 ? 'สองหน้า' : 'หนึ่งหน้า'}</span>
      <button onClick={nextPage} disabled={page >= maxStart && !hasNextTopic}>→</button>
    </nav>
  </section>
}
