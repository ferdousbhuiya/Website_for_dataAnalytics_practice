(function(){
  const icons={
    Beginner:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V10m0 0C9 6 5 6 3 7c1 4 4 7 9 7m0-4c3-4 7-4 9-3-1 4-4 7-9 7"/></svg>',
    Intermediate:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19 9 7l4 7 3-5 5 10H3Z"/></svg>',
    Advanced:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4c3 0 5 2 6 5-1 4-4 7-8 8l-5-5c1-4 4-7 7-8Zm-6 9-4 1-1 4 5-2m5 0 2 5 4-1 1-4M14 9h.01"/></svg>',
    excel:['<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM4 10h16M9 5v14M14 5v14"/></svg>','<svg viewBox="0 0 24 24"><path d="M4 6h16M7 10h10l-4 8H9l-2-8Z"/></svg>','<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><path d="M12 3v4m0 10v4M3 12h4m10 0h4"/></svg>','<svg viewBox="0 0 24 24"><path d="m12 3 7 4v10l-7 4-7-4V7l7-4Zm0 0v8m7-4-7 4-7-4"/></svg>','<svg viewBox="0 0 24 24"><path d="M5 19V9m5 10V5m5 14v-7m4 7V3"/></svg>'],
    lessons:['<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM7 8h10M7 12h7M7 16h8"/></svg>','<svg viewBox="0 0 24 24"><path d="M4 19h16M6 17l4-5 3 2 5-7"/></svg>','<svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"/></svg>']
  };
  function decorateDashboard(){
    const dashboard=document.getElementById('learnerDashboard');
    if(!dashboard)return;
    dashboard.querySelector('.verified-progress-card')?.remove();
    dashboard.querySelectorAll('.level-progress-card').forEach(card=>{
      const level=card.dataset.level||card.querySelector('strong')?.textContent?.trim();
      if(!level||card.querySelector('.level-card-icon'))return;
      const icon=document.createElement('span');
      icon.className='level-card-icon';
      icon.innerHTML=icons[level]||'';
      card.prepend(icon);
    });
  }
  function decorateExcel(){
    const shell=document.getElementById('dpExcelShell');
    if(!shell)return;
    shell.querySelectorAll('.dpx-module').forEach((row,i)=>{
      if(row.querySelector('.dpx-module-icon'))return;
      const icon=document.createElement('span');icon.className='dpx-module-icon';icon.innerHTML=icons.excel[i%icons.excel.length];
      const number=row.querySelector(':scope>span'); number?.insertAdjacentElement('afterend',icon);
    });
    shell.querySelectorAll('.dpx-lesson').forEach((row,i)=>{
      if(row.querySelector('.dpx-lesson-icon'))return;
      const icon=document.createElement('span');icon.className='dpx-lesson-icon';icon.innerHTML=icons.lessons[i%icons.lessons.length];
      const number=row.querySelector('.dpx-num');number?.insertAdjacentElement('afterend',icon);
    });
  }
  function decorateSql(){
    document.querySelectorAll('#dpSubjectShell .dp-module').forEach((row,i)=>{
      if(row.querySelector('.dp-module-icon'))return;
      const icon=document.createElement('span');icon.className='dp-module-icon';icon.innerHTML=icons.excel[i%icons.excel.length];
      const number=row.querySelector(':scope>span');number?.insertAdjacentElement('afterend',icon);
    });
  }
  function run(){decorateDashboard();decorateExcel();decorateSql()}
  function install(){run();new MutationObserver(run).observe(document.body,{childList:true,subtree:true})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();