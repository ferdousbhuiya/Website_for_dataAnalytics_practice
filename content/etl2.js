// ETL2 topic data
const etl2Data = {
  title: "ETL 2: Pipeline Coding Fundamentals",
  lessons: [
    {
      number: 1,
      title: "Think in Pipeline Stages",
      content: `An ETL program should be designed as a sequence of clear stages rather than one long script.

**Core pattern:**
1. Extract data from a source.
2. Validate the raw input.
3. Transform it into the required structure.
4. Validate the transformed result.
5. Load it into the destination.
6. Log what happened.

\`\`\`python
def run_pipeline():
    raw = extract_data()
    validate_raw(raw)
    clean = transform_data(raw)
    validate_clean(clean)
    load_data(clean)
\`\`\`

**Why this matters:** each stage can be tested, retried, monitored, and changed without rewriting the whole pipeline.`
    },
    {
      number: 2,
      title: "Extract Safely from Files, APIs & Databases",
      content: `Extraction is about getting data reliably, not just reading it once.

**A good extract step should:**
- confirm the source exists,
- capture the extraction time,
- fail clearly when access is unavailable,
- avoid silently using stale data,
- preserve the original raw input.

\`\`\`python
from pathlib import Path
import pandas as pd

source = Path("data/incoming/orders.csv")
if not source.exists():
    raise FileNotFoundError(source)

orders = pd.read_csv(source)
print(f"Extracted {len(orders)} rows")
\`\`\`

**ETL habit:** never modify the original source file in place.`
    },
    {
      number: 3,
      title: "Validate Before You Transform",
      content: `Bad input should be detected before transformation logic spreads the problem.

Check:
- required columns,
- row count,
- duplicate business keys,
- missing critical fields,
- expected data types,
- valid ranges and categories.

\`\`\`python
required = {"order_id", "customer_id", "amount"}
missing = required - set(orders.columns)
if missing:
    raise ValueError(f"Missing columns: {missing}")

if orders["order_id"].duplicated().any():
    raise ValueError("Duplicate order_id detected")
\`\`\`

This is the difference between a script that runs and a pipeline that can be trusted.`
    },
    {
      number: 4,
      title: "Transform with Explicit Business Rules",
      content: `Transformation converts raw values into business-ready data. Rules should be visible and testable.

\`\`\`python
orders["amount"] = pd.to_numeric(orders["amount"], errors="coerce")
orders["status"] = orders["status"].str.strip().str.upper()
orders["is_high_value"] = orders["amount"] >= 1000
orders["order_date"] = pd.to_datetime(orders["order_date"], errors="coerce")
\`\`\`

**Typical transformations:**
- type conversion,
- text standardization,
- date parsing,
- code mapping,
- derived columns,
- joins to reference data,
- aggregation.

Avoid hidden rules scattered throughout the script. Keep them grouped and documented.`
    },
    {
      number: 5,
      title: "Separate Valid and Rejected Records",
      content: `Professional ETL pipelines do not simply delete bad rows. They separate them so someone can investigate and correct them.

\`\`\`python
valid = orders[
    orders["order_id"].notna()
    & orders["amount"].notna()
    & (orders["amount"] >= 0)
].copy()

rejected = orders.loc[~orders.index.isin(valid.index)].copy()
rejected["rejection_reason"] = "Failed ETL validation"
\`\`\`

Store rejected rows with the run date and reason. This creates traceability and makes reprocessing possible.`
    },
    {
      number: 6,
      title: "Load Without Creating Duplicates",
      content: `A pipeline may run more than once. The load step should therefore be designed to avoid duplicate records.

**Common approaches:**
- append only for truly new event data,
- delete-and-reload a known partition,
- upsert using a unique business key,
- stage first, then merge into the target.

\`\`\`sql
MERGE INTO fact_orders AS target
USING staging_orders AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN UPDATE SET amount = source.amount
WHEN NOT MATCHED THEN INSERT (order_id, amount)
VALUES (source.order_id, source.amount);
\`\`\`

A repeatable pipeline should produce the same correct result when safely rerun.`
    },
    {
      number: 7,
      title: "Logging, Run IDs & Auditability",
      content: `Every ETL run should leave evidence of what happened.

Capture:
- pipeline name,
- run ID,
- start and end time,
- source row count,
- loaded row count,
- rejected row count,
- status,
- error message when failed.

\`\`\`python
import logging
from uuid import uuid4

run_id = str(uuid4())
logging.info("run_id=%s stage=extract status=started", run_id)
\`\`\`

This information becomes the foundation for monitoring and troubleshooting later.`
    },
    {
      number: 8,
      title: "Build a Small End-to-End ETL Function",
      content: `Combine the concepts into a simple reusable workflow.

\`\`\`python
def run_orders_etl(source_path):
    df = pd.read_csv(source_path)

    required = {"order_id", "amount", "status"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {missing}")

    df["amount"] = pd.to_numeric(df["amount"], errors="coerce")
    df["status"] = df["status"].str.strip().str.upper()

    valid = df[df["order_id"].notna() & df["amount"].notna()].copy()
    rejected = df.loc[~df.index.isin(valid.index)].copy()

    valid.to_csv("data/processed/orders_clean.csv", index=False)
    rejected.to_csv("data/rejected/orders_rejected.csv", index=False)

    return len(valid), len(rejected)
\`\`\`

**Checkpoint:** explain what happens at extract, validate, transform, reject, load, and audit stages before moving to the next ETL module.`
    }
  ],
  questions: [
    { number: 1, difficulty: "beginner", question: "Why should an ETL program be divided into separate stages?", answer: "So extraction, validation, transformation, loading and monitoring can be tested and maintained independently." },
    { number: 2, difficulty: "beginner", question: "Why should raw source files be preserved?", answer: "They provide an unchanged source of truth for auditing, debugging and reprocessing." },
    { number: 3, difficulty: "beginner", question: "When should required-column validation happen?", answer: "Immediately after extraction, before transformation begins." },
    { number: 4, difficulty: "intermediate", question: "What is the purpose of a rejected-records dataset?", answer: "It preserves records that failed validation along with reasons so they can be investigated and safely reprocessed." },
    { number: 5, difficulty: "intermediate", question: "What does idempotent mean for an ETL load?", answer: "Rerunning the same pipeline safely does not create incorrect duplicates or inconsistent results." },
    { number: 6, difficulty: "intermediate", question: "Name three useful fields in an ETL audit log.", answer: "Examples include run ID, start/end time, source row count, loaded row count, rejected row count, status and error message." }
  ],
  caseStudyQuizzes: [
    {
      case: 1,
      scenario: "A nightly orders pipeline receives a file with the amount column renamed to order_amount.",
      question: "What should happen first?",
      options: ["Load it anyway", "Detect the missing expected column and stop or quarantine the run", "Rename every warehouse column", "Ignore the field"],
      answer: "Correct Option: Detect the missing expected column and stop or quarantine the run"
    },
    {
      case: 2,
      scenario: "The same daily file is accidentally processed twice.",
      question: "Which design best protects the warehouse?",
      options: ["Append every row again", "Use a unique key and an idempotent load strategy such as upsert", "Delete the audit log", "Skip validation"],
      answer: "Correct Option: Use a unique key and an idempotent load strategy such as upsert"
    }
  ]
};

if (typeof window !== "undefined") window.etl2Data = etl2Data;
if (typeof module !== "undefined" && module.exports) module.exports = etl2Data;
