
module.exports = {
    etl: {
        title: "ETL Automation (Python)",
        lessons: [
            {
                number: 1,
                title: "Introduction to ETL Testing",
                content: `
                    <h4>1. What is ETL Testing?</h4>
                    <p>ETL (Extract, Transform, Load) testing ensures data is moved correctly from source to destination. Unlike app testing, it focuses on <strong>data quality, completeness, and transformation logic</strong>.</p>
                    
                    <h4>2. ETL vs ELT</h4>
                    <ul>
                        <li><strong>ETL:</strong> Transform data <em>before</em> loading (Traditional).</li>
                        <li><strong>ELT:</strong> Load raw data first, then transform in the warehouse (Modern Cloud).</li>
                    </ul>
                    
                    <h4>3. The Tester's Mindset</h4>
                    <p>You must think in "Data Flows." Your job is to catch anomalies (nulls, duplicates, truncation) before they reach the business reports.</p>
                `
            },
            {
                number: 2,
                title: "Why Python for ETL?",
                content: `
                    <h4>1. The "Glue" Language</h4>
                    <p>Python connects everything: Databases, APIs, Files, and Cloud Services.</p>
                    
                    <h4>2. Comparison</h4>
                    <ul>
                        <li><strong>vs SQL:</strong> SQL is for querying. Python is for <em>automation</em> and complex logic not possible in SQL.</li>
                        <li><strong>vs Bash:</strong> Python is cross-platform and has better error handling.</li>
                        <li><strong>vs Tools:</strong> Python is free, flexible, and handles custom validation better than expensive GUI tools.</li>
                    </ul>
                `
            },
            {
                number: 3,
                title: "Real-World Scenario: File Reconciliation",
                content: `
                    <h4>1. The Scenario</h4>
                    <p>A source system sends a daily CSV with 1 million rows. You need to verify it matches the database table it was loaded into.</p>
                    
                    <h4>2. Python Approach</h4>
                    <pre><code># Pseudo-code
source_count = len(read_csv("data.csv"))
target_count = db.execute("SELECT COUNT(*) FROM table")

if source_count != target_count:
    raise ValueError(f"Mismatch! Source: {source_count}, Target: {target_count}")</code></pre>
                `
            },
            {
                number: 4,
                title: "Schema Validation",
                content: `
                    <h4>1. The Problem</h4>
                    <p>Upstream teams change column names or data types without telling you. This breaks pipelines.</p>
                    
                    <h4>2. The Solution</h4>
                    <p>Write Python scripts to check metadata <em>before</em> processing.</p>
                    <ul>
                        <li>Check if required columns exist.</li>
                        <li>Verify data types (e.g., "id" should be Integer, not String).</li>
                        <li>Check for forbidden Null values.</li>
                    </ul>
                `
            },
            {
                number: 5,
                title: "Best Practices",
                content: `
                    <h4>1. Logging</h4>
                    <p>Never print to console. Use a logger. You need to know <em>when</em> a script ran and <em>what</em> it did.</p>
                    
                    <h4>2. Modularity</h4>
                    <p>Don't write 500-line scripts. Break code into functions: <code>get_data()</code>, <code>validate_data()</code>, <code>load_data()</code>.</p>
                    
                    <h4>3. Configuration</h4>
                    <p>Never hardcode paths or passwords. Use <code>.env</code> files or config variables.</p>
                `
            },
            {
                number: 6,
                title: "Anti-Patterns to Avoid",
                content: `
                    <h4>1. Silent Failures</h4>
                    <p>Using <code>try...except pass</code> hides errors. If data is bad, the script <strong>should fail</strong> and alert you.</p>
                    
                    <h4>2. Hardcoding</h4>
                    <p>Writing <code>C:/Users/Name/Desktop/file.csv</code> guarantees your script will fail on anyone else's machine.</p>
                `
            }
        ],
        questions: [
            {
                number: 1,
                difficulty: "easy",
                question: "What is the difference between ETL and ELT?",
                context: "Think about the order of operations.",
                answer: "<h4>Answer</h4><p><strong>ETL:</strong> Transform before load.</p><p><strong>ELT:</strong> Load before transform (common in cloud warehouses like Snowflake).</p>"
            },
            {
                number: 2,
                difficulty: "medium",
                question: "Why should you avoid hardcoding file paths?",
                context: "Portability.",
                answer: "<h4>Answer</h4><p>Hardcoded paths break when runs on different servers or by different users. Use relative paths or config files.</p>"
            },
            {
                number: 3,
                difficulty: "hard",
                question: "What is 'Silent Failure' and why is it bad?",
                context: "Error Handling.",
                answer: "<h4>Answer</h4><p>Catching an error and doing nothing (passing). It's bad because data corruption happens without anyone knowing.</p>"
            },
            {
                number: 4,
                difficulty: "medium",
                question: "How does Python complement SQL in ETL?",
                context: "Tool Selection.",
                answer: "<h4>Answer</h4><p>SQL handles data retrieval and set operations. Python handles file manipulation, API calls, and complex validation logic.</p>"
            },
            {
                number: 5,
                difficulty: "easy",
                question: "What is Schema Drift?",
                context: "Validation.",
                answer: "<h4>Answer</h4><p>When the structure of data (columns, types) changes unexpectedly over time.</p>"
            },
            {
                number: 6,
                difficulty: "medium",
                question: "In File Reconciliation, what are two key metrics to compare?",
                context: "Validation Metrics.",
                answer: "<h4>Answer</h4><p>Row Counts (Completeness) and Aggregates/Sums of key columns (Correctness).</p>"
            },
            {
                number: 7,
                difficulty: "hard",
                question: "Why is 'Modularity' important in Python ETL scripts?",
                context: "Code Quality.",
                answer: "<h4>Answer</h4><p>It allows code reuse (e.g., a standard 'validate_date' function) and makes debugging easier.</p>"
            },
            {
                number: 8,
                difficulty: "medium",
                question: "What is a 'Data Swamp'?",
                context: "Data Governance.",
                answer: "<h4>Answer</h4><p>A Data Lake that lacks governance, metadata, or quality checks, making the data unusable.</p>"
            },
            {
                number: 9,
                difficulty: "easy",
                question: "True or False: You should use 'print()' for production logging.",
                context: "Best Practices.",
                answer: "<h4>False</h4><p>Use the <code>logging</code> library. Print statements don't have timestamps, levels, or file outputs.</p>"
            },
            {
                number: 10,
                difficulty: "hard",
                question: "Describe a 'Validation Layer' in an ETL pipeline.",
                context: "Architecture.",
                answer: "<h4>Answer</h4><p>A step, often using Python, that sits between Extraction and Loading to check data against business rules before it enters the warehouse.</p>"
            }
        ]
    }
};
