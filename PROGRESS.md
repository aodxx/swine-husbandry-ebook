# Project Progress

Generated from `data/research-status.json` on 2026-08-23. Do not edit counts manually.

## Current Project State

Chapter 1 status: `OWNER_REVIEW_PASSED`. Current Focus is `2.1` — สุกรพันธุ์แท้และลูกผสม. Next Topic is `2.1` — สุกรพันธุ์แท้และลูกผสม; `CHAPTER_2_LOCKED_NO_CONTENT_PRODUCTION`.

## Current State Count

| Status | Count |
|---|---:|
| TODO | 327 |
| RESEARCHING | 0 |
| SOURCES_COLLECTED | 0 |
| FACTS_EXTRACTED | 0 |
| DRAFTED | 0 |
| FACT_CHECKED | 0 |
| EDITORIAL_REVIEW | 11 |
| APPROVED | 0 |
| PUBLISHED | 0 |
| BLOCKED | 0 |
| HIGH_RISK_REVIEW | 0 |
| PENDING_FARM_HISTORY | 0 |
| NEEDS_UPDATE | 0 |

## Milestone Count (cumulative)

| Milestone reached | Count |
|---|---:|
| Drafted or beyond | 11 |
| Fact checked or beyond | 11 |
| Editorial review or beyond | 11 |
| Approved | 0 |
| Published | 0 |

## Current Focus

- **Current Topic:** `2.1` — สุกรพันธุ์แท้และลูกผสม
- **Next Topic:** `2.1` — สุกรพันธุ์แท้และลูกผสม
- **Next Topic Gate:** `CHAPTER_2_LOCKED_NO_CONTENT_PRODUCTION`
- **Research status:** `TODO`
- **Last reviewed:** None

## Foundation Checklist

- [x] Content/Research Foundation: governing documents, Master TOC, status registry, research workspace, source registry/schema, and content schema
- [ ] Reader/App Foundation
- [x] Persistent validation scripts for content, sources, status, and TOC
- [x] CI validation on push and pull request

## State Governance

- `data/research-status.json` is the Single Source of Truth for topic status.
- Content front matter must match the status registry before merge.
- This file is generated; update the registry, then run `scripts/generate-progress`.
