---
name: code-review
description: Verify the completed DPM diff against the approved Requirement Brief, Implementation Plan and Verification Report before independent review and PR handoff.
---

# DPM Code Review

Use after implementation and verification.

## Inputs

- `Requirement Brief`;
- `Implementation Plan`;
- applicable implementation results;
- `Verification Report`;
- final local diff.

## Responsibility

Perform main-agent self-review against approved decisions and requirements. Do not redesign the solution; report deviations or risks as findings.

## Review checklist

1. Verify all acceptance criteria are addressed and no out-of-scope behavior was introduced.
2. Verify layer ownership, request/data/integration flow, architecture boundaries and dependencies match the plan and `AGENTS.md`.
3. Verify reuse decisions were followed and material new abstractions are justified.
4. Verify server authorization/input validation, security controls, secrets protection and absence of privileged browser access.
5. Verify PostgreSQL remains ECS-path only and Lambda remains the SAP boundary with no RDS access; assess transaction, timeout, retry and idempotency handling where relevant.
6. Verify UI/reliability states, responsive/keyboard/accessibility behavior and design intent where applicable.
7. Verify test evidence actually covers changed behavior and failure paths.
8. Verify diff hygiene: intended scope only; no secrets, generated artifacts, temporary files or accidental formatting changes.

## Output artifact - Self-Review Report

Produce a `Self-Review Report` containing blockers, important issues, minor improvements, verified observations, plan deviations, affected files, recommended remediation and remaining risks. Do not publish from this skill.

## Approval gate - remediation

If review identifies changes, present exact remediation edits, affected files, reason and verification to rerun. Then ask:

`Approve the proposed review remediation changes? (Yes/No)`

Do not edit files until approved. After remediation, rerun affected verification with execution approval.

## Approval gate - independent review

When self-review has no unresolved blocker, summarize the Requirement Brief, Implementation Plan, Verification Report, final diff scope and Self-Review Report provided to the reviewer. Then ask:

`Approve independent engineering review? (Yes/No)`
