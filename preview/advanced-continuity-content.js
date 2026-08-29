(function(){
 const COURSES={
  excel_advanced:{title:'Excel: Advanced Analytics & Automation',meta:{track:'data-analyst',category:'Excel',icon:'📗',description:'Power Pivot, DAX, data models, automation, scenario analysis and governed reporting.'},lessons:[
   ['Data Models and Star Schemas','A finance workbook now combines sales, products, customers and calendar data. Build relationships instead of repeated lookup chains, define fact versus dimension tables, and validate one-to-many cardinality before reporting.'],
   ['Power Pivot and DAX Measures','Create reusable measures such as Revenue, Margin %, YTD Revenue and prior-period comparisons. Explain filter context and why a measure is safer than copying formulas across thousands of rows.'],
   ['Advanced Scenario and Sensitivity Analysis','Model price, volume, cost and conversion assumptions. Build base, upside and downside cases and identify which assumption has the greatest impact on profit.'],
   ['Automating Repeatable Reporting','Design a refreshable monthly reporting workflow using tables, Power Query, named logic and controlled output sheets. Remove manual copy/paste steps and add reconciliation checks.'],
   ['Auditability, Controls and Model Governance','Add source-to-report checks, documented assumptions, error flags, protected inputs and a clear ownership model so another analyst can reproduce and review the workbook.'],
   ['Executive Excel Case: Forecast and Decision Model','Build an executive planning model that combines actuals, forecast, scenario drivers and exception reporting, then present the decision and risks rather than only the spreadsheet.']
  ]},
  sql_advanced:{title:'SQL: Advanced Analytics & Performance',meta:{track:'data-analyst',category:'SQL',icon:'🗄️',description:'Query plans, indexes, advanced analytical SQL, dimensional models and production reliability.'},lessons:[
   ['Reading Query Plans and Finding Bottlenecks','Investigate a dashboard query that grew from 4 seconds to 80 seconds. Identify scans, expensive joins, sorts and cardinality-estimation problems before changing syntax.'],
   ['Indexes, Partitioning and Performance Trade-offs','Choose indexes from real access patterns, explain write-versus-read trade-offs, and recognize when partition pruning or clustering can reduce scanned data.'],
   ['Advanced Window Patterns and Cohort SQL','Use windows for rolling metrics, retention, sessionization, ranking and period comparisons while preserving the intended analytical grain.'],
   ['Dimensional Modeling for Analytics','Design fact and dimension tables, surrogate keys and slowly changing dimensions for reliable BI. Define grain first and prevent double counting.'],
   ['Production SQL: Testing, Reconciliation and Safety','Add row-count tests, uniqueness checks, null tests, source reconciliations and safe incremental logic so analytical SQL can run repeatedly in production.'],
   ['Advanced SQL Case: Diagnose Revenue and Margin','Combine performance tuning, complex transformations and validation to explain a revenue/margin change across product, region and customer segments.']
  ]},
  statistics_advanced:{title:'Statistics: Advanced Inference & Forecasting',meta:{track:'data-scientist',category:'Statistics',icon:'📊',description:'Model diagnostics, causal reasoning, experimental inference, forecasting and uncertainty communication.'},lessons:[
   ['Multiple Regression and Model Diagnostics','Move beyond coefficients: inspect residuals, nonlinearity, heteroscedasticity, influential points and multicollinearity before trusting business conclusions.'],
   ['Causal Reasoning and Confounding','Separate prediction from causation. Use DAG-style reasoning, adjustment logic and sensitivity questions to identify when an observed association may be misleading.'],
   ['Advanced Experiment Analysis','Analyze heterogeneous treatment effects, multiple metrics, practical significance and confidence intervals while avoiding p-hacking and post-hoc storytelling.'],
   ['Time Series Foundations and Forecast Validation','Model trend, seasonality and changing variance, then evaluate forecasts with time-aware validation rather than random train/test splits.'],
   ['Forecast Uncertainty and Scenario Planning','Communicate prediction intervals and scenario ranges so planning decisions reflect uncertainty rather than one false-precision point estimate.'],
   ['Advanced Statistics Case: Demand Forecast Decision','Build and validate a demand forecast, compare baselines, diagnose error by segment and translate uncertainty into inventory or staffing decisions.']
  ]},
  visualization_advanced:{title:'Visualization: Executive BI & Governance',meta:{track:'data-analyst',category:'Visualization',icon:'📈',description:'Executive dashboards, advanced interactivity, semantic consistency, performance and governance.'},lessons:[
   ['Executive Dashboard Architecture','Design a hierarchy from outcome KPI to drivers to exceptions so executives can understand what changed, why it changed and where action is required.'],
   ['Advanced Interactivity and Drill Paths','Use filters, drill-through, tooltips and decomposition paths intentionally. Prevent interactions that change denominators or create contradictory views.'],
   ['Semantic Metrics and Single Source of Truth','Define KPI logic centrally, document business definitions and ensure dashboards, finance reports and operational systems reconcile to the same metric contract.'],
   ['Dashboard Performance and Scalability','Reduce unnecessary visuals, optimize data models and queries, pre-aggregate when appropriate and measure load time from the user perspective.'],
   ['Accessibility, Governance and Release Controls','Apply accessible design, ownership, review, versioning, refresh monitoring and change management so dashboards remain trustworthy after launch.'],
   ['Executive BI Case: From KPI Alert to Action','Build an executive narrative for a deteriorating service KPI, provide drill-down evidence, quantify business impact and recommend an accountable next action.']
  ]},
  business_advanced:{title:'Business Analytics: Strategy & Decision Systems',meta:{track:'data-analyst',category:'Business',icon:'💼',description:'Forecasting, scenario planning, strategic metrics, resource allocation and decision systems.'},lessons:[
   ['Strategy Metrics and Driver Trees','Translate strategic goals into measurable drivers, leading indicators and controllable operating metrics without creating a vanity-metric scorecard.'],
   ['Forecasting for Business Planning','Build a planning forecast from historical drivers, known events and assumptions. Separate forecast from target and quantify uncertainty.'],
   ['Scenario Analysis and Decision Thresholds','Compare base, upside and downside scenarios and define thresholds at which management should change price, staffing, inventory or investment.'],
   ['Portfolio and Resource Allocation','Evaluate competing initiatives using incremental value, risk, capacity and strategic fit rather than ranking projects by revenue alone.'],
   ['Executive Decision Memos','Condense analysis into decision, evidence, financial impact, risks, assumptions and next action. Make uncertainty visible without weakening the recommendation.'],
   ['Strategy Case: Allocate a $1M Growth Budget','Compare acquisition, retention, pricing and product investments, model expected value and risk, then recommend an allocation with measurable success criteria.']
  ]},
  python_advanced:{title:'Python: Production Analytics & Automation',meta:{track:'core',category:'Python',icon:'🐍',description:'Reusable packages, testing, APIs, performance, automation and production analytical workflows.'},lessons:[
   ['From Notebook to Reusable Analytical Modules','Refactor exploratory code into functions and modules with clear inputs, outputs, configuration and error handling so analysis can be rerun safely.'],
   ['Testing Data Transformations','Write unit-style checks for transformations, schema expectations, row counts, edge cases and business rules. Test the assumptions that could silently change a KPI.'],
   ['APIs, Authentication and Reliable Data Retrieval','Build API clients with pagination, timeout handling, bounded retries, response validation and secret-safe configuration.'],
   ['Performance: Vectorization, Memory and Efficient I/O','Profile bottlenecks before optimizing; replace slow row loops, reduce unnecessary copies and choose file formats and data types intentionally.'],
   ['Automation, Scheduling and Observability','Turn an analysis into a scheduled workflow with structured logs, run IDs, validation checkpoints and clear failure notifications.'],
   ['Python Production Case: Automated Executive Report','Create a reproducible pipeline that retrieves data, validates it, computes KPIs, generates outputs and fails safely when source data is incomplete.']
  ]}
 };
 function lesson(t,i){return {number:i+1,title:t[0],content:`<div class="advanced-depth"><h4>Professional objective</h4><p>${t[1]}</p><h4>Advanced workflow</h4><ol><li>Define the stakeholder decision and success criterion.</li><li>State data grain, assumptions and operational constraints.</li><li>Apply the advanced technique and document why it is appropriate.</li><li>Stress-test edge cases, failure modes and alternative explanations.</li><li>Reconcile the result to an independent source or baseline.</li><li>Communicate recommendation, uncertainty, risk and next action.</li></ol><h4>Real-world challenge</h4><p>Your manager asks you to defend the result to finance, engineering or operations. Identify the evidence they could challenge and the validation you would show.</p><h4>Interview preparation</h4><p>Explain this topic using context → technical approach → validation → trade-off → business impact.</p></div>`}}
 function install(){if(!window.topicsData||!window.topicRegistry)return false;Object.keys(COURSES).forEach(k=>{const c=COURSES[k];window.topicsData[k]={title:c.title,metadata:c.meta,lessons:c.lessons.map(lesson),questions:[]};window.topicRegistry.topics[k]={level:'Advanced',track:c.meta.track,category:c.meta.category,color:'#22c55e',icon:c.meta.icon,description:c.meta.description};if(!window.topicRegistry.order.includes(k))window.topicRegistry.order.push(k)});return true}
 let n=0;(function wait(){if(install())return;if(n++<120)setTimeout(wait,100)})();
})();