const experimentDesignData = {
    title: "Experiment Design & Analysis",
    metadata: {
        track: 'core',
        category: 'Experiments',
        icon: '🧪',
        description: "Learn to design, run, and analyze rigorous experiments to drive product and business decisions."
    },
    lessons: [
        {
            number: 1,
            title: "Formulating a Hypothesis",
            content: `
                <h4>1. What makes a good hypothesis</h4>
                <p>A good hypothesis is a <strong>clear, testable, falsifiable</strong> statement about the expected outcome of an experiment. It should specify the change you are making, the metric you expect to move, the direction of that movement, and the <em>reason</em> (the mechanism) linking the two.</p>

                <h4>2. The template</h4>
                <pre><code>If we [change X] for [audience],
then [metric Y] will [increase / decrease]
because [theory about the user or system].</code>
                </p>

                <h4>3. Good vs bad</h4>
                <ul>
                    <li><strong>Good:</strong> "If we add a one-click reorder button, repeat-purchase rate will rise because returning customers face less friction."</li>
                    <li><strong>Bad:</strong> "We should redesign the page because it feels old." — No metric, no direction, no mechanism, not testable.</li>
                </ul>

                <h4>4. Null and alternative</h4>
                <p>The statistical framing always includes an unobservable <strong>null hypothesis (H₀: no effect)</strong> and an <strong>alternative (H₁: an effect)</strong>. Pre-register your H₀ so you cannot rationalize a post-hoc story later.</p>
            `
        },
        {
            number: 2,
            title: "Choosing Metrics",
            content: `
                <h4>1. Three layers</h4>
                <ul>
                    <li><strong>Primary:</strong> the one metric your hypothesis commits to; it decides the test's outcome.</li>
                    <li><strong>Secondary:</strong> metrics you track for side effects in either direction.</li>
                    <li><strong>Guardrails:</strong> health metrics that must not degrade (revenue, latency, error rate).</li>
                </ul>

                <h4>2. Good metric properties</h4>
                <ul>
                    <li><strong>Sensitive to the change:</strong> will it actually move?</li>
                    <li><strong>Relevant to the hypothesis:</strong> measures the intended outcome, not a proxy.</li>
                    <li><strong>Reliable:</strong> low day-to-day noise, well-instrumented.</li>
                </ul>

                <h4>3. OEC trap</h4>
                <p>Optimizing for a narrow metric (e.g., "clicks") can hurt the <strong>Overall Evaluation Criterion</strong> — the composite that captures real value (e.g., revenue or retention). Pick metrics closest to delivered value and pre-commit the list before launching.</p>
            `
        },
        {
            number: 3,
            title: "Randomization: Control and Treatment",
            content: `
                <h4>1. The role of randomization</h4>
                <p>Random assignment makes the <strong>control</strong> (status quo) and <strong>treatment</strong> (variant) groups statistically interchangeable before the intervention. Any post-test difference can then be attributed to the change, not to pre-existing difference — this is what separates causal experiments from observational analysis.</p>

                <h4>2. Design types</h4>
                <ul>
                    <li><strong>Unit then assign</strong> — standard A/B: assign users individually.</li>
                    <li><strong>Cluster first</strong> — treat per city, group, or region when the intervention is shared (network effects).</li>
                    <li><strong>Stratified:</strong> randomize within strata (e.g., by country) to guarantee balance.</li>
                </ul>

                <pre><code># Pseudocode: random (50 / 50) assignment
def assign(user):
    return "treatment" if hash(user) % 100 < 50 else "control"</code>
                </p>

                <h4>3. The basic experiment flow</h4>

                \`\`\`mermaid
graph TD
    A[Randomly assign users] --> B[Control: status quo]
    A --> C[Treatment: variant]
    B --> D[Measure outcomes]
    C --> D
    D --> E{Compare with a test}
    E -->|significant & practical| F[Ship variant]
    E -->|otherwise| G[Keep control / iterate]
                \`\`\`

                <h4>4. Avoiding contamination</h4>
                <p>Ensure users stay in their assigned group for the whole test (no crossover) and that assignment keys don't leak across sessions.</p>
            `
        },
        {
            number: 4,
            title: "Blinding and Blocking",
            content: `
                <h4>1. Blocking</h4>
                <p><strong>Blocking</strong> is stratifying the population before randomization so that each block (e.g., region, device, segment) is internally randomized. Done well it <strong>reduces variance</strong> (better precision) and ensures important subgroups are represented in both arms — protecting against chance imbalance.</p>

                <h4>2. Why block instead of relying on huge randomization?</h4>
                <p>Randomization balances groups in expectation, but a small, stringent-precision experiment can still end up lopsided on an important covariate. Blocking forcibly balances on that covariate, which directly shrinks that source of variance in your estimate.</p>

                <h4>3. Blinding</h4>
                <ul>
                    <li><strong>Single-blind:</strong> the participant doesn't know their group.</li>
                    <li><strong>Double-blind:</strong> neither participant nor the analysts/implementers know — reduces expectancy bias (Hawthorne/placebo effects). Search, ad, and price tests need blinding carefully.</li>
                    </li>
                </ul>

                <h4>4. When to block vs randomize</h4>
                <p>Block on covariates that are <em>predictive</em> and <em>imbalanced</em> (region, device, prior activity). Blocking costs purity but buys precision; randomize freely on the rest.</p>
            `
        },
        {
            number: 5,
            title: "Power Analysis and Sample Sizing",
            content: `
                <h4>1. The four inputs</h4>
                <p>Sample size is a function of four things you set <em>before</em> launch:</p>
                <ol>
                    <li><strong>Alpha (α)</strong> — Type I error rate (usually 0.05).</li>
                    <li><strong>Power (1 − β)</strong> — usually 80%.</li>
                    <li><strong>Minimum Detectable Effect (MDE)</strong> — the smallest effect you care about.</li>
                    <li><strong>Baseline variance</strong> — of the metric.</li>
                </ol>

                <h4>2. Trade-offs</h4>
                <ul>
                    <li>Halving the MDE quadruples the required sample size.</li>
                    <li>Raising power from 80% to 95% adds meaningfully to n.</li>
                    <li>Lower variance (a cleaner, less noisy metric) shrinks n.</li>
                </ul>

                <pre><code>n_per_group ≈ 2 * (Z_alpha + Z_beta)^2 * Var / MDE^2</code>
                </p>

                <h4>3. Why do this before you run?</h4>
                <p>Sizing sets a <strong>fixed stopping rule</strong>. Deciding the sample size first keeps you from stopping early on luck or waiting forever on noise — both errors cost money.</p>
            `
        },
        {
            number: 6,
            title: "Type I and Type II Errors",
            content: `
                <h4>1. The error grid</h4>
                <p>Every statistic in analysis makes two fundamental kinds of mistake:</p>
                <ul>
                    <li><strong>Type I (False Positive, α):</strong> concluding an effect exists when it does not.</li>
                    <li><strong>Type II (False Negative, β):</strong> failing to detect an effect that is real.</li>
                </ul>

                <pre><code>          H0 TRUE        H0 FALSE
Reject    Type I error   Correct (power = 1 -
Don't   Correct         Type II (β)
                         reject  (this runs correctly)</code>
                </p>

                <h4>2. Business framing</h4>
                <ul>
                    <li><strong>Type I:</strong> shipping a change that doesn't actually work — wasted effort, worse product.</li>
                    <li><strong>Type II:</strong> missing a real improvement — lost opportunity and revenue.</li>
                </ul>

                <h4>3. Controlling each</h4>
                <p>α is set by your significance threshold; β (and thus power = 1−β) is controlled by sample size and effect size. There is always a trade-off: at a fixed sample, lowering α raises β. Sizing the test balances both.</p>
            `
        },
        {
            number: 7,
            title: "Simpson's Paradox",
            content: `
                <h4>1. What it is</h4>
                <p><strong>Simpson's paradox</strong>: a trend that appears in several sub-groups reverses or disappears when the groups are combined (or vice versa). The lurking cause is usually an uneven <em>confound</em> — for instance, a group with a different mix of observations or size.</p>

                <h4>2. Classic example</h4>
                <p>Treatment X beats the control in every <em>region</em>, yet loses on <em>overall</em> conversion — because the treatment by chance gets a far larger share of a low-converting, high-volume region, dragging its global number down.</p>

                <pre><code>        Control   Treatment
Region A   5% (80)    6% (20)
Region B  10% (20)  12% (auto__
Overall   6% (100)   7%* (120)

(* decided by region mix, not treatment quality)</code>
                </p>

                <h4>3. Defenses</h4>
                <ul>
                    <li><strong>Randomize within blocks/strata</strong> so the treatment doesn't inherit a skewed mix.</li>
                    <li>Always run a <strong>stratified analysis</strong> (by region, device, cohort) before trusting a global claim.</li>
                    <li>Weight by exposure / proportion consciously — never let composition blind you.</li>
                </ul>
            `
        },
        {
            number: 8,
            title: "Ethical Considerations",
            content: `
                <h4>1. Informed users</h4>
                <p>Real users are the subjects of your experiment. Be transparent when possible via terms of use, and never run studies designed to I <em>omantically deceive</em> — the goal is learning, not harm.</p>

                <h4>2. Guardrails against harm</h4>
                <ul>
                    <li>Do not withhold critical safety or health information from one arm.</li>
                    <li>Pre-decide <strong>stop rules</strong> and <strong>safety metrics</strong> (never biomedical metrics as the sweetener).</li>
                    <li>Pay attention to <strong>protected groups</strong>: don't run price or content tests that systematically hurt vulnerable audiences.</li>
                </ul>

                <h4>3. Privacy</h4>
                <p>Randomized assignment does not grant license to collect more data. Follow your data policies; pseudonymize IDs; avoid logging personally identifiable information unless required and approved.</p>

                <h4>4. Reporting honestly</h4>
                <p>Publish <em>both</em> the null and the promising results; never p-hack, never reshape the hypothesis after seeing the data unless you re-run and pre-register the new test. Reproducibility and honesty are the price of doing good science in a product.</p>
            `
        },
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What three components must a testable hypothesis contain?",
            answer: "A good hypothesis should state (1) the change you are making (the intervention), (2) the expected outcome/effect and the metric it targets, with a direction, and (3) the reason or mechanism why the change should produce that effect. If any of those is missing, the hypothesis is hard to test and hard to evaluate with rigor."
        },
        {
            number: 2,
            difficulty: "medium",
            question: "Why is randomization essential to claiming causation in an experiment that randomized groups are interchangeable?",
            answer: "Random assignment makes the control and treatment groups statistically interchangeable on every measured and unmeasured variable, at the start. That means the only systematic difference between them is the change you deliberately made. So when you see a difference in the outcome metric, the only plausible explanation is the change itself — ruling out the confounders that plague observational (correlational) analysis. Without randomization, pre-existing differences could cause (or mask) the observed effect."
        },
        {
            number: 3,
            difficulty: "hard",
            question: "You plan a test to detect a 1 percentage-point lift in conversion (baseline 5%) with α=0.05 and power 80%. Estimate the per-group sample size and explain what happens if the MDE is halved.",
            answer: "Using n ≈ 2 * (Z_α/2 + Z_β)^2 * p_pool(1−p_pool) / MDE^2 with p_pool ≈ 0.055, Z_α/2 = 1.96, Z_β = 0.84, MDE = 0.01: n ≈ 2*7.84*0.052/0.0001 ≈ 16,000+ per group. The essential relationship is that n scales inversely with the square of the MDE. So halving the MDE (e.g., from 1% to 0.5%) would roughly quadruple the required sample size — over 64,000 per group in this case. That's why choosing a realistic, practically meaningful MDE balances power against experiment cost and time."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "Distinguish Type I and Type II errors with a business decision example for each.",
            answer: "Type I (false positive) occurs when you reject a true null — concluding the change works when it actually has no effect. Business example: shipping a redesigned checkout that you think lifts conversion but which actually performs the same or worse, wasting engineering time. Type II (false negative) occurs when you fail to reject a false null — concluding 'no effect' when there was a real effect. Example: holding back a genuinely better search ranking because your test was too small/undercontrol to detect the lift, passing on real revenue."
        },
        {
            number: 5,
            difficulty: "hard",
            question: "Treatment 4 beats control in both regions, but aggregated data says control wins. Could you run the numbers, and how would you defend against this?",
            answer: "This is Simpson's paradox. It happens when the two arms get incompatible mixes of volume across the confounding variable. For instance, Region A converts 6% vs 4%, Region B 3% vs 2% — the treatment wins in both. But if treatment B is very heavily weighted toward the low-converting Region B (say 900 of 1000 of its users there), its global aggregate can sink below control, which has more users in region A. Defenses: stratify/block randomization by region and device; run the analysis as weighted strata rather than naive pooling; and check the same claim at every breakdown before trusting global numbers."
        },
        {
            number: 6,
            difficulty: "medium",
            question: "What is 'blocking' and why might you block on device type in an experiment?",
            answer: "Blocking means stratifying the population into homogeneous subgroups (blocks) and randomizing within each block separately, rather than one big pool. You might block on device because mobile and desktop users have very different baselines and variance, and a naive pool could land a lopsided split that biases the comparison or adds noise. Blocking guarantees balanced representation of each device type across both arms, reduces variance, improves precision, and makes the per-device analysis (often where the actionable insight hides) cleaner."
        },
        {
            number: 7,
            difficulty: "easy",
            question: "Why does lowering α (say from 0.05 to 0.01) tend to increase the risk of a Type II error at a fixed sample size?",
            answer: "α and β are engaged at a fixed sample size. Setting a stricter significance threshold (α=0.01) means you require stronger evidence to reject the null, so the test has to cross a higher bar. That makes it less likely to reject H₀ even when a real effect exists — i.e., the probability of a false negative (Type II) rises, and power (1−β) falls. To recover power you must increase the sample size or relax threshold. In short, being more stringent about false positives forces you to accept more missed true effects unless you add data."
        },
        {
            number: 8,
            difficulty: "medium",
            question: "Name two ethical pitfalls when running product experiments and how to mitigate each.",
            answer: "(1) Running an experiment that could deceive or harm users — e.g., deliberately giving a worse checkout to some arm to 'learn.' Mitigate by never mainstreaming harm, pre-setting a safety metric, and keeping essential/safety features intact across both arms. (2) Invasive data collection or a privacy risk — randomization doesn't justify logging more than the minimal pseudonymous data. Mitigate by following data policies, consent frameworks, and avoiding PII unless necessary and approved. Also, don't run single-sex-harm tests on vulnerable populations without the strongest justification."
        },
        {
            number: 9,
            difficulty: "hard",
            question: "A product team tweaks its hypothesis after seeing the data, then reports a 'significant' result. Why is this a problem, and what's the fix?",
            answer: "This is a form of hypothesis-respecification after the data, which is a version of p-hacking / multiple testing. If you decide the metric, direction, or stopping rule after observing the outcome, the p-value no longer describes the probability of the null under a pre-committed decision rule, so your false-positive rate is nonsense and the 'significance' is uninformative. The fix is to pre-register the primary hypothesis, metrics, sample size, and analysis plan before launching; if you learn and want to revise the hypothesis, run a new test pre-registered accordingly rather than reinterpreting the old one."
        },
        {
            number: 10,
            difficulty: "hard",
            question: "Given a primary, secondary, and difference of dimension, list what makes a good primary metric and give an example where a primary metric is a ratio rather than a raw count.",
            answer: "A good primary metric is (1) directly tied to the hypothesis (the outcome you expect to change), (2) sensitive enough to move, (3) reliable (low noise, well instrumented), and (4) aligned with business value (north-star or OEC) rather than a vanity proxy. Prefer rates over ratios: e.g., use 'conversion rate' (= conversions/exposed) not 'number of conversions', because the raw count conflates treatment effect with how much traffic was assigned to each arm. If one arm randomly gets more traffic, the count jumps with no real effect — a rate normalizes for exposure, giving a fair, portable, business-meaningful comparison."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.experimentDesignData = experimentDesignData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = experimentDesignData;
}