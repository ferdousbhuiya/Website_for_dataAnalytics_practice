const productAnalyticsData = {
    title: "Product Analytics",
    metadata: {
        track: 'data-analyst',
        category: 'Product',
        icon: '🚀',
        description: "Analyze user behavior to understand engagement, retention, and conversion. Learn to build funnels, cohorts, and product dashboards."
    },
    lessons: [
        {
            number: 1,
            title: "Behavioral Event Tracking",
            content: `
                <h4>1. Events, not page views</h4>
                <p>Modern product analytics is built on <strong>events</strong>: discrete, timestamped actions a user takes ("Signed Up", "Added to Cart", "Shared"). Each event carries an event name, a user identifier, a timestamp, and optional properties (device, plan, campaign source, feature flag).</p>

                <h4>2. A canonical event shape</h4>
                <pre><code>{
  "event": "checkout_completed",
  "user_id": "u_91283",
  "anonymous_id": "anon_7f3a",
  "ts": "2026-08-03T14:22:10Z",
  "props": {
    "plan": "pro",
    "platform": "ios",
    "amount_cents": 4000,
    "campaign": "spring_sale"
  }
}</code>
                </p>

                <h4>3. Design rules</h4>
                <ul>
                    <li><strong>Verb_noun</strong> naming: "signup_started", "payment_failed".</li>
                    <li>One event per action, but over-parameterize so you can slice later.</li>
                    <li><strong>Instrument once, measure forever.</strong> Changing an event's meaning midway breaks longitudinal comparisons.</li>
                </ul>

                <h4>4. Why this matters</h4>
                <p>Every downstream artifact — funnels, cohorts, retention, DAU/MAU — is just an aggregation of these raw behavioral events. Garbage in, garbage out: an untrusted tracking layer poisons every metric.</p>
            `
        },
        {
            number: 2,
            title: "Funnels and Step Drop-Off",
            content: `
                <h4>1. What is a funnel?</h4>
                <p>A <strong>funnel</strong> measures how many users complete an ordered sequence of steps toward a goal (e.g., visit → view product → add to cart → checkout). Each step's "conversion" is the fraction of users from the previous step (or from the start) who proceed, and the <strong>drop-off</strong> is the gap between steps.</p>

                <h4>2. Building a funnel</h4>
                <pre><code>SELECT step, COUNT(DISTINCT user_id) AS users
FROM funnel_steps
WHERE date = '2026-06-01'
GROUP BY step
ORDER BY step;</code>
                </p>
                <ul>
                    <li><strong>Step 1 (start):</strong> 10,000 visitors</li>
                    <li><strong>Add to cart:</strong> 4,000 (then introduced isolation)</li>
                    <li><strong>Checkout:</strong> 1,600</li>
                    <li><strong>Purchase:</strong> 900</li>
                </ul>

                <h4>3. Reading the funnel</h4>
                <p>Largest drop-off = biggest opportunity. Here cart→checkout loses 60%; that is the friction to attack. Beware of the "active-steps" fraction — analyzing drop-off as a chain, not just overall conversion.</p>

                <h4>4. Funnel visual</h4>

                \`\`\`mermaid
flowchart LR
    A[10,000 visitors] -->|40%| B[4,000 add to cart]
    B -->|40%| C[1,600 checkout]
    C -->|56%| D[900 purchase]
                \`\`\`
            `
        },
        {
            number: 3,
            title: "Cohort Analysis",
            content: `
                <h4>1. What is a cohort?</h4>
                <p>A <strong>cohort</strong> is a group of users who share a defining event in the same time window — most often the <em>week or month they first signed up</em>. Cohort analysis tracks the behavior of each cohort <em>over time</em>, which reveals how retention evolves across different vintages of users.</p>

                <h4>2. Why cohorts beat raw averages</h4>
                <p>A single "average retention" answer is misleading if app quality varies month-to-month. Splitting by signing cohort shows whether <em>new users are getting better or worse at keeping them</em> — e.g., the July cohort keeping 45% at week 4 vs April at 30% is a sign the onboarding change worked.</p>

                <h4>3. The classic cohort table</h4>
                <pre><code>        Week 1  Week 2  Week 3
Jan      100%     42%     31%
Feb      100%     39%     28%
Mar      100%     44%     33%
Apr      100%     47%     39%   <- improving!  Each row = one cohort.</code>
                </p>

                <h4>4. Cohort vs retention</h4>
                <p>Cohorts are the lens; <strong>retention</strong> is the metric you measure through that lens. Reading down the diagonal tells you whether new cohorts are healthier, and row-by-row tells you how quickly users churn.</p>
            `
        },
        {
            number: 4,
            title: "Retention and Churn",
            content: `
                <h4>1. Retention curves</h4>
                <p><strong>Retention</strong> measures how many users come back to a stickiness over a period: D1/D7/D30 come-back rate, or classic 1-week, 4-week retention. A <strong>retention curve</strong> plots % cohort still active by week — most apps show a sharp early drop then a flat tail.</p>

                <h4>2. Churn</h4>
                <p><strong>Churn</strong> is the complement of retention: the fraction of users (or revenue) lost in a period. For subscription products, <strong>monthly churn</strong> drives <strong>compound annual growth</strong>:</p>
                <pre><code>LR = LTV / CAC     (should be > 3)
LTV = (ARPU / monthly_churn) * gross_margin</code>
                </p>
                <p>Cutting churn even a few percentage points is often the highest-leverage lever, because LTV scales roughly by 1/churn.</p>

                <h4>3. Retention vs engagement</h4>
                <ul>
                    <li><strong>Engagement</strong> = how frequently/actively users use the product now.</li>
                    <li><strong>Retention</strong> = whether they keep coming back over time.</li>
                </ul>
                <p>A user can be highly engaged this week yet churn next — keep the two distinct in your reporting.</p>
            `
        },
        {
            number: 5,
            title: "Engagement: DAU, WAU, MAU",
            content: `
                <h4>1. The standard trio</h4>
                <ul>
                    <li><strong>DAU</strong> — Daily Active Users (or Daily Active User count).</li>
                    <li><strong>WAU</strong> — Weekly Active Users.</li>
                    <li><strong>MAU</strong> — Monthly Active Users.</li>
                </ul>
                <p>These are simple counts of distinct users performing a "defined as active" action in the window — a coarse but universally understood thermometer of audience size.</p>

                <h4>2. Stickiness ratio</h4>
                <p>The tell-tale health metric:</p>
                <pre><code>Stickiness = DAU / MAU</code>
                </p>
                <ul>
                    <li><strong>0.5+</strong> ("50% of monthly users active today") → addicted, credential-like.</li>
                    <li><strong>0.1 or lower</strong> → sporadic usage, high churn risk.</li>
                    <li>Social / communication apps sit higher; B2B admin tools sit lower — compare within category, not across.</li>
                </ul>

                <h4>3. Caveats</h4>
                <p>DAU/WAU/MAU are headcounts and inflate with marketing spend; pair them with retention and deep-linking to know if growth is real or churning spikes.</p>
            `
        },
        {
            number: 6,
            title: "Activation and the Aha Moment",
            content: `
                <h4>1. Activation</h4>
                <p><strong>Activation</strong> is the point where a new user first realizes real value from the product — signup is not activation; the first successful use case is. For a survey tool: "created their first survey"; for a CRM: "imported their customer list".</p>

                <h4>2. The aha moment</h4>
                <p>A <strong>north-star-aligned, causally linkable first-action</strong>. Users who hit it early are dramatically more likely to retain. It's usually a small number of specific behaviors, not a vague "was engaged."</p>

                <pre><code>activation_rate = users_who_reached_aha / users_who_signed_up</code>
                </p>

                <h4>3. Why it matters</h4>
                <p>Product analysis: activation is the earliest and fastest predictor of long-term retention and DAU growth. If activation is low, onboarding (emails, empty states, feature discovery) is your funnel lever — fix it before scaling marketing spend.</p>

                <h4>4. Tying to the funnel</h4>
                <p>Activation hurdles at the head of your funnel. Improving the first-session value is usually cheaper than converting all the penny-apps that never return.</p>
            `
        },
        {
            number: 7,
            title: "The North Star Metric",
            content: `
                <h4>1. Definition</h4>
                <p>The <strong>North Star Metric (NSM)</strong> is the single success metric that best captures the <em>delivered value</em> to customers and drives sustainable growth. Examples: Air-frag — Message Count; Spotify — Time Spent Listenings; Airbnb — Nights Booked.</p>

                <h4>2. What makes a good NSM</h4>
                <ul>
                    <li><strong>Customer-centric:</strong> proxy for value you deliver, not vanity headcount.</li>
                    <li><strong>Lagging-but-leadable:</strong> it should correlate with revenue, yet come from behaviours that input, sub-actions.</li>
                    <li><strong>Not a score:</strong> a ratio of active users to active-with-value, so promotion can't inflate it.</li>
                </ul>

                <h4>3. NSM vs KPI vs input metrics</h4>
                <p>The NSM sits on top; KPIs (retention, activation, revenue) tell the sub-story; <strong>input metrics</strong> (e.g., signup, activation rate) are the levers teams pull to move the NSM.</p>

                <pre><code>// One NSM is worth 10 vanity squares.
// Every team should be able to map its work to a lever of the NSM.</code>
                </p>

                <h4>4. Discipline</h4>
                <p>Don't rewrite the NSM quarterly. It defines your north and aligns shipping, growth, and monetization around one outcome.</p>
            `
        },
        {
            number: 8,
            title: "Product Dashboards & KPIs",
            content: `
                <h4>1. Purpose</h4>
                <p>A product dashboard turns raw events into <strong>monitorable, decision-ready signals</strong>. Great dashboards answer questions — they do not just pipe tables. They are built for an audience and a cadence, and they always correct for mobile, cohort, timezone, and season.</p>

                <h4>2. A layered KPI dashboard</h4>
                <ul>
                    <li><strong>Top line:</strong> DAU, MAU, stickiness (DAU/MAU), revenue, NRM.</li>
                    <li><strong>Middle:</strong> funnels across key journeys, activation rate, signup→activation.</li>
                    <li><strong>Bottom:</strong> cohort retention table (week-over-week, colored), churn, plan-by-plan LTV.</li>
                </ul>

                <pre><code>SELECT
  date,
  COUNT(DISTINCT user_id)                         AS dau,
  SUM(is_paid) / COUNT(DISTINCT user_id) AS</code>
                </p>

                <h4>3. Anti-patterns</h4>
                <ul>
                    <li>Vanity metrics that go "up" no matter what (registered counts).</li>
                    <li>Dashboards that nobody has an owner/goal for the section.</li>
                    <li>Caching / telemetry mismatched with metadata → untrustworthy numbers.</li>
                </ul>

                <h4>4. Good practice</h4>
                <p>Two numbers on one card: the level <em>and</em> the trend, with a normal/baseline band to catch drift early.</p>
            `
        },
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "Define DAU, WAU, and MAU, and the stickiness ratio DAU/MAU and what is healthy.",
            answer: "DAU is the count of active users in a day; WAU in a week; MAU in a month. Stickiness = DAU/MAU and measures how often monthly users return daily. Roughly 0.5+ is strong engagement (people return almost every other day), around 0.1–0.2 is low (users visit rarely and high-churn risk). It matters most compared against your own category, since everyday consumer products sit higher than occasional-use tools."
        },
        {
            number: 2,
            difficulty: "medium",
            question: "You see a 50% drop-off between 'add to cart' and 'checkout' in a purchase funnel. List at least three likely causes to investigate.",
            answer: "Likely causes: (1) shipping cost or total price revealed for the first time at checkout; (2) a required account/login gate before completing purchase; (3) a long, complicated, multi-page form that increases friction and anxiety; (4) a lack of trust signals such as security badges or money-back guarantee; (5) technical malfunctions like checkout page errors or checkout modal failures. Diagnose by segmenting the drop-off by device traces, referral source and time, and using session-folding to see what users do after abandoning."
        },
        {
            number: 3,
            difficulty: "hard",
            question: "Explain why cohort analysis for retention can be more informative than a single global average retention number.",
            answer: "A global average mixes users from many vintages into one number and hides how retention is changing over time. Cohort analysis segments users by signup period and tracks each cohort's retention separately, so you can see (1) whether recent onboarding/ex improvements a are translating into better retention for newer cohorts, (2) the lifecycle tail flatness vs cliff, (3) whether marketing is attracting lower-quality users into later cohorts. If you shipped a new onboarding in June and the June cohort holds 47% at week 3 vs 27% for April, the June global average would have masked that improvement (or the decline) entirely."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "What is a cohort, give an example, and why is the signup week a common cohort dimension?",
            answer: "A cohort is a group of users sharing a common characteristic or event within the same period. The defining event is usually the first visit or signup in a specific week or month, though categories like platform or acquisition channel are also used. The signing week groups users because it dates them into a phase — users who start together experience similar onboarding, product version, and marketing. That means you can fairly compare 'users who started in July' to 'users who started in May,' isolating product change effect from a broader time each on signup quality."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "Define 'activation' and the 'aha moment', and why improving activation is often more valuable than spending on acquisition.",
            answer: "Activation is the completion of the behavior that credibly signals a new user has felt real value from the product (e.g., first survey created). The aha moment is that specific activation behavior that historically correlates strongly with long-term retention/return. It matters because acquisition spend only carries users to the top of the funnel; if they never activate, they churn quickly and the spend is wasted. Raising activation from 30% to 55% compounds DAU and LTV with no extra marketing budget, and early activated users are usually the highest-value, lowest-cost-driving. Fix onboarding/onboarding estate as the lever before scaling the top of funnel."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "Stickiness DAU/MAU is 0.12 but DAU is rising 10% month over month. What does raise/churn the success?",
            answer: "A rising DAU at low stickiness suggests heavy top-of-funnel acquisition (fresh signups or campaigns) without durable return visits. New DAU each month pushes raw DAU up while churn on the existing base keeps MAU in the denominator high — the ratio stays low. This tells you engagement under the hood is weak: users don't come back by themselves. It might also signal a Netflix-bingeing effect vs a durable habit. Diagnose with cohort retention (L30/L90) and event-depth (sessions/week/user); if the fresh cohort retentions are low, push activation & habit-loop levers before assuming gross added real users, and don't conflate DAU growth with engagement health."
        },
        {
            number: 7,
            difficulty: "easy",
            question: "Give an example of a North Star Metric and what makes a metric a good candidate.",
            answer: "Example: Spotify → 'Time spent listening' ; Airbnb → 'Nights booked'. A strong North Star Metric is (1) customer-centric — a proxy for real delivered value, not vanity headcount; (2) linked to the business model — it correlates with revenue; (3) leadable via input metrics a team can move; (4) hard to game — a user cannot inflate retention by a one-time metric trick. It distills everyone's work toward the same outcome."
        },
        {
            number: 8,
            difficulty: "medium",
            question: "A product team asks their analyst to 'report the most important KPI.' How would you respond to frame a useful answer?",
            answer: "I help them pick an answer that is decision-linked rather than one flat number. I clarify the North Star / the decision owner, then present a small coherent set — a leading input metric they can move this week (e.g., activation or onboarding completion, campaign channel conversion) alongside a guardrail (revenue per visit, churn, latency). I also show the change over time and against a baseline/bench. If forced to one, I pick the customer-facing leading metric that best predicts long-term revenue (often activation or D-week retention), because it's actionable today, not a lagging vanity count. And I always attach a trend and confidence so they don't act on a single dated point."
        },
        {
            number: 9,
            difficulty: "hard",
            question: "Your WAU is growing but your DAU/WAU (daily stickiness) is declining. Which insight and next steps do you propose?",
            answer: "The split idea: WAU is growing commonly because you're acquiring more unique 'touch' users per week, but daily return is down, meaning weekly users are visiting less often that within a week. That signals product engagement weakening below the surface even as raw audience grows. Likely levers: increase the habit-loop ties inside the product (notifications, better home re-entry, deepen actions on return), push activation and first-week re-engagement, and check if the new acquired cohorts are lower quality (cohort view). Also verify the metric definition isn't diluted by adding new topics with irregular use. Follow-up: track new vs existing users to see where the gap is, then run an onboarding/activation experiment before adding more weekly acquisitions."
        },
        {
            number: 10,
            difficulty: "easy",
            question: "Why is design ambient: a funnel needs a clear ordered-step definition?",
            answer: "Because the conversion and drop-off numbers only mean something if each user is evaluated about the same step sequence and the steps are mutually defined. If different users can skip steps or if the funnel order changes mid-configuration, the percentages become meaningless combinations of different journeys and you can't read where the real friction is. A clear, pre-agreed order of one-time steps lets you compute attach chains, compare funnel runs across time/category, and identify which boundary is the productive optimization target without bias."
        }
    ]
    ,

    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "A SaaS product is onboarding new users, and the team notices signups are healthy but very few people reach the 'first key action' that drives retention, yet no one has a clear view of where users drop off.",
            question: "Which product-analytics approach most directly surfaces where the friction is?",
            options: [
                "Report only total signups, since the overall number looks fine",
                "Define an ordered funnel of key steps and compute the conversion and drop-off at each step to find the biggest leak",
                "Average all users together with no step ordering",
                "Measure only the daily active count with no path"
            ],
            answer: "Correct Option: Define an ordered funnel and compute conversion and drop-off at each step to find the biggest leak"
        },
        {
            case: 2,
            scenario: "Your retention dashboard shows steep drop-off in weeks 2 through 6 for mobile users, and you want to decide whether to build a re-engagement push campaign or fix the first-week experience.",
            question: "Which metric should guide the decision?",
            options: [
                "Count of downloads, which ignores behavior",
                "Cohort retention curves (percent of users active each week after signup) to see exactly where the drop-off accelerates",
                "Total sessions summed over all users",
                "The number of support tickets opened only"
            ],
            answer: "Correct Option: Cohort retention curves showing the percent of users active each week after signup"
        }
    ]
    };

if (typeof window !== 'undefined') {
    window.productAnalyticsData = productAnalyticsData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productAnalyticsData;
}