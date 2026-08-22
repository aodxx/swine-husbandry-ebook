# Review — 1.7 หมูกับอุณหภูมิ

วันที่ตรวจ: 2026-08-23
ผู้ตรวจ: Manus AI

## Fact Check

| กลุ่ม Claim | ผล | การตรวจ |
|---|---|---|
| thermoregulation ใช้ทั้งกลไกอัตโนมัติและพฤติกรรม | PASS | SRC-044 และ SRC-045 รองรับโดยตรง |
| thermal load ขึ้นกับอุณหภูมิ ความชื้น ลม พื้น แสง และน้ำ | PASS | SRC-044, SRC-047 รองรับ; Draft ไม่ใช้ตัวแปรเดียวตัดสิน |
| ความแตกต่างตามวัย/ขนาด/ระยะผลิต | PASS WITH CONTEXT | SRC-045 และ SRC-046 รองรับ; ระบุไม่ขยายผลข้ามช่วงวัย |
| สัญญาณเมื่อร้อน เช่น หอบ เปลี่ยนท่าพัก กินลด ใช้น้ำเพิ่ม | PASS WITH CONTEXT | SRC-044, SRC-046 และ SRC-047 รองรับ; Draft ระบุว่าเป็นสัญญาณเฝ้าระวังไม่ใช่วินิจฉัย |
| สัญญาณเมื่อหนาว | PASS WITH CONTEXT | SRC-045 รองรับหลักการ; Draft ไม่กำหนดค่าอุณหภูมิหรือ cutoff |
| ผลต่อการผลิต/welfare | PASS | SRC-044, SRC-045 และ SRC-046 รองรับในบริบทที่ระบุ |
| cooling methods และข้อจำกัดความชื้น | PASS WITH CONTEXT | SRC-044 และ SRC-046 รองรับ; ไม่ให้ flow rate หรือสูตรวิศวกรรมทั่วไป |
| WOAH adaptation principle | PASS | SRC-047 ระบุให้ปรับตามภูมิภาค สุขภาพฝูง พันธุ์ และ climate |
| บริบทไทย | PASS WITH CONTEXT | SRC-052 เป็น abstract/metadata ของแม่สุกร; SRC-050 เป็นโคและถูกระบุว่าไม่ใช้ถ่ายโอนผล; SRC-051 ใช้เสริมเท่านั้น |
| Numeric claims | PASS | ไม่มี threshold หรือ universal target ใน Draft; ตัวเลขจาก Source ทดลองไม่ได้ถูกนำมาใช้เป็นมาตรฐาน |
| Veterinary/high-risk gate | PASS WITH GUARD | กล่าวถึงอาการเพื่อเฝ้าระวังและส่งต่อ ไม่วินิจฉัยหรือรักษา |
| Farm-history restriction | PASS | ไม่มีข้อมูลประวัตินิพนธ์ฟาร์มที่แต่งขึ้น |

## Citation Check

Front Matter มี Topic ID `1.7`, ชื่อ canonical ตรงกับ Master TOC, สถานะ `DRAFTED` ตรงกับ State Registry และ Source IDs `SRC-044` ถึง `SRC-052` มีอยู่ใน Global Registry Inline citations `[1]`–`[8]` มี Reference definitions ครบ

SRC-050 ถูกใช้เฉพาะการอธิบายว่าเป็นงานโคและห้ามถ่ายโอน threshold; SRC-051 ถูกใช้ในระดับบริบทเนื่องจากหน้าที่เข้าถึงได้มีรายละเอียดจำกัด; SRC-052 ถูกใช้ในระดับ abstract/metadata เท่านั้น

## Editorial Self-Review

Draft แยก thermal comfort, heat stress และ cold stress ออกจากกัน อธิบายกลไกการถ่ายเทความร้อน ใช้ตารางสัญญาณและแผนตรวจหน้าคอก มีคำเตือนเรื่องการวินิจฉัย มีบริบทไทย และเชื่อมไปหัวข้อโรงเรือน/การจัดการโดยไม่ใส่รายละเอียดวิศวกรรมเกิน Scope

ขอบเขตไม่ซ้ำกับ 1.6 ในการอธิบาย stress โดยเน้น thermal load และไม่ซ้ำหัวข้อโรงเรือนในค่าออกแบบ ส่วนเนื้อหาการกินใช้เฉพาะผลจากความร้อนและไม่แทนหัวข้อพฤติกรรมการกิน 1.4

## Remaining controls

ต้องคงข้อจำกัดว่าค่าความร้อนที่เหมาะสมแตกต่างตามวัย ระบบ พันธุ์ สุขภาพ และภูมิอากาศ หากเพิ่มตัวเลข อัตราการระบายอากาศ อัตราการให้น้ำ หรือคำแนะนำกรณีฉุกเฉิน ต้องทำ Source Research เพิ่มและอาจเปิด High-Risk Topic-Level Stop Gate

## Subtopic Quality Gate

**PASS FOR AUTONOMOUS SEQUENCING — ยังไม่ APPROVED/PUBLISHED**

หัวข้อ 1.7 ผ่าน Scope, Research Questions, Source Research, Source Evaluation, Fact Extraction, Conflict Check, Draft, Fact Check, Citation Check, Editorial Self-Review และ Repository Validation ในระดับที่อนุญาตให้เริ่มหัวข้อ 1.8 ตาม Operating Mode แต่ยังคง Owner Review และ Published Gate แยกต่างหาก
