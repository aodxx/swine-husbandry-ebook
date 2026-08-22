# READER_BLUEPRINT.md
## ตำรา นิพนธ์ฟาร์ม — ศาสตร์และวิถีการเลี้ยงสุกร

### เป้าหมาย
สร้าง e-book ภาษาไทยแบบ Mobile-first ที่ให้ความรู้สึกเป็น “ตำราประจำฟาร์ม” แต่ใช้ข้อดีของเว็บเต็มรูปแบบ โดยแยก Content Layer ออกจาก Reader/UI อย่างเด็ดขาด

### Architecture
1. **Content Layer** — Markdown/structured content, citations, glossary, calculators, checklists, metadata
2. **Reader Layer** — content renderer, typography, navigation, content blocks
3. **Experience Layer** — Reading Mode, Book Mode, search, bookmark, progress, audio, offline
4. **Storage Layer** — IndexedDB สำหรับ reader state + PWA cache

### Reading Modes
**Reading Mode**
- ค่าเริ่มต้นบนมือถือ
- vertical continuous reading
- รองรับเนื้อหายาว ตาราง ภาพ citations callouts และ checklist
- ต้องทำงานได้แม้ page-flip library ล้มเหลว

**Book Mode**
- Progressive Enhancement
- มือถือ 1 หน้า; tablet/desktop 2-page spread เมื่อพื้นที่เหมาะสม
- page shadow, paper feel, page number, chapter marker
- swipe/drag + ปุ่ม Previous/Next
- runtime pagination; ห้ามตัด Markdown เป็นหน้าถาวร
- reduced motion ต้อง fallback เป็น fade/no animation

### Main Flow
Cover → Title/Front Matter → Interactive TOC → Chapter Opening → Subtopic Reader → References/Glossary → Tools → Bookmarks/Search/Settings

### Content Block Types
Paragraph, Heading, Figure, Caption, Table, Quote, Summary Box, มือใหม่ควรรู้, ลงมือทำหน้าคอก, Warning, High-risk Notice, Checklist, Formula, Calculator Entry, Glossary Term, Citation Group, Cross-link, Emergency Card

### Navigation
- thin reader header
- bottom reader controls ที่ซ่อนเมื่ออ่าน
- Contents / Search / Bookmark / Mode / Typography / Theme / Sound
- resume last position
- Previous/Next ทุกโหมด

### Reader State (IndexedDB)
`last_read_topic`, `scroll_position/page_anchor`, `bookmarks`, `theme`, `font_size`, `line_height`, `reading_mode`, `sound_enabled`, `search_history`

### Search
สร้าง client-side search index จาก title, headings, body, tags และ glossary; ผลแสดง breadcrumb + snippet

### PWA / Offline
- installable
- cache app shell, TOC, glossary, recently-read content
- content-version based invalidation
- update ไม่ทำให้ bookmark/progress หาย

### Accessibility
font scaling, line-height, keyboard/focus, screen-reader labels, sufficient contrast, large touch targets, reduced motion; ห้ามใช้สีอย่างเดียวสื่อ warning

### Performance
- lazy-load images/heavy features
- page-flip bundle โหลดเฉพาะเมื่อเข้า Book Mode
- content/search index แบ่ง chunk ตามความเหมาะสม

### Recommended Stack
Vite + TypeScript + React, static GitHub Pages, PWA service worker, IndexedDB, client-side search, page-flip library as optional progressive enhancement

### Prototype v0.1
ใช้ Chapter 1–2 จริง ต้องผ่าน:
- Cover / TOC
- Reading Mode
- Book Mode + fallback
- Search
- Bookmark + Resume
- Light/Sepia/Dark
- Font/line-height controls
- basic offline
- image zoom

### Definition of Done — Reader Foundation
Reader โหลด content จริงได้ ≥2 chapters; mobile Reading Mode ใช้งานจริง; Book Mode fallback ได้; TOC/Search/Bookmark/Progress ทำงาน; theme/type controls ทำงาน; PWA offline basic ผ่าน; Content กับ UI แยกชัดเจน
