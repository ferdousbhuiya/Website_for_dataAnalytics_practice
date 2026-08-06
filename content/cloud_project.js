const cloudProjectData = {
    title: "Cloud Project: Warehouse Migration",
    metadata: {
        track: 'data-engineer',
        category: 'Project',
        icon: '☁️',
        description: "A complete cloud data-warehouse migration — plan, stage, backfill, cutover, and validate."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview & The Migration Goal",
            content: `A complete **cloud data-warehouse migration**. You are the data engineer. The company is moving from a slow, on-premise Postgres warehouse to **Snowflake**. You must move the data without downtime or loss, and cut over all reports.

**The migration flow:**

\`\`\`mermaid
flowchart LR
    A[1. Schema & Tooling] --> B[2. Dual Writes]
    B --> C[3. Initial Backfill]
    C --> D[4. Validation: Compare]
    D --> E[5. Cutover]
    E --> F[6. Decommission]
\`\`\`

**Core principles:**
- **Zero downtime:** readers see old or new, never nothing.
- **Dual writes:** old and new run in parallel for a time.
- **Full validation:** compare row counts and aggregates before, during, after.
- **Phased cutover:** move BI tools over one by one, not a big bang.
- **Decommission last:** turn off old only after new is stable.`
        },
        {
            number: 2,
            title: "Step 1: Schema Translation & Tooling",
            content: `The first step is **schema translation**. Old Postgres types must map to new Snowflake types.

\`\`\`sql
-- Postgres
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_date TIMESTAMP WITH TIME ZONE,
    amount NUMERIC(10, 2),
    payload JSONB
);

-- Snowflake (translated)
CREATE OR REPLACE TABLE orders (
    id INT, -- no SERIAL
    order_date TIMESTAMP_TZ,
    amount NUMBER(10, 2),
    payload VARIANT -- Snowflake's JSON type
);
\`\`\`

**Tooling choice:**
- **Staging layer:** object storage (S3/GCS/ADLS) is the universal intermediate.
- **Replication tool:** AWS DMS, Azure Data Factory, Fivetran, or a custom script.
- **Validation:** a Python script that runs COUNT(*) and SUM(amount) on both and diffs them.
- **Orchestration:** Airflow to sequence the steps.

**The plan:** S3 as staging, a custom Python script for replication.`
        },
        {
            number: 3,
            title: "Step 2: Dual Writes & Live Replication",
            content: `Now we set up **dual writes**: every new record lands in *both* old and new warehouses.

\`\`\`mermaid
graph TD
    A[Source DB] --> B{Replication}
    B --> C[Old Warehouse]
    B --> D[New Warehouse]
\`\`\`

**How to implement:**
- **CDC (Change Data Capture)** is best: a tool like Fivetran or Debezium reads the source DB's write-ahead log and streams changes to both destinations. No code change in the source app.
- **Trigger-based:** a DB trigger on the source table writes to a log table, copied over.
- **Dual-write in the app:** modify the application itself to write to both. The most brittle.

**We choose CDC via a managed tool.** Two parallel warehouses getting live data.`
        },
        {
            number: 4,
            title: "Step 3: The Initial Backfill",
            content: `While dual writes handle new data, we copy the **historical data**.

\`\`\`python
import pandas as pd
from sqlalchemy import create_engine

old_conn = create_engine("postgresql://...")
new_conn = create_engine("snowflake://...")

# 1. Read from old in chunks
chunk_iter = pd.read_sql("SELECT * FROM orders", old_conn, chunksize=100_000)

# 2. Write each chunk to S3 as Parquet
for i, chunk in enumerate(chunk_iter):
    chunk.to_parquet(f"s3://my-migration-bucket/orders/chunk_{i}.parquet")
    print(f"wrote chunk {i} with {len(chunk)} rows")

# 3. Load from S3 into Snowflake's staging table
with new_conn.connect() as conn:
    conn.execute("COPY INTO orders_stage FROM @my_s3_stage/orders/ FILE_FORMAT = (TYPE = PARQUET);")
    conn.execute("INSERT INTO orders SELECT * FROM orders_stage;")
\`\`\`

**Why S3 in the middle?** It decouples read from write, scales, and Parquet is efficient. Never do a direct DB-to-DB copy over the network for large tables.`
        },
        {
            number: 5,
            title: "Step 4: Validation — Compare Old and New",
            content: `Before cutting anyone over, **validate** the data is identical.

\`\`\`python
def validate_sync():
    old_count = pd.read_sql("SELECT COUNT(*) AS n FROM orders", old_conn)["n"][0]
    new_count = pd.read_sql("SELECT COUNT(*) AS n FROM orders", new_conn)["n"][0]
    assert old_count == new_count, "row counts differ"

    old_sum = pd.read_sql("SELECT SUM(amount) AS s FROM orders", old_conn)["s"][0]
    new_sum = pd.read_sql("SELECT SUM(amount) AS s FROM orders", new_conn)["s"][0]
    assert math.isclose(old_sum, new_sum), "revenue sums differ"

    print("validation PASS: counts and revenue match")

validate_sync()
\`\`\`

**What to check:**
- **Row counts** per table.
- **Aggregate checksums** (SUM, AVG) on key numeric columns.
- **Spot checks** on a few individual records.
- **Run this validation *repeatedly*** during dual-write so they never diverge.`
        },
        {
            number: 6,
            title: "Step 5: The Cutover — Phased Rollout",
            content: `The moment of truth: **point readers to the new warehouse**. Never a big bang — move one team at a time.

\`\`\`mermaid
flowchart TD
    A[All reports hit Old] --> B[Phase 1: move Finance reports to New]
    B --> C[Validate finance numbers]
    C --> D[Phase 2: move Marketing reports]
    D --> E[Validate marketing numbers]
    E --> F[Phase 3: all other readers]
    F --> G[Old is hot standby]
\`\`\`

**The phased rollout plan:**
1. Move low-risk BI dashboards first; verify they match.
2. Move one business unit (e.g., Finance) and have them validate critical reports.
3. Move the next unit.
4. Keep dual writes running as a hot fallback. If new has an issue, point readers back to old in minutes.
5. Only after weeks of stability does anyone consider decommissioning.`
        },
        {
            number: 7,
            title: "Step 6: Decommission the Old Warehouse",
            content: `The final, irreversible step: turn off the old.

**The decommissioning checklist:**
- All readers on the new warehouse for at least one full business cycle (e.g., a month).
- Final validation pass shows data still in sync.
- A full backup of the old warehouse is stored securely.
- Communication sent to all stakeholders with a date.

**The process:**
1. Turn off dual writes.
2. Make the old database read-only.
3. Wait a week — see if anyone screams.
4. Take the final backup.
5. Shut down the old database server.

A successful migration is one nobody noticed.`
        },
        {
            number: 8,
            title: "Full Migration Recap & Interview Guide",
            content: `The full cloud-warehouse migration, end to end:

\`\`\`mermaid
flowchart TD
    A[Plan: schema, tools, staging] --> B[Dual Writes: CDC from source]
    B --> C[Backfill: old DB -> S3 -> new DB]
    C --> D[Validate: counts and sums match]
    D --> E[Cutover: move readers in phases]
    E --> F[Monitor: weeks of stability]
    F --> G[Decommission: backup, then shut down]
\`\`\`

**Interview cheat sheet — say these out loud:**
- **"Dual writes first, then backfill."** Ensures no downtime.
- **"Use object storage as a staging layer."** Decouples read/write.
- **"Validate counts and aggregates continuously."** Trust but verify.
- **"Cut over readers in phases, not a big bang."** Lowers risk.
- **"Keep the old as a hot standby until the new is stable."**
- **"A successful migration is one nobody noticed."**`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the first step in a data warehouse migration?",
            answer: "Schema translation and tooling choice. Map the old schema to the new, choose a replication tool, and define a staging layer (usually object storage)."
        },
        {
            number: 2,
            difficulty: "medium",
            question: "Why set up dual writes *before* the historical backfill?",
            answer: "To ensure zero downtime and no lost data. Dual writes capture all new records from the moment you start, so while historical data is being copied, you are not missing any live transactions."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "What does it mean to validate the migration, and what do you check?",
            answer: "Validation confirms the old and new warehouses are identical. Check row counts per table and aggregate checksums (SUM, AVG) on key numeric columns. Run these repeatedly during dual-write to catch divergence."
        },
        {
            number: 4,
            difficulty: "hard",
            question: "Why is a phased cutover (moving one team at a time) safer than a big bang?",
            answer: "A big bang is risky — if something is wrong, everyone is broken. A phased cutover moves low-risk readers first, lets them validate, and contains the blast radius. It also keeps the old warehouse as a hot standby for fast rollback."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "Why use object storage (S3/GCS) as a staging layer instead of a direct DB-to-DB copy?",
            answer: "Object storage decouples read from write, is highly scalable and fault-tolerant, and allows efficient file formats like Parquet. A direct network copy is fragile and can overwhelm the source or destination database."
        },
        {
            number: 6,
            difficulty: "easy",
            question: "What is CDC (Change Data Capture) and why is it a good choice for live replication?",
            answer: "CDC reads changes directly from the source database's transaction log (binlog), capturing every insert, update, and delete without requiring changes to the application code. It's low-impact and reliable."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "When is it safe to decommission the old warehouse?",
            answer: "Only after all readers have been on the new warehouse for at least one full business cycle, a final validation pass is clean, and a full backup is taken. Decommissioning is the last, irreversible step."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "Your row counts match but a revenue SUM does not. What could be the cause?",
            answer: "A schema type mismatch (e.g., Postgres NUMERIC vs Snowflake FLOAT), silent data truncation during copy, a difference in how NULLs are handled in aggregation, or a replication tool dropping updates. This is why you check both counts and sums."
        }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "During dual writes, your validation shows old and new warehouses have matching row counts, but SUM(amount) differs by a meaningful amount.",
            question: "What should the engineer do before any cutover?",
            options: [
                "Cut over anyway because the row counts match",
                "Investigate the sum discrepancy (type mismatch, truncation, dropped updates) before any cutover",
                "Assume Snowflake rounded the numbers and move on",
                "Decommission the old warehouse immediately"
            ],
            answer: "Correct Option: Investigate the sum discrepancy (type mismatch, truncation, dropped updates) before any cutover"
        },
        {
            case: 2,
            scenario: "Finance is ready to move to the new warehouse, but the migration lead is worried about the risk of breaking critical reports.",
            question: "What is the safest cutover approach for the migration?",
            options: [
                "Move every team in a single big-bang switch",
                "Move low-risk teams first, validate, then move one unit at a time, keeping the old warehouse as hot standby",
                "Shut down the old warehouse before moving anyone",
                "Run reports from both warehouses with no validation"
            ],
            answer: "Correct Option: Move low-risk teams first, validate, then move one unit at a time, keeping the old warehouse as hot standby"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.cloudProjectData = cloudProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cloudProjectData;
}