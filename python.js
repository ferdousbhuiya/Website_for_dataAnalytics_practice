// Python topic data
const pythonData = {
    title: "Python for Data Analysis",
    lessons: [
    {
        "number": 1,
        "title": "Python Basics",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Python is the #1 language for data science because it's readable and has huge libraries. It handles data that effectively crashes Excel.</p>\n        <h4>2. Basic Types</h4>\n        <ul>\n            <li><code>int</code>: Integer (5)</li>\n            <li><code>float</code>: Decimal (5.5)</li>\n            <li><code>str</code>: String (\"Hello\")</li>\n            <li><code>bool</code>: Boolean (True/False)</li>\n        </ul>\n        <h4>3. Business Scenario</h4>\n        <p><strong>Scripting:</strong> A simple script to calculate tax.</p>\n        <pre><code>revenue = 100000\ntax_rate = 0.2\ntax_owed = revenue * tax_rate\nprint(f\"Tax Owed: {tax_owed}\")</code></pre>\n    "
    },
    {
        "number": 2,
        "title": "Lists and Dictionaries",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p><strong>List:</strong> Ordered collection. <code>items = [\"Product A\", \"Product B\"]</code>. Use for sequences.</p>\n        <p><strong>Dictionary:</strong> Key-Value pairs. <code>user = {\"id\": 1, \"name\": \"Alice\"}</code>. Use for lookups (like a mini-database).</p>\n        <h4>2. Accessing Data</h4>\n        <pre><code># List (Index starts at 0)\nfirst_item = items[0] \n\n# Dictionary (By Key)\nuser_name = user[\"name\"]</code></pre>\n    "
    },
    {
        "number": 3,
        "title": "Control Flow",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Logic (if/else) and Repetition (loops). This allows you to automate decisions and tasks.</p>\n        <h4>2. Syntax</h4>\n        <pre><code>for order in orders:\n    if order > 100:\n        print(\"High Value\")\n    else:\n        print(\"Standard\")</code></pre>\n        <h4>3. Business Use</h4>\n        <p>Iterating through thousands of customer files to flag those that haven't been updated in 30 days.</p>\n    "
    },
    {
        "number": 4,
        "title": "Functions",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>DRY Principle: Don't Repeat Yourself. If you write code twice, make it a function.</p>\n        <h4>2. Syntax</h4>\n        <pre><code>def calculate_roi(profit, cost):\n    return (profit / cost) * 10</code></pre>\n    "
    },
    {
        "number": 5,
        "title": "NumPy Arrays",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Standard Python lists are slow for math. NumPy arrays are blazing fast C-optimized blocks of memory.</p>\n        <h4>2. Why use it?</h4>\n        <p>Vectorization: You can multiply two arrays without a loop.</p>\n        <pre><code>import numpy as np\n# Multiply 1 million numbers instantly\nrevenue = price_array * quantity_array</code></pre>\n    "
    },
    {
        "number": 6,
        "title": "Pandas Series & DataFrames",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p><strong>DataFrame:</strong> Excel inside Python. Rows and columns with labels.</p>\n        <p><strong>Series:</strong> A single column of a DataFrame.</p>\n        <h4>2. Creating a DataFrame</h4>\n        <pre><code>import pandas as pd\ndf = pd.DataFrame({\n    \"Product\": [\"A\", \"B\"],\n    \"Sales\": [100, 200]\n})</code></pre>\n    "
    },
    {
        "number": 7,
        "title": "Loading Data",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The first step of any analysis. Pandas can read CSV, Excel, SQL, JSON, Parquet, etc.</p>\n        <h4>2. Syntax</h4>\n        <pre><code>df = pd.read_csv(\"sales_data.csv\")\n# or\ndf = pd.read_excel(\"financials.xlsx\", sheet_name=\"Q1\")</code></pre>\n    "
    },
    {
        "number": 8,
        "title": "Data Inspection",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Never assume your data is clean. Inspect it first.</p>\n        <h4>2. Key Commands</h4>\n        <ul>\n            <li><code>df.head()</code>: First 5 rows.</li>\n            <li><code>df.info()</code>: Data types and null counts.</li>\n            <li><code>df.describe()</code>: Summary stats (mean, min, max).</li>\n            <li><code>df.shape</code>: (Rows, Columns).</li>\n        </ul>\n    "
    },
    {
        "number": 9,
        "title": "Filtering and Selecting",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Slice and dice your data. Similar to SQL SELECT/WHERE.</p>\n        <h4>2. Syntax</h4>\n        <pre><code># Select Value\nhigh_sales = df[df[\"Sales\"] > 1000]\n\n# Select Columns\nsubset = df[[\"Date\", \"Revenue\"]]</code></pre>\n    "
    },
    {
        "number": 10,
        "title": "Data Cleaning",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>80% of your job is cleaning. Handling missing values and wrong types.</p>\n        <h4>2. Techniques</h4>\n        <ul>\n            <li><code>df.dropna()</code>: Remove empty rows.</li>\n            <li><code>df.fillna(0)</code>: Replace empties with 0.</li>\n            <li><code>df.drop_duplicates()</code>: Remove dupes.</li>\n        </ul>\n    "
    },
    {
        "number": 11,
        "title": "Grouping and Aggregation",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The Pandas version of SQL GROUP BY.</p>\n        <h4>2. Syntax</h4>\n        <pre><code># Total Sales by Region\ndf.groupby(\"Region\")[\"Sales\"].sum()</code></pre>\n        <h4>3. Real World</h4>\n        <p>Calculating Average Order Value (AOV) per acquisition channel.</p>\n    "
    },
    {
        "number": 12,
        "title": "Merging and Joining",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Combining datasets. Pandas <code>merge</code> is like SQL Join.</p>\n        <h4>2. Syntax</h4>\n        <pre><code>merged = pd.merge(orders, customers, \n                  on=\"customer_id\", \n                  how=\"left\")</code></pre>\n    "
    },
    {
        "number": 13,
        "title": "Visualization with Matplotlib",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Visualizing data directly in Python.</p>\n        <h4>2. Syntax</h4>\n        <pre><code>import matplotlib.pyplot as plt\ndf[\"Sales\"].plot(kind=\"bar\")\nplt.show()</code></pre>\n    "
    },
    {
        "number": 14,
        "title": "Advanced Analysis",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Complex usages like Pivot Tables and Apply.</p>\n        <h4>2. Pivot Table Example</h4>\n        <pre><code>pivot = df.pivot_table(index=\"Date\", \n                       columns=\"Region\", \n                       values=\"Sales\")</code></pre>\n    "
    }
],
    questions: [
            {
                number: 1,
                difficulty: "medium",
                question: "Given a DataFrame with columns ['customer_id', 'order_date', 'amount'], write code to find the total spending per customer and identify the top 10 customers.",
                context: "Use pandas to group, aggregate, and sort the data.",
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>import pandas as pd

# Group by customer and sum amounts
customer_spending = df.groupby('customer_id')['amount'].sum()

# Sort in descending order and get top 10
top_10_customers = customer_spending.sort_values(ascending=False).head(10)

# Alternative: with more details
top_10_detailed = (df.groupby('customer_id')
                     .agg({
                         'amount': ['sum', 'count', 'mean'],
                         'order_date': ['min', 'max']
                     })
                     .sort_values(('amount', 'sum'), ascending=False)
                     .head(10))

print(top_10_customers)</code></pre>
                    
                    <h4>Explanation:</h4>
                    <ul>
                        <li><code>groupby('customer_id')</code> groups all orders by customer</li>
                        <li><code>['amount'].sum()</code> calculates total spending per customer</li>
                        <li><code>sort_values(ascending=False)</code> sorts from highest to lowest</li>
                        <li><code>head(10)</code> selects top 10 results</li>
                        <li>The alternative shows multiple aggregations at once</li>
                    </ul>
                    
                    <h4>Business Use:</h4>
                    <p>Identify VIP customers for targeted marketing campaigns or loyalty programs.</p>
                `
            },
            { number: 2, difficulty: "easy", question: "How do you read a CSV file into a pandas DataFrame?", context: "Include common parameters.", answer: `<h4>Solution:</h4><pre><code>import pandas as pd\ndf = pd.read_csv('data.csv')\n\n# With options:\ndf = pd.read_csv('data.csv', \n                 sep=',',           # delimiter\n                 header=0,          # row number for column names\n                 index_col=0,       # column to use as index\n                 parse_dates=['date'],  # parse date columns\n                 na_values=['NA', 'null'])  # additional NA values</code></pre>` },
            { number: 3, difficulty: "easy", question: "Filter a DataFrame to show only rows where 'sales' > 1000.", context: "Use boolean indexing.", answer: `<h4>Solution:</h4><pre><code>filtered_df = df[df['sales'] > 1000]\n\n# Multiple conditions:\nfiltered_df = df[(df['sales'] > 1000) & (df['region'] == 'West')]</code></pre>` },
            { number: 4, difficulty: "medium", question: "Calculate the moving average of a 'price' column with a 7-day window.", context: "Use pandas rolling function.", answer: `<h4>Solution:</h4><pre><code>df['price_ma7'] = df['price'].rolling(window=7).mean()\n\n# With min_periods to handle edge cases:\ndf['price_ma7'] = df['price'].rolling(window=7, min_periods=1).mean()</code></pre>` },
            { number: 5, difficulty: "easy", question: "How do you handle missing values in a DataFrame?", context: "Show multiple approaches.", answer: `<h4>Solutions:</h4><pre><code># Drop rows with any NaN:\ndf_clean = df.dropna()\n\n# Drop rows where specific column is NaN:\ndf_clean = df.dropna(subset=['column_name'])\n\n# Fill NaN with a value:\ndf_filled = df.fillna(0)\ndf_filled = df.fillna(df.mean())  # fill with column mean\n\n# Forward fill:\ndf_filled = df.fillna(method='ffill')</code></pre>` },
            { number: 6, difficulty: "medium", question: "Pivot a DataFrame to show total sales by region and product category.", context: "Use pivot_table.", answer: `<h4>Solution:</h4><pre><code>pivot = df.pivot_table(\n    values='sales',\n    index='region',\n    columns='category',\n    aggfunc='sum',\n    fill_value=0\n)\n\nprint(pivot)</code></pre>` },
            { number: 7, difficulty: "easy", question: "Select specific columns from a DataFrame.", context: "Multiple methods.", answer: `<h4>Solutions:</h4><pre><code># Single column (returns Series):\ncolumn = df['column_name']\n\n# Single column (returns DataFrame):\ncolumn_df = df[['column_name']]\n\n# Multiple columns:\nsubset = df[['col1', 'col2', 'col3']]</code></pre>` },
            { number: 8, difficulty: "medium", question: "Merge two DataFrames on a common 'customer_id' column.", context: "Show different join types.", answer: `<h4>Solution:</h4><pre><code># Inner join (default):\nmerged = pd.merge(df1, df2, on='customer_id')\n\n# Left join:\nmerged = pd.merge(df1, df2, on='customer_id', how='left')\n\n# Outer join:\nmerged = pd.merge(df1, df2, on='customer_id', how='outer')\n\n# On different column names:\nmerged = pd.merge(df1, df2, left_on='cust_id', right_on='customer_id')</code></pre>` },
            { number: 9, difficulty: "easy", question: "Sort a DataFrame by multiple columns.", context: "Ascending and descending.", answer: `<h4>Solution:</h4><pre><code># Sort by one column:\ndf_sorted = df.sort_values('sales', ascending=False)\n\n# Sort by multiple columns:\ndf_sorted = df.sort_values(['region', 'sales'], ascending=[True, False])</code></pre>` },
            { number: 10, difficulty: "hard", question: "Find duplicate rows based on specific columns and keep only the first occurrence.", context: "Use drop_duplicates.", answer: `<h4>Solution:</h4><pre><code># Drop duplicates based on all columns:\ndf_unique = df.drop_duplicates()\n\n# Based on specific columns:\ndf_unique = df.drop_duplicates(subset=['customer_id', 'order_date'], keep='first')\n\n# Keep last occurrence:\ndf_unique = df.drop_duplicates(subset=['customer_id'], keep='last')</code></pre>` },
            { number: 11, difficulty: "medium", question: "Create a new column based on conditions from other columns.", context: "Use np.where or apply.", answer: `<h4>Solutions:</h4><pre><code>import numpy as np\n\n# Simple condition:\ndf['category'] = np.where(df['sales'] > 1000, 'High', 'Low')\n\n# Multiple conditions:\ndf['category'] = np.select(\n    [df['sales'] > 2000, df['sales'] > 1000],\n    ['Very High', 'High'],\n    default='Low'\n)\n\n# Using apply:\ndf['category'] = df['sales'].apply(lambda x: 'High' if x > 1000 else 'Low')</code></pre>` },
            { number: 12, difficulty: "easy", question: "Get basic statistics for numeric columns in a DataFrame.", context: "Use describe().", answer: `<h4>Solution:</h4><pre><code># All numeric columns:\ndf.describe()\n\n# Include all columns:\ndf.describe(include='all')\n\n# Specific percentiles:\ndf.describe(percentiles=[.25, .5, .75, .9])</code></pre>` },
            { number: 13, difficulty: "medium", question: "Resample time series data to monthly frequency and calculate the sum.", context: "Data has a datetime index.", answer: `<h4>Solution:</h4><pre><code># Ensure datetime index:\ndf['date'] = pd.to_datetime(df['date'])\ndf = df.set_index('date')\n\n# Resample to monthly:\nmonthly = df.resample('M').sum()\n\n# Other frequencies:\ndaily = df.resample('D').mean()\nweekly = df.resample('W').sum()</code></pre>` },
            { number: 14, difficulty: "easy", question: "Rename columns in a DataFrame.", context: "Multiple methods.", answer: `<h4>Solutions:</h4><pre><code># Rename specific columns:\ndf_renamed = df.rename(columns={'old_name': 'new_name', 'old2': 'new2'})\n\n# Rename all columns:\ndf.columns = ['col1', 'col2', 'col3']\n\n# Make all lowercase:\ndf.columns = df.columns.str.lower()</code></pre>` },
            { number: 15, difficulty: "medium", question: "Calculate the correlation matrix for numeric columns.", context: "Identify relationships.", answer: `<h4>Solution:</h4><pre><code># Correlation matrix:\ncorr_matrix = df.corr()\n\n# Correlation with specific column:\ncorr_with_target = df.corr()['target_column'].sort_values(ascending=False)\n\n# Visualize with heatmap:\nimport seaborn as sns\nimport matplotlib.pyplot as plt\nsns.heatmap(corr_matrix, annot=True, cmap='coolwarm')\nplt.show()</code></pre>` },
            { number: 16, difficulty: "easy", question: "Filter rows using string methods on a text column.", context: "Find rows where 'product_name' contains 'Pro'.", answer: `<h4>Solution:</h4><pre><code># Contains:\nfiltered = df[df['product_name'].str.contains('Pro', case=False)]\n\n# Starts with:\nfiltered = df[df['product_name'].str.startswith('Pro')]\n\n# Exact match:\nfiltered = df[df['product_name'].str.lower() == 'product']</code></pre>` },
            { number: 17, difficulty: "hard", question: "Calculate the percentage change between consecutive rows for each group.", context: "Group by 'product_id', calculate pct_change on 'price'.", answer: `<h4>Solution:</h4><pre><code>df['price_change_pct'] = df.groupby('product_id')['price'].pct_change() * 100\n\n# With periods:\ndf['price_change_pct'] = df.groupby('product_id')['price'].pct_change(periods=1) * 100</code></pre>` },
            { number: 18, difficulty: "medium", question: "Convert a column to datetime format and extract year, month, day.", context: "Handle date parsing.", answer: `<h4>Solution:</h4><pre><code># Convert to datetime:\ndf['date'] = pd.to_datetime(df['date'])\n\n# Extract components:\ndf['year'] = df['date'].dt.year\ndf['month'] = df['date'].dt.month\ndf['day'] = df['date'].dt.day\ndf['day_of_week'] = df['date'].dt.day_name()\ndf['quarter'] = df['date'].dt.quarter</code></pre>` },
            { number: 19, difficulty: "easy", question: "Create a DataFrame from a dictionary.", context: "Show basic creation.", answer: `<h4>Solution:</h4><pre><code>data = {\n    'name': ['Alice', 'Bob', 'Charlie'],\n    'age': [25, 30, 35],\n    'city': ['NYC', 'LA', 'Chicago']\n}\ndf = pd.DataFrame(data)\n\n# With custom index:\ndf = pd.DataFrame(data, index=['a', 'b', 'c'])</code></pre>` },
            { number: 20, difficulty: "medium", question: "Find and replace values in a DataFrame.", context: "Replace specific values or patterns.", answer: `<h4>Solutions:</h4><pre><code># Replace specific value:\ndf['column'] = df['column'].replace('old_value', 'new_value')\n\n# Replace multiple values:\ndf['status'] = df['status'].replace({'active': 1, 'inactive': 0})\n\n# Replace using regex:\ndf['text'] = df['text'].str.replace(r'\\d+', 'NUMBER', regex=True)</code></pre>` },
            { number: 21, difficulty: "easy", question: "Get the shape and info of a DataFrame.", context: "Basic exploration.", answer: `<h4>Solution:</h4><pre><code># Shape (rows, columns):\nprint(df.shape)\n\n# Info (dtypes, non-null counts):\ndf.info()\n\n# Column names:\nprint(df.columns.tolist())\n\n# Data types:\nprint(df.dtypes)</code></pre>` },
            { number: 22, difficulty: "medium", question: "Apply a custom function to each row of a DataFrame.", context: "Calculate a complex metric.", answer: `<h4>Solution:</h4><pre><code># Define function:\ndef calculate_score(row):\n    return row['sales'] * 0.1 + row['profit'] * 0.9\n\n# Apply to each row:\ndf['score'] = df.apply(calculate_score, axis=1)\n\n# Lambda version:\ndf['score'] = df.apply(lambda row: row['sales'] * 0.1 + row['profit'] * 0.9, axis=1)</code></pre>` },
            { number: 23, difficulty: "hard", question: "Detect outliers using the IQR method and remove them.", context: "For 'price' column.", answer: `<h4>Solution:</h4><pre><code>Q1 = df['price'].quantile(0.25)\nQ3 = df['price'].quantile(0.75)\nIQR = Q3 - Q1\n\nlower_bound = Q1 - 1.5 * IQR\nupper_bound = Q3 + 1.5 * IQR\n\n# Filter outliers:\ndf_no_outliers = df[(df['price'] >= lower_bound) & (df['price'] <= upper_bound)]</code></pre>` },
            { number: 24, difficulty: "easy", question: "Concatenate two DataFrames vertically.", context: "Stack DataFrames.", answer: `<h4>Solution:</h4><pre><code># Vertical concatenation:\nresult = pd.concat([df1, df2], axis=0, ignore_index=True)\n\n# Horizontal concatenation:\nresult = pd.concat([df1, df2], axis=1)</code></pre>` },
            { number: 25, difficulty: "medium", question: "Create bins for a continuous variable and label them.", context: "Categorize 'age' into groups.", answer: `<h4>Solution:</h4><pre><code>bins = [0, 18, 35, 50, 100]\nlabels = ['Youth', 'Young Adult', 'Middle Age', 'Senior']\n\ndf['age_group'] = pd.cut(df['age'], bins=bins, labels=labels)\n\n# Equal-width bins:\ndf['age_group'] = pd.cut(df['age'], bins=4)</code></pre>` },
            { number: 26, difficulty: "easy", question: "Export a DataFrame to CSV and Excel.", context: "Save data.", answer: `<h4>Solution:</h4><pre><code># To CSV:\ndf.to_csv('output.csv', index=False)\n\n# To Excel:\ndf.to_excel('output.xlsx', sheet_name='Sheet1', index=False)\n\n# Multiple sheets:\nwith pd.ExcelWriter('output.xlsx') as writer:\n    df1.to_excel(writer, sheet_name='Sheet1')\n    df2.to_excel(writer, sheet_name='Sheet2')</code></pre>` },
            { number: 27, difficulty: "medium", question: "Calculate cumulative sum for each group.", context: "Group by 'customer_id', cumsum on 'amount'.", answer: `<h4>Solution:</h4><pre><code>df['cumulative_spending'] = df.groupby('customer_id')['amount'].cumsum()\n\n# Cumulative count:\ndf['order_number'] = df.groupby('customer_id').cumcount() + 1</code></pre>` },
            { number: 28, difficulty: "hard", question: "Unpivot a DataFrame from wide to long format.", context: "Use melt().", answer: `<h4>Solution:</h4><pre><code># Wide format: id, Jan, Feb, Mar\n# Long format: id, month, value\n\ndf_long = pd.melt(df, \n                  id_vars=['id'], \n                  value_vars=['Jan', 'Feb', 'Mar'],\n                  var_name='month', \n                  value_name='sales')</code></pre>` },
            { number: 29, difficulty: "easy", question: "Get unique values and value counts from a column.", context: "Explore categorical data.", answer: `<h4>Solution:</h4><pre><code># Unique values:\nunique_vals = df['category'].unique()\n\n# Number of unique values:\nn_unique = df['category'].nunique()\n\n# Value counts:\ncounts = df['category'].value_counts()\n\n# With percentages:\ncounts_pct = df['category'].value_counts(normalize=True)</code></pre>` },
            { number: 30, difficulty: "medium", question: "Calculate the rank of values within each group.", context: "Rank 'sales' within each 'region'.", answer: `<h4>Solution:</h4><pre><code>df['sales_rank'] = df.groupby('region')['sales'].rank(ascending=False, method='dense')\n\n# Methods: 'average', 'min', 'max', 'first', 'dense'</code></pre>` },
            { number: 31, difficulty: "easy", question: "Reset and set index of a DataFrame.", context: "Index manipulation.", answer: `<h4>Solution:</h4><pre><code># Reset index:\ndf_reset = df.reset_index(drop=True)\n\n# Set index:\ndf_indexed = df.set_index('customer_id')\n\n# Multi-index:\ndf_multi = df.set_index(['region', 'product'])</code></pre>` },
            { number: 32, difficulty: "medium", question: "Calculate the difference between current and previous row values.", context: "Use diff() for time series.", answer: `<h4>Solution:</h4><pre><code># Difference from previous row:\ndf['price_diff'] = df['price'].diff()\n\n# Difference from previous row within groups:\ndf['price_diff'] = df.groupby('product_id')['price'].diff()\n\n# Difference with specific periods:\ndf['price_diff_7d'] = df['price'].diff(periods=7)</code></pre>` },
            { number: 33, difficulty: "hard", question: "Perform a complex aggregation with multiple functions on different columns.", context: "Group by 'region', apply different aggs.", answer: `<h4>Solution:</h4><pre><code>result = df.groupby('region').agg({\n    'sales': ['sum', 'mean', 'count'],\n    'profit': ['sum', 'mean'],\n    'customer_id': 'nunique',\n    'order_date': ['min', 'max']\n})\n\n# Flatten column names:\nresult.columns = ['_'.join(col).strip() for col in result.columns.values]\nresult = result.reset_index()</code></pre>` },
            { number: 34, difficulty: "easy", question: "Check for and count missing values.", context: "Data quality check.", answer: `<h4>Solution:</h4><pre><code># Count missing per column:\nmissing_count = df.isnull().sum()\n\n# Percentage missing:\nmissing_pct = (df.isnull().sum() / len(df)) * 100\n\n# Total missing:\ntotal_missing = df.isnull().sum().sum()\n\n# Rows with any missing:\nrows_with_missing = df[df.isnull().any(axis=1)]</code></pre>` },
            { number: 35, difficulty: "medium", question: "Sample rows from a DataFrame randomly.", context: "Create train/test split.", answer: `<h4>Solution:</h4><pre><code># Random sample of 100 rows:\nsample = df.sample(n=100, random_state=42)\n\n# Sample 20% of data:\nsample = df.sample(frac=0.2, random_state=42)\n\n# Sample with replacement:\nsample = df.sample(n=1000, replace=True, random_state=42)</code></pre>` },
            { number: 36, difficulty: "easy", question: "Convert DataFrame column types.", context: "Type casting.", answer: `<h4>Solution:</h4><pre><code># Convert to numeric:\ndf['price'] = pd.to_numeric(df['price'], errors='coerce')\n\n# Convert to string:\ndf['id'] = df['id'].astype(str)\n\n# Convert to category:\ndf['category'] = df['category'].astype('category')\n\n# Convert to datetime:\ndf['date'] = pd.to_datetime(df['date'])</code></pre>` },
            { number: 37, difficulty: "medium", question: "Find the first and last occurrence of each group.", context: "Group by 'customer_id', get first/last order.", answer: `<h4>Solution:</h4><pre><code># First occurrence:\nfirst_orders = df.groupby('customer_id').first()\n\n# Last occurrence:\nlast_orders = df.groupby('customer_id').last()\n\n# Specific column:\nfirst_order_dates = df.groupby('customer_id')['order_date'].first()</code></pre>` },
            { number: 38, difficulty: "hard", question: "Calculate rolling statistics with custom window based on time.", context: "7-day rolling average for time series.", answer: `<h4>Solution:</h4><pre><code># Ensure datetime index:\ndf = df.set_index('date')\n\n# Rolling with time window:\ndf['rolling_7d_avg'] = df['sales'].rolling('7D').mean()\n\n# Rolling with min_periods:\ndf['rolling_7d_avg'] = df['sales'].rolling('7D', min_periods=1).mean()</code></pre>` },
            { number: 39, difficulty: "medium", question: "Create a cross-tabulation (contingency table).", context: "Analyze relationship between two categorical variables.", answer: `<h4>Solution:</h4><pre><code># Basic crosstab:\ncrosstab = pd.crosstab(df['region'], df['product_category'])\n\n# With margins (totals):\ncrosstab = pd.crosstab(df['region'], df['product_category'], margins=True)\n\n# With values:\ncrosstab = pd.crosstab(df['region'], df['product_category'], \n                       values=df['sales'], aggfunc='sum')</code></pre>` },
            { number: 40, difficulty: "hard", question: "Implement a custom aggregation function for groupby.", context: "Calculate range (max - min) for each group.", answer: `<h4>Solution:</h4><pre><code># Define custom function:\ndef price_range(x):\n    return x.max() - x.min()\n\n# Apply to groups:\nresult = df.groupby('product_category')['price'].agg(price_range)\n\n# Multiple custom functions:\nresult = df.groupby('product_category')['price'].agg([\n    ('range', price_range),\n    ('mean', 'mean'),\n    ('std', 'std')\n])</code></pre>` }
        ]
};

if (typeof window !== "undefined") {
    window.pythonData = pythonData;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = pythonData;
}
