import { useState } from 'react'

export type SourceDetail = {
  id: string
  title: string
  organization?: string
  url?: string
  publication_date?: string
  accessed_date?: string
  tier?: string
  notes?: string
}

export type GlossaryDetail = {
  id: string
  th: string
  en: string
  definition_th: string
  source_ids: string[]
  context_note?: string
}

export type OverlayState =
  | { kind: 'source'; source: SourceDetail; citationIndex: number }
  | { kind: 'glossary'; term: GlossaryDetail }
  | { kind: 'image'; src: string; alt: string }
  | null

export function ReaderOverlay({ overlay, onClose }: { overlay: OverlayState; onClose: () => void }) {
  const [zoom, setZoom] = useState(1)
  if (!overlay) return null

  if (overlay.kind === 'image') {
    return <div className="image-viewer" role="dialog" aria-modal="true" aria-label="ดูภาพเต็มจอ" onClick={onClose}>
      <header onClick={event => event.stopPropagation()}><strong>{overlay.alt || 'ภาพประกอบ'}</strong><div><button onClick={() => setZoom(value => Math.max(1, value - .25))} aria-label="ซูมออก">−</button><button onClick={() => setZoom(1)}>100%</button><button onClick={() => setZoom(value => Math.min(3, value + .25))} aria-label="ซูมเข้า">+</button><button onClick={onClose} aria-label="ปิดภาพ">×</button></div></header>
      <div className="image-canvas" onClick={event => event.stopPropagation()}><img src={overlay.src} alt={overlay.alt} style={{ transform: `scale(${zoom})` }} /></div>
    </div>
  }

  const dialogLabel = overlay.kind === 'source' ? `แหล่งอ้างอิง ${overlay.citationIndex}` : `อภิธานศัพท์ ${overlay.term.th}`

  return <div className="modal-backdrop" role="presentation" onClick={onClose}>
    <section className="reference-sheet" role="dialog" aria-modal="true" aria-label={dialogLabel} onClick={event => event.stopPropagation()}>
      <header><div><small>{overlay.kind === 'source' ? `Citation [${overlay.citationIndex}]` : 'Glossary'}</small><h2>{overlay.kind === 'source' ? overlay.source.title : overlay.term.th}</h2></div><button onClick={onClose} aria-label="ปิด">×</button></header>
      {overlay.kind === 'source' ? <div className="reference-body">
        {overlay.source.organization && <p><strong>แหล่ง:</strong> {overlay.source.organization}</p>}
        {overlay.source.publication_date && <p><strong>เผยแพร่:</strong> {overlay.source.publication_date}</p>}
        {overlay.source.accessed_date && <p><strong>ตรวจเมื่อ:</strong> {overlay.source.accessed_date}</p>}
        {overlay.source.tier && <p><strong>Source tier:</strong> {overlay.source.tier}</p>}
        {overlay.source.notes && <p className="muted">{overlay.source.notes}</p>}
        {overlay.source.url && <a className="reference-link" href={overlay.source.url} target="_blank" rel="noreferrer">เปิดแหล่งอ้างอิง ↗</a>}
      </div> : <div className="reference-body">
        <p className="term-en">{overlay.term.en}</p>
        <p>{overlay.term.definition_th}</p>
        {overlay.term.context_note && <p className="muted"><strong>หมายเหตุ:</strong> {overlay.term.context_note}</p>}
        {overlay.term.source_ids?.length > 0 && <p className="source-ids">อ้างอิง: {overlay.term.source_ids.join(', ')}</p>}
      </div>}
    </section>
  </div>
}
