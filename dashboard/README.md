# Jeff Outreach Engine dashboard v2

GitHub is the source of truth for code, scoring rules, report links, documentation and release history. Google Sheets is the temporary shared workflow queue, until Jeff authorizes HubSpot access and mapping.

## What starts the workflow

The **Start an opportunity → Add opportunity** form accepts a company name, optional website, source notes (including pasted ZoomInfo details), and an optional preliminary score with a reason. Company-name-only intake creates an unscored Hold; it does not consume research credits. Preliminary scoring can be recorded inside the company review. Scores 1–2 remain held. Scores 3–5 can enter the queue, prioritized 5 then 4 then 3. Rescoring never silently releases an existing hold; human release is a separate action.

**Activate / review → Researching → Save** is the current activation trigger. This records the task in the queue; it does not invoke ZoomInfo or an autonomous research agent. Research findings and QA decisions can be recorded in the same dashboard. Human route approval is the final research decision, and communications require separate explicit approval and manual sending.

**ZoomInfo status:** no callable ZoomInfo connector is available in this Codex session. Pasted source details work now. A live feed, CSV batch import, scheduled intake and automatic research execution are not implemented. Jeff must supply authorized integration/API access and confirm the permitted workflow before live enrichment can be enabled. Source-provided indicators must remain labeled until validated. A connector available inside Codex does not automatically grant the hosted dashboard runtime access.

**Branding status:** no logo assets were found in the project. Approved logo files or exact source locations are required before adding branding; no substitute logos were invented.

## What works

- The full repository intake is shown, ranked by preliminary fit: 5, 4, 3, then held lower scores.
- Queued → Researching → QA Review → Ready for Approval → Approved or Hold.
- Activate / review opens a company. Select Researching and save to activate it. Activation records assigned work; it does not run a paid or autonomous research agent.
- Research summary, cited sources, GitHub report, contact/authority findings, route, next action, draft status, QA, conflict and relationship checks.
- Scores 1–2 cannot activate. Higher-scored queued companies must activate first. Higher-scored holds do not block eligible work.
- QA submission needs research evidence. Ready for Approval requires QA Pass, conflicts cleared by Jeff, and relationship permission approved or not applicable. Approved requires explicit human confirmation and a decision note.
- Hold requires a reason. Releasing an eligible hold requires human confirmation and a reason. Returning to research clears QA. Reviewed evidence cannot silently change.
- State, revision and audit event persist together in one Sheet row. Script locking prevents concurrent dashboard writes; stale edits are rejected. Retries with the same request ID do not repeat events.
- Three original message drafts remain readable. Old device-local send decisions are not promoted into shared approval. There is no sending API, CRM mutation, email permission or automatic outreach.

## Connection status

Shared mode is available only after the bridge is configured. Until then the repository snapshot is read-only. The clearly labeled practice mode is functional and saves only to this device; it never syncs into the live Sheet. A failed live request never falls back to a local success.

The current connected Drive search found a shared `Zoom info` Sheet, but did not verify it as the intended workflow tracker. Do not substitute it without confirmation. Jeff or the existing queue owner must confirm the Sheet URL and grant the bridge owner edit access. No new spreadsheet should be created.

## Setup using the existing Google Sheet

1. Confirm the existing Sheet URL and review `dist/seed.json` against its current records. The seed is a repository snapshot, not a current Sheet import. Reconcile IDs/statuses before setup; preserve existing work and approvals.
2. In one Apps Script project owned by an authorized Sheet editor, install the generated `integrations/Workflow.gs`, `integrations/Seed.gs`, and authored `integrations/Code.gs` from this GitHub revision.
3. Set Script Properties: `SPREADSHEET_ID`, `BRIDGE_KEY` (random secret of at least 32 characters), and `REVIEWER_EMAILS` (comma-separated authorized human reviewers). Never commit the key or place it in browser code.
4. Run `setupQueue` once after reconciliation. It creates only the `Engine Queue v2` tab within the existing spreadsheet; it refuses to overwrite an existing tab. Existing tabs remain untouched. Authorize spreadsheet access as the Sheet owner/editor.
5. Deploy the Apps Script as a web app executing as that owner. The server-to-server endpoint must accept requests without interactive Google login; the bridge validates its secret and reviewer allowlist before reading or writing. Review this deployment boundary with the owner; if organizational policy forbids it, keep live mode disconnected and use an approved authenticated backend instead. Do not expose the secret to visitors.
6. In private Sites runtime configuration set `SHEETS_BRIDGE_URL` to the deployed `/exec` URL, `SHEETS_BRIDGE_KEY` to the same secret, and `REVIEWER_EMAILS` to the same authorized reviewers. Keep the Site private. The Worker trusts identity headers only from Sites dispatch; do not deploy directly with client-spoofable headers.
7. Refresh the dashboard. Verify a successful shared read, activate one reviewed eligible test company, reload from a second authorized session, then verify stale-edit rejection and the audit row before calling the integration live-validated.

The Sheet's `Engine Queue v2` columns are `Company ID`, `Company`, `Score`, `Status`, `Record JSON`. The JSON includes evidence, revision and history and is authoritative. The other columns are a readable projection. Use the dashboard for edits; direct cell changes bypass ScriptLock and are unsupported. Protect the tab from casual manual edits. Use only one bridge project per queue. At 45,000 characters per record the bridge blocks writes until history is archived, avoiding Sheet cell-size overflow.

## Credentials / decisions needed from Jeff

- Existing queue URL and an authorized Google account with editor access; Sheet-owner OAuth authorization for Apps Script. This cannot be substituted with Joe's connector credentials.
- Jeff's reviewer identity and access to the private dashboard. Current Site is owner-only for Joe; Jeff access is not yet granted.
- Deployed bridge URL and matching secret set by the authorized owner; these are setup outputs, not Jeff's personal password.
- Later: HubSpot private-app/OAuth access and approved field mapping; Athena/conflict access or explicit checks from Jeff; ZoomInfo/LinkedIn access in Jeff's account for source validation. None is required to practice the workflow. Do not collect passwords in chat.

## Development and validation

No third-party dependencies are required. From this directory with Node 22+:

```sh
node scripts/build.cjs
node --test tests/*.test.cjs
node scripts/preview.mjs
```

`dist/index.html`, `dist/app.js`, `dist/styles.css`, `dist/workflow.js`, `dist/legacy.js`, and `dist/seed.json` are authored static sources retained from v1. `src/worker.js` is the private API gateway. Build regenerates the standalone Worker, hosting manifest copy, and Apps Script copies. GitHub remains canonical; Sites receives only this dashboard, never the parent repository's confidential source documents.

Tests cover progression, scores, ranking, holds, QA, human confirmation, evidence protection, stale writes, duplicate requests, Sheet adapter state/audit persistence, identity checks, missing credentials, cross-origin rejection, and asset routes. Sheet tests use mocks; they are not live Google integration validation. 19 automated checks currently pass, including intake, duplicate prevention and rescoring. No browser interaction testing or live Sheet writes have been performed in this build.

Official reference: [Google Apps Script locking](https://developers.google.com/apps-script/reference/lock/lock-service).
