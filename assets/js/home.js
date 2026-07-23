function esc(s){const d=document.createElement('div');d.textContent=String(s);return d.innerHTML}

async function loadTools(){
  const grid=document.getElementById('popular-tools');
  if(!grid)return;
  try{
    const r=await fetch('/tools-index.json');
    if(!r.ok)throw new Error(r.status);
    const data=await r.json();
    if(!Array.isArray(data?.tools)||!data.tools.length)throw new Error('empty');
    grid.innerHTML=data.tools.slice(0,8).map(t=>`
      <a href="/tools/${esc(t.slug)}/" class="tool-card">
        <div class="tool-icon">🔧</div>
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.description)}</p>
      </a>
    `).join('');
  }catch{
    grid.innerHTML='<div class="tools-error">Tools loading soon. <a href="/categories/">Browse categories</a></div>';
  }
}

function setupSearch(){
  const input=document.getElementById('hero-search');
  const btn=document.getElementById('hero-search-btn');
  if(!input||!btn)return;
  const go=()=>{const q=input.value.trim();if(q)location.href='/search?q='+encodeURIComponent(q)};
  btn.addEventListener('click',go);
  input.addEventListener('keydown',e=>{if(e.key==='Enter')go()});
}

document.addEventListener('DOMContentLoaded',()=>{
  loadTools();
  setupSearch();
});
