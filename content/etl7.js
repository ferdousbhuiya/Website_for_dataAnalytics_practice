// ETL7 topic data
const etl7Data = {
        title: "ETL 7: Advanced OOP",
        lessons: [
    {
        "title": "The Retry Mechanism",
        "content": "Network blips and API timeouts are common. Professional scripts don't just fail; they **Retry**.\n```python\nimport time\nfor i in range(3): # Try 3 times\n    try:\n        response = call_api()\n        break # Exit loop on success\n    except:\n        time.sleep(2) # Wait before retry\n```\n**Exponential Backoff**: Increasing the wait time (`2^i`) to avoid overwhelming the server."
    },
    {
        "title": "Data Checksums & Hashes",
        "content": "How do you verify 1TB of data moved correctly? You can't compare every row.\n- **MD5/SHA Hashes**: Calculate a unique \"digital fingerprint\" for the whole file or specific columns.\n- **Checksums**: If the Source Hash == Target Hash, the data integrity is 100%.\n\n**Pro Tip:** Use the `hashlib` module for fast, secure file verification."
    },
    {
        "title": "Metadata Harvesting",
        "content": "In enterprise ETL, the \"Data about the Data\" (Metadata) is as important as the data itself.\nCapture:\n- **Lineage**: Where did this row come from?\n- **Batch IDs**: Grouping rows by execution run.\n- **Process Status**: COMPLETED, FAILED, PARTIAL."
    },
    {
        "title": "Handling Schema Drift Automatically",
        "content": "Instead of hardcoding column names, use a **Config-Driven** approach.\nStore column definitions in a YAML file.\nYour script reads the YAML and validates the file dynamically.\n**Benefit**: You fix schema changes by editing a config file, NOT by rewriting code."
    },
    {
        "title": "Parallel Processing Basics",
        "content": "If processing takes 10 hours, use the `multiprocessing` or `concurrent.futures` modules to process multiple files or chunks simultaneously.\n**Warning**: Only parallelize \"IO-bound\" tasks (API calls) or CPU-heavy transformations. Be careful with database lock-contention!"
    },
    {
        "title": "Mastery: Multi-System Reconciliation",
        "content": "In modern cloud architecture, data moves through many hops:\n**Oracle (On-Prem) → S3 (Landing) → Snowflake (Warehouse)**.\n\n**The Multi-Point Validation Pattern:**\n1. **Hop 1**: Compare Oracle Row Count vs S3 File Line Count.\n2. **Hop 2**: Compare S3 Column Count vs Snowflake Stage Column Count.\n3. **Hop 3**: Compare Source Sum(Amount) vs Target Sum(Amount).\n\n**Strategy**: Create a single \"Reconciliation Report\" that aggregates these results into a readable table for stakeholders."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "advanced",
        "question": "What is 'Exponential Backoff' used for?\\n\\n**Options:**\\n1. Speeding up loops\\n2. Gradually increasing wait time during retries to reduce server load\\n3. Deleting old files\\n4. Encrypted storage",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Gradually increasing wait time during retries to reduce server load"
    },
    {
        "number": 2,
        "difficulty": "advanced",
        "question": "What is a 'Digital Fingerprint' of a file called?\\n\\n**Options:**\\n1. Index\\n2. Checksum/Hash\\n3. Binary Log\\n4. Metadata",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Checksum/Hash"
    },
    {
        "number": 3,
        "difficulty": "advanced",
        "question": "Why use 'Config-Driven' validation?\\n\\n**Options:**\\n1. To make code harder to read\\n2. To handle changes (Schema Drift) without editing code\\n3. To save disk space\\n4. To use more CPU",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - To handle changes (Schema Drift) without editing code"
    },
    {
        "number": 4,
        "difficulty": "advanced",
        "question": "What is Metadata?\\n\\n**Options:**\\n1. Secret data\\n2. Binary data\\n3. Data about the data (Lineage, Run IDs, etc.)\\n4. Deleted data",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Data about the data (Lineage, Run IDs, etc.)"
    },
    {
        "number": 5,
        "difficulty": "advanced",
        "question": "When is parallel processing harmful in ETL?\\n\\n**Options:**\\n1. When you have many CPUs\\n2. When multiple processes try to write to the same database table/row at once, causing locks\\n3. When the file is small\\n4. When using Python",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - When multiple processes try to write to the same database table/row at once, causing locks"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl7Data = etl7Data;
}
