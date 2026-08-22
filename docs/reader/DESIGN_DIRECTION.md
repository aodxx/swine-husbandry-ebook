# DESIGN_DIRECTION.md
## Visual Identity & Cover Direction

### Core Idea
“ตำราประจำฟาร์มที่สืบทอดความรู้จริง” — อบอุ่น จริงจัง น่าเชื่อถือทางวิชาการ มีรากเกษตรกรไทย และไม่ดูเป็น SaaS dashboard

### Visual Keywords
Warm paper, farm notebook, field manual, heritage agriculture, Thai rural knowledge, veterinary textbook restraint, archival photography, practical handbook

### Avoid
neon gradients, heavy glassmorphism, colorful dashboard cards, 3D/fancy icons, cartoon pigs on primary cover, excessive animation, AI imagery pretending to be real Niphon Farm history

### Cover Directions
**A — ตำราหน้าคอก:** warm cream paper, strong Thai title, documentary/educational swine visual, subtle frame/seal

**B — สมุดบันทึกฟาร์ม:** notebook/ledger heritage, pig illustration, faint archival/record motifs, intimate and passed-down feeling

**C — Heritage Photograph:** use only after verified real Niphon Farm photo provenance exists; never fabricate

### Typography
Thai title must remain readable on small mobile screens. Body font must support long-form Thai. Handwriting/display style only for accent/chapter opener, never body

### Color Direction
- Paper: warm ivory/cream
- Ink: warm charcoal / dark brown-black
- Accent: muted farm green
- Secondary: clay/barn brown
- Warning: restrained orange/red with sufficient contrast
- Dark: warm charcoal, not pure black

Exact HEX values will be locked after device prototype testing

### Surface / Paper
Reading Mode decoration minimal; Book Mode may add subtle texture, gutter/page shadow and paper edge. Texture must never reduce contrast

### Chapter Opening
chapter number + title + short intro + one repeatable visual motif; no need for full-page illustration every chapter

### Callout System
Summary = thin calm border
มือใหม่ควรรู้ = friendly icon/label
ลงมือทำหน้าคอก = action-oriented
Warning = icon + label + border
High-risk = stronger hierarchy without full red panel
EXAMPLE_ONLY = unmistakable numeric-context label

### Illustration / Photo
Educational line/semi-realistic illustration with anatomy/technical accuracy. Real farm photos preferred when available. Historical Niphon Farm imagery requires verified provenance/context

### Icons
simple mono-line (Lucide-like), consistent stroke, text labels when meaning is not obvious

### Motion
page flip is primary Book Mode motion; other transitions short fade/slide; no heavy parallax; reduced motion support

### Sound
subtle paper flip only; no background music by default; future narration is separate from UI sound effects

### Design Tokens Required
`color.paper`, `color.ink`, `color.accent`, `color.warning`, `color.risk`
`font.display`, `font.body`
`text.title`, `text.chapter`, `text.h1`, `text.h2`, `text.body`, `text.caption`
`space.1..8`, `radius.small/medium`, `shadow.paper/page`, `motion.fast/normal/page`, `reader.maxWidth`

### Decision Rules
Reading > decoration; performance > effect; evidence > pretty imagery; book identity > dashboard trend; long-lived usability > short-lived visual trend
