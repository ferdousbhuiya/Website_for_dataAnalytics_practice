(function(){
  const SUBJECTS=[
    {id:'excel',title:'Excel',icon:'▦',description:'Spreadsheets, formulas, cleaning, lookups, pivot tables and reporting.',topics:['excel']},
    {id:'sql',title:'SQL',icon:'▤',description:'Query data from foundations through joins, CTEs, windows and advanced SQL.',topics:['sql']},
    {id:'statistics',title:'Statistics',icon:'∑',description:'Descriptive statistics, probability, distributions and inference foundations.',topics:['statistics']},
    {id:'visualization',title:'Data Visualization',icon:'▥',description:'Charts, dashboards, visual reasoning and communicating insights.',topics:['visualization']},
    {id:'business',title:'Business Analytics',icon:'◎',description:'KPIs, business questions, analytical thinking and stakeholder communication.',topics:['business','communication']},
    {id:'python',title:'Python Foundations',icon:'</>',description:'Set up Python and build the programming foundation needed for analytics.',topics:['python_setup']},
    {id:'etl',title:'ETL Foundations',icon:'⇄',description:'A sequential introduction to ETL concepts, Python, validation and file handling.',topics:['etl1','etl2','etl3','etl4']}
  ];
  let selected=null;
  const titleFor=k=>window.topicsData?.[k]?.title||window.topicRegistry?.topics?.[k]?.category||k;
  const lessonCount=k=>window.topicsData?.[k]?.lessons?.length||0;
  const questionCount=k=>window.topicsData?.[k]?.questions?.length||0;
  function cardKey(card){return card?.dataset?.topicKey||''}
  function render(){
    const grid=document.getElementById('topicsGrid'); if(!grid)return;
    let host=document.getElementById('beginnerSubjectBrowser');
    const level=(document.getElementById('difficultyFilter')?.value||localStorage.getItem('dataPrepPreferredLevel')||'all');
    if(level!=='Beginner'){
      if(host)host.remove();
      grid.style.display='';
      document.getElementById('viewAllTopicsBtn')?.closest('.view-all-row')?.style.removeProperty('display');
      return;
    }
    if(!host){host=document.createElement('div');host.id='beginnerSubjectBrowser';host.className='beginner-subject-browser';grid.insertAdjacentElement('beforebegin',host)}
    grid.style.display='none';
    const viewAll=document.getElementById('viewAllTopicsBtn')?.closest('.view-all-row');if(viewAll)viewAll.style.display='none';
    const subject=SUBJECTS.find(s=>s.id===selected);
    host.innerHTML=`<div class="subject-browser-head"><div><span>Beginner curriculum</span><h3>${subject?'Choose a topic inside '+subject.title:'Choose a subject'}</h3><p>${subject?'Open a topic to study its lessons sequentially.':'Start with a subject. Each subject contains its topics/modules, and each topic contains lessons in learning order.'}</p></div>${subject?'<button id="backToSubjects" type="button">← All subjects</button>':''}</div>${subject?topicView(subject):subjectView()}`;
    host.querySelector('#backToSubjects')?.addEventListener('click',()=>{selected=null;render()});
    host.querySelectorAll('[data-subject]').forEach(el=>el.addEventListener('click',()=>{selected=el.dataset.subject;render()}));
    host.querySelectorAll('[data-open-topic]').forEach(el=>el.addEventListener('click',()=>openTopic(el.dataset.openTopic)));
  }
  function subjectView(){return `<div class="subject-grid">${SUBJECTS.map(s=>{const lessons=s.topics.reduce((n,k)=>n+lessonCount(k),0);return `<button class="subject-card" data-subject="${s.id}" type="button"><span class="subject-icon">${s.icon}</span><span class="subject-copy"><strong>${s.title}</strong><small>${s.description}</small><em>${s.topics.length} ${s.topics.length===1?'topic':'topics'} · ${lessons} lessons</em></span><b>Explore →</b></button>`}).join('')}</div>`}
  function topicView(s){return `<div class="subject-topic-list">${s.topics.map((k,i)=>`<button class="subject-topic-row" data-open-topic="${k}" type="button"><span class="topic-sequence">${String(i+1).padStart(2,'0')}</span><span><strong>${titleFor(k)}</strong><small>${window.topicRegistry?.topics?.[k]?.description||''}</small><em>${lessonCount(k)} lessons · ${questionCount(k)} practice questions${k==='sql'?' · checkpoint quizzes':''}</em></span><b>Start topic →</b></button>`).join('')}</div>`}
  function openTopic(key){
    const card=[...document.querySelectorAll('#topicsGrid .topic-card')].find(c=>cardKey(c)===key);
    if(card){card.click();return}
    try{if(typeof openTopic==='function')window.openTopic(key)}catch(_){}
  }
  function install(){
    const style=document.createElement('style');style.id='beginnerSubjectStyles';style.textContent=`
    .beginner-subject-browser{margin:.3rem 0 1rem}.subject-browser-head{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;margin-bottom:.8rem}.subject-browser-head span{font-size:.6rem;font-weight:800;text-transform:uppercase;color:#e95420}.subject-browser-head h3{font-size:1rem;color:#173b29;margin:.18rem 0}.subject-browser-head p{font-size:.7rem;color:#555f57;margin:0;max-width:720px}.subject-browser-head button{border:1px solid #d7d2ca;background:#fff;color:#173b29;border-radius:7px;padding:.5rem .7rem;font-weight:700;font-size:.66rem;cursor:pointer}.subject-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.75rem}.subject-card{min-height:160px;text-align:left;background:#fff;border:1px solid #ddd8d0;border-radius:10px;padding:.9rem;cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;box-shadow:0 4px 13px rgba(32,39,34,.04);transition:.15s}.subject-card:hover{transform:translateY(-2px);border-color:#a8bcae;box-shadow:0 8px 20px rgba(32,39,34,.08)}.subject-icon{width:36px;height:36px;border-radius:8px;background:#edf4ec;color:#0f5b37;display:grid;place-items:center;font-weight:800;margin-bottom:.6rem}.subject-copy{display:flex;flex-direction:column;flex:1}.subject-copy strong{font-size:.82rem;color:#17231d}.subject-copy small{font-size:.64rem;line-height:1.45;color:#4d5750;margin:.3rem 0}.subject-copy em{font-size:.58rem;font-style:normal;color:#7a7f79;margin-top:auto}.subject-card>b{font-size:.62rem;color:#e95420;margin-top:.5rem}.subject-topic-list{display:grid;gap:.6rem}.subject-topic-row{width:100%;display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:.8rem;text-align:left;background:#fff;border:1px solid #ddd8d0;border-radius:9px;padding:.75rem .85rem;cursor:pointer}.subject-topic-row:hover{border-color:#9eb8a5;background:#fcfffc}.topic-sequence{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#edf4ec;color:#0f5b37;font-size:.62rem;font-weight:800}.subject-topic-row span:nth-child(2){display:flex;flex-direction:column}.subject-topic-row strong{font-size:.78rem;color:#17231d}.subject-topic-row small{font-size:.63rem;color:#4d5750;margin:.15rem 0}.subject-topic-row em{font-size:.57rem;color:#7a7f79;font-style:normal}.subject-topic-row>b{font-size:.62rem;color:#e95420;white-space:nowrap}@media(max-width:1000px){.subject-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.subject-grid{grid-template-columns:1fr}.subject-browser-head{align-items:flex-start;flex-direction:column}.subject-topic-row{grid-template-columns:36px 1fr}.subject-topic-row>b{grid-column:2}}
    `;document.head.appendChild(style);
    const select=document.getElementById('difficultyFilter');select?.addEventListener('change',()=>setTimeout(render,20));
    const grid=document.getElementById('topicsGrid');if(grid)new MutationObserver(()=>setTimeout(render,10)).observe(grid,{childList:true});
    document.querySelectorAll('.path-card').forEach(c=>c.addEventListener('click',()=>setTimeout(render,80)));
    setTimeout(render,250);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();