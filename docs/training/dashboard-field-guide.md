# Jeff Outreach Engine — Field Guide

**For:** Jeff Peduto and authorized research/review support
**Owner:** Joe Bouffard, AI Growth Plan
**Updated:** September 11, 2026
**Applies to:** Published dashboard version 4; field behavior checked against its source implementation. This is a training document, not approval for a company or a message. Review after every dashboard release.

## Start here

The dashboard answers four questions: Who are we considering? What evidence supports the opportunity? What still needs checking? What has Jeff actually approved?

The current system records research work and review decisions. It does not automatically research a company, call ZoomInfo, verify a website or contact, clear a conflict, run substantive QA, or send outreach. A dropdown records a human's conclusion; it does not produce that conclusion.

The normal path is **Queued → Researching → QA Review → Ready for Approval → Approved**. **Hold** is available when something must be resolved. Approved means the research route is approved; every communication still needs separate human approval and manual sending.

### Choose the correct working mode

| Screen item | Meaning and action |
|---|---|
| Shared queue not connected | The displayed repository snapshot is read-only. Do not assume it reflects current shared decisions. |
| Try local practice mode | Enables a separate device-local exercise. Changes stay on this device and never sync into the shared Sheet. Never use practice mode as the live prospect tracker. |
| Shared Google Sheet connected | The configured shared queue was read successfully. Confirm the save message after each change. Live cross-account persistence still needs a pilot test after setup. |
| Refresh shared queue | Retrieves the shared state. Save or copy unfinished notes before refreshing. A successful connection exits practice mode. |
| Exit practice mode | Attempts to reconnect to the shared queue. It does not upload practice records. |

At the version 4 handoff, shared Sheet setup, Jeff's dashboard access and live ZoomInfo research execution were pending. Follow the current connection banner; do not infer a connection from the fact that the website opens.

## Who supplies and checks the information?

| Work | Responsible | Accountable / decision owner | Evidence source |
|---|---|---|---|
| Add company and record provenance | Jeff or authorized researcher | Jeff | Referral, existing tracker, company site or supplied ZoomInfo report |
| Preliminary fit assessment | Researcher; AI may assist with supplied evidence | Jeff for uncertain/sensitive cases | Approved scoring rubric and lightweight source checks |
| Research company and contact | Authorized researcher; AI may assist | Jeff | Primary company sources, authorized enrichment and dated source notes |
| Review accuracy and messaging safety | Assigned QA reviewer; AI may flag issues | Jeff | Research report, source checks and project QA rules |
| Clear conflicts and relationship use | Jeff, or authorized support documenting his explicit confirmation | Jeff | Authorized internal records and Jeff's specific approval |
| Approve route / release hold | Jeff, or authorized reviewer recording his decision | Jeff | Completed review and recorded decision scope |
| Approve and send a message | Jeff | Jeff | Exact final message and recipient/channel review |

Do not write passwords, integration secrets, confidential AP data or sensitive internal exports into these fields. Record a permitted reference and a concise conclusion instead.

## 1. Add opportunity: five fields

### Company name

- **Enter:** the actual company or operating business name. Add a location/parent distinction only when it helps identify the right entity.
- **Get it from:** the company's site, a referral, the existing beta tracker or a ZoomInfo company record.
- **Required:** yes; up to 200 characters. Search **Find company** first. The system rejects normalized name duplicates, but it does not resolve every alias, subsidiary or parent-company match.
- **Example:** `PRACTICE — Sample Manufacturing 2026-09-11` for training only.
- **If uncertain:** record the uncertainty in the source notes and leave the company unscored. Do not guess which business a short name represents.

### Company website (optional)

- **Enter:** the company's complete official HTTPS website address.
- **Get it from:** a verified company domain, checked against the company's identity and location. A ZoomInfo or search result is a lead to check, not proof of identity.
- **Required:** optional at intake. If provided, it must pass the HTTPS format check; the entry box allows up to 2,000 characters.
- **Example format:** `https://example.com` — reserved example, not a prospect source.
- **Limit:** the dashboard checks URL format, not ownership or whether the site loads. The website is stored at intake but is not editable in the current company review form. Record later corrections in sources/notes and request a supported record correction; do not create a duplicate.

### Source / ZoomInfo details

- **Enter:** where the opportunity came from, the source date, the exact company link or report reference, relevant intent/revenue/headcount indicators, and any uncertainties.
- **Get it from:** Jeff's referral notes; the existing tracker; a supplied ZoomInfo report or authorized account; company sources.
- **Required:** yes; up to 4,000 characters. `Manual entry` is the default, but replace it with useful provenance.
- **Template:** `Source: [name/link]. Observed: [date]. Signal: [topic/indicator]. Company/domain match: [checked/pending]. Confidence: [verified fact/indicator/hypothesis]. Missing: [items].`
- **Important:** a ZoomInfo intent score is not the dashboard's 1–5 fit score. Pasting details does not connect ZoomInfo or verify its estimates. These intake notes become the initial **Sources and confidence** field; preserve them when adding research.

### Preliminary fit score

- **Enter:** a whole-number 1–5 fit assessment, or **Not scored — preliminary review needed**.
- **Get it from:** the approved prospect-fit rubric, applied to information already available or obtained through lightweight triage.
- **Required:** optional at intake; a qualifying score is required before deep research activation. No automatic score is calculated from the company name.
- **Meaning:** 1 = poor fit; 2 = weak fit; 3 = possible fit; 4 = strong fit; 5 = excellent fit.
- **Gate:** unscored and 1–2 go to Hold. Scores 3–5 enter Queued. Activate 5s before 4s before 3s. Do not assign 3 simply to get past the gate.

### Score reason

- **Enter:** two or three evidence-based reasons for the preliminary score, plus the main uncertainty or caution.
- **Get it from:** the same sources used to score the company: revenue/spend indicators, current triggers, industry fit, operating footprint and relevant category signals.
- **Required:** whenever a 1–5 score is selected; up to 4,000 characters. Optional if unscored.
- **Example structure:** `Strong manufacturing fit; supplied revenue indicator is within the target range; possible freight/facilities exposure. Revenue and buyer authority remain unverified.`
- **Avoid:** unsupported spend numbers, assumed savings, or treating a warm connection as authorized.

**Add to queue / Add practice opportunity** saves intake. Adding a scored company does not activate research; activation is a separate step.

## 2. Preliminary scoring: two review fields

The **Preliminary scoring** panel appears only for Queued or Hold records.

| Field / control | What it needs | Source and requirement |
|---|---|---|
| Score | A revised whole-number 1–5 preliminary fit score | Researcher applies the approved rubric. Required when saving a score. |
| Evidence and reason | Why the score is changing, supporting source/date and remaining cautions | Required; up to 4,000 characters. Use lightweight triage evidence. |
| Save preliminary score | Saves these two scoring fields and an activity event | This is separate from the main save. It closes the review; other unsaved research-form edits are not included. Save scoring separately, then reopen to work on research fields. |

A revised 3–5 score does **not** release an existing Hold. To release it, reopen the review, choose Queued, record why the hold is resolved, confirm Jeff's review and use the main save. A low score cannot be released into deep research. A record shown as unscored may display `0/5` in the review header; this means no preliminary score, not a sixth scoring category.

### Scoring reference

Revenue/spend size, urgency and industry fit have the highest weight. The repository rubric prefers $20M+ annual revenue, allows $15M–$20M with stronger signals, and includes a restaurant exception where meaningful spend supports it. $750M is a prioritization guide, not a hard ceiling. Revenue is a proxy; do not invent category spend.

Check disqualifiers such as existing client, active opportunity, opt-out/do-not-contact, unresolved ownership conflict, outside-U.S. scope, or insufficient relevant spend. Public-company, nonprofit, government and parent-authority situations may require human judgment. High fit alone never resolves a sensitivity hold.

Use the full linked rubric for scoring details. Some older rubric action language discusses drafts or overrides; the current operating rule controls: no deep research for 1–2, and no outreach drafting before route approval unless Jeff explicitly requests draft-ready output. The dashboard does not calculate, round or automatically verify a score.

## 3. Company review: thirteen fields

### Recommended route

- **Enter:** the proposed approach and intended role: direct finance, owner/operator, an explicitly approved warm path, research more, or hold pending authority clarification.
- **Get it from:** company structure, contact research, purchasing authority and Jeff's relationship guidance.
- **Required by dashboard:** nonblank before QA Review, Ready for Approval and Approved; up to 4,000 characters.
- **Example:** `Direct finance route; confirm who controls indirect supplier decisions before proposing a conversation.`
- A route recommendation is not permission to contact anyone. Mention no mutual connection as approved unless Jeff explicitly authorized its use.

### Contact / authority findings

- **Enter:** name, current role, company match, supporting source/date, confidence, and whether buying authority is verified or still unknown.
- **Get it from:** official leadership pages or announcements; authorized ZoomInfo/LinkedIn checks; Jeff's confirmed internal knowledge.
- **Required by dashboard:** nonblank before QA Review and later stages; up to 4,000 characters.
- **Template:** `[Name] — [role]. Role source: [URL/date]. Identity confidence: [level]. Buying authority: [verified/indicator/unknown].`
- A CFO title does not by itself prove authority over this purchase. The dashboard can accept text describing uncertainty, but QA should not pass a material identity/authority gap merely because the field is filled.

### GitHub report URL

- **Enter:** the full link to the supporting report committed in the private `CoachAGP/jeff-outreach-engine` repository.
- **Get it from:** the researcher or maintainer who saves the reviewed report in GitHub; use that file's actual browser URL.
- **Required by dashboard:** before QA Review and later stages. It must start with `https://github.com/CoachAGP/jeff-outreach-engine/blob/` and include the branch and file path.
- The dashboard checks the link pattern. It does **not** upload the report, verify the file exists, or check its contents. Open the link and confirm it is the right company's current report. GitHub access may be required.

### Research summary

- **Enter:** a compact account of company identity/footprint, fit, likely spend categories, current trigger, contact route and unresolved risks.
- **Get it from:** the research report and its cited evidence; AI may help summarize, with human review.
- **Required by dashboard:** before QA Review and later stages; up to 4,000 characters.
- **Structure:** `Verified facts: … / Reasonable indicators: … / Hypotheses: … / Unresolved questions: …`
- Keep it useful for a fast decision. Do not claim savings exist or that the company is overspending.

### Sources and confidence

- **Enter:** each material claim, its URL or permitted internal reference, when it was checked, and its evidence label. Preserve original intake provenance.
- **Get it from:** company pages/announcements, public filings where relevant, authorized enrichment records and Jeff's documented confirmations.
- **Required by dashboard:** before QA Review and later stages; up to 4,000 characters. The software checks that text exists, not whether its sources support the claims.
- **Template:** `Claim | Source/reference | Checked date | Verified fact / Reasonable indicator / Hypothesis | Limitation`
- **Verified fact:** supported by a cited source or known internal record. **Reasonable indicator:** evidence supports it but does not fully confirm it. **Hypothesis:** internal reasoning to investigate, not a fact for outreach.
- ZoomInfo revenue, headcount, intent and contact data remain source-provided indicators until independently validated or confirmed by Jeff.

### Conflict checks

- **Select:** pending (the blank default), **Cleared by Jeff**, or **Conflict found**.
- **Get the answer from:** Jeff's authorized HubSpot/Athena/internal checks for current client, active opportunity, duplicate/ownership conflict, opt-out and do-not-contact status as applicable.
- **Required by dashboard:** **Cleared by Jeff** before Ready for Approval or Approved.
- **Record evidence:** in Sources and confidence or Next action / open questions, note who checked, when, which permitted system/reference was used, and Jeff's conclusion.
- Public web searches and absence of a visible record do not clear a conflict. If access is missing, leave pending. If a conflict exists, put the company on Hold and state the issue.

### Relationship permission

- **Select:** pending (the blank default), **Approved by Jeff**, or **Not applicable**.
- **Get the answer from:** Jeff's explicit, company/contact-specific approval of a relationship path. A LinkedIn connection does not provide permission.
- **Required by dashboard:** Approved by Jeff or Not applicable before Ready for Approval or Approved.
- Use Not applicable only when the proposed route does not depend on a relationship lead or mutual-contact mention. It is not a shortcut around missing approval.
- Record the scope/date of approval in the report or source notes. Route permission does not authorize an introduction request or sending a message.

### QA result

- **Select:** **Not reviewed**, **Pass**, or **Needs edits**.
- **Get the answer from:** review of the report, sources, company/contact identity, route, cautions and project compliance rules. Review any associated draft separately before use.
- **Required by dashboard:** Pass before Ready for Approval or Approved.
- **Before Pass:** check source support, evidence labels, material identity/authority gaps, conflict/relationship handling, unsupported claims and safe next steps. Record reviewer/date and issues resolved in the report or notes.
- The QA reference also uses PASS WITH EDITS, FAIL and ESCALATE. In this dashboard, unresolved edits/failures must not be mapped to Pass: use Needs edits and return to Researching; use Hold for a human-judgment blocker. Document the detailed QA outcome in the report.
- Selecting Pass records the result; it does not run a QA engine or approve communication.

### Draft status

- **Select:** **Not drafted**, **Draft requested by Jeff**, or **Draft awaiting separate approval**.
- **Get the answer from:** the actual drafting work and Jeff's request/route decision.
- **Gate behavior:** no specific draft status is required to complete the research-route workflow. Research can be approved while no message exists.
- Choose Draft requested by Jeff only when Jeff actually requested it. Choose Draft awaiting separate approval only when a draft exists and is available for review. Link its location in the report/notes.
- This dropdown does not create a draft. Newly added companies have no built-in message editor or automatic draft card. Existing message drafts are historical, read-only examples that still need exact-copy/recipient approval before manual use.

### Next action / open questions

- **Enter:** the next concrete task, its owner, what is missing, and the evidence needed to resolve it. Include a due date when agreed.
- **Get it from:** the researcher's findings, QA feedback or Jeff's decision.
- **Required by process:** keep it useful on every record, even though the software does not require it to be filled; up to 4,000 characters.
- **Example:** `Jeff: confirm conflict status in authorized internal records. Researcher: recheck current finance contact. No drafting until route review.`
- This is the current work instruction. It is different from the Decision or hold reason, which explains the action being saved into history.

### Move to

- **Select:** the appropriate next workflow stage from the available choices.
- **Get the decision from:** completed work and the transition checklist below, not a desire to move the company forward quickly.
- **Required:** the main save uses this selection. Opening a Queued record preselects Researching. Opening alone does not activate it, but saving without changing that selection does.
- To save notes while remaining Queued, explicitly choose Queued. Stages cannot be skipped. Returning to Researching clears the recorded QA result and requires a fresh review.

### Decision or hold reason

- **Enter:** why you are making this status decision, what was approved or blocked, and what happens next.
- **Get it from:** Jeff's actual decision or the documented blocker/research finding.
- **Required by dashboard:** when saving Approved, saving Hold (including edits while remaining on Hold), or releasing Hold to Queued; up to 4,000 characters. Helpful for all other transitions.
- **Examples:** `Hold: buying authority may sit with the parent. Jeff to resolve before pursuit.` / `Jeff approved the direct-finance research route on [date]. No message or send approval granted.`
- This note is written to Activity history and resets when the form is reopened. It is not a persistent unfinished-note field.

### Human review confirmation checkbox

- **Confirm only:** Jeff has actually reviewed and approved this route decision or the release of this hold.
- **Evidence:** a recorded instruction from Jeff covering the company, decision and scope. Note its date/reference in the decision reason or report.
- **Required by dashboard:** Approved and Hold → Queued. It resets on reopening.
- The checkbox is an attestation, not an independent approval request or identity verification. An authorized reviewer must not check it on Jeff's behalf without his actual decision. Practice simulations must be visibly marked as simulations and never transferred into live approvals.

## 4. What is required at each stage?

| Action | Software requirement | Human work that makes it legitimate |
|---|---|---|
| Add unscored company | Company name and source; unscored selected | Enough identification to avoid a knowingly ambiguous/duplicate prospect; otherwise document the gap. Creates Hold. |
| Add scored company | Name, source, 1–5 score and reason | Evidence supports the score. 1–2 creates Hold; 3–5 creates Queued. |
| Activate research | Queued, score 3–5, no higher-scored eligible company still Queued | Work is assigned intentionally; sensitivities/known conflicts are not bypassed. Search filters do not change priority rules. |
| Submit QA Review | Researching; nonblank route, contact, summary, sources and valid-pattern report URL | Research and report actually exist; links match the company; uncertainties are visible. |
| Ready for Approval | QA Review; same evidence fields plus QA Pass, Cleared by Jeff, relationship approved/not applicable | QA was completed and permissions/clearance have evidence. |
| Approved | Ready for Approval; all preceding gates plus human checkbox and decision reason | Jeff's actual research-route decision. Does not authorize a message. |
| Hold | Decision or hold reason | Clear blocker and next owner/action. Available from any active stage. |
| Release Hold to Queued | Score 3–5, human checkbox and release reason | Jeff resolved the reason for the hold. A high score alone is insufficient. |
| Return to Researching | Available from QA Review or Ready for Approval | Correct/recheck evidence; prior QA is cleared. From Approved, first use Hold, then authorized release and reactivation. |

Reviewed evidence cannot be edited while staying Ready for Approval or Approved, or during direct Ready → Approved. Return to Researching through an allowed path to change evidence and re-review it. The current dashboard has no separate final-score field; put post-research score conclusions in the report and summary rather than pretending the preliminary score is a verified final qualification.

## 5. Read-only fields and controls

| Item | Where it comes from / how to use it |
|---|---|
| Awaiting approval | Count of current queue records in Ready for Approval; it is not a count of approved messages. |
| Active research | Count of records in Researching or QA Review. |
| Sent by AI | Fixed at zero because this dashboard has no sending capability; not an external email delivery audit. |
| Stage filters / Find company | View controls only. They do not change records, priority rules or approval status. |
| Company row score / status | Saved queue data, or repository/practice data according to the mode banner. |
| Activate / review / Open review | Opens the company form. A successful save performs a change. |
| Open research report | Opens the stored GitHub link; check access, company identity and report date. |
| Activity history | Saved actions with timestamp, actor, from/to stage and decision note. Practice entries use Practice reviewer; shared actions use the authorized account identity. It is not proof that a source was verified. |
| Existing message drafts | Three prior beta drafts retained for reading. They are not automatically generated from new queue entries and are not current send approvals. |

## 6. Common problems

| Problem | What to do |
|---|---|
| Add opportunity / review buttons disabled | Check the connection banner. Use practice mode only for training; configure shared access for real work. |
| Company already exists | Find and use the existing record. Resolve an alias/parent mismatch before creating another. |
| A score-4 record will not activate | Another eligible score-5 company is still Queued. Clear the search/filter to inspect priority; do not hold higher scores just to bypass the rule. |
| Scored company remains on Hold | Rescoring does not release it. Record Jeff's actual release decision and move to Queued separately. |
| Cannot reach QA Review | Complete route, contact, summary, sources and the project report URL. Do not add filler just to satisfy validation. |
| Cannot reach Ready for Approval | QA, conflict clearance or relationship permission is incomplete. Resolve the actual issue, not only the dropdown. |
| Save says record changed in another session | Copy your unsaved notes, refresh, compare the latest record and reapply only appropriate changes. |
| Save response is uncertain | Do not assume success or repeatedly add the company. Refresh and inspect the record/history first. |
| Notes vanished after Save preliminary score | That button saves only scoring. Reopen and save research fields separately. |
| Need to correct identity/site or preserve a long history | Ask the maintainer for a supported correction/archive. Do not directly edit the shared row's technical storage or create a duplicate. |

## 7. Quick completion checklist

- Intake provenance and company identity recorded.
- Preliminary score justified; score gate and priority honored.
- Research route and contact/authority findings supported.
- Current report link opens and sources distinguish facts, indicators and hypotheses.
- Draft status reflects what actually exists.
- QA issues resolved or explicitly held.
- Conflict and relationship decisions came from Jeff's actual review.
- Next action, owner and open questions are visible.
- Correct saving mode and success message checked; history reviewed.
- Any outreach remains separately approved and manually sent.

## References and maintenance

- [Dashboard training module and pilot test](dashboard-training-module.md)
- [Dashboard implementation and setup](../../dashboard/README.md)
- [Project operating rules](../../AGENTS.md)
- [Prospect fit scoring rubric](../discovery/agent-skill-prospect-fit-scoring.md)
- [Compliance / QA rules](../discovery/agent-skill-compliance-qa-check.md)
- [Existing beta tracker](../../data/beta_tracker.csv)

Validation basis: actual intake/review labels, save handlers and workflow guards in the version 4 source. This guide distinguishes code-enforced completeness from human evidence checks. It does not claim that every browser interaction or live integration has been tested. Owner should review after each field, permission or workflow change.
