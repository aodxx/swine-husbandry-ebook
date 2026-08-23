export type Theme = 'light' | 'sepia' | 'dark'
export type ReadingMode = 'reading' | 'book'

export type ReaderPrefs = {
  theme: Theme
  fontScale: number
  lineHeight: number
  readingMode: ReadingMode
  soundEnabled: boolean
}

export type ReadingProgress = {
  topicId: string
  scrollY: number
  updatedAt: number
}

const DB_NAME = 'niphon-farm-reader'
const DB_VERSION = 1
const STORE = 'reader-state'
const SOUND_MIGRATION_KEY = 'flipbook-sound-default-v1'

const defaults: ReaderPrefs = {
  theme: 'light',
  fontScale: 1,
  lineHeight: 1.85,
  readingMode: 'reading',
  soundEnabled: true,
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function getValue<T>(key: string): Promise<T | undefined> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const request = tx.objectStore(STORE).get(key)
    request.onsuccess = () => resolve(request.result as T | undefined)
    request.onerror = () => reject(request.error)
  })
}

async function setValue<T>(key: string, value: T): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(value, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function loadPrefs(): Promise<ReaderPrefs> {
  try {
    const saved = await getValue<Partial<ReaderPrefs>>('prefs')
    const migrated = await getValue<boolean>(SOUND_MIGRATION_KEY)
    const merged = { ...defaults, ...saved }
    if (!migrated) {
      merged.soundEnabled = true
      await setValue('prefs', merged)
      await setValue(SOUND_MIGRATION_KEY, true)
    }
    return merged
  } catch {
    return defaults
  }
}

export async function savePrefs(prefs: ReaderPrefs): Promise<void> {
  try { await setValue('prefs', prefs) } catch { /* graceful local fallback */ }
}

export async function loadProgress(): Promise<ReadingProgress | null> {
  try { return (await getValue<ReadingProgress>('progress')) ?? null } catch { return null }
}

export async function saveProgress(progress: ReadingProgress): Promise<void> {
  try { await setValue('progress', progress) } catch { /* no-op */ }
}

export async function loadBookmarks(): Promise<string[]> {
  try { return (await getValue<string[]>('bookmarks')) ?? [] } catch { return [] }
}

export async function saveBookmarks(bookmarks: string[]): Promise<void> {
  try { await setValue('bookmarks', bookmarks) } catch { /* no-op */ }
}
