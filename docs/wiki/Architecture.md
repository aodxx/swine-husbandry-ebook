# Architecture

## 4 layers

### 1. Experience Layer
- Reading Mode
- Book / Flipbook Mode
- TOC
- Search
- Bookmarks
- Resume
- Typography / theme controls
- Citation / glossary overlays
- PWA / offline

### 2. Application Layer
- React + TypeScript + Vite
- Reader components in `src/`
- IndexedDB reader state
- Service worker in `public/sw.js`

### 3. Content & Knowledge Layer
- Markdown in `content/`
- TOC in `data/toc.json`
- Sources in `data/sources.json`
- Glossary in `data/glossary.json`
- Research status in `data/research-status.json`
- Research workspace in `docs/research/`

### 4. Asset & Storage Layer
- `public/` for static reader assets
- GitHub as code/content/version source of truth
- Google Drive as project/recovery/document archive where applicable

## Reader content flow

`Markdown → lazy content loader → Markdown renderer → interactions → Reading Mode / Flipbook Mode`

The Reader should discover real content under `content/part-*/chapter-*/*.md` and use `data/toc.json` for ordering and visibility.

## Design principles

- mobile-first
- Reading Mode always works
- Flipbook is progressive enhancement
- reduced motion must remain usable
- offline/PWA must degrade gracefully
- science/content is separate from presentation code
- no invented farm history
- no remote dependency should be required for core reading when offline
