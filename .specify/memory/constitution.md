<!--
Sync Impact Report
Version change: unversioned template → 1.0.0
Modified principles:
- placeholder principle 1 → I. Test-First Delivery
- placeholder principle 2 → II. Clean Code, Clear Names
- placeholder principle 3 → III. OO + SOLID Design
- placeholder principle 4 → IV. Simplicity First (KISS + YAGNI)
- placeholder principle 5 → V. Change Safety and Version Discipline
Added sections:
- Engineering Standards
- Delivery Workflow and Review
Removed sections:
- Template placeholder comments and example guidance
Templates requiring updates:
- .specify/templates/plan-template.md ✅ updated
- .specify/templates/tasks-template.md ✅ updated
- .specify/templates/spec-template.md ✅ updated
Deferred items:
- None
-->
# talk-pi Constitution

## Core Principles

### I. Test-First Delivery
All behavior changes MUST start with failing automated tests that describe the
intended outcome. Bug fixes MUST add a regression test. Implementation MUST follow
Red-Green-Refactor. Tests MUST be deterministic, isolated, and owned with the
feature they protect.
Rationale: TDD keeps design honest and prevents silent regressions.

### II. Clean Code, Clear Names
Code MUST read like intent, not puzzle text. Names MUST explain purpose. Functions
and classes MUST stay small, and duplicate logic MUST be extracted only when it
reduces complexity. Dead code, commented-out code, and unclear magic values MUST be
removed.
Rationale: readable code is cheaper to change and review.

### III. OO + SOLID Design
Use objects for real domain behavior and keep responsibilities narrow. Classes MUST
obey single responsibility; dependencies MUST flow through abstractions at
boundaries; and polymorphism MUST replace type checks when variation is real. Do not
force OO where a simple function is clearer.
Rationale: well-shaped objects improve extension without ripple effects.

### IV. Simplicity First (KISS + YAGNI)
Choose the smallest solution that satisfies current requirements. Avoid premature
abstraction, speculative flexibility, and multi-step indirection unless evidence
shows need. Prefer explicit flows over clever shortcuts.
Rationale: simple systems are easier to test, debug, and evolve.

### V. Change Safety and Version Discipline
Any public behavior, contract, or governance change MUST be versioned and
documented. Backward-incompatible change MUST be called out before merge and
accompanied by a migration or rollback note. Patch, minor, and major version bumps
MUST follow the constitution rules below.
Rationale: stable change management keeps extension behavior predictable.

## Engineering Standards
- Every feature or bug fix MUST include tests that fail before implementation and
  pass after it.
- Formatting, linting, static analysis, and test suites relevant to touched code MUST
  pass before merge.
- Reviewers MUST check naming, duplication, boundaries, and SOLID/KISS adherence.
- Documentation, templates, and specs MUST be updated when behavior or workflow
  changes.
- Temporary scaffolding and TODOs MUST be removed or tracked before completion.

## Delivery Workflow and Review
1. Clarify scope and acceptance criteria.
2. Write failing tests for the smallest valuable slice.
3. Implement the minimum code needed to pass.
4. Refactor without changing behavior.
5. Run all relevant automated checks.
6. Review for simplicity, clean code, and architectural fit.
7. Ship only after tests, docs, and version notes are consistent.

## Governance
This constitution overrides local habits, ad hoc prompts, and template defaults.
Any amendment MUST include the rationale, affected principles, and semantic version
bump.
MAJOR bump: remove, redefine, or break a principle or governance rule.
MINOR bump: add a principle, section, or materially expand rules.
PATCH bump: wording, clarification, or typo fixes only.
Every plan, spec, task list, and implementation review MUST verify constitution
compliance.
If a rule must be bypassed, the exception MUST be documented in plan complexity notes
and approved by a human reviewer.

**Version**: 1.0.0 | **Ratified**: 2026-05-23 | **Last Amended**: 2026-05-23
