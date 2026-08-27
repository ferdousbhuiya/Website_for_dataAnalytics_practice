(function(){
  const LEVELS=['Beginner','Intermediate','Advanced'];

  function prepareCards(){
    const cards=[...document.querySelectorAll('#path .path-card')];
    cards.slice(0,3).forEach((card,i)=>{
      if(!card.dataset.level) card.dataset.level=LEVELS[i];
    });
    return cards;
  }

  function currentLevel(){
    const select=document.getElementById('difficultyFilter');
    const fromSelect=select?.value;
    if(fromSelect && fromSelect!=='all') return fromSelect;
    const selected=document.querySelector('#path .path-card.selected-level-card');
    if(selected?.dataset.level) return selected.dataset.level;
    return localStorage.getItem('dataPrepPreferredLevel') || 'Beginner';
  }

  function targetCard(level){
    prepareCards();
    return document.querySelector(`#path .path-card[data-level="${level}"]`);
  }

  function embed(){
    const topics=document.getElementById('topics');
    const path=document.getElementById('path');
    if(!topics || !path) return;

    prepareCards();
    const level=currentLevel();
    const card=targetCard(level);
    if(!card) return;

    document.querySelectorAll('#path .path-card').forEach(c=>c.classList.remove('curriculum-expanded-card'));
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
      #path .path-grid{align-items:start!important}
      #path .path-card.curriculum-expanded-card{grid-column:1/-1!important;padding-bottom:0!important;border-color:#58846a!important;box-shadow:0 7px 22px rgba(25,70,43,.07)!important;overflow:hidden!important}
      #path .path-card.curriculum-expanded-card>#topics.curriculum-inside-stage{display:block!important;margin:1rem -1.1rem 0!important;width:calc(100% + 2.2rem)!important;border-top:1px solid #e5ded4!important;background:#fff!important;padding:1.15rem 0 1.25rem!important}
      #path .path-card.curriculum-expanded-card>#topics.curriculum-inside-stage>.container{max-width:none!important;padding-left:1.1rem!important;padding-right:1.1rem!important}
      #topics.curriculum-inside-stage .curriculum-heading-row{margin-bottom:.75rem!important}
      #topics.curriculum-inside-stage .section-title{font-size:1.15rem!important}
      #topics.curriculum-inside-stage .subject-detail-card{margin-top:.25rem!important}
      #topics.curriculum-inside-stage .beginner-subject-browser{margin-bottom:0!important}
      @media(max-width:760px){
        #path .path-card.curriculum-expanded-card>#topics.curriculum-inside-stage{margin:.9rem -1.1rem 0!important;width:calc(100% + 2.2rem)!important;padding-top:1rem!important}
        #path .path-card.curriculum-expanded-card>#topics.curriculum-inside-stage>.container{padding-left:1rem!important;padding-right:1rem!important}
        #topics.curriculum-inside-stage .curriculum-heading-row{gap:.7rem!important}
      }
    `;
    document.head.appendChild(style);
  }

  function install(){
    installStyles();
    prepareCards();
    setTimeout(embed,100);
    setTimeout(embed,500);
    setTimeout(embed,1200);

    document.querySelectorAll('#path .path-card').forEach(card=>{
      card.addEventListener('click',()=>{
        localStorage.setItem('dataPrepPreferredLevel',card.dataset.level||'Beginner');
        setTimeout(embed,30);
      });
    });

    const select=document.getElementById('difficultyFilter');
    select?.addEventListener('change',()=>setTimeout(embed,20));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
  else install();
})();