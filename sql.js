// SQL topic data
const sqlData = {
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
};

if (typeof window !== "undefined") {
    window.sqlData = sqlData;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = sqlData;
}
