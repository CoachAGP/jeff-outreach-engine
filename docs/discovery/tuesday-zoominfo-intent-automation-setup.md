# Tuesday ZoomInfo Intent Automation Setup

Status: beta automation setup prompt.

Purpose: let Jeff set up a recurring Codex check of the ZoomInfo intent emails that arrive in his email folder.

## Schedule

Run every Tuesday at 11:00 AM Eastern.

## Email Folder

Look in Jeff's Outlook account at:

`https://outlook.office.com`

Then use the folder under:

`Era Group > Zoom Info Intent`

Expected volume: usually three to four ZoomInfo emails on a given Tuesday.

## Automation Goal

The automation should create an intake summary only. It should not send outreach or make system changes.

For each relevant email, extract:

- Company name
- Intent topic
- ZoomInfo score
- Source email/date
- Visible links
- Visible recommended contacts or account signals, if present

Then produce:

- Initial fit score from 1 to 5
- Priority
- Status: research, hold, reject, or needs clarification
- Reason
- Recommended next action
- Top five companies for research
- Top three companies for deeper opportunity reports

## Guardrails

Codex must not:

- Send outreach.
- Reply to emails.
- Request introductions.
- Update HubSpot or Athena records.
- Use paid ZoomInfo credits or exports unless Jeff explicitly approves.
- Treat ZoomInfo data as verified fact.

ZoomInfo data should be labeled as source-provided indicators until independently verified.

## Copy/Paste Prompt For Jeff's Codex

```text
Create a recurring Codex automation called Tuesday ZoomInfo Intent Intake.

Run it every Tuesday at 11:00 AM Eastern.

Each run should look in my connected email account for the folder:

Era Group > Zoom Info Intent

This folder is available in my Outlook account at outlook.office.com.

Find the most recent ZoomInfo intent emails from the current Tuesday intake window. There are normally three to four emails.

For each relevant email, extract the visible companies, intent topics, intent scores, dates, links, and any visible recommended contacts or account signals.

Treat ZoomInfo data as source-provided indicators, not verified facts.

Do not send outreach.
Do not reply to emails.
Do not request introductions.
Do not update HubSpot or Athena records.
Do not use paid ZoomInfo credits or exports unless I explicitly approve.

Create a concise intake summary with:
- Company name
- Intent topic
- ZoomInfo score
- Source email/date
- Initial fit score from 1 to 5
- Priority
- Status: research, hold, reject, or needs clarification
- Reason
- Recommended next action

Recommend the top five companies for research and the top three companies for deeper opportunity reports.

Use the Jeff Outreach Engine rules in:
- AGENTS.md
- docs/discovery/jeff-beta-workflow-runbook.md
- docs/discovery/agent-skill-prospect-fit-scoring.md
- docs/discovery/agent-skill-compliance-qa-check.md

Keep the workflow report-first and approval-gated.
```

## Validation Prompt After Setup

```text
Confirm the Tuesday ZoomInfo Intent Intake automation is active.

Tell me:
1. The schedule.
2. The email folder it will check.
3. What it will produce.
4. What it is not allowed to do.
5. Whether any email, ZoomInfo, HubSpot, or repository access is still missing.
```

## First Manual Test Prompt

Use this before relying on the recurring run:

```text
Run the Tuesday ZoomInfo Intent Intake process once manually for the latest emails in:

Era Group > Zoom Info Intent

Use my Outlook account at outlook.office.com.

Do not send outreach or update any external system.

Return the intake summary, top five research candidates, top three deep-report candidates, and any access issues.
```
