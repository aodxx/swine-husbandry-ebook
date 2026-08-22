# Reader Design Handoff — ตำรา นิพนธ์ฟาร์ม

โฟลเดอร์นี้เป็น Source of Truth สำหรับการพัฒนา e-book reader โดย GPT Work / นักพัฒนา

## ลำดับการอ่าน
1. `READER_BLUEPRINT.md` — สถาปัตยกรรมและขอบเขตระบบ
2. `EBOOK_UX_SPEC.md` — พฤติกรรม UX บนมือถือและสองโหมดอ่าน
3. `DESIGN_DIRECTION.md` — Visual identity, cover, typography, motion, sound
4. `PROTOTYPE_VISUAL_REVIEW.md` — ภาพ reference ที่อนุมัติให้ใช้เป็นแนวทาง

## ภาพ Reference หลัก
- `assets/cover-concept-a.png`
- `assets/cover-concept-b.png`
- `assets/mobile-reader-wireframe.png`
- `assets/book-vs-reading-mode.png`

## กฎสำหรับการพัฒนา
- Mobile-first
- Reading Mode เป็นโหมดหลักและต้องใช้งานได้เสมอ
- Book Mode เป็น Progressive Enhancement เท่านั้น
- ห้าม hard-code เนื้อหาวิชาการใน UI
- เนื้อหาต้องโหลดจาก `content/` และ metadata ของโปรเจกต์
- ห้ามแต่งประวัตินิพนธ์ฟาร์มเพื่อเติม UI; ใช้ placeholder จนมีหลักฐานจริง
- ภาพ reference เป็นแนวคิด ไม่ใช่ asset production final; ตัวอักษร/ข้อความในภาพ AI อาจผิด ต้องใช้ข้อความจริงจากระบบตอน implement
- ต้องรองรับ reduced motion, offline/PWA, bookmark, resume, search, typography controls, light/sepia/dark

## Prototype v0.1 Target
ใช้ Chapter 1–2 เป็นเนื้อหาจริงสำหรับทดสอบ Cover → TOC → Reading Mode → Book Mode → Reader Settings
