# DPM project instructions for Codex

## Mission

- Deliver the smallest DPM-compatible change that satisfies the approved requirement.
- Preserve architecture, security boundaries, existing abstractions, scope discipline and production quality.

## Architecture and security invariants

- DPM is a React / Next.js application running on ECS.
- Trusted request handling, validation, authorization and privileged backend behavior belong on the Next.js server/BFF path.
- Browser/client code must not directly access PostgreSQL, Secrets Manager, private Lambda endpoints or other privileged infrastructure services.
- PostgreSQL is accessed through the ECS application path; do not introduce Lambda-to-RDS access.
- Lambda is the SAP integration boundary; preserve private ECS-to-Lambda invocation.
- Never hard-code credentials, tokens, secrets or private keys.
- Do not weaken authentication/authorization, validation, IAM, private networking, encryption or secret-management controls.

## Engineering policy

- Reuse existing frontend and backend abstractions before introducing new ones.
- Keep changes within the approved task; avoid unrelated refactors or architecture migrations.
- Do not add major dependencies, destructive data/schema behavior or architecture-boundary changes without explicit approval.
- Figma links and screenshots are design inputs; DPM architecture and repository ownership determine implementation.
- Do not overwrite or publish unrelated developer changes.

## Stage-by-stage approval policy

- Do not move from one workflow stage to the next without explicit developer approval.
- Before requesting approval, show: completed analysis/result, proposed next actions, expected files/contracts affected, risks/assumptions, and the exact action being approved.
- Approval is scoped to the stated next action only. Do not treat an earlier Yes as approval for code edits, test creation, test execution, remediation, commit, push or PR creation unless that action was explicitly included.
- If the developer answers No, stop at the current stage and preserve completed work.

## Skill workflow and routing

Detailed procedures are owned by the corresponding SKILL.md files. Use the following workflow for development work, applying each skill when relevant to the affected layers.

1. `requirement-analysis` -> Requirement Brief -> ask approval for repository analysis.
2. `repo-analysis` -> Implementation Plan -> ask approval for planned code changes.
3. `frontend-development` when React/client/UI work is required -> present exact frontend changes -> ask approval -> implement.
4. `backend-development` when server/BFF/service/data/Lambda work is required -> present exact backend changes -> ask approval -> implement.
5. `fullstack-integration` when frontend and backend are both affected -> present contract/coupling work -> ask approval -> integrate.
6. `testing` -> present Test Plan -> ask approval to create/update tests -> then present commands -> ask approval to execute tests/checks.
7. `code-review` -> perform self-review; ask approval before remediation edits.
8. Independent `reviewer` -> review-only second-context assessment.
9. `pr-handoff` -> aggregate approved evidence and ask final publication approval.

## Routing rules

- For substantive work, do not skip requirement analysis or repository analysis.
- Use frontend and backend skills independently when only one layer changes.
- Use `fullstack-integration` only when the task crosses the frontend/backend contract.
- A skill may not override this file's architecture, security, scope or approval policies.

## Git and PR publication boundary

- Do not commit, push or create a pull request until the developer explicitly approves the final PR handoff.
- Do not merge, deploy, modify infrastructure or alter production data under PR approval.
- Publication-sensitive commands must comply with `.codex/rules/git-pr.rules`.

Before publication ask exactly:

`Changes are ready. Create the PR? (Yes/No)`
