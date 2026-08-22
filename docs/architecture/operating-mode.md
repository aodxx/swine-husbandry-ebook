# Operating Mode: Chapter-by-Chapter Autonomous Production

## Scope

The project operates in **CHAPTER-BY-CHAPTER AUTONOMOUS PRODUCTION** mode. Content is produced one atomic subtopic at a time, in Master TOC order. Quality is prioritized over speed and volume.

For Chapter 1, the production order is `1.1 → 1.2 → 1.3 → ... → 1.11`. The agent must complete the full loop for one topic before beginning the next: Define Scope, Research Questions, Source Research, Source Evaluation, Fact Extraction, Conflict/Uncertainty Check, Draft, Fact Check, Citation Check, Editorial Self-Review, Validation, and Save State.

## Gate rules

A topic may advance to the next topic after its **Subtopic Quality Gate** passes. The gate requires reliable sources, claim-level fact support, controlled conflicts, complete citations, readable Thai, repository validation, and a saved state. Owner Review is not required to begin the next topic, but it remains required before `APPROVED` and `PUBLISHED`.

`data/research-status.json` is the Single Source of Truth. Content Front Matter must match it, and `PROGRESS.md` must be generated from it. No topic may be marked `PUBLISHED` by the autonomous loop.

High-risk topics involving disease, medicine, vaccines, treatment, outbreaks, antimicrobials, diagnosis, or euthanasia use a Topic-Level Stop Gate and require additional authoritative review before any subsequent topic is started.

Farm history remains `PENDING_FARM_HISTORY`. The agent must not invent names, dates, events, quotations, or case studies for Niphon Farm.

## Chapter stop rule

After all Chapter 1 topics from 1.1 through 1.11 pass their Subtopic Quality Gates, the agent must stop content production. It must then perform a Full Chapter Quality Audit covering academic accuracy, source quality, numeric claims, citations, depth, Thai-farmer suitability, continuity, overlap, scope boundaries, terminology, language consistency, missing content, overclaims, misconceptions, and links to the next chapter. The agent may fix Chapter 1 after the audit, then must stop and report to the Owner. Chapter 2 must not start without a new instruction.
