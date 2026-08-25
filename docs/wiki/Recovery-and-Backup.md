# Recovery & Backup

## Why this exists

AI/agent environments may be temporary. Research or draft work that exists only in an agent workspace is not considered safely stored.

## Recovery rule

A completed or meaningful checkpoint is safe only when it is committed and pushed to GitHub.

For important research/content work:

- commit + push after each completed subtopic when practical
- create a chapter checkpoint before moving to the next chapter
- do not leave unique research evidence only in temp files or local agent state

## Current recovery structure

- Research workspace: `docs/research/<topic>/`
- Source registry: `data/sources.json`
- Research state: `data/research-status.json`
- Final content: `content/`
- Chapter audits: `docs/audits/`
- Recovery audit: `docs/audits/research-recovery-audit-2026-08-23.md`
- Google Drive recovery folder exists as a secondary project archive

## Core research files per topic

Expected baseline:

- `questions.md`
- `facts.md`
- `sources.md`
- `review.md`

Optional depending on workflow:

- `source-findings.md`
- `conflicts.md`
- `draft-notes.md`

## Never back up

- API keys
- secrets
- credentials
- generated build output unless specifically needed as an artifact
- caches/temp files

## Recovery check after an agent interruption

1. inspect GitHub latest commit
2. inspect branch heads
3. inspect `docs/research/` for current topic
4. inspect `data/research-status.json`
5. compare content and source registry
6. record the last verified safe topic
7. resume only from the next unverified topic
