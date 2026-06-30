# Repo Docs Entrypoint

Load these repo-specific docs as needed:

1. Always read `.github/docs/google-doc-review-workflow.md` when the task involves:
   - proposal reviews
   - investor/customer-facing document critique
   - Google Docs handoff
   - `.docx` review artifacts
   - turning markup into paste-friendly review notes

If none of those apply, no additional repo-specific docs are required from this entrypoint.

---

## Modular Copilot Instructions v6.0

The copilot instructions have been refactored into a modular architecture for token efficiency.

### Load Strategy

**Always load:**
- `.github/copilot-instructions.md` (primary instructions, ~5.5K tokens)

**Load on-demand based on task:**
- Error handling/debugging → `.github/specialist-guides/error-handling.md`
- Code review/refactoring → `.github/specialist-guides/code-quality.md`
- Architecture decisions → `.github/specialist-guides/architecture-decisions.md`
- Domain-specific work → `.github/specialist-guides/checklists.md`
- User questions → `.github/specialist-guides/user-engagement-model.md`

See `.github/specialist-guides-index.md` for quick decision tree and token cost breakdown.
