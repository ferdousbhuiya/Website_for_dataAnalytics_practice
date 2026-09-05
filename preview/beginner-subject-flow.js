(function(){
  const SUBJECTS=[
    {id:'excel',title:'Excel & Spreadsheets',short:'Excel',icon:'X',tone:'excel',description:'Formulas, pivot tables, lookups, data cleaning, and spreadsheet analysis.',topics:['excel']},
    {id:'sql',title:'SQL Fundamentals',short:'SQL',icon:'DB',tone:'sql',description:'Queries, filtering, joins, aggregations, and core SQL analysis.',topics:['sql']},
    {id:'statistics',title:'Statistics Essentials',short:'Statistics',icon:'▥',tone:'stats',description:'Descriptive statistics, probability, distributions, and inference.',topics:['statistics']},
    {id:'visualization',title:'Data Visualization',short:'Visualization',icon:'↗',tone:'viz',description:'Charts, dashboards, best practices, and storytelling with data.',topics:['visualization']},
    {id:'business',title:'Business Analytics',short:'Business',icon:'▣',tone:'business',description:'KPIs, metrics, business cases, communication, and decision making.',topics:['business','communication']},
    {id:'python',title:'Python Foundations',short:'Python',icon:'Py',tone:'python',description:'Python setup, data types, functions, loops, and analytics foundations.',topics:['python_setup']},
    {id:'etl',title:'ETL Foundations',short:'ETL',icon:'⚙',tone:'etl',description:'ETL concepts, Python, validation, file handling, and workflows.',topics:['etl1','etl2','etl3','etl4']}
  ];
  const SQL_MODULES=[
    ['SQL Basics',1,3],['Filtering & Aggregation',4,6],['HAVING, JOINs & Subqueries',7,9],['CTEs, Functions & Windows',10,12],
    ['Advanced CTEs & Views',13,15],['JSON, Partitioning & Plans',16,18],['Indexing & Security',19,21],['JOIN Review',22,22]
  ];
  let selected=null;
  const titleFor=k=>window.topicsData?.[k]?.title||window.topicRegistry?.topics?.[k]?.category||k;
  const lessonCount=k=>window.topicsData?.[k]?.lessons?.length||0;
  const questionCount=k=>window.topicsData?.[k]?.questions?.length||0;
  const topicDescription=k=>window.topicRegistry?.topics?.[k]?.description||'';
  const subjectFor=id=>SUBJECTS.find(s=>s.id===id);

  function sqlCheckpointState(){
    const pin=localStorage.getItem('dataAnalyticsActivePin')||'default';
    try{return JSON.parse(localStorage.getItem('dataPrepSqlCheckpoints_'+pin)||'{}')}catch(_){return{}}
  }
  function sqlPassedCount(){const s=sqlCheckpointState();let n=0;for(let i=0;i<8;i++){if(s[i]?.passed)n++;else break}return n}
  function totals(s){return {lessons:s.topics.reduce((n,k)=>n+lessonCount(k),0),questions:s.topics.reduce((n,k)=>n+questionCount(k),0)}}

  function render(){
    const grid=document.getElementById('topicsGrid'); if(!grid)return;
    let host=document.getElementById('beginnerSubjectBrowser');
    const level=document.getElementById('difficultyFilter')?.value||localStorage.getItem('dataPrepPreferredLevel')||'all';
    const viewAll=document.getElementById('viewAllTopicsBtn')?.closest('.view-all-row');
    if(level!=='Beginner'){
      if(host)host.remove();
      grid.classList.remove('subject-browser-hidden');
      if(viewAll)viewAll.classList.remove('subject-browser-hidden');
      return;
    }
    if(!host){host=document.createElement('div');host.id='beginnerSubjectBrowser';host.className='beginner-subject-browser';grid.insertAdjacentElement('beforebegin',host)}
    grid.classList.add('subject-browser-hidden');
    if(viewAll)viewAll.classList.add('subject-browser-hidden');
    const subject=subjectFor(selected);
    host.innerHTML=subject?subjectDetail(subject):subjectCatalog();
    bind(host);
  }

  function subjectCatalog(){
    return `<div class="subject-page-title"><span class="level-pill">Beginner</span><h3>Choose a subject</h3><p>Start with any subject below. Each subject contains sequential lessons, practice, and quizzes.</p></div>
      <div class="subject-grid">${SUBJECTS.map(s=>{const t=totals(s);return `<button class="subject-card subject-${s.tone}" data-subject="${s.id}" type="button"><span class="subject-icon">${s.icon}</span><span class="subject-copy"><strong>${s.title}</strong><small>${s.description}</small><em><b>${t.lessons} Lessons</b><i>•</i><b>${t.questions} Questions</b></em></span><span class="subject-arrow">›</span></button>`}).join('')}</div>
      <div class="subject-note">♧ <span>Each subject contains sequential lessons and quizzes. Your progress is saved automatically.</span></div>`;
  }

  function modulesFor(s){
    if(s.id==='sql') return SQL_MODULES.map((m,i)=>({name:m[0],from:m[1],to:m[2],topic:'sql',checkpoint:i+1}));
    if(s.topics.length>1) return s.topics.map((k,i)=>({name:titleFor(k),from:1,to:lessonCount(k),topic:k,sequence:i+1}));
    const key=s.topics[0],lessons=window.topicsData?.[key]?.lessons||[],mods=[];
    for(let i=0;i<lessons.length;i+=3){
      const from=i+1,to=Math.min(i+3,lessons.length),first=lessons[i]?.title||`Lessons ${from}–${to}`;
      mods.push({name:first,from,to,topic:key,sequence:mods.length+1});
    }
    return mods;
  }

  function moduleStatus(s,m,index){
    if(s.id!=='sql') return index===0?'Ready':'Available';
    const passed=sqlPassedCount();
    if(index<passed)return 'Completed';
    if(index===passed)return 'In Progress';
    return 'Locked';
  }

  function subjectDetail(s){
    const t=totals(s),mods=modulesFor(s),passed=s.id==='sql'?sqlPassedCount():0,pct=s.id==='sql'?Math.round(passed/8*100):0;
    return `<div class="subject-breadcrumb"><button data-back-subjects type="button">←</button><span>Beginner</span><b>›</b><strong>${s.title}</strong></div>
      <section class="subject-detail-card subject-${s.tone}">
        <div class="subject-detail-top"><span class="subject-icon large">${s.icon}</span><div class="subject-detail-copy"><div><h3>${s.title}</h3><span class="level-pill">Beginner</span></div><p>${s.description}</p><div class="subject-stats"><span>▱ ${t.lessons} Lessons</span><span>? ${t.questions} Questions</span>${s.id==='sql'?'<span>♢ 8 Checkpoints</span>':''}</div></div>${s.id==='sql'?`<div class="subject-progress"><div><small>Your Progress</small><strong>${pct}%</strong></div><div class="subject-progress-track"><i style="width:${pct}%"></i></div><span>${passed}/8 checkpoints passed</span></div>`:''}</div>
        <div class="subject-tabs"><button class="active" type="button">Overview</button><button data-start-first type="button">Lessons & Quizzes</button><button type="button" data-progress-jump>Progress</button></div>
        <div class="subject-overview"><div><h4>About this subject</h4><p>${subjectAbout(s)}</p></div><aside><h4>What you'll learn</h4>${learningList(s)}</aside></div>
        <div class="subject-modules"><h4>Modules in this subject</h4>${mods.map((m,i)=>{const status=moduleStatus(s,m,i);return `<button class="module-row ${status.toLowerCase().replace(' ','-')}" data-module-topic="${m.topic}" data-module-index="${i}" type="button"><span class="module-number">${i+1}</span><strong>${m.name}</strong><span>Lessons ${m.from}${m.to!==m.from?'–'+m.to:''}</span><em>${status}${status==='Completed'?' ✓':status==='Locked'?' ♧':''}</em><b>›</b></button>`}).join('')}</div>
      </section>`;
  }

  function subjectAbout(s){
    const map={excel:'Build practical spreadsheet skills from formulas and cleaning through reporting and analysis.',sql:'Learn SQL from the ground up. Build strong fundamentals with hands-on examples and checkpoint quizzes.',statistics:'Build statistical intuition and learn how to summarize, interpret, and reason with data.',visualization:'Learn to choose, design, and explain charts that communicate data clearly.',business:'Connect analytics to business questions, KPIs, stakeholders, and decisions.',python:'Set up Python correctly and learn the programming foundations needed for data analysis.',etl:'Learn how data moves from source to destination through extraction, validation, transformation, and loading.'};
    return map[s.id]||s.description;
  }
  function learningList(s){
    const map={excel:['Use core spreadsheet formulas','Clean and organize data','Work with lookups and pivots','Build clear reports'],sql:['Write efficient SQL queries','Work with tables and joins','Aggregate and analyze data','Use subqueries and CTEs','Solve real-world problems'],statistics:['Summarize distributions','Reason with probability','Understand variation','Interpret statistical results'],visualization:['Choose the right chart','Design readable visuals','Build dashboards','Tell a story with data'],business:['Define useful KPIs','Translate questions into analysis','Communicate findings','Support decisions with evidence'],python:['Set up a Python environment','Understand core syntax','Use data structures','Prepare for pandas analysis'],etl:['Understand ETL workflows','Validate incoming data','Handle files safely','Build modular pipelines']};
    return `<ul>${(map[s.id]||[]).map(x=>`<li>✓ ${x}</li>`).join('')}</ul>`;
  }

  function bind(host){
    host.querySelectorAll('[data-subject]').forEach(el=>el.addEventListener('click',()=>{selected=el.dataset.subject;localStorage.setItem('dataPrepBeginnerSubject',selected);render();host.scrollIntoView({behavior:'smooth',block:'start'})}));
    host.querySelector('[data-back-subjects]')?.addEventListener('click',()=>{selected=null;localStorage.removeItem('dataPrepBeginnerSubject');render()});
    host.querySelector('[data-start-first]')?.addEventListener('click',()=>{const s=subjectFor(selected);if(s)openSubjectTopic(s.topics[0])});
    host.querySelector('[data-progress-jump]')?.addEventListener('click',()=>document.getElementById('progress')?.scrollIntoView({behavior:'smooth'}));
    host.querySelectorAll('[data-module-topic]').forEach(row=>row.addEventListener('click',()=>{
      if(row.classList.contains('locked'))return;
      openSubjectTopic(row.dataset.moduleTopic);
    }));
  }

  function openSubjectTopic(key){
    const grid=document.getElementById('topicsGrid');
    const card=[...grid.querySelectorAll('.topic-card')].find(c=>c.dataset.topicKey===key);
    if(card){card.click();return;}
    try{window.openTopic?.(key)}catch(_){}
  }

  function install(){
    selected=localStorage.getItem('dataPrepBeginnerSubject')||null;
    const style=document.createElement('style');style.id='beginnerSubjectStyles';style.textContent=`
      #topicsGrid.subject-browser-hidden,.subject-browser-hidden{display:none!important}.beginner-subject-browser{margin:.25rem 0 1rem}.subject-page-title{margin:.1rem 0 1rem}.level-pill{display:inline-flex;background:#e8f4ea;color:#166534;border:1px solid #cfe5d4;border-radius:999px;padding:.2rem .5rem;font-size:.58rem;font-weight:800}.subject-page-title h3{font-size:1.15rem;color:#17231d;margin:.35rem 0 .18rem}.subject-page-title p{font-size:.7rem;color:#526057;margin:0}.subject-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.75rem}.subject-card{position:relative;min-height:172px;text-align:left;background:#fff;border:1px solid #ddd8d0;border-radius:10px;padding:.9rem;cursor:pointer;display:grid;grid-template-columns:46px 1fr 14px;gap:.7rem;box-shadow:0 4px 13px rgba(32,39,34,.04);transition:.15s}.subject-card:hover{transform:translateY(-2px);border-color:#b8c7bd;box-shadow:0 8px 20px rgba(32,39,34,.08)}.subject-icon{width:44px;height:44px;border-radius:9px;display:grid;place-items:center;font-size:.72rem;font-weight:900;background:#eaf4ee;color:#0f7a43}.subject-excel .subject-icon{background:#e6f5e9;color:#087a3c}.subject-sql .subject-icon{background:#e9efff;color:#315ee8}.subject-stats .subject-icon{background:#fff0e5;color:#e55b16}.subject-viz .subject-icon{background:#f1eafd;color:#7444c8}.subject-business .subject-icon{background:#e8f6f6;color:#0f8c8c}.subject-python .subject-icon{background:#fff5d8;color:#b87900}.subject-etl .subject-icon{background:#fde9ee;color:#d72b57}.subject-copy{display:flex;flex-direction:column}.subject-copy strong{font-size:.78rem;color:#17231d}.subject-copy small{font-size:.62rem;line-height:1.5;color:#36443b;margin:.3rem 0}.subject-copy em{display:flex;gap:.42rem;margin-top:auto;font-style:normal;font-size:.56rem}.subject-copy em b{color:#0f7a43}.subject-copy em i{font-style:normal;color:#9da49f}.subject-arrow{align-self:end;color:#28332c;font-size:1.15rem}.subject-note{display:flex;gap:.45rem;align-items:center;margin-top:.85rem;padding:.62rem .75rem;border-radius:8px;background:#eef8ef;color:#246b38;font-size:.62rem}.subject-breadcrumb{display:flex;align-items:center;gap:.5rem;margin-bottom:.7rem;color:#16713d;font-size:.64rem;font-weight:700}.subject-breadcrumb button{width:30px;height:30px;border:1px solid #ded8cf;background:#fff;border-radius:8px;cursor:pointer}.subject-detail-card{background:#fff;border:1px solid #ddd8d0;border-radius:11px;overflow:hidden}.subject-detail-top{display:grid;grid-template-columns:58px 1fr 190px;gap:.9rem;align-items:center;padding:1rem 1.1rem}.subject-icon.large{width:52px;height:52px;font-size:.8rem}.subject-detail-copy>div{display:flex;align-items:center;gap:.5rem}.subject-detail-copy h3{font-size:1.05rem;margin:0;color:#17231d}.subject-detail-copy p{font-size:.66rem;color:#48564d;margin:.25rem 0}.subject-stats{display:flex;gap:.85rem;flex-wrap:wrap;font-size:.58rem;color:#536158}.subject-progress>div:first-child{display:flex;justify-content:space-between;align-items:end}.subject-progress small{font-size:.55rem;color:#606b64}.subject-progress strong{font-size:1rem;color:#168442}.subject-progress-track{height:7px;background:#e8edf8;border-radius:999px;margin:.4rem 0;overflow:hidden}.subject-progress-track i{display:block;height:100%;background:#14934d;border-radius:999px}.subject-progress>span{font-size:.56rem;color:#5d6760}.subject-tabs{display:flex;border-bottom:1px solid #e6e0d8;padding:0 1rem}.subject-tabs button{border:0;background:transparent;padding:.65rem 1rem;font-size:.62rem;font-weight:700;color:#29352e;cursor:pointer;border-bottom:2px solid transparent}.subject-tabs button.active{color:#087a3c;border-color:#14934d}.subject-overview{display:grid;grid-template-columns:1.3fr .75fr;gap:1rem;padding:1rem 1.1rem}.subject-overview h4,.subject-modules h4{font-size:.68rem;color:#18221c;margin:0 0 .4rem}.subject-overview p{font-size:.62rem;line-height:1.55;color:#3d4941;margin:0}.subject-overview aside{background:#f2f9f2;border:1px solid #dcebdc;border-radius:8px;padding:.7rem}.subject-overview ul{list-style:none;padding:0;margin:0}.subject-overview li{font-size:.59rem;color:#27653b;margin:.3rem 0}.subject-modules{padding:0 1.1rem 1rem}.module-row{width:100%;display:grid;grid-template-columns:32px 1.2fr .8fr .7fr 16px;align-items:center;gap:.55rem;border:1px solid #ebe6de;border-bottom:0;background:#fff;padding:.56rem .65rem;text-align:left;cursor:pointer}.module-row:first-of-type{border-radius:8px 8px 0 0}.module-row:last-child{border-bottom:1px solid #ebe6de;border-radius:0 0 8px 8px}.module-row:hover:not(.locked){background:#fbfdfb}.module-number{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#eef3ff;color:#315ee8;font-size:.56rem;font-weight:800}.module-row strong{font-size:.61rem;color:#202922}.module-row>span:nth-of-type(2){font-size:.56rem;color:#566159}.module-row em{font-size:.56rem;font-style:normal;text-align:right;color:#6a746d}.module-row.completed em{color:#14934d}.module-row.in-progress em{color:#2366d9}.module-row.locked{cursor:not-allowed;background:#faf9f7}.module-row.locked strong,.module-row.locked>span:nth-of-type(2),.module-row.locked em{color:#a1a59f}@media(max-width:1000px){.subject-grid{grid-template-columns:repeat(2,1fr)}.subject-detail-top{grid-template-columns:52px 1fr}.subject-progress{grid-column:1/-1}.subject-overview{grid-template-columns:1fr}}@media(max-width:600px){.subject-grid{grid-template-columns:1fr}.subject-card{min-height:150px}.subject-detail-top{padding:.8rem;grid-template-columns:48px 1fr}.subject-tabs{overflow-x:auto;padding:0}.subject-tabs button{white-space:nowrap}.subject-overview{padding:.8rem}.subject-modules{padding:0 .8rem .8rem}.module-row{grid-template-columns:28px 1fr auto}.module-row>span:nth-of-type(2){grid-column:2}.module-row em{grid-column:2;text-align:left}.module-row>b{grid-column:3;grid-row:1/3}}
    `;document.head.appendChild(style);
    const select=document.getElementById('difficultyFilter');select?.addEventListener('change',()=>setTimeout(render,20));
    const grid=document.getElementById('topicsGrid');if(grid)new MutationObserver(()=>setTimeout(render,10)).observe(grid,{childList:true});
    document.querySelectorAll('.path-card').forEach(c=>c.addEventListener('click',()=>setTimeout(()=>{selected=null;localStorage.removeItem('dataPrepBeginnerSubject');render()},80)));
    setTimeout(render,300);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();