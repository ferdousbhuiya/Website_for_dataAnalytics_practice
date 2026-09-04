(function(){
'use strict';
const VERSION='71';
const LAST_KEY='dataPrepLastLearningLocationV1';
let pulling=false,suppress=false;
function isProgressKey(k){k=String(k||'');return /^(dataAnalyticsProgress(?:_|$)|dataPrepExcelCheckpoints_|dataPrepBeginnerCp_|dataPrepSqlCheckpoints_|dataprepIntermediateProgressV2$|dataprepAdvancedProgressV1$|dataPrepCheckpoints_|dpCloudAttempt:)/i.test(k)}
function clearLocalProgress(clearLocation=true){const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&isProgressKey(k))keys.push(k)}keys.forEach(k=>localStorage.removeItem(k));if(clearLocation)localStorage.removeItem(LAST_KEY);try{for(let i=sessionStorage.length-1;i>=0;i--){const k=sessionStorage.key(i);if(k&&/^dpCloudAttempt:/i.test(k))sessionStorage.removeItem(k)}}catch(_){}}
function parse(s){try{return JSON.parse(s||'{}')}catch(_){return{}}}
function pin(){return localStorage.getItem('dataAnalyticsActivePin')||'default'}
function mergeRow(row){
 const stage=String(row.stage||''),subject=String(row.subject_key||''),mod=String(row.module_key||'');let key,root;
 if(stage==='Intermediate'){key='dataprepIntermediateProgressV2';root=parse(localStorage.getItem(key));root[subject]=root[subject]||{};root[subject][mod]={...(root[subject][mod]||{}),started:!!row.started,passed:!!row.verified,verified:!!row.verified,applied:!!row.applied}}
 else if(stage==='Advanced'){key='dataprepAdvancedProgressV1';root=parse(localStorage.getItem(key));root[subject]=root[subject]||{};root[subject][mod]={...(root[subject][mod]||{}),started:!!row.started,passed:!!row.verified,verified:!!row.verified,applied:!!row.applied}}
 else{key=subject==='excel'?'dataPrepExcelCheckpoints_'+pin():'dataPrepBeginnerCp_'+subject+'_'+pin();root=parse(localStorage.getItem(key));root[mod]={...(root[mod]||{}),started:!!row.started,passed:!!row.verified,verified:!!row.verified,applied:!!row.applied}}
 localStorage.setItem(key,JSON.stringify(root));
 if(stage==='Beginner'&&subject==='sql'&&/^checkpoint_\d+$/.test(mod)){
   const n=Math.max(1,Number(mod.replace('checkpoint_',''))||1);
   const lk='dataPrepSqlCheckpoints_'+pin(),ls=parse(localStorage.getItem(lk)),idx=String(n-1);
   ls[idx]={...(ls[idx]||{}),started:!!row.started,passed:!!row.verified,verified:!!row.verified,applied:!!row.applied};
   localStorage.setItem(lk,JSON.stringify(ls));
   const ck='dataPrepCheckpoints_'+pin(),cs=parse(localStorage.getItem(ck));
   cs['sql_'+n]={...(cs['sql_'+n]||{}),started:!!row.started,passed:!!row.verified,verified:!!row.verified,applied:!!row.applied};
   localStorage.setItem(ck,JSON.stringify(cs));
 }
}
function fire(direction){const detail={direction,authoritative:true};window.dispatchEvent(new CustomEvent('dataprep-progress-synced',{detail}));document.dispatchEvent(new CustomEvent('dataprep-progress-synced',{detail}))}
function user(){return window.dataPrepCloud?.getUser?.()||null}
function guestZero(){clearLocalProgress(true);const b=document.getElementById('continueTopicBtn')||document.querySelector('.dashboard-continue');if(b)b.style.display='none';fire('guest-zero')}
async function pull(reason='cloud-authority'){const c=window.dataPrepSupabase,u=user();if(!c){return}if(!u){guestZero();return}if(pulling)return;pulling=true;try{const {data,error}=await c.from('learning_progress').select('stage,subject_key,module_key,started,verified,applied,updated_at').eq('user_id',u.id);if(error)throw error;suppress=true;clearLocalProgress(false);(data||[]).forEach(mergeRow);suppress=false;const b=document.getElementById('continueTopicBtn')||document.querySelector('.dashboard-continue');if(b)b.style.display='';fire(reason)}catch(e){console.warn('Authoritative progress refresh failed',e?.message||e)}finally{suppress=false;pulling=false}}
async function resetAll(){const c=window.dataPrepSupabase,u=user();const signed=!!u;const msg=signed?'Reset ALL learning progress for this account on every device?':'Reset local learning progress?';if(!confirm(msg))return false;if(signed&&c){for(const table of ['learning_activity','checkpoint_attempts','learning_progress']){const {error}=await c.from(table).delete().eq('user_id',u.id);if(error)throw error}await c.from('learning_profiles').update({last_stage:null,last_subject:null,last_module:null,updated_at:new Date().toISOString()}).eq('user_id',u.id)}clearLocalProgress(true);fire('reset');return true}
function bindReset(){const old=document.getElementById('resetProgressButton');if(!old||old.dataset.v52==='1')return;const b=old.cloneNode(true);b.dataset.v52='1';old.replaceWith(b);b.onclick=async()=>{b.disabled=true;const label=b.textContent;b.textContent='Resetting…';try{if(await resetAll()){alert(user()?'All account progress has been reset. Other signed-in browsers will update automatically.':'Local progress has been reset.');await pull('reset-confirm');setTimeout(()=>location.reload(),250)}}catch(e){console.error(e);alert('Progress reset failed. Please try again.');b.disabled=false;b.textContent=label}}}
function bindAuth(){const c=window.dataPrepSupabase;if(!c)return false;c.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_OUT'||!session?.user){guestZero();return}clearLocalProgress(false);setTimeout(()=>pull('auth-'+String(event).toLowerCase()),0)});return true}
function guardGuestWrites(){const previous=Storage.prototype.setItem;if(previous.__dpV52)return;function guarded(k,v){if(this===localStorage&&isProgressKey(k)&&window.dataPrepCloud&&!user()&&!suppress)return;return previous.call(this,k,v)}guarded.__dpV52=true;Storage.prototype.setItem=guarded}
function normalizeContinue(){const b=document.getElementById('continueTopicBtn')||document.querySelector('.dashboard-continue');if(!b)return;if(!user()){b.style.display='none';return}const raw=String(b.textContent||'');if(raw.length>36||/learn data analytics/i.test(raw)){const loc=parse(localStorage.getItem(LAST_KEY));const topic=String(loc.topic||'').toLowerCase(),subject=String(loc.subject||'').toLowerCase();const candidates=[['sql','SQL'],['excel','Excel'],['python','Python'],['statistics','Statistics'],['visualization','Visualization'],['business','Business Analytics'],['etl','ETL']];const found=candidates.find(([k])=>subject.includes(k)||topic===k||topic.startsWith(k+'_'));if(found)b.textContent='Go back to '+found[1]+' →';else b.style.display='none'}}
function init(){clearLocalProgress(false);fire('startup-zero');guardGuestWrites();bindReset();let tries=0;(function wait(){if(window.dataPrepSupabase&&window.dataPrepCloud){bindAuth();if(user())pull('initial-authority');else guestZero();return}if(tries++<80)setTimeout(wait,100)})();window.addEventListener('focus',()=>pull('focus-refresh'));document.addEventListener('visibilitychange',()=>{if(!document.hidden)pull('visibility-refresh')});document.addEventListener('dataprep-progress-synced',()=>setTimeout(normalizeContinue,50));setInterval(()=>{if(user())pull('poll-refresh');else guestZero();bindReset();normalizeContinue()},3000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,100));else setTimeout(init,100);
})();