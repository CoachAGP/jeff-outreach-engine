/* Shared by the browser preview and the authoritative Sheet adapter. */
const Workflow = (() => {
  const states = ['Queued', 'Researching', 'QA Review', 'Ready for Approval', 'Approved', 'Hold'];
  const edges = {'Queued':['Researching','Hold'], 'Researching':['QA Review','Hold'], 'QA Review':['Researching','Ready for Approval','Hold'], 'Ready for Approval':['Researching','Approved','Hold'], 'Approved':['Hold'], 'Hold':['Queued']};
  const fields = ['route','contact','report','summary','sources','conflicts','relationship','qa','note','draftStatus'];
  const eligible = r => Number.isInteger(r.score) && r.score >= 3 && r.score <= 5;
  const ranked = rows => [...rows].sort((a,b) => b.score-a.score || a.company.localeCompare(b.company));
  function apply(rows, cmd, actor, now = new Date().toISOString()) {
    const index = rows.findIndex(r => r.id === cmd.id);
    if (index < 0) throw Error('Company not found. Refresh the queue.');
    const old = rows[index];
    if (typeof cmd.note !== 'undefined' && (typeof cmd.note !== 'string' || cmd.note.length > 4000)) throw Error('Decision note must be text of at most 4,000 characters.');
    if (!actor || !cmd.requestId || typeof cmd.requestId !== 'string') throw Error('Reviewer and request ID are required.');
    if (old.history.some(h => h.requestId === cmd.requestId)) return rows;
    if (cmd.revision !== old.revision) throw Error('This company changed in another session. Refresh before saving.');
    if (cmd.to !== old.status && !(edges[old.status] || []).includes(cmd.to)) throw Error('That workflow transition is not allowed.');
    if (!states.includes(cmd.to)) throw Error('Unknown workflow status.');
    const next = {...old};
    for (const key of Object.keys(cmd.patch || {})) {
      if (!fields.includes(key)) throw Error('Unsupported field: '+key);
      if (typeof cmd.patch[key] !== 'string' || cmd.patch[key].length > 4000) throw Error('Each field must be text of at most 4,000 characters.');
      next[key] = cmd.patch[key].trim();
    }
    if (['Approved','Ready for Approval'].includes(old.status) && !['Researching','Hold'].includes(cmd.to) && fields.some(k => next[k] !== old[k])) throw Error('Return to research before changing reviewed evidence.');
    if (cmd.to !== 'Hold' && !eligible(next)) throw Error('Only preliminary scores 3–5 qualify. Scores 1–2 stay on hold.');
    if (cmd.to === 'Researching' && old.status === 'Queued') {
      const higher = rows.find(r => r.status === 'Queued' && eligible(r) && r.score > next.score);
      if (higher) throw Error('Activate queued score '+higher.score+' companies first. Priority is 5, then 4, then 3.');
    }
    if (['QA Review','Ready for Approval','Approved'].includes(cmd.to)) {
      for (const k of ['route','contact','summary','sources','report']) if (!next[k]) throw Error('Complete '+k+' before QA review.');
      if (!/^https:\/\/github\.com\/CoachAGP\/jeff-outreach-engine\/blob\/[^\s]+$/.test(next.report)) throw Error('Link the research report committed to the project GitHub repository.');
    }
    if (['Ready for Approval','Approved'].includes(cmd.to)) {
      if (next.qa !== 'Pass' || next.conflicts !== 'Cleared by Jeff' || !['Approved by Jeff','Not applicable'].includes(next.relationship)) throw Error('QA must pass, conflicts must be cleared by Jeff, and the relationship path must be approved or not applicable.');
    }
    if (cmd.to === 'Approved' && (!cmd.humanConfirmed || !cmd.note?.trim())) throw Error('Confirm human route approval and add a decision note.');
    if (cmd.to === 'Hold' && !cmd.note?.trim()) throw Error('Explain the hold and what must be resolved.');
    if (old.status === 'Hold' && cmd.to === 'Queued' && (!cmd.humanConfirmed || !cmd.note?.trim())) throw Error('Confirm human review and explain why the hold is resolved.');
    next.status = cmd.to;
    if (cmd.to === 'Researching' && old.status !== 'Researching') next.qa = '';
    next.revision = old.revision + 1;
    next.history = [...old.history, {requestId:cmd.requestId, at:now, actor, from:old.status, to:next.status, note:cmd.note || 'Research fields updated', changes:Object.fromEntries(fields.filter(k=>old[k]!==next[k]).map(k=>[k,{from:old[k],to:next[k]}]))}];
    return rows.map((r,i) => i===index ? next : r);
  }
  return {states, edges, eligible, ranked, apply};
})();
if (typeof module !== 'undefined') module.exports = Workflow;
