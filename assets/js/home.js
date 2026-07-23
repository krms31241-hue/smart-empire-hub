const META={qr:{i:'📱',b:'rgba(59,130,246,.12)'},password:{i:'🔑',b:'rgba(239,68,68,.12)'},json:{i:'{}',b:'rgba(16,185,129,.12)'},image:{i:'🖼️',b:'rgba(249,115,22,.12)'},color:{i:'🎨',b:'rgba(139,92,246,.12)'},base64:{i:'64',b:'rgba(20,184,166,.12)'},unit:{i:'⚖️',b:'rgba(251,191,36,.12)'},word:{i:'📝',b:'rgba(108,99,255,.12)'},default:{i:'🔧',b:'rgba(108,99,255,.08)'}};
function gm(s){for(const k in META){if(k!=='default'&&s.includes(k))return META[k]}return META.default}
function esc(s){const d=document.createElement('div');d.textContent=String(s);return d.innerHTML}
async function loadTools(){
  const g=document.getElementById('toolsGrid');
  if(!g)return;
  try{
    const r=await fetch('/tools-index.json');
    if(!r.ok)throw 0;
    const data=await r.json();
    if(!Array.isArray(data?.tools)||!data.tools.length)throw 0;
    g.innerHTML=data.tools.slice(0,8).map(t=>{const m=gm(t.slug);return `<a href="/tools/${esc(t.slug)}/" class="tool-card"><div class="ti" style="background:${m.b};width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center">${m.i}</div><div><h4>${esc(t.name)}</h4><p>${esc(t.description)}</p></div></a>`}).join('');
  }catch{
    g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:30px;color:#4b5563">Tools coming soon. <a href="/categories/" style="color:#818cf8">Browse categories</a></div>';
  }
}
function setupSearch(){
  const hs=document.getElementById('heroSearch'), hb=document.getElementById('heroSearchBtn'), ts=document.getElementById('tbSearch');
  const go=v=>{const q=(v||hs?.value||'').trim();if(q)location.href='/search?q='+encodeURIComponent(q)};
  hb?.addEventListener('click',()=>go());
  hs?.addEventListener('keydown',e=>{if(e.key==='Enter')go()});
  ts?.addEventListener('keydown',e=>{if(e.key==='Enter')go(ts.value)});
  document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();ts?.focus()}});
}
function setupMenu(){
  const btn=document.getElementById('menuBtn'), sb=document.querySelector('.sidebar');
  btn?.addEventListener('click',()=>sb.classList.toggle('open'));
}
document.addEventListener('DOMContentLoaded',()=>{loadTools();setupSearch();setupMenu()});
