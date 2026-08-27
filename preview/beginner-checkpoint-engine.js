(function(){
const CFG={
 statistics:{title:'Statistics Essentials',icon:'▥',accent:'#be73ff',topics:['statistics'],desc:'Descriptive statistics, probability, distributions, and inference.'},
 visualization:{title:'Data Visualization',icon:'↗',accent:'#28d9e8',topics:['visualization'],desc:'Charts, dashboards, best practices, and storytelling with data.'},
 business:{title:'Business Analytics',icon:'▣',accent:'#ffae2c',topics:['business','communication'],desc:'KPIs, metrics, business cases, communication, and decision making.'},
 python:{title:'Python Foundations',icon:'Py',accent:'#ffd04f',topics:['python_setup'],desc:'Python setup, environments, dependencies, and analytics foundations.'},
 etl:{title:'ETL Foundations',icon:'⚙',accent:'#ff7aa8',topics:['etl1','etl2','etl3','etl4'],desc:'ETL concepts, extraction, transformation, validation, and reliable data pipelines.'}
};
const BANK={
 python:[
 ['Why use a virtual environment?',['To isolate project dependencies','To make Python run without an interpreter','To replace source control','To permanently store cloud files'],0],
 ['Which command creates a virtual environment named .venv?',['python -m venv .venv','pip create .venv','python install venv','venv --new .venv'],0],
 ['What does requirements.txt primarily record?',['Project dependencies and versions','Only Python source code','Operating-system passwords','Database table names'],0],
 ['Which command commonly creates requirements.txt from an active environment?',['pip freeze > requirements.txt','python save requirements.txt','pip list --install','venv export python'],0],
 ['What is a major advantage of Google Colab?',['It requires little or no local setup','It permanently replaces production infrastructure','It guarantees unlimited storage','It removes the need to write Python'],0],
 ['Why activate the project virtual environment before installing packages?',['So packages install into that project environment','So VS Code is deleted','So all packages become global','So Python syntax changes'],0],
 ['Which file extension is used for a Jupyter Notebook?',['.ipynb','.xlsx','.sql','.css'],0],
 ['What does `pip install -r requirements.txt` do?',['Installs dependencies listed in the file','Deletes the virtual environment','Creates a database','Runs every Python script'],0],
 ['Why is reproducibility important in a data project?',['Others can recreate the same environment and workflow','It makes every model perfectly accurate','It removes the need for documentation','It prevents all data errors'],0],
 ['Which setup is generally more appropriate for a persistent local project?',['Python plus VS Code with a virtual environment','A temporary browser tab only','A spreadsheet macro only','No dependency management'],0]
 ],
 etl:[
 ['What does ETL stand for?',['Extract, Transform, Load','Evaluate, Test, Launch','Encode, Transfer, Link','Explore, Train, Learn'],0],
 ['What is the main purpose of extraction?',['Bring data from source systems into the pipeline','Create charts before reading data','Delete source systems','Train a machine-learning model'],0],
 ['Why validate extracted data?',['To catch missing, invalid, or inconsistent values','To make every file larger','To remove all business rules','To avoid documenting the pipeline'],0],
 ['What is a common reason to transform data?',['Standardize formats and business definitions','Hide all data from users','Replace source systems automatically','Avoid using schemas'],0],
 ['What is the load step responsible for?',['Writing prepared data to a target system','Collecting passwords','Designing a logo','Installing Python'],0],
 ['Why are retries useful in extraction jobs?',['Transient network or API failures can recover','They guarantee source data is always correct','They remove rate limits','They eliminate logging'],0],
 ['What is a data quality check?',['A rule that verifies expected properties of data','A chart theme','A user-interface animation','A file-compression setting'],0],
 ['Why log ETL pipeline events?',['To support monitoring, debugging, and auditing','To change SQL syntax','To replace validation','To increase duplicates'],0],
 ['What does an idempotent pipeline step mean?',['It can be rerun without creating unintended duplicate effects','It only runs once forever','It cannot fail','It ignores target data'],0],
 ['Why separate pipeline steps into modular functions?',['It improves testing, reuse, and maintenance','It prevents any future changes','It removes the need for input data','It guarantees zero latency'],0],
 ['Which issue is typical when ingesting APIs?',['Rate limits','Cell formatting','Slide transitions','Printer margins'],0],
 ['What should happen when a required field is missing?',['Handle it according to a defined validation rule','Silently assume any value','Delete the entire database','Disable logging'],0]
 ],
 statistics:[
 ['Which measure describes the arithmetic average?',['Mean','Median absolute deviation','Range','Mode only'],0],
 ['Which statistic is the middle value after sorting observations?',['Median','Variance','Maximum','Sum'],0],
 ['What does standard deviation describe?',['Typical spread around the mean','The number of columns','The largest observation only','A category label'],0],
 ['What does probability quantify?',['The likelihood of an event','The color of a chart','The size of a database','The name of a variable'],0],
 ['A probability of 0 means what?',['The event is impossible under the model','The event is certain','The sample mean is zero','The distribution is normal'],0],
 ['Which plot is commonly used to inspect a distribution?',['Histogram','Network diagram','Gantt chart','ER diagram'],0],
 ['What is an outlier?',['An observation unusually far from the rest','Every value above the mean','The first row of a dataset','A missing column name'],0],
 ['What does a confidence interval estimate?',['A plausible range for a population parameter','The exact value of every future observation','The number of dataframe rows','A chart color palette'],0],
 ['What is the null hypothesis used for?',['A baseline claim tested against evidence','A guaranteed final conclusion','A database key','A visualization legend'],0],
 ['What does correlation measure?',['Strength and direction of association between variables','Proof that one variable causes another','The total number of records','The median only'],0],
 ['Why is a larger random sample often helpful?',['It can reduce sampling variability','It guarantees no bias','It makes every variable normal','It removes the need for inference'],0],
 ['What is variance?',['Average squared deviation from the mean','The largest minus the smallest category name','The sample size','A probability of exactly one'],0]
 ],
 visualization:[
 ['Which chart is usually appropriate for comparing categories?',['Bar chart','Scatter plot','Histogram only','ER diagram'],0],
 ['Which chart is useful for showing the relationship between two numeric variables?',['Scatter plot','Pie chart','Table of contents','Flowchart only'],0],
 ['What is a key principle of dashboard design?',['Prioritize clarity and the most important information','Use as many colors as possible','Hide units and labels','Maximize decorative elements'],0],
 ['Why label axes clearly?',['So viewers understand the quantities and units','To make charts render faster','To replace the title','To change the underlying data'],0],
 ['When is a line chart commonly useful?',['Showing change over ordered time','Showing database relationships','Displaying source code','Representing file permissions'],0],
 ['What should color primarily do in an analytical chart?',['Support meaning and visual hierarchy','Decorate every element independently','Replace all labels','Make every series identical'],0],
 ['Why avoid unnecessary 3D effects?',['They can distort perception and reduce readability','They always increase accuracy','They reduce file size','They create missing values'],0],
 ['What is data-ink efficiency concerned with?',['Using visual elements that communicate useful information','Increasing background decoration','Adding more borders everywhere','Removing all annotations'],0],
 ['What should a good chart title do?',['Communicate what the viewer should understand','Repeat the filename only','Hide the subject','Replace the data'],0],
 ['Why maintain consistent scales when comparing charts?',['To avoid misleading visual comparisons','To make every value equal','To remove units','To increase randomness'],0]
 ],
 business:[
 ['What is a KPI?',['A measurable indicator tied to an important objective','Any number in a spreadsheet','A database password','A chart background'],0],
 ['Why define a business question before analysis?',['It focuses the analysis on a decision or objective','It guarantees a preferred answer','It removes the need for data','It prevents stakeholder input'],0],
 ['What makes a metric actionable?',['It can inform a decision or behavior','It is always the largest number','It has no business context','It never changes'],0],
 ['Why distinguish revenue from profit?',['They measure different business concepts','They are always numerically identical','Profit is only a chart type','Revenue excludes sales'],0],
 ['What is stakeholder communication primarily about?',['Presenting findings in a way relevant to the audience and decision','Showing every technical detail first','Avoiding recommendations','Using the same message for every audience'],0],
 ['What is a useful executive summary?',['A concise statement of findings, impact, and recommended action','A dump of raw rows','Only the source-code listing','A list of unrelated charts'],0],
 ['Why add context to a KPI?',['A number needs a target, comparison, or trend to be interpreted','Context makes metrics less accurate','Context removes units','Context replaces data quality'],0],
 ['What is a business case?',['An evidence-based justification for a proposed action or investment','A database constraint','A Python package','A chart legend'],0],
 ['What should an analyst do when evidence is uncertain?',['Communicate uncertainty and assumptions clearly','Present estimates as certain facts','Hide limitations','Remove all caveats'],0],
 ['Why tailor communication to stakeholders?',['Different audiences need different levels of detail and framing','Every audience already knows the same context','It changes the underlying data','It eliminates the need for evidence'],0]
 ]
};
let shell=null,subject=null,moduleIndex=0,quizIndex=0,answers=[];
function pin(){return localStorage.getItem('dataAnalyticsActivePin')||'default'}
function key(){return `dataPrepBeginnerCp_${subject}_${pin()}`}
function state(){try{return JSON.parse(localStorage.getItem(key())||'{}')}catch(_){return{}}}
function save(s){localStorage.setItem(key(),JSON.stringify(s))}
function allLessons(cfg){const out=[];cfg.topics.forEach(t=>(window.topicsData?.[t]?.lessons||[]).forEach((l,i)=>out.push({...l,_topic:t,_topicIndex:i})));return out}
function modules(cfg){const ls=allLessons(cfg),out=[];for(let i=0;i<ls.length;i+=3){const slice=ls.slice(i,i+3);out.push({index:out.length,from:i+1,to:i+slice.length,lessons:slice,name:slice[0]?.title||`Module ${out.length+1}`})}return out}
function passed(){const s=state(),n=modules(CFG[subject]).length;let c=0;for(let i=0;i<n;i++){if(s[i]?.passed)c++;else break}return c}
function status(i){const p=passed();return i<p?'Completed':i===p?'In Progress':'Preview'}
function ensure(){if(shell)return;shell=document.createElement('div');shell.id='bpShell';shell.className='bp-shell hidden';document.body.appendChild(shell)}
function header(){return `<header class="bp-head"><button class="bp-back" data-close>←</button><img src="logo.png" alt="DataPrep Pro"><div class="bp-head-title">Verified Beginner Learning</div></header>`}
function open(id){subject=id;moduleIndex=0;ensure();shell.classList.remove('hidden');document.body.classList.add('bp-open');renderSubject();window.scrollTo(0,0)}
function close(){shell?.classList.add('hidden');document.body.classList.remove('bp-open')}
function renderSubject(){const c=CFG[subject],mods=modules(c),p=passed(),pct=mods.length?Math.round(p/mods.length*100):0;shell.style.setProperty('--bp-accent',c.accent);shell.innerHTML=`${header()}<main class="bp-main"><div class="bp-crumb">Beginner › ${c.title}</div><section class="bp-card"><div class="bp-subject"><div class="bp-icon">${c.icon}</div><div><div class="bp-title-row"><h1>${c.title}</h1><span>Beginner</span></div><p>${c.desc}</p><small>${allLessons(c).length} lessons · ${mods.length} checkpoints</small></div></div><div class="bp-progress"><div><span>Verified progress</span><strong>${pct}%</strong></div><i><b style="width:${pct}%"></b></i><small>${p} of ${mods.length} checkpoints passed</small></div><div class="bp-note">You may read future modules in Preview mode. Their checkpoint stays locked until the previous checkpoint is passed.</div><div class="bp-modules">${mods.map((m,i)=>`<button data-module="${i}" class="bp-module ${status(i).toLowerCase()}"><span>${i+1}</span><div><strong>${m.name}</strong><small>Lessons ${m.from}–${m.to}</small></div><em>${status(i)}${status(i)==='Completed'?' ✓':''}</em><b>›</b></button>`).join('')}</div></section></main>`;bind()}
function qset(i){const bank=BANK[subject]||[];const out=[];for(let n=0;n<5;n++)out.push(bank[(i*3+n)%bank.length]);return out}
function renderModule(i){moduleIndex=i;const c=CFG[subject],m=modules(c)[i],s=status(i),locked=s==='Preview';shell.innerHTML=`${header()}<main class="bp-main"><div class="bp-crumb"><button data-subject>Beginner › ${c.title}</button> › Module ${i+1}</div><section class="bp-card"><div class="bp-module-head"><div><span>Module ${i+1}</span><h1>${m.name}</h1><p>Lessons ${m.from}–${m.to}</p></div><em>${s}</em></div><div class="bp-lessons">${m.lessons.map((l,j)=>`<article class="bp-lesson"><div class="bp-num">${m.from+j}</div><div><h2>${l.title||`Lesson ${m.from+j}`}</h2><div class="bp-content">${format(l.content||'')}</div></div></article>`).join('')}</div><div class="bp-checkpoint ${locked?'locked':''}"><div><span>Knowledge checkpoint</span><h3>Checkpoint ${i+1}</h3><p>5 questions · Pass with 4/5 or better.</p></div><button data-quiz ${locked?'disabled':''}>${locked?'Locked until previous checkpoint passes 🔒':state()[i]?.passed?'Retake Quiz':'Start Quiz →'}</button></div></section></main>`;bind()}
function format(raw){let x=String(raw);x=x.replace(/```([\s\S]*?)```/g,'<pre><code>$1</code></pre>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>');if(!/^\s*</.test(x))x='<p>'+x+'</p>';return x}
function renderQuiz(qi=0){quizIndex=qi;const c=CFG[subject],q=qset(moduleIndex)[qi];shell.innerHTML=`${header()}<main class="bp-main"><div class="bp-crumb"><button data-module-back>${c.title} › Module ${moduleIndex+1}</button> › Checkpoint ${moduleIndex+1}</div><section class="bp-quiz"><aside><span>Checkpoint ${moduleIndex+1}</span><h2>${modules(c)[moduleIndex].name}</h2><small>Question ${qi+1} of 5</small><div class="bp-dots">${[0,1,2,3,4].map(n=>`<b class="${n===qi?'current':answers[n]!=null?'answered':''}">${n+1}</b>`).join('')}</div></aside><div class="bp-question"><h2>${qi+1}. ${q[0]}</h2><div class="bp-options">${q[1].map((o,oi)=>`<button data-answer="${oi}" class="${answers[qi]===oi?'selected':''}"><span>${String.fromCharCode(65+oi)}.</span>${o}</button>`).join('')}</div><div class="bp-nav"><button data-prev ${qi===0?'disabled':''}>← Previous</button><button data-next ${answers[qi]==null?'disabled':''}>${qi===4?'Submit Quiz':'Next →'}</button></div></div></section></main>`;bind()}
function finish(){const qs=qset(moduleIndex);let score=0;qs.forEach((q,i)=>{if(answers[i]===q[2])score++});const s=state();s[moduleIndex]={score,passed:score>=4,attemptedAt:new Date().toISOString()};save(s);shell.innerHTML=`${header()}<main class="bp-main"><section class="bp-result ${score>=4?'pass':'fail'}"><span>${score>=4?'✓':'!'}</span><h1>${score>=4?'Checkpoint passed':'Not passed yet'}</h1><p>You scored <strong>${score}/5</strong>. ${score>=4?'Verified progress has been updated and the next checkpoint is unlocked.':'You need 4/5 to pass. Review the module and try again.'}</p><div><button data-subject>Back to ${CFG[subject].title}</button><button data-retry>${score>=4?'Review Quiz':'Retry Quiz'}</button></div></section></main>`;bind()}
function bind(){shell.querySelector('[data-close]')?.addEventListener('click',close);shell.querySelectorAll('[data-subject]').forEach(b=>b.onclick=renderSubject);shell.querySelectorAll('[data-module]').forEach(b=>b.onclick=()=>renderModule(Number(b.dataset.module)));shell.querySelector('[data-module-back]')?.addEventListener('click',()=>renderModule(moduleIndex));shell.querySelector('[data-quiz]')?.addEventListener('click',()=>{answers=[];renderQuiz(0)});shell.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{answers[quizIndex]=Number(b.dataset.answer);renderQuiz(quizIndex)});shell.querySelector('[data-prev]')?.addEventListener('click',()=>renderQuiz(Math.max(0,quizIndex-1)));shell.querySelector('[data-next]')?.addEventListener('click',()=>quizIndex===4?finish():renderQuiz(quizIndex+1));shell.querySelector('[data-retry]')?.addEventListener('click',()=>{answers=[];renderQuiz(0)})}
function install(){ensure();document.addEventListener('click',e=>{const card=e.target.closest('#beginnerSubjectBrowser .subject-card');if(!card)return;const title=(card.textContent||'').toLowerCase();const id=title.includes('statistics')?'statistics':title.includes('visualization')?'visualization':title.includes('business')?'business':title.includes('python')?'python':title.includes('etl')?'etl':null;if(!id)return;e.preventDefault();e.stopImmediatePropagation();open(id)},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();