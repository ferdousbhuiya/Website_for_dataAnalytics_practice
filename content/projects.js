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
        title: "HR Attrition Analysis",
        tool: "Power BI",
        tags: ["Power BI", "DAX", "Power Query"],
        situation: "HR department lacked visibility into factors driving employee turnover.",
        task: "Develop a dynamic attrition dashboard to monitor demographics and performance metrics.",
        action: "Used Power Query to clean HRIS data and wrote complex DAX time intelligence measures for rolling attrition rates.",
        result: "Identified that employees in Region X with under 2 years of tenure were 40% more likely to churn, prompting a policy change.",
        // If using NovyPro, put the NovyPro embed link here. If using Option B (Video), put the YouTube link in videoUrl.
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube Walkthrough
        links: [
            { text: "Read Full Case Study", url: "#" }
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
}
];
