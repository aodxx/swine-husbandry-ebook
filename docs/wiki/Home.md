# Niphon Farm Swine E-book — Project Wiki

คู่มือกลางของโปรเจกต์ **ตำรา นิพนธ์ฟาร์ม — ศาสตร์และวิถีการเลี้ยงสุกร**

> Wiki นี้อธิบายวิธีทำงานของโปรเจกต์ ไม่ใช่ที่เก็บเนื้อหาหนังสือฉบับจริง เนื้อหาหนังสืออยู่ใน `content/` และทะเบียนข้อมูลอยู่ใน `data/`.

## เป้าหมาย

สร้างตำราการเลี้ยงสุกรภาษาไทยแบบ mobile-first ที่เชื่อมภูมิปัญญาหน้าคอกกับการจัดการฟาร์มสมัยใหม่ โดยยึดหลักฐาน ตรวจสอบย้อนกลับได้ และไม่แต่งประวัติของนิพนธ์ฟาร์ม

## ทางลัด

- [Project Workflow](./Project-Workflow.md)
- [Architecture](./Architecture.md)
- [Research & Source Policy](./Research-and-Source-Policy.md)
- [Reader & QA](./Reader-and-QA.md)
- [Recovery & Backup](./Recovery-and-Backup.md)
- [Current Status](./Current-Status.md)

## Source of truth

- เนื้อหาหนังสือ: `content/`
- สารบัญ: `data/toc.json`
- แหล่งอ้างอิงกลาง: `data/sources.json`
- สถานะวิจัย: `data/research-status.json`
- Research workspace: `docs/research/<topic>/`
- Chapter audits: `docs/audits/`
- Reader application: `src/`
- QA / validation: `scripts/`, `tests/`, `.github/workflows/`

## กฎสำคัญ

1. ทำเนื้อหาทีละหัวข้อย่อย
2. ไม่ย้ายหัวข้อถัดไปก่อนตรวจหัวข้อปัจจุบันเสร็จ
3. ตัวเลขต้องมีแหล่งอ้างอิงหรือระบุ `EXAMPLE_ONLY`
4. เรื่องยา วัคซีน โรคระบาด การุณยฆาต และ antimicrobial เป็น high-risk
5. ไม่แต่งประวัติ รูป บุคคล เหตุการณ์ หรือหลักฐานของนิพนธ์ฟาร์ม
6. หลังจบหัวข้อสำคัญต้อง commit + push เพื่อป้องกันงานสูญหายจาก environment ของ AI
