# Review — 1.3 การมองเห็น การได้ยิน และการดมกลิ่น

วันที่ตรวจ: 2026-08-23
ผู้ตรวจ: Manus AI
สถานะ: EDITORIAL_REVIEW

## Fact Check

| กลุ่ม Claim | ผล | การตรวจ |
|---|---|---|
| Sensory perception เป็นพื้นฐานต่อพฤติกรรมและการปรับตัว | PASS | SRC-020 รองรับในระดับ review ข้ามชนิด และใช้เป็นกรอบ ไม่ขยายเป็น Claim สุกรทุกประเด็น |
| Dichromatic vision | PASS WITH CAUTION | SRC-018 รองรับในระดับบททบทวน; Draft ใช้ถ้อยคำ “น่าจะ” และไม่อ้างตัวเลขที่เข้าถึงไม่ได้ |
| Visual cue และ illumination มีผลต่อการตอบสนอง | PASS | SRC-021 เป็น primary study และ Draft ระบุว่าเป็นบริบทการทดลอง ไม่ตั้งเป็นมาตรฐานฟาร์ม |
| Hearing เป็นช่องทางรับข้อมูล/สื่อสาร | PASS WITH CAUTION | SRC-018 รองรับภาพรวม; SRC-022 ถูกใช้เพียงยืนยันว่ามีงานวัด auditory capacity และไม่นำตัวเลขจากส่วนที่เข้าถึงจำกัดมาใช้ |
| Olfaction พัฒนาและมีบทบาทต่อการสำรวจ/สังคม | PASS | SRC-019 เข้าถึง Abstract และเนื้อหาหลักเพียงพอสำหรับระดับ Claim ใน Draft |
| กลิ่นในโรงเรือนและช่องว่างความรู้ | PASS | SRC-019 รองรับโดยตรง; Draft ไม่สรุปว่ากลิ่นใดดี/ไม่ดีเสมอไป |
| Numeric claims | PASS | ไม่มีตัวเลข sensory threshold หรือค่าแสง/เสียง/ก๊าซใน Draft |
| Veterinary/high-risk claims | PASS | ไม่มีการวินิจฉัย การรักษา หรือการแนะนำสาร/ยา; มีคำเตือนให้ส่งต่อผู้เชี่ยวชาญ |
| Farm-history restriction | PASS | ไม่มีข้อมูลประวัตินิพนธ์ฟาร์มที่แต่งขึ้น |

## Citation Check

- Front Matter มี Topic ID `1.3` และชื่อ canonical ตรงกับ `data/toc.json`
- `source_ids` คือ `SRC-018` ถึง `SRC-022` และมีอยู่ใน Global Source Registry
- Inline citations `[1]` ถึง `[5]` มี Reference definitions ครบ
- Claim เกี่ยวกับ visual acuity ใช้ SRC-021 และไม่ใช้ตัวเลขผลการทดลอง
- Claim เกี่ยวกับ hearing ไม่เกินข้อมูลที่เข้าถึงได้ของ SRC-022
- SRC-016/017 และ SRC-023 ที่ยังไม่จำเป็นต่อ Draft ไม่ถูกอ้างเป็นหลักฐาน

## Editorial Self-Review

Draft มีสรุปสั้น เนื้อหาหลัก มือใหม่ควรรู้ ลงมือทำหน้าคอก ตารางบันทึกหน้าคอก จุดที่มักเข้าใจผิด สำหรับมืออาชีพ การเชื่อมโยงไปหัวข้อ 1.4 และสรุปท้ายหัวข้อ ใช้ศัพท์อังกฤษพร้อมคำแปลเมื่อปรากฏครั้งแรก และรักษาภาษาที่ไม่สรุปเกินหลักฐาน

ขอบเขตไม่ซ้ำกับ 1.2 ในส่วนพฤติกรรมธรรมชาติทั้งหมด ไม่ลงรายละเอียดการกินใน 1.4 พฤติกรรมสังคมเชิงลึกใน 1.5 หรือโรคตา/หูในหัวข้อสุขภาพ และไม่ให้ค่ามาตรฐานโรงเรือนโดยไม่มีหลักฐานเฉพาะ

## Remaining controls

1. Tier A ไทยที่เข้าถึงข้อความได้และตอบ sensory physiology ของสุกรโดยตรงยังไม่พบ จึงใช้ Academic/International sources ที่เหมาะสมและบันทึกไว้ใน sources.md
2. SRC-018 และ SRC-022 มีข้อจำกัดด้านการเข้าถึงรายละเอียด จึงไม่ใช้ข้อมูลตัวเลขหรือ threshold จากส่วนที่ไม่ได้ตรวจสอบ
3. หากภายหลังเพิ่มคำแนะนำเรื่องแสง เสียง ก๊าซ หรือสารแต่งกลิ่น ต้องเปิด Research รอบใหม่สำหรับ Claim นั้นโดยเฉพาะ

## Subtopic Quality Gate

**PASS FOR AUTONOMOUS SEQUENCING — ยังไม่ APPROVED/PUBLISHED**

หัวข้อ 1.3 ผ่าน Scope, Research Questions, Source Research, Source Evaluation, Fact Extraction, Conflict Check, Draft, Fact Check, Citation Check, Editorial Self-Review และ Repository Validation ในระดับที่อนุญาตให้เริ่มหัวข้อ 1.4 ตาม Operating Mode แต่ยังคง Owner Review และ Published Gate แยกต่างหาก
