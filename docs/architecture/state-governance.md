# State Governance Contract

## Authority

`data/research-status.json` is the **Single Source of Truth** for the lifecycle status of every topic. An Agent or editor must update this registry first. Content Front Matter and `PROGRESS.md` are derived representations and must not become competing state stores.

## Synchronization rules

Every atomic topic file under `content/part-*/chapter-*/*.md` must have a topic `id` that exists exactly once in both `data/toc.json` and `data/research-status.json`. Its `title`, `source_ids`, and `status` must be consistent with the corresponding records. The status in Front Matter must equal the status in `data/research-status.json`.

`PROGRESS.md` is generated only by `scripts/generate-progress`. Its Current State Count reports the number of topics in each exact status. Its Milestone Count reports cumulative progress: a topic at `DRAFTED` or later counts as Drafted, a topic at `FACT_CHECKED` or later counts as Fact Checked, and a topic at `EDITORIAL_REVIEW` or later counts as Editorial Review. These are different metrics and must not be conflated.

## Status gate

The allowed statuses are declared in `data/research-status.json`. A topic may not be marked `APPROVED` or `PUBLISHED` unless its registry record contains an approval date and all required review gates are recorded. Owner Review remains an explicit project gate; automated validation cannot invent or substitute owner approval.

## Farm-history restriction

Farm-specific history, names, dates, quotations, events, and case studies require owner-provided evidence. Automated checks reject known unsupported history phrases in farm-context content, but human review remains required.

## Required commands

Run the following from the repository root before merging changes:

```text
./scripts/validate-toc
./scripts/validate-sources
./scripts/validate-status
./scripts/validate-content
./scripts/generate-progress
```

A change is not ready when any validator fails, when `PROGRESS.md` differs after generation, or when a topic is advanced while an earlier topic remains below its required Quality Gate.
