(function(){
  'use strict';
  const VERSION='37';
  const statePattern=/(progress|checkpoint|score|verified|applied|completed)/i;
  const namespacePattern=/(dataprep|dataanalytics)/i;
  function stateKeys(){
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k&&namespacePattern.test(k)&&statePattern.test(k)) keys.push(k);
    }
    return keys.sort();
  }
  function closeTransientViews(){
    try{ if(typeof window.closeLearning==='function') window.closeLearning(); }catch(_){ }
    try{ if(typeof window.closeAbout==='function') window.closeAbout(); }catch(_){ }
    try{ if(typeof window.closeProjects==='function') window.closeProjects(); }catch(_){ }
    document.querySelectorAll('.learning-view').forEach(v=>v.classList.add('hidden'));
  }
  function showMain(){
    document.querySelector('main')?.classList.remove('hidden');
    const main=document.querySelector('main'); if(main) main.style.display='';
  }
  function goTo(id){
    closeTransientViews(); showMain();
    const el=document.getElementById(id);
    if(el) requestAnimationFrame(()=>el.scrollIntoView({behavior:'smooth',block:'start'}));
  }
  function bindNav(){
    const map={home:'home',path:'path',topics:'topics',calculator:'calculator',progress:'progress'};
    document.querySelectorAll('.navbar a[href^="#"], .progress-cta[href^="#"]').forEach(a=>{
      const id=(a.getAttribute('href')||'').slice(1);
      if(!map[id]||a.dataset.functionalGuard==='1') return;
      a.dataset.functionalGuard='1';
      a.addEventListener('click',e=>{e.preventDefault();goTo(map[id]);});
    });
  }
  function saveDownload(filename,text){
    const blob=new Blob([text],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),500);
  }
  function bindProgressControls(){
    const exportOld=document.getElementById('exportProgressButton');
    if(exportOld){
      const b=exportOld.cloneNode(true); exportOld.replaceWith(b);
      b.addEventListener('click',()=>{
        const data={format:'dataprep-progress-backup',version:VERSION,exportedAt:new Date().toISOString(),activePin:localStorage.getItem('dataAnalyticsActivePin')||'',state:{}};
        stateKeys().forEach(k=>data.state[k]=localStorage.getItem(k));
        saveDownload('dataprep-progress-backup.json',JSON.stringify(data,null,2));
      });
    }
    const input=document.getElementById('importProgressInput');
    const importOld=document.getElementById('importProgressButton');
    if(importOld&&input){
      const b=importOld.cloneNode(true); importOld.replaceWith(b);
      b.addEventListener('click',()=>{input.value='';input.click();});
      input.onchange=async()=>{
        const file=input.files&&input.files[0]; if(!file)return;
        try{
          const parsed=JSON.parse(await file.text());
          if(parsed&&parsed.format==='dataprep-progress-backup'&&parsed.state&&typeof parsed.state==='object'){
            Object.entries(parsed.state).forEach(([k,v])=>{if(namespacePattern.test(k)&&statePattern.test(k)&&typeof v==='string')localStorage.setItem(k,v)});
            if(parsed.activePin) localStorage.setItem('dataAnalyticsActivePin',String(parsed.activePin));
          }else if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed)){
            const pin=localStorage.getItem('dataAnalyticsActivePin')||'default';
            localStorage.setItem('dataAnalyticsProgress_'+pin,JSON.stringify(parsed));
            localStorage.setItem('dataAnalyticsProgress',JSON.stringify(parsed));
          }else throw new Error('Invalid progress file');
          alert('Progress imported successfully. The page will reload to refresh every progress view.'); location.reload();
        }catch(err){alert('Could not import this progress file. Please choose a valid DataPrep Pro JSON backup.');}
      };
    }
    const resetOld=document.getElementById('resetProgressButton');
    if(resetOld){
      const b=resetOld.cloneNode(true); resetOld.replaceWith(b);
      b.addEventListener('click',()=>{
        if(!confirm('Reset all DataPrep Pro learning progress, checkpoint scores, and applied-practice status on this device?'))return;
        stateKeys().forEach(k=>localStorage.removeItem(k));
        localStorage.removeItem('dataAnalyticsProgress');
        alert('All learning progress and checkpoint scores have been reset.'); location.reload();
      });
    }
  }
  function audit(){
    const checks={
      home:!!document.querySelector('.navbar a[href="#home"]'),
      learningPath:!!document.querySelector('.navbar a[href="#path"]'),
      topics:!!document.querySelector('.navbar a[href="#topics"]'),
      tools:!!document.querySelector('.navbar a[href="#calculator"]'),
      projects:!!document.querySelector('.navbar a[href="#projects"]'),
      progress:!!document.querySelector('.navbar a[href="#progress"]'),
      about:!!document.querySelector('.navbar a[href="#about"]'),
      myProgress:!!document.querySelector('.progress-cta'),
      exportProgress:!!document.getElementById('exportProgressButton'),
      importProgress:!!document.getElementById('importProgressButton')&&!!document.getElementById('importProgressInput'),
      resetProgress:!!document.getElementById('resetProgressButton'),
      pinSet:!!document.getElementById('setPinButton'),
      pinSwitch:!!document.getElementById('switchPinButton'),
      pinClear:!!document.getElementById('clearPinButton')
    };
    window.__dataprepFunctionalAudit={version:VERSION,checks,stateKeys:stateKeys()};
    const missing=Object.entries(checks).filter(([,v])=>!v).map(([k])=>k);
    if(missing.length) console.warn('DataPrep functional audit missing controls:',missing); else console.info('DataPrep functional audit: all primary controls present.');
  }
  function init(){bindNav();bindProgressControls();audit();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0)); else setTimeout(init,0);
})();