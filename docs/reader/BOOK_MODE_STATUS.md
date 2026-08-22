# Book Mode v0.1 — Implementation Status

Branch: `feature/book-mode-v0.1`

## Implemented
- [x] Runtime pagination from rendered Markdown HTML
- [x] Pagination recalculates on viewport, font-size and line-height changes
- [x] One-page mobile layout
- [x] Two-page spread on wide screens
- [x] Previous / Next page controls
- [x] Swipe gesture navigation
- [x] Page number / page range indicator
- [x] Previous/Next topic transition at topic boundaries
- [x] Book/Reading Mode selector stored in existing ReaderPrefs
- [x] Paper shadow / restrained page-turn motion
- [x] `prefers-reduced-motion` fallback
- [x] Reading Mode remains independent fallback

## Architecture
Book Mode uses CSS multi-column flow and runtime DOM measurement. Markdown is not permanently split into page files, and bookmarks remain topic-based rather than page-number-based.

## Deliberately deferred
- Page flip sound
- External page-flip library
- Persisting exact Book Mode page across typography/viewport changes
- Citation / glossary overlays
- Fullscreen image zoom
- PWA/offline enhancements

## Validation required before merge
- GitHub Actions Reader build
- Existing ebook content/state validation
- PR mergeability check
