// ETL1 topic data - Deep Practical Lessons + Quizzes + Labs + Case Studies
const etl1Data = {
    title: "ETL 1: Foundations – Practical, Real-World & Assessment",
    lessons: [
        {
            title: "ETL in the Real World",
            content: "ETL is the backbone of modern analytics and decision-making.\n\n**Real Scenario:**\nA retail company has POS (Point of Sale), E-commerce, and CRM systems. ETL unifies them into one warehouse so leaders can see revenue, customer behavior, and service issues in one place.\n\n**Without ETL:**\n• Data scattered across multiple systems\n• Reports manually created from different sources\n• Inconsistent definitions (e.g., \"customer\" defined differently in CRM vs POS)\n• Slow, error-prone decision making\n• No single source of truth\n\n**With ETL:**\n• Trusted, centralized data warehouse\n• Automated reports and dashboards\n• Consistent business definitions\n• Fast insights and confident decisions\n• Historical data for trends and forecasts\n\n**Key Takeaway:** ETL is not just about moving data—it's about creating a reliable foundation for analytics and business intelligence."
        },
        {
            title: "Extract – Real Data Sources and Challenges",
            content: "**What is Extraction?**\nExtraction pulls data from source systems and brings it into your ETL environment.\n\n**Common Data Sources:**\n• **Databases:** SQL Server, PostgreSQL, Oracle, MySQL\n• **APIs:** REST, SOAP, GraphQL from SaaS tools\n• **Files:** CSV, JSON, Excel, Parquet, XML\n• **Logs:** Application logs, server logs, user activity logs\n• **Cloud Storage:** S3, Azure Blob, Google Cloud Storage\n• **Legacy Systems:** Mainframes, FTP servers\n\n**Real-World Extraction Challenges:**\n1. **Network Failures** - Connection drops mid-extract\n   Solution: Implement retry logic and checkpoints\n\n2. **Rate Limits** - API calls limited to 100/minute\n   Solution: Throttle requests and batch efficiently\n\n3. **Missing or Incomplete Fields** - Some records lack phone numbers\n   Solution: Log and handle NULL values appropriately\n\n4. **Large Data Volumes** - 500GB files can't fit in memory\n   Solution: Stream data in chunks, use parallel extraction\n\n5. **Authentication & Access** - Credentials expire, permissions change\n   Solution: Use secure credential management (vaults, config)\n\n6. **Data Quality Issues** - Duplicates, invalid formats\n   Solution: Validate early, quarantine bad records"
        },
        {
            title: "Transform – Turning Raw Data into Business Truth",
            content: "**What is Transformation?**\nTransformation is where raw data becomes business-ready. This is where 80% of ETL complexity lives.\n\n**Transformation Types:**\n\n1. **Cleansing**\n   • Remove duplicates: SELECT DISTINCT\n   • Fix formatting: UPPER(), LOWER(), TRIM()\n   • Handle NULL values: Use defaults or flags\n   • Remove invalid records: Age < 0? Delete it.\n\n2. **Standardization**\n   • Currency conversion: EUR to USD using live rates\n   • Date formatting: Ensure ISO 8601 format (YYYY-MM-DD)\n   • Status code mapping: 'A' → 'Active', 'I' → 'Inactive'\n   • Unit conversion: Miles to kilometers\n\n3. **Enrichment**\n   • Merge data: First name + Last name = Full Name\n   • Add reference data: Customer ID + Lookup Table = Customer Segment\n   • Compute KPIs: Revenue - Cost = Profit\n   • Classify: Revenue > $10K? Mark as 'High Value'\n\n4. **Aggregation**\n   • Roll up sales by region: GROUP BY region\n   • Monthly summaries: SUM(daily_sales) per month\n   • Customer lifetime value: SUM of all purchases\n\n**Pro Tip:** Always track transformation rules in a config file. This enables auditability and reusability."
        },
        {
            title: "Load – Designing Warehouse Tables",
            content: "**What is Loading?**\nLoading inserts transformed data into target tables (fact tables and dimension tables).\n\n**Table Design Best Practices:**\n\n1. **Fact Tables** (Store transactions, events)\n   • Record every detail: ORDER_ID, CUSTOMER_ID, AMOUNT, DATE\n   • Use numeric keys (surrogate keys) for fast joins\n   • Example: fact_sales with millions of rows\n   • Usually: Additive only (never update/delete)\n\n2. **Dimension Tables** (Reference data, attributes)\n   • Store master data: CUSTOMER_NAME, CUSTOMER_SEGMENT\n   • Slowly Changing Dimensions (SCD): Track changes over time\n   • Example: dim_customer might have 50K rows\n   • Usually: Updated when attributes change\n\n3. **Load Strategies:**\n   • **Full Load:** Delete all, insert everything (slow for big data)\n   • **Incremental Load:** INSERT new rows + UPDATE changed rows (most common)\n   • **Upsert:** INSERT if new, UPDATE if changed (requires unique key)\n\n4. **Partitioning for Speed**\n   • Partition by DATE: fact_sales_2024_01, fact_sales_2024_02\n   • Enables faster queries on recent data\n   • Easier maintenance and archival\n\n**Example Load Code (Pseudo):**\n```\nDELETE FROM fact_orders WHERE load_date = TODAY\nINSERT INTO fact_orders (order_id, customer_id, amount, load_date)\nSELECT * FROM staging_orders WHERE created_date = TODAY\n```"
        },
        {
            title: "ETL Testing – Preventing Bad Data",
            content: "**Why ETL Testing Matters:**\nBad data costs companies millions. A 1% error in a financial ETL → millions in incorrect reports.\n\n**Key Testing Checks:**\n\n1. **Row Count Validation**\n   • Source: 10,200 orders\n   • Target: Should have 10,200 (or explain why if less)\n   • Red flag: If target < source, we lost data\n\n2. **NULL Checks**\n   • Critical fields cannot be NULL: ORDER_ID, CUSTOMER_ID\n   • Query: SELECT COUNT(*) FROM fact_orders WHERE order_id IS NULL\n   • Should always = 0\n\n3. **Range & Domain Checks**\n   • Order amounts must be > 0\n   • Customer age must be between 18-120\n   • Country code must be exactly 2 characters\n\n4. **Referential Integrity**\n   • Every CUSTOMER_ID in fact_orders must exist in dim_customer\n   • Query: LEFT JOIN and find NULLs\n\n5. **Duplicate Checks**\n   • No duplicate ORDER_IDs in fact_orders\n   • Query: SELECT order_id, COUNT(*) ... GROUP BY order_id HAVING COUNT(*) > 1\n\n6. **Business Rule Validation**\n   • \"If status = Cancelled, then amount_refunded > 0\"\n   • \"If customer_segment = Premium, then discount >= 10%\"\n   • These are custom rules per business\n\n**Testing Framework Example:**\n```python\ndef validate_etl():\n    errors = []\n    if source_count != target_count:\n        errors.append(f\"Row count mismatch: {source_count} vs {target_count}\")\n    if null_orders > 0:\n        errors.append(f\"Found {null_orders} NULL order IDs\")\n    if errors:\n        raise Exception(\"ETL validation failed: \" + str(errors))\n    return True\n```"
        },
        {
            title: "Schema Drift & Data Evolution",
            content: "**What is Schema Drift?**\nSchema drift = Source structure changes unexpectedly. Your ETL pipeline expects 5 columns but source suddenly has 7.\n\n**Common Drift Scenarios:**\n\n1. **New Column Added**\n   • Yesterday: [id, name, email]\n   • Today: [id, name, email, phone, address]\n   • Problem: Pipeline fails or ignores new columns\n\n2. **Column Dropped**\n   • Yesterday: [id, name, email, status]\n   • Today: [id, name, email]\n   • Problem: Your JOIN breaks, report missing data\n\n3. **Data Type Changed**\n   • Yesterday: customer_id = INTEGER\n   • Today: customer_id = STRING (API change)\n   • Problem: Data type mismatch in warehouse\n\n4. **Column Renamed**\n   • Yesterday: col_name\n   • Today: colName or col-name\n   • Problem: Old column name no longer exists\n\n**How to Handle Schema Drift:**\n\n**Step 1: Detect It**\n```python\nactual_schema = get_source_schema()\nexpected_schema = load_config_schema()\nif actual_schema != expected_schema:\n    log_alert(f\"SCHEMA DRIFT DETECTED!\")\n    send_email_to_team()\n```\n\n**Step 2: Quarantine Data**\n• Don't load into warehouse yet\n• Store in a \"rejected\" staging area\n\n**Step 3: Investigate & Adapt**\n• Ask source team: Why did schema change?\n• Update ETL config to handle new schema\n• Backfill historical data if needed\n\n**Best Practice: Flexible Schema**\nUse flexible load strategies:\n• **Dynamic column mapping:** Read source headers, map automatically\n• **JSON/Variant columns:** Store extra fields as JSON (Snowflake, BigQuery)\n• **Config-driven:** Define mapping in file, not hardcoded\n\n**Real Example:**\nNetflix had drift when a content partner added regional ratings. Their ETL auto-detected, logged, and flagged for review. No data lost, no pipeline crash."
        },
        {
            title: "Automation, Orchestration & Monitoring",
            content: "**Why Automation Matters:**\nManual ETL processes are:\n• Error-prone (human mistakes)\n• Non-scalable (can't run 1000 pipelines manually)\n• Slow (requires someone to click buttons)\n\n**Orchestration Tools - Schedule & Manage ETL:**\n\n1. **Apache Airflow** (Most popular, open-source)\n   • DAG (Directed Acyclic Graph): Define workflow as code\n   • Example: Extract → Transform → Load (sequential)\n   • Can run 100s of tasks in parallel\n   • Retries on failure automatically\n\n2. **Prefect**\n   • Modern alternative to Airflow\n   • More user-friendly UI\n   • Better for cloud-native workflows\n\n3. **dbt (data build tool)**\n   • SQL-first transformation\n   • Great for data warehouse work\n   • Auto-generates docs and tests\n\n4. **Cloud Orchestration**\n   • AWS: Glue, Step Functions\n   • GCP: Cloud Composer, Cloud Workflows\n   • Azure: Data Factory, Synapse\n\n**Scheduling:**\n• **Daily:** Run at 2 AM when servers are quiet\n• **Hourly:** For real-time dashboards\n• **Event-driven:** Trigger when new file lands in S3\n• **Conditional:** Run only if previous step succeeded\n\n**Monitoring & Alerts:**\n\n1. **What to Monitor:**\n   • Execution time: Did pipeline take longer than usual?\n   • Row counts: Did we load expected volumes?\n   • Failures: Did any task fail?\n   • Quality metrics: Are there more NULLs than expected?\n\n2. **Alert Triggers:**\n   • Pipeline failed → Page on-call engineer\n   • Row count low → Alert data team\n   • Execution > 2 hours → Warn (check performance)\n   • Data quality fails → Block load, notify stakeholders\n\n3. **Monitoring Tools:**\n   • Built-in: Airflow, dbt have dashboards\n   • DataDog, New Relic: Full monitoring\n   • Custom: Log to database, query in dashboard\n\n**Example Monitoring Query:**\n```sql\nSELECT \n    pipeline_name,\n    execution_date,\n    status,\n    rows_loaded,\n    duration_minutes\nFROM etl_logs\nWHERE execution_date = TODAY\nORDER BY duration_minutes DESC;\n```\n\n**Real-World Failure Scenario:**\nA financial company's ETL ran late due to slow source API. Alert fired at 9 AM. Engineers checked → API was under maintenance. They rerouted to backup API. Dashboard users never knew. That's good ETL."
        }
    ],

    handsOnLabs: [
        {
            lab: 1,
            title: "Extract Customer Data from a Database",
            objective: "Connect to a SQL database and extract customer records into a staging table.",
            tasks: [
                "Write a SQL query to select all active customers.",
                "Export the result to a CSV file.",
                "Load the CSV into a staging table."
            ],
            expectedOutcome: "You have a clean staging_customers table with only active customers."
        },
        {
            lab: 2,
            title: "Transform Order Data",
            objective: "Apply business rules to raw order data.",
            tasks: [
                "Convert order_amount from string to numeric.",
                "Map status codes to readable values.",
                "Flag refunded orders."
            ],
            expectedOutcome: "Orders are cleaned, standardized, and business-ready."
        },
        {
            lab: 3,
            title: "Load Data into a Warehouse Table",
            objective: "Insert transformed data into fact_orders.",
            tasks: [
                "Create fact_orders table.",
                "Insert transformed rows.",
                "Validate row counts."
            ],
            expectedOutcome: "fact_orders contains accurate transactional data."
        },
        {
            lab: 4,
            title: "Validate Data Quality",
            objective: "Implement ETL testing checks.",
            tasks: [
                "Check for NULL primary keys.",
                "Check for negative order amounts.",
                "Compare source vs target row counts."
            ],
            expectedOutcome: "Bad data is blocked from reaching reports."
        }
    ],

    questions: [
        {
            number: 1,
            difficulty: "beginner",
            question: "What is the main goal of ETL?\n\nOptions:\n1. Store files on servers\n2. Move, clean, and prepare data for analytics\n3. Build user-facing websites\n4. Replace all databases",
            context: "Choose the correct answer:",
            answer: "Correct Option: 2 - Move, clean, and prepare data for analytics"
        },
        {
            number: 2,
            difficulty: "beginner",
            question: "Which of these is a real ETL data source?\n\nOptions:\n1. Only SQL databases\n2. Only REST APIs\n3. Databases, APIs, files, and logs\n4. Nothing else can be a source",
            context: "Choose the correct answer:",
            answer: "Correct Option: 3 - Databases, APIs, files, and logs"
        },
        {
            number: 3,
            difficulty: "beginner",
            question: "What does 'Transform' mean in ETL?\n\nOptions:\n1. Just copy data as-is\n2. Delete unwanted data\n3. Clean, standardize, and enrich data\n4. Only move files",
            context: "Choose the correct answer:",
            answer: "Correct Option: 3 - Clean, standardize, and enrich data"
        },
        {
            number: 4,
            difficulty: "intermediate",
            question: "What is schema drift?\n\nOptions:\n1. Slow performance over time\n2. Changes in the source data structure (new/removed columns)\n3. Duplicate rows in the warehouse\n4. Missing database indexes",
            context: "Choose the correct answer:",
            answer: "Correct Option: 2 - Changes in the source data structure"
        },
        {
            number: 5,
            difficulty: "intermediate",
            question: "Why should you use config-driven ETL instead of hardcoding rules?\n\nOptions:\n1. It's slower but easier\n2. It enables reusability and makes changes without code updates\n3. It uses more memory\n4. It prevents all errors",
            context: "Choose the correct answer:",
            answer: "Correct Option: 2 - It enables reusability and makes changes without code updates"
        },
        {
            number: 6,
            difficulty: "intermediate",
            question: "Which ETL testing check would catch negative order amounts?\n\nOptions:\n1. Row count check\n2. NULL check\n3. Range/domain check\n4. Duplicate check",
            context: "Choose the correct answer:",
            answer: "Correct Option: 3 - Range/domain check"
        },
        {
            number: 7,
            difficulty: "intermediate",
            question: "What is a fact table?\n\nOptions:\n1. A table of business rules\n2. A table storing transactions and events with numerical data\n3. A table of reference data like customer names\n4. A table for backups",
            context: "Choose the correct answer:",
            answer: "Correct Option: 2 - A table storing transactions and events with numerical data"
        },
        {
            number: 8,
            difficulty: "advanced",
            question: "Why is incremental loading better than full loading for large datasets?\n\nOptions:\n1. Full loading is always better\n2. It only processes new/changed data, saving time and resources\n3. Incremental loading loses data\n4. They are identical",
            context: "Choose the correct answer:",
            answer: "Correct Option: 2 - It only processes new/changed data, saving time and resources"
        },
        {
            number: 9,
            difficulty: "advanced",
            question: "What does an orchestration tool like Airflow do?\n\nOptions:\n1. Stores data\n2. Schedules and manages ETL workflow execution\n3. Runs queries only\n4. Deletes old data",
            context: "Choose the correct answer:",
            answer: "Correct Option: 2 - Schedules and manages ETL workflow execution"
        },
        {
            number: 10,
            difficulty: "advanced",
            question: "How should you handle schema drift?\n\nOptions:\n1. Ignore it\n2. Detect it, quarantine data, investigate, and adapt the ETL\n3. Delete the source data\n4. Manually fix all records",
            context: "Choose the correct answer:",
            answer: "Correct Option: 2 - Detect it, quarantine data, investigate, and adapt the ETL"
        }
    ],

    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "Your company receives a new CSV file from a partner. Yesterday it had columns [id, name, email]. Today it has [id, first_name, last_name, email, phone].",
            question: "What should your ETL pipeline do?",
            options: [
                "Ignore the new columns and proceed",
                "Fail silently without notification",
                "Detect schema drift, log it, alert the team, and pause loading",
                "Delete the file and request an older version"
            ],
            answer: "Correct Option: Detect schema drift, log it, alert the team, and pause loading"
        },
        {
            case: 2,
            scenario: "Your dashboard shows 10,000 orders, but the source system has 10,200. This is a data mismatch.",
            question: "What is the correct ETL response?",
            options: [
                "Update the dashboard to show 10,200 manually",
                "Ignore the mismatch and keep the pipeline running",
                "Fail the job, investigate the discrepancy, find the root cause",
                "Delete old records to match the dashboard"
            ],
            answer: "Correct Option: Fail the job, investigate the discrepancy, find the root cause"
        },
        {
            case: 3,
            scenario: "After loading orders into the warehouse, you notice negative order amounts (-$50, -$200). This should never happen.",
            question: "Which validation check should have caught this before loading?",
            options: [
                "Row count check (counts total orders)",
                "NULL check (checks for missing values)",
                "Range/domain check (validates acceptable value ranges)",
                "Duplicate check (finds duplicate records)"
            ],
            answer: "Correct Option: Range/domain check (validates acceptable value ranges)"
        },
        {
            case: 4,
            scenario: "Your ETL extracts from a 3rd-party API that allows only 100 requests per minute. You have 500K records to extract. A simple sequential extract would take 5000 minutes.",
            question: "What's the best approach to handle this rate limit?",
            options: [
                "Request all 500K records in one call (will fail)",
                "Extract sequentially and wait for manual approvals",
                "Batch requests in parallel, throttle to 100/min, use pagination",
                "Skip some records to fit in the limit"
            ],
            answer: "Correct Option: Batch requests in parallel, throttle to 100/min, use pagination"
        },
        {
            case: 5,
            scenario: "You're loading customer data into dim_customer table. Some records have invalid email formats (e.g., 'john@@@example.com'). These are critical data quality issues.",
            question: "What should the ETL do?",
            options: [
                "Load them anyway, let the business handle it",
                "Delete these records silently",
                "Reject invalid records, quarantine them, log errors, alert team",
                "Guess the correct email format"
            ],
            answer: "Correct Option: Reject invalid records, quarantine them, log errors, alert team"
        },
        {
            case: 6,
            scenario: "Your ETL pipeline runs daily at 2 AM. Today it failed at 3:30 AM due to a network timeout. By 8 AM, business users are checking reports that show yesterday's data.",
            question: "What monitoring/alert system should have prevented this?",
            options: [
                "None, it's fine to have outdated data",
                "Email alert sent after 2 hours (5 AM), automatic retry, escalation if still failed by 6 AM",
                "Manual check every 30 minutes",
                "Wait for someone to complain"
            ],
            answer: "Correct Option: Email alert sent after 2 hours (5 AM), automatic retry, escalation if still failed by 6 AM"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.etl1Data = etl1Data;
}
