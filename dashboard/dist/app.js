const REPORT_ROOT = "https://github.com/CoachAGP/jeff-outreach-engine/blob/main/docs/discovery/";
const REVIEW_KEY = "jeff-outreach-dashboard-review-v2";
const INTAKE_KEY = "jeff-outreach-dashboard-intake-v1";

const opportunities = [
  {
    id: "new-castle-maria",
    priority: "Priority 1",
    company: "New Castle Building Products",
    score: "5/5",
    filter: "ready",
    contact: "Maria Kotereva",
    route: "Warm path to finance; possible CFO/controller route",
    summary: "Multi-location building products distributor with visible finance leadership and fleet, logistics, and purchasing operations. Maria is a possible warm route into finance.",
    qa: "Pass; human approval required",
    decision: "Confirm comfort with the referral and send manually",
    report: "opportunity-report-new-castle-building-products.md",
    subject: "Subject: Quick question on New Castle's finance/operations route",
    draft: `Maria,

Joe Bouffard suggested I reach out to you with a quick routing question.

I work with ERA Group to help middle-market organizations reduce indirect supplier spend with deep category expertise, no upfront cost, and no additional cost to the business. New Castle looks like the kind of multi-location distribution operation where categories like fleet, logistics, facilities, purchasing, insurance, and technology could at least be worth a conversation, but I do not want to assume the right person internally.

Would John Hutt, Philip DeBellis, or someone else on the finance/operations side be the best person for me to speak with?

No obligation and no assumption that savings exist. The goal would simply be to see whether a spend review is relevant.

Thanks,

Jeff Peduto`
  },
  {
    id: "colony-grill-ken",
    priority: "Priority 2",
    company: "Colony Grill",
    score: "5/5",
    filter: "ready",
    contact: "Ken Martin",
    route: "Warm path to owner/operator route",
    summary: "Nine-location restaurant group with Connecticut expansion activity. Ken Martin is a senior operator/co-owner route; operating spend categories may warrant a conversation.",
    qa: "Pass; human approval required",
    decision: "Verify the channel and send manually",
    report: "opportunity-report-colony-grill.md",
    subject: "Subject: Quick question on Colony Grill operating spend",
    draft: `Ken,

Joe Bouffard suggested I reach out with a quick routing question.

I work with ERA Group to help middle-market organizations reduce indirect supplier spend with deep category expertise, no upfront cost, and no additional cost to the business. For multi-location restaurant groups, that can include facilities, waste, janitorial, insurance, merchant services, technology, uniforms, and related operating expenses.

Given Colony Grill's continued growth and multi-location footprint, I wanted to see whether this kind of review would be worth a short conversation, or whether someone else on the finance or operations side would be the better person to ask.

No obligation and no assumption that savings exist. The goal would simply be to see whether a spend review is relevant.

Thanks,

Jeff Peduto`
  },
  {
    id: "tvg-will",
    priority: "Priority 3",
    company: "TVG Fast and Fresh / Jimmy John's CT",
    score: "4/5",
    filter: "ready",
    contact: "Will Roth",
    route: "Warm path to franchise owner route",
    summary: "Connecticut Jimmy John's franchise group with at least three reported locations. Will Roth is an owner route; franchise purchasing rules may limit food-category flexibility.",
    qa: "Pass; human approval required",
    decision: "Verify the channel and send manually",
    report: "opportunity-report-tvg-fast-and-fresh-jimmy-johns.md",
    subject: "Subject: Quick operating-cost question for your Jimmy John's group",
    draft: `Will,

Joe Bouffard suggested I reach out with a quick routing question.

I work with ERA Group to help restaurant and middle-market operators reduce indirect supplier spend with deep category expertise, no upfront cost, and no additional cost to the business. For multi-location groups, that can include facilities, waste, janitorial, insurance, merchant services, technology, uniforms, and related operating expenses.

Given your Connecticut Jimmy John's growth, I wanted to see whether this kind of review would be worth a short conversation. I know franchise groups can have purchasing constraints, so the question is whether any local operating categories are flexible enough to review.

No obligation and no assumption that savings exist. The goal would simply be to see whether a spend review is relevant.

Thanks,

Jeff Peduto`
  }
];

const researchQueue = [
  { company: "Connecticut Spring & Stamping", status: "Needs validation", score: "5/5", route: "Direct CFO route to Mike Nowak", next: "Check HubSpot/Athena, then draft a CFO routing message.", filter: "validate" },
  { company: "Bohlsen Restaurant Group", status: "Needs validation", score: "5/5", route: "Restaurant-network warm check, then owner route", next: "Check whether Ken Martin, Will Roth, or restaurant contacts know Michael or Kurt Bohlsen.", filter: "validate" },
  { company: "Accede Mold & Tool", status: "Needs validation", score: "5/5", route: "Senior manufacturing route needs contact validation", next: "Use ZoomInfo or LinkedIn in Jeff's account to confirm the current senior route.", filter: "validate" },
  { company: "Prestige Consumer Healthcare", status: "Hold", score: "5/5", route: "CFO/COO route with public-company caution", next: "Decide whether public-company targets belong in beta wave one.", filter: "hold" },
  { company: "FGX International", status: "Hold", score: "5/5", route: "Buyer not confirmed; parent-company authority issue", next: "Resolve local authority versus EssilorLuxottica parent authority.", filter: "hold" }
];

const approvalQueue = document.querySelector("#approvalQueue");
const researchList = document.querySelector("#researchQueue");
const approvalTemplate = document.querySelector("#approval-card-template");
const researchTemplate = document.querySelector("#research-row-template");
function readReviews() {
  try {
    const value = JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch { return {}; }
}

function saveReview(id, review) {
  const reviews = readReviews();
  reviews[id] = review;
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));
}

function renderReviews() {
  approvalQueue.replaceChildren();
  const reviews = readReviews();
  for (const item of opportunities) {
    const fragment = approvalTemplate.content.cloneNode(true);
    const article = fragment.querySelector("article");
    const state = { conflict: "", qa: false, hubspot: false, subject: item.subject.replace(/^Subject:\s*/i, ""), draft: item.draft, approved: false, ...reviews[item.id] };
    fragment.querySelector(".priority").textContent = item.priority;
    fragment.querySelector("h3").textContent = item.company;
    fragment.querySelector(".score").textContent = item.score;
    fragment.querySelector(".research-summary").textContent = item.summary;
    fragment.querySelector(".contact").textContent = item.contact;
    fragment.querySelector(".route").textContent = item.route;
    fragment.querySelector(".report-link").href = `${REPORT_ROOT}${item.report}`;
    const subject = fragment.querySelector(".subject");
    const draft = fragment.querySelector(".draft");
    const qa = fragment.querySelector(".qa-check");
    const hubspot = fragment.querySelector(".hubspot-check");
    const approve = fragment.querySelector(".approve");
    const status = fragment.querySelector(".saved-decision");
    subject.value = state.subject;
    draft.value = state.draft;
    qa.checked = state.qa;
    hubspot.checked = state.hubspot;
    article.querySelectorAll('.conflict-check input').forEach((radio) => {
      radio.name = `conflict-${item.id}`;
      radio.checked = state.conflict === radio.value;
      radio.addEventListener("change", () => { state.conflict = radio.value; state.approved = false; persist(); });
    });

    function updateStatus() {
      const complete = state.conflict === "no" && state.qa && state.hubspot && state.subject.trim() && state.draft.trim();
      approve.disabled = !complete || state.approved;
      status.textContent = state.approved ? "Marked approved locally; Jeff sends manually" : state.conflict === "yes" ? "Conflict: do not send" : complete ? "Ready for Jeff's approval" : "Complete conflict, QA, and HubSpot checks before approval";
    }
    function persist() {
      saveReview(item.id, state);
      updateStatus();
      const current = readReviews();
      document.querySelector("#readyCount").textContent = opportunities.filter((opportunity) => !current[opportunity.id]?.approved).length;
    }
    qa.addEventListener("change", () => { state.qa = qa.checked; state.approved = false; persist(); });
    hubspot.addEventListener("change", () => { state.hubspot = hubspot.checked; state.approved = false; persist(); });
    subject.addEventListener("input", () => { state.subject = subject.value; state.approved = false; persist(); });
    draft.addEventListener("input", () => { state.draft = draft.value; state.approved = false; persist(); });
    approve.addEventListener("click", () => {
      if (state.conflict !== "no" || !state.qa || !state.hubspot || !state.subject.trim() || !state.draft.trim()) return;
      state.approved = true;
      persist();
    });
    updateStatus();
    approvalQueue.append(fragment);
  }

  researchList.replaceChildren();
  for (const item of researchQueue) {
    const fragment = researchTemplate.content.cloneNode(true);
    fragment.querySelector(".status").textContent = item.status;
    fragment.querySelector("h3").textContent = item.company;
    fragment.querySelector(".next").textContent = item.next;
    fragment.querySelector(".score").textContent = item.score;
    researchList.append(fragment);
  }
  document.querySelector("#readyCount").textContent = opportunities.filter((item) => !reviews[item.id]?.approved).length;
  document.querySelector("#researchCount").textContent = researchQueue.length;
}

renderReviews();

const intakeList = document.querySelector("#intakeList");
const intakeFeedback = document.querySelector("#intakeFeedback");

function readIntake() {
  try {
    const value = JSON.parse(localStorage.getItem(INTAKE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((item) => item && typeof item.company === "string") : [];
  } catch { return []; }
}

function writeIntake(items) {
  localStorage.setItem(INTAKE_KEY, JSON.stringify(items));
  renderIntake();
}

function addIntakeField(parent, label, value, onChange) {
  const field = document.createElement("label");
  field.textContent = label;
  const control = document.createElement("select");
  for (const option of value.options) {
    const element = document.createElement("option");
    element.value = option[0];
    element.textContent = option[1];
    control.append(element);
  }
  control.value = value.selected;
  control.addEventListener("change", () => onChange(control.value));
  field.append(control);
  parent.append(field);
}

function renderIntake() {
  const items = readIntake();
  intakeList.replaceChildren();
  document.querySelector("#intakeCount").textContent = `${items.length} companies`;
  document.querySelector("#intakeEmpty").hidden = items.length > 0;
  const ranked = [...items].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));

  for (const item of ranked) {
    const article = document.createElement("article");
    article.className = "intake-row";
    const title = document.createElement("div");
    const name = document.createElement("h4");
    name.textContent = item.company;
    const meta = document.createElement("p");
    const fit = Number(item.score);
    meta.textContent = `${item.source} | ${item.date} | ${fit >= 3 ? "Research candidate" : fit > 0 ? "Triage only" : "Needs score"}`;
    title.append(name, meta);
    article.append(title);

    addIntakeField(article, "Preliminary fit", {
      selected: item.score || "", options: [["", "Unscored"], ["1", "1 - Poor"], ["2", "2 - Weak"], ["3", "3 - Possible"], ["4", "4 - Good"], ["5", "5 - Strong"]]
    }, (score) => {
      item.score = score;
      writeIntake(items);
    });
    intakeList.append(article);
  }
}

document.querySelector("#intakeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#companyInput");
  const names = input.value.split(/\r?\n/).map((name) => name.trim()).filter(Boolean);
  const items = readIntake();
  const existing = new Set(items.map((item) => item.company.toLocaleLowerCase()));
  let added = 0;
  for (const company of names) {
    if (existing.has(company.toLocaleLowerCase())) continue;
    items.push({ company, source: document.querySelector("#sourceInput").value, date: new Date().toISOString().slice(0, 10), score: "" });
    existing.add(company.toLocaleLowerCase());
    added += 1;
  }
  writeIntake(items);
  intakeFeedback.textContent = `${added} added; ${names.length - added} already present.`;
  input.value = "";
});

document.querySelector("#copyResearch").addEventListener("click", async () => {
  const queued = readIntake().filter((item) => Number(item.score) >= 3)
    .sort((a, b) => Number(b.score) - Number(a.score));
  if (!queued.length) {
    intakeFeedback.textContent = "Score at least one company 3 or higher first.";
    return;
  }
  const list = queued.map((item) => `- ${item.company}: preliminary fit ${item.score}/5; source ${item.source}`).join("\n");
  const request = `Run the Jeff Outreach Engine research queue for these companies in score order:\n${list}\n\nCheck Athena and HubSpot conflicts before outreach recommendations. Deep-research only scores 3-5, verify facts and likely contacts, and return a compact decision-first report with sources, QA status, and blockers. Do not send messages or change HubSpot records without Jeff's explicit approval.`;
  try {
    await navigator.clipboard.writeText(request);
    intakeFeedback.textContent = `Research request for ${queued.length} companies copied. Paste it into Jeff's Codex task.`;
  } catch {
    intakeFeedback.textContent = "Clipboard access is unavailable in this browser. Open this dashboard through the local server and try again.";
  }
});

renderIntake();
