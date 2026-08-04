// EXCEL topic data
const excelData = {
        title: "Excel & Spreadsheets",
        lessons: [
    {
        "number": 1,
        "title": "Excel Interface & Why It Still Matters",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Excel is the universal language of business. Even when the data lives in a warehouse and is analyzed in Python or SQL, Excel is often where the final decision is presented. A data professional who cannot hand a stakeholder a clean, well-built spreadsheet is missing the last mile of the job.</p>\n        <h4>2. What to Actually Know</h4>\n        <ul>\n            <li><strong>Workbook vs Worksheet:</strong> A workbook is the file; worksheets are the tabs inside it.</li>\n            <li><strong>The Ribbon:</strong> Tabs (Home, Insert, Data, Formulas) group the tools. Know where Data & Formulas live.</li>\n            <li><strong>Cell references:</strong> A1 = column A, row 1. The name box (top-left) shows your active cell.</li>\n        </ul>\n        <h4>3. Real-World Scenario</h4>\n        <p><strong>Scenario:</strong> A manager asks for a \"quick summary\" of monthly sales. They don't want a dashboard tool — they want a spreadsheet they can open, filter, and email. Your job: deliver a clean workbook with a summary tab, formatted numbers, and a note on how it was built.</p>\n    "
    },
    {
        "number": 2,
        "title": "Basic Formulas (The Big 4)",
        "content": "\n        <h4>1. The Big 4</h4>\n        <p>Every spreadsheet analysis starts with these:</p>\n        <ul>\n            <li><code>=SUM(range)</code> — adds values.</li>\n            <li><code>=AVERAGE(range)</code> — mean.</li>\n            <li><code>=COUNT(range)</code> — counts numeric cells.</li>\n            <li><code>=MAX(range)</code> / <code>=MIN(range)</code> — largest/smallest.</li>\n        </ul>\n        <h4>2. Pro Tips</h4>\n        <ul>\n            <li><strong>Alt + =</strong> auto-sums a column instantly.</li>\n            <li><strong>COUNT vs COUNTA:</strong> COUNT counts numbers only; COUNTA counts any non-empty cell. Know the difference — it catches people out.</li>\n            <li><strong>SUMIF / COUNTIF:</strong> the conditional versions — sum only rows that meet a condition (e.g., sum sales for one region).</li>\n        </ul>\n        <h4>3. Real-World Example</h4>\n        <p><strong>Task:</strong> \"What was total revenue, and how many orders were over $500?\"</p>\n        <pre><code>=SUM(D2:D1000)              -- total revenue\n=COUNTIF(D2:D1000, \">500\")  -- orders over $500\n=SUMIF(B2:B1000, \"West\", D2:D1000) -- revenue for West region</code></pre>\n    "
    },
    {
        "number": 3,
        "title": "Cell Referencing (Relative vs Absolute)",
        "content": "\n        <h4>1. Relative vs Absolute</h4>\n        <p>The difference between <code>A1</code> and <code>$A$1</code> determines whether a formula changes when you copy it down or across.</p>\n        <ul>\n            <li><strong>A1 (Relative):</strong> updates when you drag the formula. Copy <code>=A1*B1</code> down and it becomes <code>=A2*B2</code>.</li>\n            <li><strong>$A$1 (Absolute):</strong> locks the cell. Use for constants like a tax rate or a target.</li>\n            <li><strong>$A1 / A$1 (Mixed):</strong> locks only the column or only the row.</li>\n        </ul>\n        <h4>2. The F4 Shortcut</h4>\n        <p>Press <strong>F4</strong> while editing a reference to cycle: <code>A1</code> → <code>$A$1</code> → <code>A$1</code> → <code>$A1</code>.</p>\n        <h4>3. Real-World Example</h4>\n        <p><strong>Task:</strong> Apply a single tax rate (in cell <code>$B$1</code>) to every row's price.</p>\n        <pre><code>=D2 * $B$1    -- D2 is relative (changes per row), $B$1 is absolute (locked)</code></pre>\n        <p>Without the <code>$</code>, dragging down would change <code>B1</code> to <code>B2</code>, <code>B3</code>… and silently break every formula. This is a classic interview trap.</p>\n    ",
    },
    {
        "number": 4,
        "title": "Logical Functions (IF, AND, OR)",
        "content": "\n        <h4>1. IF Statement</h4>\n        <p>The core of decision-making in Excel: <code>=IF(logic, value_if_true, value_if_false)</code>.</p>\n        <h4>2. Combining Logic</h4>\n        <ul>\n            <li><code>=AND(logic1, logic2, ...)</code> — TRUE only if ALL are true.</li>\n            <li><code>=OR(logic1, logic2, ...)</code> — TRUE if ANY are true.</li>\n        </ul>\n        <h4>3. Nested IFs → IFS()</h4>\n        <p>Avoid messy nested <code>=IF(..., IF(...))</code>. Use <code>IFS()</code> in modern Excel:</p>\n        <pre><code>=IFS(D2>1000, \"High Value\", D2>200, \"Mid Value\", TRUE, \"Low Value\")</code></pre>\n        <h4>4. Real-World Example</h4>\n        <p><strong>Task:</strong> \"Flag orders from the 'West' region that are over $1000.\"</p>\n        <pre><code>=IF(AND(B2=\"West\", D2>1000), \"Flag\", \"\")</code></pre>\n    "
    },
    {
        "number": 5,
        "title": "VLOOKUP vs XLOOKUP: The Interview Question",
        "content": "\n        <h4>1. The Classic: VLOOKUP</h4>\n        <p><code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code></p>\n        <p>Limitations: only looks right, defaults to approximate match, breaks if you insert a column. For decades this was the #1 Excel interview question.</p>\n        <h4>2. The Successor: XLOOKUP</h4>\n        <p><code>=XLOOKUP(lookup_val, lookup_array, return_array, [if_not_found], [match_mode])</code></p>\n        <p><strong>Why it's better:**</strong>\n        <ul>\n            <li>Can look left.</li>\n            <li>Defaults to exact match (safer).</li>\n            <li>Built-in 'if not found' handler.</li>\n            <li>Returns a range, not just a value.</li>\n        </ul>\n        <h4>3. Real-World Example</h4>\n        <p><strong>Task:</strong> \"Given a product ID in A2, find its price from a lookup table (G:H).\"</p>\n        <pre><code>=XLOOKUP(A2, G:G, H:H, \"Not Found\")   -- simple, robust, won't break</code></pre>\n        <p>Show an interviewer you know XLOOKUP. It signals you're up to date.</p>\n    "
    },
    {
        "number": 6,
        "title": "Pivot Tables: Summarize Instantly",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The most powerful feature in Excel. Summarize 100,000 rows in 5 seconds without formulas. It's the Excel equivalent of SQL's \`GROUP BY\`.</p>\n        <h4>2. The 4 Areas</h4>\n        <ul>\n            <li><strong>Rows:</strong> What you want to group by (e.g., 'Region').</li>\n            <li><strong>Values:</strong> What you want to calculate (e.g., 'SUM of Sales').</li>\n            <li><strong>Columns:</strong> A secondary grouping (e.g., 'Month'). Creates a matrix.</li>\n            <li><strong>Filters:</strong> Global exclusions (e.g., exclude one product line).</li>\n        </ul>\n        <h4>3. Real-World Example</h4>\n        <p><strong>Task:</strong> \"Give me a quick matrix of revenue by region and by month.\"</p>\n        <p>Drag 'Region' to Rows, 'Month' to Columns, 'Sales' to Values (as SUM). Done in seconds.</p>\n        <h4>4. Slicers</h4>\n        <p>Slicers are button-based filters that make your PivotTable interactive for others. Instead of dropdowns, they see clean buttons ('North', 'South'). Essential for building dashboards.</p>\n    "
    },
    {
        "number": 7,
        "title": "Charts in Excel",
        "content": "\n        <h4>1. Quick Charts</h4>\n        <p>Select your data and press <strong>Alt + F1</strong> to create a default chart on the same sheet. Use <strong>F11</strong> to create one on a new sheet.</p>\n        <h4>2. Formatting Best Practices</h4>\n        <ul>\n            <li><strong>Remove gridlines</strong> and unnecessary axes for a cleaner look.</li>\n            <li><strong>Add data labels</strong> so the reader doesn't have to guess.</li>\n            <li><strong>Use a descriptive title</strong> that states the takeaway, not just the metric.</li>\n        </ul>\n        <h4>3. The Chart-Choice Flow</h4>\n        <p>Same as in any BI tool: line for time, bar for categories (sorted), scatter for relationships. Don't use a pie chart if you have >5 slices.</p>\n    "
    },
    {
        "number": 8,
        "title": "Data Validation & Input Controls",
        "content": "\n        <h4>1. Dropdown Lists</h4>\n        <p>Force users to select from a predefined list (e.g., \"Yes/No\", \"Dept A/Dept B\"). Keeps data clean at the point of entry and prevents typos.</p>\n        <p><strong>How:</strong> Data > Data Validation > Allow: List > Source: (your list range).</p>\n        <h4>2. Number / Date Ranges</h4>\n        <p>You can also restrict inputs to whole numbers, dates within a range, or text of a certain length. This is how you build a robust Excel *application*, not just a spreadsheet.</p>\n    "
    },
    {
        "number": 9,
        "title": "Power Query: ETL for Excel",
        "content": "\n        <h4>1. What is it?</h4>\n        <p>Power Query is a built-in ETL engine. It lets you connect to data (CSV, web, database), record your cleanup steps (remove rows, split columns, unpivot), and then **refresh** the whole sequence next month with one click.</p>\n        <h4>2. The Workflow</h4>\n        <p>Data > Get & Transform Data > From Text/CSV. The Power Query editor opens, where every click you make (e.g., \"Remove Top Rows\") is recorded as a step in a script.</p>\n        <h4>3. Why it's a game-changer</h4>\n        <p>It makes a messy monthly reporting process reproducible and auditable. The alternative is a fragile macro or manual work. Power Query is the single most powerful feature for an analyst in modern Excel.</p>\n    "
    },
    {
        "number": 10,
        "title": "Power Pivot & The Data Model",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Go beyond single-table analysis. Power Pivot’s Data Model lets you build relationships between multiple tables, just like in a real database. This is how you analyze sales, inventory, and customer data together without massive VLOOKUPs.</p>\n        <h4>2. Why it Matters</h4>\n        <p>It’s the gateway to business intelligence in Excel. It handles millions of rows, where standard Excel chokes, and enables sophisticated analysis.</p>\n        <h4>3. The Workflow</h4>\n        <p>Enable the Power Pivot add-in. Go to the Power Pivot tab > Manage. From there, you can import data and use the 'Diagram View' to drag-and-drop connections between tables (e.g., `orders[customer_id]` to `customers[id]`).</p>\n    "
    },
    {
        "number": 11,
        "title": "Introduction to DAX",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>DAX (Data Analysis Expressions) is the formula language of Power Pivot. It looks like Excel formulas but operates on entire tables and columns, not individual cells.</p>\n        <h4>2. Key Functions (DAX)</h4>\n        <ul>\n            <li><strong>CALCULATE:</strong> The most important function. It modifies the filter context of a calculation (e.g., `CALCULATE(SUM(Sales[Revenue]), Dates[Year] = 2023)`).</li>\n            <li><strong>SUMX:</strong> Iterates over a table and sums an expression for each row.</li>\n            <li><strong>RELATED:</strong> Fetches a value from the 'one' side of a table relationship.</li>\n        </ul>\n        <h4>3. Simple Measure vs. Calculated Column</h4>\n        <p>A <strong>measure</strong> is a reusable formula for aggregation (e.g., Total Revenue := `SUM(Sales[Revenue])`). A <strong>calculated column</strong> adds a new column to your table with a value for each row.</p>\n    "
    },
    {
        "number": 12,
        "title": "Advanced Charting Techniques",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Move beyond basic bar and line charts to tell more compelling stories.</p>\n        <h4>2. Advanced Chart Types</h4>\n        <ul>\n            <li><strong>Combo Charts:</strong> Plot two different data series on the same chart, like bars for revenue and a line for profit margin. Use a secondary axis for different scales.</li>\n            <li><strong>Waterfall Charts:</strong> Show how an initial value is affected by a series of positive and negative changes.</li>\n            <li><strong>Dynamic Charts:</strong> Create charts that update automatically based on a dropdown selection (using a combination of `XLOOKUP` and named ranges).</li>\n        </ul>\n        <h4>3. Sparklines</h4>\n        <p>Tiny, cell-sized charts that show a trend next to the data, great for at-a-glance analysis in dashboards. Find them under Insert > Sparklines.</p>\n    "
    },
    {
        "number": 13,
        "title": "Excel as a Dashboarding Tool",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Combine PivotTables, Slicers, and Charts to create a fully interactive dashboard on a single sheet, allowing users to explore data without breaking formulas.</p>\n        <h4>2. The 3-Sheet Method</h4>\n        <ol>\n            <li><strong>Data Sheet:</strong> Your raw data, ideally formatted as an Excel Table for dynamic range updates.</li>\n            <li><strong>Calculation Sheet:</strong> A hidden sheet where all your PivotTables and intermediate calculations live.</li>\n            <li><strong>Dashboard Sheet:</strong> The user-facing, presentation layer. It contains only charts and slicers. Lock this sheet to prevent accidental changes.</li>\n        </ol>\n        <h4>3. Slicer Connectivity</h4>\n        <p>The magic trick: connect a single Slicer to multiple PivotTables. Right-click the Slicer > Report Connections... > check all the PivotTables you want it to control. Now one click filters the entire dashboard.</p>\n    "
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "easy",
        "question": "What symbol starts every formula?",
        "context": "Basics",
        "answer": "<h4>Equals Sign</h4><p>=</p>"
    },
    {
        "number": 2,
        "difficulty": "easy",
        "question": "How to fix column width automatically?",
        "context": "Formatting",
        "answer": "<h4>AutoFit</h4><p>Double click the boundary between column headers.</p>"
    },
    {
        "number": 3,
        "difficulty": "medium",
        "question": "What is VLOOKUP?",
        "context": "Functions",
        "answer": "<h4>Vertical Lookup</h4><p>Searches for a value in the first column and returns a value in the same row.</p>"
    },
    {
        "number": 4,
        "difficulty": "medium",
        "question": "Difference between Relative and Absolute reference?",
        "context": "References",
        "answer": "<h4>Locking</h4><p>Relative (A1) changes when copied. Absolute ($A$1) stays fixed.</p>"
    },
    {
        "number": 5,
        "difficulty": "hard",
        "question": "What is Index-Match?",
        "context": "Advanced",
        "answer": "<h4>Superior Lookup</h4><p>Combination of INDEX and MATCH functions. More flexible than VLOOKUP (can look left).</p>"
    },
    {
        "number": 6,
        "difficulty": "easy",
        "question": "Shortcut for 'Paste Special'?",
        "context": "Productivity",
        "answer": "<h4>Ctrl+Alt+V</h4><p>Allows pasting values, formats, etc.</p>"
    },
    {
        "number": 7,
        "difficulty": "medium",
        "question": "What is a Pivot Table?",
        "context": "Analysis",
        "answer": "<h4>Summarization</h4><p>Tool to summarize, analyze, explore, and present data.</p>"
    },
    {
        "number": 8,
        "difficulty": "easy",
        "question": "How to freeze panes?",
        "context": "View",
        "answer": "<h4>View Tab</h4><p>View > Freeze Panes to keep headers visible.</p>"
    },
    {
        "number": 9,
        "difficulty": "medium",
        "question": "What is Conditional Formatting?",
        "context": "Visuals",
        "answer": "<h4>Rules</h4><p>Changing cell appearance based on its value (e.g., color scales).</p>"
    },
    {
        "number": 10,
        "difficulty": "hard",
        "question": "What is an Array Formula?",
        "context": "Advanced",
        "answer": "<h4>Multi-Cell</h4><p>Performs calculations on multiple items in an array. (CSE: Ctrl+Shift+Enter).</p>"
    },
    {
        "number": 11,
        "difficulty": "easy",
        "question": "Function to count non-empty cells?",
        "context": "Counting",
        "answer": "<h4>COUNTA</h4><p>Counts cells that are not empty.</p>"
    },
    {
        "number": 12,
        "difficulty": "medium",
        "question": "How to remove duplicates?",
        "context": "Data Cleaning",
        "answer": "<h4>Data Tab</h4><p>Data > Remove Duplicates.</p>"
    },
    {
        "number": 13,
        "difficulty": "medium",
        "question": "What does IFERROR do?",
        "context": "Error Handling",
        "answer": "<h4>Catch Errors</h4><p>Returns a custom value if a formula allows an error.</p>"
    },
    {
        "number": 14,
        "difficulty": "easy",
        "question": "How to concatenate strings?",
        "context": "Text",
        "answer": "<h4>& or CONCAT</h4><p>=A1 & \" \" & B1</p>"
    },
    {
        "number": 15,
        "difficulty": "hard",
        "question": "What is a Macro?",
        "context": "Automation",
        "answer": "<h4>VBA</h4><p>Recording of steps to automate repetitive tasks.</p>"
    },
    {
        "number": 16,
        "difficulty": "medium",
        "question": "What is Goal Seek?",
        "context": "What-If",
        "answer": "<h4>Reverse Solve</h4><p>Finding the input value needed to get a specific result.</p>"
    },
    {
        "number": 17,
        "difficulty": "easy",
        "question": "Function to get today's date?",
        "context": "Date",
        "answer": "<h4>TODAY()</h4><p>Returns current date.</p>"
    },
    {
        "number": 18,
        "difficulty": "medium",
        "question": "How to split text to columns?",
        "context": "Data Cleaning",
        "answer": "<h4>Text to Columns</h4><p>Splits cell content based on delimiter (comma, space).</p>"
    },
    {
        "number": 19,
        "difficulty": "expert",
        "question": "What is Power Query?",
        "context": "ETL",
        "answer": "<h4>Get & Transform</h4><p>Engine to connect, combine, and refine data sources.</p>"
    },
    {
        "number": 20,
        "difficulty": "medium",
        "question": "Diff between COUNT and COUNTIF?",
        "context": "Counting",
        "answer": "<h4>Condition</h4><p>COUNT counts numbers. COUNTIF counts based on criteria.</p>"
    },
    {
        "number": 21,
        "difficulty": "easy",
        "question": "How to sum a range?",
        "context": "Math",
        "answer": "<h4>SUM</h4><p>=SUM(range)</p>"
    },
    {
        "number": 22,
        "difficulty": "medium",
        "question": "What is Data Validation?",
        "context": "Input Control",
        "answer": "<h4>Restrictions</h4><p>Restricting what users can enter (e.g., Dropdown lists).</p>"
    },
    {
        "number": 23,
        "difficulty": "hard",
        "question": "What is XLOOKUP?",
        "context": "Functions",
        "answer": "<h4>Modern VLOOKUP</h4><p>Newer, more powerful replacement for VLOOKUP/HLOOKUP.</p>"
    },
    {
        "number": 24,
        "difficulty": "easy",
        "question": "Shortcut to format as currency?",
        "context": "Formatting",
        "answer": "<h4>Ctrl+Shift+$</h4><p>Applies currency format.</p>"
    },
    {
        "number": 25,
        "difficulty": "medium",
        "question": "How to calculate average?",
        "context": "Math",
        "answer": "<h4>AVERAGE</h4><p>=AVERAGE(range)</p>"
    },
    {
        "number": 26,
        "difficulty": "hard",
        "question": "What is a Slicer?",
        "context": "Dashboards",
        "answer": "<h4>Visual Filter</h4><p>Button-based filter for PivotTables.</p>"
    },
    {
        "number": 27,
        "difficulty": "medium",
        "question": "How to transpose data?",
        "context": "Paste",
        "answer": "<h4>Swap Rows/Cols</h4><p>Paste Special > Transpose.</p>"
    },
    {
        "number": 28,
        "difficulty": "easy",
        "question": "Function to find max value?",
        "context": "Math",
        "answer": "<h4>MAX</h4><p>=MAX(range)</p>"
    },
    {
        "number": 29,
        "difficulty": "medium",
        "question": "What is Flash Fill?",
        "context": "Automation",
        "answer": "<h4>Pattern Match</h4><p>Automatically fills data when it senses a pattern (Ctrl+E).</p>"
    },
    {
        "number": 30,
        "difficulty": "hard",
        "question": "What is a Sparkline?",
        "context": "Charts",
        "answer": "<h4>Mini Chart</h4><p>A tiny chart in a worksheet cell.</p>"
    },
    { "number": 31, "difficulty": "medium", "question": "What is the 'Data Model' in Excel?", "answer": "A collection of tables with relationships, powered by Power Pivot." },
    { "number": 32, "difficulty": "hard", "question": "What is a DAX measure?", "answer": "A reusable formula in Power Pivot for summarizing data, like `Total Sales := SUM(Sales[Amount])`." },
    { "number": 33, "difficulty": "medium", "question": "What does the `CALCULATE` function do in DAX?", "answer": "It modifies the filter context of a calculation, which is essential for complex analysis." },
    { "number": 34, "difficulty": "expert", "question": "What is the difference between `SUM` and `SUMX` in DAX?", "answer": "`SUM` aggregates a column. `SUMX` iterates row by row over a table, performs a calculation, then aggregates the result." },
    { "number": 35, "difficulty": "medium", "question": "How do you create a relationship in Power Pivot?", "answer": "In the Diagram View, drag the key column from one table to the corresponding key in another." },
    { "number": 36, "difficulty": "hard", "question": "What is a 'calculated column' in Power Pivot?", "answer": "A new column added to a table, with a DAX formula that calculates a value for each row." },
    { "number": 37, "difficulty": "medium", "question": "What is a combo chart?", "answer": "A chart that displays multiple data series using different chart types (e.g., bars and a line)." },
    { "number": 38, "difficulty": "hard", "question": "What is a key benefit of using a 'Date Table' in your Data Model?", "answer": "It enables time intelligence calculations in DAX, like Year-to-Date (YTD) or Same-Period-Last-Year comparisons." },
    { "number": 39, "difficulty": "medium", "question": "What is the purpose of a 'hidden' calculation sheet in a dashboard?", "answer": "It holds all the PivotTables and data processing, keeping the user-facing dashboard clean and uncluttered." },
    { "number": 40, "difficulty": "hard", "question": "How can you make a chart title dynamic?", "answer": "Link the chart title to a cell that contains a formula, which can combine text with calculated values (e.g., `=\"Sales for \" & A1`)." },
    { "number": 41, "difficulty": "expert", "question": "What is filter context in DAX?", "answer": "The set of active filters applied to the Data Model before a measure is evaluated. It comes from rows, columns, slicers, and other measures." },
    { "number": 42, "difficulty": "medium", "question": "Why is it better to format data as an Excel Table before creating a PivotTable?", "answer": "The PivotTable's source range becomes dynamic. When you add new data to the Table, the PivotTable will include it on refresh automatically." },
    { "number": 43, "difficulty": "hard", "question": "What does the `RELATED` function do in DAX?", "answer": "It follows a many-to-one relationship to fetch a value from another table, similar to a lookup." },
    { "number": 44, "difficulty": "expert", "question": "How can you connect one slicer to multiple PivotTables?", "answer": "Right-click the slicer, select 'Report Connections', and check the boxes for all the PivotTables you want it to control." },
    { "number": 45, "difficulty": "medium", "question": "What is the primary advantage of Power Pivot over traditional Excel?", "answer": "It can handle millions of rows of data efficiently and create relationships between multiple tables, overcoming Excel's row limits and VLOOKUP inefficiencies." }
]
    };

if (typeof window !== 'undefined') {
    window.excelData = excelData;
}
