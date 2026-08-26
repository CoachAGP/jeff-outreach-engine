# Jeff Outreach Engine Beta Launch Task Plan

Status: working beta plan for human review.

Goal: get to a safe, approval-gated beta outreach workflow as quickly as possible without allowing AI to independently contact prospects, modify sensitive CRM records, or make unsupported savings claims.

## Beta Definition

The beta is ready when the team can take 10-25 candidate companies, run them through an AI-assisted research and qualification workflow, produce human-reviewed outreach drafts, and track outcomes in HubSpot without autonomous external communication.

The first beta should prove:

- AI can research and score target companies consistently.
- AI can identify likely CFO/owner/controller contacts with confidence levels.
- AI can identify relevant spend-category hypotheses without claiming overspending.
- AI can draft concise, compliant outreach for human approval.
- Humans can approve, edit, send, and track outreach without losing control.
- HubSpot can hold the necessary research, scoring, status, and task fields.

## Operating Constraints

- No autonomous external communication.
- No savings promises.
- No claim that a prospect is overspending without validated data.
- No AP data request or handling outside the approved secure process.
- No named relationship lead may be used without explicit human approval.
- HubSpot is the system of record.
- Transcript-derived rules remain provisional until validated by Jeff or the project owner.

## Fastest Practical Timeline

Recommended accelerated path: 3 days.

Two days is possible for a controlled beta test if scope stays narrow, HubSpot remains manual/unknown, and the first run uses 3-5 prospects only. Three days is the better target for a beta Jeff can actually review and repeat.

## Accelerated 2-Day Beta Option

Use this only if speed matters more than polish.

### Day 1: Build Minimum Agent System

Owner: Joe / Project Owner

- Confirm beta defaults.
- Confirm New Castle Building Products as first rehearsal target.
- Confirm human approver/sender.
- Confirm no known conflict for the first 3 prospects, or accept `HubSpot unknown` as a beta blocker label.
- Approve whether the first test uses warm paths or direct drafts only.

Owner: Codex

- Finalize minimum viable agent cards:
  - Prospect Fit Scoring Agent
  - Company Research Agent
  - Decision-Maker / Contact Path Agent
  - Outreach Drafting Agent
  - Compliance / QA Agent
  - Tracker Agent
- Create a single-page operator checklist.
- Create the first 3 research briefs.
- Create first outreach drafts.
- Run QA on all drafts.
- Update tracker.

Exit criteria:

- Three prospects have scored briefs, contact-path recommendations, draft outreach, QA status, and tracker rows.

### Day 2: Human Review and Beta Test

Owner: Joe / Project Owner

- Review the first 3 beta packets.
- Approve, edit, hold, or reject each draft.
- Send only human-approved outreach.
- Log response/status manually.

Owner: Codex

- Revise drafts from feedback.
- Create follow-up drafts for approved prospects.
- Capture issues and update the v0.1 agent rules.
- Package the beta handoff folder.

Exit criteria:

- At least one prospect is ready for human-approved outreach.
- The repeatable workflow has been exercised end to end.
- Known gaps are captured for v0.2.

## Accelerated 3-Day Beta Option

Recommended.

### Day 1: Agent System and First Prospect Packet

Owner: Joe / Project Owner

- Confirm beta defaults.
- Confirm first 3-5 prospects.
- Confirm human approver/sender.
- Confirm first route for New Castle Building Products: Maria warm path or direct CFO.

Owner: Codex

- Finalize v0.1 agent cards.
- Create single-page operator checklist.
- Build New Castle Building Products full prospect packet.
- Run QA and update tracker.

Exit criteria:

- One complete prospect packet is ready for human review.

### Day 2: Remaining Prospect Packets

Owner: Joe / Project Owner

- Review New Castle packet.
- Give feedback on score, route, and draft quality.
- Confirm route for Colony Grill and TVG Fast and Fresh.

Owner: Codex

- Build Colony Grill and TVG Fast and Fresh prospect packets.
- Incorporate feedback from New Castle.
- Create draft outreach and QA notes.
- Update tracker.

Exit criteria:

- Three complete prospect packets are ready.

### Day 3: Beta Review and Handoff Package

Owner: Joe / Project Owner

- Approve, edit, hold, or reject the 3 prospect packets.
- Send any approved outreach manually.
- Confirm what Jeff should see in the handoff.

Owner: Codex

- Package beta handoff:
  - runbook
  - tracker
  - agent cards
  - scoring rubric
  - QA checklist
  - three completed examples
  - issue log
- Create v0.2 improvement backlog.

Exit criteria:

- Jeff can review the workflow, see completed examples, and repeat the process on the next batch.

## Original 7-Day Timeline

The 7-day plan below remains the more thorough implementation path if the beta needs HubSpot field mapping, cleaner governance, and broader testing before outreach.

### Day 0: Lock the Beta Scope

Owner: Joe / Project Owner

- Confirm that the first beta is cost-optimization outreach, not the broader operational-excellence offer.
- Confirm the beta target size: recommended 15 companies.
- Confirm the first beta segment: recommended manufacturing, healthcare/clinics, private education, nonprofits, and multi-location restaurants.
- Confirm whether relationship leads from the transcript are excluded from beta unless separately approved.
- Confirm who reviews and sends outreach.

Owner: Codex

- Convert current transcript inventory into a validation checklist.
- Draft a minimal `AGENTS.md` using the governance draft and transcript rules.
- Draft the first beta workflow map.

Exit criteria:

- Beta segment, target count, human approver, and external-communication boundary are confirmed.

### Day 1: Finish Governance and Agent Rules

Owner: Joe / Project Owner

- Provide or approve the final human owner name/role.
- Confirm whether the Master Governance Policy is approved as the baseline.
- Confirm missing Section 19 escalation matrix or provide the completed file if available.
- Confirm approved language for "double-digit savings" and restaurant food-cost savings.

Owner: Codex

- Create repo-root `AGENTS.md`.
- Create agent cards for:
  - Prospect Research Agent
  - Decision Maker Agent
  - Relationship Mapping Agent
  - Company Intelligence Agent
  - Outreach Agent
  - CRM Management Agent
- Complete a first-pass escalation matrix.
- Produce a one-page beta operating checklist.

Exit criteria:

- Agents have written authority boundaries.
- Human approval gates are explicit.

### Day 2: Define HubSpot and Scoring

Owner: Joe / Project Owner

- Export or screenshot current HubSpot fields and pipeline/stage values.
- Confirm what fields AI may create/populate.
- Confirm lead owner rules.
- Confirm duplicate-handling rule.
- Confirm the stop statuses: existing client, active opportunity, opt-out, bad contact, human review needed.

Owner: Codex

- Draft the HubSpot field map.
- Draft the beta lead-scoring rubric.
- Draft definitions for high/medium/low contact confidence.
- Draft CRM update rules by authority level.

Exit criteria:

- We know exactly what data the beta writes to HubSpot and what requires human review.

### Day 3: Build the Research and Qualification Template

Owner: Joe / Project Owner

- Provide 10-25 candidate companies or approve source pools.
- Approve whether public web research may be used alongside LinkedIn, ZoomInfo, HubSpot, and Athena.
- Approve first target industries.

Owner: Codex

- Create the company research template.
- Create the qualification worksheet schema.
- Create the scoring rubric.
- Create fact-vs-inference labels.
- Create source-citation requirements.

Exit criteria:

- A researcher or agent can evaluate any company the same way every time.

### Day 4: Build Outreach Drafting Kit

Owner: Joe / Project Owner

- Provide any approved newsletters, white papers, or assets that can be offered in outreach.
- Confirm preferred sender voice.
- Confirm whether phone scripts and physical mailers are in beta scope.

Owner: Codex

- Draft initial email template.
- Draft LinkedIn message template.
- Draft call script.
- Draft Day 3, Day 7, Day 14, and Day 21 follow-ups.
- Draft rejection/stop-condition handling language.
- Create messaging guardrails for no-savings-promise compliance.

Exit criteria:

- Outreach Agent can generate drafts, but only a human can send.

### Day 5: Dry Run on 3 Companies

Owner: Joe / Project Owner

- Pick 3 real prospects for dry run.
- Review AI research and scoring.
- Mark what is right, wrong, missing, or risky.
- Approve or reject outreach drafts.

Owner: Codex

- Run the full workflow manually on 3 companies.
- Produce research briefs.
- Produce contact-confidence recommendations.
- Produce outreach drafts.
- Log issues and adjust templates/rubrics.

Exit criteria:

- Workflow produces useful research and safe outreach drafts on real examples.

### Days 6-7: Revise and Package the Beta

Owner: Joe / Project Owner

- Approve revised scoring and messaging.
- Approve HubSpot workflow and task statuses.
- Approve beta candidate list.

Owner: Codex

- Revise governance, agent cards, scoring, templates, and workflow based on dry-run feedback.
- Create beta runbook.
- Create QA checklist.
- Create beta tracker.

Exit criteria:

- Beta package is ready for a controlled run.

### Week 2: Beta Run

Owner: Joe / Project Owner

- Send approved outreach manually.
- Track replies, objections, meetings, and stop conditions.
- Provide feedback after each batch.

Owner: Codex

- Process 10-25 prospects through research and draft generation.
- Maintain issue log and improvement backlog.
- Summarize performance after each batch.
- Recommend adjustments to scoring, targeting, and messaging.

Exit criteria:

- At least 10 prospects processed.
- At least one full outreach sequence started.
- All outbound communication remains human-approved.
- Issues are captured for v2.

## Immediate Task List

### Joe / Project Owner

- Confirm beta target count: recommended 15.
- Confirm beta segment focus.
- Confirm the human approver/sender.
- Provide completed governance file if Section 19 exists elsewhere.
- Provide HubSpot field/stage screenshots or exports.
- Provide 10-25 candidate companies.
- Provide approved assets for outreach, if any.
- Confirm approved savings wording.
- Confirm whether physical mailers are in or out for beta.

### Codex

- Draft `AGENTS.md`.
- Draft six agent cards.
- Complete escalation matrix.
- Create HubSpot field map.
- Create lead-scoring rubric.
- Create company research template.
- Create outreach templates and follow-up cadence.
- Run 3-company dry run after candidates are provided.
- Package beta runbook and QA checklist.

## Recommended First Beta Defaults

- Target count: 15 companies.
- First dry run: 3 companies.
- First segment: manufacturing, healthcare/clinics, private education, nonprofits, and multi-location restaurants.
- Outreach channel: email and LinkedIn drafts only.
- Physical mailers: exclude from first beta unless explicitly approved.
- Data handling: no AP data handled by AI.
- CRM mode: draft/recommend updates first; apply only low-risk approved fields once field map is confirmed.
- Human approval: required before every outbound message, introduction request, meeting scheduling action, and meaningful CRM status change.

## Risks to Resolve Before Beta

- Governance draft is incomplete at Section 19.
- HubSpot field/stage model is not yet documented.
- Approved brand voice and messaging library are placeholders.
- Category-level minimum spend thresholds are not yet available.
- Sections 5 and 9 still need cleaner timestamped/speaker-labeled transcripts if deeper evidence mapping is required.
- Named relationship leads require explicit approval before use.

## Next Best Action

Approve the beta defaults or revise them. Then provide HubSpot field/stage screenshots and 10-25 candidate companies so Codex can build the beta package and run the first 3-company dry run.
