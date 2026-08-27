const abTestsData = {
    title: "A/B Testing",
    metadata: {
        track: 'data-analyst',
        category: 'Experiments',
        icon: '🧭',
        description: "Master the design, execution, and interpretation of A/B tests to make data-driven decisions."
    },
    lessons: [
        {
            number: 1,
            title: "The Scientific Method for Products",
            content: `
                <h4>1. What is an A/B test?</h4>
                <p>An A/B test (also called a randomized controlled experiment or split test) is the product team's version of the scientific method. You randomly split your users into two (or more) groups, expose each to a different version of your product, and compare their behavior on a metric that matters.</p>

                <h4>2. Why randomize?</h4>
                <p>Randomization is the secret sauce. By assigning users to groups at random, you make the two groups statistically interchangeable at the start. Any <b>difference you observe afterward</b> can therefore be attributed to the change you made, rather than to pre-existing differences between users. This is what lets A/B tests establish <b>causation</b>, not just correlation.</p>

                <h4>3. The anatomy of a hypothesis</h4>
                <ul>
                    <li><strong>If</strong> we change X <strong>then</strong> Y will improve <strong>because</strong> of Z.</li>
                    <li>The "because" is your theory of the user — it explains the mechanism.</li>
                </ul>
                <p>Example: "If we shorten the checkout form to 3 fields, then checkout completion will increase because fewer users abandon out of friction."</p>

                <pre><code>// Hypotheses are directional, testable, and pre-registered.
// Bad:  "The new page is better."  (no metric, no direction)
// Good: "The new page increases signup conversion by at least 1%."</code></pre>

                <h4>4. The A/B testing pipeline</h4>

                \`\`\`mermaid
graph TD
    A[Form hypothesis] --> B[Pick primary & secondary metrics]
    B --> C[Run power analysis to size the test]
    C --> D[Randomly assign users to control / variant]
    D --> E[Measure outcomes without peeking]
    E --> F{Statistically significant?}
    F -- No --> G[Keep control and iterate]
    F -- Yes --> H{Practically significant?}
    H -- Yes --> I[Ship variant]
    H -- No --> G
                \`\`\`
            `
        },
        {
            number: 2,
            title: "Choosing Primary and Secondary Metrics",
            content: `
                <h4>1. The hierarchy of metrics</h4>
                <ul>
                    <li><strong>Primary (The Guardian):</strong> The single metric your hypothesis commits to. It decides whether the test "wins" or "loses." It must be directly tied to the change.</li>
                    <li><strong>Secondary (The Watchdogs):</strong> Metrics you monitor for unintended side effects, going both up and down.</li>
                    <li><strong>Guardrail (The Protectors):</strong> Core health metrics that should never degrade — latency, revenue, error rate.</li>
                </ul>

                <h4>2. How to pick a good primary metric</h4>
                <p>A primary metric should be a <b>north-star-aligned, causal, and long-term-sensitive</b> outcome. Beware of <b>OEC (Overall Evaluation Criterion)</b> traps: if you only optimize clicks, users click more but buy less.</p>

                <p><em>Tip:</em> Prefer a <strong>ratio or rate</strong> metric (e.g., conversion rate) over raw counts (e.g., number of conversions), because raw counts conflate the treatment effect with the volume of traffic assigned.</p>
            `
        },
        {
            number: 3,
            title: "Sample Size and Statistical Power",
            content: `
                <h4>1. Why sample size matters before you ship</h4>
                <p>Sample size determines how small an effect you can reliably detect. Ship too small and you risk both <b>false negatives</b> (missing a real improvement) and <b>unstable estimates</b>. You must size your test <em>before</em> it launches — you cannot "fix" an underpowered test after the fact.</p>

                <h4>2. Power</h4>
                <p><strong>Statistical Power</strong> = 1 − P(Type II error) = the probability you will detect a real effect if it exists. The industry standard is <strong>80%</strong>.</p>
                <ul>
                    <li>Higher power is better, but requires more users.</li>
                    <li>To detect a <em>smaller</em> effect, you need a <em>larger</em> sample.</li>
                </ul>

                <h4>3. The classic sample-size formula (proportions)</h4>
                <pre><code>n  = (Z_alpha + Z_beta)^2 * p_pool * (1 - p_pool) * 2 / (delta^2)

Where:
  delta    = minimum detectable uplift you care about
  p_pool   = baseline proportion (average of control & variant)
  Z_alpha  = 1.96   (for alpha = 0.05, two-sided)
  Z_beta   = 0.84   (for power = 80%)</code>
                </p>
                <p>Example: baseline 10% conversion, want to detect a 2% absolute lift, α=0.05, power=80%:</p>
                <pre><code>p_pool = 0.11
n_per_group = 2 * (1.96 + 0.84)^2 * 0.11 * 0.89 / (0.02^2)
            = 2 * 7.84 * 0.0979 / 0.0004</p>
                <p>≈ <strong>3,840 users per group</strong> — a solid ballpark answer for interviews.</p>
            `
        },
        {
            number: 4,
            title: "Statistical Significance and P-Values",
            content: `
                <h4>1. The formal definition</h4>
                <p>The <strong>p-value</strong> is the probability of observing a result as extreme as (or more extreme than) the one you measured, <em>assuming the null hypothesis (no effect) is true</em>. It is a statement about the data under a world where there is no effect — not a probability that your alternative is true.</p>

                <h4>2. Interpreting thresholds</h4>
                <ul>
                    <li>p &lt; α (usually 0.05) → "statistically significant" → reject the null.</li>
                    <li>p ≥ α → "not significant" → fail to reject the null (this is NOT "proving no effect").</li>
                </ul>

                <h4>3. The biggest misconception</h4>
                <p>People read "p = 0.03" as "there is a 3% chance this is due to noise." That is wrong. It means: <em>if there were truly no effect, we would see data this extreme 3% of the time.</em> Small p-values make weak evidence for a true effect; they are not a direct probability of truth.</p>

                <pre><code>// A p-value is a conditional probability, not a proof.
p = P( observed data | null hypothesis is true )</code>
                </p>
                <p><em>Threshold sanity:</em> α = 0.05 means you will accept a ~5% chance of a false positive on each test you run.</p>
            `
        },
        {
            number: 5,
            title: "Confidence Intervals over P-Values",
            content: `
                <h4>1. Why intervals give more than p-values</h4>
                <p>A p-value tells you whether an effect is likely non-zero. A <strong>confidence interval</strong> tells you the plausible <strong>magnitude and direction</strong> of that effect — exactly what you need to decide if a change is worth shipping.</p>

                <h4>2. Reading a 95% CI</h4>
                <p>If your treatment lifts checkout rate by 1.2% with a 95% CI of [0.4%, 2.0%]:</p>
                <ul>
                    <li>The point of <em>confidence</em> that contains the true effect is between +0.4% and +2.0%.</li>
                    <li>It clears zero (all positive) → statistically significant improvement.</li>
                </ul>

                <h4>3. Relationship to p-value</h4>
                <p>The 95% CI and a two-sided test at α=0.05 are two views of the same test: if the interval excludes zero, the effect is significant; if it contains zero, it is not. Reporting the interval reveals the <em>size</em> of the effect that the p-value hides.</p>

                <pre><code>CI_width = 1.96 * SE
lower    = estimate - CI_width
upper    = estimate + CI_width</code>
                </p>
                <p><em>Note:</em> The CI also encodes practical significance — a statistically significant +0.2% lift may be too tiny to be worth shipping.</p>
            `
        },
        {
            number: 6,
            title: "Peeking, Multiple Testing, and Sequential Analysis",
            content: `
                <h4>1. The peeking problem</h4>
                <p>If you <b>peek</b> at your experiment every day and stop early the first time p &lt; 0.05, you inflate your false-positive rate dramatically — up to 60%+ in the worst case. Deciding to stop based on the result <b>after</b> seeing it destroys the statistical validity of the p-value.</p>

                <h4>2. Multiple testing</h4>
                <p>Running 20 metrics and celebrating any one that is significant is the same trap: with α=0.05 each, the chance of <em>at least one</em> false positive across 20 independent tests is:</p>
                <pre><code>1 - (0.95)^20 = 1 - 0.358 = 0.642  →  64% chance of a false positive</code>
                </p>
                <p>Remedies include the <strong>Bonferroni correction</strong> (divide α by the number of comparisons) or the <strong>Benjamini-Hochberg</strong> (FDR) procedure — but the cleanest fix is to pre-commit to a small set of metrics before running.</p>

                <h4>3. Sequential / continuous monitoring</h4>
                <p>Modern practice uses <strong>sequential tests</strong> (e.g., mSPRT, group sequential designs) that adjust the stopping boundaries so you can check periodically without blowing up the error rate. Always <strong>pre-register</strong> your sample size and analysis plan.</p>
            `
        },
        {
            number: 7,
            title: "Practical vs Statistical Significance",
            content: `
                <h4>1. The two kinds of significance</h4>
                <ul>
                    <li><strong>Statistical significance</strong> = "the effect is unlikely to be zero" (driven by sample size).</li>
                    <li><strong>Practical significance</strong> = "the effect matters to my business" (driven by cost/benefit).</li>
                </ul>

                <h4>2. Big data reads to both</h4>
                <p>With enough users, even a 0.05% lift becomes statistically significant. But shipping code to gain 0.05% is often a waste. Conversely, a small, underpowered sample might hide a <em>practically important</em> +5% effect that never reaches significance.</p>

                <h4>3. Decision framework</h4>
                <p>Use the <strong>minimal detectable effect</strong> you actually need. Ask stakeholders: "What uplift justifies the cost of engineering, ongoing maintenance, and modal risk?" Then size the test to detect that.</p>

                <pre><code>// Never ship on p-value alone.
decision(x):
  if not significant     -> keep control (don't ship)
  if not practically import-> keep control (don't bother)
  if significant & practical -> ship variant
  consider guardrails & user-region lift before committing</code>
                </p>
                <p><em>Guardrail data:</em> always weigh a promising primary metric against side effects on core health metrics.</p>
            `
        },
        {
            number: 8,
            title: "Reading Results for Stakeholders",
            content: `
                <p>An A/B test is <em>not</em> done when the p-value comes in. The most valuable work is translating numbers into a <b>recommendation a non-technical stakeholder can act on.</b></p>

                <h4>1. Structure your report</h4>
                <ol>
                    <li><b>Headline decision:</b> "Ship the variant" or "Hold / iterate" in one line.</li>
                    <li><b>The number:</b> control vs variant, the lift, and the 95% confidence interval.</li>
                    <li><b>Confidence:</b> sample size, power, and significance level (not just "significant!").</li>
                    <li><b>Business impact:</b> translate the lift into estimated revenue or users.</li>
                    <li><b>Risks / caveats:</b> guardrail changes, segments that moved in the wrong direction.</li>
                </ol>

                <h4>2. Anti-patterns to avoid</h4>
                <ul>
                    <li>Reporting only the winning metric and hiding a harmful secondary one.</li>
                    <li>Saying "significant" or "X% sure" without a confidence interval.</li>
                    <li>Overclaiming causation from a small, non-randomized sub-analysis.</li>
                </ul>

                <h4>3. Present uncertainty plainly</h4>
                <p>Instead of "The variant is better," say "The variant lifts checkout by 1.2%, with a 95% range of 0.4% to 2.0%. It is a low-risk ship." Updating to decision clarity beats bravado.</p>
            `
        },
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the core reason A/B tests are considered a strong method for establishing causation rather than mere correlation?",
            answer: "Because users are assigned to control and variant at random, the two groups are statistically interchangeable on every dimension except the change you shipped. As a result, any observed difference in the outcome metric can only plausibly be attributed to the change itself, ruling out the confounding variables that undermine observational (correlational) analysis."
        },
        {
            number: 2,
            difficulty: "medium",
            question: "You are asked to pick a primary metric for a checkout redesign A/B test. Why is 'conversion rate' generally preferred over 'number of conversions'?",
            answer: "Raw conversion count conflates the treatment effect with traffic volume. If one group happens to get more visitors, it will show more conversions even with no real improvement. A rate normalizes by exposure — conversions divided by eligible users — so it isolates performance of the change itself, is stable across imbalanced traffic allocation, and lets you compare the test across segments and time."
        },
        {
            number: 3,
            difficulty: "hard",
            question: "A colleague peeks at the A/B test every evening and stops the test as soon as the p-value drops below 0.05. Explain why this inflates the false-positive rate.",
            answer: "The p-value and α=0.05 threshold are only valid if the decision rule (including when to stop) is fixed before the data arrive. Deciding to stop because the result is significant is a form of sequential testing: an approximately you are taking multiple looks. Each look introduces another chance to cross the boundary by chance alone, so the '5% error rate' effectively rises — with repeated peeking it can exceed 60% in practice. To protect against this, either pre-commit to a fixed sample size, or use a true sequential/group-sequential design with adjusted stop boundaries."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "Interpret the statement: 'The p-value for the new pricing page is 0.03.' What does it mean, and what is a common plain-language mistake people make?",
            answer: "It means: under the null assumption that the new page has no real effect, there is a 3% chance of observing an outcome as extreme as (or more extreme than) the one measured. The common mistake is reinterpreting it as 'there is a 3% chance the effect is not real, so 97% chance it is real.' The p-value is the probability of the data given no effect, not the probability of the null given the data."
        },
        {
            number: 5,
            difficulty: "hard",
            question: "With 80% power (α=0.05, two-sided) and a baseline conversion rate p_control ~10%, roughly how many users are needed per group to detect a 2 percentage-point absolute lift? Show the shape of the formula.",
            answer: `
                <p>Use:
                n = 2 * (Z_alpha_2-sided + Z_beta)^2 * p_pool*(1 - p_pool) / (MDE^2)</p>
                <p>With p_pool ≈ (0.10 + 0.12)/2 = 0.11, Zα/2 = 1.96, Zβ = 0.84, and MDE = 0.02:</p>
                <pre><code>n = 2 * (1.96 + 0.84)^2 * 0.11 * 0.89 / (0.02^2)
  = 2 * 7.84 * 0.0979 / 0.0004
  ≈ 15.68 * 0.0979 / 0.0004
  ≈ 3839 per group</code>
                </p>
                <p>The key relationships: sample size scales inversely with the <em>square</em> of the effect size (halving MDE quadruples n), and grows as you raise power or reduce α.</p>
            `
        },
        {
            number: 6,
            difficulty: "medium",
            question: "A test shows a lift of +0.5% in clk rate that is 'statistically significant' (p=0.02), but your team realizes the 95% CI is [0.2%, 0.8%] and the engineering cost is high. Is this change practical to ship?",
            answer: "Statistical significance only tells you the effect is non-zero; practical significance is not necessary. With a 95% CI of [+0.2%, +0.8%], the plausible true effect is small. Unless the carriage of a 0.2%-0.8% lift meaningfully outweighs the running cost and risk of the new code and any regression on revenue/latency (guardrails), the change is likely <em>not</em> worth shipping. A large sample size made a tiny, real but economically trivial effect 'significant.' Always report the CI and weigh it against business cost."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "A team runs 20 concurrent metrics on one test at α=0.05 and two of them come back significant. Why should they be skeptical of both calls?",
            answer: "With 20 independent metrics and α=0.05, the chance of at least one family-wide false positive is about 1 - (0.95)^20 ≈ 64%. Seeing two significant findings among twenty is exactly what you would expect under pure noise. To guard, the team should have pre-declared a small set of primary/secondary/guardrail metrics and, if many are tested, applied a correction like Bonferroni (α/n) or Benjamini-Hochberg to control false discovery."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "Your A/B test on a search-result ranking change shows a slightly negative primary metric (revenue) but is not statistically significant. Management asks to ship it anyway because 'trend looks promising.' How should you respond?",
            answer: "You should hold a clearly decided decision threshold. 'Not significant' is not proof of no effect — it may be a true ~0 effect or too-low power. Shipping on a 'promising trend' risks paying for a business that didn't lift revenue. Recommend either (1) continue the test to the pre-planned sample size for a cleaner read while monitoring guardrails, or (2) if there is prior belief the change helps, stop and run a faster/under-power-conscious follow-up. Emphasize confidence intervals over directional trends and keep the decision rule fixed before more data accretes."
        },
        {
            number: 9,
            difficulty: "easy",
            question: "Give an example of a guardrail metric in an A/B test and why it exists even if the primary metric is improving.",
            answer: "A guardrail is a core healthy metric you refuse to let degrade — for example, page-load latency, overall site revenue per visitor, or error rate. If your primary metric (clicks on a button) improves but the new variant crashes the page for 2% of users or quietly decreases total session value, the test looks successful but harms the business. Guardrails bind that. You can even ship a primary in improved, but only if the guardrails hold."
        },
        {
            number: 10,
            difficulty: "hard",
            question: "Design and communicate a readable summary for this test: 'New checkout = +1.2% conversion (baseline 10%, n=5,000/group, p=0.03, 95% CI [0.4%, 2.0%]). Revenue-per-session unchanged; support tickets +0. But loading time rose 30ms.' Recommend a shipping decision.",
            answer: "Decision: <strong>ship the new checkout</strong>, and dive into loading time. The primary metric is positive and near CI excludes zero (+0.4 to +2.0%), so it is both statistically and likely practically meaningful at n=80% power. Revenue-per-visit unchanged and tickets flat are reassuring; a 30ms load increase is a trailing web, mostly within tolerance, but should be confirmed it does not hit a rough threshold for slower cohorts or mobile. Presenting: 'one-line ship call, the CI, the guardrail summary, and the single open risk (loading time)' gives a stakeholder a fast, trustworthy read."
        }
    ]
    ,

    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "After a 2-week A/B test, your new checkout shows conversion rose from 10.0% to 11.2% with p = 0.04, but the marketing director wants to celebrate the win as a major revenue gain.",
            question: "How should you interpret and communicate the significance of this result?",
            options: [
                "Claim the new checkout guarantees a 12% revenue increase for everyone",
                "Report that the improvement is statistically significant at alpha 0.05 and present the confidence interval and practical magnitude so the business can size the impact",
                "Ignore the control arm because only the treatment matters",
                "Announce the p-value alone with no context"
            ],
            answer: "Correct Option: Report significance with the confidence interval and practical impact so the team can size the decision correctly"
        },
        {
            case: 2,
            scenario: "A weekly cron job auto-tests many page variants, and week after week a handful report 'statistically significant' lifts that vanish on the next week's run.",
            question: "What is the most likely cause and best fix?",
            options: [
                "The changes are really working and the drop-offs are coincidence",
                "Multiple testing inflates false positives, so multiple-comparison corrections and pre-registered hypotheses reduce the noise",
                "Increase the number of metrics watched each week to catch more wins",
                "Trust the highest p-value as the true signal"
            ],
            answer: "Correct Option: Multiple testing inflates false positives, so use corrections and fixed planned tests"
        }
    ]
    };

if (typeof window !== 'undefined') {
    window.abTestsData = abTestsData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = abTestsData;
}