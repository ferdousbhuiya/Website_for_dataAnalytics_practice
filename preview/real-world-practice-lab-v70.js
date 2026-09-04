(function(){
'use strict';
const STORE='bhuiyaDataPracticeLabV1';
const PACKS={
 commerce:{
  title:'Retail & E-commerce Performance',
  file:'bhuiya_retail_orders.csv',
  description:'A realistic practice dataset for sales, customers, products, regions, discounts and profit.',
  columns:['order_id','order_date','customer_id','region','category','product','quantity','unit_price','discount_pct','revenue','cost','profit','channel'],
  rows:[
   ['O1001','2026-01-04','C017','South','Technology','Wireless Mouse',2,24.99,0,49.98,28,21.98,'Online'],
   ['O1002','2026-01-05','C004','East','Office Supplies','Notebook Pack',5,8.5,10,38.25,19,19.25,'Store'],
   ['O1003','2026-01-07','C021','West','Furniture','Desk Chair',1,189,15,160.65,118,42.65,'Online'],
   ['O1004','2026-01-09','C009','South','Technology','USB-C Hub',3,39.5,5,112.58,69,43.58,'Online'],
   ['O1005','2026-01-11','C012','North','Furniture','Standing Desk',1,399,0,399,285,114,'Store'],
   ['O1006','2026-01-13','C017','South','Office Supplies','Printer Paper',8,6.25,0,50,31,19,'Online'],
   ['O1007','2026-01-16','C031','East','Technology','Webcam',2,72,20,115.2,82,33.2,'Online'],
   ['O1008','2026-01-20','C006','West','Furniture','Bookshelf',1,145,5,137.75,96,41.75,'Store'],
   ['O1009','2026-02-02','C027','North','Technology','Keyboard',2,55,10,99,64,35,'Online'],
   ['O1010','2026-02-05','C004','East','Office Supplies','Desk Organizer',3,14.99,0,44.97,22,22.97,'Store'],
   ['O1011','2026-02-08','C018','South','Furniture','Monitor Stand',2,46,15,78.2,51,27.2,'Online'],
   ['O1012','2026-02-14','C013','West','Technology','27in Monitor',1,249,5,236.55,177,59.55,'Online'],
   ['O1013','2026-02-18','C025','North','Office Supplies','Label Set',6,5.5,0,33,12,21,'Store'],
   ['O1014','2026-02-22','C009','South','Technology','SSD 1TB',2,94,10,169.2,122,47.2,'Online'],
   ['O1015','2026-03-01','C030','East','Furniture','Task Lamp',3,32,5,91.2,54,37.2,'Store'],
   ['O1016','2026-03-05','C006','West','Office Supplies','Pen Set',10,4.2,0,42,17,25,'Online'],
   ['O1017','2026-03-11','C019','North','Technology','Laptop Stand',2,48,0,96,58,38,'Online'],
   ['O1018','2026-03-18','C017','South','Furniture','Filing Cabinet',1,155,20,124,101,23,'Store']
  ]
 },
 customers:{
  title:'Customer Retention & Product Analytics',
  file:'bhuiya_customer_activity.csv',
  description:'A realistic customer activity dataset for funnels, cohorts, retention, segmentation and experimentation.',
  columns:['customer_id','signup_date','acquisition_channel','plan','country','sessions_30d','orders_30d','revenue_30d','support_tickets','last_active_date','churned','experiment_group'],
  rows:[
   ['C001','2026-01-02','Organic','Basic','US',8,1,39,0,'2026-03-27',0,'A'],
   ['C002','2026-01-03','Paid Search','Pro','US',19,4,238,1,'2026-03-30',0,'B'],
   ['C003','2026-01-05','Referral','Basic','CA',3,0,0,2,'2026-01-19',1,'A'],
   ['C004','2026-01-08','Social','Pro','UK',14,3,177,0,'2026-03-28',0,'B'],
   ['C005','2026-01-11','Organic','Basic','US',5,1,42,1,'2026-02-18',1,'A'],
   ['C006','2026-01-14','Paid Search','Enterprise','US',27,8,920,2,'2026-03-31',0,'B'],
   ['C007','2026-01-20','Referral','Pro','AU',11,2,118,0,'2026-03-26',0,'A'],
   ['C008','2026-02-01','Social','Basic','US',2,0,0,1,'2026-02-08',1,'B'],
   ['C009','2026-02-04','Organic','Pro','CA',16,3,185,0,'2026-03-30',0,'A'],
   ['C010','2026-02-09','Paid Search','Basic','US',9,1,45,0,'2026-03-24',0,'B'],
   ['C011','2026-02-12','Referral','Enterprise','UK',23,6,720,1,'2026-03-31',0,'A'],
   ['C012','2026-02-17','Social','Basic','US',4,0,0,3,'2026-03-01',1,'B'],
   ['C013','2026-03-01','Organic','Pro','US',13,2,126,0,'2026-03-29',0,'A'],
   ['C014','2026-03-03','Paid Search','Pro','CA',18,4,244,1,'2026-03-31',0,'B'],
   ['C015','2026-03-05','Referral','Basic','US',6,1,39,0,'2026-03-22',0,'A'],
   ['C016','2026-03-10','Social','Basic','AU',1,0,0,1,'2026-03-12',1,'B']
  ]
 },
 operations:{
  title:'Operations & Data Pipeline Quality',
  file:'bhuiya_pipeline_events.csv',
  description:'A realistic pipeline operations dataset for ETL, reliability, cloud and data-engineering practice.',
  columns:['run_id','pipeline','run_date','source','rows_received','rows_loaded','invalid_rows','duration_min','status','retry_count','cost_usd','sla_min'],
  rows:[
   ['R001','orders_daily','2026-03-01','PostgreSQL',48210,48192,18,12.4,'Success',0,3.12,20],
   ['R002','customers_daily','2026-03-01','CRM API',12340,12340,0,8.1,'Success',0,1.94,15],
   ['R003','clickstream_hourly','2026-03-01','S3',185400,184990,410,27.5,'Warning',0,5.8,25],
   ['R004','finance_daily','2026-03-01','SFTP',8420,0,8420,31.2,'Failed',2,4.65,20],
   ['R005','orders_daily','2026-03-02','PostgreSQL',50118,50100,18,13.1,'Success',0,3.26,20],
   ['R006','customers_daily','2026-03-02','CRM API',12555,12555,0,9.8,'Success',0,2.05,15],
   ['R007','clickstream_hourly','2026-03-02','S3',192220,191010,1210,34.8,'Warning',1,7.4,25],
   ['R008','finance_daily','2026-03-02','SFTP',8675,8675,0,17.3,'Success',1,3.88,20],
   ['R009','orders_daily','2026-03-03','PostgreSQL',49301,49292,9,11.9,'Success',0,3.01,20],
   ['R010','customers_daily','2026-03-03','CRM API',12788,12750,38,16.7,'Warning',0,2.66,15],
   ['R011','clickstream_hourly','2026-03-03','S3',201440,201420,20,22.1,'Success',0,5.22,25],
   ['R012','finance_daily','2026-03-03','SFTP',8911,8911,0,16.4,'Success',0,3.61,20],
   ['R013','orders_daily','2026-03-04','PostgreSQL',51490,51480,10,21.3,'Warning',0,4.1,20],
   ['R014','customers_daily','2026-03-04','CRM API',12830,12830,0,8.9,'Success',0,1.98,15],
   ['R015','clickstream_hourly','2026-03-04','S3',206310,0,206310,41.6,'Failed',3,9.74,25]
  ]
 },
 experiments:{
  title:'Experiment & Conversion Analysis',
  file:'bhuiya_ab_test.csv',
  description:'A realistic experiment dataset for statistics, A/B testing, visualization and data-science practice.',
  columns:['user_id','variant','device','country','sessions','converted','order_value','time_on_site_sec','return_7d'],
  rows:[
   ['U001','A','Mobile','US',2,0,0,185,0],['U002','B','Desktop','US',3,1,79,412,1],
   ['U003','A','Desktop','CA',4,1,55,366,1],['U004','B','Mobile','US',1,0,0,102,0],
   ['U005','A','Mobile','UK',3,0,0,245,1],['U006','B','Desktop','US',5,1,129,522,1],
   ['U007','A','Tablet','AU',2,0,0,177,0],['U008','B','Mobile','CA',4,1,68,351,1],
   ['U009','A','Desktop','US',5,1,95,488,1],['U010','B','Desktop','UK',2,1,61,309,0],
   ['U011','A','Mobile','US',2,0,0,198,0],['U012','B','Mobile','US',3,1,49,282,1],
   ['U013','A','Desktop','CA',4,0,0,430,1],['U014','B','Desktop','US',6,1,149,560,1],
   ['U015','A','Mobile','AU',1,0,0,88,0],['U016','B','Mobile','US',4,1,72,330,1],
   ['U017','A','Desktop','UK',3,1,83,375,1],['U018','B','Tablet','CA',2,0,0,169,0],
   ['U019','A','Mobile','US',3,0,0,251,1],['U020','B','Desktop','US',5,1,118,499,1]
  ]
 }
};

const SUBJECTS={
 excel:{pack:'commerce',title:'Excel Practice Lab',workflow:['Import the CSV and convert it to a structured table.','Check data types, blanks and duplicate order IDs.','Create calculated fields for margin and discounted revenue.','Build a PivotTable by region and category.','Create a one-page management summary with 3 KPIs and 2 charts.'],challenges:['Beginner: calculate total revenue, average order value and total profit.','Intermediate: compare category performance by region and channel.','Project: build an interactive sales dashboard and write three recommendations.']},
 sql:{pack:'commerce',title:'SQL Practice Lab',workflow:['Create an orders table using the dataset columns.','Validate row counts and nulls before analysis.','Start with SELECT, WHERE and ORDER BY.','Move to GROUP BY, JOIN-style dimensions and CTE logic.','Finish with a business summary query that can feed a dashboard.'],challenges:['Beginner: return the five highest-revenue orders and filter orders with discounts.','Intermediate: calculate revenue and profit by month, category and region.','Advanced: rank products inside each region and calculate month-over-month revenue change.']},
 statistics:{pack:'experiments',title:'Statistics Practice Lab',workflow:['Define the business question and outcome metric.','Inspect distributions and missing/zero values.','Calculate descriptive statistics for each variant.','Estimate conversion-rate difference and uncertainty.','Explain practical significance separately from statistical significance.'],challenges:['Beginner: compare mean time-on-site and conversion rates for A vs B.','Intermediate: calculate confidence intervals and discuss sampling variability.','Project: write an experiment recommendation including assumptions, risks and next steps.']},
 visualization:{pack:'commerce',title:'Visualization Practice Lab',workflow:['Identify the audience and the decision they need to make.','Choose KPIs before choosing charts.','Use trend, comparison and composition charts only where appropriate.','Reduce clutter and label key findings directly.','Write a short narrative that explains what changed, why it matters and what to do.'],challenges:['Beginner: build monthly revenue and category-profit charts.','Intermediate: design a dashboard for a regional sales manager.','Project: create a portfolio dashboard with a clear executive takeaway and documented design choices.']},
 business:{pack:'commerce',title:'Business Analytics Practice Lab',workflow:['Translate the scenario into a measurable business question.','Define revenue, profit, margin and average order value precisely.','Segment performance by region, product category and channel.','Separate symptoms from possible causes.','Recommend an action and specify how success would be measured.'],challenges:['Beginner: identify the strongest and weakest business segments.','Intermediate: explain whether discounts are helping revenue at the expense of profit.','Project: prepare a one-page decision memo with evidence, recommendation and KPI follow-up plan.']},
 python:{pack:'customers',title:'Python & Pandas Practice Lab',workflow:['Load the CSV with pandas and inspect shape, columns and dtypes.','Clean booleans/numerics and check duplicates or missing values.','Create useful derived fields such as revenue_per_session.','Group and visualize retention, plan and channel patterns.','Write reusable functions for at least one repeated analysis task.'],challenges:['Beginner: load, inspect, filter and summarize the dataset.','Intermediate: compare churn and revenue across plans and acquisition channels.','Project: create an EDA notebook with cleaning, visuals, findings and recommendations.']},
 product:{pack:'customers',title:'Product Analytics Practice Lab',workflow:['Define activation, conversion, retention and churn in plain language.','Build a simple acquisition-channel funnel.','Create signup cohorts and compare later activity.','Segment by plan and experiment group.','Recommend one product change and one metric to monitor.'],challenges:['Beginner: calculate churn rate and average revenue by plan.','Intermediate: compare retention by acquisition channel and cohort.','Project: create a product-metrics brief with funnel, cohort and customer-segment findings.']},
 experiment:{pack:'experiments',title:'Experimentation Practice Lab',workflow:['Write the hypothesis before looking at the result.','Define primary metric, guardrail metric and unit of analysis.','Check assignment balance and obvious data-quality issues.','Compare outcomes between A and B with uncertainty.','Decide whether to ship, iterate or continue testing.'],challenges:['Beginner: compute conversion rates for both variants.','Intermediate: analyze results by device without over-interpreting small segments.','Project: produce an experiment readout with hypothesis, method, results, limitations and recommendation.']},
 etl:{pack:'operations',title:'ETL & Data Engineering Practice Lab',workflow:['Profile the source and define expected schema and row-count rules.','Design extraction, transformation and load stages.','Add data-quality checks for invalid rows and reconciliation.','Monitor duration, failures, retries, cost and SLA breaches.','Document lineage, failure handling and recovery steps.'],challenges:['Beginner: identify failed and SLA-breaching runs.','Intermediate: calculate load success rate and invalid-row rate by pipeline.','Project: design an improved pipeline with validation, retry policy, monitoring and incident response.']},
 ml:{pack:'customers',title:'Machine Learning Practice Lab',workflow:['Define the prediction target and business decision.','Prevent leakage before splitting data.','Prepare categorical and numerical features.','Build a simple baseline before a more complex model.','Evaluate with business-relevant metrics and explain limitations.'],challenges:['Beginner: identify candidate features for predicting churn.','Intermediate: compare a simple baseline with a classification model.','Project: document train/test strategy, metrics, feature importance, risks and how predictions would be used.']},
 generic:{pack:'commerce',title:'Applied Practice Lab',workflow:['Read the scenario and define one clear analytical question.','Inspect the dataset before calculating anything.','Apply the concepts from this topic to answer the question.','Validate your result using a second method or reasonableness check.','Communicate the finding in plain language with one recommended next step.'],challenges:['Foundation: reproduce one concept from the lesson using the dataset.','Applied: combine at least two concepts to answer a business question.','Project: create a small portfolio artifact and explain your process, assumptions and conclusion.']}
};

function topicKey(){
 const title=String(document.getElementById('topicTitle')?.textContent||'').trim();
 if(!title||!window.topicsData)return '';
 for(const [k,v] of Object.entries(window.topicsData)){if(String(v?.title||'').trim()===title)return k}
 return '';
}
function subjectFor(key){
 key=String(key||'').toLowerCase();
 if(key.includes('excel'))return'excel';
 if(key.includes('sql'))return'sql';
 if(key.includes('statistic'))return'statistics';
 if(key.includes('visual')||key.includes('viz'))return'visualization';
 if(key.includes('business')||key.includes('communication'))return'business';
 if(key.includes('python')||key.includes('pandas')||key.includes('oop'))return'python';
 if(key.includes('product'))return'product';
 if(key.includes('experiment')||key.includes('ab_test'))return'experiment';
 if(key.includes('etl')||key.includes('data_engineering')||key.includes('big_data')||key.includes('cloud_data')||key.includes('cloud_project'))return'etl';
 if(key.includes('machine_learning')||key.includes('deep_learning')||key.includes('ml_project')||key.includes('statistical_modeling'))return'ml';
 return'generic';
}
function stageFor(key){
 if(/(_advanced|deep_learning|data_engineering|big_data|cloud_data|etl7|_project$)/.test(key))return'Advanced';
 if(/(_intermediate|python$|experiment_design|ab_tests|product_analytics|etl5|etl6|etl8|etl9|etl10|machine_learning|statistical_modeling|pandas_project|sql_project|viz_project|product_project)/.test(key))return'Intermediate';
 return'Beginner';
}
function csv(pack){
 const esc=v=>{const s=String(v??'');return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
 return [pack.columns,...pack.rows].map(r=>r.map(esc).join(',')).join('\n');
}
function download(pack){
 const blob=new Blob([csv(pack)],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=pack.file;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
function state(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(_){return{}}}
function saveState(x){localStorage.setItem(STORE,JSON.stringify(x))}
async function markApplied(key){
 const s=state();s[key]={...(s[key]||{}),completed:true,completedAt:new Date().toISOString()};saveState(s);render();
 const c=window.dataPrepSupabase,u=window.dataPrepCloud?.getUser?.();if(!c||!u)return;
 try{
  await c.from('learning_progress').upsert({user_id:u.id,stage:stageFor(key),subject_key:key,module_key:'practice_lab',started:true,verified:false,applied:true,started_at:new Date().toISOString(),applied_at:new Date().toISOString(),updated_at:new Date().toISOString()},{onConflict:'user_id,stage,subject_key,module_key'});
  document.dispatchEvent(new CustomEvent('dataprep-progress-synced',{detail:{direction:'practice-lab'}}));
 }catch(e){console.warn('Practice lab progress save failed',e)}
}
function careerNote(){
 const map={analyst:'Data Analyst',bi:'Business Intelligence Analyst',scientist:'Data Scientist',engineer:'Data Engineer',explore:'Exploring Data Careers'};
 const u=window.dataPrepCloud?.getUser?.();const k=u?.user_metadata?.career_goal||localStorage.getItem('bhuiyaDataCareerGoalV1');return map[k]?'<span class="bd-pl-career">Career target: '+map[k]+'</span>':'';
}
function styles(){
 if(document.getElementById('bdPracticeLabStyles'))return;const s=document.createElement('style');s.id='bdPracticeLabStyles';s.textContent=`
 .bd-practice-tab{border-color:#42df8a!important;color:#dffff0!important}.bd-practice-tab.active{background:#133c31!important;color:#79f2ad!important}
 .bd-pl-wrap{display:grid;gap:14px;padding:8px 0 24px}.bd-pl-hero{border:1px solid #28506a;background:linear-gradient(145deg,#0b2030,#091725);border-radius:15px;padding:17px}
 .bd-pl-kicker{font-size:9px;color:#42df8a;font-weight:900;letter-spacing:.1em}.bd-pl-hero h3{font-size:21px;margin:5px 0 6px;color:#edf5fb}.bd-pl-hero p{margin:0;color:#9fb3c0;font-size:11px;line-height:1.55;max-width:850px}
 .bd-pl-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:11px}.bd-pl-meta span{font-size:9px;padding:5px 8px;border-radius:99px;background:#102b3b;border:1px solid #284b61;color:#b6cad6}.bd-pl-career{border-color:#5d4bc4!important;color:#c8bcff!important}
 .bd-pl-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.bd-pl-card{border:1px solid #213c56;background:#0a1a28;border-radius:13px;padding:14px;color:#edf5fb}.bd-pl-card h4{margin:0 0 9px;font-size:14px}.bd-pl-card p,.bd-pl-card li{font-size:10px;color:#9eb2c0;line-height:1.55}.bd-pl-card ol,.bd-pl-card ul{margin:0;padding-left:20px}.bd-pl-card li+li{margin-top:5px}
 .bd-pl-dataset{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center}.bd-pl-download,.bd-pl-complete{border:1px solid #36d880;background:#36d880;color:#052315;border-radius:9px;padding:9px 12px;font-weight:900;cursor:pointer}.bd-pl-download:hover,.bd-pl-complete:hover{filter:brightness(1.08)}
 .bd-pl-columns{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px!important;color:#75d9ff!important;word-break:break-word}.bd-pl-project{border-color:#5d4bc4;background:rgba(108,76,255,.08)}.bd-pl-project strong{color:#cabfff}
 .bd-pl-complete.done{background:#123a34;color:#72f0ab;border-color:#2f8d64}.bd-pl-tip{font-size:9px;color:#7894a6;margin-top:8px}
 @media(max-width:760px){.bd-pl-grid{grid-template-columns:1fr}.bd-pl-dataset{grid-template-columns:1fr}.bd-pl-download{width:100%}}
 `;document.head.appendChild(s)
}
function ensureTab(){
 const header=document.querySelector('#learningView .learning-tabs');if(!header)return;
 if(!header.querySelector('[data-practice-lab]')){
  const b=document.createElement('button');b.className='tab-button bd-practice-tab';b.type='button';b.dataset.practiceLab='1';b.textContent='Practice Lab';b.onclick=()=>showLab();header.appendChild(b);
 }
 let tab=document.getElementById('practiceLabTab');if(!tab){tab=document.createElement('div');tab.id='practiceLabTab';tab.className='tab-content';document.querySelector('#learningView .learning-container')?.appendChild(tab)}
}
function showLab(){
 ensureTab();document.querySelectorAll('#learningView .tab-content').forEach(x=>x.classList.remove('active'));document.querySelectorAll('#learningView .tab-button').forEach(x=>x.classList.remove('active'));document.getElementById('practiceLabTab')?.classList.add('active');document.querySelector('[data-practice-lab]')?.classList.add('active');render();
}
function render(){
 const host=document.getElementById('practiceLabTab');if(!host)return;const key=topicKey();if(!key){host.innerHTML='';return}
 const sub=SUBJECTS[subjectFor(key)]||SUBJECTS.generic,pack=PACKS[sub.pack],done=!!state()[key]?.completed;
 host.innerHTML=`<div class="bd-pl-wrap"><section class="bd-pl-hero"><div class="bd-pl-kicker">REALISTIC DATA PRACTICE</div><h3>${sub.title}</h3><p>Use a scenario-based dataset to apply this topic beyond reading and quizzes. Work through the workflow, complete at least one challenge, then create the project deliverable.</p><div class="bd-pl-meta"><span>${stageFor(key)} level</span><span>${pack.rows.length} practice records</span><span>${pack.columns.length} fields</span>${careerNote()}</div></section><section class="bd-pl-card bd-pl-dataset"><div><h4>Dataset: ${pack.title}</h4><p>${pack.description}</p><p class="bd-pl-columns">${pack.columns.join(' · ')}</p></div><button class="bd-pl-download" data-download>Download CSV</button></section><div class="bd-pl-grid"><section class="bd-pl-card"><h4>Step-by-step workflow</h4><ol>${sub.workflow.map(x=>'<li>'+x+'</li>').join('')}</ol></section><section class="bd-pl-card"><h4>Practice challenges</h4><ul>${sub.challenges.map(x=>'<li>'+x+'</li>').join('')}</ul></section></div><section class="bd-pl-card bd-pl-project"><h4>Portfolio-style deliverable</h4><p><strong>Do not stop at the calculation.</strong> Save your query, workbook, notebook, dashboard or pipeline design and add a short README explaining the question, method, checks, findings, limitations and recommendation. This turns practice into evidence you can discuss in an interview.</p><button class="bd-pl-complete ${done?'done':''}" data-complete>${done?'✓ Practice milestone completed':'Mark practice milestone complete'}</button><div class="bd-pl-tip">Completion is saved to this browser and, when signed in, recorded as applied practice in your Bhuiya Data account.</div></section></div>`;
 host.querySelector('[data-download]').onclick=()=>download(pack);host.querySelector('[data-complete]').onclick=()=>markApplied(key);
}
function watch(){
 ensureTab();
 const title=document.getElementById('topicTitle');if(title)new MutationObserver(()=>{ensureTab();render()}).observe(title,{childList:true,characterData:true,subtree:true});
 document.addEventListener('click',e=>{if(e.target.closest?.('#learningView'))setTimeout(()=>{ensureTab();if(document.getElementById('practiceLabTab')?.classList.contains('active'))render()},100)},true);
}
function init(){styles();let n=0;(function wait(){if(document.querySelector('#learningView .learning-tabs')){watch();return}if(n++<120)setTimeout(wait,100)})()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();