(function(){
 const STORE='dataprepIntermediateProgressV2';
 const TOPIC_SUBJECT={python:'python',experiment_design:'experiments',ab_tests:'experiments',product_analytics:'product',pandas_project:'projects',sql_project:'projects',viz_project:'projects',product_project:'projects',etl5:'engineering',etl6:'engineering',etl8:'engineering',etl9:'engineering',etl10:'engineering',machine_learning:'modeling',statistical_modeling:'modeling'};
 let currentSubject=null;
 function load(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){return{}}}
 function save(p){localStorage.setItem(STORE,JSON.stringify(p))}
 function activeModule(shell){const buttons=[...shell.querySelectorAll('.im-module-progress [data-jump]')],active=buttons.findIndex(b=>b.classList.contains('active'));return active<0?0:active}
 function rec(subject,module){const p=load();p[subject]=p[subject]||{};p[subject]['module'+module]=p[subject]['module'+module]||{};return [p,p[subject]['module'+module]]}
 function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
 function enhance(){
  const shell=document.getElementById('imLearningShell');if(!shell||shell.style.display==='none'||!currentSubject)return;
  const module=activeModule(shell),[p,r]=rec(currentSubject,module);if(!r.started){r.started=true;save(p)}
  const prevPassed=module===0||!!load()[currentSubject]?.['module'+(module-1)]?.passed;
  const cp=shell.querySelector('.im-checkpoint');if(cp){cp.disabled=!prevPassed;cp.textContent=prevPassed?'Checkpoint · 5 questions · pass 4/5':'Checkpoint locked · pass the previous module first';}
  const applied=shell.querySelector('[data-applied]');if(applied){applied.disabled=!r.passed;applied.textContent=r.applied?'✓ Applied practice recorded':r.passed?'Mark applied practice complete':'Pass checkpoint to unlock applied practice';}
  const card=shell.querySelector('.im-practice-card');if(card&&!card.dataset.auditCompleted){card.dataset.auditCompleted='1';const actions=card.querySelector('.im-practice-actions'),ta=card.querySelector('textarea'),fb=card.querySelector('.im-feedback');if(actions&&ta&&fb){
    if(!actions.querySelector('[data-audit-check]')){const b=document.createElement('button');b.type='button';b.dataset.auditCheck='1';b.textContent='Check Answer';b.onclick=()=>{const v=ta.value.trim(),low=v.toLowerCase(),hits=['business','grain','validation','check','output','assumption','metric','decision'].filter(k=>low.includes(k)).length;fb.innerHTML=v.length>120&&hits>=2?'<strong>Good coverage.</strong> Now make the validation step measurable and state the business implication.':'<strong>Develop it further.</strong> Include the decision/question, data grain or inputs, method, validation and expected output.'};actions.insertBefore(b,actions.querySelector('[data-answer]')||null)}
    if(!actions.querySelector('[data-audit-preview]')){const b=document.createElement('button');b.type='button';b.dataset.auditPreview='1';b.textContent='Run / Preview';b.onclick=()=>{fb.innerHTML=ta.value.trim()?'<strong>Reasoning preview:</strong><pre>'+esc(ta.value)+'</pre><p>This previews your analytical approach; external software is not executed here.</p>':'Write your approach first, then preview it.'};actions.insertBefore(b,actions.querySelector('[data-answer]')||null)}
   }}
  if(card&&!shell.querySelector('.im-audit-independent')){const sec=document.createElement('section');sec.className='im-practice-card im-audit-independent';sec.innerHTML='<h3>Independent Challenge</h3><p>Change the dataset, stakeholder constraint, segment, time window, or business assumption. Solve the problem again without using the example answer, and state how you would validate the result.</p><textarea class="im-independent" placeholder="My independent solution...\nAssumptions:\nValidation:\nRecommendation:"></textarea>';card.insertAdjacentElement('afterend',sec)}
  if(!shell.querySelector('.im-review-section')){const lessons=[...shell.querySelectorAll('.im-lesson h3')].map(x=>x.textContent.trim()).filter(Boolean);if(lessons.length){const sec=document.createElement('section');sec.className='im-review-section im-audit-review';sec.innerHTML='<h3>Review Questions</h3><ol>'+lessons.map(t=>'<li>When would you use <strong>'+t+'</strong>, what could go wrong, and how would you validate the result before making a business recommendation?</li>').join('')+'</ol>';const checkpoint=shell.querySelector('.im-checkpoint');checkpoint?.insertAdjacentElement('beforebegin',sec)}}
 }
 function topicFromStageClick(target){const b=target.closest('#intermediateStageBrowser [data-topic]');return b?.dataset.topic||null}
 document.addEventListener('click',e=>{
  const topic=topicFromStageClick(e.target);if(topic&&TOPIC_SUBJECT[topic]){currentSubject=TOPIC_SUBJECT[topic];setTimeout(enhance,0);return}
  const shell=e.target.closest('#imLearningShell');if(shell){const closing=e.target.closest('.im-close');setTimeout(()=>{enhance();if(closing)window.refreshIntermediateStage?.()},0)}
 },true);
 document.addEventListener('dataprep-intermediate-rendered',()=>setTimeout(enhance,0));
})();