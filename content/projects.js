// content/projects.js
window.projectsData = [
    {
        title: "Global Supply Chain KPI Tracker",
        tool: "Tableau",
        tags: ["Tableau", "SQL", "Data Visualization"],
        situation: "Retail company needed to understand post-pandemic sales drops and supply chain delays.",
        task: "Build an interactive executive summary dashboard to track inventory and sales.",
        action: "Modeled 5M+ rows of transaction data using Star Schema and created Tableau LOD calculations for YoY growth.",
        result: "Identified a 15% inventory surplus, leading to a new clearance strategy that saved $200K.",
        // This is the URL you get from Tableau Public's "Share -> Embed Code"
        embedUrl: "https://public.tableau.com/views/IMDbRatingsandAnalysisuntil2024/Story1?:embed=y&:display_count=yes&:showVizHome=no", 
        links: [
            { text: "View on Tableau Public", url: "https://public.tableau.com/" }
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
    }
];