# Jeff Outreach Engine

Private working repository for the Jeff Outreach Engine discovery, design, and implementation project led by Coach Bouf Enterprises LLC / AI Growth Plan.

## Current status

The three-company dashboard beta is published with linked reports and drafts. It is currently a read-only review snapshot. Alert intake, Jeff-account HubSpot documentation, relationship mapping, meeting support, and pipeline coaching are the next capabilities to build and test. See the [September 22 capability plan](docs/discovery/jeff-feedback-capability-plan-2026-09-22.md).

Human review remains required before sending outreach, using a relationship path, changing meaningful CRM fields, or scheduling meetings.

## Repository map

- `docs/discovery/` — questionnaires, planning documents, and the consolidated source-of-truth brief
- `docs/contracts/` — agreements and NDA reference documents
- `docs/reference/` — example emails and sales-technology reference material
- `docs/financial/` — project financial records
- `data/` — target and intent data workbooks
- `audio/interviews/` — original discovery recordings
- `scripts/` — utilities for document generation, extraction, review, and transcription
- `artifacts/rendered-brief/` — rendered PDF and page images used for visual QA
- `transcripts/` — validated transcript outputs when available
- `dashboard/` — source and tests for the published company review dashboard

## Important evidence rule

Planning documents, questionnaires, and untranscribed recordings are not validated operating rules. Audio-derived claims should only be added to the master brief after transcription and review. Record decisions as: Trigger, Decision, Rule, Action, Exception, and Confidence.

## Working locally

Use Python 3. The document build script requires `python-docx`; the contact-sheet script requires Pillow. MLX Whisper transcription requires a compatible Apple Silicon/Metal environment and its own local dependencies, which are intentionally excluded from Git.

```bash
python3 scripts/build_consolidated_brief.py
python3 scripts/extract_docx.py
python3 scripts/make_contact_sheet.py
```

Transcription example:

```bash
python3 scripts/transcribe_with_mlx.py \
  "audio/interviews/Section 5.m4a" \
  --out "transcripts/section-5"
```

## Next build phase

1. Test a combined ZoomInfo and Sales Navigator alert intake with Jeff's latest examples.
2. Show sourced warm paths and compare one account brief with Athena's AI ERA Insight.
3. Test one approved HubSpot note and task through Jeff's existing access.
4. Pilot meeting preparation, voice recap, and pipeline coaching against real Jeff workflows.

## Confidentiality

This repository contains confidential business documents, prospect information, commercial records, and interview audio. Keep the GitHub repository private and review collaborator access before inviting anyone.

