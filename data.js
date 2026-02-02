// ===== Data Structure for All Topics =====

const topicsData = {
    sql: {
        title: "SQL Fundamentals",
        lessons: [
    {
        "number": 1,
        "title": "Introduction to SQL and Databases",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p><strong>What is it?</strong> SQL (Structured Query Language) is the standard language for speaking to relational databases. Think of it as the language used to ask questions to a library of data.</p>\n        <p><strong>Why it matters:</strong> It is the #1 skill for data analysts. You cannot effectively analyze large datasets in Excel; you need SQL to extract, filter, and aggregate millions of rows.</p>\n        \n        <h4>2. Key Concepts</h4>\n        <ul>\n            <li><strong>Relational Database:</strong> Data organized in tables (rows and columns) that relate to each other.</li>\n            <li><strong>Primary Key:</strong> A unique ID for every row (e.g., <code>customer_id</code>). It cannot be NULL or duplicated.</li>\n            <li><strong>Foreign Key:</strong> A field that links to the Primary Key of another table, creating a relationship.</li>\n        </ul>\n\n        <h4>3. Real-World Business Scenario</h4>\n        <p><strong>Scenario:</strong> You work for an e-commerce company. You need to pull a list of all customers who signed up today to send them a welcome email.</p>\n        \n        <div class=\"example-box\">\n            <strong>Pro Tip:</strong><br>\n            SQL is not case-sensitive (<code>SELECT</code> is the same as <code>select</code>), but it is a best practice to write keywords in UPPERCASE for readability.\n        </div>\n      "
    },
    {
        "number": 2,
        "title": "SELECT and FROM",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The most fundamental SQL command. <code>SELECT</code> chooses <em>which columns</em> you want to see, and <code>FROM</code> chooses <em>which table</em> the data lives in.</p>\n        \n        <h4>2. Syntax</h4>\n        <pre><code>SELECT column1, column2 \nFROM table_name;</code></pre>\n        \n        <h4>3. Step-by-Step Example</h4>\n        <p>To view all columns, use the asterisk <code>*</code>:</p>\n        <pre><code>SELECT * \nFROM employees;</code></pre>\n        \n        <h4>4. Business Scenario</h4>\n        <p><strong>Task:</strong> Your manager wants a list of all product names and their prices to review pricing strategy.</p>\n        <pre><code>SELECT product_name, price \nFROM products;</code></pre>\n\n        <div class=\"example-box\">\n            <strong>⚠️ Performance Warning:</strong><br>\n            Avoid using <code>SELECT *</code> in production on large tables. It pulls every single column, which slows down the query and wastes resources. Always specify the columns you need.\n        </div>\n      "
    },
    {
        "number": 3,
        "title": "Filtering with WHERE",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>You rarely want <em>all</em> the data. <code>WHERE</code> is your filter. It limits the rows returned to only those that meet specific measuring criteria.</p>\n        \n        <h4>2. Syntax</h4>\n        <pre><code>SELECT column_name\nFROM table_name\nWHERE condition;</code></pre>\n        \n        <h4>3. Common Operators</h4>\n        <ul>\n            <li><code>=</code> : Exact match</li>\n            <li><code><></code> or <code>!=</code> : Not equal</li>\n            <li><code>></code>, <code><</code> : Greater than, Less than</li>\n            <li><code>BETWEEN</code> : Within a range</li>\n            <li><code>IN</code> : Matches a list of values</li>\n            <li><code>LIKE</code> : Pattern matching (e.g., names starting with 'A')</li>\n        </ul>\n\n        <h4>4. Business Scenario</h4>\n        <p><strong>Task:</strong> Find all orders where the total amount was greater than $100.</p>\n        <pre><code>SELECT order_id, customer_id, total_amount\nFROM orders\nWHERE total_amount > 100;</code></pre>\n      "
    },
    {
        "number": 4,
        "title": "Sorting with ORDER BY",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Data in a database is not stored in any specific order. <code>ORDER BY</code> sorts your results so they make sense.</p>\n        \n        <h4>2. Syntax</h4>\n        <pre><code>SELECT column_name\nFROM table_name\nORDER BY column_name [ASC|DESC];</code></pre>\n        <ul>\n            <li><code>ASC</code>: Ascending (A-Z, 0-9) - Default</li>\n            <li><code>DESC</code>: Descending (Z-A, 9-0)</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Task:</strong> Show the top 10 most expensive products.</p>\n        <pre><code>SELECT product_name, price\nFROM products\nORDER BY price DESC\nLIMIT 10;</code></pre>\n      "
    },
    {
        "number": 5,
        "title": "Aggregations (COUNT, SUM, AVG)",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Aggregations take many rows and condense them into a single number. This is the heart of analytics.</p>\n        \n        <h4>2. Key Functions</h4>\n        <ul>\n            <li><code>COUNT(*)</code>: Counts total rows.</li>\n            <li><code>SUM(column)</code>: Adds up values.</li>\n            <li><code>AVG(column)</code>: Calculates the mean.</li>\n            <li><code>MIN(column)</code> / <code>MAX(column)</code>: Finds smallest/largest value.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Task:</strong> Calculate total revenue for the year.</p>\n        <pre><code>SELECT SUM(sale_amount) AS total_revenue\nFROM sales\nWHERE sale_date BETWEEN '2023-01-01' AND '2023-12-31';</code></pre>\n        \n        <div class=\"example-box\">\n             <strong>Note:</strong> Comparison with NULL values requires special handling. <code>COUNT(column_name)</code> ignores NULLs, while <code>COUNT(*)</code> includes them.\n        </div>\n      "
    },
    {
        "number": 6,
        "title": "Grouping with GROUP BY",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p><code>GROUP BY</code> splits your data into buckets and applies an aggregate function to each bucket. It answers \"Per X\" questions (e.g., Sales <em>per</em> region).</p>\n        \n        <h4>2. Syntax</h4>\n        <pre><code>SELECT category, SUM(sales)\nFROM data\nGROUP BY category;</code></pre>\n        \n        <h4>3. The Rule of Thumb</h4>\n        <p>If a column is in the <code>SELECT</code> statement but <strong>not</strong> inside an aggregate function (like SUM), it <strong>MUST</strong> be in the <code>GROUP BY</code> clause.</p>\n\n        <h4>4. Business Scenario</h4>\n        <p><strong>Task:</strong> How many users signed up <em>each month</em>?</p>\n        <pre><code>SELECT month_name, COUNT(user_id)\nFROM users\nGROUP BY month_name;</code></pre>\n      "
    },
    {
        "number": 7,
        "title": "Filtering Groups with HAVING",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p><code>WHERE</code> filters rows <em>before</em> grouping. <code>HAVING</code> filters groups <em>after</em> grouping.</p>\n        \n        <h4>2. Syntax</h4>\n        <pre><code>SELECT category, SUM(sales)\nFROM table\nGROUP BY category\nHAVING SUM(sales) > 1000;</code></pre>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Task:</strong> Find only the store locations that have processed more than 500 orders.</p>\n        <pre><code>SELECT store_location, COUNT(order_id)\nFROM orders\nGROUP BY store_location\nHAVING COUNT(order_id) > 500;</code></pre>\n      "
    },
    {
        "number": 8,
        "title": "JOINS (Inner, Left, Right, Full)",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Data is often split across multiple tables (e.g., Customers in one, Orders in another). JOINs bring them back together.</p>\n        \n        <h4>2. Types of JOINS</h4>\n        <ul>\n            <li><strong>INNER JOIN:</strong> Returns rows when there is a match in BOTH tables. (The intersection).</li>\n            <li><strong>LEFT JOIN:</strong> Returns all rows from the left table, and matching rows from the right. (Most common for keeping base data context).</li>\n            <li><strong>RIGHT JOIN:</strong> Opposite of Left Join. Rarely used.</li>\n            <li><strong>FULL OUTER JOIN:</strong> Returns all rows when there is a match in EITHER table.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Task:</strong> List all orders and the name of the customer who made them.</p>\n        <pre><code>SELECT orders.order_id, customers.name\nFROM orders\nINNER JOIN customers \n  ON orders.customer_id = customers.id;</code></pre>\n      "
    },
    {
        "number": 9,
        "title": "Subqueries",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>A query nested inside another query. It allows you to answer multi-step questions in a single step.</p>\n        \n        <h4>2. Use Cases</h4>\n        <ul>\n            <li>Filtering by a dynamic list (e.g., Users who bought 'X').</li>\n            <li>Calculating a scalar value to compare against (e.g., Sales > Average Sales).</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Task:</strong> Find products that cost more than the average product price.</p>\n        <pre><code>SELECT product_name, price\nFROM products\nWHERE price > (SELECT AVG(price) FROM products);</code></pre>\n      "
    },
    {
        "number": 10,
        "title": "Common Table Expressions (CTEs)",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>CTEs (using <code>WITH</code>) are like temporary tables that exist just for your query. They make complex code readable.</p>\n        \n        <h4>2. Syntax</h4>\n        <pre><code>WITH sales_2023 AS (\n    SELECT * FROM sales WHERE year = 2023\n)\nSELECT * FROM sales_2023;</code></pre>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Task:</strong> Calculate the average order value per customer, then find the average of <em>that</em>.</p>\n        <pre><code>WITH customer_totals AS (\n    SELECT customer_id, SUM(amount) as total_spent\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT AVG(total_spent) \nFROM customer_totals;</code></pre>\n        <div class=\"example-box\">\n            <strong>Pro Tip:</strong><br>\n            Always prefer CTEs over nested subqueries for readability and debugging.\n        </div>\n      "
    },
    {
        "number": 11,
        "title": "String and Date Functions",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Raw data is messy. You need functions to clean text and manipulate dates.</p>\n        \n        <h4>2. Essential Functions</h4>\n        <ul>\n            <li><code>UPPER(str)</code> / <code>LOWER(str)</code>: Normalize casing.</li>\n            <li><code>CONCAT(a, b)</code>: Combine strings.</li>\n            <li><code>TRIM(str)</code>: Remove whitespace.</li>\n            <li><code>DATE_TRUNC('month', date)</code>: Round date to start of month (PostgreSQL).</li>\n            <li><code>DATEDIFF(date1, date2)</code>: Days between two dates.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Task:</strong> Calculate the time (in days) between an order being placed and shipped.</p>\n        <pre><code>SELECT order_id, \n       DATEDIFF(day, order_date, ship_date) as processing_time\nFROM orders;</code></pre>\n      "
    },
    {
        "number": 12,
        "title": "Window Functions",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Window functions perform calculations across a set of table rows that are somehow related to the current row. Unlike <code>GROUP BY</code>, they don't collapse rows.</p>\n        \n        <h4>2. Key Functions</h4>\n        <ul>\n            <li><code>RANK()</code>: Assigns a rank (1, 2, 2, 4...).</li>\n            <li><code>DENSE_RANK()</code>: Assigns rank without gaps (1, 2, 2, 3...).</li>\n            <li><code>ROW_NUMBER()</code>: Unique row ID (1, 2, 3, 4...).</li>\n            <li><code>LEAD()</code> / <code>LAG()</code>: Access next/previous row values.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Task:</strong> Find the top 3 highest salaries <em>per department</em>.</p>\n        <pre><code>SELECT * FROM (\n    SELECT name, department, salary,\n           RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rnk\n    FROM employees\n) t\nWHERE rnk <= 3;</code></pre>\n      "
    }
],
        questions: [
            {
                number: 1,
                difficulty: "easy",
                question: "Write a query to find all customers who have placed more than 5 orders.",
                context: "You have a 'customers' table and an 'orders' table. The orders table has a customer_id foreign key.",
                hasCodeEditor: true,
                sampleData: `CREATE TABLE customers (customer_id INT, customer_name VARCHAR(100));
CREATE TABLE orders (order_id INT, customer_id INT, order_date DATE);`,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT c.customer_id,
       c.customer_name,
       COUNT(o.order_id) AS order_count
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) > 5
ORDER BY order_count DESC;</code></pre>
                    
                    <h4>Explanation:</h4>
                    <ul>
                        <li>We JOIN customers with orders to get all order records</li>
                        <li>GROUP BY customer to aggregate their orders</li>
                        <li>HAVING filters groups (not individual rows) to only those with > 5 orders</li>
                        <li>ORDER BY shows the most active customers first</li>
                    </ul>
                    
                    <h4>Key Concept:</h4>
                    <p>Use HAVING (not WHERE) to filter aggregated results. WHERE filters before grouping, HAVING filters after.</p>
                `
            },
            {
                number: 2,
                difficulty: "easy",
                question: "Select all employees from the 'Sales' department with a salary greater than $50,000.",
                context: "Table: employees (employee_id, name, department, salary)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT *
FROM employees
WHERE department = 'Sales' AND salary > 50000;</code></pre>
                    
                    <h4>Explanation:</h4>
                    <p>Use AND to combine multiple conditions in the WHERE clause.</p>
                `
            },
            {
                number: 3,
                difficulty: "easy",
                question: "Count the total number of products in each category.",
                context: "Table: products (product_id, product_name, category)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT category,
       COUNT(*) AS product_count
FROM products
GROUP BY category
ORDER BY product_count DESC;</code></pre>
                `
            },
            {
                number: 4,
                difficulty: "easy",
                question: "Find the average order value for each customer.",
                context: "Table: orders (order_id, customer_id, total_amount)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT customer_id,
       AVG(total_amount) AS avg_order_value,
       COUNT(*) AS order_count
FROM orders
GROUP BY customer_id;</code></pre>
                `
            },
            {
                number: 5,
                difficulty: "easy",
                question: "List all orders placed in the last 30 days.",
                context: "Table: orders (order_id, customer_id, order_date, amount)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT *
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY order_date DESC;</code></pre>
                `
            },
            {
                number: 6,
                difficulty: "medium",
                question: "Calculate the month-over-month growth rate for total sales.",
                context: "You have a sales table with columns: sale_date, sale_amount. Calculate the percentage change from the previous month.",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH monthly_sales AS (
    SELECT DATE_TRUNC('month', sale_date) AS month,
           SUM(sale_amount) AS total_sales
    FROM sales
    GROUP BY DATE_TRUNC('month', sale_date)
)
SELECT month,
       total_sales,
       LAG(total_sales) OVER (ORDER BY month) AS prev_month_sales,
       ROUND(
           ((total_sales - LAG(total_sales) OVER (ORDER BY month)) 
            / LAG(total_sales) OVER (ORDER BY month) * 100), 2
       ) AS growth_rate_pct
FROM monthly_sales
ORDER BY month;</code></pre>
                    
                    <h4>Explanation:</h4>
                    <ul>
                        <li>CTE (Common Table Expression) first aggregates sales by month</li>
                        <li>LAG() window function retrieves the previous month's sales</li>
                        <li>Growth rate formula: (current - previous) / previous * 100</li>
                        <li>ROUND() makes the percentage readable</li>
                    </ul>
                    
                    <h4>Business Insight:</h4>
                    <p>This metric is crucial for tracking business momentum and identifying seasonal trends or the impact of marketing campaigns.</p>
                `
            },
            {
                number: 7,
                difficulty: "medium",
                question: "Find customers who made purchases in both January and February 2024.",
                context: "Table: orders (order_id, customer_id, order_date)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT customer_id
FROM orders
WHERE DATE_TRUNC('month', order_date) = '2024-01-01'
INTERSECT
SELECT customer_id
FROM orders
WHERE DATE_TRUNC('month', order_date) = '2024-02-01';</code></pre>
                `
            },
            {
                number: 8,
                difficulty: "medium",
                question: "Calculate the running total of sales by date.",
                context: "Table: sales (sale_id, sale_date, amount)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT sale_date,
       amount,
       SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM sales
ORDER BY sale_date;</code></pre>
                `
            },
            {
                number: 9,
                difficulty: "medium",
                question: "Find the second highest salary in each department.",
                context: "Table: employees (employee_id, name, department, salary)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH ranked_salaries AS (
    SELECT department,
           salary,
           DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank
    FROM employees
)
SELECT department, salary
FROM ranked_salaries
WHERE rank = 2;</code></pre>
                `
            },
            {
                number: 10,
                difficulty: "medium",
                question: "Identify customers who haven't made a purchase in the last 90 days.",
                context: "Tables: customers (customer_id, name), orders (order_id, customer_id, order_date)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT c.customer_id,
       c.name,
       MAX(o.order_date) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
HAVING MAX(o.order_date) < CURRENT_DATE - INTERVAL '90 days'
   OR MAX(o.order_date) IS NULL;</code></pre>
                `
            },
            {
                number: 11,
                difficulty: "hard",
                question: "Find the top 3 products by revenue in each category, along with their rank.",
                context: "Tables: products (product_id, product_name, category_id), order_items (product_id, quantity, price), categories (category_id, category_name)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH product_revenue AS (
    SELECT p.product_id,
           p.product_name,
           c.category_name,
           SUM(oi.quantity * oi.price) AS total_revenue,
           RANK() OVER (
               PARTITION BY c.category_id 
               ORDER BY SUM(oi.quantity * oi.price) DESC
           ) AS revenue_rank
    FROM products p
    INNER JOIN order_items oi ON p.product_id = oi.product_id
    INNER JOIN categories c ON p.category_id = c.category_id
    GROUP BY p.product_id, p.product_name, c.category_id, c.category_name
)
SELECT category_name,
       product_name,
       total_revenue,
       revenue_rank
FROM product_revenue
WHERE revenue_rank <= 3
ORDER BY category_name, revenue_rank;</code></pre>
                    
                    <h4>Explanation:</h4>
                    <ul>
                        <li>First CTE calculates total revenue per product</li>
                        <li>RANK() with PARTITION BY assigns ranks within each category</li>
                        <li>Final SELECT filters to only top 3 products per category</li>
                        <li>Multiple JOINs connect products, orders, and categories</li>
                    </ul>
                    
                    <h4>Why This Matters:</h4>
                    <p>This type of analysis helps identify star products in each category for inventory planning, promotional focus, and supplier negotiations.</p>
                `
            },
            {
                number: 12,
                difficulty: "hard",
                question: "Calculate customer lifetime value (total revenue per customer) and identify the top 10% of customers.",
                context: "Table: orders (order_id, customer_id, total_amount)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH customer_ltv AS (
    SELECT customer_id,
           SUM(total_amount) AS lifetime_value,
           NTILE(10) OVER (ORDER BY SUM(total_amount) DESC) AS decile
    FROM orders
    GROUP BY customer_id
)
SELECT customer_id,
       lifetime_value
FROM customer_ltv
WHERE decile = 1
ORDER BY lifetime_value DESC;</code></pre>
                `
            },
            {
                number: 13,
                difficulty: "hard",
                question: "Find products that have never been ordered.",
                context: "Tables: products (product_id, product_name), order_items (order_item_id, product_id, quantity)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT p.product_id, p.product_name
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.product_id IS NULL;</code></pre>
                `
            },
            {
                number: 14,
                difficulty: "easy",
                question: "Get the total number of employees in each department.",
                context: "Table: employees (employee_id, name, department)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT department,
       COUNT(*) AS employee_count
FROM employees
GROUP BY department;</code></pre>
                `
            },
            {
                number: 15,
                difficulty: "easy",
                question: "Find all products with names starting with 'Pro'.",
                context: "Table: products (product_id, product_name, price)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT *
FROM products
WHERE product_name LIKE 'Pro%';</code></pre>
                `
            },
            {
                number: 16,
                difficulty: "medium",
                question: "Calculate the average time between orders for each customer.",
                context: "Table: orders (order_id, customer_id, order_date)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH order_gaps AS (
    SELECT customer_id,
           order_date,
           LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_order_date,
           order_date - LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS days_between
    FROM orders
)
SELECT customer_id,
       AVG(days_between) AS avg_days_between_orders
FROM order_gaps
WHERE days_between IS NOT NULL
GROUP BY customer_id;</code></pre>
                `
            },
            {
                number: 17,
                difficulty: "medium",
                question: "Find the most popular product (by quantity sold) in each month.",
                context: "Tables: order_items (order_item_id, product_id, quantity, order_date), products (product_id, product_name)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH monthly_product_sales AS (
    SELECT DATE_TRUNC('month', order_date) AS month,
           product_id,
           SUM(quantity) AS total_quantity,
           RANK() OVER (PARTITION BY DATE_TRUNC('month', order_date) ORDER BY SUM(quantity) DESC) AS rank
    FROM order_items
    GROUP BY DATE_TRUNC('month', order_date), product_id
)
SELECT m.month,
       p.product_name,
       m.total_quantity
FROM monthly_product_sales m
JOIN products p ON m.product_id = p.product_id
WHERE m.rank = 1;</code></pre>
                `
            },
            {
                number: 18,
                difficulty: "hard",
                question: "Calculate the cohort retention rate for customers by their first purchase month.",
                context: "Table: orders (order_id, customer_id, order_date)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH first_purchase AS (
    SELECT customer_id,
           DATE_TRUNC('month', MIN(order_date)) AS cohort_month
    FROM orders
    GROUP BY customer_id
),
cohort_activity AS (
    SELECT fp.cohort_month,
           DATE_TRUNC('month', o.order_date) AS activity_month,
           COUNT(DISTINCT o.customer_id) AS active_customers
    FROM first_purchase fp
    JOIN orders o ON fp.customer_id = o.customer_id
    GROUP BY fp.cohort_month, DATE_TRUNC('month', o.order_date)
),
cohort_size AS (
    SELECT cohort_month,
           COUNT(*) AS total_customers
    FROM first_purchase
    GROUP BY cohort_month
)
SELECT ca.cohort_month,
       ca.activity_month,
       ca.active_customers,
       cs.total_customers,
       ROUND(100.0 * ca.active_customers / cs.total_customers, 2) AS retention_rate
FROM cohort_activity ca
JOIN cohort_size cs ON ca.cohort_month = cs.cohort_month
ORDER BY ca.cohort_month, ca.activity_month;</code></pre>
                `
            },
            {
                number: 19,
                difficulty: "easy",
                question: "List all orders with their customer names.",
                context: "Tables: orders (order_id, customer_id, total_amount), customers (customer_id, customer_name)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT o.order_id,
       c.customer_name,
       o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;</code></pre>
                `
            },
            {
                number: 20,
                difficulty: "medium",
                question: "Find duplicate email addresses in the customers table.",
                context: "Table: customers (customer_id, email)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>SELECT email,
       COUNT(*) AS duplicate_count
FROM customers
GROUP BY email
HAVING COUNT(*) > 1;</code></pre>
                `
            },
            // Continue with more questions to reach 45...
            {
                number: 21,
                difficulty: "easy",
                question: "Calculate the total revenue for each product.",
                context: "Table: order_items (product_id, quantity, price)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT product_id, SUM(quantity * price) AS total_revenue FROM order_items GROUP BY product_id ORDER BY total_revenue DESC;</code></pre>`
            },
            {
                number: 22,
                difficulty: "medium",
                question: "Find customers who have ordered every product in the catalog.",
                context: "Tables: customers (customer_id), products (product_id), orders (order_id, customer_id, product_id)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT customer_id FROM orders GROUP BY customer_id HAVING COUNT(DISTINCT product_id) = (SELECT COUNT(*) FROM products);</code></pre>`
            },
            {
                number: 23,
                difficulty: "hard",
                question: "Calculate the median order value.",
                context: "Table: orders (order_id, total_amount)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_amount) AS median_order_value FROM orders;</code></pre>`
            },
            {
                number: 24,
                difficulty: "easy",
                question: "Get the top 5 highest-paid employees.",
                context: "Table: employees (employee_id, name, salary)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT * FROM employees ORDER BY salary DESC LIMIT 5;</code></pre>`
            },
            {
                number: 25,
                difficulty: "medium",
                question: "Find the percentage of orders that included a discount.",
                context: "Table: orders (order_id, discount_amount)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT ROUND(100.0 * COUNT(CASE WHEN discount_amount > 0 THEN 1 END) / COUNT(*), 2) AS discount_percentage FROM orders;</code></pre>`
            },
            {
                number: 26,
                difficulty: "easy",
                question: "List products sorted by price in descending order.",
                context: "Table: products (product_id, product_name, price)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT * FROM products ORDER BY price DESC;</code></pre>`
            },
            {
                number: 27,
                difficulty: "medium",
                question: "Calculate year-over-year revenue growth.",
                context: "Table: sales (sale_date, amount)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>WITH yearly_revenue AS (SELECT EXTRACT(YEAR FROM sale_date) AS year, SUM(amount) AS revenue FROM sales GROUP BY year) SELECT year, revenue, LAG(revenue) OVER (ORDER BY year) AS prev_year_revenue, ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY year)) / LAG(revenue) OVER (ORDER BY year), 2) AS yoy_growth FROM yearly_revenue;</code></pre>`
            },
            {
                number: 28,
                difficulty: "hard",
                question: "Find customers with consecutive daily purchases for at least 3 days.",
                context: "Table: orders (order_id, customer_id, order_date)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>WITH daily_orders AS (SELECT DISTINCT customer_id, order_date FROM orders), gaps AS (SELECT customer_id, order_date, order_date - ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS grp FROM daily_orders) SELECT customer_id, MIN(order_date) AS streak_start, MAX(order_date) AS streak_end, COUNT(*) AS streak_length FROM gaps GROUP BY customer_id, grp HAVING COUNT(*) >= 3;</code></pre>`
            },
            {
                number: 29,
                difficulty: "easy",
                question: "Count orders by status.",
                context: "Table: orders (order_id, status)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT status, COUNT(*) AS order_count FROM orders GROUP BY status;</code></pre>`
            },
            {
                number: 30,
                difficulty: "medium",
                question: "Find products with above-average prices.",
                context: "Table: products (product_id, product_name, price)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);</code></pre>`
            },
            {
                number: 31,
                difficulty: "easy",
                question: "Get the earliest and latest order dates.",
                context: "Table: orders (order_id, order_date)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT MIN(order_date) AS earliest_order, MAX(order_date) AS latest_order FROM orders;</code></pre>`
            },
            {
                number: 32,
                difficulty: "medium",
                question: "Calculate the conversion rate (orders / visitors).",
                context: "Tables: visitors (visitor_id, visit_date), orders (order_id, visitor_id, order_date)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT ROUND(100.0 * COUNT(DISTINCT o.visitor_id) / COUNT(DISTINCT v.visitor_id), 2) AS conversion_rate FROM visitors v LEFT JOIN orders o ON v.visitor_id = o.visitor_id;</code></pre>`
            },
            {
                number: 33,
                difficulty: "hard",
                question: "Find the longest gap between orders for each customer.",
                context: "Table: orders (order_id, customer_id, order_date)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>WITH order_gaps AS (SELECT customer_id, order_date - LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS gap FROM orders) SELECT customer_id, MAX(gap) AS longest_gap FROM order_gaps GROUP BY customer_id;</code></pre>`
            },
            {
                number: 34,
                difficulty: "easy",
                question: "Find all employees hired in 2023.",
                context: "Table: employees (employee_id, name, hire_date)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT * FROM employees WHERE EXTRACT(YEAR FROM hire_date) = 2023;</code></pre>`
            },
            {
                number: 35,
                difficulty: "medium",
                question: "Calculate the average order value by customer segment.",
                context: "Tables: customers (customer_id, segment), orders (order_id, customer_id, total_amount)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT c.segment, AVG(o.total_amount) AS avg_order_value FROM customers c JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.segment;</code></pre>`
            },
            {
                number: 36,
                difficulty: "easy",
                question: "List products with stock less than 10 units.",
                context: "Table: products (product_id, product_name, stock_quantity)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT * FROM products WHERE stock_quantity < 10;</code></pre>`
            },
            {
                number: 37,
                difficulty: "medium",
                question: "Find the busiest day of the week for orders.",
                context: "Table: orders (order_id, order_date)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT TO_CHAR(order_date, 'Day') AS day_of_week, COUNT(*) AS order_count FROM orders GROUP BY TO_CHAR(order_date, 'Day') ORDER BY order_count DESC LIMIT 1;</code></pre>`
            },
            {
                number: 38,
                difficulty: "hard",
                question: "Calculate the customer churn rate by month.",
                context: "Table: subscriptions (customer_id, start_date, end_date)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>WITH monthly_stats AS (SELECT DATE_TRUNC('month', end_date) AS month, COUNT(*) AS churned, (SELECT COUNT(*) FROM subscriptions WHERE start_date <= DATE_TRUNC('month', end_date) AND (end_date IS NULL OR end_date >= DATE_TRUNC('month', end_date))) AS active FROM subscriptions WHERE end_date IS NOT NULL GROUP BY month) SELECT month, churned, active, ROUND(100.0 * churned / active, 2) AS churn_rate FROM monthly_stats;</code></pre>`
            },
            {
                number: 39,
                difficulty: "easy",
                question: "Get distinct cities from the customers table.",
                context: "Table: customers (customer_id, city)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT DISTINCT city FROM customers ORDER BY city;</code></pre>`
            },
            {
                number: 40,
                difficulty: "medium",
                question: "Find products that are frequently bought together (co-occurrence).",
                context: "Table: order_items (order_id, product_id)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT oi1.product_id AS product_a, oi2.product_id AS product_b, COUNT(*) AS times_bought_together FROM order_items oi1 JOIN order_items oi2 ON oi1.order_id = oi2.order_id AND oi1.product_id < oi2.product_id GROUP BY oi1.product_id, oi2.product_id ORDER BY times_bought_together DESC LIMIT 10;</code></pre>`
            },
            {
                number: 41,
                difficulty: "easy",
                question: "Calculate the total number of orders per month.",
                context: "Table: orders (order_id, order_date)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT DATE_TRUNC('month', order_date) AS month, COUNT(*) AS order_count FROM orders GROUP BY month ORDER BY month;</code></pre>`
            },
            {
                number: 42,
                difficulty: "medium",
                question: "Identify seasonal trends in sales (quarterly comparison).",
                context: "Table: sales (sale_id, sale_date, amount)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT EXTRACT(YEAR FROM sale_date) AS year, EXTRACT(QUARTER FROM sale_date) AS quarter, SUM(amount) AS total_sales FROM sales GROUP BY year, quarter ORDER BY year, quarter;</code></pre>`
            },
            {
                number: 43,
                difficulty: "hard",
                question: "Calculate the RFM (Recency, Frequency, Monetary) score for each customer.",
                context: "Table: orders (order_id, customer_id, order_date, total_amount)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>WITH rfm AS (SELECT customer_id, CURRENT_DATE - MAX(order_date) AS recency, COUNT(*) AS frequency, SUM(total_amount) AS monetary FROM orders GROUP BY customer_id) SELECT customer_id, recency, frequency, monetary, NTILE(5) OVER (ORDER BY recency DESC) AS r_score, NTILE(5) OVER (ORDER BY frequency) AS f_score, NTILE(5) OVER (ORDER BY monetary) AS m_score FROM rfm;</code></pre>`
            },
            {
                number: 44,
                difficulty: "medium",
                question: "Find the average basket size (items per order).",
                context: "Table: order_items (order_id, product_id, quantity)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>SELECT AVG(item_count) AS avg_basket_size FROM (SELECT order_id, SUM(quantity) AS item_count FROM order_items GROUP BY order_id) AS basket_sizes;</code></pre>`
            },
            {
                number: 45,
                difficulty: "hard",
                question: "Detect anomalies in daily sales using standard deviation.",
                context: "Table: sales (sale_date, total_amount)",
                hasCodeEditor: true,
                answer: `<h4>Solution:</h4><pre><code>WITH daily_sales AS (SELECT sale_date, SUM(total_amount) AS daily_total FROM sales GROUP BY sale_date), stats AS (SELECT AVG(daily_total) AS mean, STDDEV(daily_total) AS stddev FROM daily_sales) SELECT ds.sale_date, ds.daily_total, s.mean, s.stddev, (ds.daily_total - s.mean) / s.stddev AS z_score FROM daily_sales ds CROSS JOIN stats s WHERE ABS((ds.daily_total - s.mean) / s.stddev) > 2 ORDER BY ABS((ds.daily_total - s.mean) / s.stddev) DESC;</code></pre>`
            }
        ]
    },

    statistics: {
        title: "Statistics & Probability",
        lessons: [
    {
        "number": 1,
        "title": "Descriptive Statistics",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Descriptive statistics simplify large amounts of data into summary values. They describe \"what happened.\"</p>\n        \n        <h4>2. The Big Three</h4>\n        <ul>\n            <li><strong>Mean (Average):</strong> Sum / Count. Sensitive to outliers (e.g., billionaire walks into a bar).</li>\n            <li><strong>Median:</strong> The middle value. Robust against outliers. <em>Use this for salary or home price data.</em></li>\n            <li><strong>Mode:</strong> The most frequent value. Good for categorical data.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Analysis:</strong> You are analyzing website session durations.</p>\n        <ul>\n            <li><strong>Mean:</strong> 5 minutes (skewed by one user who left tab open for 4 hours).</li>\n            <li><strong>Median:</strong> 45 seconds (most users stay less than a minute).</li>\n        </ul>\n        <p><strong>Conclusion:</strong> The Median is the better metric here for \"typical\" user behavior.</p>\n      "
    },
    {
        "number": 2,
        "title": "Measures of Spread",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Central tendency (mean/median) tells you the center. Measures of spread tell you how \"noisy\" or inconsistent the data is.</p>\n        \n        <h4>2. Key Metrics</h4>\n        <ul>\n            <li><strong>Range:</strong> Max - Min. Simple but rough.</li>\n            <li><strong>Standard Deviation (SD):</strong> The average distance of data points from the mean. Low SD = consistent. High SD = volatile.</li>\n            <li><strong>Variance:</strong> SD squared. Used in calculations.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Comparison:</strong> Two stock portfolios both return 10% average annual return.</p>\n        <ul>\n            <li><strong>Portfolio A:</strong> SD = 2%. (Returns 8% to 12% - Stable).</li>\n            <li><strong>Portfolio B:</strong> SD = 20%. (Returns -10% to 30% - Risky).</li>\n        </ul>\n      "
    },
    {
        "number": 3,
        "title": "Probability Basics",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Probability quantifies uncertainty. It ranges from 0 (impossible) to 1 (certain).</p>\n        \n        <h4>2. Key Rules</h4>\n        <ul>\n            <li><strong>P(A or B):</strong> Addition Rule. Probability of A <em>or</em> B happening.</li>\n            <li><strong>P(A and B):</strong> Multiplication Rule. Probability of A <em>and</em> B happening (if independent).</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Funnel Analysis:</strong></p>\n        <p>Probability a visitor clicks \"Add to Cart\" = 0.2 (20%).<br>\n        Probability a \"Cart\" user clicks \"Checkout\" = 0.5 (50%).<br>\n        Probability a visitor buys? <br>\n        <code>0.2 * 0.5 = 0.1 (10%)</code>.\n        </p>\n      "
    },
    {
        "number": 4,
        "title": "Distributions (Normal, Binomial)",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>A distribution shows all possible values of data and how often they occur.</p>\n        \n        <h4>2. The Normal Distribution (Bell Curve)</h4>\n        <p>Nature loves this curve. Heights, weights, test scores, errors often follow it.</p>\n        <ul>\n            <li>Symmetric around the mean.</li>\n            <li><strong>68-95-99.7 Rule:</strong> 68% of data is within 1 SD, 95% within 2 SDs.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Quality Control:</strong> A machine fills cereal boxes to 500g with SD = 5g. <br>\n        95% of boxes will weigh between 490g and 510g. Getting a 450g box is statistically nearly impossible, signaling a machine failure.</p>\n      "
    },
    {
        "number": 5,
        "title": "Sampling and CLT",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>You can rarely measure an entire population (e.g., \"All US Internet Users\"). You take a sample.</p>\n        \n        <h4>2. Central Limit Theorem (CLT)</h4>\n        <p>This is the magic of statistics. It states that if you take enough random samples, the <em>means of those samples</em> will form a Normal Distribution, even if the original data is not normal.</p>\n        \n        <h4>3. Business Implication</h4>\n        <p>This allows us to use Normal Distribution math (z-scores, confidence intervals) on almost any metric (sales, defects, logins) as long as we have enough data points.</p>\n      "
    },
    {
        "number": 6,
        "title": "Hypothesis Testing",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The scientific method for data. Should we believe a change is real, or just random noise?</p>\n        \n        <h4>2. Steps</h4>\n        <ol>\n            <li><strong>Null Hypothesis (H0):</strong> \"Nothing changed.\" (The default).</li>\n            <li><strong>Alternative Hypothesis (H1):</strong> \"Something changed.\" (What we hope for).</li>\n            <li><strong>P-Value:</strong> The probability of seeing these results if H0 were true.</li>\n        </ol>\n        \n        <h4>3. The Threshold (Alpha)</h4>\n        <p>Usually 0.05. If p-value < 0.05, we say it's \"Statistically Significant\" and reject H0.</p>\n      "
    },
    {
        "number": 7,
        "title": "Confidence Intervals",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>A point estimate (e.g., \"Conversion rate is 5%\") is rarely exactly right. A Confidence Interval (CI) gives a range.</p>\n        \n        <h4>2. Interpretation</h4>\n        <p>\"We are 95% confident that the true conversion rate lies between 4.8% and 5.2%.\"</p>\n        \n        <h4>3. Business Use</h4>\n        <p><strong>Executive Reporting:</strong> Don't just say \"We'll gain 10,000 users.\" Say \"We project 10,000 users (+/- 500).\" This manages expectations and risk.</p>\n      "
    },
    {
        "number": 8,
        "title": "Correlation vs Causation",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p><strong>Correlation:</strong> Two variables move together.<br>\n        <strong>Causation:</strong> One variable <em>causes</em> the other to move.</p>\n        \n        <h4>2. The Famous Trap</h4>\n        <p>Ice cream sales and shark attacks are highly correlated. Why? <br>\n        <strong>Confounding Variable:</strong> Summer. Heat causes both.</p>\n        \n        <h4>3. Correlation Coefficient (r)</h4>\n        <ul>\n            <li>+1: Perfect positive correlation</li>\n            <li>0: No correlation</li>\n            <li>-1: Perfect negative correlation</li>\n        </ul>\n      "
    },
    {
        "number": 9,
        "title": "Linear Regression",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Modeling the relationship between a dependent variable (Target) and independent variables (Features) with a straight line.</p>\n        \n        <h4>2. Equation</h4>\n        <p><code>y = mx + b</code> (or <code>y = β0 + β1x</code>)</p>\n        <ul>\n            <li><strong>y:</strong> Prediction (e.g., Sales)</li>\n            <li><strong>x:</strong> Input (e.g., Ad Spend)</li>\n            <li><strong>m:</strong> Slope (Coefficient) - How much y changes for 1 unit of x.</li>\n        </ul>\n        \n        <h4>3. Business Use</h4>\n        <p><strong>Forecasting:</strong> \"For every additional $1,000 spent on Facebook Ads, sales increase by $4,000.\"</p>\n      "
    },
    {
        "number": 10,
        "title": "A/B Testing",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The gold standard for proving causality in product changes.</p>\n        \n        <h4>2. Process</h4>\n        <ul>\n            <li><strong>Split:</strong> Randomly divide users into Control (A) and Variant (B).</li>\n            <li><strong>Measure:</strong> Track metrics (e.g., Click-Through Rate) for both.</li>\n            <li><strong>Test:</strong> Use a T-Test or Chi-Square test to compare results.</li>\n        </ul>\n        \n        <h4>3. Real-World Tip</h4>\n        <p>Ensure your sample size is large enough <em>before</em> starting. Peeking at results early (before hitting sample size) increases false positives.</p>\n      "
    }
],
        questions: [
            {
                number: 1,
                difficulty: "easy",
                question: "A dataset of employee salaries has a mean of $65,000 and a standard deviation of $12,000. What percentage of employees earn between $53,000 and $77,000?",
                context: "Assume the salary distribution is approximately normal.",
                answer: `
                    <h4>Solution:</h4>
                    <p>$53,000 and $77,000 are exactly 1 standard deviation below and above the mean:</p>
                    <ul>
                        <li>$65,000 - $12,000 = $53,000 (1 SD below)</li>
                        <li>$65,000 + $12,000 = $77,000 (1 SD above)</li>
                    </ul>
                    
                    <p><strong>Answer: 68%</strong></p>
                    
                    <h4>Explanation:</h4>
                    <p>According to the 68-95-99.7 rule (empirical rule) for normal distributions:</p>
                    <ul>
                        <li>68% of data falls within 1 standard deviation of the mean</li>
                        <li>95% within 2 standard deviations</li>
                        <li>99.7% within 3 standard deviations</li>
                    </ul>
                    
                    <h4>Why This Matters:</h4>
                    <p>Understanding this rule helps quickly estimate probabilities and identify outliers without complex calculations.</p>
                `
            },
            {
                number: 2,
                difficulty: "medium",
                question: "You're running an A/B test for two email campaigns. Campaign A has a 5% click-through rate (1000 emails sent), Campaign B has a 6.5% click-through rate (1000 emails sent). The p-value is 0.08. Should you roll out Campaign B?",
                context: "Use a significance level of α = 0.05",
                answer: `
                    <h4>Solution:</h4>
                    <p><strong>No, you should NOT roll out Campaign B yet.</strong></p>
                    
                    <h4>Reasoning:</h4>
                    <ul>
                        <li>P-value (0.08) > Significance level (0.05)</li>
                        <li>We fail to reject the null hypothesis</li>
                        <li>The difference could be due to random chance</li>
                        <li>Not enough statistical evidence that B is truly better</li>
                    </ul>
                    
                    <h4>What to Do:</h4>
                    <ol>
                        <li>Continue the test with more samples to increase statistical power</li>
                        <li>Consider if the 1.5% improvement is practically significant for your business</li>
                        <li>Look at other metrics (conversion rate, revenue) not just click-through</li>
                    </ol>
                    
                    <h4>Business Implication:</h4>
                    <p>Making decisions on insufficient evidence can lead to wasted resources. A p-value of 0.08 means there's an 8% chance the observed difference is due to random variation - too risky for most business decisions.</p>
                    
                    <h4>Pro Tip:</h4>
                    <p>Always determine your required sample size BEFORE running the test using power analysis to avoid this situation.</p>
                `
            },
            {
                number: 3,
                difficulty: "easy",
                question: "Calculate the median of this dataset: [12, 15, 18, 20, 22, 25, 30]",
                context: "The median is the middle value when data is sorted.",
                answer: `<h4>Solution:</h4><p><strong>Answer: 20</strong></p><p>With 7 values (odd number), the median is the 4th value (middle position): 20</p>`
            },
            {
                number: 4,
                difficulty: "easy",
                question: "What is the probability of rolling a sum of 7 with two fair dice?",
                context: "Consider all possible combinations.",
                answer: `<h4>Solution:</h4><p><strong>Answer: 6/36 = 1/6 ≈ 16.67%</strong></p><p>Combinations that sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes out of 36 total possible outcomes.</p>`
            },
            {
                number: 5,
                difficulty: "medium",
                question: "A company's daily sales follow a normal distribution with mean $10,000 and standard deviation $2,000. What's the probability of sales exceeding $14,000 on a given day?",
                context: "Use z-score and standard normal distribution.",
                answer: `<h4>Solution:</h4><p>Z-score = (14000 - 10000) / 2000 = 2</p><p>P(Z > 2) ≈ 0.0228 or <strong>2.28%</strong></p><p>About 2.3% of days will have sales exceeding $14,000.</p>`
            },
            {
                number: 6,
                difficulty: "easy",
                question: "What's the difference between correlation and causation?",
                context: "Explain with a business example.",
                answer: `<h4>Answer:</h4><p><strong>Correlation</strong> means two variables move together. <strong>Causation</strong> means one variable directly causes changes in another.</p><p><strong>Example:</strong> Ice cream sales and drowning deaths are correlated (both increase in summer), but ice cream doesn't cause drowning. The common cause is warm weather.</p>`
            },
            {
                number: 7,
                difficulty: "medium",
                question: "Calculate the variance of: [5, 10, 15, 20, 25]",
                context: "Variance measures spread of data.",
                answer: `<h4>Solution:</h4><p>Mean = 15</p><p>Variance = [(5-15)² + (10-15)² + (15-15)² + (20-15)² + (25-15)²] / 5</p><p>= [100 + 25 + 0 + 25 + 100] / 5 = 250 / 5 = <strong>50</strong></p>`
            },
            {
                number: 8,
                difficulty: "hard",
                question: "A website has a 2% conversion rate. You implement a change and observe 25 conversions out of 1000 visitors (2.5%). Is this improvement statistically significant at α = 0.05?",
                context: "Use a one-proportion z-test.",
                answer: `<h4>Solution:</h4><p>H₀: p = 0.02, H₁: p > 0.02</p><p>z = (0.025 - 0.02) / √(0.02 × 0.98 / 1000) ≈ 1.13</p><p>Critical value at α = 0.05 (one-tailed) = 1.645</p><p><strong>Result: NOT significant</strong> (z < 1.645). Need more data or larger sample size.</p>`
            },
            {
                number: 9,
                difficulty: "easy",
                question: "What is a Type I error in hypothesis testing?",
                context: "Relate to business decision-making.",
                answer: `<h4>Answer:</h4><p><strong>Type I Error (False Positive):</strong> Rejecting a true null hypothesis.</p><p><strong>Business Example:</strong> Concluding a new feature improves user engagement when it actually doesn't, leading to wasted development resources.</p>`
            },
            {
                number: 10,
                difficulty: "medium",
                question: "In a dataset, Q1 = 25 and Q3 = 45. Calculate the interquartile range (IQR) and identify the outlier boundaries.",
                context: "Use the 1.5 × IQR rule.",
                answer: `<h4>Solution:</h4><p>IQR = Q3 - Q1 = 45 - 25 = <strong>20</strong></p><p>Lower boundary = Q1 - 1.5 × IQR = 25 - 30 = -5</p><p>Upper boundary = Q3 + 1.5 × IQR = 45 + 30 = <strong>75</strong></p><p>Values below -5 or above 75 are outliers.</p>`
            },
            {
                number: 11,
                difficulty: "easy",
                question: "What does a p-value of 0.03 mean?",
                context: "Interpret in plain language.",
                answer: `<h4>Answer:</h4><p>A p-value of 0.03 means there's a <strong>3% probability</strong> of observing results as extreme as (or more extreme than) what we observed, assuming the null hypothesis is true.</p><p>At α = 0.05, this is statistically significant, suggesting the null hypothesis should be rejected.</p>`
            },
            {
                number: 12,
                difficulty: "medium",
                question: "A regression model has R² = 0.75. What does this tell you?",
                context: "Interpret the coefficient of determination.",
                answer: `<h4>Answer:</h4><p>R² = 0.75 means <strong>75% of the variance</strong> in the dependent variable is explained by the independent variable(s) in the model.</p><p>This indicates a strong relationship, but 25% of variance remains unexplained by the model.</p>`
            },
            {
                number: 13,
                difficulty: "hard",
                question: "You have two groups: Group A (n=50, mean=100, SD=15) and Group B (n=50, mean=110, SD=15). Conduct a two-sample t-test at α = 0.05.",
                context: "Assume equal variances.",
                answer: `<h4>Solution:</h4><p>Pooled SD = 15, SE = 15 × √(1/50 + 1/50) ≈ 3</p><p>t = (110 - 100) / 3 ≈ 3.33</p><p>df = 98, critical value ≈ 1.98</p><p><strong>Result: Significant</strong> (t > 1.98). Group B has significantly higher mean than Group A.</p>`
            },
            {
                number: 14,
                difficulty: "easy",
                question: "Calculate the range of: [8, 12, 15, 20, 25, 30]",
                context: "Range is the simplest measure of spread.",
                answer: `<h4>Solution:</h4><p>Range = Maximum - Minimum = 30 - 8 = <strong>22</strong></p>`
            },
            {
                number: 15,
                difficulty: "medium",
                question: "What sample size is needed to estimate a population proportion with 95% confidence and 3% margin of error? Assume p = 0.5.",
                context: "Use the sample size formula for proportions.",
                answer: `<h4>Solution:</h4><p>n = (Z² × p × (1-p)) / E²</p><p>n = (1.96² × 0.5 × 0.5) / 0.03² ≈ <strong>1068</strong></p><p>Need approximately 1,068 samples.</p>`
            },
            {
                number: 16,
                difficulty: "easy",
                question: "What is the mode of: [5, 7, 7, 9, 11, 11, 11, 13]?",
                context: "Mode is the most frequently occurring value.",
                answer: `<h4>Solution:</h4><p><strong>Answer: 11</strong></p><p>11 appears 3 times, more than any other value.</p>`
            },
            {
                number: 17,
                difficulty: "medium",
                question: "A confidence interval for average customer spend is [$45, $55]. What does this mean?",
                context: "Interpret the 95% confidence interval.",
                answer: `<h4>Answer:</h4><p>We are <strong>95% confident</strong> that the true population mean of customer spend falls between $45 and $55.</p><p>If we repeated this study 100 times, about 95 of the intervals would contain the true mean.</p>`
            },
            {
                number: 18,
                difficulty: "hard",
                question: "Calculate Pearson correlation coefficient for: X=[1,2,3,4,5], Y=[2,4,5,4,5]",
                context: "Measure linear relationship strength.",
                answer: `<h4>Solution:</h4><p>After calculations: r ≈ <strong>0.775</strong></p><p>This indicates a strong positive linear relationship between X and Y.</p>`
            },
            {
                number: 19,
                difficulty: "easy",
                question: "What's the probability of getting at least one head in 3 coin flips?",
                context: "Use complement rule.",
                answer: `<h4>Solution:</h4><p>P(at least 1 head) = 1 - P(no heads) = 1 - (1/2)³ = 1 - 1/8 = <strong>7/8 = 87.5%</strong></p>`
            },
            {
                number: 20,
                difficulty: "medium",
                question: "Explain the Central Limit Theorem and its importance in data analysis.",
                context: "Why can we use normal distribution for many analyses?",
                answer: `<h4>Answer:</h4><p>The CLT states that the sampling distribution of the mean approaches a normal distribution as sample size increases, <strong>regardless of the population's distribution</strong>.</p><p><strong>Importance:</strong> Allows us to use normal distribution methods for hypothesis testing and confidence intervals even when population isn't normal, provided n ≥ 30.</p>`
            },
            {
                number: 21,
                difficulty: "easy",
                question: "What is standard error?",
                context: "How does it differ from standard deviation?",
                answer: `<h4>Answer:</h4><p><strong>Standard Error (SE)</strong> measures the variability of a sample statistic (like the mean) across different samples.</p><p>SE = SD / √n</p><p>While SD measures spread within one sample, SE measures how much sample means vary from the population mean.</p>`
            },
            {
                number: 22,
                difficulty: "medium",
                question: "A dataset is right-skewed. Which measure of central tendency is most appropriate: mean or median?",
                context: "Consider the effect of outliers.",
                answer: `<h4>Answer:</h4><p><strong>Median</strong> is more appropriate for skewed data.</p><p>In right-skewed data, the mean is pulled higher by extreme values, making it less representative. The median is resistant to outliers and better represents the "typical" value.</p>`
            },
            {
                number: 23,
                difficulty: "hard",
                question: "You're testing if a new checkout process reduces cart abandonment. Current rate: 70%. New process: 65% (n=500). Is this significant at α = 0.05?",
                context: "Use two-proportion z-test.",
                answer: `<h4>Solution:</h4><p>z = (0.70 - 0.65) / √[0.675 × 0.325 × (1/500 + 1/500)] ≈ 1.69</p><p>Critical value (two-tailed) = 1.96</p><p><strong>Result: NOT significant</strong> (z < 1.96). The 5% reduction could be due to chance.</p>`
            },
            {
                number: 24,
                difficulty: "easy",
                question: "What is statistical power?",
                context: "Relate to Type II error.",
                answer: `<h4>Answer:</h4><p><strong>Statistical Power</strong> is the probability of correctly rejecting a false null hypothesis (detecting an effect when it exists).</p><p>Power = 1 - P(Type II Error)</p><p>Typically aim for 80% power. Higher power means better ability to detect real effects.</p>`
            },
            {
                number: 25,
                difficulty: "medium",
                question: "Calculate the coefficient of variation for: Mean = $50, SD = $10",
                context: "CV allows comparison of variability across different scales.",
                answer: `<h4>Solution:</h4><p>CV = (SD / Mean) × 100% = (10 / 50) × 100% = <strong>20%</strong></p><p>This means the standard deviation is 20% of the mean, indicating moderate variability.</p>`
            },
            {
                number: 26,
                difficulty: "easy",
                question: "What does it mean if two events are mutually exclusive?",
                context: "Give a business example.",
                answer: `<h4>Answer:</h4><p><strong>Mutually exclusive events</strong> cannot occur simultaneously.</p><p><strong>Example:</strong> A customer either completes a purchase or abandons their cart - they can't do both at the same time.</p>`
            },
            {
                number: 27,
                difficulty: "medium",
                question: "Explain what a 95% confidence level means in repeated sampling.",
                context: "Common misconception clarification.",
                answer: `<h4>Answer:</h4><p>If we repeated our study many times and calculated a 95% CI each time, approximately <strong>95% of those intervals would contain the true population parameter</strong>.</p><p><strong>NOT:</strong> "There's a 95% chance the true value is in this specific interval" (the parameter is fixed, not random).</p>`
            },
            {
                number: 28,
                difficulty: "hard",
                question: "A linear regression gives: Sales = 1000 + 50×(Ad_Spend). If ad spend increases by $100, what's the predicted sales increase?",
                context: "Interpret the regression coefficient.",
                answer: `<h4>Solution:</h4><p>The coefficient 50 means for every $1 increase in ad spend, sales increase by $50.</p><p>For $100 increase: 50 × 100 = <strong>$5,000</strong> predicted sales increase.</p>`
            },
            {
                number: 29,
                difficulty: "easy",
                question: "What is a null hypothesis?",
                context: "Explain in context of A/B testing.",
                answer: `<h4>Answer:</h4><p>The <strong>null hypothesis (H₀)</strong> is the default assumption that there is no effect or no difference.</p><p><strong>A/B Test Example:</strong> H₀: "The new website design has no effect on conversion rate" (conversion rates are equal).</p>`
            },
            {
                number: 30,
                difficulty: "medium",
                question: "What's the difference between one-tailed and two-tailed tests? When would you use each?",
                context: "Consider directionality of hypotheses.",
                answer: `<h4>Answer:</h4><p><strong>One-tailed:</strong> Tests if parameter is greater than OR less than a value (directional).</p><p><strong>Two-tailed:</strong> Tests if parameter is different from a value (non-directional).</p><p><strong>Use one-tailed</strong> when you only care about change in one direction (e.g., "Does this increase sales?"). <strong>Use two-tailed</strong> when any difference matters (more conservative, generally preferred).</p>`
            },
            {
                number: 31,
                difficulty: "easy",
                question: "Calculate the probability of drawing a red card from a standard deck.",
                context: "Standard deck has 52 cards, 26 red.",
                answer: `<h4>Solution:</h4><p>P(Red) = 26/52 = <strong>1/2 = 50%</strong></p>`
            },
            {
                number: 32,
                difficulty: "medium",
                question: "A dataset has mean = 100 and median = 85. What does this tell you about the distribution?",
                context: "Consider the relationship between mean and median.",
                answer: `<h4>Answer:</h4><p>The distribution is <strong>right-skewed (positively skewed)</strong>.</p><p>When mean > median, there are high-value outliers pulling the mean upward. The median (85) better represents the typical value.</p>`
            },
            {
                number: 33,
                difficulty: "hard",
                question: "Calculate the expected value of a game where you win $100 with 10% probability, $50 with 30% probability, and lose $20 with 60% probability.",
                context: "Should you play this game?",
                answer: `<h4>Solution:</h4><p>E(X) = (100 × 0.10) + (50 × 0.30) + (-20 × 0.60)</p><p>= 10 + 15 - 12 = <strong>$13</strong></p><p><strong>Yes, play!</strong> Expected value is positive ($13 per game on average).</p>`
            },
            {
                number: 34,
                difficulty: "medium",
                question: "What is the law of large numbers and why is it important?",
                context: "Relate to business forecasting.",
                answer: `<h4>Answer:</h4><p>The <strong>Law of Large Numbers</strong> states that as sample size increases, the sample mean converges to the population mean.</p><p><strong>Business Importance:</strong> Larger datasets give more reliable estimates. A conversion rate from 10,000 visitors is more trustworthy than from 100 visitors.</p>`
            },
            {
                number: 35,
                difficulty: "hard",
                question: "You run 20 A/B tests at α = 0.05. What's the probability of at least one false positive (Type I error)?",
                context: "Multiple testing problem.",
                answer: `<h4>Solution:</h4><p>P(at least 1 false positive) = 1 - P(no false positives)</p><p>= 1 - (0.95)²⁰ ≈ 1 - 0.358 = <strong>64.2%</strong></p><p><strong>Implication:</strong> With multiple tests, use Bonferroni correction (α/n) or other methods to control family-wise error rate.</p>`
            }
        ]
    },

    python: {
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
    },

    visualization: {
        title: "Data Visualization",
        lessons: [
    {
        "number": 1,
        "title": "Why Visualize Data?",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>It's not just \"making pretty pictures.\" It is cognitive offloading. You transform abstract numbers into visual patterns (length, position, color) that the human brain processes instantly.</p>\n        <h4>2. Anscombe's Quartet</h4>\n        <p>A famous example where 4 datasets have identical Mean, Variance, and Correlation, but look completely different when plotted. <strong>Always plot your data.</strong></p>\n    "
    },
    {
        "number": 2,
        "title": "Choosing the Right Chart",
        "content": "\n        <h4>1. Use Case Framework</h4>\n        <ul>\n            <li><strong>Comparison:</strong> Bar Chart.</li>\n            <li><strong>Trend over Time:</strong> Line Chart.</li>\n            <li><strong>Correlation:</strong> Scatter Plot.</li>\n            <li><strong>Distribution:</strong> Histogram.</li>\n            <li><strong>Part-to-Whole:</strong> Stacked Bar (or Pie, rarely).</li>\n        </ul>\n    "
    },
    {
        "number": 3,
        "title": "Design Principles",
        "content": "\n        <h4>1. Clarity over Beauty</h4>\n        <p>If the user has to ask \"what am I looking at?\", the chart failed.</p>\n        <h4>2. Best Practices</h4>\n        <ul>\n            <li>Remove chart junk (3D effects, shadows).</li>\n            <li>Directly label lines instead of using a legend (reduces eye travel).</li>\n            <li>Use consistent time intervals.</li>\n        </ul>\n    "
    },
    {
        "number": 4,
        "title": "Color Theory for Data",
        "content": "\n        <h4>1. Types of Palettes</h4>\n        <ul>\n            <li><strong>Sequential:</strong> Light to Dark (e.g., Sales 0 to 1M).</li>\n            <li><strong>Diverging:</strong> Two colors meeting in middle (e.g., Profit vs Loss, Red vs Blue).</li>\n            <li><strong>Categorical:</strong> Distinct colors (e.g., Departments).</li>\n        </ul>\n        <h4>2. Accessibility</h4>\n        <p>Always check for Red-Green color blindness.</p>\n    "
    },
    {
        "number": 5,
        "title": "Dashboards vs Reports",
        "content": "\n        <h4>1. Dashboard</h4>\n        <p>Live, interactive monitoring tool. \"What is happening right now?\" (e.g., Car Dashboard).</p>\n        <h4>2. Report</h4>\n        <p>Static, deep-dive document. \"Why did this happen?\" (e.g., Mechanic's report).</p>\n    "
    },
    {
        "number": 6,
        "title": "Storytelling with Data",
        "content": "\n        <h4>1. The Narrative Arc</h4>\n        <p>Don't just show data. Show: Context -> Conflict (The Problem) -> Resolution (The Insight).</p>\n        <h4>2. Actionable Insights</h4>\n        <p>Every chart should support a recommendation. \"Churn is up\" is data. \"Churn is up because of X, so we should do Y\" is a story.</p>\n    "
    },
    {
        "number": 7,
        "title": "Common Mistakes",
        "content": "\n        <h4>1. Truncating the Y-Axis</h4>\n        <p>Starting a bar chart at 50% instead of 0% exaggerates differences. It is misleading.</p>\n        <h4>2. Spagetti Charts</h4>\n        <p>Line charts with 20+ lines. Impossible to read. Use grouping or small multiples instead.</p>\n    "
    },
    {
        "number": 8,
        "title": "Tools of the Trade",
        "content": "\n        <h4>1. Landscape</h4>\n        <ul>\n            <li><strong>Tableau/PowerBI:</strong> Enterprise standard for Dashboards.</li>\n            <li><strong>Python/R:</strong> Best for custom, statistical, or scientific viz.</li>\n            <li><strong>Excel:</strong> Best for quick, ad-hoc charts.</li>\n        </ul>\n    "
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "easy",
        "question": "What is the primary goal of data visualization?",
        "context": "Purpose",
        "answer": "<h4>Communication</h4><p>To communicate information clearly and efficiently.</p>"
    },
    {
        "number": 2,
        "difficulty": "easy",
        "question": "Which chart is best for showing trends over time?",
        "context": "Time Series",
        "answer": "<h4>Line Chart</h4><p>Best for continuous data over time.</p>"
    },
    {
        "number": 3,
        "difficulty": "medium",
        "question": "When should you use a Bar Chart vs a Column Chart?",
        "context": "Orientation",
        "answer": "<h4>Labels</h4><p>Use Bar (horizontal) when category labels are long.</p>"
    },
    {
        "number": 4,
        "difficulty": "medium",
        "question": "What is 'Chart Junk'?",
        "context": "Design",
        "answer": "<h4>Clutter</h4><p>Unnecessary elements that distract from the data (e.g., excessive grid lines, 3D effects).</p>"
    },
    {
        "number": 5,
        "difficulty": "easy",
        "question": "What does a Pie Chart show?",
        "context": "Composition",
        "answer": "<h4>Part-to-Whole</h4><p>Proportions of a whole. Limit to 3-5 slices.</p>"
    },
    {
        "number": 6,
        "difficulty": "hard",
        "question": "Explain the 'Data-Ink Ratio'.",
        "context": "Tufte's Principle",
        "answer": "<h4>Efficiency</h4><p>The proportion of ink used to display data vs total ink. Maximize this ratio.</p>"
    },
    {
        "number": 7,
        "difficulty": "medium",
        "question": "When is a Scatter Plot useful?",
        "context": "Relationships",
        "answer": "<h4>Correlation</h4><p>Showing the relationship between two numerical variables.</p>"
    },
    {
        "number": 8,
        "difficulty": "medium",
        "question": "What is a Heatmap?",
        "context": "Density",
        "answer": "<h4>Intensity</h4><p>Using color to represent value density in a matrix or map.</p>"
    },
    {
        "number": 9,
        "difficulty": "easy",
        "question": "Why avoid 3D charts?",
        "context": "Perception",
        "answer": "<h4>Distortion</h4><p>They distort perspective and make values hard to read.</p>"
    },
    {
        "number": 10,
        "difficulty": "hard",
        "question": "What is a Dual-Axis chart?",
        "context": "Advanced",
        "answer": "<h4>Two Scales</h4><p>Plotting two series with different units/scales. Can be misleading if not careful.</p>"
    },
    {
        "number": 11,
        "difficulty": "medium",
        "question": "What is a Histogram?",
        "context": "Distribution",
        "answer": "<h4>Frequency</h4><p>Shows the distribution of a continuous variable.</p>"
    },
    {
        "number": 12,
        "difficulty": "medium",
        "question": "Difference between Histogram and Bar Chart?",
        "context": "Data Type",
        "answer": "<h4>Continuous vs Categorical</h4><p>Histogram for continuous ranges, Bar Chart for discrete categories.</p>"
    },
    {
        "number": 13,
        "difficulty": "easy",
        "question": "What is a Dashboard?",
        "context": "Overview",
        "answer": "<h4>At a Glance</h4><p>A visual display of key metrics on a single screen.</p>"
    },
    {
        "number": 14,
        "difficulty": "hard",
        "question": "What is Pre-attentive Processing?",
        "context": "Cognition",
        "answer": "<h4>Subconscious</h4><p>Visual attributes (color, size) processed instantly without conscious effort.</p>"
    },
    {
        "number": 15,
        "difficulty": "medium",
        "question": "What is a Box Plot (Box and Whisker)?",
        "context": "Statistics",
        "answer": "<h4>Spread</h4><p>Shows median, quartiles, and outliers.</p>"
    },
    {
        "number": 16,
        "difficulty": "medium",
        "question": "When to use a Stacked Bar Chart?",
        "context": "Composition",
        "answer": "<h4>Total + Part</h4><p>Comparing totals and their composition across groups.</p>"
    },
    {
        "number": 17,
        "difficulty": "easy",
        "question": "What is a KPI?",
        "context": "Metrics",
        "answer": "<h4>Key Performance Indicator</h4><p>A measurable value that demonstrates how effectively a company is achieving key business objectives.</p>"
    },
    {
        "number": 18,
        "difficulty": "medium",
        "question": "What is a Bullet Graph?",
        "context": "Performance",
        "answer": "<h4>Target vs Actual</h4><p>Variation of a bar graph to show performance against a target.</p>"
    },
    {
        "number": 19,
        "difficulty": "hard",
        "question": "Describe 'Gestalt Principles' in visualization.",
        "context": "Psychology",
        "answer": "<h4>Perception</h4><p>How humans perceive patterns (Proximity, Similarity, Enclosure).</p>"
    },
    {
        "number": 20,
        "difficulty": "easy",
        "question": "What color palette for categorical data?",
        "context": "Color",
        "answer": "<h4>Qualitative</h4><p>Distinct colors for each category.</p>"
    },
    {
        "number": 21,
        "difficulty": "medium",
        "question": "What color palette for low-to-high values?",
        "context": "Color",
        "answer": "<h4>Sequential</h4><p>Light to dark shade of one color.</p>"
    },
    {
        "number": 22,
        "difficulty": "medium",
        "question": "What color palette for positive/negative values?",
        "context": "Color",
        "answer": "<h4>Diverging</h4><p>Two contrasting colors meeting at a neutral midpoint.</p>"
    },
    {
        "number": 23,
        "difficulty": "hard",
        "question": "What is a Sankey Diagram?",
        "context": "Flow",
        "answer": "<h4>Flows</h4><p>Visualizing flow magnitude between nodes.</p>"
    },
    {
        "number": 24,
        "difficulty": "medium",
        "question": "What is a Treemap?",
        "context": "Hierarchy",
        "answer": "<h4>Nested Rectangles</h4><p>Hierarchical data represented by nested rectangles sized by value.</p>"
    },
    {
        "number": 25,
        "difficulty": "easy",
        "question": "Why is sorting bars important?",
        "context": "Readability",
        "answer": "<h4>Comparison</h4><p>Sorting (e.g., descending) makes it easier to compare rank and value.</p>"
    }
]
    },

    excel: {
        title: "Excel & Spreadsheets",
        lessons: [
    {
        "number": 1,
        "title": "Excel Interface",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The universal language of business. Even with Python and SQL, Excel is where final decisions are often presented.</p>\n    "
    },
    {
        "number": 2,
        "title": "Basic Formulas",
        "content": "\n        <h4>1. The Big 4</h4>\n        <p><code>=SUM()</code>, <code>=AVERAGE()</code>, <code>=COUNT()</code>, <code>=MAX()</code>.</p>\n        <h4>2. Pro Tip</h4>\n        <p>Use <code>Alt + =</code> to auto-sum a column instantly.</p>\n    "
    },
    {
        "number": 3,
        "title": "Cell Referencing",
        "content": "\n        <h4>1. Relative vs Absolute</h4>\n        <p>The difference between <code>A1</code> and <code>$A$1</code>.</p>\n        <ul>\n            <li><strong>A1 (Relative):</strong> Updates when you drag the formula.</li>\n            <li><strong>$A$1 (Absolute):</strong> Locks the cell. Use for constants like Tax Rate.</li>\n        </ul>\n    "
    },
    {
        "number": 4,
        "title": "Functions (Logic)",
        "content": "\n        <h4>1. IF Statement</h4>\n        <p><code>=IF(logic, value_if_true, value_if_false)</code></p>\n        <h4>2. Nested IFs</h4>\n        <p>Use <code>IFS()</code> in modern Excel to avoid messy nesting.</p>\n    "
    },
    {
        "number": 5,
        "title": "VLOOKUP and XLOOKUP",
        "content": "\n        <h4>1. The Interview Question</h4>\n        <p>\"Do you know VLOOKUP?\" is the standard Excel interview question.</p>\n        <h4>2. XLOOKUP</h4>\n        <p>The modern successor. It can look left, defaults to exact match, and handles errors.</p>\n        <p><code>=XLOOKUP(lookup_val, lookup_array, return_array)</code></p>\n    "
    },
    {
        "number": 6,
        "title": "Pivot Tables",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The most powerful feature in Excel. Summarize 100,000 rows in 5 seconds without formulas.</p>\n        <h4>2. The 4 Areas</h4>\n        <ul>\n            <li><strong>Rows:</strong> What you want to group by.</li>\n            <li><strong>Values:</strong> What you want to calculate (Sum, Count).</li>\n            <li><strong>Columns:</strong> Secondary grouping (Matrix view).</li>\n            <li><strong>Filters:</strong> Global exclusions.</li>\n        </ul>\n    "
    },
    {
        "number": 7,
        "title": "Charts in Excel",
        "content": "\n        <h4>1. Quick Charts</h4>\n        <p>Select data and press <code>Alt + F1</code>.</p>\n        <h4>2. Formatting</h4>\n        <p>Remove gridlines and add data labels for a cleaner look.</p>\n    "
    },
    {
        "number": 8,
        "title": "Data Validation",
        "content": "\n        <h4>1. Dropdown Lists</h4>\n        <p>Force users to select from a list (e.g., \"Yes/No\", \"Dept A/Dept B\"). Keeps data clean at entry.</p>\n    "
    },
    {
        "number": 9,
        "title": "Power Query Basics",
        "content": "\n        <h4>1. What is it?</h4>\n        <p>ETL for Excel. It records your cleanup steps (remove rows, split columns) so you can re-apply them next month with one click.</p>\n    "
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "easy",
        "question": "What symbol starts every formula?",
        "context": "Basics",
        "answer": "<h4>Equals Sign</h4><p>=</p>"
    },
    {
        "number": 2,
        "difficulty": "easy",
        "question": "How to fix column width automatically?",
        "context": "Formatting",
        "answer": "<h4>AutoFit</h4><p>Double click the boundary between column headers.</p>"
    },
    {
        "number": 3,
        "difficulty": "medium",
        "question": "What is VLOOKUP?",
        "context": "Functions",
        "answer": "<h4>Vertical Lookup</h4><p>Searches for a value in the first column and returns a value in the same row.</p>"
    },
    {
        "number": 4,
        "difficulty": "medium",
        "question": "Difference between Relative and Absolute reference?",
        "context": "References",
        "answer": "<h4>Locking</h4><p>Relative (A1) changes when copied. Absolute ($A$1) stays fixed.</p>"
    },
    {
        "number": 5,
        "difficulty": "hard",
        "question": "What is Index-Match?",
        "context": "Advanced",
        "answer": "<h4>Superior Lookup</h4><p>Combination of INDEX and MATCH functions. More flexible than VLOOKUP (can look left).</p>"
    },
    {
        "number": 6,
        "difficulty": "easy",
        "question": "Shortcut for 'Paste Special'?",
        "context": "Productivity",
        "answer": "<h4>Ctrl+Alt+V</h4><p>Allows pasting values, formats, etc.</p>"
    },
    {
        "number": 7,
        "difficulty": "medium",
        "question": "What is a Pivot Table?",
        "context": "Analysis",
        "answer": "<h4>Summarization</h4><p>Tool to summarize, analyze, explore, and present data.</p>"
    },
    {
        "number": 8,
        "difficulty": "easy",
        "question": "How to freeze panes?",
        "context": "View",
        "answer": "<h4>View Tab</h4><p>View > Freeze Panes to keep headers visible.</p>"
    },
    {
        "number": 9,
        "difficulty": "medium",
        "question": "What is Conditional Formatting?",
        "context": "Visuals",
        "answer": "<h4>Rules</h4><p>Changing cell appearance based on its value (e.g., color scales).</p>"
    },
    {
        "number": 10,
        "difficulty": "hard",
        "question": "What is an Array Formula?",
        "context": "Advanced",
        "answer": "<h4>Multi-Cell</h4><p>Performs calculations on multiple items in an array. (CSE: Ctrl+Shift+Enter).</p>"
    },
    {
        "number": 11,
        "difficulty": "easy",
        "question": "Function to count non-empty cells?",
        "context": "Counting",
        "answer": "<h4>COUNTA</h4><p>Counts cells that are not empty.</p>"
    },
    {
        "number": 12,
        "difficulty": "medium",
        "question": "How to remove duplicates?",
        "context": "Data Cleaning",
        "answer": "<h4>Data Tab</h4><p>Data > Remove Duplicates.</p>"
    },
    {
        "number": 13,
        "difficulty": "medium",
        "question": "What does IFERROR do?",
        "context": "Error Handling",
        "answer": "<h4>Catch Errors</h4><p>Returns a custom value if a formula allows an error.</p>"
    },
    {
        "number": 14,
        "difficulty": "easy",
        "question": "How to concatenate strings?",
        "context": "Text",
        "answer": "<h4>& or CONCAT</h4><p>=A1 & \" \" & B1</p>"
    },
    {
        "number": 15,
        "difficulty": "hard",
        "question": "What is a Macro?",
        "context": "Automation",
        "answer": "<h4>VBA</h4><p>Recording of steps to automate repetitive tasks.</p>"
    },
    {
        "number": 16,
        "difficulty": "medium",
        "question": "What is Goal Seek?",
        "context": "What-If",
        "answer": "<h4>Reverse Solve</h4><p>Finding the input value needed to get a specific result.</p>"
    },
    {
        "number": 17,
        "difficulty": "easy",
        "question": "Function to get today's date?",
        "context": "Date",
        "answer": "<h4>TODAY()</h4><p>Returns current date.</p>"
    },
    {
        "number": 18,
        "difficulty": "medium",
        "question": "How to split text to columns?",
        "context": "Data Cleaning",
        "answer": "<h4>Text to Columns</h4><p>Splits cell content based on delimiter (comma, space).</p>"
    },
    {
        "number": 19,
        "difficulty": "expert",
        "question": "What is Power Query?",
        "context": "ETL",
        "answer": "<h4>Get & Transform</h4><p>Engine to connect, combine, and refine data sources.</p>"
    },
    {
        "number": 20,
        "difficulty": "medium",
        "question": "Diff between COUNT and COUNTIF?",
        "context": "Counting",
        "answer": "<h4>Condition</h4><p>COUNT counts numbers. COUNTIF counts based on criteria.</p>"
    },
    {
        "number": 21,
        "difficulty": "easy",
        "question": "How to sum a range?",
        "context": "Math",
        "answer": "<h4>SUM</h4><p>=SUM(range)</p>"
    },
    {
        "number": 22,
        "difficulty": "medium",
        "question": "What is Data Validation?",
        "context": "Input Control",
        "answer": "<h4>Restrictions</h4><p>Restricting what users can enter (e.g., Dropdown lists).</p>"
    },
    {
        "number": 23,
        "difficulty": "hard",
        "question": "What is XLOOKUP?",
        "context": "Functions",
        "answer": "<h4>Modern VLOOKUP</h4><p>Newer, more powerful replacement for VLOOKUP/HLOOKUP.</p>"
    },
    {
        "number": 24,
        "difficulty": "easy",
        "question": "Shortcut to format as currency?",
        "context": "Formatting",
        "answer": "<h4>Ctrl+Shift+$</h4><p>Applies currency format.</p>"
    },
    {
        "number": 25,
        "difficulty": "medium",
        "question": "How to calculate average?",
        "context": "Math",
        "answer": "<h4>AVERAGE</h4><p>=AVERAGE(range)</p>"
    },
    {
        "number": 26,
        "difficulty": "hard",
        "question": "What is a Slicer?",
        "context": "Dashboards",
        "answer": "<h4>Visual Filter</h4><p>Button-based filter for PivotTables.</p>"
    },
    {
        "number": 27,
        "difficulty": "medium",
        "question": "How to transpose data?",
        "context": "Paste",
        "answer": "<h4>Swap Rows/Cols</h4><p>Paste Special > Transpose.</p>"
    },
    {
        "number": 28,
        "difficulty": "easy",
        "question": "Function to find max value?",
        "context": "Math",
        "answer": "<h4>MAX</h4><p>=MAX(range)</p>"
    },
    {
        "number": 29,
        "difficulty": "medium",
        "question": "What is Flash Fill?",
        "context": "Automation",
        "answer": "<h4>Pattern Match</h4><p>Automatically fills data when it senses a pattern (Ctrl+E).</p>"
    },
    {
        "number": 30,
        "difficulty": "hard",
        "question": "What is a Sparkline?",
        "context": "Charts",
        "answer": "<h4>Mini Chart</h4><p>A tiny chart in a worksheet cell.</p>"
    }
]
    },

    business: {
        title: "Business Intelligence",
        lessons: [
    {
        "number": 1,
        "title": "What is Business Intelligence?",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Converting raw data into actionable strategic knowledge. It connects the \"What\" (Data) to the \"So What?\" (Business Value).</p>\n    "
    },
    {
        "number": 2,
        "title": "Key Performance Indicators (KPIs)",
        "content": "\n        <h4>1. Metric vs KPI</h4>\n        <p>All KPIs are metrics, but not all metrics are KPIs. A KPI is a metric that is critical to the core business strategy.</p>\n        <p><em>Example:</em> \"Facebook Likes\" is a vanity metric. \"Customer Acquisition Cost\" is a KPI.</p>\n    "
    },
    {
        "number": 3,
        "title": "The Analytics Lifecycle",
        "content": "\n        <h4>1. The 4 Levels</h4>\n        <ul>\n            <li><strong>Descriptive:</strong> What happened?</li>\n            <li><strong>Diagnostic:</strong> Why did it happen?</li>\n            <li><strong>Predictive:</strong> What will happen?</li>\n            <li><strong>Prescriptive:</strong> How can we make it happen?</li>\n        </ul>\n    "
    },
    {
        "number": 4,
        "title": "Data Warehousing",
        "content": "\n        <h4>1. Concept</h4>\n        <p>A central repository covering the whole enterprise. The \"Single Source of Truth.\"</p>\n        <h4>2. OLAP vs OLTP</h4>\n        <p>Warehouses are OLAP (Analytics - Fast reading). Databases are often OLTP (Transactions - Fast writing).</p>\n    "
    },
    {
        "number": 5,
        "title": "Dimensional Modeling",
        "content": "\n        <h4>1. Star Schema</h4>\n        <p>The standard design for BI.</p>\n        <ul>\n            <li><strong>Fact Table:</strong> Center. Contains numbers (Sales, Qty) and keys.</li>\n            <li><strong>Dimension Tables:</strong> Spines. Contain context (Who, Where, When).</li>\n        </ul>\n    "
    },
    {
        "number": 6,
        "title": "Self-Service BI",
        "content": "\n        <h4>1. Democratization</h4>\n        <p>Moving away from \"Call IT for a report\" to enabling business users to build their own dashboards (Tableau, Looker).</p>\n    "
    },
    {
        "number": 7,
        "title": "Data Governance",
        "content": "\n        <h4>1. The Rules</h4>\n        <p>Who owns the data? Who can see it? Is it accurate? Without governance, you have \"Data Swamps\" instead of Data Lakes.</p>\n    "
    },
    {
        "number": 8,
        "title": "Requirement Gathering",
        "content": "\n        <h4>1. The Soft Skill</h4>\n        <p>Don't just build what they ask for. Build what they need. Ask \"What decision will you make with this number?\"</p>\n    "
    },
    {
        "number": 9,
        "title": "Metric Definition",
        "content": "\n        <h4>1. Chaos Prevention</h4>\n        <p>Does \"Churn\" mean cancelling subscription or just pausing? Defining these terms across the company is hard but vital.</p>\n    "
    },
    {
        "number": 10,
        "title": "Root Cause Analysis",
        "content": "\n        <h4>1. The 5 Whys</h4>\n        <p>Ask \"Why\" 5 times to get to the root.</p>\n        <p>Sales down -> Why? Leads down -> Why? Website traffic down -> Why? Server error -> Why? Bad depolyment.</p>\n    "
    },
    {
        "number": 11,
        "title": "Decision Making",
        "content": "\n        <h4>1. Data Driven vs Data Informed</h4>\n        <p>Data should guide decisions, but context and intuition still matter. Don't follow a metric into a cliff.</p>\n    "
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "easy",
        "question": "What does BI stand for?",
        "context": "Definitions",
        "answer": "<h4>Business Intelligence</h4><p>Strategies and technologies for analyzing business data.</p>"
    },
    {
        "number": 2,
        "difficulty": "easy",
        "question": "What is a Metric?",
        "context": "Definitions",
        "answer": "<h4>Measurement</h4><p>A quantitative measurement of data.</p>"
    },
    {
        "number": 3,
        "difficulty": "medium",
        "question": "Metric vs KPI?",
        "context": "Concepts",
        "answer": "<h4>Importance</h4><p>All KPIs are metrics, but not all metrics are KPIs. KPIs differ by measuring critical business goals.</p>"
    },
    {
        "number": 4,
        "difficulty": "hard",
        "question": "Leading vs Lagging Indicators?",
        "context": "KPIs",
        "answer": "<h4>Prediction</h4><p>Lagging looks back (Revenue). Leading predicts future (Pipeline, Site Traffic).</p>"
    },
    {
        "number": 5,
        "difficulty": "medium",
        "question": "What is ETL?",
        "context": "Data Eng",
        "answer": "<h4>Extract, Transform, Load</h4><p>Process of moving data from source to warehouse.</p>"
    },
    {
        "number": 6,
        "difficulty": "medium",
        "question": "What is Churn Rate?",
        "context": "SaaS Metrics",
        "answer": "<h4>Attrition</h4><p>Percentage of customers who stop using a service.</p>"
    },
    {
        "number": 7,
        "difficulty": "medium",
        "question": "What is CAC?",
        "context": "Marketing",
        "answer": "<h4>Customer Acquisition Cost</h4><p>Total cost to acquire a new customer.</p>"
    },
    {
        "number": 8,
        "difficulty": "medium",
        "question": "What is LTV (or CLV)?",
        "context": "Marketing",
        "answer": "<h4>Lifetime Value</h4><p>Total revenue expected from a customer over their lifetime.</p>"
    },
    {
        "number": 9,
        "difficulty": "hard",
        "question": "What is a Star Schema?",
        "context": "Modeling",
        "answer": "<h4>Structure</h4><p>Database schema with central fact table connected to dimension tables.</p>"
    },
    {
        "number": 10,
        "difficulty": "easy",
        "question": "What is ROI?",
        "context": "Finance",
        "answer": "<h4>Return on Investment</h4><p>(Net Profit / Cost of Investment) x 100.</p>"
    },
    {
        "number": 11,
        "difficulty": "medium",
        "question": "What is Data Granularity?",
        "context": "Data",
        "answer": "<h4>Detail Level</h4><p>The level of detail in the data (e.g., daily vs monthly).</p>"
    },
    {
        "number": 12,
        "difficulty": "hard",
        "question": "Explain 'Drill Down'.",
        "context": "Analysis",
        "answer": "<h4>Detail</h4><p>Navigating from high-level summary to detailed data.</p>"
    },
    {
        "number": 13,
        "difficulty": "easy",
        "question": "What is a Funnel?",
        "context": "Analysis",
        "answer": "<h4>Stages</h4><p>Series of steps a user takes towards a goal.</p>"
    },
    {
        "number": 14,
        "difficulty": "medium",
        "question": "What is Seasonality?",
        "context": "Trends",
        "answer": "<h4>Cycles</h4><p>Periodic fluctuations in data (e.g., holiday sales).</p>"
    },
    {
        "number": 15,
        "difficulty": "hard",
        "question": "What is Cohort Analysis?",
        "context": "Analysis",
        "answer": "<h4>Groups</h4><p>Analyzing behavior of groups (cohorts) over time.</p>"
    },
    {
        "number": 16,
        "difficulty": "medium",
        "question": "What is a Data Warehouse?",
        "context": "Storage",
        "answer": "<h4>Repository</h4><p>Central repository for aggregated data from disparate sources.</p>"
    },
    {
        "number": 17,
        "difficulty": "easy",
        "question": "What is Reporting?",
        "context": "Output",
        "answer": "<h4>Presentation</h4><p>Organizing data into informational summaries.</p>"
    },
    {
        "number": 18,
        "difficulty": "medium",
        "question": "What is Ad-Hoc Analysis?",
        "context": "Analysis",
        "answer": "<h4>On-Demand</h4><p>Analysis designed to answer a specific, single business question.</p>"
    },
    {
        "number": 19,
        "difficulty": "hard",
        "question": "What is Data Governance?",
        "context": "Management",
        "answer": "<h4>Policy</h4><p>Management of data availability, usability, integrity, and security.</p>"
    },
    {
        "number": 20,
        "difficulty": "medium",
        "question": "What is YoY?",
        "context": "Comparison",
        "answer": "<h4>Year over Year</h4><p>Comparing stats from one period to the same period the previous year.</p>"
    },
    {
        "number": 21,
        "difficulty": "easy",
        "question": "What is a Stakeholder?",
        "context": "Business",
        "answer": "<h4>Interested Party</h4><p>Anyone with an interest or concern in the outcome.</p>"
    },
    {
        "number": 22,
        "difficulty": "medium",
        "question": " What is Conversion Rate?",
        "context": "Metrics",
        "answer": "<h4>Success</h4><p>(Conversions / Total Visitors) x 100.</p>"
    },
    {
        "number": 23,
        "difficulty": "hard",
        "question": "What is a Fact Table?",
        "context": "Modeling",
        "answer": "<h4>Measurements</h4><p>Table in star schema containing the quantitative data (metrics).</p>"
    },
    {
        "number": 24,
        "difficulty": "medium",
        "question": "What is a Dimension Table?",
        "context": "Modeling",
        "answer": "<h4>Descriptive</h4><p>Table containing descriptive attributes (who, what, where) related to facts.</p>"
    },
    {
        "number": 25,
        "difficulty": "easy",
        "question": "What is Margin?",
        "context": "Finance",
        "answer": "<h4>Profit</h4><p>Difference between selling price and cost.</p>"
    },
    {
        "number": 26,
        "difficulty": "medium",
        "question": "What is ARPU?",
        "context": "Metrics",
        "answer": "<h4>Average Revenue Per User</h4><p>Total Revenue / Number of Users.</p>"
    },
    {
        "number": 27,
        "difficulty": "hard",
        "question": "What is Predictive Analytics?",
        "context": "Advanced",
        "answer": "<h4>Forecasting</h4><p>Using historical data to predict future outcomes.</p>"
    },
    {
        "number": 28,
        "difficulty": "medium",
        "question": "What is Market Share?",
        "context": "Business",
        "answer": "<h4>Dominance</h4><p>Percentage of an industry's total sales earned by a particular company.</p>"
    },
    {
        "number": 29,
        "difficulty": "easy",
        "question": "What is Budget vs Actual?",
        "context": "Finance",
        "answer": "<h4>Variance</h4><p>Comparing planned spend vs real spend.</p>"
    },
    {
        "number": 30,
        "difficulty": "medium",
        "question": "What is Retention Rate?",
        "context": "Metrics",
        "answer": "<h4>Loyalty</h4><p>Percentage of customers retained over a period.</p>"
    },
    {
        "number": 31,
        "difficulty": "hard",
        "question": "What is Self-Service BI?",
        "context": "Trends",
        "answer": "<h4>Autonomy</h4><p>Tools allowing end users to access and analyze data without IT analysis.</p>"
    },
    {
        "number": 32,
        "difficulty": "easy",
        "question": "What is Raw Data?",
        "context": "Data",
        "answer": "<h4>Unprocessed</h4><p>Data that has not been processed for use.</p>"
    },
    {
        "number": 33,
        "difficulty": "medium",
        "question": "What is Data Latency?",
        "context": "Performance",
        "answer": "<h4>Delay</h4><p>Time taken for data to become available for analysis.</p>"
    },
    {
        "number": 34,
        "difficulty": "hard",
        "question": "What is Normalization?",
        "context": "Database",
        "answer": "<h4>Organization</h4><p>Structuring a database to reduce redundancy.</p>"
    },
    {
        "number": 35,
        "difficulty": "medium",
        "question": "What is Benchmarking?",
        "context": "Analysis",
        "answer": "<h4>Comparison</h4><p>Comparing performance against standards or peers.</p>"
    }
]
    }
};
