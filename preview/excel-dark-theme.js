(function(){
  const ICONS=['▦','⌁','◉','⬡','▥'];
  function decorate(){
    const shell=document.getElementById('dpExcelShell');
    if(!shell)return;
    shell.querySelectorAll('.dpx-module').forEach((row,i)=>{
      row.dataset.moduleIcon=ICONS[i]||'▦';
      row.setAttribute('aria-label',(row.querySelector('strong')?.textContent||`Module ${i+1}`)+' — open module');
    });
    const subject=document.querySelector('#dpExcelShell .dpx-subject');
    if(subject&&!subject.dataset.darkDecorated){subject.dataset.darkDecorated='1';}
  }
  function install(){
    if(!document.getElementById('excelDarkThemeStyles')){
      const s=document.createElement('style');
      s.id='excelDarkThemeStyles';
      s.textContent=`
      #dpExcelShell.dpx-shell{background:radial-gradient(circle at 18% 8%,rgba(19,75,91,.2),transparent 28%),linear-gradient(180deg,#06111d 0%,#071724 48%,#071421 100%)!important;color:#eef5ff!important}
      #dpExcelShell .dpx-head{background:rgba(4,14,24,.96)!important;border-bottom:1px solid #17344b!important;box-shadow:0 10px 30px rgba(0,0,0,.18)!important}
      #dpExcelShell .dpx-head nav span{color:#9fb2c4!important}#dpExcelShell .dpx-head nav .active{color:#42e38d!important;border-bottom-color:#42e38d!important}
      #dpExcelShell .dpx-back{background:#0b1d2b!important;border-color:#24465e!important;color:#54e59a!important;cursor:pointer!important}#dpExcelShell .dpx-avatar{background:#0f7e48!important}
      #dpExcelShell .dpx-main{max-width:1240px!important}
      #dpExcelShell .dpx-crumb,#dpExcelShell .dpx-crumb button{color:#51e497!important}
      #dpExcelShell .dpx-card,#dpExcelShell .dpx-module-page,#dpExcelShell .dpx-quiz-card,#dpExcelShell .dpx-result{background:linear-gradient(180deg,rgba(10,28,43,.98),rgba(8,24,37,.98))!important;border:1px solid #1b3b51!important;box-shadow:0 18px 44px rgba(0,0,0,.24)!important}
      #dpExcelShell .dpx-subject{background:radial-gradient(circle at 8% 45%,rgba(35,208,116,.10),transparent 24%)!important}
      #dpExcelShell .dpx-icon{background:linear-gradient(145deg,#1faa59,#0e7c3d)!important;color:#fff!important;box-shadow:0 0 28px rgba(35,211,112,.22)!important}
      #dpExcelShell .dpx-title-row h1,#dpExcelShell .dpx-module-head h1,#dpExcelShell .dpx-lesson h2,#dpExcelShell .dpx-overview h3,#dpExcelShell .dpx-modules h3,#dpExcelShell .dpx-checkpoint h3,#dpExcelShell .dpx-quiz-card h2,#dpExcelShell .dpx-result h1{color:#f5f8ff!important}
      #dpExcelShell .dpx-title-row span{background:#143c2b!important;color:#58e99d!important;border:1px solid #245a3f!important}
      #dpExcelShell .dpx-copy p,#dpExcelShell .dpx-copy small,#dpExcelShell .dpx-progress span,#dpExcelShell .dpx-module-head p,#dpExcelShell .dpx-module-head em,#dpExcelShell .dpx-overview p,#dpExcelShell .dpx-overview li,#dpExcelShell .dpx-quiz-layout aside p,#dpExcelShell .dpx-quiz-layout aside small,#dpExcelShell .dpx-result p{color:#afbdca!important}
      #dpExcelShell .dpx-progress{padding:0 1.2rem 1.15rem!important}#dpExcelShell .dpx-progress small,#dpExcelShell .dpx-progress strong{color:#4ee493!important}
      #dpExcelShell .dpx-progress i,#dpExcelShell .dpx-quiz-layout aside i{background:#1a3245!important}#dpExcelShell .dpx-progress i b,#dpExcelShell .dpx-quiz-layout aside i b{background:linear-gradient(90deg,#27d86f,#70e39b)!important;box-shadow:0 0 14px rgba(49,224,119,.35)!important}
      #dpExcelShell .dpx-tabs{border-top-color:#18344a!important;border-bottom-color:#18344a!important;background:#081724!important}#dpExcelShell .dpx-tabs button{background:transparent!important;color:#aab8c5!important;cursor:pointer!important}#dpExcelShell .dpx-tabs .active{color:#4ee493!important;border-bottom-color:#4ee493!important}
      #dpExcelShell .dpx-overview>div,#dpExcelShell .dpx-overview aside{background:#0b1e2d!important;border-color:#1e3a4e!important}#dpExcelShell .dpx-overview aside{background:linear-gradient(180deg,#0b2530,#0a202c)!important}#dpExcelShell .dpx-overview li{color:#71dfa1!important}
      #dpExcelShell .dpx-modules{padding:0 1rem 1.2rem!important}#dpExcelShell .dpx-modules h3{font-size:.95rem!important;margin:1rem 0 .65rem!important}
      #dpExcelShell .dpx-module{position:relative!important;grid-template-columns:44px 46px minmax(0,1.35fr) .75fr .68fr 26px!important;gap:.8rem!important;min-height:78px!important;margin:.62rem 0!important;padding:.9rem 1rem!important;background:linear-gradient(180deg,#0d2233,#0a1d2c)!important;border:1px solid #244057!important;border-radius:12px!important;box-shadow:0 8px 24px rgba(0,0,0,.13)!important;cursor:pointer!important;transition:transform .16s ease,border-color .16s ease,background .16s ease,box-shadow .16s ease!important}
      #dpExcelShell .dpx-module:hover{transform:translateY(-2px)!important;border-color:#3e6680!important;background:linear-gradient(180deg,#102a3f,#0d2334)!important;box-shadow:0 14px 30px rgba(0,0,0,.22)!important}
      #dpExcelShell .dpx-module:focus-visible{outline:2px solid #4ee493!important;outline-offset:3px!important}
      #dpExcelShell .dpx-module>span{width:36px!important;height:36px!important;background:#0c2c22!important;border:1px solid #1d6b49!important;color:#53e697!important;font-size:.72rem!important}
      #dpExcelShell .dpx-module:before{content:attr(data-module-icon);width:40px;height:40px;border-radius:9px;display:grid;place-items:center;background:#12334a;color:#56a2ff;font-size:1.05rem;font-weight:800}
      #dpExcelShell .dpx-module:nth-of-type(2):before{background:#13294c;color:#6ca8ff}#dpExcelShell .dpx-module:nth-of-type(3):before{background:#2a1b45;color:#c47cff}#dpExcelShell .dpx-module:nth-of-type(4):before{background:#382d13;color:#f0b82b}#dpExcelShell .dpx-module:nth-of-type(5):before{background:#0b3440;color:#3fd9e9}
      #dpExcelShell .dpx-module strong{color:#f4f8ff!important;font-size:.8rem!important}#dpExcelShell .dpx-module small{color:#9fb0bf!important}#dpExcelShell .dpx-module em{color:#b7c3cd!important}#dpExcelShell .dpx-module>b{color:#9fc9df!important;font-size:1.1rem!important}
      #dpExcelShell .dpx-module.in-progress{border-color:#35d77d!important;box-shadow:0 0 0 1px rgba(53,215,125,.12),0 12px 30px rgba(0,0,0,.22)!important}#dpExcelShell .dpx-module.in-progress em{color:#54e99b!important;font-weight:800!important}
      #dpExcelShell .dpx-module.completed{border-color:#28694a!important}#dpExcelShell .dpx-module.completed em{color:#54e99b!important}
      #dpExcelShell .dpx-module.preview{opacity:1!important;border-color:#21384a!important;background:linear-gradient(180deg,#0a1d2b,#091a27)!important}#dpExcelShell .dpx-module.preview strong{color:#d9e3ec!important}#dpExcelShell .dpx-module.preview em{color:#8395a4!important}
      #dpExcelShell .dpx-module.preview:hover{border-color:#3b5669!important;background:linear-gradient(180deg,#0d2333,#0b1f2d)!important}
      #dpExcelShell .dpx-module-head{border-bottom-color:#183449!important}#dpExcelShell .dpx-module-head span{color:#4ee493!important}
      #dpExcelShell .dpx-preview-note{background:#2b2412!important;border-color:#66521b!important;color:#f5d875!important}
      #dpExcelShell .dpx-lesson{border-bottom-color:#173247!important}#dpExcelShell .dpx-num{background:#0f2f42!important;border:1px solid #235672!important;color:#6cbcff!important}
      #dpExcelShell .dpx-content,#dpExcelShell .dpx-content p,#dpExcelShell .dpx-content li{color:#d3dde7!important}#dpExcelShell .dpx-content h4{color:#71e3a3!important}#dpExcelShell .dpx-content code{background:#08131d!important;color:#91cdfd!important;border:1px solid #17394f!important;border-radius:4px;padding:.08rem .22rem}
      #dpExcelShell .dpx-checkpoint{background:linear-gradient(180deg,#0c2c24,#0a241f)!important;border-color:#246946!important}#dpExcelShell .dpx-checkpoint span{color:#58e99d!important}#dpExcelShell .dpx-checkpoint p{color:#9fb3a7!important}#dpExcelShell .dpx-checkpoint button{background:linear-gradient(90deg,#16a45a,#21c56f)!important;box-shadow:0 8px 20px rgba(21,176,93,.2)!important;cursor:pointer!important}
      #dpExcelShell .dpx-checkpoint.locked{opacity:.72!important;background:#111f29!important;border-color:#283d4b!important}#dpExcelShell .dpx-checkpoint.locked button{background:#334550!important;color:#91a0ab!important}
      #dpExcelShell .dpx-quiz-layout aside{background:#0b1e2d!important;border-color:#1d3b51!important}#dpExcelShell .dpx-quiz-layout aside>span{color:#52e395!important}#dpExcelShell .dpx-dots b{background:#0c1c29!important;border-color:#29485f!important;color:#9fb1c1!important}#dpExcelShell .dpx-dots .current{background:#2d6bff!important;border-color:#2d6bff!important;color:#fff!important}#dpExcelShell .dpx-dots .answered{border-color:#2bcf72!important;color:#5de39a!important}
      #dpExcelShell .dpx-options button{background:#0c2030!important;border-color:#244156!important;color:#edf3f8!important;cursor:pointer!important}#dpExcelShell .dpx-options button:hover{border-color:#45708d!important;background:#10283b!important}#dpExcelShell .dpx-options button.selected{background:#122a50!important;border-color:#4b78ff!important;box-shadow:0 0 0 1px rgba(75,120,255,.22)!important}
      #dpExcelShell .dpx-nav{border-top-color:#18364a!important}#dpExcelShell .dpx-nav button,#dpExcelShell .dpx-result button{background:#0d2030!important;border-color:#2b485c!important;color:#dfe9f2!important;cursor:pointer!important}#dpExcelShell .dpx-nav button:last-child:not(:disabled),#dpExcelShell .dpx-result button:last-child{background:#1e66f5!important;border-color:#1e66f5!important;color:#fff!important}
      @media(max-width:760px){#dpExcelShell .dpx-module{grid-template-columns:36px 38px minmax(0,1fr) auto!important;min-height:84px!important;padding:.8rem!important}#dpExcelShell .dpx-module small{grid-column:3!important}#dpExcelShell .dpx-module em{grid-column:4!important;grid-row:1/3!important}#dpExcelShell .dpx-module>b{display:none!important}#dpExcelShell .dpx-module:before{width:34px;height:34px;font-size:.9rem}}
      `;
      document.head.appendChild(s);
    }
    decorate();
    const root=document.getElementById('dpExcelShell');
    if(root)new MutationObserver(decorate).observe(root,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();