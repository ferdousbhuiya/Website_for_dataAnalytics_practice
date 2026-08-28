(function(){
  const globalVars={
    python_setup:'pythonSetupData',
    etl1:'etl1Data',etl2:'etl2Data',etl3:'etl3Data',etl4:'etl4Data'
  };

  function pythonSource(){
    // Prefer the dedicated enriched Beginner Python course. If an older cached
    // python_setup.js has not exposed it yet, use the already-loaded Python
    // course as a safe non-empty fallback instead of rendering 0 lessons.
    return window.pythonSetupData || window.pythonData || window.topicsData?.python_setup || window.topicsData?.python || null;
  }

  function currentData(key){
    if(key==='python_setup') return pythonSource();
    const g=globalVars[key];
    return (g&&window[g]) || window.topicsData?.[key] || null;
  }

  function syncData(){
    window.topicsData=window.topicsData||{};

    const py=pythonSource();
    if(py) window.topicsData.python_setup=py;

    ['etl1','etl2','etl3','etl4'].forEach(key=>{
      const g=globalVars[key];
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

  function refresh(){
    syncData();
    patchCatalog();
    document.dispatchEvent(new CustomEvent('dataprep-beginner-data-synced'));
  }

  function install(){
    refresh();
    [50,150,350,800,1500].forEach(ms=>setTimeout(refresh,ms));

    document.addEventListener('click',e=>{
      if(e.target.closest('.subject-card[data-subject="python"],.subject-card[data-subject="etl"]')) refresh();
    },true);
  }

  // Run immediately as well as at DOM ready so subject shells loaded directly
  // after this file always receive a populated Python data source.
  syncData();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
