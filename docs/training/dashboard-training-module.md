# Jeff Outreach Engine — Training Module and Company Test

**Audience:** Jeff and authorized research/review support
**Duration:** 30 minutes, plus live-integration testing once access is configured
**Facilitator:** Joe Bouffard or the designated trainer
**Updated:** September 11, 2026
**Practice company selected by Joe:** Azure Water Services

## Learning outcomes

By the end, the learner can identify each field's source, separate evidence from assumptions, explain the preliminary score gate, save a review without accidentally activating research, and recognize where Jeff's decision is required. Completion means accurate records and correct blocking behavior, not forcing a company to Approved.

Use the [Field Guide](dashboard-field-guide.md) alongside the dashboard. All real-company examples remain pending wherever evidence or permission is missing.

## Lesson 1 — Know where changes go (3 minutes)

Show the connection banner. Explain disconnected, shared and practice modes. Ask the learner to identify the current mode before clicking anything.

For training, use **Try local practice mode**. It is a separate device-local queue. Do not interpret practice history as a shared record or real approval. No practice data automatically becomes live data.

Trainer prompt: “If you save a practice change here, can Jeff see it on another computer?” Correct answer: No. Shared visibility requires the configured shared queue and access, followed by verification.

## Lesson 2 — Start with identity and provenance (5 minutes)

Search **Azure** under Find company. An existing Azure Water Services intake record is already present, so use **Activate / review** rather than Add opportunity. Explain the five intake fields using the Field Guide: company name, optional website, source details, preliminary score and score reason.

Open Add opportunity only to demonstrate an empty form, then close without creating a duplicate. Explain that unscored intake lands on Hold. Show that the ZoomInfo intent number from an input report must not be copied into the 1–5 fit score.

Trainer prompt: “Does a company name alone trigger research?” Correct answer: No. It can create an unscored record for preliminary review; qualifying score and activation are separate.

## Lesson 3 — Test the priority gate using Azure (5 minutes)

Azure's existing preliminary score is 3/5. Do not raise it to make the test easier. Opening a Queued record preselects Researching; the save is the action that attempts activation.

1. Confirm practice mode and Azure's current Queued/3 state.
2. Note any higher-scored companies still Queued.
3. Attempt **Move to: Researching → Save practice change**.
4. Expect an error while higher-score queued work exists. Confirm Azure remains Queued.
5. Select **Move to: Queued** before saving preliminary notes.

Actual September 11 observation: Azure's activation attempt was rejected with the score-priority message. This is a successful gate test, not a failed research task. The current error may name the first higher-score record in data order rather than the queue's maximum score. The rule remains 5, then 4, then 3.

Do not hold unrelated records or inflate scores to make a test pass. If the business needs a deliberate one-company pilot exception, define and approve an explicit exception mechanism in a later product change. Version 4 has no such override.

## Lesson 4 — Fill the research fields honestly (7 minutes)

Open the [Azure preliminary pilot notes](../discovery/opportunity-report-azure-water-services.md). Use it as a provenance and uncertainty example, not as completed deep research.

Walk through the review fields in screen order:

1. **Recommended route:** what approach is proposed and what remains unvalidated.
2. **Contact / authority findings:** what is known about identity, role and purchasing authority; unknown is acceptable as a finding, but not a reason to pass substantive QA.
3. **GitHub report URL:** an actual project file that opens and matches this company.
4. **Research summary:** facts, indicators, hypotheses and gaps.
5. **Sources and confidence:** claim-by-claim sources/dates, preserving the original intake provenance.
6. **Conflict checks:** actual Jeff/internal clearance; leave pending without it.
7. **Relationship permission:** actual permission or a truly non-relationship route; never infer approval from a connection.
8. **QA result:** the result of a review, not a button that runs the review.
9. **Draft status:** what actually exists. Azure has no draft from this pilot.
10. **Next action / open questions:** what remains, who owns it and what resolves it.
11. **Move to:** choose Queued when only saving Azure's preliminary notes under the current priority blocker.
12. **Decision or hold reason / human checkbox:** the reason for the specific action and evidence of Jeff's decision when required. Do not check approval for Azure.

Point out the separate scoring panel. **Save preliminary score** saves scoring only and closes the review; it does not save other pending research-form edits.

## Lesson 5 — Know the approval boundary (5 minutes)

Ask the learner to explain the difference among QA Review, Ready for Approval and Approved.

- QA Review means research is presented for review; it does not mean it passed.
- Ready for Approval requires a completed QA pass, Jeff's conflict clearance and approved/not-applicable relationship permission.
- Approved means Jeff approved the research route. A particular message still requires his separate approval.

For Azure, leave QA Not reviewed, conflict checks pending, relationship permission pending and draft status Not drafted. The real-company exercise should stop at the actual evidence/priority boundary. Do not enter fictional clearances into a real-company record, even to demonstrate the later screens.

For a later isolated full-path software rehearsal, use a clearly fictional record in an isolated practice dataset. Use synthetic evidence labeled throughout and never transfer simulated approvals to the real queue. Such an isolated full-path exercise is not part of the Azure result below.

## Lesson 6 — Verify the result (5 minutes)

After saving Azure's preliminary notes, reopen the same record and check the saved values, state, score and Activity history. Reload only after confirming all edits are saved; confirm the record persists on this device. This tests practice persistence, not Google Sheets.

Ask the learner to name the next actionable blocker. For this pilot: higher-score queue priority plus unverified scale/authority and pending Jeff-account checks. Correct behavior is to preserve those gaps.

## Real-company live pilot: once connected

This is a planned test, not a completed one. Use Azure only when queue priority legitimately permits activation or an explicitly approved exception mechanism exists.

| Test | Procedure | Pass condition |
|---|---|---|
| Shared identity | Sign in as each authorized reviewer and read the same queue | Both sessions see Azure's same current revision/state. |
| Successful save | Save a real, evidence-supported note from session A; refresh B | B shows the same note and attributed activity event. |
| Stale edit | Open the same revision in A and B; save A, then attempt an outdated B change | B is rejected; A's change remains intact. Copy unfinished notes before refreshing. |
| Activation | Activate Azure when score/priority permit | Exactly one persisted transition to Researching. |
| Evidence gate | Attempt QA with one required evidence field omitted | Rejected; no stage advance. Restore only real evidence. |
| Permission gate | Attempt Ready with conflict/relationship review pending | Rejected; no false clearance. |
| Human decision | Jeff reviews the completed real report and states a route decision | Record that decision only then, with its scope and reason. |
| Outreach separation | Inspect draft status and permissions after route approval | No sending occurs; exact message approval remains separate. |

Do not simulate network failures by interrupting real saves. If an actual response is uncertain, inspect the saved state/history before retrying.

## Knowledge check and answer key

1. A company has intent score 64. What is its dashboard fit score? **Not determined by 64; use the independent 1–5 fit assessment.**
2. You changed an unscored Hold to 4/5. Is it automatically Queued? **No. A separate human-reviewed hold release is required.**
3. You found a current CFO on a company page. Are conflicts cleared? **No. Role evidence and conflict checks are different fields/sources.**
4. Does a LinkedIn connection permit a mutual-contact mention? **No. Jeff's specific permission is required.**
5. Does QA Pass mean the message may be sent? **No. Every communication needs separate human approval.**
6. What does successful practice persistence prove? **That device-local saving worked, not shared Sheet integration or cross-account visibility.**

Suggested training completion standard: all six answers correct, provenance and gaps recorded accurately, and no false advancement or approval. The facilitator records completion; the dashboard does not issue a training certificate.

## Test log — September 11, 2026

- Selected company: Azure Water Services, existing record, preliminary 3/5.
- Environment observed: published version 4 in Chrome, device-local practice mode.
- Existing work preserved: other practice records were not reset or changed.
- Activation gate: observed rejection while higher-score records remained Queued.
- Research scope: official-site identity/triage only; no deep research triggered.
- QA / conflict / relationship / draft: pending or not reviewed; no approvals granted.
- Shared queue, cross-account persistence and automated ZoomInfo: not tested; connection remains pending.
- Detailed source notes: Azure preliminary pilot report.

Keep this log factual. Do not mark the entire live workflow passed based on the priority rejection alone.
