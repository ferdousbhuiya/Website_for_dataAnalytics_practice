(function(){
  function enhance(){
    document.querySelectorAll('.sql-quiz-form').forEach(form=>{
      if(form.dataset.choiceUi==='1')return;
      form.dataset.choiceUi='1';
      form.querySelectorAll('label').forEach(label=>{
        const input=label.querySelector('input[type="radio"]');
        if(!input)return;
        label.classList.toggle('choice-selected',input.checked);
        input.addEventListener('change',()=>{
          const fieldset=label.closest('fieldset');
          fieldset?.querySelectorAll('label').forEach(l=>l.classList.remove('choice-selected'));
          label.classList.add('choice-selected');
        });
        label.addEventListener('click',()=>setTimeout(()=>{
          const fieldset=label.closest('fieldset');
          fieldset?.querySelectorAll('label').forEach(l=>l.classList.toggle('choice-selected',l.querySelector('input')?.checked));
        },0));
      });
    });
  }
  function loadScript(src,attr){
    if(document.querySelector(`script[${attr}]`))return;
    const s=document.createElement('script');
    s.src=src;
    s.async=false;
    s.setAttribute(attr,'1');
    document.head.appendChild(s);
  }
  function loadStyle(href,id){
    if(document.getElementById(id))return;
    const l=document.createElement('link');
    l.id=id;
    l.rel='stylesheet';
    l.href=href;
    document.head.appendChild(l);
  }
  function install(){
    loadStyle('global-dark-theme.css','globalDarkTheme');
    loadStyle('ui-polish.css','uiPolishTheme');
    loadStyle('lesson-contrast.css','lessonContrastTheme');
    loadStyle('beginner-checkpoint-engine.css','beginnerCheckpointTheme');
    loadStyle('learning-experience-enhancements.css','learningExperienceTheme');
    loadStyle('guided-practice-engine.css','guidedPracticeTheme');
    loadStyle('subject-tabs-and-layout-fix.css','subjectTabsLayoutFix');
    if(!document.getElementById('quizChoiceVisualStyles')){
      const style=document.createElement('style');
      style.id='quizChoiceVisualStyles';
      style.textContent=`
        .sql-quiz-form fieldset{padding:.75rem 0!important}.sql-quiz-form legend{margin-bottom:.55rem!important}.sql-quiz-form label{display:flex!important;align-items:center!important;gap:.55rem!important;min-height:42px!important;padding:.55rem .65rem!important;margin:.28rem 0!important;border:1px solid #31506a!important;border-radius:8px!important;background:#0b2134!important;color:#e7f0f6!important;transition:border-color .15s,background .15s,box-shadow .15s!important}.sql-quiz-form label:hover{background:#102a40!important;border-color:#5e85ff!important}.sql-quiz-form input[type="radio"]{appearance:auto!important;-webkit-appearance:radio!important;width:17px!important;height:17px!important;min-width:17px!important;margin:0!important;accent-color:#56a6ff!important;opacity:1!important;visibility:visible!important;position:static!important}.sql-quiz-form label.choice-selected,.sql-quiz-form label:has(input[type="radio"]:checked){border-color:#6b86ff!important;background:#14284c!important;box-shadow:0 0 0 1px rgba(107,134,255,.18)!important}.sql-quiz-form label.choice-selected span,.sql-quiz-form label:has(input[type="radio"]:checked) span{color:#fff!important;font-weight:700!important}.sql-quiz-form button[type="submit"]{min-height:40px!important;padding:.58rem .9rem!important}.sql-quiz-result.success{background:#0d3028!important;border:1px solid #286047!important;border-radius:7px!important;padding:.55rem .65rem!important;color:#dff8e8!important}.sql-quiz-result.warn{background:#392914!important;border:1px solid #6a4b20!important;border-radius:7px!important;padding:.55rem .65rem!important;color:#ffe9b4!important}
      `;
      document.head.appendChild(style);
    }
    enhance();
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
    loadScript('subject-tabs-and-layout-fix.js','data-subject-tabs-layout-fix');
    loadScript('beginner-seamless-fix.js','data-beginner-seamless-fix');
    loadScript('beginner-data-source-sync.js','data-beginner-data-source-sync');
    const root=document.getElementById('lessonsContainer');
    if(root)new MutationObserver(()=>enhance()).observe(root,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();