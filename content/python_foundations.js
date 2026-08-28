// Expanded beginner-first Python curriculum.
// Loaded after python.js so the core Python card becomes a complete learning path.
const pythonFoundationsData = {
  title: "Python Foundations for Data Analytics",
  metadata: {
    track: "core",
    category: "Python",
    icon: "🐍",
    description: "Beginner-friendly Python from first program through NumPy, pandas, files, error handling, and a mini data-analysis project."
  },
  lessons: [
    {
      number: 1,
      title: "Start Here: Your First Python Program",
      content: `<h4>Learning goal</h4><p>Understand what Python is, where analysts use it, and how to run your first program after completing the separate Python Setup course.</p><h4>Why analysts learn Python</h4><ul><li>Automate repetitive spreadsheet and reporting work.</li><li>Clean and analyze datasets that are awkward to handle manually.</li><li>Connect to files, databases, APIs, statistics, visualization and machine-learning tools.</li></ul><h4>Your first program</h4><pre><code>print("Hello, data!")
name = "Alex"
print(f"Welcome, {name}")</code></pre><div class="example-box"><strong>Try it yourself:</strong> Change the name, add a second variable called <code>goal</code>, and print one sentence containing both values.</div><h4>Checkpoint</h4><p>Before moving on, make sure you can create a <code>.py</code> file or notebook cell, run it, change a value, and understand the output.</p>`
    },
    {
      number: 2,
      title: "Variables, Data Types & Type Conversion",
      content: `<h4>Core idea</h4><p>A variable gives a name to a value. Python determines the value's type, and that type controls what operations make sense.</p><ul><li><code>str</code>: text such as <code>"Florida"</code></li><li><code>int</code>: whole numbers such as <code>42</code></li><li><code>float</code>: decimals such as <code>19.95</code></li><li><code>bool</code>: <code>True</code> or <code>False</code></li><li><code>None</code>: no value / missing value</li></ul><pre><code>student_name = "Alex"
score = 87
average = 82.5
passed = score >= 60

print(type(score))
print(float(score))
print(str(average))</code></pre><h4>Data-analytics connection</h4><p>CSV columns often arrive with the wrong type. A number stored as text cannot be summed correctly until it is converted.</p><div class="example-box"><strong>Practice:</strong> Create variables for product name, quantity, unit price and whether the product is in stock. Calculate total value as <code>quantity * unit_price</code>.</div>`
    },
    {
      number: 3,
      title: "Operators, Expressions & Useful Calculations",
      content: `<h4>Arithmetic</h4><p>Use <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code> and <code>**</code> to calculate values.</p><h4>Comparison and logic</h4><p>Use <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, plus <code>and</code>, <code>or</code> and <code>not</code>.</p><pre><code>revenue = 12500
cost = 8200
profit = revenue - cost
margin = profit / revenue * 100
healthy = profit > 0 and margin >= 20

print(f"Profit: ${profit:,.2f}")
print(f"Margin: {margin:.1f}%")
print(healthy)</code></pre><div class="example-box"><strong>Predict first:</strong> What values will <code>profit</code>, <code>margin</code> and <code>healthy</code> contain? Run the code only after making your prediction.</div>`
    },
    {
      number: 4,
      title: "Strings: Cleaning and Formatting Text",
      content: `<h4>Why strings matter</h4><p>Names, categories, addresses, product codes and survey responses are text. Real datasets frequently contain inconsistent capitalization and extra spaces.</p><pre><code>raw_name = "  alice johnson  "
clean_name = raw_name.strip().title()
print(clean_name)

email = "ALICE@EXAMPLE.COM"
print(email.lower())
print(email.endswith(".COM"))</code></pre><h4>Essential skills</h4><ul><li>Indexing and slicing: <code>text[0]</code>, <code>text[:5]</code></li><li>Cleaning: <code>.strip()</code>, <code>.lower()</code>, <code>.upper()</code>, <code>.title()</code></li><li>Searching/replacing: <code>.find()</code>, <code>.replace()</code></li><li>Formatting: f-strings such as <code>f"Sales: {sales:,.2f}"</code></li></ul><div class="example-box"><strong>Practice:</strong> Clean <code>"  south FLORIDA "</code> so the result is <code>"South Florida"</code>.</div>`
    },
    {
      number: 5,
      title: "Lists, Tuples, Sets & Dictionaries",
      content: `<h4>Choose the right container</h4><ul><li><strong>List:</strong> ordered and changeable. Good for a sequence of values.</li><li><strong>Tuple:</strong> ordered but fixed. Good for values that should not change.</li><li><strong>Set:</strong> unique values. Excellent for finding distinct categories.</li><li><strong>Dictionary:</strong> key-value pairs. Useful for representing a record.</li></ul><pre><code>sales = [120, 95, 140, 120]
regions = {"South", "North", "South"}
customer = {"id": 101, "name": "Maya", "active": True}

sales.append(160)
print(sum(sales))
print(regions)
print(customer["name"])</code></pre><div class="example-box"><strong>Practice:</strong> Create a dictionary for one product with name, category, price and stock. Then print only its name and price.</div>`
    },
    {
      number: 6,
      title: "Conditional Statements: Make Decisions",
      content: `<h4>Core idea</h4><p><code>if</code>, <code>elif</code> and <code>else</code> let a program choose what to do based on data.</p><pre><code>monthly_sales = 18500

if monthly_sales >= 20000:
    status = "Target exceeded"
elif monthly_sales >= 15000:
    status = "On track"
else:
    status = "Needs attention"

print(status)</code></pre><h4>Analytics use cases</h4><p>Classify customers, flag unusual transactions, label performance bands, check data-quality rules and create business categories.</p><div class="example-box"><strong>Practice:</strong> Write a rule that labels a score 90+ as Excellent, 70-89 as Good, 60-69 as Pass, and below 60 as Needs Improvement.</div>`
    },
    {
      number: 7,
      title: "Loops: Repeat Work Efficiently",
      content: `<h4>For loops</h4><p>Use a <code>for</code> loop when you want to process each item in a collection.</p><pre><code>sales = [120, 80, 240, 150]

total = 0
for amount in sales:
    total += amount
    if amount >= 200:
        print(f"High-value sale: {amount}")

print(f"Total: {total}")</code></pre><h4>While loops</h4><p>Use <code>while</code> when repetition should continue until a condition changes. Learn <code>range()</code>, <code>break</code>, <code>continue</code> and <code>enumerate()</code> as well.</p><div class="example-box"><strong>Practice:</strong> Loop through five temperatures and print only those above 80.</div>`
    },
    {
      number: 8,
      title: "Functions: Write Reusable Python",
      content: `<h4>Why functions matter</h4><p>Functions turn repeated logic into a named, testable unit. They make analytics code easier to understand and maintain.</p><pre><code>def calculate_margin(revenue, cost):
    if revenue == 0:
        return 0
    return (revenue - cost) / revenue * 100

margin = calculate_margin(10000, 7200)
print(f"Margin: {margin:.1f}%")</code></pre><h4>Know these terms</h4><ul><li>Function definition</li><li>Parameters and arguments</li><li><code>return</code> value</li><li>Local variables</li><li>Default parameters</li></ul><div class="example-box"><strong>Practice:</strong> Create <code>calculate_average(total, count)</code>. Protect it from division by zero.</div>`
    },
    {
      number: 9,
      title: "Errors, Debugging & try/except",
      content: `<h4>Errors are part of programming</h4><p>Learn to read the final line of a traceback first. Common beginner errors include <code>SyntaxError</code>, <code>NameError</code>, <code>TypeError</code>, <code>ValueError</code> and <code>KeyError</code>.</p><pre><code>raw_value = "125.50"

try:
    amount = float(raw_value)
    print(amount * 1.07)
except ValueError:
    print("The amount is not a valid number")</code></pre><h4>Debugging routine</h4><ol><li>Read the error message.</li><li>Find the reported line.</li><li>Inspect the values and their types.</li><li>Test the smallest failing piece.</li><li>Fix the cause, not just the symptom.</li></ol><div class="example-box"><strong>Practice:</strong> Change <code>raw_value</code> to <code>"unknown"</code> and confirm that your program handles it without crashing.</div>`
    },
    {
      number: 10,
      title: "Files & CSV Data",
      content: `<h4>From code to real data</h4><p>Analysts rarely type every value manually. Python can read and write text and CSV files.</p><pre><code>import csv

with open("sales.csv", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["product"], row["sales"])</code></pre><h4>Important habits</h4><ul><li>Use <code>with open(...)</code> so files close safely.</li><li>Know the difference between read, write and append modes.</li><li>Use clear relative paths and meaningful filenames.</li><li>Never overwrite important source data accidentally.</li></ul><div class="example-box"><strong>Checkpoint:</strong> Be able to explain what a CSV file is and how a row becomes a Python dictionary with <code>DictReader</code>.</div>`
    },
    {
      number: 11,
      title: "NumPy: Fast Numerical Analysis",
      content: `<h4>Why NumPy?</h4><p>NumPy provides efficient numerical arrays and vectorized calculations. It is also the numerical foundation underneath much of the Python data ecosystem.</p><pre><code>import numpy as np

sales = np.array([120, 95, 140, 210, 175])
print(sales.mean())
print(sales.max())
print(sales[sales > 150])

with_tax = sales * 1.07
print(with_tax)</code></pre><h4>Beginner essentials</h4><ul><li>Create arrays with <code>np.array()</code>.</li><li>Understand shape and dtype.</li><li>Index and slice arrays.</li><li>Use vectorized arithmetic.</li><li>Calculate <code>mean</code>, <code>sum</code>, <code>min</code>, <code>max</code> and <code>std</code>.</li></ul><div class="example-box"><strong>Practice:</strong> Create an array of five prices and calculate a 10% discount for every price without writing a loop.</div>`
    },
    {
      number: 12,
      title: "Pandas: Your First DataFrame Analysis",
      content: `<h4>Meet the DataFrame</h4><p>A pandas DataFrame is a labeled table designed for data analysis. This lesson is your bridge from Python fundamentals to the site's deeper pandas material.</p><pre><code>import pandas as pd

df = pd.read_csv("sales.csv")

print(df.head())
print(df.shape)
print(df.info())
print(df.describe())

high_sales = df[df["sales"] > 1000]
region_totals = df.groupby("region")["sales"].sum()
print(region_totals)</code></pre><h4>First workflow</h4><ol><li>Load the data.</li><li>Inspect rows, columns and data types.</li><li>Check missing values and duplicates.</li><li>Select and filter useful records.</li><li>Calculate summaries.</li><li>Group data to answer a business question.</li></ol><div class="example-box"><strong>Practice:</strong> Find the number of rows, average sales, highest sale and total sales by region in a sample CSV.</div>`
    },
    {
      number: 13,
      title: "Beginner Project: From CSV to Business Insight",
      content: `<h4>Your first complete analysis</h4><p>Use a small sales dataset with columns such as <code>date</code>, <code>region</code>, <code>product</code>, <code>quantity</code> and <code>revenue</code>.</p><h4>Project steps</h4><ol><li><strong>Load:</strong> read the CSV with pandas.</li><li><strong>Inspect:</strong> use <code>head()</code>, <code>shape</code>, <code>info()</code> and <code>describe()</code>.</li><li><strong>Clean:</strong> handle missing values, duplicates and incorrect types.</li><li><strong>Analyze:</strong> calculate total revenue, average transaction value and best-performing region/product.</li><li><strong>Filter:</strong> identify unusually high or low sales.</li><li><strong>Communicate:</strong> write three plain-English findings.</li></ol><pre><code>import pandas as pd

df = pd.read_csv("sales.csv")
df = df.drop_duplicates()
df["revenue"] = pd.to_numeric(df["revenue"], errors="coerce")

print("Total revenue:", df["revenue"].sum())
print("Average sale:", df["revenue"].mean())
print(df.groupby("region")["revenue"].sum().sort_values(ascending=False))</code></pre><h4>Portfolio challenge</h4><p>Add one chart, a short README explaining the question and dataset, and three business recommendations. Save the project in GitHub. You have now completed the beginner Python foundation and are ready for deeper pandas, visualization, SQL integration and analytics projects.</p>`
    }
  ],
  questions: [
    { number: 1, difficulty: "easy", question: "Which Python type stores True or False?", context: "Python data types", answer: "The `bool` type stores Boolean values: `True` and `False`." },
    { number: 2, difficulty: "easy", question: "What is the difference between = and == in Python?", context: "Variables and comparisons", answer: "`=` assigns a value to a variable. `==` compares two values and returns `True` or `False`." },
    { number: 3, difficulty: "easy", question: "When would you use a dictionary instead of a list?", context: "Collections", answer: "Use a dictionary when values should be accessed by meaningful keys, such as a customer record with `id`, `name`, and `status`." },
    { number: 4, difficulty: "easy", question: "Write a condition that checks whether sales are at least 1000.", context: "Conditional logic", answer: "`if sales >= 1000:`" },
    { number: 5, difficulty: "medium", question: "Why are functions useful in data-analysis code?", context: "Functions", answer: "Functions package repeated logic into reusable, testable units, reducing duplication and making analysis easier to maintain." },
    { number: 6, difficulty: "medium", question: "What should you inspect first when Python raises an exception?", context: "Debugging", answer: "Read the traceback, especially the final error line and the referenced line in your code. It identifies the error type and usually points to the immediate cause." },
    { number: 7, difficulty: "easy", question: "What does df.head() do in pandas?", context: "Pandas", answer: "It displays the first rows of a DataFrame, five by default, so you can quickly inspect the data." },
    { number: 8, difficulty: "medium", question: "How would you select pandas rows where sales are greater than 1000?", context: "Pandas filtering", answer: "`high_sales = df[df[\"sales\"] > 1000]`" },
    { number: 9, difficulty: "medium", question: "Why is NumPy vectorization useful?", context: "NumPy", answer: "It applies operations efficiently across entire arrays without manually writing Python loops, making numerical code shorter and typically faster." },
    { number: 10, difficulty: "medium", question: "Describe a sensible beginner data-analysis workflow.", context: "Mini project", answer: "Load the data, inspect its structure, clean missing/duplicate/incorrect values, analyze and group it to answer questions, visualize important results, and communicate clear findings." }
  ]
};

if (typeof window !== "undefined") {
  window.pythonData = pythonFoundationsData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = pythonFoundationsData;
}
