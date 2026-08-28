(function(){
  const ROOTS=['#dpSubjectShell','#bpShell','#dpExcelShell','#lessonsContainer'];
  const PRACTICE_SELECTOR='.gp-practice';
  const VIRTUAL={
    customers:[{id:1,name:'Ava',city:'Miami',state:'FL',signup_date:'2026-08-01'},{id:2,name:'Noah',city:'Atlanta',state:'GA',signup_date:'2026-08-03'},{id:3,name:'Mia',city:'Orlando',state:'FL',signup_date:'2026-08-05'},{id:4,name:'Liam',city:'Tampa',state:'FL',signup_date:'2026-08-07'}],
    products:[{product_name:'Laptop',price:1299},{product_name:'Monitor',price:399},{product_name:'Keyboard',price:99},{product_name:'Mouse',price:49}],
    orders:[{order_id:101,customer_id:1,total_amount:140,sale_amount:140},{order_id:102,customer_id:2,total_amount:75,sale_amount:75},{order_id:103,customer_id:1,total_amount:220,sale_amount:220},{order_id:104,customer_id:3,total_amount:180,sale_amount:180}],
    employees:[{name:'Ava',department:'Analytics',salary:82000},{name:'Noah',department:'Engineering',salary:98000},{name:'Mia',department:'Analytics',salary:91000},{name:'Liam',department:'Engineering',salary:105000}],
    sales:[{category:'East',sales:1200,sale_amount:1200,year:2023},{category:'West',sales:1800,sale_amount:1800,year:2023},{category:'East',sales:900,sale_amount:900,year:2024}],
    users:[{user_id:1,month_name:'Jan'},{user_id:2,month_name:'Jan'},{user_id:3,month_name:'Feb'}]
  };
  function roots(){return ROOTS.map(s=>document.querySelector(s)).filter(Boolean)}
  function lessonNodes(root){return [...root.querySelectorAll('.dp-lesson,.bp-lesson,.dpx-lesson,.lesson-item')].filter(x=>!x.closest(PRACTICE_SELECTOR))}
  function contentNode(lesson){return lesson.querySelector('.dp-content,.bp-content,.dpx-content,.lesson-content')||lesson}
  function titleOf(lesson){return (lesson.querySelector('h2,h3,.lesson-title')?.textContent||'Practice exercise').trim()}
  function infer(code,lesson){const t=(titleOf(lesson)+' '+code).toLowerCase();if(/\bselect\b[\s\S]*\bfrom\b|\bwith\b[\s\S]*\bselect\b/.test(t))return'sql';if(/^\s*=/.test(code)||/\b(sumif|xlookup|vlookup|pivot|dax|calculate\s*\()/i.test(code))return'excel';if(/\b(import |def |print\(|pandas|pd\.|python|venv|pip )/i.test(code))return'python';if(/\b(mkdir|cd |source |pip install|python -m|curl |git )/i.test(code))return'bash';if(/\b(json|csv|api|extract|transform|load)\b/i.test(t)&&/[=(){}\[\]]/.test(code))return'python';return'code'}
  function challenge(content,title){const parts=[...content.querySelectorAll('p,li')].map(x=>x.textContent.trim()).filter(Boolean);let x=parts.find(s=>/^task\s*:/i.test(s))||parts.find(s=>/business scenario/i.test(s));if(x)return x.replace(/^task\s*:/i,'').trim();return `Recreate or adapt the worked example from “${title}” without copying the solution.`}
  function starter(lang){return lang==='sql'?'-- Write your SQL query here':lang==='python'?'# Write your Python code here':lang==='bash'?'# Write the command(s) here':lang==='excel'?'=':'// Write your solution here'}
  function normalized(s){return String(s).replace(/--.*$/gm,'').replace(/#.*$/gm,'').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').trim().toLowerCase().replace(/;$/,'')}
  function tokenSet(s){return new Set(normalized(s).match(/[a-z_][a-z0-9_]*|>=|<=|<>|!=|=|>|</g)||[])}
  function score(user,answer,lang){const u=normalized(user),a=normalized(answer);if(!u||u===normalized(starter(lang)))return 0;if(u===a)return 1;const A=tokenSet(a),U=tokenSet(u);if(!A.size)return 0;let hit=0;A.forEach(t=>{if(U.has(t))hit++});let ratio=hit/A.size;if(lang==='sql'){
      const must=['select','from']; if(must.some(k=>A.has(k)&&!U.has(k)))ratio*=.45;
      ['where','group','having','join','order','limit','with'].forEach(k=>{if(A.has(k)&&!U.has(k))ratio*=.78});
    }
    return ratio;
  }
  function hints(answer,lang){const a=normalized(answer),arr=[];if(lang==='sql'){
      const table=(a.match(/\bfrom\s+([a-z_][a-z0-9_]*)/)||[])[1];
      arr.push('Start with SELECT and choose only the columns needed for the task.');
      if(table)arr.push(`Use ${table} in the FROM clause.`);
      if(/\bwhere\b/.test(a))arr.push('The solution filters rows, so add a WHERE condition.');
      else if(/\bgroup by\b/.test(a))arr.push('The result summarizes groups, so GROUP BY is important.');
      else if(/\bjoin\b/.test(a))arr.push('The task combines tables, so use the appropriate JOIN and matching key.');
    } else if(lang==='python'){
      arr.push('Identify the input, the transformation, and the final result before writing code.');
      if(/\bimport\b/.test(a))arr.push('The worked solution imports a library before doing the main task.');
      if(/\bdef\b/.test(a))arr.push('Consider putting the repeated logic inside a function.');
      else arr.push('Use the variables and function names introduced in the lesson.');
    } else if(lang==='excel'){
      const f=(answer.match(/=\s*([A-Z][A-Z0-9_.]*)\s*\(/i)||[])[1];
      arr.push('Start with = and identify which cells or ranges the result depends on.');
      if(f)arr.push(`The lesson uses the ${f.toUpperCase()} function for this task.`);
    } else if(lang==='bash'){
      arr.push('Think about the command that performs the main action first.');
      arr.push('Check paths, filenames, and command options carefully.');
    } else {arr.push('Break the worked example into inputs, operation, and expected result.');arr.push('Reuse the concept from the lesson, but type the solution yourself.');}
    return arr;
  }
  function sqlPreview(query,out,feedback){
    const q=normalized(query);const m=q.match(/^select\s+(.+?)\s+from\s+([a-z_][a-z0-9_]*)([\s\S]*)$/i);if(!m){feedback('Run preview currently supports SELECT ... FROM ... queries.','warn');out.innerHTML='';return}
    const table=m[2].toLowerCase(),rows0=VIRTUAL[table];if(!rows0){feedback(`The browser practice dataset does not contain “${table}”. Use Check Answer to validate the exercise logic.`, 'info');out.innerHTML='';return}
    let rows=rows0.slice(),tail=m[3]||'';const wm=tail.match(/where\s+([a-z_][a-z0-9_]*)\s*(=|>|<|>=|<=)\s*['\"]?([^'\"\s;]+)['\"]?/i);if(wm){const col=wm[1],op=wm[2],val=isNaN(Number(wm[3]))?wm[3]:Number(wm[3]);rows=rows.filter(r=>{const x=r[col];if(op==='=')return String(x).toLowerCase()===String(val).toLowerCase();if(op==='>')return x>val;if(op==='<')return x<val;if(op==='>=')return x>=val;if(op==='<=')return x<=val;return true})}
    const om=tail.match(/order\s+by\s+([a-z_][a-z0-9_]*)(?:\s+(asc|desc))?/i);if(om){const c=om[1],d=(om[2]||'asc').toLowerCase();rows.sort((a,b)=>(a[c]>b[c]?1:a[c]<b[c]?-1:0)*(d==='desc'?-1:1))}
    const lm=tail.match(/limit\s+(\d+)/i);if(lm)rows=rows.slice(0,+lm[1]);
    let cols=m[1].trim()==='*'?Object.keys(rows0[0]):m[1].split(',').map(x=>x.trim().replace(/\s+as\s+.*/i,'').split('.').pop()).filter(x=>/^[a-z_][a-z0-9_]*$/i.test(x));
    if(!cols.length){feedback('This query uses an advanced expression. Use Check Answer for validation.','info');out.innerHTML='';return}
    out.innerHTML=`<div class="gp-output-label">Output preview</div><table><thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${r[c]??'—'}</td>`).join('')}</tr>`).join('')}</tbody></table>`;feedback(`Query preview returned ${rows.length} row${rows.length===1?'':'s'}.`,'ok')
  }
  function completionKey(){return 'dataPrepGuidedPractice_'+(localStorage.getItem('dataAnalyticsActivePin')||'default')}
  function markComplete(id){let s={};try{s=JSON.parse(localStorage.getItem(completionKey())||'{}')}catch(_){s={}}s[id]=true;localStorage.setItem(completionKey(),JSON.stringify(s))}
  function makePractice(lesson,answer,index){const content=contentNode(lesson),lang=infer(answer,lesson),title=titleOf(lesson),id=(title+'-'+index+'-'+lang).toLowerCase().replace(/[^a-z0-9]+/g,'-');const wrap=document.createElement('section');wrap.className='gp-practice';wrap.dataset.gp=id;const hs=hints(answer,lang);wrap.innerHTML=`<div class="gp-kicker">Guided practice · ${lang.toUpperCase()}</div><h4>${title}</h4><p class="gp-challenge">${challenge(content,title)}</p><textarea spellcheck="false" aria-label="Practice editor">${starter(lang)}</textarea><div class="gp-actions"><button data-gp-run>${lang==='sql'?'Run Query':'Run / Preview'}</button><button data-gp-check>Check Answer</button><button data-gp-hint>Hint</button><button data-gp-show>Show Answer</button><button data-gp-reset>Reset</button></div><div class="gp-feedback" aria-live="polite"></div><div class="gp-output"></div><div class="gp-answer" hidden><div>Worked answer</div><pre><code></code></pre></div>`;const ta=wrap.querySelector('textarea'),fb=wrap.querySelector('.gp-feedback'),out=wrap.querySelector('.gp-output'),ans=wrap.querySelector('.gp-answer'),ansCode=ans.querySelector('code');ansCode.textContent=answer;let hintIndex=0;const feedback=(text,type='info')=>{fb.textContent=text;fb.className='gp-feedback '+type};wrap.querySelector('[data-gp-run]').onclick=()=>{if(lang==='sql')sqlPreview(ta.value,out,feedback);else if(lang==='excel'){const ok=/^\s*=/.test(ta.value);feedback(ok?'Formula syntax recognized. Use Check Answer to compare it with the lesson requirement.':'Excel formulas should begin with =.','info');out.innerHTML=ok?'<div class="gp-output-card">Formula ready for checking.</div>':''}else{const empty=normalized(ta.value)===normalized(starter(lang));feedback(empty?'Write your solution first.':'This static site validates the structure of your solution with Check Answer. Browser execution is available for supported SQL exercises.','info');out.innerHTML=empty?'':'<div class="gp-output-card">Code entered. Use Check Answer for requirement validation.</div>'}};wrap.querySelector('[data-gp-check]').onclick=()=>{const s=score(ta.value,answer,lang);if(s>=.8){feedback('Practice passed. Your solution contains the key elements required by this exercise.','success');markComplete(id)}else if(s>=.5)feedback('Close. Some required elements are still missing. Try a Hint before revealing the answer.','warn');else feedback('Not there yet. Review the task, then try a Hint.','warn')};wrap.querySelector('[data-gp-hint]').onclick=()=>{feedback(hs[Math.min(hintIndex,hs.length-1)]||'Compare the task with the worked example in the lesson.','hint');hintIndex++};wrap.querySelector('[data-gp-show]').onclick=()=>{ans.hidden=!ans.hidden;wrap.querySelector('[data-gp-show]').textContent=ans.hidden?'Show Answer':'Hide Answer'};wrap.querySelector('[data-gp-reset]').onclick=()=>{ta.value=starter(lang);out.innerHTML='';fb.textContent='';ans.hidden=true;wrap.querySelector('[data-gp-show]').textContent='Show Answer';hintIndex=0};return wrap}
  function upgradeLegacySqlLab(root){root.querySelectorAll('.lex-sql-lab').forEach(lab=>{if(lab.dataset.gpUpgraded)return;lab.dataset.gpUpgraded='1';const ta=lab.querySelector('textarea');if(!ta)return;const answer=ta.value.trim();ta.dataset.answer=answer;ta.value='-- Write your SQL query here';const actions=lab.querySelector('.lex-lab-actions');if(actions&&!actions.querySelector('[data-legacy-hint]')){const hint=document.createElement('button');hint.dataset.legacyHint='1';hint.textContent='Hint';const show=document.createElement('button');show.dataset.legacyShow='1';show.textContent='Show Answer';actions.insertBefore(hint,actions.querySelector('[data-reset]'));actions.insertBefore(show,actions.querySelector('[data-reset]'));let step=0;hint.onclick=()=>{const fb=lab.querySelector('.lex-lab-feedback');fb.textContent=step++===0?'Start with SELECT name, city FROM customers.':'Add a WHERE condition that keeps only rows where state is FL.';fb.className='lex-lab-feedback ok'};show.onclick=()=>{const existing=lab.querySelector('.gp-legacy-answer');if(existing){existing.remove();show.textContent='Show Answer';return}const box=document.createElement('pre');box.className='gp-legacy-answer';box.textContent=answer;lab.appendChild(box);show.textContent='Hide Answer'};lab.querySelector('[data-reset]')?.addEventListener('click',()=>{setTimeout(()=>{ta.value='-- Write your SQL query here'},0)})}}
  }
  function enhanceRoot(root){upgradeLegacySqlLab(root);lessonNodes(root).forEach(lesson=>{if(lesson.dataset.gpScanned)return;lesson.dataset.gpScanned='1';const content=contentNode(lesson);const codes=[...content.querySelectorAll('pre code')].map(c=>c.textContent.trim()).filter(c=>c.length>4&&!/^mermaid\b/i.test(c));if(!codes.length)return;const chosen=codes[codes.length-1];const block=makePractice(lesson,chosen,codes.length-1);lesson.appendChild(block)})}
  let timer=null;function scan(){roots().forEach(enhanceRoot)}function schedule(){clearTimeout(timer);timer=setTimeout(scan,80)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{scan();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true})});else{scan();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true})}
})();