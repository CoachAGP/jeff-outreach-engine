import http from 'node:http';
import fs from 'node:fs';
const worker=(await import('data:text/javascript;base64,'+fs.readFileSync('dist/server/index.js').toString('base64'))).default;
http.createServer(async(req,res)=>{try{let body='';for await(const part of req)body+=part;const request=new Request('http://127.0.0.1:4173'+req.url,{method:req.method,headers:req.headers,...(body?{body}: {})});const response=await worker.fetch(request,{});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());}catch{res.writeHead(500);res.end('Preview failed');}}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));
