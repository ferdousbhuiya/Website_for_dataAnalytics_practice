// DataPrep Pro preview bootstrap v4: preserve original preview logic, then load enhancement layer.
(function(){
  function loadCss(href,id){
    if(document.getElementById(id)) return;
    var l=document.createElement('link'); l.id=id; l.rel='stylesheet'; l.href=href+'?v=4'; document.head.appendChild(l);
  }
  function loadScript(src,attr){
    if(document.querySelector('script['+attr+']')) return;
    var s=document.createElement('script'); s.src=src+'?v=4'; s.async=false; s.setAttribute(attr,'1'); document.head.appendChild(s);
  }
  // Run the original preview bootstrap exactly as before.
  loadScript('script-core.js','data-preview-core');
  // Load enhancement CSS immediately.
  loadCss('global-dark-theme.css','globalDarkTheme');
  loadCss('ui-polish.css','uiPolishTheme');
  loadCss('lesson-contrast.css','lessonContrastTheme');
  loadCss('beginner-checkpoint-engine.css','beginnerCheckpointTheme');
  loadCss('learning-experience-enhancements.css','learningExperienceTheme');
  loadCss('guided-practice-engine.css','guidedPracticeTheme');
  loadCss('practice-system-v3.css','practiceSystemV3Theme');
  loadCss('subject-tabs-v1.css','subjectTabsV1Theme');
  // The original bootstrap asynchronously loads app-script.js. Give it time to initialize,
  // then attach the enhancement layers that observe the rendered subject shells.
  setTimeout(function(){
    loadScript('excel-subject-shell.js','data-excel-subject-shell');
    loadScript('excel-dark-theme.js','data-excel-dark-theme');
    loadScript('beginner-checkpoint-engine.js','data-beginner-checkpoint-engine');
    loadScript('dedicated-subject-shell.js','data-dedicated-subject-shell');
    loadScript('legacy-subject-readability.js','data-legacy-subject-readability');
    loadScript('stage-focus-flow.js','data-stage-focus-flow');
    loadScript('ui-polish.js','data-ui-polish');
    loadScript('learning-experience-v2.js','data-learning-experience-v2');
    loadScript('guided-practice-engine.js','data-guided-practice-engine');
    loadScript('practice-system-v3.js','data-practice-system-v3');
    loadScript('subject-tabs-v1.js','data-subject-tabs-v1');
  },500);
})();
