const productProjectData = {
    title: "Product Project: Growth & Retention Deep Dive",
    metadata: {
        track: 'data-analyst',
        category: 'Project',
        icon: '🚀',
        description: "A complete product-analytics project — build funnels, cohorts, and retention metrics to find where users leak."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview & The Product Question",
            content: `A complete **product-analytics** project. You are the product analyst. A subscription app is growing in signups but retention is poor — "users sign up and vanish." Leadership wants to know *where* users leak and what to fix.

**The questions we will answer:**
1. Where do users drop off in onboarding? (funnel)
2. Are newer cohorts retaining worse than older ones? (cohorts)
3. Which feature is the "aha moment" that predicts retention?
4. What should the team build next? (actionable recommendation)

**The workflow:**

\`\`\`mermaid
flowchart LR
    A[Event data] --> B[Build funnel]
    B --> C[Build cohorts + retention]
    C --> D[Find the aha moment]
    D --> E[Recommend + measure]
\`\`\`

Everything is computed from the **event stream**: timestamped user actions like \`signup_completed\`, \`feature_used\`, \`invite_sent\`.`
        },
        {
            number: 2,
            title: "Step 1: Understand the Event Data",
            content: `Product analytics runs on **events** — discrete, timestamped actions.

\`\`\`json
{"event": "signup_completed", "user_id": "u1", "ts": "2026-01-05T09:12:00Z"}
{"event": "onboarding_step_1", "user_id": "u1", "ts": "2026-01-05T09:14:00Z"}
{"event": "feature_used",       "user_id": "u1", "ts": "2026-01-05T09:30:00Z"}
\`\`\`

Load it into a DataFrame:

\`\`\`python
import pandas as pd

events = pd.read_json("events.json", lines=True)
events["ts"] = pd.to_datetime(events["ts"])
events["day"] = events["ts"].dt.date
print(events.shape)
print(events["event"].value_counts())
\`\`\`

**Key checks before analyzing:**
- **Volume:** how many events, how many distinct users?
- **Coverage:** every user has \`signup_completed\`? (missing = tracking gap, not low retention)
- **Definitions:** one event name = one meaning.

**The analyst's first law:** if the event layer is untrustworthy, every metric built on it is noise. Validate tracking before reporting.`
        },
        {
            number: 3,
            title: "Step 2: The Onboarding Funnel",
            content: `A **funnel** counts users who complete each step, then shows the drop-off.

\`\`\`python
steps = [
    "signup_completed",
    "onboarding_step_1",
    "onboarding_step_2",
    "first_feature_used",
]

funnel = {}
for step in steps:
    funnel[step] = events[events["event"] == step]["user_id"].nunique()

funnel_df = pd.Series(funnel, name="users").to_frame()
funnel_df["conversion"] = (funnel_df["users"] / funnel_df["users"].shift(1)).round(3)
print(funnel_df)
\`\`\`

**Reading the funnel:**
- 10,000 signups → 8,000 do step 1 (80%) → 4,000 do step 2 (50%) → 1,200 reach first feature (30%).
- **The biggest drop is onboarding_step_1 → step_2 (50%).** That's the friction point.

Don't report "30% overall" — the *step* where you lose people is the actionable insight. The 50% drop is the team's next experiment target.`
        },
        {
            number: 4,
            title: "Step 3: Cohort Retention",
            content: `A **cohort** is a group of users who signed up the same week. **Retention** is how many come back each week after.

\`\`\`python
# 1) each user's cohort = week they signed up
signups = events[events["event"] == "signup_completed"]
signups["cohort_week"] = signups["ts"].dt.to_period("W").astype(str)
cohort = signups.groupby("user_id")["cohort_week"].first().rename("cohort_week")

# 2) each user's activity weeks (distinct)
active = events[["user_id", "ts"]].copy()
active["week"] = active["ts"].dt.to_period("W").astype(str)
active = active.drop_duplicates()

# 3) weeks since signup
ret = active.merge(cohort, on="user_id")
ret["week_since"] = (
    pd.to_datetime(ret["week"].apply(lambda p: pd.Period(p).start_time)) -
    pd.to_datetime(ret["cohort_week"].apply(lambda p: pd.Period(p).start_time))
).dt.days // 7

cohort_size = ret.groupby("cohort_week")["user_id"].nunique()
retention = ret.groupby(["cohort_week", "week_since"])["user_id"].nunique() / cohort_size
print(retention.unstack().round(2).head())
\`\`\`

**Reading the matrix (rows = cohort, cols = weeks since signup):**
- If each row's tail is *lower* than the row above → newer cohorts retain worse. Confirmed.
- Week-1 retention (col 1) is the most predictive single number.

**The pattern tells the team *when* users churn** — the first week — so the fix targets the first-week experience.`
        },
        {
            number: 5,
            title: "Step 4: Find the 'Aha Moment'",
            content: `The **aha moment** is a behavior that separates users who stay from those who churn.

\`\`\`python
first7 = active[active["week_since"] == 0]  # signup week activity
features = ["feature_used", "invite_sent", "profile_completed"]

for f in features:
    used = set(first7[first7["event"] == f]["user_id"])
    retained = set(ret[ret["week_since"] == 3]["user_id"])   # active at week 4
    if used:
        ret_who_used = len(used & retained) / len(used)
        print(f"{f}: retained_at_week4={ret_who_used:.2%}")
\`\`\`

**The pattern:**
- \`feature_used\` in week 1 → 55% retained at week 4.
- Didn't use it → 15% retained.
- **That's the aha moment:** a behavior that 3.5x's retention.

Instead of "retention is bad," you now have "users who send one invite in week 1 are 3.5x more likely to stay." That's a concrete product lever.`
        },
        {
            number: 6,
            title: "Step 5: Recommend & Measure the Fix",
            content: `The final output is an **actionable recommendation**, not a chart dump.

**The recommendation (written the way a product team would read it):**
> New users leak at onboarding step 2 (50% drop). Users who send an invite in week 1 retain 3.5x better. Recommendation: move the invite prompt earlier, right after step 1, and A/B test it.

\`\`\`mermaid
flowchart LR
    A[Finding: 50% leak at step 2] --> B[Finding: invite = aha moment]
    B --> C[Recommendation: prompt invite after step 1]
    C --> D[A/B test the change]
    D --> E[Measure: step-2 conversion + week-4 retention]
\`\`\`

**The measurement plan:**
- **Primary metric:** onboarding step-2 completion (the leak).
- **Secondary:** week-1 invite sends, week-4 retention.
- **Guardrail:** daily active users, revenue.

Every recommendation states the expected metric move and how it will be measured — that's what turns analysis into action.`
        },
        {
            number: 7,
            title: "Step 6: Present the Story",
            content: `Analysts are judged on **how the story lands**.

**The 10-second headline:**
> "New users drop off at onboarding step 2, and users who send an invite in week 1 stay 3.5x longer. Move the invite earlier and A/B test it."

**The narrative order:**
1. **Hook:** signups are up, but only 12% of new users are active at week 4.
2. **Funnel:** the leak is at step 2 (50%).
3. **Cohorts:** newer cohorts retain worse (it's getting worse, not better).
4. **Aha:** the invite behavior predicts retention 3.5x.
5. **Recommendation:** move the invite prompt + A/B test.

**Presentation rules:**
- **Title as a sentence** ("Users who invite in week 1 retain 3.5x longer"), not "Retention by Feature."
- **One chart per slide**, annotated.
- **Recommendation on its own slide.**
- **Prepare the "so what?" answer** for every chart.`
        },
        {
            number: 8,
            title: "Step 7: Full Recap & Interview Guide",
            content: `The complete product-analytics project, end to end:

\`\`\`mermaid
flowchart TD
    A[Event data] --> B[Funnel: find the leak]
    B --> C[Cohorts: is it getting worse?]
    C --> D[Aha moment: what predicts retention]
    D --> E[Recommendation + A/B test plan]
    E --> F[Present as a story]
\`\`\`

**Interview cheat sheet — say these out loud:**
- **"Validate the event layer first."** Bad tracking → bad metrics.
- **"Funnel finds *where* users leak; cohort retention shows *when*."**
- **"The aha moment = behavior that separates stayers from leavers."**
- **"Recommendations state the expected metric move and the test."**
- **"Titles are sentences; one chart per slide; end with the action."**

That's a complete product-analytics deep dive.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is a funnel in product analytics?",
            answer: "A funnel tracks how many users complete each step in an ordered sequence toward a goal, showing the drop-off between steps. It pinpoints where users leak in a journey."
        },
        {
            number: 2,
            difficulty: "medium",
            question: "What is a cohort, and why is cohort analysis more useful than a single average retention number?",
            answer: "A cohort is a group of users who share a defining event in the same time window (e.g., signed up the same week). Cohort analysis tracks each group over time, so you can see whether newer cohorts retain better or worse — a single average hides that trend."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "What is an 'aha moment' and how do you find it?",
            answer: "It's a specific user behavior that strongly predicts long-term retention. You find it by comparing week-4 retention of users who did the behavior in week 1 vs those who didn't; a behavior that dramatically separates stayers from leavers is the aha moment."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "You see a 50% drop between onboarding steps 1 and 2. What is a likely cause, and how would you investigate?",
            answer: "Likely friction: a required step that's confusing or time-consuming, a broken/erroring step, or a step with unclear value. Investigate by checking error rates on step 2, session recordings, and asking a few new users; then A/B test a simplified step 2."
        },
        {
            number: 5,
            difficulty: "hard",
            question: "How do you build a weekly retention matrix?",
            answer: "1) Assign each user a cohort = the week they signed up. 2) Record which weeks they were active (distinct user-week pairs). 3) Compute weeks-since-signup for each activity. 4) Retention = active users in (cohort, week_since) divided by cohort size. Rows are cohorts, columns are weeks since signup."
        },
        {
            number: 6,
            difficulty: "medium",
            question: "Why should a product analyst recommend a next step, not just present charts?",
            answer: "Charts describe the past; recommendations drive action. A good analysis ends with a specific, testable next step that states the expected metric move. That turns you from a report-writer into a decision partner."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "What makes an event metric trustworthy?",
            answer: "Clear, unambiguous event definitions (one event per action), consistent naming, and complete tracking (every user emits the events you analyze). If the event layer has gaps or vague names, every metric built on it is noise."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "Newer cohorts retain worse than older ones. What could explain this, and what do you do?",
            answer: "Recent changes to onboarding, a new acquisition channel bringing lower-quality users, changing product focus, or seasonality. Separate cohorts by acquisition channel to see if it's channel mix; if it's a product change, look at the onboarding funnel for newer cohorts to find where the leak grew."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.productProjectData = productProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productProjectData;
}