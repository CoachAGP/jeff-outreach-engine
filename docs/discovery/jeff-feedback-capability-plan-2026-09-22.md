# Jeff Feedback: Capability Plan and Beta Tests

Date: September 22, 2026. Status: prioritized build and test plan; capabilities below are not claimed as implemented.

## What Jeff Confirmed

Jeff values the branded review dashboard, but the engine's main job is to turn ZoomInfo and LinkedIn Sales Navigator alerts into action, reveal credible warm paths, prepare him for meetings, and reduce post-meeting documentation. Pipeline coaching remains in scope. He expects to keep drafting and sending many messages in HubSpot Breeze, which already uses contact history well. He does not want another paid HubSpot seat for the beta. His existing SOS email remains the usual communication address; the iCloud message was used to send large recordings.

## Evidence Reviewed

- Jeff's written feedback accompanying two September 22 screen recordings.
- Athena recording: the visible AI ERA Insight example presents account verification, company size and footprint, strategic focus, financial and cost-pressure signals, estimated addressable spend by category, decision makers, and a recommended first contact. The sample is lengthy. Its spend and savings figures are estimates, not verified opportunities.
- HubSpot Breeze recording: the visible contact-history workflow reads recent activities, prepares a follow-up draft, and creates a follow-up task in HubSpot. This is a strong benchmark for contextual drafting and documentation in the system Jeff already uses.
- Existing operating rules in `AGENTS.md`, the workflow runbook, and the input/output guide. The early repository includes discovery questionnaires, an example prospecting email, and a consolidated brief; an ERA-specific meeting-preparation playbook has not yet been identified by filename.

The recordings were reviewed visually. Their raw files and any contact details visible in them should not be committed to this repository.

## Current Baseline

The published dashboard holds three prepared company reviews in a read-only snapshot. It links GitHub reports and shows drafts, QA, and pending human checks. It does not ingest alerts, map mutual connections, query Jeff's HubSpot or Athena account, write CRM notes or tasks, accept voice instructions, or coach a live pipeline. The connected HubSpot account used for the prior read-only check was Joe's, so that check does not establish Jeff's account status or permissions.

## Build Order and Acceptance

| Priority | Capability | First useful output | Beta acceptance check |
| --- | --- | --- | --- |
| 1 | Actionable alert intake | One deduplicated queue combining ZoomInfo and Sales Navigator signals, each with source, date, topic, preliminary fit, and next action | Process one Tuesday ZoomInfo batch plus one Sales Navigator alert. Show the top five to research and top three to deep review; scores 1-2 stop before deep research. Account for every input and show missing data. |
| 2 | Relationship mapping | For each reviewed account, show named buyer, mutual connection or warm path, source, recency, confidence, and the precise introduction decision Jeff must make | Test three accounts. Correctly show "no verified warm path" when access or evidence is missing. Jeff confirms any relationship use before an introduction is requested. |
| 3 | ERA-style account insight and meeting prep | One concise, sourced account brief with operating context, plausible spend categories, decision path, targeted discovery questions, likely objections, and open questions | Compare the same company against Athena's AI ERA Insight with Jeff. He rates usefulness, accuracy, time to review, and missing fields. Label hypotheses and estimates; do not present projected savings as found savings. |
| 4 | HubSpot documentation through Jeff's access | Approved note, follow-up task, and record links attached to the correct company/contact | Jeff runs the test in his existing Codex and HubSpot access. Verify record identity, associations, saved content, owner, due date, and duplicate behavior in HubSpot. No extra paid seat is assumed. |
| 5 | Voice-led post-meeting support | From Jeff's dictated recap: factual summary, decisions, objections, action items, HubSpot note/task proposal, and follow-up draft | Use one consented sample meeting. Jeff corrects the recap, approves CRM writes and any outgoing message, then confirms the saved HubSpot records match his instructions. |
| 6 | Pipeline coaching | A short weekly list of stalled deals, missing next steps, and suggested actions grounded in CRM history | Run against Jeff's actual pipeline read-only. Jeff judges whether the top priorities are useful and whether any existing owner or client relationship was missed. |

## Integration Decisions

- Keep GitHub as the playbook and report repository. HubSpot should hold operational contact, company, task, note, and deal history after Jeff approves the field map and write behavior.
- Keep the dashboard as Jeff's action queue and evidence view. Avoid duplicating Breeze's message editor unless the dashboard offers a clear time saving. Link or hand off to the relevant HubSpot record when Jeff chooses to act there.
- For the first alert test, use Jeff-forwarded emails or exported alert files. Direct Outlook access is restricted in this workspace. Decide on scheduled retrieval only after an approved source and authentication route are proven in Jeff's environment.
- Athena parity is a comparison test, not an assumption that its internal data can be copied. Use its report structure as a benchmark, then identify which sections require licensed Athena data, public research, or Jeff's confirmation.
- Voice can begin with Jeff dictating or supplying an audio recap to his Codex task. Test transcript accuracy and approval before automating CRM writes.

## Next Jeff Session

1. Have Jeff provide one recent ZoomInfo intent batch, one Sales Navigator alert, and one Athena AI ERA Insight report or a company he can open in Athena. The two screen recordings already provided are sufficient to define the first comparison rubric.
2. In Jeff's Codex account, confirm HubSpot and any Athena/LinkedIn/ZoomInfo connections available to him. Use his existing license. Record read and write capabilities separately.
3. Choose one existing HubSpot company/contact and a clearly identified test note/task. Agree on the exact record, content, owner, and due date before saving; then verify the result in HubSpot.
4. Run one account through alert intake, relationship mapping, account insight, and meeting prep. Jeff scores correctness, actionability, reading time, and credit use.
5. Use a separate sample meeting recap for the voice and post-meeting test. Hold pipeline coaching until the first CRM read and note/task test works reliably.

## Success Measures

Track minutes Jeff spends reading and documenting per account, credits used per batch, percentage of alerts correctly triaged, share of relationship paths backed by a source, CRM write accuracy, and number of corrections Jeff must make. A good beta reduces work without hiding uncertainty or creating duplicate CRM activity.
