---
name: backend-development
description: Implement approved DPM server/BFF, service, data-access and Lambda/SAP changes within the approved Implementation Plan and DPM architecture boundaries.
---

# DPM Backend Development

Use only when the approved Implementation Plan includes server/BFF, service/data-access or Lambda/SAP work.

## Inputs

- approved `Requirement Brief`;
- approved `Implementation Plan`;
- current repository/worktree state.

## Responsibility

Execute only the planned backend change. Do not repeat broad repository discovery or silently redesign ownership/reuse decisions established by `repo-analysis`.

## Before editing

Present the exact backend files expected to change; routes/actions/services/repositories/contracts to reuse or extend; authorization/validation; error/logging/transaction; data/schema; Lambda/SAP impact; required abstraction and why; and specific edits. Then ask:

`Approve these backend code changes? (Yes/No)`

## Procedure after approval

1. Implement only the approved backend scope and smallest coherent change satisfying applicable acceptance criteria.
2. Keep trusted request handling, validation and authorization on server/BFF paths.
3. Reuse selected route, service, repository, validator, type, error, logging and transaction abstractions.
4. Preserve planned API/service/repository/integration contracts and data flow.
5. Keep PostgreSQL access in the ECS application path and preserve transaction boundaries.
6. Preserve private Lambda/SAP integration; Lambda must not access DPM RDS.
7. Protect secrets, credentials and internal infrastructure details.
8. Preserve stable contracts outside scope and explicit types.
9. Avoid unrelated cleanup, broad refactoring, architecture migration or dependency replacement.
10. Inspect complete backend diff for accidental, generated or unrelated changes.
11. If the plan is incorrect or insufficient, stop and return to `repo-analysis`.

## Stop conditions

Stop before proceeding when the work requires an undefined product decision, architecture change, major dependency, new infrastructure/IAM/networking behavior, destructive schema/data behavior, security-control reduction or broader scope.

## Output artifact - Backend Implementation Result

Produce a `Backend Implementation Result` containing files/contracts changed; behavior; reused services/repositories/validators/types; authorization/validation changes; error/logging/transaction changes; data/schema and Lambda/SAP impacts; new abstractions; approved deviations; and unresolved concerns.
