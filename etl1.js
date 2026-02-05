// ETL1 topic data
const etl1Data = {
        title: "ETL 1: Foundations",
        lessons: [
    {
        "title": "What Is ETL Testing?",
        "content": "ETL testing ensures that data is extracted, transformed, and loaded correctly across systems. It is the backbone of data quality in modern organizations.\n\n**Core Pipeline Stages:**\n- **Extract**: Pulling raw data from sources (APIs, DBs, Files).\n- **Transform**: Applying business logic (cleansing, mapping, aggregating).\n- **Load**: Inserting data into the target warehouse/lake.\n- **Validate**: Python-driven verification layer.\n- **Report**: Logging and auditing results.\n\n**ETL vs ELT:**\n- **ETL**: Data is transformed *before* loading. Common for traditional warehouses.\n- **ELT**: Data is loaded first, then transformed *inside* the warehouse. Common for modern cloud lakes (BigQuery, Snowflake)."
    },
    {
        "title": "The ETL Tester Mindset",
        "content": "ETL testing requires a different way of thinking compared to UI or API testing.\n\n**The Four Pillars of the ETL Mindset:**\n1. **Data Flow Thinking**: Visualizing how data moves from Source → Staging → Target.\n2. **Business Rule Awareness**: Encoding complex logic into Python validation functions.\n3. **Anticipating Anomalies**: Predicting nulls, duplicates, and data drift.\n4. **Automation-First Approach**: Always asking: \"Can this be scheduled and repeated?\""
    },
    {
        "title": "Why Python Over SQL or GUI?",
        "content": "While SQL is great for querying, Python acts as the \"glue\" that orchestrates the entire pipeline.\n\n| Feature | Python | SQL | GUI Tools |\n|---------|--------|-----|-----------|\n| **Scope** | Cross-platform automation | Only inside databases | License-dependent |\n| **Logic** | Reusable modules/classes | One-off queries | Limited flexibility |\n| **Integration** | Cloud APIs, File systems | Mostly DB-bound | Proprietary connectors |\n| **Cost** | Open Source | Open Source / Proprietary | Expensive Licenses |\n\n**Pro Tip:** Use SQL for extraction and Python for the complex reconciliation logic."
    },
    {
        "title": "Real-World ETL Scenarios",
        "content": "How Python is used in enterprise environments:\n\n1. **File Reconciliation**: Comparing a 2-million-row CSV with a Target DB.\n2. **Schema Validation**: Detecting if a JSON API field changed from 'ID' to 'uuid'.\n3. **Transformation Logic**: Verifying rules like \"If status = 'A', set ActiveFlag = 1\".\n4. **Metadata Extraction**: Pulling start/end times and row counts for audit logs."
    },
    {
        "title": "Case Study: Schema Drift",
        "content": "**Scenario**: A third-party provider adds a new column 'middle_name' to their CSV, and your ETL pipeline crashes.\n**Python Solution**: Build a Schema Validator that checks the header *before* processing rows.\n```python\nrequired = [\"id\", \"first_name\", \"last_name\"]\nactual = header.split(\",\")\nmissing = [c for c in required if c not in actual]\nif missing:\n    raise Exception(f\"Schema Drift Detected! Missing: {missing}\")\n```"
    },
    {
        "title": "Mastery: The Reusability Matrix",
        "content": "In enterprise ETL, we never build \"one-off\" scripts. We build \"Systems\".\n\n**The Reusability Checklist:**\n- Is the validation logic separate from the data?\n- Can this script handle 10 rows AND 10 million rows?\n- If the database password changes, do I have to edit the code? (No, use Config!)\n- Is there a clear \"Audit Trail\" of what happened?\n\n```text\n╔══════════════════════════════════════╗\n║        REUSABLE ETL ARCHITECTURE     ║\n╠══════════════════════════════════════╣\n║ [Config] → [Validator] → [Orchestrator] ║\n║    ↑            ↑            ↑       ║\n║ [Secret]   [Logic]      [Scheduler]  ║\n╚══════════════════════════════════════╝\n```"
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "beginner",
        "question": "What is the primary difference between ETL and ELT?\\n\\n**Options:**\\n1. The source system used\\n2. Where the transformation happens\\n3. The file format\\n4. The number of rows",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Where the transformation happens"
    },
    {
        "number": 2,
        "difficulty": "beginner",
        "question": "Why is Python preferred over GUI tools for custom validation?\\n\\n**Options:**\\n1. It is more expensive\\n2. It lacks flexibility\\n3. It connects to any system and costs nothing\\n4. It only handles small data",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - It connects to any system and costs nothing"
    },
    {
        "number": 3,
        "difficulty": "beginner",
        "question": "Which stage handles cleaning and mapping data?\\n\\n**Options:**\\n1. Extract\\n2. Transform\\n3. Load\\n4. Report",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Transform"
    },
    {
        "number": 4,
        "difficulty": "beginner",
        "question": "What does 'Schema Drift' refer to?\\n\\n**Options:**\\n1. Moving data to a new server\\n2. Changes in the source data structure\\n3. Slow database queries\\n4. Duplicate row counts",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Changes in the source data structure"
    },
    {
        "number": 5,
        "difficulty": "beginner",
        "question": "What is the best way to handle 2 million rows for comparison?\\n\\n**Options:**\\n1. Manual sampling\\n2. Python-driven automated reconciliation\\n3. Excel formulas\\n4. Visual inspection",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Python-driven automated reconciliation"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl1Data = etl1Data;
}
