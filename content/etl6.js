// ETL6 topic data
const etl6Data = {
        title: "ETL 6: OOP for ETL",
        lessons: [
    {
        "title": "Why OOP for ETL?",
        "content": "In simple scripts, function-based code works. In enterprise frameworks, the logic becomes too complex to manage without **Classes**.\n\n**The Class-Based Validator:**\n- **Encapsulation**: Grouping data (rules) and behavior (validation logic) together.\n- **State Management**: Keeping track of error counts or totals inside an object.\n\n```python\nclass SchemaValidator:\n    def __init__(self, expected_cols):\n        self.expected = expected_cols\n        self.errors = []\n\n    def validate(self, actual_cols):\n        if self.expected != actual_cols:\n            self.errors.append(\"Schema Mismatch\")\n```"
    },
    {
        "title": "The \"BaseValidator\" (Inheritance)",
        "content": "Instead of writing 10 different validators from scratch, use **Inheritance**.\nCreate a `BaseValidator` with common methods like `log_error()` and `report()`.\nSpecific classes like `IntegerValidator` or `EmailValidator` inherit these behaviors.\n\n**Pro Tip:** This reduces code duplication and ensures a consistent reporting format across your entire framework."
    },
    {
        "title": "Composition over Inheritance",
        "content": "In ETL, you often need to combine \"File Reading\" and \"Row Validation\". \nInstead of making one massive class, use **Composition**.\nA `Pipeline` class *has* a `FileReader` and *has* multiple `Validators`.\n\n**Why?** This allows you to swap a `CSVReader` for a `JSONReader` without changing your validation logic."
    },
    {
        "title": "Stateful vs Stateless Validation",
        "content": "- **Stateless**: Validating one row in isolation (e.g., Is amount > 0?).\n- **Stateful**: Validating rows in relation to others (e.g., Is this ID a duplicate of one from row 5?).\n\nObjects excel at stateful validation by storing previous values in a `self.seen_ids` set."
    },
    {
        "title": "Design Pattern: Factory",
        "content": "**The Scenario**: You have 100 different source files, each with different rules.\n**The Solution**: Use a **Validator Factory** that returns the correct validator object based on the filename.\n```python\ndef get_validator(file_type):\n    if file_type == \"sales\": return SalesValidator()\n    if file_type == \"users\": return UserValidator()\n```"
    },
    {
        "title": "Mastery: The Stateful Recordset",
        "content": "Stateful validation requires comparing a row not just to a \"rule\", but to \"previous rows\".\n\n**Example: Duplicate Running Totals**\nIf you are loading financial transactions, you might want to ensure the \"Balance\" column always equals the previous row's balance plus the current row's amount.\n\n```python\nclass BalanceValidator:\n    def __init__(self, initial_balance):\n        self.current_running_total = initial_balance\n\n    def validate_row(self, row_amount, reported_balance):\n        self.current_running_total += row_amount\n        if self.current_running_total != reported_balance:\n            return False\n        return True\n```\nThis logic cannot be done in a single SQL WHERE clause efficiently; it requires a stateful Python object or a complex Window Function."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "advanced",
        "question": "What is 'Encapsulation' in OOP?\\n\\n**Options:**\\n1. Deleting code\\n2. Grouping data and methods into a single unit (Class)\\n3. Looping over rows\\n4. Connecting to a DB",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Grouping data and methods into a single unit (Class)"
    },
    {
        "number": 2,
        "difficulty": "advanced",
        "question": "Which OOP concept allows a sub-class to reuse code from a parent class?\\n\\n**Options:**\\n1. Abstraction\\n2. Inheritance\\n3. Polymorphism\\n4. Recursion",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Inheritance"
    },
    {
        "number": 3,
        "difficulty": "advanced",
        "question": "Why is Composition often better than deep Inheritance in ETL?\\n\\n**Options:**\\n1. It uses more memory\\n2. It makes the code more flexible and easier to swap components\\n3. It is required for SQL\\n4. It is only for UI",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - It makes the code more flexible and easier to swap components"
    },
    {
        "number": 4,
        "difficulty": "advanced",
        "question": "A stateful validator might use which data structure to track duplicates?\\n\\n**Options:**\\n1. float\\n2. set\\n3. bool\\n4. int",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - set"
    },
    {
        "number": 5,
        "difficulty": "advanced",
        "question": "When should you move from functions to classes in ETL?\\n\\n**Options:**\\n1. When you have 1 row\\n2. When the logic requires tracking state across thousands of rows and needs reusability\\n3. Never\\n4. When using Excel",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - When the logic requires tracking state across thousands of rows and needs reusability"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl6Data = etl6Data;
}
