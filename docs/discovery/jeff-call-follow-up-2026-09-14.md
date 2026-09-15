# Jeff Outreach Engine Call Follow-Up — September 14, 2026

Status: transcript-validated product decisions, action register, and next-version backlog.

No outreach was sent or approved by this review. Research-route approval and approval of an exact communication remain separate decisions. The current project instruction is to prepare communications for human review and not send outreach.

## Evidence and authority

- The full 39-minute recording supplied by Joe was reviewed.
- The complete machine transcript is stored at [`../../transcripts/jeff-dashboard-review-2026-09-14.srt`](../../transcripts/jeff-dashboard-review-2026-09-14.srt). It has timestamps but no reliable speaker names.
- Video frames were checked at the dashboard queue, company review form, HubSpot contact history, and HubSpot Breeze demonstration.
- Gemini Quick notes and Full notes were used only as a secondary comparison.
- The recording contains feedback, questions, examples, and future-state ideas. It does not override `AGENTS.md`, the no-send instruction, or the required approval gates.

## Executive readout

Jeff likes the dashboard direction, especially the compartmentalized queues and direct research-report links. The main problem is that the current company review form makes him interpret internal workflow states and enter information the system should create. His desired experience is closer to an assistant: show the company, explain the one decision needed, accept a spoken or clicked decision, complete the authorized background work, and return only when another human decision is required.

The next version should keep the complete workflow in the audit trail while simplifying Jeff's surface to three actions:

1. Add or receive a company.
2. Resolve an Athena conflict when one exists, then start eligible research.
3. Review the compact report and approve the route, return it for changes, or hold it.

Message preparation appears only after route approval. An exact message and recipient require a separate approval, and Jeff sends it manually under the current operating rules.

## What the recording confirms

| Time | Evidence | Product implication |
| --- | --- | --- |
| 02:47–05:13 | Joe and Jeff review manual one-company intake alongside ZoomInfo bulk intake. | Keep both manual intake and batch/connected intake. A manual opportunity must not depend on ZoomInfo. |
| 05:33–07:48 | They agree to grade companies before expensive research and deep-research only scores 3–5. | Enforce the preliminary scoring gate: 1–2 stop; 3–5 qualify; priority 5, then 4, then 3. |
| 06:44–06:59 | Jeff proposes checking Athena before research because a claimed account should not consume research effort. | Athena is an early eligibility gate. |
| 07:52–08:34 | Jeff reports that prior ChatGPT work stalled and required repeated prompts. | Every research run needs durable progress, blockers, resume, and completion states. |
| 08:34–14:26 | Jeff needs the stages and fields explained and asks Joe to develop the training offline. | Keep training, but design the interface so training is supporting material rather than a prerequisite for each decision. |
| 14:36–15:26 | Jeff says the queues help him compartmentalize and the report link prevents scrolling through chat. | Keep the queues and report access. Highlight the queues that require human action. |
| 15:35–18:07 | Jeff asks for conversational/voice operation with as little typing as possible. | Add an assistant control that proposes a specific dashboard action and applies it only within the relevant approval boundary. |
| 18:25–21:30 | They discuss eliminating fields and replacing the destination dropdown with a clear next-phase action. | Hide internal state controls from Jeff's normal view. Use a single stage-aware primary action and explicit exception actions. |
| 21:36–24:02 | Jeff says the current conflict language is unclear and wants the system to tell him what the conflict is and what decision is required. | Replace generic conflict dropdowns with an evidence-backed Athena alert and resolution action. |
| 24:10–25:43 | Jeff explains HubSpot is not the account-conflict authority because he is its only operator. | Remove HubSpot and a generic “Jeff check” from the conflict label. HubSpot duplicate detection remains data hygiene, not conflict clearance. |
| 25:43–31:52 | Jeff demonstrates HubSpot/Breeze using prior activity to draft a follow-up, then logging email/call activity and creating a task. | Use HubSpot for history, draft context, activity timeline, and follow-up tasks. New prospects may have no prior history. |
| 31:52–33:40 | They propose a dummy-company integration test and confirm HubSpot should be the eventual sending surface for engagement tracking. | Test only with a clearly labeled internal/synthetic record. Do not treat the conversation as approval to send. |
| 33:42–34:45 | Jeff says he is pleased with the dashboard, wants less information, logos, and access from phone and laptop. | Simplify first; add supplied branding later; preserve responsive behavior. |
| 35:20–36:17 | Joe identifies the missing trigger: scheduled ZoomInfo intake versus manual upload. | Make intake source and trigger status visible. Implement a fallback ladder rather than claiming a live ZoomInfo connection. |
| 36:26–37:11 | They prioritize a HubSpot test before the next ZoomInfo batch and discuss an internal test recipient and extra user seat. | The seat has since been granted and browser access verified. Test-record details, permissions, and API authorization remain open. |

## Decisions versus open proposals

### Confirmed direction

- Keep the queue concept and direct report access.
- Keep one-off company intake in addition to ZoomInfo batch intake.
- Score before deep research; stop scores 1–2 and prioritize 5, 4, then 3.
- Check Athena before deep research.
- Remove routine manual data entry from Jeff's main decision surface.
- Show the current decision and next step in plain language.
- Use HubSpot for history, recordkeeping, activity, and follow-up tasks after access and mapping are tested.
- Preserve human review for every communication.
- Produce a practical training guide.

### Proposed and still requiring validation

- Voice control inside or beside the dashboard.
- Direct scheduled pull from ZoomInfo through a connector or plugin.
- Direct HubSpot write access from the hosted dashboard or Codex.
- Email engagement readback into the dashboard.
- Final product name and logo treatment.

## Remove or move out of Jeff's normal workflow

| Current element | Change | Replacement |
| --- | --- | --- |
| **Try local practice mode** as the first useful action | Move to an admin/test area. | Open in shared mode when connected; otherwise show one connection blocker with an owner and remedy. |
| **Activate / review** | Rename and make stage-specific. | **Start research** for an eligible queued company; show the exact block when it cannot start. |
| **Move to** dropdown | Remove from Jeff's standard view. | One primary next action plus **Return for changes** and **Place on hold** where relevant. |
| Empty **Recommended route** and **Contact / authority findings** inputs before research | Remove from Jeff's edit surface. | Show “Not researched yet” and populate read-only results when the research job finishes. |
| Manual **GitHub report URL** | Remove. | Generate and attach the GitHub report automatically. Keep the link because Jeff explicitly values it. |
| Manual **Research summary** and **Sources and confidence** text areas | Remove from routine review. | Display an expandable evidence summary labeled Verified fact, Reasonable indicator, and Hypothesis. |
| **Pending HubSpot / Athena / Jeff check** | Remove this combined label. | Show **Athena eligibility** separately. Show HubSpot duplicate/history status in the integration area. |
| Routine **Relationship permission**, **QA result**, and **Draft status** dropdowns | Hide unless a real exception needs a human decision. | Derive status from artifacts and rules; surface only the unresolved decision with its evidence. |
| Repeated save controls and confirmation checkbox | Remove from routine progress. | Save authorized system work automatically. Confirm consequential approvals with the exact effect stated on the button. |
| **Sent by AI** metric | Remove. | Show **Needs my decision**, **Research running**, **Blocked**, and **Follow-up due**. |
| Drafts detached from company context | Remove from the general queue. | Place a draft inside the approved company workspace with a separate message-approval card. |

## Enhance in the next functional version

### 1. Decision-first landing page

Open on **Needs my decision**. Each card answers:

- What company is this?
- Why is it here?
- What has the system completed?
- What is blocking it?
- What single decision does Jeff need to make?

The full queue remains one click away.

### 2. Intake triggers

Support a visible trigger ladder:

1. **Manual:** company name required; website, referral context, and source notes optional.
2. **File intake:** approved ZoomInfo CSV/report import into the temporary Google Sheet.
3. **Scheduled intake:** weekly ZoomInfo pull only after the connector is tested inside Jeff's account and the hosted-runtime path is proven.

Every intake records source, time, identity confidence, and duplicate result. A connector visible in Codex does not establish dashboard runtime access.

### 3. Low-cost eligibility gate

1. Normalize company identity and check duplicates.
2. Run the authorized Athena lookup.
3. If Athena shows claimed, excluded, or ambiguous ownership, stop and ask Jeff the specific resolution question.
4. Assign the preliminary score from supplied industry, scale/spend indicators, intent/trigger, and relationship context.
5. Place scores 1–2 on Hold with a short reason.
6. Rank scores 3–5 by score, then source urgency and age.
7. Start deep research only through **Start research** or the approved scheduled-worker rule.

### 4. Durable research jobs

Each run stores:

- queued;
- in progress with current step;
- waiting on access or one clarification;
- failed with a plain-language retry action;
- completed with report and QA links.

A retry resumes after the last completed step and does not duplicate paid research.

### 5. Guided company workspace

Show the stage, preliminary and validated score, Athena result, evidence summary, likely decision-maker, recommended route, report, research/QA progress, and audit history. The main action changes with the stage:

| Stage | Primary action shown to Jeff |
| --- | --- |
| Queued | **Start research** |
| Researching | No approval action; show progress or the precise blocker |
| QA Review | No routine Jeff action; show only an exception requiring his judgment |
| Ready for Approval | **Approve route** |
| Approved | **Prepare message for review** |
| Hold | **Review hold** or **Release hold**, with a reason |

### 6. Conversational control

Accept commands such as “Open Accede Mold & Tool,” “Why is this held?”, or “Move this to the next step.” Translate the request into one proposed action card showing the company, current stage, resulting stage, and any approval effect. Voice is an input option; the auditable dashboard action remains the system event.

Phrases such as “looks good” must not approve both a route and a communication. The assistant asks which artifact is being approved when the context is ambiguous.

### 7. HubSpot role

After access and field mapping are approved, the first integration should prove:

1. Find or create one clearly labeled test company without duplication.
2. Attach a designated internal test contact.
3. Read prior activity when it exists and use it as draft context.
4. Prepare a draft for review.
5. Log an approved manual email or call with correct date, time, type, owner, and content/notes.
6. Create the next follow-up task.
7. Read the activity and task back into the dashboard timeline.

HubSpot is not the Athena conflict check. No external or internal test email will be sent as part of this implementation.

## Detailed action register

### P0 — next dashboard release

| Owner | Action | Acceptance check |
| --- | --- | --- |
| Joe/Codex | Replace the large company form with the guided workspace and stage-aware actions. | Jeff can move an eligible practice record through the full pipeline without selecting a destination status or typing system fields. |
| Joe/Codex | Split Athena eligibility from HubSpot duplicate/history status. | No screen says “HubSpot / Athena / Jeff check”; the reason and source for every stop are visible. |
| Joe/Codex | Add job progress, blocker, retry, and resume state. | Closing and reopening the dashboard does not lose the current step or repeat completed work. |
| Joe/Codex | Add decision-first counts and views. | Jeff can immediately identify every item requiring human action. |
| Joe/Codex | Keep report access and add an in-dashboard report preview. | Jeff can read the compact report without searching chat; the canonical GitHub link remains available. |
| Joe/Codex | Update training materials after the interface change. | The guide teaches the decision flow, sources, and approval boundaries shown in the release. |

### P1 — shared queue and intake

| Owner | Action | Acceptance check |
| --- | --- | --- |
| Jeff/queue owner | Confirm the existing Google Sheet and editor account. | The correct Sheet and owner are documented without exposing credentials. |
| Joe/Codex | Deploy and validate the approved Sheet bridge. | One authorized test record persists across two sessions with revision and audit history intact. |
| Jeff | Provide the recurring ZoomInfo report/export or authorize the supported connector. | A sample intake can be parsed without manual retyping and remains labeled as ZoomInfo-supplied data. |
| Joe/Codex | Add file intake first, then test scheduled intake. | Manual, file, and scheduled sources are distinguishable and idempotent. |

### P2 — HubSpot proof

| Owner | Action | Acceptance check |
| --- | --- | --- |
| Jeff | **Complete:** grant `joe@aigrowthplan.com` a HubSpot seat. | Verified September 14, 2026: Joe can authenticate to portal `241906394` and read the Companies workspace. |
| Joe/Codex + Jeff | Verify the seat's create/edit, note/activity, and task permissions; choose OAuth/private-app access for integration. | A permission matrix is recorded without changing a live prospect. |
| Joe + Jeff | Choose the clearly labeled internal test company/contact and approve the field map. | Test data cannot be mistaken for a real prospect. |
| Joe/Codex | Prove lookup/create, context read, draft preparation, activity logging, task creation, and readback. | The dashboard timeline matches HubSpot and no email is sent. |

### P3 — polish after the loop works

| Owner | Action | Acceptance check |
| --- | --- | --- |
| Jeff | Supply approved Strategic Operations logo files and usage guidance. | Transparent/light/dark assets and naming choice are available. |
| Joe/Codex | Apply branding and mobile QA. | The workflow remains readable and usable on phone and laptop. |
| Joe/Codex | Evaluate voice control against the proven action model. | Spoken actions produce the same reviewable proposal and audit event as clicked actions. |

## Validation cases

### Azure Water Services — research workflow

Use the existing score-3 record in a clearly isolated practice lane. Confirm identity, Athena-unavailable behavior, score priority, each stage transition, QA return, hold/release, persistence, audit history, and the no-message boundary. It may bypass the live backlog only because it is labeled practice data.

### Coach Bouf Enterprises test record — HubSpot workflow

Use `TEST - Coach Bouf Enterprises` or another name Jeff and Joe explicitly designate. Prevent duplicates, create/read the internal contact, prepare but do not send a draft, log a synthetic/manual activity only if it is clearly labeled, create a follow-up task, and verify dashboard readback. Do not use “Coach Proof Enterprises”; that name came from transcription error in the earlier notes.

## Integration credentials and decisions only Jeff can supply

- The correct existing Google Sheet URL and an authorized editor/owner for Apps Script authorization.
- Jeff's reviewer identity and access to the private dashboard.
- An approved Athena lookup method and the meaning of claimed, excluded, stale, and ambiguous records.
- ZoomInfo authorization in Jeff's account or the exact recurring report/export format.
- **Received and verified:** the HubSpot seat for `joe@aigrowthplan.com`, including authenticated browser access and read access to the Companies workspace.
- Still needed for HubSpot integration: confirmed create/edit, note/activity, and task permissions plus approved OAuth or private-app authorization. A browser seat alone does not provide a dashboard API credential. Passwords should not be shared or committed.
- The minimum HubSpot permission set and approved owner/field mapping.
- The exact internal test company/contact identity. Any later send test needs a separate approval of the exact recipient and message.
- Strategic Operations logo files and usage rules.
- Screenshots or exports of the prior ChatGPT stalls so the failure and last completed step can be reproduced.

The Sheet bridge also requires a deployment URL, a server-side secret, and a reviewer allowlist. These are configuration outputs owned by the authorized Sheet editor and must never be committed to GitHub or exposed in browser code.

## Definition of done

Jeff can add or receive a company, see its source and preliminary score, understand any Athena stop, start eligible research, leave the dashboard while work continues, return to a compact report, and approve or hold the route through one clear action per decision. GitHub remains canonical for code, rules, reports, documentation, and releases. The existing Google Sheet holds beta queue state. HubSpot supplies history and activity only after the test passes. Every message remains separately reviewable and manually sent.
