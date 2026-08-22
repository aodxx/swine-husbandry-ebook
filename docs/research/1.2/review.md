# Review — 1.2 ธรรมชาติและพฤติกรรมของหมู

วันที่ตรวจ: 2026-08-23
ผู้ตรวจ: Manus AI
สถานะ: EDITORIAL_REVIEW

## Fact Check

| กลุ่ม Claim | ผล | การตรวจ |
|---|---|---|
| พฤติกรรม rooting, exploring, foraging, play | PASS | SRC-012, SRC-013 และ SRC-014 รองรับโดยตรงในระดับ review/คู่มือสรุป |
| ความสัมพันธ์ของ rooting กับ foraging และ nest-building | PASS | ใช้ SRC-014 และไม่ขยายไปสู่ตัวเลขหรือคำแนะนำเฉพาะระบบ |
| ความแตกต่างกลางแจ้ง/โรงเรือน | PASS WITH CONTEXT | ระบุชัดว่าเป็นผลจากงานทดลอง SRC-015 ไม่ใช้เป็นมาตรฐานทุกฟาร์ม |
| Social behaviour และ communication | PASS WITH CAUTION | ใช้ SRC-013 เป็น secondary source และไม่ใส่ตัวเลข/การจัดกลุ่มเฉพาะระบบ |
| Mixing และ aggression | PASS WITH CAUTION | ใช้ภาษาว่า “อาจ/สัมพันธ์” และไม่เปลี่ยนเป็น diagnosis หรือ prescription |
| Environmental enrichment | PASS WITH CONTROL | ระบุว่าผลขึ้นกับวัสดุ ความแปลกใหม่ ระยะเวลา และการเข้าถึง ตาม SRC-012/014 |
| Numeric claims | PASS | ไม่มีตัวเลขเชิงปฏิบัติใน Draft; รายงานผล SRC-015 เป็นทิศทางของงานทดลองเท่านั้น |
| Veterinary/high-risk claims | PASS | ไม่มีการวินิจฉัย การรักษา ยา หรือวัคซีน; ระบุให้ส่งต่อผู้เชี่ยวชาญเมื่อพบความผิดปกติ |
| Farm-history restriction | PASS | ไม่มีข้อมูลเฉพาะนิพนธ์ฟาร์ม ไม่มีชื่อ ปี เหตุการณ์ คำพูด หรือ Case Study |

## Citation Check

ผ่านการตรวจเนื้อหาและ schema:

- Front Matter มี `id`, `part`, `chapter`, `title`, `status`, `content_version`, `last_reviewed`, `reviewed_by`, `risk_level`, `farm_context`, `source_ids` และ `tags`
- Inline citations `[1]` ถึง `[4]` มี Reference definitions ครบ
- Source IDs `SRC-012` ถึง `SRC-015` มีอยู่ใน Global Source Registry
- Claim สำคัญทุกกลุ่มมี Citation อยู่ในย่อหน้าที่เกี่ยวข้อง
- ไม่ใช้ SRC-016 หรือ SRC-017 ที่ยัง `NOT VERIFIED` เป็นหลักฐาน

## Editorial Self-Review

Draft มีสรุปสั้น เนื้อหาหลัก มือใหม่ควรรู้ ลงมือทำหน้าคอก สำหรับมืออาชีพ จุดที่มักเข้าใจผิด การเชื่อมโยงไป 1.3 และสรุปท้ายหัวข้อ ภาษาไทยใช้คำอธิบายศัพท์อังกฤษเมื่อปรากฏครั้งแรก

เนื้อหาควบคุมขอบเขตไม่ให้ซ้ำกับ 1.3 เรื่องประสาทสัมผัส 1.4 เรื่องพฤติกรรมการกิน 1.5 เรื่องพฤติกรรมสังคมเชิงลึก และ 1.6–1.7 เรื่องความเครียด/อุณหภูมิ ไม่กล่าวว่าระบบกลางแจ้งเป็นคำตอบเดียว และไม่เปลี่ยนการสังเกตพฤติกรรมเป็นการวินิจฉัย

## Remaining controls

1. แหล่ง Tier A ไทยที่ตอบ ethology สุกรโดยตรงยังไม่พบจากการค้นรอบนี้ จึงใช้แหล่ง Academic/International ที่เหมาะสมและบันทึกข้อจำกัดไว้
2. SRC-013 เป็น secondary veterinary summary หากภายหลังจะเพิ่มตัวเลขหรือคำแนะนำเชิงระบบ ต้องหา primary source เฉพาะประเด็นก่อน
3. ก่อนเปลี่ยนเป็น `EDITORIAL_REVIEW` ใน State ต้องรัน repository validators และตรวจว่า Front Matter sync กับ registry

## Subtopic Quality Gate

**PASS FOR AUTONOMOUS SEQUENCING — ยังไม่ APPROVED/PUBLISHED**

หัวข้อ 1.2 ผ่านการตรวจด้าน Research Questions, Sources, Facts, Conflicts, Draft, Fact Check, Citation และ Editorial Self-Review ในระดับที่อนุญาตให้เริ่มหัวข้อ 1.3 ได้ตาม Operating Mode แต่ยังไม่ใช่ Owner Review และยังไม่อนุญาตให้ Mark เป็น `APPROVED` หรือ `PUBLISHED` โดยอัตโนมัติ
