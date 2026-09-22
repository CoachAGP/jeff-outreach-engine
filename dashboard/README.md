# Jeff Outreach Engine dashboard

This directory mirrors the published Sites dashboard source. Build from here with Node 22+:

```sh
npm run build
npm test
```

The build embeds `dist/index.html`, `dist/app.js`, `dist/styles.css`, `dist/workflow.js`, `dist/legacy.js`, and `dist/seed.json` into `dist/server/index.js`. Always run the build before publishing; publishing only the authored files leaves the live Worker serving the previous interface.

The company review uses one page section for the GitHub report, research summary, conflict Yes/No, QA check, HubSpot entry-and-review confirmation, and draft. A draft is generated when the research evidence is complete. Saving advances eligible work to QA Review or Ready for Approval automatically. Jeff must explicitly approve a completed draft for manual sending. The dashboard does not send messages or write HubSpot records.

The shared Google Sheet bridge is not configured. The public dashboard therefore shows a read-only repository snapshot. Practice mode writes only to the current device. The HubSpot checkbox records human confirmation, not a live integration. Do not treat practice changes as shared results.

Before shared use, an authorized owner must confirm the intended existing Sheet, reconcile its records with `dist/seed.json`, configure the Apps Script files under `integrations/`, and set the Site's private bridge environment variables. Do not publish bridge keys, create a replacement Sheet without approval, or import the seed over existing work.

`src/worker.js` implements the private API. `tests/` checks workflow gates, audit persistence, and Worker access. The published Site project ID is in `.openai/hosting.json`.
