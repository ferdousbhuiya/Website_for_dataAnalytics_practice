(function(){
  const globalVars={python_setup:'pythonSetupData',etl1:'etl1Data',etl2:'etl2Data',etl3:'etl3Data',etl4:'etl4Data'};
  const etlKeys=['etl1','etl2','etl3','etl4'];

  function looksLikePython(data){
    if(!data)return false;
    const title=String(data.title||'').toLowerCase();
    const sample=(data.lessons||[]).slice(0,3).map(x=>String(x.title||'')).join(' ').toLowerCase();
    return title.includes('python beginner') || sample.includes('your first python') || sample.includes('variables, data types');
  }
  function looksLikeEtl(data){
    if(!data)return false;
    const title=String(data.title||'').toLowerCase();
    const sample=(data.lessons||[]).slice(0,3).map(x=>String(x.title||'')+' '+String(x.content||'')).join(' ').toLowerCase();
    return title.includes('etl') || sample.includes('extract') || sample.includes('transform') || sample.includes('pipeline');
  }
  function pythonSource(){
    const candidates=[window.pythonSetupData,window.pythonData,window.topicsData?.python_setup,window.topicsData?.python];
    return candidates.find(x=>x&&Array.isArray(x.lessons)&&x.lessons.length&&!looksLikeEtl(x))||null;
  }
  function etlSource(key){
    const globalName=globalVars[key];
    const direct=globalName&&window[globalName];
    if(direct&&Array.isArray(direct.lessons)&&direct.lessons.length&&looksLikeEtl(direct)&&!looksLikePython(direct))return direct;
    const existing=window.topicsData?.[key];
    if(existing&&Array.isArray(existing.lessons)&&existing.lessons.length&&looksLikeEtl(existing)&&!looksLikePython(existing))return existing;
    return null;
  }
  function currentData(key){return key==='python_setup'?pythonSource():etlSource(key)}
  function syncData(){
    window.topicsData=window.topicsData||{};
    const py=pythonSource();
    if(py)window.topicsData.python_setup=py;
    etlKeys.forEach(key=>{
      const etl=etlSource(key);
      if(etl)window.topicsData[key]=etl;
      else if(looksLikePython(window.topicsData[key]))delete window.topicsData[key];
    });
    window.__dataPrepBeginnerSources={
      python:!!window.topicsData.python_setup,
      etl:etlKeys.map(k=>({key:k,ready:!!window.topicsData[k],title:window.topicsData[k]?.title||''}))
    };
  }
  function count(keys,field){return keys.reduce((n,key)=>n+(currentData(key)?.[field]?.length||0),0)}
  function patchCatalog(){
    syncData();
    document.querySelectorAll('#beginnerSubjectBrowser .subject-card[data-subject]').forEach(card=>{
      const id=card.dataset.subject;
      const keys=id==='python'?['python_setup']:id==='etl'?etlKeys:null;
      if(!keys)return;
      const stats=card.querySelector('.subject-copy em');
      if(stats){const labels=stats.querySelectorAll('b');if(labels[0])labels[0].textContent=`${count(keys,'lessons')} Lessons`;if(labels[1])labels[1].textContent=`${count(keys,'questions')} Questions`;}
      const desc=card.querySelector('.subject-copy small');
      if(desc)desc.textContent=id==='python'?'Python setup, data types, functions, loops, files, NumPy, pandas, and analytics foundations.':'ETL concepts, extraction, validation, transformation, loading, file handling, and reliable workflows.';
    });
  }
  function refresh(){syncData();patchCatalog();document.dispatchEvent(new CustomEvent('dataprep-beginner-data-synced'))}
  function install(){refresh();[50,150,350,800,1500].forEach(ms=>setTimeout(refresh,ms));document.addEventListener('click',e=>{if(e.target.closest('.subject-card[data-subject="python"],.subject-card[data-subject="etl"]'))refresh()},true)}
  syncData();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
