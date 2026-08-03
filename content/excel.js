// EXCEL topic data
const excelData = {
        title: "Excel & Spreadsheets",
        lessons: [
    {
        "number": 1,
        "title": "Excel Interface",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The universal language of business. Even with Python and SQL, Excel is where final decisions are often presented.</p>\n    "
    },
    {
        "number": 2,
        "title": "Basic Formulas",
        "content": "\n        <h4>1. The Big 4</h4>\n        <p><code>=SUM()</code>, <code>=AVERAGE()</code>, <code>=COUNT()</code>, <code>=MAX()</code>.</p>\n        <h4>2. Pro Tip</h4>\n        <p>Use <code>Alt + =</code> to auto-sum a column instantly.</p>\n    "
    },
    {
        "number": 3,
        "title": "Cell Referencing",
        "content": "\n        <h4>1. Relative vs Absolute</h4>\n        <p>The difference between <code>A1</code> and <code>$A$1</code>.</p>\n        <ul>\n            <li><strong>A1 (Relative):</strong> Updates when you drag the formula.</li>\n            <li><strong>$A$1 (Absolute):</strong> Locks the cell. Use for constants like Tax Rate.</li>\n        </ul>\n    "
    },
    {
        "number": 4,
        "title": "Functions (Logic)",
        "content": "\n        <h4>1. IF Statement</h4>\n        <p><code>=IF(logic, value_if_true, value_if_false)</code></p>\n        <h4>2. Nested IFs</h4>\n        <p>Use <code>IFS()</code> in modern Excel to avoid messy nesting.</p>\n    "
    },
    {
        "number": 5,
        "title": "VLOOKUP and XLOOKUP",
        "content": "\n        <h4>1. The Interview Question</h4>\n        <p>\"Do you know VLOOKUP?\" is the standard Excel interview question.</p>\n        <h4>2. XLOOKUP</h4>\n        <p>The modern successor. It can look left, defaults to exact match, and handles errors.</p>\n        <p><code>=XLOOKUP(lookup_val, lookup_array, return_array)</code></p>\n    "
    },
    {
        "number": 6,
        "title": "Pivot Tables",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The most powerful feature in Excel. Summarize 100,000 rows in 5 seconds without formulas.</p>\n        <h4>2. The 4 Areas</h4>\n        <ul>\n            <li><strong>Rows:</strong> What you want to group by.</li>\n            <li><strong>Values:</strong> What you want to calculate (Sum, Count).</li>\n            <li><strong>Columns:</strong> Secondary grouping (Matrix view).</li>\n            <li><strong>Filters:</strong> Global exclusions.</li>\n        </ul>\n    "
    },
    {
        "number": 7,
        "title": "Charts in Excel",
        "content": "\n        <h4>1. Quick Charts</h4>\n        <p>Select data and press <code>Alt + F1</code>.</p>\n        <h4>2. Formatting</h4>\n        <p>Remove gridlines and add data labels for a cleaner look.</p>\n    "
    },
    {
        "number": 8,
        "title": "Data Validation",
        "content": "\n        <h4>1. Dropdown Lists</h4>\n        <p>Force users to select from a list (e.g., \"Yes/No\", \"Dept A/Dept B\"). Keeps data clean at entry.</p>\n    "
    },
    {
        "number": 9,
        "title": "Power Query Basics",
        "content": "\n        <h4>1. What is it?</h4>\n        <p>ETL for Excel. It records your cleanup steps (remove rows, split columns) so you can re-apply them next month with one click.</p>\n    "
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
    }
]
    };

if (typeof window !== 'undefined') {
    window.excelData = excelData;
}
