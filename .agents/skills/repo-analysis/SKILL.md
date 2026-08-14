---
name: repo-analysis
description: Turn the approved Requirement Brief into the authoritative DPM architecture, ownership, reuse and implementation plan before code changes begin.
---

# DPM Repository and Architecture Analysis

Use after `requirement-analysis` and before editing code for substantive changes.

## Inputs

- approved `Requirement Brief` from `requirement-analysis`;
- current repository state and relevant local changes.

## Responsibility

This skill owns architecture, ownership and reuse decisions. It traces existing implementation, determines the correct DPM layer for each responsibility, identifies reusable frontend/backend assets and produces the authoritative `Implementation Plan` consumed downstream.

## Procedure

1. Inspect repository structure, package scripts and the feature area closest to the requirement.
2. Trace the existing end-to-end path from UI through server/BFF, service/data access or Lambda/SAP integration as applicable.
3. Confirm which DPM layer owns each requested behavior.
4. Search relevant frontend page/layout/domain/shared components, form controls, hooks/state/query helpers, tokens/styles, accessibility patterns and tests.
5. Search relevant backend route handlers/server actions, auth helpers, validators/types, services, repositories/models, transactions/migrations, error/logging utilities and tests.
6. For Lambda/SAP work, locate invocation wrappers, SAP contracts/clients, timeout/retry/idempotency handling, secret-access patterns and integration tests.
7. Validate ownership and data/integration flow against `AGENTS.md` invariants.
8. For every proposed abstraction, determine whether an equivalent exists, whether it can be composed or extended, and why a new abstraction is necessary when reuse is unsuitable.
9. Identify files likely to change and files/layers that should remain untouched.
10. Identify required test impact and any architecture/security stop condition.
11. Produce the smallest compatible cross-layer implementation plan before any code edit, separating frontend, backend, full-stack integration and testing impact.

## Output artifact - Implementation Plan

Produce an `Implementation Plan` containing confirmed affected layers and ownership; existing request/data/integration flow; reusable frontend and backend assets with reuse decisions; proposed frontend files/changes; proposed backend files/contracts/data changes; full-stack coupling changes; new abstractions with justification; data/schema/integration impact; test impact; ordered steps; untouched layers; and architecture/security risks or stop conditions.

The `Implementation Plan` is authoritative for downstream execution. If later evidence invalidates it, return to this skill and revise it explicitly.

## Approval gate

Present the Implementation Plan with expected files, contracts, behavior changes, reuse decisions, risks and implementation order. Then ask:

`Repository analysis and implementation planning are complete. Approve the planned code changes? (Yes/No)`

Do not edit implementation files until approved.
