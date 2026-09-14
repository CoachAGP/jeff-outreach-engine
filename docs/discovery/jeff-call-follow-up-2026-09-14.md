# Jeff Outreach Engine Call Follow-Up — September 14, 2026

Status: product decisions and implementation backlog for the next dashboard version.

No outreach was sent or approved by this review. Approval of a company route remains separate from approval of a specific communication.

## Evidence reviewed

- [Gemini meeting notes](https://docs.google.com/document/d/1_vDrSmYL6d71EIF_TipbOsDgfCxco-5NtiOD9hClB58/edit), including the Quick notes and Full notes tabs.
- The three screenshots embedded in the Full notes tab: the live research queue, the training guide, and the current company review form.
- The linked 39-minute Google Meet recording. The recording is accessible in Joe's Google account, but Google Drive had not finished creating a transcript during this review. Timestamp-level conclusions remain pending until that transcript is available.
- The current dashboard, training guide, workflow rules, tests, Google Sheet adapter, and HubSpot/Athena handoff documentation in this repository.

## Decisions from the call

1. Keep the dashboard's compartmentalized queue. Jeff prefers this structure over the earlier chat-only presentation.
2. Make the normal experience conversational. Jeff should tell the assistant what company to add or what decision he wants to make, then review compact decision cards.
3. Grade companies before deep research. Scores 1–2 stop; scores 3–5 qualify and remain prioritized 5, then 4, then 3.
4. Add an Athena check near the beginning of the workflow so known, claimed, excluded, or conflicting accounts do not consume deep-research effort.
5. Reduce manual data entry. Jeff should make decisions; the system should populate research, evidence, status, and audit fields.
6. Replace generic dropdown-driven phase movement with a clear next action for the current stage.
7. Use HubSpot for the eventual company/contact record, activity timeline, follow-up task, and engagement tracking. GitHub remains canonical for code, rules, reports, and release history. Google Sheets remains the shared beta queue until the HubSpot mapping is approved and tested.
8. Use a dummy HubSpot company named **Coach Proof Enterprises** for integration testing.
9. Keep every outgoing communication behind a separate human approval. The dashboard must not treat research approval as permission to send.

## Product diagnosis

The beta proves the workflow rules, but it currently asks Jeff to act like the database operator. The screenshot of the review form shows twelve research and workflow controls at once, including a report URL, research narrative, sources, conflict status, relationship permission, QA result, draft status, next action, destination status, a decision reason, and a confirmation checkbox. That is the main source of friction.

The disconnected/shared/practice-mode choice also appears before Jeff can do useful work. In the meeting screenshot, the dashboard says the shared queue is not connected, requires local practice mode, and still disables **Activate / review** for the selected test company because higher-scored records exist. The system is enforcing a technical state and a global priority rule without giving Jeff one obvious next step.

The next version should behave as a guided operating queue: the system gathers and stores evidence, explains the next decision, and Jeff chooses one of a few plain-language actions.

## Remove or move out of Jeff's main workflow

| Current feature | Change | Replacement |
| --- | --- | --- |
| **Try local practice mode** as a primary production action | Remove it from the normal Jeff-facing header. Keep an admin-only sandbox for training and regression tests. | The dashboard connects to the shared queue automatically or shows one precise connection blocker with an owner and remedy. |
| **Activate / review** label | Remove the ambiguous label. | Use the stage-specific action **Start research** when the company is eligible. If it is blocked, show the exact reason on the button/card. |
| **Move to** dropdown | Remove it from Jeff's approval view. | Show one primary next-phase button and one secondary exception action: **Start research**, **Send to QA**, **Ready for my approval**, **Approve route**, **Return for edits**, or **Place on hold**. |
| Manual **GitHub report URL** field | Remove it from Jeff's form. | Generate the report in GitHub and attach the link automatically. |
| Manual **Research summary**, **Sources and confidence**, **Contact / authority findings**, and **Recommended route** fields | Remove them from Jeff's default edit surface. | Agents/researchers populate structured evidence. Jeff sees a compact read-only summary with an expandable evidence drawer and can request a correction conversationally. |
| Manual **Conflict checks** dropdown | Remove routine manual interpretation. | Run the authorized Athena and HubSpot checks automatically. Show **Clear**, **Possible conflict — Jeff decision needed**, or **Unavailable — access required**, with evidence and timestamp. |
| Manual **QA result** and **Draft status** dropdowns | Remove them from Jeff's decision form. | Derive these states from completed QA and draft artifacts. A reviewer can return an item with a short reason. |
| Separate **Save preliminary score** and **Save to shared queue** actions | Remove the two-save pattern. | Save system-generated work automatically; a stage decision saves and advances in one action. |
| Repeated human-confirmation checkbox | Remove routine checkbox friction. | Require a clear confirmation only on consequential decisions. Display the exact effect before **Approve route**, **Release hold**, or approving a communication. |
| **Sent by AI** counter fixed at zero | Remove it from the operational summary. | Show useful work counts: **Needs my decision**, **Research in progress**, **Blocked**, and **Follow-up due**. |
| Standalone **Existing message drafts** section | Remove it from the bottom of the research queue. | Put a draft inside the company card only after the route is approved. Keep message approval separate and prominent. |
| Long training guide as the way to understand normal operation | Move it to Help/training. | The current card tells Jeff what the field means, where the data came from, and what decision is needed. |

## Enhance in the next version

### 1. Conversational intake and commands

Add an assistant panel where Jeff can use plain requests such as:

- `Add Azure Water Services from this ZoomInfo report.`
- `Show me the companies waiting on my decision.`
- `Why is this company on hold?`
- `Approve the research route and prepare a draft for my review.`

The assistant should convert the request into a proposed action, show the affected company and result, and require Jeff's confirmation when the action clears a conflict, releases a hold, approves a route, changes a meaningful HubSpot field, or approves a communication.

### 2. One-field opportunity start

Keep a visible **Add company** option for Jeff, but require only the company name. Website, ZoomInfo link/report, referral context, and notes are optional source inputs. The system should:

1. Normalize the company name and look for duplicates.
2. Check the temporary Google Sheet, then authorized HubSpot and Athena sources.
3. Ask one targeted clarification only when identity is ambiguous.
4. Produce the preliminary score and reason.
5. Place scores 1–2 on Hold and scores 3–5 in the ranked queue.

### 3. Low-cost gate before research

The order of work should be:

1. Intake and identity normalization.
2. Duplicate, client, ownership, opt-out, and conflict checks in the Google Sheet, HubSpot, and Athena when available.
3. Preliminary fit score from available industry, operating scale/spend indicators, intent/trigger, and relationship context.
4. Stop scores 1–2 with a short reason.
5. Queue scores 3–5 by score, then source urgency and age.
6. Run deep research only after activation.

For production work, priority remains 5, then 4, then 3. A separate clearly labeled sandbox record may bypass the live backlog for a controlled integration test without changing the real priority order.

### 4. Guided company workspace

Each company should have one workspace with:

- Current stage and the single next action.
- Preliminary and validated scores with short explanations.
- Conflict status, source, timestamp, and any decision needed.
- Three-part evidence summary: **Verified fact**, **Reasonable indicator**, and **Hypothesis**.
- Recommended route and decision-maker confidence.
- Research/QA progress and an explicit blocker if work cannot continue.
- Automatically attached GitHub report.
- HubSpot activity timeline when connected.
- Draft approval card only after the route is approved.

### 5. Reliable background work

The system should not depend on Jeff repeatedly telling chat to continue. Each research run needs a durable job state:

- queued
- in progress, with current step
- waiting on access or clarification
- failed, with retry/resume action
- completed, with output links

Store each step, timestamp, source, and blocker. A retry resumes from the last completed step rather than restarting paid research.

### 6. HubSpot integration with approval controls

The first integration should support the Coach Proof Enterprises test account and prove:

1. Find or create the test company without creating a duplicate.
2. Attach a designated internal test contact.
3. Create a draft follow-up for review.
4. Log a note or activity with the correct timestamp and owner.
5. Create a follow-up task.
6. Read the result back into the dashboard activity timeline.

No prospect email is part of this test. If an internal test email is later used to validate open/click tracking, Jeff must first approve the exact recipient and message. Delivery must occur through HubSpot so HubSpot can record the engagement.

### 7. Source and system-of-record clarity

| Information | Source of truth during beta | Later state |
| --- | --- | --- |
| Code, scoring rules, reports, documentation, releases | GitHub | GitHub |
| Shared queue and transition history | Google Sheet | HubSpot after approved migration |
| Company/contact/activity/follow-up records | Pending/manual | HubSpot |
| ERA conflict and account ownership | Pending/manual | Athena through an authorized read-only lookup or approved integration |
| Intent and enrichment signals | Pasted/exported ZoomInfo data, labeled as indicators | Authorized ZoomInfo connection, still labeled until independently verified |
| Message send, opens, and clicks | No dashboard sending | HubSpot after exact communication approval |

## Implementation backlog

### P0 — prove the operating loop

| Owner | Action | Acceptance check |
| --- | --- | --- |
| Joe/Codex | Replace the large review form with stage-specific decision cards and context buttons. | Jeff can move an eligible test record through Queued → Researching → QA Review → Ready for Approval → Approved/Hold without using a status dropdown. |
| Joe/Codex | Move practice mode out of the normal production header and replace connection ambiguity with an exact blocker. | Jeff sees either a connected queue or one actionable access/configuration message. |
| Joe/Codex | Add conversational company intake plus one-field manual fallback. | `Add <company>` creates or identifies one record and returns a score/hold result without requiring Jeff to complete research fields. |
| Joe/Codex | Automate report linking, system statuses, timestamps, and activity history. | Jeff does not type a GitHub URL, QA status, or draft status. |
| Joe/Codex | Add durable research-step status, blockers, and resume behavior. | A failed or access-blocked run names the step and can resume without duplicating completed work. |
| Jeff | Create the **Coach Proof Enterprises** test company and assign Joe a HubSpot test seat/license. | Joe can see the test portal/company with the agreed least-privilege access. |
| Jeff + Joe | Approve the HubSpot beta field map and test boundaries. | Company, contact, note/activity, task, owner, timestamps, and dashboard readback have documented mappings. |

### P1 — connect the operating systems

| Owner | Action | Acceptance check |
| --- | --- | --- |
| Jeff/ERA | Provide an approved Athena lookup method and define what counts as a conflict. | The dashboard can return clear, possible conflict, or unavailable with source and timestamp. |
| Jeff | Authorize ZoomInfo access or provide the supported report/export path in Jeff's account. | Intake captures company identity, intent, and relevant indicators without manual retyping. |
| Joe/Codex | Implement HubSpot company/contact lookup, draft preparation, activity logging, task creation, and readback. | The Coach Proof Enterprises test completes without duplicate records or prospect outreach. |
| Joe/Codex | Add an internal-only HubSpot engagement test plan. | Exact recipient/message approval is captured before any test send; open/click events appear in HubSpot if the account supports them. |

### P2 — polish after the loop works

| Owner | Action | Acceptance check |
| --- | --- | --- |
| Jeff | Send the Strategic Operations logo files and usage guidance. | Approved light/dark or transparent assets are available. |
| Joe/Codex | Apply the approved branding after workflow changes stabilize. | Dashboard remains readable on desktop and mobile. |
| Joe/Codex | Update the training module to match the simplified interface. | Training teaches decisions and sources rather than manual field completion. |

## Two-company validation plan

### Test A — Azure Water Services: research workflow

Use the existing Azure Water Services test record to validate the score-3 path without external writes:

1. Confirm the identity and existing preliminary evidence.
2. Confirm that the record is eligible but lower priority than score-5 and score-4 production records.
3. Run it in the isolated sandbox lane.
4. Verify each stage transition, research blocker, QA return path, hold path, persistence, and audit history.
5. Stop before any communication.

### Test B — Coach Proof Enterprises: HubSpot integration

1. Connect with the approved test seat and authorization.
2. Look up the test company and prevent duplicates.
3. Create/read back a test contact, note/activity, and follow-up task.
4. Prepare a draft addressed only to an approved internal test recipient.
5. Confirm that route approval did not approve the message.
6. Stop before sending unless Jeff separately approves the exact internal test send.
7. If approved, send through HubSpot and verify timestamp, open/click tracking availability, and dashboard readback.

## Access and materials only Jeff can supply

- HubSpot test portal access: Joe's assigned seat or invitation plus approved OAuth/private-app authorization. Do not send passwords in chat.
- Approval of the minimum HubSpot permissions for company/contact lookup and creation, notes/activities, tasks, ownership, and the later internal email-engagement test.
- The **Coach Proof Enterprises** test company details and the approved internal test contact/recipient.
- Athena access or an authorized read-only lookup/export method, plus the ERA definition of client, claimed account, owner conflict, exclusion, and stale record.
- ZoomInfo access in Jeff's account, an approved connector/API authorization, or the exact recurring export/report format.
- The Strategic Operations logos and any color/usage rules.
- The referenced cheat sheet documents; no file with “cheat sheet” in its name is currently present in this repository.
- Screenshots or printouts of the ChatGPT stalls/errors, including the task prompt, last completed step, error text, and approximate time.

The Google Sheet bridge also requires an authorized Apps Script deployment URL, a bridge secret stored as a server-side secret, and the reviewer email allowlist. These values must never be committed to GitHub or placed in browser code.

## Open questions for the next working session

1. Should Jeff's normal landing view be **Needs my decision**, with the full queue one click away?
2. Which Athena states are hard stops, and which require Jeff's judgment?
3. Should a score change require a reason only when Jeff overrides the system recommendation?
4. Which HubSpot user owns new records and follow-up tasks during the test?
5. Is the first HubSpot test limited to create/read/log/task, or does Jeff want a separately approved internal email tracking test in the same session?
6. Where are the cheat sheet documents referenced in the meeting?
7. When Google finishes generating the recording transcript, does any timestamped statement change these product decisions or add a missed commitment?

## Definition of done for the next version

Jeff can type a company name, see the source and preliminary score, understand why it is queued or held, start eligible research, monitor progress without prompting chat to continue, review a compact evidence-backed route, and approve or hold it through one clear action per phase. The Google Sheet records the beta state, GitHub holds the report and rules, and the Coach Proof Enterprises HubSpot test proves read/write activity logging. No communication can be sent without a separate approval of the exact message and recipient.
