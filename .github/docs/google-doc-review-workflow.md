# Google Doc Review Workflow

## Purpose

Use this workflow for proposal reviews and other investor/customer-facing documents that originate in Google Docs but are reviewed locally with Copilot.

## Default Rule

Keep the **main document in Google Docs** as the source of truth.

Do **not** rely on Microsoft Word comments or tracked changes as the primary collaboration mechanism when the final destination is Google Docs. Copy/paste from Word into Google Docs flattens comments poorly and often moves them to the bottom of the document.

## Required Workflow

1. Download or export the current Google Doc locally as a `.docx`.
2. Review the document locally.
3. Produce a **separate review memo** for feedback that will go back into Google Docs.
4. Keep the review memo in normal document text, not Word comments.
5. Include direct links to:
   - the live MVP/site, if relevant
   - the repository, if relevant
6. Include product and operating gaps, not just writing feedback, when the document makes claims about the MVP or roadmap.

## Preferred Deliverables

When reviewing a proposal or other external-facing strategy doc, create one or both of these:

### 1. Reviewed `.docx` copy

Use this when a user wants Word-native markup for local review.

- File pattern: `{Original Name} - Reviewed.docx`
- May contain tracked changes and comments
- Good for Word review
- **Not** the preferred artifact for Google Docs handoff

### 2. Google-Docs-friendly review memo

Use this as the default companion artifact for Google Docs collaboration.

- File pattern: `{Original Name} - Google Docs Friendly Review.docx`
- Put all feedback in regular body text
- No dependency on Word comments surviving paste/import
- Easier to paste into Google Docs or share alongside the source doc

## Expected Sections in the Review Memo

For proposal reviews, prefer this structure:

1. Executive read
2. Biggest holes to fix before outreach
3. Investor objections
4. Customer objections
5. Section-by-section pushback
6. MVP improvements needed before outreach
7. Suggested launch-model or pricing clarifications
8. Direct links to the live site and repo

## MVP Review Requirement

If the document references the product, marketplace, roadmap, pricing, trust, matching, or operations:

- compare the document against the current MVP/repo
- call out where the proposal outruns the product
- identify what the MVP still needs before investor or customer outreach

Examples of required pushback:

- trust and safety gaps
- unclear pricing or premium-tier meaning
- missing workflow after a match
- weak validation or proof points
- hype-heavy moat language unsupported by the current product

## Agent Behavior Rules

- Keep the source Google Doc clean; use the separate review memo as the default review artifact.
- Prefer plain-text review notes over markup when the feedback must go back into Google Docs.
- If a user asks for review comments, create them in the companion review memo unless they explicitly ask for Word-native comments.
- When possible, keep naming predictable so future sessions can find the latest review artifact.

## Recommended Naming

- `Proposal Name - Reviewed.docx`
- `Proposal Name - Google Docs Friendly Review.docx`

## Why This Workflow Exists

This repo uses Copilot to pressure-test investor and customer-facing materials. The goal is not just to improve wording; it is to surface strategic, pricing, trust, and MVP readiness gaps in a format that survives the trip back into Google Docs.
