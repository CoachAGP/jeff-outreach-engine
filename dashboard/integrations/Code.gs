// Deploy ONE Apps Script project for this queue; ScriptLock serializes dashboard writes.
// Script properties: SPREADSHEET_ID, BRIDGE_KEY (random secret), REVIEWER_EMAILS.
const QUEUE_TAB = 'Engine Queue v2';
function doPost(e) {
  let lock;
  try {
    const input = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('BRIDGE_KEY');
    if (!secret || secret.length < 32 || input.key !== secret) throw Error('Unauthorized connection.');
    const allowed = (props.getProperty('REVIEWER_EMAILS') || '').toLowerCase().split(',').map(s=>s.trim());
    if (!input.actor || !allowed.includes(input.actor.toLowerCase())) throw Error('Reviewer is not authorized.');
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw Error('Queue is busy. Refresh and try again.');
    const sheet = SpreadsheetApp.openById(props.getProperty('SPREADSHEET_ID')).getSheetByName(QUEUE_TAB);
    if (!sheet) throw Error('Queue tab is not initialized. Run setupQueue after reviewing the seed.');
    const data = sheet.getDataRange().getValues();
    if (JSON.stringify(data[0]) !== JSON.stringify(['Company ID','Company','Score','Status','Record JSON'])) throw Error('Queue columns changed. Restore the documented schema.');
    let rows = data.slice(1).map(r=>JSON.parse(r[4]));
    if (['transition','intake','triage'].includes(input.action)) {
      const operation = input.action === 'transition' ? Workflow.apply : Workflow[input.action];
      const updated = operation(rows,input.command,input.actor);
      const index = input.action === 'intake' ? updated.length-1 : rows.findIndex(r=>r.id===input.command.id);
      if (updated !== rows) {
        const r=updated[index];
        const encoded=JSON.stringify(r);
        if(encoded.length>45000) throw Error('Audit record is full. Archive this company history before continuing.');
        // One row write includes the state and audit event, avoiding split-write history loss.
        sheet.getRange(index+2,1,1,5).setValues([[safeCell_(r.id),safeCell_(r.company),r.score,r.status,encoded]]);
        SpreadsheetApp.flush();
      }
      rows=updated;
    } else if (input.action !== 'list') throw Error('Unknown operation.');
    return json_({rows,mode:'shared',updatedAt:new Date().toISOString()});
  } catch(err) { return json_({error:err.message}); }
  finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function setupQueue() {
  const props=PropertiesService.getScriptProperties();
  const book=SpreadsheetApp.openById(props.getProperty('SPREADSHEET_ID'));
  const lock=LockService.getScriptLock(); lock.waitLock(10000);
  try {
    if(book.getSheetByName(QUEUE_TAB)) throw Error('Queue already exists; setup never overwrites it.');
    const sheet=book.insertSheet(QUEUE_TAB);
    const rows=SEED.map(r=>[r.id,r.company,r.score,r.status,JSON.stringify(r)]);
    sheet.getRange(1,1,rows.length+1,5).setValues([['Company ID','Company','Score','Status','Record JSON'],...rows]);
    sheet.setFrozenRows(1);
  } finally {lock.releaseLock();}
}

function safeCell_(value) { return /^[=+@-]/.test(value) ? "'"+value : value; }
