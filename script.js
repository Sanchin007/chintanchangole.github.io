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

// v14 — CMA CGM e-commerce business + architecture dashboard
const commerceJourneyData = [
  {name:'Find route', scope:'connected', question:'Which viable route can move this cargo from origin to destination?', capability:'Point-to-point routing, port/vessel schedules and door-to-door options establish the feasible transport path before price or booking.', data:'Origin · destination · date window · service / routing option · cut-offs', value:'Reduces search effort and prevents pricing or booking against an infeasible route.'},
  {name:'SpotOn', scope:'direct', question:'Can the customer get a commercially usable price now?', capability:'SpotOn converts shipment context into a digital spot offer / quotation path.', data:'POL · POD · departure date · equipment · commodity · routing · commercial rules · VAS', value:'Faster digital self-service, clearer price visibility and a direct bridge from shipping need to quotation.'},
  {name:'Allocation', scope:'connected', question:'Is the requested journey operationally feasible from a capacity perspective?', capability:'Allocation context connects the commercial offer to capacity / space availability before booking commitment.', data:'Route · voyage · equipment · requested volume · allocation / availability context', value:'Reduces mismatch between commercial intent and executable operational capacity.'},
  {name:'Booking', scope:'direct', question:'Can the commercial intent become an executable shipment?', capability:'Digital booking captures the operational details and rules required to create structured demand.', data:'Quote reference · parties · cargo · equipment · inland / haulage · VAS · special cargo · validations', value:'Reduces re-entry, clarification loops and incomplete submissions while improving booking consistency.'},
  {name:'Shipment', scope:'connected', question:'What is the persistent operational object after booking?', capability:'The shipment / booking reference becomes the anchor for downstream execution, status and actions.', data:'Booking reference · route · cargo · equipment · status · operational milestones', value:'Creates continuity across execution, documents, tracking and finance.'},
  {name:'SI / VGM', scope:'connected', question:'Do we have the cargo and documentation data needed for carriage?', capability:'Shipping Instructions and Verified Gross Mass prepare the shipment for documentation and load readiness.', data:'Parties · cargo · container · payment / freight instructions · weight · voyage / routing', value:'Improves data completeness and readiness before document issuance and physical execution.'},
  {name:'Bill of Lading', scope:'connected', question:'Can transport documentation be generated, reviewed and controlled digitally?', capability:'Draft, review, amendment and final Bill of Lading / eBL processes manage the legal transport document lifecycle.', data:'Shipping instructions · parties · cargo · voyage · document status · amendments', value:'Reduces document handling friction and improves traceability of approval / amendment status.'},
  {name:'Tracking', scope:'connected', question:'Where is the shipment and what operational event happened?', capability:'Shipment, equipment and transport events provide milestone and ETA visibility across the journey.', data:'Shipment reference · equipment events · transport events · ETA / ETD · inland milestones', value:'Improves customer visibility and supports proactive exception management.'},
  {name:'Invoice', scope:'connected', question:'What charges are due and how are they paid or disputed?', capability:'Invoice, freight, deposit and detention / demurrage data connect operational execution to financial settlement.', data:'Shipment reference · invoice data · freight · deposit · D&D · payment status', value:'Makes the financial lifecycle visible and actionable in the same digital ecosystem.'},
  {name:'Release', scope:'connected', question:'Have the conditions been met to release cargo for final delivery?', capability:'Arrival, release and Delivery Order processes close the digital shipping cycle.', data:'Arrival status · payment / release conditions · document status · delivery order', value:'Connects the digital journey to final cargo release and completion.'}
];

const commerceTabs = $$('#commerceTabs button');
const commercePanels = $$('[data-commerce-panel]');
let commerceViewIndex = 0;
function showCommerceView(name){
  commerceTabs.forEach((b,i)=>{const on=b.dataset.commerceView===name;b.classList.toggle('active',on);if(on) commerceViewIndex=i});
  commercePanels.forEach(p=>p.classList.toggle('active',p.dataset.commercePanel===name));
}
commerceTabs.forEach(b=>b.addEventListener('click',()=>showCommerceView(b.dataset.commerceView)));

const journeyHost = $('#commerceJourney');
const journeyLaunch = $('#journeyLaunch');
let journeyIndex = 0, journeyTimer = null;
if(journeyHost){
  journeyHost.innerHTML = commerceJourneyData.map((x,i)=>`<button class="journey-node ${x.scope} ${i===0?'active':''}" data-journey="${i}"><span>${String(i+1).padStart(2,'0')}</span><b>${esc(x.name)}</b><small>${x.scope==='direct'?'MY SCOPE':'CONNECTED'}</small></button>`).join('');
  const showJourney = i=>{
    journeyIndex=i; const x=commerceJourneyData[i];
    $$('.journey-node',journeyHost).forEach((n,k)=>{n.classList.toggle('active',k===i);n.classList.toggle('passed',k<i)});
    $('#journeyNo').textContent=String(i+1).padStart(2,'0');
    $('#journeyScope').textContent=x.scope==='direct'?'DIRECT DESIGN SCOPE':'CONNECTED E-COMMERCE CAPABILITY';
    $('#journeyTitle').textContent=x.name;
    $('#journeyQuestion').textContent=x.question;
    $('#journeyCapability').textContent=x.capability;
    $('#journeyData').textContent=x.data;
    $('#journeyValue').textContent=x.value;
    if(journeyLaunch){
      const target = x.name==='SpotOn' ? 'spoton' : (x.name==='Booking' ? 'booking' : '');
      journeyLaunch.hidden = !target;
      journeyLaunch.dataset.target = target;
      if(target) journeyLaunch.textContent = `Open ${x.name} simulation`;
    }
    const pct=commerceJourneyData.length===1?100:(i/(commerceJourneyData.length-1))*100;
    const prog=$('#journeyProgress'),packet=$('#journeyPacket'); if(prog)prog.style.width=pct+'%';if(packet)packet.style.left=pct+'%';
  };
  $$('.journey-node',journeyHost).forEach(n=>n.addEventListener('click',()=>{clearInterval(journeyTimer);journeyTimer=null;showJourney(+n.dataset.journey)}));
  if(journeyLaunch) journeyLaunch.addEventListener('click',()=>{ showCommerceView('simulation'); openSimulation(journeyLaunch.dataset.target||'booking'); });
  showJourney(0);
  const journeyIO=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!journeyTimer){journeyTimer=setInterval(()=>showJourney((journeyIndex+1)%commerceJourneyData.length),2200)}else if(!entries[0].isIntersecting&&journeyTimer){clearInterval(journeyTimer);journeyTimer=null}},{threshold:.2});
  journeyIO.observe(journeyHost);
}

const commerceSimulation = {
  spoton: {
    label:'SpotOn pricing simulation',
    subtitle:'From shipping requirement to a digitally usable offer that can continue into booking.',
    problem:'Customers need fast price visibility without losing routing, equipment and business-rule consistency.',
    change:'Route, equipment, commodity and commercial rules are orchestrated in one guided quotation flow.',
    value:'Customers get a clear digital offer quickly, while the business keeps rule-driven control over eligibility and offer quality.',
    kpis:[
      ['Quote response time','manual or assisted','faster digital turnaround'],
      ['Offer clarity','fragmented inputs','clearer self service quotation'],
      ['Quote to booking continuity','context breaks','offer can continue to booking']
    ],
    modes:[
      {
        id:'standard',
        label:'Standard SpotOn',
        badge:'PRIMARY JOURNEY',
        before:['Customers search across route, date and price dependencies before they can act.','Commercial context is spread across routing, equipment and pricing conditions.','A weak quote flow reduces confidence in digital self service.'],
        after:['The journey captures route context once and reuses it through pricing and offer generation.','Commercial rules are checked before presenting the offer.','The offer can continue directly into the booking path.'],
        architecture:['Customer UI','Routing / Schedules','SpotOn Pricing','Commercial Rules','Offer Engine','VAS Options','Telemetry'],
        archCaption:'Shipping need → route feasibility → pricing logic → offer ready for booking',
        steps:[
          {name:'Shipping need', short:'Customer intent captured', business:'The journey starts with the customer requirement so the platform can anchor routing and pricing on a real shipment need.', data:'Origin · destination · date window · equipment preference · commodity', systems:['My CMA CGM UI','Customer profile'], control:'Mandatory commercial context is captured before the quotation flow begins.', outcome:'The platform has enough structured input to search feasible transport options.', archActive:['Customer UI']},
          {name:'Route search', short:'Feasible options identified', business:'Pricing only makes sense once the route and service options are known.', data:'Port pair · schedules · service string · cut-off window', systems:['Routing engine','Schedules API'], control:'Only feasible route / schedule combinations are shown.', outcome:'The customer can choose a viable route rather than price an infeasible request.', archActive:['Customer UI','Routing / Schedules']},
          {name:'SpotOn pricing', short:'Digital offer generated', business:'The system applies the commercial pricing logic to the selected route and shipment profile.', data:'Selected route · equipment · commodity · commercial conditions', systems:['Pricing engine','SpotOn service'], control:'Pricing validity and offer eligibility are checked before presenting the quote.', outcome:'A usable digital offer is generated with clear context.', archActive:['SpotOn Pricing','Commercial Rules','Offer Engine']},
          {name:'Value added services', short:'Journey enriched', business:'Optional services can be attached without restarting the commercial flow.', data:'Inland / haulage needs · VAS selections', systems:['VAS catalogue','Offer engine'], control:'Only services compatible with the route and shipment type are proposed.', outcome:'The customer sees a fuller commercial package, not just an ocean rate.', archActive:['Offer Engine','VAS Options']},
          {name:'Quotation ready', short:'Ready to continue', business:'The quote should become actionable, not remain an isolated price screen.', data:'Quote reference · validity window · selected service package', systems:['Quotation store','Customer UI'], control:'Validity and reference tracking make the offer auditable and reusable.', outcome:'The quote can continue directly into booking with less re-entry.', archActive:['Customer UI','Offer Engine','Telemetry']},
          {name:'Analytics & handoff', short:'Measure and continue', business:'Telemetry closes the loop by showing how many offers become bookings and where users drop.', data:'Funnel events · click path · quote acceptance', systems:['Telemetry','Operational analytics'], control:'Funnel and usage events are logged for continuous improvement.', outcome:'The business can measure digital adoption and improve the next iteration.', archActive:['Telemetry','Customer UI']}
        ]
      }
    ]
  },
  booking: {
    label:'Booking simulation',
    subtitle:'From commercial intent to an executable shipment with rules, validation and downstream continuity.',
    problem:'A digital booking must capture operationally valid information while keeping the customer journey simple.',
    change:'Commercial context flows into a guided booking experience with conditional fields, validation, exception handling and downstream creation.',
    value:'The business reduces clarification loops and re-entry while improving the quality of data handed into shipment operations.',
    kpis:[
      ['Booking completion','manual clarifications','higher digital completion'],
      ['Re-entry effort','repeated information','reduced duplicate entry'],
      ['Exception visibility','hidden late issues','earlier controlled validation'],
      ['Straight through flow','assisted handoffs','more guided digital progression']
    ],
    modes:[
      {
        id:'standard',
        label:'Standard booking',
        badge:'CORE FLOW',
        before:['Customers repeat information already known upstream from the quote or route selection.','Operational validations happen late, which creates clarification loops.','Booking quality depends on how well rules and required fields are surfaced to the user.'],
        after:['Known commercial context is reused at the start of booking.','Conditional fields and validations make the required shipment information explicit.','A successful submission creates a downstream shipment object and a clear operational handoff.'],
        architecture:['Customer UI','Booking Orchestrator','Quotation Context','Cargo & Equipment Rules','VAS / Inland Options','Validation Engine','Allocation Context','Shipment Creation','Notification & Analytics'],
        archCaption:'Quote context → booking orchestration → validations → executable shipment',
        steps:[
          {name:'Offer context', short:'Enter from SpotOn', business:'The booking flow should inherit the commercial intent so the customer does not restart from zero.', data:'Quote reference · route · departure date · equipment · customer account', systems:['Booking UI','Quotation context service'], control:'Only a valid quotation context can initiate the booking journey.', outcome:'Booking opens with the route and commercial context pre-positioned.', archActive:['Customer UI','Quotation Context']},
          {name:'Parties & shipment setup', short:'Operational profile captured', business:'Parties, shipment profile and core booking setup establish who is shipping and what kind of operational object will be created.', data:'Shipper · consignee · notify party · cargo type · booking ownership', systems:['Booking orchestrator','Customer master data'], control:'Party completeness and role ownership are validated early.', outcome:'The request has a clear operational identity before deeper validations begin.', archActive:['Customer UI','Booking Orchestrator']},
          {name:'Cargo & equipment', short:'Required details captured', business:'Operational execution depends on correct equipment and cargo information, so the booking path must guide the user through these requirements.', data:'Container type · quantity · weights · commodity · special cargo attributes', systems:['Cargo rules','Equipment rules'], control:'Conditional logic responds to reefer, special cargo and equipment-specific requirements.', outcome:'The system receives enough structured information to assess feasibility and compliance.', archActive:['Cargo & Equipment Rules','Booking Orchestrator']},
          {name:'Services & haulage', short:'Scope completed', business:'The journey should cover the full commercial intent, including inland and value added services where required.', data:'Inland leg · haulage selections · VAS options', systems:['VAS service','Inland options'], control:'Only compatible service combinations are accepted for the selected route and shipment type.', outcome:'The booking reflects the real requested service scope rather than a narrow booking shell.', archActive:['VAS / Inland Options','Booking Orchestrator']},
          {name:'Validation & allocation', short:'Check before submit', business:'The system validates completeness and checks whether the request can move forward from a commercial and operational standpoint.', data:'Field completeness · business rules · capacity context · exceptions', systems:['Validation engine','Allocation context'], control:'Blocking rules surface missing or inconsistent information before submission.', outcome:'The customer resolves issues earlier instead of generating avoidable back-office rework.', archActive:['Validation Engine','Allocation Context']},
          {name:'Submit booking', short:'Create demand', business:'Submission is the point where commercial intent becomes structured operational demand.', data:'Validated booking request · audit data · timestamps', systems:['Booking orchestrator','Workflow services'], control:'Submission produces a controlled transaction with auditability and status tracking.', outcome:'A booking request is created with a durable reference and status.', archActive:['Booking Orchestrator','Validation Engine','Notification & Analytics']},
          {name:'Shipment creation', short:'Operational handoff', business:'The booking must hand off into downstream shipment operations so the digital journey stays continuous.', data:'Booking reference · shipment ID · milestone status', systems:['Shipment service','Notification service','Analytics'], control:'Downstream object creation and confirmation events are captured for support and measurement.', outcome:'The customer receives confirmation and operations can continue the shipment lifecycle.', archActive:['Shipment Creation','Notification & Analytics']}
        ]
      },
      {
        id:'repeat',
        label:'Repeat / recurring booking',
        badge:'EFFICIENCY MODE',
        before:['Returning customers still spend time re-entering stable information.','Repeated data entry increases the chance of inconsistency across similar bookings.','The business loses speed on high-frequency patterns that should be reusable.'],
        after:['A previous booking or reusable template pre-fills the stable context.','The customer focuses on the delta instead of reconstructing the full request.','The platform re-validates only what can change, then submits a fresh booking.'],
        architecture:['Customer UI','Template / Previous Booking','Booking Orchestrator','Delta Validation','Allocation Context','Shipment Creation','Notification & Analytics'],
        archCaption:'Reuse known context → validate changes → create a fresh booking',
        steps:[
          {name:'Select previous flow', short:'Reuse known context', business:'Returning patterns should start from what is already known.', data:'Previous booking reference · saved pattern / template', systems:['Customer UI','Template repository'], control:'Only reusable booking patterns tied to the customer are available.', outcome:'The booking starts from a known operating pattern rather than a blank form.', archActive:['Customer UI','Template / Previous Booking']},
          {name:'Pre-fill data', short:'Stable fields reused', business:'Stable route, party and cargo context is reused to reduce friction.', data:'Route · parties · equipment pattern · service package', systems:['Template service','Booking orchestrator'], control:'Pre-filled data remains editable where operationally allowed.', outcome:'The customer sees a partially completed booking.', archActive:['Template / Previous Booking','Booking Orchestrator']},
          {name:'Edit the delta', short:'Capture only change', business:'The user only adjusts what is different for this shipment instance.', data:'Date changes · quantity deltas · cargo changes', systems:['Booking orchestrator'], control:'The change set is isolated so only affected validations are re-run.', outcome:'The journey is faster without weakening control.', archActive:['Booking Orchestrator']},
          {name:'Revalidate', short:'Fresh operational checks', business:'Even with reusable context, each booking still requires route, rule and availability checks.', data:'Updated fields · validity window · capacity context', systems:['Delta validation','Allocation context'], control:'Only valid and current requests move to submit.', outcome:'The platform balances reuse with operational correctness.', archActive:['Delta Validation','Allocation Context']},
          {name:'Submit & confirm', short:'Create a new booking', business:'A reusable pattern must still end as a brand-new operational transaction.', data:'New booking request · confirmation events', systems:['Shipment service','Notification service'], control:'Audit data preserves the difference between the source pattern and the new execution.', outcome:'The user submits a faster booking with lower re-entry effort.', archActive:['Shipment Creation','Notification & Analytics']}
        ]
      },
      {
        id:'exception',
        label:'Quote expired exception',
        badge:'CONTROL SCENARIO',
        before:['Late-stage booking failure frustrates the customer if the reason is unclear.','Commercial validity issues often trigger support effort when surfaced too late.'],
        after:['The platform checks quote validity before final commitment.','If the offer expired, the customer is redirected to refresh the commercial context and continue cleanly.'],
        architecture:['Customer UI','Booking Orchestrator','Quotation Context','Validation Engine','SpotOn Pricing','Notification & Analytics'],
        archCaption:'Control failure handled early so the customer can recover without hidden rework',
        steps:[
          {name:'Open booking', short:'Context loaded', business:'The customer enters booking from an existing commercial context.', data:'Quote reference · route context', systems:['Booking UI','Quotation context service'], control:'The context is loaded and prepared for validation.', outcome:'The booking page opens with the selected quote.', archActive:['Customer UI','Quotation Context']},
          {name:'Final validation', short:'Check offer validity', business:'Before commitment, the system confirms that the offer is still valid.', data:'Quote validity window · booking timestamp', systems:['Validation engine'], control:'Expired commercial context must block submission.', outcome:'The system detects that the quote is no longer valid.', archActive:['Validation Engine','Booking Orchestrator']},
          {name:'Exception surfaced', short:'Clear recovery path', business:'The error state should explain what happened and what the user needs to do next.', data:'Error reason · impacted offer', systems:['Customer UI','Notification layer'], control:'The message is explicit rather than forcing hidden back-office resolution.', outcome:'The customer understands why the booking cannot continue as-is.', archActive:['Customer UI','Notification & Analytics']},
          {name:'Refresh offer', short:'Return to SpotOn', business:'The recovery path returns the customer to the pricing flow to refresh the commercial context.', data:'Route context reused · repricing request', systems:['SpotOn service','Pricing engine'], control:'The refreshed quote becomes the new source of truth.', outcome:'The customer receives an updated offer without restarting the whole journey.', archActive:['SpotOn Pricing','Quotation Context']},
          {name:'Resume booking', short:'Continue cleanly', business:'Once the fresh quote exists, the journey can continue with confidence.', data:'New quote reference · refreshed validity', systems:['Booking orchestrator','Validation engine'], control:'The new quote is validated before resuming.', outcome:'The platform resolves the exception while keeping the flow controlled and auditable.', archActive:['Booking Orchestrator','Validation Engine','Notification & Analytics']}
        ]
      }
    ]
  }
};

const simEls = {
  title: $('#simTitle'), subtitle: $('#simSubtitle'), modeList: $('#simModeList'), timeline: $('#simTimeline'),
  stepNo: $('#simStepNo'), stepName: $('#simStepName'), stepBusiness: $('#simStepBusiness'),
  data: $('#simData'), systems: $('#simSystems'), control: $('#simControl'), outcome: $('#simOutcome'),
  arch: $('#simArchitecture'), archCaption: $('#simArchCaption'),
  before: $('#simBeforeList'), after: $('#simAfterList'), kpis: $('#simKpiList'),
  summaryProblem: $('#simSummaryProblem'), summaryChange: $('#simSummaryChange'), summaryValue: $('#simSummaryValue'),
  progress: $('#simProgress'), packet: $('#simPacket')
};
let simScenario = 'booking', simMode = 'standard', simStepIndex = 0, simTimer = null;
function getSimMode(){ return commerceSimulation[simScenario].modes.find(m=>m.id===simMode) || commerceSimulation[simScenario].modes[0]; }
function renderSimulation(){
  if(!simEls.title) return;
  const scenario = commerceSimulation[simScenario];
  const mode = getSimMode();
  simEls.title.textContent = scenario.label;
  simEls.subtitle.textContent = scenario.subtitle;
  simEls.summaryProblem.textContent = scenario.problem;
  simEls.summaryChange.textContent = scenario.change;
  simEls.summaryValue.textContent = scenario.value;
  $$('#simScenarioSwitch [data-sim-scenario]').forEach(btn=>btn.classList.toggle('active', btn.dataset.simScenario===simScenario));
  simEls.modeList.innerHTML = scenario.modes.map(m=>`<button class="sim-mode ${m.id===mode.id?'active':''}" data-sim-mode="${m.id}"><small>${esc(m.badge)}</small><b>${esc(m.label)}</b></button>`).join('');
  simEls.timeline.innerHTML = mode.steps.map((s,i)=>`<button class="sim-step ${i===0?'active':''}" data-sim-step="${i}"><span>${String(i+1).padStart(2,'0')}</span><b>${esc(s.name)}</b><small>${esc(s.short)}</small></button>`).join('');
  simEls.arch.innerHTML = mode.architecture.map(label=>`<div class="sim-arch-node" data-sim-arch="${esc(label)}">${esc(label)}</div>`).join('');
  simEls.before.innerHTML = mode.before.map(x=>`<li>${esc(x)}</li>`).join('');
  simEls.after.innerHTML = mode.after.map(x=>`<li>${esc(x)}</li>`).join('');
  simEls.kpis.innerHTML = scenario.kpis.map(k=>`<article><small>${esc(k[0])}</small><div><span>${esc(k[1])}</span><i>→</i><b>${esc(k[2])}</b></div></article>`).join('');
  simEls.archCaption.textContent = mode.archCaption;
  $$('[data-sim-mode]', simEls.modeList).forEach(btn=>btn.addEventListener('click', ()=>{ simMode = btn.dataset.simMode; simStepIndex = 0; clearInterval(simTimer); simTimer = null; renderSimulation(); }));
  $$('[data-sim-step]', simEls.timeline).forEach(btn=>btn.addEventListener('click', ()=>{ clearInterval(simTimer); simTimer = null; updateSimStep(+btn.dataset.simStep); }));
  updateSimStep(0);
}
function updateSimStep(i){
  const mode = getSimMode();
  const step = mode.steps[i]; if(!step) return;
  simStepIndex = i;
  $$('[data-sim-step]', simEls.timeline).forEach((node,k)=>{node.classList.toggle('active',k===i);node.classList.toggle('done',k<i)});
  simEls.stepNo.textContent = `STEP ${String(i+1).padStart(2,'0')}`;
  simEls.stepName.textContent = `${step.name} · ${step.short}`;
  simEls.stepBusiness.textContent = step.business;
  simEls.data.textContent = step.data;
  simEls.systems.innerHTML = step.systems.map(x=>`<span>${esc(x)}</span>`).join('');
  simEls.control.textContent = step.control;
  simEls.outcome.textContent = step.outcome;
  const pct = mode.steps.length===1 ? 100 : (i/(mode.steps.length-1))*100;
  if(simEls.progress) simEls.progress.style.width = pct+'%';
  if(simEls.packet) simEls.packet.style.left = pct+'%';
  $$('[data-sim-arch]', simEls.arch).forEach(node=>{
    const on = step.archActive.includes(node.textContent);
    node.classList.toggle('active', on);
    node.classList.toggle('muted', !on);
  });
}
function playSimulation(){ clearInterval(simTimer); simTimer = setInterval(()=>{ const mode = getSimMode(); updateSimStep((simStepIndex+1)%mode.steps.length); }, 1700); }
function openSimulation(target='booking'){
  simScenario = commerceSimulation[target] ? target : 'booking';
  simMode = commerceSimulation[simScenario].modes[0].id;
  simStepIndex = 0;
  renderSimulation();
}
$$('#simScenarioSwitch [data-sim-scenario]').forEach(btn=>btn.addEventListener('click', ()=>{ simScenario = btn.dataset.simScenario; simMode = commerceSimulation[simScenario].modes[0].id; simStepIndex = 0; clearInterval(simTimer); simTimer = null; renderSimulation(); }));
$$('[data-sim-control]').forEach(btn=>btn.addEventListener('click', ()=>{
  const action = btn.dataset.simControl;
  const mode = getSimMode();
  if(action==='play') playSimulation();
  if(action==='pause'){ clearInterval(simTimer); simTimer = null; }
  if(action==='next'){ clearInterval(simTimer); simTimer = null; updateSimStep((simStepIndex+1)%mode.steps.length); }
  if(action==='reset'){ clearInterval(simTimer); simTimer = null; updateSimStep(0); }
}));
$$('[data-sim-compare]').forEach(btn=>btn.addEventListener('click', ()=>{
  $$('[data-sim-compare]').forEach(x=>x.classList.toggle('active', x===btn));
  $$('[data-sim-compare-panel]').forEach(panel=>panel.classList.toggle('active', panel.dataset.simComparePanel===btn.dataset.simCompare));
}));
if(simEls.title) openSimulation('booking');

const commerceDashboard=$('#ecommerce-dashboard');
const commercePresent=$('#commercePresent');
if(commercePresent&&commerceDashboard){
  commercePresent.addEventListener('click',async()=>{
    try{await commerceDashboard.requestFullscreen(); commerceDashboard.classList.add('is-presenting'); commercePresent.textContent='Exit presentation ×';}
    catch(e){commerceDashboard.classList.toggle('is-presenting')}
  });
  document.addEventListener('fullscreenchange',()=>{const on=document.fullscreenElement===commerceDashboard;commerceDashboard.classList.toggle('is-presenting',on);commercePresent.textContent=on?'Exit presentation ×':'Presentation mode ↗'});
  commercePresent.addEventListener('dblclick',()=>{if(document.fullscreenElement)document.exitFullscreen()});
}

document.addEventListener('keydown',e=>{
  if(document.fullscreenElement===commerceDashboard){
    if(e.key==='ArrowRight'){commerceViewIndex=(commerceViewIndex+1)%commerceTabs.length;showCommerceView(commerceTabs[commerceViewIndex].dataset.commerceView)}
    if(e.key==='ArrowLeft'){commerceViewIndex=(commerceViewIndex-1+commerceTabs.length)%commerceTabs.length;showCommerceView(commerceTabs[commerceViewIndex].dataset.commerceView)}
  }
});

/* ============================================================
   V16 · Commerce Operations Lab
   ============================================================ */
(function(){
  const lab=document.getElementById('opsLab');
  if(!lab) return;

  const tabButtons=[...lab.querySelectorAll('[data-ops-view]')];
  const panels=[...lab.querySelectorAll('[data-ops-panel]')];
  tabButtons.forEach(btn=>btn.addEventListener('click',()=>{
    tabButtons.forEach(b=>b.classList.toggle('active',b===btn));
    panels.forEach(p=>p.classList.toggle('active',p.dataset.opsPanel===btn.dataset.opsView));
  }));

  const workflow=[
    {k:'PROCESS DIAGNOSIS',t:'Detect the exception at the point of failure',x:'Create a structured exception when the order cannot reserve stock. Preserve the original order, inventory snapshot and fulfilment response so the issue is diagnosable rather than becoming an email thread.',tags:['order_id','sku','node','ATP snapshot','reason code']},
    {k:'DATA ENRICHMENT',t:'Bring context to one operational screen',x:'Fetch trusted order, inventory, promise, channel and fulfilment context through APIs. The agent should not have to search multiple systems before understanding the case.',tags:['OMS state','inventory by node','promise date','channel state','correlation ID']},
    {k:'BUSINESS RULES',t:'Validate which resolution paths are actually allowed',x:'Apply deterministic rules first: alternate-node eligibility, promise tolerance, inventory confidence, cancellation constraints and required approvals. Keep policy explicit and testable.',tags:['eligibility rule','SLA threshold','promise tolerance','policy version','confidence']},
    {k:'HUMAN-IN-THE-LOOP',t:'Route only ambiguous or high-impact cases to people',x:'Automatically resolve clear cases, but route conflicting data, low-confidence recommendations or customer-impacting overrides to an accountable human reviewer.',tags:['review queue','risk level','recommended action','override reason','owner']},
    {k:'SYSTEM WRITE-BACK',t:'Resolve once and synchronize every affected system',x:'Execute the approved action idempotently, update OMS and channel state, notify the relevant actor and capture a complete audit record of the decision.',tags:['action id','write-back status','retry count','actor','timestamp']},
    {k:'CONTINUOUS IMPROVEMENT',t:'Turn operational telemetry into the next backlog',x:'Measure resolution time, reopen rate, exception volume and automation rate. Recurring failure modes become quantified improvement opportunities rather than permanent support work.',tags:['time-to-resolve','reopen rate','automation rate','ticket theme','backlog link']}
  ];
  const stepButtons=[...lab.querySelectorAll('[data-ops-step]')];
  const progress=document.getElementById('opsWorkflowProgress');
  const kicker=document.getElementById('opsStepKicker');
  const title=document.getElementById('opsStepTitle');
  const text=document.getElementById('opsStepText');
  const tags=document.getElementById('opsStepTags');
  const prev=document.getElementById('opsPrev');
  const next=document.getElementById('opsNext');
  const play=document.getElementById('opsPlay');
  let wi=0,timer=null;
  function renderWorkflow(i){
    wi=Math.max(0,Math.min(workflow.length-1,i));
    stepButtons.forEach((b,idx)=>{b.classList.toggle('active',idx===wi);b.classList.toggle('done',idx<wi)});
    progress.style.width=((wi)/(workflow.length-1)*100)+'%';
    const d=workflow[wi]; kicker.textContent=d.k;title.textContent=d.t;text.textContent=d.x;
    tags.innerHTML=d.tags.map(v=>`<span>${v}</span>`).join('');
  }
  stepButtons.forEach(b=>b.addEventListener('click',()=>{clearInterval(timer);timer=null;play.textContent='Run workflow';renderWorkflow(+b.dataset.opsStep)}));
  prev.addEventListener('click',()=>renderWorkflow(wi-1));
  next.addEventListener('click',()=>renderWorkflow(wi+1));
  play.addEventListener('click',()=>{
    if(timer){clearInterval(timer);timer=null;play.textContent='Run workflow';return;}
    if(wi>=workflow.length-1) renderWorkflow(0);
    play.textContent='Pause';
    timer=setInterval(()=>{if(wi>=workflow.length-1){clearInterval(timer);timer=null;play.textContent='Run again';return;}renderWorkflow(wi+1)},1250);
  });
  renderWorkflow(0);

  const autoNodes=[...lab.querySelectorAll('[data-auto-node]')];
  const rtTitle=document.getElementById('autoRuntimeTitle');
  const rtText=document.getElementById('autoRuntimeText');
  const rtLog=document.getElementById('autoRuntimeLog');
  const autoRun=document.getElementById('autoRun');
  const autoReset=document.getElementById('autoReset');
  const autoSteps=[
    ['Reservation failure received','Capture an immutable event and correlation ID before attempting any automated resolution.',['09:41:12  event.order.reservation_failed','09:41:12  correlation_id=cor_8f2a']],
    ['Operational context enriched','Fetch OMS state, inventory by node and promise context through controlled connectors.',['09:41:12  oms.fetch → 200','09:41:12  inventory.atp → 200','09:41:13  promise.fetch → 200']],
    ['Resolution options evaluated','Run explicit business rules before any AI-assisted recommendation.',['09:41:13  rule.alt_node=true','09:41:13  rule.promise_valid=true','09:41:13  candidate=LIL-05']],
    ['Human review skipped','Confidence is high and the action is within policy, so no manual gate is needed.',['09:41:13  confidence=0.97','09:41:13  human_gate=false']],
    ['Systems synchronized','Write the approved action back idempotently and confirm downstream status.',['09:41:14  oms.reroute → 200','09:41:14  channel.update → 200','09:41:14  notification.sent']],
    ['Telemetry captured','Publish outcome metrics so the workflow can be measured and improved.',['09:41:14  resolution_time=2.1s','09:41:14  automated=true','09:41:14  audit_event=written']]
  ];
  let ai=0,at=null;
  function renderAuto(i){
    ai=Math.max(0,Math.min(autoSteps.length-1,i));
    autoNodes.forEach((n,idx)=>{n.classList.toggle('active',idx===ai);n.classList.toggle('done',idx<ai)});
    rtTitle.textContent=autoSteps[ai][0];rtText.textContent=autoSteps[ai][1];
    rtLog.innerHTML=autoSteps[ai][2].map(x=>`<code>${x}</code>`).join('');
  }
  autoRun.addEventListener('click',()=>{
    if(at){clearInterval(at);at=null;autoRun.textContent='Run automation';return;}
    ai=0;renderAuto(0);autoRun.textContent='Pause';
    at=setInterval(()=>{if(ai>=autoSteps.length-1){clearInterval(at);at=null;autoRun.textContent='Run again';return;}renderAuto(ai+1)},900);
  });
  autoReset.addEventListener('click',()=>{if(at)clearInterval(at);at=null;autoRun.textContent='Run automation';renderAuto(0)});
  renderAuto(0);
})();
