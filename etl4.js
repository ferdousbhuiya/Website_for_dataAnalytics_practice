// ETL4 topic data
const etl4Data = {
        title: "ETL 4: Files & Functions",
        lessons: [
    {
        "title": "Streaming vs Loading Files",
        "content": "Memory management is key for large files.\n- **Loading**: `f.read()` loads everything into memory. (Bad for 1GB files!)\n- **Streaming**: `for line in f:` processes one row at a time. (Standard for ETL).\n\n**Pro Tip:** Use the `with` statement (`Context Manager`) to ensure files are closed automatically, even if an error occurs."
    },
    {
        "title": "Handling CSV Data",
        "content": "The `csv` module is your best friend.\n```python\nimport csv\nwith open('data.csv', 'r') as f:\n    reader = csv.DictReader(f) # Maps header to values automatically\n    for row in reader:\n        print(row['amount'])\n```\nAlways specify `encoding='utf-8'` and `newline=''` for consistency across Windows/Mac."
    },
    {
        "title": "JSON Processing for ETL",
        "content": "JSON is the universal format for modern APIs.\n- **Deserialize**: `json.loads(text)` -> Python Dictionary.\n- **Serialize**: `json.dumps(dict)` -> JSON String.\n- **Nested Data**: Handle deep nesting with safe checks: `data.get('user', {}).get('address', 'N/A')`."
    },
    {
        "title": "Directory Traversal & OS Module",
        "content": "ETL often involves \"watching\" a folder for new files.\n```python\nimport os\nfor filename in os.listdir('incoming/'):\n    if filename.endswith('.csv'):\n        process(filename)\n```\nUse `os.path.join()` to build paths that work on both Windows (`\\`) and Linux (`/`)."
    },
    {
        "title": "Log Management (The Audit Trail)",
        "content": "ETL without logging is not enterprise-grade.\n**Key Log Entries:**\n- Timestamp of start/end.\n- Source filename.\n- Success count vs Failure count.\n- Error messages for rejected rows.\nUse the `logging` module instead of `print()` for levels like INFO, WARNING, and ERROR."
    },
    {
        "title": "Mastery: Encoding & Line Endings",
        "content": "The #1 cause of \"corrupted\" ETL data is a mismatch in Encoding.\n- **UTF-8**: The modern standard (Global support).\n- **Latin-1 / CP1252**: Common in legacy Windows files.\n\n**The Diagnostic Script:**\n```python\nwith open('data.csv', 'rb') as f:\n    raw = f.read(100) # Read first 100 bytes\n    print(raw) # Look for \\\\x00 or \\\\xfe (Indicators of UTF-16)\n```\nAlways explicitly set `encoding='utf-8'` to prevent invisible characters from breaking your string comparisons."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "intermediate",
        "question": "Why is 'streaming' a file better than 'loading' it?\\n\\n**Options:**\\n1. It uses more memory\\n2. It allows processing massive files efficiently\\n3. It is slower\\n4. It deletes the file",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - It allows processing massive files efficiently"
    },
    {
        "number": 2,
        "difficulty": "intermediate",
        "question": "Which module is used to list files in a directory?\\n\\n**Options:**\\n1. sys\\n2. os\\n3. math\\n4. csv",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - os"
    },
    {
        "number": 3,
        "difficulty": "intermediate",
        "question": "What does json.loads() do?\\n\\n**Options:**\\n1. Turns a dictionary into a string\\n2. Turns a JSON string into a Python object\\n3. Deletes a JSON file\\n4. Updates a database",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Turns a JSON string into a Python object"
    },
    {
        "number": 4,
        "difficulty": "intermediate",
        "question": "How should you build file paths for cross-platform support?\\n\\n**Options:**\\n1. String concatenation ('data/' + name)\\n2. os.path.join()\\n3. Hardcoded paths\\n4. Manual entry",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - os.path.join()"
    },
    {
        "number": 5,
        "difficulty": "intermediate",
        "question": "What should be logged in an ETL process?\\n\\n**Options:**\\n1. Secret passwords\\n2. Every single row value\\n3. Start/end times and error summaries\\n4. Nothing",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Start/end times and error summaries"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl4Data = etl4Data;
}
