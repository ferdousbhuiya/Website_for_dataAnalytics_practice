(function(){
'use strict';
const VERSION='56';
function cloudUser(){return window.dataPrepCloud?.getUser?.()||null}
function pctText(el,v){if(el)el.textContent=v+'%'}
function zeroGuestDashboard(){
  if(cloudUser())return;
  document.querySelectorAll('#learnerDashboard .level-progress-card').forEach(card=>{
    pctText(card.querySelector('.level-progress-top span'),0);
    const bar=card.querySelector('.level-progress-track i');if(bar)bar.style.width='0%';
    const note=card.querySelector('small');
    const level=card.dataset.level||'';const totals={Beginner:48,Intermediate:52,Advanced:42};
    if(note)note.textContent=`0 of ${totals[level]||0} modules/checkpoints verified`;
  });
  const evidence=document.querySelectorAll('#learnerDashboard .learning-evidence-card, #learnerDashboard .evidence-card');
  evidence.forEach(card=>{pctText(card.querySelector('.evidence-percent,.progress-percent,strong:last-child'),0);const bar=card.querySelector('.progress-fill,i');if(bar)bar.style.width='0%'});
  const dash=document.getElementById('learnerDashboard');
  if(dash){
    dash.querySelectorAll('[class*="evidence"]').forEach(card=>{
      const txt=(card.textContent||'').toLowerCase();
      if(/learning progress|verified progress|applied practice/.test(txt)){
        card.querySelectorAll('strong,b').forEach(x=>{if(/%/.test(x.textContent||''))x.textContent='0%'});
        card.querySelectorAll('i,.progress-fill').forEach(x=>x.style.width='0%');
        card.querySelectorAll('small').forEach(x=>{x.textContent=x.textContent.replace(/^\d+\//,'0/')});
      }
    });
  }
  const ids={progressCompleted:'0',progressPercent:'0%'};Object.entries(ids).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=v});
  const fill=document.getElementById('overallProgressFill');if(fill)fill.style.width='0%';
  const real=document.getElementById('realProgressInsights');
  if(real){
    real.querySelector('.pi-overall strong')&&(real.querySelector('.pi-overall strong').textContent='0%');
    real.querySelectorAll('.pi-overall-bar i,.pi-bar i').forEach(x=>x.style.width='0%');
    real.querySelectorAll('.pi-stage-head em').forEach(x=>x.textContent='0% verified');
    real.querySelectorAll('.pi-counts b').forEach(x=>x.textContent=x.textContent.replace(/^\d+\//,'0/'));
    const stats=real.querySelectorAll('.pi-overall-stats b');stats.forEach(x=>x.textContent='0');
  }
  const cont=document.getElementById('continueTopicBtn')||document.querySelector('.dashboard-continue');if(cont)cont.style.display='none';
}
function restoreSignedUi(){const cont=document.getElementById('continueTopicBtn')||document.querySelector('.dashboard-continue');if(cont&&cloudUser())cont.style.display=''}
function fixBackButtons(){
  ['aboutView','projectsView'].forEach(id=>{
    const view=document.getElementById(id);if(!view)return;
    const btn=view.querySelector('.back-button');const head=view.querySelector('.learning-header');
    if(btn&&head&&btn.nextElementSibling!==head){head.parentNode.insertBefore(btn,head)}
  });
}
const logos={
 python:{src:'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/python.svg',label:'Python'},
 tableau:{src:'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tableau.svg',label:'Tableau'},
 'power bi':{src:'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/powerbi.svg',label:'Power BI'},
 powerbi:{src:'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/powerbi.svg',label:'Power BI'},
 sql:{src:'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/postgresql.svg',label:'SQL'},
 react:{src:'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/react.svg',label:'React'},
 supabase:{src:'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/supabase.svg',label:'Supabase'}
};
function logoFor(text){text=String(text||'').toLowerCase();for(const [k,v] of Object.entries(logos))if(text.includes(k))return v;return null}
function decorateProjectLogos(){
  document.querySelectorAll('#projectsGrid .project-card-item').forEach(card=>{
    if(card.dataset.logoV56==='1')return;
    const candidates=[...card.querySelectorAll('span,small,.project-tool,.project-tech,.tool-badge,.tag')];
    candidates.forEach(el=>{
      const info=logoFor(el.textContent);if(!info||el.querySelector('img'))return;
      const original=el.textContent.trim();
      if(!/^(python|tableau|power\s?bi|sql|react|supabase)$/i.test(original))return;
      el.classList.add('brand-logo-badge');el.setAttribute('title',info.label);el.setAttribute('aria-label',info.label);
      el.innerHTML=`<img src="${info.src}" alt="${info.label} logo">`;
    });
    card.dataset.logoV56='1';
  });
}
function styles(){if(document.getElementById('v56PolishStyles'))return;const s=document.createElement('style');s.id='v56PolishStyles';s.textContent=`
#aboutView .learning-container,#projectsView .learning-container{padding-top:18px!important}
#aboutView .back-button,#projectsView .back-button{position:relative!important;inset:auto!important;display:inline-flex!important;align-items:center!important;width:auto!important;margin:0 0 18px 0!important;padding:9px 14px!important;border-radius:9px!important;background:#0b2234!important;border:1px solid #31506a!important;color:#e8f2f8!important;z-index:2!important}
#aboutView .back-button:hover,#projectsView .back-button:hover{border-color:#42df8a!important;color:#42df8a!important}
.brand-logo-badge{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:34px!important;height:32px!important;padding:5px 8px!important;background:#f4f7f9!important;border:1px solid #d9e1e7!important;border-radius:8px!important;vertical-align:middle!important}
.brand-logo-badge img{width:22px!important;height:22px!important;display:block!important;object-fit:contain!important}
@media(max-width:760px){#aboutView .learning-container,#projectsView .learning-container{padding-top:12px!important}.brand-logo-badge{height:30px!important;min-width:32px!important}}
`;document.head.appendChild(s)}
function run(){styles();fixBackButtons();decorateProjectLogos();if(cloudUser())restoreSignedUi();else zeroGuestDashboard()}
function bindAuth(){const c=window.dataPrepSupabase;if(!c)return false;c.auth.onAuthStateChange((event,session)=>{setTimeout(()=>{if(session?.user)restoreSignedUi();else zeroGuestDashboard();run()},40)});return true}
function init(){run();let n=0;(function wait(){if(bindAuth())return;if(n++<80)setTimeout(wait,100)})();document.addEventListener('dataprep-progress-synced',()=>setTimeout(run,40));document.addEventListener('click',()=>setTimeout(run,80),true);setInterval(run,2000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,80));else setTimeout(init,80);
})();