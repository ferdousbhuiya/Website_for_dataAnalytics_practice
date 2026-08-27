# DataPrep Pro

A self-contained, static web app for **data analytics, data engineering, and data science interview preparation**. No build step, no server, no dependencies — open `index.html` or host the folder anywhere.

## Features

- **32 topics** across 4 role tracks:
  - **Core Foundations** — Python, Statistics, Communication, Experiment Design
  - **Data Analyst** — SQL, Visualization, Excel, Business, A/B Testing, Product Analytics, **+ pandas, SQL, and Dashboard projects**
  - **Data Engineer** — ETL 1–10, Data Engineering, Big Data, Cloud Data, **+ ETL Pipeline project**
  - **Data Scientist** — Machine Learning, Statistical Modeling, Deep Learning, **+ ML and A/B-Test projects**
- **98 lessons and 153 questions** with full answers
- **36 inline-SVG diagrams** — self-rendered flowcharts (SQL joins, ML pipelines, neural networks, DAGs, chart-selection guides). No CDN, works fully offline.
- **Role-track filters** — view all topics or a single track
- **Progress tracking** — per-topic bars, overall %, PIN-based profiles (localStorage, per-user on the same device)
- **Interactive statistics calculator** — mean, median, mode, std dev, quartiles, outliers, and more
- **Lesson completion** — soft "Mark complete" per lesson
- **Prev/Next + breadcrumb navigation** inside each topic

## Highlights

- **End-to-End ML Project** (`ml_project`): a complete, code-first churn-prediction walkthrough — data → DataFrame → EDA → wrangling → feature engineering → train/val/test split → baseline to gradient boosting → tuning → threshold selection → deployable pipeline. Includes simulated data (runs anywhere, zero downloads).
- **SQL Sales Analytics Project** (`sql_project`): e-commerce case study — schema → monthly revenue trend → top sellers → CLV & cohorts → country breakdown → one executive query.
- **ETL Pipeline Project** (`etl_project`): build a production pipeline — extract → transform → validate → atomic load → Airflow orchestration → monitoring, with working Python.
- **Pandas Wrangling Project** (`pandas_project`): load a messy CSV → clean types → dedupe → derive features → groupby/pivot/merge → export a dashboard-ready dataset.
- **Dashboard Design Project** (`viz_project`): KPI row → trend chart → breakdowns → action panel, with chart-choice and no-junk rules.
- **A/B Test Analysis Project** (`stats_project`): hypothesis → sample size/power → z-test → confidence interval → ship/kill decision.
- **Diagrams**: all render as static inline SVG from a compact built-in converter — nothing to load, nothing to fail.

## Tech

Plain HTML + CSS + vanilla JavaScript. Data lives in `content/*.js` (one file per topic), aggregated by `data.js`. No frameworks, no build tools, no network calls at runtime.

## Run locally

```bash
# from the project folder — any static server works
python -m http.server 8123
# then open http://127.0.0.1:8123
```

Or just open `index.html` in a browser.

## Project structure

```
index.html                 main page
styles.css                 styling (single dark theme)
script.js                  rendering, navigation, progress, diagrams
statistics_calculator.js   stats utility
data.js                    aggregates content/*.js into topicsData
content/
  registry.js              topic order + role-track metadata
  <topic>.js               one file per topic: {title, lessons[], questions[]}
test.js                    node regression suite (zero deps)
```

## Tests

```bash
node test.js
```

16 tests covering data integrity, progress normalization, PIN isolation, and the statistics calculator.

## Deploy

Static site — push to GitHub and enable GitHub Pages (or any static host: Netlify, Vercel, S3…). No build command needed.

## Author

Ferdous Bhuiya — [LinkedIn](https://www.linkedin.com/in/ferdousb/) · [GitHub](https://github.com/ferdousbhuiya)
