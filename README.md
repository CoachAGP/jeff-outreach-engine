# Jeff Outreach Engine

Private working repository for the Jeff Outreach Engine discovery, design, and implementation project led by Coach Bouf Enterprises LLC / AI Growth Plan.

## Current status

The discovery framework and consolidated working brief are complete. The system is not yet ready for autonomous outreach: Jeff-specific rules, verified interview transcripts, access requirements, and approval boundaries still need to be validated.

Human review remains required before sending outreach, changing sensitive CRM records, scheduling meetings, or communicating with existing clients.

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

1. Produce and validate transcripts for the three interview recordings.
2. Extract confirmed decisions and unresolved questions.
3. Update and re-render the consolidated discovery brief.
4. Confirm the Phase 1 scope, HubSpot fields, approval gates, and acceptance criteria.
5. Build and test the first approval-gated workflow against three to five real prospects.

## Confidentiality

This repository contains confidential business documents, prospect information, commercial records, and interview audio. Keep the GitHub repository private and review collaborator access before inviting anyone.

