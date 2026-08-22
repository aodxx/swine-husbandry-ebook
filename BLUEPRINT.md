# BLUEPRINT.md
# ตำรา นิพนธ์ฟาร์ม — ศาสตร์และวิถีการเลี้ยงสุกร

> เอกสาร Blueprint สำหรับการออกแบบ พัฒนา และผลิตเนื้อหา E-Book เชิงวิชาการเฉพาะด้านสุกร  
> Mobile-first • Research-first • Offline-capable • Farm Heritage

**Project:** Swine Husbandry E-Book  
**Repository:** `https://github.com/aodxx/swine-husbandry-ebook`  
**Primary Content Asset Storage:** Google Drive — `swinehusbandry ebook`  
**Primary Deployment:** GitHub Pages  
**Product Form:** Interactive E-Book / PWA  
**Language:** Thai  
**Blueprint Version:** 1.0  
**Date:** 2026-08-22

---

# 1. Purpose of This Blueprint

เอกสารนี้อธิบาย “ระบบทั้งหมด” ของโปรเจกต์ในระดับที่นักพัฒนา นักเขียน นักวิจัย หรือ AI Agent สามารถเปิดอ่านแล้วเริ่มงานต่อได้โดยไม่ต้องตีความโครงสร้างใหม่

Blueprint นี้ตอบคำถามหลัก 7 เรื่อง:

1. ระบบ E-Book ประกอบด้วยอะไรบ้าง
2. เนื้อหาถูกเก็บและโหลดอย่างไร
3. AI ต้อง Research และเขียนอย่างไร
4. แหล่งอ้างอิงถูกจัดเก็บอย่างไร
5. ผู้ใช้บนมือถืออ่านหนังสืออย่างไร
6. Offline/PWA ทำงานอย่างไร
7. นักพัฒนาจะเพิ่มบท ฟีเจอร์ หรือเครื่องมือใหม่โดยไม่ทำลายระบบเดิมอย่างไร

---

# 2. Core Architectural Principle

โปรเจกต์ต้องแยกออกเป็น 4 ชั้นชัดเจน:

```text
┌──────────────────────────────────────────────┐
│  EXPERIENCE LAYER                           │
│  Book Mode / Reading Mode / Search / Audio  │
├──────────────────────────────────────────────┤
│  APPLICATION LAYER                          │
│  Reader State / Bookmark / Calculators      │
├──────────────────────────────────────────────┤
│  CONTENT & KNOWLEDGE LAYER                  │
│  Chapters / Sources / Glossary / Metadata   │
├──────────────────────────────────────────────┤
│  ASSET & STORAGE LAYER                      │
│  GitHub / Google Drive / Offline Cache      │
└──────────────────────────────────────────────┘
```

หลักสำคัญ:

> UI ห้ามผูกติดกับเนื้อหาโดยตรง  
> เนื้อหาห้ามฝังใน component  
> Source ห้ามฝังเป็นข้อความกระจัดกระจาย  
> Research status ต้องตรวจสอบได้  
> Book Mode ต้องไม่เป็น dependency ที่ทำให้ Reading Mode ใช้งานไม่ได้

---

# 3. System Overview

## 3.1 Public Reader

ส่วนที่ผู้ใช้เห็น:

- ปกหนังสือ
- สารบัญ
- Book Mode
- Reading Mode
- Search
- Bookmark
- Last Read
- Glossary
- References
- Calculators
- Checklist
- Settings
- Offline Status

## 3.2 Editorial System

ส่วนที่ใช้ผลิตเนื้อหา:

- Markdown content files
- Source records
- Research status
- Review status
- Editorial metadata
- Citation mapping
- Image metadata
- Version history

## 3.3 Heritage System

เก็บเอกลักษณ์นิพนธ์ฟาร์ม:

- ประวัติ
- ภาพเก่า
- เอกสาร
- Timeline
- Case Study
- Oral History
- บันทึกจากหน้าคอก

## 3.4 PWA Layer

- Manifest
- Service Worker
- Offline cache
- App shell cache
- Content cache
- Asset cache
- Version/update strategy

---

# 4. Recommended Technology Stack

## Frontend

แนะนำให้ใช้:

- `Vite`
- `TypeScript`
- `React` หรือ Vanilla TypeScript หากต้องการโครงสร้างเบา
- CSS Modules / Tailwind CSS / plain CSS variables
- Markdown content parser
- Static build

### Recommended Direction

สำหรับโปรเจกต์นี้ แนะนำ:

```text
Vite + TypeScript + React
```

เหตุผล:

- Component แยกชัด
- รองรับ Page Flip library ง่าย
- จัด state ของ Reader ได้ดี
- Search/Bookmark/Calculator ขยายง่าย
- Build เป็น Static Site สำหรับ GitHub Pages ได้
- นักพัฒนาคนอื่นเข้าใจโครงสร้างได้ง่าย

---

# 5. Deployment Architecture

```text
Developer / AI Agent
        │
        ▼
GitHub Repository
        │
        ├── Code
        ├── Markdown Content
        ├── Metadata
        └── Source Registry
        │
        ▼
GitHub Actions
        │
        ├── Lint
        ├── Validate content
        ├── Validate citations
        ├── Build
        └── Test
        │
        ▼
GitHub Pages
        │
        ▼
Mobile Browser / PWA
```

Google Drive ไม่ใช่ runtime dependency ของเว็บไซต์

Drive ใช้สำหรับ:

- Original photos
- Historical documents
- Research PDFs
- Draft material
- Audio master
- Archived assets

ไฟล์ที่ Publish จริงต้องถูกนำเข้าสู่ GitHub/Public build ในรูปแบบที่ผ่านการตรวจและ optimize แล้ว

---

# 6. Repository Structure

```text
swine-husbandry-ebook/
│
├── README.md
├── PRD.md
├── BLUEPRINT.md
├── RESEARCH_GUIDE.md
├── CONTENT_GUIDE.md
├── SOURCE_POLICY.md
├── CONTRIBUTING.md
├── PROGRESS.md
├── CHANGELOG.md
│
├── package.json
├── tsconfig.json
├── vite.config.ts
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.ts
│   │   └── providers/
│   │
│   ├── components/
│   │   ├── book/
│   │   ├── reader/
│   │   ├── navigation/
│   │   ├── citations/
│   │   ├── glossary/
│   │   ├── calculators/
│   │   ├── checklist/
│   │   └── common/
│   │
│   ├── features/
│   │   ├── bookmarks/
│   │   ├── search/
│   │   ├── reading-progress/
│   │   ├── settings/
│   │   ├── offline/
│   │   └── audio/
│   │
│   ├── lib/
│   │   ├── content-loader/
│   │   ├── citation-engine/
│   │   ├── search-index/
│   │   ├── storage/
│   │   └── validation/
│   │
│   ├── styles/
│   └── types/
│
├── content/
│   ├── front-matter/
│   ├── part-01/
│   ├── part-02/
│   ├── part-03/
│   ├── part-04/
│   ├── part-05/
│   ├── part-06/
│   ├── part-07/
│   ├── part-08/
│   ├── part-09/
│   ├── part-10/
│   └── appendices/
│
├── data/
│   ├── toc.json
│   ├── sources.json
│   ├── glossary.json
│   ├── research-status.json
│   ├── calculators.json
│   ├── checklists.json
│   └── heritage.json
│
├── public/
│   ├── images/
│   ├── audio/
│   ├── icons/
│   └── manifest/
│
├── scripts/
│   ├── validate-content.ts
│   ├── validate-sources.ts
│   ├── build-search-index.ts
│   ├── build-toc.ts
│   └── generate-content-map.ts
│
├── tests/
│   ├── unit/
│   ├── content/
│   └── e2e/
│
└── .github/
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

---

# 7. Content Architecture

## 7.1 Atomic Content Unit

หน่วยเนื้อหาที่เล็กที่สุดคือ **หัวข้อย่อย**

ตัวอย่าง:

```text
1.1 หมูคือสัตว์แบบไหน
```

ไฟล์:

```text
content/part-01/chapter-01/1.1.md
```

ห้ามสร้างไฟล์:

```text
chapter-01-full.md
```

เพื่อให้ AI หรือผู้เขียนทำงานแยกหัวข้อได้ชัดเจน

---

# 8. Markdown Content Schema

ตัวอย่าง `1.1.md`

```markdown
---
id: "1.1"
part: 1
chapter: 1
title: "หมูคือสัตว์แบบไหน"
status: "APPROVED"
content_version: "1.0"
last_reviewed: "2026-08-22"
risk_level: "normal"
farm_context: false
source_ids:
  - DLD-001
  - WOAH-004
tags:
  - biology
  - pig
  - fundamentals
---

# หมูคือสัตว์แบบไหน

## สรุปสั้น

...

## เนื้อหาหลัก

...

## มือใหม่ควรรู้

...

## ลงมือทำหน้าคอก

...

## จุดที่มักเข้าใจผิด

...

## สรุปท้ายหัวข้อ

...

## แหล่งอ้างอิง

[1] ...
```

---

# 9. Content Status Model

ทุกหัวข้อผ่าน State Machine:

```text
TODO
  ↓
RESEARCHING
  ↓
SOURCES_COLLECTED
  ↓
FACTS_EXTRACTED
  ↓
DRAFTED
  ↓
FACT_CHECKED
  ↓
EDITORIAL_REVIEW
  ↓
APPROVED
  ↓
PUBLISHED
```

สถานะเสริม:

```text
NEEDS_UPDATE
BLOCKED
HIGH_RISK_REVIEW
PENDING_FARM_HISTORY
```

---

# 10. Research Pipeline

นี่คือหัวใจของโปรเจกต์

## Rule

> Research หนึ่งครั้ง = หนึ่งหัวข้อย่อย

ตัวอย่าง:

```text
1.1
Research
↓
Sources
↓
Fact Extraction
↓
Draft
↓
Fact Check
↓
Approve

จากนั้นจึงไป 1.2
```

ห้าม:

```text
Research Chapter 1 ทั้งหมดในครั้งเดียว
```

---

# 11. AI Research Contract

AI ทุกตัวที่ทำงานกับ Content ต้องปฏิบัติตาม Contract นี้:

1. รับ `subtopic_id`
2. อ่าน Scope
3. ห้ามค้นหัวข้อถัดไป
4. ค้นแหล่งข้อมูล
5. ประเมิน Source Tier
6. บันทึก Source
7. ดึง Fact
8. ตรวจ Numeric Claim
9. เปรียบเทียบข้อมูล
10. ร่าง
11. Fact Check
12. Citation Check
13. ส่งให้ Review
14. ห้าม Mark Approved เองหากยังมีข้อสงสัย

---

# 12. Research Workspace Per Topic

แนะนำให้แต่ละหัวข้อมี Research folder:

```text
docs/research/1.1/
├── questions.md
├── sources.md
├── facts.md
├── conflicts.md
├── draft-notes.md
└── review.md
```

เมื่อหัวข้อ Publish แล้ว Research folder ยังเก็บไว้สำหรับ Audit

---

# 13. Source Registry Architecture

ไฟล์หลัก:

```text
data/sources.json
```

ตัวอย่าง:

```json
{
  "id": "WOAH-PIG-WELFARE-001",
  "title": "Animal welfare and pig production systems",
  "organization": "WOAH",
  "url": "...",
  "publication_date": "2024",
  "accessed_date": "2026-08-22",
  "tier": "B",
  "language": "en",
  "topics": ["1.2", "5.8", "19.1", "23.1"],
  "notes": ""
}
```

Source เดียวใช้ได้หลายหัวข้อ แต่ทุกหัวข้อยังต้อง Research ใหม่เพื่อดูว่า Source นั้นตอบคำถามของหัวข้อนั้นจริงหรือไม่

---

# 14. Source Hierarchy

```text
Tier A
Thailand Primary Sources
↓
Tier B
WOAH / FAO / WHO / Codex
↓
Tier C
Peer-reviewed / Universities / Textbooks
↓
Tier D
Industry Technical Documents
```

Social media หรือ content เว็บทั่วไปไม่ใช้เป็น Source หลัก

---

# 15. Numeric Claim Architecture

Numeric Claim ต้องมี metadata เชื่อม Source

ตัวอย่าง:

```json
{
  "claim_id": "NC-8.6-001",
  "topic": "8.6",
  "claim": "ข้อความตัวเลขที่ใช้จริง",
  "source_id": "SOURCE-123",
  "context": "grower pig",
  "reviewed": true
}
```

ตัวเลขที่เป็น “ตัวอย่างคำนวณ” ต้องมี label:

```text
EXAMPLE_ONLY
```

เพื่อไม่ให้ผู้อ่านเข้าใจว่าเป็นมาตรฐานใช้ได้กับทุกฟาร์ม

---

# 16. Citation Engine

ระบบ Citation ทำงานดังนี้:

```text
Markdown
   │
   ├── source_ids
   ▼
Citation Parser
   │
   ▼
Source Registry
   │
   ▼
Rendered Citation
```

บนหน้าอ่าน:

```text
สุกรต้องมีน้ำสะอาดเพียงพอ [1]
```

กด `[1]`:

```text
WOAH
Animal welfare and pig production systems
Accessed: ...
```

---

# 17. TOC Architecture

`data/toc.json`

ตัวอย่าง:

```json
{
  "part": 1,
  "title": "รู้จักหมูก่อนเลี้ยงหมู",
  "chapters": [
    {
      "chapter": 1,
      "title": "ศาสตร์แห่งการเลี้ยงสุกร",
      "topics": [
        {
          "id": "1.1",
          "title": "หมูคือสัตว์แบบไหน",
          "path": "/book/1/1"
        }
      ]
    }
  ]
}
```

TOC ไม่ควร hardcode ใน UI

---

# 18. Reader Modes

## Book Mode

เหมาะสำหรับ:

- เปิดปก
- บรรยากาศเหมือนหนังสือ
- หน้าคั่นภาค
- คำนำ
- อ่านแบบผ่อนคลาย

Features:

- swipe
- page flip
- page shadow
- page sound
- next/previous
- current page

## Reading Mode

เหมาะสำหรับ:

- เนื้อหายาว
- ตาราง
- Research-heavy content
- อ่านหน้าคอก
- Search result

Features:

- vertical scroll
- sticky section
- font control
- large touch targets
- deep-link anchors

**Reading Mode ต้องเป็นโหมดหลักด้าน usability**

Book Mode เป็น experience enhancement

---

# 19. Reader State

เก็บ Local:

```text
lastRead
bookmarks
readerMode
fontSize
lineHeight
theme
soundEnabled
reducedMotion
downloadedSections
```

ใช้:

```text
IndexedDB
```

ส่วนค่าขนาดเล็กใช้ LocalStorage ได้

---

# 20. Search Architecture

Build-time search:

```text
Markdown
↓
Text Extractor
↓
Tokenizer
↓
Search Index
↓
Static JSON Index
```

ค้นได้จาก:

- title
- body
- tags
- glossary
- disease
- English name
- Thai synonyms

Search UI แสดง:

- ชื่อหัวข้อ
- บท
- snippet
- highlighted keyword

---

# 21. Glossary Architecture

`data/glossary.json`

ตัวอย่าง:

```json
{
  "term": "FCR",
  "thai": "อัตราแลกเนื้อ",
  "definition": "...",
  "related_topics": ["9.3", "17.9", "25.9"]
}
```

ศัพท์ในเนื้อหาสามารถกดเปิด Bottom Sheet ได้

---

# 22. Calculator Architecture

Calculator ทุกตัวต้องเป็น module แยก:

```text
src/components/calculators/
├── FcrCalculator.tsx
├── AdgCalculator.tsx
├── CostGainCalculator.tsx
├── BreakEvenCalculator.tsx
└── FarrowingDateCalculator.tsx
```

Definition เก็บ:

```text
data/calculators.json
```

ทุก Calculator มี:

- formula
- fields
- unit
- validation
- explanation
- example
- disclaimer

---

# 23. Checklist Architecture

`data/checklists.json`

เก็บ checklist template

สถานะของผู้ใช้เก็บ Local

ตัวอย่าง:

```json
{
  "id": "BIOSECURITY-DAILY",
  "title": "ตรวจ Biosecurity ประจำวัน",
  "items": [
    "จุดล้างรองเท้าพร้อมใช้งาน",
    "ทางเข้าฟาร์มควบคุมได้"
  ]
}
```

---

# 24. Heritage Architecture

ไฟล์:

```text
data/heritage.json
```

สถานะเริ่มต้น:

```json
{
  "history_status": "PENDING_FARM_HISTORY",
  "timeline": [],
  "people": [],
  "stories": [],
  "archive_assets": []
}
```

AI ห้ามเติมข้อมูลนี้เอง

---

# 25. Heritage Content Flow

```text
Original photo / document / oral story
        │
        ▼
Google Drive Archive
        │
        ▼
Metadata Review
        │
        ▼
Historical Note
        │
        ▼
Owner Verification
        │
        ▼
Approved Heritage Content
        │
        ▼
GitHub Content
```

---

# 26. Google Drive Architecture

```text
swinehusbandry ebook/
│
├── 01_Niphon_Farm_History/
│   ├── Photos/
│   ├── Documents/
│   ├── Oral_History/
│   └── Timeline/
│
├── 02_Research_Sources/
│   ├── DLD/
│   ├── WOAH/
│   ├── FAO/
│   ├── Academic/
│   └── Other/
│
├── 03_Original_Photos/
├── 04_Illustrations/
├── 05_Audio/
├── 06_Drafts/
├── 07_Approved_Content/
└── 99_Archive/
```

---

# 27. Image Pipeline

```text
Original
↓
Review
↓
Crop / Clean
↓
Resize
↓
WebP / AVIF
↓
Thumbnail
↓
Metadata
↓
Publish
```

ทุกภาพมี:

```text
id
filename
caption
alt
credit
source
copyright
date
related_topics
```

---

# 28. Audio Architecture

เสียง v1:

```text
page-flip-01.mp3
page-open.mp3
```

ระบบต้อง:

- โหลดเมื่อจำเป็น
- ไม่ autoplay โดยฝืน browser
- mute ได้
- จำ setting
- รองรับ reduced motion/sound preference

---

# 29. PWA Architecture

```text
Browser
  │
  ▼
Service Worker
  │
  ├── App Shell Cache
  ├── Content Cache
  ├── Image Cache
  └── Audio Cache
```

Caching Strategy:

### App shell
Cache First

### Content
Stale While Revalidate

### Images
Cache First + Expiration

### Fresh metadata
Network First

---

# 30. Offline Reading Model

ผู้ใช้สามารถ:

- เปิด app แบบ Offline
- อ่านหน้าที่ cache แล้ว
- เปิด Bookmark
- เปิดสารบัญ
- ใช้ Calculator
- ใช้ Checklist
- เปลี่ยน setting

Search offline ทำได้ถ้า Search Index ถูก cache

---

# 31. Update Strategy

เมื่อมี Content Version ใหม่:

```text
App starts
↓
Check version.json
↓
New version?
├─ No → continue
└─ Yes
    ↓
Show:
"มีเนื้อหาเวอร์ชันใหม่"
    ↓
User refreshes
```

ห้าม force reload ระหว่างอ่าน

---

# 32. URL Architecture

ตัวอย่าง:

```text
/
 /book
 /book/1
 /book/1/1
 /book/20/1
 /search
 /bookmarks
 /glossary
 /tools/fcr
 /tools/adg
 /about
 /history
```

Deep link ต้องเปิดได้โดยตรงบน GitHub Pages

---

# 33. Mobile Navigation

Bottom Navigation:

```text
[หนังสือ] [ค้นหา] [บุ๊กมาร์ก] [เครื่องมือ]
```

Top Reader:

```text
←   บทที่ 1                ⋮
```

Reading page:

```text
Title
Progress
Content
References
Previous / Next
```

---

# 34. Design System Direction

Visual theme:

- Traditional agricultural knowledge
- Warm paper
- Farm notebook
- Academic credibility
- Thai rural identity

หลีกเลี่ยง:

- UI แบบ SaaS dashboard
- สีฉูดฉาดเกินไป
- Glassmorphism หนัก
- Animation เยอะ
- ทำให้ดูเหมือนเว็บข่าว

องค์ประกอบ:

- paper texture เบามาก
- serif สำหรับหัวเรื่อง
- readable Thai sans-serif สำหรับ body
- divider ที่ได้รับแรงบันดาลใจจากสมุดเกษตร
- ภาพเต็มความกว้างเมื่อเหมาะสม

---

# 35. Accessibility Architecture

Reading Mode ต้องรองรับ:

- semantic headings
- screen reader
- alt text
- keyboard
- high contrast
- reduced motion
- scalable font
- touch target ≥ usable mobile size

Book Mode อาจไม่สมบูรณ์สำหรับ screen reader แต่ต้องมี Reading Mode ที่เข้าถึงเนื้อหาเดียวกันทั้งหมด

---

# 36. Validation System

Build ต้อง fail เมื่อ:

- Markdown frontmatter ไม่ครบ
- ID ซ้ำ
- TOC ชี้ไฟล์ไม่พบ
- source_id ไม่พบ
- status invalid
- published content ไม่มี source ในหัวข้อที่ต้องอ้างอิง
- broken internal links
- image metadata ขาด alt
- JSON schema ผิด

---

# 37. CI Pipeline

```text
Push / Pull Request
↓
Install
↓
Lint
↓
Type Check
↓
Validate Markdown
↓
Validate Sources
↓
Validate TOC
↓
Unit Tests
↓
Build
↓
Preview / Deploy
```

---

# 38. Branch Strategy

แนะนำ:

```text
main
```

เป็น Production

งานใหม่ใช้:

```text
feature/*
content/*
research/*
fix/*
```

ตัวอย่าง:

```text
research/1.1-what-is-a-pig
content/1.1-final
feature/book-mode
```

---

# 39. Content Pull Request Rule

หนึ่ง PR ควรครอบคลุมหัวข้อย่อยเดียวเมื่อเป็น Content Research

ตัวอย่าง:

```text
PR: Content 1.1 — หมูคือสัตว์แบบไหน
```

ประกอบด้วย:

- content file
- sources
- research notes
- status update
- citation update

ทำให้ review ได้ละเอียด

---

# 40. High-Risk Veterinary Content

หัวข้อกลุ่ม:

- disease
- vaccine
- medication
- outbreak
- euthanasia
- antimicrobial use

ต้องมี:

```text
risk_level: high
```

ก่อน Publish:

```text
Research
↓
Fact Check
↓
Authoritative Source Check
↓
High-Risk Review
↓
Approve
```

---

# 41. Progress Tracking

`PROGRESS.md`

ควรแสดง:

```text
Total topics: X
Researching: X
Drafted: X
Fact checked: X
Approved: X
Published: X
Needs update: X
```

และ Current Focus:

```text
Current Topic: 1.1
Next Topic: 1.2
```

---

# 42. Definition of Done — One Content Topic

หัวข้อหนึ่งถือว่าเสร็จเมื่อ:

- Scope ชัด
- Research เฉพาะหัวข้อ
- แหล่งข้อมูลเพียงพอ
- Source metadata ครบ
- Fact extraction เสร็จ
- Draft เสร็จ
- Numeric claims ตรวจแล้ว
- Citation ถูก
- ภาษาอ่านง่าย
- ไม่ซ้ำหัวข้ออื่นมากเกินไป
- Fact checked
- Review ผ่าน
- status = APPROVED
- Build ผ่าน

---

# 43. Definition of Done — Feature

Feature ถือว่าเสร็จเมื่อ:

- mobile works
- desktop works
- keyboard/basic accessibility works
- no console error
- state persists if required
- offline behavior defined
- test exists for core logic
- no regression to Reading Mode

---

# 44. Development Sequence

## Stage A — Foundation

1. Init Vite project
2. Configure GitHub Pages
3. Build repository structure
4. Add PRD/Blueprint/Guides
5. Create schemas
6. Create validation scripts

## Stage B — Reader

7. Cover
8. TOC
9. Reading Mode
10. Routing
11. Typography

## Stage C — Book Experience

12. Page Flip
13. Sound
14. Book navigation
15. animation fallback

## Stage D — Knowledge Features

16. Search
17. Glossary
18. Citation
19. References
20. Bookmark
21. Last Read

## Stage E — Offline

22. Manifest
23. Service Worker
24. Offline content
25. installability

## Stage F — Research Pipeline

26. Research status
27. Source registry
28. Topic template
29. Quality gate

## Stage G — First Real Content

30. Research 1.1
31. Approve 1.1
32. Publish 1.1
33. Research 1.2
34. Continue sequentially

---

# 45. First Topic Execution Blueprint — 1.1

```text
INPUT
1.1 หมูคือสัตว์แบบไหน
        │
        ▼
Define Questions
        │
        ▼
Search DLD / WOAH / FAO / Academic
        │
        ▼
Source Evaluation
        │
        ▼
Fact Extraction
        │
        ├── Biology
        ├── Domestication context
        ├── Digestion overview
        ├── Behavior overview
        └── Farmer relevance
        │
        ▼
Conflict Check
        │
        ▼
Draft
        │
        ▼
Numeric Claim Check
        │
        ▼
Citation Check
        │
        ▼
Editorial Review
        │
        ▼
APPROVED
        │
        ▼
PUBLISH
```

หลังจากนั้นเท่านั้นจึงเปิด `1.2`

---

# 46. AI Agent Handoff Format

เมื่อ AI ทำหัวข้อเสร็จ ให้ส่งผลลัพธ์ในรูปแบบ:

```text
TOPIC
1.1

STATUS
FACT_CHECKED

RESEARCH QUESTIONS
...

SOURCES
...

KEY FACTS
...

CONFLICTS / UNCERTAINTY
...

DRAFT
...

CITATION MAP
...

REVIEW NOTES
...

RECOMMENDED STATUS
READY_FOR_EDITORIAL_REVIEW
```

---

# 47. Things AI Must Never Do

- แต่งประวัตินิพนธ์ฟาร์ม
- สร้างคำพูดของเจ้าของฟาร์มขึ้นเอง
- อ้างว่าประสบการณ์เป็นของนิพนธ์ฟาร์มหากไม่มีข้อมูลจริง
- Research ทั้งบทเมื่อได้รับงานหัวข้อเดียว
- ใส่ตัวเลขสำคัญโดยไม่มี Source
- เขียนยารักษาแบบมั่นใจเกินหลักฐาน
- ใช้เว็บทั่วไปแทนแหล่งหลักเพราะอ่านง่ายกว่า
- ปิดหัวข้อว่า Approved หากยังมี Conflict สำคัญ
- เปลี่ยน Master TOC โดยไม่มีเหตุผลหรือการอนุมัติ

---

# 48. Scalability

Architecture นี้รองรับในอนาคต:

- เพิ่มภาษาอังกฤษ
- เพิ่มเสียงบรรยาย
- เพิ่ม Video lesson
- เพิ่ม Farm case studies
- เพิ่ม Cloud sync
- เพิ่ม User accounts
- เพิ่ม Notes ส่วนตัว
- Export chapter เป็น PDF
- Print edition
- QR code เชื่อมจากหนังสือกระดาษ
- Expert review workflow

โดยไม่ต้องรื้อ Content Architecture เดิม

---

# 49. Final Architecture Statement

ระบบนี้ต้องถูกสร้างบนแนวคิด:

> **Content is structured knowledge, not page content.**

> **Research is a production pipeline, not a one-time prompt.**

> **The E-Book reader is only one interface over the knowledge base.**

> **นิพนธ์ฟาร์มคือเอกลักษณ์ของตำรา แต่เรื่องราวของฟาร์มต้องมาจากข้อมูลจริงเท่านั้น**

และหลักสำคัญที่สุด:

> **ทำทีละหัวข้อให้ลึก ตรวจสอบได้ และปิดงานให้สมบูรณ์ ก่อนเริ่มหัวข้อถัดไป**
