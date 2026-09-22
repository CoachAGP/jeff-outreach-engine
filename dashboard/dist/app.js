const $ = selector => document.querySelector(selector);
let rows = [], seed = [], filter = 'All', mode = 'disconnected', selected = null, busy = false;
const PRACTICE_KEY = 'jeff-engine-practice-v4';
const text = (tag, value, className) => { const el = document.createElement(tag); el.textContent = value; if (className) el.className = className; return el; };
const reportIsValid = url => /^https:\/\/github\.com\/CoachAGP\/jeff-outreach-engine\/blob\/[^\s]+$/.test(url || '');
const evidenceReady = record => ['route', 'contact', 'summary', 'sources', 'report'].every(key => record[key]?.trim()) && reportIsValid(record.report);
const gatesReady = record => evidenceReady(record) && record.conflicts === 'No' && record.qa === 'Pass' && record.hubspotReviewed === 'Yes' && !!record.draftSubject && !!record.draft;
function message(value) { $('#notice').textContent = value; }
function closeEditor() { selected = null; $('#editor').hidden = true; }
function render() {
  $('#addOpportunity').disabled = mode === 'disconnected';
  $('#readyCount').textContent = rows.filter(r => r.status === 'Ready for Approval').length;
  $('#researchCount').textContent = rows.filter(r => ['Researching', 'QA Review'].includes(r.status)).length;
  $('#filters').replaceChildren();
  for (const state of ['All', 'Queued', 'Researching', 'QA Review', 'Ready for Approval', 'Approved', 'Hold']) {
    const count = rows.filter(r => state === 'All' || r.status === state).length;
    const button = text('button', `${state} (${count})`, filter === state ? 'active' : '');
    button.onclick = () => { filter = state; closeEditor(); render(); };
    $('#filters').append(button);
  }
  const visible = Workflow.ranked(rows).filter(r => (filter === 'All' || r.status === filter) && r.company.toLowerCase().includes($('#search').value.toLowerCase()));
  $('#resultCount').textContent = `${visible.length} of ${rows.length} companies · ${mode === 'shared' ? 'Shared queue' : mode === 'practice' ? 'Practice data' : 'Read-only snapshot'}`;
  $('#researchQueue').replaceChildren();
  for (const record of visible) {
    const row = text('article', '', 'research-row');
    row.dataset.status = record.status.toLowerCase();
    const heading = text('div', '');
    heading.append(text('p', record.status, 'status'), text('h3', record.company));
    const detail = text('p', record.summary || record.reason || 'No research summary yet.', 'row-detail');
    const score = text('span', record.score ? `${record.score}/5` : 'Unscored', 'score');
    const button = text('button', 'Review');
    button.onclick = () => openEditor(record.id);
    row.append(heading, detail, score, button);
    $('#researchQueue').append(row);
  }
  $('#researchEmpty').hidden = visible.length > 0;
}
function readForm() {
  const form = $('#editForm');
  const patch = {};
  for (const name of ['route', 'contact', 'report', 'summary', 'sources', 'note', 'draftSubject', 'draft']) patch[name] = form.elements[name].value;
  patch.conflicts = form.querySelector('input[name="conflicts"]:checked')?.value || '';
  patch.qa = $('#qaCheck').checked ? 'Pass' : '';
  patch.hubspotReviewed = $('#hubspotCheck').checked ? 'Yes' : '';
  patch.draftStatus = patch.draft.trim() ? 'Draft awaiting separate approval' : 'Not drafted';
  return patch;
}
function updateReviewStatus() {
  if (!selected) return;
  const candidate = {...selected, ...readForm()};
  const draft = Workflow.draftFor(candidate);
  if (draft && !candidate.draftSubject && !candidate.draft) {
    $('#editForm').elements.draftSubject.value = draft.draftSubject;
    $('#editForm').elements.draft.value = draft.draft;
    $('#draftHint').textContent = 'Created from research. Review before approval.';
    candidate.draftSubject = draft.draftSubject;
    candidate.draft = draft.draft;
  } else if (!draft) $('#draftHint').textContent = 'Add research details to generate a draft.';
  const missing = [];
  if (!evidenceReady(candidate)) missing.push('research details and GitHub report');
  if (candidate.conflicts !== 'No') missing.push('no-conflict check');
  if (candidate.qa !== 'Pass') missing.push('QA check');
  if (candidate.hubspotReviewed !== 'Yes') missing.push('HubSpot entry and review');
  if (!candidate.draftSubject || !candidate.draft) missing.push('message draft');
  $('#reviewStatus').textContent = selected.status === 'Approved' ? 'Approved for manual send. No message has been sent.' : missing.length ? `Still needed: ${missing.join(', ')}.` : 'All checks complete. Save review, then Jeff can approve the draft.';
  $('#approve').hidden = selected.status !== 'Ready for Approval';
  $('#approve').disabled = mode === 'disconnected' || busy;
}
function openEditor(id) {
  selected = rows.find(r => r.id === id);
  const record = selected;
  $('#editTitle').textContent = record.company;
  $('#editStatus').textContent = `${record.status} · Preliminary fit ${record.score || 'unscored'}/5`;
  $('#editReason').textContent = record.reason || '';
  $('#hubspotFinding').textContent = record.hubspotFinding || 'Not checked in this workspace. Jeff must verify the company in his HubSpot account.';
  for (const name of ['route', 'contact', 'report', 'summary', 'sources', 'note', 'draftSubject', 'draft']) $('#editForm').elements[name].value = record[name] || '';
  for (const radio of $('#editForm').querySelectorAll('input[name="conflicts"]')) radio.checked = radio.value === record.conflicts;
  $('#qaCheck').checked = record.qa === 'Pass';
  $('#hubspotCheck').checked = record.hubspotReviewed === 'Yes';
  $('#reportLink').hidden = !reportIsValid(record.report);
  $('#reportMissing').hidden = reportIsValid(record.report);
  if (reportIsValid(record.report)) $('#reportLink').href = record.report;
  $('#formError').textContent = '';
  $('#draftHint').textContent = '';
  $('#history').replaceChildren();
  for (const item of record.history || []) $('#history').append(text('li', `${item.at} · ${item.actor} · ${item.from} to ${item.to}: ${item.note}`));
  $('#triagePanel').hidden = record.status !== 'Hold';
  $('#triageScore').value = record.score || '';
  $('#triageReason').value = record.reason || '';
  const locked = mode === 'disconnected' || ['Approved', 'Hold'].includes(record.status);
  for (const field of $('#editForm').querySelectorAll('input, textarea, select')) field.disabled = locked;
  $('#save').disabled = locked;
  for (const field of $('#triagePanel').querySelectorAll('input, textarea, select, button')) field.disabled = mode === 'disconnected';
  $('#editor').hidden = false;
  updateReviewStatus();
  $('#editor').scrollIntoView({behavior:'smooth', block:'start'});
}
async function refresh() {
  if (busy) return;
  busy = true; $('#refresh').disabled = true;
  try {
    const response = await fetch('/api/queue', {cache:'no-store'});
    const result = await response.json();
    if (!response.ok || result.error || !Array.isArray(result.rows)) throw Error(result.error || 'Connection unavailable.');
    rows = result.rows; mode = 'shared'; $('#connection').textContent = `Shared Google Sheet connected · refreshed ${new Date().toLocaleTimeString()}`;
    $('#exitDemo').hidden = true; message('');
  } catch (error) {
    if (mode !== 'practice') { rows = seed; mode = 'disconnected'; }
    $('#connection').textContent = `Shared queue not connected. ${error.message}`;
  } finally { busy = false; $('#refresh').disabled = false; closeEditor(); render(); }
}
async function saveOperation(action, command, next) {
  if (mode === 'practice') { localStorage.setItem(PRACTICE_KEY, JSON.stringify(next)); rows = next; }
  else if (mode === 'shared') {
    const response = await fetch('/api/' + action, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(command)});
    const result = await response.json();
    if (!response.ok || result.error || !Array.isArray(result.rows)) throw Error(result.error || 'Save not confirmed. Refresh before retrying.');
    rows = result.rows;
  } else throw Error('Connect the shared queue or enter practice mode before saving.');
}
async function transition(to, patch = {}) {
  const command = {id:selected.id, revision:selected.revision, to, patch, humanConfirmed:to === 'Approved', requestId:crypto.randomUUID()};
  const next = Workflow.apply(rows, command, mode === 'practice' ? 'Practice reviewer' : 'Jeff');
  await saveOperation('transition', command, next);
  const id = selected.id;
  render(); openEditor(id);
}
$('#editForm').oninput = updateReviewStatus;
$('#editForm').onchange = updateReviewStatus;
$('#editForm').onsubmit = async event => {
  event.preventDefault(); if (busy || !selected) return;
  busy = true; $('#save').disabled = true;
  try {
    const patch = readForm();
    const candidate = {...selected, ...patch};
    const to = gatesReady(candidate) ? 'Ready for Approval' : evidenceReady(candidate) ? 'QA Review' : selected.status === 'Ready for Approval' ? 'QA Review' : selected.status;
    await transition(to, patch);
    message(mode === 'practice' ? 'Practice review saved on this device.' : 'Review saved to the shared queue.');
  } catch (error) { $('#formError').textContent = error.message; }
  finally { busy = false; $('#save').disabled = mode === 'disconnected' || ['Approved', 'Hold'].includes(selected?.status); updateReviewStatus(); }
};
$('#approve').onclick = async () => {
  if (busy || !selected || !confirm('Approve this draft for manual sending? No message will be sent by the dashboard.')) return;
  busy = true; $('#approve').disabled = true;
  try { await transition('Approved'); message('Draft approved for manual send. No communication was sent.'); }
  catch (error) { $('#formError').textContent = error.message; }
  finally { busy = false; updateReviewStatus(); }
};
$('#close').onclick = closeEditor;
$('#search').oninput = () => { closeEditor(); render(); };
$('#refresh').onclick = refresh;
$('#demo').onclick = () => {
  if (busy) return;
  try { rows = JSON.parse(localStorage.getItem(PRACTICE_KEY) || JSON.stringify(seed)); if (!Array.isArray(rows)) throw Error(); }
  catch { rows = structuredClone(seed); }
  mode = 'practice'; $('#connection').textContent = 'Practice mode · changes stay on this device.';
  $('#exitDemo').hidden = false; message('Practice changes do not sync to Jeff.'); closeEditor(); render();
};
$('#exitDemo').onclick = () => { mode = 'disconnected'; refresh(); };
$('#researchQueue').after($('#editor'));
$('#addOpportunity').onclick = () => { $('#intakeForm').reset(); $('#intakeSource').value = 'Manual entry'; $('#intakeError').textContent = ''; $('#intakeDialog').showModal(); };
$('#closeIntake').onclick = () => $('#intakeDialog').close();
$('#intakeForm').onsubmit = async event => {
  event.preventDefault(); if (busy) return; busy = true;
  const command = {company:$('#companyName').value, website:$('#companyWebsite').value, source:$('#intakeSource').value, score:Number($('#intakeScore').value), reason:$('#intakeReason').value, requestId:crypto.randomUUID()};
  try { const next = Workflow.intake(rows, command, 'Jeff'); await saveOperation('intake', command, next); $('#intakeDialog').close(); filter = 'All'; $('#search').value = command.company.trim(); render(); message('Company added.'); }
  catch (error) { $('#intakeError').textContent = error.message; }
  finally { busy = false; }
};
$('#saveTriage').onclick = async () => {
  if (busy || !selected) return; busy = true;
  const command = {id:selected.id, revision:selected.revision, score:Number($('#triageScore').value), reason:$('#triageReason').value, requestId:crypto.randomUUID()};
  try { const next = Workflow.triage(rows, command, 'Jeff'); await saveOperation('triage', command, next); const id=selected.id; render(); openEditor(id); message('Preliminary score saved.'); }
  catch (error) { $('#formError').textContent = error.message; }
  finally { busy = false; }
};
(async () => { try { const response = await fetch('./seed.json'); if (!response.ok) throw Error(); seed = await response.json(); await refresh(); } catch { message('Could not load the company snapshot. Reload the dashboard.'); } })();
