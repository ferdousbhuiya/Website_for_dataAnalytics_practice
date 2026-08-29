(function(){
 function courseTop(){return document.getElementById('intermediateStageBrowser')}
 function keepCourseVisible(){const h=courseTop();if(!h)return;requestAnimationFrame(()=>requestAnimationFrame(()=>h.scrollIntoView({behavior:'auto',block:'start'})))}
 document.addEventListener('click',e=>{
  if(e.target.closest('#intermediateStageBrowser .im-card[data-im],#intermediateStageBrowser .im-back')) setTimeout(keepCourseVisible,30);
 },true);
 document.addEventListener('dataprep-intermediate-rendered',keepCourseVisible);
 window.keepIntermediateCourseVisible=keepCourseVisible;
})();