
let currentLang="en";
const ui={
 en:{before:"Before",usecase:"Live use case",architecture:"Application architecture",after:"After",delivery:"My contribution & impact",view:"View project",tech:"TECH STACK",run:"Run use case",next:"Next step",reset:"Reset"},
 fr:{before:"Avant",usecase:"Cas d’usage",architecture:"Architecture applicative",after:"Après",delivery:"Ma contribution & impact",view:"Voir le projet",tech:"STACK TECHNIQUE",run:"Lancer le cas",next:"Étape suivante",reset:"Réinitialiser"}
};
function applyLanguage(lang){
 currentLang=lang;
 document.documentElement.lang=lang;
 document.querySelectorAll(".lang-btn").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
 document.querySelectorAll("[data-i18n-en]").forEach(el=>el.textContent=el.dataset[lang==="fr"?"i18nFr":"i18nEn"]);
 document.querySelectorAll("[data-project-title]").forEach(el=>{
   const p=window.PROJECTS.find(x=>x.id===el.dataset.projectTitle); if(p) el.textContent=(lang==="fr"&&p.title_fr)||p.title;
 });
 document.querySelectorAll("[data-project-subtitle]").forEach(el=>{
   const p=window.PROJECTS.find(x=>x.id===el.dataset.projectSubtitle); if(p) el.textContent=(lang==="fr"&&p.subtitle_fr)||p.subtitle;
 });
 localStorage.setItem("portfolioLang",lang);
}
document.querySelectorAll(".lang-btn").forEach(b=>b.addEventListener("click",()=>applyLanguage(b.dataset.lang)));
setTimeout(()=>applyLanguage(localStorage.getItem("portfolioLang")||"en"),0);

document.getElementById("year").textContent=new Date().getFullYear();
const sb=document.getElementById("scrollbar");
addEventListener("scroll",()=>{const d=document.documentElement,m=d.scrollHeight-d.clientHeight;sb.style.width=(m?d.scrollTop/m*100:0)+"%"},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));

const heroSteps=[...document.querySelectorAll(".hero-step")];
const heroTitle=document.getElementById("hero-live-title"),heroText=document.getElementById("hero-live-text");
const heroCopy=[
["Observe the real work","Start with users, handoffs, exceptions and repetitive operational tasks — not with a technology assumption."],
["Make the process visible","Map steps, systems, owners, data movement and the points where work slows down or breaks."],
["Turn friction into evidence","Use operational data, SQL/Python analysis and KPI baselines to quantify volume, time, quality and impact."],
["Translate business into buildable logic","Write functional requirements, business rules, exceptions and acceptance criteria that engineering can implement."],
["Engineer the right intervention","Use low-code applications, Python, APIs, workflow automation, analytics or AI only where they improve the process."],
["Validate before scale","Test real operating scenarios through UAT, fix edge cases and prepare users for the release."],
["Measure adoption and improve","Track usage, adoption, quality and support signals, then feed them into governance and the next backlog."]
];
let heroIdx=0;
function animateHero(){
 if(!heroSteps.length)return;
 heroSteps.forEach((n,i)=>n.classList.toggle("active",i===heroIdx));
 heroTitle.textContent=heroCopy[heroIdx][0];heroText.textContent=heroCopy[heroIdx][1];
 heroIdx=(heroIdx+1)%heroSteps.length;
}
animateHero();setInterval(animateHero,2600);

const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function card(p){return `<article class="card ${p.theme==="azure"?"azure":""}" data-id="${p.id}" tabindex="0"><div class="card-top"><div><span class="no">PROJECT ${p.order.toString().padStart(2,"0")}</span><h4>${`<span data-project-title="${p.id}">${esc((currentLang==="fr"&&p.title_fr)||p.title)}</span>`}</h4></div><div class="metric"><strong>${esc(p.metric)}</strong><span>${esc(p.metricLabel)}</span></div></div><p>${`<span data-project-subtitle="${p.id}">${esc((currentLang==="fr"&&p.subtitle_fr)||p.subtitle)}</span>`}</p><div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div><div class="stack-preview"><b>TECH</b><span>${(p.techStack||[]).slice(0,6).map(esc).join(" • ")}</span></div><div class="open-row"><span>Open full architecture + live walkthrough</span><i>↗</i></div></article>`}
document.getElementById("google-projects").innerHTML=PROJECTS.filter(p=>p.theme==="google").map(card).join("");
document.getElementById("volvo-projects").innerHTML=PROJECTS.filter(p=>p.company==="Volvo Group").map(card).join("");
document.getElementById("microsoft-projects").innerHTML=PROJECTS.filter(p=>p.company==="Microsoft").map(card).join("");

const modal=document.getElementById("modal"), content=document.getElementById("modal-content");
let walkthroughTimer=null,currentStep=0,currentNodes=[];
function list(a){return `<ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`}
function renderLayers(p){
 return p.layers.map(layer=>`<section class="layer ${layer.color}"><h4><em>${layer.n}</em>${esc(layer.title)}</h4>${layer.items.map((it,idx)=>`<div class="component" data-name="${esc(it[0])}" data-desc="${esc(it[3])}" data-type="${it[2]}"><span class="type"></span><b>${esc(it[0])}</b><span>${esc(it[1])}</span></div>`).join("")}<div class="flow-track"></div></section>`).join("");
}
function renderRail(p){return `<aside class="rail"><h4>AUTOMATION / MONITORING CONTROL PLANE</h4>${p.rail.map(x=>`<div class="rail-item" data-name="${esc(x[0])}" data-desc="${esc(x[2])}"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join("")}</aside>`}
function architecture(p){return `<div class="arch-toolbar"><div class="left"><button class="play" id="play-walkthrough">▶ Play walkthrough</button><button class="speed" id="reset-walkthrough">↺ Reset</button></div><small>Click any component for a live explanation</small></div>
<div class="enterprise-arch">
 <div class="main-arch">
  <div class="arch-titlebar"><b>${esc(p.title.toUpperCase())}</b><span>${`<span data-project-subtitle="${p.id}">${esc((currentLang==="fr"&&p.subtitle_fr)||p.subtitle)}</span>`}</span></div>
  <div class="tech-row">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div>
  <div class="layers">${renderLayers(p)}</div>
  <div class="foundation"><b>INFRASTRUCTURE • SECURITY • GOVERNANCE FOUNDATION</b>${p.foundation.map(x=>`<span>${esc(x)}</span>`).join("")}</div>
 </div>
 <div>${renderRail(p)}
  <div class="explain-panel"><small>LIVE EXPLANATION</small><h3 id="explain-title">Select a component</h3><p id="explain-text">Click a component or press Play walkthrough. The diagram will highlight the architecture one stage at a time and explain why each element exists.</p><div class="stepcount"><span id="step-label">Ready</span><span>${p.layers.reduce((n,l)=>n+l.items.length,0)+p.rail.length} components</span></div><div class="legend-grid"><span><i class="dot human"></i>Human</span><span><i class="dot ai"></i>AI</span><span><i class="dot data"></i>Data</span><span><i class="dot control"></i>Control</span></div></div>
 </div>
</div>`}

function comparison(p,focusAfter=false){
 const flow=(arr,cls)=>`<div class="app-flow">${arr.map((x,i)=>`${i?'<i class="app-arrow">→</i>':''}<span class="app-node ${cls}">${esc(x)}</span>`).join("")}</div>`;
 return `<div class="compare-wrap"><div class="compare-head"><div><b>APPLICATION / PROCESS — BEFORE vs AFTER</b><span> • animated structural comparison</span></div><button class="compare-play">▶ Animate comparison</button></div><div class="compare-canvas"><div class="compare-side before-app"><small>BEFORE — FRAGMENTED / MANUAL</small>${flow(p.usecase.beforeFlow,"old")}</div><div class="compare-side after-app"><small>AFTER — CONTROLLED / INTEGRATED</small>${flow(p.usecase.afterFlow,"new")}</div></div></div>`;
}
function liveUseCase(p){
 return `<div class="usecase-intro"><div><small>REPRESENTATIVE LIVE USE CASE</small><h3>${esc(p.usecase.title)}</h3><p>${esc(p.usecase.input)}</p></div><div class="actor-badge"><b>${esc(p.usecase.actor)}</b><span>scenario actor</span></div></div><div class="sim-shell"><div class="sim-stage"><div class="packet"></div><div class="sim-grid">${p.usecase.steps.map((s,i)=>`<div class="sim-node" data-i="${i}"><em>${String(i+1).padStart(2,"0")}</em><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("")}</div></div><aside class="sim-panel"><small>LIVE SYSTEM EXPLANATION</small><h3 id="sim-title">Ready to run</h3><p id="sim-text">Press Run use case to watch one representative request travel through the process and application architecture.</p><div class="sim-progress"><i></i></div><div class="sim-controls"><button class="run" id="sim-run">▶ Run use case</button><button id="sim-next">Next step</button><button id="sim-reset">Reset</button></div><div class="sim-eventlog" id="sim-log"></div></aside></div>`;
}
let usecaseTimer=null;
function bindUseCase(p){
 clearInterval(usecaseTimer);
 const nodes=[...content.querySelectorAll(".sim-node")], packet=content.querySelector(".packet"), title=content.querySelector("#sim-title"), text=content.querySelector("#sim-text"), prog=content.querySelector(".sim-progress i"), log=content.querySelector("#sim-log"); if(!nodes.length)return;
 let step=-1;
 function activate(i){ if(i<0||i>=nodes.length)return; step=i; nodes.forEach((n,j)=>{n.classList.toggle("active",j===i);if(j<i)n.classList.add("done");else if(j>i)n.classList.remove("done")}); const n=nodes[i],stage=content.querySelector(".sim-stage"),nr=n.getBoundingClientRect(),sr=stage.getBoundingClientRect();packet.style.opacity=1;packet.style.left=(nr.left-sr.left+nr.width/2-7)+"px";packet.style.top=(nr.top-sr.top+nr.height/2-7)+"px";packet.classList.add("pulse-ring");title.textContent=p.usecase.steps[i][0];text.textContent=p.usecase.steps[i][1];prog.style.width=((i+1)/nodes.length*100)+"%";log.insertAdjacentHTML("afterbegin",`<div class="sim-event"><b>${String(i+1).padStart(2,"0")}</b> ${esc(p.usecase.steps[i][0])}</div>`)}
 function reset(){clearInterval(usecaseTimer);step=-1;nodes.forEach(n=>n.classList.remove("active","done"));packet.style.opacity=0;prog.style.width="0";title.textContent="Ready to run";text.textContent="Press Run use case to watch one representative request travel through the process and application architecture.";log.innerHTML=""}
 content.querySelector("#sim-run").onclick=()=>{reset();activate(0);usecaseTimer=setInterval(()=>{if(step>=nodes.length-1){clearInterval(usecaseTimer);title.textContent="Use case complete";text.textContent="The request has reached the measurable business outcome while preserving controls, auditability and the required human decision points.";return}activate(step+1)},1800)};
 content.querySelector("#sim-next").onclick=()=>{clearInterval(usecaseTimer);if(step<nodes.length-1)activate(step+1)};
 content.querySelector("#sim-reset").onclick=reset;
 nodes.forEach((n,i)=>n.onclick=()=>{clearInterval(usecaseTimer);activate(i)});
}
function bindComparison(){
 const wraps=[...content.querySelectorAll(".compare-wrap")];wraps.forEach(w=>{const btn=w.querySelector(".compare-play"),nodes=[...w.querySelectorAll(".app-node")];let timers=[];btn.onclick=()=>{timers.forEach(clearTimeout);nodes.forEach(n=>n.classList.remove("live"));nodes.forEach((n,i)=>timers.push(setTimeout(()=>n.classList.add("live"),i*230)));btn.textContent="↺ Replay comparison"}})
}

function openProject(p){
 clearInterval(walkthroughTimer);currentStep=0;
 content.innerHTML=`<div class="modal-header"><div class="modal-company">${esc(p.company)} • PROJECT ${p.order.toString().padStart(2,"0")}</div><h2 id="modal-title">${`<span data-project-title="${p.id}">${esc((currentLang==="fr"&&p.title_fr)||p.title)}</span>`}</h2><p>${`<span data-project-subtitle="${p.id}">${esc((currentLang==="fr"&&p.subtitle_fr)||p.subtitle)}</span>`}</p><div class="modal-summary"><span class="metric-chip">${esc(p.metric)} — ${esc(p.metricLabel)}</span><span>${esc(p.scale)}</span>${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div><div class="modal-tech"><b>TECH STACK</b><div>${(p.techStack||[]).map(t=>`<span>${esc(t)}</span>`).join("")}</div></div></div>
 <div class="view-tabs"><button class="view-tab active" data-view="before">${currentLang==="fr"?"01 Avant":"01 Before"}</button><button class="view-tab" data-view="usecase">${currentLang==="fr"?"02 Cas d’usage":"02 Live use case"}</button><button class="view-tab" data-view="architecture">${currentLang==="fr"?"03 Architecture applicative":"03 Application architecture"}</button><button class="view-tab" data-view="after">${currentLang==="fr"?"04 Après":"04 After"}</button><button class="view-tab" data-view="delivery">${currentLang==="fr"?"05 Ma contribution & impact":"05 My contribution & impact"}</button></div>
 <section class="view active" data-panel="before"><div class="state-grid"><div class="state-card before"><small>BEFORE</small><h3>How the process worked</h3>${list(p.before)}</div><div class="state-card"><small>TRANSFORMATION QUESTION</small><h3>What had to change?</h3><p>${`<span data-project-subtitle="${p.id}">${esc((currentLang==="fr"&&p.subtitle_fr)||p.subtitle)}</span>`}</p><div class="transition-band"><div class="transition-flow"><span>Observe</span><i>→</i><span>Quantify</span><i>→</i><span>Redesign</span><i>→</i><span>Engineer</span><i>→</i><span>Adopt</span></div></div></div></div>${comparison(p)}</section>
 <section class="view" data-panel="usecase">${liveUseCase(p)}<div class="case-note">Illustrative walkthrough: this demonstrates the operating logic and architecture pattern using a representative scenario. It does not claim that the displayed sample transaction is a literal production record.</div></section>
 <section class="view" data-panel="architecture">${architecture(p)}<div class="accuracy">Architecture diagrams are intentionally grounded in the technologies and solution patterns supported by the CV. Generic labels are used where a specific production product is not established.</div></section>
 <section class="view" data-panel="after"><div class="state-grid"><div class="state-card after"><small>AFTER</small><h3>Target operating model</h3>${list(p.after)}</div><div class="state-card"><small>DESIGN PRINCIPLE</small><h3>Why this is stronger</h3><p>The application is presented as an operating system for the process: users, workflow state, integrations, data, controls, observability, governance and feedback are designed together instead of drawing only a happy-path chain of boxes.</p></div></div>${comparison(p,true)}</section>
 <section class="view" data-panel="delivery"><div class="delivery-grid"><div class="delivery-card"><h3>My contribution</h3>${list(p.contribution)}</div><div class="delivery-card outcome-card"><h3>Business outcome</h3><strong>${esc(p.metric)}</strong><p>${esc(p.outcome)}</p></div></div></section>`;
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
 content.querySelectorAll(".view-tab").forEach(btn=>btn.addEventListener("click",()=>{content.querySelectorAll(".view-tab").forEach(x=>x.classList.remove("active"));content.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));btn.classList.add("active");content.querySelector(`[data-panel="${btn.dataset.view}"]`).classList.add("active"); if(btn.dataset.view==="architecture") setTimeout(bindArchitecture,50); if(btn.dataset.view==="usecase") setTimeout(()=>bindUseCase(p),50); if(btn.dataset.view==="before"||btn.dataset.view==="after") setTimeout(bindComparison,50)}));
}
function bindArchitecture(){
 const nodes=[...content.querySelectorAll(".component"),...content.querySelectorAll(".rail-item")]; if(!nodes.length)return; currentNodes=nodes;
 const title=content.querySelector("#explain-title"), text=content.querySelector("#explain-text"), label=content.querySelector("#step-label");
 const activate=(node,i)=>{nodes.forEach(n=>n.classList.remove("active"));node.classList.add("active");title.textContent=node.dataset.name;text.textContent=node.dataset.desc;label.textContent=`Step ${i+1} of ${nodes.length}`;node.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})};
 nodes.forEach((n,i)=>n.addEventListener("click",()=>{clearInterval(walkthroughTimer);activate(n,i);currentStep=i}));
 const play=content.querySelector("#play-walkthrough"), reset=content.querySelector("#reset-walkthrough");
 play.onclick=()=>{clearInterval(walkthroughTimer);currentStep=0;activate(nodes[0],0);play.textContent="❚❚ Playing";walkthroughTimer=setInterval(()=>{currentStep++;if(currentStep>=nodes.length){clearInterval(walkthroughTimer);play.textContent="▶ Replay walkthrough";label.textContent="Walkthrough complete";return}activate(nodes[currentStep],currentStep)},2400)};
 reset.onclick=()=>{clearInterval(walkthroughTimer);nodes.forEach(n=>n.classList.remove("active"));title.textContent="Select a component";text.textContent="Click a component or press Play walkthrough. The diagram will highlight the architecture one stage at a time and explain why each element exists.";label.textContent="Ready";play.textContent="▶ Play walkthrough";currentStep=0};
}
document.querySelectorAll(".card").forEach(c=>{const go=()=>openProject(PROJECTS.find(p=>p.id===c.dataset.id));c.addEventListener("click",go);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}})});
function closeModal(){clearInterval(walkthroughTimer);modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll("[data-close]").forEach(x=>x.onclick=closeModal);addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});