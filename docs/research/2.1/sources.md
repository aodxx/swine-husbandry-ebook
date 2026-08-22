# Source Registry — 2.1 สุกรพันธุ์แท้และลูกผสม

วันที่ค้น: 2026-08-23
สถานะของหัวข้อบันทึกใน `data/research-status.json` เป็นแหล่งเดียว

| ID | Tier | แหล่งข้อมูล | ประเด็นที่รองรับ | ข้อจำกัด |
|---|---|---|---|---|
| SRC-079 | A academic extension | Michigan State University Extension, *Swine Breeding Systems for Alternative Pork Chains* | crossbreeding, purebred/crossbred, individual/maternal heterosis, breeding systems | ตารางตัวเลขเป็นตัวอย่างของระบบสหรัฐฯ ห้ามใช้เป็นคุณสมบัติสากลหรือ target ไทย |
| SRC-080 | B international | FAO, *Improvement of pigs in the tropics: General principles* | breed/population distinction, local adaptation, crossbreeding, selection traits, environment | เอกสารหลักการรุ่นเก่า; ใช้เป็นกรอบ ไม่ใช้ค่าเป้าหมายปัจจุบัน |
| SRC-081 | C peer-reviewed | Mulder & Bijma, *The purebred-crossbred correlation in pigs: a review* | ความสัมพันธ์ purebred/crossbred, genotype-by-genotype, genotype-by-environment และ trait measurement | เป็น abstract/metadata ที่เข้าถึงได้ จึงไม่อ้างรายละเอียดเชิงผลประมาณที่ไม่มีใน abstract |
| SRC-082 | C peer-reviewed | Iversen et al., *Effects of heterozygosity on performance of purebred and crossbred pigs* | ความไม่เหมือนกันของผล heterozygosity ระหว่าง traits และ breeds | ใช้เป็นหลักฐานว่าผลไม่ universal; ไม่ยกค่าการทดลองเป็น benchmark |
| SRC-083 | A Thai government | กรมปศุสัตว์, วารสาร/บทความการศึกษาสุกรลูกผสม | ตัวอย่างงานไทยเกี่ยวกับลูกผสมและ performance ใน environment ไทย | หน้าบางรายการเป็น abstract; ใช้เฉพาะ claim ที่หน้าเว็บรองรับโดยตรง |
| SRC-084 | A Thai academic | มหาวิทยาลัยแม่โจ้, *คู่มือการปรับปรุงพันธุ์สุกร* | หลักการผสมข้ามและการปรับปรุงพันธุ์สำหรับบริบทไทย | PDF ที่ระบบดึงเป็น encoded content; ต้องไม่อ้างเลขหน้า/ตัวเลขที่ยังตรวจข้อความต้นฉบับไม่ได้ |
| SRC-085 | C academic/contextual | Michigan State University Extension, breeding program and target market guidance | breed combination ต้องสอดคล้องกับ target market และ production system | extension source ไม่ใช่มาตรฐานพันธุ์ไทย |

## Source evaluation

แหล่งหลักสำหรับนิยามและระบบผสมข้ามคือ MSU และ FAO; งาน peer-reviewed ใช้ยืนยันว่าความสัมพันธ์ระหว่าง performance ของ purebred กับ crossbred และผลของ heterozygosity ขึ้นกับ trait, breed และ environment; แหล่งไทยใช้ยืนยันว่าการผสมข้ามและการประเมิน performance ต้องอ่านในบริบทไทย ไม่ใช้เป็นการจัดอันดับพันธุ์

## Tier A Thailand search

พบแหล่ง DLD และคู่มือ/ผลงานจากมหาวิทยาลัยไทยที่เกี่ยวข้อง แต่ไม่มีเอกสารไทยฉบับเดียวที่นิยาม breed, line, purebred, crossbred และ heterosis ครบถ้วนในภาษามาตรฐานเดียวกัน จึงบันทึกความแตกต่างของคำและไม่ประกาศคำแปลใดเป็นข้อบังคับระดับประเทศ

## Numeric claim policy

ตัวเลข heterosis, litter performance, ADG, FCR, lean percentage หรือ carcass quality จาก SRC-079 และงานวิจัยใช้ได้เฉพาะเมื่อระบุ population, line, sex, environment, feeding/management system และ study conditions ครบถ้วน หัวข้อ 2.1 จะไม่ใส่ตัวเลข benchmark
