(function(){
  const LEVELS=['Beginner','Intermediate','Advanced'];

  function getCards(){
    return [...document.querySelectorAll('#path .path-grid .path-card')];
  }

  function setLevel(level){
    const select=document.getElementById('difficultyFilter');
    if(select){
      select.value=level;
      select.dispatchEvent(new Event('change',{bubbles:true}));
    }
    localStorage.setItem('dataPrepPreferredLevel',level);
  }

  function ensureBackButton(){
    const topics=document.getElementById('topics');
    if(!topics) return;
    let back=topics.querySelector('.stage-focus-back');
    if(back) return back;
    back=document.createElement('button');
    back.type='button';
    back.className='stage-focus-back';
    back.textContent='← Back to Learning Path';
    back.addEventListener('click',exitFocus);
    const container=topics.querySelector(':scope > .container') || topics;
    container.insertBefore(back,container.firstChild);
    return back;
  }

  function enterFocus(level){
    setLevel(level);
    const path=document.getElementById('path');
    const topics=document.getElementById('topics');
    if(!path||!topics) return;

    document.body.classList.add('stage-focus-active');
    path.classList.add('stage-focus-hidden');
    topics.classList.add('stage-focus-visible');
    ensureBackButton();

    const heading=topics.querySelector('.section-title');
    if(heading) heading.textContent=`Explore the ${level} curriculum`;

    setTimeout(()=>topics.scrollIntoView({behavior:'smooth',block:'start'}),30);
  }

  function exitFocus(){
    const path=document.getElementById('path');
    const topics=document.getElementById('topics');
    document.body.classList.remove('stage-focus-active');
    path?.classList.remove('stage-focus-hidden');
    topics?.classList.remove('stage-focus-visible');
    const heading=topics?.querySelector('.section-title');
    if(heading) heading.textContent='Explore the curriculum';
    setTimeout(()=>path?.scrollIntoView({behavior:'smooth',block:'start'}),30);
  }

  function bindCards(){
    getCards().forEach((card,i)=>{
      if(card.dataset.stageFocusBound==='1') return;
      card.dataset.stageFocusBound='1';
      card.style.cursor='pointer';
      card.addEventListener('click',e=>{
        if(e.target.closest('a,button,input,select,textarea')) return;
        e.preventDefault();
        e.stopPropagation();
        enterFocus(LEVELS[i]||'Beginner');
      },true);
    });
  }

  function installStyles(){
    if(document.getElementById('stageFocusStyles')) return;
    const style=document.createElement('style');
    style.id='stageFocusStyles';
    style.textContent=`
      .stage-focus-back{display:inline-flex;align-items:center;gap:.35rem;margin:0 0 .9rem;padding:.5rem .72rem;border:1px solid #d7d2ca;border-radius:8px;background:#fff;color:#173b29;font-size:.66rem;font-weight:700;cursor:pointer}
      #path.stage-focus-hidden{display:none!important}
      body.stage-focus-active #topics{display:block!important}
      body.stage-focus-active #topics.stage-focus-visible{padding-top:1.35rem!important}
      body.stage-focus-active #topics .curriculum-heading-row{margin-top:0!important}
      @media(max-width:760px){.stage-focus-back{margin-bottom:.75rem}}
    `;
    document.head.appendChild(style);
  }

  function install(){
    installStyles();
    bindCards();
    const path=document.getElementById('path');
    if(path) new MutationObserver(bindCards).observe(path,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
  else install();
})();