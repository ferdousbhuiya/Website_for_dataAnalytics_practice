// ETL10 topic data
const etl10Data = {
        title: "ETL 10: Databases & SQL",
        lessons: [
    {
        "title": "Connecting Python to SQL",
        "content": "Python uses \"Base Drivers\" and \"ORMs\".\n- **SQLite3**: Built-in, no setup, perfect for local testing.\n- **SQLAlchemy**: The enterprise standard. Connects to MySQL, Postgres, SQL Server, etc.\n- **Patterns**: Connect -> Create Cursor -> Execute SQL -> Fetch Results -> Close."
    },
    {
        "title": "The Source vs Target Recon",
        "content": "This is the #1 job of an ETL tester.\n**The SQL Pattern:**\n```sql\n-- Run on Source\nSELECT SUM(amount) FROM raw_data;\n-- Run on Target\nSELECT SUM(amount) FROM warehouse_table;\n```\nCompare the results in Python. If they differ even by a cent, fail the validation."
    },
    {
        "title": "SQL Data Quality Queries",
        "content": "Automate these checks using Python:\n- **Null Checks**: `SELECT COUNT(*) FROM table WHERE id IS NULL;`\n- **Duplicate Checks**: `SELECT id, COUNT(*) FROM table GROUP BY id HAVING COUNT(*) > 1;`\n- **Range Checks**: `SELECT * FROM table WHERE age < 0 OR age > 120;`"
    },
    {
        "title": "Working with Window Functions",
        "content": "Modern ETL validation uses \"Window Functions\" to compare rows against their colleagues.\n```sql\nSELECT id, amount,\n       ROW_NUMBER() OVER (PARTITION BY id ORDER BY timestamp) as rank\nFROM audit_table;\n```\nThis helps detect duplicate entries that appeared close together in time."
    },
    {
        "title": "Atomic Loads & Transactions",
        "content": "What if the database crashes halfway through a 1-million-row load? You end up with \"Dirty Data\".\n**The Solution**: **Database Transactions**.\nWrap your load logic in `conn.commit()` and `conn.rollback()`. \nEither *everything* loads, or *nothing* loads. This preserves data integrity."
    },
    {
        "title": "Mastery: SCD Type 1 vs Type 2 Logic",
        "content": "ETL testers must understand how \"History\" is stored in databases.\n- **SCD Type 1**: Overwrite old data. (Simple, but you lose history).\n- **SCD Type 2**: Add a new row with a version number or \"active_flag\". (Complex, preserves history).\n\n**Validation Pattern for Type 2:**\n1. Ensure the \"Old Row\" has its `end_date` updated to TODAY.\n2. Ensure the \"New Row\" has a `start_date` of TODAY and `is_active = True`.\n3. Verify that for any given ID, only ONE row has `is_active = True`."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "intermediate/advanced",
        "question": "In SQL, which clause identifies duplicates?\\n\\n**Options:**\\n1. WHERE\\n2. ORDER BY\\n3. GROUP BY ... HAVING COUNT(*) > 1\\n4. LIMIT",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - GROUP BY ... HAVING COUNT(*) > 1"
    },
    {
        "number": 2,
        "difficulty": "intermediate/advanced",
        "question": "What is an 'Atomic' database operation?\\n\\n**Options:**\\n1. A complex query\\n2. An operation that completes fully or not at all (no partial data)\\n3. A fast query\\n4. A query with many joins",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - An operation that completes fully or not at all (no partial data)"
    },
    {
        "number": 3,
        "difficulty": "intermediate/advanced",
        "question": "Which Python module is built-in for SQL?\\n\\n**Options:**\\n1. pandas\\n2. sqlite3\\n3. requests\\n4. math",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - sqlite3"
    },
    {
        "number": 4,
        "difficulty": "intermediate/advanced",
        "question": "Why compare 'SUM(amount)' between Source and Target?\\n\\n**Options:**\\n1. To check for data loss or hidden transformation errors in numeric fields\\n2. To sort the data\\n3. To delete rows\\n4. To count files",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 1** - To check for data loss or hidden transformation errors in numeric fields"
    },
    {
        "number": 5,
        "difficulty": "intermediate/advanced",
        "question": "What does conn.rollback() do?\\n\\n**Options:**\\n1. Saves changes\\n2. Deletes the table\\n3. Undoes all changes in the current transaction if an error occurs\\n4. Restarts the DB",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Undoes all changes in the current transaction if an error occurs"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl10Data = etl10Data;
}
