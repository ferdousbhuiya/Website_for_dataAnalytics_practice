(function(){
'use strict';
const VERSION='57';
const GOOD_TENANT='eeacb5cb-5370-4358-a96a-a3783c95d422';
const FIXED={
 'HR Analytics: Employee Attrition & Workforce Insights':'47eb1ef8-7876-4553-b7c9-7403ca0e5e67',
 'Sales Performance & Market Insights Dashboard':'1286161d-35b7-4aaa-9962-4a154c172db0'
};
function encodeReport(k){
  const raw=JSON.stringify({k,t:GOOD_TENANT,c:1});
  return btoa(raw).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function patchPowerBiLinks(){
  if(!Array.isArray(window.projectsData))return false;
  let changed=false;
  window.projectsData.forEach(p=>{
    const k=FIXED[p.title];
    if(!k)return;
    const url='https://app.powerbi.com/view?r='+encodeReport(k);
    if(p.embedUrl!==url){p.embedUrl=url;changed=true}
    if(Array.isArray(p.links))p.links.forEach(link=>{if(/live dashboard/i.test(link.text||''))link.url=url});
  });
  if(changed&&typeof window.renderProjects==='function')window.renderProjects();
  return true;
}
function dedupeCardLogos(){
  document.querySelectorAll('#projectsGrid .project-card-item').forEach(card=>{
    const badges=[...card.querySelectorAll('.brand-logo-badge')];
    if(badges.length<=1)return;
    badges.slice(1).forEach(b=>{
      const label=b.getAttribute('aria-label')||b.getAttribute('title')||'Technology';
      b.classList.remove('brand-logo-badge');
      b.removeAttribute('aria-label');
      b.removeAttribute('title');
      b.textContent=label;
    });
  });
}
function run(){patchPowerBiLinks();setTimeout(dedupeCardLogos,20)}
function init(){run();document.addEventListener('click',()=>setTimeout(run,80),true);setInterval(run,1800)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,100));else setTimeout(init,100);
})();