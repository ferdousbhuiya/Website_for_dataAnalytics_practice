(function(){
  let originalParent=null;
  let originalNext=null;

  function currentLevel(){
    const select=document.getElementById('difficultyFilter');
    const fromSelect=select?.value;
    if(fromSelect && fromSelect!=='all') return fromSelect;
    const selected=document.querySelector('.path-card.selected-level-card')?.dataset.level;
    if(selected) return selected;
    return localStorage.getItem('dataPrepPreferredLevel') || 'Beginner';
  }

  function targetCard(level){
    return document.querySelector(`.path-card[data-level="${level}"]`);
  }

  function embed(){
    const topics=document.getElementById('topics');
    const path=document.getElementById('path');
    if(!topics || !path) return;

    if(!originalParent){
      originalParent=topics.parentNode;
      originalNext=topics.nextSibling;
    }

    const level=currentLevel();
    const card=targetCard(level);
    if(!card) return;

    document.querySelectorAll('.path-card').forEach(c=>c.classList.remove('curriculum-expanded-card'));
    card.classList.add('curriculum-expanded-card');

    if(topics.parentNode!==card){
      card.appendChild(topics);
    }
    topics.classList.add('curriculum-inside-stage');

    if(!topics.dataset.stopStageBubble){
      topics.dataset.stopStageBubble='1';
      ['click','pointerdown','touchstart'].forEach(type=>topics.addEventListener(type,e=>e.stopPropagation()));
    }
  }

  function installStyles(){
    if(document.getElementById('stageCurriculumEmbedStyles')) return;
    const style=document.createElement('style');
    style.id='stageCurriculumEmbedStyles';
    style.textContent=`
      .path-card.curriculum-expanded-card{grid-column:1/-1!important;padding-bottom:0!important;border-color:#7aa489!important;box-shadow:0 7px 22px rgba(25,70,43,.07)!important;overflow:hidden!important}
      .path-card.curriculum-expanded-card>.curriculum-inside-stage{margin:1rem -1.1rem 0!important;width:calc(100% + 2.2rem)!important;border-top:1px solid #e5ded4!important;background:#fff!important;padding:1.15rem 0 1.25rem!important}
      .path-card.curriculum-expanded-card>.curriculum-inside-stage>.container{max-width:none!important;padding-left:1.1rem!important;padding-right:1.1rem!important}
      .curriculum-inside-stage .curriculum-heading-row{margin-bottom:.75rem!important}
      .curriculum-inside-stage .section-title{font-size:1.15rem!important}
      .curriculum-inside-stage .subject-detail-card{margin-top:.25rem!important}
      .curriculum-inside-stage .beginner-subject-browser{margin-bottom:0!important}
      @media(max-width:760px){
        .path-card.curriculum-expanded-card>.curriculum-inside-stage{margin:.9rem -1.1rem 0!important;width:calc(100% + 2.2rem)!important;padding-top:1rem!important}
        .path-card.curriculum-expanded-card>.curriculum-inside-stage>.container{padding-left:1rem!important;padding-right:1rem!important}
        .curriculum-inside-stage .curriculum-heading-row{gap:.7rem!important}
      }
    `;
    document.head.appendChild(style);
  }

  function install(){
    installStyles();
    setTimeout(embed,250);

    document.querySelectorAll('.path-card').forEach(card=>{
      card.addEventListener('click',()=>setTimeout(embed,80));
    });

    const select=document.getElementById('difficultyFilter');
    select?.addEventListener('change',()=>setTimeout(embed,40));

    const path=document.getElementById('path');
    if(path) new MutationObserver(()=>setTimeout(embed,30)).observe(path,{subtree:true,attributes:true,attributeFilter:['class','data-level']});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
  else install();
})();