
module.exports = {
    sql: [
        { number: 1, title: "Introduction to SQL and Databases", content: "<h4>What is SQL?</h4><p>Structured Query Language (SQL) is the standard for managing relational databases.</p><h4>Key Concepts:</h4><ul><li><strong>Tables:</strong> Rows and columns of data.</li><li><strong>Primary Keys:</strong> Unique identifiers.</li></ul>" },
        { number: 2, title: "SELECT and FROM", content: "<h4>Retrieving Data</h4><p>The core command: <code>SELECT * FROM table;</code></p>" },
        { number: 3, title: "Filtering with WHERE", content: "<h4>Filtering</h4><p>Use WHERE to filter rows: <code>SELECT * FROM users WHERE age > 18;</code></p>" },
        { number: 4, title: "Sorting with ORDER BY", content: "<h4>Sorting</h4><p><code>ORDER BY column ASC/DESC</code></p>" },
        { number: 5, title: "Aggregations (COUNT, SUM, AVG)", content: "<h4>Math on Data</h4><p>Count rows, sum values, or find averages.</p>" },
        { number: 6, title: "Grouping with GROUP BY", content: "<h4>Grouping</h4><p>Combine rows with same values: <code>SELECT city, COUNT(*) FROM users GROUP BY city;</code></p>" },
        { number: 7, title: "Filtering Groups with HAVING", content: "<h4>HAVING vs WHERE</h4><p>HAVING filters groups, WHERE filters rows.</p>" },
        { number: 8, title: "JOINS (Inner, Left, Right, Full)", content: "<h4>Combining Tables</h4><p>JOINs let you query multiple tables based on related columns.</p>" },
        { number: 9, title: "Subqueries", content: "<h4>Queries within Queries</h4><p>Use a query result inside another query's WHERE clause.</p>" },
        { number: 10, title: "Common Table Expressions (CTEs)", content: "<h4>WITH Clause</h4><p>Simplify complex queries by defining temporary result sets.</p>" },
        { number: 11, title: "String and Date Functions", content: "<h4>Manipulation</h4><p>Functions like UPPER(), LOWER(), DATE_ADD(), DATEDIFF().</p>" },
        { number: 12, title: "Window Functions", content: "<h4>Advanced Analytics</h4><p>RANK(), LEAD(), LAG() over partitions of data.</p>" }
    ],
    statistics: [
        { number: 1, title: "Descriptive Statistics", content: "<h4>Mean, Median, Mode</h4><p>Measures of central tendency.</p>" },
        { number: 2, title: "Measures of Spread", content: "<h4>Range, Variance, Standard Deviation</h4><p>How spread out is the data?</p>" },
        { number: 3, title: "Probability Basics", content: "<h4>Events and Odds</h4><p>Calculated likelihood of outcomes.</p>" },
        { number: 4, title: "Distributions (Normal, Binomial)", content: "<h4>The Bell Curve</h4><p>Understanding normal distribution and its properties.</p>" },
        { number: 5, title: "Sampling and CLT", content: "<h4>Central Limit Theorem</h4><p>Why sample means approximate a normal distribution.</p>" },
        { number: 6, title: "Hypothesis Testing", content: "<h4>Null vs Alternative</h4><p>Testing assumptions about population parameters.</p>" },
        { number: 7, title: "Confidence Intervals", content: "<h4>Estimation</h4><p>Range of values likely to contain the population parameter.</p>" },
        { number: 8, title: "Correlation vs Causation", content: "<h4>Relationships</h4><p>Correlation measures association, not cause.</p>" },
        { number: 9, title: "Linear Regression", content: "<h4>Predictive Modeling</h4><p>Fitting a line to data: y = mx + b.</p>" },
        { number: 10, title: "A/B Testing", content: "<h4>Comparing Variants</h4><p>Statistical methods to compare two versions.</p>" }
    ],
    python: [
        { number: 1, title: "Python Basics", content: "<h4>Variables and Types</h4><p>Strings, Integers, Floats, Booleans.</p>" },
        { number: 2, title: "Lists and Dictionaries", content: "<h4>Data Structures</h4><p>Storing collections of data.</p>" },
        { number: 3, title: "Control Flow", content: "<h4>If/Else and Loops</h4><p>Logic and iteration.</p>" },
        { number: 4, title: "Functions", content: "<h4>Reusable Code</h4><p>Defining and calling functions.</p>" },
        { number: 5, title: "NumPy Arrays", content: "<h4>Numerical Python</h4><p>Fast array operations.</p>" },
        { number: 6, title: "Pandas Series & DataFrames", content: "<h4>Tabular Data</h4><p>The core of data analysis in Python.</p>" },
        { number: 7, title: "Loading Data", content: "<h4>read_csv</h4><p>Importing data from files.</p>" },
        { number: 8, title: "Data Inspection", content: "<h4>head(), nfo(), describe()</h4><p>Getting to know your dataset.</p>" },
        { number: 9, title: "Filtering and Selecting", content: "<h4>loc and iloc</h4><p>Selecting rows and columns.</p>" },
        { number: 10, title: "Data Cleaning", content: "<h4>Handling Missing Values</h4><p>dropna(), fillna().</p>" },
        { number: 11, title: "Grouping and Aggregation", content: "<h4>groupby()</h4><p>Split-Apply-Combine pattern.</p>" },
        { number: 12, title: "Merging and Joining", content: "<h4>merge() and concat()</h4><p>Combining datasets.</p>" },
        { number: 13, title: "Visualization with Matplotlib", content: "<h4>Plotting</h4><p>Creating basic charts.</p>" },
        { number: 14, title: "Advanced Analysis", content: "<h4>Pivot Tables & Apply</h4><p>Complex data transformations.</p>" }
    ],
    visualization: [
        { number: 1, title: "Why Visualize Data?", content: "<h4>The Power of Visuals</h4><p>Humans process visuals 60,000x faster than text.</p>" },
        { number: 2, title: "Choosing the Right Chart", content: "<h4>Chart Selection</h4><p>Bar vs Line vs Scatter vs Pie.</p>" },
        { number: 3, title: "Design Principles", content: "<h4>Clarity and Simplicity</h4><p>Avoid clutter, use color wisely.</p>" },
        { number: 4, title: "Color Theory for Data", content: "<h4>Palettes</h4><p>Sequential, Diverging, Categorical.</p>" },
        { number: 5, title: "Dashboards vs Reports", content: "<h4>Interactivity</h4><p>Exploratory vs Explanatory.</p>" },
        { number: 6, title: "Storytelling with Data", content: "<h4>Narrative</h4><p>Guiding the audience through the insights.</p>" },
        { number: 7, title: "Common Mistakes", content: "<h4>Pitfalls</h4><p>Misleading axes, too much 3D, pie charts with too many slices.</p>" },
        { number: 8, title: "Tools of the Trade", content: "<h4>Software</h4><p>Tableau, PowerBI, Looker, Python/R.</p>" }
    ],
    excel: [
        { number: 1, title: "Excel Interface", content: "<h4>The Grid</h4><p>Cells, Rows, Columns, formula bar.</p>" },
        { number: 2, title: "Basic Formulas", content: "<h4>Math</h4><p>SUM, AVERAGE, MIN, MAX.</p>" },
        { number: 3, title: "Cell Referencing", content: "<h4>$ Signs</h4><p>Relative vs Absolute references.</p>" },
        { number: 4, title: "Functions", content: "<h4>Logic and Text</h4><p>IF, COUNTIF, LEFT, RIGHT.</p>" },
        { number: 5, title: "VLOOKUP and XLOOKUP", content: "<h4>Merging Data</h4><p>Searching for values in other tables.</p>" },
        { number: 6, title: "Pivot Tables", content: "<h4>Summarizing</h4><p>Drag and drop analysis.</p>" },
        { number: 7, title: "Charts in Excel", content: "<h4>Visuals</h4><p>Creating and formatting charts.</p>" },
        { number: 8, title: "Data Validation", content: "<h4>Control</h4><p>Dropdown lists and input rules.</p>" },
        { number: 9, title: "Power Query Basics", content: "<h4>ETL</h4><p>Importing and transforming data.</p>" }
    ],
    business: [
        { number: 1, title: "What is Business Intelligence?", content: "<h4>Definition</h4><p>Turning data into actionable insights.</p>" },
        { number: 2, title: "Key Performance Indicators (KPIs)", content: "<h4>Metrics that Matter</h4><p>Leading vs Lagging indicators.</p>" },
        { number: 3, title: "The Analytics Lifecycle", content: "<h4>Process</h4><p>Data -> Information -> Knowledge -> Wisdom.</p>" },
        { number: 4, title: "Data Warehousing", content: "<h4>Storage</h4><p>ETL, Data Marts, Data Lakes.</p>" },
        { number: 5, title: "Dimensional Modeling", content: "<h4>Star Schema</h4><p>Fact tables and Dimension tables.</p>" },
        { number: 6, title: "Self-Service BI", content: "<h4>Empowerment</h4><p>Enabling business users to explore data.</p>" },
        { number: 7, title: "Data Governance", content: "<h4>Quality and Security</h4><p>Ensuring data is accurate and safe.</p>" },
        { number: 8, title: "Requirement Gathering", content: "<h4>Asking Questions</h4><p>Understanding what stakeholders need.</p>" },
        { number: 9, title: "Metric Definition", content: "<h4>Consistency</h4><p>Defining 'Active User' or 'Churn' standardly.</p>" },
        { number: 10, title: "Root Cause Analysis", content: "<h4>Why it Happened</h4><p>Drilling down into the 'Why'.</p>" },
        { number: 11, title: "Decision Making", content: "<h4>Data-Driven</h4><p>Using evidence to support strategy.</p>" }
    ]
};
