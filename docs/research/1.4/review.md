# Review — 1.4 พฤติกรรมการกิน

วันที่ตรวจ: 2026-08-23
ผู้ตรวจ: Manus AI
สถานะ: EDITORIAL_REVIEW

## Fact Check

| กลุ่ม Claim | ผล | การตรวจ |
|---|---|---|
| Feeding behaviour มีมากกว่าปริมาณอาหารต่อวัน | PASS | SRC-024 และ SRC-025 รองรับตัวชี้วัด meal, visit, time และ rate |
| การแข่งขันมีผลต่อการเข้าถึงรางในกลุ่ม | PASS WITH CONTEXT | SRC-024 ศึกษาสุกรขุนกลุ่มใหญ่และ automatic feeder; Draft รักษาบริบท ไม่ทำเป็นกฎทั่วไป |
| Meal/visit นิยามต่างกัน | PASS | SRC-024 และ SRC-025 รองรับโดยตรง; Draft เตือนก่อนเปรียบเทียบข้อมูล |
| อายุและช่วงการผลิตสัมพันธ์กับรูปแบบการกิน | PASS WITH CONTEXT | SRC-025 รองรับ แต่ Draft ไม่ใช้ตัวเลขและระบุว่าทิศทางแปรตามบริบท |
| รส/กลิ่นมีส่วนต่อ palatability | PASS | SRC-026 รองรับในลูกสุกรอนุบาล; SRC-027 ใช้เป็นคู่มือเสริม |
| ปัจจัยอุปกรณ์ สิ่งแวดล้อม และคุณภาพอาหารมีผลร่วม | PASS | SRC-027 รองรับโดยตรงในระดับ veterinary reference |
| การกินลดลงไม่ใช่การวินิจฉัยโรค | PASS | เป็น safety interpretation ที่ไม่อ้างว่ามีสาเหตุเดียว และ Draft ส่งต่อสัตวแพทย์เมื่อมีอาการร่วม |
| Numeric claims | PASS | Draft ไม่มีค่าเป้าหมาย อัตราการใช้น้ำ หรือค่ามาตรฐานที่อยู่นอกหลักฐาน |
| Farm-history restriction | PASS | ไม่มีประวัตินิพนธ์ฟาร์มที่แต่งขึ้น |

## Citation Check

Front Matter มี Topic ID `1.4`, ชื่อ canonical ตรงกับ TOC และ `status: DRAFTED` ตรงกับ `data/research-status.json` โดย `source_ids` ทั้งสี่รายการมีอยู่ใน Global Source Registry และ Inline citations `[1]`–`[4]` มี Reference definitions ครบถ้วน

SRC-028 ไม่ถูกอ้าง เพราะเป็นงานไทยด้านวิธีให้อาหารกับคุณภาพน้ำเชื้อ ไม่ตรง Scope หลัก ส่วน SRC-029 ไม่ถูกอ้างเพราะยังตรวจ PDF และ metadata ได้ไม่ครบ ข้อความเกี่ยวกับการติดตามพฤติกรรมใช้ SRC-024 และ SRC-027 ตามหลักฐานที่เข้าถึงได้

## Editorial Self-Review

Draft มีสรุปสั้น เนื้อหาหลัก มือใหม่ควรรู้ ลงมือทำหน้าคอก ตารางตัวชี้วัด จุดที่มักเข้าใจผิด สำหรับมืออาชีพ การเชื่อมโยงไปหัวข้อถัดไป และสรุปท้ายหัวข้อ ใช้ภาษาไทยอ่านง่ายพร้อมศัพท์อังกฤษอธิบายเมื่อปรากฏครั้งแรก

ขอบเขตไม่ซ้ำกับ 1.3 ในส่วนประสาทสัมผัส และไม่ขยายไปสูตรอาหาร ความต้องการสารอาหาร โรค หรือการรักษา เนื้อหาการแข่งขันและการติดตามถูกวางในระดับพฤติกรรม ไม่อ้างเป็นคำแนะนำการจัดรางเชิงตัวเลข

## Remaining controls

แหล่ง Tier A ไทยที่เข้าถึงข้อความได้และตอบพฤติกรรมการกินโดยตรงยังไม่พบ จึงบันทึก `NOT FOUND` และใช้ Academic/International sources ที่เหมาะสมแทน หากเพิ่มคำแนะนำเรื่องอัตราการกิน น้ำ หรือการออกแบบราง ต้องเปิด Research เพิ่มตามช่วงวัยและระบบเลี้ยง

## Subtopic Quality Gate

**PASS FOR AUTONOMOUS SEQUENCING — ยังไม่ APPROVED/PUBLISHED**

หัวข้อ 1.4 ผ่าน Scope, Research Questions, Source Research, Source Evaluation, Fact Extraction, Conflict Check, Draft, Fact Check, Citation Check, Editorial Self-Review และ Repository Validation ในระดับที่อนุญาตให้เริ่มหัวข้อ 1.5 ตาม Operating Mode แต่ยังคง Owner Review และ Published Gate แยกต่างหาก
