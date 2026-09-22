// Private Sites dispatch supplies authenticated identity. Never expose the bridge key to the browser.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    const headers = {'Content-Type':'application/json','Cache-Control':'no-store'};
    const reply = (value,status=200) => new Response(JSON.stringify(value),{status,headers});
    const actor = request.headers.get('oai-authenticated-user-email');
    const allowed = (env.REVIEWER_EMAILS || '').toLowerCase().split(',').map(s=>s.trim()).filter(Boolean);
    if (!actor || !allowed.includes(actor.toLowerCase())) return reply({error:'Reviewer access has not been configured for this account.'},403);
    if (!env.SHEETS_BRIDGE_URL || !env.SHEETS_BRIDGE_KEY) return reply({error:'Shared Google Sheet is not connected. Jeff must authorize the Sheet bridge.'},503);
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(env.SHEETS_BRIDGE_URL)) return reply({error:'Sheet connection configuration is invalid.'},503);
    let command;
    if (request.method === 'POST' && ['/api/transition','/api/intake','/api/triage'].includes(url.pathname)) {
      if (request.headers.get('Origin') !== url.origin || !request.headers.get('Content-Type')?.startsWith('application/json')) return reply({error:'Invalid request origin or format.'},403);
      const body = await request.text();
      if (body.length > 40000) return reply({error:'Update is too large.'},413);
      try { command = JSON.parse(body); } catch { return reply({error:'Invalid update.'},400); }
    } else if (!(request.method === 'GET' && url.pathname === '/api/queue')) return reply({error:'Not found'},404);
    try {
      const upstream = await fetch(env.SHEETS_BRIDGE_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:env.SHEETS_BRIDGE_KEY,actor,action:command?url.pathname.slice(5):'list',command}),signal:AbortSignal.timeout(20000)});
      if (!upstream.ok) throw Error('bridge unavailable');
      const result = await upstream.json();
      return reply(result,result.error?409:200);
    } catch { return reply({error:'Could not confirm the Sheet response. Refresh before retrying; no local success was recorded.'},502); }
  }
};
