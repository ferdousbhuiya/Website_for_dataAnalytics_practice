(function(){
  const globalVars={
    python_setup:'pythonSetupData',
    etl1:'etl1Data',etl2:'etl2Data',etl3:'etl3Data',etl4:'etl4Data'
  };

  function currentData(key){
    const g=globalVars[key];
    return (g&&window[g]) || window.topicsData?.[key] || null;
  }

  function syncData(){
    window.topicsData=window.topicsData||{};
    Object.entries(globalVars).forEach(([key,g])=>{
      if(window[g]) window.topicsData[key]=window[g];
    });
  }

  function count(keys,field){
    return keys.reduce((n,key)=>n+(currentData(key)?.[field]?.length||0),0);
  }

  function patchCatalog(){
    syncData();
    const cards=document.querySelectorAll('#beginnerSubjectBrowser .subject-card[data-subject]');
    cards.forEach(card=>{
      const id=card.dataset.subject;
      let keys=null;
      if(id==='python') keys=['python_setup'];
      if(id==='etl') keys=['etl1','etl2','etl3','etl4'];
      if(!keys)return;
      const lessons=count(keys,'lessons');
      const questions=count(keys,'questions');
      const stats=card.querySelector('.subject-copy em');
      if(stats) stats.innerHTML=`<b>${lessons} Lessons</b><i>•</i><b>${questions} Questions</b>`;
      const desc=card.querySelector('.subject-copy small');
      if(id==='python'&&desc) desc.textContent='Python setup, data types, functions, loops, files, NumPy, pandas, and analytics foundations.';
      if(id==='etl'&&desc) desc.textContent='ETL concepts, extraction, validation, transformation, loading, file handling, and reliable workflows.';
    });
  }

  function refreshBeginnerBrowser(){
    syncData();
    const sel=document.getElementById('difficultyFilter');
    if(!sel||sel.value!=='Beginner')return;
    try{
      const old=sel.value;
      sel.value='all';
      sel.dispatchEvent(new Event('change',{bubbles:true}));
      sel.value=old;
      sel.dispatchEvent(new Event('change',{bubbles:true}));
    }catch(_){ }
    setTimeout(patchCatalog,40);
  }

  function install(){
    syncData();
    patchCatalog();
    setTimeout(refreshBeginnerBrowser,80);
    const root=document.getElementById('topics')||document.body;
    new MutationObserver(()=>{syncData();patchCatalog()}).observe(root,{childList:true,subtree:true});
    document.addEventListener('click',e=>{
      if(e.target.closest('.subject-card[data-subject="python"],.subject-card[data-subject="etl"]')) syncData();
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
  else install();
})();