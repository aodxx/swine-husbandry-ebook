# Reader v0.1 Runtime QA Checklist

Production URL: https://aodxx.github.io/swine-husbandry-ebook/

## Runtime QA

- [ ] Cover renders without blank screen
- [ ] TOC opens and Chapter 1–2 topics navigate correctly
- [ ] Reading Mode renders Markdown content
- [ ] Book Mode paginates and previous/next controls work
- [ ] Search returns relevant Chapter 1–2 topics
- [ ] Bookmark persists after reload
- [ ] Resume returns to last topic/scroll position
- [ ] Light / Sepia / Dark themes persist
- [ ] Font size and line-height settings persist
- [ ] Citation interaction opens source details
- [ ] Glossary interaction opens definition details
- [ ] Image viewer opens and zoom controls work when images are present
- [ ] Reduced motion disables page-turn animation
- [ ] Web App Manifest loads
- [ ] Service Worker registers
- [ ] Previously opened Reader shell loads offline
- [ ] GitHub Pages deployment completes successfully

## Release gate

Reader v0.1 is production-QA complete only when the checks above are verified against the deployed GitHub Pages site. Build/CI success alone is not sufficient.
