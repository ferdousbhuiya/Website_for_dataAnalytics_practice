(function(){
  function hideShells(){
    document.getElementById('bpShell')?.classList.add('hidden');
    document.getElementById('dpSubjectShell')?.classList.add('hidden');
    document.getElementById('dpExcelShell')?.classList.add('hidden');
    document.body.classList.remove('bp-open','dp-shell-open','dpx-open','dpx-shell-open');
  }

  function showBeginnerCatalog(){
    hideShells();
    localStorage.removeItem('dataPrepBeginnerSubject');
    localStorage.setItem('dataPrepPreferredLevel','Beginner');

    const filter=document.getElementById('difficultyFilter');
    if(filter){
      filter.value='Beginner';
      filter.dispatchEvent(new Event('change',{bubbles:true}));
    }

    try{window.openStageCurriculum?.('Beginner')}catch(_){}

    const finish=()=>{
      const host=document.getElementById('beginnerSubjectBrowser');
      const back=host?.querySelector('[data-back-subjects]');
      if(back) back.click();
      const topics=document.getElementById('topics');
      if(topics) topics.scrollIntoView({behavior:'smooth',block:'start'});
    };
    setTimeout(finish,60);
    setTimeout(finish,180);
  }

  function shouldReturn(target){
    if(!target) return false;
    if(target.matches?.('#bpShell .bp-back,#dpSubjectShell .dp-back,#dpExcelShell .dpx-back')) return true;
    const clickable=target.closest?.('button,a');
    if(!clickable) return false;
    const text=(clickable.textContent||'').trim().toLowerCase();
    return text.includes('back to beginner subjects') || text==='back to beginner subjects';
  }

  document.addEventListener('click',function(e){
    if(!shouldReturn(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    showBeginnerCatalog();
  },true);

  window.returnToBeginnerSubjects=showBeginnerCatalog;
})();
