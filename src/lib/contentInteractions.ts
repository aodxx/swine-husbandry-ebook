export type GlossaryTerm = {
  id: string
  th: string
  en: string
  definition_th: string
  source_ids: string[]
  context_note?: string
}

const excludedParents = new Set(['A', 'CODE', 'PRE', 'BUTTON', 'SCRIPT', 'STYLE', 'H1'])

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function decorateContentHtml(html: string, terms: GlossaryTerm[]) {
  if (typeof DOMParser === 'undefined') return html

  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div id="reader-content-root">${html}</div>`, 'text/html')
  const root = doc.getElementById('reader-content-root')
  if (!root) return html

  const usableTerms = terms
    .flatMap(term => [term.th, term.en].filter(Boolean).map(label => ({ label, id: term.id })))
    .filter(item => item.label.length >= 3)
    .sort((a, b) => b.label.length - a.label.length)

  const glossaryPattern = usableTerms.length
    ? new RegExp(`(${usableTerms.map(item => escapeRegExp(item.label)).join('|')})`, 'gi')
    : null

  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  let current = walker.nextNode()
  while (current) {
    const text = current as Text
    const parent = text.parentElement
    if (parent && !excludedParents.has(parent.tagName) && text.data.trim()) textNodes.push(text)
    current = walker.nextNode()
  }

  for (const text of textNodes) {
    const parent = text.parentElement
    if (!parent) continue
    const value = text.data
    const citationPattern = /\[(\d{1,3})\]/g
    const hasCitation = citationPattern.test(value)
    citationPattern.lastIndex = 0
    const hasGlossary = glossaryPattern ? glossaryPattern.test(value) : false
    if (glossaryPattern) glossaryPattern.lastIndex = 0
    if (!hasCitation && !hasGlossary) continue

    const fragment = doc.createDocumentFragment()
    const combined = glossaryPattern
      ? new RegExp(`\[(\d{1,3})\]|(${usableTerms.map(item => escapeRegExp(item.label)).join('|')})`, 'gi')
      : /\[(\d{1,3})\]/g

    let cursor = 0
    for (const match of value.matchAll(combined)) {
      const index = match.index ?? 0
      if (index > cursor) fragment.append(value.slice(cursor, index))
      const citationNumber = match[1]
      if (citationNumber) {
        const button = doc.createElement('button')
        button.type = 'button'
        button.className = 'citation-ref'
        button.dataset.citationIndex = citationNumber
        button.textContent = `[${citationNumber}]`
        fragment.append(button)
      } else {
        const label = match[0]
        const term = usableTerms.find(item => item.label.toLocaleLowerCase() === label.toLocaleLowerCase())
        if (term) {
          const button = doc.createElement('button')
          button.type = 'button'
          button.className = 'glossary-term'
          button.dataset.glossaryId = term.id
          button.textContent = label
          fragment.append(button)
        } else fragment.append(label)
      }
      cursor = index + match[0].length
    }
    if (cursor < value.length) fragment.append(value.slice(cursor))
    parent.replaceChild(fragment, text)
  }

  return root.innerHTML
}
