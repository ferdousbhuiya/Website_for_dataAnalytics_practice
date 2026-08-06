const pandasProjectData = {
    title: "Pandas Project: Data Wrangling Masterclass",
    metadata: {
        track: 'data-analyst',
        category: 'Project',
        icon: '🐼',
        description: "A complete pandas wrangling project — read real data, clean it, reshape, group, join, and export a dashboard-ready dataset."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview & The Dataset",
            content: `A complete **pandas wrangling project**. You receive a messy sales export and must produce a clean, analysis-ready dataset the team can trust.

**The source file** \`orders.csv\` is messy on purpose:
- \`amount\` stored as text with "$" and commas
- \`order_date\` as inconsistent strings
- duplicate order IDs
- some missing customer IDs
- \`region\` with mixed case and trailing spaces

**The goal:** a tidy DataFrame with one row per order, correct types, no dupes, and useful derived columns.

\`\`\`mermaid
flowchart LR
    A[Raw CSV] --> B[Load: pd.read_csv]
    B --> C[Inspect: shape, dtypes, info]
    C --> D[Clean: types, strings, nulls]
    D --> E[Reshape: group, pivot, merge]
    E --> F[Export: clean CSV ready for BI]
\`\`\`

You will use the exact functions interviewers expect: \`read_csv\`, \`astype\`, \`str\`, \`drop_duplicates\`, \`fillna\`, \`groupby\`, \`merge\`, \`pivot\`, \`to_csv\`.`
        },
        {
            number: 2,
            title: "Step 1: Load & Inspect the DataFrame",
            content: `Load the messy file and inspect it before touching anything.

\`\`\`python
import pandas as pd

df = pd.read_csv("orders.csv")
print(df.shape)            # (rows, cols)
print(df.columns.tolist())
print(df.dtypes)           # types — find the traps
print(df.head(5))
print(df.isnull().sum())   # missing per column
\`\`\`

**What the inspection tells you:**
- \`amount\` is \`object\` (text) — can't sum it yet.
- \`order_date\` is \`object\` — can't sort/compare dates yet.
- \`customer_id\` has nulls — those rows can't join to customers.
- \`region\` shows \`"North"\`, \`"north "\`, \`"NORTH"\` — the same region three ways.

Every problem is visible at this stage if you look. The rest of the project is *fixing what you just saw* — never skip the inspect step.`
        },
        {
            number: 3,
            title: "Step 2: Clean Types — Amount & Date",
            content: `Coerce text into real numbers and dates.

\`\`\`python
# 1) amount: "$1,234.50" -> 1234.5
df["amount"] = (
    df["amount"]
    .astype(str)
    .str.replace("$", "", regex=False)
    .str.replace(",", "", regex=False)
    .pipe(pd.to_numeric, errors="coerce")
)

# 2) order_date: parse, unify to datetime
df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")

# 3) region: strip whitespace + normalize case
df["region"] = df["region"].str.strip().str.title()

# 4) verify
print(df.dtypes)
print(df["amount"].isna().sum(), "amount NaNs")
print(df["order_date"].isna().sum(), "date NaNs")
\`\`\`

**Key pandas moves:**
- \`.str.replace(..., regex=False)\` removes literals safely.
- \`pd.to_numeric(..., errors="coerce")\` turns garbage into NaN (not an exception).
- \`pd.to_datetime(..., errors="coerce")\` does the same for dates.
- \`.str.strip().str.title()\` normalizes messy text.

After this, \`df["amount"].sum()\` actually works.`
        },
        {
            number: 4,
            title: "Step 3: Drop Duplicates & Handle Missing",
            content: `De-duplicate on the natural key and decide what to do with nulls.

\`\`\`python
# 1) duplicates: same order_id, keep the latest (by date)
before = len(df)
df = df.sort_values("order_date").drop_duplicates(subset="order_id", keep="last")
print(f"dropped {before - len(df)} duplicate rows")

# 2) rows with NO usable order_id or date are junk — drop
df = df.dropna(subset=["order_id", "order_date"])

# 3) missing amount: fill with 0 (no order value) — a business decision
df["amount"] = df["amount"].fillna(0)

# 4) missing region: assign 'Unknown' so groupby doesn't silently hide them
df["region"] = df["region"].fillna("Unknown")

print(df.isnull().sum())
\`\`\`

**Decision log (interviewers love this):**
- **Dupes** → keep latest by date (the most recent state wins).
- **Null amount** → 0, because an order with no value is a zero-value order, not a missing row.
- **Null region** → "Unknown", so \`groupby("region")\` keeps them visible instead of dropping.

Every fill rule is a *business decision*, not a default. State it.`
        },
        {
            number: 5,
            title: "Step 4: Derived Columns",
            content: `Add columns that make reporting easy.

\`\`\`python
import numpy as np

# 1) order month for trend reporting
df["order_month"] = df["order_date"].dt.to_period("M").astype(str)

# 2) weekday (0=Monday) — answer "which days are busiest?"
df["weekday"] = df["order_date"].dt.dayofweek

# 3) value band — business segments orders
df["value_band"] = pd.cut(
    df["amount"],
    bins=[-1, 50, 200, 1000, np.inf],
    labels=["low", "mid", "high", "premium"],
)

# 4) an order "age" in days at the time of processing (example)
df["processing_days"] = (pd.Timestamp("2026-01-31") - df["order_date"]).dt.days

print(df[["order_month", "weekday", "value_band"]].head())
\`\`\`

**Why derived columns matter:** the raw data has the *when* and *how much*, but the business thinks in *months*, *weekdays*, and *value bands*. You bridge that gap — that's the analyst's real job.`
        },
        {
            number: 6,
            title: "Step 5: Group, Pivot & Merge",
            content: `The analytical heavy lifting — aggregation, reshaping, and joining.

\`\`\`python
# 1) Revenue by region (groupby)
rev_by_region = df.groupby("region")["amount"].agg(["sum", "mean", "count"])
print(rev_by_region.sort_values("sum", ascending=False))

# 2) Pivot: revenue by region x month (rows=region, cols=month)
pivot = df.pivot_table(
    index="region", columns="order_month",
    values="amount", aggfunc="sum", fill_value=0
)
print(pivot)

# 3) Merge with customer metadata (one-to-many: orders -> customers)
customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "segment": ["retail", "wholesale", "retail"],
})
merged = df.merge(customers, on="customer_id", how="left")
print(merged["segment"].value_counts(dropna=False))

# 4) Export the clean dataset
df.to_csv("orders_clean.csv", index=False)
\`\`\`

**The three tools and when to use them:**
- **\`groupby\`** → one summary *per category* (revenue by region).
- **\`pivot_table\`** → categories as *rows and columns* (region × month matrix).
- **\`merge\`** → combine two tables on a key (orders + customers).`
        },
        {
            number: 7,
            title: "Step 6: Answers From the Clean Data",
            content: `Now the clean DataFrame answers the business questions.

\`\`\`python
# 1) Which region earns the most?
top_region = df.groupby("region")["amount"].sum().idxmax()

# 2) Which weekday is busiest?
busiest_day = df.groupby("weekday")["order_id"].count().idxmax()

# 3) Top 5 customers by lifetime value
top_customers = df.groupby("customer_id")["amount"].sum().nlargest(5)

# 4) Month-over-month growth
monthly = df.groupby("order_month")["amount"].sum()
growth = monthly.pct_change().mul(100).round(1)

# 5) Value-band distribution
band_share = df["value_band"].value_counts(normalize=True).mul(100).round(1)

print("Top region:", top_region)
print("Busiest weekday (0=Mon):", busiest_day)
print(growth)
print(band_share)
\`\`\`

Each answer maps to the wrangling we did: without clean types, \`sum()\` failed; without dedupe, revenue was inflated; without the month column, trends were awkward. Good wrangling makes analysis trivial — bad wrangling makes it wrong.`
        },
        {
            number: 8,
            title: "Step 7: Full Pipeline Recap & Interview Cheat Sheet",
            content: `The whole wrangling flow, end to end:

\`\`\`mermaid
flowchart TD
    A[read_csv] --> B[inspect: shape, dtypes, isnull]
    B --> C[coerce types: to_numeric, to_datetime]
    C --> D[dedupe + fillna by business rule]
    D --> E[derive: month, weekday, bands]
    E --> F[groupby / pivot / merge]
    F --> G[answer questions + export clean CSV]
\`\`\`

**The interview cheat sheet — say these out loud:**
- **"Inspect before you touch."** \`shape\`, \`dtypes\`, \`isnull().sum()\`.
- **"Coerce, don't crash."** \`pd.to_numeric(..., errors="coerce")\`, \`pd.to_datetime(...)\`.
- **"Every null-fill is a business decision."** 0 for zero-value, "Unknown" for missing category.
- **"Dedupe on the natural key, keep latest."**
- **"Derived columns are your product."** months, weekdays, bands.
- **"Groupby for per-category, pivot for matrix, merge for two tables."**

That is a complete pandas wrangling project — the exact shape of a real analyst task and a common take-home interview.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "How do you read a CSV into a DataFrame and check its shape and types?",
            answer: "df = pd.read_csv('file.csv'); then df.shape gives (rows, columns), df.dtypes shows column types, and df.info() shows non-null counts. Always inspect before cleaning."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "How do you convert a text column like '$1,234.50' into a numeric column?",
            answer: "df['amount'] = df['amount'].astype(str).str.replace('$','',regex=False).str.replace(',','',regex=False).pipe(pd.to_numeric, errors='coerce'). errors='coerce' turns any remaining garbage into NaN instead of crashing."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "How do you remove duplicate rows by a key column, keeping the latest?",
            answer: "Sort by date first, then drop_duplicates(subset='order_id', keep='last'). The sort ensures 'last' means most recent; keep='first' would keep the oldest."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "What is the difference between groupby, pivot_table, and merge in pandas?",
            answer: "groupby collapses rows into per-category summaries (revenue by region). pivot_table reshapes categories into a row/column matrix (region × month). merge joins two DataFrames on a key (orders + customers). Each solves a different reshaping problem."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "Why fill missing regions with 'Unknown' instead of dropping those rows?",
            answer: "Dropping hides them — a groupby('region') would silently omit those orders, understating total revenue. Filling with 'Unknown' keeps the data visible and lets you decide later whether to investigate them."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "Describe the full pandas data-wrangling workflow you'd apply to a messy sales export.",
            answer: "1) read_csv + inspect (shape, dtypes, isnull). 2) Coerce text to numeric/date with errors='coerce'. 3) Normalize strings (strip/title). 4) Dedupe on the natural key keeping latest. 5) Fill nulls with explicit business rules. 6) Derive reporting columns (month, weekday, bands). 7) Aggregate with groupby/pivot, join with merge. 8) Export a clean CSV and validate it."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "How do you compute month-over-month revenue growth in pandas?",
            answer: "monthly = df.groupby('order_month')['amount'].sum(); growth = monthly.pct_change().mul(100).round(1). pct_change() computes the percentage change from each month to the next, and NaN for the first month is expected."
        },
        {
            number: 8,
            difficulty: "medium",
            question: "What does errors='coerce' do and why is it safer than the default?",
            answer: "It makes pd.to_numeric/pd.to_datetime turn unparseable values into NaN instead of raising an exception. This lets the pipeline continue, and you handle the NaNs deliberately (drop or fill) rather than crashing the whole job on one bad row."
        }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "You receive orders.csv where amount is stored as text like \"$1,234.50\", dates are inconsistent strings, and there are duplicate order IDs. Your first instinct is to start summarizing revenue.",
            question: "What is the correct first step before any aggregation?",
            options: [
                "Aggregate revenue by region before checking data types",
                "Load the file and inspect shape, dtypes, and null counts before cleaning",
                "Drop every row with a missing value immediately",
                "Export the data to Excel and fix it manually"
            ],
            answer: "Correct Option: Load the file and inspect shape, dtypes, and null counts before cleaning"
        },
        {
            case: 2,
            scenario: "Your orders DataFrame has missing values in the region column. If you run df.groupby('region')['amount'].sum() as-is, those orders silently vanish from the results.",
            question: "How should you handle the missing region values so revenue is not understated?",
            options: [
                "Drop all rows with missing region to keep the data clean",
                "Fill missing regions with 'Unknown' so groupby keeps them visible",
                "Replace missing regions with the most common region",
                "Leave them blank and ignore groupby results"
            ],
            answer: "Correct Option: Fill missing regions with 'Unknown' so groupby keeps them visible"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.pandasProjectData = pandasProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pandasProjectData;
}