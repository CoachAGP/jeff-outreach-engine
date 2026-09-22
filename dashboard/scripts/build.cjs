const fs=require('node:fs');
fs.mkdirSync('dist/server',{recursive:true});
fs.mkdirSync('dist/.openai',{recursive:true});
fs.mkdirSync('dist/client',{recursive:true});
// Embed the small static surface to keep the Worker dependency-free.
const files=['index.html','styles.css','app.js','workflow.js','seed.json'];
const types={'html':'text/html; charset=utf-8','css':'text/css','js':'text/javascript','json':'application/json'};
const assets=Object.fromEntries(files.map(f=>['/'+f,{body:fs.readFileSync('dist/'+f,'utf8'),type:types[f.split('.').pop()]}]));
let source=fs.readFileSync('src/worker.js','utf8').replace('return env.ASSETS.fetch(request);',`{ const path=url.pathname==='/'?'/index.html':url.pathname; const asset=ASSETS[path]; return asset?new Response(asset.body,{headers:{'Content-Type':asset.type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}}):new Response('Not found',{status:404}); }`);
fs.writeFileSync('dist/server/index.js','const ASSETS='+JSON.stringify(assets)+';\n'+source);
fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
fs.writeFileSync('integrations/Workflow.gs',fs.readFileSync('dist/workflow.js','utf8').replace(/if \(typeof module[^\n]+\n?/,''));
fs.writeFileSync('integrations/Seed.gs','const SEED = '+fs.readFileSync('dist/seed.json','utf8')+';\n');
console.log('Built private Worker and Apps Script package.');
