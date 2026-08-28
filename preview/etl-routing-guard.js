(function(){
  function normalizeEtlCard(card){
    if(!card || card.dataset.subject!=='etl') return;
    const desc=card.querySelector('.subject-copy small');
    if(desc) desc.textContent='ETL concepts, extraction, transformation, validation, loading, file handling, and reliable workflows.';
    card.dataset.subject='etl';
  }

  // Important: do not use a MutationObserver here. Rewriting text from an
  // observer can trigger the observer again and create a continuous render loop.
  // This capture listener runs before the Beginner subject engine's capture
  // listener, so the ETL card is normalized before that engine reads its text.
  document.addEventListener('click',function(e){
    const card=e.target.closest('#beginnerSubjectBrowser .subject-card[data-subject="etl"]');
    if(card) normalizeEtlCard(card);
  },true);

  function initialScan(){
    document.querySelectorAll('#beginnerSubjectBrowser .subject-card[data-subject="etl"]').forEach(normalizeEtlCard);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initialScan,{once:true});
  else initialScan();
})();
