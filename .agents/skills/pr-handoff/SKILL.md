---
name: pr-handoff
description: Aggregate completed DPM implementation evidence and publish a branch/PR only after explicit final human approval.
---

# DPM PR Handoff

Use only after implementation, verification, self-review and required independent review are complete.

## Inputs

Consume the existing `Requirement Brief`, `Implementation Plan`, applicable implementation results, `Verification Report`, `Self-Review Report` and required `Independent Review Report` rather than re-analyzing the implementation.

## Responsibility

Package evidence into a concise publication summary, obtain explicit human decision and perform only approved Git/PR actions. Do not reopen requirement, architecture or implementation analysis.

## Output artifact - PR Handoff Summary

Before approval, present requirement/design input; addressed acceptance criteria; affected layers; changed files; reuse decisions; new abstractions; contract and data/schema/integration impact; tests and exact results; validation performed; review findings; remaining risks; and reviewer validation instructions. Then ask exactly:

`Changes are ready. Create the PR? (Yes/No)`

## If No

- Do not commit.
- Do not push.
- Do not create a PR.
- Preserve local changes for developer inspection or revision.

## If Yes

1. Confirm working tree and exclude unrelated developer changes.
2. Create or use a descriptive feature branch.
3. Stage only intended files.
4. Commit using repository conventions.
5. Push the approved branch.
6. Create the GitHub pull request using the detailed PR template.
7. Populate the PR body from workflow artifacts, including references, criteria, layers, summary, reuse, impacts, tests, reviewer steps, findings and risks.
8. Return the PR reference.

Do not merge or deploy as part of this approval.
