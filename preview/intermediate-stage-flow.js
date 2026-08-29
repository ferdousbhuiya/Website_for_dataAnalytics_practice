(function(){
  const SUBJECTS=[
    {id:'python',icon:'🐍',title:'Python for Data Analysis',desc:'Analyze, clean, reshape and summarize real datasets with Python, pandas and NumPy.',topics:['python'],track:'Core analytics'},
    {id:'experiments',icon:'🧪',title:'Experimentation',desc:'Design trustworthy experiments, choose metrics and interpret A/B tests for business decisions.',topics:['experiment_design','ab_tests'],track:'Analytics'},
    {id:'product',icon:'🚀',title:'Product Analytics',desc:'Work with funnels, cohorts, retention and product metrics to explain user behavior.',topics:['product_analytics'],track:'Analytics'},
    {id:'projects',icon:'📊',title:'Analyst Projects',desc:'Apply Python, SQL, visualization and product analytics in portfolio-style business projects.',topics:['pandas_project','sql_project','viz_project','product_project'],track:'Applied practice'},
    {id:'engineering',icon:'⚙️',title:'Data Engineering',desc:'Build more reliable ETL with logging, OOP, debugging, APIs, JSON and databases.',topics:['etl5','etl6','etl8','etl9','etl10'],track:'Engineering'},
    {id:'modeling',icon:'🤖',title:'ML & Statistical Modeling',desc:'Build a practical foundation in machine learning, regression, inference and model evaluation.',topics:['machine_learning','statistical_modeling'],track:'Data science'}
  ];
  let active=null;
  function data(k){return window.topicsData?.[k]||null}
  function count(s){return s.topics.reduce((n,k)=>n+(data(k)?.lessons?.length||0),0)}
  function ensure(){
    let host=document.getElementById('intermediateStageBrowser');
    if(host)return host;
    host=document.createElement('section');host.id='intermediateStageBrowser';host.className='intermediate-browser';
    document.getElementById('topics')?.querySelector(':scope > .container')?.appendChild(host);return host;
  }
  function hideLegacy(on){
    ['.curriculum-heading-row','#topicFilters','#topicsGrid','.view-all-row'].forEach(sel=>{const e=document.querySelector('#topics '+sel);if(e)e.style.display=on?'none':''});
  }
  function renderSubjects(){
    active=null;hideLegacy(true);const h=ensure();if(!h)return;
    h.innerHTML=`<div class="im-head"><div><div class="im-kicker">STAGE 2 · INTERMEDIATE</div><h2>Analyze real data</h2><p>Move from foundations to realistic analytical decisions. Choose a learning area to begin.</p></div><div class="im-badge">Learn → Practice → Apply</div></div><div class="im-grid">${SUBJECTS.map(s=>`<button class="im-card" data-im="${s.id}"><span class="im-icon">${s.icon}</span><span class="im-track">${s.track}</span><strong>${s.title}</strong><span>${s.desc}</span><small>${count(s)} lessons · ${s.topics.length} module${s.topics.length===1?'':'s'}</small></button>`).join('')}</div><div class="im-note"><strong>Intermediate standard:</strong> lessons connect concepts to workplace situations, practice asks you to make analytical choices, and projects require you to apply multiple skills together.</div>`;
    h.querySelectorAll('[data-im]').forEach(b=>b.onclick=()=>renderSubject(SUBJECTS.find(s=>s.id===b.dataset.im)));
  }
  function renderSubject(s){
    active=s;const h=ensure();if(!h)return;
    const modules=s.topics.map((k,i)=>{const d=data(k),n=d?.lessons?.length||0;return `<button class="im-module" data-topic="${k}"><span class="im-num">${String(i+1).padStart(2,'0')}</span><span><strong>${d?.title||window.topicRegistry?.topics?.[k]?.category||k}</strong><small>${window.topicRegistry?.topics?.[k]?.description||'Intermediate applied learning'}</small></span><em>${n} lesson${n===1?'':'s'} →</em></button>`}).join('');
    h.innerHTML=`<button class="im-back" type="button">← Back to Intermediate Subjects</button><div class="im-subject-hero"><span class="im-icon big">${s.icon}</span><div><div class="im-kicker">${s.track.toUpperCase()}</div><h2>${s.title}</h2><p>${s.desc}</p></div></div><div class="im-cycle"><span><b>1</b> Learn the concept</span><span><b>2</b> See it at work</span><span><b>3</b> Practice the decision</span><span><b>4</b> Apply it</span></div><h3 class="im-section-title">Modules</h3><div class="im-modules">${modules}</div>`;
    h.querySelector('.im-back').onclick=renderSubjects;
    h.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>{const key=b.dataset.topic;if(typeof window.openTopic==='function')window.openTopic(key);else document.querySelector(`#topicsGrid [data-topic="${key}"]`)?.click();});
  }
  function open(){if(document.body.classList.contains('stage-focus-active')){document.body.classList.add('intermediate-focus');renderSubjects()}}
  function close(){document.body.classList.remove('intermediate-focus');document.getElementById('intermediateStageBrowser')?.remove();hideLegacy(false)}
  document.addEventListener('click',e=>{const card=e.target.closest('#path .path-card');if(card&&card.dataset.level==='Intermediate')setTimeout(open,80);const back=e.target.closest('.stage-focus-back');if(back)close()},true);
  window.openIntermediateStage=function(){window.openStageCurriculum?.('Intermediate');setTimeout(open,80)};
  window.closeIntermediateStage=close;
})();