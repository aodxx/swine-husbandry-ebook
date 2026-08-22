# EBOOK_UX_SPEC.md
## Mobile-first Interaction Specification

### UX Principle
ผู้อ่านต้องเปิดจากมือถือแล้วเริ่มอ่านได้ทันทีโดยแทบไม่ต้องเรียนรู้ UI; ประสบการณ์ต้องรู้สึกเป็น “หนังสือ” มากกว่า dashboard

### Entry Flow
- first visit: Cover → เปิดตำรา → TOC/first reading page
- return visit: Resume Card → อ่านต่อ
- ไม่บังคับ login สำหรับ reader state พื้นฐาน

### Cover
ชื่อหลัก: **ตำรา นิพนธ์ฟาร์ม**
รอง: **ศาสตร์และวิถีการเลี้ยงสุกร**
Tagline: **จากภูมิปัญญาหน้าคอก สู่การจัดการฟาร์มสมัยใหม่**
Primary CTA: เปิดตำรา
Secondary CTA: สารบัญ / อ่านต่อ (เมื่อมี progress)

### Interactive TOC
Part → Chapter → Subtopic; chapter พับ/ขยาย; แสดง progress แบบสุภาพ; ห้ามแสดง internal status เช่น EDITORIAL_REVIEW แก่ผู้อ่าน

### Reader Header / Controls
Header: Back, short chapter title, Bookmark, Reader menu
Bottom controls: Previous, Contents, Next
More: Book/Reading Mode, Typography, Theme, Sound
controls ต้องไม่ทับเนื้อหาและรองรับ mobile safe area

### Reading Mode
- default on mobile
- vertical scroll
- remember scroll/anchor per topic
- heading anchors
- progress ต้องไม่ถือว่า “อ่านจบ” เพียงเพราะเปิดหัวข้อ

### Book Mode
- runtime page layout
- swipe/drag + tap/button alternative
- large table/figure สามารถเปิด fullscreen/overlay
- page number เป็น display reference; bookmark ต้องผูก topic/anchor ไม่ใช่เลขหน้าที่เปลี่ยนตาม font/viewport

### Page Flip
- motion สั้น ไม่ช้า
- reduced-motion → fade/no animation
- library error → simple page navigation automatically

### Sound
page-flip sound สั้นและเบา; default OFF; จำค่าผู้ใช้; autoplay เฉพาะหลัง user interaction

### Typography
font size 3–5 levels; line height compact/normal/relaxed; body width responsive; Thai font readable; changing typography must not break bookmarks

### Theme
Light = warm paper; Sepia = long-reading comfort; Dark = warm charcoal, not pure black. Theme ต้องครอบคลุม table/callout/citation ด้วย

### Bookmark / Resume
bookmark ระดับ subtopic หรือ stable anchor; ถ้า content version เปลี่ยนและ anchor หาย ให้ fallback ที่ topic พร้อมแจ้งแบบไม่รบกวน

### Search
single search entry; result groups: title/content/glossary; breadcrumb + snippet; Thai + English keywords (เช่น FCR, ADG, heterosis)

### Glossary / Citations
แตะ glossary/citation → bottom sheet; references ท้ายหัวข้อพับได้; หลีกเลี่ยงการพาผู้อ่านออก browser โดยไม่จำเป็น

### Images / Tables
image → fullscreen + pinch zoom; caption/source/credit เมื่อมี
mobile table → horizontal scroll, sticky header/first column เมื่อเหมาะ, “ดูเต็มจอ” สำหรับตารางซับซ้อน

### Callouts
Summary / มือใหม่ควรรู้ / ลงมือทำหน้าคอก / Warning / High-risk / Note / EXAMPLE_ONLY
ใช้ label/icon/shape ร่วมกับสี

### High-risk Content
Emergency/disease/vaccine/medication content ต้องไม่สร้าง diagnosis shortcut; high-risk card ต้องชัดแต่ไม่ alarmist

### Error/Fallback
- content error → Retry + TOC
- offline uncached → แจ้งตรง ๆ + list offline content
- search error → reading still works
- page-flip error → automatic fallback

### Acceptance Criteria v0.1
mobile user เข้าเนื้อหาไม่กี่ขั้นตอน; Chapter 1–2 อ่านครบ; Book Mode fallback; Search; Bookmark/Resume persistence; font/theme/line-height stable; offline app shell/content cache basic; no internal editorial workflow exposed
