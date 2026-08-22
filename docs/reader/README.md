# Reader Design Handoff — ตำรา นิพนธ์ฟาร์ม

โฟลเดอร์นี้เป็น Source of Truth สำหรับการพัฒนา e-book reader โดย GPT Work / นักพัฒนา

## ลำดับการอ่าน
1. `READER_BLUEPRINT.md` — สถาปัตยกรรมและขอบเขตระบบ
2. `EBOOK_UX_SPEC.md` — พฤติกรรม UX บนมือถือและสองโหมดอ่าน
3. `DESIGN_DIRECTION.md` — Visual identity, cover, typography, motion, sound
4. `PROTOTYPE_VISUAL_REVIEW.md` — วิธีใช้ภาพ reference

## Visual Reference ใน Repository
- `assets/cover-concept-a.svg`
- `assets/cover-concept-b.svg`
- `assets/mobile-reader-wireframe.svg`
- `assets/book-vs-reading-mode.svg`

ไฟล์ SVG ชุดนี้เป็น developer reference ที่เปิดได้โดยตรงจาก GitHub และใช้แทนภาพ concept render ในขั้นพัฒนาโครงแรก ตัวภาพ render ที่สร้างจาก AI ก่อนหน้าเป็น mood reference เท่านั้น ไม่ใช่ production asset

## กฎสำหรับการพัฒนา
- Mobile-first
- Reading Mode เป็นโหมดหลักและต้องใช้งานได้เสมอ
- Book Mode เป็น Progressive Enhancement เท่านั้น
- ห้าม hard-code เนื้อหาวิชาการใน UI
- เนื้อหาต้องโหลดจาก `content/` และ metadata ของโปรเจกต์
- ห้ามแต่งประวัตินิพนธ์ฟาร์มเพื่อเติม UI; ใช้ placeholder จนมีหลักฐานจริง
- ห้ามคัดลอกข้อความย่อยจากภาพ AI; implementation ต้องใช้ข้อความจริงจาก content/UX spec
- ต้องรองรับ reduced motion, offline/PWA, bookmark, resume, search, typography controls, light/sepia/dark

## Prototype v0.1 Target
ใช้ Chapter 1–2 เป็นเนื้อหาจริงสำหรับทดสอบ Cover → TOC → Reading Mode → Book Mode → Reader Settings
