import tocData from '../../data/toc.json'
import glossaryData from '../../data/glossary.json'
import type { GlossaryDetail } from '../components/ReaderOverlay'
import { decorateContentHtml } from './contentInteractions'

export type TopicMeta = { id: string; title: string; chapter: number }
export type Topic = TopicMeta & { html: string; searchText: string; sourceIds: string[] }
export type SearchEntry = TopicMeta & { searchText: string }

type RawLoader = () => Promise<string>

const glossaryTerms = (glossaryData as { terms: GlossaryDetail[] }).terms

// Load every real chapter Markdown file in every part. The TOC still controls ordering
// and visibility, while import.meta.glob keeps each topic lazy-loaded as its own chunk.
const rawLoaders = import.meta.glob('../../content/part-*/chapter-*/*.md', {
  query: '?raw',
  import: 'default'
}) as Record<string, RawLoader>

const loaderById = new Map<string, RawLoader>()
for (const [path, loader] of Object.entries(rawLoaders)) {
  const id = path.match(/\/(\d+\.\d+)\.md$/)?.[1]
  if (id) loaderById.set(id, loader)
}

export const topics: TopicMeta[] = ((tocData as any).parts ?? [])
  .flatMap((part: any) => part.chapters ?? [])
  .flatMap((chapter: any) => (chapter.topics ?? []).map((topic: any) => ({
    id: String(topic.id),
    title: String(topic.title),
    chapter: Number(chapter.chapter)
  })))
  .filter((topic: TopicMeta) => loaderById.has(topic.id))
  .sort((a: TopicMeta, b: TopicMeta) => a.id.localeCompare(b.id, undefined, { numeric: true }))

const rawCache = new Map<string, Promise<string>>()
const topicCache = new Map<string, Promise<Topic>>()
let searchCorpusPromise: Promise<SearchEntry[]> | null = null

function stripMarkdown(value: string) {
  return value
    .replace(/^---[\s\S]*?---/m, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseFrontmatter(raw: string) {
  if (!raw.startsWith('---')) throw new Error('Missing frontmatter')
  const end = raw.indexOf('\n---', 3)
  if (end < 0) throw new Error('Invalid frontmatter')
  const fm = raw.slice(3, end)
  const body = raw.slice(end + 4).trim()
  const sourceBlock = fm.match(/^source_ids:\s*\n([\s\S]*?)(?=^[a-zA-Z_]+:|$)/m)?.[1] ?? ''
  const sourceIds = [...sourceBlock.matchAll(/^\s*-\s*["']?([^"'\n]+)["']?\s*$/gm)].map(match => match[1].trim())
  return { body, sourceIds }
}

async function loadRaw(id: string) {
  const existing = rawCache.get(id)
  if (existing) return existing
  const loader = loaderById.get(id)
  if (!loader) throw new Error(`No content loader for topic ${id}`)
  const promise = loader()
  rawCache.set(id, promise)
  return promise
}

export async function loadTopic(id: string): Promise<Topic> {
  const existing = topicCache.get(id)
  if (existing) return existing

  const meta = topics.find(topic => topic.id === id)
  if (!meta) throw new Error(`Unknown topic ${id}`)

  const promise = (async () => {
    const raw = await loadRaw(id)
    const { body, sourceIds } = parseFrontmatter(raw)
    const { marked } = await import('marked')
    const rendered = marked.parse(body, { async: false }) as string
    return {
      ...meta,
      sourceIds,
      html: decorateContentHtml(rendered, glossaryTerms),
      searchText: `${meta.title} ${stripMarkdown(body)}`.toLocaleLowerCase('th')
    }
  })()

  topicCache.set(id, promise)
  return promise
}

export function loadSearchCorpus(): Promise<SearchEntry[]> {
  if (searchCorpusPromise) return searchCorpusPromise
  searchCorpusPromise = Promise.all(topics.map(async meta => {
    const raw = await loadRaw(meta.id)
    return {
      ...meta,
      searchText: `${meta.title} ${stripMarkdown(raw)}`.toLocaleLowerCase('th')
    }
  }))
  return searchCorpusPromise
}
