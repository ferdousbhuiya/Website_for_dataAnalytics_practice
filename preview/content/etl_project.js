const etlProjectData = {
    title: "ETL Project: Building a Data Pipeline",
    metadata: {
        track: 'data-engineer',
        category: 'ETL Project',
        icon: '🔄',
        description: "A complete ETL pipeline build — extract, transform, load, validate, orchestrate, and monitor, with real Python code."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview & Pipeline Architecture",
            content: `A complete **ETL pipeline** project. You are the data engineer. Raw CSV files land on a server every night; a business dashboard must show clean, validated data by 07:00 each morning.

**The architecture we will build:**

\`\`\`mermaid
flowchart LR
    A[Raw CSVs] --> B[Extract: read + inspect]
    B --> C[Transform: clean, type, join]
    C --> D[Validate: checks + failures]
    D -->|pass| E[Load: write warehouse table]
    D -->|fail| F[Alert + halt, keep old data]
    E --> G[Orchestrator: Airflow daily DAG]
    G --> H[Monitor: freshness, row counts, alerts]
\`\`\`

**The five jobs of a real pipeline:**
1. **Extract** — pull data from the source (CSV, API, DB).
2. **Transform** — clean, coerce types, join, aggregate.
3. **Validate** — the often-forgotten quality gate.
4. **Load** — write to the warehouse, atomically.
5. **Orchestrate + monitor** — schedule it and know when it breaks.

We will build each one, with working Python.`
        },
        {
            number: 2,
            title: "Step 1: Extract — Reading the Raw Files",
            content: `**Extract** means: get the raw data in, and *never trust it yet*. Read with the same rigor an analyst applies before analyzing.

\`\`\`python
import pandas as pd
from pathlib import Path

RAW = Path("data/raw")
files = sorted(RAW.glob("sales_*.csv"))   # sales_2026-01-01.csv, ...

def extract_all():
    frames = []
    for f in files:
        df = pd.read_csv(f)
        df["source_file"] = f.name          # traceability
        frames.append(df)
    raw = pd.concat(frames, ignore_index=True)
    print(f"extracted {len(raw):,} rows from {len(files)} files")
    return raw

raw_df = extract_all()
\`\`\`

**Engineering habits visible here:**
- **Glob the files** — the pipeline runs on whatever arrived, not a hardcoded list.
- **Record the source file** on each row — you can always trace a number back.
- **Log the row count** — a count that drops by 90% is a signal, not a mystery.`
        },
        {
            number: 3,
            title: "Step 2: Transform — Clean and Type",
            content: `**Transform** is where raw becomes usable: coerce types, handle missing values, fix the classic traps (text amounts, bad dates).

\`\`\`python
def transform(raw):
    df = raw.copy()

    # 1) amount was text ("$1,234.50") -> clean numeric
    df["amount"] = (
        df["amount"]
        .astype(str)
        .str.replace("$", "", regex=False)
        .str.replace(",", "", regex=False)
        .pipe(pd.to_numeric, errors="coerce")
    )

    # 2) dates -> datetime (coerce errors to NaT, then drop bad rows)
    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")

    # 3) drop rows with no usable key or date (can't trust them downstream)
    df = df.dropna(subset=["order_id", "order_date", "amount"])

    # 4) dedupe on the natural key, keep latest
    df = df.sort_values("order_date").drop_duplicates(subset="order_id", keep="last")

    # 5) derived column useful for reporting
    df["order_month"] = df["order_date"].dt.to_period("M").astype(str)

    print(f"transform: {len(df):,} rows after cleaning ({len(raw)-len(df):,} dropped)")
    return df

clean_df = transform(raw_df)
\`\`\`

**Why each step:** amounts as text break math; bad dates break time-series; dupes inflate revenue; null keys produce orphan rows. A pipeline that skips this quietly serves wrong numbers.`
        },
        {
            number: 4,
            title: "Step 3: Validate — The Quality Gate",
            content: `The step most pipelines skip: **automated validation** before anything reaches the dashboard. This is what makes a pipeline *trusted*.

\`\`\`python
import math

def validate(df):
    checks = {}

    # 1) Freshness: is today's data actually here?
    latest = df["order_date"].max().date()
    checks["freshness_ok"] = latest >= (pd.Timestamp.today().normalize() - pd.Timedelta(days=2)).date()

    # 2) Row-count sanity: within 20% of the 7-day average?
    avg7 = df[df["order_date"] >= pd.Timestamp.today() - pd.Timedelta(days=7)].shape[0] / 7
    today_rows = df[df["order_date"] == df["order_date"].max()].shape[0]
    checks["rowcount_ok"] = today_rows > 0 and (avg7 == 0 or today_rows >= avg7 * 0.8)

    # 3) No negative amounts, no absurd values
    checks["no_negative"] = (df["amount"] >= 0).all()
    checks["amount_reasonable"] = df["amount"].max() <= 1_000_000

    # 4) Referential integrity would join to a customer table (placeholder)
    checks["keys_unique"] = df["order_id"].is_unique

    failed = [k for k, v in checks.items() if not v]
    if failed:
        raise RuntimeError(f"Validation failed: {failed}")
    print("validation: PASS — all checks ok")
    return df

clean_df = validate(clean_df)
\`\`\`

**Fail loud, not soft:** a failed pipeline *halts* and alerts, keeping the last good data. Silently loading bad rows is the worst failure mode in data engineering.`
        },
        {
            number: 5,
            title: "Step 4: Load — Write Atomically to the Warehouse",
            content: `**Load** must be **idempotent** (safe to re-run) and **atomic** (never half-written). The two habits that make this true: temp-table swap, and partition-scoped replace.

\`\`\`python
def load(df, conn):
    # A) Insert into a staging table first
    df.to_sql("sales_stage", conn, if_exists="replace", index=False)

    # B) Atomic swap: within a transaction, replace the target from stage
    with conn.begin():
        conn.execute("DELETE FROM sales_fact")          # full refresh (small table)
        conn.execute(
            """INSERT INTO sales_fact (order_id, order_date, amount, order_month)
               SELECT order_id, order_date, amount, order_month FROM sales_stage"""
        )

    # C) Verify the load: row count matches
    n = pd.read_sql("SELECT COUNT(*) AS n FROM sales_fact", conn)["n"][0]
    assert n == len(df), f"load mismatch: {n} != {len(df)}"
    print(f"load: {n:,} rows in sales_fact")

# --- Idempotency: re-running produces the same result ---
# DELETE + INSERT by full table = same final state every time.
\`\`\`

**The point of idempotency:** the nightly job may re-run after a failure or a backfill. Because it deletes and reloads the whole table, a second run gives the *same* result — no duplicate rows, no drift.`
        },
        {
            number: 6,
            title: "Step 5: Orchestrate — Wrap It in a DAG",
            content: `**Orchestration** schedules the stages, handles dependencies and retries. We model the pipeline as an Airflow DAG — each stage a task, edges = dependencies.

\`\`\`python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

def run_extract():  raw = extract_all();  return {"raw_rows": len(raw)}
def run_transform(): return None
def run_validate(): return None
def run_load(): return None

with DAG(
    "sales_pipeline",
    schedule="0 5 * * *",          # every day at 05:00
    start_date=datetime(2026, 1, 1),
    catchup=False,
    default_args={"retries": 2, "retry_delay": timedelta(minutes=5)},
) as dag:
    extract = PythonOperator(task_id="extract",  python_callable=run_extract)
    transform = PythonOperator(task_id="transform", python_callable=run_transform)
    validate = PythonOperator(task_id="validate", python_callable=run_validate)
    load = PythonOperator(task_id="load", python_callable=run_load)

    extract >> transform >> validate >> load
\`\`\`

**The DAG shows its own reliability:** retries on transient failures, a schedule that runs before the 07:00 SLA, and a linear dependency chain that makes failure obvious — if \`validate\` fails, \`load\` never runs and the previous good data stays.`
        },
        {
            number: 7,
            title: "Step 6: Monitor & Alert",
            content: `A pipeline you can't see is a pipeline that fails silently. **Monitoring** answers: is it fresh, complete, and correct?

\`\`\`python
def monitor(conn):
    # 1) Freshness: latest order_date vs today
    latest = pd.read_sql("SELECT MAX(order_date) FROM sales_fact", conn).iloc[0, 0]

    # 2) Row-count trend (detect silent drops)
    trend = pd.read_sql("""
        SELECT order_month, COUNT(*) AS rows
        FROM sales_fact GROUP BY order_month ORDER BY order_month DESC LIMIT 6
    """, conn)

    # 3) Alert if stale or collapsed
    if latest < pd.Timestamp.today().normalize() - pd.Timedelta(days=2):
        send_alert("SLABREACH", "sales_fact is stale")
    if trend["rows"].iloc[0] < trend["rows"].iloc[1] * 0.5:
        send_alert("DROPOFF", "row count dropped >50% this month")

# send_alert: email / Slack / PagerDuty
def send_alert(sev, msg):
    print(f"[{sev}] {msg}")   # in prod: webhook call
\`\`\`

**Alert on *data*, not on every task retry.** A transient retry is noise; a stale or halved table is a real incident. Severity tiers (INFO / WARN / PAGE) keep the on-call from alert fatigue.`
        },
        {
            number: 8,
            title: "Full Pipeline Recap & What You've Built",
            content: `You now hold a complete, production-shaped ETL project. Recap of the whole flow:

\`\`\`mermaid
flowchart TD
    A[Raw CSV files] --> B[Extract: glob + read + trace]
    B --> C[Transform: type, clean, dedupe, derive]
    C --> D[Validate: freshness, counts, ranges, keys]
    D -->|pass| E[Load: stage -> atomic swap]
    D -->|fail| F[HALT + alert, keep last good]
    E --> G[Orchestrate: Airflow DAG, retries, schedule]
    G --> H[Monitor: freshness + row-count trend + alerts]
\`\`\`

**The engineering principles that made it solid:**
- **Idempotency** — re-running gives the same result.
- **Atomic load** — readers never see half-written data.
- **Validation before load** — bad data never reaches the dashboard.
- **Fail loud** — halt + alert, keep the last good table.
- **Traceability** — every row knows its source file.
- **Observability** — freshness, counts, and alerts.

**What a senior data engineer would add next:** schema drift detection (compare columns vs expected), a backfill mechanism (re-run a date range), and a data-quality test suite (Great Expectations / dbt tests) versioned alongside the code. But the skeleton above is a real, working pipeline — the same shape you'll build on the job.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What are the five stages of a production ETL pipeline?",
            answer: "Extract (read raw data), Transform (clean, type, join), Validate (quality gate), Load (write to warehouse atomically), and Orchestrate + Monitor (schedule it, track freshness, alert on failure)."
        },
        {
            number: 2,
            difficulty: "medium",
            question: "What does it mean for a pipeline to be idempotent, and why does it matter?",
            answer: "Idempotent means re-running the pipeline produces the same final result as running it once. It matters because failures, retries, and backfills are inevitable — a non-idempotent load duplicates rows on re-run, corrupting the data. Full-table DELETE + reload or partition-scoped replace are the standard patterns."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "Why is the validation step placed between transform and load?",
            answer: "Validation catches bad data before it reaches the warehouse. Placed after transform, it checks the *cleaned* data; placed before load, it prevents the bad rows from ever being served to the dashboard. If validation fails, the pipeline halts and keeps the last good table rather than loading garbage."
        },
        {
            number: 4,
            difficulty: "hard",
            question: "Explain the atomic load pattern (temp table + swap) and why it protects consumers.",
            answer: "Write the new data to a staging table first, then within a single transaction DELETE the target and INSERT from staging. Because the swap is atomic, a reader querying at any moment sees either the complete old data or the complete new data — never a half-written table. It also makes re-runs safe."
        },
        {
            number: 5,
            difficulty: "easy",
            question: "What is the difference between ETL and ELT?",
            answer: "ETL transforms data before loading it into the warehouse (transform then load). ELT loads raw data first and transforms it inside the warehouse using its compute. ELT is common with modern warehouses like Snowflake/BigQuery because they can transform at scale; ETL is traditional, for databases that need clean data on arrival."
        },
        {
            number: 6,
            difficulty: "medium",
            question: "What does 'fail loud' mean in data engineering, and what's the alternative?",
            answer: "Fail loud means when validation or a task fails, the pipeline halts and sends an alert — it never silently continues with bad data. The alternative (fail soft / continue) loads untrusted rows and quietly corrupts downstream reports, which is far worse because the error is invisible."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "How do you detect data-quality problems like a silent 50% drop in row counts?",
            answer: "Monitor row counts per partition/month and compare to the recent trend or 7-day average. An alert fires when current rows fall below a threshold (e.g., <80% of average). Combined with freshness checks (is today's data present?) and range checks (no negative/absurd amounts), this catches most silent failures."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "What is schema drift, and how should an ETL pipeline handle it?",
            answer: "Schema drift is when the source changes shape — a new column appears, one is renamed, or a type changes. A robust pipeline detects drift (compare incoming columns to the expected schema), logs it, alerts the team, and either adapts automatically or pauses loading until someone confirms the mapping — rather than loading into a mismatched table and corrupting it."
        }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "The nightly sales CSV arrives with new and renamed columns — the pipeline expects 5 columns but the file now has 7. Loading it directly into the warehouse would corrupt the table.",
            question: "What should the ETL pipeline do when it detects schema drift?",
            options: [
                "Silently load whatever columns arrive",
                "Detect the drift, log it, alert the team, and pause loading until the mapping is confirmed",
                "Delete the file and re-download it",
                "Guess the column mapping and continue"
            ],
            answer: "Correct Option: Detect the drift, log it, alert the team, and pause loading until the mapping is confirmed"
        },
        {
            case: 2,
            scenario: "Today's sales_fact load is only 40% of the 7-day average row count. If it loads, the dashboard will show an incomplete month and quietly mislead users.",
            question: "What should the pipeline do when a validation check like row-count sanity fails?",
            options: [
                "Load anyway, the dashboards will correct themselves",
                "Let validation fail, halt the load, and alert so the last good table stays",
                "Silently fill in the missing rows with estimates",
                "Ignore the check because it might be a holiday dip"
            ],
            answer: "Correct Option: Let validation fail, halt the load, and alert so the last good table stays"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.etlProjectData = etlProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = etlProjectData;
}