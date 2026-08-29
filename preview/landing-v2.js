(function(){
 function icon(type){const common='viewBox="0 0 24 24" aria-hidden="true"';const m={
 path:`<svg ${common}><path d="M4 19V6l5-2 6 2 5-2v13l-5 2-6-2-5 2Z"/><path d="M9 4v13M15 6v13"/></svg>`,
 code:`<svg ${common}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>`,
 brief:`<svg ${common}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5h8v2M3 12h18M10 12v2h4v-2"/></svg>`,
 target:`<svg ${common}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12 20 4M16 4h4v4"/></svg>`,
 book:`<svg ${common}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/></svg>`,
 questions:`<svg ${common}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>`,
 topics:`<svg ${common}><path d="M4 5h16M4 10h16M4 15h16M4 20h10"/></svg>`,
 levels:`<svg ${common}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/></svg>`,
 user:`<svg ${common}><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>`,
 rocket:`<svg ${common}><path d="M14 4c3-2 6-2 6-2s0 3-2 6l-5 5-4-4 5-5Z"/><path d="m9 9-4 1-2 3 5 1M13 13l-1 5-3 2-1-5M15 6l3 3"/></svg>`};return m[type]||''}
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
      <article class="lv2-chart-card"><div class="lv2-card-title"><strong>Learning stages</strong></div><div class="lv2-stage-list"><div><b>●</b><span>Beginner</span><i><u style="width:85%"></u></i><em>85%</em></div><div><b>↗</b><span>Intermediate</span><i><u style="width:60%"></u></i><em>60%</em></div><div><b>◆</b><span>Advanced</span><i><u style="width:35%"></u></i><em>35%</em></div></div></article>
      <article class="lv2-chart-card lv2-cycle"><div class="lv2-card-title"><strong>Practice cycle</strong></div><div class="lv2-donut"><span>Keep<br>Learning<br>Daily</span></div><small>Consistency is the key</small></article>
    </div>
    <aside class="lv2-stats"><article><i>${icon('book')}</i><div><strong id="lv2Lessons">...</strong><span>Lessons</span><small>In-depth content</small></div></article><article><i class="orange">${icon('questions')}</i><div><strong id="lv2Questions">...</strong><span>Practice Questions</span><small>Test your knowledge</small></div></article><article><i class="purple">${icon('topics')}</i><div><strong id="lv2Topics">...</strong><span>Topics</span><small>Covering every detail</small></div></article><article><i class="blue">${icon('levels')}</i><div><strong>3</strong><span>Learning Levels</span><small>Beginner to Advanced</small></div></article></aside>
   </div>
 </section>
 <section class="lv2-journey">
   <div class="lv2-journey-copy"><span>A CLEAR PATH FROM BEGINNER TO JOB-READY</span><div class="lv2-journey-steps"><article><i>${icon('user')}</i><div><strong>Choose Level</strong><small>Beginner, intermediate, or advanced</small></div></article><b>→</b><article><i>${icon('book')}</i><div><strong>Learn & Practice</strong><small>Lessons, examples, and checkpoints</small></div></article><b>→</b><article><i>${icon('brief')}</i><div><strong>Build Projects</strong><small>Apply skills to portfolio-ready work</small></div></article><b>→</b><article><i>${icon('target')}</i><div><strong>Get Job Ready</strong><small>Interview preparation and career skills</small></div></article></div></div>
   <aside class="lv2-promo"><div><small>LEARN · PRACTICE · BUILD · SUCCEED</small><strong>Turn learning into measurable progress.</strong><p>Everything you need to move from fundamentals to practical, job-ready analytics skills.</p><button onclick="document.getElementById('path').scrollIntoView({behavior:'smooth'})">Start Your Journey →</button></div><span class="lv2-promo-art">${icon('rocket')}</span></aside>
 </section>`;updateCounts()}
 function updateCounts(){let tries=0;(function tick(){if(window.topicsData){let l=0,q=0,t=0;Object.values(window.topicsData).forEach(x=>{t++;l+=(x.lessons||[]).length;q+=(x.questions||[]).length});const a=document.getElementById('lv2Lessons'),b=document.getElementById('lv2Questions'),c=document.getElementById('lv2Topics');if(a)a.textContent=l+'+';if(b)b.textContent=q+'+';if(c)c.textContent=t+'+';return}if(tries++<100)setTimeout(tick,100)})()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();