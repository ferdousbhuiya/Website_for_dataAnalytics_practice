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
    s.defer=true;
    s.setAttribute(attr,'1');
    document.head.appendChild(s);
  }
  function install(){
    if(!document.getElementById('quizChoiceVisualStyles')){
      const style=document.createElement('style');
      style.id='quizChoiceVisualStyles';
      style.textContent=`
        .sql-quiz-form fieldset{padding:.75rem 0!important}.sql-quiz-form legend{margin-bottom:.55rem!important}.sql-quiz-form label{display:flex!important;align-items:center!important;gap:.55rem!important;min-height:42px!important;padding:.55rem .65rem!important;margin:.28rem 0!important;border:1px solid #e0ded8!important;border-radius:8px!important;background:#fff!important;transition:border-color .15s,background .15s,box-shadow .15s!important}.sql-quiz-form label:hover{background:#fbfcff!important;border-color:#bdc9e9!important}.sql-quiz-form input[type="radio"]{appearance:auto!important;-webkit-appearance:radio!important;width:17px!important;height:17px!important;min-width:17px!important;margin:0!important;accent-color:#2563eb!important;opacity:1!important;visibility:visible!important;position:static!important}.sql-quiz-form label.choice-selected,.sql-quiz-form label:has(input[type="radio"]:checked){border-color:#5b7cff!important;background:#f3f6ff!important;box-shadow:0 0 0 1px rgba(63,91,230,.12)!important}.sql-quiz-form label.choice-selected span,.sql-quiz-form label:has(input[type="radio"]:checked) span{color:#17231d!important;font-weight:700!important}.sql-quiz-form button[type="submit"]{min-height:40px!important;padding:.58rem .9rem!important}.sql-quiz-result.success{background:#eef9ef!important;border:1px solid #d4ecd8!important;border-radius:7px!important;padding:.55rem .65rem!important}.sql-quiz-result.warn{background:#fff6e8!important;border:1px solid #f0dec0!important;border-radius:7px!important;padding:.55rem .65rem!important}
      `;
      document.head.appendChild(style);
    }
    enhance();
    loadScript('dedicated-subject-shell.js','data-dedicated-subject-shell');
    loadScript('stage-curriculum-embed.js','data-stage-curriculum-embed');
    const root=document.getElementById('lessonsContainer');
    if(root)new MutationObserver(()=>enhance()).observe(root,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();