---
name: frontend-development
description: Implement approved DPM React/client/UI changes using the approved Implementation Plan, existing components, tokens and interaction patterns.
---

# DPM Frontend Development

Use only when the approved Implementation Plan includes React/client/UI work.

## Inputs

- approved `Requirement Brief`;
- approved `Implementation Plan`;
- current repository/worktree state.

## Responsibility

Execute only the planned frontend change. Do not repeat broad repository discovery or silently redesign ownership/reuse decisions already established by `repo-analysis`.

## Before editing

Present the exact frontend files expected to change; components/hooks/form controls/tokens to reuse; any required frontend abstraction and why; UI states; accessibility/responsive behavior; API/server contract; and specific edits. Then ask:

`Approve these frontend code changes? (Yes/No)`

## Procedure after approval

1. Implement only the approved frontend scope and smallest coherent change satisfying applicable acceptance criteria.
2. Reuse components, hooks, controls, tokens, styles and accessibility patterns in the plan.
3. For Figma/screenshot work, implement the approved mapping and planned application behavior; do not create a disconnected mock UI or parallel design system.
4. Keep privileged processing, authorization, secrets and private-service access out of client code.
5. Preserve responsive behavior, keyboard interaction, semantic structure, focus behavior and accessible labels.
6. Implement relevant loading, empty, error, disabled and success states.
7. Keep public contracts stable outside scope and types explicit.
8. Avoid unrelated cleanup, broad refactoring, folder migration or dependency replacement.
9. Inspect the complete frontend diff for accidental, generated or unrelated changes.
10. If unplanned API contract, component family, major dependency, architecture boundary, infrastructure change or material product decision is needed, stop and return to `repo-analysis`.

## Stop conditions

Stop before proceeding when the work needs a material undefined product decision, unplanned backend contract, architectural boundary, major dependency, security-control reduction or materially broader scope.

## Output artifact - Frontend Implementation Result

Produce a `Frontend Implementation Result` containing files changed; behavior implemented; reused components/hooks/tokens; new abstractions and reason; UI states; accessibility/responsive impact; contract assumptions; approved deviations; and unresolved concerns.
