<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME -> I. Extension Isolation & OO Boundaries
- PRINCIPLE_2_NAME -> II. Clean Code & Simplicity
- PRINCIPLE_3_NAME -> III. Test Coverage First
- PRINCIPLE_4_NAME -> IV. Safe Side Effects & Guardrails
- PRINCIPLE_5_NAME -> V. Documentation & Observability
Added sections:
- Engineering Standards
- Workflow & Quality Gates
Removed sections:
- None
Templates reviewed:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ .specify/templates/commands/* (none present)
Deferred items:
- None
-->

# Talk-Pi Constitution

## Core Principles

### I. Extension Isolation & OO Boundaries
All features MUST live in small, focused modules or classes with a single responsibility.
Composition MUST be preferred over inheritance. Tool handlers, commands, hooks, and UI components MUST delegate business logic to testable services.
Shared state MUST be explicit and limited; global state and hidden coupling are forbidden.

### II. Clean Code & Simplicity
Names MUST express intent. Code MUST take the simplest design that satisfies current requirements.
Dead code, duplication, and speculative abstractions MUST be removed or avoided.
Complexity MUST be justified by a documented need; otherwise the simpler solution wins.

### III. Test Coverage First
New behavior MUST be covered by automated tests before merge. Bug fixes MUST add regression tests.
Unit tests MUST cover core logic, and integration tests MUST cover user-facing flows, tool execution, parsing, and state transitions.
A change is incomplete until tests pass and the affected behavior is verified.

### IV. Safe Side Effects & Guardrails
Any action that mutates files, runs shell commands, touches network resources, or changes agent state MUST be bounded by clear intent and, when risky, explicit user consent.
Dangerous operations MUST be protected by guardrails and easy-to-review rules.
Side effects SHOULD be reversible or idempotent where practical.

### V. Documentation & Observability
Public commands, tools, prompts, and workflows MUST have concise docs and usage examples.
Errors MUST be actionable. Logging and status output MUST expose enough context to diagnose failures without leaking secrets.
Behavior changes MUST be reflected in the project docs and supporting artifacts.

## Engineering Standards

- TypeScript SHOULD use strict typing; `any` is forbidden unless justified at the boundary.
- Dependencies MUST be minimized and added only when they clearly reduce risk or complexity.
- Extension code MUST stay compatible with the current Pi Coding Agent extension and SDK APIs.
- Root-level project documents are the source of truth for implementation intent.

## Workflow & Quality Gates

- Each change MUST start from the smallest useful scope and preserve independent testability.
- Implementation MUST follow red-green-refactor when tests are added or changed.
- Before merge, the changed surface MUST be reviewed for principle compliance, test coverage, and documentation drift.
- Breaking changes MUST include a migration note and a semantic version bump.

## Governance

This constitution supersedes informal practice, templates, and local conventions.
Amendments require a written rationale, a semantic version bump, and an updated sync report.
Versioning policy: MAJOR for breaking governance or principle changes, MINOR for new principles or materially expanded guidance, PATCH for clarifications and non-semantic refinements.
Compliance review is required at spec, plan, task, and merge time. Any conflict with other guidance resolves in favor of this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-05-23 | **Last Amended**: 2026-05-23
