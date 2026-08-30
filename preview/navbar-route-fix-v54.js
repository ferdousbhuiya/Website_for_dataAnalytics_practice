(function(){
'use strict';
const VERSION='54';
const MAIN_IDS=['home','path','calculator','progress'];
function hideModernLearning(){
  try{window.closeLearning?.()}catch(_){}
  try{window.closeStageCurriculum?.()}catch(_){}
  document.body.classList.remove('dpx-open','dp-subject-open','stage-focus-active','intermediate-focus','advanced-focus');
  const direct=['dpExcelShell','dpSubjectShell','learningView'];
  direct.forEach(id=>{const el=document.getElementById(id);if(el)el.classList.add('hidden')});
  ['beginnerSubjectBrowser','intermediateStageBrowser','advancedStageBrowser'].forEach(id=>{
    const el=document.getElementById(id);if(el){el.style.display='none';el.classList.add('hidden')}
  });
  document.querySelectorAll('.learning-view').forEach(el=>el.classList.add('hidden'));
  const main=document.querySelector('main');if(main){main.classList.remove('hidden');main.style.display=''}
  const path=document.getElementById('path'),topics=document.getElementById('topics');
  path?.classList.remove('stage-focus-hidden');topics?.classList.remove('stage-focus-visible');
}
function openMain(id){
  hideModernLearning();
  if(id==='path') document.getElementById('path')?.classList.remove('stage-focus-hidden');
  const target=document.getElementById(id);
  if(target) requestAnimationFrame(()=>target.scrollIntoView({behavior:'smooth',block:'start'}));
}
function active(id){document.querySelectorAll('.navbar .nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id))}
function bind(){
  document.querySelectorAll('.navbar a[href^="#"]').forEach(a=>{
    const id=(a.getAttribute('href')||'').slice(1);
    if(!['home','path','calculator','projects','progress','about'].includes(id)||a.dataset.v54==='1')return;
    a.dataset.v54='1';
    a.addEventListener('click',e=>{
      e.preventDefault();e.stopImmediatePropagation();
      if(MAIN_IDS.includes(id)){openMain(id);active(id);return}
      hideModernLearning();
      if(id==='projects'){try{window.openProjects?.(e)}catch(_){};active('projects');return}
      if(id==='about'){try{window.openAbout?.(e)}catch(_){};active('about');return}
    },true);
  });
}
function styles(){if(document.getElementById('v54NavRouteStyles'))return;const s=document.createElement('style');s.id='v54NavRouteStyles';s.textContent='.navbar{pointer-events:auto!important}.navbar .nav-content,.navbar .nav-links,.navbar .nav-link,#dpAccountBtn{pointer-events:auto!important}';document.head.appendChild(s)}
function init(){styles();bind();new MutationObserver(bind).observe(document.querySelector('.navbar')||document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,50));else setTimeout(init,50);
})();