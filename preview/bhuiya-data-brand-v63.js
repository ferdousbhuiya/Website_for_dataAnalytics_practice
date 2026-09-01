(function(){
'use strict';
const BRAND='Bhuiya Data';
const DOMAIN='https://bhuiyadata.ferdous.us/';
function replaceText(root){
  const walker=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{if(n.nodeValue&&/DataPrep Pro/i.test(n.nodeValue))n.nodeValue=n.nodeValue.replace(/DataPrep Pro/gi,BRAND)});
}
function apply(){
  document.title='Bhuiya Data | Learn Data Analytics from Beginner to Advanced';
  let canonical=document.querySelector('link[rel="canonical"]');
  if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href=DOMAIN;
  document.querySelectorAll('[aria-label],[alt]').forEach(el=>{['aria-label','alt'].forEach(a=>{const v=el.getAttribute(a);if(v&&/DataPrep Pro/i.test(v))el.setAttribute(a,v.replace(/DataPrep Pro/gi,BRAND))})});
  replaceText(document.body);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
setTimeout(apply,300);
setTimeout(apply,1200);
})();
