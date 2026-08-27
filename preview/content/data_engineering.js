const dataEngineeringData = {
    title: "Data Engineering Fundamentals",
    metadata: {
        track: 'data-engineer',
        category: 'Pipelines',
        icon: '🔄',
        description: "Learn the principles of building and maintaining reliable, scalable data pipelines. Covers orchestration, data quality, and testing."
    },
    lessons: [
        {
            number: 1,
            title: "Data Pipeline Architecture",
            content: "A data pipeline is a series of steps that move data from sources to destinations while transforming it along the way. The classic stages are **ingest** (copying raw data in), **process** (cleaning, joining, aggregating), **store** (landing in a warehouse or lakehouse), and **serve** (making it queryable by BI tools and applications). A good pipeline is **decoupled**: each stage reads and writes through a durable medium (files, tables, topics) rather than calling the next stage directly, so a failure in one step never corrupts the next. Think of it as a state machine moving data between well-defined checkpoints, not as a monolithic script.\n\nArchitecturally, engineers separate concerns into **extract, load, transform (ELT)** or **extract, transform, load (ETL)**. In ELT you load raw data first and let the warehouse do heavy lifting; in ETL you transform before loading. Deciding where transformation happens is one of the most important architectural choices you will make."
        },
        {
            number: 2,
            title: "Orchestration with Airflow DAGs",
            content: "Orchestration schedules and sequences the steps of a pipeline, handling dependencies, retries, and failure. **Apache Airflow** is the dominant tool. You write pipelines as **DAGs** (Directed Acyclic Graphs): a graph of tasks connected by directed edges that must not contain cycles (hence 'acyclic'). Each task runs independently and its edges state that 'X must finish before Y starts'.\n\nA DAG is pure Python — it declares the structure of the workflow, while a scheduler materializes and runs task instances on a timeline. Because it is a graph, you get parallelism for free: independent branches run concurrently. Idempotent, well-scoped tasks are the building blocks that make DAGs reliable.\n\n```mermaid\ngraph TD\n    A[Raw source] --> B[Ingestion task]\n    B --> C[Staging table]\n    C --> D[Validation task]\n    D -->|pass| E[Dimension build]\n    D -->|pass| F[Fact build]\n    D -->|fail| G[Alert + retry]\n    E --> H[Warehouse tables]\n    F --> H\n    H --> I[Reports / dashboards]\n```"
        },
        {
            number: 3,
            title: "Data Warehouses vs. Lakes vs. Lakehouses",
            content: "A **data warehouse** stores structured, pre-modeled data optimized for fast analytical SQL. It enforces schema, compresses well, and is great for business intelligence, but it is expensive to store raw, unmodeled data.\n\nA **data lake** (often object storage like S3) stores raw data in native formats (JSON, Parquet, CSV, images). It is cheap and schema-agnostic, but raw lakes become 'data swamps' without governance and are slow for interactive queries.\n\nA **lakehouse** (e.g., Delta Lake, Iceberg, Hudi) combines both: you store cheap open-format files on object storage and add a *table metadata layer* that gives you ACID transactions, schema enforcement, versioning (time travel), and fast SQL on top. The modern rule of thumb: build a lakehouse and layer governed, modeled tables on top of raw zones."
        },
        {
            number: 4,
            title: "Data Quality Checks",
            content: "Data quality is not a feature you add at the end — it is a set of **automated checks** embedded in the pipeline that detect problems before bad data reaches analysts. Common categories:\n\n- **Freshness**: is today's data present? (e.g. a row batch arrived for each partition)\n- **Completeness**: expected row/column counts match.\n- **Uniqueness**: no duplicate keys in a dimension table.\n- **Validity**: values match allowed domains/ranges (e.g. age >= 0).\n- **Referential integrity**: foreign keys resolve to real rows.\n- **Distribution drift**: record-level metrics like null rate and value distributions stay stable over time.\n\nChecks run as distinct DAG tasks between transforms. When a check fails, the standard pattern is *fail loud*: pause downstream, page the on-call engineer, and prevent the bad data from being served. **Data contracts / tests-as-code** (e.g. Great Expectations, dbt tests) let you write these as versioned, testable code."
        },
        {
            number: 5,
            title: "Idempotency",
            content: "An operation is **idempotent** if running it multiple times produces the same final result as running it once. For pipelines this is critical because retries and reruns are inevitable. Example: `INSERT INTO sales VALUES (...)` is *not* idempotent — running twice duplicates rows. A **DELETE + INSERT** by a natural key (`DELETE FROM sales WHERE date = '2024-01-01'` followed by the insert) *is* idempotent for that partition.\n\nBest practices: load into **temp tables then swap** (atomic swap), write with **immutable file keys** (e.g. partition date in the path), and re-run a full partition rather than trying to patch partial rows. Idempotency is what makes a backfill or a manual rerun safe and repeatable."
        },
        {
            number: 6,
            title: "Backfills Incremental vs Full Loads",
            content: "Loading strategy dictates cost, freshness, and complexity.\n\n- **Full load**: replace the entire target each run. Simple and correct but expensive at scale and slow for big data.\n- **Incremental load**: only copy rows that changed since the last run. Efficient, but requires a **watermark** (e.g. `updated_at > last_max`) and can miss deletes and out-of-order data.\n- **Delta/CDC**: capture changes via source logs (binlog CDC) to sync efficiently.\n\nA **backfill** re-runs the pipeline for a historical window to repair missing or bad data. Because loads are idempotent, a backfill is 'just' running existing logic with a wider date range. Ideally a pipeline reads a date parameter and can process any window — that single mechanism serves both the daily job and the backfill."
        },
        {
            number: 7,
            title: "Monitoring Alerting and SLAs",
            content: "A pipeline is only as reliable as its **observability**. Engineering teams define **SLAs** (service-level agreements) for data, e.g. 'the daily sales table is available by 06:00 UTC' and track **SLOs** toward them. Monitoring layers:\n\n- **Task-level**: retries, run duration, failure rates per DAG.\n- **Data-level**: system checks on freshness, row counts, and quality thresholds.\n- **Infrastructure**: compute and storage costs, queue backlogs.\n\nAlerting should be **actionable and calm**: alert on degrading *data* (SLO breaches) rather than on every transient task retry, use severity tiers, and page a human only when the SLA is actually at risk. A good dashboard answers 'is my data fresh, complete, and correct right now'. Central to this is a **data lineage** graph that shows what feeds what — so when a metric misbehaves you can trace upstream to the breaking transform."
        },
        {
            number: 8,
            title: "Testing Data Pipelines",
            content: "Testing extends unit tests to *data* itself. Because pipelines read and write datasets, you must test both logic and the shape it guarantees.\n\n- **Unit tests**: test pure functions (a transform, a parsing function) with toy inputs and expected outputs. Fast, run on every commit in CI.\n- **Integration tests**: run against a small fixture, real schema, and serialized orchestration to catch wiring/connectivity bugs.\n- **Data tests / validation**: check row counts, null rates, key uniqueness, and coalesce as part of the pipeline.\n- **Contract tests**: verify expected schemas between producer and consumer so a changed column fails loudly.\n- **Testing for idempotency & failure**: test that a rerun of a partition yields identical results, and that replacing individual partial outputs fails recognizably.\n\nThe ideal: transforms are pure and **provable** functions under test, orchestration is tested with small fixtures in CI, and data-quality expectations run as a gate **inside** the pipeline so bad data never sails silently to production."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is a DAG in the context of Airflow?",
            answer: "A Directed Acyclic Graph, which defines the set of tasks in a workflow and their dependencies. 'Directed' means edges have a direction (task A -> task B), 'Acyclic' means there are no cycles, so the workflow always terminates. Each DAG expresses the order in which tasks must run and which tasks can run in parallel."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "What is the difference between a data warehouse and a data lake?",
            answer: "A data warehouse stores structured, cleaned, pre-modeled data optimized for SQL analytics — it enforces schema and is fast to query but costly to hold raw data. A data lake stores raw data in its native format (JSON, Parquet, CSV, images) on cheap object storage, but provides no schema or transaction support. A lakehouse combines both: cheap object storage plus a table/metadata layer that adds ACID transactions, schema, and fast queries."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "Why is idempotency important in data pipelines, and how would you make a pipeline task idempotent?",
            answer: "Idempotency means re-running an operation yields the same result as running it once, which is essential because pipelines are routinely retried and rerun (retries after failures, manual reruns, backfills). A non-idempotent task corrupts data on a second run — e.g. an INSERT that duplicates rows. You make a task idempotent by, for example, doing DELETE-and-reload by natural key or partition (delete today's partition then insert) or by loading to a full table then atomically swapping, and by writing immutable file keys with date partitions, so any run produces the same final state."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "What is the difference between a full load and an incremental load, and when is a full load appropriate?",
            answer: "A full load replaces the entire dataset each run — simple and correct but slow and compute-heavy at scale. An incremental load copies only rows that changed since the last run using a high watermark (e.g. max updated_at), which is efficient but requires watermark tracking and can miss deletes or out-of-order events. A full load is appropriate for small reference tables, when the source has no reliable change indicator, when correctness is diamonds priority, or during an initial bootstrap of a table."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "List the common categories of data quality checks a pipeline should run.",
            answer: "Common categories are: (1) freshness — new data arrived on schedule; (2) completeness — expected row/column counts present; (3) uniqueness — no duplicate keys; (4) validity — values within allowed domains/types (e.g. age >= 0); (5) referential integrity — foreign keys resolve to real rows; and (6) distribution/drift — value distributions stable over time. Each check runs as a pipeline task and failures alerts + block downstream rather than silently serving bad data."
        },
        {
            number: 6,
            difficulty: "medium",
            question: "What is a backfill and why does idempotency make it easy?",
            answer: "A backfill re-runs a pipeline for a past window of time to re-compute or populate historical data that was missing, corrupted, or wrong. Because pipeline tasks are idempotent, a backfill is the same logic running over a wider date range — deleting and rewriting a partition yields the same result whether run once or twice. Designing tasks to read a parameterized window means the daily run and an on-demand backfill are the same mechanism."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "What is the difference between a data SLA and SLO, and how does monitoring the SLO feed alerting?",
            answer: "An SLA (service-level agreement) is the formal commitment to users about data availability, e.g. 'sales table available by 06:00 UTC daily.' An SLO (service-level objective) is the target internal metric you actually track to meet that commitment, e.g. 'freshness check passes by the deadline 99.9% of days.' Monitoring measures actuals against SLO targets; alerting should fire on SLO breaches or when a breach is imminent, rather than on every transient task failure, so engineers are paged only when the guarantee is actually at risk. Data lineage shows which upstream pipe feeds a metric so you can trace failures."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "Design an idempotent nightly pipeline that loads a daily fact table into a warehouse. Describe the four stages and where failures can be recovered safely.",
            answer: "A robust design: (1) Extract — copy raw source files into a staging blob store path keyed by business date, e.g. s3://lake/raw/events/date=2024-01-01; (2) Transform — read today's partition with Spark or SQL, clean and aggregate, write intermediate output into a staging/scratch schema, not the live table; (3) Validate — run freshness/completeness/uniqueness/data-quality checks on the staged result; only pass if all expectations succeed; (4) Load — atomically swap: either DELETE the date=partition in the target and INSERT the staged rows, or if the day's a single partition, use a merge that replaces the business-date partition. Because each stage is keyed by date and rolls forward (or atomic swap), any stage can be retried without corrupting previous results; a failed load leaves the prior good partition intact and idempotency."
        },
        {
            number: 9,
            difficulty: "hard",
            question: "You keep getting duplicate rows in a dimension table after 2am reruns. How do you debug and fix it?",
            answer: "Dedup is usually the symptom of one of: (1) the load is not idempotent — the task uses plain INSERT INTO of appends the latest run instead of delete+reload by a stable key, so two runs add two copies of the same row; (2) the watermark is wrong or duplicates in the source itself — the source has no short key, or out-of-order events arrived late; (3) the target has no primary key or unique constraint, so nothing rejects the duplicates. Fix sequence: canon to reproduce with a single run vs a rerun over the same window; add a modeling natural key; change the load to delete-then-reload or feature MERGE/upsert on that key; add a distribution-uniqueness check and a schema/key constraint at the target; then re-run the backfill once. Finally, add a data-quality uniqueness assertion as a gate so it fails loud before publishing, not after with a silent duplicate."
        }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "An Airflow DAG has two independent tasks (scrape API and refresh a table) that currently run one after the other, doubling the total runtime.",
            question: "How should you restructure the DAG?",
            options: [
                "Run the independent tasks in parallel branches that join before the downstream step",
                "Add more sleeps between tasks",
                "Merge both tasks into one monolithic operator",
                "Always run tasks sequentially in fixed order"
            ],
            answer: "Correct Option: Run the independent tasks in parallel branches that join before the downstream step"
        },
        {
            case: 2,
            scenario: "A weekly data-quality job sometimes passes even when a key table is empty, because the pipeline has no explicit checks between steps.",
            question: "What reliability practice fixes this?",
            options: [
                "Add explicit data-quality tests/assertions between steps that fail the DAG on anomaly",
                "Schedule the job more often",
                "Ignore empty tables",
                "Add a longer timeout"
            ],
            answer: "Correct Option: Add explicit data-quality tests/assertions between steps that fail the DAG on anomaly"
        }
    ]
    };

if (typeof window !== 'undefined') {
    window.dataEngineeringData = dataEngineeringData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dataEngineeringData;
}