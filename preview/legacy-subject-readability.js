(function(){
  function formatLegacyContent(node){
    if(!node || node.dataset.readabilityFixed==='1') return;
    node.dataset.readabilityFixed='1';

    // Legacy Python/ETL lessons are inserted as markdown-like text. Convert it
    // with the site's existing renderer when possible so bold/code become real HTML.
    const raw = node.textContent || '';
    if(raw && /\*\*|```|`[^`]+`/.test(raw) && typeof window.convertMarkdownToHtml === 'function'){
      try{ node.innerHTML = window.convertMarkdownToHtml(raw); }catch(_){ }
    }

    node.style.setProperty('color','#e7eef4','important');
    node.style.setProperty('font-size','.88rem','important');
    node.style.setProperty('line-height','1.9','important');
    node.style.setProperty('letter-spacing','.004em','important');

    node.querySelectorAll('*').forEach(el=>{
      const tag = el.tagName;
      if(['H1','H2','H3'].includes(tag)){
        el.style.setProperty('color','#f8fbfd','important');
        el.style.setProperty('line-height','1.4','important');
        el.style.setProperty('margin','.85rem 0 .4rem','important');
      } else if(['H4','H5','H6'].includes(tag)){
        el.style.setProperty('color','#5df18f','important');
        el.style.setProperty('line-height','1.45','important');
        el.style.setProperty('margin','.85rem 0 .35rem','important');
      } else if(tag==='STRONG' || tag==='B'){
        el.style.setProperty('color','#ffffff','important');
        el.style.setProperty('font-weight','700','important');
      } else if(tag==='CODE'){
        el.style.setProperty('color','#bdf7d3','important');
        el.style.setProperty('background','#061724','important');
        el.style.setProperty('border','1px solid #285068','important');
        el.style.setProperty('padding','.1rem .3rem','important');
        el.style.setProperty('border-radius','4px','important');
      } else if(tag==='P' || tag==='LI' || tag==='SPAN' || tag==='EM'){
        el.style.setProperty('color','#e1eaf0','important');
        el.style.setProperty('line-height','1.9','important');
      }
      if(tag==='P') el.style.setProperty('margin','.45rem 0 .9rem','important');
      if(tag==='LI') el.style.setProperty('margin','.3rem 0','important');
    });
  }

  function apply(){
    document.querySelectorAll('#dpSubjectShell .dp-lesson-content').forEach(formatLegacyContent);
  }

  function install(){
    apply();
    const root=document.getElementById('dpSubjectShell') || document.body;
    new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
  else install();
})();