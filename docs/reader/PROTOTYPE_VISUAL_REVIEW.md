# PROTOTYPE_VISUAL_REVIEW.md

## Purpose
ไฟล์ใน `assets/` เป็น **developer visual reference** สำหรับ GPT Work/นักพัฒนา ไม่ใช่ production final asset และไม่ใช่หลักฐานประวัติฟาร์ม

## Selected References
1. `assets/cover-concept-a.svg` — heritage / warm farm textbook direction
2. `assets/cover-concept-b.svg` — farm notebook / technical manual direction
3. `assets/mobile-reader-wireframe.svg` — Cover + TOC + Reading Mode + Reader Settings
4. `assets/book-vs-reading-mode.svg` — interaction/visual comparison ของสองโหมดอ่าน

## Recommended Usage
- ใช้ Cover A/B เพื่อเลือก visual language ไม่ copy ข้อความย่อยในภาพตรง ๆ
- Mobile Reader Wireframe คือ page hierarchy reference
- Book-vs-Reading คือ behavior/mood reference
- implementation ต้องดึงข้อความจริงจาก `content/`, `data/toc.json` และ UX spec

## Required Implementation Order
1. Design Tokens v0.1
2. App shell + routing
3. Content loader using Chapter 1–2
4. Cover + Interactive TOC
5. Reading Mode
6. Reader settings + theme/type state
7. Search + bookmark + resume
8. Book Mode + page flip progressive enhancement
9. PWA/offline
10. Device QA

## Asset Policy
- `docs/reader/assets/` = design/developer references
- approved runtime assets ภายหลังค่อย copy ไป `public/images/`
- generated pig/farm imagery ห้ามถูกตีความเป็นภาพจริงของนิพนธ์ฟาร์ม
- หากมีภาพประวัติจริงภายหลัง ต้องเก็บ provenance/context ก่อนใช้งาน
