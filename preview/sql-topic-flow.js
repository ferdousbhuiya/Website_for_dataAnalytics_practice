(function(){
  const PASS_SCORE = 4;
  const CHECKPOINTS = [
    {end:3,title:'Checkpoint 1 · SQL Foundations',questions:[
      ['Which SQL clause chooses the columns returned by a query?',['SELECT','FROM','WHERE','ORDER BY'],0],
      ['Which clause identifies the table a query reads from?',['WHERE','FROM','SELECT','GROUP BY'],1],
      ['Which clause filters individual rows before they are returned?',['HAVING','ORDER BY','WHERE','GROUP BY'],2],
      ['Which statement returns every column from employees?',['SELECT ALL FROM employees;','SELECT * FROM employees;','GET * employees;','FROM employees SELECT *;'],1],
      ['A primary key is primarily used to do what?',['Sort a table automatically','Uniquely identify each row','Store only text values','Join every table automatically'],1]
    ]},
    {end:6,title:'Checkpoint 2 · Sorting & Aggregation',questions:[
      ['Which keyword sorts query results?',['SORT BY','ORDER BY','GROUP BY','ARRANGE'],1],
      ['Which aggregate function returns the number of rows?',['SUM','AVG','COUNT','MAX'],2],
      ['Which function calculates an arithmetic mean?',['AVG','MEAN','COUNT','MEDIAN'],0],
      ['What does GROUP BY do?',['Filters individual rows','Combines rows into groups for aggregation','Sorts rows alphabetically','Removes duplicate tables'],1],
      ['Which expression calculates total sales?',['COUNT(sales)','AVG(sales)','SUM(sales)','MAX(sales) - MIN(sales)'],2]
    ]},
    {end:9,title:'Checkpoint 3 · HAVING, JOINs & Subqueries',questions:[
      ['Which clause filters grouped aggregate results?',['WHERE','HAVING','FROM','ORDER BY'],1],
      ['Which join returns only rows with matching keys in both tables?',['LEFT JOIN','FULL OUTER JOIN','INNER JOIN','CROSS JOIN'],2],
      ['Which join keeps every row from the left table even without a match?',['INNER JOIN','LEFT JOIN','RIGHT JOIN','CROSS JOIN'],1],
      ['A subquery is what?',['A query nested inside another query','A permanent table','An index','A database backup'],0],
      ['To find products priced above the overall average, which construct is appropriate in WHERE?',['A nested SELECT returning AVG(price)','ORDER BY price','DROP TABLE','GROUP BY product_name only'],0]
    ]},
    {end:12,title:'Checkpoint 4 · CTEs, Functions & Windows',questions:[
      ['Which keyword begins a common table expression?',['WITH','TEMP','CTE','BEGIN'],0],
      ['Which function commonly removes leading and trailing spaces from text?',['TRIM','CONCAT','UPPER','COUNT'],0],
      ['Unlike GROUP BY, a window function typically does what?',['Deletes rows','Keeps individual rows while calculating across related rows','Creates a permanent table','Requires no ORDER BY ever'],1],
      ['Which window function accesses a value from a previous row?',['LEAD','LAG','RANK','COUNT'],1],
      ['Which function assigns a unique sequential number to rows in a window?',['ROW_NUMBER','SUM','MAX','COALESCE'],0]
    ]},
    {end:15,title:'Checkpoint 5 · Advanced CTEs & Materialized Views',questions:[
      ['A recursive CTE is especially useful for which type of data?',['Hierarchical relationships','Only flat CSV files','Binary images','Password hashes'],0],
      ['A recursive CTE needs what to stop safely?',['A termination condition','A FULL JOIN only','A materialized view','A trigger on every table'],0],
      ['What does a materialized view store?',['Only SQL text','Precomputed query results','Only primary keys','User passwords'],1],
      ['Why use a materialized view for a dashboard?',['To speed repeated expensive queries','To prevent all updates','To replace every base table','To avoid SQL'],0],
      ['What operation updates stored results in a materialized view?',['REFRESH','COMMIT','ROLLBACK','VACUUM ONLY'],0]
    ]},
    {end:18,title:'Checkpoint 6 · JSON, Partitioning & Execution Plans',questions:[
      ['Which PostgreSQL index type is commonly used for JSONB containment/search?',['GIN','B-tree only','Heap','Hash partition'],0],
      ['Range partitioning is especially suitable for what kind of column?',['Time or ordered numeric ranges','Random comments only','Encrypted passwords only','Boolean flags only'],0],
      ['What is partition pruning?',['Skipping irrelevant partitions during a query','Deleting old partitions automatically','Joining every partition','Encrypting partitions'],0],
      ['Which command is used to inspect a PostgreSQL query execution plan?',['EXPLAIN','DESCRIBE DATABASE','PRINT PLAN','TRACE TABLE'],0],
      ['EXPLAIN ANALYZE adds what compared with a planned estimate alone?',['Actual execution information','Automatic table deletion','A new index','User permissions'],0]
    ]},
    {end:21,title:'Checkpoint 7 · Indexing, Security & Analytics',questions:[
      ['A partial index indexes what?',['A subset of rows matching a condition','Every database on a server','Only NULL values always','No table rows'],0],
      ['Row-level security controls access based primarily on what?',['Which rows a user may access','Font size','Disk format','Query indentation'],0],
      ['GRANT is used to do what?',['Assign privileges','Delete an index','Refresh statistics only','Create JSON'],0],
      ['Why is an audit log useful?',['To record who changed data and when','To make every query faster','To replace backups','To sort query results'],0],
      ['Running machine-learning operations inside a database can reduce what?',['Unnecessary data movement','Primary keys','SQL syntax','Table relationships'],0]
    ]},
    {end:22,title:'Checkpoint 8 · SQL JOIN Review',questions:[
      ['Which join returns all rows from both sides, matching where possible?',['INNER JOIN','LEFT JOIN','FULL OUTER JOIN','CROSS JOIN'],2],
      ['Which join preserves all rows from the right table?',['RIGHT JOIN','INNER JOIN','LEFT JOIN','SELF JOIN'],0],
      ['If a LEFT JOIN finds no right-side match, right-side columns are typically what?',['Zero','NULL','Deleted','Repeated'],1],
      ['What condition normally connects two related tables in a JOIN?',['A key relationship in an ON clause','An ORDER BY clause only','A LIMIT clause','A comment'],0],
      ['For customers and orders, which join keeps customers who have never ordered?',['LEFT JOIN from customers to orders','INNER JOIN only','CROSS JOIN','RIGHT JOIN from customers to orders always'],0]
    ]}
  ];

  function profileKey(){
    let pin='';
    try{ pin = typeof getActivePin==='function' ? getActivePin() : localStorage.getItem('dataAnalyticsActivePin')||''; }catch(_){}
    return 'dataPrepSqlCheckpoints_' + (pin || 'default');
  }
  function state(){ try{return JSON.parse(localStorage.getItem(profileKey())||'{}')}catch(_){return{}} }
  function save(s){ localStorage.setItem(profileKey(),JSON.stringify(s)); }
  function passedCount(){ const s=state(); let n=0; for(let i=0;i<CHECKPOINTS.length;i++){if(s[i]?.passed)n++;else break;} return n; }
  function currentTopicIsSql(){
    const title=(document.getElementById('topicTitle')?.textContent||'').toLowerCase();
    return title.includes('sql');
  }
  function quizHtml(cp,index,locked){
    const s=state()[index];
    const status=s?.passed?`Passed · ${s.score}/5`:locked?'Locked':s?.score!=null?`Last score ${s.score}/5 · retry available`:'Ready';
    return `<section class="sql-checkpoint ${locked?'locked':''} ${s?.passed?'passed':''}" data-cp="${index}">
      <div class="sql-cp-head"><div><span>Knowledge checkpoint</span><h3>${cp.title}</h3><p>Covers Lessons ${index===0?1:CHECKPOINTS[index-1].end+1}–${cp.end}. Score 4/5 or higher to earn verified progress.</p></div><strong>${status}</strong></div>
      ${locked?'<div class="sql-lock-note">Pass the previous checkpoint to unlock this quiz. You may still read the lessons below as preview material.</div>':`<form class="sql-quiz-form">${cp.questions.map((q,qi)=>`<fieldset><legend>${qi+1}. ${q[0]}</legend>${q[1].map((o,oi)=>`<label><input type="radio" name="q${qi}" value="${oi}"> <span>${o}</span></label>`).join('')}</fieldset>`).join('')}<button type="submit">${s?.passed?'Retake checkpoint':'Submit checkpoint'}</button><div class="sql-quiz-result" aria-live="polite"></div></form>`}
    </section>`;
  }
  function topicHeaderHtml(){
    const passed=passedCount(),pct=Math.round(passed/CHECKPOINTS.length*100),next=Math.min(passed+1,CHECKPOINTS.length);
    return `<div class="sql-topic-progress"><div class="sql-topic-progress-top"><div><span>SQL verified learning</span><strong>${pct}% verified</strong></div><div>${passed}/${CHECKPOINTS.length} checkpoints passed</div></div><div class="sql-topic-track"><i style="width:${pct}%"></i></div><p>${passed===CHECKPOINTS.length?'All SQL checkpoints passed.':`Next goal: Checkpoint ${next}. Reading ahead is allowed, but only passed checkpoints count toward verified progress.`}</p></div>`;
  }
  function bindQuiz(card,index){
    const form=card.querySelector('form'); if(!form)return;
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const cp=CHECKPOINTS[index]; let score=0,answered=0;
      cp.questions.forEach((q,qi)=>{ const checked=form.querySelector(`input[name="q${qi}"]:checked`); if(checked){answered++;if(Number(checked.value)===q[2])score++;} });
      const out=form.querySelector('.sql-quiz-result');
      if(answered<cp.questions.length){out.textContent=`Answer all 5 questions before submitting. ${answered}/5 answered.`;out.className='sql-quiz-result warn';return;}
      const s=state(); s[index]={score,passed:score>=PASS_SCORE,attemptedAt:new Date().toISOString()}; save(s);
      out.textContent=score>=PASS_SCORE?`Passed: ${score}/5. The next lesson is now unlocked.`:`Score: ${score}/5. You need 4/5 to pass. Review Lessons ${index===0?1:CHECKPOINTS[index-1].end+1}–${cp.end} and retry.`;
      out.className='sql-quiz-result '+(score>=PASS_SCORE?'success':'warn');
      card.querySelector('.sql-next-lesson')?.remove();
      if(score>=PASS_SCORE){const b=document.createElement('button');b.type='button';b.className='sql-next-lesson';b.textContent=index<CHECKPOINTS.length-1?'Next Lesson →':'SQL Overview →';b.addEventListener('click',()=>{renderSqlFlow();setTimeout(()=>{const items=[...document.getElementById('lessonsContainer')?.querySelectorAll('.lesson-item')||[]];const nextLesson=index<CHECKPOINTS.length-1?CHECKPOINTS[index].end:0;(items[nextLesson]||document.querySelector('.sql-topic-progress'))?.scrollIntoView({behavior:'smooth',block:'start'})},40)});out.insertAdjacentElement('afterend',b)}
      setTimeout(renderSqlFlow,1200);
    });
  }
  function markLessons(container,items){
    const passed=passedCount(); const creditedThrough=passed?CHECKPOINTS[passed-1].end:3;
    items.forEach((item,idx)=>{
      const lessonNo=idx+1; item.classList.toggle('sql-preview-lesson',lessonNo>creditedThrough);
      item.querySelector('.sql-lesson-state')?.remove();
      const badge=document.createElement('span'); badge.className='sql-lesson-state';
      badge.textContent=lessonNo>creditedThrough?'Preview · not yet credited':'Verified path';
      const heading=item.querySelector('h3,h4,.lesson-title');
      if(heading)heading.insertAdjacentElement('afterend',badge); else item.prepend(badge);
    });
  }
  function renderSqlFlow(){
    if(!currentTopicIsSql())return;
    const container=document.getElementById('lessonsContainer'); if(!container)return;
    if(container.dataset.sqlRendering==='1')return;
    container.dataset.sqlRendering='1';
    container.querySelectorAll('.sql-topic-progress,.sql-checkpoint').forEach(el=>el.remove());
    const lessonItems=[...container.children].filter(el=>el.classList.contains('lesson-item')||!el.classList.contains('sql-checkpoint'));
    if(!lessonItems.length){container.dataset.sqlRendering='0';return;}
    container.insertAdjacentHTML('afterbegin',topicHeaderHtml());
    markLessons(container,lessonItems);
    const passed=passedCount();
    CHECKPOINTS.forEach((cp,index)=>{
      const target=lessonItems[Math.min(cp.end,lessonItems.length)-1]; if(!target)return;
      const holder=document.createElement('div'); holder.innerHTML=quizHtml(cp,index,index>passed);
      const card=holder.firstElementChild; target.insertAdjacentElement('afterend',card); bindQuiz(card,index);
    });
    container.dataset.sqlRendering='0';
  }
  function installStyles(){
    if(document.getElementById('sqlTopicFlowStyles'))return;
    const st=document.createElement('style'); st.id='sqlTopicFlowStyles'; st.textContent=`
      #lessonsContainer .lesson-item,#lessonsContainer .lesson-item p,#lessonsContainer .lesson-item li,#lessonsContainer .lesson-item td{color:#26302a!important}#lessonsContainer .lesson-item h3,#lessonsContainer .lesson-item h4,#lessonsContainer .lesson-item strong{color:#17231d!important}
      .sql-topic-progress{background:#fff;border:1px solid #d9d3ca;border-radius:10px;padding:.9rem 1rem;margin:0 0 1rem}.sql-topic-progress-top{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;font-size:.7rem;color:#596159}.sql-topic-progress-top span{display:block;color:#e95420;font-size:.6rem;font-weight:800;text-transform:uppercase}.sql-topic-progress-top strong{display:block;color:#173b29;font-size:.95rem;margin-top:.12rem}.sql-topic-track{height:8px;background:#ece7df;border-radius:999px;margin:.6rem 0;overflow:hidden}.sql-topic-track i{display:block;height:100%;background:#0f5b37;border-radius:999px}.sql-topic-progress p{font-size:.68rem;color:#555f57;margin:0}
      .sql-lesson-state{display:inline-flex;margin:.25rem 0 .55rem;padding:.2rem .45rem;border-radius:999px;background:#eaf4e7;color:#215a32;font-size:.58rem;font-weight:700}.sql-preview-lesson{border-left:3px solid #d4a34c!important}.sql-preview-lesson .sql-lesson-state{background:#fff1d6;color:#815c18}.sql-preview-lesson:before{content:'Preview lesson';display:block;font-size:.58rem;font-weight:800;text-transform:uppercase;color:#9b6d18;margin-bottom:.3rem}
      .sql-checkpoint{background:#fff;border:1px solid #d9d3ca;border-radius:10px;padding:1rem;margin:1rem 0 1.2rem}.sql-checkpoint.passed{border-color:#9fc7aa;background:#fbfffb}.sql-checkpoint.locked{background:#f6f3ee}.sql-cp-head{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start}.sql-cp-head span{font-size:.58rem;text-transform:uppercase;font-weight:800;color:#e95420}.sql-cp-head h3{font-size:.95rem;color:#173b29;margin:.18rem 0}.sql-cp-head p{font-size:.67rem;color:#596159;margin:0}.sql-cp-head>strong{white-space:nowrap;font-size:.64rem;background:#edf4ec;color:#215a32;padding:.32rem .48rem;border-radius:999px}.sql-lock-note{margin-top:.7rem;padding:.65rem;background:#eeeae4;border-radius:7px;color:#6b6f69;font-size:.68rem}.sql-quiz-form{margin-top:.8rem}.sql-quiz-form fieldset{border:0;border-top:1px solid #eee8df;padding:.7rem 0;margin:0}.sql-quiz-form legend{font-size:.72rem;font-weight:700;color:#202820;margin-bottom:.4rem}.sql-quiz-form label{display:block;padding:.28rem .35rem;margin:.15rem 0;border-radius:6px;color:#303a32;font-size:.68rem;cursor:pointer}.sql-quiz-form label:hover{background:#f7f3ed}.sql-quiz-form button{margin-top:.5rem;background:#e95420;color:#fff;border:0;border-radius:7px;padding:.55rem .8rem;font:700 .68rem Inter,sans-serif;cursor:pointer}.sql-quiz-result{margin-top:.55rem;font-size:.68rem;font-weight:700}.sql-quiz-result.success{color:#1d6b38}.sql-quiz-result.warn{color:#9a4b20}.sql-next-lesson{margin-left:.55rem!important;background:#1fc96b!important;color:#052313!important}
      @media(max-width:760px){.sql-cp-head,.sql-topic-progress-top{flex-direction:column;align-items:flex-start}.sql-cp-head>strong{white-space:normal}}
    `;document.head.appendChild(st);
  }
  function watch(){
    installStyles();
    const title=document.getElementById('topicTitle'),container=document.getElementById('lessonsContainer');
    if(title)new MutationObserver(()=>setTimeout(renderSqlFlow,30)).observe(title,{childList:true,subtree:true,characterData:true});
    if(container)new MutationObserver(m=>{if(container.dataset.sqlRendering!=='1')setTimeout(renderSqlFlow,30)}).observe(container,{childList:true});
    document.addEventListener('click',e=>{if(e.target.closest('.topic-card,.nav-topic-button,.tab-button'))setTimeout(renderSqlFlow,120)});
    setTimeout(renderSqlFlow,500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch);else watch();
})();