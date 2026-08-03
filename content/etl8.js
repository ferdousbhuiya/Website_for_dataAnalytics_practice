// ETL8 topic data
const etl8Data = {
        title: "ETL 8: Debugging",
        lessons: [
    {
        "title": "Interactive Debugging with pdb",
        "content": "Stop using `print()` for everything! Use the Python Debugger (`pdb`).\n```python\nimport pdb; pdb.set_trace() # Breakpoint\n```\n**Commands inside pdb:**\n- `n` (Next line)\n- `s` (Step into function)\n- `c` (Continue execution)\n- `p variable` (Print variable value)"
    },
    {
        "title": "The Traceability Pattern",
        "content": "Tracing means following a specific record as it moves through the pipeline.\n**Implementation:** Add a `trace_id` to your log messages.\n```python\nlogging.info(f\"[Record:{row_id}] Successfully transformed\")\n```\nThis allows you to search logs and find exactly where a specific failing row was dropped."
    },
    {
        "title": "Case Study 1: Invisible Whitespace",
        "content": "**Symptom**: \"Amount\" column appears empty but is not registered as Null.\n**Debug**: Use `repr()` to see hidden characters.\n```python\nprint(repr(col)) # Result: 'Amount ' (Note the trailing space)\n```\n**Fix**: Always `.strip()` your headers and string values during ingestion."
    },
    {
        "title": "Case Study 2: The Silent Row Loss",
        "content": "**Symptom**: Source has 100,000 rows, Target has 99,999.\n**Troubleshooting**:\n1. Check the last row of the source file (Is there a trailing newline?).\n2. Isolate the \"missing\" row using a Set subtraction between Source IDs and Target IDs.\n3. Check for specific filtering logic (Was the row dropped because of a hidden 'Invalid' flag?)."
    },
    {
        "title": "Case Study 3: Float Imprecision",
        "content": "**Symptom**: Financial total check fails by $0.0000001.\n**Root Cause**: Binary representation of decimal numbers.\n**Fix**: Use the `decimal` module for financial calculations, or use a \"tolerance\" comparison.\n```python\nif abs(actual - expected) < 0.001: # Pass\n```"
    },
    {
        "title": "Mastery: Post-Mortem Debugging",
        "content": "When a production pipeline fails at 3 AM, you need a **Post-Mortem Strategy**.\n\n**Steps:**\n1. **Isolate**: Capture the exact \"Poison Message\" (the falling row) and save it to a separate file.\n2. **Reproduce**: Run your script locally using ONLY that poison message.\n3. **Insulate**: Add a new unit test that covers this specific edge case so it never happens again.\n\n**Pro Tip:** Use \"Rubber Duck Debugging\"—explain your code line-by-line to a colleague (or a literal rubber duck). This often reveals the logic flaw before you even finish the explanation."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "advanced",
        "question": "What pdb command moves to the next line?\\n\\n**Options:**\\n1. run\\n2. n\\n3. m\\n4. next",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - n"
    },
    {
        "number": 2,
        "difficulty": "advanced",
        "question": "How can you find the exact row that failed among millions?\\n\\n**Options:**\\n1. Visual scan\\n2. Set subtraction between Source and Target IDs\\n3. Re-run the whole job\\n4. Guessing",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Set subtraction between Source and Target IDs"
    },
    {
        "number": 3,
        "difficulty": "advanced",
        "question": "What does repr() help with in debugging?\\n\\n**Options:**\\n1. Speeding up code\\n2. Revealing invisible characters like whitespace or tabs\\n3. Formatting output\\n4. Enciphering text",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Revealing invisible characters like whitespace or tabs"
    },
    {
        "number": 4,
        "difficulty": "advanced",
        "question": "Which module is best for precise financial currency math?\\n\\n**Options:**\\n1. math\\n2. float\\n3. decimal\\n4. random",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - decimal"
    },
    {
        "number": 5,
        "difficulty": "advanced",
        "question": "What is a 'Breakpoint'?\\n\\n**Options:**\\n1. A syntax error\\n2. A point where the program pauses for inspection\\n3. A corrupted file\\n4. A hardware failure",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - A point where the program pauses for inspection"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl8Data = etl8Data;
}
