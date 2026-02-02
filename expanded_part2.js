
module.exports = {
    python: [
        {
            number: 1, title: "Python Basics", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Python is the #1 language for data science because it's readable and has huge libraries. It handles data that effectively crashes Excel.</p>
        <h4>2. Basic Types</h4>
        <ul>
            <li><code>int</code>: Integer (5)</li>
            <li><code>float</code>: Decimal (5.5)</li>
            <li><code>str</code>: String ("Hello")</li>
            <li><code>bool</code>: Boolean (True/False)</li>
        </ul>
        <h4>3. Business Scenario</h4>
        <p><strong>Scripting:</strong> A simple script to calculate tax.</p>
        <pre><code>revenue = 100000
tax_rate = 0.2
tax_owed = revenue * tax_rate
print(f"Tax Owed: {tax_owed}")</code></pre>
    ` },
        {
            number: 2, title: "Lists and Dictionaries", content: `
        <h4>1. Concept Deep Dive</h4>
        <p><strong>List:</strong> Ordered collection. <code>items = ["Product A", "Product B"]</code>. Use for sequences.</p>
        <p><strong>Dictionary:</strong> Key-Value pairs. <code>user = {"id": 1, "name": "Alice"}</code>. Use for lookups (like a mini-database).</p>
        <h4>2. Accessing Data</h4>
        <pre><code># List (Index starts at 0)
first_item = items[0] 

# Dictionary (By Key)
user_name = user["name"]</code></pre>
    ` },
        {
            number: 3, title: "Control Flow", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Logic (if/else) and Repetition (loops). This allows you to automate decisions and tasks.</p>
        <h4>2. Syntax</h4>
        <pre><code>for order in orders:
    if order > 100:
        print("High Value")
    else:
        print("Standard")</code></pre>
        <h4>3. Business Use</h4>
        <p>Iterating through thousands of customer files to flag those that haven't been updated in 30 days.</p>
    ` },
        {
            number: 4, title: "Functions", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>DRY Principle: Don't Repeat Yourself. If you write code twice, make it a function.</p>
        <h4>2. Syntax</h4>
        <pre><code>def calculate_roi(profit, cost):
    return (profit / cost) * 10</code></pre>
    ` },
        {
            number: 5, title: "NumPy Arrays", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Standard Python lists are slow for math. NumPy arrays are blazing fast C-optimized blocks of memory.</p>
        <h4>2. Why use it?</h4>
        <p>Vectorization: You can multiply two arrays without a loop.</p>
        <pre><code>import numpy as np
# Multiply 1 million numbers instantly
revenue = price_array * quantity_array</code></pre>
    ` },
        {
            number: 6, title: "Pandas Series & DataFrames", content: `
        <h4>1. Concept Deep Dive</h4>
        <p><strong>DataFrame:</strong> Excel inside Python. Rows and columns with labels.</p>
        <p><strong>Series:</strong> A single column of a DataFrame.</p>
        <h4>2. Creating a DataFrame</h4>
        <pre><code>import pandas as pd
df = pd.DataFrame({
    "Product": ["A", "B"],
    "Sales": [100, 200]
})</code></pre>
    ` },
        {
            number: 7, title: "Loading Data", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>The first step of any analysis. Pandas can read CSV, Excel, SQL, JSON, Parquet, etc.</p>
        <h4>2. Syntax</h4>
        <pre><code>df = pd.read_csv("sales_data.csv")
# or
df = pd.read_excel("financials.xlsx", sheet_name="Q1")</code></pre>
    ` },
        {
            number: 8, title: "Data Inspection", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Never assume your data is clean. Inspect it first.</p>
        <h4>2. Key Commands</h4>
        <ul>
            <li><code>df.head()</code>: First 5 rows.</li>
            <li><code>df.info()</code>: Data types and null counts.</li>
            <li><code>df.describe()</code>: Summary stats (mean, min, max).</li>
            <li><code>df.shape</code>: (Rows, Columns).</li>
        </ul>
    ` },
        {
            number: 9, title: "Filtering and Selecting", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Slice and dice your data. Similar to SQL SELECT/WHERE.</p>
        <h4>2. Syntax</h4>
        <pre><code># Select Value
high_sales = df[df["Sales"] > 1000]

# Select Columns
subset = df[["Date", "Revenue"]]</code></pre>
    ` },
        {
            number: 10, title: "Data Cleaning", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>80% of your job is cleaning. Handling missing values and wrong types.</p>
        <h4>2. Techniques</h4>
        <ul>
            <li><code>df.dropna()</code>: Remove empty rows.</li>
            <li><code>df.fillna(0)</code>: Replace empties with 0.</li>
            <li><code>df.drop_duplicates()</code>: Remove dupes.</li>
        </ul>
    ` },
        {
            number: 11, title: "Grouping and Aggregation", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>The Pandas version of SQL GROUP BY.</p>
        <h4>2. Syntax</h4>
        <pre><code># Total Sales by Region
df.groupby("Region")["Sales"].sum()</code></pre>
        <h4>3. Real World</h4>
        <p>Calculating Average Order Value (AOV) per acquisition channel.</p>
    ` },
        {
            number: 12, title: "Merging and Joining", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Combining datasets. Pandas <code>merge</code> is like SQL Join.</p>
        <h4>2. Syntax</h4>
        <pre><code>merged = pd.merge(orders, customers, 
                  on="customer_id", 
                  how="left")</code></pre>
    ` },
        {
            number: 13, title: "Visualization with Matplotlib", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Visualizing data directly in Python.</p>
        <h4>2. Syntax</h4>
        <pre><code>import matplotlib.pyplot as plt
df["Sales"].plot(kind="bar")
plt.show()</code></pre>
    ` },
        {
            number: 14, title: "Advanced Analysis", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Complex usages like Pivot Tables and Apply.</p>
        <h4>2. Pivot Table Example</h4>
        <pre><code>pivot = df.pivot_table(index="Date", 
                       columns="Region", 
                       values="Sales")</code></pre>
    ` }
    ],
    visualization: [
        {
            number: 1, title: "Why Visualize Data?", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>It's not just "making pretty pictures." It is cognitive offloading. You transform abstract numbers into visual patterns (length, position, color) that the human brain processes instantly.</p>
        <h4>2. Anscombe's Quartet</h4>
        <p>A famous example where 4 datasets have identical Mean, Variance, and Correlation, but look completely different when plotted. <strong>Always plot your data.</strong></p>
    ` },
        {
            number: 2, title: "Choosing the Right Chart", content: `
        <h4>1. Use Case Framework</h4>
        <ul>
            <li><strong>Comparison:</strong> Bar Chart.</li>
            <li><strong>Trend over Time:</strong> Line Chart.</li>
            <li><strong>Correlation:</strong> Scatter Plot.</li>
            <li><strong>Distribution:</strong> Histogram.</li>
            <li><strong>Part-to-Whole:</strong> Stacked Bar (or Pie, rarely).</li>
        </ul>
    ` },
        {
            number: 3, title: "Design Principles", content: `
        <h4>1. Clarity over Beauty</h4>
        <p>If the user has to ask "what am I looking at?", the chart failed.</p>
        <h4>2. Best Practices</h4>
        <ul>
            <li>Remove chart junk (3D effects, shadows).</li>
            <li>Directly label lines instead of using a legend (reduces eye travel).</li>
            <li>Use consistent time intervals.</li>
        </ul>
    ` },
        {
            number: 4, title: "Color Theory for Data", content: `
        <h4>1. Types of Palettes</h4>
        <ul>
            <li><strong>Sequential:</strong> Light to Dark (e.g., Sales 0 to 1M).</li>
            <li><strong>Diverging:</strong> Two colors meeting in middle (e.g., Profit vs Loss, Red vs Blue).</li>
            <li><strong>Categorical:</strong> Distinct colors (e.g., Departments).</li>
        </ul>
        <h4>2. Accessibility</h4>
        <p>Always check for Red-Green color blindness.</p>
    ` },
        {
            number: 5, title: "Dashboards vs Reports", content: `
        <h4>1. Dashboard</h4>
        <p>Live, interactive monitoring tool. "What is happening right now?" (e.g., Car Dashboard).</p>
        <h4>2. Report</h4>
        <p>Static, deep-dive document. "Why did this happen?" (e.g., Mechanic's report).</p>
    ` },
        {
            number: 6, title: "Storytelling with Data", content: `
        <h4>1. The Narrative Arc</h4>
        <p>Don't just show data. Show: Context -> Conflict (The Problem) -> Resolution (The Insight).</p>
        <h4>2. Actionable Insights</h4>
        <p>Every chart should support a recommendation. "Churn is up" is data. "Churn is up because of X, so we should do Y" is a story.</p>
    ` },
        {
            number: 7, title: "Common Mistakes", content: `
        <h4>1. Truncating the Y-Axis</h4>
        <p>Starting a bar chart at 50% instead of 0% exaggerates differences. It is misleading.</p>
        <h4>2. Spagetti Charts</h4>
        <p>Line charts with 20+ lines. Impossible to read. Use grouping or small multiples instead.</p>
    ` },
        {
            number: 8, title: "Tools of the Trade", content: `
        <h4>1. Landscape</h4>
        <ul>
            <li><strong>Tableau/PowerBI:</strong> Enterprise standard for Dashboards.</li>
            <li><strong>Python/R:</strong> Best for custom, statistical, or scientific viz.</li>
            <li><strong>Excel:</strong> Best for quick, ad-hoc charts.</li>
        </ul>
    ` }
    ],
    excel: [
        {
            number: 1, title: "Excel Interface", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>The universal language of business. Even with Python and SQL, Excel is where final decisions are often presented.</p>
    ` },
        {
            number: 2, title: "Basic Formulas", content: `
        <h4>1. The Big 4</h4>
        <p><code>=SUM()</code>, <code>=AVERAGE()</code>, <code>=COUNT()</code>, <code>=MAX()</code>.</p>
        <h4>2. Pro Tip</h4>
        <p>Use <code>Alt + =</code> to auto-sum a column instantly.</p>
    ` },
        {
            number: 3, title: "Cell Referencing", content: `
        <h4>1. Relative vs Absolute</h4>
        <p>The difference between <code>A1</code> and <code>$A$1</code>.</p>
        <ul>
            <li><strong>A1 (Relative):</strong> Updates when you drag the formula.</li>
            <li><strong>$A$1 (Absolute):</strong> Locks the cell. Use for constants like Tax Rate.</li>
        </ul>
    ` },
        {
            number: 4, title: "Functions (Logic)", content: `
        <h4>1. IF Statement</h4>
        <p><code>=IF(logic, value_if_true, value_if_false)</code></p>
        <h4>2. Nested IFs</h4>
        <p>Use <code>IFS()</code> in modern Excel to avoid messy nesting.</p>
    ` },
        {
            number: 5, title: "VLOOKUP and XLOOKUP", content: `
        <h4>1. The Interview Question</h4>
        <p>"Do you know VLOOKUP?" is the standard Excel interview question.</p>
        <h4>2. XLOOKUP</h4>
        <p>The modern successor. It can look left, defaults to exact match, and handles errors.</p>
        <p><code>=XLOOKUP(lookup_val, lookup_array, return_array)</code></p>
    ` },
        {
            number: 6, title: "Pivot Tables", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>The most powerful feature in Excel. Summarize 100,000 rows in 5 seconds without formulas.</p>
        <h4>2. The 4 Areas</h4>
        <ul>
            <li><strong>Rows:</strong> What you want to group by.</li>
            <li><strong>Values:</strong> What you want to calculate (Sum, Count).</li>
            <li><strong>Columns:</strong> Secondary grouping (Matrix view).</li>
            <li><strong>Filters:</strong> Global exclusions.</li>
        </ul>
    ` },
        {
            number: 7, title: "Charts in Excel", content: `
        <h4>1. Quick Charts</h4>
        <p>Select data and press <code>Alt + F1</code>.</p>
        <h4>2. Formatting</h4>
        <p>Remove gridlines and add data labels for a cleaner look.</p>
    ` },
        {
            number: 8, title: "Data Validation", content: `
        <h4>1. Dropdown Lists</h4>
        <p>Force users to select from a list (e.g., "Yes/No", "Dept A/Dept B"). Keeps data clean at entry.</p>
    ` },
        {
            number: 9, title: "Power Query Basics", content: `
        <h4>1. What is it?</h4>
        <p>ETL for Excel. It records your cleanup steps (remove rows, split columns) so you can re-apply them next month with one click.</p>
    ` }
    ],
    business: [
        {
            number: 1, title: "What is Business Intelligence?", content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Converting raw data into actionable strategic knowledge. It connects the "What" (Data) to the "So What?" (Business Value).</p>
    ` },
        {
            number: 2, title: "Key Performance Indicators (KPIs)", content: `
        <h4>1. Metric vs KPI</h4>
        <p>All KPIs are metrics, but not all metrics are KPIs. A KPI is a metric that is critical to the core business strategy.</p>
        <p><em>Example:</em> "Facebook Likes" is a vanity metric. "Customer Acquisition Cost" is a KPI.</p>
    ` },
        {
            number: 3, title: "The Analytics Lifecycle", content: `
        <h4>1. The 4 Levels</h4>
        <ul>
            <li><strong>Descriptive:</strong> What happened?</li>
            <li><strong>Diagnostic:</strong> Why did it happen?</li>
            <li><strong>Predictive:</strong> What will happen?</li>
            <li><strong>Prescriptive:</strong> How can we make it happen?</li>
        </ul>
    ` },
        {
            number: 4, title: "Data Warehousing", content: `
        <h4>1. Concept</h4>
        <p>A central repository covering the whole enterprise. The "Single Source of Truth."</p>
        <h4>2. OLAP vs OLTP</h4>
        <p>Warehouses are OLAP (Analytics - Fast reading). Databases are often OLTP (Transactions - Fast writing).</p>
    ` },
        {
            number: 5, title: "Dimensional Modeling", content: `
        <h4>1. Star Schema</h4>
        <p>The standard design for BI.</p>
        <ul>
            <li><strong>Fact Table:</strong> Center. Contains numbers (Sales, Qty) and keys.</li>
            <li><strong>Dimension Tables:</strong> Spines. Contain context (Who, Where, When).</li>
        </ul>
    ` },
        {
            number: 6, title: "Self-Service BI", content: `
        <h4>1. Democratization</h4>
        <p>Moving away from "Call IT for a report" to enabling business users to build their own dashboards (Tableau, Looker).</p>
    ` },
        {
            number: 7, title: "Data Governance", content: `
        <h4>1. The Rules</h4>
        <p>Who owns the data? Who can see it? Is it accurate? Without governance, you have "Data Swamps" instead of Data Lakes.</p>
    ` },
        {
            number: 8, title: "Requirement Gathering", content: `
        <h4>1. The Soft Skill</h4>
        <p>Don't just build what they ask for. Build what they need. Ask "What decision will you make with this number?"</p>
    ` },
        {
            number: 9, title: "Metric Definition", content: `
        <h4>1. Chaos Prevention</h4>
        <p>Does "Churn" mean cancelling subscription or just pausing? Defining these terms across the company is hard but vital.</p>
    ` },
        {
            number: 10, title: "Root Cause Analysis", content: `
        <h4>1. The 5 Whys</h4>
        <p>Ask "Why" 5 times to get to the root.</p>
        <p>Sales down -> Why? Leads down -> Why? Website traffic down -> Why? Server error -> Why? Bad depolyment.</p>
    ` },
        {
            number: 11, title: "Decision Making", content: `
        <h4>1. Data Driven vs Data Informed</h4>
        <p>Data should guide decisions, but context and intuition still matter. Don't follow a metric into a cliff.</p>
    ` }
    ]
};
