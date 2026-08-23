import { useEffect, useMemo, useRef, useState } from 'react'
import '../interactions.css'
import '../pwa'

type Props = {
  html: string
  title: string
  chapter: number
  fontScale: number
  lineHeight: number
  soundEnabled: boolean
  hasPreviousTopic: boolean
  hasNextTopic: boolean
  onPreviousTopic: () => void
  onNextTopic: () => void
  onOpenToc: () => void
  onContentClick?: (event: React.MouseEvent<HTMLElement>) => void
}

type Direction = 'next' | 'previous'
type TurnState = { direction: Direction; progress: number; animated: boolean }

type PageSurfaceProps = {
  html: string
  pageIndex: number | null
  pageWidth: number
  fontScale: number
  lineHeight: number
  className?: string
  onContentClick?: (event: React.MouseEvent<HTMLElement>) => void
}

function clamp(value: number, min = 0, max = 1) { return Math.min(max, Math.max(min, value)) }

function PageSurface({ html, pageIndex, pageWidth, fontScale, lineHeight, className = '', onContentClick }: PageSurfaceProps) {
  if (pageIndex == null || pageIndex < 0) return <div className={`book-page-surface book-page-blank ${className}`} aria-hidden="true" />
  return <div className={`book-page-surface ${className}`}>
    <div className="book-page-window">
      <article
        className="book-face-content prose"
        onClick={onContentClick}
        style={{
          '--book-page-width': `${pageWidth}px`,
          '--book-offset': `${pageIndex * pageWidth}px`,
          '--reader-scale': fontScale,
          '--reader-leading': lineHeight,
        } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  </div>
}

function playPageFlipSound() {
  try {
    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextCtor) return
    const context = new AudioContextCtor()
    const duration = 0.24
    const buffer = context.createBuffer(1, Math.floor(context.sampleRate * duration), context.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i += 1) {
      const t = i / data.length
      const envelope = Math.sin(Math.PI * t) * (1 - t * 0.45)
      const texture = (Math.random() * 2 - 1) * 0.72 + Math.sin(i * 0.11) * 0.18
      data[i] = texture * envelope * 0.22
    }
    const source = context.createBufferSource()
    source.buffer = buffer
    const filter = context.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1450, context.currentTime)
    filter.frequency.exponentialRampToValueAtTime(520, context.currentTime + duration)
    filter.Q.value = 0.55
    const gain = context.createGain()
    gain.gain.setValueAtTime(0.001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.8, context.currentTime + 0.025)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration)
    source.connect(filter).connect(gain).connect(context.destination)
    source.start()
    source.stop(context.currentTime + duration)
    source.onended = () => { void context.close() }
  } catch {
    // Audio is enhancement-only. Navigation must never fail if Web Audio is unavailable.
  }
}

export function BookReader({ html, title, chapter, fontScale, lineHeight, soundEnabled, hasPreviousTopic, hasNextTopic, onPreviousTopic, onNextTopic, onOpenToc, onContentClick }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLElement>(null)
  const dragRef = useRef<{ direction: Direction; startX: number; width: number; pointerId: number } | null>(null)
  const timerRef = useRef<number | null>(null)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [pageWidth, setPageWidth] = useState(320)
  const [spread, setSpread] = useState(1)
  const [turn, setTurn] = useState<TurnState | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    setPage(0)
    setTurn(null)
  }, [html])

  useEffect(() => () => { if (timerRef.current != null) window.clearTimeout(timerRef.current) }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    const measure = measureRef.current
    if (!viewport || !measure) return
    const measurePages = () => {
      const nextSpread = viewport.clientWidth >= 920 ? 2 : 1
      const nextWidth = Math.max(280, Math.floor(viewport.clientWidth / nextSpread))
      setSpread(nextSpread)
      setPageWidth(nextWidth)
      requestAnimationFrame(() => {
        const total = Math.max(1, Math.ceil(measure.scrollWidth / nextWidth))
        setPageCount(total)
        setPage(current => Math.min(current, Math.max(0, total - nextSpread)))
      })
    }
    const observer = new ResizeObserver(measurePages)
    observer.observe(viewport)
    observer.observe(measure)
    measurePages()
    return () => observer.disconnect()
  }, [html, fontScale, lineHeight])

  const maxStart = Math.max(0, pageCount - spread)
  const canNext = page < maxStart || hasNextTopic
  const canPrevious = page > 0 || hasPreviousTopic

  function finishTurn(direction: Direction) {
    if (soundEnabled) playPageFlipSound()
    if (direction === 'next') {
      if (page < maxStart) setPage(current => Math.min(maxStart, current + spread))
      else if (hasNextTopic) onNextTopic()
    } else {
      if (page > 0) setPage(current => Math.max(0, current - spread))
      else if (hasPreviousTopic) onPreviousTopic()
    }
  }

  function completeAnimatedTurn(direction: Direction, fromProgress = 0) {
    if ((direction === 'next' && !canNext) || (direction === 'previous' && !canPrevious)) return
    if (reducedMotion) {
      setTurn(null)
      finishTurn(direction)
      return
    }
    setTurn({ direction, progress: fromProgress, animated: false })
    requestAnimationFrame(() => requestAnimationFrame(() => setTurn({ direction, progress: 1, animated: true })))
    if (soundEnabled) playPageFlipSound()
    if (timerRef.current != null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (direction === 'next') {
        if (page < maxStart) setPage(current => Math.min(maxStart, current + spread))
        else if (hasNextTopic) onNextTopic()
      } else {
        if (page > 0) setPage(current => Math.max(0, current - spread))
        else if (hasPreviousTopic) onPreviousTopic()
      }
      setTurn(null)
    }, 470)
  }

  function cancelTurn(direction: Direction, fromProgress: number) {
    if (reducedMotion) { setTurn(null); return }
    setTurn({ direction, progress: fromProgress, animated: false })
    requestAnimationFrame(() => setTurn({ direction, progress: 0, animated: true }))
    if (timerRef.current != null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setTurn(null), 320)
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (turn || event.button !== 0) return
    const rect = event.currentTarget.getBoundingClientRect()
    const localX = event.clientX - rect.left
    const edge = Math.min(150, rect.width * 0.28)
    const direction: Direction | null = localX >= rect.width - edge && canNext ? 'next' : localX <= edge && canPrevious ? 'previous' : null
    if (!direction) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { direction, startX: event.clientX, width: Math.max(1, rect.width / spread), pointerId: event.pointerId }
    setTurn({ direction, progress: 0.01, animated: false })
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const distance = drag.direction === 'next' ? drag.startX - event.clientX : event.clientX - drag.startX
    const progress = clamp(distance / drag.width)
    setTurn({ direction: drag.direction, progress, animated: false })
  }

  function onPointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    try { event.currentTarget.releasePointerCapture(event.pointerId) } catch { /* capture may already be released */ }
    const progress = turn?.progress ?? 0
    if (progress >= 0.28) completeAnimatedTurn(drag.direction, progress)
    else cancelTurn(drag.direction, progress)
  }

  const visiblePages = useMemo(() => {
    if (!turn) return spread === 2 ? [page, page + 1] : [page]
    if (spread === 1) {
      return [turn.direction === 'next' ? (page + 1 < pageCount ? page + 1 : null) : (page - 1 >= 0 ? page - 1 : null)]
    }
    if (turn.direction === 'next') return [page, page + 3 < pageCount ? page + 3 : null]
    return [page - 2 >= 0 ? page - 2 : null, page + 1 < pageCount ? page + 1 : null]
  }, [page, pageCount, spread, turn])

  const leafFront = turn ? (spread === 2 ? (turn.direction === 'next' ? page + 1 : page) : page) : null
  const leafBack = turn ? (turn.direction === 'next' ? page + spread : page - 1) : null
  const rotation = turn ? (turn.direction === 'next' ? -180 : 180) * turn.progress : 0
  const shadowStrength = turn ? Math.sin(Math.PI * turn.progress) : 0
  const firstVisible = page + 1
  const lastVisible = Math.min(page + spread, pageCount)

  return <section className="book-mode" aria-label="โหมดหนังสือพลิกหน้า">
    <div
      className={`book-stage spread-${spread} ${turn ? `is-turning turn-${turn.direction}` : ''}`}
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <article
        ref={measureRef}
        className="book-measure-content prose"
        aria-hidden="true"
        style={{ '--book-page-width': `${pageWidth}px`, '--reader-scale': fontScale, '--reader-leading': lineHeight } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="book-shell" style={{ '--flip-shadow': shadowStrength } as React.CSSProperties}>
        <div className="book-spine" aria-hidden="true" />
        {visiblePages.map((pageIndex, index) => <PageSurface key={`${pageIndex ?? 'blank'}-${index}`} html={html} pageIndex={pageIndex} pageWidth={pageWidth} fontScale={fontScale} lineHeight={lineHeight} className={index === 0 ? 'base-left' : 'base-right'} onContentClick={onContentClick} />)}
        {turn && <div
          className={`book-turning-leaf leaf-${turn.direction} ${turn.animated ? 'animated' : ''}`}
          style={{ '--flip-angle': `${rotation}deg`, '--flip-shadow': shadowStrength } as React.CSSProperties}
          aria-hidden="true"
        >
          <PageSurface html={html} pageIndex={leafFront != null && leafFront < pageCount ? leafFront : null} pageWidth={pageWidth} fontScale={fontScale} lineHeight={lineHeight} className="leaf-face leaf-front" />
          <PageSurface html={html} pageIndex={leafBack != null && leafBack >= 0 && leafBack < pageCount ? leafBack : null} pageWidth={pageWidth} fontScale={fontScale} lineHeight={lineHeight} className="leaf-face leaf-back" />
          <span className="page-curl-highlight" />
          <span className="page-cast-shadow" />
        </div>}
        <div className="book-running-head"><span>บทที่ {chapter}</span><strong>{title}</strong></div>
        <div className="book-page-number" aria-live="polite">{spread === 2 && lastVisible !== firstVisible ? `${firstVisible}–${lastVisible}` : firstVisible} / {pageCount}</div>
        <span className="book-drag-hint hint-left" aria-hidden="true">‹</span>
        <span className="book-drag-hint hint-right" aria-hidden="true">›</span>
      </div>
    </div>
    <nav className="book-controls" aria-label="ควบคุมหน้าหนังสือ">
      <button onClick={() => completeAnimatedTurn('previous')} disabled={!canPrevious || Boolean(turn)} aria-label="พลิกไปหน้าก่อนหน้า">←</button>
      <button onClick={onOpenToc}>สารบัญ</button>
      <span>{spread === 2 ? 'หนังสือสองหน้า' : 'หนังสือหนึ่งหน้า'}</span>
      <button onClick={() => completeAnimatedTurn('next')} disabled={!canNext || Boolean(turn)} aria-label="พลิกไปหน้าถัดไป">→</button>
    </nav>
  </section>
}
