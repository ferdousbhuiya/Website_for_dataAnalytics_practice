const pythonSetupData = {
    title: "Python Setup for Data Work",
    metadata: {
        track: 'core',
        category: 'Setup',
        icon: '🚀',
        description: "How to set up a Python environment for data science on your local machine (VS Code, venv) and in the cloud (Google Colab)."
    },
    lessons: [
        {
            number: 1,
            title: "Option A: Google Colab (The Easy Way)",
            content: `**Google Colaboratory (Colab)** is a free Jupyter Notebook in the cloud that requires no setup.

**How to start:**
1. Go to \`colab.research.google.com\`.
2. Click **New Notebook**.
3. In the first cell, install libraries you need: \`!pip install pandas matplotlib seaborn scikit-learn\`.
4. In the next cell, start coding: \`import pandas as pd\`.

**Pros:**
- Zero setup.
- Free GPU access for deep learning.
- Easy to share.

**Cons:**
- Not for production pipelines.
- Filesystem is temporary.
- Can be slow.

For learning and one-off analysis, Colab is the fastest way to start.`
        },
        {
            number: 2,
            title: "Option B: Local Setup with VS Code",
            content: `For real projects, you need a local setup. **Visual Studio Code (VS Code)** is the industry standard.

**One-time setup:**
1. **Install Python** from \`python.org\`. During install, check "Add Python to PATH".
2. **Install VS Code** from \`code.visualstudio.com\`.
3. In VS Code, install the **Python extension** from Microsoft.

That's it. You are now ready to create projects.`
        },
        {
            number: 3,
            title: "Step 1: Create a Virtual Environment (venv)",
            content: `**Always use a virtual environment.** It isolates project dependencies so \`project A\`'s libraries don't conflict with \`project B\`'s.

\`\`\`bash
# 1. Create a project folder
mkdir my-churn-project
cd my-churn-project

# 2. Create the virtual environment (named .venv)
python -m venv .venv

# 3. Activate it
# Windows
.venv\\Scripts\\activate
# Mac / Linux
source .venv/bin/activate

# Your shell prompt will now show (.venv) — you are active.
\`\`\`

**Why a venv is not optional:** without it, every \`pip install\` goes into your *global* Python, creating a tangled mess. A venv keeps each project clean and reproducible.`
        },
        {
            number: 4,
            title: "Step 2: Install Libraries & Create requirements.txt",
            content: `With the venv active, install your libraries.

\`\`\`bash
# 1. Install the libraries you need
pip install pandas scikit-learn matplotlib seaborn jupyter

# 2. Freeze your dependencies into a requirements.txt file
pip freeze > requirements.txt
\`\`\`

**The \`requirements.txt\` file** is a manifest of your project's exact dependencies and versions. Someone else can recreate your environment perfectly with one command.

\`\`\`bash
# To install from a requirements file:
pip install -r requirements.txt
\`\`\`

**Interview tip:** a GitHub repo without a \`requirements.txt\` is a red flag — it's not reproducible.`
        },
        {
            number: 5,
            title: "Step 3: Write & Run Your First Code in VS Code",
            content: `With the venv active, open your project in VS Code.

\`\`\`bash
# from your project folder
code .
\`\`\`

**To run Python code:**
1. Create a new file \`analysis.py\`.
2. VS Code will auto-detect the \`.venv\` and select it as the interpreter.
3. Write your code:
   \`\`\`python
   import pandas as pd
   print(f"pandas version: {pd.__version__}")
   \`\`\`
4. Run it: open the VS Code terminal (\`Ctrl+\` \`\`), and run \`python analysis.py\`.

**To use a Jupyter Notebook:**
1. Create \`analysis.ipynb\`.
2. VS Code's Python extension lets you run cells directly.
3. The first time you run a cell, it will prompt you to select the kernel — choose the one in your \`.venv\`.

You now have a full, production-ready local data science environment.`
        },
        {
            number: 6,
            title: "Full Setup Recap",
            content: `The full flow from zero to a working local project:

\`\`\`mermaid
flowchart TD
    A[Install Python + VS Code] --> B[Create project folder]
    B --> C[python -m venv .venv]
    C --> D[Activate venv]
    D --> E[pip install libraries]
    E --> F[pip freeze > requirements.txt]
    F --> G[code . to open VS Code]
    G --> H[Write .py or .ipynb, run with venv interpreter]
\`\`\`

This is the standard, reproducible workflow every data professional uses.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "Why should you always use a virtual environment?",
            answer: "To isolate project dependencies. This prevents library conflicts between projects and makes your work reproducible by others via a `requirements.txt` file."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "What is the command to create a virtual environment?",
            answer: "python -m venv .venv"
        },
        {
            number: 3,
            difficulty: "medium",
            question: "What is a requirements.txt file and how do you create one?",
            answer: "It is a file that lists all of a project's dependencies and their exact versions. You create it with `pip freeze > requirements.txt` after installing your libraries in an active virtual environment."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "How do you activate a virtual environment?",
            answer: "On Windows: `.venv\\Scripts\\activate`. On Mac/Linux: `source .venv/bin/activate`. Your shell prompt will change to show the active environment."
        },
        {
            number: 5,
            difficulty: "easy",
            question: "What is the advantage of Google Colab?",
            answer: "Zero setup, free GPU access, and easy sharing. It is ideal for learning, one-off analyses, and deep learning experiments without configuring a local environment."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.pythonSetupData = pythonSetupData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pythonSetupData;
}