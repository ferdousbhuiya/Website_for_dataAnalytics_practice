(function(){
  const SQL_MODULES=[['SQL Basics',1,3],['Filtering & Aggregation',4,6],['HAVING, JOINs & Subqueries',7,9],['CTEs, Functions & Windows',10,12],['Advanced CTEs & Views',13,15],['JSON, Partitioning & Plans',16,18],['Indexing & Security',19,21],['JOIN Review',22,22]];
  const pin=()=>localStorage.getItem('dataAnalyticsActivePin')||'default';
  function sqlState(){try{return JSON.parse(localStorage.getItem('dataPrepSqlCheckpoints_'+pin())||'{}')}catch(_){return{}}}
  function passedCount(){const s=sqlState();let n=0;for(let i=0;i<8;i++){if(s[i]?.passed)n++;else break}return n}
  function format(raw){return String(raw||'').replace(/```([\s\S]*?)```/g,'<pre><code>$1</code></pre>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>')}
  function renderSqlPreview(idx){
    const shell=document.getElementById('dpSubjectShell'); if(!shell)return;
    const m=SQL_MODULES[idx],ls=(window.topicsData?.sql?.lessons||[]).slice(m[1]-1,m[2]);
    shell.innerHTML=`<header class="dp-shell-head"><button data-v3-back class="dp-back">←</button><img src="logo.png" alt="DataPrep Pro"><nav><span class="active">▱ Learn</span><span>▥ Practice</span><span>◈ Progress</span><span>▣ Resources</span></nav><button class="dp-avatar">FB</button></header><main class="dp-shell-main"><button class="lex-context-back" data-v3-subject>← <span>Back to SQL Fundamentals</span></button><div class="dp-crumb">Beginner <b>›</b> SQL Fundamentals <b>›</b> ${m[0]}</div><section class="dp-module-page"><div class="dp-module-head"><div><span>Module ${idx+1}</span><h1>${m[0]}</h1><p>Lessons ${m[1]}${m[2]!==m[1]?'–'+m[2]:''}</p></div><em>Preview · not yet credited</em></div><div class="dpx-preview-note"><strong>Preview mode:</strong> You can read and practice these lessons now. This module's checkpoint remains locked until you pass the previous checkpoint.</div><div class="dp-lesson-list">${ls.map((l,j)=>`<article class="dp-lesson"><div class="dp-lesson-num">${m[1]+j}</div><div><h2>${l.title||'Lesson '+(m[1]+j)}</h2><div class="dp-lesson-content">${l.content||''}</div></div></article>`).join('')}</div><div class="dp-checkpoint-cta locked"><div><span>Knowledge checkpoint</span><h3>Checkpoint ${idx+1}</h3><p>5 questions · Pass with 4/5 or better.</p></div><button disabled>Locked until Checkpoint ${idx} passes 🔒</button></div></section></main>`;
    shell.querySelector('[data-v3-back]').onclick=()=>shell.querySelector('[data-v3-subject]').click();
    shell.querySelector('[data-v3-subject]').onclick=()=>{shell.classList.add('hidden');document.body.classList.remove('dp-shell-open');setTimeout(()=>{const sql=[...document.querySelectorAll('[data-subject-id],.subject-card,.subject-topic-card')].find(x=>(x.textContent||'').toLowerCase().includes('sql fundamentals'));sql?.click()},30)};
    setTimeout(enhance,20);
  }
  function unlockPreviewButtons(root){
    root.querySelectorAll('.dp-module.locked[disabled]').forEach(btn=>{
      const idx=Number(btn.dataset.openModule); if(!Number.isFinite(idx))return;
      btn.disabled=false; btn.classList.remove('locked'); btn.classList.add('preview');
      const em=btn.querySelector('em'); if(em)em.textContent='Preview · quiz locked';
      btn.setAttribute('aria-label',(btn.querySelector('strong')?.textContent||'Module')+' preview');
      if(btn.dataset.v3Preview)return; btn.dataset.v3Preview='1';
      btn.addEventListener('click',e=>{if(idx>passedCount()){e.preventDefault();e.stopImmediatePropagation();renderSqlPreview(idx)}},true);
    });
  }
  function normalizeCode(s){return String(s||'').replace(/\s+/g,' ').replace(/;\s*$/,'').trim().toLowerCase()}
  function addPracticeToLesson(lesson,subject){
    if(lesson.dataset.v3Practice==='1')return; lesson.dataset.v3Practice='1';
    const codes=[...lesson.querySelectorAll('.dp-lesson-content pre code,.dpx-content pre code,.bp-content pre code,.lesson-content pre code')];
    if(!codes.length)return;
    const source=codes.find(c=>(c.textContent||'').trim().length>5); if(!source)return;
    const answer=(source.textContent||'').trim(); if(!answer)return;
    const title=lesson.querySelector('h2,h3')?.textContent?.trim()||'Practice';
    const lab=document.createElement('section'); lab.className='lex-code-practice-v3';
    const language=subject==='sql'?'SQL':subject==='python'?'Python':subject==='etl'?'ETL / Python':subject==='excel'?'Formula':'Code';
    lab.innerHTML=`<div class="lex-section-kicker">Hands-on practice</div><h3>${language} Practice · ${title}</h3><p>Recreate the worked example yourself. The solution remains hidden until you ask for it.</p><textarea spellcheck="false" placeholder="${subject==='sql'?'-- Write your SQL query here':'Write your answer here'}"></textarea><div class="lex-lab-actions"><button data-v3-run>Run / Preview</button><button data-v3-check>Check Answer</button><button data-v3-hint>Hint</button><button data-v3-answer>Show Answer</button><button data-v3-reset>Reset</button></div><div class="lex-lab-feedback" aria-live="polite"></div><pre class="lex-v3-output" hidden></pre><pre class="lex-v3-answer" hidden><code></code></pre>`;
    lesson.appendChild(lab);
    const ta=lab.querySelector('textarea'),fb=lab.querySelector('.lex-lab-feedback'),out=lab.querySelector('.lex-v3-output'),ans=lab.querySelector('.lex-v3-answer'),ansCode=ans.querySelector('code'); ansCode.textContent=answer;
    let hint=0;
    const hints=subject==='sql'?['Identify the columns or calculation the example is trying to return.','Use the same table and SQL clause introduced in this lesson.','Compare the structure of your query with the worked example above, but write it yourself.']:['Start with the main operation demonstrated in the lesson.','Use the same variables, functions, or steps introduced in the example.','Compare the structure of your work with the lesson example, then try again.'];
    lab.querySelector('[data-v3-run]').onclick=()=>{const val=ta.value.trim();if(!val){fb.textContent='Write an answer first.';fb.className='lex-lab-feedback warn';out.hidden=true;return}out.textContent=val;out.hidden=false;fb.textContent=subject==='sql'?'Query preview ready. Use Check Answer to validate the structure.':'Your practice code is shown below. Use Check Answer to compare it with the lesson target.';fb.className='lex-lab-feedback ok'};
    lab.querySelector('[data-v3-check]').onclick=()=>{const val=normalizeCode(ta.value),target=normalizeCode(answer);if(!val){fb.textContent='Write an answer before checking.';fb.className='lex-lab-feedback warn';return}const ok=val===target || (target.length>20 && target.split(' ').filter(Boolean).filter(x=>x.length>2).slice(0,6).every(x=>val.includes(x)));fb.textContent=ok?'Good work. Your answer contains the expected structure for this practice.':'Not quite yet. Use a hint, review the lesson example, and try again.';fb.className='lex-lab-feedback '+(ok?'success':'warn')};
    lab.querySelector('[data-v3-hint]').onclick=()=>{fb.textContent=hints[Math.min(hint,hints.length-1)];fb.className='lex-lab-feedback';hint++};
    lab.querySelector('[data-v3-answer]').onclick=e=>{ans.hidden=!ans.hidden;e.currentTarget.textContent=ans.hidden?'Show Answer':'Hide Answer'};
    lab.querySelector('[data-v3-reset]').onclick=()=>{ta.value='';fb.textContent='';out.hidden=true;ans.hidden=true;hint=0;lab.querySelector('[data-v3-answer]').textContent='Show Answer'};
  }
  function fixOldSqlLab(root){
    root.querySelectorAll('.lex-sql-lab').forEach(lab=>{
      if(lab.dataset.v3Fixed)return; lab.dataset.v3Fixed='1';
      const ta=lab.querySelector('textarea'); if(!ta)return;
      const solution=ta.value.trim(); if(!solution)return;
      ta.dataset.solution=solution; ta.value=''; ta.placeholder='-- Write your SQL query here';
      const actions=lab.querySelector('.lex-lab-actions'); if(!actions)return;
      let hintBtn=actions.querySelector('[data-v3-old-hint]'); if(!hintBtn){hintBtn=document.createElement('button');hintBtn.dataset.v3OldHint='1';hintBtn.textContent='Hint';actions.insertBefore(hintBtn,actions.querySelector('[data-reset]'))}
      let ansBtn=actions.querySelector('[data-v3-old-answer]'); if(!ansBtn){ansBtn=document.createElement('button');ansBtn.dataset.v3OldAnswer='1';ansBtn.textContent='Show Answer';actions.insertBefore(ansBtn,actions.querySelector('[data-reset]'))}
      const fb=lab.querySelector('.lex-lab-feedback'); let hint=0; const hints=['Start by selecting the two requested columns from customers.','Use a WHERE condition on the state column.','Filter the state value to FL.'];
      hintBtn.onclick=()=>{fb.textContent=hints[Math.min(hint,hints.length-1)];fb.className='lex-lab-feedback';hint++};
      let answerBox=lab.querySelector('.lex-v3-answer'); if(!answerBox){answerBox=document.createElement('pre');answerBox.className='lex-v3-answer';answerBox.hidden=true;const code=document.createElement('code');code.textContent=solution;answerBox.appendChild(code);lab.appendChild(answerBox)}
      ansBtn.onclick=()=>{answerBox.hidden=!answerBox.hidden;ansBtn.textContent=answerBox.hidden?'Show Answer':'Hide Answer'};
      const reset=actions.querySelector('[data-reset]'); if(reset)reset.onclick=()=>{ta.value='';lab.querySelector('.lex-result').innerHTML='';fb.textContent='';answerBox.hidden=true;ansBtn.textContent='Show Answer';hint=0};
    })
  }
  function detectSubject(root){const t=(root.innerText||'').toLowerCase();if(t.includes('sql fundamentals'))return'sql';if(t.includes('python foundations'))return'python';if(t.includes('etl foundations'))return'etl';if(t.includes('excel & spreadsheets'))return'excel';return'generic'}
  function enhance(){
    document.querySelectorAll('#dpSubjectShell,.dpx-shell,.bp-shell').forEach(root=>{unlockPreviewButtons(root);fixOldSqlLab(root);const subject=detectSubject(root);root.querySelectorAll('.dp-lesson,.dpx-lesson,.bp-lesson,.lesson-item').forEach(l=>addPracticeToLesson(l,subject))});
  }
  let scheduled=false; function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;enhance()})}
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();