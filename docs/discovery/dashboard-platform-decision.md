# Dashboard Platform Decision

Status: beta architecture decision.

## Recommended Stack

- Codex builds and maintains the workflow, dashboard, research artifacts, and QA rules.
- GitHub remains the central source of truth for code, skills, reports, and change history.
- A private Codex Site hosts Jeff's approval dashboard.
- The existing Google Sheet is the interim shared tracker until HubSpot access and field mapping are ready.
- Manus is an input tool for transcription or bounded research, not the workflow system or dashboard host.

## Why This Fits

The dashboard must be easy for Jeff to review, inexpensive to operate, portable between Codex accounts, and governed by the repository's approval rules. This split keeps the reusable system in GitHub while giving Jeff a clean browser-based review surface.

## Beta Data Plan

Version 1 uses the repository's approved sample records and saves review decisions on the current device. Version 2 writes decisions to the shared tracker. Version 3 uses HubSpot as the system of record after access, field mapping, and approval boundaries are confirmed.

## Platforms Not Chosen As The Primary Dashboard

- Google Sites is useful for static information but too limited for a growing approval workflow.
- Manus is useful upstream but would split the operating system away from the GitHub repository.
- GitHub alone is the filing cabinet and change log, not the daily review experience.
