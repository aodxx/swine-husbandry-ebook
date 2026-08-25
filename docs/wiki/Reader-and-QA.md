# Reader & QA

## Reader modes

### Reading Mode
โหมดอ่านแนวตั้ง เป็น core/fallback และต้องใช้งานได้เสมอ โดยเฉพาะมือถือและกรณี reduced motion

### Flipbook Mode
โหมดหนังสือแบบ progressive enhancement

ปัจจุบันรองรับ:
- 3D page turn
- front/back paper faces
- pointer/touch drag จากขอบหน้า
- page shadow / highlight
- page flip sound
- responsive single/double page behavior
- reduced-motion fallback

## Reader features

- TOC จาก content จริง
- full-text search
- bookmarks
- resume
- font-size / line-height controls
- Light / Sepia / Dark
- citation overlay
- glossary browser
- image zoom
- PWA / offline

## QA gates

การแก้ Reader ต้องผ่านอย่างน้อย:

1. Content/state validation
2. Reader smoke QA
3. TypeScript + Vite build
4. Initial bundle performance budget
5. Playwright mobile E2E

## E2E expectations

ทดสอบอย่างน้อย:
- cover → TOC → topic
- search
- bookmark persistence
- settings persistence
- Flipbook page turn
- drag gesture
- reduced motion
- citation/glossary interaction
- service worker registration
- offline reload

## Production rule

CI ผ่านไม่ได้แปลว่า GitHub Pages production ใช้งานจริงเสมอ โดยเฉพาะ PWA/cache upgrade ดังนั้น regression ที่เกิดเฉพาะ returning user ต้องถือเป็น production blocker และควรมี deployment-upgrade test แยกต่างหาก
