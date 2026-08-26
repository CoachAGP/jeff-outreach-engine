# Agent Skill: Prospect Fit Scoring

Status: beta v0.1.

Purpose: score a company from 1 to 5 for fit with the Jeff Outreach Engine beta, using evidence from approved research sources. This skill helps prioritize prospects. It does not approve outreach, create opportunities, or make final qualification decisions.

## Score Scale

- `5`: Excellent beta fit.
- `4`: Strong fit.
- `3`: Possible fit; needs more research or human review.
- `2`: Weak fit.
- `1`: Poor fit or likely disqualified.

Use half-points only in working notes if helpful, but final score should be a whole number from 1 to 5.

## Highest-Weight Factors

The top weighted factors are:

1. Revenue / spend size.
2. Urgency trigger or news event.
3. Industry fit.

Secondary factors:

- Multiple locations.
- Likely relevant spend categories.
- CFO / owner / controller identified.
- Warm introduction available.
- Intent signal.
- Public evidence quality.

## Hard Disqualifiers

Return `1` and flag for human review if any of the following are true:

- Outside the United States.
- Too small with no evidence of meaningful addressable spend.
- Spend appears mostly labor/headcount with little indirect spend opportunity.
- Existing client.
- Active opportunity already owned.
- Opt-out or do-not-contact.
- Known duplicate or ownership conflict that cannot be resolved safely.

Do not disqualify solely because a company is public, private, a municipality, or large enterprise. Use caution rules instead.

## Revenue / Spend Rules

- Preferred: `$20M+` annual gross revenue.
- Possible fit: `$15M-$20M` when other signals are strong.
- Below `$15M`: generally weak unless there is clear evidence of substantial addressable spend.
- Restaurant exception: restaurant groups may qualify below `$15M` if food or operating spend is meaningful.
- Upper range: `$750M` is a practical prioritization guide, not a hard ceiling.

Revenue is a proxy. The real question is whether there is enough relevant spend to justify specialist work.

Category spend thresholds are TBD. Jeff referenced many categories needing roughly `$100K+` in spend, but the internal category-threshold document is not yet available.

## Beta Segment Priority

Prioritize beta prospects in this order:

1. Manufacturing.
2. Healthcare / clinics.
3. Private education.
4. Nonprofits.
5. Multi-location restaurants.

Other good-fit sectors may still score well, but beta focus should favor the list above.

## Scoring Rubric

Start at `3`, then adjust.

### Revenue / Spend Size

Add:

- `+1` if revenue is `$20M+` or spend appears clearly meaningful.
- `+0.5` if revenue is `$15M-$20M` with other strong signals.
- `+0.5` if employee count is roughly `50-80+` and revenue is unknown.

Subtract:

- `-1` if revenue appears below `$15M` and no exception applies.
- `-1` if available evidence suggests low relevant spend.

### Urgency Trigger / News Event

Add:

- `+1` for clear current trigger: expansion, acquisition, new location, growth, tariff pressure, margin pressure, funding/grant pressure, hiring for procurement/cost reduction, or efficiency initiative.
- `+0.5` for weaker but relevant topical context.

Subtract:

- `-0.5` if no current trigger or timely hook is found.

### Industry Fit

Add:

- `+1` for top beta segment fit.
- `+0.5` for other known strong-fit industry.

Subtract:

- `-1` for labor-heavy service businesses unless meaningful indirect spend is visible.
- `-0.5` for municipalities or red-tape-heavy organizations.

### Multiple Locations

Add:

- `+0.5` for multiple locations.
- `+0.5` for warehouses, fleets, manufacturing facilities, campuses, clinics, branches, or distributed purchasing.

### Relevant Spend Categories

Add:

- `+1` if three or more relevant spend-category hypotheses are supported.
- `+0.5` if one or two relevant spend-category hypotheses are supported.

Relevant categories include insurance, telecom, technology, packaging, facilities, janitorial, small parcel, freight, logistics, waste, food, merchant card services, payroll, HR outsourcing, uniforms, linens, records, medical supplies, office supplies, chemicals, food contracts, and land management.

### Decision Maker

Add:

- `+0.5` if a CFO is identified with medium or high confidence.
- `+0.25` if owner, CEO, or controller is identified and no CFO is visible.

Subtract:

- `-0.5` if no plausible financial decision-maker is found.

### Warm Intro / Relationship Path

Add:

- `+0.5` if a warm intro path exists and is approved for consideration.

Do not use a relationship lead for outreach unless explicitly approved.

### Intent Signal

Add:

- `+0.5` for intent around cost optimization, cost reduction, expense reduction, working capital, procurement improvement, operational efficiency, or similar.

## Score Interpretation

### Score 5: Excellent Fit

Typical profile:

- `$20M+` or clearly meaningful spend.
- Top beta segment.
- Current trigger or intent.
- Multiple likely spend categories.
- CFO/owner/controller identified.
- No disqualifiers.

Action: prepare research brief and human-review outreach draft.

### Score 4: Strong Fit

Typical profile:

- Meets most core criteria.
- May lack either trigger, decision-maker confidence, or full category clarity.

Action: research further or prepare draft with clear assumptions.

### Score 3: Possible Fit

Typical profile:

- Some fit signals, but missing key evidence.
- Needs revenue, decision-maker, category, or trigger validation.

Action: hold for more research or human review.

### Score 2: Weak Fit

Typical profile:

- Below target size, weak category fit, no urgency, or labor-heavy.

Action: deprioritize unless a human provides a reason to pursue.

### Score 1: Poor Fit / Disqualified

Typical profile:

- Hard disqualifier, very low spend, outside U.S., opt-out, active opportunity, existing client, or mostly headcount spend.

Action: do not pursue without human override.

## Required Output Format

```markdown
Prospect Fit Score: 4/5

Decision: Strong fit

Top reasons:
- $20M+ revenue indicator.
- Manufacturing company with likely freight, packaging, facilities, and insurance spend.
- Recent expansion creates a timely outreach hook.

Caution flags:
- CFO not yet verified.
- Revenue source is estimated.

Fact vs inference:
- Verified fact: Company operates three manufacturing facilities. Source: company website.
- Reasonable indicator: Freight and packaging are likely relevant. Source: industry/category mapping.
- Hypothesis: Expansion may increase working-capital pressure. Needs validation.

Recommended next action:
- Verify CFO or senior finance contact.
- Prepare human-review outreach draft if contact confidence reaches medium or high.
```

## QA Handoff

Every prospect scored `4` or `5` should go through the Compliance / QA Check before outreach is used.

Every prospect scored `3` should go through human review before outreach drafting.

Every prospect scored `1` or `2` should be deprioritized unless a human explicitly overrides.
