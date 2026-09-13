const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const modal=$("#projectModal"), modalContent=$("#modalContent"), grid=$("#projectGrid");
let runtimeTimer=null, architectureTimer=null;

function miniRuntime(p){
  const pts=(p.cardFlow||p.runtime.map(x=>x[0]).slice(0,5));
  return `<div class="mini-runtime"><div class="mini-runtime-head"><span>LIVE FLOW</span><span>BEFORE → AFTER CASE STUDY</span></div><div class="mini-runtime-flow">${pts.map((x,i)=>`${i?'<i class="mini-arrow"></i>':''}<div class="mini-node" data-mini="${i}">${esc(x)}</div>`).join("")}</div></div>`;
}
function projectCard(p){return `<article class="project-card reveal ${p.featured?'featured':''} ${p.spotlight?'spotlight':''}" data-id="${p.id}" data-cat="${p.category}">
  <div class="project-top"><div><div class="project-kicker">${esc(p.kicker)}</div><div class="project-company">${esc(p.company)}</div></div><div class="project-metric"><b>${esc(p.metric)}</b><span>${esc(p.metricLabel)}</span></div></div>
  <h3>${esc(p.title)}</h3><p>${esc(p.subtitle)}</p>${miniRuntime(p)}
  <div class="project-focus"><span>${esc(p.tags[0])}</span><span>${esc(p.tags[1])}</span><span>${esc(p.tags[2])}</span></div>
  <div class="project-bottom"><small>${esc(p.scale||'Process · architecture · controls · outcome')}</small><button class="project-open">Explore case study →</button></div>
</article>`}

grid.innerHTML=window.PROJECTS.sort((a,b)=>a.order-b.order).map(projectCard).join("");

$$('.project-card').forEach(card=>{
  let idx=0,timer; const nodes=$$('.mini-node',card);
  const animate=()=>{nodes.forEach((n,i)=>n.classList.toggle('active',i===idx));idx=(idx+1)%nodes.length};
  card.addEventListener('mouseenter',()=>{idx=0;animate();timer=setInterval(animate,650)});
  card.addEventListener('mouseleave',()=>{clearInterval(timer);nodes.forEach(n=>n.classList.remove('active'))});
});

$$('#projectFilters button').forEach(btn=>btn.addEventListener('click',()=>{
  $$('#projectFilters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  $$('.project-card').forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.cat!==f));
}));

function runtimeHTML(p){return `<div class="runtime-shell">
  <div class="runtime-toolbar"><span>LIVE TARGET-STATE PROCESS · ${p.runtime.length} STAGES</span><div class="runtime-controls"><button data-runtime="play">▶ Play</button><button data-runtime="pause">Ⅱ Pause</button><button data-runtime="reset">↺ Reset</button></div></div>
  <div class="runtime-track" style="--runtime-count:${p.runtime.length}"><div class="runtime-line"><i id="runtimeProgress"></i><em id="runtimePacket"></em></div>${p.runtime.map((s,i)=>`<div class="runtime-node ${i===0?'active':''}" data-runtime-node="${i}"><div class="dot"></div><b>${esc(s[0])}</b><small>${esc(s[1])}</small></div>`).join("")}</div>
  <div class="runtime-detail"><span id="runtimeStep">STEP 01</span><div><b id="runtimeTitle">${esc(p.runtime[0][0])} · ${esc(p.runtime[0][1])}</b><p id="runtimeText">${esc(p.runtime[0][2])}</p></div></div>
</div>`}

function architectureHTML(p){return `<div class="architecture-shell">
  <div class="architecture-head"><span>TARGET-STATE SYSTEM ARCHITECTURE</span><div><i></i> ACTIVE FLOW</div></div>
  <div class="architecture-flow" style="--arch-count:${p.architecture.length}">${p.architecture.map((a,i)=>`${i?'<div class="arch-link"><i></i><i></i></div>':''}<button class="arch-layer ${i===0?'active':''}" data-arch-node="${i}"><small>${esc(a[0])}</small><b>${esc(a[1])}</b><span>${esc(a[2])}</span></button>`).join('')}</div>
  <div class="architecture-detail"><span id="archStep">LAYER 01</span><div><b id="archTitle">${esc(p.architecture[0][0])} · ${esc(p.architecture[0][1])}</b><p id="archText">${esc(p.architecture[0][2])}</p></div></div>
</div>`}

function smallArch(title,items,kind){return `<div class="state-arch ${kind}"><div class="state-arch-head"><span>${esc(title)}</span><b>${kind==='before'?'CURRENT':'TARGET'}</b></div><div class="state-arch-flow">${items.map((x,i)=>`${i?'<i class="state-arrow">→</i>':''}<span>${esc(x)}</span>`).join('')}</div></div>`}
function transformationHTML(p){return `<div class="transformation-shell">
  <div class="state-compare">
    <div class="state-panel before"><small>BEFORE</small><h3>Current-state operating pattern</h3><ul>${p.before.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${smallArch('Current-state architecture',p.beforeArchitecture,'before')}</div>
    <div class="change-bridge"><span>REDESIGN</span><i></i><b>→</b></div>
    <div class="state-panel after"><small>AFTER</small><h3>Target-state operating model</h3><ul>${p.after.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${smallArch('Target-state architecture',p.afterArchitecture,'after')}</div>
  </div>
  <div class="architecture-change"><span>WHAT CHANGED IN THE ARCHITECTURE</span><div>${p.architectureChange.map((x,i)=>`<article><b>${String(i+1).padStart(2,'0')}</b><p>${esc(x)}</p></article>`).join('')}</div></div>
</div>`}

function toolingHTML(p){return `<div class="tooling-layout">
  <div><div class="modal-section-title">TOOLS & TECHNOLOGIES</div><div class="tool-group-grid">${p.toolGroups.map(g=>`<article><small>${esc(g[0])}</small><div>${g[1].map(t=>`<span>${esc(t)}</span>`).join('')}</div></article>`).join('')}</div></div>
  <div><div class="modal-section-title">DELIVERY ARTIFACTS</div><div class="artifact-grid">${p.artifacts.map((a,i)=>`<span><b>${String(i+1).padStart(2,'0')}</b>${esc(a)}</span>`).join('')}</div></div>
  <div><div class="modal-section-title">KEY DESIGN / DELIVERY DECISIONS</div><div class="decision-list">${p.decisions.map(d=>`<div><i>✓</i><p>${esc(d)}</p></div>`).join('')}</div></div>
</div>`}

function overviewHTML(p){return `<div class="executive-grid">
  <article><small>BUSINESS CHALLENGE</small><p>${esc(p.problem)}</p></article>
  <article><small>MY RESPONSIBILITY</small><p>${esc(p.roleSummary)}</p></article>
  <article><small>SCALE / CONTEXT</small><p>${esc(p.scale)}</p></article>
</div>
<div class="overview-outcome"><small>OUTCOME</small><b>${esc(p.metric)} · ${esc(p.metricLabel)}</b><p>${esc(p.impact)}</p></div>`}

function openProject(id){
  clearInterval(runtimeTimer); clearInterval(architectureTimer); runtimeTimer=null; architectureTimer=null;
  const p=window.PROJECTS.find(x=>x.id===id); if(!p)return;
  modalContent.innerHTML=`<div class="modal-hero"><div class="modal-kicker">${esc(p.kicker)} · ${esc(p.company)}</div><h2 id="modalTitle">${esc(p.title)}</h2><p>${esc(p.subtitle)}</p><div class="modal-scope"><span>${esc(p.metric)} · ${esc(p.metricLabel)}</span><span>${esc(p.scale)}</span></div><div class="modal-meta">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>
  <div class="modal-body"><div class="modal-tabs"><button class="active" data-tab="overview">Overview</button><button data-tab="transform">Before → After</button><button data-tab="runtime">Live process</button><button data-tab="architecture">Architecture</button><button data-tab="contribution">My role</button><button data-tab="tooling">Tools & artifacts</button><button data-tab="impact">Business impact</button></div>
  <div class="tab-panel active" data-panel="overview"><div class="modal-section-title">EXECUTIVE CASE STUDY</div>${overviewHTML(p)}</div>
  <div class="tab-panel" data-panel="transform"><div class="modal-section-title">TRANSFORMATION — PROCESS + ARCHITECTURE</div>${transformationHTML(p)}</div>
  <div class="tab-panel" data-panel="runtime"><div class="modal-section-title">HOW THE TARGET PROCESS OPERATES</div>${runtimeHTML(p)}<div class="modal-section-title">CONTROL POINTS</div><div class="control-grid">${p.controls.map(c=>`<span>${esc(c)}</span>`).join('')}</div></div>
  <div class="tab-panel" data-panel="architecture"><div class="modal-section-title">DETAILED APPLICATION / SYSTEM VIEW</div>${architectureHTML(p)}</div>
  <div class="tab-panel" data-panel="contribution"><div class="modal-section-title">MY ROLE & CONTRIBUTION</div><div class="contribution-list">${p.contribution.map((c,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><p>${esc(c)}</p></div>`).join('')}</div></div>
  <div class="tab-panel" data-panel="tooling">${toolingHTML(p)}</div>
  <div class="tab-panel" data-panel="impact"><div class="modal-section-title">MEASURABLE OUTCOME</div><div class="impact-panel advanced"><div class="impact-big"><b>${esc(p.metric)}</b><span>${esc(p.metricLabel)}</span></div><p>${esc(p.impact)}</p><div class="impact-scope"><small>SCALE / CONTEXT</small><span>${esc(p.scale)}</span></div></div></div></div>`;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  setupTabs(p); setupRuntime(p); setupArchitecture(p);
}
function setupTabs(p){
  $$('.modal-tabs button',modalContent).forEach(b=>b.onclick=()=>{
    $$('.modal-tabs button',modalContent).forEach(x=>x.classList.remove('active'));b.classList.add('active');
    $$('.tab-panel',modalContent).forEach(panel=>panel.classList.toggle('active',panel.dataset.panel===b.dataset.tab));
    clearInterval(runtimeTimer);clearInterval(architectureTimer);runtimeTimer=null;architectureTimer=null;
    if(b.dataset.tab==='runtime') startRuntime(p);
    if(b.dataset.tab==='architecture') startArchitecture(p);
  });
}
function setupRuntime(p){
  const show=i=>{
    const nodes=$$('[data-runtime-node]',modalContent); nodes.forEach((n,k)=>{n.classList.toggle('active',k===i);n.classList.toggle('done',k<i)});
    const s=p.runtime[i]; $('#runtimeStep',modalContent).textContent=`STEP ${String(i+1).padStart(2,'0')}`; $('#runtimeTitle',modalContent).textContent=`${s[0]} · ${s[1]}`; $('#runtimeText',modalContent).textContent=s[2];
    const progress=p.runtime.length===1?100:(i/(p.runtime.length-1))*100; $('#runtimeProgress',modalContent).style.width=`${progress}%`; const packet=$('#runtimePacket',modalContent); if(packet)packet.style.left=`${progress}%`; modalContent.dataset.runtimeIndex=i;
  };
  $$('[data-runtime-node]',modalContent).forEach(n=>n.onclick=()=>{clearInterval(runtimeTimer);runtimeTimer=null;show(+n.dataset.runtimeNode)});
  $$('[data-runtime]',modalContent).forEach(btn=>btn.onclick=()=>{const a=btn.dataset.runtime;if(a==='play')startRuntime(p);if(a==='pause'){clearInterval(runtimeTimer);runtimeTimer=null}if(a==='reset'){clearInterval(runtimeTimer);runtimeTimer=null;show(0)}});
  modalContent._showRuntime=show;
}
function startRuntime(p){clearInterval(runtimeTimer);let i=+(modalContent.dataset.runtimeIndex||0);modalContent._showRuntime(i);runtimeTimer=setInterval(()=>{i=(i+1)%p.runtime.length;modalContent._showRuntime(i)},1550)}

function setupArchitecture(p){
  const show=i=>{
    const nodes=$$('[data-arch-node]',modalContent);nodes.forEach((n,k)=>{n.classList.toggle('active',k===i);n.classList.toggle('passed',k<i)});
    const a=p.architecture[i]; $('#archStep',modalContent).textContent=`LAYER ${String(i+1).padStart(2,'0')}`;$('#archTitle',modalContent).textContent=`${a[0]} · ${a[1]}`;$('#archText',modalContent).textContent=a[2];modalContent.dataset.archIndex=i;
  };
  $$('[data-arch-node]',modalContent).forEach(n=>n.onclick=()=>{clearInterval(architectureTimer);architectureTimer=null;show(+n.dataset.archNode)});modalContent._showArchitecture=show;
}
function startArchitecture(p){clearInterval(architectureTimer);let i=+(modalContent.dataset.archIndex||0);modalContent._showArchitecture(i);architectureTimer=setInterval(()=>{i=(i+1)%p.architecture.length;modalContent._showArchitecture(i)},1700)}

grid.addEventListener('click',e=>{const card=e.target.closest('.project-card'); if(card)openProject(card.dataset.id)});
$$('[data-close-modal]').forEach(el=>el.onclick=()=>{clearInterval(runtimeTimer);clearInterval(architectureTimer);runtimeTimer=null;architectureTimer=null;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))$('[data-close-modal]').click()});

const revealIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealIO.unobserve(e.target)}}),{threshold:.11});
$$('.reveal').forEach(el=>revealIO.observe(el));

const heroNodes=$$('.sys-node'),heroTitle=$('#heroSystemTitle'),heroText=$('#heroSystemText');
const heroCopy=[
  ['Observe the real work','Start with frontline users, handoffs, exceptions and repetitive operational tasks before selecting a solution.'],
  ['Quantify the friction','Use operational data to establish volume, cycle time, quality and business impact.'],
  ['Make it buildable','Translate the target process into rules, requirements, controls and acceptance criteria.'],
  ['Engineer the change','Design the application, workflow, API, data and automation boundaries that remove measured friction.'],
  ['Validate before handoff','Use UAT, quality checks and real scenarios to prove the solution is operationally fit.'],
  ['Adopt and improve','Train users, track usage and use support signals as structured input to the next improvement cycle.']
];
let heroIdx=0;function showHero(i){heroNodes.forEach((n,k)=>n.classList.toggle('active',k===i));heroTitle.textContent=heroCopy[i][0];heroText.textContent=heroCopy[i][1];heroIdx=i}heroNodes.forEach(n=>n.onclick=()=>showHero(+n.dataset.node));setInterval(()=>showHero((heroIdx+1)%heroNodes.length),2800);

const stages=$$('.process-stage');let stageIdx=0;function stageShow(i){stages.forEach((s,k)=>s.classList.toggle('active',k===i));stageIdx=i}stages.forEach(s=>s.onclick=()=>stageShow(+s.dataset.stage));setInterval(()=>stageShow((stageIdx+1)%stages.length),3200);

let counted=false;const heroProof=$('.hero-proof');const metricIO=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!counted){counted=true;$$('[data-count]').forEach(el=>{const target=parseFloat(el.dataset.count),prefix=el.dataset.prefix||'',suffix=el.dataset.suffix||'',dec=String(target).includes('.')?1:0,start=performance.now(),dur=1100;function tick(now){const p=Math.min(1,(now-start)/dur),v=target*(1-Math.pow(1-p,3));el.textContent=prefix+v.toFixed(dec)+suffix;if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)});metricIO.disconnect()}},{threshold:.3});metricIO.observe(heroProof);
window.addEventListener('scroll',()=>{const d=document.documentElement;$('#scrollProgress').style.width=((d.scrollTop/(d.scrollHeight-d.clientHeight))*100)+'%';$('#topbar').classList.toggle('scrolled',scrollY>30)});
window.addEventListener('pointermove',e=>{const g=$('.cursor-glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
$('#year').textContent=new Date().getFullYear();
