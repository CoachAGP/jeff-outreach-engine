# Dashboard v2 handoff — 2026-09-10

Implemented the preliminary-score research activation workflow and shared-Sheet adapter. GitHub remains canonical. No outreach was sent or approved by this development run.

## Run accounting

- Intake: 50 rows (28 queued, 22 held) from `data/zoominfo_intent_beta_intake_2026_08_26.csv`, stable IDs, score and source-provided triage reasons. No new prospect facts inferred.
- Ranking: score 5 before 4 before 3, enforced on activation. Scores 1–2 held. Existing Prestige and FGX sensitivity holds preserved.
- Route: researcher records recommendation; Jeff's clearance is required before route approval.
- Drafts: prior three beta drafts preserved for reading, not silently approved. No new outreach drafted.
- QA: human research QA must pass before Ready for Approval; score and state validation also run authoritatively at the Sheet adapter.
- Tracker: shared adapter implemented; live connection unconfigured. No Sheet write claimed. Practice state is isolated.
- Open questions: confirm existing queue URL, reconcile seed with current queue, authorize/deploy bridge, configure secrets and Jeff's access. HubSpot/Athena and Jeff-account enrichment checks remain pending.

See `dashboard/README.md` for exact setup and credential ownership. Successful local automated tests do not establish live Sheet delivery or Jeff access. Activation tracks research work; it does not invoke paid agents.

Validation: 15 automated checks passed, plus asset routing, successful local HTTP response and clean whitespace checks. Browser interaction QA and live Google integration remain unperformed.

## Company intake follow-up

Added the Start an opportunity form with name, optional website, source notes, preliminary score and reason. Added authoritative Sheet intake and triage operations, duplicate prevention, retry handling and safe spreadsheet text values. Unscored companies remain held until scored and explicitly released. Activation remains a tracked research task, not an automated provider call. 19 automated checks pass. ZoomInfo access, logo files, live Sheet connection and private publication remain pending.
