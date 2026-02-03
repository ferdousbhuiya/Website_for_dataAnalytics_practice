const etlFullContent = [
    {
        id: 'etl1',
        title: 'ETL 1: Foundations & Architecture',
        category: 'ETL Automation',
        duration: '45 mins',
        level: 'Beginner',
        lessons: [
            {
                title: 'What Is ETL Testing?',
                content: `ETL testing ensures that data is extracted, transformed, and loaded correctly across systems. It is the backbone of data quality in modern organizations.

**Core Pipeline Stages:**
- **Extract**: Pulling raw data from sources (APIs, DBs, Files).
- **Transform**: Applying business logic (cleansing, mapping, aggregating).
- **Load**: Inserting data into the target warehouse/lake.
- **Validate**: Python-driven verification layer.
- **Report**: Logging and auditing results.

**ETL vs ELT:**
- **ETL**: Data is transformed *before* loading. Common for traditional warehouses.
- **ELT**: Data is loaded first, then transformed *inside* the warehouse. Common for modern cloud lakes (BigQuery, Snowflake).`
            },
            {
                title: 'The ETL Tester Mindset',
                content: `ETL testing requires a different way of thinking compared to UI or API testing.

**The Four Pillars of the ETL Mindset:**
1. **Data Flow Thinking**: Visualizing how data moves from Source → Staging → Target.
2. **Business Rule Awareness**: Encoding complex logic into Python validation functions.
3. **Anticipating Anomalies**: Predicting nulls, duplicates, and data drift.
4. **Automation-First Approach**: Always asking: "Can this be scheduled and repeated?"`
            },
            {
                title: 'Why Python Over SQL or GUI?',
                content: `While SQL is great for querying, Python acts as the "glue" that orchestrates the entire pipeline.

| Feature | Python | SQL | GUI Tools |
|---------|--------|-----|-----------|
| **Scope** | Cross-platform automation | Only inside databases | License-dependent |
| **Logic** | Reusable modules/classes | One-off queries | Limited flexibility |
| **Integration** | Cloud APIs, File systems | Mostly DB-bound | Proprietary connectors |
| **Cost** | Open Source | Open Source / Proprietary | Expensive Licenses |

**Pro Tip:** Use SQL for extraction and Python for the complex reconciliation logic.`
            },
            {
                title: 'Real-World ETL Scenarios',
                content: `How Python is used in enterprise environments:

1. **File Reconciliation**: Comparing a 2-million-row CSV with a Target DB.
2. **Schema Validation**: Detecting if a JSON API field changed from 'ID' to 'uuid'.
3. **Transformation Logic**: Verifying rules like "If status = 'A', set ActiveFlag = 1".
4. **Metadata Extraction**: Pulling start/end times and row counts for audit logs.`
            },
            {
                title: 'Case Study: Schema Drift',
                content: `**Scenario**: A third-party provider adds a new column 'middle_name' to their CSV, and your ETL pipeline crashes.
**Python Solution**: Build a Schema Validator that checks the header *before* processing rows.
\`\`\`python
required = ["id", "first_name", "last_name"]
actual = header.split(",")
missing = [c for c in required if c not in actual]
if missing:
    raise Exception(f"Schema Drift Detected! Missing: {missing}")
\`\`\``
            },
            {
                title: 'Mastery: The Reusability Matrix',
                content: `In enterprise ETL, we never build "one-off" scripts. We build "Systems".

**The Reusability Checklist:**
- Is the validation logic separate from the data?
- Can this script handle 10 rows AND 10 million rows?
- If the database password changes, do I have to edit the code? (No, use Config!)
- Is there a clear "Audit Trail" of what happened?

\`\`\`text
╔══════════════════════════════════════╗
║        REUSABLE ETL ARCHITECTURE     ║
╠══════════════════════════════════════╣
║ [Config] → [Validator] → [Orchestrator] ║
║    ↑            ↑            ↑       ║
║ [Secret]   [Logic]      [Scheduler]  ║
╚══════════════════════════════════════╝
\`\`\``
            }
        ],
        questions: [
            { id: 1, text: "What is the primary difference between ETL and ELT?", options: ["The source system used", "Where the transformation happens", "The file format", "The number of rows"], correct: 1 },
            { id: 2, text: "Why is Python preferred over GUI tools for custom validation?", options: ["It is more expensive", "It lacks flexibility", "It connects to any system and costs nothing", "It only handles small data"], correct: 2 },
            { id: 3, text: "Which stage handles cleaning and mapping data?", options: ["Extract", "Transform", "Load", "Report"], correct: 1 },
            { id: 4, text: "What does 'Schema Drift' refer to?", options: ["Moving data to a new server", "Changes in the source data structure", "Slow database queries", "Duplicate row counts"], correct: 1 },
            { id: 5, text: "What is the best way to handle 2 million rows for comparison?", options: ["Manual sampling", "Python-driven automated reconciliation", "Excel formulas", "Visual inspection"], correct: 1 }
        ]
    },
    {
        id: 'etl2',
        title: 'ETL 2: Environment & Tooling',
        category: 'ETL Automation',
        duration: '40 mins',
        level: 'Beginner',
        lessons: [
            {
                title: 'Python Installation & PATH',
                content: `To build professional ETL tools, you need a stable environment.

**Installation Rules:**
- **Add to PATH**: Essential for running Python from any terminal.
- **Verify**: Run \`python --version\` and \`pip --version\`.
- **Consistency**: Use the same version across the entire team (e.g., Python 3.11+).`
            },
            {
                title: 'Virtual Environments (venv)',
                content: `Never install packages globally. Project dependencies differ (e.g., ETL Project A might need Pandas 1.x, while Project B needs Pandas 2.x).

**Workflow:**
1. Create: \`python -m venv venv\`
2. Activate (Windows): \`.\\\\venv\\\\Scripts\\\\activate\`
3. Isolate: Your CLI prompt will change to \`(venv)\`.`
            },
            {
                title: 'Requirements Management',
                content: `A \`requirements.txt\` file is the heart of dependency management.

**The Standard Cycle:**
1. Install: \`pip install pandas requests sqlalchemy\`
2. Freeze: \`pip freeze > requirements.txt\`
3. Reinstall: \`pip install -r requirements.txt\`

**Pro Tip:** Pin your versions (\`pandas==2.0.3\`) to prevent future breaking changes from crashing your pipeline.`
            },
            {
                title: 'Enterprise Folder Structure',
                content: `A clean structure ensures maintainability.
\`\`\`text
ETL_Project/
├── config/         # Settings (YAML/JSON)
├── data/           # incoming/, processed/, rejected/
├── src/            # Business logic
├── logs/           # Execution history
├── tests/          # PyTest scripts
└── requirements.txt
\`\`\`
**Why subfolders?** Separating 'incoming' from 'processed' data prevents duplicate processing and data corruption.`
            },
            {
                title: 'VS Code for ETL Developers',
                content: `VS Code is the industry standard IDE for Python.
**Essential Extensions:**
- **Pylance**: For static type checking and IntelliSense.
- **Python Debugger**: To step through row-level logic.
- **Black Formatter**: To enforce consistent code style (PEP 8).`
            },
            {
                title: 'Mastery: The "Rejected Data" Strategy',
                content: `How do you handle rows that fail validation? You don't just "print" an error. You implement a **Rejected Data Folder Strategy**.

1. **Incoming**: Raw source files.
2. **Processed**: Files that passed 100% validation.
3. **Rejected**: Rows that failed business rules, saved into \`rejected_{date}.csv\` with a new column explaining WHY they failed.

This allows data analysts to fix the specific errors and re-submit them without reprocessing the entire dataset.`
            }
        ],
        questions: [
            { id: 1, text: "What command creates a virtual environment?", options: ["python create venv", "python -m venv venv", "pip install venv", "make venv"], correct: 1 },
            { id: 2, text: "Why should you use a requirements.txt file?", options: ["To store passwords", "To list project dependencies for reproducibility", "To write Python code", "To store data"], correct: 1 },
            { id: 3, text: "Where should raw input files be stored in a project?", options: ["src/", "logs/", "data/incoming/", "venv/"], correct: 2 },
            { id: 4, text: "What does pip freeze do?", options: ["Stops the script", "Displays installed packages and versions", "Deletes all packages", "Encrypts your code"], correct: 1 },
            { id: 5, text: "Which VS Code extension helps with type checking?", options: ["GitLens", "Pylance", "Prettier", "Jupyter"], correct: 1 }
        ]
    },
    {
        id: 'etl3',
        title: 'ETL 3: Variables, Logic & Flow',
        category: 'ETL Automation',
        duration: '50 mins',
        level: 'Beginner',
        lessons: [
            {
                title: 'Data Types in ETL',
                content: `In ETL, understanding types is the difference between a successful load and a data quality nightmare.

- **int**: Row counts, IDs.
- **float**: Currency, tax rates (Use \`abs(a-b) < tolerance\` for comparison).
- **str**: Column headers, metadata (Strip whitespace before comparing!).
- **bool**: Validation flags (\`is_valid\`, \`has_duplicates\`).`
            },
            {
                title: 'Safe Type Casting',
                content: `Files store everything as text. You must convert strings to numbers before calculating.
**The "Anti-Pattern":** Directly calling \`int(value)\`. If the value is "N/A", the script crashes.
**The "Pro Pattern":**
\`\`\`python
def safe_int(val):
    try:
        return int(val)
    except:
        return 0
\`\`\``
            },
            {
                title: 'Membership & Validation Logic',
                content: `Use Python's \`in\` operator for fast lookup and column validation.
\`\`\`python
header = ["id", "amount", "date"]
if "tax" not in header:
    print("Warning: Tax column missing, applying default Rule X")
\`\`\`
Logical operators (\`and\`, \`or\`, \`not\`) allow you to combine complex business rules:
\`\`\`python
if country == "US" and amount > 5000:
    flag_for_audit = True
\`\`\``
            },
            {
                title: 'Iteration Patterns (Loops)',
                content: `ETL is about iterating over rows.
- **For Loop**: Use when you have a fixed list of rows.
- **While Loop**: Use for paginated APIs (fetch until no more pages).

**Pro Tip**: Always use \`enumerate(rows)\` to track the exact line number of a failure for faster debugging.`
            },
            {
                title: 'Case Study: The "Magic Number" Trap',
                content: `**Bad Code**: \`if amount > 1000: flag()\`.
**Professional Code**:
\`\`\`python
THRESHOLD = 1000
if amount > THRESHOLD:
    flag()
\`\`\`
Storing constants and using dictionaries for rules (\`tax_rules = {"US": 0.07, "CA": 0.05}\`) makes your code maintainable.`
            },
            {
                title: 'Mastery: Control Flow Truth Tables',
                content: `ETL testers use "Truth Tables" to verify complex business logic.
**The Scenario**: If (Status = 'Active') AND (Balance > 0 OR Has_Premium = True).

| Status | Balance | Premium | Expected Result |
|--------|---------|---------|-----------------|
| Active | 100 | False | PASS |
| Active | 0 | True | PASS |
| Inactive| 500 | True | FAIL |
| Active | 0 | False | FAIL |

**Pro Tip**: Encode these tables into a dictionary or a list of tuples to test thousands of variations in a single loop.`
            }
        ],
        questions: [
            { id: 1, text: "How should you compare two float amounts for equality?", options: ["a == b", "abs(a - b) < 0.01", "round(a) == round(b)", "a is b"], correct: 1 },
            { id: 2, text: "What is the result of '100' in ['100', '200']?", options: ["True", "False", "Error", "None"], correct: 0 },
            { id: 3, text: "Why is 'safe casting' important?", options: ["To make code run faster", "To prevent script crashes on bad data", "To encrypt data", "To save memory"], correct: 1 },
            { id: 4, text: "Which loop is best for a paginated API?", options: ["for", "while", "if", "until"], correct: 1 },
            { id: 5, text: "What is an 'Anti-Pattern'?", options: ["A new feature", "A common but ineffective coding habit", "A design pattern", "A testing tool"], correct: 1 }
        ]
    },
    {
        id: 'etl4',
        title: 'ETL 4: Files & I/O Handling',
        category: 'ETL Automation',
        duration: '45 mins',
        level: 'Intermediate',
        lessons: [
            {
                title: 'Streaming vs Loading Files',
                content: `Memory management is key for large files.
- **Loading**: \`f.read()\` loads everything into memory. (Bad for 1GB files!)
- **Streaming**: \`for line in f:\` processes one row at a time. (Standard for ETL).

**Pro Tip:** Use the \`with\` statement (\`Context Manager\`) to ensure files are closed automatically, even if an error occurs.`
            },
            {
                title: 'Handling CSV Data',
                content: `The \`csv\` module is your best friend.
\`\`\`python
import csv
with open('data.csv', 'r') as f:
    reader = csv.DictReader(f) # Maps header to values automatically
    for row in reader:
        print(row['amount'])
\`\`\`
Always specify \`encoding='utf-8'\` and \`newline=''\` for consistency across Windows/Mac.`
            },
            {
                title: 'JSON Processing for ETL',
                content: `JSON is the universal format for modern APIs.
- **Deserialize**: \`json.loads(text)\` -> Python Dictionary.
- **Serialize**: \`json.dumps(dict)\` -> JSON String.
- **Nested Data**: Handle deep nesting with safe checks: \`data.get('user', {}).get('address', 'N/A')\`.`
            },
            {
                title: 'Directory Traversal & OS Module',
                content: `ETL often involves "watching" a folder for new files.
\`\`\`python
import os
for filename in os.listdir('incoming/'):
    if filename.endswith('.csv'):
        process(filename)
\`\`\`
Use \`os.path.join()\` to build paths that work on both Windows (\`\\\`) and Linux (\`/\`).`
            },
            {
                title: 'Log Management (The Audit Trail)',
                content: `ETL without logging is not enterprise-grade.
**Key Log Entries:**
- Timestamp of start/end.
- Source filename.
- Success count vs Failure count.
- Error messages for rejected rows.
Use the \`logging\` module instead of \`print()\` for levels like INFO, WARNING, and ERROR.`
            },
            {
                title: 'Mastery: Encoding & Line Endings',
                content: `The #1 cause of "corrupted" ETL data is a mismatch in Encoding.
- **UTF-8**: The modern standard (Global support).
- **Latin-1 / CP1252**: Common in legacy Windows files.

**The Diagnostic Script:**
\`\`\`python
with open('data.csv', 'rb') as f:
    raw = f.read(100) # Read first 100 bytes
    print(raw) # Look for \\\\x00 or \\\\xfe (Indicators of UTF-16)
\`\`\`
Always explicitly set \`encoding='utf-8'\` to prevent invisible characters from breaking your string comparisons.`
            }
        ],
        questions: [
            { id: 1, text: "Why is 'streaming' a file better than 'loading' it?", options: ["It uses more memory", "It allows processing massive files efficiently", "It is slower", "It deletes the file"], correct: 1 },
            { id: 2, text: "Which module is used to list files in a directory?", options: ["sys", "os", "math", "csv"], correct: 1 },
            { id: 3, text: "What does json.loads() do?", options: ["Turns a dictionary into a string", "Turns a JSON string into a Python object", "Deletes a JSON file", "Updates a database"], correct: 1 },
            { id: 4, text: "How should you build file paths for cross-platform support?", options: ["String concatenation ('data/' + name)", "os.path.join()", "Hardcoded paths", "Manual entry"], correct: 1 },
            { id: 5, text: "What should be logged in an ETL process?", options: ["Secret passwords", "Every single row value", "Start/end times and error summaries", "Nothing"], correct: 2 }
        ]
    },
    {
        id: 'etl5',
        title: 'ETL 5: Functions & Modular Design',
        category: 'ETL Automation',
        duration: '50 mins',
        level: 'Intermediate',
        lessons: [
            {
                title: 'The Power of Helper Functions',
                content: `Don't write one massive script. Break it into small, testable "pure" functions.
**Examples of ETL Helpers:**
- \`validate_email(email)\`: Returns True/False.
- \`clean_currency(val)\`: Returns float.
- \`check_duplicates(id_list)\`: Logs errors.

**Pro Tip:** A function should do ONE thing well.`
            },
            {
                title: 'Modular Pipeline Orchestration',
                content: `Move your functions into separate files (modules).
- \`validators.py\`: Schema and business rules.
- \`db_client.py\`: Database connections.
- \`orchestrator.py\`: The main "glue" that runs the steps in order.

Import them using: \`from src.utils import db_client\`.`
            },
            {
                title: 'Parameterization',
                content: `Avoid hardcoding file names or thresholds inside functions. Pass them as arguments.
\`\`\`python
# Bad
def validate():
    if row['total'] > 100: ...

# Professional
def validate(row, threshold):
    if row['total'] > threshold: ...
\`\`\``
            },
            {
                title: 'Error Propagation Patterns',
                content: `How do you handle a failure in row 500 of 1 million?
1. **Stop & Fail**: Raise exception, kill process (Audit critical).
2. **Skip & Log**: Skip row, add to \`rejected_data.csv\`, continue (Standard).
3. **Dead Letter Queue**: Store failed rows in a specific DB table for manual review.`
            },
            {
                title: 'Best Practices: Dry (Don\'t Repeat Yourself)',
                content: `If you find yourself copy-pasting code for row count checks in every script, create a \`Utility Library\`.
**Refactoring Checklist:**
- Can this logic be used in other projects?
- Is the function name clear?
- Are the inputs and outputs documented?`
            },
            {
                title: 'Mastery: Unit Testing ETL Helpers',
                content: `Even small helper functions like \`clean_currency()\` need to be tested.
Use the **PyTest** framework to ensure your helpers handle edge cases.

\`\`\`python
def test_clean_currency():
    assert clean_currency("$1,000.50") == 1000.50
    assert clean_currency("") == 0.0
    assert clean_currency("N/A") == 0.0
\`\`\`
**Why?** If you fix a bug in your currency cleaner, you want to be 100% sure you didn't break it for other formats.`
            }
        ],
        questions: [
            { id: 1, text: "What is a 'pure' function?", options: ["A function with no code", "A function that always returns the same output for same input with no side effects", "A function that talks to a database", "A function with many parameters"], correct: 1 },
            { id: 2, text: "Why separate validators from orchestration logic?", options: ["To make the code longer", "To improve reusability and testability", "To hide errors", "To save space"], correct: 1 },
            { id: 3, text: "What is the 'Stop & Fail' pattern best for?", options: ["Non-critical log files", "Financial audits where data integrity is paramount", "Social media data", "Temporary folders"], correct: 1 },
            { id: 4, text: "What does DRY stand for?", options: ["Data Ready Yield", "Don't Repeat Yourself", "Do Repeat Yesterday", "Data Robust Yield"], correct: 1 },
            { id: 5, text: "How should you handle row-level errors in a standard ETL process?", options: ["Delete the whole source file", "Ignore them", "Skip and log to a rejected data file", "Restart the computer"], correct: 2 }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = etlFullContent;
} else {
    window.etlFullContent = etlFullContent;
}
