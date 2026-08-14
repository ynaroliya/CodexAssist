---
name: testing
description: Verify the implemented DPM change against the Requirement Brief and Implementation Plan using risk-appropriate tests and quality gates, with separate approval for test changes and execution.
---

# DPM Testing and Verification

Use after the applicable implementation skills complete.

## Inputs

- `Requirement Brief`;
- `Implementation Plan`;
- applicable implementation results;
- current local diff;
- existing project test utilities and configured quality commands.

## Responsibility

Prove implemented behavior satisfies the requirement and changed layers remain reliable. Do not reopen architecture/reuse planning unless test evidence invalidates the plan.

## Phase A - Test plan

1. Map acceptance criteria to verification evidence.
2. Use affected layers and plan impact to select required coverage.
3. Inspect nearby existing tests and project-native utilities before proposing new tests.
4. Select coverage appropriate to impact: UI states/accessibility; server authentication, authorization, validation and orchestration; service/data rules and errors; Lambda/SAP contracts, invocation, timeout/retry/idempotency; protected boundaries; and full-stack compatibility.
5. Prefer project-native utilities, fixtures and mocks.
6. For each test, state behavior proved, acceptance criterion/risk and expected file change.

## Approval gate - test creation/update

Present the Test Plan and ask:

`Approve creation/update of the proposed tests? (Yes/No)`

Do not modify test files until approved.

## Phase B - Test implementation

After approval, create/update only approved tests, cover changed behavior and meaningful failure/edge cases, avoid implementation-trivia assertions, and inspect the test diff before execution.

## Phase C - Execution plan

Before tests or quality commands, present exact commands, what each validates, expected runtime/impact, whether commands modify files, and focused/manual/visual validation steps that cannot be automated.

## Approval gate - test execution

Ask:

`Approve execution of these tests and quality checks? (Yes/No)`

Do not execute them until approved.

## Phase D - Execute and diagnose

1. Run approved focused tests and `node scripts/quality-gate.mjs` or approved equivalent.
2. Run required focused integration/manual/visual checks.
3. Distinguish pre-existing failures from change-related failures.
4. Do not silently fix failures requiring code changes; propose remediation and obtain approval.
5. Rerun affected checks after approved remediation.
6. Never report skipped, unavailable or failed checks as passed.
7. If verification exposes a flawed architecture/reuse assumption, return to `repo-analysis` and update the plan.

## Output artifact - Verification Report

Produce a `Verification Report` containing acceptance criteria covered; tests added/updated; commands/checks executed; pass/fail/skip status; integration/manual/visual verification; failures and likely ownership; gaps/residual risks; and recommended remediation.
