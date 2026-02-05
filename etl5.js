// ETL5 topic data
const etl5Data = {
        title: "ETL 5: Advanced Automation",
        lessons: [
    {
        "title": "The Power of Helper Functions",
        "content": "Don't write one massive script. Break it into small, testable \"pure\" functions.\n**Examples of ETL Helpers:**\n- `validate_email(email)`: Returns True/False.\n- `clean_currency(val)`: Returns float.\n- `check_duplicates(id_list)`: Logs errors.\n\n**Pro Tip:** A function should do ONE thing well."
    },
    {
        "title": "Modular Pipeline Orchestration",
        "content": "Move your functions into separate files (modules).\n- `validators.py`: Schema and business rules.\n- `db_client.py`: Database connections.\n- `orchestrator.py`: The main \"glue\" that runs the steps in order.\n\nImport them using: `from src.utils import db_client`."
    },
    {
        "title": "Parameterization",
        "content": "Avoid hardcoding file names or thresholds inside functions. Pass them as arguments.\n```python\n# Bad\ndef validate():\n    if row['total'] > 100: ...\n\n# Professional\ndef validate(row, threshold):\n    if row['total'] > threshold: ...\n```"
    },
    {
        "title": "Error Propagation Patterns",
        "content": "How do you handle a failure in row 500 of 1 million?\n1. **Stop & Fail**: Raise exception, kill process (Audit critical).\n2. **Skip & Log**: Skip row, add to `rejected_data.csv`, continue (Standard).\n3. **Dead Letter Queue**: Store failed rows in a specific DB table for manual review."
    },
    {
        "title": "Best Practices: Dry (Don't Repeat Yourself)",
        "content": "If you find yourself copy-pasting code for row count checks in every script, create a `Utility Library`.\n**Refactoring Checklist:**\n- Can this logic be used in other projects?\n- Is the function name clear?\n- Are the inputs and outputs documented?"
    },
    {
        "title": "Mastery: Unit Testing ETL Helpers",
        "content": "Even small helper functions like `clean_currency()` need to be tested.\nUse the **PyTest** framework to ensure your helpers handle edge cases.\n\n```python\ndef test_clean_currency():\n    assert clean_currency(\"$1,000.50\") == 1000.50\n    assert clean_currency(\"\") == 0.0\n    assert clean_currency(\"N/A\") == 0.0\n```\n**Why?** If you fix a bug in your currency cleaner, you want to be 100% sure you didn't break it for other formats."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "intermediate",
        "question": "What is a 'pure' function?\\n\\n**Options:**\\n1. A function with no code\\n2. A function that always returns the same output for same input with no side effects\\n3. A function that talks to a database\\n4. A function with many parameters",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - A function that always returns the same output for same input with no side effects"
    },
    {
        "number": 2,
        "difficulty": "intermediate",
        "question": "Why separate validators from orchestration logic?\\n\\n**Options:**\\n1. To make the code longer\\n2. To improve reusability and testability\\n3. To hide errors\\n4. To save space",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - To improve reusability and testability"
    },
    {
        "number": 3,
        "difficulty": "intermediate",
        "question": "What is the 'Stop & Fail' pattern best for?\\n\\n**Options:**\\n1. Non-critical log files\\n2. Financial audits where data integrity is paramount\\n3. Social media data\\n4. Temporary folders",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Financial audits where data integrity is paramount"
    },
    {
        "number": 4,
        "difficulty": "intermediate",
        "question": "What does DRY stand for?\\n\\n**Options:**\\n1. Data Ready Yield\\n2. Don't Repeat Yourself\\n3. Do Repeat Yesterday\\n4. Data Robust Yield",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Don't Repeat Yourself"
    },
    {
        "number": 5,
        "difficulty": "intermediate",
        "question": "How should you handle row-level errors in a standard ETL process?\\n\\n**Options:**\\n1. Delete the whole source file\\n2. Ignore them\\n3. Skip and log to a rejected data file\\n4. Restart the computer",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Skip and log to a rejected data file"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl5Data = etl5Data;
}
