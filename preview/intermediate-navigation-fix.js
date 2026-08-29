(function(){
 function courseTop(){return document.getElementById('intermediateStageBrowser')}
 function keepCourseVisible(){const h=courseTop();if(!h)return;requestAnimationFrame(()=>requestAnimationFrame(()=>h.scrollIntoView({behavior:'auto',block:'start'})))}
 document.addEventListener('click',e=>{
  const subject=e.target.closest('#intermediateStageBrowser .im-card[data-im]');
  if(subject){e.preventDefault();e.stopPropagation();setTimeout(keepCourseVisible,20);return}
  const back=e.target.closest('#intermediateStageBrowser .im-back');
  if(back){setTimeout(keepCourseVisible,20);return}
 },true);
 document.addEventListener('dataprep-intermediate-rendered',keepCourseVisible);
 window.keepIntermediateCourseVisible=keepCourseVisible;
})();