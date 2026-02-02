
module.exports = {
    sql: [
        {
            number: 1,
            title: "Introduction to SQL and Databases",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p><strong>What is it?</strong> SQL (Structured Query Language) is the standard language for speaking to relational databases. Think of it as the language used to ask questions to a library of data.</p>
        <p><strong>Why it matters:</strong> It is the #1 skill for data analysts. You cannot effectively analyze large datasets in Excel; you need SQL to extract, filter, and aggregate millions of rows.</p>
        
        <h4>2. Key Concepts</h4>
        <ul>
            <li><strong>Relational Database:</strong> Data organized in tables (rows and columns) that relate to each other.</li>
            <li><strong>Primary Key:</strong> A unique ID for every row (e.g., <code>customer_id</code>). It cannot be NULL or duplicated.</li>
            <li><strong>Foreign Key:</strong> A field that links to the Primary Key of another table, creating a relationship.</li>
        </ul>

        <h4>3. Real-World Business Scenario</h4>
        <p><strong>Scenario:</strong> You work for an e-commerce company. You need to pull a list of all customers who signed up today to send them a welcome email.</p>
        
        <div class="example-box">
            <strong>Pro Tip:</strong><br>
            SQL is not case-sensitive (<code>SELECT</code> is the same as <code>select</code>), but it is a best practice to write keywords in UPPERCASE for readability.
        </div>
      `
        },
        {
            number: 2,
            title: "SELECT and FROM",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>The most fundamental SQL command. <code>SELECT</code> chooses <em>which columns</em> you want to see, and <code>FROM</code> chooses <em>which table</em> the data lives in.</p>
        
        <h4>2. Syntax</h4>
        <pre><code>SELECT column1, column2 
FROM table_name;</code></pre>
        
        <h4>3. Step-by-Step Example</h4>
        <p>To view all columns, use the asterisk <code>*</code>:</p>
        <pre><code>SELECT * 
FROM employees;</code></pre>
        
        <h4>4. Business Scenario</h4>
        <p><strong>Task:</strong> Your manager wants a list of all product names and their prices to review pricing strategy.</p>
        <pre><code>SELECT product_name, price 
FROM products;</code></pre>

        <div class="example-box">
            <strong>⚠️ Performance Warning:</strong><br>
            Avoid using <code>SELECT *</code> in production on large tables. It pulls every single column, which slows down the query and wastes resources. Always specify the columns you need.
        </div>
      `
        },
        {
            number: 3,
            title: "Filtering with WHERE",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>You rarely want <em>all</em> the data. <code>WHERE</code> is your filter. It limits the rows returned to only those that meet specific measuring criteria.</p>
        
        <h4>2. Syntax</h4>
        <pre><code>SELECT column_name
FROM table_name
WHERE condition;</code></pre>
        
        <h4>3. Common Operators</h4>
        <ul>
            <li><code>=</code> : Exact match</li>
            <li><code><></code> or <code>!=</code> : Not equal</li>
            <li><code>></code>, <code><</code> : Greater than, Less than</li>
            <li><code>BETWEEN</code> : Within a range</li>
            <li><code>IN</code> : Matches a list of values</li>
            <li><code>LIKE</code> : Pattern matching (e.g., names starting with 'A')</li>
        </ul>

        <h4>4. Business Scenario</h4>
        <p><strong>Task:</strong> Find all orders where the total amount was greater than $100.</p>
        <pre><code>SELECT order_id, customer_id, total_amount
FROM orders
WHERE total_amount > 100;</code></pre>
      `
        },
        {
            number: 4,
            title: "Sorting with ORDER BY",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Data in a database is not stored in any specific order. <code>ORDER BY</code> sorts your results so they make sense.</p>
        
        <h4>2. Syntax</h4>
        <pre><code>SELECT column_name
FROM table_name
ORDER BY column_name [ASC|DESC];</code></pre>
        <ul>
            <li><code>ASC</code>: Ascending (A-Z, 0-9) - Default</li>
            <li><code>DESC</code>: Descending (Z-A, 9-0)</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Task:</strong> Show the top 10 most expensive products.</p>
        <pre><code>SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 10;</code></pre>
      `
        },
        {
            number: 5,
            title: "Aggregations (COUNT, SUM, AVG)",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Aggregations take many rows and condense them into a single number. This is the heart of analytics.</p>
        
        <h4>2. Key Functions</h4>
        <ul>
            <li><code>COUNT(*)</code>: Counts total rows.</li>
            <li><code>SUM(column)</code>: Adds up values.</li>
            <li><code>AVG(column)</code>: Calculates the mean.</li>
            <li><code>MIN(column)</code> / <code>MAX(column)</code>: Finds smallest/largest value.</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Task:</strong> Calculate total revenue for the year.</p>
        <pre><code>SELECT SUM(sale_amount) AS total_revenue
FROM sales
WHERE sale_date BETWEEN '2023-01-01' AND '2023-12-31';</code></pre>
        
        <div class="example-box">
             <strong>Note:</strong> Comparison with NULL values requires special handling. <code>COUNT(column_name)</code> ignores NULLs, while <code>COUNT(*)</code> includes them.
        </div>
      `
        },
        {
            number: 6,
            title: "Grouping with GROUP BY",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p><code>GROUP BY</code> splits your data into buckets and applies an aggregate function to each bucket. It answers "Per X" questions (e.g., Sales <em>per</em> region).</p>
        
        <h4>2. Syntax</h4>
        <pre><code>SELECT category, SUM(sales)
FROM data
GROUP BY category;</code></pre>
        
        <h4>3. The Rule of Thumb</h4>
        <p>If a column is in the <code>SELECT</code> statement but <strong>not</strong> inside an aggregate function (like SUM), it <strong>MUST</strong> be in the <code>GROUP BY</code> clause.</p>

        <h4>4. Business Scenario</h4>
        <p><strong>Task:</strong> How many users signed up <em>each month</em>?</p>
        <pre><code>SELECT month_name, COUNT(user_id)
FROM users
GROUP BY month_name;</code></pre>
      `
        },
        {
            number: 7,
            title: "Filtering Groups with HAVING",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p><code>WHERE</code> filters rows <em>before</em> grouping. <code>HAVING</code> filters groups <em>after</em> grouping.</p>
        
        <h4>2. Syntax</h4>
        <pre><code>SELECT category, SUM(sales)
FROM table
GROUP BY category
HAVING SUM(sales) > 1000;</code></pre>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Task:</strong> Find only the store locations that have processed more than 500 orders.</p>
        <pre><code>SELECT store_location, COUNT(order_id)
FROM orders
GROUP BY store_location
HAVING COUNT(order_id) > 500;</code></pre>
      `
        },
        {
            number: 8,
            title: "JOINS (Inner, Left, Right, Full)",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Data is often split across multiple tables (e.g., Customers in one, Orders in another). JOINs bring them back together.</p>
        
        <h4>2. Types of JOINS</h4>
        <ul>
            <li><strong>INNER JOIN:</strong> Returns rows when there is a match in BOTH tables. (The intersection).</li>
            <li><strong>LEFT JOIN:</strong> Returns all rows from the left table, and matching rows from the right. (Most common for keeping base data context).</li>
            <li><strong>RIGHT JOIN:</strong> Opposite of Left Join. Rarely used.</li>
            <li><strong>FULL OUTER JOIN:</strong> Returns all rows when there is a match in EITHER table.</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Task:</strong> List all orders and the name of the customer who made them.</p>
        <pre><code>SELECT orders.order_id, customers.name
FROM orders
INNER JOIN customers 
  ON orders.customer_id = customers.id;</code></pre>
      `
        },
        {
            number: 9,
            title: "Subqueries",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>A query nested inside another query. It allows you to answer multi-step questions in a single step.</p>
        
        <h4>2. Use Cases</h4>
        <ul>
            <li>Filtering by a dynamic list (e.g., Users who bought 'X').</li>
            <li>Calculating a scalar value to compare against (e.g., Sales > Average Sales).</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Task:</strong> Find products that cost more than the average product price.</p>
        <pre><code>SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);</code></pre>
      `
        },
        {
            number: 10,
            title: "Common Table Expressions (CTEs)",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>CTEs (using <code>WITH</code>) are like temporary tables that exist just for your query. They make complex code readable.</p>
        
        <h4>2. Syntax</h4>
        <pre><code>WITH sales_2023 AS (
    SELECT * FROM sales WHERE year = 2023
)
SELECT * FROM sales_2023;</code></pre>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Task:</strong> Calculate the average order value per customer, then find the average of <em>that</em>.</p>
        <pre><code>WITH customer_totals AS (
    SELECT customer_id, SUM(amount) as total_spent
    FROM orders
    GROUP BY customer_id
)
SELECT AVG(total_spent) 
FROM customer_totals;</code></pre>
        <div class="example-box">
            <strong>Pro Tip:</strong><br>
            Always prefer CTEs over nested subqueries for readability and debugging.
        </div>
      `
        },
        {
            number: 11,
            title: "String and Date Functions",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Raw data is messy. You need functions to clean text and manipulate dates.</p>
        
        <h4>2. Essential Functions</h4>
        <ul>
            <li><code>UPPER(str)</code> / <code>LOWER(str)</code>: Normalize casing.</li>
            <li><code>CONCAT(a, b)</code>: Combine strings.</li>
            <li><code>TRIM(str)</code>: Remove whitespace.</li>
            <li><code>DATE_TRUNC('month', date)</code>: Round date to start of month (PostgreSQL).</li>
            <li><code>DATEDIFF(date1, date2)</code>: Days between two dates.</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Task:</strong> Calculate the time (in days) between an order being placed and shipped.</p>
        <pre><code>SELECT order_id, 
       DATEDIFF(day, order_date, ship_date) as processing_time
FROM orders;</code></pre>
      `
        },
        {
            number: 12,
            title: "Window Functions",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Window functions perform calculations across a set of table rows that are somehow related to the current row. Unlike <code>GROUP BY</code>, they don't collapse rows.</p>
        
        <h4>2. Key Functions</h4>
        <ul>
            <li><code>RANK()</code>: Assigns a rank (1, 2, 2, 4...).</li>
            <li><code>DENSE_RANK()</code>: Assigns rank without gaps (1, 2, 2, 3...).</li>
            <li><code>ROW_NUMBER()</code>: Unique row ID (1, 2, 3, 4...).</li>
            <li><code>LEAD()</code> / <code>LAG()</code>: Access next/previous row values.</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Task:</strong> Find the top 3 highest salaries <em>per department</em>.</p>
        <pre><code>SELECT * FROM (
    SELECT name, department, salary,
           RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rnk
    FROM employees
) t
WHERE rnk <= 3;</code></pre>
      `
        }
    ],
    statistics: [
        {
            number: 1,
            title: "Descriptive Statistics",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Descriptive statistics simplify large amounts of data into summary values. They describe "what happened."</p>
        
        <h4>2. The Big Three</h4>
        <ul>
            <li><strong>Mean (Average):</strong> Sum / Count. Sensitive to outliers (e.g., billionaire walks into a bar).</li>
            <li><strong>Median:</strong> The middle value. Robust against outliers. <em>Use this for salary or home price data.</em></li>
            <li><strong>Mode:</strong> The most frequent value. Good for categorical data.</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Analysis:</strong> You are analyzing website session durations.</p>
        <ul>
            <li><strong>Mean:</strong> 5 minutes (skewed by one user who left tab open for 4 hours).</li>
            <li><strong>Median:</strong> 45 seconds (most users stay less than a minute).</li>
        </ul>
        <p><strong>Conclusion:</strong> The Median is the better metric here for "typical" user behavior.</p>
      `
        },
        {
            number: 2,
            title: "Measures of Spread",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Central tendency (mean/median) tells you the center. Measures of spread tell you how "noisy" or inconsistent the data is.</p>
        
        <h4>2. Key Metrics</h4>
        <ul>
            <li><strong>Range:</strong> Max - Min. Simple but rough.</li>
            <li><strong>Standard Deviation (SD):</strong> The average distance of data points from the mean. Low SD = consistent. High SD = volatile.</li>
            <li><strong>Variance:</strong> SD squared. Used in calculations.</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Comparison:</strong> Two stock portfolios both return 10% average annual return.</p>
        <ul>
            <li><strong>Portfolio A:</strong> SD = 2%. (Returns 8% to 12% - Stable).</li>
            <li><strong>Portfolio B:</strong> SD = 20%. (Returns -10% to 30% - Risky).</li>
        </ul>
      `
        },
        {
            number: 3,
            title: "Probability Basics",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Probability quantifies uncertainty. It ranges from 0 (impossible) to 1 (certain).</p>
        
        <h4>2. Key Rules</h4>
        <ul>
            <li><strong>P(A or B):</strong> Addition Rule. Probability of A <em>or</em> B happening.</li>
            <li><strong>P(A and B):</strong> Multiplication Rule. Probability of A <em>and</em> B happening (if independent).</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Funnel Analysis:</strong></p>
        <p>Probability a visitor clicks "Add to Cart" = 0.2 (20%).<br>
        Probability a "Cart" user clicks "Checkout" = 0.5 (50%).<br>
        Probability a visitor buys? <br>
        <code>0.2 * 0.5 = 0.1 (10%)</code>.
        </p>
      `
        },
        {
            number: 4,
            title: "Distributions (Normal, Binomial)",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>A distribution shows all possible values of data and how often they occur.</p>
        
        <h4>2. The Normal Distribution (Bell Curve)</h4>
        <p>Nature loves this curve. Heights, weights, test scores, errors often follow it.</p>
        <ul>
            <li>Symmetric around the mean.</li>
            <li><strong>68-95-99.7 Rule:</strong> 68% of data is within 1 SD, 95% within 2 SDs.</li>
        </ul>
        
        <h4>3. Business Scenario</h4>
        <p><strong>Quality Control:</strong> A machine fills cereal boxes to 500g with SD = 5g. <br>
        95% of boxes will weigh between 490g and 510g. Getting a 450g box is statistically nearly impossible, signaling a machine failure.</p>
      `
        },
        {
            number: 5,
            title: "Sampling and CLT",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>You can rarely measure an entire population (e.g., "All US Internet Users"). You take a sample.</p>
        
        <h4>2. Central Limit Theorem (CLT)</h4>
        <p>This is the magic of statistics. It states that if you take enough random samples, the <em>means of those samples</em> will form a Normal Distribution, even if the original data is not normal.</p>
        
        <h4>3. Business Implication</h4>
        <p>This allows us to use Normal Distribution math (z-scores, confidence intervals) on almost any metric (sales, defects, logins) as long as we have enough data points.</p>
      `
        },
        {
            number: 6,
            title: "Hypothesis Testing",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>The scientific method for data. Should we believe a change is real, or just random noise?</p>
        
        <h4>2. Steps</h4>
        <ol>
            <li><strong>Null Hypothesis (H0):</strong> "Nothing changed." (The default).</li>
            <li><strong>Alternative Hypothesis (H1):</strong> "Something changed." (What we hope for).</li>
            <li><strong>P-Value:</strong> The probability of seeing these results if H0 were true.</li>
        </ol>
        
        <h4>3. The Threshold (Alpha)</h4>
        <p>Usually 0.05. If p-value < 0.05, we say it's "Statistically Significant" and reject H0.</p>
      `
        },
        {
            number: 7,
            title: "Confidence Intervals",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>A point estimate (e.g., "Conversion rate is 5%") is rarely exactly right. A Confidence Interval (CI) gives a range.</p>
        
        <h4>2. Interpretation</h4>
        <p>"We are 95% confident that the true conversion rate lies between 4.8% and 5.2%."</p>
        
        <h4>3. Business Use</h4>
        <p><strong>Executive Reporting:</strong> Don't just say "We'll gain 10,000 users." Say "We project 10,000 users (+/- 500)." This manages expectations and risk.</p>
      `
        },
        {
            number: 8,
            title: "Correlation vs Causation",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p><strong>Correlation:</strong> Two variables move together.<br>
        <strong>Causation:</strong> One variable <em>causes</em> the other to move.</p>
        
        <h4>2. The Famous Trap</h4>
        <p>Ice cream sales and shark attacks are highly correlated. Why? <br>
        <strong>Confounding Variable:</strong> Summer. Heat causes both.</p>
        
        <h4>3. Correlation Coefficient (r)</h4>
        <ul>
            <li>+1: Perfect positive correlation</li>
            <li>0: No correlation</li>
            <li>-1: Perfect negative correlation</li>
        </ul>
      `
        },
        {
            number: 9,
            title: "Linear Regression",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>Modeling the relationship between a dependent variable (Target) and independent variables (Features) with a straight line.</p>
        
        <h4>2. Equation</h4>
        <p><code>y = mx + b</code> (or <code>y = β0 + β1x</code>)</p>
        <ul>
            <li><strong>y:</strong> Prediction (e.g., Sales)</li>
            <li><strong>x:</strong> Input (e.g., Ad Spend)</li>
            <li><strong>m:</strong> Slope (Coefficient) - How much y changes for 1 unit of x.</li>
        </ul>
        
        <h4>3. Business Use</h4>
        <p><strong>Forecasting:</strong> "For every additional $1,000 spent on Facebook Ads, sales increase by $4,000."</p>
      `
        },
        {
            number: 10,
            title: "A/B Testing",
            content: `
        <h4>1. Concept Deep Dive</h4>
        <p>The gold standard for proving causality in product changes.</p>
        
        <h4>2. Process</h4>
        <ul>
            <li><strong>Split:</strong> Randomly divide users into Control (A) and Variant (B).</li>
            <li><strong>Measure:</strong> Track metrics (e.g., Click-Through Rate) for both.</li>
            <li><strong>Test:</strong> Use a T-Test or Chi-Square test to compare results.</li>
        </ul>
        
        <h4>3. Real-World Tip</h4>
        <p>Ensure your sample size is large enough <em>before</em> starting. Peeking at results early (before hitting sample size) increases false positives.</p>
      `
        }
    ]
};
