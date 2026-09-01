(function(){
'use strict';
const ROOT_HOST='datapath.ferdous.us';
function hasAuthPayload(){
  const q=new URLSearchParams(location.search);
  return q.has('code')||q.has('token_hash')||q.has('type')||q.has('error')||/access_token=|refresh_token=|error=|type=/.test(location.hash||'');
}
function cleanUrl(){
  if(location.hostname!==ROOT_HOST||hasAuthPayload())return;
  const hash=location.hash||'';
  if(location.pathname!=='/'||location.search){history.replaceState(history.state,'','/'+hash);}
}
function cleanAfterClick(){if(location.hostname===ROOT_HOST)setTimeout(cleanUrl,0)}
function init(){
  cleanUrl();
  document.addEventListener('click',cleanAfterClick,true);
  window.addEventListener('hashchange',cleanUrl);
  window.addEventListener('popstate',cleanUrl);
  setInterval(cleanUrl,1000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
