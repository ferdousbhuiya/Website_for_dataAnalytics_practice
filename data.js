// ===== Data Structure for All Topics =====

const legacyTopicsData = {
    sql: {
        title: "SQL Fundamentals & Advanced",
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
    },
    {
        "number": 13,
        "title": "Advanced Window Functions: Frame Clauses",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Frame clauses define the subset of rows within a partition that a window function considers. They enable calculations like moving averages, cumulative sums with complex boundaries.</p>\n        \n        <h4>2. Frame Types</h4>\n        <pre><code>-- ROWS BETWEEN\nROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING\n\n-- RANGE BETWEEN\nRANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW\n\n-- GROUPS BETWEEN (PostgreSQL 11+)\nGROUPS BETWEEN 1 PRECEDING AND 1 FOLLOWING</code></pre>\n        \n        <h4>3. Advanced Business Scenario</h4>\n        <p><strong>Task:</strong> Calculate a 7-day moving average excluding weekends and holidays.</p>\n        <pre><code>WITH business_days AS (\n    SELECT date, sales,\n           SUM(CASE WHEN is_business_day = 1 THEN 1 ELSE 0 END) \n             OVER (ORDER BY date) as business_day_counter\n    FROM sales_data\n    WHERE is_business_day = 1\n)\nSELECT date, sales,\n       AVG(sales) OVER (\n           ORDER BY business_day_counter\n           RANGE BETWEEN 6 PRECEDING AND CURRENT ROW\n       ) as moving_avg_7bd\nFROM business_days;</code></pre>\n        \n        <h4>4. Performance Implications</h4>\n        <p>Frame clauses can significantly impact query performance. Use <code>ROWS</code> for fast, exact boundaries; <code>RANGE</code> for logical boundaries but potentially slower.</p>\n      "
    },
    {
        "number": 14,
        "title": "Recursive CTEs and Hierarchical Queries",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Recursive CTEs enable querying hierarchical or graph-structured data in SQL, such as organizational charts, bill of materials, or network paths.</p>\n        \n        <h4>2. Anatomy of Recursive CTE</h4>\n        <pre><code>WITH RECURSIVE hierarchy AS (\n    -- Anchor member (base case)\n    SELECT id, parent_id, name, 1 as level\n    FROM employees\n    WHERE parent_id IS NULL\n    \n    UNION ALL\n    \n    -- Recursive member\n    SELECT e.id, e.parent_id, e.name, h.level + 1\n    FROM employees e\n    JOIN hierarchy h ON e.parent_id = h.id\n)\nSELECT * FROM hierarchy;</code></pre>\n        \n        <h4>3. Advanced Applications</h4>\n        <ul>\n            <li><strong>Path enumeration:</strong> Finding all paths in a graph</li>\n            <li><strong>BOM explosion:</strong> Calculating total component costs</li>\n            <li><strong>Transitive closure:</strong> Finding all indirect relationships</li>\n        </ul>\n        \n        <h4>4. Performance & Limitations</h4>\n        <p>Recursive CTEs can be expensive. Always include termination conditions and consider depth limits. Some databases support <code>MAXRECURSION</code> hints.</p>\n      "
    },
    {
        "number": 15,
        "title": "Materialized Views and Query Optimization",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Materialized Views store pre-computed query results physically, trading storage for query speed. Essential for dashboards and aggregated reporting.</p>\n        \n        <h4>2. Creation and Refresh</h4>\n        <pre><code>-- Create materialized view\nCREATE MATERIALIZED VIEW daily_sales_summary AS\nSELECT date,\n       store_id,\n       SUM(amount) as total_sales,\n       COUNT(*) as transaction_count,\n       AVG(amount) as avg_transaction\nFROM transactions\nGROUP BY date, store_id\nWITH DATA;\n\n-- Refresh strategies\nREFRESH MATERIALIZED VIEW daily_sales_summary; -- Full refresh\nREFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales_summary; -- Concurrent (PostgreSQL)</code></pre>\n        \n        <h4>3. Indexing Materialized Views</h4>\n        <p>Create specialized indexes on materialized views for even faster access:</p>\n        <pre><code>CREATE UNIQUE INDEX idx_mv_sales_date_store \nON daily_sales_summary(date, store_id);\n\nCREATE INDEX idx_mv_sales_total \nON daily_sales_summary(total_sales DESC);</code></pre>\n        \n        <h4>4. Strategic Use Cases</h4>\n        <p>Use materialized views when:</p>\n        <ul>\n            <li>Query patterns are predictable</li>\n            <li>Data changes less frequently than queries</li>\n            <li>Real-time data isn't required</li>\n            <li>Complex aggregations are repeatedly calculated</li>\n        </ul>\n      "
    },
    {
        "number": 16,
        "title": "Advanced JSON/XML Processing in SQL",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Modern SQL databases support semi-structured data processing. JSON and XML functions allow relational databases to handle document data effectively.</p>\n        \n        <h4>2. JSON Functions (PostgreSQL/MySQL)</h4>\n        <pre><code>-- Extract and manipulate JSON\nSELECT \n    data->>'customer_name' as name,\n    (data->>'purchase_amount')::numeric as amount,\n    jsonb_array_length(data->'items') as item_count,\n    jsonb_path_query(data, '$.items[*] ? (@.price > 100)') as expensive_items\nFROM orders_json\nWHERE data @> '{\"status\": \"completed\"}';\n\n-- Create JSON from relational data\nSELECT jsonb_agg(\n    jsonb_build_object(\n        'id', customer_id,\n        'name', customer_name,\n        'orders', (\n            SELECT jsonb_agg(jsonb_build_object('order_id', order_id, 'amount', amount))\n            FROM orders o WHERE o.customer_id = c.customer_id\n        )\n    )\n) as customer_report\nFROM customers c;</code></pre>\n        \n        <h4>3. Performance Considerations</h4>\n        <p>JSON processing can be CPU-intensive. Create GIN indexes for JSONB columns:</p>\n        <pre><code>CREATE INDEX idx_orders_jsonb ON orders_json USING GIN (data jsonb_path_ops);</code></pre>\n        \n        <h4>4. Hybrid Relational-Document Strategy</h4>\n        <p>Store structured data in columns, semi-structured in JSON, with constraints:</p>\n        <pre><code>CREATE TABLE hybrid_orders (\n    order_id SERIAL PRIMARY KEY,\n    customer_id INT REFERENCES customers(customer_id),\n    order_date TIMESTAMP NOT NULL,\n    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'cancelled')),\n    metadata JSONB, -- Flexible attributes\n    items JSONB CHECK (jsonb_typeof(items) = 'array'),\n    CONSTRAINT valid_json CHECK (metadata IS NULL OR jsonb_valid(metadata))\n);</code></pre>\n      "
    },
    {
        "number": 17,
        "title": "Advanced Partitioning Strategies",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Partitioning splits large tables into smaller, manageable pieces while maintaining logical unity. Critical for billion-row datasets.</p>\n        \n        <h4>2. Partitioning Types</h4>\n        <pre><code>-- Range partitioning (PostgreSQL 10+)\nCREATE TABLE sales (\n    sale_id BIGSERIAL,\n    sale_date DATE NOT NULL,\n    amount DECIMAL(10,2),\n    region VARCHAR(50)\n) PARTITION BY RANGE (sale_date);\n\nCREATE TABLE sales_2024_q1 PARTITION OF sales\nFOR VALUES FROM ('2024-01-01') TO ('2024-04-01');\n\nCREATE TABLE sales_2024_q2 PARTITION OF sales\nFOR VALUES FROM ('2024-04-01') TO ('2024-07-01');\n\n-- List partitioning\nCREATE TABLE customers (\n    customer_id BIGSERIAL,\n    country_code CHAR(2),\n    name VARCHAR(100)\n) PARTITION BY LIST (country_code);\n\nCREATE TABLE customers_us PARTITION OF customers\nFOR VALUES IN ('US');\n\n-- Hash partitioning\nCREATE TABLE log_events (\n    event_id UUID DEFAULT gen_random_uuid(),\n    user_id BIGINT,\n    event_time TIMESTAMP\n) PARTITION BY HASH (user_id);</code></pre>\n        \n        <h4>3. Advanced Partition Management</h4>\n        <pre><code>-- Automatic partition creation\nCREATE OR REPLACE FUNCTION create_monthly_partition()\nRETURNS trigger AS $$\nBEGIN\n    EXECUTE format(\n        'CREATE TABLE IF NOT EXISTS sales_%s PARTITION OF sales '\n        'FOR VALUES FROM (%L) TO (%L)',\n        to_char(NEW.sale_date, 'YYYY_MM'),\n        date_trunc('month', NEW.sale_date),\n        date_trunc('month', NEW.sale_date) + interval '1 month'\n    );\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\n-- Attach/detach partitions\nALTER TABLE sales DETACH PARTITION sales_2023_q4;\nALTER TABLE sales ATTACH PARTITION sales_2024_q1\nFOR VALUES FROM ('2024-01-01') TO ('2024-04-01');\n\n-- Partition pruning verification\nEXPLAIN (ANALYZE, VERBOSE)\nSELECT * FROM sales WHERE sale_date BETWEEN '2024-01-01' AND '2024-01-31';</code></pre>\n        \n        <h4>4. Partitioning Strategy Matrix</h4>\n        <table>\n            <tr><th>Data Pattern</th><th>Partition Type</th><th>Use Case</th></tr>\n            <tr><td>Time-series</td><td>Range</td><td>Sales, logs, metrics</td></tr>\n            <tr><td>Categorical</td><td>List</td><td>Geography, status, type</td></tr>\n            <tr><td>Uniform distribution</td><td>Hash</td><td>User data, sharding</td></tr>\n            <tr><td>Composite</td><td>Multi-level</td><td>Date + region combinations</td></tr>\n        </table>\n      "
    },
    {
        "number": 18,
        "title": "Query Performance Tuning: Execution Plans",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Understanding execution plans is critical for optimizing SQL performance. The plan reveals how the database executes your query.</p>\n        \n        <h4>2. Reading Execution Plans</h4>\n        <pre><code>-- Generate and analyze execution plan\nEXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT JSON)\nSELECT c.customer_name, \n       SUM(o.amount) as total_spent,\n       COUNT(o.order_id) as order_count\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_date >= CURRENT_DATE - INTERVAL '90 days'\nGROUP BY c.customer_id, c.customer_name\nHAVING SUM(o.amount) > 1000\nORDER BY total_spent DESC;\n\n-- Key metrics to examine:\n-- 1. Total Cost\n-- 2. Rows Removed by Filter\n-- 3. Buffers: shared hit/read\n-- 4. Planning Time vs Execution Time</code></pre>\n        \n        <h4>3. Common Performance Anti-Patterns</h4>\n        <ul>\n            <li><strong>Nested Loop Join</strong> on large tables without indexes</li>\n            <li><strong>Seq Scan</strong> on tables with millions of rows</li>\n            <li><strong>HashAggregate</strong> spilling to disk</li>\n            <li><strong>Materialize</strong> operations creating unnecessary temp tables</li>\n        </ul>\n        \n        <h4>4. Advanced Optimization Techniques</h4>\n        <pre><code>-- 1. Force specific join order\nSET join_collapse_limit = 1;\n\n-- 2. Use CTEs as optimization fences (PostgreSQL 12+)\nWITH customer_stats AS MATERIALIZED (\n    SELECT customer_id, SUM(amount) as total_spent\n    FROM orders\n    WHERE order_date >= CURRENT_DATE - INTERVAL '90 days'\n    GROUP BY customer_id\n    HAVING SUM(amount) > 1000\n)\nSELECT c.customer_name, cs.total_spent\nFROM customers c\nJOIN customer_stats cs ON c.customer_id = cs.customer_id;\n\n-- 3. Parallel query hints\nALTER TABLE orders SET (parallel_workers = 8);\nSET max_parallel_workers_per_gather = 4;\nSET parallel_setup_cost = 1000;\nSET parallel_tuple_cost = 0.1;</code></pre>\n        \n        <h4>5. Monitoring Long-Running Queries</h4>\n        <pre><code>-- Active queries with execution plans\nSELECT pid, \n       now() - query_start as duration,\n       query,\n       wait_event_type,\n       wait_event\nFROM pg_stat_activity \nWHERE state = 'active' \n  AND query NOT LIKE '%pg_stat_activity%'\nORDER BY duration DESC;\n\n-- Kill problematic queries\nSELECT pg_cancel_backend(pid); -- Graceful\nSELECT pg_terminate_backend(pid); -- Forceful</code></pre>\n      "
    },
    {
        "number": 19,
        "title": "Advanced Indexing Strategies",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Beyond basic B-tree indexes, modern databases offer specialized indexes for specific data patterns and query types.</p>\n        \n        <h4>2. Specialized Index Types</h4>\n        <pre><code>-- 1. BRIN (Block Range INdex) - For sorted data\nCREATE INDEX idx_sales_date_brin ON sales \nUSING brin(sale_date) WITH (pages_per_range = 128);\n\n-- 2. GIN (Generalized INverted) - For array/JSON/text search\nCREATE INDEX idx_products_tags_gin ON products \nUSING gin(tags);\nCREATE INDEX idx_documents_content_gin ON documents \nUSING gin(to_tsvector('english', content));\n\n-- 3. GiST (Generalized Search Tree) - For spatial/range data\nCREATE INDEX idx_locations_geo_gist ON locations \nUSING gist(geography(point));\n\n-- 4. SP-GiST (Space-Partitioned GiST) - For unbalanced data\nCREATE INDEX idx_ip_addresses_spgist ON network_logs \nUSING spgist(ip_address inet_ops);\n\n-- 5. Bloom filter indexes - For multi-column equality\nCREATE INDEX idx_customer_filters_bloom ON customers \nUSING bloom(country, status, segment) \nWITH (length=80, col1=2, col2=2, col3=2);</code></pre>\n        \n        <h4>3. Partial & Expression Indexes</h4>\n        <pre><code>-- Partial index (covering subset of data)\nCREATE INDEX idx_active_users ON users(email) \nWHERE status = 'active' AND last_login > CURRENT_DATE - INTERVAL '30 days';\n\n-- Expression index (index computed values)\nCREATE INDEX idx_lower_email ON users(LOWER(email));\nCREATE INDEX idx_order_year_month ON orders \n((EXTRACT(YEAR FROM order_date) * 100 + EXTRACT(MONTH FROM order_date)));\n\n-- Indexes with included columns (covering indexes)\nCREATE INDEX idx_orders_covering ON orders(customer_id, order_date) \nINCLUDE (amount, status, shipping_cost);</code></pre>\n        \n        <h4>4. Index Maintenance & Monitoring</h4>\n        <pre><code>-- Index usage statistics\nSELECT schemaname, tablename, indexname,\n       idx_scan as scans,\n       idx_tup_read as tuples_read,\n       idx_tup_fetch as tuples_fetched,\n       pg_size_pretty(pg_relation_size(indexname::regclass)) as size\nFROM pg_stat_user_indexes \nORDER BY idx_scan DESC;\n\n-- Index bloat detection\nSELECT schemaname, tablename, indexname,\n       pg_size_pretty(pg_relation_size(indexrelid)) as index_size,\n       pg_size_pretty(pg_relation_size(indrelid)) as table_size,\n       idx_scan as scans_last_interval\nFROM pg_stat_user_indexes \nWHERE idx_scan < 1000  -- Rarely used\n  AND pg_relation_size(indexrelid) > 100000000  -- Large (>100MB)\nORDER BY pg_relation_size(indexrelid) DESC;\n\n-- Reindex strategies\nREINDEX INDEX CONCURRENTLY idx_large_table; -- Non-blocking\nREINDEX TABLE CONCURRENTLY large_table; -- Table-level\nREINDEX DATABASE production_db; -- Database-level</code></pre>\n        \n        <h4>5. Advanced Indexing Patterns</h4>\n        <ul>\n            <li><strong>Composite Index Column Order:</strong> Equality columns first, range columns last</li>\n            <li><strong>Index-Only Scans:</strong> Ensure all SELECT columns are in index</li>\n            <li><strong>Bitmap Index Scans:</strong> Combine multiple indexes efficiently</li>\n            <li><strong>Index Skip Scan:</strong> For indexes with low cardinality leading columns</li>\n        </ul>\n      "
    },
    {
        "number": 20,
        "title": "SQL Security & Advanced Access Control",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Enterprise SQL security goes beyond basic GRANT/REVOKE, encompassing row-level security, data masking, and audit logging.</p>\n        \n        <h4>2. Row-Level Security (RLS)</h4>\n        <pre><code>-- Enable RLS on table\nALTER TABLE sales ENABLE ROW LEVEL SECURITY;\n\n-- Create policy for sales representatives\nCREATE POLICY sales_rep_policy ON sales\nFOR ALL\nTO sales_rep\nUSING (region_id IN (\n    SELECT region_id FROM sales_reps WHERE user_id = current_user\n));\n\n-- Create policy for managers (can see all in their region)\nCREATE POLICY manager_policy ON sales\nFOR ALL\nTO manager\nUSING (region_id IN (\n    SELECT region_id FROM managers WHERE user_id = current_user\n));\n\n-- Create policy for executives (can see everything)\nCREATE POLICY executive_policy ON sales\nFOR ALL\nTO executive\nUSING (true);</code></pre>\n        \n        <h4>3. Data Masking & Dynamic Data Masking</h4>\n        <pre><code>-- View with masked data\nCREATE VIEW masked_customers AS\nSELECT \n    customer_id,\n    CASE \n        WHEN current_user = 'finance_user' THEN email\n        ELSE regexp_replace(email, '(.).*@', '\\1***@')\n    END as masked_email,\n    CASE \n        WHEN current_user IN ('admin', 'finance_user') THEN ssn\n        ELSE '***-**-' || RIGHT(ssn, 4)\n    END as masked_ssn,\n    CASE \n        WHEN has_role('executive') THEN salary\n        WHEN has_role('hr') THEN \n            CASE \n                WHEN salary > 200000 THEN '200k+'\n                WHEN salary > 100000 THEN '100k-200k'\n                ELSE '<100k'\n            END\n        ELSE NULL\n    END as salary_info\nFROM customers;\n\n-- Column-level encryption\nCREATE EXTENSION IF NOT EXISTS pgcrypto;\n\nCREATE TABLE sensitive_data (\n    id SERIAL PRIMARY KEY,\n    plain_text TEXT,\n    encrypted_text BYTEA\n);\n\n-- Encrypt on insert\nINSERT INTO sensitive_data (plain_text, encrypted_text)\nVALUES (\n    'Secret Data',\n    pgp_sym_encrypt('Secret Data', 'encryption_key')\n);\n\n-- Decrypt on select (with proper permissions)\nSELECT id, \n       pgp_sym_decrypt(encrypted_text, 'encryption_key') as decrypted\nFROM sensitive_data\nWHERE current_user = 'authorized_user';</code></pre>\n        \n        <h4>4. Comprehensive Audit Logging</h4>\n        <pre><code>-- Create audit trigger\nCREATE TABLE audit_log (\n    audit_id BIGSERIAL PRIMARY KEY,\n    table_name TEXT NOT NULL,\n    operation CHAR(1) NOT NULL, -- I/U/D\n    old_data JSONB,\n    new_data JSONB,\n    changed_by TEXT DEFAULT current_user,\n    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    ip_address INET,\n    application_name TEXT\n);\n\nCREATE OR REPLACE FUNCTION audit_trigger()\nRETURNS TRIGGER AS $$\nBEGIN\n    IF TG_OP = 'INSERT' THEN\n        INSERT INTO audit_log (table_name, operation, new_data, ip_address)\n        VALUES (TG_TABLE_NAME, 'I', to_jsonb(NEW), inet_client_addr());\n        RETURN NEW;\n    ELSIF TG_OP = 'UPDATE' THEN\n        INSERT INTO audit_log (table_name, operation, old_data, new_data, ip_address)\n        VALUES (TG_TABLE_NAME, 'U', to_jsonb(OLD), to_jsonb(NEW), inet_client_addr());\n        RETURN NEW;\n    ELSIF TG_OP = 'DELETE' THEN\n        INSERT INTO audit_log (table_name, operation, old_data, ip_address)\n        VALUES (TG_TABLE_NAME, 'D', to_jsonb(OLD), inet_client_addr());\n        RETURN OLD;\n    END IF;\n    RETURN NULL;\nEND;\n$$ LANGUAGE plpgsql SECURITY DEFINER;\n\n-- Attach to sensitive tables\nCREATE TRIGGER audit_customers\nAFTER INSERT OR UPDATE OR DELETE ON customers\nFOR EACH ROW EXECUTE FUNCTION audit_trigger();\n\n-- Query audit log with temporal analysis\nWITH audit_changes AS (\n    SELECT changed_at::date as audit_date,\n           operation,\n           COUNT(*) as change_count,\n           COUNT(DISTINCT changed_by) as unique_users\n    FROM audit_log\n    WHERE table_name = 'customers'\n      AND changed_at >= CURRENT_DATE - INTERVAL '30 days'\n    GROUP BY changed_at::date, operation\n)\nSELECT audit_date,\n       SUM(CASE WHEN operation = 'I' THEN change_count ELSE 0 END) as inserts,\n       SUM(CASE WHEN operation = 'U' THEN change_count ELSE 0 END) as updates,\n       SUM(CASE WHEN operation = 'D' THEN change_count ELSE 0 END) as deletes,\n       MAX(unique_users) as peak_users\nFROM audit_changes\nGROUP BY audit_date\nORDER BY audit_date DESC;</code></pre>\n        \n        <h4>5. Advanced Permission Management</h4>\n        <pre><code>-- Role hierarchy with inheritance\nCREATE ROLE analyst NOINHERIT;\nCREATE ROLE senior_analyst INHERIT;\nCREATE ROLE manager INHERIT;\n\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;\nGRANT analyst TO senior_analyst; -- Senior gets analyst permissions\nGRANT senior_analyst TO manager; -- Manager gets senior + analyst permissions\n\n-- Column-level grants\nGRANT SELECT (customer_id, name, email) ON customers TO support_team;\nGRANT UPDATE (status, notes) ON orders TO customer_service;\n\n-- Time-based permissions\nCREATE OR REPLACE FUNCTION check_business_hours()\nRETURNS BOOLEAN AS $$\nBEGIN\n    RETURN EXTRACT(HOUR FROM CURRENT_TIME) BETWEEN 9 AND 17\n           AND EXTRACT(DOW FROM CURRENT_DATE) BETWEEN 1 AND 5;\nEND;\n$$ LANGUAGE plpgsql IMMUTABLE;\n\n-- Revoke after hours\nCREATE POLICY business_hours_only ON sensitive_operations\nFOR ALL\nTO staff\nUSING (check_business_hours());\n\n-- Session-based security\nSET ROLE read_only_user;\n-- All queries now run with restricted permissions\nRESET ROLE;</code></pre>\n      "
    },
    {
        "number": 21,
        "title": "Advanced Analytics: Machine Learning in SQL",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Modern databases incorporate machine learning capabilities directly in SQL, enabling predictive analytics without data movement.</p>\n        \n        <h4>2. PostgreSQL MADlib Integration</h4>\n        <pre><code>-- Install MADlib extension\nCREATE EXTENSION IF NOT EXISTS madlib;\n\n-- Linear regression for customer lifetime value prediction\nSELECT madlib.linregr_train(\n    'customer_features',          -- Source table\n    'clv_model',                  -- Output model table\n    'clv',                        -- Dependent variable\n    ARRAY['recency', 'frequency', 'monetary', 'tenure'] -- Features\n);\n\n-- Make predictions\nSELECT customer_id,\n       madlib.linregr_predict(\n           ARRAY[recency, frequency, monetary, tenure],\n           (SELECT coef FROM clv_model LIMIT 1)\n       ) as predicted_clv\nFROM customer_features\nWHERE predicted_clv > 1000;\n\n-- K-means clustering\nSELECT madlib.kmeans_random(\n    'customer_segments',          -- Source\n    'segment_result',             -- Output\n    ARRAY['annual_spend', 'purchase_frequency', 'avg_order_value'],\n    5,                            -- k clusters\n    'madlib.squared_dist_norm2',  -- Distance function\n    'madlib.avg',                 -- Aggregate function\n    20,                           -- Max iterations\n    0.001                         -- Convergence delta\n);\n\n-- Decision tree for churn prediction\nSELECT madlib.dtree_train(\n    'churn_training_data',\n    'churn_model',\n    'churned',                    -- Target variable\n    ARRAY['tenure', 'monthly_charges', 'contract_type', 'payment_method'],\n    'classification',\n    10,                           -- Max depth\n    5,                            -- Min split size\n    0.01                          -- Min info gain\n);</code></pre>\n        \n        <h4>3. Window Functions for Time Series Forecasting</h4>\n        <pre><code>-- Holt-Winters exponential smoothing (manual implementation)\nWITH recursive_smoothing AS (\n    SELECT \n        date,\n        sales,\n        sales as level,\n        CAST(0 AS NUMERIC) as trend,\n        0 as iteration\n    FROM daily_sales \n    WHERE date = (SELECT MIN(date) FROM daily_sales)\n    \n    UNION ALL\n    \n    SELECT \n        ds.date,\n        ds.sales,\n        -- Level smoothing: α * actual + (1-α) * (previous level + previous trend)\n        0.3 * ds.sales + 0.7 * (rs.level + rs.trend) as level,\n        -- Trend smoothing: β * (current level - previous level) + (1-β) * previous trend\n        0.2 * (0.3 * ds.sales + 0.7 * (rs.level + rs.trend) - rs.level) + 0.8 * rs.trend as trend,\n        rs.iteration + 1\n    FROM daily_sales ds\n    JOIN recursive_smoothing rs ON ds.date = rs.date + INTERVAL '1 day'\n    WHERE rs.iteration < 365\n)\nSELECT date,\n       sales,\n       level + trend as forecast,\n       level + trend * 7 as seven_day_forecast\nFROM recursive_smoothing;\n\n-- ARIMA-like calculations using window functions\nSELECT \n    date,\n    sales,\n    AVG(sales) OVER w as moving_avg,\n    STDDEV(sales) OVER w as moving_std,\n    sales - AVG(sales) OVER w as deviation,\n    CORR(sales, LAG(sales, 1) OVER w) OVER w as autocorrelation_1,\n    CORR(sales, LAG(sales, 7) OVER w) OVER w as autocorrelation_7\nFROM daily_sales\nWINDOW w AS (ORDER BY date ROWS BETWEEN 28 PRECEDING AND CURRENT ROW);</code></pre>\n        \n        <h4>4. Advanced Statistical Aggregations</h4>\n        <pre><code>-- Statistical summary with confidence intervals\nSELECT \n    product_category,\n    COUNT(*) as n,\n    AVG(price) as mean_price,\n    STDDEV(price) as stddev_price,\n    MADLIB.median(price) as median_price,\n    MIN(price) as min_price,\n    MAX(price) as max_price,\n    -- 95% confidence interval for mean\n    AVG(price) - 1.96 * STDDEV(price) / SQRT(COUNT(*)) as ci_lower,\n    AVG(price) + 1.96 * STDDEV(price) / SQRT(COUNT(*)) as ci_upper,\n    -- Skewness and kurtosis\n    MADLIB.skewness(price) as price_skewness,\n    MADLIB.kurtosis(price) as price_kurtosis\nFROM products\nGROUP BY product_category\nHAVING COUNT(*) > 30; -- Central Limit Theorem assumption\n\n-- Bayesian inference using SQL\nWITH prior AS (\n    SELECT 0.5 as conversion_rate_prior\n),\ndata AS (\n    SELECT \n        COUNT(*) as total_visitors,\n        SUM(CASE WHEN converted THEN 1 ELSE 0 END) as conversions\n    FROM ab_test_results\n    WHERE variant = 'B'\n),\nposterior AS (\n    SELECT \n        -- Beta distribution parameters: α = conversions + 1, β = non_conversions + 1\n        conversions + 1 as alpha,\n        (total_visitors - conversions) + 1 as beta\n    FROM data, prior\n)\nSELECT \n    alpha,\n    beta,\n    -- Expected value of Beta distribution: α/(α+β)\n    alpha::float / (alpha + beta) as expected_conversion_rate,\n    -- Probability that variant B is better than 5% baseline\n    1 - MADLIB.beta_cdf(0.05, alpha, beta) as prob_better_than_baseline\nFROM posterior;</code></pre>\n        \n        <h4>5. Graph Analytics with Recursive Queries</h4>\n        <pre><code>-- PageRank algorithm in SQL\nWITH RECURSIVE page_rank_iteration AS (\n    -- Initialization: equal probability for all pages\n    SELECT \n        page_id,\n        1.0 / (SELECT COUNT(*) FROM web_pages) as rank,\n        0 as iteration\n    FROM web_pages\n    \n    UNION ALL\n    \n    -- Iteration step\n    SELECT \n        links.destination_id,\n        -- PageRank formula: (1-d)/N + d * Σ(rank(source)/out_degree(source))\n        0.15 / (SELECT COUNT(*) FROM web_pages) + \n        0.85 * SUM(pr.rank / out_degree.out_count),\n        pr.iteration + 1\n    FROM page_rank_iteration pr\n    JOIN page_links links ON pr.page_id = links.source_id\n    JOIN (\n        SELECT source_id, COUNT(*) as out_count\n        FROM page_links\n        GROUP BY source_id\n    ) out_degree ON links.source_id = out_degree.source_id\n    WHERE pr.iteration < 20  -- Convergence iterations\n    GROUP BY links.destination_id, pr.iteration\n)\nSELECT page_id, rank\nFROM page_rank_iteration\nWHERE iteration = 20\nORDER BY rank DESC\nLIMIT 10;\n\n-- Community detection using label propagation\nWITH RECURSIVE label_propagation AS (\n    -- Initial labels (each node is its own community)\n    SELECT node_id, node_id as label, 0 as iteration\n    FROM graph_nodes\n    \n    UNION ALL\n    \n    -- Propagation step: each node adopts most frequent neighbor label\n    SELECT \n        n.node_id,\n        MODE() WITHIN GROUP (ORDER BY lp.label) as new_label,\n        lp.iteration + 1\n    FROM graph_nodes n\n    JOIN graph_edges e ON n.node_id = e.node1_id OR n.node_id = e.node2_id\n    JOIN label_propagation lp ON (e.node1_id = lp.node_id OR e.node2_id = lp.node_id)\n    WHERE lp.iteration < 10\n      AND lp.node_id != n.node_id\n    GROUP BY n.node_id, lp.iteration\n)\nSELECT label as community_id, \n       COUNT(DISTINCT node_id) as community_size,\n       ARRAY_AGG(node_id ORDER BY node_id) as members\nFROM label_propagation\nWHERE iteration = 10\nGROUP BY label\nHAVING COUNT(DISTINCT node_id) > 1\nORDER BY community_size DESC;</code></pre>\n      "
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
            },
            {
                number: 46,
                difficulty: "hard",
                question: "Design a recursive SQL query to find all possible flight paths between two cities with maximum 2 stops, avoiding routes longer than 48 hours total travel time.",
                context: "Tables: flights(flight_id, origin, destination, departure_time, arrival_time, airline), airports(airport_code, city, country)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH RECURSIVE flight_paths AS (
    -- Base case: Direct flights
    SELECT 
        origin,
        destination,
        ARRAY[flight_id] as path,
        ARRAY[origin, destination] as airports,
        departure_time,
        arrival_time,
        arrival_time - departure_time as travel_time,
        0 as stops
    FROM flights f
    WHERE origin = 'JFK'  -- Starting airport
    
    UNION ALL
    
    -- Recursive case: Add connecting flights
    SELECT 
        fp.origin,
        f.destination,
        fp.path || f.flight_id,
        fp.airports || f.destination,
        fp.departure_time,
        f.arrival_time,
        (f.arrival_time - fp.departure_time) as total_travel_time,
        fp.stops + 1
    FROM flight_paths fp
    JOIN flights f ON fp.destination = f.origin
    WHERE 
        -- Valid connection: minimum 1 hour, maximum 6 hours layover
        f.departure_time BETWEEN fp.arrival_time + INTERVAL '1 hour' 
                            AND fp.arrival_time + INTERVAL '6 hours'
        -- Don't revisit airports
        AND f.destination != ALL(fp.airports)
        -- Maximum 2 stops
        AND fp.stops < 2
        -- Total travel time less than 48 hours
        AND (f.arrival_time - fp.departure_time) < INTERVAL '48 hours'
),
final_destinations AS (
    SELECT 
        fp.origin,
        fp.destination,
        fp.path,
        fp.stops,
        fp.total_travel_time,
        ROW_NUMBER() OVER (
            PARTITION BY fp.destination 
            ORDER BY fp.total_travel_time, fp.stops
        ) as rank
    FROM flight_paths fp
    WHERE fp.destination = 'LAX'  -- Final destination
)
SELECT 
    fd.origin,
    fd.destination,
    fd.stops,
    fd.total_travel_time,
    -- Calculate layover times
    (SELECT f2.departure_time - f1.arrival_time
     FROM flights f1
     JOIN flights f2 ON f1.flight_id = fd.path[array_length(fd.path, 1)-1]
                    AND f2.flight_id = fd.path[array_length(fd.path, 1)]
     WHERE array_length(fd.path, 1) > 1) as final_layover,
    fd.path
FROM final_destinations fd
WHERE fd.rank <= 10
ORDER BY fd.total_travel_time, fd.stops;</code></pre>
                    
                    <h4>Optimization Techniques:</h4>
                    <ul>
                        <li><strong>Pruning:</strong> Early termination of paths exceeding constraints</li>
                        <li><strong>Cycle Prevention:</strong> Airport visit tracking</li>
                        <li><strong>Window Ranking:</strong> Selecting only top N fastest paths per destination</li>
                        <li><strong>Materialized CTE:</strong> For PostgreSQL 12+, use WITH MATERIALIZED for large datasets</li>
                    </ul>
                `
            },
            {
                number: 47,
                difficulty: "hard",
                question: "Implement a time-series anomaly detection query using statistical process control (3-sigma rule) with exponential smoothing for adaptive thresholds.",
                context: "Table: metrics(timestamp, metric_name, value, tags)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH metric_stats AS (
    SELECT 
        metric_name,
        -- Exponential moving average (α=0.1)
        AVG(value) OVER w as ema,
        -- Exponential moving standard deviation
        SQRT(
            SUM(POWER(value - AVG(value) OVER w, 2) * 
                POWER(0.9, ROW_NUMBER() OVER w - 1))
            / SUM(POWER(0.9, ROW_NUMBER() OVER w - 1))
        ) as emsd,
        -- Adaptive threshold multiplier based on recent volatility
        CASE 
            WHEN STDDEV(value) OVER (PARTITION BY metric_name 
                ORDER BY timestamp ROWS BETWEEN 100 PRECEDING AND CURRENT ROW) 
                / NULLIF(AVG(value) OVER (PARTITION BY metric_name 
                    ORDER BY timestamp ROWS BETWEEN 100 PRECEDING AND CURRENT ROW), 0) > 0.5
            THEN 5  -- High volatility, wider bounds
            ELSE 3  -- Normal volatility, 3-sigma
        END as sigma_multiplier,
        timestamp,
        value,
        tags
    FROM metrics
    WHERE metric_name = 'response_time_ms'
    WINDOW w AS (
        PARTITION BY metric_name, tags
        ORDER BY timestamp
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    )
),
anomalies AS (
    SELECT 
        timestamp,
        metric_name,
        value,
        ema,
        emsd,
        sigma_multiplier,
        -- Upper and lower control limits
        ema + sigma_multiplier * emsd as ucl,
        ema - sigma_multiplier * emsd as lcl,
        -- Z-score for severity classification
        (value - ema) / NULLIF(emsd, 0) as z_score,
        -- Pattern detection: consecutive anomalies
        CASE 
            WHEN ABS((value - ema) / NULLIF(emsd, 0)) > sigma_multiplier THEN 1
            ELSE 0
        END as is_anomaly,
        LAG(CASE 
            WHEN ABS((value - ema) / NULLIF(emsd, 0)) > sigma_multiplier THEN 1
            ELSE 0
        END) OVER (ORDER BY timestamp) as prev_anomaly,
        tags
    FROM metric_stats
),
anomaly_clusters AS (
    SELECT 
        *,
        SUM(CASE WHEN is_anomaly = 1 AND prev_anomaly = 0 THEN 1 ELSE 0 END) 
            OVER (ORDER BY timestamp) as cluster_id
    FROM anomalies
    WHERE is_anomaly = 1
)
SELECT 
    MIN(timestamp) as anomaly_start,
    MAX(timestamp) as anomaly_end,
    COUNT(*) as duration_points,
    AVG(z_score) as avg_severity,
    MAX(ABS(z_score)) as max_severity,
    metric_name,
    STRING_AGG(DISTINCT tags::text, ', ') as affected_tags,
    -- Categorize anomaly type
    CASE 
        WHEN AVG(z_score) > 0 THEN 'positive_spike'
        ELSE 'negative_spike'
    END as anomaly_type,
    -- Calculate recovery time
    LEAD(MIN(timestamp)) OVER (PARTITION BY metric_name ORDER BY MIN(timestamp)) 
        - MAX(timestamp) as recovery_time
FROM anomaly_clusters
GROUP BY cluster_id, metric_name
HAVING COUNT(*) >= 3  -- Minimum cluster size
ORDER BY anomaly_start DESC;</code></pre>
                    
                    <h4>Advanced Features:</h4>
                    <ul>
                        <li><strong>Adaptive Thresholds:</strong> Sigma multiplier adjusts based on recent volatility</li>
                        <li><strong>Exponential Smoothing:</strong> EMA and EMSD for trend-aware detection</li>
                        <li><strong>Pattern Recognition:</strong> Cluster detection for sustained anomalies</li>
                        <li><strong>Severity Classification:</strong> Z-score based categorization</li>
                        <li><strong>Recovery Analysis:</strong> Time between anomaly clusters</li>
                    </ul>
                `
            },
            {
                number: 48,
                difficulty: "hard",
                question: "Create a query that performs incremental data quality validation comparing source and target systems with diff detection and change data capture simulation.",
                context: "Tables: source_table(id, data, updated_at), target_table(id, data, version, checksum)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH source_current AS (
    SELECT 
        id,
        data,
        updated_at,
        -- Generate checksum for comparison
        MD5(data::text || updated_at::text) as source_checksum,
        ROW_NUMBER() OVER (PARTITION BY id ORDER BY updated_at DESC) as rn
    FROM source_table
    WHERE updated_at >= (SELECT MAX(last_sync) FROM sync_metadata WHERE table_name = 'target_table')
),
source_latest AS (
    SELECT * FROM source_current WHERE rn = 1
),
target_current AS (
    SELECT 
        id,
        data,
        version,
        checksum as target_checksum
    FROM target_table
    WHERE version = (SELECT MAX(version) FROM target_table)
),
comparison AS (
    SELECT 
        COALESCE(s.id, t.id) as id,
        CASE 
            WHEN s.id IS NULL THEN 'DELETED_IN_SOURCE'
            WHEN t.id IS NULL THEN 'NEW_IN_SOURCE'
            WHEN s.source_checksum != t.target_checksum THEN 'MODIFIED'
            ELSE 'UNCHANGED'
        END as change_type,
        s.data as source_data,
        t.data as target_data,
        s.updated_at as source_updated,
        s.source_checksum,
        t.target_checksum,
        -- Diff analysis
        CASE 
            WHEN s.data::jsonb <@ t.data::jsonb AND t.data::jsonb <@ s.data::jsonb 
            THEN 'NO_CHANGE'
            WHEN s.data::jsonb <@ t.data::jsonb 
            THEN 'SOURCE_SUBSET_OF_TARGET'
            WHEN t.data::jsonb <@ s.data::jsonb 
            THEN 'TARGET_SUBSET_OF_SOURCE'
            ELSE 'CONFLICT'
        END as json_diff_type,
        -- Field-level diff (PostgreSQL JSONB)
        (SELECT jsonb_object_agg(key, value)
         FROM (
             SELECT key, value
             FROM jsonb_each(s.data::jsonb)
             EXCEPT
             SELECT key, value
             FROM jsonb_each(t.data::jsonb)
         ) diff) as source_extra_fields,
        (SELECT jsonb_object_agg(key, value)
         FROM (
             SELECT key, value
             FROM jsonb_each(t.data::jsonb)
             EXCEPT
             SELECT key, value
             FROM jsonb_each(s.data::jsonb)
         ) diff) as target_extra_fields
    FROM source_latest s
    FULL OUTER JOIN target_current t ON s.id = t.id
),
change_summary AS (
    SELECT 
        change_type,
        COUNT(*) as record_count,
        SUM(CASE WHEN change_type = 'MODIFIED' THEN 1 ELSE 0 END) as modified_count,
        AVG(CASE 
            WHEN change_type = 'MODIFIED' 
            THEN OCTET_LENGTH(source_data::text) - OCTET_LENGTH(target_data::text)
            ELSE 0
        END) as avg_size_change,
        -- Data drift metrics
        CORR(
            OCTET_LENGTH(source_data::text), 
            OCTET_LENGTH(target_data::text)
        ) as size_correlation,
        -- Temporal analysis
        PERCENTILE_CONT(0.95) WITHIN GROUP (
            ORDER BY EXTRACT(EPOCH FROM (source_updated - CURRENT_TIMESTAMP))
        ) as age_95th_percentile
    FROM comparison
    GROUP BY change_type
),
sync_recommendations AS (
    SELECT 
        change_type,
        record_count,
        CASE 
            WHEN change_type = 'NEW_IN_SOURCE' AND record_count > 1000 
            THEN 'BULK_INSERT'
            WHEN change_type = 'MODIFIED' AND avg_size_change > 1024 
            THEN 'INCREMENTAL_UPDATE'
            WHEN change_type = 'DELETED_IN_SOURCE' 
            THEN 'SOFT_DELETE'
            ELSE 'STANDARD_SYNC'
        END as sync_strategy,
        CASE 
            WHEN change_type IN ('MODIFIED', 'NEW_IN_SOURCE') 
            THEN 'IMMEDIATE'
            WHEN change_type = 'DELETED_IN_SOURCE' AND age_95th_percentile > 86400
            THEN 'SCHEDULED_NIGHTLY'
            ELSE 'DEFERRED'
        END as sync_priority
    FROM change_summary
)
SELECT 
    c.id,
    c.change_type,
    c.json_diff_type,
    c.source_extra_fields,
    c.target_extra_fields,
    sr.sync_strategy,
    sr.sync_priority,
    cs.record_count as total_of_type,
    cs.modified_count,
    cs.avg_size_change,
    cs.size_correlation
FROM comparison c
JOIN change_summary cs ON c.change_type = cs.change_type
JOIN sync_recommendations sr ON c.change_type = sr.change_type
WHERE c.change_type != 'UNCHANGED'
ORDER BY 
    CASE sr.sync_priority
        WHEN 'IMMEDIATE' THEN 1
        WHEN 'SCHEDULED_NIGHTLY' THEN 2
        WHEN 'DEFERRED' THEN 3
    END,
    c.id;</code></pre>
                    
                    <h4>Advanced Validation Features:</h4>
                    <ul>
                        <li><strong>Change Detection:</strong> Checksum-based comparison for efficiency</li>
                        <li><strong>JSON Diff Analysis:</strong> Field-level change detection</li>
                        <li><strong>Data Drift Metrics:</strong> Statistical analysis of changes</li>
                        <li><strong>Sync Strategy Recommendation:</strong> AI-driven synchronization planning</li>
                        <li><strong>Temporal Analysis:</strong> Age-based prioritization</li>
                    </ul>
                `
            },
            {
                number: 49,
                difficulty: "hard",
                question: "Design a financial fraud detection query using graph analysis to identify circular transactions and money laundering patterns.",
                context: "Tables: transactions(txn_id, from_account, to_account, amount, txn_time, currency), accounts(account_id, owner_name, account_type, country)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH RECURSIVE transaction_graph AS (
    -- Base case: Direct transactions
    SELECT 
        from_account as source,
        to_account as destination,
        ARRAY[from_account, to_account] as path,
        ARRAY[txn_id] as txn_path,
        amount as path_amount,
        txn_time as start_time,
        txn_time as current_time,
        1 as depth,
        -- Anti-money laundering flags
        CASE 
            WHEN a1.country != a2.country THEN 'CROSS_BORDER'
            WHEN a1.account_type = 'PERSONAL' AND a2.account_type = 'BUSINESS' THEN 'P2B'
            WHEN a1.account_type = 'BUSINESS' AND a2.account_type = 'PERSONAL' THEN 'B2P'
            ELSE 'STANDARD'
        END as txn_type
    FROM transactions t
    JOIN accounts a1 ON t.from_account = a1.account_id
    JOIN accounts a2 ON t.to_account = a2.account_id
    WHERE txn_time >= CURRENT_DATE - INTERVAL '7 days'
      AND amount > 10000  -- Large transactions
    
    UNION ALL
    
    -- Recursive case: Follow transaction chains
    SELECT 
        tg.source,
        t.to_account as destination,
        tg.path || t.to_account,
        tg.txn_path || t.txn_id,
        tg.path_amount + t.amount as total_amount,
        tg.start_time,
        t.txn_time,
        tg.depth + 1,
        -- Update transaction type pattern
        tg.txn_type || '->' || CASE 
            WHEN a1.country != a2.country THEN 'CROSS_BORDER'
            WHEN a1.account_type = 'PERSONAL' AND a2.account_type = 'BUSINESS' THEN 'P2B'
            WHEN a1.account_type = 'BUSINESS' AND a2.account_type = 'PERSONAL' THEN 'B2P'
            ELSE 'STANDARD'
        END
    FROM transaction_graph tg
    JOIN transactions t ON tg.destination = t.from_account
    JOIN accounts a1 ON t.from_account = a1.account_id
    JOIN accounts a2 ON t.to_account = a2.account_id
    WHERE 
        -- Time constraints: max 24 hour chain
        t.txn_time <= tg.current_time + INTERVAL '24 hours'
        AND t.txn_time > tg.current_time  -- Forward in time
        -- Avoid cycles (except returning to origin for circular detection)
        AND (t.to_account != ALL(tg.path) OR t.to_account = tg.source)
        -- Maximum chain depth
        AND tg.depth < 5
        -- Amount constraints
        AND t.amount BETWEEN tg.path_amount * 0.1 AND tg.path_amount * 10
),
circular_transactions AS (
    -- Detect circular flows (money returns to origin)
    SELECT 
        source as origin_account,
        destination,
        path,
        txn_path,
        depth,
        total_amount,
        start_time,
        current_time as end_time,
        -- Circular efficiency: returned amount / total moved
        (SELECT amount 
         FROM transactions 
         WHERE txn_id = txn_path[array_length(txn_path, 1)]
        ) / total_amount as circular_efficiency,
        -- Time efficiency: hours per transaction
        EXTRACT(EPOCH FROM (current_time - start_time)) / 3600 / depth as hours_per_txn,
        txn_type,
        -- Suspicion score
        CASE 
            WHEN depth >= 3 THEN 0.3
            WHEN total_amount > 50000 THEN 0.4
            WHEN txn_type LIKE '%CROSS_BORDER%' THEN 0.2
            WHEN circular_efficiency > 0.8 THEN 0.5
            ELSE 0.1
        END +
        CASE 
            WHEN hours_per_txn < 1 THEN 0.3
            WHEN hours_per_txn > 24 THEN 0.1
            ELSE 0
        END as suspicion_score
    FROM transaction_graph
    WHERE destination = source  -- Circular flow detected
      AND depth > 1  -- Not just self-transactions
),
structured_patterns AS (
    -- Detect structured transactions (smurfing)
    SELECT 
        from_account,
        COUNT(DISTINCT to_account) as unique_destinations,
        SUM(amount) as total_structured,
        MIN(amount) as min_amount,
        MAX(amount) as max_amount,
        STDDEV(amount) as amount_variance,
        COUNT(*) as txn_count,
        EXTRACT(EPOCH FROM MAX(txn_time) - MIN(txn_time)) / 3600 as time_window_hours,
        -- Pattern detection
        CASE 
            WHEN COUNT(*) >= 10 
                 AND MAX(amount) < 10000  -- Below reporting threshold
                 AND STDDEV(amount) < 1000  -- Consistent amounts
                 AND EXTRACT(EPOCH FROM MAX(txn_time) - MIN(txn_time)) / 3600 < 24
            THEN 'SMURFING_SUSPECTED'
            WHEN COUNT(DISTINCT to_account) = 1 
                 AND COUNT(*) > 5
                 AND AVG(amount) > 5000
            THEN 'LAYERING_SUSPECTED'
            ELSE 'NORMAL'
        END as pattern_type
    FROM transactions t
    WHERE txn_time >= CURRENT_DATE - INTERVAL '1 day'
    GROUP BY from_account
    HAVING SUM(amount) > 50000
),
consolidated_alerts AS (
    SELECT 
        'CIRCULAR_FLOW' as alert_type,
        origin_account as primary_account,
        ARRAY_AGG(DISTINCT destination) as involved_accounts,
        MAX(suspicion_score) as max_score,
        AVG(depth) as avg_chain_length,
        SUM(total_amount) as total_money_moved,
        MIN(start_time) as first_detected,
        MAX(end_time) as last_detected,
        STRING_AGG(DISTINCT txn_type, '; ') as patterns
    FROM circular_transactions
    WHERE suspicion_score > 0.7
    GROUP BY origin_account
    
    UNION ALL
    
    SELECT 
        'STRUCTURED_TRANSACTIONS' as alert_type,
        from_account as primary_account,
        ARRAY_AGG(DISTINCT to_account) as involved_accounts,
        CASE pattern_type
            WHEN 'SMURFING_SUSPECTED' THEN 0.8
            WHEN 'LAYERING_SUSPECTED' THEN 0.6
            ELSE 0.3
        END as max_score,
        txn_count as avg_chain_length,
        total_structured as total_money_moved,
        MIN(txn_time) as first_detected,
        MAX(txn_time) as last_detected,
        pattern_type as patterns
    FROM structured_patterns
    JOIN transactions t ON structured_patterns.from_account = t.from_account
    WHERE pattern_type != 'NORMAL'
    GROUP BY from_account, pattern_type, txn_count, total_structured
)
SELECT 
    alert_type,
    primary_account,
    a.owner_name,
    a.account_type,
    a.country,
    involved_accounts,
    max_score,
    avg_chain_length,
    total_money_moved,
    first_detected,
    last_detected,
    patterns,
    -- Regulatory reporting flags
    CASE 
        WHEN total_money_moved > 100000 THEN 'SAR_REQUIRED'
        WHEN max_score > 0.8 THEN 'IMMEDIATE_REVIEW'
        WHEN a.country IN ('HIGH_RISK_JURISDICTIONS') THEN 'ENHANCED_DUE_DILIGENCE'
        ELSE 'MONITOR'
    END as action_required,
    -- Network analysis
    (SELECT COUNT(*) 
     FROM transactions 
     WHERE from_account = ANY(involved_accounts) 
        OR to_account = ANY(involved_accounts)
    ) as network_transaction_count
FROM consolidated_alerts ca
JOIN accounts a ON ca.primary_account = a.account_id
ORDER BY max_score DESC, total_money_moved DESC;</code></pre>
                    
                    <h4>Advanced Fraud Detection Features:</h4>
                    <ul>
                        <li><strong>Graph Analysis:</strong> Recursive query for transaction chain detection</li>
                        <li><strong>Pattern Recognition:</strong> Smurfing, layering, circular flows</li>
                        <li><strong>Risk Scoring:</strong> Multi-factor suspicion scoring</li>
                        <li><strong>Temporal Analysis:</strong> Time-based pattern detection</li>
                        <li><strong>Regulatory Compliance:</strong> SAR flagging and jurisdiction analysis</li>
                    </ul>
                `
            },
            {
                number: 50,
                difficulty: "hard",
                question: "Implement a real-time inventory optimization query with demand forecasting, safety stock calculation, and reorder point simulation.",
                context: "Tables: sales(product_id, date, quantity, price), inventory(product_id, location, current_stock, lead_time_days), products(product_id, category, unit_cost, storage_cost)",
                hasCodeEditor: true,
                answer: `
                    <h4>Solution:</h4>
                    <pre><code>WITH demand_forecasting AS (
    SELECT 
        product_id,
        location,
        -- Historical demand (last 90 days)
        SUM(quantity) as historical_demand,
        AVG(quantity) as avg_daily_demand,
        STDDEV(quantity) as daily_demand_stddev,
        -- Trend analysis
        REGR_SLOPE(quantity, EXTRACT(DAY FROM date)) as demand_trend,
        -- Seasonality factors (day of week)
        AVG(CASE WHEN EXTRACT(DOW FROM date) = 1 THEN quantity END) as mon_avg,
        AVG(CASE WHEN EXTRACT(DOW FROM date) = 2 THEN quantity END) as tue_avg,
        -- Promotional impact
        CORR(quantity, price) as price_elasticity,
        -- Forecast next 30 days with confidence intervals
        AVG(quantity) * 30 as forecast_30d,
        AVG(quantity) * 30 * 1.96 * STDDEV(quantity)/SQRT(COUNT(*)) as forecast_95_ci
    FROM sales s
    JOIN inventory i ON s.product_id = i.product_id
    WHERE date >= CURRENT_DATE - INTERVAL '90 days'
    GROUP BY product_id, location
),
lead_time_analysis AS (
    SELECT 
        product_id,
        location,
        lead_time_days,
        -- Lead time variability
        PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY lead_time_days) 
            OVER (PARTITION BY product_id) as lead_time_95th,
        -- Supplier reliability score
        1.0 - (COUNT(CASE WHEN lead_time_days > avg_lead_time * 1.5 THEN 1 END) 
               / COUNT(*)::float) as supplier_reliability
    FROM inventory i
    JOIN (
        SELECT product_id, AVG(lead_time_days) as avg_lead_time
        FROM inventory
        GROUP BY product_id
    ) lt ON i.product_id = lt.product_id
),
safety_stock_calculation AS (
    SELECT 
        df.product_id,
        df.location,
        df.avg_daily_demand,
        df.daily_demand_stddev,
        lt.lead_time_days,
        lt.lead_time_95th,
        lt.supplier_reliability,
        -- Service level factor (Z-score for 95% service level = 1.65)
        1.65 as z_score,
        -- Safety stock formula: Z * σ_demand * √lead_time
        1.65 * df.daily_demand_stddev * SQRT(lt.lead_time_days) as safety_stock_basic,
        -- Advanced safety stock with lead time variability
        1.65 * SQRT(
            lt.lead_time_days * POWER(df.daily_demand_stddev, 2) +
            POWER(df.avg_daily_demand, 2) * POWER(0.2 * lt.lead_time_days, 2)
        ) as safety_stock_advanced,
        -- Dynamic safety stock based on supplier reliability
        CASE 
            WHEN lt.supplier_reliability < 0.8 THEN 
                1.65 * df.daily_demand_stddev * SQRT(lt.lead_time_95th)
            ELSE 
                1.65 * df.daily_demand_stddev * SQRT(lt.lead_time_days)
        END as safety_stock_adjusted
    FROM demand_forecasting df
    JOIN lead_time_analysis lt ON df.product_id = lt.product_id 
                               AND df.location = lt.location
),
reorder_point_optimization AS (
    SELECT 
        ssc.product_id,
        ssc.location,
        i.current_stock,
        p.unit_cost,
        p.storage_cost,
        ssc.avg_daily_demand,
        ssc.safety_stock_adjusted,
        -- Reorder point: lead time demand + safety stock
        (ssc.avg_daily_demand * lt.lead_time_days) + ssc.safety_stock_adjusted as reorder_point,
        -- Economic Order Quantity (EOQ) calculation
        SQRT(
            (2 * df.forecast_30d * 50) /  -- Ordering cost = $50
            (p.unit_cost * 0.2)  -- Holding cost = 20% of unit cost
        ) as eoq,
        -- Stock status classification
        CASE 
            WHEN i.current_stock <= ssc.safety_stock_adjusted THEN 'CRITICAL'
            WHEN i.current_stock <= (ssc.avg_daily_demand * lt.lead_time_days) 
                 + ssc.safety_stock_adjusted THEN 'REORDER'
            WHEN i.current_stock <= (ssc.avg_daily_demand * lt.lead_time_days * 1.5) 
                 + ssc.safety_stock_adjusted THEN 'MONITOR'
            ELSE 'HEALTHY'
        END as stock_status,
        -- Days of inventory remaining
        i.current_stock / NULLIF(ssc.avg_daily_demand, 0) as days_of_inventory,
        -- Stockout probability
        1 - NORMAL_CDF(
            i.current_stock, 
            ssc.avg_daily_demand * lt.lead_time_days,
            ssc.daily_demand_stddev * SQRT(lt.lead_time_days)
        ) as stockout_probability,
        -- Inventory turnover ratio
        df.historical_demand / i.current_stock as turnover_ratio
    FROM safety_stock_calculation ssc
    JOIN inventory i ON ssc.product_id = i.product_id 
                     AND ssc.location = i.location
    JOIN products p ON ssc.product_id = p.product_id
    JOIN demand_forecasting df ON ssc.product_id = df.product_id 
                               AND ssc.location = df.location
    JOIN lead_time_analysis lt ON ssc.product_id = lt.product_id 
                               AND ssc.location = lt.location
),
cost_optimization AS (
    SELECT 
        rop.*,
        -- Total inventory cost
        (rop.current_stock * p.unit_cost * 0.2 / 365 * rop.days_of_inventory) 
            as holding_cost,
        -- Ordering cost if we order at EOQ
        50 * (df.forecast_30d / NULLIF(rop.eoq, 0)) as ordering_cost,
        -- Stockout cost (assume 3x unit cost per lost sale)
        rop.stockout_probability * df.forecast_30d * 3 * p.unit_cost as expected_stockout_cost,
        -- Total cost
        (rop.current_stock * p.unit_cost * 0.2 / 365 * rop.days_of_inventory) +
        50 * (df.forecast_30d / NULLIF(rop.eoq, 0)) +
        (rop.stockout_probability * df.forecast_30d * 3 * p.unit_cost) as total_cost,
        -- Cost savings opportunity
        LAG(rop.current_stock * p.unit_cost * 0.2 / 365 * rop.days_of_inventory) 
            OVER (PARTITION BY rop.product_id ORDER BY rop.days_of_inventory) 
            - (rop.current_stock * p.unit_cost * 0.2 / 365 * rop.days_of_inventory) as holding_cost_savings
    FROM reorder_point_optimization rop
    JOIN products p ON rop.product_id = p.product_id
    JOIN demand_forecasting df ON rop.product_id = df.product_id 
                               AND rop.location = df.location
),
abc_analysis AS (
    SELECT 
        product_id,
        location,
        current_stock * unit_cost as inventory_value,
        forecast_30d * unit_cost as forecasted_revenue,
        -- ABC classification (Pareto)
        CASE 
            WHEN PERCENT_RANK() OVER (ORDER BY forecast_30d * unit_cost DESC) <= 0.2 
            THEN 'A'
            WHEN PERCENT_RANK() OVER (ORDER BY forecast_30d * unit_cost DESC) <= 0.5 
            THEN 'B'
            ELSE 'C'
        END as abc_class,
        -- XYZ classification (demand variability)
        CASE 
            WHEN daily_demand_stddev / avg_daily_demand <= 0.1 THEN 'X'
            WHEN daily_demand_stddev / avg_daily_demand <= 0.25 THEN 'Y'
            ELSE 'Z'
        END as xyz_class
    FROM reorder_point_optimization rop
    JOIN products p ON rop.product_id = p.product_id
    JOIN demand_forecasting df ON rop.product_id = df.product_id 
                               AND rop.location = df.location
)
SELECT 
    rop.product_id,
    rop.location,
    rop.current_stock,
    rop.stock_status,
    rop.days_of_inventory,
    rop.stockout_probability,
    rop.reorder_point,
    rop.eoq,
    rop.safety_stock_adjusted,
    abc.abc_class,
    abc.xyz_class,
    -- Combined ABC-XYZ matrix
    abc.abc_class || '-' || abc.xyz_class as inventory_segment,
    -- Recommended action
    CASE 
        WHEN rop.stock_status = 'CRITICAL' AND abc.abc_class = 'A' 
        THEN 'IMMEDIATE_ORDER'
        WHEN rop.stock_status = 'REORDER' AND abc.abc_class IN ('A', 'B') 
        THEN 'SCHEDULE_ORDER'
        WHEN rop.days_of_inventory > 60 AND abc.abc_class = 'C' 
        THEN 'CONSIDER_DISCOUNT'
        WHEN rop.stockout_probability > 0.1 AND abc.abc_class = 'A' 
        THEN 'INCREASE_SAFETY_STOCK'
        ELSE 'MAINTAIN'
    END as recommended_action,
    -- Order quantity recommendation
    CASE 
        WHEN rop.stock_status IN ('CRITICAL', 'REORDER') 
        THEN GREATEST(rop.eoq, rop.reorder_point - rop.current_stock)
        ELSE 0
    END as order_quantity,
    -- Expected arrival date
    CURRENT_DATE + lt.lead_time_days as expected_arrival,
    -- Financial impact
    co.total_cost,
    co.expected_stockout_cost,
    co.holding_cost_savings,
    -- Performance metrics
    rop.turnover_ratio,
    -- Alert priority
    CASE 
        WHEN rop.stock_status = 'CRITICAL' AND abc.abc_class = 'A' THEN 1
        WHEN rop.stockout_probability > 0.2 THEN 2
        WHEN rop.days_of_inventory < 7 THEN 3
        ELSE 4
    END as alert_priority
FROM reorder_point_optimization rop
JOIN abc_analysis abc ON rop.product_id = abc.product_id 
                      AND rop.location = abc.location
JOIN cost_optimization co ON rop.product_id = co.product_id 
                          AND rop.location = co.location
JOIN lead_time_analysis lt ON rop.product_id = lt.product_id 
                           AND rop.location = lt.location
WHERE rop.stock_status IN ('CRITICAL', 'REORDER')
   OR rop.stockout_probability > 0.1
ORDER BY alert_priority, abc.abc_class, rop.stockout_probability DESC;</code></pre>
                    
                    <h4>Advanced Inventory Optimization Features:</h4>
                    <ul>
                        <li><strong>Demand Forecasting:</strong> Statistical forecasting with confidence intervals</li>
                        <li><strong>Safety Stock Optimization:</strong> Multiple calculation methods with reliability adjustments</li>
                        <li><strong>EOQ Calculation:</strong> Economic order quantity with cost optimization</li>
                        <li><strong>ABC-XYZ Analysis:</strong> Multi-dimensional inventory segmentation</li>
                        <li><strong>Risk Management:</strong> Stockout probability and financial impact analysis</li>
                        <li><strong>Cost Optimization:</strong> Holding, ordering, and stockout cost balancing</li>
                    </ul>
                `
            }
        ]
    },

    statistics: {
        title: "Statistics & Probability - Advanced",
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
    },
    {
        "number": 11,
        "title": "Advanced Statistics: Probability Distributions",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Understanding how data is distributed is fundamental to statistical inference. This lesson covers the most important probability distributions used in data analysis.</p>\n        \n        <h4>2. Key Distributions</h4>\n        <ul>\n            <li><strong>Binomial Distribution:</strong> Models the number of successes in n independent trials (e.g., coin flips, pass/fail tests).</li>\n            <li><strong>Normal Distribution:</strong> Bell-shaped curve; most natural phenomena follow this (e.g., heights, test scores, errors).</li>\n            <li><strong>t-Distribution:</strong> Used for hypothesis tests with small samples or unknown population standard deviation.</li>\n            <li><strong>Chi-Square Distribution:</strong> Used for testing independence and goodness of fit.</li>\n        </ul>\n        \n        <h4>3. Why It Matters</h4>\n        <p>Different distributions have different properties. Knowing which distribution your data follows helps you choose the right statistical test.</p>\n      "
    },
    {
        "number": 12,
        "title": "Inferential Statistics: Hypothesis Testing",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Hypothesis testing allows us to make decisions about populations based on sample data. It's the foundation of scientific inference and business decision-making.</p>\n        \n        <h4>2. The 5-Step Process</h4>\n        <ol>\n            <li><strong>State Hypotheses:</strong> H0 (null) vs H1 (alternative)</li>\n            <li><strong>Set Significance Level:</strong> Usually α = 0.05</li>\n            <li><strong>Calculate Test Statistic:</strong> t-test, z-test, chi-square, etc.</li>\n            <li><strong>Find p-value:</strong> Probability of observing data if H0 is true</li>\n            <li><strong>Make Decision:</strong> If p-value < α, reject H0</li>\n        </ol>\n        \n        <h4>3. Business Application</h4>\n        <p>Example: Test if a new marketing strategy increases sales. H0: No increase. If p-value = 0.02, we reject H0 and conclude the strategy works.</p>\n      "
    },
    {
        "number": 13,
        "title": "Confidence Intervals & Estimation",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>While hypothesis testing answers yes/no questions, confidence intervals give us a range of plausible values for a population parameter.</p>\n        \n        <h4>2. Interpretation</h4>\n        <p>A 95% confidence interval means: If we repeated our sampling process 100 times, approximately 95 of the intervals would contain the true population parameter.</p>\n        \n        <h4>3. Formulas</h4>\n        <ul>\n            <li><strong>For Mean (σ known):</strong> CI = x̄ ± z*(σ/√n)</li>\n            <li><strong>For Mean (σ unknown):</strong> CI = x̄ ± t*(s/√n)</li>\n            <li><strong>For Proportion:</strong> CI = p ± z*√(p(1-p)/n)</li>\n        </ul>\n        \n        <h4>4. Why Confidence Intervals?</h4>\n        <p>They provide more information than a single point estimate and acknowledge the uncertainty in our estimation.</p>\n      "
    },
    {
        "number": 14,
        "title": "Comparing Groups: ANOVA and t-Tests",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Often we need to compare means across two or more groups. This lesson covers the statistical tests used for such comparisons.</p>\n        \n        <h4>2. When to Use What</h4>\n        <ul>\n            <li><strong>Independent t-test:</strong> Compare means of two independent groups (e.g., Control vs Treatment)</li>\n            <li><strong>Paired t-test:</strong> Compare measurements from same subjects at different times (e.g., Before/After)</li>\n            <li><strong>ANOVA:</strong> Compare means of 3+ groups. Tests if at least one group differs.</li>\n        </ul>\n        \n        <h4>3. Real-World Examples</h4>\n        <p>Machine A produces items averaging 12.3mm, Machine B averages 12.1mm. Are they significantly different? Use independent t-test.</p>\n        \n        <h4>4. Post-hoc Analysis</h4>\n        <p>If ANOVA is significant, use tests like Tukey HSD to identify which specific groups differ.</p>\n      "
    },
    {
        "number": 15,
        "title": "Quartiles and Outlier Detection",
        "content": "\n        <h4>Understanding Data Distribution</h4>\n        <p>Quartiles divide data into four equal parts. Q1 (25th percentile), Q2 (median, 50th), Q3 (75th percentile).</p>\n        \n        <h4>Interquartile Range (IQR)</h4>\n        <p>IQR = Q3 - Q1. Data points outside [Q1 - 1.5×IQR, Q3 + 1.5×IQR] are considered outliers.</p>\n        \n        <h4>Why It Matters</h4>\n        <p>Quartiles are robust to outliers, unlike mean. Use them when data has extreme values.</p>\n        \n        <h4>Business Application</h4>\n        <p>Identify unusual transactions: If typical transaction amounts are $100-$500 (IQR), a $50,000 transaction is an outlier worth investigating.</p>\n      "
    },
    {
        "number": 16,
        "title": "Coefficient of Variation: Comparing Across Scales",
        "content": "\n        <h4>The Problem</h4>\n        <p>Standard deviation alone doesn't tell the full story. A $10 variation in a $100 item is huge; in a $10,000 item it's tiny.</p>\n        \n        <h4>The Solution: Coefficient of Variation</h4>\n        <p><code>CV = (Standard Deviation / Mean) × 100%</code></p>\n        <p>This normalizes variability relative to the mean, allowing fair comparisons across different scales.</p>\n        \n        <h4>Real-World Example</h4>\n        <ul>\n            <li><strong>Stock A:</strong> Mean=$100, SD=$15 → CV = 15% (risky)</li>\n            <li><strong>Stock B:</strong> Mean=$50, SD=$5 → CV = 10% (stable)</li>\n        </ul>\n        <p>Stock B is more stable despite lower absolute variability!</p>\n        \n        <h4>When to Use CV</h4>\n        <p>Comparing variability across different countries, currencies, units, or datasets with different means.</p>\n      "
    },
    {
        "number": 17,
        "title": "Basic Statistical Concepts: Populations, Samples, and Data Types",
        "content": "\n        <h4>Core Definitions</h4>\n        <ul>\n            <li><strong>Population:</strong> The entire group you want to study</li>\n            <li><strong>Sample:</strong> A subset of the population</li>\n            <li><strong>Parameter:</strong> A numerical measure describing a population characteristic</li>\n            <li><strong>Statistic:</strong> A numerical measure describing a sample characteristic</li>\n        </ul>\n        \n        <h4>Types of Data</h4>\n        <ul>\n            <li><strong>Qualitative/Categorical:</strong> Non-numerical data (e.g., colors, brands, regions)</li>\n            <li><strong>Quantitative:</strong> Numerical data\n                <ul>\n                    <li><strong>Discrete:</strong> Countable numbers (e.g., number of students, defects)</li>\n                    <li><strong>Continuous:</strong> Measurable numbers with decimals (e.g., height, weight, time)</li>\n                </ul>\n            </li>\n        </ul>\n        \n        <h4>Why This Matters</h4>\n        <p>Understanding whether you're working with populations or samples, and the type of data you have, determines which statistical methods are appropriate.</p>\n      "
    },
    {
        "number": 18,
        "title": "Central Tendency: Mean, Median, Mode, and Weighted Mean",
        "content": "\n        <h4>Key Formulas</h4>\n        <ul>\n            <li><strong>Mean (Average):</strong> x̄ = Σx / n</li>\n            <li><strong>Weighted Mean:</strong> x̄_w = Σ(wᵢ × xᵢ) / Σwᵢ (useful when some values are more important)</li>\n            <li><strong>Geometric Mean:</strong> GM = (∏xᵢ)^(1/n) (used for growth rates and percentage changes)</li>\n        </ul>\n        \n        <h4>When to Use Each</h4>\n        <ul>\n            <li><strong>Mean:</strong> Most common, but sensitive to outliers</li>\n            <li><strong>Median:</strong> Better for skewed data; robust to outliers</li>\n            <li><strong>Mode:</strong> Best for categorical data and identifying the most frequent value</li>\n        </ul>\n        \n        <h4>Real-World Example</h4>\n        <p>Salary data with mean=$60k but median=$48k suggests right-skewed data (executives pulling mean higher).</p>\n      "
    },
    {
        "number": 19,
        "title": "Measures of Dispersion: Spread, Variability, and Outliers",
        "content": "\n        <h4>Key Formulas</h4>\n        <ul>\n            <li><strong>Range:</strong> Max - Min (simple but rough)</li>\n            <li><strong>Variance (Population):</strong> σ² = Σ(x - μ)² / N</li>\n            <li><strong>Variance (Sample):</strong> s² = Σ(x - x̄)² / (n-1) (Bessel's correction)</li>\n            <li><strong>Standard Deviation:</strong> σ = √σ² (more interpretable than variance)</li>\n            <li><strong>Coefficient of Variation:</strong> CV = (σ/μ) × 100% (compare variability across different scales)</li>\n            <li><strong>Interquartile Range (IQR):</strong> IQR = Q₃ - Q₁ (middle 50% of data)</li>\n        </ul>\n        \n        <h4>Quartiles</h4>\n        <ul>\n            <li>Q1 = 25th percentile</li>\n            <li>Q2 = 50th percentile (median)</li>\n            <li>Q3 = 75th percentile</li>\n        </ul>\n        \n        <h4>Identifying Outliers</h4>\n        <p>Use 1.5×IQR rule: Data points below (Q1 - 1.5×IQR) or above (Q3 + 1.5×IQR) are outliers.</p>\n      "
    },
    {
        "number": 20,
        "title": "Probability: Rules, Conditional Probability, and Bayes' Theorem",
        "content": "\n        <h4>Fundamental Rules</h4>\n        <ul>\n            <li><strong>Addition Rule:</strong> P(A∪B) = P(A) + P(B) - P(A∩B)</li>\n            <li><strong>Multiplication Rule:</strong> P(A∩B) = P(A) × P(B|A)</li>\n            <li><strong>Complement Rule:</strong> P(A') = 1 - P(A)</li>\n            <li><strong>Conditional Probability:</strong> P(A|B) = P(A∩B) / P(B), provided P(B) > 0</li>\n        </ul>\n        \n        <h4>Bayes' Theorem</h4>\n        <p>P(A|B) = [P(B|A) × P(A)] / P(B)</p>\n        <p>Used to update probabilities based on new evidence. Example: medical test accuracy given positive result.</p>\n        \n        <h4>Key Insight</h4>\n        <p>Probability ranges from 0 (impossible) to 1 (certain). Sum of all possible outcomes = 1.</p>\n      "
    },
    {
        "number": 21,
        "title": "Probability Distributions: Binomial and Normal",
        "content": "\n        <h4>Binomial Distribution</h4>\n        <ul>\n            <li><strong>Conditions:</strong> Fixed number of trials, independent trials, two outcomes (success/failure)</li>\n            <li><strong>Formula:</strong> P(X=k) = C(n,k) × p^k × (1-p)^(n-k)</li>\n            <li><strong>Mean:</strong> μ = np</li>\n            <li><strong>Variance:</strong> σ² = np(1-p)</li>\n            <li><strong>Example:</strong> Probability of exactly 3 defects in 50 items (2% defect rate)</li>\n        </ul>\n        \n        <h4>Normal Distribution</h4>\n        <ul>\n            <li><strong>Properties:</strong> Bell-shaped, symmetric, mean=median=mode</li>\n            <li><strong>Empirical Rule (68-95-99.7):</strong>\n                <ul>\n                    <li>68% within μ ± 1σ</li>\n                    <li>95% within μ ± 2σ</li>\n                    <li>99.7% within μ ± 3σ</li>\n                </ul>\n            </li>\n            <li><strong>Z-score:</strong> z = (x - μ)/σ (standardize to normal distribution)</li>\n        </ul>\n        \n        <h4>Why Normal Distribution Matters</h4>\n        <p>Many natural phenomena follow normal distribution. Used as basis for hypothesis testing and confidence intervals.</p>\n      "
    },
    {
        "number": 22,
        "title": "Inferential Statistics: CLT, Confidence Intervals, and Hypothesis Testing",
        "content": "\n        <h4>Central Limit Theorem</h4>\n        <p>For large samples (n ≥ 30), the sampling distribution of the sample mean is approximately normal, regardless of the original population distribution.</p>\n        <ul>\n            <li><strong>Mean of sampling distribution:</strong> μ_x̄ = μ</li>\n            <li><strong>Standard Error:</strong> σ_x̄ = σ/√n</li>\n        </ul>\n        \n        <h4>Confidence Intervals</h4>\n        <ul>\n            <li><strong>For mean (σ known):</strong> CI = x̄ ± z*(σ/√n)</li>\n            <li><strong>For mean (σ unknown):</strong> CI = x̄ ± t*(s/√n) (uses t-distribution with n-1 df)</li>\n        </ul>\n        \n        <h4>Hypothesis Testing (5 Steps)</h4>\n        <ol>\n            <li>State H₀ (null) and H₁ (alternative)</li>\n            <li>Choose α (significance level, typically 0.05)</li>\n            <li>Calculate test statistic (t-test, z-test, chi-square, etc.)</li>\n            <li>Find p-value</li>\n            <li>Make decision: if p-value < α, reject H₀</li>\n        </ol>\n        \n        <h4>Type I and Type II Errors</h4>\n        <ul>\n            <li><strong>Type I (α):</strong> Rejecting true H₀ (false positive)</li>\n            <li><strong>Type II (β):</strong> Failing to reject false H₀ (false negative)</li>\n        </ul>\n      "
    },
    {
        "number": 23,
        "title": "Bayesian Hierarchical Modeling",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Hierarchical Bayesian models (multilevel models) allow partial pooling of information across groups, balancing between complete pooling (ignoring group differences) and no pooling (treating groups independently).</p>\n        \n        <h4>2. Mathematical Foundation</h4>\n        <p><strong>Three-Level Hierarchy:</strong></p>\n        <p>Likelihood: yᵢⱼ ∼ N(θⱼ, σ²)<br>\n        Prior: θⱼ ∼ N(μ, τ²)<br>\n        Hyperprior: μ ∼ N(μ₀, σ₀²), τ ∼ Half-Cauchy(0, γ)</p>\n        \n        <h4>3. Business Application: Multi-Store Sales Analysis</h4>\n        <p><strong>Scenario:</strong> 100 retail stores with varying sales data completeness. Estimate true sales for each store while borrowing strength from the group.</p>\n        \n        <pre><code># Python implementation using PyMC3\nimport pymc3 as pm\nimport numpy as np\n\nwith pm.Model() as hierarchical_model:\n    # Hyperpriors\n    mu = pm.Normal('mu', mu=0, sd=10)\n    tau = pm.HalfCauchy('tau', beta=2)\n    \n    # Store-level parameters (partially pooled)\n    theta = pm.Normal('theta', mu=mu, sd=tau, shape=n_stores)\n    \n    # Likelihood\n    sigma = pm.HalfNormal('sigma', sd=1)\n    sales = pm.Normal('sales', mu=theta[store_idx], \n                      sd=sigma, observed=observed_sales)\n    \n    # Inference\n    trace = pm.sample(2000, tune=1000)</code></pre>\n        \n        <h4>4. Shrinkage and Regularization</h4>\n        <p>The hierarchical structure automatically shrinks extreme estimates toward the group mean, providing built-in regularization similar to ridge regression.</p>\n      "
    },
    {
        "number": 24,
        "title": "Causal Inference: Propensity Score Methods",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Propensity score methods enable causal inference from observational data by creating quasi-experimental conditions through matching, weighting, or stratification.</p>\n        \n        <h4>2. Key Methods</h4>\n        <ul>\n            <li><strong>Propensity Score Matching:</strong> Pair treated and control units with similar propensity scores</li>\n            <li><strong>Inverse Probability Weighting (IPW):</strong> Weight observations by inverse of probability of treatment</li>\n            <li><strong>Doubly Robust Estimation:</strong> Combine outcome regression with propensity score weighting</li>\n        </ul>\n        \n        <h4>3. Implementation Pipeline</h4>\n        <pre><code># Python causal inference pipeline\nfrom sklearn.ensemble import RandomForestClassifier\nfrom causalinference import CausalModel\nimport pandas as pd\n\n# 1. Estimate propensity scores\nX = df[features]\nT = df['treatment']\nps_model = RandomForestClassifier()\nps_model.fit(X, T)\npropensity_scores = ps_model.predict_proba(X)[:, 1]\n\n# 2. Create balanced sample\ncaliper = 0.2 * np.std(propensity_scores)\nmatches = []\nfor i in range(len(df)):\n    if T[i] == 1:  # Treated unit\n        control_idx = np.where(T == 0)[0]\n        distances = np.abs(propensity_scores[i] - propensity_scores[control_idx])\n        if np.min(distances) <= caliper:\n            matches.append((i, control_idx[np.argmin(distances)]))\n\n# 3. Estimate treatment effect\nmatched_df = df.iloc[[idx for pair in matches for idx in pair]]\nATE = (matched_df[matched_df['treatment'] == 1]['outcome'].mean() -\n       matched_df[matched_df['treatment'] == 0]['outcome'].mean())\n\n# 4. Sensitivity analysis (Rosenbaum bounds)\ngamma_values = np.linspace(1, 3, 10)\nsensitivity_results = []\nfor gamma in gamma_values:\n    # Calculate bounds on p-value\n    p_lower, p_upper = sensitivity_bounds(matches, gamma)\n    sensitivity_results.append({'gamma': gamma, \n                                'p_lower': p_lower, \n                                'p_upper': p_upper})</code></pre>\n        \n        <h4>4. Assumptions and Diagnostics</h4>\n        <ul>\n            <li><strong>Unconfoundedness:</strong> No unmeasured confounders</li>\n            <li><strong>Overlap:</strong> 0 < P(T=1|X) < 1 for all X</li>\n            <li><strong>Balance Diagnostics:</strong> Standardized mean differences < 0.1</li>\n        </ul>\n      "
    },
    {
        "number": 25,
        "title": "Time Series Deep Learning: LSTMs and Transformers",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Advanced time series forecasting using deep learning architectures that capture complex temporal dependencies and patterns.</p>\n        \n        <h4>2. LSTM Architecture for Time Series</h4>\n        <pre><code># PyTorch implementation\nimport torch\nimport torch.nn as nn\n\nclass LSTMForecaster(nn.Module):\n    def __init__(self, input_size, hidden_size, num_layers, output_size):\n        super().__init__()\n        self.lstm = nn.LSTM(input_size, hidden_size, \n                           num_layers, batch_first=True,\n                           dropout=0.2)\n        self.attention = nn.MultiheadAttention(hidden_size, num_heads=4)\n        self.fc = nn.Sequential(\n            nn.Linear(hidden_size, hidden_size // 2),\n            nn.ReLU(),\n            nn.Dropout(0.1),\n            nn.Linear(hidden_size // 2, output_size)\n        )\n        \n    def forward(self, x):\n        # x shape: (batch, seq_len, features)\n        lstm_out, (hidden, cell) = self.lstm(x)\n        \n        # Self-attention on LSTM outputs\n        attn_out, attn_weights = self.attention(\n            lstm_out, lstm_out, lstm_out\n        )\n        \n        # Use last time step for forecasting\n        last_timestep = attn_out[:, -1, :]\n        output = self.fc(last_timestep)\n        return output, attn_weights\n\n# Training with teacher forcing\nmodel = LSTMForecaster(input_size=10, hidden_size=64, \n                       num_layers=2, output_size=1)\ncriterion = nn.HuberLoss()  # Robust to outliers\noptimizer = torch.optim.AdamW(model.parameters(), lr=0.001)\n\n# Custom loss with temporal consistency penalty\ndef temporal_consistency_loss(predictions, targets, alpha=0.1):\n    mse = nn.MSELoss()(predictions, targets)\n    # Penalize erratic changes in predictions\n    pred_diff = torch.diff(predictions, dim=1)\n    target_diff = torch.diff(targets, dim=1)\n    consistency = nn.MSELoss()(pred_diff, target_diff)\n    return mse + alpha * consistency</code></pre>\n        \n        <h4>3. Transformer Architecture for Long Sequences</h4>\n        <pre><code>class TimeSeriesTransformer(nn.Module):\n    def __init__(self, d_model=64, nhead=4, num_layers=3):\n        super().__init__()\n        self.positional_encoding = PositionalEncoding(d_model)\n        encoder_layer = nn.TransformerEncoderLayer(\n            d_model=d_model, nhead=nhead, \n            dim_feedforward=256, dropout=0.1,\n            activation='gelu'\n        )\n        self.transformer_encoder = nn.TransformerEncoder(\n            encoder_layer, num_layers=num_layers\n        )\n        self.decoder = nn.Linear(d_model, 1)\n        \n    def forward(self, src, src_mask=None):\n        src = self.positional_encoding(src)\n        output = self.transformer_encoder(src, src_mask)\n        output = self.decoder(output[:, -1, :])  # Last position\n        return output\n\n# Positional encoding for time series\nclass PositionalEncoding(nn.Module):\n    def __init__(self, d_model, max_len=5000):\n        super().__init__()\n        pe = torch.zeros(max_len, d_model)\n        position = torch.arange(0, max_len).unsqueeze(1)\n        div_term = torch.exp(torch.arange(0, d_model, 2) *\n                           -(math.log(10000.0) / d_model))\n        pe[:, 0::2] = torch.sin(position * div_term)\n        pe[:, 1::2] = torch.cos(position * div_term)\n        pe = pe.unsqueeze(0)\n        self.register_buffer('pe', pe)\n        \n    def forward(self, x):\n        return x + self.pe[:, :x.size(1)]</code></pre>\n        \n        <h4>4. Advanced Features and Considerations</h4>\n        <ul>\n            <li><strong>Multi-step Forecasting:</strong> Recursive vs direct vs multiple output strategies</li>\n            <li><strong>Uncertainty Quantification:</strong> Monte Carlo dropout, deep ensembles</li>\n            <li><strong>Explainability:</strong> Attention weights analysis, SHAP values for time series</li>\n            <li><strong>Hybrid Models:</strong> Combine statistical methods with deep learning</li>\n        </ul>\n      "
    },
    {
        "number": 26,
        "title": "Bayesian Optimization for Hyperparameter Tuning",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Bayesian optimization uses probabilistic models to find the global optimum of expensive black-box functions with minimal evaluations, ideal for hyperparameter tuning.</p>\n        \n        <h4>2. Gaussian Process Surrogate Model</h4>\n        <pre><code>import numpy as np\nfrom scipy.stats import norm\nfrom sklearn.gaussian_process import GaussianProcessRegressor\nfrom sklearn.gaussian_process.kernels import Matern\n\nclass BayesianOptimizer:\n    def __init__(self, bounds, n_initial=5):\n        self.bounds = bounds\n        self.dim = len(bounds)\n        self.X = []\n        self.y = []\n        self.kernel = Matern(length_scale=1.0, nu=2.5)\n        self.gp = GaussianProcessRegressor(kernel=self.kernel, \n                                          alpha=1e-6,\n                                          normalize_y=True,\n                                          n_restarts_optimizer=5)\n        \n    def expected_improvement(self, X, xi=0.01):\n        \"\"\"Calculate Expected Improvement acquisition function\"\"\"\n        X = np.array(X).reshape(-1, self.dim)\n        mu, sigma = self.gp.predict(X, return_std=True)\n        sigma = sigma.reshape(-1, 1)\n        \n        mu_sample = self.gp.predict(np.array(self.X))\n        mu_sample_opt = np.max(mu_sample)\n        \n        with np.errstate(divide='warn'):\n            imp = mu - mu_sample_opt - xi\n            Z = imp / sigma\n            ei = imp * norm.cdf(Z) + sigma * norm.pdf(Z)\n            ei[sigma == 0.0] = 0.0\n            \n        return ei\n    \n    def propose_next_point(self):\n        \"\"\"Propose next point using EI\"\"\"\n        # Random search for initial points\n        if len(self.X) < 5:\n            return np.random.uniform(self.bounds[:, 0], \n                                    self.bounds[:, 1])\n        \n        # Fit GP to observations\n        self.gp.fit(np.array(self.X), np.array(self.y))\n        \n        # Optimize acquisition function\n        best_ei = -np.inf\n        best_x = None\n        \n        for _ in range(100):  # Random restarts\n            x0 = np.random.uniform(self.bounds[:, 0], \n                                  self.bounds[:, 1])\n            \n            # Use L-BFGS-B for bounded optimization\n            bounds = [(low, high) for low, high in self.bounds]\n            result = minimize(lambda x: -self.expected_improvement([x]),\n                            x0, bounds=bounds, \n                            method='L-BFGS-B')\n            \n            if -result.fun > best_ei:\n                best_ei = -result.fun\n                best_x = result.x\n                \n        return best_x\n    \n    def add_observation(self, x, y):\n        self.X.append(x)\n        self.y.append(y)</code></pre>\n        \n        <h4>3. Advanced Acquisition Functions</h4>\n        <pre><code>class AdvancedAcquisition:\n    @staticmethod\n    def upper_confidence_bound(mu, sigma, kappa=2.576):\n        \"\"\"Upper Confidence Bound (κ=2.576 for 99% CI)\"\"\"\n        return mu + kappa * sigma\n    \n    @staticmethod\n    def probability_of_improvement(mu, sigma, best_y, xi=0.01):\n        \"\"\"Probability of Improvement\"\"\"\n        Z = (mu - best_y - xi) / sigma\n        return norm.cdf(Z)\n    \n    @staticmethod\n    def knowledge_gradient(X_candidate, gp, current_best):\n        \"\"\"Knowledge Gradient - considers future optimization\"\"\"\n        # More computationally expensive but powerful\n        pass\n    \n    @staticmethod\n    def entropy_search(X_candidate, gp, bounds):\n        \"\"\"Entropy Search - maximizes information gain\"\"\"\n        # Information-theoretic approach\n        pass\n\n# Multi-fidelity optimization (cheap vs expensive evaluations)\nclass MultiFidelityBO:\n    def __init__(self):\n        self.low_fidelity_gp = GaussianProcessRegressor()\n        self.high_fidelity_gp = GaussianProcessRegressor()\n        \n    def propose_next_fidelity(self):\n        \"\"\"Decide whether to use low or high fidelity\"\"\"\n        # Use information gain per cost\n        pass</code></pre>\n        \n        <h4>4. Practical Considerations</h4>\n        <ul>\n            <li><strong>Parallelization:</strong> Batch Bayesian optimization with Kriging Believer</li>\n            <li><strong>Constraint Handling:</strong> Expected violation or barrier methods</li>\n            <li><strong>High Dimensions:</strong> Random embeddings or additive GPs</li>\n            <li><strong>Categorical Variables:</strong> One-hot encoding or specialized kernels</li>\n        </ul>\n      "
    },
    {
        "number": 27,
        "title": "Geometric Deep Learning on Graphs",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Extending deep learning to graph-structured data for applications in social networks, recommendation systems, molecular chemistry, and knowledge graphs.</p>\n        \n        <h4>2. Graph Neural Network Architectures</h4>\n        <pre><code>import torch\nimport torch.nn as nn\nimport torch.nn.functional as F\nfrom torch_geometric.nn import GCNConv, GATConv, SAGEConv\n\nclass GNNModel(nn.Module):\n    def __init__(self, in_features, hidden_dim, out_features, \n                 num_layers=3, dropout=0.2):\n        super().__init__()\n        \n        # Graph Convolution Layers\n        self.convs = nn.ModuleList()\n        self.convs.append(GCNConv(in_features, hidden_dim))\n        for _ in range(num_layers - 2):\n            self.convs.append(GCNConv(hidden_dim, hidden_dim))\n        self.convs.append(GCNConv(hidden_dim, out_features))\n        \n        # Attention mechanism for node importance\n        self.attention = nn.Sequential(\n            nn.Linear(out_features, hidden_dim),\n            nn.Tanh(),\n            nn.Linear(hidden_dim, 1)\n        )\n        \n        self.dropout = dropout\n        \n    def forward(self, x, edge_index, batch=None):\n        # Message passing\n        for conv in self.convs[:-1]:\n            x = conv(x, edge_index)\n            x = F.relu(x)\n            x = F.dropout(x, p=self.dropout, training=self.training)\n        \n        # Final layer\n        x = self.convs[-1](x, edge_index)\n        \n        # Graph-level pooling with attention\n        if batch is not None:\n            # Attention weights for each node\n            attention_weights = torch.softmax(\n                self.attention(x).squeeze(), \n                dim=0\n            )\n            # Weighted sum for graph representation\n            graph_rep = torch.zeros(batch.max() + 1, \n                                   x.size(1)).to(x.device)\n            for i in range(batch.max() + 1):\n                mask = (batch == i)\n                if mask.any():\n                    weights = attention_weights[mask]\n                    graph_rep[i] = (x[mask] * \n                                   weights.unsqueeze(1)).sum(0)\n            return graph_rep\n        \n        return x\n\n# Advanced: Graph Attention Networks\nclass GATModel(nn.Module):\n    def __init__(self, in_features, hidden_dim, out_features, \n                 heads=8, dropout=0.6):\n        super().__init__()\n        self.gat1 = GATConv(in_features, hidden_dim, \n                           heads=heads, dropout=dropout)\n        self.gat2 = GATConv(hidden_dim * heads, out_features, \n                           heads=1, concat=False, dropout=dropout)\n        \n    def forward(self, x, edge_index):\n        x = F.dropout(x, p=0.6, training=self.training)\n        x = self.gat1(x, edge_index)\n        x = F.elu(x)\n        x = F.dropout(x, p=0.6, training=self.training)\n        x = self.gat2(x, edge_index)\n        return x</code></pre>\n        \n        <h4>3. Graph Generation and Autoencoders</h4>\n        <pre><code>class GraphVAE(nn.Module):\n    \"\"\"Variational Autoencoder for graph generation\"\"\"\n    def __init__(self, max_nodes, node_features, \n                 hidden_dim, latent_dim):\n        super().__init__()\n        \n        # Encoder\n        self.encoder = GNNModel(node_features, hidden_dim, \n                               hidden_dim)\n        self.mu_linear = nn.Linear(hidden_dim, latent_dim)\n        self.logvar_linear = nn.Linear(hidden_dim, latent_dim)\n        \n        # Decoder\n        self.decoder = nn.Sequential(\n            nn.Linear(latent_dim, hidden_dim),\n            nn.ReLU(),\n            nn.Linear(hidden_dim, max_nodes * max_nodes)\n        )\n        \n    def encode(self, x, edge_index):\n        h = self.encoder(x, edge_index)\n        return self.mu_linear(h), self.logvar_linear(h)\n        \n    def reparameterize(self, mu, logvar):\n        std = torch.exp(0.5 * logvar)\n        eps = torch.randn_like(std)\n        return mu + eps * std\n        \n    def decode(self, z):\n        adj_logits = self.decoder(z)\n        return torch.sigmoid(adj_logits)\n        \n    def forward(self, x, edge_index):\n        mu, logvar = self.encode(x, edge_index)\n        z = self.reparameterize(mu, logvar)\n        adj_recon = self.decode(z)\n        return adj_recon, mu, logvar\n\n# Graph similarity learning\nclass GraphMatchingNetwork(nn.Module):\n    def __init__(self, gnn):\n        super().__init__()\n        self.gnn = gnn\n        self.similarity = nn.CosineSimilarity(dim=1)\n        \n    def forward(self, graph1, graph2):\n        emb1 = self.gnn(graph1.x, graph1.edge_index)\n        emb2 = self.gnn(graph2.x, graph2.edge_index)\n        \n        # Multi-perspective matching\n        similarity = self.similarity(emb1, emb2)\n        return similarity</code></pre>\n        \n        <h4>4. Applications and Considerations</h4>\n        <ul>\n            <li><strong>Dynamic Graphs:</strong> Temporal GNNs for evolving networks</li>\n            <li><strong>Heterogeneous Graphs:</strong> Meta-paths and relation-aware attention</li>\n            <li><strong>Scalability:</strong> Graph sampling techniques (GraphSAGE, Cluster-GCN)</li>\n            <li><strong>Explainability:</n></li>\n        </ul>\n      "
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
            },
            {
                number: 36,
                difficulty: "hard",
                question: "A factory produces items with 2% defect rate. In a sample of 50 items, what is the probability of exactly 2 defectives?",
                context: "Use binomial distribution: P(X=k) = C(n,k) × p^k × (1-p)^(n-k)",
                answer: `<h4>Solution:</h4><p>Using binomial distribution with n=50, p=0.02:</p><p>P(X=2) = C(50,2) × (0.02)² × (0.98)⁴⁸</p><p>C(50,2) = 1225</p><p>P(X=2) = 1225 × 0.0004 × 0.3812 ≈ <strong>0.1858 or 18.58%</strong></p>`
            },
            {
                number: 37,
                difficulty: "hard",
                question: "Test scores are normally distributed with mean=75, standard deviation=8. What percentage of students scored above 85?",
                context: "Use z-score: z = (x - μ) / σ and standard normal distribution table",
                answer: `<h4>Solution:</h4><p>z = (85 - 75) / 8 = 1.25</p><p>P(Z > 1.25) = 1 - 0.8944 = 0.1056</p><p><strong>Answer: 10.56% of students scored above 85</strong></p><h4>Interpretation:</h4><p>Only about 1 in 10 students scored above 85 in this normally distributed test.</p>`
            },
            {
                number: 38,
                difficulty: "hard",
                question: "A sample of 36 students has mean score 82 with standard deviation 12. Construct a 95% confidence interval for the population mean.",
                context: "Use t-distribution with df = n-1 = 35, t-value at 0.025 is approximately 2.030",
                answer: `<h4>Solution:</h4><p>Using t-distribution with df=35, t₀.₀₂₅ ≈ 2.030</p><p>Standard Error = s / √n = 12 / √36 = 12 / 6 = 2</p><p>CI = 82 ± 2.030 × 2 = 82 ± 4.06</p><p><strong>95% CI = [77.94, 86.06]</strong></p><h4>Interpretation:</h4><p>We are 95% confident that the true population mean lies between 77.94 and 86.06.</p>`
            },
            {
                number: 39,
                difficulty: "hard",
                question: "A company claims average battery life ≥ 100 hours. A sample of 40 batteries has mean=98 hours, std dev=8. Test at α=0.05 if the claim is valid.",
                context: "One-tailed hypothesis test: H₀: μ ≥ 100 vs H₁: μ < 100",
                answer: `<h4>Solution:</h4><p><strong>Step 1:</strong> H₀: μ ≥ 100, H₁: μ < 100 (left-tailed)</p><p><strong>Step 2:</strong> α = 0.05, df = 39, critical value ≈ -1.685</p><p><strong>Step 3:</strong> t = (98 - 100) / (8 / √40) = -2 / 1.265 ≈ <strong>-1.581</strong></p><p><strong>Step 4:</strong> Since t = -1.581 > -1.685, we fail to reject H₀</p><p><strong>Step 5:</strong> <strong>Conclusion:</strong> Insufficient evidence to reject the company's claim at α=0.05 level.</p>`
            },
            {
                number: 40,
                difficulty: "hard",
                question: "Two machines produce components. Machine A: n₁=50, mean=12.3mm, s₁=0.5mm. Machine B: n₂=60, mean=12.1mm, s₂=0.6mm. Test if means differ at α=0.01.",
                context: "Two-sample t-test assuming equal variances",
                answer: `<h4>Solution:</h4><p><strong>H₀:</strong> μ₁ = μ₂, <strong>H₁:</strong> μ₁ ≠ μ₂ (two-tailed)</p><p><strong>Pooled variance:</strong> s_p² = [(49×0.25 + 59×0.36)] / 108 = 0.3101</p><p><strong>Pooled std dev:</strong> s_p = 0.5569</p><p><strong>Test statistic:</strong> t = (12.3 - 12.1) / [0.5569 × √(1/50 + 1/60)] ≈ <strong>1.876</strong></p><p><strong>Critical value:</strong> ±2.624 (df=108, α=0.01)</p><p><strong>Conclusion:</strong> Since |1.876| < 2.624, <strong>fail to reject H₀.</strong> No significant difference in means between machines.</p>`
            },
            {
                number: 41,
                difficulty: "medium",
                question: "Calculate mean, median, mode, and standard deviation for: [4, 8, 6, 5, 3, 8, 9]",
                context: "Basic descriptive statistics calculation",
                answer: `<h4>Solution:</h4><p><strong>Sorted:</strong> [3, 4, 5, 6, 8, 8, 9]</p><p><strong>Mean</strong> = (4+8+6+5+3+8+9)/7 = 43/7 ≈ <strong>6.14</strong></p><p><strong>Median</strong> = <strong>6</strong> (middle value)</p><p><strong>Mode</strong> = <strong>8</strong> (appears twice)</p><p><strong>Variance</strong> = Σ(x-x̄)²/(n-1) ≈ 5.48</p><p><strong>Standard Deviation</strong> = √5.48 ≈ <strong>2.34</strong></p>`
            },
            {
                number: 42,
                difficulty: "medium",
                question: "Find Q1, Q2 (median), Q3, and IQR for: [10, 12, 14, 16, 18, 20, 22, 24, 26]",
                context: "Quartile analysis",
                answer: `<h4>Solution:</h4><p><strong>Ordered data:</strong> [10, 12, 14, 16, 18, 20, 22, 24, 26]</p><p><strong>Q2 (Median)</strong> = <strong>18</strong> (middle value, position 5)</p><p><strong>Lower half:</strong> [10, 12, 14, 16] → <strong>Q1</strong> = (12+14)/2 = <strong>13</strong></p><p><strong>Upper half:</strong> [20, 22, 24, 26] → <strong>Q3</strong> = (22+24)/2 = <strong>23</strong></p><p><strong>IQR</strong> = Q3 - Q1 = 23 - 13 = <strong>10</strong></p><p><strong>Outlier range:</strong> Below 13 - 1.5(10) = -2 or above 23 + 1.5(10) = 38 (no outliers)</p>`
            },
            {
                number: 43,
                difficulty: "hard",
                question: "Compare variability: Stock A has mean=$100, SD=$15. Stock B has mean=$50, SD=$5. Which is more stable?",
                context: "Use coefficient of variation (CV)",
                answer: `<h4>Solution:</h4><p><strong>Stock A:</strong> CV = (15/100) × 100% = <strong>15%</strong></p><p><strong>Stock B:</strong> CV = (5/50) × 100% = <strong>10%</strong></p><p><strong>Conclusion:</strong> <strong>Stock B is more stable</strong> (lower CV) despite smaller absolute standard deviation.</p><p><strong>Key Insight:</strong> Always use CV when comparing variability across different scales or units. Stock A is riskier because each dollar is 15% volatile, while Stock B is only 10% volatile.</p>`
            },
            {
                number: 44,
                difficulty: "medium",
                question: "A dataset has mean=50, SD=10. Using the empirical rule, what percentage of data lies between 40 and 60?",
                context: "Normal distribution empirical rule (68-95-99.7 rule)",
                answer: `<h4>Solution:</h4><p><strong>Range [40, 60] represents [μ - 1σ, μ + 1σ]</strong> (since μ=50, σ=10)</p><p>According to the 68-95-99.7 rule for normal distributions:</p><ul><li>68% within 1 standard deviation</li><li>95% within 2 standard deviations</li><li>99.7% within 3 standard deviations</li></ul><p><strong>Answer: 68% of data</strong> lies between 40 and 60 (in a normally distributed dataset).</p>`
            },
            {
                number: 45,
                difficulty: "hard",
                question: "A one-sample t-test on a sample of 25 items against a hypothesized mean of 100 yields t=2.5. At α=0.05, what is your conclusion?",
                context: "Degrees of freedom = 24, critical t ≈ 2.064 (two-tailed)",
                answer: `<h4>Solution:</h4><p><strong>Given:</strong> t-statistic = 2.5, df = 24, α = 0.05 (two-tailed)</p><p><strong>Critical value:</strong> t₀.₀₂₅,₂₄ ≈ <strong>2.064</strong></p><p><strong>Comparison:</strong> |2.5| > 2.064</p><p><strong>Decision:</strong> Since the test statistic exceeds the critical value, we <strong>reject H₀</strong>.</p><p><strong>Conclusion:</strong> The sample mean is significantly different from 100 at the 0.05 significance level (p < 0.05).</p>`
            },
            {
                number: 46,
                difficulty: "medium",
                question: "A researcher wants to estimate the average height of college students. Define the population, sample, parameter, and statistic for this study.",
                context: "Statistical terminology and concepts",
                answer: `<h4>Solution:</h4><ul><li><strong>Population:</strong> All college students (entire group of interest)</li><li><strong>Sample:</strong> The subset of college students actually measured</li><li><strong>Parameter:</strong> The true average height of all college students (unknown)</li><li><strong>Statistic:</strong> The average height calculated from the sample (known, computed value)</li></ul><p><strong>Key Point:</strong> We use the statistic to estimate the parameter.</p>`
            },
            {
                number: 47,
                difficulty: "medium",
                question: "Compare the geometric mean and arithmetic mean for growth rates: 1.05, 1.08, 1.12 (representing 5%, 8%, 12% growth over 3 years)",
                context: "Geometric mean for compound growth",
                answer: `<h4>Solution:</h4><p><strong>Geometric Mean:</strong> GM = (1.05 × 1.08 × 1.12)^(1/3) = (1.2668)^(1/3) ≈ 1.0814 or 8.14% average annual growth</p><p><strong>Arithmetic Mean:</strong> (1.05 + 1.08 + 1.12) / 3 = 1.0833 or 8.33%</p><p><strong>Key Insight:</strong> For compound growth rates, use geometric mean (it's lower and more accurate). The difference becomes significant with more extreme values.</p>`
            },
            {
                number: 48,
                difficulty: "hard",
                question: "Dataset: [2, 4, 4, 4, 5, 5, 7, 9]. Identify the mean, median, mode, range, variance, SD, and quartiles. Identify any outliers.",
                context: "Complete descriptive statistics analysis",
                answer: `<h4>Calculations:</h4><ul><li><strong>Mean:</strong> (2+4+4+4+5+5+7+9)/8 = 40/8 = 5</li><li><strong>Median:</strong> (4+5)/2 = 4.5 (average of middle two values)</li><li><strong>Mode:</strong> 4 (appears 3 times)</li><li><strong>Range:</strong> 9 - 2 = 7</li><li><strong>Variance:</strong> Σ(x-5)² / 7 = 40/7 ≈ 5.71</li><li><strong>Standard Deviation:</strong> √5.71 ≈ 2.39</li><li><strong>Quartiles:</strong> Q1=4, Q2=4.5, Q3=6, IQR=2</li><li><strong>Outlier bounds:</strong> Below 4-1.5(2)=1 or above 6+1.5(2)=9. Value 9 is borderline but included.</li></ul>`
            },
            {
                number: 49,
                difficulty: "medium",
                question: "A card is drawn from a standard deck. What is P(Red or Face Card)?",
                context: "Addition rule of probability",
                answer: `<h4>Solution:</h4><p><strong>Method 1 (Addition Rule):</strong> P(A∪B) = P(A) + P(B) - P(A∩B)</p><ul><li>P(Red) = 26/52 = 0.5</li><li>P(Face Card) = 12/52 (3 face cards per suit × 4 suits)</li><li>P(Red AND Face Card) = 6/52 (3 face cards × 2 red suits)</li><li>P(Red OR Face) = 26/52 + 12/52 - 6/52 = 32/52 = 8/13 ≈ 0.615</li></ul><p><strong>Method 2 (Counting):</strong> Red cards (26) + Black Face cards (6) = 32/52 = 8/13</p>`
            },
            {
                number: 50,
                difficulty: "hard",
                question: "A disease affects 1% of the population. A test is 99% accurate (sensitivity and specificity). If someone tests positive, what's the probability they actually have the disease? (Use Bayes' Theorem)",
                context: "Bayes' theorem application in medical testing",
                answer: `<h4>Solution (Bayes' Theorem):</h4><p>P(Disease|Positive) = [P(Positive|Disease) × P(Disease)] / P(Positive)</p><ul><li>P(Disease) = 0.01</li><li>P(No Disease) = 0.99</li><li>P(Positive|Disease) = 0.99 (sensitivity)</li><li>P(Positive|No Disease) = 0.01 (1-specificity)</li><li>P(Positive) = 0.99×0.01 + 0.01×0.99 = 0.0198</li><li>P(Disease|Positive) = (0.99 × 0.01) / 0.0198 ≈ 0.50 or 50%</li></ul><p><strong>Surprising Result:</strong> Only 50% probability despite 99% accurate test! This is because the disease is rare.</p>`
            },
            {
                number: 51,
                difficulty: "hard",
                question: "A manufacturer finds defects at 3% rate. In a batch of 100 items, what's the probability of at least 5 defects? (Binomial distribution)",
                context: "Binomial cumulative probability",
                answer: `<h4>Solution:</h4><p>n=100, p=0.03, find P(X ≥ 5)</p><p><strong>Method:</strong> P(X ≥ 5) = 1 - P(X ≤ 4) = 1 - [P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)]</p><p><strong>Using Binomial calculations:</strong></p><ul><li>P(X=0) ≈ 0.0476, P(X=1) ≈ 0.1471, P(X=2) ≈ 0.2252, P(X=3) ≈ 0.2274, P(X=4) ≈ 0.1704</li><li>P(X ≤ 4) ≈ 0.7777</li></ul><p><strong>Answer:</strong> P(X ≥ 5) ≈ 0.2223 or 22.23%</p>`
            },
            {
                number: 52,
                difficulty: "medium",
                question: "Test scores follow normal distribution with μ=75, σ=10. What score represents the 90th percentile?",
                context: "Normal distribution inverse calculation",
                answer: `<h4>Solution:</h4><p>Find x where P(X ≤ x) = 0.90</p><p><strong>Using z-scores:</strong> From z-table, z₀.₉₀ ≈ 1.28</p><p><strong>Transform back to original scale:</strong> x = μ + z×σ = 75 + 1.28×10 = 75 + 12.8 = <strong>87.8</strong></p><p><strong>Interpretation:</strong> A score of 87.8 is at the 90th percentile, meaning 90% of students scored at or below this.</p>`
            },
            {
                number: 53,
                difficulty: "hard",
                question: "A random sample of 64 students has average GPA of 3.2 with SD=0.8. Construct a 99% CI for the population mean GPA.",
                context: "Confidence interval with t-distribution or z-distribution",
                answer: `<h4>Solution:</h4><p>n=64 (large sample, can use z), x̄=3.2, s=0.8, confidence=99%</p><p><strong>For 99% CI:</strong> z₀.₀₀₅ ≈ 2.576</p><p><strong>Standard Error:</strong> SE = 0.8 / √64 = 0.8 / 8 = 0.1</p><p><strong>Margin of Error:</strong> ME = 2.576 × 0.1 = 0.2576</p><p><strong>CI:</strong> 3.2 ± 0.2576 = [2.94, 3.46]</p><p><strong>Interpretation:</strong> We are 99% confident the true population mean GPA is between 2.94 and 3.46.</p>`
            },
            {
                number: 54,
                difficulty: "hard",
                question: "A manufacturer claims light bulbs last 1000 hours. A sample of 25 bulbs averages 950 hours with SD=100. Test at α=0.05 if the claim is accurate (two-tailed).",
                context: "Two-sample t-test hypothesis testing",
                answer: `<h4>Solution:</h4><p><strong>Step 1:</strong> H₀: μ = 1000, H₁: μ ≠ 1000</p><p><strong>Step 2:</strong> α = 0.05, df = 24</p><p><strong>Step 3:</strong> t = (950 - 1000) / (100 / √25) = -50 / 20 = <strong>-2.5</strong></p><p><strong>Step 4:</strong> Critical values (two-tailed, df=24): ±2.064</p><p><strong>Step 5:</strong> Since |−2.5| > 2.064, <strong>reject H₀</strong></p><p><strong>Conclusion:</strong> At the 0.05 level, there is significant evidence that bulbs do not last 1000 hours on average; they last less.</p>`
            },
            {
                number: 55,
                difficulty: "hard",
                question: "Calculate Pearson's correlation coefficient for: X=[1,2,3,4,5], Y=[2,4,5,4,6]",
                context: "Correlation analysis and relationship strength",
                answer: `<h4>Solution Using Correlation Formula:</h4><p>r = [nΣxy - ΣxΣy] / √{[nΣx²-(Σx)²][nΣy²-(Σy)²]}</p><p><strong>Calculations:</strong></p><ul><li>n=5, ΣX=15, ΣY=21, ΣX²=55, ΣY²=97, ΣXY=71</li><li>Numerator: 5(71) - 15(21) = 355 - 315 = 40</li><li>Denominator: √{[275-225][485-441]} = √{[50][44]} = √2200 ≈ 46.9</li><li>r ≈ 40 / 46.9 ≈ <strong>0.85</strong></li></ul><p><strong>Interpretation:</strong> Strong positive correlation (0.85). As X increases, Y tends to increase.</p>`
            },
            {
                number: 56,
                difficulty: "medium",
                question: "Example 1 - Basic Calculations: Calculate mean, median, mode, variance, and standard deviation for: [4, 8, 6, 5, 3, 8, 9]",
                context: "Worked example from statistics library - descriptive statistics",
                answer: `<h4>Solution - Step by Step:</h4><p><strong>Data:</strong> [4, 8, 6, 5, 3, 8, 9]</p><p><strong>Mean:</strong> (4+8+6+5+3+8+9)/7 = 43/7 ≈ <strong>6.14</strong></p><p><strong>Median:</strong> Sorted: [3,4,5,6,8,8,9] → Middle value = <strong>6</strong></p><p><strong>Mode:</strong> <strong>8</strong> (appears twice, others once)</p><p><strong>Variance (Sample):</strong> Sum of squared deviations / (n-1) ≈ <strong>4.81</strong></p><p><strong>Standard Deviation:</strong> √4.81 ≈ <strong>2.19</strong></p><h4>Interpretation:</h4><p>The average value is 6.14, with typical spread of ±2.19 from the mean. The data is symmetric around median of 6.</p>`
            },
            {
                number: 57,
                difficulty: "hard",
                question: "Example 2 - Binomial Distribution: A manufacturing process produces 2% defects. If 50 items are inspected, what's the probability of exactly 2 defects? What's the probability of at least 2 defects?",
                context: "Worked example from statistics library - binomial probability",
                answer: `<h4>Solution - Binomial Distribution:</h4><p><strong>Given:</strong> n=50, k=2, p=0.02 (2% defect rate)</p><h4>Part A: P(X = 2) using Binomial Formula</h4><p>P(X=k) = C(n,k) × p^k × (1-p)^(n-k)</p><p>P(X=2) = C(50,2) × (0.02)² × (0.98)⁴⁸</p><p><strong>Calculation:</strong></p><ul><li>C(50,2) = 1,225</li><li>(0.02)² = 0.0004</li><li>(0.98)⁴⁸ ≈ 0.3814</li><li>P(X=2) = 1,225 × 0.0004 × 0.3814 ≈ <strong>0.1858 or 18.58%</strong></li></ul><h4>Part B: P(X ≥ 2) = 1 - P(X ≤ 1)</h4><p>P(X ≥ 2) = 1 - [P(X=0) + P(X=1)]</p><ul><li>P(X=0) ≈ 0.3642</li><li>P(X=1) ≈ 0.3716</li><li>P(X ≥ 2) = 1 - 0.7358 ≈ <strong>0.2642 or 26.42%</strong></li></ul><h4>Interpretation:</h4><p>There's ~19% chance of exactly 2 defects and ~26% chance of 2 or more defects in 50 items.</p>`
            },
            {
                number: 58,
                difficulty: "hard",
                question: "Example 3 - Normal Distribution: Exam scores are normally distributed with μ=75 and σ=8. What percentage of students score above 85? What range contains the middle 90% of scores?",
                context: "Worked example from statistics library - normal distribution",
                answer: `<h4>Solution - Normal Distribution Analysis:</h4><p><strong>Given:</strong> μ=75, σ=8, normal distribution</p><h4>Part A: P(X > 85)</h4><p><strong>Step 1:</strong> Calculate z-score: z = (X - μ) / σ = (85 - 75) / 8 = 10/8 = 1.25</p><p><strong>Step 2:</strong> Use standard normal table: P(Z ≤ 1.25) ≈ 0.8944</p><p><strong>Step 3:</strong> P(Z > 1.25) = 1 - 0.8944 = 0.1056 or <strong>10.56%</strong></p><h4>Part B: Range for Middle 90%</h4><p>For 90% in middle, each tail has 5%</p><ul><li>Left critical z-value: -1.645 (5th percentile)</li><li>Right critical z-value: +1.645 (95th percentile)</li></ul><p><strong>Lower bound:</strong> μ - 1.645σ = 75 - (1.645)(8) = 75 - 13.16 = <strong>61.84</strong></p><p><strong>Upper bound:</strong> μ + 1.645σ = 75 + (1.645)(8) = 75 + 13.16 = <strong>88.16</strong></p><h4>Interpretation:</h4><p>About 10.56% of students score above 85, and the middle 90% of scores fall between 61.84 and 88.16.</p>`
            },
            {
                number: 59,
                difficulty: "hard",
                question: "Example 4 - Confidence Intervals: A sample of 36 random students has a mean math score of 82 with standard deviation 12. Construct a 95% confidence interval for the population mean.",
                context: "Worked example from statistics library - confidence intervals",
                answer: `<h4>Solution - 95% Confidence Interval for Population Mean:</h4><p><strong>Given:</strong> n=36, x̄=82, s=12, Confidence level = 95%</p><h4>Step 1: Determine Critical Value</h4><p>Since n=36 > 30, use z-distribution (approximately normal)</p><p>For 95% confidence: z₀.₀₂₅ = <strong>1.96</strong></p><h4>Step 2: Calculate Standard Error</h4><p>SE = s / √n = 12 / √36 = 12 / 6 = <strong>2</strong></p><h4>Step 3: Calculate Margin of Error</h4><p>ME = z × SE = 1.96 × 2 = <strong>3.92</strong></p><h4>Step 4: Construct Confidence Interval</h4><p>CI = x̄ ± ME = 82 ± 3.92</p><p><strong>Lower bound:</strong> 82 - 3.92 = <strong>78.08</strong></p><p><strong>Upper bound:</strong> 82 + 3.92 = <strong>85.92</strong></p><p><strong>95% CI = [78.08, 85.92]</strong> or approximately <strong>[78.08, 86.06]</strong></p><h4>Interpretation:</h4><p>We are 95% confident that the true population mean math score lies between 78.08 and 85.92. If we repeated sampling 100 times, ~95 intervals would contain the true mean.</p>`
            },
            {
                number: 60,
                difficulty: "hard",
                question: "Example 5 - Hypothesis Testing: A battery manufacturer claims batteries last 200 hours. A sample of 16 batteries averaged 190 hours with SD=20. Test at α=0.05 whether the claim is valid (two-tailed).",
                context: "Worked example from statistics library - hypothesis testing",
                answer: `<h4>Solution - Two-Tailed Hypothesis Test:</h4><p><strong>Given:</strong> Claim: μ = 200 hours, n=16, x̄=190, s=20, α=0.05</p><h4>Step 1: Formulate Hypotheses</h4><ul><li>H₀: μ = 200 (manufacturer's claim is true)</li><li>H₁: μ ≠ 200 (claim is not valid) - Two-tailed test</li></ul><h4>Step 2: Identify Test Type and Critical Value</h4><p>Use t-test (population SD unknown, n < 30)</p><p>df = n - 1 = 15</p><p>Critical values (two-tailed, α=0.05): ±<strong>2.131</strong></p><h4>Step 3: Calculate Test Statistic</h4><p>SE = s / √n = 20 / √16 = 20 / 4 = 5</p><p>t = (x̄ - μ₀) / SE = (190 - 200) / 5 = -10 / 5 = <strong>-2.0</strong></p><h4>Step 4: Make Decision</h4><p>|t| = |-2.0| = 2.0 < 2.131 (critical value)</p><p><strong>Fail to reject H₀</strong></p><h4>Step 5: Conclusion</h4><p>At the 0.05 significance level, there is insufficient evidence to reject the manufacturer's claim. The sample evidence does not contradict the claim that batteries last 200 hours.</p>`
            },
            {
                number: 61,
                difficulty: "hard",
                question: "Example 6 - Correlation Analysis: Two variables X=[2,4,6,8,10] and Y=[1,3,5,7,9] have perfect linear relationship. Calculate and interpret the correlation coefficient.",
                context: "Worked example from statistics library - correlation analysis",
                answer: `<h4>Solution - Pearson Correlation Coefficient:</h4><p><strong>Given:</strong> X=[2,4,6,8,10], Y=[1,3,5,7,9]</p><h4>Step 1: Calculate Required Sums</h4><ul><li>n = 5</li><li>ΣX = 2+4+6+8+10 = 30</li><li>ΣY = 1+3+5+7+9 = 25</li><li>ΣXY = 2(1)+4(3)+6(5)+8(7)+10(9) = 2+12+30+56+90 = 190</li><li>ΣX² = 4+16+36+64+100 = 220</li><li>ΣY² = 1+9+25+49+81 = 165</li></ul><h4>Step 2: Apply Correlation Formula</h4><p>r = [nΣXY - ΣXΣY] / √{[nΣX² - (ΣX)²][nΣY² - (ΣY)²]}</p><h4>Step 3: Calculate Numerator</h4><p>nΣXY - ΣXΣY = 5(190) - (30)(25) = 950 - 750 = 200</p><h4>Step 4: Calculate Denominator</h4><p>[nΣX² - (ΣX)²] = 5(220) - (30)² = 1100 - 900 = 200</p><p>[nΣY² - (ΣY)²] = 5(165) - (25)² = 825 - 625 = 200</p><p>√(200 × 200) = √40000 = 200</p><h4>Step 5: Calculate r</h4><p>r = 200 / 200 = <strong>1.0</strong></p><h4>Interpretation:</h4><p>Perfect positive correlation (r = 1.0). For every unit increase in X, Y increases by exactly 1 unit. The relationship is perfectly linear with no scatter.</p>`
            },
            {
                number: 62,
                difficulty: "hard",
                question: "Example 7 - Quartiles and Outliers: Analyze the dataset [2,4,4,4,5,5,7,9] to find Q1, Q2, Q3, IQR, and identify any outliers using the 1.5×IQR rule.",
                context: "Worked example from statistics library - quartile analysis",
                answer: `<h4>Solution - Quartile Analysis and Outlier Detection:</h4><p><strong>Given:</strong> Dataset = [2,4,4,4,5,5,7,9] (already sorted, n=8)</p><h4>Step 1: Find Q2 (Median)</h4><p>Since n=8 (even), median = average of 4th and 5th values</p><p>Q2 = (4 + 5) / 2 = <strong>4.5</strong></p><h4>Step 2: Find Q1 (Median of Lower Half)</h4><p>Lower half: [2, 4, 4, 4] (n=4, even)</p><p>Q1 = (4 + 4) / 2 = <strong>4</strong></p><h4>Step 3: Find Q3 (Median of Upper Half)</h4><p>Upper half: [5, 5, 7, 9] (n=4, even)</p><p>Q3 = (5 + 7) / 2 = <strong>6</strong></p><h4>Step 4: Calculate IQR</h4><p>IQR = Q3 - Q1 = 6 - 4 = <strong>2</strong></p><h4>Step 5: Determine Outlier Boundaries (1.5×IQR Rule)</h4><p>Lower boundary = Q1 - 1.5(IQR) = 4 - 1.5(2) = 4 - 3 = <strong>1</strong></p><p>Upper boundary = Q3 + 1.5(IQR) = 6 + 1.5(2) = 6 + 3 = <strong>9</strong></p><h4>Step 6: Identify Outliers</h4><p>Any value < 1 or > 9 is an outlier</p><p>All values in [2,4,4,4,5,5,7,9] are within [1, 9]</p><p><strong>No outliers detected</strong></p><h4>Complete Summary:</h4><ul><li>Q1 = 4</li><li>Q2 (Median) = 4.5</li><li>Q3 = 6</li><li>IQR = 2</li><li>Outliers: None</li></ul>`
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
    },

    etl1: {
        title: "ETL 1: Foundations",
        lessons: [
    {
        "title": "What Is ETL Testing?",
        "content": "ETL testing ensures that data is extracted, transformed, and loaded correctly across systems. It is the backbone of data quality in modern organizations.\n\n**Core Pipeline Stages:**\n- **Extract**: Pulling raw data from sources (APIs, DBs, Files).\n- **Transform**: Applying business logic (cleansing, mapping, aggregating).\n- **Load**: Inserting data into the target warehouse/lake.\n- **Validate**: Python-driven verification layer.\n- **Report**: Logging and auditing results.\n\n**ETL vs ELT:**\n- **ETL**: Data is transformed *before* loading. Common for traditional warehouses.\n- **ELT**: Data is loaded first, then transformed *inside* the warehouse. Common for modern cloud lakes (BigQuery, Snowflake)."
    },
    {
        "title": "The ETL Tester Mindset",
        "content": "ETL testing requires a different way of thinking compared to UI or API testing.\n\n**The Four Pillars of the ETL Mindset:**\n1. **Data Flow Thinking**: Visualizing how data moves from Source → Staging → Target.\n2. **Business Rule Awareness**: Encoding complex logic into Python validation functions.\n3. **Anticipating Anomalies**: Predicting nulls, duplicates, and data drift.\n4. **Automation-First Approach**: Always asking: \"Can this be scheduled and repeated?\""
    },
    {
        "title": "Why Python Over SQL or GUI?",
        "content": "While SQL is great for querying, Python acts as the \"glue\" that orchestrates the entire pipeline.\n\n| Feature | Python | SQL | GUI Tools |\n|---------|--------|-----|-----------|\n| **Scope** | Cross-platform automation | Only inside databases | License-dependent |\n| **Logic** | Reusable modules/classes | One-off queries | Limited flexibility |\n| **Integration** | Cloud APIs, File systems | Mostly DB-bound | Proprietary connectors |\n| **Cost** | Open Source | Open Source / Proprietary | Expensive Licenses |\n\n**Pro Tip:** Use SQL for extraction and Python for the complex reconciliation logic."
    },
    {
        "title": "Real-World ETL Scenarios",
        "content": "How Python is used in enterprise environments:\n\n1. **File Reconciliation**: Comparing a 2-million-row CSV with a Target DB.\n2. **Schema Validation**: Detecting if a JSON API field changed from 'ID' to 'uuid'.\n3. **Transformation Logic**: Verifying rules like \"If status = 'A', set ActiveFlag = 1\".\n4. **Metadata Extraction**: Pulling start/end times and row counts for audit logs."
    },
    {
        "title": "Case Study: Schema Drift",
        "content": "**Scenario**: A third-party provider adds a new column 'middle_name' to their CSV, and your ETL pipeline crashes.\n**Python Solution**: Build a Schema Validator that checks the header *before* processing rows.\n```python\nrequired = [\"id\", \"first_name\", \"last_name\"]\nactual = header.split(\",\")\nmissing = [c for c in required if c not in actual]\nif missing:\n    raise Exception(f\"Schema Drift Detected! Missing: {missing}\")\n```"
    },
    {
        "title": "Mastery: The Reusability Matrix",
        "content": "In enterprise ETL, we never build \"one-off\" scripts. We build \"Systems\".\n\n**The Reusability Checklist:**\n- Is the validation logic separate from the data?\n- Can this script handle 10 rows AND 10 million rows?\n- If the database password changes, do I have to edit the code? (No, use Config!)\n- Is there a clear \"Audit Trail\" of what happened?\n\n```text\n╔══════════════════════════════════════╗\n║        REUSABLE ETL ARCHITECTURE     ║\n╠══════════════════════════════════════╣\n║ [Config] → [Validator] → [Orchestrator] ║\n║    ↑            ↑            ↑       ║\n║ [Secret]   [Logic]      [Scheduler]  ║\n╚══════════════════════════════════════╝\n```"
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "beginner",
        "question": "What is the primary difference between ETL and ELT?\\n\\n**Options:**\\n1. The source system used\\n2. Where the transformation happens\\n3. The file format\\n4. The number of rows",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Where the transformation happens"
    },
    {
        "number": 2,
        "difficulty": "beginner",
        "question": "Why is Python preferred over GUI tools for custom validation?\\n\\n**Options:**\\n1. It is more expensive\\n2. It lacks flexibility\\n3. It connects to any system and costs nothing\\n4. It only handles small data",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - It connects to any system and costs nothing"
    },
    {
        "number": 3,
        "difficulty": "beginner",
        "question": "Which stage handles cleaning and mapping data?\\n\\n**Options:**\\n1. Extract\\n2. Transform\\n3. Load\\n4. Report",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Transform"
    },
    {
        "number": 4,
        "difficulty": "beginner",
        "question": "What does 'Schema Drift' refer to?\\n\\n**Options:**\\n1. Moving data to a new server\\n2. Changes in the source data structure\\n3. Slow database queries\\n4. Duplicate row counts",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Changes in the source data structure"
    },
    {
        "number": 5,
        "difficulty": "beginner",
        "question": "What is the best way to handle 2 million rows for comparison?\\n\\n**Options:**\\n1. Manual sampling\\n2. Python-driven automated reconciliation\\n3. Excel formulas\\n4. Visual inspection",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Python-driven automated reconciliation"
    }
]
    },

    etl2: {
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
    },

    etl3: {
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
    },

    etl4: {
        title: "ETL 4: Files & Functions",
        lessons: [
    {
        "title": "Streaming vs Loading Files",
        "content": "Memory management is key for large files.\n- **Loading**: `f.read()` loads everything into memory. (Bad for 1GB files!)\n- **Streaming**: `for line in f:` processes one row at a time. (Standard for ETL).\n\n**Pro Tip:** Use the `with` statement (`Context Manager`) to ensure files are closed automatically, even if an error occurs."
    },
    {
        "title": "Handling CSV Data",
        "content": "The `csv` module is your best friend.\n```python\nimport csv\nwith open('data.csv', 'r') as f:\n    reader = csv.DictReader(f) # Maps header to values automatically\n    for row in reader:\n        print(row['amount'])\n```\nAlways specify `encoding='utf-8'` and `newline=''` for consistency across Windows/Mac."
    },
    {
        "title": "JSON Processing for ETL",
        "content": "JSON is the universal format for modern APIs.\n- **Deserialize**: `json.loads(text)` -> Python Dictionary.\n- **Serialize**: `json.dumps(dict)` -> JSON String.\n- **Nested Data**: Handle deep nesting with safe checks: `data.get('user', {}).get('address', 'N/A')`."
    },
    {
        "title": "Directory Traversal & OS Module",
        "content": "ETL often involves \"watching\" a folder for new files.\n```python\nimport os\nfor filename in os.listdir('incoming/'):\n    if filename.endswith('.csv'):\n        process(filename)\n```\nUse `os.path.join()` to build paths that work on both Windows (`\\`) and Linux (`/`)."
    },
    {
        "title": "Log Management (The Audit Trail)",
        "content": "ETL without logging is not enterprise-grade.\n**Key Log Entries:**\n- Timestamp of start/end.\n- Source filename.\n- Success count vs Failure count.\n- Error messages for rejected rows.\nUse the `logging` module instead of `print()` for levels like INFO, WARNING, and ERROR."
    },
    {
        "title": "Mastery: Encoding & Line Endings",
        "content": "The #1 cause of \"corrupted\" ETL data is a mismatch in Encoding.\n- **UTF-8**: The modern standard (Global support).\n- **Latin-1 / CP1252**: Common in legacy Windows files.\n\n**The Diagnostic Script:**\n```python\nwith open('data.csv', 'rb') as f:\n    raw = f.read(100) # Read first 100 bytes\n    print(raw) # Look for \\\\x00 or \\\\xfe (Indicators of UTF-16)\n```\nAlways explicitly set `encoding='utf-8'` to prevent invisible characters from breaking your string comparisons."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "intermediate",
        "question": "Why is 'streaming' a file better than 'loading' it?\\n\\n**Options:**\\n1. It uses more memory\\n2. It allows processing massive files efficiently\\n3. It is slower\\n4. It deletes the file",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - It allows processing massive files efficiently"
    },
    {
        "number": 2,
        "difficulty": "intermediate",
        "question": "Which module is used to list files in a directory?\\n\\n**Options:**\\n1. sys\\n2. os\\n3. math\\n4. csv",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - os"
    },
    {
        "number": 3,
        "difficulty": "intermediate",
        "question": "What does json.loads() do?\\n\\n**Options:**\\n1. Turns a dictionary into a string\\n2. Turns a JSON string into a Python object\\n3. Deletes a JSON file\\n4. Updates a database",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Turns a JSON string into a Python object"
    },
    {
        "number": 4,
        "difficulty": "intermediate",
        "question": "How should you build file paths for cross-platform support?\\n\\n**Options:**\\n1. String concatenation ('data/' + name)\\n2. os.path.join()\\n3. Hardcoded paths\\n4. Manual entry",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - os.path.join()"
    },
    {
        "number": 5,
        "difficulty": "intermediate",
        "question": "What should be logged in an ETL process?\\n\\n**Options:**\\n1. Secret passwords\\n2. Every single row value\\n3. Start/end times and error summaries\\n4. Nothing",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Start/end times and error summaries"
    }
]
    },

    etl5: {
        title: "ETL 5: Advanced Automation",
        lessons: [
    {
        "title": "The Power of Helper Functions",
        "content": "Don't write one massive script. Break it into small, testable \"pure\" functions.\n**Examples of ETL Helpers:**\n- `validate_email(email)`: Returns True/False.\n- `clean_currency(val)`: Returns float.\n- `check_duplicates(id_list)`: Logs errors.\n\n**Pro Tip:** A function should do ONE thing well."
    },
    {
        "title": "Modular Pipeline Orchestration",
        "content": "Move your functions into separate files (modules).\n- `validators.py`: Schema and business rules.\n- `db_client.py`: Database connections.\n- `orchestrator.py`: The main \"glue\" that runs the steps in order.\n\nImport them using: `from src.utils import db_client`."
    },
    {
        "title": "Parameterization",
        "content": "Avoid hardcoding file names or thresholds inside functions. Pass them as arguments.\n```python\n# Bad\ndef validate():\n    if row['total'] > 100: ...\n\n# Professional\ndef validate(row, threshold):\n    if row['total'] > threshold: ...\n```"
    },
    {
        "title": "Error Propagation Patterns",
        "content": "How do you handle a failure in row 500 of 1 million?\n1. **Stop & Fail**: Raise exception, kill process (Audit critical).\n2. **Skip & Log**: Skip row, add to `rejected_data.csv`, continue (Standard).\n3. **Dead Letter Queue**: Store failed rows in a specific DB table for manual review."
    },
    {
        "title": "Best Practices: Dry (Don't Repeat Yourself)",
        "content": "If you find yourself copy-pasting code for row count checks in every script, create a `Utility Library`.\n**Refactoring Checklist:**\n- Can this logic be used in other projects?\n- Is the function name clear?\n- Are the inputs and outputs documented?"
    },
    {
        "title": "Mastery: Unit Testing ETL Helpers",
        "content": "Even small helper functions like `clean_currency()` need to be tested.\nUse the **PyTest** framework to ensure your helpers handle edge cases.\n\n```python\ndef test_clean_currency():\n    assert clean_currency(\"$1,000.50\") == 1000.50\n    assert clean_currency(\"\") == 0.0\n    assert clean_currency(\"N/A\") == 0.0\n```\n**Why?** If you fix a bug in your currency cleaner, you want to be 100% sure you didn't break it for other formats."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "intermediate",
        "question": "What is a 'pure' function?\\n\\n**Options:**\\n1. A function with no code\\n2. A function that always returns the same output for same input with no side effects\\n3. A function that talks to a database\\n4. A function with many parameters",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - A function that always returns the same output for same input with no side effects"
    },
    {
        "number": 2,
        "difficulty": "intermediate",
        "question": "Why separate validators from orchestration logic?\\n\\n**Options:**\\n1. To make the code longer\\n2. To improve reusability and testability\\n3. To hide errors\\n4. To save space",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - To improve reusability and testability"
    },
    {
        "number": 3,
        "difficulty": "intermediate",
        "question": "What is the 'Stop & Fail' pattern best for?\\n\\n**Options:**\\n1. Non-critical log files\\n2. Financial audits where data integrity is paramount\\n3. Social media data\\n4. Temporary folders",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Financial audits where data integrity is paramount"
    },
    {
        "number": 4,
        "difficulty": "intermediate",
        "question": "What does DRY stand for?\\n\\n**Options:**\\n1. Data Ready Yield\\n2. Don't Repeat Yourself\\n3. Do Repeat Yesterday\\n4. Data Robust Yield",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Don't Repeat Yourself"
    },
    {
        "number": 5,
        "difficulty": "intermediate",
        "question": "How should you handle row-level errors in a standard ETL process?\\n\\n**Options:**\\n1. Delete the whole source file\\n2. Ignore them\\n3. Skip and log to a rejected data file\\n4. Restart the computer",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Skip and log to a rejected data file"
    }
]
    },

    etl6: {
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
    },

    etl7: {
        title: "ETL 7: Advanced OOP",
        lessons: [
    {
        "title": "The Retry Mechanism",
        "content": "Network blips and API timeouts are common. Professional scripts don't just fail; they **Retry**.\n```python\nimport time\nfor i in range(3): # Try 3 times\n    try:\n        response = call_api()\n        break # Exit loop on success\n    except:\n        time.sleep(2) # Wait before retry\n```\n**Exponential Backoff**: Increasing the wait time (`2^i`) to avoid overwhelming the server."
    },
    {
        "title": "Data Checksums & Hashes",
        "content": "How do you verify 1TB of data moved correctly? You can't compare every row.\n- **MD5/SHA Hashes**: Calculate a unique \"digital fingerprint\" for the whole file or specific columns.\n- **Checksums**: If the Source Hash == Target Hash, the data integrity is 100%.\n\n**Pro Tip:** Use the `hashlib` module for fast, secure file verification."
    },
    {
        "title": "Metadata Harvesting",
        "content": "In enterprise ETL, the \"Data about the Data\" (Metadata) is as important as the data itself.\nCapture:\n- **Lineage**: Where did this row come from?\n- **Batch IDs**: Grouping rows by execution run.\n- **Process Status**: COMPLETED, FAILED, PARTIAL."
    },
    {
        "title": "Handling Schema Drift Automatically",
        "content": "Instead of hardcoding column names, use a **Config-Driven** approach.\nStore column definitions in a YAML file.\nYour script reads the YAML and validates the file dynamically.\n**Benefit**: You fix schema changes by editing a config file, NOT by rewriting code."
    },
    {
        "title": "Parallel Processing Basics",
        "content": "If processing takes 10 hours, use the `multiprocessing` or `concurrent.futures` modules to process multiple files or chunks simultaneously.\n**Warning**: Only parallelize \"IO-bound\" tasks (API calls) or CPU-heavy transformations. Be careful with database lock-contention!"
    },
    {
        "title": "Mastery: Multi-System Reconciliation",
        "content": "In modern cloud architecture, data moves through many hops:\n**Oracle (On-Prem) → S3 (Landing) → Snowflake (Warehouse)**.\n\n**The Multi-Point Validation Pattern:**\n1. **Hop 1**: Compare Oracle Row Count vs S3 File Line Count.\n2. **Hop 2**: Compare S3 Column Count vs Snowflake Stage Column Count.\n3. **Hop 3**: Compare Source Sum(Amount) vs Target Sum(Amount).\n\n**Strategy**: Create a single \"Reconciliation Report\" that aggregates these results into a readable table for stakeholders."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "advanced",
        "question": "What is 'Exponential Backoff' used for?\\n\\n**Options:**\\n1. Speeding up loops\\n2. Gradually increasing wait time during retries to reduce server load\\n3. Deleting old files\\n4. Encrypted storage",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Gradually increasing wait time during retries to reduce server load"
    },
    {
        "number": 2,
        "difficulty": "advanced",
        "question": "What is a 'Digital Fingerprint' of a file called?\\n\\n**Options:**\\n1. Index\\n2. Checksum/Hash\\n3. Binary Log\\n4. Metadata",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Checksum/Hash"
    },
    {
        "number": 3,
        "difficulty": "advanced",
        "question": "Why use 'Config-Driven' validation?\\n\\n**Options:**\\n1. To make code harder to read\\n2. To handle changes (Schema Drift) without editing code\\n3. To save disk space\\n4. To use more CPU",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - To handle changes (Schema Drift) without editing code"
    },
    {
        "number": 4,
        "difficulty": "advanced",
        "question": "What is Metadata?\\n\\n**Options:**\\n1. Secret data\\n2. Binary data\\n3. Data about the data (Lineage, Run IDs, etc.)\\n4. Deleted data",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Data about the data (Lineage, Run IDs, etc.)"
    },
    {
        "number": 5,
        "difficulty": "advanced",
        "question": "When is parallel processing harmful in ETL?\\n\\n**Options:**\\n1. When you have many CPUs\\n2. When multiple processes try to write to the same database table/row at once, causing locks\\n3. When the file is small\\n4. When using Python",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - When multiple processes try to write to the same database table/row at once, causing locks"
    }
]
    },

    etl8: {
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
    },

    etl9: {
        title: "ETL 9: API Automation",
        lessons: [
    {
        "title": "REST APIs for ETL",
        "content": "Modern ETL often pulls data from APIs rather than CSVs.\n**The Python Request Cycle:**\n1. **Request**: `requests.get(url, headers, params)`.\n2. **Handle Status**: `response.raise_for_status()` (Check for 200, 404, 500 errors).\n3. **Parse**: `data = response.json()`.\n\n**Pro Tip**: Always include a `timeout` in your requests to prevent your pipeline from hanging forever."
    },
    {
        "title": "Authentication & Headers",
        "content": "Enterprise APIs require security.\n- **API Keys**: Passed in the URL or header.\n- **Bearer Tokens (JWT)**: Passed in the header: `{\"Authorization\": \"Bearer XYZ\"}`.\n- **Custom Headers**: Used for tracking (`X-Request-ID`) or content-type."
    },
    {
        "title": "Pagination (The Infinite Loop Risk)",
        "content": "If an API has 50,000 records, it won't return them all at once. It returns a \"Page\".\n**Patterns:**\n- **Page-based**: `?page=1`, `?page=2`... Stop when the result list is empty.\n- **Next-Link**: The response contains a URL for the next page.\n- **Offset/Limit**: `?offset=100&limit=100`."
    },
    {
        "title": "JSON Validation with Python",
        "content": "Don't just assume the JSON is correct. \n**Validation Pattern:**\n```python\nrequired = [\"id\", \"status\"]\nfor key in required:\n    if key not in response_data:\n        log_failure(f\"API Schema Break: {key} missing\")\n```\nCheck types using `isinstance(val, int)` for sensitive fields like 'amount'."
    },
    {
        "title": "Mocking APIs for Testing",
        "content": "What if the API is down but you need to test your ETL logic?\nUse the `unittest.mock` or `responses` library to \"simulate\" the API.\nThis allows you to test how your script handles different status codes (500, 403) without actually calling the remote server."
    },
    {
        "title": "Mastery: Rate Limiting & 429 Errors",
        "content": "Enterprises often limit how many times you can call an API per minute.\n**HTTP 429: Too Many Requests.**\n\n**The Handling Strategy:**\n- **Inspect Response Headers**: Many APIs return `Retry-After: 60` (seconds).\n- **Sleep & Retry**: Use your retry logic to wait the duration specified by the server.\n- **Throttling**: Intentionally slow down your script using `time.sleep(0.5)` between calls to stay under the limit."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "intermediate/advanced",
        "question": "Which HTTP status code indicates 'Unauthorized'?\\n\\n**Options:**\\n1. 200\\n2. 401\\n3. 404\\n4. 500",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - 401"
    },
    {
        "number": 2,
        "difficulty": "intermediate/advanced",
        "question": "What is an 'Endless Loop' risk in API scripting?\\n\\n**Options:**\\n1. Wrong URL\\n2. Incorrect Pagination logic that never finds an 'end' signal\\n3. High CPU\\n4. Slow network",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Incorrect Pagination logic that never finds an 'end' signal"
    },
    {
        "number": 3,
        "difficulty": "intermediate/advanced",
        "question": "Why use 'timeout' in requests.get()?\\n\\n**Options:**\\n1. To make it faster\\n2. To prevent the script from waiting forever if the server is unresponsive\\n3. To save battery\\n4. To encrypt the connection",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - To prevent the script from waiting forever if the server is unresponsive"
    },
    {
        "number": 4,
        "difficulty": "intermediate/advanced",
        "question": "How do you access a nested JSON value like 'user' -> 'email'?\\n\\n**Options:**\\n1. data['user_email']\\n2. data['user']['email']\\n3. data.email\\n4. data(user, email)",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - data['user']['email']"
    },
    {
        "number": 5,
        "difficulty": "intermediate/advanced",
        "question": "What does raise_for_status() do?\\n\\n**Options:**\\n1. Deletes the response\\n2. Prints the data\\n3. Raises an exception if the status code indicates an error (e.g. 4xx/5xx)\\n4. Increases the server speed",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Raises an exception if the status code indicates an error (e.g. 4xx/5xx)"
    }
]
    },

    etl10: {
        title: "ETL 10: Databases & SQL",
        lessons: [
    {
        "title": "Connecting Python to SQL",
        "content": "Python uses \"Base Drivers\" and \"ORMs\".\n- **SQLite3**: Built-in, no setup, perfect for local testing.\n- **SQLAlchemy**: The enterprise standard. Connects to MySQL, Postgres, SQL Server, etc.\n- **Patterns**: Connect -> Create Cursor -> Execute SQL -> Fetch Results -> Close."
    },
    {
        "title": "The Source vs Target Recon",
        "content": "This is the #1 job of an ETL tester.\n**The SQL Pattern:**\n```sql\n-- Run on Source\nSELECT SUM(amount) FROM raw_data;\n-- Run on Target\nSELECT SUM(amount) FROM warehouse_table;\n```\nCompare the results in Python. If they differ even by a cent, fail the validation."
    },
    {
        "title": "SQL Data Quality Queries",
        "content": "Automate these checks using Python:\n- **Null Checks**: `SELECT COUNT(*) FROM table WHERE id IS NULL;`\n- **Duplicate Checks**: `SELECT id, COUNT(*) FROM table GROUP BY id HAVING COUNT(*) > 1;`\n- **Range Checks**: `SELECT * FROM table WHERE age < 0 OR age > 120;`"
    },
    {
        "title": "Working with Window Functions",
        "content": "Modern ETL validation uses \"Window Functions\" to compare rows against their colleagues.\n```sql\nSELECT id, amount,\n       ROW_NUMBER() OVER (PARTITION BY id ORDER BY timestamp) as rank\nFROM audit_table;\n```\nThis helps detect duplicate entries that appeared close together in time."
    },
    {
        "title": "Atomic Loads & Transactions",
        "content": "What if the database crashes halfway through a 1-million-row load? You end up with \"Dirty Data\".\n**The Solution**: **Database Transactions**.\nWrap your load logic in `conn.commit()` and `conn.rollback()`. \nEither *everything* loads, or *nothing* loads. This preserves data integrity."
    },
    {
        "title": "Mastery: SCD Type 1 vs Type 2 Logic",
        "content": "ETL testers must understand how \"History\" is stored in databases.\n- **SCD Type 1**: Overwrite old data. (Simple, but you lose history).\n- **SCD Type 2**: Add a new row with a version number or \"active_flag\". (Complex, preserves history).\n\n**Validation Pattern for Type 2:**\n1. Ensure the \"Old Row\" has its `end_date` updated to TODAY.\n2. Ensure the \"New Row\" has a `start_date` of TODAY and `is_active = True`.\n3. Verify that for any given ID, only ONE row has `is_active = True`."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "intermediate/advanced",
        "question": "In SQL, which clause identifies duplicates?\\n\\n**Options:**\\n1. WHERE\\n2. ORDER BY\\n3. GROUP BY ... HAVING COUNT(*) > 1\\n4. LIMIT",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - GROUP BY ... HAVING COUNT(*) > 1"
    },
    {
        "number": 2,
        "difficulty": "intermediate/advanced",
        "question": "What is an 'Atomic' database operation?\\n\\n**Options:**\\n1. A complex query\\n2. An operation that completes fully or not at all (no partial data)\\n3. A fast query\\n4. A query with many joins",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - An operation that completes fully or not at all (no partial data)"
    },
    {
        "number": 3,
        "difficulty": "intermediate/advanced",
        "question": "Which Python module is built-in for SQL?\\n\\n**Options:**\\n1. pandas\\n2. sqlite3\\n3. requests\\n4. math",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - sqlite3"
    },
    {
        "number": 4,
        "difficulty": "intermediate/advanced",
        "question": "Why compare 'SUM(amount)' between Source and Target?\\n\\n**Options:**\\n1. To check for data loss or hidden transformation errors in numeric fields\\n2. To sort the data\\n3. To delete rows\\n4. To count files",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 1** - To check for data loss or hidden transformation errors in numeric fields"
    },
    {
        "number": 5,
        "difficulty": "intermediate/advanced",
        "question": "What does conn.rollback() do?\\n\\n**Options:**\\n1. Saves changes\\n2. Deletes the table\\n3. Undoes all changes in the current transaction if an error occurs\\n4. Restarts the DB",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Undoes all changes in the current transaction if an error occurs"
    }
]
    }
};

const hasSplitData = typeof window !== "undefined"
    && window.sqlData
    && window.statisticsData
    && window.pythonData
    && window.visualizationData
    && window.excelData
    && window.businessData
    && window.etl1Data
    && window.etl2Data
    && window.etl3Data
    && window.etl4Data
    && window.etl5Data
    && window.etl6Data
    && window.etl7Data
    && window.etl8Data
    && window.etl9Data
    && window.etl10Data;

const topicsData = hasSplitData ? {
    sql: window.sqlData,
    statistics: window.statisticsData,
    python: window.pythonData,
    visualization: window.visualizationData,
    excel: window.excelData,
    business: window.businessData,
    etl1: window.etl1Data,
    etl2: window.etl2Data,
    etl3: window.etl3Data,
    etl4: window.etl4Data,
    etl5: window.etl5Data,
    etl6: window.etl6Data,
    etl7: window.etl7Data,
    etl8: window.etl8Data,
    etl9: window.etl9Data,
    etl10: window.etl10Data
} : legacyTopicsData;

if (typeof window !== "undefined") {
    window.topicsData = topicsData;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = topicsData;
}
