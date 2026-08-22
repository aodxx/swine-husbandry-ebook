import { useState } from 'react'
import glossaryData from '../../data/glossary.json'

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

const glossaryTerms = (glossaryData as { terms: GlossaryDetail[] }).terms

export function ReaderOverlay({ overlay, onClose }: { overlay: OverlayState; onClose: () => void }) {
  const [zoom, setZoom] = useState(1)
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState<GlossaryDetail | null>(null)

  if (!overlay && !glossaryOpen && !selectedTerm) {
    return <button className="glossary-launcher" type="button" onClick={() => setGlossaryOpen(true)} aria-label="เปิดอภิธานศัพท์">อภิธานศัพท์</button>
  }

  if (!overlay && glossaryOpen) {
    return <div className="modal-backdrop" role="presentation" onClick={() => setGlossaryOpen(false)}>
      <section className="reference-sheet glossary-browser" role="dialog" aria-modal="true" aria-label="อภิธานศัพท์" onClick={event => event.stopPropagation()}>
        <header><div><small>Glossary</small><h2>อภิธานศัพท์</h2></div><button onClick={() => setGlossaryOpen(false)} aria-label="ปิด">×</button></header>
        <div className="glossary-browser-list">
          {glossaryTerms.map(term => <button key={term.id} type="button" onClick={() => { setSelectedTerm(term); setGlossaryOpen(false) }}><strong>{term.th}</strong><span>{term.en}</span></button>)}
        </div>
      </section>
    </div>
  }

  const effectiveOverlay: Exclude<OverlayState, null> | null = overlay ?? (selectedTerm ? { kind: 'glossary', term: selectedTerm } : null)
  if (!effectiveOverlay) return null
  const close = () => {
    if (overlay) onClose()
    else setSelectedTerm(null)
  }

  if (effectiveOverlay.kind === 'image') {
    return <div className="image-viewer" role="dialog" aria-modal="true" aria-label="ดูภาพเต็มจอ" onClick={close}>
      <header onClick={event => event.stopPropagation()}><strong>{effectiveOverlay.alt || 'ภาพประกอบ'}</strong><div><button onClick={() => setZoom(value => Math.max(1, value - .25))} aria-label="ซูมออก">−</button><button onClick={() => setZoom(1)}>100%</button><button onClick={() => setZoom(value => Math.min(3, value + .25))} aria-label="ซูมเข้า">+</button><button onClick={close} aria-label="ปิดภาพ">×</button></div></header>
      <div className="image-canvas" onClick={event => event.stopPropagation()}><img src={effectiveOverlay.src} alt={effectiveOverlay.alt} style={{ transform: `scale(${zoom})` }} /></div>
    </div>
  }

  const dialogLabel = effectiveOverlay.kind === 'source' ? `แหล่งอ้างอิง ${effectiveOverlay.citationIndex}` : `อภิธานศัพท์ ${effectiveOverlay.term.th}`

  return <div className="modal-backdrop" role="presentation" onClick={close}>
    <section className="reference-sheet" role="dialog" aria-modal="true" aria-label={dialogLabel} onClick={event => event.stopPropagation()}>
      <header><div><small>{effectiveOverlay.kind === 'source' ? `Citation [${effectiveOverlay.citationIndex}]` : 'Glossary'}</small><h2>{effectiveOverlay.kind === 'source' ? effectiveOverlay.source.title : effectiveOverlay.term.th}</h2></div><button onClick={close} aria-label="ปิด">×</button></header>
      {effectiveOverlay.kind === 'source' ? <div className="reference-body">
        {effectiveOverlay.source.organization && <p><strong>แหล่ง:</strong> {effectiveOverlay.source.organization}</p>}
        {effectiveOverlay.source.publication_date && <p><strong>เผยแพร่:</strong> {effectiveOverlay.source.publication_date}</p>}
        {effectiveOverlay.source.accessed_date && <p><strong>ตรวจเมื่อ:</strong> {effectiveOverlay.source.accessed_date}</p>}
        {effectiveOverlay.source.tier && <p><strong>Source tier:</strong> {effectiveOverlay.source.tier}</p>}
        {effectiveOverlay.source.notes && <p className="muted">{effectiveOverlay.source.notes}</p>}
        {effectiveOverlay.source.url && <a className="reference-link" href={effectiveOverlay.source.url} target="_blank" rel="noreferrer">เปิดแหล่งอ้างอิง ↗</a>}
      </div> : <div className="reference-body">
        <p className="term-en">{effectiveOverlay.term.en}</p>
        <p>{effectiveOverlay.term.definition_th}</p>
        {effectiveOverlay.term.context_note && <p className="muted"><strong>หมายเหตุ:</strong> {effectiveOverlay.term.context_note}</p>}
        {effectiveOverlay.term.source_ids?.length > 0 && <p className="source-ids">อ้างอิง: {effectiveOverlay.term.source_ids.join(', ')}</p>}
      </div>}
    </section>
  </div>
}
