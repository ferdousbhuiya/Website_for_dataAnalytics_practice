const vizProjectData = {
    title: "Viz Project: Building a Sales Dashboard",
    metadata: {
        track: 'data-analyst',
        category: 'Project',
        icon: '📈',
        description: "Design and build a full sales dashboard — choose the right charts, lay out a narrative, and avoid the traps."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview & The Dashboard Brief",
            content: `A complete **dashboard design project**. You are the analyst. The Head of Sales wants one dashboard that answers: *"How is the business doing, and what should I focus on?"* — in under 10 seconds.

**The brief, in plain words:**
- See overall health at a glance (revenue vs target).
- Spot the trend (are we growing?).
- Find where problems live (region, product, channel).
- Know what to do next (top actions).

**The golden structure of a dashboard:**

\`\`\`mermaid
flowchart TD
    A[1. KPI Row: headline numbers] --> B[2. Trend: the story over time]
    B --> C[3. Breakdown: slice by dimension]
    C --> D[4. Action: what to focus on]
\`\`\`

**Rules we will follow:**
- **KPIs on top**, big and few (3–5, not 30).
- **One clear trend chart** (revenue over time).
- **Slices that answer a question** — not a wall of 12 charts.
- **A title that states the takeaway**, not just a label.

Everything below builds this.`
        },
        {
            number: 2,
            title: "Step 1: Choosing the Right Chart Type",
            content: `Chart choice is a *question-answer* problem, not a style preference. Use this decision flow every time:

\`\`\`mermaid
flowchart TD
    A[What do I want to show?] --> B{Trend over time?}
    B -->|Yes| C[Line chart]
    B -->|No| D{Compare categories?}
    D -->|Yes| E{Many categories?}
    E -->|<=7| F[Bar chart]
    E -->|>7| G[Horizontal bar]
    D -->|No| H{Relationship between 2 vars?}
    H -->|Yes| I[Scatter plot]
    H -->|No| J{Part of a whole?}
    J -->|Yes| K{Pie, only if <=5 slices}
    J -->|No| L{Distribution?}
    L -->|Yes| M[Histogram]
\`\`\`

**The rules behind the flow:**
- **Line** for time series (never bars for many points).
- **Bar** for category comparison (sorted!).
- **Scatter** for relationships.
- **Pie** almost never — only for ≤5 slices and not for precision.
- **Histogram** for distributions.

A bar chart for revenue-by-month across 24 months is a bad chart. Know the flow.`
        },
        {
            number: 3,
            title: "Step 2: The KPI Row — Few, Big, Actionable",
            content: `The top of the dashboard is **KPIs**: the handful of numbers that tell you the state of the business at a glance.

**Choose 3–5 KPIs that each answer a question:**
- **Revenue vs target** (are we hitting plan?)
- **MoM growth %** (are we accelerating or slowing?)
- **New customers** (is the top of the funnel healthy?)
- **Churn rate** (are we leaking the base?)

**Presentation rules:**
- Big number, one-line label, and a **delta** (↑ 12% MoM) in green/red.
- A small sparkline for trend context.
- Define each KPI *exactly* below the number ("Revenue = gross sales, excludes refunds") so nobody argues about the definition.

\`\`\`text
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Revenue     │ MoM Growth  │ New Cust    │ Churn       │
│ $2.14M      │ ↑ 12.3%     │ 4,892       │ 3.1%        │
│ vs $2.0M    │ vs 8.1%     │ ↑ 9%        │ ▼ 0.4pp     │
└─────────────┴─────────────┴─────────────┴─────────────┘
\`\`\`

The KPI row is your 10-second answer. Everything below is evidence for it.`
        },
        {
            number: 4,
            title: "Step 3: The Trend Chart — Tell the Story",
            content: `One **revenue-over-time line chart** carries the "are we growing?" story. Make it readable:

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

monthly = df.groupby("order_month")["amount"].sum()
target = 2_000_000  # monthly plan

fig, ax = plt.subplots(figsize=(11, 5))
ax.plot(monthly.index.astype(str), monthly.values, marker="o", linewidth=2, color="#667eea")
ax.axhline(target, color="#f5576c", linestyle="--", linewidth=1.2, label="Target")
ax.set_title("Monthly Revenue vs Target", fontweight="bold")
ax.set_ylabel("Revenue ($)")
ax.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
\`\`\`

**What makes a trend chart *good*:**
- **Target line** — the reader instantly sees "are we above plan?"
- **Annotated turning points** — "pricing change" or "holiday" marked where they happened.
- **Sorted time axis** (never alphabetical months).
- **One metric per chart** — don't stack revenue and profit on one axis.

The chart should let a reader *tell the story back to you* — that's when it works.`
        },
        {
            number: 5,
            title: "Step 4: The Breakdown — Slice by Dimension",
            content: `After trend, the dashboard must answer **"where?"** — which region, product, or channel. Two or three focused breakdowns beat twelve.

\`\`\`python
# 1) Revenue by region (sorted bar)
by_region = df.groupby("region")["amount"].sum().sort_values()
by_region.plot.barh(figsize=(8, 5), color="#667eea")
plt.title("Revenue by Region")
plt.tight_layout(); plt.show()

# 2) Product category share (only if <= 5 categories, else bar)
cat_share = df.groupby("category")["amount"].sum()
cat_share.plot.pie(autopct="%1.0f%%", figsize=(6, 6))
plt.title("Revenue Share by Category")
plt.ylabel(""); plt.tight_layout(); plt.show()
\`\`\`

**Best practices:**
- **Sort bar charts** — descending, so the eye lands on the biggest.
- **Horizontal bars** when labels are long or many.
- **Pie only with ≤5 slices** and distinct colors; otherwise a bar.
- **Don't over-slice** — if a breakdown doesn't change a decision, cut it.

The breakdown turns "we grew" into "we grew *because of the West region*" — that's the insight that matters.`
        },
        {
            number: 6,
            title: "Step 5: Layout & Narrative Order",
            content: `Dashboard layout is **reading order**: the eye should flow top-left → top-right → down, like a page. Put the most important thing first.

**A proven layout:**

\`\`\`mermaid
flowchart LR
    subgraph Top[KPI Row]
        K1[Revenue] --- K2[Growth] --- K3[New Cust]
    end
    Top --> T[Large trend chart: revenue over time]
    T --> B1[Region breakdown]
    T --> B2[Category breakdown]
    B1 --> A[Action box: top 3 focus items]
    B2 --> A
\`\`\`

**Layout rules:**
- **Most important top-left** (the KPI row).
- **Biggest chart gets the most space** (the trend).
- **Related things adjacent** (region + category side by side).
- **An action/focus panel at the bottom** — dashboards should end in "what now?", not just "here's data".

**The narrative:** health (KPIs) → story (trend) → cause (breakdowns) → action. Every section earns its place.`
        },
        {
            number: 7,
            title: "Step 6: Avoiding the Common Traps",
            content: `The fastest way to look senior is to *avoid* the classic visualization mistakes.

**Trap 1 — truncated Y-axis.** Starting a bar chart at 100 instead of 0 exaggerates differences. For bars, start at 0. (Lines can start near the data range — that's fine.)

**Trap 2 — chart junk.** Gridlines everywhere, 3D, rainbow colors, drop shadows. Remove what doesn't carry information.

**Trap 3 — wrong chart.** A pie with 9 slices, a line for a single category comparison, two different scales on one axis.

**Trap 4 — no title.** "Revenue" tells nothing; "Revenue grew 12% driven by the West region" tells everything.

**Trap 5 — too many charts.** A dashboard is a summary, not a dump. If every chart is necessary, none is important.

\`\`\`mermaid
flowchart TD
    A[Dashboard draft] --> B{Does every chart answer a question?}
    B -->|No| C[Cut or replace it]
    B -->|Yes| D{Colors mean something?}
    D -->|No| E[Make color encode a category / a value]
    D -->|Yes| F{Can a new reader get the story in 10s?}
    F -->|No| G[Add a takeaway title]
    F -->|Yes| H[Ship it]
\`\`\`

Run every chart through this checklist before you show anyone.`
        },
        {
            number: 8,
            title: "Step 7: Full Dashboard Recap & Interview Guide",
            content: `The complete dashboard you just designed, end to end:

\`\`\`mermaid
flowchart LR
    A[Brief: how is the business doing?] --> B[KPI row: 3-5 headline numbers]
    B --> C[Trend: revenue over time vs target]
    C --> D[Breakdown: region + category]
    D --> E[Action: top focus items]
    E --> F[Review: chart-choice + no-junk checklist]
\`\`\`

**Interview cheat sheet — say these out loud:**
- **"Start with the decision the dashboard must support."**
- **"KPIs on top, few and big, each with a definition."**
- **"Line for time, bar for categories (sorted), scatter for relationships, pie almost never."**
- **"The trend chart is the story; the breakdowns are the cause; end with an action."**
- **"Bars start at zero; colors encode meaning; titles state the takeaway."**
- **"If a chart doesn't change a decision, cut it."**

You now have a complete, defensible dashboard design process — the same reasoning you'd walk through in a product or analytics interview.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "When would you use a line chart vs a bar chart?",
            answer: "Use a line chart for data over time (trends) or continuous variables. Use a bar chart to compare categories. A bar chart across 24 months is usually wrong; a line chart for a single category comparison is usually wrong too."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "Why should bar charts start at zero?",
            answer: "Bars encode value by length. Starting the axis at 100 instead of 0 truncates the bars and visually exaggerates differences between categories, misleading the reader. Lines, by contrast, can start near the data range."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "What is the best order for a sales dashboard?",
            answer: "Top: a KPI row of 3-5 headline numbers. Then a large trend chart (revenue over time vs target). Then breakdowns by dimension (region, category). End with an action or focus panel. That's health → story → cause → action."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "When is a pie chart acceptable?",
            answer: "Rarely. Only when showing a part-of-a-whole relationship with at most 5 slices and clearly different categories. For precision or many categories, use a bar chart. Most 'pie' use cases are better served by sorted bars."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "Why is a title that states the takeaway better than a descriptive label?",
            answer: "'Revenue' tells the reader nothing actionable. 'Revenue grew 12% driven by the West region' states the insight, so a 10-second reader gets the point without decoding the chart. Chart titles should be sentences, not labels."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "Describe your process for designing a dashboard for a non-technical executive.",
            answer: "1) Clarify the decision the dashboard must support. 2) Pick 3-5 KPIs that answer 'how are we doing?', each with an exact definition. 3) Choose one trend chart for the story, with a target line and annotated turning points. 4) Add 2-3 breakdowns that change actions. 5) Lay out top-to-bottom: KPIs → trend → breakdowns → action. 6) Run every chart through a no-junk, chart-appropriateness checklist. 7) Present the narrative, not the data."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "What is 'chart junk' and why remove it?",
            answer: "Chart junk is visual clutter that carries no information: excessive gridlines, 3D effects, shadows, rainbow colors, and decorative elements. It adds cognitive load and distracts from the data. Removing it makes the chart readable and the insight clear."
        },
        {
            number: 8,
            difficulty: "medium",
            question: "How do you decide if a chart should be in a dashboard?",
            answer: "Ask: does it answer one of the questions the dashboard must support, and would it change a decision or action? If a chart is not necessary for the decision, cut it. A dashboard is a summary — if every chart is essential, none is important."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.vizProjectData = vizProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vizProjectData;
}