const REPORT_ROOT = "https://github.com/CoachAGP/jeff-outreach-engine/blob/main/docs/discovery/";
const STORAGE_KEY = "jeff-outreach-dashboard-decisions-v1";

const opportunities = [
  {
    id: "new-castle-maria",
    priority: "Priority 1",
    company: "New Castle Building Products",
    score: "5/5",
    filter: "ready",
    contact: "Maria Kotereva",
    route: "Warm path to finance; possible CFO/controller route",
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
const approvalEmpty = document.querySelector("#approvalEmpty");
const researchEmpty = document.querySelector("#researchEmpty");

function readDecisions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

function saveDecision(id, decision) {
  const decisions = readDecisions();
  decisions[id] = decision;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
}

function labelDecision(value) {
  return ({ approved: "Approved for manual send", edits: "Needs edits", hold: "On hold", rejected: "Rejected" })[value] || "";
}

function applyDecisionState(article, id) {
  const value = readDecisions()[id];
  article.querySelectorAll("[data-decision]").forEach((button) => button.classList.toggle("selected", button.dataset.decision === value));
  article.querySelector(".saved-decision").textContent = value ? `Saved: ${labelDecision(value)}` : "No decision saved yet";
}

function render(filter = "all") {
  approvalQueue.innerHTML = "";
  researchList.innerHTML = "";
  const visibleOpportunities = opportunities.filter((item) => filter === "all" || item.filter === filter);
  const visibleResearch = researchQueue.filter((item) => filter === "all" || item.filter === filter);

  visibleOpportunities.forEach((item) => {
    const fragment = approvalTemplate.content.cloneNode(true);
    const article = fragment.querySelector("article");
    article.dataset.status = item.filter;
    article.dataset.id = item.id;
    fragment.querySelector(".priority").textContent = item.priority;
    fragment.querySelector("h3").textContent = item.company;
    fragment.querySelector(".score").textContent = item.score;
    fragment.querySelector(".contact").textContent = item.contact;
    fragment.querySelector(".route").textContent = item.route;
    fragment.querySelector(".qa").textContent = item.qa;
    fragment.querySelector(".decision").textContent = item.decision;
    fragment.querySelector(".subject").textContent = item.subject;
    fragment.querySelector(".draft").textContent = item.draft;
    fragment.querySelector(".report-link").href = `${REPORT_ROOT}${item.report}`;
    article.querySelectorAll("[data-decision]").forEach((button) => {
      button.addEventListener("click", () => {
        saveDecision(item.id, button.dataset.decision);
        applyDecisionState(article, item.id);
      });
    });
    applyDecisionState(article, item.id);
    approvalQueue.appendChild(fragment);
  });

  visibleResearch.forEach((item) => {
    const fragment = researchTemplate.content.cloneNode(true);
    const article = fragment.querySelector("article");
    article.dataset.status = item.filter;
    fragment.querySelector(".status").textContent = item.status;
    fragment.querySelector("h3").textContent = item.company;
    fragment.querySelector(".route").textContent = item.route;
    fragment.querySelector(".next").textContent = item.next;
    fragment.querySelector(".score").textContent = item.score;
    researchList.appendChild(fragment);
  });

  approvalEmpty.hidden = visibleOpportunities.length > 0;
  researchEmpty.hidden = visibleResearch.length > 0;
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.filter);
  });
});

document.querySelector("#readyCount").textContent = opportunities.length;
document.querySelector("#researchCount").textContent = researchQueue.length;

if (document.modelContext?.registerTool) {
  const allowed = ["approved", "edits", "hold", "rejected"];
  void Promise.resolve(document.modelContext.registerTool({
    name: "record_outreach_review_decision",
    title: "Record outreach review decision",
    description: "Save Jeff's review decision for one dashboard opportunity on this device.",
    inputSchema: {
      type: "object",
      properties: { opportunityId: { type: "string" }, decision: { type: "string", enum: allowed } },
      required: ["opportunityId", "decision"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!opportunities.some((item) => item.id === input.opportunityId)) throw new Error("Unknown opportunity");
      if (!allowed.includes(input.decision)) throw new Error("Invalid decision");
      saveDecision(input.opportunityId, input.decision);
      render(document.querySelector(".filter.active")?.dataset.filter || "all");
      return { opportunityId: input.opportunityId, decision: input.decision, saved: true };
    }
  })).catch(() => {});
}

render();
