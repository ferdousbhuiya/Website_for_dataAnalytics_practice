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
    document.querySelectorAll('#beginnerSubjectBrowser .subject-card[data-subject]').forEach(card=>{
      const id=card.dataset.subject;
      const keys=id==='python'?['python_setup']:id==='etl'?['etl1','etl2','etl3','etl4']:null;
      if(!keys)return;

      const lessons=count(keys,'lessons');
      const questions=count(keys,'questions');
      const stats=card.querySelector('.subject-copy em');
      if(stats){
        const labels=stats.querySelectorAll('b');
        const lessonLabel=`${lessons} Lessons`;
        const questionLabel=`${questions} Questions`;
        if(labels[0] && labels[0].textContent!==lessonLabel) labels[0].textContent=lessonLabel;
        if(labels[1] && labels[1].textContent!==questionLabel) labels[1].textContent=questionLabel;
      }

      const desc=card.querySelector('.subject-copy small');
      const desired=id==='python'
        ? 'Python setup, data types, functions, loops, files, NumPy, pandas, and analytics foundations.'
        : 'ETL concepts, extraction, validation, transformation, loading, file handling, and reliable workflows.';
      if(desc && desc.textContent!==desired) desc.textContent=desired;
    });
  }

  function install(){
    // Synchronize once when the page is ready. Use a few bounded retries only
    // because the Beginner catalog can be rendered shortly after this script loads.
    // Do not observe our own DOM changes: that previously created an infinite loop.
    const refresh=()=>{syncData();patchCatalog()};
    refresh();
    [80,250,700].forEach(ms=>setTimeout(refresh,ms));

    document.addEventListener('click',e=>{
      if(e.target.closest('.subject-card[data-subject="python"],.subject-card[data-subject="etl"]')) syncData();
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
