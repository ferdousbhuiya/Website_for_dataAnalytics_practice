(function(){
  function embedCurriculum(){
    const topics=document.getElementById('topics');
    const path=document.getElementById('path');
    if(!topics||!path)return false;
    const cards=[...path.querySelectorAll('.path-card')];
    const beginner=cards.find(c=>c.dataset.level==='Beginner')||cards[0];
    if(!beginner)return false;

    // Move the REAL curriculum section into the Beginner stage card.
    if(topics.parentElement!==beginner){
      beginner.appendChild(topics);
    }
    beginner.classList.add('curriculum-host-card');
    topics.classList.add('curriculum-embedded');

    // Keep Beginner selected while this embedded curriculum is visible.
    const level=document.getElementById('difficultyFilter');
    if(level && level.value!=='Beginner'){
      level.value='Beginner';
      level.dispatchEvent(new Event('change',{bubbles:true}));
    }
    return true;
  }

  function installStyles(){
    if(document.getElementById('embeddedCurriculumStyles'))return;
    const style=document.createElement('style');
    style.id='embeddedCurriculumStyles';
    style.textContent=`
      .path-grid{align-items:start!important}
      .path-card.curriculum-host-card{grid-column:1/-1!important;padding:0!important;overflow:hidden!important;border-color:#2f7652!important}
      .path-card.curriculum-host-card>.path-label,
      .path-card.curriculum-host-card>h3,
      .path-card.curriculum-host-card>p,
      .path-card.curriculum-host-card>.path-topic-preview,
      .path-card.curriculum-host-card>.path-card-action{margin-left:1.1rem!important;margin-right:1.1rem!important}
      .path-card.curriculum-host-card>.path-label{margin-top:1.1rem!important}
      .path-card.curriculum-host-card>.path-card-action{margin-bottom:1rem!important}
      #topics.curriculum-embedded{display:block!important;position:static!important;width:100%!important;margin:0!important;padding:0!important;background:#fff!important;border-top:1px solid #e4ddd3!important;border-bottom:0!important;box-shadow:none!important}
      #topics.curriculum-embedded>.container{max-width:none!important;width:100%!important;padding:1.05rem 1.1rem 1.2rem!important;margin:0!important}
      #topics.curriculum-embedded .curriculum-heading-row{margin-top:0!important}
      #topics.curriculum-embedded .section-title{font-size:1.12rem!important}
      #topics.curriculum-embedded .title-accent{margin-bottom:.65rem!important}
      @media(max-width:760px){
        .path-card.curriculum-host-card>.path-label,
        .path-card.curriculum-host-card>h3,
        .path-card.curriculum-host-card>p,
        .path-card.curriculum-host-card>.path-topic-preview,
        .path-card.curriculum-host-card>.path-card-action{margin-left:.9rem!important;margin-right:.9rem!important}
        #topics.curriculum-embedded>.container{padding:.95rem .9rem 1.05rem!important}
        #topics.curriculum-embedded .curriculum-heading-row{gap:.6rem!important}
      }
    `;
    document.head.appendChild(style);
  }

  function install(){
    installStyles();
    let tries=0;
    const timer=setInterval(()=>{
      tries++;
      if(embedCurriculum()||tries>40)clearInterval(timer);
    },100);
    const path=document.getElementById('path');
    if(path)new MutationObserver(()=>embedCurriculum()).observe(path,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();