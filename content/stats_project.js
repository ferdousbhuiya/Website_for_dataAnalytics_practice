const statsProjectData = {
    title: "Statistics Project: A/B Test Analysis",
    metadata: {
        track: 'data-scientist',
        category: 'Stats Project',
        icon: '🧪',
        description: "Run a complete A/B test analysis — hypothesis, sample size, t-test, p-values, confidence intervals, and a business decision."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview & The Experiment Question",
            content: `A complete **A/B test analysis** project. You are the data scientist. The product team changed the checkout page and wants to know if it improved conversion — and whether to ship it.

**The experiment:**
- **Control:** current checkout (status quo).
- **Variant:** new, shorter 3-field checkout.
- **Metric:** conversion rate (completed checkouts / visitors).

**The steps we will run, exactly like production:**

\`\`\`mermaid
flowchart LR
    A[Form hypothesis] --> B[Choose metric + effect size]
    B --> C[Compute sample size & power]
    C --> D[Run the experiment]
    D --> E[t-test on the results]
    E --> F[Confidence interval + p-value]
    F --> G[Business decision: ship or not]
\`\`\`

**Key statistical ideas we will use:** null & alternative hypotheses, alpha (α=0.05), power (1−β=0.8), p-value, t-test, and confidence intervals. All computed in Python below.`
        },
        {
            number: 2,
            title: "Step 1: Hypothesis & Metrics",
            content: `Before running anything, state the **hypothesis** and choose the **metric**.

**The hypothesis (falsifiable, with direction):**
> If we shorten the checkout to 3 fields, then conversion rate will increase, because less friction means fewer abandonments.

**Statistically framed:**
- **H₀ (null):** conversion_variant − conversion_control = 0 (no effect).
- **H₁ (alternative):** conversion_variant − conversion_control > 0 (variant is better).

**Metric choice matters:** conversion *rate* (a ratio), not raw conversions — raw counts conflate effect with traffic volume. We also log a **guardrail** (revenue per user) to catch side effects: the shorter form must not tank order size.

\`\`\`python
# Declare the parameters up front (pre-registration)
alpha = 0.05          # risk of false positive
power = 0.80          # chance of detecting a real effect
baseline_conv = 0.10  # current conversion rate (10%)
mde = 0.02            # minimum detectable absolute uplift (2 pp)
\`\`\`

**Why pre-register:** deciding α, power, and effect *after* seeing the data is p-hacking. Write them down before the test starts.`
        },
        {
            number: 3,
            title: "Step 2: Sample Size & Power",
            content: `Compute how many users per group we need *before* launching. Sizing is non-negotiable — an underpowered test can miss a real improvement.

\`\`\`python
from math import ceil, sqrt
from scipy import stats

z_alpha = stats.norm.ppf(1 - alpha / 2)   # 1.96 for two-sided alpha=0.05
z_beta  = stats.norm.ppf(power)           # 0.84 for power=0.80

def sample_size_per_group(p1, p2, z_alpha, z_beta):
    p_pool = (p1 + p2) / 2
    se = sqrt(2 * p_pool * (1 - p_pool))
    return ceil(((z_alpha + z_beta) * se / (p2 - p1)) ** 2)

n_per = sample_size_per_group(baseline_conv, baseline_conv + mde, z_alpha, z_beta)
print("users per group needed:", n_per)   # ~3,840 for 10% -> 12%
\`\`\`

**What the number means:** we need ~3,840 visitors in each group to have an 80% chance of detecting a true +2pp lift, at a 5% false-positive risk. If we can only reach 1,000 per group, we should *either* accept a bigger detectable effect *or* run longer — never launch underpowered and hope.

**Rule of thumb to quote in interviews:** halving the detectable effect quadruples the required sample size.`
        },
        {
            number: 4,
            title: "Step 3: Run the Experiment & Inspect the Data",
            content: `Run the experiment, then inspect the results with **descriptive stats** before any test.

\`\`\`python
import numpy as np
import pandas as pd

# Simulated result: 4,000 users per group
rng = np.random.default_rng(7)
control = rng.binomial(1, 0.100, 4000)    # 10% baseline
variant = rng.binomial(1, 0.123, 4000)    # 12.3% real lift

df = pd.DataFrame({
    "group": ["control"] * 4000 + ["variant"] * 4000,
    "converted": list(control) + list(variant),
})

summary = df.groupby("group")["converted"].agg(["count", "mean", "sum"])
print(summary)   # variant mean ~0.123, control mean ~0.100
\`\`\`

**The descriptive view:** \`variant.mean() ≈ 0.123\` vs \`control.mean() ≈ 0.100\` — a ~2.3pp raw lift. But is that difference real or noise? That's exactly what the t-test answers. Never jump to "it worked!" from the raw means alone.`
        },
        {
            number: 5,
            title: "Step 4: The Two-Proportion z-Test",
            content: `Because the metric is a proportion (conversion rate), the correct test is the **two-proportion z-test**.

\`\`\`python
p_c = control.mean()
p_v = variant.mean()
n_c = control.size
n_v = variant.size

p_pool = (p_c * n_c + p_v * n_v) / (n_c + n_v)
se = sqrt(p_pool * (1 - p_pool) * (1 / n_c + 1 / n_v))
z = (p_v - p_c) / se
p_value = 1 - stats.norm.cdf(z)          # one-sided (H1: variant better)

print(f"control={p_c:.4f}  variant={p_v:.4f}  diff={p_v-p_c:.4f}")
print(f"z = {z:.3f}  p-value = {p_value:.4f}")
\`\`\`

**Reading the output:**
- **z** is how many standard errors the difference sits above zero.
- **p-value** is the probability of seeing a lift this big *if the null (no effect) were true*.
- If \`p < 0.05\`, the result is "statistically significant" → reject H₀.

**Interpret the p-value correctly:** it is *not* the chance the variant is better. It's the probability of observing this data *under the assumption of no effect*. Small p-values support rejecting the null — they don't "prove" the alternative.`
        },
        {
            number: 6,
            title: "Step 5: Confidence Interval — the Effect Size",
            content: `A p-value says "is there an effect?" The **confidence interval** says "how big?" — the number the business actually needs.

\`\`\`python
diff = p_v - p_c
se_diff = sqrt(p_c * (1 - p_c) / n_c + p_v * (1 - p_v) / n_v)
ci_low  = diff - z_alpha * se_diff
ci_high = diff + z_alpha * se_diff

print(f"lift = {diff:.4f}")
print(f"95% CI = [{ci_low:.4f}, {ci_high:.4f}]")
\`\`\`

**How to read it:**
- If the whole interval is **above 0** → significant improvement; the true effect is somewhere in that range.
- The **width** is the uncertainty — a CI of [+0.5pp, +3.5pp] is much more informative than a bare "significant".
- Report the interval, not just the p-value: **"we measured a +2.3pp lift, 95% CI [+0.9pp, +3.7pp]"** is a complete, honest statement.

**The relationship to the test:** a two-sided test at α=0.05 is significant *exactly when* the 95% CI excludes zero. They are two views of the same evidence.`
        },
        {
            number: 7,
            title: "Step 6: Practical vs Statistical Significance",
            content: `Statistical significance ≠ business importance. A tiny effect can be "significant" with a huge sample; a big effect can be "not significant" with a tiny one.

**The three-way decision table:**

\`\`\`mermaid
flowchart TD
    A[Measured lift + CI] --> B{Statistically significant?}
    B -->|No| C[Can't conclude an effect - run longer or bigger sample]
    B -->|Yes| D{Is the lift big enough to matter?}
    D -->|No, tiny| E[Statistically real but not worth the effort]
    D -->|Yes| F{Does it pass guardrails?}
    F -->|Yes| G[Ship it]
    F -->|No| H[Kill it - side effects worse than the win]
\`\`\`

**Concrete example:** with 1M users, a +0.1% lift can be p<0.001 — statistically real but probably not worth re-engineering the checkout. Conversely a +5% lift that misses p=0.05 with 200 users is not evidence *against* it; the test just wasn't powered to see it.

**Practical significance** = "is the effect big enough that the business would act on it?" Decide that number *before* the test (it's your MDE).`
        },
        {
            number: 8,
            title: "Step 7: Final Decision & Full Recap",
            content: `Bring it all together into a defensible business decision.

**Example final call (with the numbers from this project):**
- Measured lift: **+2.3pp** conversion (10.0% → 12.3%).
- 95% CI: **[+0.9pp, +3.7pp]** — entirely above zero.
- p-value: **< 0.05** — significant.
- Guardrail: revenue per user **unchanged** (check the guardrail metric!).
- **Decision:** ship the variant — the evidence supports it, the effect is material, and no side effects.

**The full pipeline recap:**

\`\`\`mermaid
flowchart LR
    A[Hypothesis: shorter form -> higher conversion] --> B[α=0.05, power=0.8, MDE=2pp]
    B --> C[Sample size: ~3,840 per group]
    C --> D[Run: 4,000 per group]
    D --> E[z-test: p < 0.05]
    E --> F[95% CI: +0.9pp to +3.7pp]
    F --> G[Guardrail: revenue unchanged]
    G --> H[Decision: SHIP]
\`\`\`

**Interview cheat sheet — say these out loud:**
- **"Pre-register α, power, and the minimum detectable effect."**
- **"Size the sample before you run — halving the effect quadruples the sample."**
- **"Proportion metric → two-proportion z-test."**
- **"Report the confidence interval, not just the p-value."**
- **"Statistical significance ≠ practical significance — check the effect size."**
- **"Guardrail metrics catch the side effects the primary metric misses."**

That's a complete, production-grade A/B test analysis.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What are the null and alternative hypotheses in an A/B test?",
            answer: "H₀ (null): the variant has no effect on the metric (difference = 0). H₁ (alternative): the variant improves the metric (difference > 0 for a one-sided test). We test whether the data lets us reject H₀."
        },
        {
            number: 2,
            difficulty: "medium",
            question: "What does a p-value of 0.03 mean, and what does it NOT mean?",
            answer: "It means: if the null (no effect) were true, we'd see data this extreme 3% of the time. It is NOT the probability the variant is better, nor the probability the result is due to chance. At α=0.05 it's below the threshold, so we reject the null — but we should still report the effect size."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "Why compute sample size before running an A/B test?",
            answer: "Sample size determines whether the test can detect the effect you care about. Too small → underpowered, you miss a real improvement (false negative). Sizing before launch also fixes a stopping rule, preventing you from stopping early on luck or running forever on noise."
        },
        {
            number: 4,
            difficulty: "hard",
            question: "Explain the relationship between a 95% confidence interval and a p<0.05 result.",
            answer: "They are two views of the same test: for a two-sided test at α=0.05, the p-value is below 0.05 exactly when the 95% confidence interval for the effect excludes zero. The CI additionally shows the magnitude and direction of the effect, which the p-value alone hides."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "What is the difference between statistical and practical significance?",
            answer: "Statistical significance says the effect is unlikely to be due to chance (p < α). Practical significance asks whether the effect is big enough that the business would act on it. A tiny effect can be statistically significant with a huge sample but not worth implementing."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "Why are guardrail metrics important in an A/B test?",
            answer: "The primary metric can improve while a hidden cost appears elsewhere. For example, a shorter checkout might lift conversion but lower order value, or a marketing banner might lift clicks but hurt revenue. Guardrails (revenue per user, latency, error rate) catch those side effects so you don't ship a change that's locally good but globally harmful."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "Which statistical test do you use for a conversion-rate A/B test, and why?",
            answer: "A two-proportion z-test, because the metric is a proportion (converted / total) comparing two independent groups. If the metric were a continuous value (e.g., revenue per user) you'd use a two-sample t-test instead. Always match the test to the metric's distribution."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "What is statistical power and what happens if your test has too little of it?",
            answer: "Power (1−β) is the probability of detecting a real effect if one exists, typically set to 0.80. Too little power means a high chance of a false negative — a real improvement ships as 'no effect'. Increasing sample size, or accepting a larger minimum detectable effect, raises power."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.statsProjectData = statsProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = statsProjectData;
}