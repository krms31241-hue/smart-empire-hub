// Smart Empire Hub - Homepage JS

const TOOL_META = {
  'qr':       {icon:'📱',bg:'rgba(59,130,246,.12)'},
  'password': {icon:'🔑',bg:'rgba(239,68,68,.12)'},
  'json':     {icon:'{ }',bg:'rgba(16,185,129,.12)'},
  'image':    {icon:'🖼️',bg:'rgba(249,115,22,.12)'},
  'color':    {icon:'🎨',bg:'rgba(139,92,246,.12)'},
  'base64':   {icon:'64', bg:'rgba(20,184,166,.12)'},
  'unit':     {icon:'⚖️',bg:'rgba(251,191,36,.12)'},
  'word':     {icon:'📝',bg:'rgba(108,99,255,.12)'},
  'default':  {icon:'🔧',bg:'rgba(108,99,255,.08)'}
};

function getMeta(slug){
  for(const[k,v]of Object.entries(TOOL_META)){
    if(k!=='default'&&slug.includes(k))return v;
  }
  return TOOL_META.default;
}

function esc(s){const d=document.createElement('div');d.textContent=String(s);return d.innerHTML}

async function loadTools(){
  const grid=document.getElementById('popular-tools-grid');
  if(!grid)return;

  // Show skeletons
  grid.innerHTML=Array(8).fill('<div class="skeleton"></div>').join('');

  try{
    const r=await fetch('/tools-index.json');
    if(!r.ok)throw new Error(r.status);
    const data=await r.json();
    if(!Array.isArray(data?.tools))throw new Error('bad format');

    const tools=data.tools.slice(0,8);
    if(tools.length===0)throw new Error('empty');

    grid.innerHTML=tools.map(t=>{
      const m=getMeta(t.slug);
      return `<a href="/tools/${esc(t.slug)}/" class="tool-card" role="listitem">
        <div class="tool-icon" style="background:${m.bg}">${m.icon}</div>
        <div><div class="tool-name">${esc(t.name)}</div><div class="tool-description">${esc(t.description)}</div></div>
        <i class="ti ti-chevron-right tool-arrow"></i>
      </a>`;
    }).join('');
  }catch(e){
    grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:30px;color:#4b5563">
      <i class="ti ti-tools" style="font-size:28px;display:block;margin-bottom:8px;color:#2d3555"></i>
      Tools loading soon. <a href="/categories/" style="color:#818cf8">Browse categories</a>
    </div>`;
  }
}

function setupSearch(){
  const big=document.querySelector('.search-input-large');
  const btn=document.querySelector('.btn-search');
  const top=document.querySelector('.search-input');

  const go=v=>{const q=(v||big?.value||'').trim();if(q)location.href='/search?q='+encodeURIComponent(q)};
  btn?.addEventListener('click',()=>go());
  big?.addEventListener('keydown',e=>{if(e.key==='Enter')go()});
  top?.addEventListener('keydown',e=>{if(e.key==='Enter')go(top.value)});

  document.addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();top?.focus()}
  });
}

function setupMobile(){
  const btn=document.querySelector('.mobile-menu-btn');
  const sb=document.querySelector('.left-sidebar');
  if(!btn||!sb)return;
  btn.addEventListener('click',()=>sb.classList.toggle('open'));
  document.addEventListener('click',e=>{
    if(!sb.contains(e.target)&&!btn.contains(e.target))sb.classList.remove('open');
  });
}

// Inject right sidebar into page
function buildRightSidebar(){
  const scroll=document.querySelector('.page-scroll');
  if(!scroll)return;

  const rb=document.createElement('aside');
  rb.className='right-sidebar';
  rb.innerHTML=`
    <div class="ceo-card">
      <div class="ceo-cover"></div>
      <div class="ceo-avatar-wrap">
        <div class="ceo-avatar" id="ceoAvatar">
          KM
          <div class="ceo-verified"><i class="ti ti-check"></i></div>
        </div>
      </div>
      <div class="ceo-body">
        <div class="ceo-name">Karam Mahmoud</div>
        <div class="ceo-role">Founder &amp; CEO</div>
        <div class="ceo-badge"><i class="ti ti-crown"></i> Executive Director</div>
        <div class="ceo-rating">
          <span class="ceo-stars">★★★★★</span>
          <span class="ceo-rating-num">4.9</span>
          <span class="ceo-rating-label">Based on 2,847 reviews</span>
        </div>
        <blockquote>Building the future of online tools, one feature at a time. Our mission is to empower everyone with free, professional-grade tools.</blockquote>
        <div class="ceo-links">
          <a href="#" class="ceo-link" aria-label="Website"><i class="ti ti-world"></i></a>
          <a href="#" class="ceo-link" aria-label="LinkedIn"><i class="ti ti-brand-linkedin"></i></a>
          <a href="#" class="ceo-link" aria-label="GitHub"><i class="ti ti-brand-github"></i></a>
          <a href="#" class="ceo-link" aria-label="X"><i class="ti ti-brand-x"></i></a>
        </div>
      </div>
    </div>

    <div class="widget-card">
      <div class="widget-title">🤖 AI Power Suite <span style="font-size:8px;background:#6c63ff;color:#fff;padding:2px 6px;border-radius:4px;font-weight:700;vertical-align:middle">NEW</span></div>
      <div class="widget-sub">Unlock advanced AI-powered tools for content generation, image editing, and automation.</div>
      <a href="/ai-suite/" class="widget-btn">Explore AI Tools ✦</a>
    </div>

    <div class="widget-card">
      <div class="widget-title">📊 Platform Live Dashboard</div>
      <div class="widget-sub" style="margin-bottom:10px">Real-time insights</div>
      <div class="metric-grid">
        <div class="metric-item">
          <div class="metric-label">Active Users</div>
          <div class="metric-value">12,847</div>
          <div class="metric-change">+12.5%</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Revenue Today</div>
          <div class="metric-value">$8,432</div>
          <div class="metric-change">+18.3%</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Page Views</div>
          <div class="metric-value">245K</div>
          <div class="metric-change">+22.1%</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Executions</div>
          <div class="metric-value">1.2M</div>
          <div class="metric-change">+15.7%</div>
        </div>
      </div>
    </div>
  `;

  // Wrap existing content in page-scroll
  const ca=scroll.querySelector('.content-area')||scroll;
  scroll.appendChild(rb);
}

document.addEventListener('DOMContentLoaded',()=>{
  // Build scroll wrapper if not present
  const main=document.querySelector('.main-content');
  const hero=document.querySelector('.hero-section');
  if(main&&hero&&!main.querySelector('.page-scroll')){
    const wrap=document.createElement('div');
    wrap.className='page-scroll';
    const ca=document.createElement('div');
    ca.className='content-area';
    // Move all content after topbar into content-area
    const topbar=main.querySelector('.topbar');
    while(main.children.length>0){
      const child=main.children[0];
      if(child===topbar){main.appendChild(child);continue}
      ca.appendChild(child);
    }
    wrap.appendChild(ca);
    main.appendChild(wrap);
  }

  buildRightSidebar();
  loadTools();
  setupSearch();
  setupMobile();
});
