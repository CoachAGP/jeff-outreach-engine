/* Shared by the browser preview and the authoritative Sheet adapter. */
const Workflow = (() => {
  const states = ['Queued', 'Researching', 'QA Review', 'Ready for Approval', 'Approved', 'Hold'];
  const edges = {'Queued':['Researching','Hold'], 'Researching':['QA Review','Hold'], 'QA Review':['Researching','Ready for Approval','Hold'], 'Ready for Approval':['Researching','Approved','Hold'], 'Approved':['Hold'], 'Hold':['Queued']};
  const fields = ['route','contact','report','summary','sources','conflicts','relationship','qa','note','draftStatus'];
  const eligible = r => Number.isInteger(r.score) && r.score >= 3 && r.score <= 5;
  const ranked = rows => [...rows].sort((a,b) => b.score-a.score || a.company.localeCompare(b.company));
  const normalizeName = value => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  function intake(rows, cmd, actor, now = new Date().toISOString()) {
    if (!actor || typeof cmd.requestId !== 'string' || !/^[\w-]{1,100}$/.test(cmd.requestId)) throw Error('Reviewer and valid request ID required.');
    if (rows.some(r => r.history.some(h => h.requestId === cmd.requestId))) return rows;
    const company = typeof cmd.company === 'string' ? cmd.company.trim() : '';
    if (!company || company.length > 200 || !normalizeName(company)) throw Error('Enter a company name of at most 200 characters.');
    if (rows.some(r => normalizeName(r.company) === normalizeName(company))) throw Error('This company is already in the queue. Search and open its existing record.');
    const website = typeof cmd.website === 'string' ? cmd.website.trim() : '';
    if (website && !/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:[/?#][^\s]*)?$/i.test(website)) throw Error('Use a complete HTTPS company website URL.');
    for (const field of ['source','reason']) if (typeof cmd[field] !== 'string' || cmd[field].length > 4000) throw Error('Source and score reason must be text of at most 4,000 characters.');
    if (!cmd.source.trim()) throw Error('Record where this opportunity came from.');
    const score = cmd.score;
    if (!Number.isInteger(score) || score < 0 || score > 5) throw Error('Choose a preliminary score from 1 to 5, or leave unscored.');
    if (score && !cmd.reason.trim()) throw Error('Explain the preliminary score using available evidence.');
    const status = score >= 3 ? 'Queued' : 'Hold';
    const record = {id:'intake-'+cmd.requestId, company, website, score, status, reason:cmd.reason.trim() || 'Not scored. Preliminary review required.', route:'', contact:'', report:'', summary:'', sources:cmd.source.trim(), conflicts:'', relationship:'', qa:'', note:score>=3?'Ready for research activation in score order.':score?'Score 1–2: no deep research.':'Assign a preliminary score before research.', revision:0, draftStatus:'Not drafted', history:[{requestId:cmd.requestId, at:now, actor, from:'Intake', to:status, note:'Company added; source data is unverified until checked.'}]};
    return [...rows,record];
  }
  function triage(rows, cmd, actor, now = new Date().toISOString()) {
    const old = rows.find(r => r.id === cmd.id);
    if (!old || !actor || typeof cmd.requestId !== 'string') throw Error('Company, reviewer and request ID required.');
    if (old.history.some(h=>h.requestId===cmd.requestId)) return rows;
    if (old.revision !== cmd.revision) throw Error('This company changed in another session. Refresh before saving.');
    if (!['Hold','Queued'].includes(old.status)) throw Error('Preliminary scoring is available only before active research or while on hold.');
    if (!Number.isInteger(cmd.score) || cmd.score<1 || cmd.score>5 || typeof cmd.reason!=='string' || !cmd.reason.trim() || cmd.reason.length>4000) throw Error('Provide a score from 1 to 5 and an evidence-based reason.');
    // A revised score does not release an existing hold; human review remains separate.
    const status=old.status==='Hold'||cmd.score<3?'Hold':'Queued';
    const next={...old,score:cmd.score,reason:cmd.reason.trim(),status,revision:old.revision+1,history:[...old.history,{requestId:cmd.requestId,at:now,actor,from:old.status,to:status,note:'Preliminary score '+old.score+' → '+cmd.score+': '+cmd.reason.trim()}]};
    return rows.map(r=>r.id===next.id?next:r);
  }
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
  return {states, edges, eligible, ranked, intake, triage, apply};
})();
