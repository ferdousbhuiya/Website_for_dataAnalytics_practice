const communicationData = {
    title: "Communication & Stakeholder Management",
    metadata: {
        track: 'core',
        category: 'Soft Skills',
        icon: '💬',
        description: "Translate data into business impact. Present findings, manage expectations, and build trust with non-technical stakeholders."
    },
    lessons: [
        {
            number: 1,
            title: "The Pyramid Principle: Structuring Your Narrative",
            content: `Start with the answer first. Then, group and summarize your supporting arguments. Finally, explain your supporting ideas in a logical order.

**The pyramid, top-down:**
1. **Answer first** — the headline recommendation or conclusion.
2. **Supporting groups** — 3-5 mutually exclusive, collectively exhaustive (MECE) arguments.
3. **Evidence** — data points, charts, and analysis under each argument.

\`\`\`mermaid
graph TD
    R[Recommendation / Answer] --> G1[Supporting Argument 1]
    R --> G2[Supporting Argument 2]
    R --> G3[Supporting Argument 3]
    G1 --> E1[Evidence / chart]
    G2 --> E2[Evidence / chart]
    G3 --> E3[Evidence / chart]
\`\`\`

Stakeholders skim. Lead with the punchline — if they only read the first sentence, they should already have the decision.`
        },
        {
            number: 2,
            title: "Choosing What to Present",
            content: `Your analysis produced 40 charts and 12 findings. Your audience has 15 minutes. Deciding what to cut is a core skill.

**Selection filters:**
- **Does it change a decision?** If a finding doesn't alter what anyone does, it's context, not content.
- **Does it answer the question asked?** Start from the stakeholder's explicit question, not your exploration.
- **Is it material to the risk?** Uncertainty ranges and caveats matter; minor footnotes don't.
- **Will it cause confusion?** Cut anything that distracts from the core story.

\`\`\`mermaid
flowchart TD
    A[All findings] --> B{Changes a decision?}
    B -->|No| D[Cut / archive]
    B -->|Yes| C{Answers the ask?}
    C -->|No| D
    C -->|Yes| E{Exec-level relevant?}
    E -->|Yes| F[Include]
    E -->|No| G[Put in appendix]
\`\`\`

Rule of thumb: present **the minimum needed to make the decision**, and park everything else in the appendix.`
        },
        {
            number: 3,
            title: "Dashboards vs. Reports: Two Different Beasts",
            content: `A dashboard and a report are not synonyms. Choosing the wrong one is a common failure.

**Dashboard = monitoring now.**
- Live KPIs, designed to be scanned in 10 seconds.
- Alerts when metrics move (thresholds, red/green states).
- No paragraphs — just numbers, trends, and status.

**Report = deep dive on a question.**
- Structured narrative with context, cause, and recommendation.
- Analysis, annotations, and supporting detail.
- Answers "why did this happen and what do we do?"

**Which to build when:**

\`\`\`mermaid
graph TD
    A{What does the user need?} -->|Track a live metric / status| B[Dashboard]
    A -->|Explain, diagnose, decide| C[Report]
    B --> D{Change over time?}
    D -->|Yes| E[Trend line + target]
    D -->|No| F[Single status KPI]
\`\`\`

A recurring executive update that just lists KPI values is a dashboard with the wrong label.`
        },
        {
            number: 4,
            title: "The Executive Summary",
            content: `Executives make decisions between meetings. Your summary must survive a 30-second skim and still carry the decision.

**The standard executive summary skeleton:**
1. **Bottom line** — what you found and what you recommend (1-2 sentences).
2. **Why it matters** — the business impact in money/risk/time.
3. **Key evidence** — the 2-3 facts that prove the point.
4. **Next steps / asks** — what you need, by when.

**A tight example:**
> "Conversion fell 12% QoQ on mobile checkout, costing an estimated \$2.1M in revenue. The drop follows the new 3-step payment flow; reverting to the 2-step flow is projected to recover most of it. We recommend shipping the revert next sprint (v.42), with a guardrail experiment to confirm."

**What to kill:** methodology slides, every metric you looked at, and "it's complicated" hedges. If the recommendation is conditional, say the condition in one line.`
        },
        {
            number: 5,
            title: "Handling Pushback",
            content: `Pushback isn't hostility — it's a signal your stakeholder has context you don't or your evidence has a gap. Treating it as an attack destroys trust; treating it as information wins it.

**The playbook when someone challenges your analysis:**
1. **Clarify before defending.** "Which part — the data source, the metric, or the conclusion?"
2. **Restate the concern** to confirm you understood it.
3. **Isolate the claim from the person.** Attack the data, not each other.
4. **Give the caveat you already knew.** "You're right that we excluded refunds — here's why, and here's what happens if we include them."
5. **Offer to test it.** "Let me run that version and share the numbers."

\`\`\`mermaid
flowchart LR
    A[Pushback] --> B{Is the claim about evidence?}
    B -->|Yes| C[Show the data / rerun]
    B -->|No| D[Is it about scope?]
    D -->|Yes| E[Align on question, re-scope]
    D -->|No| F[Clarify intent, find common ground]
    C --> G[Stronger shared decision]
    E --> G
    F --> G
\`\`\`

Saying "I'll double-check that" is not weakness — it's rigor.`
        },
        {
            number: 6,
            title: "Asking Good Questions",
            content: `The quality of your analysis starts with the quality of your questions. Most failed projects fail at intake, not execution.

**Question types that change projects:**
- **Outcome-focused:** "What decision will this inform?" / "What would you do differently with the answer?"
- **Scope:** "What's in and out? Which population, which time range?"
- **Baseline:** "What does success look like? What metric would be a win?"
- **Constraints:** "What are we assuming is fixed? What's the deadline?"
- **Risks:** "What would make this result unusable?"

**The interview funnel:**

\`\`\`mermaid
graph TD
    A[What's the decision?] --> B[Who makes it and when?]
    B --> C[What metric would move them?]
    C --> D[What data can we get?]
    D --> E[What would invalidate it?]
\`\`\`

Technique: for every vague ask ("can you look into churn?"), play back the *specific decision* it feeds before you start pulling data.`
        },
        {
            number: 7,
            title: "Data Storytelling: From Numbers to Narrative",
            content: `The human brain forgets slides of numbers but remembers stories. A data narrative has a beginning, a turn, and a resolution — built on a clear spine.

**The narrative spine:**
1. **Hook** — the metric or tension that matters now.
2. **Rise** — the 2-3 forces behind it (who, what, when).
3. **Turn** — the insight that changes the picture (the 'aha').
4. **Resolution** — the recommended action and expected impact.

**Structuring an insight slide:**
- **Title as a sentence** (not "Churn by Cohort" but "Churn spikes 3x after the first free trial ends").
- **Chart as evidence** — one clear visual per slide, annotated.
- **Callout** — one line on what to do next.

\`\`\`mermaid
graph LR
    A[Hook: metric moves] --> B[Why: evidence]
    B --> C[Aha: the driver]
    C --> D[Action + impact]
\`\`\`

Every slide should survive the "so what?" test: if a reader can't state the takeaway, the slide is a data dump, not a story.`
        },
        {
            number: 8,
            title: "Presenting Bad News & Visualizing for Clarity",
            content: `Bad news (missed targets, failed experiments, risky findings) is where trust is built or burned. Good analysts make the painful call *clear* and *actionable*.

**Presenting bad news without the flinch:**
1. **Lead with the number**, not the mood. "We missed Q3 target by 14%."
2. **Add context** — vs. same period, vs. forecast, drivers.
3. **Own the analysis** — what we got right, what we were wrong about.
4. **Offer the path** — 2-3 recovery options with trade-offs.
5. **Avoid burying it**: euphemism ("a challenging quarter") reads as manipulation.

**Visualizing for clarity:**
- **Right chart, right job:** line for trends over time, bar for comparison across categories, scatter for relationship, histogram for distribution.
- **Kill clutter:** no 3D, no double axis unless justified, data labels only when they add.
- **Annotate the insight:** point to the dip, the spike, the outlier — don't make the audience hunt.

\`\`\`mermaid
flowchart TD
    A[Bad news data] --> B[Lead with the number]
    B --> C[Context + drivers]
    C --> D[What we own]
    D --> E[Recovery path]
    E --> F[Clear chart + callout]
\`\`\`

The most respected analysts are the ones who deliver hard truths early and constructively — before someone else discovers them.`
        },
        {
            number: 9,
            title: "Cross-Functional Collaboration",
            content: `Data work lives between teams: you need product, engineering, finance, and operations to act on your findings. Influence without authority is the analyst's superpower.

**Build the bridge early:**
- **Translate into their language.** "Statistically significant uplift" → "This is worth ~\$40K a month."
- **Get early buy-in.** Share a rough draft and one focused question before the big review — no surprises.
- **Respect their constraints.** Engineering timelines and finance fiscal years shape what "recommended" means.
- **Make it easy to act.** A finding without a named owner, deadline, and owner is a wish.

**The collaboration loop:**

\`\`\`mermaid
graph TD
    A[Analyst & stakeholder agree on question] --> B[Analyst builds draft]
    B --> C[Share draft early with 1 question]
    C --> D[Incorporate context / constraints]
    D --> E[Deliver final with owners & next steps]
    E --> F[Follow up on action taken]
    F --> A
\`\`\`

**Red flags to avoid:** dropping a finished deck with no prior heads-up, "this is the answer" posturing, and ghosting follow-ups. Communication is a loop, not a one-time announcement.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the core idea of the Pyramid Principle?",
            answer: "Start with your conclusion (the answer), then provide the supporting arguments grouped logically, and only then the underlying evidence. This is the opposite of the chronological way you did the analysis, and it matches how busy stakeholders actually read."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "What is the difference between a dashboard and a report?",
            answer: "A dashboard is for monitoring live status — scannable KPIs, trends, and alerts that answer 'how are we doing right now'. A report is a structured narrative for answering a specific question — context, causes, and recommendations. A dashboard says what's happening; a report says why and what to do."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "You found 15 insights but the stakeholder only has a 10-minute slot. How do you choose what to present?",
            answer: "Apply three filters: (1) does it change a decision — if not, cut it; (2) does it answer the question asked — if not, cut it; (3) is it material — everything else goes to the appendix. Present the minimum needed for the decision, one story line, and keep the rest available on request."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "Your analysis shows the team will miss the quarterly target. What is the best first sentence in the meeting?",
            answer: "Lead with the number, directly: 'We are tracking 14% below the quarterly target.' Then give context (vs. plan, vs. last year), the drivers, what you own, and 2-3 recovery options. Leading with the bad news is honest, builds trust, and focuses the room on the decision rather than the delivery."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "A stakeholder disputes your conclusion and says your data is wrong. How do you respond?",
            answer: "Clarify before defending: ask which part they're challenging — the source, the metric, or the interpretation. Restate their concern to confirm understanding, isolate the claim from the person, acknowledge the caveats you already know, and offer to rerun or test their version. The goal is a better shared decision, not a win."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "You are asked to 'look into why churn is increasing'. What questions do you ask before touching data, and why?",
            answer: "Ask: (1) what decision will this inform — so you know the deliverable shape; (2) which churn definition — cancelations vs. no-activity vs. downgrades, because they have different drivers; (3) what time frame and segments matter; (4) what success looks like and what metric would be a win; (5) what data is actually available. Without these, you risk analyzing the wrong metric for the wrong question."
        },
        {
            number: 7,
            difficulty: "hard",
            question: "Explain the role of the 'so what' test in building a data-storytelling slide.",
            answer: "The 'so what' test requires that each slide can be reduced to a single takeaway a reader can state aloud. If not, the slide is a data dump, not a narrative. Practically, it forces you to write the title as a finding ('Churn spikes 3x after the trial ends' instead of 'Churn by Cohort'), annotate the chart to point at the insight, and end with a recommended action — turning evidence into a story that drives decisions."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "Your recommendation is correct but the engineering team pushes back on the timeline. How do you handle the conflict productively?",
            answer: "Reframe from 'my analysis wins' to 'the best decision given constraints'. Understand their constraint (release freeze, refactor cost), offer a phased path — e.g., ship the minimal version that captures most of the value now, iterate later — and quantify the cost of delay so the trade-off is explicit. Align the recommendation with their calendar, get buy-in on a revised plan, and follow up. Influence without authority means respecting constraints, not overriding them."
        },
        {
            number: 9,
            difficulty: "medium",
            question: "What does a strong executive summary include, and what does it deliberately leave out?",
            answer: "It includes (in order): the bottom-line finding and recommendation, why it matters in business terms, the 2-3 key pieces of evidence, and the asks/next steps. It leaves out methodology, the full menu of metrics explored, hedging, and detail that doesn't change the decision. It must survive a 30-second skim."
        },
        {
            number: 10,
            difficulty: "easy",
            question: "Which chart type is best for showing a trend over time, and which for comparing categories?",
            answer: "A line chart is best for trends over time (monthly revenue, conversion by week). A bar chart is best for comparing categories (revenue by region, plan type). Scatter plots show relationships between two numeric variables, and histograms show distributions of a single variable."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.communicationData = communicationData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = communicationData;
}