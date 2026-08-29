(function(){
 const FEATURED=[
  {title:'Skills Pathfinder — AI Career Intelligence Platform',tool:'Full Stack AI',tags:['React','Python','Supabase','AI','Career Intelligence'],situation:'Students and career changers often have resumes, credentials and course history but no clear way to translate that evidence into realistic career options and a practical development plan.',task:'Build an end-to-end career intelligence platform that turns a user’s evidence into structured skills, career matches, gap analysis and actionable development roadmaps.',action:'Developed a React frontend, Python backend and Supabase persistence layer with resume and credential evidence extraction, skill normalization, career scoring, specialization comparisons, skill-gap analysis, saved reports and an AI Career Advisor.',result:'Created a deployed career-development application that connects evidence → skills → career opportunities → gaps → 30-day, 6-month and 1-year action plans.',links:[{text:'Open Live Skills Pathfinder',url:'https://skillpathfinder.ferdous.us'},{text:'View Source on GitHub',url:'https://github.com/ferdousbhuiya/HootCamp_V1'}],featured:true},
  {title:'ETL in Python & SQL',tool:'Python',tags:['Python','SQL','ETL','Data Engineering'],situation:'Analytical data must move reliably from raw sources into validated structures before reporting or modeling can be trusted.',task:'Develop practical ETL workflows using Python and SQL with an emphasis on extraction, transformation, validation and loading.',action:'Built data-processing exercises and pipeline components that combine Python transformation logic with SQL-based data handling.',result:'Demonstrates hands-on data engineering skills and the foundations used throughout the DataPrep Pro ETL curriculum.',links:[{text:'View Source on GitHub',url:'https://github.com/ferdousbhuiya/ETL_in_python_and_SQL'}]},
  {title:'Bangla Sentiment Analysis',tool:'Python',tags:['NLP','Bangla','Machine Learning','Sentiment Analysis'],situation:'Bangla-language text analytics has fewer ready-made resources than English NLP, creating additional challenges for preprocessing and model selection.',task:'Build a sentiment-analysis workflow for Bangla text and evaluate machine-learning/NLP approaches for classification.',action:'Worked with Bangla text preparation and sentiment modeling as part of a language-specific NLP project.',result:'Demonstrates practical NLP work beyond English-language datasets and experience adapting modeling workflows to Bangla text.',links:[{text:'View Source on GitHub',url:'https://github.com/ferdousbhuiya/Bangla_Sentiment_Analysis'}]},
  {title:'Facebook Ad Campaign Analytics',tool:'Python',tags:['Marketing Analytics','EDA','Campaign Performance','Python'],situation:'Marketing teams need to understand which campaign segments generate meaningful engagement and conversion rather than relying on surface-level activity metrics.',task:'Analyze advertising campaign data to identify performance patterns and decision-relevant marketing insights.',action:'Used exploratory analysis and visualization to investigate campaign behavior, audience response and performance differences.',result:'Shows how analytical techniques can be translated into practical marketing and campaign decisions.',links:[{text:'View Source on GitHub',url:'https://github.com/ferdousbhuiya/Facebook-Ad-Campaign'}]},
  {title:'Delhi Climate Forecast',tool:'Python',tags:['Time Series','Forecasting','Climate Data','Python'],situation:'Historical climate observations can be used to understand temporal patterns and test forecasting methods on real-world sequential data.',task:'Explore climate time-series data and develop a forecasting workflow for future observations.',action:'Prepared temporal data, investigated trends and applied forecasting-oriented analysis to climate measurements.',result:'Demonstrates experience working with time-dependent data, forecasting concepts and model evaluation.',links:[{text:'View Source on GitHub',url:'https://github.com/ferdousbhuiya/Delhi_Climate_Forecast'}]}
 ];
 function addProjects(){
  if(!Array.isArray(window.projectsData))return false;
  const titles=new Set(window.projectsData.map(p=>p.title));
  [...FEATURED].reverse().forEach(p=>{if(!titles.has(p.title))window.projectsData.unshift(p)});
  if(typeof window.renderProjects==='function')window.renderProjects();
  return true;
 }
 function enhanceAbout(){
  const view=document.getElementById('aboutView');if(!view||view.dataset.portfolioEnhanced)return;
  view.dataset.portfolioEnhanced='1';
  const title=view.querySelector('.learning-title');if(title)title.textContent='About Ferdous Bhuiya';
  const content=view.querySelector('.about-content');if(!content)return;
  const text=content.querySelector('.about-text');if(text)text.innerHTML=`
    <div class="portfolio-kicker">DATA ANALYTICS · AI · FULL-STACK DEVELOPMENT</div>
    <h3 class="portfolio-name">Ferdous Bhuiya</h3>
    <p class="portfolio-lead">I build practical data and software projects that turn raw information into useful analysis, reliable workflows and decision-support applications.</p>
    <p>My work spans Python, SQL, ETL and data engineering, statistical analysis, machine learning and NLP, Tableau and Power BI dashboards, and full-stack AI applications. DataPrep Pro brings that experience into a structured learning platform built around practice, validation and real-world problem solving.</p>
    <div class="portfolio-skill-row"><span>Python</span><span>SQL</span><span>ETL</span><span>Power BI</span><span>Tableau</span><span>Machine Learning</span><span>NLP</span><span>React</span><span>Supabase</span><span>AI Applications</span></div>
    <div class="portfolio-highlight"><small>RECENT DEVELOPMENT</small><strong>Skills Pathfinder</strong><p>An AI-powered career intelligence platform that converts resumes, credentials and learning evidence into normalized skills, career matches, skill gaps and personalized development roadmaps.</p><div><a href="https://skillpathfinder.ferdous.us" target="_blank" rel="noopener">Open live application</a><a href="https://github.com/ferdousbhuiya/HootCamp_V1" target="_blank" rel="noopener">GitHub repository</a></div></div>
    <div class="portfolio-about-actions"><a href="#projects" onclick="closeAbout();openProjects(event)">Explore my projects</a><a href="https://github.com/ferdousbhuiya" target="_blank" rel="noopener">GitHub profile</a><a href="https://www.linkedin.com/in/ferdousb/" target="_blank" rel="noopener">LinkedIn</a></div>
    <p class="contact-info">Contact: <a href="mailto:ferdousbhuiya.fl@gmail.com">ferdousbhuiya.fl@gmail.com</a></p>`;
 }
 function decorateProjects(){
  const grid=document.getElementById('projectsGrid');if(!grid)return;
  const cards=[...grid.querySelectorAll('.project-card-item')];
  cards.forEach((card,i)=>{if(i===0)card.classList.add('portfolio-featured-card')});
  const view=document.getElementById('projectsView');if(view&&!view.querySelector('.portfolio-project-intro')){
   const head=view.querySelector('.learning-header');if(head){const intro=document.createElement('div');intro.className='portfolio-project-intro';intro.innerHTML='<span>SELECTED WORK</span><strong>From dashboards and predictive models to data pipelines and full-stack AI products.</strong><p>The portfolio combines earlier analytics work with recent application development. Open the live experiences where available or review the source repositories.</p>';head.insertAdjacentElement('afterend',intro)}
  }
 }
 function start(){enhanceAbout();let n=0;(function wait(){if(addProjects()){setTimeout(decorateProjects,20);return}if(n++<100)setTimeout(wait,100)})()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
 const oldOpen=window.openProjects;window.openProjects=function(e){if(typeof oldOpen==='function')oldOpen(e);else{e?.preventDefault();document.getElementById('projectsView')?.classList.remove('hidden');window.scrollTo(0,0)};addProjects();setTimeout(decorateProjects,10)};
})();