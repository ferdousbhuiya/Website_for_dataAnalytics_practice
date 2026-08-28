const pythonSetupData = {
  title: "Python Beginner Course",
  metadata: {
    track: "core",
    category: "Beginner",
    icon: "🚀",
    description: "A complete beginner path from setup and first code to Python fundamentals, files, NumPy, pandas, and a mini data-analysis project."
  },
  lessons: [
    { number: 1, title: "Setup & Your First Python Program", content: `**Goal:** get Python running and understand how code is executed.

### Choose your environment
**Fastest:** Google Colab. Open a notebook and start coding without installing anything.

**Local:** Install Python, VS Code, and the Microsoft Python extension. For projects, create a virtual environment:

\`\`\`bash
python -m venv .venv
# Windows
.venv\\Scripts\\activate
# Mac/Linux
source .venv/bin/activate
\`\`\`

Then try:
\`\`\`python
print("Hello, data!")
name = "Alex"
print(f"Welcome, {name}")
\`\`\`

**Try it yourself:** change the name, add a variable called \`goal\`, and print both in one sentence.

**Checkpoint:** You can run a Python file or notebook cell and explain what \`print()\` does.` },
    { number: 2, title: "Variables, Data Types & Conversion", content: `Variables give names to values. The most important beginner types are:
- \`str\`: text
- \`int\`: whole numbers
- \`float\`: decimals
- \`bool\`: True/False
- \`None\`: no value

\`\`\`python
student_name = "Alex"
score = 87
average = 82.5
passed = score >= 60

print(type(score))
print(float(score))
print(str(average))
\`\`\`

**Analytics connection:** numbers sometimes arrive from CSV files as text. Correct types are essential before calculating.

**Practice:** create product name, quantity, unit price and in-stock variables. Calculate inventory value.` },
    { number: 3, title: "Operators & Business Calculations", content: `Use arithmetic operators \`+ - * / // % **\`, comparison operators \`== != > < >= <=\`, and logical operators \`and\`, \`or\`, \`not\`.

\`\`\`python
revenue = 12500
cost = 8200
profit = revenue - cost
margin = profit / revenue * 100
healthy = profit > 0 and margin >= 20

print(f"Profit: ${profit:,.2f}")
print(f"Margin: {margin:.1f}%")
print(healthy)
\`\`\`

**Predict before running:** calculate the expected profit and decide whether \`healthy\` will be True or False.` },
    { number: 4, title: "Strings: Clean & Format Text", content: `Text cleaning is a daily analytics task. Learn indexing, slicing and common string methods.

\`\`\`python
raw_name = "  alice johnson  "
clean_name = raw_name.strip().title()
print(clean_name)

email = "ALICE@EXAMPLE.COM"
print(email.lower())
\`\`\`

Useful methods: \`.strip()\`, \`.lower()\`, \`.upper()\`, \`.title()\`, \`.replace()\`, \`.split()\`.

**Practice:** clean \`"  south FLORIDA "\` so it becomes \`"South Florida"\`.` },
    { number: 5, title: "Lists, Tuples, Sets & Dictionaries", content: `Choose a structure based on the job:
- **List:** ordered, changeable sequence.
- **Tuple:** ordered values that should stay fixed.
- **Set:** unique values.
- **Dictionary:** key-value record.

\`\`\`python
sales = [120, 95, 140, 120]
regions = {"South", "North", "South"}
customer = {"id": 101, "name": "Maya", "active": True}

sales.append(160)
print(sum(sales))
print(regions)
print(customer["name"])
\`\`\`

**Practice:** create a product dictionary containing name, category, price and stock. Print its name and price.` },
    { number: 6, title: "Conditional Statements", content: `Use \`if\`, \`elif\`, and \`else\` to turn business rules into code.

\`\`\`python
monthly_sales = 18500

if monthly_sales >= 20000:
    status = "Target exceeded"
elif monthly_sales >= 15000:
    status = "On track"
else:
    status = "Needs attention"

print(status)
\`\`\`

Analysts use conditions to classify customers, flag transactions, create performance bands and validate data.

**Practice:** label scores 90+ Excellent, 70-89 Good, 60-69 Pass, below 60 Needs Improvement.` },
    { number: 7, title: "Loops: Automate Repetition", content: `A \`for\` loop processes each item in a collection. A \`while\` loop continues until a condition changes.

\`\`\`python
sales = [120, 80, 240, 150]
total = 0

for amount in sales:
    total += amount
    if amount >= 200:
        print(f"High-value sale: {amount}")

print(f"Total: {total}")
\`\`\`

Also learn \`range()\`, \`enumerate()\`, \`break\` and \`continue\`.

**Practice:** loop through five temperatures and print only values above 80.` },
    { number: 8, title: "Functions: Reusable Python", content: `Functions package repeated logic into a reusable, testable unit.

\`\`\`python
def calculate_margin(revenue, cost):
    if revenue == 0:
        return 0
    return (revenue - cost) / revenue * 100

margin = calculate_margin(10000, 7200)
print(f"Margin: {margin:.1f}%")
\`\`\`

Know: function definition, parameters, arguments, \`return\`, local variables and default parameters.

**Practice:** create \`calculate_average(total, count)\` and protect it from division by zero.` },
    { number: 9, title: "Errors, Debugging & try/except", content: `Errors are normal. Learn to read the final line of a traceback first.

Common errors: \`SyntaxError\`, \`NameError\`, \`TypeError\`, \`ValueError\`, \`KeyError\`.

\`\`\`python
raw_value = "125.50"

try:
    amount = float(raw_value)
    print(amount * 1.07)
except ValueError:
    print("The amount is not a valid number")
\`\`\`

**Debugging routine:** read the message, locate the line, inspect values/types, isolate the smallest failing piece, then fix the cause.

**Practice:** change \`raw_value\` to \`"unknown"\` and confirm the program handles it.` },
    { number: 10, title: "Files & CSV Data", content: `Real analysis starts with external data. Python can read and write text and CSV files.

\`\`\`python
import csv

with open("sales.csv", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["product"], row["sales"])
\`\`\`

Use \`with open(...)\` so files close safely. Understand read, write and append modes, relative paths and why source files should not be overwritten accidentally.

**Checkpoint:** explain how one CSV row becomes a dictionary with \`DictReader\`.` },
    { number: 11, title: "NumPy: Numerical Analysis", content: `NumPy provides efficient arrays and vectorized calculations.

\`\`\`python
import numpy as np

sales = np.array([120, 95, 140, 210, 175])
print(sales.mean())
print(sales.max())
print(sales[sales > 150])

with_tax = sales * 1.07
print(with_tax)
\`\`\`

Learn arrays, shape, dtype, indexing, slicing, filtering, vectorized arithmetic, \`sum\`, \`mean\`, \`min\`, \`max\`, and \`std\`.

**Practice:** create five prices and apply a 10% discount to every price without a loop.` },
    { number: 12, title: "Pandas: Your First DataFrame", content: `A pandas DataFrame is a labeled table built for analysis.

\`\`\`python
import pandas as pd

df = pd.read_csv("sales.csv")
print(df.head())
print(df.shape)
print(df.info())
print(df.describe())

high_sales = df[df["sales"] > 1000]
region_totals = df.groupby("region")["sales"].sum()
print(region_totals)
\`\`\`

**Beginner workflow:** Load → Inspect → Check missing values/duplicates → Select/filter → Calculate summaries → Group to answer a question.

**Practice:** find row count, average sales, highest sale and total sales by region.` },
    { number: 13, title: "Mini Project: CSV to Business Insight", content: `Complete your beginner course with a small sales-analysis project.

### Dataset
Use columns such as \`date\`, \`region\`, \`product\`, \`quantity\`, and \`revenue\`.

### Project workflow
1. **Load** the CSV with pandas.
2. **Inspect** with \`head()\`, \`shape\`, \`info()\`, \`describe()\`.
3. **Clean** missing values, duplicates and incorrect types.
4. **Analyze** total revenue, average transaction and top region/product.
5. **Filter** unusually high or low sales.
6. **Communicate** three plain-English findings.

\`\`\`python
import pandas as pd

df = pd.read_csv("sales.csv")
df = df.drop_duplicates()
df["revenue"] = pd.to_numeric(df["revenue"], errors="coerce")

print("Total revenue:", df["revenue"].sum())
print("Average sale:", df["revenue"].mean())
print(df.groupby("region")["revenue"].sum().sort_values(ascending=False))
\`\`\`

### Portfolio challenge
Add one chart, a README describing the question and dataset, and three business recommendations. Save it to GitHub. After this, continue to the deeper **Python for Data Analysis** course.` }
  ],
  questions: [
    { number: 1, difficulty: "easy", question: "Which Python type stores True or False?", answer: "The `bool` type: `True` or `False`." },
    { number: 2, difficulty: "easy", question: "What is the difference between = and ==?", answer: "`=` assigns a value. `==` compares values and returns True or False." },
    { number: 3, difficulty: "easy", question: "When is a dictionary more useful than a list?", answer: "When values should be accessed by meaningful keys, such as a customer with id, name and status." },
    { number: 4, difficulty: "easy", question: "Write a condition that checks whether sales are at least 1000.", answer: "`if sales >= 1000:`" },
    { number: 5, difficulty: "medium", question: "Why are functions useful?", answer: "They package repeated logic into reusable, testable units and reduce duplicated code." },
    { number: 6, difficulty: "medium", question: "What should you inspect first after an exception?", answer: "Read the traceback, especially the final error line and the referenced line in your code." },
    { number: 7, difficulty: "easy", question: "What does df.head() do?", answer: "It displays the first rows of a pandas DataFrame, five by default." },
    { number: 8, difficulty: "medium", question: "Select pandas rows where sales are greater than 1000.", answer: "`high_sales = df[df[\"sales\"] > 1000]`" },
    { number: 9, difficulty: "medium", question: "Why is NumPy vectorization useful?", answer: "It applies operations efficiently across whole arrays without manually writing Python loops." },
    { number: 10, difficulty: "medium", question: "Describe a sensible beginner analysis workflow.", answer: "Load, inspect, clean, analyze, group/filter, visualize important results, and communicate findings." }
  ]
};

if (typeof window !== "undefined") window.pythonSetupData = pythonSetupData;
if (typeof module !== "undefined" && module.exports) module.exports = pythonSetupData;
