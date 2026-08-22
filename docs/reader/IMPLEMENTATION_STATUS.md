# Reader v0.1 — Implementation Status

Branch: `feature/reader-v0.1`

## Completed
- [x] Repository inspection / Reader foundation gap analysis
- [x] Vite + React + TypeScript application scaffold
- [x] GitHub Pages base path
- [x] Cover screen
- [x] Interactive TOC from `data/toc.json`
- [x] Reading Mode rendering real Markdown from Chapter 1–2
- [x] Previous / TOC / Next navigation
- [x] Light / Sepia / Dark themes
- [x] Font size control
- [x] Line-height control
- [x] IndexedDB reader preference storage
- [x] IndexedDB bookmark storage
- [x] Resume last topic / scroll position
- [x] Bookmark UI in Reader and TOC
- [x] Client-side Chapter 1–2 full-text search
- [x] reduced-motion baseline

## Next
- [ ] Book Mode runtime pagination
- [ ] Page-flip progressive enhancement + graceful fallback
- [ ] Citation detail UI
- [ ] Glossary interaction UI
- [ ] Image fullscreen / zoom
- [ ] PWA manifest + service worker + offline cache
- [ ] GitHub Pages deploy workflow
- [ ] Build / TypeScript / mobile QA

## Guardrails
- Reading Mode remains the primary fallback.
- Reader loads content from `content/`; no academic text is hard-coded in UI.
- Research status and source registry are not modified by Reader work.
- Niphon Farm history remains evidence-only; no fictional heritage content is added.
