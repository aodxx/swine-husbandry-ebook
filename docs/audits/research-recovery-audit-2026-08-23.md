# Research Recovery Audit — 2026-08-23

Repository: `aodxx/swine-husbandry-ebook`
Audited commit baseline: `ac5d3e1bb4f2d3ccef897746fb4681d29ff089e0`
Purpose: verify which Manus research artifacts survived in GitHub before resuming autonomous production.

## Executive result

**RECOVERY STATUS: SAFE FOR CHAPTERS 1–3**

- Completed topics audited: **38/38** (`1.1–1.11`, `2.1–2.15`, `3.1–3.12`)
- `questions.md`: **38/38 present**
- `facts.md`: **38/38 present**
- `review.md`: **38/38 present**
- `sources.md`: **38/38 present**, but 3 files are heading-only placeholders (see findings below)
- Final content Markdown: **38/38 present**
- Central source registry: `data/sources.json` present
- Research state registry: `data/research-status.json` present
- TOC registry: `data/toc.json` present
- Chapter audit evidence: Chapter 1 research audit/closure files, Chapter 2 full audit, Chapter 3 full audit present
- Chapter 4 research workspace (`docs/research/4.1`): **NOT FOUND**
- Chapter 4 content: **NOT FOUND**

No evidence was found in GitHub that Manus started and pushed topic 4.1.

## Core workspace audit

The minimum recoverable research unit is defined for this audit as:

1. `questions.md` — research scope/questions
2. `facts.md` — extracted evidence/facts
3. `sources.md` — topic-local source record or source pointer
4. `review.md` — review/limitations/quality evidence
5. final topic Markdown under `content/`
6. source IDs resolvable through the central source registry

All 38 completed topics retain items 1, 2, 4 and 5. All 38 retain a `sources.md` path; however three are placeholders rather than populated local source lists.

## Recoverable source-list gaps

### 1.8

`docs/research/1.8/sources.md` contains only its heading. The final content front matter still retains:

- `SRC-053`
- `SRC-054`
- `SRC-055`
- `SRC-056`

Therefore the source linkage is recoverable through `data/sources.json`.

### 2.9

`docs/research/2.9/sources.md` contains only its heading. The final content front matter still retains:

- `SRC-114`
- `SRC-115`
- `SRC-116`

Therefore the source linkage is recoverable through `data/sources.json`.

### 2.10

`docs/research/2.10/sources.md` contains only its heading. The final content front matter still retains:

- `SRC-111`
- `SRC-117`
- `SRC-118`
- `SRC-119`
- `SRC-120`

Therefore the source linkage is recoverable through `data/sources.json`.

**Severity: LOW / RECOVERABLE.** These files should eventually be regenerated from the authoritative source registry, but their current state does not mean the underlying source provenance is lost.

## Supplemental research artifacts

The workflow format evolved during production, so supplemental artifacts are uneven:

- Chapter 1 generally includes `conflicts.md` and `draft-notes.md`.
- Chapter 2 topics 2.1–2.11 generally include `conflicts.md` and `draft-notes.md`; 2.12–2.15 use a leaner four-file workspace.
- Chapter 3 uses the leaner workspace; `source-findings.md` exists for selected topics such as 3.1 and 3.9.

These differences are treated as workflow evolution, not evidence of deletion, because each completed topic retains the core evidence files, final content, status record and central source mapping.

## Additional surviving evidence

The repository also preserves:

- `data/sources.json` — central source registry
- `data/research-status.json` — single source of truth for topic state
- `data/glossary.json` — terminology registry
- `docs/research/chapter-01-audit.md`
- `docs/research/chapter-01-closure-report.md`
- `docs/audits/chapter-02-full-audit.md`
- `docs/audits/chapter-03-full-audit.md`
- scripts used to add sources, transition topic states and audit Chapters 1–3
- one archived official Thai pig-farming PDF under `docs/research/1.1/assets/`

## What may have been lost

Only work that existed exclusively inside the Manus runtime and was never committed/pushed can be considered potentially lost. At this checkpoint:

- no `docs/research/4.1/` exists
- no Chapter 4 content file exists
- project state still points to `next_topic = 4.1`

Therefore any unpushed research Manus may have performed for 4.1 cannot be recovered from this repository.

## Recovery priority

Before autonomous production resumes:

1. Preserve this audit as the recovery checkpoint.
2. Maintain GitHub as the authoritative working repository.
3. Maintain a second recovery checkpoint in Google Drive containing the repository URL, baseline commit, state summary, source-registry references and recovery instructions.
4. Regenerate the three topic-local source-list placeholders (1.8, 2.9, 2.10) from `source_ids` + `data/sources.json` during a later metadata cleanup; do not rewrite scientific content just for this task.
5. Require future autonomous agents to commit/push at the end of every subtopic.
6. Require a chapter-level checkpoint/audit commit before advancing to the next chapter.

## Safe resume point

- Last completed chapter: **Chapter 3**
- Last completed topic: **3.12**
- Next topic: **4.1 การเลือกพื้นที่**
- Resume instruction: start 4.1 from a fresh research cycle. Do not assume any unpushed Manus work survives.

## Final verdict

`RESEARCH RECOVERY AUDIT: PASS WITH 3 RECOVERABLE LOCAL-SOURCE-LIST GAPS`

The scientific/research work already committed for Chapters 1–3 remains recoverable and usable. The known gaps concern redundant topic-local source-list files, not the authoritative central source registry or final content provenance.