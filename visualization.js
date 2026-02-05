// Data visualization topic data
// Depends on data.js (topicsData)

const visualizationData = {
    title: "Data Visualization",
    lessons: [
    {
        "number": 1,
        "title": "Why Visualize Data?",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>It's not just \"making pretty pictures.\" It is cognitive offloading. You transform abstract numbers into visual patterns (length, position, color) that the human brain processes instantly.</p>\n        <h4>2. Anscombe's Quartet</h4>\n        <p>A famous example where 4 datasets have identical Mean, Variance, and Correlation, but look completely different when plotted. <strong>Always plot your data.</strong></p>\n    "
    },
    {
        "number": 2,
        "title": "Choosing the Right Chart",
        "content": "\n        <h4>1. Use Case Framework</h4>\n        <ul>\n            <li><strong>Comparison:</strong> Bar Chart.</li>\n            <li><strong>Trend over Time:</strong> Line Chart.</li>\n            <li><strong>Correlation:</strong> Scatter Plot.</li>\n            <li><strong>Distribution:</strong> Histogram.</li>\n            <li><strong>Part-to-Whole:</strong> Stacked Bar (or Pie, rarely).</li>\n        </ul>\n    "
    },
    {
        "number": 3,
        "title": "Design Principles",
        "content": "\n        <h4>1. Clarity over Beauty</h4>\n        <p>If the user has to ask \"what am I looking at?\", the chart failed.</p>\n        <h4>2. Best Practices</h4>\n        <ul>\n            <li>Remove chart junk (3D effects, shadows).</li>\n            <li>Directly label lines instead of using a legend (reduces eye travel).</li>\n            <li>Use consistent time intervals.</li>\n        </ul>\n    "
    },
    {
        "number": 4,
        "title": "Color Theory for Data",
        "content": "\n        <h4>1. Types of Palettes</h4>\n        <ul>\n            <li><strong>Sequential:</strong> Light to Dark (e.g., Sales 0 to 1M).</li>\n            <li><strong>Diverging:</strong> Two colors meeting in middle (e.g., Profit vs Loss, Red vs Blue).</li>\n            <li><strong>Categorical:</strong> Distinct colors (e.g., Departments).</li>\n        </ul>\n        <h4>2. Accessibility</h4>\n        <p>Always check for Red-Green color blindness.</p>\n    "
    },
    {
        "number": 5,
        "title": "Dashboards vs Reports",
        "content": "\n        <h4>1. Dashboard</h4>\n        <p>Live, interactive monitoring tool. \"What is happening right now?\" (e.g., Car Dashboard).</p>\n        <h4>2. Report</h4>\n        <p>Static, deep-dive document. \"Why did this happen?\" (e.g., Mechanic's report).</p>\n    "
    },
    {
        "number": 6,
        "title": "Storytelling with Data",
        "content": "\n        <h4>1. The Narrative Arc</h4>\n        <p>Don't just show data. Show: Context -> Conflict (The Problem) -> Resolution (The Insight).</p>\n        <h4>2. Actionable Insights</h4>\n        <p>Every chart should support a recommendation. \"Churn is up\" is data. \"Churn is up because of X, so we should do Y\" is a story.</p>\n    "
    },
    {
        "number": 7,
        "title": "Common Mistakes",
        "content": "\n        <h4>1. Truncating the Y-Axis</h4>\n        <p>Starting a bar chart at 50% instead of 0% exaggerates differences. It is misleading.</p>\n        <h4>2. Spagetti Charts</h4>\n        <p>Line charts with 20+ lines. Impossible to read. Use grouping or small multiples instead.</p>\n    "
    },
    {
        "number": 8,
        "title": "Tools of the Trade",
        "content": "\n        <h4>1. Landscape</h4>\n        <ul>\n            <li><strong>Tableau/PowerBI:</strong> Enterprise standard for Dashboards.</li>\n            <li><strong>Python/R:</strong> Best for custom, statistical, or scientific viz.</li>\n            <li><strong>Excel:</strong> Best for quick, ad-hoc charts.</li>\n        </ul>\n    "
    }
],
    questions: [
    {
        "number": 1,
        "difficulty": "easy",
        "question": "What is the primary goal of data visualization?",
        "context": "Purpose",
        "answer": "<h4>Communication</h4><p>To communicate information clearly and efficiently.</p>"
    },
    {
        "number": 2,
        "difficulty": "easy",
        "question": "Which chart is best for showing trends over time?",
        "context": "Time Series",
        "answer": "<h4>Line Chart</h4><p>Best for continuous data over time.</p>"
    },
    {
        "number": 3,
        "difficulty": "medium",
        "question": "When should you use a Bar Chart vs a Column Chart?",
        "context": "Orientation",
        "answer": "<h4>Labels</h4><p>Use Bar (horizontal) when category labels are long.</p>"
    },
    {
        "number": 4,
        "difficulty": "medium",
        "question": "What is 'Chart Junk'?",
        "context": "Design",
        "answer": "<h4>Clutter</h4><p>Unnecessary elements that distract from the data (e.g., excessive grid lines, 3D effects).</p>"
    },
    {
        "number": 5,
        "difficulty": "easy",
        "question": "What does a Pie Chart show?",
        "context": "Composition",
        "answer": "<h4>Part-to-Whole</h4><p>Proportions of a whole. Limit to 3-5 slices.</p>"
    },
    {
        "number": 6,
        "difficulty": "hard",
        "question": "Explain the 'Data-Ink Ratio'.",
        "context": "Tufte's Principle",
        "answer": "<h4>Efficiency</h4><p>The proportion of ink used to display data vs total ink. Maximize this ratio.</p>"
    },
    {
        "number": 7,
        "difficulty": "medium",
        "question": "When is a Scatter Plot useful?",
        "context": "Relationships",
        "answer": "<h4>Correlation</h4><p>Showing the relationship between two numerical variables.</p>"
    },
    {
        "number": 8,
        "difficulty": "medium",
        "question": "What is a Heatmap?",
        "context": "Density",
        "answer": "<h4>Intensity</h4><p>Using color to represent value density in a matrix or map.</p>"
    },
    {
        "number": 9,
        "difficulty": "easy",
        "question": "Why avoid 3D charts?",
        "context": "Perception",
        "answer": "<h4>Distortion</h4><p>They distort perspective and make values hard to read.</p>"
    },
    {
        "number": 10,
        "difficulty": "hard",
        "question": "What is a Dual-Axis chart?",
        "context": "Advanced",
        "answer": "<h4>Two Scales</h4><p>Plotting two series with different units/scales. Can be misleading if not careful.</p>"
    },
    {
        "number": 11,
        "difficulty": "medium",
        "question": "What is a Histogram?",
        "context": "Distribution",
        "answer": "<h4>Frequency</h4><p>Shows the distribution of a continuous variable.</p>"
    },
    {
        "number": 12,
        "difficulty": "medium",
        "question": "Difference between Histogram and Bar Chart?",
        "context": "Data Type",
        "answer": "<h4>Continuous vs Categorical</h4><p>Histogram for continuous ranges, Bar Chart for discrete categories.</p>"
    },
    {
        "number": 13,
        "difficulty": "easy",
        "question": "What is a Dashboard?",
        "context": "Overview",
        "answer": "<h4>At a Glance</h4><p>A visual display of key metrics on a single screen.</p>"
    },
    {
        "number": 14,
        "difficulty": "hard",
        "question": "What is Pre-attentive Processing?",
        "context": "Cognition",
        "answer": "<h4>Subconscious</h4><p>Visual attributes (color, size) processed instantly without conscious effort.</p>"
    },
    {
        "number": 15,
        "difficulty": "medium",
        "question": "What is a Box Plot (Box and Whisker)?",
        "context": "Statistics",
        "answer": "<h4>Spread</h4><p>Shows median, quartiles, and outliers.</p>"
    },
    {
        "number": 16,
        "difficulty": "medium",
        "question": "When to use a Stacked Bar Chart?",
        "context": "Composition",
        "answer": "<h4>Total + Part</h4><p>Comparing totals and their composition across groups.</p>"
    },
    {
        "number": 17,
        "difficulty": "easy",
        "question": "What is a KPI?",
        "context": "Metrics",
        "answer": "<h4>Key Performance Indicator</h4><p>A measurable value that demonstrates how effectively a company is achieving key business objectives.</p>"
    },
    {
        "number": 18,
        "difficulty": "medium",
        "question": "What is a Bullet Graph?",
        "context": "Performance",
        "answer": "<h4>Target vs Actual</h4><p>Variation of a bar graph to show performance against a target.</p>"
    },
    {
        "number": 19,
        "difficulty": "hard",
        "question": "Describe 'Gestalt Principles' in visualization.",
        "context": "Psychology",
        "answer": "<h4>Perception</h4><p>How humans perceive patterns (Proximity, Similarity, Enclosure).</p>"
    },
    {
        "number": 20,
        "difficulty": "easy",
        "question": "What color palette for categorical data?",
        "context": "Color",
        "answer": "<h4>Qualitative</h4><p>Distinct colors for each category.</p>"
    },
    {
        "number": 21,
        "difficulty": "medium",
        "question": "What color palette for low-to-high values?",
        "context": "Color",
        "answer": "<h4>Sequential</h4><p>Light to dark shade of one color.</p>"
    },
    {
        "number": 22,
        "difficulty": "medium",
        "question": "What color palette for positive/negative values?",
        "context": "Color",
        "answer": "<h4>Diverging</h4><p>Two contrasting colors meeting at a neutral midpoint.</p>"
    },
    {
        "number": 23,
        "difficulty": "hard",
        "question": "What is a Sankey Diagram?",
        "context": "Flow",
        "answer": "<h4>Flows</h4><p>Visualizing flow magnitude between nodes.</p>"
    },
    {
        "number": 24,
        "difficulty": "medium",
        "question": "What is a Treemap?",
        "context": "Hierarchy",
        "answer": "<h4>Nested Rectangles</h4><p>Hierarchical data represented by nested rectangles sized by value.</p>"
    },
    {
        "number": 25,
        "difficulty": "easy",
        "question": "Why is sorting bars important?",
        "context": "Readability",
        "answer": "<h4>Comparison</h4><p>Sorting (e.g., descending) makes it easier to compare rank and value.</p>"
    }
]
};

if (typeof window !== "undefined") {
    window.visualizationData = visualizationData;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = visualizationData;
}
