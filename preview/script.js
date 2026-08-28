// DataPrep Pro preview bootstrap v5: run the proven core first, then attach enhancements only after the curriculum is ready.
(function(){
  var VERSION='5';
  function loadCss(href,id){
    if(document.getElementById(id)) return;
    var l=document.createElement('link');
    l.id=id; l.rel='stylesheet'; l.href=href+'?v='+VERSION;
    document.head.appendChild(l);
  }
  function loadScript(src,attr){
    return new Promise(function(resolve){
      var existing=document.querySelector('script['+attr+']');
      if(existing){ resolve(); return; }
      var s=document.createElement('script');
      s.src=src+'?v='+VERSION;
      s.async=false;
      s.setAttribute(attr,'1');
      s.onload=function(){ resolve(); };
      s.onerror=function(){ console.error('DataPrep enhancement failed to load:',src); resolve(); };
      document.head.appendChild(s);
    });
  }
  function curriculumReady(){
    return !!(window.topicsData && window.topicRegistry && document.getElementById('topicsGrid') && document.querySelector('#topicsGrid .topic-card'));
  }
  function waitForCurriculum(){
    return new Promise(function(resolve){
      var tries=0;
      (function check(){
        if(curriculumReady() || tries++>120){ resolve(); return; }
        setTimeout(check,100);
      })();
    });
  }
  [
    ['global-dark-theme.css','globalDarkTheme'],
    ['ui-polish.css','uiPolishTheme'],
    ['lesson-contrast.css','lessonContrastTheme'],
    ['beginner-checkpoint-engine.css','beginnerCheckpointTheme'],
    ['learning-experience-enhancements.css','learningExperienceTheme'],
    ['guided-practice-engine.css','guidedPracticeTheme'],
    ['practice-system-v3.css','practiceSystemV3Theme'],
    ['subject-tabs-v1.css','subjectTabsV1Theme']
  ].forEach(function(x){loadCss(x[0],x[1]);});

  loadScript('script-core.js','data-preview-core').then(waitForCurriculum).then(function(){
    document.documentElement.dataset.dataprepEnhancements='v'+VERSION;
    var queue=[
      ['excel-subject-shell.js','data-excel-subject-shell'],
      ['excel-dark-theme.js','data-excel-dark-theme'],
      ['beginner-checkpoint-engine.js','data-beginner-checkpoint-engine'],
      ['dedicated-subject-shell.js','data-dedicated-subject-shell'],
      ['legacy-subject-readability.js','data-legacy-subject-readability'],
      ['stage-focus-flow.js','data-stage-focus-flow'],
      ['ui-polish.js','data-ui-polish'],
      ['learning-experience-v2.js','data-learning-experience-v2'],
      ['guided-practice-engine.js','data-guided-practice-engine'],
      ['practice-system-v3.js','data-practice-system-v3'],
      ['subject-tabs-v1.js','data-subject-tabs-v1']
    ];
    return queue.reduce(function(p,item){return p.then(function(){return loadScript(item[0],item[1]);});},Promise.resolve());
  }).then(function(){
    document.documentElement.dataset.dataprepEnhancementsReady='true';
    document.dispatchEvent(new CustomEvent('dataprep-enhancements-ready'));
  });
})();
