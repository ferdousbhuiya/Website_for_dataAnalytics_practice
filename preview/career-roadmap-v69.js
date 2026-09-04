(function(){
'use strict';
const STORE='bhuiyaDataCareerGoalV1';
const GOALS={
 analyst:{title:'Data Analyst',tag:'Turn business questions into clear, evidence-based answers.',accent:'ANALYZE',stages:[
  {name:'Beginner',why:'Build the core analyst foundation before adding programming.',steps:[
   ['Excel Fundamentals','excel','Beginner','Clean, organize, calculate and summarize business data.'],
   ['SQL Fundamentals','sql','Beginner','Query tables, filter data, join sources and aggregate results.'],
   ['Statistics','statistics','Beginner','Understand distributions, variation, confidence and sound interpretation.'],
   ['Data Visualization','visualization','Beginner','Communicate patterns clearly with charts and dashboards.'],
   ['Business Analytics','business','Beginner','Translate business questions into measurable analysis.']
  ],milestone:'Practice milestone: analyze a sales or customer dataset in Excel/SQL and explain three business findings.'},
  {name:'Intermediate',why:'Move from tool basics to realistic analysis workflows.',steps:[
   ['Advanced SQL','sql_intermediate','Intermediate','Use deeper joins, subqueries, CTEs and analytical SQL.'],
   ['Python for Analysis','python','Intermediate','Use Python as an analyst tool, not just as a programming language.'],
   ['Visualization & Dashboards','visualization_intermediate','Intermediate','Build decision-focused dashboards and tell a data story.'],
   ['Product Analytics','product_analytics','Intermediate','Work with funnels, retention, cohorts and user behavior.'],
   ['Pandas Project','pandas_project','Intermediate','Complete an end-to-end analysis with a realistic dataset.'],
   ['SQL Project','sql_project','Intermediate','Solve a business case using multi-step SQL analysis.']
  ],milestone:'Project milestone: complete one SQL/Pandas project and one dashboard suitable for a portfolio.'},
  {name:'Advanced',why:'Add advanced analytics, data-pipeline awareness and job readiness.',steps:[
   ['Advanced SQL','sql_advanced','Advanced','Handle complex analytical patterns confidently.'],
   ['Advanced Statistics','statistics_advanced','Advanced','Evaluate uncertainty and more sophisticated analytical claims.'],
   ['Business Analytics Advanced','business_advanced','Advanced','Frame recommendations for stakeholders and decision makers.'],
   ['Data Engineering Fundamentals','data_engineering','Advanced','Understand how reliable analytical data is produced.'],
   ['Statistics Project','stats_project','Advanced','Demonstrate analytical reasoning in a portfolio-ready project.']
  ],milestone:'Career milestone: polish 2–3 projects, explain your decisions, and practice interview-style business cases.'}
 ]},
 bi:{title:'Business Intelligence Analyst',tag:'Build trusted dashboards, models and reporting systems.',accent:'REPORT',stages:[
  {name:'Beginner',why:'Start with reporting fundamentals and strong data literacy.',steps:[
   ['Excel Fundamentals','excel','Beginner','Build reliable spreadsheet analysis and reporting habits.'],
   ['SQL Fundamentals','sql','Beginner','Retrieve and combine data for reports.'],
   ['Statistics','statistics','Beginner','Interpret KPIs and variation correctly.'],
   ['Data Visualization','visualization','Beginner','Choose charts that support decisions.'],
   ['Business Analytics','business','Beginner','Connect metrics to business goals.']
  ],milestone:'Practice milestone: create a KPI report from a sales, operations or workforce dataset.'},
  {name:'Intermediate',why:'Develop the skills behind professional BI dashboards.',steps:[
   ['Excel Intermediate','excel_intermediate','Intermediate','Use more advanced spreadsheet analysis and models.'],
   ['SQL Intermediate','sql_intermediate','Intermediate','Prepare reporting datasets efficiently.'],
   ['Visualization Intermediate','visualization_intermediate','Intermediate','Design interactive, audience-focused dashboards.'],
   ['Business Analytics Intermediate','business_intermediate','Intermediate','Define metrics and reporting logic.'],
   ['ETL Foundations','etl5','Intermediate','Understand how data reaches BI models.'],
   ['Visualization Project','viz_project','Intermediate','Create a portfolio dashboard from a realistic scenario.']
  ],milestone:'Project milestone: build one executive dashboard with documented KPIs, filters and business recommendations.'},
  {name:'Advanced',why:'Move toward scalable BI, modeling and governed data.',steps:[
   ['SQL Advanced','sql_advanced','Advanced','Build robust reporting queries and reusable logic.'],
   ['Visualization Advanced','visualization_advanced','Advanced','Create advanced analytical experiences.'],
   ['Data Engineering','data_engineering','Advanced','Understand pipelines, quality and transformations.'],
   ['Cloud Data','cloud_data','Advanced','Understand modern cloud analytics architecture.'],
   ['ETL Project','etl_project','Advanced','Build a complete data-to-reporting workflow.']
  ],milestone:'Career milestone: present a dashboard and defend the metric definitions, data model and business conclusions.'}
 ]},
 scientist:{title:'Data Scientist',tag:'Use statistics, experimentation and machine learning to solve predictive problems.',accent:'MODEL',stages:[
  {name:'Beginner',why:'Build mathematics, coding and data foundations first.',steps:[
   ['Python Setup & Foundations','python_setup','Beginner','Become comfortable with Python and analytical coding.'],
   ['Statistics','statistics','Beginner','Build the statistical reasoning needed for modeling.'],
   ['SQL Fundamentals','sql','Beginner','Retrieve and prepare data from databases.'],
   ['Data Visualization','visualization','Beginner','Explore and communicate patterns.'],
   ['Business Analytics','business','Beginner','Keep modeling connected to real decisions.']
  ],milestone:'Practice milestone: perform exploratory analysis on a messy dataset and document assumptions and findings.'},
  {name:'Intermediate',why:'Learn the workflow from experimentation to first predictive models.',steps:[
   ['Python for Analysis','python','Intermediate','Use Python libraries for data analysis.'],
   ['Experiment Design','experiment_design','Intermediate','Design valid tests and avoid common causal mistakes.'],
   ['A/B Testing','ab_tests','Intermediate','Evaluate experiments with statistical discipline.'],
   ['Machine Learning','machine_learning','Intermediate','Learn core supervised and unsupervised methods.'],
   ['Statistical Modeling','statistical_modeling','Intermediate','Connect models to statistical assumptions.'],
   ['Pandas Project','pandas_project','Intermediate','Practice a complete data preparation and analysis workflow.']
  ],milestone:'Project milestone: complete an EDA/ML project with train/test logic, evaluation and clear limitations.'},
  {name:'Advanced',why:'Deepen modeling and production awareness.',steps:[
   ['Python Advanced','python_advanced','Advanced','Strengthen reusable analytical programming.'],
   ['Statistics Advanced','statistics_advanced','Advanced','Work with more advanced inference and uncertainty.'],
   ['Deep Learning','deep_learning','Advanced','Understand neural-network workflows and appropriate use cases.'],
   ['Machine Learning Project','ml_project','Advanced','Build a portfolio-ready modeling project.'],
   ['Big Data','big_data','Advanced','Understand scale and distributed analytical systems.']
  ],milestone:'Career milestone: explain model choice, validation, trade-offs, failure modes and business impact in your portfolio.'}
 ]},
 engineer:{title:'Data Engineer',tag:'Build reliable pipelines and data platforms that analytics teams can trust.',accent:'BUILD',stages:[
  {name:'Beginner',why:'Start with SQL, Python and basic data handling before infrastructure.',steps:[
   ['SQL Fundamentals','sql','Beginner','Master relational data and query logic.'],
   ['Python Foundations','python_setup','Beginner','Automate data tasks with Python.'],
   ['Excel & Data Literacy','excel','Beginner','Understand tabular data quality and transformation.'],
   ['ETL Foundations I','etl1','Beginner','Learn extraction, transformation and loading concepts.'],
   ['ETL Foundations II','etl2','Beginner','Continue pipeline and transformation fundamentals.']
  ],milestone:'Practice milestone: take a raw file, clean it, validate it and load it into a structured destination.'},
  {name:'Intermediate',why:'Build repeatable pipeline, modeling and quality skills.',steps:[
   ['SQL Intermediate','sql_intermediate','Intermediate','Write production-minded transformation SQL.'],
   ['Python for Data Work','python','Intermediate','Automate ingestion and transformation tasks.'],
   ['ETL Pipelines','etl5','Intermediate','Build stronger pipeline patterns.'],
   ['ETL Orchestration','etl6','Intermediate','Understand multi-step pipeline execution.'],
   ['ETL Quality & Reliability','etl8','Intermediate','Design checks and reliable data flows.'],
   ['ETL Operations','etl9','Intermediate','Practice maintainable pipeline operations.']
  ],milestone:'Project milestone: build a multi-step ETL flow with validation, logging and documented data lineage.'},
  {name:'Advanced',why:'Move into scalable architecture, cloud and end-to-end systems.',steps:[
   ['Advanced ETL','etl7','Advanced','Handle advanced pipeline patterns and design choices.'],
   ['Data Engineering','data_engineering','Advanced','Study architecture, reliability and production practices.'],
   ['Big Data','big_data','Advanced','Understand distributed processing and scale.'],
   ['Cloud Data','cloud_data','Advanced','Learn modern cloud data platform concepts.'],
   ['ETL Project','etl_project','Advanced','Build an end-to-end engineering portfolio project.'],
   ['Cloud Project','cloud_project','Advanced','Apply cloud architecture concepts in a realistic project.']
  ],milestone:'Career milestone: be able to diagram your pipeline, explain failure handling, quality controls, scale and cost trade-offs.'}
 ]},
 explore:{title:'I am not sure yet',tag:'Build a shared foundation, then sample each career direction before committing.',accent:'EXPLORE',stages:[
  {name:'Beginner',why:'These skills are useful across almost every data career.',steps:[
   ['Excel Fundamentals','excel','Beginner','Learn how structured data behaves.'],
   ['SQL Fundamentals','sql','Beginner','Learn to ask questions of databases.'],
   ['Statistics','statistics','Beginner','Learn how to reason from data.'],
   ['Python Foundations','python_setup','Beginner','Try analytical programming.'],
   ['Data Visualization','visualization','Beginner','Practice explaining insights visually.']
  ],milestone:'Decision checkpoint: notice whether you most enjoy business analysis, dashboards, modeling or building data systems.'},
  {name:'Intermediate',why:'Sample one module from each major career direction.',steps:[
   ['Product Analytics','product_analytics','Intermediate','Sample analyst/business problem solving.'],
   ['Visualization Intermediate','visualization_intermediate','Intermediate','Sample BI/dashboard work.'],
   ['Machine Learning','machine_learning','Intermediate','Sample data-science modeling.'],
   ['ETL Pipelines','etl5','Intermediate','Sample data-engineering work.']
  ],milestone:'Exploration milestone: complete one small task from each direction, then return here and choose the path you enjoyed most.'},
  {name:'Advanced',why:'Do not rush into advanced material until your direction is clearer.',steps:[
   ['Data Engineering','data_engineering','Advanced','Explore engineering architecture.'],
   ['Deep Learning','deep_learning','Advanced','Explore advanced modeling.'],
   ['Business Analytics Advanced','business_advanced','Advanced','Explore strategic analytics.'],
   ['Visualization Advanced','visualization_advanced','Advanced','Explore advanced BI.']
  ],milestone:'Career milestone: choose a primary target and follow that dedicated roadmap from the beginning, filling any gaps.'}
 ]}
};

let activeGoal=null;
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function styles(){
 if(document.getElementById('bdCareerStyles'))return;const s=document.createElement('style');s.id='bdCareerStyles';s.textContent=`
 .bd-career-btn{border:1px solid #8b5cf6!important;background:linear-gradient(135deg,#6d4aff,#8b5cf6)!important;color:#fff!important;box-shadow:0 8px 24px rgba(109,74,255,.22)!important}
 .bd-career-btn:hover{filter:brightness(1.08)}
 .bd-career-view{position:fixed;inset:0;z-index:11000;background:#06111c;color:#edf5fb;overflow:auto;padding:0 0 60px}
 .bd-career-shell{width:min(1180px,calc(100% - 32px));margin:0 auto;padding-top:24px}
 .bd-career-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:22px}
 .bd-career-back{border:1px solid #31506a;background:#0b2234;color:#e8f2f8;border-radius:9px;padding:9px 14px;font-weight:800;cursor:pointer}
 .bd-career-title h1{font-size:clamp(28px,4vw,46px);margin:0 0 8px}.bd-career-title p{color:#9db2bf;max-width:780px;line-height:1.6;margin:0}
 .bd-goal-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:24px 0}
 .bd-goal-card{border:1px solid #25445d;background:linear-gradient(145deg,#0a1b2d,#091725);border-radius:14px;padding:16px;cursor:pointer;text-align:left;color:#edf5fb;transition:.18s}
 .bd-goal-card:hover,.bd-goal-card.active{border-color:#42df8a;transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,.2)}
 .bd-goal-card small{display:block;color:#42df8a;font-weight:900;letter-spacing:.08em;font-size:9px;margin-bottom:7px}.bd-goal-card strong{display:block;font-size:15px;margin-bottom:7px}.bd-goal-card span{display:block;color:#91a9bb;font-size:11px;line-height:1.45}
 .bd-roadmap-head{border:1px solid #26475e;background:#0a1b29;border-radius:16px;padding:18px;margin:0 0 15px}.bd-roadmap-head small{color:#42df8a;font-weight:900;letter-spacing:.09em}.bd-roadmap-head h2{margin:5px 0 5px;font-size:25px}.bd-roadmap-head p{margin:0;color:#a1b5c2}
 .bd-stage-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
 .bd-stage{border:1px solid #213c56;border-radius:16px;background:linear-gradient(145deg,#0a1b2d,#081624);padding:16px;min-width:0}
 .bd-stage-label{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:5px}.bd-stage-label b{font-size:17px}.bd-stage-label span{font-size:9px;font-weight:900;color:#42df8a;letter-spacing:.08em}
 .bd-stage>p{color:#91a9bb;font-size:11px;line-height:1.5;min-height:34px}
 .bd-step-list{display:grid;gap:8px;margin-top:12px}.bd-step{width:100%;text-align:left;border:1px solid #26445a;background:#0d2231;border-radius:10px;padding:10px;color:#edf5fb;cursor:pointer;display:grid;grid-template-columns:28px 1fr;gap:9px;align-items:start}
 .bd-step:hover{border-color:#3fcf8e;background:#102b3b}.bd-step-num{width:25px;height:25px;border-radius:50%;display:grid;place-items:center;background:#123a34;color:#72f0ab;font-weight:900;font-size:10px}.bd-step strong{display:block;font-size:12px}.bd-step small{display:block;color:#8fa6b8;font-size:9px;line-height:1.45;margin-top:3px}
 .bd-milestone{margin-top:12px;border:1px dashed #5d4bc4;background:rgba(108,76,255,.08);border-radius:10px;padding:10px;color:#c4baff;font-size:10px;line-height:1.5}
 .bd-roadmap-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:14px}.bd-roadmap-actions button{border:1px solid #31506a;border-radius:9px;background:#102536;color:#edf5fb;padding:9px 12px;font-weight:800;cursor:pointer}.bd-roadmap-actions .primary{background:#36d880;color:#052315;border-color:#36d880}
 .bd-saved-goal{font-size:11px;color:#91a9bb;margin-top:10px}
 @media(max-width:980px){.bd-goal-grid{grid-template-columns:repeat(2,1fr)}.bd-stage-grid{grid-template-columns:1fr}}
 @media(max-width:620px){.bd-career-shell{width:min(100% - 22px,1180px);padding-top:14px}.bd-career-top{align-items:flex-start}.bd-goal-grid{grid-template-columns:1fr}.bd-career-title h1{font-size:28px}}
 `;document.head.appendChild(s)
}
function currentGoal(){
 const u=window.dataPrepCloud?.getUser?.();
 const cloud=String(u?.user_metadata?.career_goal||'');
 if(GOALS[cloud])return cloud;
 const local=localStorage.getItem(STORE);return GOALS[local]?local:null;
}
async function saveGoal(key){
 if(!GOALS[key])return;activeGoal=key;localStorage.setItem(STORE,key);
 const c=window.dataPrepSupabase,u=window.dataPrepCloud?.getUser?.();
 if(c&&u){try{await c.auth.updateUser({data:{career_goal:key}})}catch(_){}}
 renderGoal();updateButtons();
}
function updateButtons(){
 const key=currentGoal()||activeGoal;const g=GOALS[key];
 document.querySelectorAll('[data-bd-career-open]').forEach(b=>{b.title=g?'Your selected goal: '+g.title:'Choose a career goal and guided roadmap'});
}
function waitFor(fn,tries=40){return new Promise(resolve=>{let n=0;(function tick(){const v=fn();if(v||n++>=tries)return resolve(v);setTimeout(tick,100)})()})}
async function openStep(subject,stage){
 closeCareer();
 if(stage==='Beginner'){
  window.openStageCurriculum?.('Beginner');
  const host=await waitFor(()=>document.getElementById('beginnerSubjectBrowser'));
  const card=host?.querySelector('[data-subject="'+CSS.escape(subject)+'"]');if(card){card.click();setTimeout(()=>card.scrollIntoView({behavior:'smooth',block:'start'}),100)}
 }else if(stage==='Intermediate'){
  window.openIntermediateStage?.();
  const host=await waitFor(()=>document.getElementById('intermediateStageBrowser'));
  const card=host?.querySelector('[data-im="'+CSS.escape(subject)+'"]');if(card)card.click();
 }else{
  window.openAdvancedStage?.();
  const host=await waitFor(()=>document.getElementById('advancedStageBrowser'));
  const card=host?.querySelector('[data-adv="'+CSS.escape(subject)+'"]');if(card)card.click();
 }
}
function openProjects(){closeCareer();if(typeof window.openProjects==='function')window.openProjects(new Event('click'));else{location.hash='projects';document.querySelector('a[href="#projects"]')?.click()}}
function renderGoal(){
 const host=document.getElementById('bdRoadmapHost');if(!host)return;
 const key=activeGoal||currentGoal();
 document.querySelectorAll('.bd-goal-card').forEach(c=>c.classList.toggle('active',c.dataset.goal===key));
 if(!key){host.innerHTML='<div class="bd-roadmap-head"><small>START HERE</small><h2>Choose the career direction that matches your target.</h2><p>You can change this later. If you are unsure, choose “I am not sure yet” and start with the shared foundation.</p></div>';return}
 const g=GOALS[key];
 host.innerHTML=`<div class="bd-roadmap-head"><small>${esc(g.accent)} ROADMAP</small><h2>${esc(g.title)}</h2><p>${esc(g.tag)}</p><div class="bd-saved-goal">This roadmap is saved on this device${window.dataPrepCloud?.getUser?.()?' and in your signed-in account':''}.</div></div><div class="bd-stage-grid">${g.stages.map((st,si)=>`<article class="bd-stage"><div class="bd-stage-label"><b>${esc(st.name)}</b><span>STAGE ${si+1}</span></div><p>${esc(st.why)}</p><div class="bd-step-list">${st.steps.map((x,i)=>`<button class="bd-step" data-subject="${esc(x[1])}" data-stage="${esc(x[2])}"><span class="bd-step-num">${i+1}</span><span><strong>${esc(x[0])}</strong><small>${esc(x[3])}</small></span></button>`).join('')}</div><div class="bd-milestone">${esc(st.milestone)}</div></article>`).join('')}</div><div class="bd-roadmap-actions"><button class="primary" data-start-first>Start / Continue This Path</button><button data-open-projects>Open Project Library</button><button data-change-goal>Change Career Goal</button></div>`;
 host.querySelectorAll('.bd-step').forEach(b=>b.onclick=()=>openStep(b.dataset.subject,b.dataset.stage));
 host.querySelector('[data-start-first]')?.addEventListener('click',()=>{const first=g.stages[0].steps[0];openStep(first[1],first[2])});
 host.querySelector('[data-open-projects]')?.addEventListener('click',openProjects);
 host.querySelector('[data-change-goal]')?.addEventListener('click',()=>document.querySelector('.bd-goal-grid')?.scrollIntoView({behavior:'smooth',block:'start'}));
}
function openCareer(){
 styles();document.getElementById('bdCareerView')?.remove();activeGoal=currentGoal();
 const view=document.createElement('section');view.id='bdCareerView';view.className='bd-career-view';
 view.innerHTML=`<div class="bd-career-shell"><div class="bd-career-top"><button class="bd-career-back" data-close>← Back to home</button></div><div class="bd-career-title"><h1>Choose Your Career Goal & Roadmap</h1><p>Tell Bhuiya Data where you want to go. You will get a clear Beginner → Intermediate → Advanced sequence with practice and project milestones, so you always know what to learn next.</p></div><div class="bd-goal-grid">${Object.entries(GOALS).map(([k,g])=>`<button class="bd-goal-card" data-goal="${k}"><small>${esc(g.accent)}</small><strong>${esc(g.title)}</strong><span>${esc(g.tag)}</span></button>`).join('')}</div><div id="bdRoadmapHost"></div></div>`;
 document.body.appendChild(view);document.body.style.overflow='hidden';
 view.querySelector('[data-close]').onclick=closeCareer;
 view.querySelectorAll('.bd-goal-card').forEach(b=>b.onclick=()=>saveGoal(b.dataset.goal));
 renderGoal();
}
function closeCareer(){document.getElementById('bdCareerView')?.remove();document.body.style.overflow=''}
function addButtons(){
 const actions=document.querySelector('.lv2-actions');
 if(actions&&!actions.querySelector('[data-bd-career-open]')){
  const b=document.createElement('button');b.type='button';b.className='lv2-secondary bd-career-btn';b.dataset.bdCareerOpen='1';b.innerHTML='Career Goal &amp; Roadmap <b>◎</b>';b.onclick=openCareer;actions.appendChild(b);
 }
 const nav=document.querySelector('.navbar .nav-links');
 if(nav&&!nav.querySelector('[data-bd-career-open]')){
  const a=document.createElement('a');a.href='#career-roadmap';a.className='nav-link';a.dataset.bdCareerOpen='1';a.textContent='Career Roadmap';a.onclick=e=>{e.preventDefault();openCareer()};nav.appendChild(a);
 }
 updateButtons();
}
function syncGoalFromAuth(){
 const k=currentGoal();if(k){activeGoal=k;localStorage.setItem(STORE,k);renderGoal();updateButtons()}
}
function init(){
 styles();let n=0;(function wait(){addButtons();if(document.querySelector('.lv2-actions'))return;if(n++<120)setTimeout(wait,100)})();
 document.addEventListener('dataprep-enhancements-ready',()=>setTimeout(addButtons,40));
 let t=0;(function bind(){const c=window.dataPrepSupabase;if(c){c.auth.onAuthStateChange(()=>setTimeout(syncGoalFromAuth,80));syncGoalFromAuth();return}if(t++<120)setTimeout(bind,100)})();
}
window.openCareerRoadmap=openCareer;window.closeCareerRoadmap=closeCareer;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();