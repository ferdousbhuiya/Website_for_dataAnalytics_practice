// content/projects.js
window.projectsData = [
    {
    title: "IMDb Cinematic Universe: What Drives a Film’s Fate?",
    tool: "Tableau",
    tags: ["Tableau", "Data Visualization", "Advanced Analytics", "Sankey Diagram"],
    situation: "The film industry generates massive amounts of data, but studios and investors often struggle to separate genuine box office drivers from hype, relying on simple ratings rather than deep financial and critical analysis.",
    task: "Build a comprehensive analytical story to uncover the hidden financial, critical, and structural drivers of movie success (ROI, audience reception, and director impact) from the inception of cinema through 2024.",
    action: "Engineered a complex Sankey Diagram to map financial flows (Country → Genre → ROI), calculated 'Critic vs. Crowd' disagreement metrics (Meta Score vs. IMDb), and analyzed 'Runtime Rhythms' and Directorial ROI using advanced Tableau visualizations.",
    result: "Revealed that USA-produced Adventure films dominate global revenue, pinpointed the 120–150 minute runtime bracket as the statistical peak for audience ratings, and isolated directors who consistently turn budgets into profit regardless of star power.",
    
    // Embed URL for Tableau Story (keeps the navigation arrows visible)
    embedUrl: "https://public.tableau.com/views/IMDbRatingsandAnalysisuntil2024/Story1?:embed=y&:toolbar=yes&:showVizHome=no",
    
    links: [
        { text: "View Full Story on Tableau Public", url: "https://public.tableau.com/app/profile/md.ferdouse.bhuiya2790/viz/IMDbRatingsandAnalysisuntil2024/Story1" }
    ]
},
    {
        title: "RetailCo 2023-2024 Sales Performance Overview",
    tool: "Tableau",
    tags: ["Tableau", "Sales Analytics", "KPI Tracking", "Profitability"],
    situation: "RetailCo stakeholders needed to evaluate their post-2022 sales trajectories, specifically comparing 2023 and 2024 performance to identify growth opportunities, regional profitability gaps, and top-performing inventory.",
    task: "Build a comprehensive executive dashboard to track year-over-year (YoY) sales trends, regional profit margins, and product category performance to guide future business strategy and inventory planning.",
    action: "Designed a multi-sheet analytical dashboard featuring regional sales vs. profit comparisons, temporal selling trends, and a 'Top 5 Best-Selling Products' breakdown. Implemented dynamic date filtering and culminated the project with a 'Strategic Summary & Next Steps' view to translate data into business actions.",
    result: "Provided leadership with a single pane of glass to visualize month-over-month sales fluctuations and isolate high/low margin regions. The strategic summary directly informed future inventory allocation and targeted regional marketing efforts.",
    
    // Embed URL for Tableau Dashboard
    embedUrl: "https://public.tableau.com/views/RetailcoSales/RetailCo2023-2024SalesperformanceOverview?:embed=y&:display_count=yes&:toolbar=yes&:showVizHome=no",
    
    links: [
        { text: "View on Tableau Public", url: "https://public.tableau.com/app/profile/md.ferdouse.bhuiya2790/viz/RetailcoSales/RetailCo2023-2024SalesperformanceOverview" }
    ]
},
{
    title: "Healthcare Readmission Risk Analytics",
    tool: "Tableau",
    tags: ["Tableau", "Healthcare Analytics", "Risk Profiling", "Operational KPIs"],
    situation: "Hospitals face severe financial penalties and quality-of-care challenges when patients are unexpectedly readmitted shortly after discharge. Administrators needed a way to identify the demographic and clinical drivers behind these readmissions.",
    task: "Design an interactive 'Readmission Risk Dashboard' to analyze patient histories, isolate high-risk cohorts, and uncover the root causes of hospital readmissions across various disease categories.",
    action: "Visualized multi-dimensional healthcare data, mapping length-of-stay distributions, average medication counts, and procedure volumes. Segregated the top 3 high-risk disease categories (Respiratory, Digestive, Circulatory) and implemented dynamic demographic filtering by age group to isolate vulnerable patient profiles.",
    result: "Provided hospital administrators with a clear view of readmission drivers, enabling them to identify high-risk patient cohorts and proactively improve post-discharge care plans to reduce costly readmissions.",

    // Embed URL for Tableau Dashboard
    embedUrl: "https://public.tableau.com/views/HealthDataVisualization/Dashboard1?:embed=y&:display_count=yes&:toolbar=yes&:showVizHome=no",

    links: [
        { text: "View on Tableau Public", url: "https://public.tableau.com/app/profile/md.ferdouse.bhuiya2790/viz/HealthDataVisualization/Dashboard1" }
    ],

    // Custom note to display below the dashboard (Option 2)
    footerNote: "All patient data utilized in this healthcare visualization has been strictly anonymized and processed to comply with data privacy standards (such as HIPAA guidelines). This ensures complete patient confidentiality while allowing hospital administrators to extract robust operational insights."
},
{
    title: "Customer Churn Prediction & Retention Strategy",
    tool: "Python",
    tags: ["Python", "Scikit-Learn", "Random Forest", "Predictive Modeling", "EDA"],
    situation: "A service provider was experiencing high customer attrition and needed to proactively identify at-risk customers to reduce revenue loss and improve retention rates.",
    task: "Build an end-to-end supervised machine learning pipeline to predict customer churn, identify the key drivers of attrition, and provide actionable business recommendations.",
    action: "Processed 10,000 customer records, handling missing values and class imbalance. Engineered features using one-hot encoding and scaling, then trained and tuned multiple models (Logistic Regression, Decision Tree, Random Forest, KNN) utilizing RandomizedSearchCV for hyperparameter optimization.",
    result: "Identified that month-to-month contracts, low tenure, and high monthly charges are the top drivers of churn. A tuned Random Forest model was selected as the best performer, enabling the business to target high-risk cohorts with specific retention strategies.",

    embedUrl: "",
    links: [
        { text: "View Source Code on GitHub", url: "https://github.com/ferdousbhuiya/customer-churn-analysis" }
    ],
    footerNote: "Utilized RandomizedSearchCV for rigorous hyperparameter tuning and prioritized ROC-AUC metrics to ensure robust evaluation despite the dataset's class imbalance."
},
{
    title: "E-Commerce Purchase Intention & Sales Analytics",
    tool: "Python",
    tags: ["Python", "Classification", "Hypothesis Testing", "SMOTE", "Random Forest"],
    situation: "An e-commerce platform needed to understand which session-level and behavioral factors drive a visitor to complete a purchase, facing a massive class imbalance where the majority of visits resulted in no revenue.",
    task: "Analyze 12,330 website visits to determine the statistical predictors of purchase intent, utilizing both frequentist inference and advanced classification techniques to optimize marketing efforts.",
    action: "Conducted a comprehensive 4-part analysis spanning EDA, statistical testing (t-tests, chi-square), and predictive modeling. Addressed severe class imbalance using SMOTE oversampling and trained regularized Logistic Regression and Random Forest models with 5-fold cross-validation.",
    result: "Determined that returning visitors and specific page duration metrics are significant predictors of conversion. The tuned Random Forest classifier achieved a 93.6% accuracy and 94.9% recall on balanced data, providing actionable insight for targeting high-intent visitors.",

    embedUrl: "",
    links: [
        { text: "View Source Code on GitHub", url: "https://github.com/ferdousbhuiya/online-shoppers-sales" }
    ],
    footerNote: "Implemented a rigorous 4-stage data science workflow combining statistical hypothesis testing (Chi-Square, T-Tests) with advanced machine learning classifiers to validate findings mathematically before predictive modeling."
},
{
    title: "Real Estate Pricing & Valuation Modeling",
    tool: "Python",
    tags: ["Python", "Linear Regression", "Statistical Modeling", "Plotly", "EDA"],
    situation: "A real estate development company required a reliable statistical model to estimate residential property values before breaking ground on new construction projects to ensure ROI.",
    task: "Build a multivariate linear regression model to predict median home prices in Boston based on 13 distinct socioeconomic, environmental, and structural predictors.",
    action: "Performed extensive exploratory data analysis using pair plots and correlation matrices. Applied a log-price transformation to handle skewed data and correct for heteroscedasticity, comparing standard linear regression against the log-price model using Scikit-Learn.",
    result: "The log-price model significantly improved out-of-sample generalization (Test R-squared increased from 0.67 to 0.74). Quantified the exact financial impact of property features, revealing that an additional room adds ~$3,108 in value and proximity to the Charles River commands a distinct premium.",
    embedUrl: "",
    links: [
        { text: "View Source Code on GitHub", url: "https://github.com/ferdousbhuiya/boston-housing-valuation" }
    ],
    footerNote: "Applied log-transformations to the target variable to correct for heteroscedasticity, demonstrating a deep understanding of statistical assumptions and improving the model's out-of-sample predictive power."
},
{
    title: "Bank Loan Portfolio & Financial Performance Report",
    tool: "Power BI",
    tags: ["Power BI", "DAX", "Financial Analytics", "KPI Dashboard", "Time Intelligence"],
    situation: "A lending institution required a unified view to monitor loan issuance, funding health, and risk exposure across thousands of applications.",
    task: "Build a multi-page executive dashboard (Summary, Overview, Details) to track MTD performance, MoM growth, and distinguish between good and bad loans.",
    action: "Modeled financial data and engineered complex DAX measures for Total Funded Amount, Average Interest Rate, and DTI ratios. Implemented dynamic filtering for loan grades, states, and verification statuses.",
    result: "Delivered a real-time analytics hub visualizing 38.6K applications and $435.8M in funding, enabling stakeholders to instantly identify risk trends and month-over-month performance shifts.",

    // This link allows the dashboard to be embedded directly in an iframe
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNGFhZDlkNjQtMDZjYS00MTQ5LTg0MTUtYzI4MzNhNDUxNmMxIiwidCI6ImVlYWNiNWNiLTUzNzAtNDM1OC1hOTZhLWEzNzgzYzk1ZDQyMiIsImMiOjF9",

    links: [
        { text: "View Live Dashboard", url: "https://app.powerbi.com/view?r=eyJrIjoiNGFhZDlkNjQtMDZjYS00MTQ5LTg0MTUtYzI4MzNhNDUxNmMxIiwidCI6ImVlYWNiNWNiLTUzNzAtNDM1OC1hOTZhLWEzNzgzYzk1ZDQyMiIsImMiOjF9" }
    ],

    footerNote: "Utilized advanced DAX time-intelligence functions (MTD, MoM) and data modeling to support executive financial decision-making."
},
{
    title: "HR Analytics: Employee Attrition & Workforce Insights",
    tool: "Power BI",
    tags: ["Power BI", "DAX", "HR Analytics", "People Analytics", "Data Privacy"],
    situation: "HR leadership needed to understand the root causes of employee turnover to reduce expensive recruitment and training cycles, while ensuring all reporting remained strictly compliant with employee data privacy standards.",
    task: "Design an interactive people-analytics dashboard to track headcount demographics, calculate overall and department-specific attrition rates, and identify the profile of a 'flight-risk' employee.",
    action: "Modeled a masked employee dataset in Power BI and engineered DAX measures for Active Headcount, Attrition Rate, and Average Tenure. Built interactive breakdowns by department, age band, business travel frequency, and salary slabs to isolate turnover hotspots.",
    result: "Provided HR leaders with a targeted view of high-turnover demographics (e.g., junior roles with high travel frequency), enabling proactive retention strategies, optimized hiring budgets, and fully anonymized, privacy-compliant reporting.",

    // Your exact HR Analytics "Publish to web" link
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNDdlYjFlZjgtNzg3Ni00NTUzLWI3YzktNzQwM2NhMGU1ZTY3IiwidCI6ImVlYWFjYjk1ZDQyMiIsImMiOjF9",

    links: [
        { text: "View Live Dashboard", url: "https://app.powerbi.com/view?r=eyJrIjoiNDdlYjFlZjgtNzg3Ni00NTUzLWI3YzktNzQwM2NhMGU1ZTY3IiwidCI6ImVlYWFjYjk1ZDQyMiIsImMiOjF9" }
    ],
    footerNote: "All employee records in this dashboard are fully masked and anonymized, demonstrating strict privacy compliance while retaining full analytical value for workforce planning."
},
{
    title: "Sales Performance & Market Insights Dashboard",
    tool: "Power BI",
    tags: ["Power BI", "DAX", "Sales Analytics", "Market Trends", "Stakeholder Feedback"],
    situation: "The sales and marketing teams lacked a consolidated view to track regional revenue, customer segments, and product performance over time, making it difficult to spot market trends and adjust strategies.",
    task: "Design an interactive sales dashboard to monitor key performance indicators (KPIs), analyze regional market share, and track revenue growth against targets based on stakeholder requirements.",
    action: "Modeled transactional sales data in Power BI and engineered DAX measures for Total Revenue, Profit Margin, and Year-over-Year (YoY) growth. Iteratively refined the dashboard's layout and visual hierarchy based on direct stakeholder feedback to improve user adoption and clarity.",
    result: "Delivered a high-impact executive dashboard that enabled sales leaders to instantly identify top-performing regions and underperforming product lines, directly informing targeted marketing campaigns and resource allocation.",

    // Your exact Sales Insights "Publish to web" link
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiMTI4NjE2MWQtMzViNy00YWFhLTk5NjItNGExNTRjMTcyZGIwIiwidCI6ImVlYWFjYjk1ZDQyMiIsImMiOjF9",

    links: [
        { text: "View Live Dashboard", url: "https://app.powerbi.com/view?r=eyJrIjoiMTI4NjE2MWQtMzViNy00YWFhLTk5NjItNGExNTRjMTcyZGIwIiwidCI6ImVlYWFjYjk1ZDQyMiIsImMiOjF9" }
    ],
    footerNote: "This project demonstrates an iterative development approach, where the final dashboard was refined and optimized based on direct stakeholder feedback to maximize business impact."
}
];
