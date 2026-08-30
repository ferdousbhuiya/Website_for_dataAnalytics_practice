(function(){
  'use strict';
  const VERSION='44';
  const SUPABASE_URL='https://bdarfvpfkzwmlprkwtsg.supabase.co';
  const SUPABASE_KEY='sb_publishable_KUI4iw4bHcxlU4PrPUWsvA_gADbDwMK';
  const TRACKED=/^(dataPrepExcelCheckpoints_|dataPrepBeginnerCp_|dataprepIntermediateProgressV2$|dataprepAdvancedProgressV1$)/i;
  let client=null,user=null,syncTimer=null,syncing=false;

  function pin(){return localStorage.getItem('dataAnalyticsActivePin')||'default'}
  function parse(s,fallback={}){try{return JSON.parse(s||'')}catch(_){return fallback}}
  function now(){return new Date().toISOString()}
  function normalizeStage(v){const s=String(v||'').toLowerCase();return s==='beginner'?'Beginner':s==='intermediate'?'Intermediate':s==='advanced'?'Advanced':v}
  function moduleFlags(r){r=r||{};return {started:!!(r.started||r.passed||r.verified||r.applied||r.score!=null||r.attemptedAt||r.date),verified:!!(r.verified||r.passed),applied:!!r.applied,score:Number.isFinite(Number(r.score))?Number(r.score):null,attemptedAt:r.attemptedAt||r.date||null}}

  function flattenLocal(){
    const rows=[];
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);if(!TRACKED.test(key))continue;
      const data=parse(localStorage.getItem(key),{});
      if(key==='dataprepIntermediateProgressV2'||key==='dataprepAdvancedProgressV1'){
        const stage=key.includes('Intermediate')?'Intermediate':'Advanced';
        Object.entries(data||{}).forEach(([subject,mods])=>Object.entries(mods||{}).forEach(([mod,r])=>{
          const f=moduleFlags(r);if(f.started||f.verified||f.applied)rows.push({stage,subject_key:subject,module_key:String(mod),...f});
        }));
      }else if(key.startsWith('dataPrepExcelCheckpoints_')){
        Object.entries(data||{}).forEach(([mod,r])=>{const f=moduleFlags(r);if(f.started||f.verified||f.applied)rows.push({stage:'Beginner',subject_key:'excel',module_key:String(mod),...f})});
      }else if(key.startsWith('dataPrepBeginnerCp_')){
        const suffix=key.substring('dataPrepBeginnerCp_'.length);const marker='_'+pin();
        const subject=suffix.endsWith(marker)?suffix.slice(0,-marker.length):suffix.replace(/_[^_]+$/,'');
        Object.entries(data||{}).forEach(([mod,r])=>{if(!r||typeof r!=='object')return;const f=moduleFlags(r);if(f.started||f.verified||f.applied)rows.push({stage:'Beginner',subject_key:subject,module_key:String(mod),...f})});
      }
    }
    return rows;
  }

  function mergeRowIntoLocal(row){
    const stage=normalizeStage(row.stage),subject=row.subject_key,mod=String(row.module_key);
    let key,root;
    if(stage==='Intermediate'){key='dataprepIntermediateProgressV2';root=parse(localStorage.getItem(key),{});root[subject]=root[subject]||{};root[subject][mod]=root[subject][mod]||{};Object.assign(root[subject][mod],{started:row.started||root[subject][mod].started,passed:row.verified||root[subject][mod].passed,verified:row.verified||root[subject][mod].verified,applied:row.applied||root[subject][mod].applied});}
    else if(stage==='Advanced'){key='dataprepAdvancedProgressV1';root=parse(localStorage.getItem(key),{});root[subject]=root[subject]||{};root[subject][mod]=root[subject][mod]||{};Object.assign(root[subject][mod],{started:row.started||root[subject][mod].started,passed:row.verified||root[subject][mod].passed,verified:row.verified||root[subject][mod].verified,applied:row.applied||root[subject][mod].applied});}
    else {key=subject==='excel'?'dataPrepExcelCheckpoints_'+pin():'dataPrepBeginnerCp_'+subject+'_'+pin();root=parse(localStorage.getItem(key),{});root[mod]=root[mod]||{};Object.assign(root[mod],{started:row.started||root[mod].started,passed:row.verified||root[mod].passed,verified:row.verified||root[mod].verified,applied:row.applied||root[mod].applied});}
    nativeSet(key,JSON.stringify(root));
  }

  const nativeSet=Storage.prototype.setItem.bind(localStorage);
  const originalSetItem=Storage.prototype.setItem;
  Storage.prototype.setItem=function(k,v){originalSetItem.call(this,k,v);if(this===localStorage&&TRACKED.test(String(k)))scheduleSync()};

  async function ensureSdk(){
    if(window.supabase?.createClient)return;
    await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';s.async=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
  }

  async function getUser(){const {data}=await client.auth.getUser();user=data?.user||null;renderAccount();return user}

  async function cloudToLocal(){
    if(!user)return;
    const {data,error}=await client.from('learning_progress').select('stage,subject_key,module_key,started,verified,applied,updated_at').eq('user_id',user.id);
    if(error){console.warn('DataPrep cloud load failed',error.message);return}
    (data||[]).forEach(mergeRowIntoLocal);
    window.dispatchEvent(new CustomEvent('dataprep-progress-synced',{detail:{direction:'cloud-to-local'}}));
  }

  async function localToCloud(){
    if(!user||syncing)return;syncing=true;
    try{
      const rows=flattenLocal();if(!rows.length)return;
      const payload=rows.map(r=>({user_id:user.id,stage:r.stage,subject_key:r.subject_key,module_key:r.module_key,started:r.started,verified:r.verified,applied:r.applied,started_at:r.started?now():null,verified_at:r.verified?now():null,applied_at:r.applied?now():null,updated_at:now()}));
      const {error}=await client.from('learning_progress').upsert(payload,{onConflict:'user_id,stage,subject_key,module_key'});if(error)throw error;
      for(const r of rows){if(r.score==null||!r.attemptedAt)continue;const sig=[user.id,r.stage,r.subject_key,r.module_key,r.score,r.attemptedAt].join('|');const sent='dpCloudAttempt:'+btoa(unescape(encodeURIComponent(sig))).replace(/=/g,'');if(sessionStorage.getItem(sent))continue;const {error:e}=await client.from('checkpoint_attempts').insert({user_id:user.id,stage:r.stage,subject_key:r.subject_key,module_key:r.module_key,score:r.score,total_questions:5,passed:r.score>=4,attempted_at:r.attemptedAt});if(!e)sessionStorage.setItem(sent,'1')}
      window.dispatchEvent(new CustomEvent('dataprep-progress-synced',{detail:{direction:'local-to-cloud'}}));
    }catch(e){console.warn('DataPrep cloud sync failed',e.message||e)}finally{syncing=false}
  }
  function scheduleSync(){clearTimeout(syncTimer);syncTimer=setTimeout(localToCloud,500)}

  async function resetCloud(){if(!user)return true;const tables=['learning_activity','checkpoint_attempts','learning_progress'];for(const t of tables){const {error}=await client.from(t).delete().eq('user_id',user.id);if(error){console.warn('Cloud reset failed for '+t,error.message);return false}}return true}

  function styles(){if(document.getElementById('dpSupabaseStyles'))return;const s=document.createElement('style');s.id='dpSupabaseStyles';s.textContent=`.dp-account-btn{margin-left:.55rem;border:1px solid rgba(255,255,255,.18);background:#0c1d2a;color:#eaf6ef;border-radius:9px;padding:.5rem .72rem;font:700 .72rem/1 Inter,sans-serif;cursor:pointer}.dp-account-btn.signed{border-color:#2bcf7f;color:#7df0ad}.dp-auth-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:12000;display:grid;place-items:center;padding:1rem}.dp-auth-card{width:min(420px,94vw);background:#081722;border:1px solid #244354;color:#eef8f2;border-radius:16px;padding:1.25rem;box-shadow:0 20px 70px rgba(0,0,0,.45)}.dp-auth-card h2{margin:.15rem 0 .35rem}.dp-auth-card p{color:#9bb0c1;font-size:.78rem}.dp-auth-card input{width:100%;box-sizing:border-box;margin:.35rem 0;padding:.72rem;border:1px solid #315162;border-radius:8px;background:#0d2230;color:#fff}.dp-auth-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.7rem}.dp-auth-actions button{border:0;border-radius:8px;padding:.6rem .8rem;font-weight:800;cursor:pointer}.dp-auth-primary{background:#39dc83;color:#052315}.dp-auth-secondary{background:#173141;color:#eaf6ef}.dp-auth-danger{background:#4a2024;color:#ffdadd}.dp-auth-msg{min-height:1rem;margin-top:.55rem;color:#80e9ad!important}.dp-auth-close{float:right;background:none!important;color:#9bb0c1!important;font-size:1.15rem!important;padding:.2rem!important}`;document.head.appendChild(s)}
  function accountHost(){return document.querySelector('.navbar .container,.navbar .nav-container,.navbar')}
  function renderAccount(){styles();let b=document.getElementById('dpAccountBtn');if(!b){b=document.createElement('button');b.id='dpAccountBtn';b.className='dp-account-btn';b.addEventListener('click',openAuth);accountHost()?.appendChild(b)}if(!b)return;b.textContent=user?'Account ✓':'Sign in';b.classList.toggle('signed',!!user);b.title=user?user.email:'Sign in to sync learning progress'}
  function openAuth(){
    document.getElementById('dpAuthBackdrop')?.remove();const d=document.createElement('div');d.id='dpAuthBackdrop';d.className='dp-auth-backdrop';
    d.innerHTML=user?`<div class="dp-auth-card"><button class="dp-auth-close" data-close>×</button><h2>Learning account</h2><p>Signed in as <strong>${user.email||'learner'}</strong>. Your learning progress is synced with Supabase.</p><div class="dp-auth-actions"><button class="dp-auth-primary" data-sync>Sync now</button><button class="dp-auth-secondary" data-signout>Sign out</button></div><p class="dp-auth-msg"></p></div>`:`<div class="dp-auth-card"><button class="dp-auth-close" data-close>×</button><h2>Save your progress</h2><p>Sign in or create an account to keep Beginner, Intermediate and Advanced progress across devices.</p><input data-email type="email" placeholder="Email"><input data-password type="password" minlength="6" placeholder="Password (minimum 6 characters)"><div class="dp-auth-actions"><button class="dp-auth-primary" data-signin>Sign in</button><button class="dp-auth-secondary" data-signup>Create account</button></div><p class="dp-auth-msg"></p></div>`;
    document.body.appendChild(d);const msg=d.querySelector('.dp-auth-msg');d.querySelector('[data-close]').onclick=()=>d.remove();d.onclick=e=>{if(e.target===d)d.remove()};
    d.querySelector('[data-sync]')?.addEventListener('click',async()=>{msg.textContent='Syncing…';await cloudToLocal();await localToCloud();msg.textContent='Progress synced.'});
    d.querySelector('[data-signout]')?.addEventListener('click',async()=>{await client.auth.signOut();user=null;d.remove();renderAccount()});
    async function credentials(){return {email:d.querySelector('[data-email]').value.trim(),password:d.querySelector('[data-password]').value}}
    d.querySelector('[data-signin]')?.addEventListener('click',async()=>{const c=await credentials();msg.textContent='Signing in…';const {error}=await client.auth.signInWithPassword(c);msg.textContent=error?error.message:'Signed in. Loading your progress…'});
    d.querySelector('[data-signup]')?.addEventListener('click',async()=>{const c=await credentials();msg.textContent='Creating account…';const {data,error}=await client.auth.signUp(c);msg.textContent=error?error.message:(data.session?'Account created and signed in.':'Account created. Check your email to confirm your account.')});
  }

  async function init(){
    try{await ensureSdk();client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});window.dataPrepSupabase=client;window.dataPrepCloud={sync:async()=>{await cloudToLocal();await localToCloud()},reset:resetCloud,getUser:()=>user};await getUser();if(user){await cloudToLocal();await localToCloud()}client.auth.onAuthStateChange(async(_event,session)=>{user=session?.user||null;renderAccount();if(user){setTimeout(async()=>{await cloudToLocal();await localToCloud()},0)}});window.dispatchEvent(new CustomEvent('dataprep-supabase-ready',{detail:{connected:true,user:!!user}}))}catch(e){console.warn('DataPrep Supabase initialization failed',e);window.dispatchEvent(new CustomEvent('dataprep-supabase-ready',{detail:{connected:false}}))}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();