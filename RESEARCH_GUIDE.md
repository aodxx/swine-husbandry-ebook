# Research Guide — ตำรา นิพนธ์ฟาร์ม

## หลักการ
ทำงานครั้งละหนึ่งหัวข้อย่อยเท่านั้น โดยเริ่มจากสถานะ `TODO` และเดินตามลำดับ `RESEARCHING → SOURCES_COLLECTED → FACTS_EXTRACTED → DRAFTED → FACT_CHECKED → EDITORIAL_REVIEW → APPROVED → PUBLISHED`

## Work Loop
อ่านสถานะและ Scope ก่อนเสมอ กำหนด Research Questions เฉพาะหัวข้อ ค้นและประเมินแหล่งข้อมูล บันทึก Source metadata ดึง Fact แยก Interpretation และ Practical Implication ตรวจ Numeric Claims บันทึก Conflict ร่างเนื้อหา ตรวจ Fact/Citation/ภาษาไทย และส่ง Review ก่อนเปลี่ยนสถานะ

## Source Preference
ให้ความสำคัญกับแหล่งราชการไทย โดยเฉพาะกรมปศุสัตว์ รองลงมาคือ WOAH, FAO, WHO, Codex และงานวิชาการ peer-reviewed/มหาวิทยาลัย แหล่งอุตสาหกรรมใช้เสริมเท่านั้น บล็อก โพสต์โซเชียล SEO content และเนื้อหา AI ที่ไม่มี Source ห้ามใช้เป็นแหล่งหลัก

## Numeric Claims
ตัวเลขทุกตัวที่มีผลต่อการปฏิบัติ เช่น อายุ น้ำหนัก อุณหภูมิ อาหาร น้ำ ความหนาแน่น ระยะเวลา อัตราตาย เป้าหมายการผลิต ขนาดคอก และ Withdrawal Period ต้องมี Source หรือระบุ `EXAMPLE_ONLY` หากเป็นตัวอย่างสาธิตสูตร

## Conflicts
เมื่อ Source ขัดกัน ให้ตรวจชนิด/ช่วงวัย/น้ำหนัก/พันธุ์/ระบบ/ภูมิอากาศ/ประเทศ/ปี และคุณภาพแหล่งข้อมูลก่อนสรุป หากยังไม่ชัดเจนให้ใช้ Range หรืออธิบายเงื่อนไข พร้อมบันทึกใน `conflicts.md`

## High-risk
หัวข้อโรค วัคซีน ยา การรักษา โรคระบาด Antimicrobial และ Euthanasia ต้องระบุ `risk_level: high` และผ่าน Authoritative Source Check กับ High-Risk Review เพิ่มเติม ห้ามวินิจฉัยหรือสั่งยาแทนสัตวแพทย์

## Farm Heritage
ห้ามแต่งประวัตินิพนธ์ฟาร์ม บุคคล ปี เหตุการณ์ คำพูด หรือ Case Study ต้องใช้หลักฐานจากเจ้าของฟาร์มและคงสถานะ `PENDING_FARM_HISTORY` เมื่อข้อมูลยังไม่พร้อม
