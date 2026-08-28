(function(){
  function normalizeEtlCard(card){
    if(!card || card.dataset.subject!=='etl') return;
    const desc=card.querySelector('.subject-copy small');
    if(desc) desc.textContent='ETL concepts, extraction, transformation, validation, loading, file handling, and reliable workflows.';
    card.dataset.subject='etl';
  }
  function scan(){
    document.querySelectorAll('#beginnerSubjectBrowser .subject-card[data-subject="etl"]').forEach(normalizeEtlCard);
  }
  document.addEventListener('click',function(e){
    const card=e.target.closest('#beginnerSubjectBrowser .subject-card[data-subject="etl"]');
    if(card) normalizeEtlCard(card);
  },true);
  new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',scan,{once:true}); else scan();
})();
