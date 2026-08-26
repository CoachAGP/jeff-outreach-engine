# Agent Skill: Compliance / QA Check

Status: beta v0.1.

Purpose: review AI-generated outreach, research summaries, CRM recommendations, and follow-up drafts before a human uses them. This skill protects the project from unsupported claims, unauthorized outreach, unsafe CRM changes, and off-brand messaging.

This skill is a review layer. It does not send messages, update CRM records, request introductions, schedule meetings, or approve its own output.

## Inputs

- Draft email, LinkedIn message, call script, follow-up, research brief, CRM update recommendation, or outreach sequence.
- Prospect research summary, if available.
- Prospect fit score, if available.
- Source notes and confidence labels, if available.

## Output

Return a QA decision:

- `PASS`: draft is safe for human review/use.
- `PASS WITH EDITS`: draft is usable after listed edits.
- `FAIL`: draft violates a rule and must be rewritten before human review.
- `ESCALATE`: human judgment is required before the draft can be evaluated or used.

Every review must include:

- Overall decision.
- Issues found.
- Required edits.
- Approval gates triggered.
- Final human-safe version if edits are straightforward.

## Non-Negotiable Approval Rule

Humans must approve all outgoing communication once drafted.

Human approval is required before:

- Sending any email.
- Sending any LinkedIn message.
- Placing or scripting a live call for use.
- Sending any follow-up.
- Requesting or implying an introduction.
- Scheduling a meeting.
- Replying to an external party.
- Making a meaningful HubSpot status or lifecycle change.

## Approved Safe Language

The following language concepts are approved, subject to context and truthful use:

- `double-digit savings`
- `10-14% food cost savings`
- `no upfront cost`
- `no obligation`
- `pay for performance`

Use these carefully:

- `double-digit savings` should refer to historical experience, not a promise to a specific prospect.
- `10-14% food cost savings` should be used only for restaurant/food-cost context and preferably framed as historical experience.
- `no upfront cost`, `no obligation`, and `pay for performance` apply to the spend optimization / spend assessment side, not necessarily to operational excellence consulting.

## Banned Language

Do not use or closely imply:

- `guaranteed savings`
- `you are overspending`
- `we found savings`
- Unsupported claims that savings already exist.
- Unsupported claims that the prospect is wasting money.
- Any promise of a specific savings amount for a prospect.
- Any claim that a projection is guaranteed.
- Fake urgency.
- Fear-based pressure.
- Fake familiarity.
- Overstated relationship strength.

## Savings Claim Rules

Allowed:

- Identify possible relevant spend categories.
- Say an assessment may reveal whether opportunities exist.
- Reference historical experience when approved and contextually relevant.
- Explain that specialists evaluate actual spend data.
- Explain that the prospect stays in control.

Not allowed:

- Promise savings.
- Claim overspending without validated data.
- Claim that a specific prospect will save money.
- Invent category spend numbers.
- Treat a hypothesis as a fact.

## Data and Privacy Boundary

AP spend-data handling language is not part of first-touch outreach for beta v0.1.

Still, the QA check must fail any draft that:

- Requests AP data directly outside the approved secure process.
- Asks for salaries or headcount-reduction data.
- Suggests AI will handle confidential AP files.
- Stores, transfers, or summarizes confidential financial data without an approved workflow.
- Implies Strategic Operations Solutions reduces people/headcount as part of cost optimization.

## Voice Standard

Use a hybrid voice:

- Jeff: direct, practical, CFO-relevant, grounded.
- AI Growth Plan: consultative, polished, strategic.

Drafts should be:

- Professional.
- Concise.
- Executive appropriate.
- Specific to the prospect.
- Evidence-based.
- Low-pressure.
- Useful even if the prospect does not reply.

Avoid:

- Hype.
- Overly clever personalization.
- Long explanations.
- Aggressive sales pressure.
- Generic AI-sounding language.

## Fact vs Inference Check

Every claim must fit one of these labels:

- Verified fact: supported by a cited source or known CRM/internal record.
- Reasonable indicator: supported by evidence but not confirmed.
- Hypothesis: plausible and useful for internal reasoning, but not safe as an external claim.

External outreach may use verified facts and carefully worded reasonable indicators. It must not present hypotheses as facts.

## Required QA Checklist

For every draft, check:

- Does it require human approval before use?
- Does it avoid autonomous external communication?
- Does it avoid banned savings claims?
- Does it avoid saying the prospect is overspending?
- Does it avoid promising outcomes?
- Does it distinguish fact from inference?
- Does it avoid requesting AP data in first-touch outreach?
- Does it avoid headcount-reduction framing?
- Does it use the hybrid voice?
- Does it avoid fake urgency or pressure?
- Does it avoid overstating mutual relationships?
- Does it include only supported personalization?
- Does it fit the intended channel?
- Does it have a clear, low-pressure next step?

## Automatic Fail Conditions

Return `FAIL` if the draft:

- Sends or implies permission to send without human review.
- Promises or guarantees savings.
- Says the prospect is overspending without validated evidence.
- Claims specific savings have been found.
- Requests confidential AP data outside the approved process.
- Uses a mutual connection as if an introduction has been approved.
- Includes unsupported financial claims.
- Includes false urgency.
- Targets an opt-out, existing client, active opportunity, or do-not-contact record.

## Escalation Conditions

Return `ESCALATE` if:

- Prospect status is ambiguous.
- The prospect may be an existing client.
- A duplicate or active opportunity may exist.
- Decision-maker identity is low confidence.
- Outreach relies on a relationship lead not explicitly approved.
- Messaging depends on unapproved savings language.
- The draft references confidential or sensitive information.
- The draft requires a business judgment outside documented rules.

## Example QA Output

```markdown
Decision: PASS WITH EDITS

Issues:
- The draft says "you may be overspending," which is too strong without spend data.
- The draft references a mutual connection without confirming an introduction is approved.

Required edits:
- Replace "you may be overspending" with "there may be value in validating whether your indirect spend is fully optimized."
- Replace the mutual-connection sentence with a neutral reference or remove it.

Approval gates:
- Human approval required before sending.
```
