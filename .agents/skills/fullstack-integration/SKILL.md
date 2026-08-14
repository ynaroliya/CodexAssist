---
name: fullstack-integration
description: Couple approved frontend and backend changes through existing DPM contracts and validate the end-to-end request, data, validation and error flow.
---

# DPM Full-Stack Integration

Use only when the approved task crosses the frontend/backend contract.

## Inputs

- approved `Requirement Brief`;
- approved `Implementation Plan`;
- completed `Frontend Implementation Result` and `Backend Implementation Result` when both layers are affected;
- current local diff.

## Responsibility

Connect approved frontend and backend implementation without redesigning architecture. This skill owns cross-layer contract coupling and end-to-end consistency, not independent feature design.

## Before integration edits

Describe the frontend-backend contract, request/response shapes and shared types, data-fetch/mutation pattern, validation/authorization location, loading/error/success mapping, persistence/integration path, contract changes and exact files. Then ask:

`Approve these frontend-backend integration changes? (Yes/No)`

## Procedure after approval

1. Connect frontend to the approved server/BFF contract using planned data flow.
2. Reuse existing request/response types and data-fetch/mutation patterns where available.
3. Keep trusted validation and authorization server-side; client validation must not replace enforcement.
4. Map UI states safely to server responses without leaking stacks, secrets or internal details.
5. Confirm PostgreSQL remains on ECS application path and Lambda the SAP boundary with no RDS access.
6. Avoid duplicated business logic or validation unless intentionally required for UX and documented in the plan.
7. Preserve compatibility for callers/contracts outside scope.
8. Inspect complete integration diff for accidental or unrelated changes.
9. If the contract or architecture is insufficient, stop and return to `repo-analysis`.

## Stop conditions

Stop for a contract expansion outside plan, new architecture path, direct browser privileged access, Lambda-to-RDS access, unapproved schema/infrastructure/security change or broader scope.

## Output artifact - Integration Result

Produce an `Integration Result` containing coupled/changed contracts; end-to-end data flow; affected files; validation/authorization ownership; error/state mapping; compatibility considerations; approved deviations; and remaining integration risks.
