# Project Workflow

## Content production loop

ทุกหัวข้อย่อยใช้สถานะ:

`TODO → RESEARCHING → SOURCES_COLLECTED → FACTS_EXTRACTED → DRAFTED → FACT_CHECKED → EDITORIAL_REVIEW → APPROVED → PUBLISHED`

สถานะพิเศษ:

- `NEEDS_UPDATE`
- `BLOCKED`
- `HIGH_RISK_REVIEW`
- `PENDING_FARM_HISTORY`

## วิธีทำงานต่อหนึ่งหัวข้อ

1. เปิดหัวข้อจาก `data/toc.json`
2. สร้าง/อัปเดต `docs/research/<topic>/questions.md`
3. เก็บแหล่งใน `docs/research/<topic>/sources.md`
4. บันทึกข้อเท็จจริงใน `facts.md`
5. บันทึกข้อจำกัด/ข้อขัดแย้งใน `review.md` หรือ `conflicts.md`
6. เขียนเนื้อหาใน `content/.../<topic>.md`
7. ตรวจ source IDs กับ `data/sources.json`
8. รัน validation
9. commit + push checkpoint
10. จึงเริ่มหัวข้อถัดไป

## Chapter close gate

ก่อนปิดบทต้องมี:

- ทุกหัวข้อของบทผ่าน validation
- source IDs resolve ได้
- ไม่มี Critical Issue ค้าง
- chapter audit ใน `docs/audits/`
- สถานะ research/content sync กัน
- commit checkpoint หลัง audit

## งานพัฒนา Reader

Reader แยกจาก Content Production โดยชัดเจน:

- Reader ห้าม hardcode ข้อเท็จจริงทางวิชาการ
- Reader อ่านเนื้อหาจาก `content/`
- TOC / search / navigation ต้อง derive จากข้อมูลจริง
- ทุกการเปลี่ยน Reader ต้องผ่าน build + performance + E2E

## Git workflow

แนะนำ branch:

- `content/*` เนื้อหา
- `research/*` วิจัย
- `feature/*` ฟีเจอร์ Reader
- `fix/*` แก้ defect
- `test/*` QA

Commit ควรเล็กและอธิบายงานได้ชัด โดยเฉพาะงานเนื้อหาให้ยึดหนึ่งหัวข้อย่อยต่อ checkpoint เมื่อทำได้
