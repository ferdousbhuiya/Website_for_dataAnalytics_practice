const sqlProjectData = {
    title: "SQL Project: E-Commerce Sales Analytics",
    metadata: {
        track: 'data-analyst',
        category: 'SQL Project',
        icon: '📊',
        description: "A complete SQL analytics case study — from understanding the schema to final business dashboard queries."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview & Business Questions",
            content: `A complete SQL analytics project on an **e-commerce** database. You are a data analyst. The VP of Sales wants answers — this is the exact type of task you will get on the job or in an interview.

**The schema (star-shaped: one fact table, two dimensions):**

\`\`\`mermaid
flowchart LR
    A[orders fact] -->|customer_id| B[customers dim]
    A -->|product_id| C[products dim]
\`\`\`

\`\`\`sql
-- orders: the fact table (transaction-level)
orders(id, order_date, customer_id, product_id, quantity, unit_price)

-- customers: who bought
customers(id, join_date, country, segment)

-- products: what they bought
products(id, name, category, cost)
\`\`\`

**The business questions we must answer:**
1. Total revenue and how it grew month over month.
2. Top products and categories.
3. Customer lifetime value (CLV) and retention.
4. Country and segment breakdown.
5. Month-over-month retention of cohorts.

**Plan of attack:** start with the simplest query, then layer on joins, aggregations, and window functions — exactly the progression a real analyst follows.`
        },
        {
            number: 2,
            title: "Step 1: Read the Schema, Confirm the Data",
            content: `Before writing business queries, **understand the schema** and sanity-check the data. An analyst who queries blind builds dashboards on broken data.

\`\`\`sql
-- 1. How many rows in each table?
SELECT 'orders' AS tbl, COUNT(*) FROM orders
UNION ALL SELECT 'customers', COUNT(*) FROM customers
UNION ALL SELECT 'products', COUNT(*) FROM products;

-- 2. Row count + revenue sanity (should match the fact table total)
SELECT COUNT(*) AS n_orders,
       COUNT(DISTINCT customer_id) AS n_customers,
       SUM(amount) AS total_revenue,
       MIN(order_date) AS earliest,
       MAX(order_date) AS latest
FROM orders;

-- 3. Are there NULLs or bad keys (orphans)?
SELECT COUNT(*) AS orphan_orders
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
WHERE c.id IS NULL;
\`\`\`

**What you're really checking:** row counts match expectations, dates are in range, and joins won't silently drop rows. If \`total_revenue\` looks off or orphans > 0, stop — fix the data before building anything.`
        },
        {
            number: 3,
            title: "Step 2: Total Revenue & Month-Over-Month Trend",
            content: `Now answer Q1 — total revenue, then the growth trend with an aggregate and a window function.

\`\`\`sql
-- Total + monthly revenue
SELECT DATE_TRUNC('month', order_date) AS month,
       COUNT(*) AS orders,
       SUM(amount) AS revenue
FROM orders
GROUP BY 1
ORDER BY 1;

-- Month-over-month growth using LAG (window function)
SELECT month,
       revenue,
       LAG(revenue) OVER (ORDER BY month) AS prev_month,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
             / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 1) AS mom_growth_pct
FROM (
    SELECT DATE_TRUNC('month', order_date) AS month, SUM(amount) AS revenue
    FROM orders GROUP BY 1
) t
ORDER BY month;
\`\`\`

**The LAG pattern is the daily tool for MoM / YoY.** Contain the subquery (monthly aggregates), then compare each row to the prior using \`LAG\`. If you wanted a 12-month comparison you'd use \`LAG(revenue, 12)\`. This answers the "is the business growing?" question.`
        },
        {
            number: 4,
            title: "Step 3: Top Products & Revenue by Category",
            content: `Q2: where is the money concentrated? Revenue by category, and the top-selling products.

\`\`\`sql
-- Revenue by product category
SELECT p.category,
       COUNT(*) AS orders,
       SUM(o.amount) AS revenue,
       ROUND(AVG(o.amount), 2) AS avg_order_value
FROM orders o
JOIN products p ON o.product_id = p.id
GROUP BY p.category
ORDER BY revenue DESC;

-- Top 5 products by revenue (ranked)
SELECT p.name, SUM(o.amount) AS revenue
FROM orders o
JOIN products p ON o.product_id = p.id
GROUP BY p.name
ORDER BY revenue DESC
LIMIT 5;
\`\`\`

**Read differently, it answers a decision:**
- Is revenue **concentrated** in a handful of products (risk if they falter) or spread out?
- Which category is *under-priced* (high volume, low avg value)? That's a price-optimization lead.
- Percent-of-total: \`SUM(o.amount) / SUM(SUM(o.amount)) OVER ()\` gives each category's share.`
        },
        {
            number: 5,
            title: "Step 4: Customer Lifetime Value & Cohorts",
            content: `Q3+Q5, the genuinely interesting part: **customer lifetime value (CLV)** and **cohort retention**. This is where an analyst separates insight from counting.

\`\`\`sql
-- Customer lifetime value: total spend per customer
SELECT c.id,
       c.segment,
       COUNT(o.id) AS n_orders,
       SUM(o.amount) AS lifetime_value,
       DATEDIFF(day, MIN(o.order_date), MAX(o.order_date)) AS active_days
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.segment
ORDER BY lifetime_value DESC;

-- Cohort: month of first order per customer
WITH first_orders AS (
    SELECT customer_id, DATE_TRUNC('month', MIN(order_date)) AS cohort_month
    FROM orders GROUP BY customer_id
)
SELECT
    f.cohort_month,
    COUNT(*) AS cohort_size,
    SUM(o.amount) AS cohort_revenue
FROM first_orders f
JOIN orders o ON o.customer_id = f.customer_id
GROUP BY f.cohort_month
ORDER BY f.cohort_month;
\`\`\`

**CLV is the metric that drives a business:** if lifetime value < cost to acquire a customer, the business bleeds. Segmenting by \`segment\` shows which customer type is worth inviting back.

The left-joined customers table surfaces buyers with zero orders — they are churn/acquisition risk, not revenue.`
        },
        {
            number: 6,
            title: "Step 5: Country Breakdown & Funnel",
            content: `Q4 + a touch of the endlessly useful **country breakdown**.

\`\`\`sql
-- Revenue and customer count by country
SELECT c.country,
       COUNT(DISTINCT o.customer_id) AS n_customers,
       SUM(o.amount) AS revenue,
       ROUND(AVG(o.amount), 2) AS avg_order
FROM orders o
JOIN customers c ON o.customer_id = c.id
GROUP BY c.country
ORDER BY revenue DESC;

-- Are we over-reliant on one country? (share of revenue)
SELECT c.country,
       ROUND(100.0 * SUM(o.amount) / SUM(SUM(o.amount)) OVER (), 1) AS revenue_share_pct
FROM orders o JOIN customers c ON o.customer_id = c.id
GROUP BY c.country
ORDER BY revenue_share_pct DESC;
\`\`\`

**The dashboard-ready funnel** (visits → add-to-cart → checkout → purchase) is a classic product-analytics SQL. It shares the same shape: count distinct users at each step, then compute step-to-step conversion.`
        },
        {
            number: 7,
            title: "Step 6: Tying It Together — The Executive Query",
            content: `A single query that an executive can read: **the quarterly revenue dashboard with trend, growth, and product share** in one result set. Use CTEs to keep it readable.

\`\`\`sql
WITH revenue AS (
  SELECT DATE_TRUNC('quarter', o.order_date) AS q,
         SUM(o.amount) AS revenue
  FROM orders o
  GROUP BY 1
),
top_categories AS (
  SELECT DATE_TRUNC('quarter', o.order_date) AS q,
         p.category,
         SUM(o.amount) AS cat_revenue
  FROM orders o
  JOIN products p ON o.product_id = p.id
  GROUP BY 1, 2
)
SELECT
  r.q,
  r.revenue,
  tc.category AS top_category,
  tc.cat_revenue,
  ROUND(100.0 * (r.revenue - LAG(r.revenue) OVER (ORDER BY r.q))
        / NULLIF(LAG(r.revenue) OVER (ORDER BY r.q), 0), 1) AS qoq_growth_pct
FROM revenue r
LEFT JOIN top_categories tc ON tc.q = r.q
ORDER BY r.q DESC;
\`\`\`

**This is the shape of a good report query:** one CTE per question, joined at the end, with window aggregates for trends. It's readable, debuggable, and reproducible. That's what separates a senior analyst from a query-writer.`
        },
        {
            number: 8,
            title: "Step 7: Optimization & SQL Best Practices",
            content: `Final polish — the habits that keep SQL fast and correct:

\`\`\`sql
-- SELECT only needed columns (not SELECT *)
SELECT category, SUM(amount) FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.order_date >= '2023-01-01'       -- filter early
GROUP BY category;

-- Filter before heavy aggregation where possible
SELECT COUNT(*) FROM orders
WHERE order_date >= '2023-01-01';
\`\`\`

**Best practices used throughout the project:**
- **SELECT only what you need** — not \`*\` in production.
- **Filter early** (\`WHERE\` before the heavy group/join) to shrink row count.
- **\`GROUP BY 1\` / order by ordinal** for readable SQL.
- **Prefer CTEs** over deep-nested subqueries for readability + debuggability.
- **Use \`LEFT JOIN\` when you must keep base rows** (e.g., customers with no orders).
- **Test on a sample** (\`LIMIT 100\`) before running on the whole table.

**You should now be able to:** pull a monthly revenue trend, explain the growth, break revenue by category/country, find top customers, and build a retention cohort — armed with nothing but SQL.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "Write a query to get total revenue grouped by month.",
            answer: "SELECT DATE_TRUNC('month', order_date) AS month, SUM(amount) AS revenue FROM orders GROUP BY month ORDER BY month; (DATE_TRUNC is Postgres; in MySQL use DATE_FORMAT(order_date, '%Y-%m') or MONTH())."
        },
        {
            number: 2,
            difficulty: "medium",
            question: "How do you calculate month-over-month revenue growth in SQL?",
            answer: "Aggregate revenue by month into a subquery or CTE, then SELECT LAG(revenue) OVER (ORDER BY month) as prev, and compute 100.0*(revenue - prev)/NULLIF(prev,0). Window functions like LAG give you the prior-row reference without collapsing rows."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "Write a query to find the top 3 products by revenue.",
            answer: "SELECT p.name, SUM(o.amount) AS revenue FROM orders o JOIN products p ON o.product_id = p.id GROUP BY p.name ORDER BY revenue DESC LIMIT 3; To rank without a hard limit, use ROW_NUMBER() or RANK() OVER (ORDER BY revenue DESC)."
        },
        {
            number: 4,
            difficulty: "hard",
            question: "What is customer lifetime value (CLV), and how do you compute it in SQL?",
            answer: "CLV is the total revenue attributed to a single customer, usually the SUM of all their orders: SELECT customer_id, SUM(amount) AS lifetime_value FROM orders GROUP BY customer_id. Analysts then segment by cohort (first-order month) to see whether newer customers have different LTV than older ones."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "Why would you use a LEFT JOIN instead of an INNER JOIN when analyzing customers and orders?",
            answer: "LEFT JOIN keeps every row from the left (customers) table even when the right table has no match. That surfaces customers who have never ordered — the retention/churn risk you want to report — whereas INNER JOIN would silently drop them."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "How do you compute a cohort retention table (users who returned each month after signup)?",
            answer: "First assign each customer their cohort month = MIN(order_date) per customer. Then for each cohort, count distinct customers active in each subsequent month by joining the cohort to monthly activity and counting per (cohort_month, activity_month). Retention = active / cohort_size, shown as a matrix or line."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "What does a window function like LAG() do that a GROUP BY can't?",
            answer: "GROUP BY collapses rows into one per group, so it can't show a value and its prior neighbor on the same row. LAG() reads a value from a previous row without collapsing, letting you compute deltas, growth, or running totals over an ordered set."
        },
        {
            number: 8,
            difficulty: "easy",
            question: "What is a star schema, and why is it common in analytics?",
            answer: "A star schema has one central fact table (transactions/orders, with measures and foreign keys) surrounded by dimension tables (customers, products, dates). It is common because it is denormalized for fast aggregation and easy joins — the analyst joins facts to dimensions on stable keys."
        }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "The VP of Sales asks whether the business is actually growing month over month. You need a query that shows each month's revenue next to the previous month's.",
            question: "Which SQL pattern correctly computes month-over-month revenue growth?",
            options: [
                "SELECT SUM(amount) FROM orders WHERE order_date > today",
                "Aggregate revenue by month, then use LAG(revenue) OVER (ORDER BY month) to compare each month to the prior",
                "Group revenue by customer and sort descending",
                "Use a self-join on order_id to double the rows"
            ],
            answer: "Correct Option: Aggregate revenue by month, then use LAG(revenue) OVER (ORDER BY month) to compare each month to the prior"
        },
        {
            case: 2,
            scenario: "You build a revenue-by-country report but the customer count looks low. An INNER JOIN silently drops customers who have never placed an order, and those are exactly the churn-risk accounts leadership wants to see.",
            question: "Which join should you use to keep customers with zero orders visible?",
            options: [
                "INNER JOIN so only matching rows remain",
                "LEFT JOIN from customers to orders so customers with no orders still appear",
                "CROSS JOIN to pair every customer with every order",
                "RIGHT JOIN from orders so only orders appear"
            ],
            answer: "Correct Option: LEFT JOIN from customers to orders so customers with no orders still appear"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.sqlProjectData = sqlProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sqlProjectData;
}