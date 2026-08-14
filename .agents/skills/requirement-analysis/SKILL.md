---
name: requirement-analysis
description: Convert Jira, Figma, screenshot/image, bug, feature or technical inputs into a clear, implementation-ready DPM Requirement Brief.
---

# DPM Requirement Analysis

Use this skill at the start of development work to establish what must be delivered before repository planning begins.

## Inputs

Accept one or more of:

- Jira issue/link;
- Figma design/frame/link;
- attached screenshot or image;
- written feature requirement;
- bug description;
- technical task.

## Responsibility

Determine the requested outcome, acceptance criteria, design intent, potentially affected DPM layers and material unknowns. Do not perform deep repository discovery or choose implementation abstractions in this skill.

## Procedure

1. Read all accessible textual requirement sources.
2. If a screenshot/image or Figma design is present, analyze the visible design before proposing implementation.
3. Identify the primary user/business outcome and explicit acceptance criteria.
4. Classify the potentially affected DPM layers: React/client UI; Next.js server/BFF; application service/business logic; PostgreSQL data access; Lambda/SAP integration; infrastructure/security.
5. For visual inputs, decompose page/shell/navigation, headings/content, cards/panels, forms/fields, tables/lists, actions, icons/images, spacing/typography/layout and visible states/responsive clues.
6. Separate visible design facts from undefined behavior, including data source, authorization, validation, persistence, retries and error contracts.
7. Reconcile Jira/written behavior with design input. Requirement behavior defines what must work; design input defines visual and interaction intent.
8. Identify material ambiguities and stop for clarification when they prevent a reliable implementation plan. Do not invent business rules or backend contracts.
9. Record constraints, edge cases, material assumptions and source/input references.

## Output artifact - Requirement Brief

Produce a concise `Requirement Brief` containing:

- objective;
- acceptance criteria;
- design analysis, when applicable;
- potentially affected DPM layers;
- constraints and edge cases;
- data/integration needs to locate during repository analysis;
- material assumptions, if any;
- open questions;
- source/input references.

The `Requirement Brief` is the input to `repo-analysis`. Do not start implementation from this skill.

## Approval gate

Present the Requirement Brief and the proposed repository-analysis scope, including the repository areas Codex intends to inspect and why. Then ask:

`Requirement analysis is complete. Approve repository and architecture analysis? (Yes/No)`

Do not begin repository analysis until approved.
