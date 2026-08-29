(function(){
 function icon(type){const m={path:'🗺',code:'</>',brief:'▣',target:'◎',book:'▤',questions:'</>',topics:'▥',levels:'♛'};return m[type]||'•'}
 function build(){const hero=document.getElementById('home');if(!hero||hero.dataset.landingV2)return;hero.dataset.landingV2='1';hero.classList.add('landing-v2');const c=hero.querySelector('.container');if(!c)return;c.className='container landing-v2-grid';c.innerHTML=`
 <section class="lv2-hero-copy">
   <div class="lv2-kicker">✦ WELCOME TO DATAPREP PRO</div>
   <h1>Learn data analytics<br>from your first spreadsheet<br>to <span>advanced analysis.</span></h1>
   <p>Build practical skills in Excel, SQL, statistics, Python, visualization, data engineering, machine learning, and interview preparation with a clear, practical learning path.</p>
   <div class="lv2-actions"><button class="lv2-primary" onclick="document.getElementById('path').scrollIntoView({behavior:'smooth'})">Choose Your Level <b>→</b></button><button class="lv2-secondary" onclick="document.getElementById('path').scrollIntoView({behavior:'smooth'})">View Learning Path <b>▷</b></button></div>
   <div class="lv2-visual"><div class="lv2-screen"><div class="lv2-screen-top"><span></span><span></span><span></span></div><div class="lv2-screen-chart"><i></i><i></i><i></i><i></i><i></i></div><svg viewBox="0 0 220 80" aria-hidden="true"><polyline points="4,66 42,50 70,57 103,34 132,42 164,17 214,6" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="164" cy="17" r="5"/><circle cx="214" cy="6" r="5"/></svg></div><div class="lv2-bars"><i></i><i></i><i></i><i></i></div><div class="lv2-orbit"></div></div>
   <div class="lv2-benefits"><article><i>${icon('path')}</i><div><strong>Structured Learning Paths</strong><span>Step-by-step journey</span></div></article><article><i>${icon('code')}</i><div><strong>Hands-on Practice</strong><span>Learn by building</span></div></article><article><i>${icon('brief')}</i><div><strong>Real-world Projects</strong><span>Portfolio-ready work</span></div></article><article><i>${icon('target')}</i><div><strong>Interview Success</strong><span>Get job-ready</span></div></article></div>
 </section>
 <section class="lv2-dashboard">
   <div class="lv2-dashboard-head">✦ <span>YOUR LEARNING OVERVIEW</span></div>
   <div class="lv2-dashboard-main">
    <div class="lv2-chart-grid">
      <article class="lv2-chart-card"><div class="lv2-card-title"><strong>Learning progress</strong><em>68%</em></div><svg class="lv2-line-chart" viewBox="0 0 300 145"><path d="M0 128H300M0 94H300M0 60H300M0 26H300"/><polyline points="12,119 48,101 75,106 105,85 137,91 167,71 196,75 229,47 259,52 292,28"/><circle cx="292" cy="28" r="4"/></svg><div class="lv2-axis"><span>Start</span><span>Practice</span><span>Advance</span></div></article>
      <article class="lv2-chart-card"><div class="lv2-card-title"><strong>Skills progress</strong><em>72%</em></div><div class="lv2-bar-chart"><i style="height:38%"></i><i style="height:56%"></i><i style="height:51%"></i><i style="height:74%"></i><i style="height:92%"></i></div></article>
      <article class="lv2-chart-card"><div class="lv2-card-title"><strong>Learning stages</strong></div><div class="lv2-stage-list"><div><b>◉</b><span>Beginner</span><i><u style="width:85%"></u></i><em>85%</em></div><div><b>↗</b><span>Intermediate</span><i><u style="width:60%"></u></i><em>60%</em></div><div><b>♛</b><span>Advanced</span><i><u style="width:35%"></u></i><em>35%</em></div></div></article>
      <article class="lv2-chart-card lv2-cycle"><div class="lv2-card-title"><strong>Practice cycle</strong></div><div class="lv2-donut"><span>Keep<br>Learning<br>Daily</span></div><small>Consistency is the key</small></article>
    </div>
    <aside class="lv2-stats"><article><i>${icon('book')}</i><div><strong id="lv2Lessons">...</strong><span>Lessons</span><small>In-depth content</small></div></article><article><i class="orange">${icon('questions')}</i><div><strong id="lv2Questions">...</strong><span>Practice Questions</span><small>Test your knowledge</small></div></article><article><i class="purple">${icon('topics')}</i><div><strong id="lv2Topics">...</strong><span>Topics</span><small>Covering every detail</small></div></article><article><i class="blue">${icon('levels')}</i><div><strong>3</strong><span>Learning Levels</span><small>Beginner to Advanced</small></div></article></aside>
   </div>
 </section>`;
 updateCounts();
 }
 function updateCounts(){let tries=0;(function tick(){if(window.topicsData){let l=0,q=0,t=0;Object.values(window.topicsData).forEach(x=>{t++;l+=(x.lessons||[]).length;q+=(x.questions||[]).length});const a=document.getElementById('lv2Lessons'),b=document.getElementById('lv2Questions'),c=document.getElementById('lv2Topics');if(a)a.textContent=l+'+';if(b)b.textContent=q+'+';if(c)c.textContent=t+'+';return}if(tries++<100)setTimeout(tick,100)})()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();