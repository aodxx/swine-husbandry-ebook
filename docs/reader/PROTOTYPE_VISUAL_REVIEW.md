# PROTOTYPE_VISUAL_REVIEW.md

## Purpose
ภาพใน `assets/` เป็น **design reference** สำหรับ GPT Work/นักพัฒนา ไม่ใช่ production final asset และไม่ใช่หลักฐานประวัติฟาร์ม

## Selected References
1. `assets/cover-concept-a.png` — heritage / warm farm textbook direction
2. `assets/cover-concept-b.png` — farm notebook / technical manual direction
3. `assets/mobile-reader-wireframe.png` — Cover + TOC + Reading Mode + Reader Settings
4. `assets/book-vs-reading-mode.png` — interaction/visual comparison of the two reader modes

## Recommended Usage
- ใช้ Cover A/B เพื่อเลือก visual language ไม่ copy ข้อความย่อยในภาพตรง ๆ
- Mobile Reader Wireframe คือ page hierarchy reference
- Book-vs-Reading image คือ behavior/mood reference
- ข้อความภาษาไทยในภาพ AI อาจคลาดเคลื่อน: **implementation ต้องดึงข้อความจริงจาก content/UX spec เท่านั้น**

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
- Source/generated design assets may live in `docs/reader/assets/`
- Runtime approved assets later move/copy to `public/images/`
- Never treat generated pig/farm imagery as real Niphon Farm history
