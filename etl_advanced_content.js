const etlAdvancedContent = [
    {
        id: 'etl6',
        title: 'ETL 6: OOP for ETL Testers',
        category: 'ETL Automation',
        duration: '55 mins',
        level: 'Advanced',
        lessons: [
            {
                title: 'Why OOP for ETL?',
                content: `In simple scripts, function-based code works. In enterprise frameworks, the logic becomes too complex to manage without **Classes**.

**The Class-Based Validator:**
- **Encapsulation**: Grouping data (rules) and behavior (validation logic) together.
- **State Management**: Keeping track of error counts or totals inside an object.

\`\`\`python
class SchemaValidator:
    def __init__(self, expected_cols):
        self.expected = expected_cols
        self.errors = []

    def validate(self, actual_cols):
        if self.expected != actual_cols:
            self.errors.append("Schema Mismatch")
\`\`\``
            },
            {
                title: 'The "BaseValidator" (Inheritance)',
                content: `Instead of writing 10 different validators from scratch, use **Inheritance**.
Create a \`BaseValidator\` with common methods like \`log_error()\` and \`report()\`.
Specific classes like \`IntegerValidator\` or \`EmailValidator\` inherit these behaviors.

**Pro Tip:** This reduces code duplication and ensures a consistent reporting format across your entire framework.`
            },
            {
                title: 'Composition over Inheritance',
                content: `In ETL, you often need to combine "File Reading" and "Row Validation". 
Instead of making one massive class, use **Composition**.
A \`Pipeline\` class *has* a \`FileReader\` and *has* multiple \`Validators\`.

**Why?** This allows you to swap a \`CSVReader\` for a \`JSONReader\` without changing your validation logic.`
            },
            {
                title: 'Stateful vs Stateless Validation',
                content: `- **Stateless**: Validating one row in isolation (e.g., Is amount > 0?).
- **Stateful**: Validating rows in relation to others (e.g., Is this ID a duplicate of one from row 5?).

Objects excel at stateful validation by storing previous values in a \`self.seen_ids\` set.`
            },
            {
                title: 'Design Pattern: Factory',
                content: `**The Scenario**: You have 100 different source files, each with different rules.
**The Solution**: Use a **Validator Factory** that returns the correct validator object based on the filename.
\`\`\`python
def get_validator(file_type):
    if file_type == "sales": return SalesValidator()
    if file_type == "users": return UserValidator()
\`\`\``
            },
            {
                title: 'Mastery: The Stateful Recordset',
                content: `Stateful validation requires comparing a row not just to a "rule", but to "previous rows".

**Example: Duplicate Running Totals**
If you are loading financial transactions, you might want to ensure the "Balance" column always equals the previous row's balance plus the current row's amount.

\`\`\`python
class BalanceValidator:
    def __init__(self, initial_balance):
        self.current_running_total = initial_balance

    def validate_row(self, row_amount, reported_balance):
        self.current_running_total += row_amount
        if self.current_running_total != reported_balance:
            return False
        return True
\`\`\`
This logic cannot be done in a single SQL WHERE clause efficiently; it requires a stateful Python object or a complex Window Function.`
            }
        ],
        questions: [
            { id: 1, text: "What is 'Encapsulation' in OOP?", options: ["Deleting code", "Grouping data and methods into a single unit (Class)", "Looping over rows", "Connecting to a DB"], correct: 1 },
            { id: 2, text: "Which OOP concept allows a sub-class to reuse code from a parent class?", options: ["Abstraction", "Inheritance", "Polymorphism", "Recursion"], correct: 1 },
            { id: 3, text: "Why is Composition often better than deep Inheritance in ETL?", options: ["It uses more memory", "It makes the code more flexible and easier to swap components", "It is required for SQL", "It is only for UI"], correct: 1 },
            { id: 4, text: "A stateful validator might use which data structure to track duplicates?", options: ["float", "set", "bool", "int"], correct: 1 },
            { id: 5, text: "When should you move from functions to classes in ETL?", options: ["When you have 1 row", "When the logic requires tracking state across thousands of rows and needs reusability", "Never", "When using Excel"], correct: 1 }
        ]
    },
    {
        id: 'etl7',
        title: 'ETL 7: Advanced Automation Patterns',
        category: 'ETL Automation',
        duration: '50 mins',
        level: 'Advanced',
        lessons: [
            {
                title: 'The Retry Mechanism',
                content: `Network blips and API timeouts are common. Professional scripts don't just fail; they **Retry**.
\`\`\`python
import time
for i in range(3): # Try 3 times
    try:
        response = call_api()
        break # Exit loop on success
    except:
        time.sleep(2) # Wait before retry
\`\`\`
**Exponential Backoff**: Increasing the wait time (\`2^i\`) to avoid overwhelming the server.`
            },
            {
                title: 'Data Checksums & Hashes',
                content: `How do you verify 1TB of data moved correctly? You can't compare every row.
- **MD5/SHA Hashes**: Calculate a unique "digital fingerprint" for the whole file or specific columns.
- **Checksums**: If the Source Hash == Target Hash, the data integrity is 100%.

**Pro Tip:** Use the \`hashlib\` module for fast, secure file verification.`
            },
            {
                title: 'Metadata Harvesting',
                content: `In enterprise ETL, the "Data about the Data" (Metadata) is as important as the data itself.
Capture:
- **Lineage**: Where did this row come from?
- **Batch IDs**: Grouping rows by execution run.
- **Process Status**: COMPLETED, FAILED, PARTIAL.`
            },
            {
                title: 'Handling Schema Drift Automatically',
                content: `Instead of hardcoding column names, use a **Config-Driven** approach.
Store column definitions in a YAML file.
Your script reads the YAML and validates the file dynamically.
**Benefit**: You fix schema changes by editing a config file, NOT by rewriting code.`
            },
            {
                title: 'Parallel Processing Basics',
                content: `If processing takes 10 hours, use the \`multiprocessing\` or \`concurrent.futures\` modules to process multiple files or chunks simultaneously.
**Warning**: Only parallelize "IO-bound" tasks (API calls) or CPU-heavy transformations. Be careful with database lock-contention!`
            },
            {
                title: 'Mastery: Multi-System Reconciliation',
                content: `In modern cloud architecture, data moves through many hops:
**Oracle (On-Prem) → S3 (Landing) → Snowflake (Warehouse)**.

**The Multi-Point Validation Pattern:**
1. **Hop 1**: Compare Oracle Row Count vs S3 File Line Count.
2. **Hop 2**: Compare S3 Column Count vs Snowflake Stage Column Count.
3. **Hop 3**: Compare Source Sum(Amount) vs Target Sum(Amount).

**Strategy**: Create a single "Reconciliation Report" that aggregates these results into a readable table for stakeholders.`
            }
        ],
        questions: [
            { id: 1, text: "What is 'Exponential Backoff' used for?", options: ["Speeding up loops", "Gradually increasing wait time during retries to reduce server load", "Deleting old files", "Encrypted storage"], correct: 1 },
            { id: 2, text: "What is a 'Digital Fingerprint' of a file called?", options: ["Index", "Checksum/Hash", "Binary Log", "Metadata"], correct: 1 },
            { id: 3, text: "Why use 'Config-Driven' validation?", options: ["To make code harder to read", "To handle changes (Schema Drift) without editing code", "To save disk space", "To use more CPU"], correct: 1 },
            { id: 4, text: "What is Metadata?", options: ["Secret data", "Binary data", "Data about the data (Lineage, Run IDs, etc.)", "Deleted data"], correct: 2 },
            { id: 5, text: "When is parallel processing harmful in ETL?", options: ["When you have many CPUs", "When multiple processes try to write to the same database table/row at once, causing locks", "When the file is small", "When using Python"], correct: 1 }
        ]
    },
    {
        id: 'etl8',
        title: 'ETL 8: Debugging & Troubleshooting',
        category: 'ETL Automation',
        duration: '45 mins',
        level: 'Advanced',
        lessons: [
            {
                title: 'Interactive Debugging with pdb',
                content: `Stop using \`print()\` for everything! Use the Python Debugger (\`pdb\`).
\`\`\`python
import pdb; pdb.set_trace() # Breakpoint
\`\`\`
**Commands inside pdb:**
- \`n\` (Next line)
- \`s\` (Step into function)
- \`c\` (Continue execution)
- \`p variable\` (Print variable value)`
            },
            {
                title: 'The Traceability Pattern',
                content: `Tracing means following a specific record as it moves through the pipeline.
**Implementation:** Add a \`trace_id\` to your log messages.
\`\`\`python
logging.info(f"[Record:{row_id}] Successfully transformed")
\`\`\`
This allows you to search logs and find exactly where a specific failing row was dropped.`
            },
            {
                title: 'Case Study 1: Invisible Whitespace',
                content: `**Symptom**: "Amount" column appears empty but is not registered as Null.
**Debug**: Use \`repr()\` to see hidden characters.
\`\`\`python
print(repr(col)) # Result: 'Amount ' (Note the trailing space)
\`\`\`
**Fix**: Always \`.strip()\` your headers and string values during ingestion.`
            },
            {
                title: 'Case Study 2: The Silent Row Loss',
                content: `**Symptom**: Source has 100,000 rows, Target has 99,999.
**Troubleshooting**:
1. Check the last row of the source file (Is there a trailing newline?).
2. Isolate the "missing" row using a Set subtraction between Source IDs and Target IDs.
3. Check for specific filtering logic (Was the row dropped because of a hidden 'Invalid' flag?).`
            },
            {
                title: 'Case Study 3: Float Imprecision',
                content: `**Symptom**: Financial total check fails by $0.0000001.
**Root Cause**: Binary representation of decimal numbers.
**Fix**: Use the \`decimal\` module for financial calculations, or use a "tolerance" comparison.
\`\`\`python
if abs(actual - expected) < 0.001: # Pass
\`\`\``
            },
            {
                title: 'Mastery: Post-Mortem Debugging',
                content: `When a production pipeline fails at 3 AM, you need a **Post-Mortem Strategy**.

**Steps:**
1. **Isolate**: Capture the exact "Poison Message" (the falling row) and save it to a separate file.
2. **Reproduce**: Run your script locally using ONLY that poison message.
3. **Insulate**: Add a new unit test that covers this specific edge case so it never happens again.

**Pro Tip:** Use "Rubber Duck Debugging"—explain your code line-by-line to a colleague (or a literal rubber duck). This often reveals the logic flaw before you even finish the explanation.`
            }
        ],
        questions: [
            { id: 1, text: "What pdb command moves to the next line?", options: ["run", "n", "m", "next"], correct: 1 },
            { id: 2, text: "How can you find the exact row that failed among millions?", options: ["Visual scan", "Set subtraction between Source and Target IDs", "Re-run the whole job", "Guessing"], correct: 1 },
            { id: 3, text: "What does repr() help with in debugging?", options: ["Speeding up code", "Revealing invisible characters like whitespace or tabs", "Formatting output", "Enciphering text"], correct: 1 },
            { id: 4, text: "Which module is best for precise financial currency math?", options: ["math", "float", "decimal", "random"], correct: 2 },
            { id: 5, text: "What is a 'Breakpoint'?", options: ["A syntax error", "A point where the program pauses for inspection", "A corrupted file", "A hardware failure"], correct: 1 }
        ]
    },
    {
        id: 'etl9',
        title: 'ETL 9: API Automation & JSON',
        category: 'ETL Automation',
        duration: '50 mins',
        level: 'Intermediate/Advanced',
        lessons: [
            {
                title: 'REST APIs for ETL',
                content: `Modern ETL often pulls data from APIs rather than CSVs.
**The Python Request Cycle:**
1. **Request**: \`requests.get(url, headers, params)\`.
2. **Handle Status**: \`response.raise_for_status()\` (Check for 200, 404, 500 errors).
3. **Parse**: \`data = response.json()\`.

**Pro Tip**: Always include a \`timeout\` in your requests to prevent your pipeline from hanging forever.`
            },
            {
                title: 'Authentication & Headers',
                content: `Enterprise APIs require security.
- **API Keys**: Passed in the URL or header.
- **Bearer Tokens (JWT)**: Passed in the header: \`{"Authorization": "Bearer XYZ"}\`.
- **Custom Headers**: Used for tracking (\`X-Request-ID\`) or content-type.`
            },
            {
                title: 'Pagination (The Infinite Loop Risk)',
                content: `If an API has 50,000 records, it won't return them all at once. It returns a "Page".
**Patterns:**
- **Page-based**: \`?page=1\`, \`?page=2\`... Stop when the result list is empty.
- **Next-Link**: The response contains a URL for the next page.
- **Offset/Limit**: \`?offset=100&limit=100\`.`
            },
            {
                title: 'JSON Validation with Python',
                content: `Don't just assume the JSON is correct. 
**Validation Pattern:**
\`\`\`python
required = ["id", "status"]
for key in required:
    if key not in response_data:
        log_failure(f"API Schema Break: {key} missing")
\`\`\`
Check types using \`isinstance(val, int)\` for sensitive fields like 'amount'.`
            },
            {
                title: 'Mocking APIs for Testing',
                content: `What if the API is down but you need to test your ETL logic?
Use the \`unittest.mock\` or \`responses\` library to "simulate" the API.
This allows you to test how your script handles different status codes (500, 403) without actually calling the remote server.`
            },
            {
                title: 'Mastery: Rate Limiting & 429 Errors',
                content: `Enterprises often limit how many times you can call an API per minute.
**HTTP 429: Too Many Requests.**

**The Handling Strategy:**
- **Inspect Response Headers**: Many APIs return \`Retry-After: 60\` (seconds).
- **Sleep & Retry**: Use your retry logic to wait the duration specified by the server.
- **Throttling**: Intentionally slow down your script using \`time.sleep(0.5)\` between calls to stay under the limit.`
            }
        ],
        questions: [
            { id: 1, text: "Which HTTP status code indicates 'Unauthorized'?", options: ["200", "401", "404", "500"], correct: 1 },
            { id: 2, text: "What is an 'Endless Loop' risk in API scripting?", options: ["Wrong URL", "Incorrect Pagination logic that never finds an 'end' signal", "High CPU", "Slow network"], correct: 1 },
            { id: 3, text: "Why use 'timeout' in requests.get()?", options: ["To make it faster", "To prevent the script from waiting forever if the server is unresponsive", "To save battery", "To encrypt the connection"], correct: 1 },
            { id: 4, text: "How do you access a nested JSON value like 'user' -> 'email'?", options: ["data['user_email']", "data['user']['email']", "data.email", "data(user, email)"], correct: 1 },
            { id: 5, text: "What does raise_for_status() do?", options: ["Deletes the response", "Prints the data", "Raises an exception if the status code indicates an error (e.g. 4xx/5xx)", "Increases the server speed"], correct: 2 }
        ]
    },
    {
        id: 'etl10',
        title: 'ETL 10: Database & SQL Controls',
        category: 'ETL Automation',
        duration: '60 mins',
        level: 'Intermediate/Advanced',
        lessons: [
            {
                title: 'Connecting Python to SQL',
                content: `Python uses "Base Drivers" and "ORMs".
- **SQLite3**: Built-in, no setup, perfect for local testing.
- **SQLAlchemy**: The enterprise standard. Connects to MySQL, Postgres, SQL Server, etc.
- **Patterns**: Connect -> Create Cursor -> Execute SQL -> Fetch Results -> Close.`
            },
            {
                title: 'The Source vs Target Recon',
                content: `This is the #1 job of an ETL tester.
**The SQL Pattern:**
\`\`\`sql
-- Run on Source
SELECT SUM(amount) FROM raw_data;
-- Run on Target
SELECT SUM(amount) FROM warehouse_table;
\`\`\`
Compare the results in Python. If they differ even by a cent, fail the validation.`
            },
            {
                title: 'SQL Data Quality Queries',
                content: `Automate these checks using Python:
- **Null Checks**: \`SELECT COUNT(*) FROM table WHERE id IS NULL;\`
- **Duplicate Checks**: \`SELECT id, COUNT(*) FROM table GROUP BY id HAVING COUNT(*) > 1;\`
- **Range Checks**: \`SELECT * FROM table WHERE age < 0 OR age > 120;\``
            },
            {
                title: 'Working with Window Functions',
                content: `Modern ETL validation uses "Window Functions" to compare rows against their colleagues.
\`\`\`sql
SELECT id, amount,
       ROW_NUMBER() OVER (PARTITION BY id ORDER BY timestamp) as rank
FROM audit_table;
\`\`\`
This helps detect duplicate entries that appeared close together in time.`
            },
            {
                title: 'Atomic Loads & Transactions',
                content: `What if the database crashes halfway through a 1-million-row load? You end up with "Dirty Data".
**The Solution**: **Database Transactions**.
Wrap your load logic in \`conn.commit()\` and \`conn.rollback()\`. 
Either *everything* loads, or *nothing* loads. This preserves data integrity.`
            },
            {
                title: 'Mastery: SCD Type 1 vs Type 2 Logic',
                content: `ETL testers must understand how "History" is stored in databases.
- **SCD Type 1**: Overwrite old data. (Simple, but you lose history).
- **SCD Type 2**: Add a new row with a version number or "active_flag". (Complex, preserves history).

**Validation Pattern for Type 2:**
1. Ensure the "Old Row" has its \`end_date\` updated to TODAY.
2. Ensure the "New Row" has a \`start_date\` of TODAY and \`is_active = True\`.
3. Verify that for any given ID, only ONE row has \`is_active = True\`.`
            }
        ],
        questions: [
            { id: 1, text: "In SQL, which clause identifies duplicates?", options: ["WHERE", "ORDER BY", "GROUP BY ... HAVING COUNT(*) > 1", "LIMIT"], correct: 2 },
            { id: 2, text: "What is an 'Atomic' database operation?", options: ["A complex query", "An operation that completes fully or not at all (no partial data)", "A fast query", "A query with many joins"], correct: 1 },
            { id: 3, text: "Which Python module is built-in for SQL?", options: ["pandas", "sqlite3", "requests", "math"], correct: 1 },
            { id: 4, text: "Why compare 'SUM(amount)' between Source and Target?", options: ["To check for data loss or hidden transformation errors in numeric fields", "To sort the data", "To delete rows", "To count files"], correct: 0 },
            { id: 5, text: "What does conn.rollback() do?", options: ["Saves changes", "Deletes the table", "Undoes all changes in the current transaction if an error occurs", "Restarts the DB"], correct: 2 }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = etlAdvancedContent;
} else {
    window.etlAdvancedContent = etlAdvancedContent;
}
