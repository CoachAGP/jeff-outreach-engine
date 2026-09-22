# Jeff Outreach Engine dashboard beta

The September 22, 2026 snapshot contains only Accede Mold & Tool, Delcath Systems, and AngioDynamics. The prior 50-company snapshot is archived in the central GitHub repository at `data/archive/dashboard-seed-before-2026-09-22.json`. Earlier message examples are not served by the dashboard.

Each current company has a sourced report, a first-person Jeff draft, and a QA result. Conflict clearance, Jeff-account HubSpot/Athena checks, HubSpot entry/review, and Jeff's send approval remain pending. The connected Joe HubSpot portal was searched read-only; no CRM record was created or updated.

The shared Google Sheet bridge is not configured. Consequently the published Site displays a read-only snapshot. Practice mode saves only to the current device and never syncs to Jeff. It uses a new local key for this pilot so old practice records do not reappear.

The Site does not run research agents, use paid ZoomInfo credits, write to HubSpot, or send messages. Its `hubspotReviewed` checkbox is a human attestation, not an integration. Do not mark a draft ready until Jeff has checked his own HubSpot/Athena and resolved any conflict.

## Build and test

With Node 22+:

```sh
node scripts/build.cjs
node --test tests/*.test.cjs
node scripts/preview.mjs
```

Build before publishing. The build embeds the authored dashboard assets in `dist/server/index.js`, copies `.openai/hosting.json`, and regenerates the Apps Script workflow/seed files. Publishing without building can leave the live Worker serving old code.

`src/worker.js` is the API gateway. `integrations/` contains the optional Sheet bridge. `tests/` covers gates, audit behavior, access checks, and served assets. GitHub stores the durable reports and process files.
