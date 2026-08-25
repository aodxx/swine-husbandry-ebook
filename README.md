# ตำรา นิพนธ์ฟาร์ม — ศาสตร์และวิถีการเลี้ยงสุกร

Interactive, mobile-first, research-first Thai swine husbandry e-book. Product and editorial requirements are defined in [`PRD.md`](PRD.md) and [`BLUEPRINT.md`](BLUEPRINT.md).

## Current Focus
**Reader Foundation เสร็จแล้ว** — ระบบอ่านแบบ mobile-first, สารบัญ, ค้นหา, บุ๊กมาร์ก, อ่านต่อ, การตั้งค่า, citation/glossary/image overlays, Flipbook Mode และ PWA Offline ผ่านการตรวจสอบแล้ว

งานเนื้อหาปัจจุบันอยู่ที่ **3.12 Checklist ก่อนเริ่มเลี้ยง** ในสถานะ `EDITORIAL_REVIEW` และหัวข้อถัดไปคือ **4.1 การเลือกพื้นที่** หลังผ่าน gate ของบทที่ 3

## เริ่มงานเนื้อหา
ทำงานทีละหัวข้อย่อยเท่านั้น อ่าน [`RESEARCH_GUIDE.md`](RESEARCH_GUIDE.md), [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md) และ [`SOURCE_POLICY.md`](SOURCE_POLICY.md) ก่อนเริ่ม ใช้ `data/toc.json` เป็น Master TOC และ `data/research-status.json` เป็นสถานะกลาง

## โครงสร้างสำคัญ
- `content/` — เนื้อหาที่แยกเป็นหัวข้อย่อย
- `docs/research/<topic-id>/` — Questions, Sources, Facts, Conflicts, Draft Notes และ Review
- `data/` — TOC, Source Registry, Research Status และ metadata
- `public/` — manifest, service worker และไอคอนของ PWA
- `dist/` — ผลลัพธ์ build ที่สร้างขึ้นชั่วคราว (ไม่ commit)

## ตรวจสอบก่อนส่งงาน

รัน `npm ci && npm run build && npm run qa:reader && npm run qa:performance` เพื่อทดสอบ build และ performance budget; รัน `npm run test:e2e` เพื่อทดสอบเส้นทางการใช้งานใน Chromium

ประวัติและกรณีศึกษาของนิพนธ์ฟาร์มอยู่ในสถานะ `PENDING_FARM_HISTORY` จนกว่าจะมีหลักฐานจากเจ้าของฟาร์ม
