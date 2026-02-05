// BUSINESS topic data
const businessData = {
        title: "Business Intelligence",
        lessons: [
    {
        "number": 1,
        "title": "What is Business Intelligence?",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Converting raw data into actionable strategic knowledge. It connects the \"What\" (Data) to the \"So What?\" (Business Value).</p>\n    "
    },
    {
        "number": 2,
        "title": "Key Performance Indicators (KPIs)",
        "content": "\n        <h4>1. Metric vs KPI</h4>\n        <p>All KPIs are metrics, but not all metrics are KPIs. A KPI is a metric that is critical to the core business strategy.</p>\n        <p><em>Example:</em> \"Facebook Likes\" is a vanity metric. \"Customer Acquisition Cost\" is a KPI.</p>\n    "
    },
    {
        "number": 3,
        "title": "The Analytics Lifecycle",
        "content": "\n        <h4>1. The 4 Levels</h4>\n        <ul>\n            <li><strong>Descriptive:</strong> What happened?</li>\n            <li><strong>Diagnostic:</strong> Why did it happen?</li>\n            <li><strong>Predictive:</strong> What will happen?</li>\n            <li><strong>Prescriptive:</strong> How can we make it happen?</li>\n        </ul>\n    "
    },
    {
        "number": 4,
        "title": "Data Warehousing",
        "content": "\n        <h4>1. Concept</h4>\n        <p>A central repository covering the whole enterprise. The \"Single Source of Truth.\"</p>\n        <h4>2. OLAP vs OLTP</h4>\n        <p>Warehouses are OLAP (Analytics - Fast reading). Databases are often OLTP (Transactions - Fast writing).</p>\n    "
    },
    {
        "number": 5,
        "title": "Dimensional Modeling",
        "content": "\n        <h4>1. Star Schema</h4>\n        <p>The standard design for BI.</p>\n        <ul>\n            <li><strong>Fact Table:</strong> Center. Contains numbers (Sales, Qty) and keys.</li>\n            <li><strong>Dimension Tables:</strong> Spines. Contain context (Who, Where, When).</li>\n        </ul>\n    "
    },
    {
        "number": 6,
        "title": "Self-Service BI",
        "content": "\n        <h4>1. Democratization</h4>\n        <p>Moving away from \"Call IT for a report\" to enabling business users to build their own dashboards (Tableau, Looker).</p>\n    "
    },
    {
        "number": 7,
        "title": "Data Governance",
        "content": "\n        <h4>1. The Rules</h4>\n        <p>Who owns the data? Who can see it? Is it accurate? Without governance, you have \"Data Swamps\" instead of Data Lakes.</p>\n    "
    },
    {
        "number": 8,
        "title": "Requirement Gathering",
        "content": "\n        <h4>1. The Soft Skill</h4>\n        <p>Don't just build what they ask for. Build what they need. Ask \"What decision will you make with this number?\"</p>\n    "
    },
    {
        "number": 9,
        "title": "Metric Definition",
        "content": "\n        <h4>1. Chaos Prevention</h4>\n        <p>Does \"Churn\" mean cancelling subscription or just pausing? Defining these terms across the company is hard but vital.</p>\n    "
    },
    {
        "number": 10,
        "title": "Root Cause Analysis",
        "content": "\n        <h4>1. The 5 Whys</h4>\n        <p>Ask \"Why\" 5 times to get to the root.</p>\n        <p>Sales down -> Why? Leads down -> Why? Website traffic down -> Why? Server error -> Why? Bad depolyment.</p>\n    "
    },
    {
        "number": 11,
        "title": "Decision Making",
        "content": "\n        <h4>1. Data Driven vs Data Informed</h4>\n        <p>Data should guide decisions, but context and intuition still matter. Don't follow a metric into a cliff.</p>\n    "
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "easy",
        "question": "What does BI stand for?",
        "context": "Definitions",
        "answer": "<h4>Business Intelligence</h4><p>Strategies and technologies for analyzing business data.</p>"
    },
    {
        "number": 2,
        "difficulty": "easy",
        "question": "What is a Metric?",
        "context": "Definitions",
        "answer": "<h4>Measurement</h4><p>A quantitative measurement of data.</p>"
    },
    {
        "number": 3,
        "difficulty": "medium",
        "question": "Metric vs KPI?",
        "context": "Concepts",
        "answer": "<h4>Importance</h4><p>All KPIs are metrics, but not all metrics are KPIs. KPIs differ by measuring critical business goals.</p>"
    },
    {
        "number": 4,
        "difficulty": "hard",
        "question": "Leading vs Lagging Indicators?",
        "context": "KPIs",
        "answer": "<h4>Prediction</h4><p>Lagging looks back (Revenue). Leading predicts future (Pipeline, Site Traffic).</p>"
    },
    {
        "number": 5,
        "difficulty": "medium",
        "question": "What is ETL?",
        "context": "Data Eng",
        "answer": "<h4>Extract, Transform, Load</h4><p>Process of moving data from source to warehouse.</p>"
    },
    {
        "number": 6,
        "difficulty": "medium",
        "question": "What is Churn Rate?",
        "context": "SaaS Metrics",
        "answer": "<h4>Attrition</h4><p>Percentage of customers who stop using a service.</p>"
    },
    {
        "number": 7,
        "difficulty": "medium",
        "question": "What is CAC?",
        "context": "Marketing",
        "answer": "<h4>Customer Acquisition Cost</h4><p>Total cost to acquire a new customer.</p>"
    },
    {
        "number": 8,
        "difficulty": "medium",
        "question": "What is LTV (or CLV)?",
        "context": "Marketing",
        "answer": "<h4>Lifetime Value</h4><p>Total revenue expected from a customer over their lifetime.</p>"
    },
    {
        "number": 9,
        "difficulty": "hard",
        "question": "What is a Star Schema?",
        "context": "Modeling",
        "answer": "<h4>Structure</h4><p>Database schema with central fact table connected to dimension tables.</p>"
    },
    {
        "number": 10,
        "difficulty": "easy",
        "question": "What is ROI?",
        "context": "Finance",
        "answer": "<h4>Return on Investment</h4><p>(Net Profit / Cost of Investment) x 100.</p>"
    },
    {
        "number": 11,
        "difficulty": "medium",
        "question": "What is Data Granularity?",
        "context": "Data",
        "answer": "<h4>Detail Level</h4><p>The level of detail in the data (e.g., daily vs monthly).</p>"
    },
    {
        "number": 12,
        "difficulty": "hard",
        "question": "Explain 'Drill Down'.",
        "context": "Analysis",
        "answer": "<h4>Detail</h4><p>Navigating from high-level summary to detailed data.</p>"
    },
    {
        "number": 13,
        "difficulty": "easy",
        "question": "What is a Funnel?",
        "context": "Analysis",
        "answer": "<h4>Stages</h4><p>Series of steps a user takes towards a goal.</p>"
    },
    {
        "number": 14,
        "difficulty": "medium",
        "question": "What is Seasonality?",
        "context": "Trends",
        "answer": "<h4>Cycles</h4><p>Periodic fluctuations in data (e.g., holiday sales).</p>"
    },
    {
        "number": 15,
        "difficulty": "hard",
        "question": "What is Cohort Analysis?",
        "context": "Analysis",
        "answer": "<h4>Groups</h4><p>Analyzing behavior of groups (cohorts) over time.</p>"
    },
    {
        "number": 16,
        "difficulty": "medium",
        "question": "What is a Data Warehouse?",
        "context": "Storage",
        "answer": "<h4>Repository</h4><p>Central repository for aggregated data from disparate sources.</p>"
    },
    {
        "number": 17,
        "difficulty": "easy",
        "question": "What is Reporting?",
        "context": "Output",
        "answer": "<h4>Presentation</h4><p>Organizing data into informational summaries.</p>"
    },
    {
        "number": 18,
        "difficulty": "medium",
        "question": "What is Ad-Hoc Analysis?",
        "context": "Analysis",
        "answer": "<h4>On-Demand</h4><p>Analysis designed to answer a specific, single business question.</p>"
    },
    {
        "number": 19,
        "difficulty": "hard",
        "question": "What is Data Governance?",
        "context": "Management",
        "answer": "<h4>Policy</h4><p>Management of data availability, usability, integrity, and security.</p>"
    },
    {
        "number": 20,
        "difficulty": "medium",
        "question": "What is YoY?",
        "context": "Comparison",
        "answer": "<h4>Year over Year</h4><p>Comparing stats from one period to the same period the previous year.</p>"
    },
    {
        "number": 21,
        "difficulty": "easy",
        "question": "What is a Stakeholder?",
        "context": "Business",
        "answer": "<h4>Interested Party</h4><p>Anyone with an interest or concern in the outcome.</p>"
    },
    {
        "number": 22,
        "difficulty": "medium",
        "question": " What is Conversion Rate?",
        "context": "Metrics",
        "answer": "<h4>Success</h4><p>(Conversions / Total Visitors) x 100.</p>"
    },
    {
        "number": 23,
        "difficulty": "hard",
        "question": "What is a Fact Table?",
        "context": "Modeling",
        "answer": "<h4>Measurements</h4><p>Table in star schema containing the quantitative data (metrics).</p>"
    },
    {
        "number": 24,
        "difficulty": "medium",
        "question": "What is a Dimension Table?",
        "context": "Modeling",
        "answer": "<h4>Descriptive</h4><p>Table containing descriptive attributes (who, what, where) related to facts.</p>"
    },
    {
        "number": 25,
        "difficulty": "easy",
        "question": "What is Margin?",
        "context": "Finance",
        "answer": "<h4>Profit</h4><p>Difference between selling price and cost.</p>"
    },
    {
        "number": 26,
        "difficulty": "medium",
        "question": "What is ARPU?",
        "context": "Metrics",
        "answer": "<h4>Average Revenue Per User</h4><p>Total Revenue / Number of Users.</p>"
    },
    {
        "number": 27,
        "difficulty": "hard",
        "question": "What is Predictive Analytics?",
        "context": "Advanced",
        "answer": "<h4>Forecasting</h4><p>Using historical data to predict future outcomes.</p>"
    },
    {
        "number": 28,
        "difficulty": "medium",
        "question": "What is Market Share?",
        "context": "Business",
        "answer": "<h4>Dominance</h4><p>Percentage of an industry's total sales earned by a particular company.</p>"
    },
    {
        "number": 29,
        "difficulty": "easy",
        "question": "What is Budget vs Actual?",
        "context": "Finance",
        "answer": "<h4>Variance</h4><p>Comparing planned spend vs real spend.</p>"
    },
    {
        "number": 30,
        "difficulty": "medium",
        "question": "What is Retention Rate?",
        "context": "Metrics",
        "answer": "<h4>Loyalty</h4><p>Percentage of customers retained over a period.</p>"
    },
    {
        "number": 31,
        "difficulty": "hard",
        "question": "What is Self-Service BI?",
        "context": "Trends",
        "answer": "<h4>Autonomy</h4><p>Tools allowing end users to access and analyze data without IT analysis.</p>"
    },
    {
        "number": 32,
        "difficulty": "easy",
        "question": "What is Raw Data?",
        "context": "Data",
        "answer": "<h4>Unprocessed</h4><p>Data that has not been processed for use.</p>"
    },
    {
        "number": 33,
        "difficulty": "medium",
        "question": "What is Data Latency?",
        "context": "Performance",
        "answer": "<h4>Delay</h4><p>Time taken for data to become available for analysis.</p>"
    },
    {
        "number": 34,
        "difficulty": "hard",
        "question": "What is Normalization?",
        "context": "Database",
        "answer": "<h4>Organization</h4><p>Structuring a database to reduce redundancy.</p>"
    },
    {
        "number": 35,
        "difficulty": "medium",
        "question": "What is Benchmarking?",
        "context": "Analysis",
        "answer": "<h4>Comparison</h4><p>Comparing performance against standards or peers.</p>"
    }
]
    };

if (typeof window !== 'undefined') {
    window.businessData = businessData;
}
