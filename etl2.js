// ETL2 topic data
const etl2Data = {
        title: "ETL 2: Python Core",
        lessons: [
    {
        "title": "Python Installation & PATH",
        "content": "To build professional ETL tools, you need a stable environment.\n\n**Installation Rules:**\n- **Add to PATH**: Essential for running Python from any terminal.\n- **Verify**: Run `python --version` and `pip --version`.\n- **Consistency**: Use the same version across the entire team (e.g., Python 3.11+)."
    },
    {
        "title": "Virtual Environments (venv)",
        "content": "Never install packages globally. Project dependencies differ (e.g., ETL Project A might need Pandas 1.x, while Project B needs Pandas 2.x).\n\n**Workflow:**\n1. Create: `python -m venv venv`\n2. Activate (Windows): `.\\\\venv\\\\Scripts\\\\activate`\n3. Isolate: Your CLI prompt will change to `(venv)`."
    },
    {
        "title": "Requirements Management",
        "content": "A `requirements.txt` file is the heart of dependency management.\n\n**The Standard Cycle:**\n1. Install: `pip install pandas requests sqlalchemy`\n2. Freeze: `pip freeze > requirements.txt`\n3. Reinstall: `pip install -r requirements.txt`\n\n**Pro Tip:** Pin your versions (`pandas==2.0.3`) to prevent future breaking changes from crashing your pipeline."
    },
    {
        "title": "Enterprise Folder Structure",
        "content": "A clean structure ensures maintainability.\n```text\nETL_Project/\n├── config/         # Settings (YAML/JSON)\n├── data/           # incoming/, processed/, rejected/\n├── src/            # Business logic\n├── logs/           # Execution history\n├── tests/          # PyTest scripts\n└── requirements.txt\n```\n**Why subfolders?** Separating 'incoming' from 'processed' data prevents duplicate processing and data corruption."
    },
    {
        "title": "VS Code for ETL Developers",
        "content": "VS Code is the industry standard IDE for Python.\n**Essential Extensions:**\n- **Pylance**: For static type checking and IntelliSense.\n- **Python Debugger**: To step through row-level logic.\n- **Black Formatter**: To enforce consistent code style (PEP 8)."
    },
    {
        "title": "Mastery: The \"Rejected Data\" Strategy",
        "content": "How do you handle rows that fail validation? You don't just \"print\" an error. You implement a **Rejected Data Folder Strategy**.\n\n1. **Incoming**: Raw source files.\n2. **Processed**: Files that passed 100% validation.\n3. **Rejected**: Rows that failed business rules, saved into `rejected_{date}.csv` with a new column explaining WHY they failed.\n\nThis allows data analysts to fix the specific errors and re-submit them without reprocessing the entire dataset."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "beginner",
        "question": "What command creates a virtual environment?\\n\\n**Options:**\\n1. python create venv\\n2. python -m venv venv\\n3. pip install venv\\n4. make venv",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - python -m venv venv"
    },
    {
        "number": 2,
        "difficulty": "beginner",
        "question": "Why should you use a requirements.txt file?\\n\\n**Options:**\\n1. To store passwords\\n2. To list project dependencies for reproducibility\\n3. To write Python code\\n4. To store data",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - To list project dependencies for reproducibility"
    },
    {
        "number": 3,
        "difficulty": "beginner",
        "question": "Where should raw input files be stored in a project?\\n\\n**Options:**\\n1. src/\\n2. logs/\\n3. data/incoming/\\n4. venv/",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - data/incoming/"
    },
    {
        "number": 4,
        "difficulty": "beginner",
        "question": "What does pip freeze do?\\n\\n**Options:**\\n1. Stops the script\\n2. Displays installed packages and versions\\n3. Deletes all packages\\n4. Encrypts your code",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Displays installed packages and versions"
    },
    {
        "number": 5,
        "difficulty": "beginner",
        "question": "Which VS Code extension helps with type checking?\\n\\n**Options:**\\n1. GitLens\\n2. Pylance\\n3. Prettier\\n4. Jupyter",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Pylance"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl2Data = etl2Data;
}
