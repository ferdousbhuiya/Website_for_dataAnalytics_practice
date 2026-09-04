(function(){
'use strict';
const REDIRECT_URL='https://bhuiyadata.ferdous.us/';
let bound=false,recoveryShown=false;

function safe(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function styles(){
  if(document.getElementById('bdRecoveryStyles'))return;
  const s=document.createElement('style');s.id='bdRecoveryStyles';s.textContent=`
  .bd-forgot-wrap{display:flex;justify-content:flex-end;margin:.28rem 0 .1rem}
  .bd-forgot-btn{border:0;background:transparent;color:#64d9ff;padding:.18rem .05rem;font:700 .69rem/1.3 Inter,sans-serif;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
  .bd-forgot-btn:hover{color:#8be5ff}
  .bd-recovery-note{margin:.55rem 0 0;color:#91a9bb;font-size:.7rem;line-height:1.5}
  .bd-password-strength{font-size:.66rem;color:#91a9bb;margin-top:.25rem}
  `;document.head.appendChild(s);
}
function msg(card,text,error=false){
  const el=card.querySelector('.dp-auth-msg');
  if(!el)return;
  el.textContent=text||'';el.classList.toggle('show',!!text);el.classList.toggle('error',!!error);
}
async function sendRecovery(card){
  const client=window.dataPrepSupabase;if(!client)return;
  const email=String(card.querySelector('[data-email]')?.value||'').trim();
  if(!/^\S+@\S+\.\S+$/.test(email)){msg(card,'Enter the email address used for your account.',true);card.querySelector('[data-email]')?.focus();return}
  const btn=card.querySelector('.bd-forgot-btn');if(btn){btn.disabled=true;btn.textContent='Sending…'}
  msg(card,'Sending password reset email…');
  const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:REDIRECT_URL});
  if(btn){btn.disabled=false;btn.textContent='Forgot password?'}
  if(error){msg(card,error.message||'Could not send the reset email. Please try again.',true);return}
  msg(card,'Reset link sent. Check your email, including Spam/Junk, then open the link to choose a new password.');
}
function enhanceSignInModal(){
  const card=document.querySelector('#dpAuthBackdrop .dp-auth-card');
  if(!card||card.dataset.recoveryEnhanced==='1'||!card.querySelector('[data-signin]'))return;
  card.dataset.recoveryEnhanced='1';
  const pass=card.querySelector('[data-password]');
  if(!pass)return;
  const wrap=document.createElement('div');wrap.className='bd-forgot-wrap';
  wrap.innerHTML='<button type="button" class="bd-forgot-btn">Forgot password?</button>';
  pass.insertAdjacentElement('afterend',wrap);
  wrap.querySelector('button').addEventListener('click',()=>sendRecovery(card));
}
function closeExisting(){document.getElementById('dpAuthBackdrop')?.remove();document.getElementById('bdRecoveryBackdrop')?.remove()}
function showRecovery(){
  if(recoveryShown)return;recoveryShown=true;styles();closeExisting();
  const d=document.createElement('div');d.id='bdRecoveryBackdrop';d.className='dp-auth-backdrop';
  d.innerHTML=`<div class="dp-auth-card"><button class="dp-auth-close" data-close aria-label="Close">×</button><h2>Choose a new password</h2><p>Your recovery link is verified. Create a new password for your Bhuiya Data account.</p><label>New password</label><input data-new-password type="password" autocomplete="new-password" minlength="8" placeholder="At least 8 characters"><label>Confirm new password</label><input data-confirm-password type="password" autocomplete="new-password" minlength="8" placeholder="Repeat your new password"><div class="bd-password-strength">Use at least 8 characters. A longer unique password is recommended.</div><div class="dp-auth-actions"><button class="dp-auth-primary" data-update-password>Update password</button></div><p class="dp-auth-msg"></p></div>`;
  document.body.appendChild(d);
  const card=d.querySelector('.dp-auth-card');
  d.querySelector('[data-close]').onclick=()=>d.remove();
  d.onclick=e=>{if(e.target===d)d.remove()};
  d.querySelector('[data-update-password]').onclick=async()=>{
    const p=String(d.querySelector('[data-new-password]').value||'');
    const c=String(d.querySelector('[data-confirm-password]').value||'');
    if(p.length<8){msg(card,'Password must contain at least 8 characters.',true);return}
    if(p!==c){msg(card,'The two passwords do not match.',true);return}
    const b=d.querySelector('[data-update-password]');b.disabled=true;b.textContent='Updating…';msg(card,'Updating your password…');
    const {error}=await window.dataPrepSupabase.auth.updateUser({password:p});
    b.disabled=false;b.textContent='Update password';
    if(error){msg(card,error.message||'Password could not be updated.',true);return}
    msg(card,'Password updated successfully. You can now sign in with your new password.');
    setTimeout(async()=>{try{await window.dataPrepSupabase.auth.signOut()}catch(_){}d.remove();document.getElementById('dpAccountBtn')?.click()},1300);
  };
}
function recoveryInUrl(){
  const q=new URLSearchParams(location.search);
  return q.get('type')==='recovery'||/(^|[&#])type=recovery(&|$)/.test(location.hash||'');
}
function bind(){
  const client=window.dataPrepSupabase;if(!client||bound)return false;bound=true;
  client.auth.onAuthStateChange((event)=>{if(event==='PASSWORD_RECOVERY')setTimeout(showRecovery,60)});
  if(recoveryInUrl())setTimeout(showRecovery,180);
  return true;
}
function init(){
  styles();
  new MutationObserver(enhanceSignInModal).observe(document.documentElement,{subtree:true,childList:true});
  enhanceSignInModal();
  let n=0;(function wait(){if(bind())return;if(n++<150)setTimeout(wait,100)})();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();