(function(){
  const SUBJECTS={
    python:{title:'Python Foundations',icon:'Py',tone:'python',topics:['python_setup'],desc:'Python setup, data types, functions, loops, files, NumPy, pandas, and analytics foundations.',learn:['Set up and run Python','Use variables, conditions, loops, and functions','Work with files and handle errors','Use NumPy and pandas for analysis','Complete a beginner data-analysis project']},
    etl:{title:'ETL Foundations',icon:'⚙',tone:'etl',topics:['etl1','etl2','etl3','etl4'],desc:'ETL concepts, extraction, validation, transformation, loading, file handling, and reliable workflows.',learn:['Understand end-to-end ETL workflows','Extract and validate incoming data','Apply transformation rules safely','Load data without duplicates','Track rejected records and audit pipeline runs']}
  };

  function pin(){return localStorage.getItem('dataAnalyticsActivePin')||'default'}
  function stateKey(){return 'dataPrepBeginnerCheckpoints_'+pin()}
  function readState(){try{return JSON.parse(localStorage.getItem(stateKey())||'{}')}catch(_){return{}}}
  function saveState(s){localStorage.setItem(stateKey(),JSON.stringify(s))}
  function directTopicData(key){
    const vars={python_setup:'pythonSetupData',etl1:'etl1Data',etl2:'etl2Data',etl3:'etl3Data',etl4:'etl4Data'};
    return window.topicsData?.[key]||window[vars[key]]||null;
  }
  function lessons(key){return directTopicData(key)?.lessons||[]}
  function questions(key){return directTopicData(key)?.questions||[]}
  function titleFor(key){return directTopicData(key)?.title||key.toUpperCase()}
  function totals(s){return {lessons:s.topics.reduce((n,k)=>n+lessons(k).length,0),questions:s.topics.reduce((n,k)=>n+questions(k).length,0)}}
  function modulesFor(id){
    const s=SUBJECTS[id];
    if(id==='python'){
      const ls=lessons('python_setup'),out=[];
      for(let i=0;i<ls.length;i+=3)out.push({name:ls[i]?.title||`Module ${out.length+1}`,topic:'python_setup',from:i+1,to:Math.min(i+3,ls.length)});
      return out;
    }
    return s.topics.map((k,i)=>({name:titleFor(k).replace(/^ETL\s*\d+:?\s*/i,'')||`ETL Module ${i+1}`,topic:k,from:1,to:lessons(k).length}));
  }
  function subjectState(id){const s=readState();return s[id]||{}}
  function passedCount(id){
    const mods=modulesFor(id),st=subjectState(id);let n=0;
    for(let i=0;i<mods.length;i++){if(st[i]?.passed)n++;else break}
    return n;
  }
  function renderContent(raw){
    raw=raw==null?'':String(raw);
    if(/<\/?[a-z][\s\S]*>/i.test(raw))return raw;
    if(typeof window.convertMarkdownToHtml==='function'){try{return window.convertMarkdownToHtml(raw)}catch(_){}}
    return raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
  }
  function ensureShell(){
    let shell=document.getElementById('dpSubjectShell');
    if(!shell){shell=document.createElement('div');shell.id='dpSubjectShell';shell.className='dp-shell hidden';document.body.appendChild(shell)}
    return shell;
  }
  function header(){return `<header class="dp-shell-head"><button data-fixed-back class="dp-back" aria-label="Back to Beginner subjects">←</button><img src="logo.png" alt="DataPrep Pro"><nav><span class="active">▱ Learn</span><span>▥ Practice</span><span>◈ Progress</span><span>▣ Resources</span></nav><button class="dp-avatar">FB</button></header>`}
  function returnToBeginner(){
    const shell=ensureShell();shell.classList.add('hidden');document.body.classList.remove('dp-shell-open');
    localStorage.setItem('dataPrepPreferredLevel','Beginner');localStorage.removeItem('dataPrepBeginnerSubject');
    const sel=document.getElementById('difficultyFilter');
    if(sel){sel.value='Beginner';sel.dispatchEvent(new Event('change',{bubbles:true}))}
    setTimeout(()=>document.getElementById('topics')?.scrollIntoView({behavior:'smooth',block:'start'}),80);
  }
  function openSubject(id){
    const s=SUBJECTS[id];if(!s)return;
    const shell=ensureShell(),mods=modulesFor(id),t=totals(s),passed=passedCount(id),pct=mods.length?Math.round(passed/mods.length*100):0;
    shell.classList.remove('hidden');document.body.classList.add('dp-shell-open');
    shell.dataset.fixedSubject=id;
    shell.innerHTML=`${header()}<main class="dp-shell-main"><div class="dp-crumb">Beginner <b>›</b> ${s.title}</div><button class="fixed-back-to-curriculum" data-fixed-back type="button">← Back to Beginner Subjects</button><section class="dp-subject-card tone-${s.tone}"><div class="dp-subject-top"><div class="dp-icon">${s.icon}</div><div class="dp-subject-copy"><div><h1>${s.title}</h1><span>Beginner</span></div><p>${s.desc}</p><small>▱ ${t.lessons} Lessons &nbsp; ? ${t.questions} Questions &nbsp; ◈ ${mods.length} Checkpoints</small></div><div class="dp-progress"><div><small>Verified progress</small><strong>${pct}%</strong></div><i><b style="width:${pct}%"></b></i><span>${passed}/${mods.length} checkpoints passed</span></div></div><div class="dp-tabs"><button class="active" type="button">Overview</button><button data-fixed-module="0" type="button">Lessons & Quizzes</button><button type="button" data-fixed-progress>Progress</button><button type="button" data-fixed-resources>Resources</button></div><div class="dp-overview"><div><h3>About this subject</h3><p>${s.desc}</p></div><aside><h3>What you'll learn</h3><ul>${s.learn.map(x=>`<li>✓ ${x}</li>`).join('')}</ul></aside></div><div class="dp-modules"><h3>Modules in this subject</h3>${mods.map((m,i)=>{const done=i<passed,current=i===passed;return `<button data-fixed-module="${i}" class="dp-module ${done?'completed':current?'in-progress':'available'}" type="button"><span>${i+1}</span><strong>${m.name}</strong><small>Lessons ${m.from}${m.to!==m.from?'–'+m.to:''}</small><em>${done?'Completed ✓':current?'In Progress':'Preview available'}</em><b>›</b></button>`}).join('')}</div></section></main>`;
    bind(id);window.scrollTo(0,0);
  }
  function openModule(id,index){
    const s=SUBJECTS[id],mods=modulesFor(id),m=mods[index];if(!m)return;
    const shell=ensureShell(),ls=lessons(m.topic).slice(m.from-1,m.to),passed=passedCount(id),checkpointUnlocked=index<=passed,done=index<passed;
    shell.innerHTML=`${header()}<main class="dp-shell-main"><div class="dp-crumb"><button data-fixed-subject type="button">Beginner</button><b>›</b><button data-fixed-subject type="button">${s.title}</button><b>›</b>${m.name}</div><button class="fixed-back-to-curriculum" data-fixed-back type="button">← Back to Beginner Subjects</button><section class="dp-module-page"><div class="dp-module-head"><div><span>Module ${index+1}</span><h1>${m.name}</h1><p>Lessons ${m.from}${m.to!==m.from?'–'+m.to:''}</p></div><em>${done?'Completed ✓':'In Progress'}</em></div><div class="dp-lesson-list">${ls.map((l,j)=>`<article class="dp-lesson"><div class="dp-lesson-num">${m.from+j}</div><div><h2>${l.title||'Lesson '+(m.from+j)}</h2><div class="dp-lesson-content">${renderContent(l.content||'')}</div></div></article>`).join('')}</div><div class="dp-checkpoint-cta"><div><span>Knowledge checkpoint</span><h3>Checkpoint ${index+1}</h3><p>${checkpointUnlocked?'Review the module questions, reveal the answers, then complete the checkpoint.':'You may preview this module, but its checkpoint unlocks after the previous checkpoint is completed.'}</p></div><button data-fixed-checkpoint="${index}" ${checkpointUnlocked?'':'disabled'}>${done?'Review Checkpoint':'Open Checkpoint →'}</button></div></section></main>`;
    bind(id);
  }
  function moduleQuestions(id,index){
    const m=modulesFor(id)[index],qs=questions(m.topic);if(!qs.length)return [];
    if(id==='python'){
      const per=Math.max(1,Math.ceil(qs.length/modulesFor(id).length));return qs.slice(index*per,index*per+per).slice(0,3);
    }
    return qs.slice(0,3);
  }
  function openCheckpoint(id,index){
    const s=SUBJECTS[id],m=modulesFor(id)[index],qs=moduleQuestions(id,index),shell=ensureShell();
    shell.innerHTML=`${header()}<main class="dp-shell-main"><div class="dp-crumb"><button data-fixed-subject type="button">Beginner</button><b>›</b><button data-fixed-subject type="button">${s.title}</button><b>›</b>Checkpoint ${index+1}</div><section class="fixed-checkpoint"><span class="fixed-checkpoint-kicker">Checkpoint ${index+1}</span><h1>${m.name}</h1><p>Use these questions to confirm that you understood the module before marking it complete.</p>${qs.length?qs.map((q,i)=>`<article class="fixed-review-question"><h3>${i+1}. ${q.question||'Review question'}</h3>${q.context?`<p>${renderContent(q.context)}</p>`:''}<button type="button" data-reveal-answer>Reveal answer</button><div class="fixed-answer" hidden>${renderContent(q.answer||'Review the lesson above.')}</div></article>`).join(''):`<article class="fixed-review-question"><h3>Module review</h3><p>Re-read the lessons above and confirm that you can explain the key concepts in your own words.</p><button type="button" data-reveal-answer>Confirm review</button><div class="fixed-answer" hidden>Review confirmed. You can now complete this checkpoint.</div></article>`}<div class="fixed-checkpoint-actions"><button type="button" data-fixed-module="${index}">← Review lessons</button><button type="button" data-complete-checkpoint="${index}" disabled>Complete checkpoint</button></div></section></main>`;
    bind(id);updateCompleteButton(shell);
  }
  function updateCompleteButton(shell){const reveals=[...shell.querySelectorAll('[data-reveal-answer]')],btn=shell.querySelector('[data-complete-checkpoint]');if(btn)btn.disabled=reveals.some(b=>b.dataset.revealed!=='1')}
  function completeCheckpoint(id,index){const all=readState();all[id]=all[id]||{};all[id][index]={passed:true,completedAt:new Date().toISOString()};saveState(all);openSubject(id)}
  function bind(id){
    const shell=ensureShell();
    shell.querySelectorAll('[data-fixed-back]').forEach(b=>b.onclick=returnToBeginner);
    shell.querySelectorAll('[data-fixed-subject]').forEach(b=>b.onclick=()=>openSubject(id));
    shell.querySelectorAll('[data-fixed-module]').forEach(b=>b.onclick=()=>openModule(id,Number(b.dataset.fixedModule)));
    shell.querySelector('[data-fixed-progress]')?.addEventListener('click',()=>shell.querySelector('.dp-progress')?.scrollIntoView({behavior:'smooth',block:'center'}));
    shell.querySelector('[data-fixed-resources]')?.addEventListener('click',()=>shell.querySelector('.dp-overview')?.scrollIntoView({behavior:'smooth',block:'center'}));
    shell.querySelectorAll('[data-fixed-checkpoint]').forEach(b=>b.onclick=()=>openCheckpoint(id,Number(b.dataset.fixedCheckpoint)));
    shell.querySelectorAll('[data-reveal-answer]').forEach(b=>b.onclick=()=>{const ans=b.nextElementSibling;ans.hidden=false;b.dataset.revealed='1';b.textContent='Answer revealed ✓';b.disabled=true;updateCompleteButton(shell)});
    shell.querySelectorAll('[data-complete-checkpoint]').forEach(b=>b.onclick=()=>completeCheckpoint(id,Number(b.dataset.completeCheckpoint)));
  }
  function installStyles(){if(document.getElementById('beginnerSeamlessFixStyles'))return;const st=document.createElement('style');st.id='beginnerSeamlessFixStyles';st.textContent=`
    #beginnerSubjectBrowser .subject-grid{align-items:stretch!important}
    #beginnerSubjectBrowser .subject-card{display:flex!important;flex-direction:column!important;align-items:flex-start!important;min-height:240px!important;padding:22px!important;gap:14px!important;text-align:left!important}
    #beginnerSubjectBrowser .subject-card .subject-icon{position:static!important;width:74px!important;height:74px!important;flex:0 0 74px!important;margin:0 0 4px!important;border-radius:18px!important}
    #beginnerSubjectBrowser .subject-card .subject-copy{display:flex!important;flex-direction:column!important;align-items:flex-start!important;width:100%!important;min-width:0!important;flex:1!important}
    #beginnerSubjectBrowser .subject-card .subject-copy strong{font-size:1rem!important;line-height:1.3!important;margin:0 0 8px!important}
    #beginnerSubjectBrowser .subject-card .subject-copy small{font-size:.78rem!important;line-height:1.55!important;margin:0!important;max-width:100%!important}
    #beginnerSubjectBrowser .subject-card .subject-copy em{margin-top:auto!important;padding-top:20px!important;width:100%!important}
    #beginnerSubjectBrowser .subject-card .subject-arrow{position:absolute!important;right:22px!important;bottom:20px!important}
    #beginnerSubjectBrowser .subject-card.subject-stats{align-items:flex-start!important}
    .fixed-back-to-curriculum{margin:0 0 18px!important;padding:12px 18px!important;border:1px solid #31506a!important;border-radius:10px!important;background:#0b2134!important;color:#f2f7fb!important;font-weight:700!important;cursor:pointer!important}
    .fixed-checkpoint{max-width:980px;margin:0 auto;padding:30px;background:#0c2235;border:1px solid #31506a;border-radius:16px;color:#e7eef4}.fixed-checkpoint-kicker{color:#5df18f;font-weight:800}.fixed-checkpoint h1{margin:.35rem 0 1rem;color:#fff}.fixed-checkpoint>p{color:#b8c8d4}.fixed-review-question{margin:18px 0;padding:18px;background:#0a1c2c;border:1px solid #29475e;border-radius:12px}.fixed-review-question h3{margin:0 0 10px;color:#fff;font-size:1rem}.fixed-review-question p{color:#c9d6df}.fixed-review-question button,.fixed-checkpoint-actions button{padding:10px 14px;border-radius:8px;border:1px solid #426780;background:#102a40;color:#fff;cursor:pointer}.fixed-review-question button:disabled,.fixed-checkpoint-actions button:disabled{opacity:.45;cursor:not-allowed}.fixed-answer{margin-top:12px;padding:12px;border-left:3px solid #5df18f;background:#0c2a26;color:#e5fff0}.fixed-checkpoint-actions{display:flex;justify-content:space-between;gap:12px;margin-top:22px}.fixed-checkpoint-actions button:last-child:not(:disabled){background:#15803d;border-color:#2fb35d}
    @media(max-width:900px){#beginnerSubjectBrowser .subject-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.dp-subject-top{grid-template-columns:58px 1fr!important}.dp-progress{grid-column:1/-1!important;margin-top:8px!important}}
    @media(max-width:620px){#beginnerSubjectBrowser .subject-grid{grid-template-columns:1fr!important}#beginnerSubjectBrowser .subject-card{min-height:210px!important}}
  `;document.head.appendChild(st)}
  function intercept(){
    document.addEventListener('click',e=>{
      const card=e.target.closest('.subject-card[data-subject="python"],.subject-card[data-subject="etl"]');
      if(!card)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();openSubject(card.dataset.subject);
    },true);
  }
  function repairData(){
    window.topicsData=window.topicsData||{};
    [['python_setup','pythonSetupData'],['etl1','etl1Data'],['etl2','etl2Data'],['etl3','etl3Data'],['etl4','etl4Data']].forEach(([k,v])=>{if(window[v])window.topicsData[k]=window[v]});
  }
  function install(){repairData();installStyles();intercept();setTimeout(repairData,250);setTimeout(repairData,1000)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();