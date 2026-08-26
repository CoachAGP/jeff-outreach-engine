# Jeff Outreach Engine: Agent Workflow Input and Output Guide

Status: beta handoff v0.1.

Prepared for: Jeff Peduto.

Purpose: explain how Jeff will submit companies or prospects into the outreach engine, how the agent workflow will process them, and what Jeff will receive back before deciding whether to send outreach.

No outreach is sent automatically. Jeff remains the final reviewer and sender.

## Executive Summary

The workflow is designed to let Jeff provide simple prospect inputs, then receive a structured opportunity report and draft outreach message for review.

Jeff does not need to run research manually for each company. He only needs to provide enough starting information for the agents to begin.

The agents will:

1. Validate the intake row.
2. Research the company.
3. Identify the likely buyer or warm path.
4. Score the company from 1 to 5.
5. Identify likely spend categories.
6. Draft outreach.
7. Run compliance / QA.
8. Return a report and update the tracker.

Jeff then reviews the result and decides whether to send, revise, hold, or reject.

After the August 26 beta review, the preferred review pattern is:

1. Codex prepares the research report and tracker update first.
2. Jeff reviews the report and gives direction.
3. Codex drafts or revises the outreach from that direction.
4. Jeff manually approves and sends.

The system can still produce a draft immediately, but Jeff is more likely to review the report first and then guide the final message.

## How Jeff Inputs a Prospect

During beta, Jeff inputs prospects through a simple tracker. One row equals one company/opportunity.

The current beta tracker is:

- `data/beta_tracker.csv`

The readable Excel version is:

- `outputs/jeff-outreach-beta-tracker.xlsx`

## Minimum Input Fields

Jeff only needs to provide:

| Field | Example | Required? |
|---|---|---|
| Company name | New Castle Building Products | Yes |
| Website or LinkedIn company page | https://ncbp.com/ | Strongly recommended |
| Known contact | Maria Kotereva | Optional |
| Contact LinkedIn URL | LinkedIn profile URL | Optional |
| Relationship source | Joe Bouffard | Optional |
| Why this may be relevant | Multi-location distributor | Optional |
| Preferred route | Warm path / direct CFO / research first | Optional |
| Known conflict status | No known conflict / unknown / existing client | Yes before outreach |

If Jeff has only a company name, the agents can still begin research, but confidence may be lower.

## Activation Rule

The agent workflow begins when a tracker row is marked:

`Ready for Research`

Approved beta trigger sources:

- Manual tracker row.
- Company or contact sent directly to Codex.
- Weekly ZoomInfo intent emails.
- ZoomInfo target account digest emails.
- LinkedIn Sales Navigator alert emails.
- A company Jeff finds while browsing LinkedIn, ZoomInfo, HubSpot, or another approved source.

Current trigger plan:

- Jeff forwards at least one ZoomInfo intent email, one ZoomInfo target account digest, and one LinkedIn Sales Navigator alert for testing.
- If the emails arrive in Outlook, create a dedicated folder so Codex can be directed to review only that folder.
- If a ZoomInfo email links into ZoomInfo instead of providing a full export, use browser-assisted review or an available export of recommended contacts/signals.
- Do not rely on fully automated scheduled runs until the trigger source is proven with a manual beta batch.

If required fields are missing, the Intake Agent flags the row as:

`Needs Input`

Examples of missing input:

- Company name unclear.
- Multiple companies with the same name.
- Contact name does not match company.
- Known conflict status missing.
- Relationship path unclear.

## Agent Workflow

### 1. Prospect Intake Agent

Checks whether the row has enough information to start.

Outputs:

- Intake status.
- Missing information, if any.
- Initial workflow stage.

### 2. Company Research Agent

Researches the company using approved sources.

Looks for:

- Website.
- Industry.
- Locations.
- Estimated revenue or employee count.
- Company growth/news.
- Hiring or operational triggers.
- Relevant spend-category indicators.
- Public leadership/contact information.

Outputs:

- Company research summary.
- Source links.
- Fact vs inference labels.

### 3. Decision-Maker Agent

Identifies likely buyer or decision path.

Preferred order:

1. CFO.
2. Owner / CEO.
3. Controller if no CFO is visible.
4. Senior operator / COO if likely owner path.
5. Warm relationship path to one of the above.

Outputs:

- Recommended contact.
- Contact confidence: high, medium, or low.
- Buyer vs warm path classification.

### 4. Relationship Mapping Agent

Determines whether a known contact is:

- Direct buyer.
- Near-buyer.
- Warm path.
- Research source.
- Unresolved.

Outputs:

- Relationship path assessment.
- Whether human approval is required before using the relationship.

Important rule:

The agent may identify relationship paths, but it may not request introductions or contact anyone.

### 5. Prospect Fit Scoring Agent

Scores the company from 1 to 5.

Scale:

- `5`: Excellent fit.
- `4`: Strong fit.
- `3`: Possible fit; needs review.
- `2`: Weak fit.
- `1`: Poor fit or likely disqualified.

Top weighted factors:

1. Revenue / spend size.
2. Urgency trigger or news event.
3. Industry fit.

Outputs:

- Fit score.
- Top reasons.
- Caution flags.
- Recommended next action.

### 6. Outreach Drafting Agent

Drafts the first outreach message.

The draft must:

- Be written in Jeff's first-person voice.
- Spell Jeff's name as `Jeff Peduto`.
- Mention Joe Bouffard only when approved.
- Explain that Jeff works with ERA Group.
- Position the value as helping middle-market organizations reduce indirect supplier spend through deep category expertise.
- Make clear the work has no upfront cost and no additional cost to the business when contextually appropriate.
- Treat the spend assessment as a tool used to validate opportunity, not the main thing being sold.
- Avoid promises.
- Avoid saying the company is overspending.
- Avoid requesting AP data in the first message.
- Keep the ask low-pressure.
- Leave room for the contact to route Jeff to the right person.

Outputs:

- Email draft.
- LinkedIn draft, if needed.
- Suggested subject line.

### 7. Compliance / QA Agent

Reviews the draft before Jeff sees it as ready.

QA decision:

- `PASS`
- `PASS WITH EDITS`
- `FAIL`
- `ESCALATE`

Automatic fail conditions:

- Promises savings.
- Claims overspending.
- Claims savings have already been found.
- Requests AP data outside the approved process.
- Uses a relationship as if an introduction has already been authorized.
- Uses fake urgency.

Outputs:

- QA status.
- Required edits.
- Human approval gates.

### 8. Tracker Agent

Updates the tracker row.

Outputs:

- Current status.
- Workflow stage.
- Recommended next action.
- Outreach approval status.
- Relationship approval status.
- Notes.

## What Jeff Receives Back

For each company, Jeff receives two outputs:

1. A detailed opportunity report.
2. A tracker update.

Optional output after Jeff reviews the report:

3. A revised outreach draft based on Jeff's feedback.
4. A HubSpot draft/task recommendation if HubSpot access is available.

## Opportunity Report Format

Each opportunity report includes:

- Executive recommendation.
- Fit score.
- Key research.
- Likely spend categories.
- Contact strategy.
- Main cautions.
- Compliance notes.
- Final draft email link.
- Feedback questions for Jeff.
- Source links.

Current examples:

- `docs/discovery/opportunity-report-new-castle-building-products.md`
- `docs/discovery/opportunity-report-colony-grill.md`
- `docs/discovery/opportunity-report-tvg-fast-and-fresh-jimmy-johns.md`

## Tracker Output

The tracker gives Jeff a dashboard view across opportunities.

Current tracker fields include:

- Company.
- Fit score.
- Decision.
- Beta priority.
- Known contact.
- Contact role signal.
- Recommended route.
- HubSpot status.
- Athena status.
- Relationship approval.
- Outreach approval.
- Current status.
- Workflow stage.
- Next action.
- Notes.

## Where The Tracker Should Live

Recommended beta decision:

- Store the tracker as a shared Microsoft Excel workbook in Jeff's Microsoft OneDrive or SharePoint environment.
- Use GitHub as the central source of truth for the repeatable workflow files: agent rules, skills, templates, tracker schema, sample reports, and version history.
- Run the workflow from Jeff's Codex account once handed off, so Jeff can open the same GitHub repository, start new tasks, and have Codex operate from the current project files.

Reason:

- Jeff can open, edit, filter, and share it without learning a new tool.
- It fits naturally with a Microsoft-based operating workflow.
- It gives Jeff a simple review layer before any message is sent.
- It can later connect to HubSpot exports or HubSpot API data without changing the workflow design.
- GitHub makes the workflow portable across computers and Codex accounts.
- Codex can read the repository structure, follow `AGENTS.md`, use the agent skill files, and update the workflow artifacts as the beta improves.

Current local tracker files:

- Repository tracker: `data/beta_tracker.csv`
- Shareable Excel tracker: `C:\Users\Aigro\Documents\Codex\2026-08-22\1-choose-open-folder-add-project\outputs\jeff-outreach-beta-tracker.xlsx`
- Shareable CSV tracker: `C:\Users\Aigro\Documents\Codex\2026-08-22\1-choose-open-folder-add-project\outputs\jeff-outreach-beta-tracker.csv`

Alternative:

- Use Google Sheets in Google Drive if Joe / AI Growth Partners will own day-to-day workflow operations and wants easy collaborative editing.

Not recommended for beta v0.1:

- A custom web dashboard. That can come later, after Jeff confirms the tracker fields, reports, scoring, and approval flow are useful.

Future state:

- HubSpot should become the system of record once access is available, because Jeff wants to avoid tracking the same opportunity in two places.
- The tracker should remain the intake, research, review, and audit layer until the process is stable enough to create or update HubSpot fields safely.
- The beta should test whether Codex can draft HubSpot notes/tasks/email drafts without making meaningful CRM status changes unless Jeff approves.

## Codex And GitHub Handoff Model

Jeff's handoff should work like this:

1. Jeff opens the GitHub repository in his own Codex account.
2. Jeff starts a new Codex task inside that project.
3. Codex reads `README.md`, `AGENTS.md`, the tracker template, and the agent skill documents.
4. Jeff provides either a company list, a contact list, or an imported CSV/XLSX file.
5. Codex runs the repeatable workflow and produces updated reports, drafts, and tracker rows.

Recommended files to keep in GitHub:

- `README.md`: project overview and setup.
- `AGENTS.md`: operating rules, authority matrix, approval gates, and tone guidelines.
- `docs/discovery/`: strategy, reports, scoring rules, and workflow documentation.
- `data/beta_tracker.csv`: portable tracker schema and current beta records.
- `docs/discovery/agent-skill-compliance-qa-check.md`: compliance and QA skill definition.
- `docs/discovery/agent-skill-prospect-fit-scoring.md`: prospect fit scoring skill definition.
- Meeting feedback summaries and decision logs.

Recommended files to keep outside GitHub if sensitive:

- Raw HubSpot exports.
- Raw ZoomInfo exports.
- Private customer records.
- Any file containing non-public contact information beyond what Jeff has approved for beta use.

Plain-English version:

- GitHub stores the playbook.
- Jeff's Codex account runs the playbook.
- OneDrive / SharePoint or Google Drive stores the working tracker and shareable reports.
- HubSpot eventually stores the official CRM record.

## Results Delivery Model

For beta testing, Jeff should receive:

- One shared tracker.
- One folder containing detailed opportunity reports.
- One folder containing approved draft emails.
- A link from each tracker row to the matching opportunity report and draft email.

Recommended beta folder structure:

- `Tracker`
- `Opportunity Reports`
- `Draft Emails`
- `Source Notes`
- `Archive`

In the current local project, the working outputs are stored here:

- `C:\Users\Aigro\Documents\Codex\2026-08-22\1-choose-open-folder-add-project\outputs`

In Jeff's working environment, that same structure should be recreated in either:

- Microsoft OneDrive / SharePoint, recommended for beta.
- Google Drive, acceptable if that is easier for collaboration.

## Bulk Import From HubSpot

When HubSpot access is available, the beta-safe path is:

1. Export companies, contacts, and deals from HubSpot as CSV files.
2. Import those CSV files into a staging sheet or staging file.
3. Normalize fields into the tracker format.
4. De-duplicate records.
5. Mark qualified rows as `Ready for Research`.
6. Mark risky or unclear rows as `Human Review`.

The beta workflow should not automatically overwrite HubSpot.

Jeff's preferred future state:

- HubSpot contains the official company/contact/opportunity record.
- Custom HubSpot fields can tag records as outreach-engine sourced.
- HubSpot reporting should eventually show the material opportunity data.
- Codex may prepare HubSpot-ready notes, tasks, draft emails, and field recommendations.
- Jeff approves any meaningful HubSpot status, lifecycle, or ownership changes.

HubSpot data should be used to identify:

- Existing customers.
- Existing opportunities.
- Account owners.
- Lifecycle stage.
- Known contacts.
- Prior activity.
- Do-not-contact or suppression indicators.

Recommended de-duplication keys:

- HubSpot company ID.
- HubSpot contact ID.
- Company domain.
- Company name.
- Contact email.
- Contact LinkedIn URL.

Stop / human-review conditions:

- Existing client.
- Active opportunity.
- Do-not-contact flag.
- Unclear ownership.
- Relationship conflict.
- Missing company identity.

## Bulk Import From ZoomInfo

ZoomInfo should be treated as a prospecting data source, not the final authority.

The beta-safe path is:

1. Export company and contact lists from ZoomInfo as CSV or XLSX.
2. Include intent, revenue, employee count, location, and contact fields where available.
3. Import the export into a staging sheet.
4. Normalize fields into the tracker format.
5. Score and prioritize rows.
6. Require human review before outreach.

ZoomInfo can help prioritize:

- Revenue / spend size.
- Employee count.
- Industry fit.
- Location count.
- Intent topics.
- Recent intent activity.
- Likely decision-makers.

Important rule:

- ZoomInfo revenue, headcount, and intent data should be treated as indicators, not verified public facts. The opportunity report should label those items as source-provided estimates unless independently verified.

Current ZoomInfo notes from Jeff:

- ZoomInfo intent emails arrive weekly on Tuesdays around 10:28 AM.
- The intent emails include company name, searched topic, and a score up to 100.
- Jeff receives multiple intent categories, including manufacturing/agriculture/food, education/nonprofit, healthcare, and general Northeast ICP.
- ZoomInfo target account digest emails also provide useful signals for companies Jeff has already marked as target accounts.
- Some ZoomInfo notification views may expose recommended contacts and signals that can be exported.
- If exports are not available, browser-assisted review may be used with Jeff's permission while he remains in control of his account access.

## Recommended Import Fields

For HubSpot and ZoomInfo imports, use a common staging template with these fields:

| Field | Purpose |
|---|---|
| Source system | HubSpot, ZoomInfo, manual, referral |
| Source export date | When the data was exported |
| Source record ID | HubSpot ID, ZoomInfo ID, or other source ID |
| Company name | Required for research |
| Company domain | Best de-duplication field |
| Company website | Research starting point |
| Company LinkedIn URL | Secondary identity check |
| Industry | Fit scoring |
| Estimated revenue | Spend-size indicator |
| Employee count | Spend-size indicator |
| Headquarters | Company identity and geography |
| Location count | Multi-site signal |
| Intent topic | Urgency trigger |
| Intent score | Prioritization signal |
| Intent date | Freshness signal |
| Known contact name | Relationship mapping |
| Known contact title | Buyer/warm-path assessment |
| Known contact email | Outreach channel, if approved |
| Known contact LinkedIn URL | Identity check |
| Relationship source | Who knows the contact |
| HubSpot owner | Ownership / conflict check |
| HubSpot lifecycle stage | Existing relationship check |
| Existing client flag | Stop or human review |
| Active opportunity flag | Stop or human review |
| Do-not-contact flag | Stop |
| Notes | Human context |

Rows can move to `Ready for Research` only when:

- Company identity is clear.
- No conflict is visible.
- No do-not-contact flag is present.
- The row has enough data for research.
- A human has approved the source if relationship information will be used.

## Example: New Castle Building Products

Jeff or Joe inputs:

- Company: New Castle Building Products.
- Known contact: Maria Kotereva.
- Relationship source: Joe Bouffard.
- Reason: possible fit due multi-location distribution.
- Conflict status: no known conflict.

Agents return:

- Fit score: `5/5`.
- Recommended route: Maria warm path.
- Likely buyer: CFO John Hutt.
- Alternate finance route: Controller Philip DeBellis.
- Likely categories: fleet, logistics, facilities, insurance, telecom, IT, purchasing, inventory, branch operations.
- QA result: `PASS WITH HUMAN REVIEW REQUIRED`.
- Draft email: ready for Jeff's manual review/send.

Jeff decides:

- Send as written.
- Edit and send.
- Hold.
- Reject.

## Example: Colony Grill

Input:

- Company: Colony Grill.
- Known contact: Ken Martin.
- Relationship source: Joe Bouffard.
- Conflict status: no known conflict.

Agents return:

- Fit score: `5/5`.
- Recommended route: Ken warm path.
- Contact signal: COO / co-owner.
- Likely categories: waste, facilities, janitorial, insurance, merchant services, technology, uniforms, repairs/maintenance.
- Main caution: avoid leading with food-cost savings.
- Draft email: ready for Jeff's manual review/send.

## Example: TVG Fast and Fresh / Jimmy John's CT

Input:

- Company: TVG Fast and Fresh / Jimmy John's CT.
- Known contact: Will Roth.
- Relationship source: Joe Bouffard.
- Conflict status: no known conflict.

Agents return:

- Fit score: `4/5`.
- Recommended route: Will Roth warm path.
- Contact signal: owner / franchisee.
- Likely categories: waste, facilities, janitorial, insurance, merchant services, technology, uniforms, local operating supplies.
- Main caution: franchise purchasing constraints may limit food categories.
- Draft email: ready for Jeff's manual review/send.

## Jeff's Review Options

For each opportunity, Jeff can choose:

- `Send`: message is good and Jeff sends manually.
- `Edit`: Jeff wants changes before sending.
- `Hold`: more research or conflict checking is needed.
- `Reject`: not worth pursuing.
- `Route differently`: use another contact or channel.

## What Happens After Jeff Sends

After Jeff sends a message, the tracker should be updated with:

- Date sent.
- Channel.
- Contact used.
- Message version.
- Follow-up due date.
- Response status.
- Notes.

If the prospect replies, the next agent workflow classifies the response:

- Positive / interested.
- Route to another person.
- Not now.
- Not interested.
- Wrong contact.
- Objection.
- Legal/privacy issue.
- Opt-out.

The agent can then draft a suggested response, but Jeff still approves and sends manually.

## Handoff Principle

The final system should make Jeff's role simple:

- Add or approve prospects.
- Review the opportunity report.
- Review the draft.
- Decide the next action.
- Send manually.

The agents handle the repeatable research, scoring, drafting, QA, and tracking work.

## Current Beta Status

The first three beta examples are complete enough for Jeff to compare:

- Composite report.
- Separate detailed opportunity reports.
- Final draft emails.
- Tracker.

The next decision is whether Jeff prefers:

1. One composite report for quick review.
2. One detailed report per opportunity.
3. Both: composite dashboard plus detailed reports for active opportunities.
