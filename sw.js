const CACHE='open-golf-offline-v1';const CORE=['./','./index.html','./controls.js','./golf.html','./golf.js','./golf.wasm','./coi-serviceworker.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(async c=>{for(const f of CORE){try{await c.add(f)}catch(_){}}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===self.location.origin){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{})}return r}).catch(()=>caches.match(e.request)))});
