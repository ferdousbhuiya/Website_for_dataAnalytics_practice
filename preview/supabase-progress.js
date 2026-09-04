(function(){
  'use strict';
  const VERSION='46';
  const SUPABASE_URL='https://bdarfvpfkzwmlprkwtsg.supabase.co';
  const SUPABASE_KEY='sb_publishable_KUI4iw4bHcxlU4PrPUWsvA_gADbDwMK';
  const TRACKED=/^(dataPrepExcelCheckpoints_|dataPrepBeginnerCp_|dataPrepSqlCheckpoints_|dataPrepCheckpoints_|dataprepIntermediateProgressV2$|dataprepAdvancedProgressV1$)/i;
  let client=null,user=null,syncTimer=null,syncing=false;

  function pin(){return localStorage.getItem('dataAnalyticsActivePin')||'default'}
  function parse(s,fallback={}){try{return JSON.parse(s||'')}catch(_){return fallback}}
  function now(){return new Date().toISOString()}
  function normalizeStage(v){const s=String(v||'').toLowerCase();return s==='beginner'?'Beginner':s==='intermediate'?'Intermediate':s==='advanced'?'Advanced':v}
  function moduleFlags(r){r=r||{};return {started:!!(r.started||r.passed||r.verified||r.applied||r.score!=null||r.attemptedAt||r.date),verified:!!(r.verified||r.passed),applied:!!r.applied,score:Number.isFinite(Number(r.score))?Number(r.score):null,attemptedAt:r.attemptedAt||r.date||null}}
  function displayName(){const n=String(user?.user_metadata?.full_name||user?.user_metadata?.name||'').trim();if(n)return n;const email=String(user?.email||'');return email?email.split('@')[0]:'Learner'}
  function safe(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

  function flattenLocal(){
    const byId=new Map();
    const put=(row)=>{
      if(!row)return;
      const id=[row.stage,row.subject_key,row.module_key].join('|');
      const prev=byId.get(id)||{};
      byId.set(id,{...prev,...row,
        started:!!(prev.started||row.started||prev.verified||row.verified||prev.applied||row.applied),
        verified:!!(prev.verified||row.verified),
        applied:!!(prev.applied||row.applied),
        score:row.score!=null?row.score:(prev.score??null),
        attemptedAt:row.attemptedAt||prev.attemptedAt||null
      });
    };
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);if(!TRACKED.test(key))continue;
      const data=parse(localStorage.getItem(key),{});
      if(key==='dataprepIntermediateProgressV2'||key==='dataprepAdvancedProgressV1'){
        const stage=key.includes('Intermediate')?'Intermediate':'Advanced';
        Object.entries(data||{}).forEach(([subject,mods])=>Object.entries(mods||{}).forEach(([mod,r])=>{
          const f=moduleFlags(r);if(f.started||f.verified||f.applied)put({stage,subject_key:subject,module_key:String(mod),...f});
        }));
      }else if(key.startsWith('dataPrepExcelCheckpoints_')){
        Object.entries(data||{}).forEach(([mod,r])=>{const f=moduleFlags(r);if(f.started||f.verified||f.applied)put({stage:'Beginner',subject_key:'excel',module_key:String(mod),...f})});
      }else if(key.startsWith('dataPrepBeginnerCp_')){
        const suffix=key.substring('dataPrepBeginnerCp_'.length);const marker='_'+pin();
        const subject=suffix.endsWith(marker)?suffix.slice(0,-marker.length):suffix.replace(/_[^_]+$/,'');
        Object.entries(data||{}).forEach(([mod,r])=>{if(!r||typeof r!=='object')return;const f=moduleFlags(r);if(f.started||f.verified||f.applied)put({stage:'Beginner',subject_key:subject,module_key:String(mod),...f})});
      }else if(key.startsWith('dataPrepSqlCheckpoints_')){
        Object.entries(data||{}).forEach(([mod,r])=>{
          if(!r||typeof r!=='object')return;const f=moduleFlags(r);
          if(f.started||f.verified||f.applied)put({stage:'Beginner',subject_key:'sql',module_key:'checkpoint_'+(Number(mod)+1),...f});
        });
      }else if(key.startsWith('dataPrepCheckpoints_')){
        Object.entries(data||{}).forEach(([mod,r])=>{
          if(!/^sql_\d+$/i.test(mod)||!r||typeof r!=='object')return;const f=moduleFlags(r);
          if(f.started||f.verified||f.applied)put({stage:'Beginner',subject_key:'sql',module_key:'checkpoint_'+String(mod).replace(/^sql_/i,''),...f});
        });
      }
    }
    return [...byId.values()];
  }

  function mergeRowIntoLocal(row){
    const stage=normalizeStage(row.stage),subject=row.subject_key,mod=String(row.module_key);
    let key,root;
    if(stage==='Intermediate'){key='dataprepIntermediateProgressV2';root=parse(localStorage.getItem(key),{});root[subject]=root[subject]||{};root[subject][mod]=root[subject][mod]||{};Object.assign(root[subject][mod],{started:row.started||root[subject][mod].started,passed:row.verified||root[subject][mod].passed,verified:row.verified||root[subject][mod].verified,applied:row.applied||root[subject][mod].applied});}
    else if(stage==='Advanced'){key='dataprepAdvancedProgressV1';root=parse(localStorage.getItem(key),{});root[subject]=root[subject]||{};root[subject][mod]=root[subject][mod]||{};Object.assign(root[subject][mod],{started:row.started||root[subject][mod].started,passed:row.verified||root[subject][mod].passed,verified:row.verified||root[subject][mod].verified,applied:row.applied||root[subject][mod].applied});}
    else {
      key=subject==='excel'?'dataPrepExcelCheckpoints_'+pin():'dataPrepBeginnerCp_'+subject+'_'+pin();
      root=parse(localStorage.getItem(key),{});root[mod]=root[mod]||{};
      Object.assign(root[mod],{started:row.started||root[mod].started,passed:row.verified||root[mod].passed,verified:row.verified||root[mod].verified,applied:row.applied||root[mod].applied});
    }
    nativeSet(key,JSON.stringify(root));
    if(stage==='Beginner'&&subject==='sql'&&/^checkpoint_\d+$/.test(mod)){
      const n=Math.max(1,Number(mod.replace('checkpoint_',''))||1);
      const legacyKey='dataPrepSqlCheckpoints_'+pin(),legacy=parse(localStorage.getItem(legacyKey),{});
      const idx=String(n-1);legacy[idx]={...(legacy[idx]||{}),started:!!row.started,passed:!!row.verified,verified:!!row.verified,applied:!!row.applied};
      nativeSet(legacyKey,JSON.stringify(legacy));
      const coreKey='dataPrepCheckpoints_'+pin(),core=parse(localStorage.getItem(coreKey),{});
      core['sql_'+n]={...(core['sql_'+n]||{}),started:!!row.started,passed:!!row.verified,verified:!!row.verified,applied:!!row.applied};
      nativeSet(coreKey,JSON.stringify(core));
    }
  }

  const nativeSet=Storage.prototype.setItem.bind(localStorage);
  const originalSetItem=Storage.prototype.setItem;
  Storage.prototype.setItem=function(k,v){originalSetItem.call(this,k,v);if(this===localStorage&&TRACKED.test(String(k)))scheduleSync()};

  async function ensureSdk(){if(window.supabase?.createClient)return;await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';s.async=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
  async function getUser(){const {data}=await client.auth.getUser();user=data?.user||null;renderAccount();return user}

  async function cloudToLocal(){if(!user)return;const {data,error}=await client.from('learning_progress').select('stage,subject_key,module_key,started,verified,applied,updated_at').eq('user_id',user.id);if(error){console.warn('DataPrep cloud load failed',error.message);return}(data||[]).forEach(mergeRowIntoLocal);window.dispatchEvent(new CustomEvent('dataprep-progress-synced',{detail:{direction:'cloud-to-local'}}))}
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

  function removeLegacyPinUI(){document.querySelector('#progress .auth-panel')?.remove();document.querySelectorAll('#pinStatus,#pinInput,#pinConfirmInput,#setPinButton,#switchPinButton,#clearPinButton,#pinMessage').forEach(el=>el.remove())}
  function styles(){if(document.getElementById('dpSupabaseStyles'))return;const s=document.createElement('style');s.id='dpSupabaseStyles';s.textContent=`
.dp-account-btn{flex:0 0 auto;white-space:nowrap;margin-left:.7rem;border:1px solid #5f47ff;background:linear-gradient(135deg,#6c4cff,#8b5cf6);color:#fff;border-radius:9px;padding:.53rem .88rem;font:800 .72rem/1 Inter,sans-serif;cursor:pointer;box-shadow:0 5px 18px rgba(108,76,255,.22);transition:transform .2s ease,box-shadow .2s ease,filter .2s ease}
.dp-account-btn:hover{filter:brightness(1.1);transform:translateY(-1px);box-shadow:0 7px 22px rgba(108,76,255,.32)}
.dp-account-btn.signed{border-color:#2bcf7f;background:linear-gradient(135deg,#0d6b45,#12945d);color:#effff6;box-shadow:0 5px 18px rgba(43,207,127,.18)}
.navbar .nav-content{display:flex!important;align-items:center!important;flex-wrap:nowrap!important;gap:.45rem}.navbar .brand{flex:0 0 auto}.navbar .nav-links{flex:1 1 auto;justify-content:center;min-width:0}
.dp-auth-backdrop{position:fixed;inset:0;background:rgba(1,8,13,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:12000;display:grid;place-items:center;padding:1rem}
.dp-auth-card{position:relative;width:min(430px,94vw);background:linear-gradient(180deg,#0a1b27,#081720);border:1px solid #2d5265;color:#eef8f2;border-radius:16px;padding:1.25rem;box-shadow:0 24px 80px rgba(0,0,0,.5)}
.dp-auth-card h2{margin:.1rem 2.2rem .3rem 0;font-size:1.45rem}.dp-auth-card>p{color:#a8bac7;font-size:.79rem;line-height:1.55;margin:.25rem 0 .75rem}
.dp-auth-card label{display:block;color:#9db2bf;font-size:.66rem;font-weight:700;margin:.42rem 0 .12rem}.dp-auth-card input{width:100%;box-sizing:border-box;margin:.18rem 0;padding:.78rem .72rem;border:1px solid #31566a;border-radius:8px;background:#0d2331;color:#fff;outline:none}.dp-auth-card input:focus{border-color:#42df8c;box-shadow:0 0 0 3px rgba(66,223,140,.1)}
.dp-auth-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.78rem}.dp-auth-actions button{border:1px solid transparent;border-radius:8px;padding:.62rem .82rem;font-weight:800;cursor:pointer}.dp-auth-primary{background:#39dc83;color:#052315}.dp-auth-secondary{background:#173141;color:#eaf6ef;border-color:#5d8297!important}.dp-auth-name-save{background:#6c4cff!important;color:#fff!important}.dp-auth-msg{display:none;min-height:1rem;margin:.65rem 0 0!important;padding:.55rem .65rem;border-radius:7px;background:#0c2730;color:#9de9bd!important;font-size:.72rem!important}.dp-auth-msg.show{display:block}.dp-auth-msg.error{background:#321d21;color:#ffc4c9!important}.dp-auth-close{position:absolute;right:1rem;top:1rem;border:1px solid #506977!important;border-radius:6px!important;background:#102431!important;color:#b8c9d4!important;font-size:1rem!important;width:30px;height:30px;padding:0!important}.dp-auth-helper{font-size:.67rem;color:#7893a4;margin-top:.35rem}.dp-account-name{color:#67ef9f;font-weight:800}
@media(max-width:900px){.navbar .nav-content{gap:.3rem}.dp-account-btn{margin-left:auto;padding:.46rem .68rem;font-size:.68rem}.navbar .nav-links{gap:.25rem!important}.navbar .nav-link{padding:.42rem .48rem!important;font-size:.72rem!important}}
@media(max-width:700px){.dp-account-btn{margin-left:auto!important}.dp-auth-card{width:min(390px,96vw);padding:1.05rem}.dp-auth-card h2{font-size:1.25rem}.dp-auth-actions{display:grid;grid-template-columns:1fr 1fr}.dp-auth-actions button{width:100%}}
`;document.head.appendChild(s)}
  function accountHost(){return document.querySelector('.navbar .nav-content')||document.querySelector('.navbar .container')||document.querySelector('.navbar')}
  function renderAccount(){styles();removeLegacyPinUI();let b=document.getElementById('dpAccountBtn');if(!b){b=document.createElement('button');b.id='dpAccountBtn';b.type='button';b.className='dp-account-btn';b.addEventListener('click',openAuth);accountHost()?.appendChild(b)}if(!b)return;b.textContent=user?displayName():'Sign in';b.classList.toggle('signed',!!user);b.title=user?('Signed in as '+displayName()):'Sign in to sync learning progress'}
  function showMsg(el,text,isError=false){if(!el)return;el.textContent=text||'';el.classList.toggle('show',!!text);el.classList.toggle('error',!!isError)}
  function credentials(d,msg,needName=false){const name=String(d.querySelector('[data-name]')?.value||'').trim(),email=d.querySelector('[data-email]')?.value.trim(),password=d.querySelector('[data-password]')?.value;if(needName&&name.length<2){showMsg(msg,'Enter your name.',true);return null}if(!email){showMsg(msg,'Enter your email address.',true);return null}if(!/^\S+@\S+\.\S+$/.test(email)){showMsg(msg,'Enter a valid email address.',true);return null}if(!password){showMsg(msg,'Enter your password.',true);return null}if(password.length<6){showMsg(msg,'Password must contain at least 6 characters.',true);return null}return {name,email,password}}
  function friendlyError(error){const raw=String(error?.message||'').trim();if(!raw)return'Unable to complete that request. Please try again.';if(/anonymous sign-ins/i.test(raw))return'Enter your email and password to continue.';if(/invalid login credentials/i.test(raw))return'Email or password is incorrect.';if(/email not confirmed/i.test(raw))return'Please confirm your email before signing in.';return raw}
  function openAuth(){
    document.getElementById('dpAuthBackdrop')?.remove();const d=document.createElement('div');d.id='dpAuthBackdrop';d.className='dp-auth-backdrop';
    d.innerHTML=user?`<div class="dp-auth-card"><button class="dp-auth-close" data-close aria-label="Close">×</button><h2>Learning account</h2><p>Signed in as <span class="dp-account-name">${safe(displayName())}</span><br>${safe(user.email||'')}</p><label>Display name</label><input data-edit-name type="text" maxlength="60" value="${safe(displayName())}" autocomplete="name"><div class="dp-auth-actions"><button class="dp-auth-name-save" data-save-name>Save name</button><button class="dp-auth-primary" data-sync>Sync now</button><button class="dp-auth-secondary" data-signout>Sign out</button></div><p class="dp-auth-msg"></p></div>`:`<div class="dp-auth-card"><button class="dp-auth-close" data-close aria-label="Close">×</button><h2>Save your progress</h2><p>Sign in or create an account to keep your learning progress across devices.</p><label data-name-label style="display:none">Your name</label><input data-name type="text" autocomplete="name" maxlength="60" placeholder="Your name" style="display:none"><label>Email</label><input data-email type="email" autocomplete="email" placeholder="Email"><label>Password</label><input data-password type="password" autocomplete="current-password" minlength="6" placeholder="Password (minimum 6 characters)"><div class="dp-auth-helper">Use Sign in for an existing account, or Create account to register.</div><div class="dp-auth-actions"><button class="dp-auth-primary" data-signin>Sign in</button><button class="dp-auth-secondary" data-signup>Create account</button></div><p class="dp-auth-msg"></p></div>`;
    document.body.appendChild(d);const msg=d.querySelector('.dp-auth-msg');d.querySelector('[data-close]').onclick=()=>d.remove();d.onclick=e=>{if(e.target===d)d.remove()};
    d.querySelector('[data-sync]')?.addEventListener('click',async()=>{showMsg(msg,'Syncing…');await cloudToLocal();await localToCloud();showMsg(msg,'Progress synced.')});
    d.querySelector('[data-signout]')?.addEventListener('click',async()=>{await client.auth.signOut();user=null;d.remove();renderAccount()});
    d.querySelector('[data-save-name]')?.addEventListener('click',async()=>{const name=String(d.querySelector('[data-edit-name]').value||'').trim();if(name.length<2){showMsg(msg,'Enter your name.',true);return}showMsg(msg,'Saving name…');const {data,error}=await client.auth.updateUser({data:{full_name:name}});if(error){showMsg(msg,friendlyError(error),true);return}user=data.user||user;await client.from('learning_profiles').update({display_name:name,updated_at:now()}).eq('user_id',user.id);renderAccount();showMsg(msg,'Name updated.')});
    d.querySelector('[data-signin]')?.addEventListener('click',async()=>{const c=credentials(d,msg,false);if(!c)return;showMsg(msg,'Signing in…');const {error}=await client.auth.signInWithPassword({email:c.email,password:c.password});showMsg(msg,error?friendlyError(error):'Signed in. Loading your progress…',!!error)});
    d.querySelector('[data-signup]')?.addEventListener('click',async e=>{const nameInput=d.querySelector('[data-name]'),nameLabel=d.querySelector('[data-name-label]');if(nameInput.style.display==='none'){nameInput.style.display='block';nameLabel.style.display='block';nameInput.focus();e.currentTarget.textContent='Create my account';return}const c=credentials(d,msg,true);if(!c)return;showMsg(msg,'Creating account…');const {data,error}=await client.auth.signUp({email:c.email,password:c.password,options:{data:{full_name:c.name,name:c.name}}});showMsg(msg,error?friendlyError(error):(data.session?'Account created and signed in.':'Account created. Check your email to confirm your account.'),!!error)});
  }

  async function init(){try{removeLegacyPinUI();await ensureSdk();client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});window.dataPrepSupabase=client;window.dataPrepCloud={sync:async()=>{await cloudToLocal();await localToCloud()},reset:resetCloud,getUser:()=>user,flush:localToCloud};await getUser();if(user){await cloudToLocal();await localToCloud()}client.auth.onAuthStateChange(async(_event,session)=>{user=session?.user||null;renderAccount();if(user){setTimeout(async()=>{await cloudToLocal();await localToCloud()},0)}});window.dispatchEvent(new CustomEvent('dataprep-supabase-ready',{detail:{connected:true,user:!!user}}))}catch(e){console.warn('DataPrep Supabase initialization failed',e);window.dispatchEvent(new CustomEvent('dataprep-supabase-ready',{detail:{connected:false}}))}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();