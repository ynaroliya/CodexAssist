## Requirement / design context

- Jira: <!-- link or N/A -->
- Figma: <!-- link or N/A -->
- Screenshot/design reference: <!-- describe or N/A -->
- Business/user outcome: <!-- what this PR enables/fixes -->
- Acceptance criteria addressed:
  - <!-- AC 1 -->
  - <!-- AC 2 -->

## Change summary

<!-- 3-6 bullets describing the implementation -->

## Affected DPM layers

- [ ] React/client UI
- [ ] Next.js server/BFF
- [ ] Service/business logic
- [ ] PostgreSQL/data access
- [ ] Lambda/SAP integration
- [ ] Infrastructure/security (explicit scope required)

## Frontend changes

- Files/components changed:
- Existing components/hooks/tokens reused:
- New UI abstractions and why:
- Loading/empty/error/disabled/success states:
- Responsive/accessibility considerations:

## Backend changes

- Routes/actions/services/repositories changed:
- Validation/authentication/authorization impact:
- Database/schema/transaction impact:
- Lambda/SAP impact:
- New backend abstractions and why:

## Frontend-backend contract

- Endpoint/action/contract used or changed:
- Request shape:
- Response shape:
- Error/state mapping:
- Compatibility considerations:

## Architecture / security review notes

- Client/server ownership:
- Data-access boundary impact:
- Secret/sensitive-data handling:
- IAM/network/infrastructure impact:
- Known architecture/security risks:

## Automated verification

| Check | Command | Result | What it validates |
|---|---|---|---|
| Lint | `...` | Pass/Fail | Code/style issues |
| Type-check | `...` | Pass/Fail | Type contracts |
| Unit/component tests | `...` | Pass/Fail | Changed behavior |
| Integration tests | `...` | Pass/Fail/N/A | Cross-layer/service behavior |
| Build | `...` | Pass/Fail | Production compilation |

## Tests added / updated

| Test file | Scenario | Acceptance criterion / risk covered |
|---|---|---|
| `...` | `...` | `...` |

## Reviewer validation guide

### Prerequisites

<!-- feature flags, seed data, account/role, environment, mocks, setup -->

### How to run locally

1. `npm ci` <!-- or repository equivalent -->
2. `...` <!-- start required dependencies -->
3. `npm run dev` <!-- or repository equivalent -->

### Functional validation steps

1. <!-- exact navigation/action -->
   - Expected: <!-- observable result -->
2. <!-- second scenario -->
   - Expected: <!-- observable result -->

### Negative / permission / validation checks

1. <!-- unauthorized/invalid/error scenario -->
   - Expected: <!-- safe result/error -->

### UI / design validation (when applicable)

- Viewport(s) checked:
- Figma/screenshot areas to compare:
- Keyboard/focus/accessibility checks:
- Loading/empty/error state checks:

### Backend / integration validation (when applicable)

- Request/API/service flow to exercise:
- Data persistence/query to verify:
- Lambda/SAP behavior to verify:
- Logs/observable evidence to inspect:

## Review focus

Please specifically check:

- requirement/acceptance-criteria completeness;
- reuse of existing DPM frontend/backend abstractions;
- client/server ownership and auth/validation boundaries;
- frontend-backend contract compatibility;
- PostgreSQL and Lambda/SAP architecture boundaries;
- error handling and sensitive-data exposure;
- test adequacy and regression risk;
- unrelated changes or unnecessary abstractions.

## Review findings before PR

- Self-review: <!-- blockers/issues/resolution -->
- Independent reviewer: <!-- blockers/issues/resolution -->

## Risks / limitations / follow-up

- <!-- known risk or N/A -->

## Rollback / recovery considerations

<!-- Describe simple rollback path when the change affects backend/data/integration behavior; otherwise N/A. -->

## Scope and safety

- [ ] Changes are limited to the approved requirement
- [ ] No unrelated refactor included
- [ ] No secrets or credentials added
- [ ] No unintended infrastructure/security change included
- [ ] Reviewer validation instructions are complete
