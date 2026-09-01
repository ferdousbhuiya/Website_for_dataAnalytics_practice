(function(){
'use strict';
const LOCAL_ICON='powerbi-icon.svg?v=65';
function fixPowerBiIcons(){
  document.querySelectorAll('.brand-logo-badge[aria-label="Power BI"] img, .brand-logo-badge[title="Power BI"] img').forEach(img=>{
    if(!img.getAttribute('src')||!img.getAttribute('src').includes('powerbi-icon.svg')) img.setAttribute('src',LOCAL_ICON);
    img.alt='Power BI logo';
    img.onerror=function(){this.onerror=null;this.closest('.brand-logo-badge')?.classList.add('powerbi-icon-fallback');this.style.display='none'};
  });
}
function styles(){
  if(document.getElementById('powerBiIconFixV65Styles'))return;
  const s=document.createElement('style');
  s.id='powerBiIconFixV65Styles';
  s.textContent='.powerbi-icon-fallback::after{content:"PBI";font:800 10px/1 Inter,sans-serif;color:#f2c811;letter-spacing:.2px}';
  document.head.appendChild(s);
}
function run(){styles();fixPowerBiIcons()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,80));else setTimeout(run,80);
document.addEventListener('click',()=>setTimeout(run,100),true);
setInterval(run,1800);
})();
