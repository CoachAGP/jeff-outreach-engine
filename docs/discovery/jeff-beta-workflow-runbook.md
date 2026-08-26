# Jeff Outreach Engine Beta Workflow Runbook

Status: beta v0.1.

Purpose: provide a repeatable process Jeff can use after handoff to evaluate prospects, identify the right contact path, prepare compliant outreach, and track progress without allowing AI to act autonomously.

This runbook is designed for the first approval-gated beta. It should be updated after 10-25 prospects have been processed and real outcomes are known.

## Operating Principle

AI helps research, score, draft, and organize. A human decides, approves, sends, calls, introduces, schedules, and updates consequential CRM status.

No AI agent may independently contact prospects, request introductions, schedule meetings, or make unsupported claims.

After the August 26 beta review, the preferred working mode is report-first:

- Codex prepares the opportunity report before Jeff commits to the outreach angle.
- Jeff reviews the report and gives direction.
- Codex then drafts or revises the email, LinkedIn message, or call script.
- Jeff approves and sends manually.

## Workflow Overview

1. Intake company.
2. Check for existing relationship or conflict.
3. Research company.
4. Score prospect fit.
5. Identify decision-maker and relationship path.
6. Choose route: warm path, direct finance outreach, hold, or reject.
7. Return report and tracker update for Jeff review.
8. Draft or revise outreach based on Jeff's direction.
9. Run Compliance / QA Check.
10. Human approves and sends.
11. Track outcome.
12. Follow up or stop according to rules.

## Roles

### Jeff / Human Owner

- Final authority for outreach.
- Confirms whether a prospect should be pursued.
- Approves all external communication.
- Confirms whether relationship leads may be used.
- Sends outreach or directs another human to send.
- Handles meetings and live conversations.

### AI / Codex

- Researches public/company information.
- Scores fit using approved rubric.
- Identifies likely contact paths.
- Drafts outreach for review.
- Checks drafts against compliance rules.
- Maintains beta tracker and issue log.
- Recommends next action.

## Required Inputs

Minimum input for each prospect:

- Company name.
- Website or LinkedIn/company page, if available.
- Known contact or relationship path, if any.
- Source of lead.
- Any notes about why the company may be relevant.

Optional input:

- Estimated revenue.
- Location count.
- Industry.
- Known CFO/owner/controller.
- News trigger.
- ZoomInfo intent signal.
- HubSpot/Athena status.

Approved beta lead sources:

- Weekly ZoomInfo intent emails.
- ZoomInfo target account digest emails.
- LinkedIn Sales Navigator alert emails.
- Manual companies Jeff identifies while browsing.
- Warm referrals and known relationships.

Known alert timing:

- ZoomInfo intent alerts arrive Tuesdays around 10:28 AM.
- LinkedIn Sales Navigator alerts arrive Mondays.

For beta testing, Jeff will forward sample ZoomInfo and LinkedIn alerts so the intake process can be tested before any scheduled automation is enabled.

## Step 1: Intake Company

Add the company to the beta tracker with:

- Company name.
- Known contact.
- Source of lead.
- Initial status: `Intake`.
- HubSpot status: `Unknown / not checked` unless verified.
- Athena status: `Unknown / not checked` unless verified.
- Outreach approval: `Not approved`.

If the lead came from a personal relationship, mark:

- `Relationship approval needed`.

## Step 2: Conflict Check

Before outreach, check whether the company is:

- Existing client.
- Existing active opportunity.
- Already owned by someone else.
- Duplicate record.
- Do-not-contact.
- Opted out.
- Sensitive relationship.

When HubSpot/Athena access is unavailable, mark:

- `Conflict status unknown`.

Do not send outreach until a human accepts the risk or confirms no conflict.

## Step 3: Company Research

Research and record:

- Company website.
- LinkedIn company page.
- Industry.
- Locations.
- Estimated revenue or employee count.
- Leadership and finance contacts.
- Recent news or trigger events.
- Likely indirect spend categories.
- Franchise, public-sector, enterprise, or procurement constraints.
- Source links.

Label every finding as:

- Verified fact.
- Reasonable indicator.
- Hypothesis.

## Step 4: Prospect Fit Score

Use the `Prospect Fit Scoring` skill.

Final score must be 1-5:

- `5`: Excellent beta fit.
- `4`: Strong fit.
- `3`: Possible fit; needs more research or human review.
- `2`: Weak fit.
- `1`: Poor fit or likely disqualified.

Top weighted factors:

1. Revenue / spend size.
2. Urgency trigger or news event.
3. Industry fit.

Hard disqualifiers:

- Outside the United States.
- Too small with no evidence of meaningful addressable spend.
- Mostly labor/headcount spend.
- Existing client.
- Active opportunity already owned.
- Opt-out or do-not-contact.
- Duplicate or ownership conflict that cannot be resolved safely.

## Step 5: Contact Path Assessment

Classify the known or discovered contact:

- `Direct buyer`: CFO, owner, CEO, controller when no CFO exists.
- `Near-buyer`: senior operator, COO, president, franchise owner, business leader with likely authority.
- `Warm path`: finance team member, relationship contact, mutual connection, internal influencer.
- `Research source`: useful for context but not an outreach target.
- `Unresolved`: identity or company not verified.

Preferred contact order:

1. CFO.
2. Owner / CEO.
3. Controller if no CFO.
4. Senior operator / COO if likely owner path.
5. Warm relationship path to one of the above.

Do not request an introduction unless Jeff approves.

## Step 6: Route Decision

Choose one:

- `Warm path`: ask the relationship contact for help routing to the right person.
- `Direct finance`: draft to CFO/owner/controller.
- `Research more`: missing critical data.
- `Hold`: possible fit but not ready.
- `Reject`: weak fit or disqualified.

Route decision rules:

- Score `5`: prepare outreach route after conflict check.
- Score `4`: prepare route if decision-maker/contact path is adequate.
- Score `3`: human review before drafting.
- Score `1-2`: hold or reject unless Jeff overrides.

## Step 7: Draft Outreach

Draft only. Do not send.

For the preferred report-first workflow, draft outreach after Jeff has reviewed the report and confirmed the route, unless Jeff explicitly asks for an immediate draft.

Draft should include:

- Relevant company-specific context.
- One or two likely category hypotheses.
- Approved safe language only.
- Low-pressure next step.
- No AP data request in first-touch outreach.
- No promise of savings.
- No claim that the company is overspending.
- Jeff's name spelled as `Jeff Peduto`.
- ERA Group context before mentioning any spend assessment.
- A value statement around reducing indirect supplier spend with deep category expertise, no upfront cost, and no additional cost to the business.

Use hybrid voice:

- Direct and practical.
- CFO-relevant.
- Consultative and polished.
- Short enough for a busy executive.

## Step 8: Compliance / QA Check

Run the `Compliance / QA Check` skill.

Decision must be one of:

- `PASS`
- `PASS WITH EDITS`
- `FAIL`
- `ESCALATE`

Automatic fail if the draft:

- Promises savings.
- Says the prospect is overspending.
- Claims specific savings have been found.
- Requests AP data outside the approved process.
- Uses a relationship as if an introduction is approved.
- Includes unsupported financial claims.
- Includes fake urgency.
- Targets an existing client, active opportunity, opt-out, or do-not-contact record.

## Step 9: Human Approval and Send

Jeff or the approved human sender reviews:

- Research brief.
- Fit score.
- Contact path.
- Draft message.
- QA result.
- Tracker status.

Human chooses:

- Approve as written.
- Edit and approve.
- Ask for rewrite.
- Hold.
- Reject.

Only a human sends outreach.

## Step 10: Tracker Update

After human decision, update beta tracker:

- Current status.
- Outreach approval.
- Date approved.
- Date sent.
- Channel.
- Sender.
- Follow-up due date.
- Response status.
- Notes.

Until HubSpot is available, the manual tracker is temporary system of record.

Once HubSpot is available, HubSpot becomes system of record and the tracker becomes a beta audit/helper sheet.

Jeff's stated preference is to avoid tracking in two places. The beta should therefore test:

- Which tracker fields belong in HubSpot.
- Whether HubSpot can hold the report summary, fit score, route decision, QA status, and next action.
- Whether Codex can prepare HubSpot notes, tasks, draft emails, or field recommendations.
- Which HubSpot changes require Jeff approval before update.

## Step 11: Follow-Up Cadence

Default cadence:

- Day 0: initial human-approved outreach.
- Day 3: short follow-up.
- Day 7: value-oriented follow-up.
- Day 14: alternate angle.
- Day 21: respectful close-the-loop.

All follow-ups require human approval before sending.

## Stop Conditions

Stop immediately if:

- Prospect opts out.
- Prospect asks not to be contacted.
- Prospect responds negatively.
- Prospect requests a human discussion.
- Prospect raises privacy/legal concern.
- Prospect is existing client.
- Active opportunity exists.
- Another person owns the relationship.
- Contact information is wrong.
- Decision-maker changes.
- Any material uncertainty arises.

The workflow must not continue automatically after a stop condition.

## Beta QA Review

After every 5 prospects, review:

- Fit score accuracy.
- Contact path accuracy.
- Draft quality.
- Compliance issues.
- Response rate.
- Meetings booked.
- Reasons prospects stall.
- Data gaps.

Update:

- Scoring rubric.
- Messaging.
- Target segments.
- Tracker fields.
- Governance rules.

## Handoff Package for Jeff

Before Jeff owns the workflow, provide:

- This runbook.
- Beta tracker.
- Prospect Fit Scoring skill.
- Compliance / QA Check skill.
- Approved messaging library.
- HubSpot field map.
- Example completed research brief.
- Example passed QA draft.
- Stop-condition checklist.
- Escalation matrix.

## Current Beta Defaults

- Target count: 15 companies.
- Dry run: 3 companies.
- First beta segments:
  1. Manufacturing.
  2. Healthcare / clinics.
  3. Private education.
  4. Nonprofits.
  5. Multi-location restaurants.
- Outreach channels: email and LinkedIn drafts only.
- Physical mailers: out of beta 1 unless explicitly approved.
- AI handles no AP data.
- Human approval required before every external message, introduction request, meeting scheduling action, and meaningful CRM status change.

## Immediate Next Step

Use Jeff's forwarded ZoomInfo and LinkedIn alert examples as the next process rehearsal:

1. Save the incoming alerts as source examples.
2. Extract company names, topics, scores, and available contact/signal data.
3. Normalize the records into the tracker schema.
4. Select 10-15 companies for the first true beta batch.
5. Research and score the batch.
6. Return reports first for Jeff review.
7. Draft outreach only after Jeff confirms route and message angle.
8. Hold all outreach for human approval.
