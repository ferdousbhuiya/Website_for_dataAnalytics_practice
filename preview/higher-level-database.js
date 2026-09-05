(function(){
  let current=0, root=null;
  function data(){return window.higherLevelDatabaseData||{lessons:[],questions:[]}}
  function ensure(){
    if(root)return root;
    root=document.createElement('div');
    root.id='higherLevelDbView';
    root.className='hldb-view';
    root.hidden=true;
    document.body.appendChild(root);
    installStyles();
    return root;
  }
  function open(index=0){current=Math.max(0,Math.min(index,data().lessons.length-1));ensure();root.hidden=false;document.body.style.overflow='hidden';render();window.scrollTo(0,0)}
  function close(){if(root)root.hidden=true;document.body.style.overflow='';try{history.replaceState(null,'','#home')}catch(_){}document.getElementById('home')?.scrollIntoView({behavior:'smooth',block:'start'})}
  function render(){
    const d=data(), lesson=d.lessons[current];
    if(!lesson)return;
    root.innerHTML=`
      <header class="hldb-head">
        <button class="hldb-back" data-hldb-close>← Back to Home</button>
        <div><strong>Higher-Level Database &amp; SQL</strong><span>Sequential study section</span></div>
        <button class="hldb-home" data-hldb-close>Home</button>
      </header>
      <main class="hldb-shell">
        <aside class="hldb-sidebar">
          <div class="hldb-sidebar-top"><span>Study sequence</span><strong>${current+1}/${d.lessons.length}</strong></div>
          <div class="hldb-progress"><i style="width:${Math.round((current+1)/d.lessons.length*100)}%"></i></div>
          <nav>${d.lessons.map((l,i)=>`<button class="${i===current?'active':''}" data-hldb-lesson="${i}"><span>${i+1}</span><b>${l.title}</b></button>`).join('')}</nav>
        </aside>
        <section class="hldb-content">
          <div class="hldb-kicker">Higher-level class content</div>
          <h1>${lesson.title}</h1>
          <div class="hldb-lesson-body">${lesson.content}</div>
          ${(()=>{const a=d.activities?.[current]||{};return `
          <section class="hldb-stage hldb-example"><span>Example</span><h2>Worked Example</h2><p>${a.example||'Review the example in the lesson above.'}</p></section>
          <section class="hldb-stage hldb-practice"><span>Practice</span><h2>Hands-on Practice</h2><p>${a.practice||'Complete the lesson practice task.'}</p></section>
          <section class="hldb-stage hldb-debug"><span>Debugging</span><h2>Find and Fix the Problem</h2><p>${a.debug||'Identify an error related to this lesson and correct it.'}</p></section>
          <section class="hldb-stage hldb-realworld"><span>Real-world problem</span><h2>Apply It to a Real Situation</h2><p>${a.realWorld||'Explain how this concept solves a realistic database problem.'}</p></section>
          <section class="hldb-qa">
            <span class="hldb-qa-kicker">Q&amp;A</span><h2>Question &amp; Answer Review</h2>
            <p class="hldb-qa-note">Answer first. Open each item only when you are ready to check yourself.</p>
            <div>${(a.qa||[]).map(q=>`<details><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}</div>
          </section>`;})()}
          <div class="hldb-nav">
            <button data-hldb-prev ${current===0?'disabled':''}>← Previous Lesson</button>
            <button class="primary" data-hldb-next>${current===d.lessons.length-1?'Back to Section Overview':'Next Lesson →'}</button>
          </div>
        </section>
      </main>`;
    bind();
  }
  function bind(){
    root.querySelectorAll('[data-hldb-close]').forEach(b=>b.onclick=close);
    root.querySelectorAll('[data-hldb-lesson]').forEach(b=>b.onclick=()=>{current=Number(b.dataset.hldbLesson);render();root.querySelector('.hldb-content')?.scrollTo?.(0,0)});
    root.querySelector('[data-hldb-prev]')?.addEventListener('click',()=>{if(current>0){current--;render()}});
    root.querySelector('[data-hldb-next]')?.addEventListener('click',()=>{if(current<data().lessons.length-1){current++;render()}else{current=0;render()}});
  }
  function bindEntry(){
    document.querySelectorAll('[data-hldb-open]').forEach(b=>{if(b.dataset.hldbBound)return;b.dataset.hldbBound='1';b.addEventListener('click',()=>open(0))});
  }
  function installStyles(){
    if(document.getElementById('hldbStyles'))return;
    const s=document.createElement('style');s.id='hldbStyles';s.textContent=`
      .hldb-view{position:fixed;inset:0;z-index:20000;background:#071522;color:#eaf2f8;overflow:auto;font-family:Inter,sans-serif}.hldb-view[hidden]{display:none}
      .hldb-head{position:sticky;top:0;z-index:5;height:66px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px;padding:0 24px;background:#081827;border-bottom:1px solid #20394d}.hldb-head>div{text-align:center}.hldb-head strong{display:block;font-size:15px}.hldb-head span{display:block;color:#87a0b3;font-size:10px;margin-top:2px}.hldb-head button{border:1px solid #31506a;background:#0d2234;color:#eaf2f8;border-radius:8px;padding:9px 12px;font-weight:750;cursor:pointer}
      .hldb-shell{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:300px 1fr;gap:18px;padding:22px}.hldb-sidebar{background:#0a1c2b;border:1px solid #203b51;border-radius:12px;padding:14px;height:calc(100vh - 110px);overflow:auto;position:sticky;top:88px}.hldb-sidebar-top{display:flex;justify-content:space-between;font-size:11px;color:#9ab0c0}.hldb-progress{height:6px;border-radius:99px;background:#102b40;overflow:hidden;margin:10px 0 14px}.hldb-progress i{display:block;height:100%;background:#32d981}.hldb-sidebar nav{display:grid;gap:7px}.hldb-sidebar nav button{display:grid;grid-template-columns:28px 1fr;gap:8px;text-align:left;align-items:center;border:1px solid #1e3a50;background:#0c2132;color:#c8d6df;border-radius:8px;padding:9px;cursor:pointer}.hldb-sidebar nav button span{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#13334a;font-size:10px}.hldb-sidebar nav button b{font-size:10px;line-height:1.35}.hldb-sidebar nav button.active{border-color:#37d987;background:#0e2b25;color:#fff}
      .hldb-content{background:#0a1b29;border:1px solid #203b51;border-radius:14px;padding:26px;min-width:0}.hldb-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#40df8b;font-weight:900}.hldb-content h1{font-size:28px;margin:7px 0 18px}.hldb-lesson-body{color:#c8d5df;font-size:14px;line-height:1.7}.hldb-lesson-body h4{color:#fff;font-size:16px;margin:24px 0 8px}.hldb-lesson-body code{font-family:"JetBrains Mono",monospace;background:#07111a;color:#7ce3a7;padding:2px 5px;border-radius:4px}.hldb-lesson-body pre{overflow:auto;background:#06111c;border:1px solid #1d3548;border-radius:9px;padding:14px}.hldb-lesson-body pre code{background:none;padding:0}.hldb-lesson-body ul{padding-left:20px}
      .hldb-stage{margin-top:18px;padding:18px;border-radius:12px;border:1px solid #27445a;background:#0b1f30}.hldb-stage>span,.hldb-qa-kicker{display:inline-block;font-size:9px;text-transform:uppercase;letter-spacing:.09em;font-weight:900;color:#55dfa0;margin-bottom:4px}.hldb-stage h2{font-size:17px;margin:3px 0 8px}.hldb-stage p{font-size:12px;line-height:1.65;color:#bfd0da;margin:0}.hldb-example{border-color:#315678}.hldb-practice{border-color:#2c6047;background:#0a241d}.hldb-debug{border-color:#74572d;background:#241b0d}.hldb-debug>span{color:#f4bd58}.hldb-realworld{border-color:#51417c;background:#17142a}.hldb-realworld>span{color:#b69aff}.hldb-qa{margin-top:18px;padding:18px;border:1px solid #31506a;border-radius:12px;background:#0b1f30}.hldb-qa h2{font-size:18px;margin-bottom:4px}.hldb-qa-note{font-size:11px;color:#8fa6b7;margin:0 0 12px}.hldb-qa details{border:1px solid #203b51;border-radius:8px;background:#0c2233;margin:8px 0;padding:10px 12px}.hldb-qa summary{cursor:pointer;font-weight:750;font-size:12px}.hldb-qa p{color:#b9c8d2;font-size:12px;line-height:1.55}
      .hldb-nav{display:flex;justify-content:space-between;gap:12px;margin-top:24px}.hldb-nav button{border:1px solid #31506a;background:#0c2233;color:#edf5fb;border-radius:8px;padding:11px 15px;font-weight:800;cursor:pointer}.hldb-nav .primary{background:#2edb7f;color:#06150d;border-color:#2edb7f}.hldb-nav button:disabled{opacity:.4;cursor:not-allowed}
      @media(max-width:900px){.hldb-shell{grid-template-columns:1fr}.hldb-sidebar{position:static;height:auto;max-height:280px}.hldb-head{grid-template-columns:auto 1fr}.hldb-home{display:none}.hldb-content{padding:18px}.hldb-content h1{font-size:22px}} `;
    document.head.appendChild(s);
  }
  window.openHigherLevelDatabase=open;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(bindEntry,150));else setTimeout(bindEntry,150);
  document.addEventListener('dataprep-enhancements-ready',bindEntry);
})();