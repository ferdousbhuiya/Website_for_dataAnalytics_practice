// ETL3 topic data
const etl3Data = {
        title: "ETL 3: Data Structures",
        lessons: [
    {
        "title": "Data Types in ETL",
        "content": "In ETL, understanding types is the difference between a successful load and a data quality nightmare.\n\n- **int**: Row counts, IDs.\n- **float**: Currency, tax rates (Use `abs(a-b) < tolerance` for comparison).\n- **str**: Column headers, metadata (Strip whitespace before comparing!).\n- **bool**: Validation flags (`is_valid`, `has_duplicates`)."
    },
    {
        "title": "Safe Type Casting",
        "content": "Files store everything as text. You must convert strings to numbers before calculating.\n**The \"Anti-Pattern\":** Directly calling `int(value)`. If the value is \"N/A\", the script crashes.\n**The \"Pro Pattern\":**\n```python\ndef safe_int(val):\n    try:\n        return int(val)\n    except:\n        return 0\n```"
    },
    {
        "title": "Membership & Validation Logic",
        "content": "Use Python's `in` operator for fast lookup and column validation.\n```python\nheader = [\"id\", \"amount\", \"date\"]\nif \"tax\" not in header:\n    print(\"Warning: Tax column missing, applying default Rule X\")\n```\nLogical operators (`and`, `or`, `not`) allow you to combine complex business rules:\n```python\nif country == \"US\" and amount > 5000:\n    flag_for_audit = True\n```"
    },
    {
        "title": "Iteration Patterns (Loops)",
        "content": "ETL is about iterating over rows.\n- **For Loop**: Use when you have a fixed list of rows.\n- **While Loop**: Use for paginated APIs (fetch until no more pages).\n\n**Pro Tip**: Always use `enumerate(rows)` to track the exact line number of a failure for faster debugging."
    },
    {
        "title": "Case Study: The \"Magic Number\" Trap",
        "content": "**Bad Code**: `if amount > 1000: flag()`.\n**Professional Code**:\n```python\nTHRESHOLD = 1000\nif amount > THRESHOLD:\n    flag()\n```\nStoring constants and using dictionaries for rules (`tax_rules = {\"US\": 0.07, \"CA\": 0.05}`) makes your code maintainable."
    },
    {
        "title": "Mastery: Control Flow Truth Tables",
        "content": "ETL testers use \"Truth Tables\" to verify complex business logic.\n**The Scenario**: If (Status = 'Active') AND (Balance > 0 OR Has_Premium = True).\n\n| Status | Balance | Premium | Expected Result |\n|--------|---------|---------|-----------------|\n| Active | 100 | False | PASS |\n| Active | 0 | True | PASS |\n| Inactive| 500 | True | FAIL |\n| Active | 0 | False | FAIL |\n\n**Pro Tip**: Encode these tables into a dictionary or a list of tuples to test thousands of variations in a single loop."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "beginner",
        "question": "How should you compare two float amounts for equality?\\n\\n**Options:**\\n1. a == b\\n2. abs(a - b) < 0.01\\n3. round(a) == round(b)\\n4. a is b",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - abs(a - b) < 0.01"
    },
    {
        "number": 2,
        "difficulty": "beginner",
        "question": "What is the result of '100' in ['100', '200']?\\n\\n**Options:**\\n1. True\\n2. False\\n3. Error\\n4. None",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 1** - True"
    },
    {
        "number": 3,
        "difficulty": "beginner",
        "question": "Why is 'safe casting' important?\\n\\n**Options:**\\n1. To make code run faster\\n2. To prevent script crashes on bad data\\n3. To encrypt data\\n4. To save memory",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - To prevent script crashes on bad data"
    },
    {
        "number": 4,
        "difficulty": "beginner",
        "question": "Which loop is best for a paginated API?\\n\\n**Options:**\\n1. for\\n2. while\\n3. if\\n4. until",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - while"
    },
    {
        "number": 5,
        "difficulty": "beginner",
        "question": "What is an 'Anti-Pattern'?\\n\\n**Options:**\\n1. A new feature\\n2. A common but ineffective coding habit\\n3. A design pattern\\n4. A testing tool",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - A common but ineffective coding habit"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl3Data = etl3Data;
}
