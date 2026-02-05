// Statistics topic data
const statisticsData = {
    title: "Statistics & Probability - Advanced",
    lessons: [
    {
        "number": 1,
        "title": "Descriptive Statistics",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Descriptive statistics simplify large amounts of data into summary values. They describe \"what happened.\"</p>\n        \n        <h4>2. The Big Three</h4>\n        <ul>\n            <li><strong>Mean (Average):</strong> Sum / Count. Sensitive to outliers (e.g., billionaire walks into a bar).</li>\n            <li><strong>Median:</strong> The middle value. Robust against outliers. <em>Use this for salary or home price data.</em></li>\n            <li><strong>Mode:</strong> The most frequent value. Good for categorical data.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Analysis:</strong> You are analyzing website session durations.</p>\n        <ul>\n            <li><strong>Mean:</strong> 5 minutes (skewed by one user who left tab open for 4 hours).</li>\n            <li><strong>Median:</strong> 45 seconds (most users stay less than a minute).</li>\n        </ul>\n        <p><strong>Conclusion:</strong> The Median is the better metric here for \"typical\" user behavior.</p>\n      "
    },
    {
        "number": 2,
        "title": "Measures of Spread",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Central tendency (mean/median) tells you the center. Measures of spread tell you how \"noisy\" or inconsistent the data is.</p>\n        \n        <h4>2. Key Metrics</h4>\n        <ul>\n            <li><strong>Range:</strong> Max - Min. Simple but rough.</li>\n            <li><strong>Standard Deviation (SD):</strong> The average distance of data points from the mean. Low SD = consistent. High SD = volatile.</li>\n            <li><strong>Variance:</strong> SD squared. Used in calculations.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Comparison:</strong> Two stock portfolios both return 10% average annual return.</p>\n        <ul>\n            <li><strong>Portfolio A:</strong> SD = 2%. (Returns 8% to 12% - Stable).</li>\n            <li><strong>Portfolio B:</strong> SD = 20%. (Returns -10% to 30% - Risky).</li>\n        </ul>\n      "
    },
    {
        "number": 3,
        "title": "Probability Basics",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Probability quantifies uncertainty. It ranges from 0 (impossible) to 1 (certain).</p>\n        \n        <h4>2. Key Rules</h4>\n        <ul>\n            <li><strong>P(A or B):</strong> Addition Rule. Probability of A <em>or</em> B happening.</li>\n            <li><strong>P(A and B):</strong> Multiplication Rule. Probability of A <em>and</em> B happening (if independent).</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Funnel Analysis:</strong></p>\n        <p>Probability a visitor clicks \"Add to Cart\" = 0.2 (20%).<br>\n        Probability a \"Cart\" user clicks \"Checkout\" = 0.5 (50%).<br>\n        Probability a visitor buys? <br>\n        <code>0.2 * 0.5 = 0.1 (10%)</code>.\n        </p>\n      "
    },
    {
        "number": 4,
        "title": "Distributions (Normal, Binomial)",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>A distribution shows all possible values of data and how often they occur.</p>\n        \n        <h4>2. The Normal Distribution (Bell Curve)</h4>\n        <p>Nature loves this curve. Heights, weights, test scores, errors often follow it.</p>\n        <ul>\n            <li>Symmetric around the mean.</li>\n            <li><strong>68-95-99.7 Rule:</strong> 68% of data is within 1 SD, 95% within 2 SDs.</li>\n        </ul>\n        \n        <h4>3. Business Scenario</h4>\n        <p><strong>Quality Control:</strong> A machine fills cereal boxes to 500g with SD = 5g. <br>\n        95% of boxes will weigh between 490g and 510g. Getting a 450g box is statistically nearly impossible, signaling a machine failure.</p>\n      "
    },
    {
        "number": 5,
        "title": "Sampling and CLT",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>You can rarely measure an entire population (e.g., \"All US Internet Users\"). You take a sample.</p>\n        \n        <h4>2. Central Limit Theorem (CLT)</h4>\n        <p>This is the magic of statistics. It states that if you take enough random samples, the <em>means of those samples</em> will form a Normal Distribution, even if the original data is not normal.</p>\n        \n        <h4>3. Business Implication</h4>\n        <p>This allows us to use Normal Distribution math (z-scores, confidence intervals) on almost any metric (sales, defects, logins) as long as we have enough data points.</p>\n      "
    },
    {
        "number": 6,
        "title": "Hypothesis Testing",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The scientific method for data. Should we believe a change is real, or just random noise?</p>\n        \n        <h4>2. Steps</h4>\n        <ol>\n            <li><strong>Null Hypothesis (H0):</strong> \"Nothing changed.\" (The default).</li>\n            <li><strong>Alternative Hypothesis (H1):</strong> \"Something changed.\" (What we hope for).</li>\n            <li><strong>P-Value:</strong> The probability of seeing these results if H0 were true.</li>\n        </ol>\n        \n        <h4>3. The Threshold (Alpha)</h4>\n        <p>Usually 0.05. If p-value < 0.05, we say it's \"Statistically Significant\" and reject H0.</p>\n      "
    },
    {
        "number": 7,
        "title": "Confidence Intervals",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>A point estimate (e.g., \"Conversion rate is 5%\") is rarely exactly right. A Confidence Interval (CI) gives a range.</p>\n        \n        <h4>2. Interpretation</h4>\n        <p>\"We are 95% confident that the true conversion rate lies between 4.8% and 5.2%.\"</p>\n        \n        <h4>3. Business Use</h4>\n        <p><strong>Executive Reporting:</strong> Don't just say \"We'll gain 10,000 users.\" Say \"We project 10,000 users (+/- 500).\" This manages expectations and risk.</p>\n      "
    },
    {
        "number": 8,
        "title": "Correlation vs Causation",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p><strong>Correlation:</strong> Two variables move together.<br>\n        <strong>Causation:</strong> One variable <em>causes</em> the other to move.</p>\n        \n        <h4>2. The Famous Trap</h4>\n        <p>Ice cream sales and shark attacks are highly correlated. Why? <br>\n        <strong>Confounding Variable:</strong> Summer. Heat causes both.</p>\n        \n        <h4>3. Correlation Coefficient (r)</h4>\n        <ul>\n            <li>+1: Perfect positive correlation</li>\n            <li>0: No correlation</li>\n            <li>-1: Perfect negative correlation</li>\n        </ul>\n      "
    },
    {
        "number": 9,
        "title": "Linear Regression",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Modeling the relationship between a dependent variable (Target) and independent variables (Features) with a straight line.</p>\n        \n        <h4>2. Equation</h4>\n        <p><code>y = mx + b</code> (or <code>y = β0 + β1x</code>)</p>\n        <ul>\n            <li><strong>y:</strong> Prediction (e.g., Sales)</li>\n            <li><strong>x:</strong> Input (e.g., Ad Spend)</li>\n            <li><strong>m:</strong> Slope (Coefficient) - How much y changes for 1 unit of x.</li>\n        </ul>\n        \n        <h4>3. Business Use</h4>\n        <p><strong>Forecasting:</strong> \"For every additional $1,000 spent on Facebook Ads, sales increase by $4,000.\"</p>\n      "
    },
    {
        "number": 10,
        "title": "A/B Testing",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>The gold standard for proving causality in product changes.</p>\n        \n        <h4>2. Process</h4>\n        <ul>\n            <li><strong>Split:</strong> Randomly divide users into Control (A) and Variant (B).</li>\n            <li><strong>Measure:</strong> Track metrics (e.g., Click-Through Rate) for both.</li>\n            <li><strong>Test:</strong> Use a T-Test or Chi-Square test to compare results.</li>\n        </ul>\n        \n        <h4>3. Real-World Tip</h4>\n        <p>Ensure your sample size is large enough <em>before</em> starting. Peeking at results early (before hitting sample size) increases false positives.</p>\n      "
    },
    {
        "number": 11,
        "title": "Advanced Statistics: Probability Distributions",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Understanding how data is distributed is fundamental to statistical inference. This lesson covers the most important probability distributions used in data analysis.</p>\n        \n        <h4>2. Key Distributions</h4>\n        <ul>\n            <li><strong>Binomial Distribution:</strong> Models the number of successes in n independent trials (e.g., coin flips, pass/fail tests).</li>\n            <li><strong>Normal Distribution:</strong> Bell-shaped curve; most natural phenomena follow this (e.g., heights, test scores, errors).</li>\n            <li><strong>t-Distribution:</strong> Used for hypothesis tests with small samples or unknown population standard deviation.</li>\n            <li><strong>Chi-Square Distribution:</strong> Used for testing independence and goodness of fit.</li>\n        </ul>\n        \n        <h4>3. Why It Matters</h4>\n        <p>Different distributions have different properties. Knowing which distribution your data follows helps you choose the right statistical test.</p>\n      "
    },
    {
        "number": 12,
        "title": "Inferential Statistics: Hypothesis Testing",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Hypothesis testing allows us to make decisions about populations based on sample data. It's the foundation of scientific inference and business decision-making.</p>\n        \n        <h4>2. The 5-Step Process</h4>\n        <ol>\n            <li><strong>State Hypotheses:</strong> H0 (null) vs H1 (alternative)</li>\n            <li><strong>Set Significance Level:</strong> Usually α = 0.05</li>\n            <li><strong>Calculate Test Statistic:</strong> t-test, z-test, chi-square, etc.</li>\n            <li><strong>Find p-value:</strong> Probability of observing data if H0 is true</li>\n            <li><strong>Make Decision:</strong> If p-value < α, reject H0</li>\n        </ol>\n        \n        <h4>3. Business Application</h4>\n        <p>Example: Test if a new marketing strategy increases sales. H0: No increase. If p-value = 0.02, we reject H0 and conclude the strategy works.</p>\n      "
    },
    {
        "number": 13,
        "title": "Confidence Intervals & Estimation",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>While hypothesis testing answers yes/no questions, confidence intervals give us a range of plausible values for a population parameter.</p>\n        \n        <h4>2. Interpretation</h4>\n        <p>A 95% confidence interval means: If we repeated our sampling process 100 times, approximately 95 of the intervals would contain the true population parameter.</p>\n        \n        <h4>3. Formulas</h4>\n        <ul>\n            <li><strong>For Mean (σ known):</strong> CI = x̄ ± z*(σ/√n)</li>\n            <li><strong>For Mean (σ unknown):</strong> CI = x̄ ± t*(s/√n)</li>\n            <li><strong>For Proportion:</strong> CI = p ± z*√(p(1-p)/n)</li>\n        </ul>\n        \n        <h4>4. Why Confidence Intervals?</h4>\n        <p>They provide more information than a single point estimate and acknowledge the uncertainty in our estimation.</p>\n      "
    },
    {
        "number": 14,
        "title": "Comparing Groups: ANOVA and t-Tests",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Often we need to compare means across two or more groups. This lesson covers the statistical tests used for such comparisons.</p>\n        \n        <h4>2. When to Use What</h4>\n        <ul>\n            <li><strong>Independent t-test:</strong> Compare means of two independent groups (e.g., Control vs Treatment)</li>\n            <li><strong>Paired t-test:</strong> Compare measurements from same subjects at different times (e.g., Before/After)</li>\n            <li><strong>ANOVA:</strong> Compare means of 3+ groups. Tests if at least one group differs.</li>\n        </ul>\n        \n        <h4>3. Real-World Examples</h4>\n        <p>Machine A produces items averaging 12.3mm, Machine B averages 12.1mm. Are they significantly different? Use independent t-test.</p>\n        \n        <h4>4. Post-hoc Analysis</h4>\n        <p>If ANOVA is significant, use tests like Tukey HSD to identify which specific groups differ.</p>\n      "
    },
    {
        "number": 15,
        "title": "Quartiles and Outlier Detection",
        "content": "\n        <h4>Understanding Data Distribution</h4>\n        <p>Quartiles divide data into four equal parts. Q1 (25th percentile), Q2 (median, 50th), Q3 (75th percentile).</p>\n        \n        <h4>Interquartile Range (IQR)</h4>\n        <p>IQR = Q3 - Q1. Data points outside [Q1 - 1.5×IQR, Q3 + 1.5×IQR] are considered outliers.</p>\n        \n        <h4>Why It Matters</h4>\n        <p>Quartiles are robust to outliers, unlike mean. Use them when data has extreme values.</p>\n        \n        <h4>Business Application</h4>\n        <p>Identify unusual transactions: If typical transaction amounts are $100-$500 (IQR), a $50,000 transaction is an outlier worth investigating.</p>\n      "
    },
    {
        "number": 16,
        "title": "Coefficient of Variation: Comparing Across Scales",
        "content": "\n        <h4>The Problem</h4>\n        <p>Standard deviation alone doesn't tell the full story. A $10 variation in a $100 item is huge; in a $10,000 item it's tiny.</p>\n        \n        <h4>The Solution: Coefficient of Variation</h4>\n        <p><code>CV = (Standard Deviation / Mean) × 100%</code></p>\n        <p>This normalizes variability relative to the mean, allowing fair comparisons across different scales.</p>\n        \n        <h4>Real-World Example</h4>\n        <ul>\n            <li><strong>Stock A:</strong> Mean=$100, SD=$15 → CV = 15% (risky)</li>\n            <li><strong>Stock B:</strong> Mean=$50, SD=$5 → CV = 10% (stable)</li>\n        </ul>\n        <p>Stock B is more stable despite lower absolute variability!</p>\n        \n        <h4>When to Use CV</h4>\n        <p>Comparing variability across different countries, currencies, units, or datasets with different means.</p>\n      "
    },
    {
        "number": 17,
        "title": "Basic Statistical Concepts: Populations, Samples, and Data Types",
        "content": "\n        <h4>Core Definitions</h4>\n        <ul>\n            <li><strong>Population:</strong> The entire group you want to study</li>\n            <li><strong>Sample:</strong> A subset of the population</li>\n            <li><strong>Parameter:</strong> A numerical measure describing a population characteristic</li>\n            <li><strong>Statistic:</strong> A numerical measure describing a sample characteristic</li>\n        </ul>\n        \n        <h4>Types of Data</h4>\n        <ul>\n            <li><strong>Qualitative/Categorical:</strong> Non-numerical data (e.g., colors, brands, regions)</li>\n            <li><strong>Quantitative:</strong> Numerical data\n                <ul>\n                    <li><strong>Discrete:</strong> Countable numbers (e.g., number of students, defects)</li>\n                    <li><strong>Continuous:</strong> Measurable numbers with decimals (e.g., height, weight, time)</li>\n                </ul>\n            </li>\n        </ul>\n        \n        <h4>Why This Matters</h4>\n        <p>Understanding whether you're working with populations or samples, and the type of data you have, determines which statistical methods are appropriate.</p>\n      "
    },
    {
        "number": 18,
        "title": "Central Tendency: Mean, Median, Mode, and Weighted Mean",
        "content": "\n        <h4>Key Formulas</h4>\n        <ul>\n            <li><strong>Mean (Average):</strong> x̄ = Σx / n</li>\n            <li><strong>Weighted Mean:</strong> x̄_w = Σ(wᵢ × xᵢ) / Σwᵢ (useful when some values are more important)</li>\n            <li><strong>Geometric Mean:</strong> GM = (∏xᵢ)^(1/n) (used for growth rates and percentage changes)</li>\n        </ul>\n        \n        <h4>When to Use Each</h4>\n        <ul>\n            <li><strong>Mean:</strong> Most common, but sensitive to outliers</li>\n            <li><strong>Median:</strong> Better for skewed data; robust to outliers</li>\n            <li><strong>Mode:</strong> Best for categorical data and identifying the most frequent value</li>\n        </ul>\n        \n        <h4>Real-World Example</h4>\n        <p>Salary data with mean=$60k but median=$48k suggests right-skewed data (executives pulling mean higher).</p>\n      "
    },
    {
        "number": 19,
        "title": "Measures of Dispersion: Spread, Variability, and Outliers",
        "content": "\n        <h4>Key Formulas</h4>\n        <ul>\n            <li><strong>Range:</strong> Max - Min (simple but rough)</li>\n            <li><strong>Variance (Population):</strong> σ² = Σ(x - μ)² / N</li>\n            <li><strong>Variance (Sample):</strong> s² = Σ(x - x̄)² / (n-1) (Bessel's correction)</li>\n            <li><strong>Standard Deviation:</strong> σ = √σ² (more interpretable than variance)</li>\n            <li><strong>Coefficient of Variation:</strong> CV = (σ/μ) × 100% (compare variability across different scales)</li>\n            <li><strong>Interquartile Range (IQR):</strong> IQR = Q₃ - Q₁ (middle 50% of data)</li>\n        </ul>\n        \n        <h4>Quartiles</h4>\n        <ul>\n            <li>Q1 = 25th percentile</li>\n            <li>Q2 = 50th percentile (median)</li>\n            <li>Q3 = 75th percentile</li>\n        </ul>\n        \n        <h4>Identifying Outliers</h4>\n        <p>Use 1.5×IQR rule: Data points below (Q1 - 1.5×IQR) or above (Q3 + 1.5×IQR) are outliers.</p>\n      "
    },
    {
        "number": 20,
        "title": "Probability: Rules, Conditional Probability, and Bayes' Theorem",
        "content": "\n        <h4>Fundamental Rules</h4>\n        <ul>\n            <li><strong>Addition Rule:</strong> P(A∪B) = P(A) + P(B) - P(A∩B)</li>\n            <li><strong>Multiplication Rule:</strong> P(A∩B) = P(A) × P(B|A)</li>\n            <li><strong>Complement Rule:</strong> P(A') = 1 - P(A)</li>\n            <li><strong>Conditional Probability:</strong> P(A|B) = P(A∩B) / P(B), provided P(B) > 0</li>\n        </ul>\n        \n        <h4>Bayes' Theorem</h4>\n        <p>P(A|B) = [P(B|A) × P(A)] / P(B)</p>\n        <p>Used to update probabilities based on new evidence. Example: medical test accuracy given positive result.</p>\n        \n        <h4>Key Insight</h4>\n        <p>Probability ranges from 0 (impossible) to 1 (certain). Sum of all possible outcomes = 1.</p>\n      "
    },
    {
        "number": 21,
        "title": "Probability Distributions: Binomial and Normal",
        "content": "\n        <h4>Binomial Distribution</h4>\n        <ul>\n            <li><strong>Conditions:</strong> Fixed number of trials, independent trials, two outcomes (success/failure)</li>\n            <li><strong>Formula:</strong> P(X=k) = C(n,k) × p^k × (1-p)^(n-k)</li>\n            <li><strong>Mean:</strong> μ = np</li>\n            <li><strong>Variance:</strong> σ² = np(1-p)</li>\n            <li><strong>Example:</strong> Probability of exactly 3 defects in 50 items (2% defect rate)</li>\n        </ul>\n        \n        <h4>Normal Distribution</h4>\n        <ul>\n            <li><strong>Properties:</strong> Bell-shaped, symmetric, mean=median=mode</li>\n            <li><strong>Empirical Rule (68-95-99.7):</strong>\n                <ul>\n                    <li>68% within μ ± 1σ</li>\n                    <li>95% within μ ± 2σ</li>\n                    <li>99.7% within μ ± 3σ</li>\n                </ul>\n            </li>\n            <li><strong>Z-score:</strong> z = (x - μ)/σ (standardize to normal distribution)</li>\n        </ul>\n        \n        <h4>Why Normal Distribution Matters</h4>\n        <p>Many natural phenomena follow normal distribution. Used as basis for hypothesis testing and confidence intervals.</p>\n      "
    },
    {
        "number": 22,
        "title": "Inferential Statistics: CLT, Confidence Intervals, and Hypothesis Testing",
        "content": "\n        <h4>Central Limit Theorem</h4>\n        <p>For large samples (n ≥ 30), the sampling distribution of the sample mean is approximately normal, regardless of the original population distribution.</p>\n        <ul>\n            <li><strong>Mean of sampling distribution:</strong> μ_x̄ = μ</li>\n            <li><strong>Standard Error:</strong> σ_x̄ = σ/√n</li>\n        </ul>\n        \n        <h4>Confidence Intervals</h4>\n        <ul>\n            <li><strong>For mean (σ known):</strong> CI = x̄ ± z*(σ/√n)</li>\n            <li><strong>For mean (σ unknown):</strong> CI = x̄ ± t*(s/√n) (uses t-distribution with n-1 df)</li>\n        </ul>\n        \n        <h4>Hypothesis Testing (5 Steps)</h4>\n        <ol>\n            <li>State H₀ (null) and H₁ (alternative)</li>\n            <li>Choose α (significance level, typically 0.05)</li>\n            <li>Calculate test statistic (t-test, z-test, chi-square, etc.)</li>\n            <li>Find p-value</li>\n            <li>Make decision: if p-value < α, reject H₀</li>\n        </ol>\n        \n        <h4>Type I and Type II Errors</h4>\n        <ul>\n            <li><strong>Type I (α):</strong> Rejecting true H₀ (false positive)</li>\n            <li><strong>Type II (β):</strong> Failing to reject false H₀ (false negative)</li>\n        </ul>\n      "
    },
    {
        "number": 23,
        "title": "Bayesian Hierarchical Modeling",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Hierarchical Bayesian models (multilevel models) allow partial pooling of information across groups, balancing between complete pooling (ignoring group differences) and no pooling (treating groups independently).</p>\n        \n        <h4>2. Mathematical Foundation</h4>\n        <p><strong>Three-Level Hierarchy:</strong></p>\n        <p>Likelihood: yᵢⱼ ∼ N(θⱼ, σ²)<br>\n        Prior: θⱼ ∼ N(μ, τ²)<br>\n        Hyperprior: μ ∼ N(μ₀, σ₀²), τ ∼ Half-Cauchy(0, γ)</p>\n        \n        <h4>3. Business Application: Multi-Store Sales Analysis</h4>\n        <p><strong>Scenario:</strong> 100 retail stores with varying sales data completeness. Estimate true sales for each store while borrowing strength from the group.</p>\n        \n        <pre><code># Python implementation using PyMC3\nimport pymc3 as pm\nimport numpy as np\n\nwith pm.Model() as hierarchical_model:\n    # Hyperpriors\n    mu = pm.Normal('mu', mu=0, sd=10)\n    tau = pm.HalfCauchy('tau', beta=2)\n    \n    # Store-level parameters (partially pooled)\n    theta = pm.Normal('theta', mu=mu, sd=tau, shape=n_stores)\n    \n    # Likelihood\n    sigma = pm.HalfNormal('sigma', sd=1)\n    sales = pm.Normal('sales', mu=theta[store_idx], \n                      sd=sigma, observed=observed_sales)\n    \n    # Inference\n    trace = pm.sample(2000, tune=1000)</code></pre>\n        \n        <h4>4. Shrinkage and Regularization</h4>\n        <p>The hierarchical structure automatically shrinks extreme estimates toward the group mean, providing built-in regularization similar to ridge regression.</p>\n      "
    },
    {
        "number": 24,
        "title": "Causal Inference: Propensity Score Methods",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Propensity score methods enable causal inference from observational data by creating quasi-experimental conditions through matching, weighting, or stratification.</p>\n        \n        <h4>2. Key Methods</h4>\n        <ul>\n            <li><strong>Propensity Score Matching:</strong> Pair treated and control units with similar propensity scores</li>\n            <li><strong>Inverse Probability Weighting (IPW):</strong> Weight observations by inverse of probability of treatment</li>\n            <li><strong>Doubly Robust Estimation:</strong> Combine outcome regression with propensity score weighting</li>\n        </ul>\n        \n        <h4>3. Implementation Pipeline</h4>\n        <pre><code># Python causal inference pipeline\nfrom sklearn.ensemble import RandomForestClassifier\nfrom causalinference import CausalModel\nimport pandas as pd\n\n# 1. Estimate propensity scores\nX = df[features]\nT = df['treatment']\nps_model = RandomForestClassifier()\nps_model.fit(X, T)\npropensity_scores = ps_model.predict_proba(X)[:, 1]\n\n# 2. Create balanced sample\ncaliper = 0.2 * np.std(propensity_scores)\nmatches = []\nfor i in range(len(df)):\n    if T[i] == 1:  # Treated unit\n        control_idx = np.where(T == 0)[0]\n        distances = np.abs(propensity_scores[i] - propensity_scores[control_idx])\n        if np.min(distances) <= caliper:\n            matches.append((i, control_idx[np.argmin(distances)]))\n\n# 3. Estimate treatment effect\nmatched_df = df.iloc[[idx for pair in matches for idx in pair]]\nATE = (matched_df[matched_df['treatment'] == 1]['outcome'].mean() -\n       matched_df[matched_df['treatment'] == 0]['outcome'].mean())\n\n# 4. Sensitivity analysis (Rosenbaum bounds)\ngamma_values = np.linspace(1, 3, 10)\nsensitivity_results = []\nfor gamma in gamma_values:\n    # Calculate bounds on p-value\n    p_lower, p_upper = sensitivity_bounds(matches, gamma)\n    sensitivity_results.append({'gamma': gamma, \n                                'p_lower': p_lower, \n                                'p_upper': p_upper})</code></pre>\n        \n        <h4>4. Assumptions and Diagnostics</h4>\n        <ul>\n            <li><strong>Unconfoundedness:</strong> No unmeasured confounders</li>\n            <li><strong>Overlap:</strong> 0 < P(T=1|X) < 1 for all X</li>\n            <li><strong>Balance Diagnostics:</strong> Standardized mean differences < 0.1</li>\n        </ul>\n      "
    },
    {
        "number": 25,
        "title": "Time Series Deep Learning: LSTMs and Transformers",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Advanced time series forecasting using deep learning architectures that capture complex temporal dependencies and patterns.</p>\n        \n        <h4>2. LSTM Architecture for Time Series</h4>\n        <pre><code># PyTorch implementation\nimport torch\nimport torch.nn as nn\n\nclass LSTMForecaster(nn.Module):\n    def __init__(self, input_size, hidden_size, num_layers, output_size):\n        super().__init__()\n        self.lstm = nn.LSTM(input_size, hidden_size, \n                           num_layers, batch_first=True,\n                           dropout=0.2)\n        self.attention = nn.MultiheadAttention(hidden_size, num_heads=4)\n        self.fc = nn.Sequential(\n            nn.Linear(hidden_size, hidden_size // 2),\n            nn.ReLU(),\n            nn.Dropout(0.1),\n            nn.Linear(hidden_size // 2, output_size)\n        )\n        \n    def forward(self, x):\n        # x shape: (batch, seq_len, features)\n        lstm_out, (hidden, cell) = self.lstm(x)\n        \n        # Self-attention on LSTM outputs\n        attn_out, attn_weights = self.attention(\n            lstm_out, lstm_out, lstm_out\n        )\n        \n        # Use last time step for forecasting\n        last_timestep = attn_out[:, -1, :]\n        output = self.fc(last_timestep)\n        return output, attn_weights\n\n# Training with teacher forcing\nmodel = LSTMForecaster(input_size=10, hidden_size=64, \n                       num_layers=2, output_size=1)\ncriterion = nn.HuberLoss()  # Robust to outliers\noptimizer = torch.optim.AdamW(model.parameters(), lr=0.001)\n\n# Custom loss with temporal consistency penalty\ndef temporal_consistency_loss(predictions, targets, alpha=0.1):\n    mse = nn.MSELoss()(predictions, targets)\n    # Penalize erratic changes in predictions\n    pred_diff = torch.diff(predictions, dim=1)\n    target_diff = torch.diff(targets, dim=1)\n    consistency = nn.MSELoss()(pred_diff, target_diff)\n    return mse + alpha * consistency</code></pre>\n        \n        <h4>3. Transformer Architecture for Long Sequences</h4>\n        <pre><code>class TimeSeriesTransformer(nn.Module):\n    def __init__(self, d_model=64, nhead=4, num_layers=3):\n        super().__init__()\n        self.positional_encoding = PositionalEncoding(d_model)\n        encoder_layer = nn.TransformerEncoderLayer(\n            d_model=d_model, nhead=nhead, \n            dim_feedforward=256, dropout=0.1,\n            activation='gelu'\n        )\n        self.transformer_encoder = nn.TransformerEncoder(\n            encoder_layer, num_layers=num_layers\n        )\n        self.decoder = nn.Linear(d_model, 1)\n        \n    def forward(self, src, src_mask=None):\n        src = self.positional_encoding(src)\n        output = self.transformer_encoder(src, src_mask)\n        output = self.decoder(output[:, -1, :])  # Last position\n        return output\n\n# Positional encoding for time series\nclass PositionalEncoding(nn.Module):\n    def __init__(self, d_model, max_len=5000):\n        super().__init__()\n        pe = torch.zeros(max_len, d_model)\n        position = torch.arange(0, max_len).unsqueeze(1)\n        div_term = torch.exp(torch.arange(0, d_model, 2) *\n                           -(math.log(10000.0) / d_model))\n        pe[:, 0::2] = torch.sin(position * div_term)\n        pe[:, 1::2] = torch.cos(position * div_term)\n        pe = pe.unsqueeze(0)\n        self.register_buffer('pe', pe)\n        \n    def forward(self, x):\n        return x + self.pe[:, :x.size(1)]</code></pre>\n        \n        <h4>4. Advanced Features and Considerations</h4>\n        <ul>\n            <li><strong>Multi-step Forecasting:</strong> Recursive vs direct vs multiple output strategies</li>\n            <li><strong>Uncertainty Quantification:</strong> Monte Carlo dropout, deep ensembles</li>\n            <li><strong>Explainability:</strong> Attention weights analysis, SHAP values for time series</li>\n            <li><strong>Hybrid Models:</strong> Combine statistical methods with deep learning</li>\n        </ul>\n      "
    },
    {
        "number": 26,
        "title": "Bayesian Optimization for Hyperparameter Tuning",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Bayesian optimization uses probabilistic models to find the global optimum of expensive black-box functions with minimal evaluations, ideal for hyperparameter tuning.</p>\n        \n        <h4>2. Gaussian Process Surrogate Model</h4>\n        <pre><code>import numpy as np\nfrom scipy.stats import norm\nfrom sklearn.gaussian_process import GaussianProcessRegressor\nfrom sklearn.gaussian_process.kernels import Matern\n\nclass BayesianOptimizer:\n    def __init__(self, bounds, n_initial=5):\n        self.bounds = bounds\n        self.dim = len(bounds)\n        self.X = []\n        self.y = []\n        self.kernel = Matern(length_scale=1.0, nu=2.5)\n        self.gp = GaussianProcessRegressor(kernel=self.kernel, \n                                          alpha=1e-6,\n                                          normalize_y=True,\n                                          n_restarts_optimizer=5)\n        \n    def expected_improvement(self, X, xi=0.01):\n        \"\"\"Calculate Expected Improvement acquisition function\"\"\"\n        X = np.array(X).reshape(-1, self.dim)\n        mu, sigma = self.gp.predict(X, return_std=True)\n        sigma = sigma.reshape(-1, 1)\n        \n        mu_sample = self.gp.predict(np.array(self.X))\n        mu_sample_opt = np.max(mu_sample)\n        \n        with np.errstate(divide='warn'):\n            imp = mu - mu_sample_opt - xi\n            Z = imp / sigma\n            ei = imp * norm.cdf(Z) + sigma * norm.pdf(Z)\n            ei[sigma == 0.0] = 0.0\n            \n        return ei\n    \n    def propose_next_point(self):\n        \"\"\"Propose next point using EI\"\"\"\n        # Random search for initial points\n        if len(self.X) < 5:\n            return np.random.uniform(self.bounds[:, 0], \n                                    self.bounds[:, 1])\n        \n        # Fit GP to observations\n        self.gp.fit(np.array(self.X), np.array(self.y))\n        \n        # Optimize acquisition function\n        best_ei = -np.inf\n        best_x = None\n        \n        for _ in range(100):  # Random restarts\n            x0 = np.random.uniform(self.bounds[:, 0], \n                                  self.bounds[:, 1])\n            \n            # Use L-BFGS-B for bounded optimization\n            bounds = [(low, high) for low, high in self.bounds]\n            result = minimize(lambda x: -self.expected_improvement([x]),\n                            x0, bounds=bounds, \n                            method='L-BFGS-B')\n            \n            if -result.fun > best_ei:\n                best_ei = -result.fun\n                best_x = result.x\n                \n        return best_x\n    \n    def add_observation(self, x, y):\n        self.X.append(x)\n        self.y.append(y)</code></pre>\n        \n        <h4>3. Advanced Acquisition Functions</h4>\n        <pre><code>class AdvancedAcquisition:\n    @staticmethod\n    def upper_confidence_bound(mu, sigma, kappa=2.576):\n        \"\"\"Upper Confidence Bound (κ=2.576 for 99% CI)\"\"\"\n        return mu + kappa * sigma\n    \n    @staticmethod\n    def probability_of_improvement(mu, sigma, best_y, xi=0.01):\n        \"\"\"Probability of Improvement\"\"\"\n        Z = (mu - best_y - xi) / sigma\n        return norm.cdf(Z)\n    \n    @staticmethod\n    def knowledge_gradient(X_candidate, gp, current_best):\n        \"\"\"Knowledge Gradient - considers future optimization\"\"\"\n        # More computationally expensive but powerful\n        pass\n    \n    @staticmethod\n    def entropy_search(X_candidate, gp, bounds):\n        \"\"\"Entropy Search - maximizes information gain\"\"\"\n        # Information-theoretic approach\n        pass\n\n# Multi-fidelity optimization (cheap vs expensive evaluations)\nclass MultiFidelityBO:\n    def __init__(self):\n        self.low_fidelity_gp = GaussianProcessRegressor()\n        self.high_fidelity_gp = GaussianProcessRegressor()\n        \n    def propose_next_fidelity(self):\n        \"\"\"Decide whether to use low or high fidelity\"\"\"\n        # Use information gain per cost\n        pass</code></pre>\n        \n        <h4>4. Practical Considerations</h4>\n        <ul>\n            <li><strong>Parallelization:</strong> Batch Bayesian optimization with Kriging Believer</li>\n            <li><strong>Constraint Handling:</strong> Expected violation or barrier methods</li>\n            <li><strong>High Dimensions:</strong> Random embeddings or additive GPs</li>\n            <li><strong>Categorical Variables:</strong> One-hot encoding or specialized kernels</li>\n        </ul>\n      "
    },
    {
        "number": 27,
        "title": "Geometric Deep Learning on Graphs",
        "content": "\n        <h4>1. Concept Deep Dive</h4>\n        <p>Extending deep learning to graph-structured data for applications in social networks, recommendation systems, molecular chemistry, and knowledge graphs.</p>\n        \n        <h4>2. Graph Neural Network Architectures</h4>\n        <pre><code>import torch\nimport torch.nn as nn\nimport torch.nn.functional as F\nfrom torch_geometric.nn import GCNConv, GATConv, SAGEConv\n\nclass GNNModel(nn.Module):\n    def __init__(self, in_features, hidden_dim, out_features, \n                 num_layers=3, dropout=0.2):\n        super().__init__()\n        \n        # Graph Convolution Layers\n        self.convs = nn.ModuleList()\n        self.convs.append(GCNConv(in_features, hidden_dim))\n        for _ in range(num_layers - 2):\n            self.convs.append(GCNConv(hidden_dim, hidden_dim))\n        self.convs.append(GCNConv(hidden_dim, out_features))\n        \n        # Attention mechanism for node importance\n        self.attention = nn.Sequential(\n            nn.Linear(out_features, hidden_dim),\n            nn.Tanh(),\n            nn.Linear(hidden_dim, 1)\n        )\n        \n        self.dropout = dropout\n        \n    def forward(self, x, edge_index, batch=None):\n        # Message passing\n        for conv in self.convs[:-1]:\n            x = conv(x, edge_index)\n            x = F.relu(x)\n            x = F.dropout(x, p=self.dropout, training=self.training)\n        \n        # Final layer\n        x = self.convs[-1](x, edge_index)\n        \n        # Graph-level pooling with attention\n        if batch is not None:\n            # Attention weights for each node\n            attention_weights = torch.softmax(\n                self.attention(x).squeeze(), \n                dim=0\n            )\n            # Weighted sum for graph representation\n            graph_rep = torch.zeros(batch.max() + 1, \n                                   x.size(1)).to(x.device)\n            for i in range(batch.max() + 1):\n                mask = (batch == i)\n                if mask.any():\n                    weights = attention_weights[mask]\n                    graph_rep[i] = (x[mask] * \n                                   weights.unsqueeze(1)).sum(0)\n            return graph_rep\n        \n        return x\n\n# Advanced: Graph Attention Networks\nclass GATModel(nn.Module):\n    def __init__(self, in_features, hidden_dim, out_features, \n                 heads=8, dropout=0.6):\n        super().__init__()\n        self.gat1 = GATConv(in_features, hidden_dim, \n                           heads=heads, dropout=dropout)\n        self.gat2 = GATConv(hidden_dim * heads, out_features, \n                           heads=1, concat=False, dropout=dropout)\n        \n    def forward(self, x, edge_index):\n        x = F.dropout(x, p=0.6, training=self.training)\n        x = self.gat1(x, edge_index)\n        x = F.elu(x)\n        x = F.dropout(x, p=0.6, training=self.training)\n        x = self.gat2(x, edge_index)\n        return x</code></pre>\n        \n        <h4>3. Graph Generation and Autoencoders</h4>\n        <pre><code>class GraphVAE(nn.Module):\n    \"\"\"Variational Autoencoder for graph generation\"\"\"\n    def __init__(self, max_nodes, node_features, \n                 hidden_dim, latent_dim):\n        super().__init__()\n        \n        # Encoder\n        self.encoder = GNNModel(node_features, hidden_dim, \n                               hidden_dim)\n        self.mu_linear = nn.Linear(hidden_dim, latent_dim)\n        self.logvar_linear = nn.Linear(hidden_dim, latent_dim)\n        \n        # Decoder\n        self.decoder = nn.Sequential(\n            nn.Linear(latent_dim, hidden_dim),\n            nn.ReLU(),\n            nn.Linear(hidden_dim, max_nodes * max_nodes)\n        )\n        \n    def encode(self, x, edge_index):\n        h = self.encoder(x, edge_index)\n        return self.mu_linear(h), self.logvar_linear(h)\n        \n    def reparameterize(self, mu, logvar):\n        std = torch.exp(0.5 * logvar)\n        eps = torch.randn_like(std)\n        return mu + eps * std\n        \n    def decode(self, z):\n        adj_logits = self.decoder(z)\n        return torch.sigmoid(adj_logits)\n        \n    def forward(self, x, edge_index):\n        mu, logvar = self.encode(x, edge_index)\n        z = self.reparameterize(mu, logvar)\n        adj_recon = self.decode(z)\n        return adj_recon, mu, logvar\n\n# Graph similarity learning\nclass GraphMatchingNetwork(nn.Module):\n    def __init__(self, gnn):\n        super().__init__()\n        self.gnn = gnn\n        self.similarity = nn.CosineSimilarity(dim=1)\n        \n    def forward(self, graph1, graph2):\n        emb1 = self.gnn(graph1.x, graph1.edge_index)\n        emb2 = self.gnn(graph2.x, graph2.edge_index)\n        \n        # Multi-perspective matching\n        similarity = self.similarity(emb1, emb2)\n        return similarity</code></pre>\n        \n        <h4>4. Applications and Considerations</h4>\n        <ul>\n            <li><strong>Dynamic Graphs:</strong> Temporal GNNs for evolving networks</li>\n            <li><strong>Heterogeneous Graphs:</strong> Meta-paths and relation-aware attention</li>\n            <li><strong>Scalability:</strong> Graph sampling techniques (GraphSAGE, Cluster-GCN)</li>\n            <li><strong>Explainability:</n></li>\n        </ul>\n      "
    }
],
    questions: [
            {
                number: 1,
                difficulty: "easy",
                question: "A dataset of employee salaries has a mean of $65,000 and a standard deviation of $12,000. What percentage of employees earn between $53,000 and $77,000?",
                context: "Assume the salary distribution is approximately normal.",
                answer: `
                    <h4>Solution:</h4>
                    <p>$53,000 and $77,000 are exactly 1 standard deviation below and above the mean:</p>
                    <ul>
                        <li>$65,000 - $12,000 = $53,000 (1 SD below)</li>
                        <li>$65,000 + $12,000 = $77,000 (1 SD above)</li>
                    </ul>
                    
                    <p><strong>Answer: 68%</strong></p>
                    
                    <h4>Explanation:</h4>
                    <p>According to the 68-95-99.7 rule (empirical rule) for normal distributions:</p>
                    <ul>
                        <li>68% of data falls within 1 standard deviation of the mean</li>
                        <li>95% within 2 standard deviations</li>
                        <li>99.7% within 3 standard deviations</li>
                    </ul>
                    
                    <h4>Why This Matters:</h4>
                    <p>Understanding this rule helps quickly estimate probabilities and identify outliers without complex calculations.</p>
                `
            },
            {
                number: 2,
                difficulty: "medium",
                question: "You're running an A/B test for two email campaigns. Campaign A has a 5% click-through rate (1000 emails sent), Campaign B has a 6.5% click-through rate (1000 emails sent). The p-value is 0.08. Should you roll out Campaign B?",
                context: "Use a significance level of α = 0.05",
                answer: `
                    <h4>Solution:</h4>
                    <p><strong>No, you should NOT roll out Campaign B yet.</strong></p>
                    
                    <h4>Reasoning:</h4>
                    <ul>
                        <li>P-value (0.08) > Significance level (0.05)</li>
                        <li>We fail to reject the null hypothesis</li>
                        <li>The difference could be due to random chance</li>
                        <li>Not enough statistical evidence that B is truly better</li>
                    </ul>
                    
                    <h4>What to Do:</h4>
                    <ol>
                        <li>Continue the test with more samples to increase statistical power</li>
                        <li>Consider if the 1.5% improvement is practically significant for your business</li>
                        <li>Look at other metrics (conversion rate, revenue) not just click-through</li>
                    </ol>
                    
                    <h4>Business Implication:</h4>
                    <p>Making decisions on insufficient evidence can lead to wasted resources. A p-value of 0.08 means there's an 8% chance the observed difference is due to random variation - too risky for most business decisions.</p>
                    
                    <h4>Pro Tip:</h4>
                    <p>Always determine your required sample size BEFORE running the test using power analysis to avoid this situation.</p>
                `
            },
            {
                number: 3,
                difficulty: "easy",
                question: "Calculate the median of this dataset: [12, 15, 18, 20, 22, 25, 30]",
                context: "The median is the middle value when data is sorted.",
                answer: `<h4>Solution:</h4><p><strong>Answer: 20</strong></p><p>With 7 values (odd number), the median is the 4th value (middle position): 20</p>`
            },
            {
                number: 4,
                difficulty: "easy",
                question: "What is the probability of rolling a sum of 7 with two fair dice?",
                context: "Consider all possible combinations.",
                answer: `<h4>Solution:</h4><p><strong>Answer: 6/36 = 1/6 ≈ 16.67%</strong></p><p>Combinations that sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes out of 36 total possible outcomes.</p>`
            },
            {
                number: 5,
                difficulty: "medium",
                question: "A company's daily sales follow a normal distribution with mean $10,000 and standard deviation $2,000. What's the probability of sales exceeding $14,000 on a given day?",
                context: "Use z-score and standard normal distribution.",
                answer: `<h4>Solution:</h4><p>Z-score = (14000 - 10000) / 2000 = 2</p><p>P(Z > 2) ≈ 0.0228 or <strong>2.28%</strong></p><p>About 2.3% of days will have sales exceeding $14,000.</p>`
            },
            {
                number: 6,
                difficulty: "easy",
                question: "What's the difference between correlation and causation?",
                context: "Explain with a business example.",
                answer: `<h4>Answer:</h4><p><strong>Correlation</strong> means two variables move together. <strong>Causation</strong> means one variable directly causes changes in another.</p><p><strong>Example:</strong> Ice cream sales and drowning deaths are correlated (both increase in summer), but ice cream doesn't cause drowning. The common cause is warm weather.</p>`
            },
            {
                number: 7,
                difficulty: "medium",
                question: "Calculate the variance of: [5, 10, 15, 20, 25]",
                context: "Variance measures spread of data.",
                answer: `<h4>Solution:</h4><p>Mean = 15</p><p>Variance = [(5-15)² + (10-15)² + (15-15)² + (20-15)² + (25-15)²] / 5</p><p>= [100 + 25 + 0 + 25 + 100] / 5 = 250 / 5 = <strong>50</strong></p>`
            },
            {
                number: 8,
                difficulty: "hard",
                question: "A website has a 2% conversion rate. You implement a change and observe 25 conversions out of 1000 visitors (2.5%). Is this improvement statistically significant at α = 0.05?",
                context: "Use a one-proportion z-test.",
                answer: `<h4>Solution:</h4><p>H₀: p = 0.02, H₁: p > 0.02</p><p>z = (0.025 - 0.02) / √(0.02 × 0.98 / 1000) ≈ 1.13</p><p>Critical value at α = 0.05 (one-tailed) = 1.645</p><p><strong>Result: NOT significant</strong> (z < 1.645). Need more data or larger sample size.</p>`
            },
            {
                number: 9,
                difficulty: "easy",
                question: "What is a Type I error in hypothesis testing?",
                context: "Relate to business decision-making.",
                answer: `<h4>Answer:</h4><p><strong>Type I Error (False Positive):</strong> Rejecting a true null hypothesis.</p><p><strong>Business Example:</strong> Concluding a new feature improves user engagement when it actually doesn't, leading to wasted development resources.</p>`
            },
            {
                number: 10,
                difficulty: "medium",
                question: "In a dataset, Q1 = 25 and Q3 = 45. Calculate the interquartile range (IQR) and identify the outlier boundaries.",
                context: "Use the 1.5 × IQR rule.",
                answer: `<h4>Solution:</h4><p>IQR = Q3 - Q1 = 45 - 25 = <strong>20</strong></p><p>Lower boundary = Q1 - 1.5 × IQR = 25 - 30 = -5</p><p>Upper boundary = Q3 + 1.5 × IQR = 45 + 30 = <strong>75</strong></p><p>Values below -5 or above 75 are outliers.</p>`
            },
            {
                number: 11,
                difficulty: "easy",
                question: "What does a p-value of 0.03 mean?",
                context: "Interpret in plain language.",
                answer: `<h4>Answer:</h4><p>A p-value of 0.03 means there's a <strong>3% probability</strong> of observing results as extreme as (or more extreme than) what we observed, assuming the null hypothesis is true.</p><p>At α = 0.05, this is statistically significant, suggesting the null hypothesis should be rejected.</p>`
            },
            {
                number: 12,
                difficulty: "medium",
                question: "A regression model has R² = 0.75. What does this tell you?",
                context: "Interpret the coefficient of determination.",
                answer: `<h4>Answer:</h4><p>R² = 0.75 means <strong>75% of the variance</strong> in the dependent variable is explained by the independent variable(s) in the model.</p><p>This indicates a strong relationship, but 25% of variance remains unexplained by the model.</p>`
            },
            {
                number: 13,
                difficulty: "hard",
                question: "You have two groups: Group A (n=50, mean=100, SD=15) and Group B (n=50, mean=110, SD=15). Conduct a two-sample t-test at α = 0.05.",
                context: "Assume equal variances.",
                answer: `<h4>Solution:</h4><p>Pooled SD = 15, SE = 15 × √(1/50 + 1/50) ≈ 3</p><p>t = (110 - 100) / 3 ≈ 3.33</p><p>df = 98, critical value ≈ 1.98</p><p><strong>Result: Significant</strong> (t > 1.98). Group B has significantly higher mean than Group A.</p>`
            },
            {
                number: 14,
                difficulty: "easy",
                question: "Calculate the range of: [8, 12, 15, 20, 25, 30]",
                context: "Range is the simplest measure of spread.",
                answer: `<h4>Solution:</h4><p>Range = Maximum - Minimum = 30 - 8 = <strong>22</strong></p>`
            },
            {
                number: 15,
                difficulty: "medium",
                question: "What sample size is needed to estimate a population proportion with 95% confidence and 3% margin of error? Assume p = 0.5.",
                context: "Use the sample size formula for proportions.",
                answer: `<h4>Solution:</h4><p>n = (Z² × p × (1-p)) / E²</p><p>n = (1.96² × 0.5 × 0.5) / 0.03² ≈ <strong>1068</strong></p><p>Need approximately 1,068 samples.</p>`
            },
            {
                number: 16,
                difficulty: "easy",
                question: "What is the mode of: [5, 7, 7, 9, 11, 11, 11, 13]?",
                context: "Mode is the most frequently occurring value.",
                answer: `<h4>Solution:</h4><p><strong>Answer: 11</strong></p><p>11 appears 3 times, more than any other value.</p>`
            },
            {
                number: 17,
                difficulty: "medium",
                question: "A confidence interval for average customer spend is [$45, $55]. What does this mean?",
                context: "Interpret the 95% confidence interval.",
                answer: `<h4>Answer:</h4><p>We are <strong>95% confident</strong> that the true population mean of customer spend falls between $45 and $55.</p><p>If we repeated this study 100 times, about 95 of the intervals would contain the true mean.</p>`
            },
            {
                number: 18,
                difficulty: "hard",
                question: "Calculate Pearson correlation coefficient for: X=[1,2,3,4,5], Y=[2,4,5,4,5]",
                context: "Measure linear relationship strength.",
                answer: `<h4>Solution:</h4><p>After calculations: r ≈ <strong>0.775</strong></p><p>This indicates a strong positive linear relationship between X and Y.</p>`
            },
            {
                number: 19,
                difficulty: "easy",
                question: "What's the probability of getting at least one head in 3 coin flips?",
                context: "Use complement rule.",
                answer: `<h4>Solution:</h4><p>P(at least 1 head) = 1 - P(no heads) = 1 - (1/2)³ = 1 - 1/8 = <strong>7/8 = 87.5%</strong></p>`
            },
            {
                number: 20,
                difficulty: "medium",
                question: "Explain the Central Limit Theorem and its importance in data analysis.",
                context: "Why can we use normal distribution for many analyses?",
                answer: `<h4>Answer:</h4><p>The CLT states that the sampling distribution of the mean approaches a normal distribution as sample size increases, <strong>regardless of the population's distribution</strong>.</p><p><strong>Importance:</strong> Allows us to use normal distribution methods for hypothesis testing and confidence intervals even when population isn't normal, provided n ≥ 30.</p>`
            },
            {
                number: 21,
                difficulty: "easy",
                question: "What is standard error?",
                context: "How does it differ from standard deviation?",
                answer: `<h4>Answer:</h4><p><strong>Standard Error (SE)</strong> measures the variability of a sample statistic (like the mean) across different samples.</p><p>SE = SD / √n</p><p>While SD measures spread within one sample, SE measures how much sample means vary from the population mean.</p>`
            },
            {
                number: 22,
                difficulty: "medium",
                question: "A dataset is right-skewed. Which measure of central tendency is most appropriate: mean or median?",
                context: "Consider the effect of outliers.",
                answer: `<h4>Answer:</h4><p><strong>Median</strong> is more appropriate for skewed data.</p><p>In right-skewed data, the mean is pulled higher by extreme values, making it less representative. The median is resistant to outliers and better represents the "typical" value.</p>`
            },
            {
                number: 23,
                difficulty: "hard",
                question: "You're testing if a new checkout process reduces cart abandonment. Current rate: 70%. New process: 65% (n=500). Is this significant at α = 0.05?",
                context: "Use two-proportion z-test.",
                answer: `<h4>Solution:</h4><p>z = (0.70 - 0.65) / √[0.675 × 0.325 × (1/500 + 1/500)] ≈ 1.69</p><p>Critical value (two-tailed) = 1.96</p><p><strong>Result: NOT significant</strong> (z < 1.96). The 5% reduction could be due to chance.</p>`
            },
            {
                number: 24,
                difficulty: "easy",
                question: "What is statistical power?",
                context: "Relate to Type II error.",
                answer: `<h4>Answer:</h4><p><strong>Statistical Power</strong> is the probability of correctly rejecting a false null hypothesis (detecting an effect when it exists).</p><p>Power = 1 - P(Type II Error)</p><p>Typically aim for 80% power. Higher power means better ability to detect real effects.</p>`
            },
            {
                number: 25,
                difficulty: "medium",
                question: "Calculate the coefficient of variation for: Mean = $50, SD = $10",
                context: "CV allows comparison of variability across different scales.",
                answer: `<h4>Solution:</h4><p>CV = (SD / Mean) × 100% = (10 / 50) × 100% = <strong>20%</strong></p><p>This means the standard deviation is 20% of the mean, indicating moderate variability.</p>`
            },
            {
                number: 26,
                difficulty: "easy",
                question: "What does it mean if two events are mutually exclusive?",
                context: "Give a business example.",
                answer: `<h4>Answer:</h4><p><strong>Mutually exclusive events</strong> cannot occur simultaneously.</p><p><strong>Example:</strong> A customer either completes a purchase or abandons their cart - they can't do both at the same time.</p>`
            },
            {
                number: 27,
                difficulty: "medium",
                question: "Explain what a 95% confidence level means in repeated sampling.",
                context: "Common misconception clarification.",
                answer: `<h4>Answer:</h4><p>If we repeated our study many times and calculated a 95% CI each time, approximately <strong>95% of those intervals would contain the true population parameter</strong>.</p><p><strong>NOT:</strong> "There's a 95% chance the true value is in this specific interval" (the parameter is fixed, not random).</p>`
            },
            {
                number: 28,
                difficulty: "hard",
                question: "A linear regression gives: Sales = 1000 + 50×(Ad_Spend). If ad spend increases by $100, what's the predicted sales increase?",
                context: "Interpret the regression coefficient.",
                answer: `<h4>Solution:</h4><p>The coefficient 50 means for every $1 increase in ad spend, sales increase by $50.</p><p>For $100 increase: 50 × 100 = <strong>$5,000</strong> predicted sales increase.</p>`
            },
            {
                number: 29,
                difficulty: "easy",
                question: "What is a null hypothesis?",
                context: "Explain in context of A/B testing.",
                answer: `<h4>Answer:</h4><p>The <strong>null hypothesis (H₀)</strong> is the default assumption that there is no effect or no difference.</p><p><strong>A/B Test Example:</strong> H₀: "The new website design has no effect on conversion rate" (conversion rates are equal).</p>`
            },
            {
                number: 30,
                difficulty: "medium",
                question: "What's the difference between one-tailed and two-tailed tests? When would you use each?",
                context: "Consider directionality of hypotheses.",
                answer: `<h4>Answer:</h4><p><strong>One-tailed:</strong> Tests if parameter is greater than OR less than a value (directional).</p><p><strong>Two-tailed:</strong> Tests if parameter is different from a value (non-directional).</p><p><strong>Use one-tailed</strong> when you only care about change in one direction (e.g., "Does this increase sales?"). <strong>Use two-tailed</strong> when any difference matters (more conservative, generally preferred).</p>`
            },
            {
                number: 31,
                difficulty: "easy",
                question: "Calculate the probability of drawing a red card from a standard deck.",
                context: "Standard deck has 52 cards, 26 red.",
                answer: `<h4>Solution:</h4><p>P(Red) = 26/52 = <strong>1/2 = 50%</strong></p>`
            },
            {
                number: 32,
                difficulty: "medium",
                question: "A dataset has mean = 100 and median = 85. What does this tell you about the distribution?",
                context: "Consider the relationship between mean and median.",
                answer: `<h4>Answer:</h4><p>The distribution is <strong>right-skewed (positively skewed)</strong>.</p><p>When mean > median, there are high-value outliers pulling the mean upward. The median (85) better represents the typical value.</p>`
            },
            {
                number: 33,
                difficulty: "hard",
                question: "Calculate the expected value of a game where you win $100 with 10% probability, $50 with 30% probability, and lose $20 with 60% probability.",
                context: "Should you play this game?",
                answer: `<h4>Solution:</h4><p>E(X) = (100 × 0.10) + (50 × 0.30) + (-20 × 0.60)</p><p>= 10 + 15 - 12 = <strong>$13</strong></p><p><strong>Yes, play!</strong> Expected value is positive ($13 per game on average).</p>`
            },
            {
                number: 34,
                difficulty: "medium",
                question: "What is the law of large numbers and why is it important?",
                context: "Relate to business forecasting.",
                answer: `<h4>Answer:</h4><p>The <strong>Law of Large Numbers</strong> states that as sample size increases, the sample mean converges to the population mean.</p><p><strong>Business Importance:</strong> Larger datasets give more reliable estimates. A conversion rate from 10,000 visitors is more trustworthy than from 100 visitors.</p>`
            },
            {
                number: 35,
                difficulty: "hard",
                question: "You run 20 A/B tests at α = 0.05. What's the probability of at least one false positive (Type I error)?",
                context: "Multiple testing problem.",
                answer: `<h4>Solution:</h4><p>P(at least 1 false positive) = 1 - P(no false positives)</p><p>= 1 - (0.95)²⁰ ≈ 1 - 0.358 = <strong>64.2%</strong></p><p><strong>Implication:</strong> With multiple tests, use Bonferroni correction (α/n) or other methods to control family-wise error rate.</p>`
            },
            {
                number: 36,
                difficulty: "hard",
                question: "A factory produces items with 2% defect rate. In a sample of 50 items, what is the probability of exactly 2 defectives?",
                context: "Use binomial distribution: P(X=k) = C(n,k) × p^k × (1-p)^(n-k)",
                answer: `<h4>Solution:</h4><p>Using binomial distribution with n=50, p=0.02:</p><p>P(X=2) = C(50,2) × (0.02)² × (0.98)⁴⁸</p><p>C(50,2) = 1225</p><p>P(X=2) = 1225 × 0.0004 × 0.3812 ≈ <strong>0.1858 or 18.58%</strong></p>`
            },
            {
                number: 37,
                difficulty: "hard",
                question: "Test scores are normally distributed with mean=75, standard deviation=8. What percentage of students scored above 85?",
                context: "Use z-score: z = (x - μ) / σ and standard normal distribution table",
                answer: `<h4>Solution:</h4><p>z = (85 - 75) / 8 = 1.25</p><p>P(Z > 1.25) = 1 - 0.8944 = 0.1056</p><p><strong>Answer: 10.56% of students scored above 85</strong></p><h4>Interpretation:</h4><p>Only about 1 in 10 students scored above 85 in this normally distributed test.</p>`
            },
            {
                number: 38,
                difficulty: "hard",
                question: "A sample of 36 students has mean score 82 with standard deviation 12. Construct a 95% confidence interval for the population mean.",
                context: "Use t-distribution with df = n-1 = 35, t-value at 0.025 is approximately 2.030",
                answer: `<h4>Solution:</h4><p>Using t-distribution with df=35, t₀.₀₂₅ ≈ 2.030</p><p>Standard Error = s / √n = 12 / √36 = 12 / 6 = 2</p><p>CI = 82 ± 2.030 × 2 = 82 ± 4.06</p><p><strong>95% CI = [77.94, 86.06]</strong></p><h4>Interpretation:</h4><p>We are 95% confident that the true population mean lies between 77.94 and 86.06.</p>`
            },
            {
                number: 39,
                difficulty: "hard",
                question: "A company claims average battery life ≥ 100 hours. A sample of 40 batteries has mean=98 hours, std dev=8. Test at α=0.05 if the claim is valid.",
                context: "One-tailed hypothesis test: H₀: μ ≥ 100 vs H₁: μ < 100",
                answer: `<h4>Solution:</h4><p><strong>Step 1:</strong> H₀: μ ≥ 100, H₁: μ < 100 (left-tailed)</p><p><strong>Step 2:</strong> α = 0.05, df = 39, critical value ≈ -1.685</p><p><strong>Step 3:</strong> t = (98 - 100) / (8 / √40) = -2 / 1.265 ≈ <strong>-1.581</strong></p><p><strong>Step 4:</strong> Since t = -1.581 > -1.685, we fail to reject H₀</p><p><strong>Step 5:</strong> <strong>Conclusion:</strong> Insufficient evidence to reject the company's claim at α=0.05 level.</p>`
            },
            {
                number: 40,
                difficulty: "hard",
                question: "Two machines produce components. Machine A: n₁=50, mean=12.3mm, s₁=0.5mm. Machine B: n₂=60, mean=12.1mm, s₂=0.6mm. Test if means differ at α=0.01.",
                context: "Two-sample t-test assuming equal variances",
                answer: `<h4>Solution:</h4><p><strong>H₀:</strong> μ₁ = μ₂, <strong>H₁:</strong> μ₁ ≠ μ₂ (two-tailed)</p><p><strong>Pooled variance:</strong> s_p² = [(49×0.25 + 59×0.36)] / 108 = 0.3101</p><p><strong>Pooled std dev:</strong> s_p = 0.5569</p><p><strong>Test statistic:</strong> t = (12.3 - 12.1) / [0.5569 × √(1/50 + 1/60)] ≈ <strong>1.876</strong></p><p><strong>Critical value:</strong> ±2.624 (df=108, α=0.01)</p><p><strong>Conclusion:</strong> Since |1.876| < 2.624, <strong>fail to reject H₀.</strong> No significant difference in means between machines.</p>`
            },
            {
                number: 41,
                difficulty: "medium",
                question: "Calculate mean, median, mode, and standard deviation for: [4, 8, 6, 5, 3, 8, 9]",
                context: "Basic descriptive statistics calculation",
                answer: `<h4>Solution:</h4><p><strong>Sorted:</strong> [3, 4, 5, 6, 8, 8, 9]</p><p><strong>Mean</strong> = (4+8+6+5+3+8+9)/7 = 43/7 ≈ <strong>6.14</strong></p><p><strong>Median</strong> = <strong>6</strong> (middle value)</p><p><strong>Mode</strong> = <strong>8</strong> (appears twice)</p><p><strong>Variance</strong> = Σ(x-x̄)²/(n-1) ≈ 5.48</p><p><strong>Standard Deviation</strong> = √5.48 ≈ <strong>2.34</strong></p>`
            },
            {
                number: 42,
                difficulty: "medium",
                question: "Find Q1, Q2 (median), Q3, and IQR for: [10, 12, 14, 16, 18, 20, 22, 24, 26]",
                context: "Quartile analysis",
                answer: `<h4>Solution:</h4><p><strong>Ordered data:</strong> [10, 12, 14, 16, 18, 20, 22, 24, 26]</p><p><strong>Q2 (Median)</strong> = <strong>18</strong> (middle value, position 5)</p><p><strong>Lower half:</strong> [10, 12, 14, 16] → <strong>Q1</strong> = (12+14)/2 = <strong>13</strong></p><p><strong>Upper half:</strong> [20, 22, 24, 26] → <strong>Q3</strong> = (22+24)/2 = <strong>23</strong></p><p><strong>IQR</strong> = Q3 - Q1 = 23 - 13 = <strong>10</strong></p><p><strong>Outlier range:</strong> Below 13 - 1.5(10) = -2 or above 23 + 1.5(10) = 38 (no outliers)</p>`
            },
            {
                number: 43,
                difficulty: "hard",
                question: "Compare variability: Stock A has mean=$100, SD=$15. Stock B has mean=$50, SD=$5. Which is more stable?",
                context: "Use coefficient of variation (CV)",
                answer: `<h4>Solution:</h4><p><strong>Stock A:</strong> CV = (15/100) × 100% = <strong>15%</strong></p><p><strong>Stock B:</strong> CV = (5/50) × 100% = <strong>10%</strong></p><p><strong>Conclusion:</strong> <strong>Stock B is more stable</strong> (lower CV) despite smaller absolute standard deviation.</p><p><strong>Key Insight:</strong> Always use CV when comparing variability across different scales or units. Stock A is riskier because each dollar is 15% volatile, while Stock B is only 10% volatile.</p>`
            },
            {
                number: 44,
                difficulty: "medium",
                question: "A dataset has mean=50, SD=10. Using the empirical rule, what percentage of data lies between 40 and 60?",
                context: "Normal distribution empirical rule (68-95-99.7 rule)",
                answer: `<h4>Solution:</h4><p><strong>Range [40, 60] represents [μ - 1σ, μ + 1σ]</strong> (since μ=50, σ=10)</p><p>According to the 68-95-99.7 rule for normal distributions:</p><ul><li>68% within 1 standard deviation</li><li>95% within 2 standard deviations</li><li>99.7% within 3 standard deviations</li></ul><p><strong>Answer: 68% of data</strong> lies between 40 and 60 (in a normally distributed dataset).</p>`
            },
            {
                number: 45,
                difficulty: "hard",
                question: "A one-sample t-test on a sample of 25 items against a hypothesized mean of 100 yields t=2.5. At α=0.05, what is your conclusion?",
                context: "Degrees of freedom = 24, critical t ≈ 2.064 (two-tailed)",
                answer: `<h4>Solution:</h4><p><strong>Given:</strong> t-statistic = 2.5, df = 24, α = 0.05 (two-tailed)</p><p><strong>Critical value:</strong> t₀.₀₂₅,₂₄ ≈ <strong>2.064</strong></p><p><strong>Comparison:</strong> |2.5| > 2.064</p><p><strong>Decision:</strong> Since the test statistic exceeds the critical value, we <strong>reject H₀</strong>.</p><p><strong>Conclusion:</strong> The sample mean is significantly different from 100 at the 0.05 significance level (p < 0.05).</p>`
            },
            {
                number: 46,
                difficulty: "medium",
                question: "A researcher wants to estimate the average height of college students. Define the population, sample, parameter, and statistic for this study.",
                context: "Statistical terminology and concepts",
                answer: `<h4>Solution:</h4><ul><li><strong>Population:</strong> All college students (entire group of interest)</li><li><strong>Sample:</strong> The subset of college students actually measured</li><li><strong>Parameter:</strong> The true average height of all college students (unknown)</li><li><strong>Statistic:</strong> The average height calculated from the sample (known, computed value)</li></ul><p><strong>Key Point:</strong> We use the statistic to estimate the parameter.</p>`
            },
            {
                number: 47,
                difficulty: "medium",
                question: "Compare the geometric mean and arithmetic mean for growth rates: 1.05, 1.08, 1.12 (representing 5%, 8%, 12% growth over 3 years)",
                context: "Geometric mean for compound growth",
                answer: `<h4>Solution:</h4><p><strong>Geometric Mean:</strong> GM = (1.05 × 1.08 × 1.12)^(1/3) = (1.2668)^(1/3) ≈ 1.0814 or 8.14% average annual growth</p><p><strong>Arithmetic Mean:</strong> (1.05 + 1.08 + 1.12) / 3 = 1.0833 or 8.33%</p><p><strong>Key Insight:</strong> For compound growth rates, use geometric mean (it's lower and more accurate). The difference becomes significant with more extreme values.</p>`
            },
            {
                number: 48,
                difficulty: "hard",
                question: "Dataset: [2, 4, 4, 4, 5, 5, 7, 9]. Identify the mean, median, mode, range, variance, SD, and quartiles. Identify any outliers.",
                context: "Complete descriptive statistics analysis",
                answer: `<h4>Calculations:</h4><ul><li><strong>Mean:</strong> (2+4+4+4+5+5+7+9)/8 = 40/8 = 5</li><li><strong>Median:</strong> (4+5)/2 = 4.5 (average of middle two values)</li><li><strong>Mode:</strong> 4 (appears 3 times)</li><li><strong>Range:</strong> 9 - 2 = 7</li><li><strong>Variance:</strong> Σ(x-5)² / 7 = 40/7 ≈ 5.71</li><li><strong>Standard Deviation:</strong> √5.71 ≈ 2.39</li><li><strong>Quartiles:</strong> Q1=4, Q2=4.5, Q3=6, IQR=2</li><li><strong>Outlier bounds:</strong> Below 4-1.5(2)=1 or above 6+1.5(2)=9. Value 9 is borderline but included.</li></ul>`
            },
            {
                number: 49,
                difficulty: "medium",
                question: "A card is drawn from a standard deck. What is P(Red or Face Card)?",
                context: "Addition rule of probability",
                answer: `<h4>Solution:</h4><p><strong>Method 1 (Addition Rule):</strong> P(A∪B) = P(A) + P(B) - P(A∩B)</p><ul><li>P(Red) = 26/52 = 0.5</li><li>P(Face Card) = 12/52 (3 face cards per suit × 4 suits)</li><li>P(Red AND Face Card) = 6/52 (3 face cards × 2 red suits)</li><li>P(Red OR Face) = 26/52 + 12/52 - 6/52 = 32/52 = 8/13 ≈ 0.615</li></ul><p><strong>Method 2 (Counting):</strong> Red cards (26) + Black Face cards (6) = 32/52 = 8/13</p>`
            },
            {
                number: 50,
                difficulty: "hard",
                question: "A disease affects 1% of the population. A test is 99% accurate (sensitivity and specificity). If someone tests positive, what's the probability they actually have the disease? (Use Bayes' Theorem)",
                context: "Bayes' theorem application in medical testing",
                answer: `<h4>Solution (Bayes' Theorem):</h4><p>P(Disease|Positive) = [P(Positive|Disease) × P(Disease)] / P(Positive)</p><ul><li>P(Disease) = 0.01</li><li>P(No Disease) = 0.99</li><li>P(Positive|Disease) = 0.99 (sensitivity)</li><li>P(Positive|No Disease) = 0.01 (1-specificity)</li><li>P(Positive) = 0.99×0.01 + 0.01×0.99 = 0.0198</li><li>P(Disease|Positive) = (0.99 × 0.01) / 0.0198 ≈ 0.50 or 50%</li></ul><p><strong>Surprising Result:</strong> Only 50% probability despite 99% accurate test! This is because the disease is rare.</p>`
            },
            {
                number: 51,
                difficulty: "hard",
                question: "A manufacturer finds defects at 3% rate. In a batch of 100 items, what's the probability of at least 5 defects? (Binomial distribution)",
                context: "Binomial cumulative probability",
                answer: `<h4>Solution:</h4><p>n=100, p=0.03, find P(X ≥ 5)</p><p><strong>Method:</strong> P(X ≥ 5) = 1 - P(X ≤ 4) = 1 - [P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)]</p><p><strong>Using Binomial calculations:</strong></p><ul><li>P(X=0) ≈ 0.0476, P(X=1) ≈ 0.1471, P(X=2) ≈ 0.2252, P(X=3) ≈ 0.2274, P(X=4) ≈ 0.1704</li><li>P(X ≤ 4) ≈ 0.7777</li></ul><p><strong>Answer:</strong> P(X ≥ 5) ≈ 0.2223 or 22.23%</p>`
            },
            {
                number: 52,
                difficulty: "medium",
                question: "Test scores follow normal distribution with μ=75, σ=10. What score represents the 90th percentile?",
                context: "Normal distribution inverse calculation",
                answer: `<h4>Solution:</h4><p>Find x where P(X ≤ x) = 0.90</p><p><strong>Using z-scores:</strong> From z-table, z₀.₉₀ ≈ 1.28</p><p><strong>Transform back to original scale:</strong> x = μ + z×σ = 75 + 1.28×10 = 75 + 12.8 = <strong>87.8</strong></p><p><strong>Interpretation:</strong> A score of 87.8 is at the 90th percentile, meaning 90% of students scored at or below this.</p>`
            },
            {
                number: 53,
                difficulty: "hard",
                question: "A random sample of 64 students has average GPA of 3.2 with SD=0.8. Construct a 99% CI for the population mean GPA.",
                context: "Confidence interval with t-distribution or z-distribution",
                answer: `<h4>Solution:</h4><p>n=64 (large sample, can use z), x̄=3.2, s=0.8, confidence=99%</p><p><strong>For 99% CI:</strong> z₀.₀₀₅ ≈ 2.576</p><p><strong>Standard Error:</strong> SE = 0.8 / √64 = 0.8 / 8 = 0.1</p><p><strong>Margin of Error:</strong> ME = 2.576 × 0.1 = 0.2576</p><p><strong>CI:</strong> 3.2 ± 0.2576 = [2.94, 3.46]</p><p><strong>Interpretation:</strong> We are 99% confident the true population mean GPA is between 2.94 and 3.46.</p>`
            },
            {
                number: 54,
                difficulty: "hard",
                question: "A manufacturer claims light bulbs last 1000 hours. A sample of 25 bulbs averages 950 hours with SD=100. Test at α=0.05 if the claim is accurate (two-tailed).",
                context: "Two-sample t-test hypothesis testing",
                answer: `<h4>Solution:</h4><p><strong>Step 1:</strong> H₀: μ = 1000, H₁: μ ≠ 1000</p><p><strong>Step 2:</strong> α = 0.05, df = 24</p><p><strong>Step 3:</strong> t = (950 - 1000) / (100 / √25) = -50 / 20 = <strong>-2.5</strong></p><p><strong>Step 4:</strong> Critical values (two-tailed, df=24): ±2.064</p><p><strong>Step 5:</strong> Since |−2.5| > 2.064, <strong>reject H₀</strong></p><p><strong>Conclusion:</strong> At the 0.05 level, there is significant evidence that bulbs do not last 1000 hours on average; they last less.</p>`
            },
            {
                number: 55,
                difficulty: "hard",
                question: "Calculate Pearson's correlation coefficient for: X=[1,2,3,4,5], Y=[2,4,5,4,6]",
                context: "Correlation analysis and relationship strength",
                answer: `<h4>Solution Using Correlation Formula:</h4><p>r = [nΣxy - ΣxΣy] / √{[nΣx²-(Σx)²][nΣy²-(Σy)²]}</p><p><strong>Calculations:</strong></p><ul><li>n=5, ΣX=15, ΣY=21, ΣX²=55, ΣY²=97, ΣXY=71</li><li>Numerator: 5(71) - 15(21) = 355 - 315 = 40</li><li>Denominator: √{[275-225][485-441]} = √{[50][44]} = √2200 ≈ 46.9</li><li>r ≈ 40 / 46.9 ≈ <strong>0.85</strong></li></ul><p><strong>Interpretation:</strong> Strong positive correlation (0.85). As X increases, Y tends to increase.</p>`
            },
            {
                number: 56,
                difficulty: "medium",
                question: "Example 1 - Basic Calculations: Calculate mean, median, mode, variance, and standard deviation for: [4, 8, 6, 5, 3, 8, 9]",
                context: "Worked example from statistics library - descriptive statistics",
                answer: `<h4>Solution - Step by Step:</h4><p><strong>Data:</strong> [4, 8, 6, 5, 3, 8, 9]</p><p><strong>Mean:</strong> (4+8+6+5+3+8+9)/7 = 43/7 ≈ <strong>6.14</strong></p><p><strong>Median:</strong> Sorted: [3,4,5,6,8,8,9] → Middle value = <strong>6</strong></p><p><strong>Mode:</strong> <strong>8</strong> (appears twice, others once)</p><p><strong>Variance (Sample):</strong> Sum of squared deviations / (n-1) ≈ <strong>4.81</strong></p><p><strong>Standard Deviation:</strong> √4.81 ≈ <strong>2.19</strong></p><h4>Interpretation:</h4><p>The average value is 6.14, with typical spread of ±2.19 from the mean. The data is symmetric around median of 6.</p>`
            },
            {
                number: 57,
                difficulty: "hard",
                question: "Example 2 - Binomial Distribution: A manufacturing process produces 2% defects. If 50 items are inspected, what's the probability of exactly 2 defects? What's the probability of at least 2 defects?",
                context: "Worked example from statistics library - binomial probability",
                answer: `<h4>Solution - Binomial Distribution:</h4><p><strong>Given:</strong> n=50, k=2, p=0.02 (2% defect rate)</p><h4>Part A: P(X = 2) using Binomial Formula</h4><p>P(X=k) = C(n,k) × p^k × (1-p)^(n-k)</p><p>P(X=2) = C(50,2) × (0.02)² × (0.98)⁴⁸</p><p><strong>Calculation:</strong></p><ul><li>C(50,2) = 1,225</li><li>(0.02)² = 0.0004</li><li>(0.98)⁴⁸ ≈ 0.3814</li><li>P(X=2) = 1,225 × 0.0004 × 0.3814 ≈ <strong>0.1858 or 18.58%</strong></li></ul><h4>Part B: P(X ≥ 2) = 1 - P(X ≤ 1)</h4><p>P(X ≥ 2) = 1 - [P(X=0) + P(X=1)]</p><ul><li>P(X=0) ≈ 0.3642</li><li>P(X=1) ≈ 0.3716</li><li>P(X ≥ 2) = 1 - 0.7358 ≈ <strong>0.2642 or 26.42%</strong></li></ul><h4>Interpretation:</h4><p>There's ~19% chance of exactly 2 defects and ~26% chance of 2 or more defects in 50 items.</p>`
            },
            {
                number: 58,
                difficulty: "hard",
                question: "Example 3 - Normal Distribution: Exam scores are normally distributed with μ=75 and σ=8. What percentage of students score above 85? What range contains the middle 90% of scores?",
                context: "Worked example from statistics library - normal distribution",
                answer: `<h4>Solution - Normal Distribution Analysis:</h4><p><strong>Given:</strong> μ=75, σ=8, normal distribution</p><h4>Part A: P(X > 85)</h4><p><strong>Step 1:</strong> Calculate z-score: z = (X - μ) / σ = (85 - 75) / 8 = 10/8 = 1.25</p><p><strong>Step 2:</strong> Use standard normal table: P(Z ≤ 1.25) ≈ 0.8944</p><p><strong>Step 3:</strong> P(Z > 1.25) = 1 - 0.8944 = 0.1056 or <strong>10.56%</strong></p><h4>Part B: Range for Middle 90%</h4><p>For 90% in middle, each tail has 5%</p><ul><li>Left critical z-value: -1.645 (5th percentile)</li><li>Right critical z-value: +1.645 (95th percentile)</li></ul><p><strong>Lower bound:</strong> μ - 1.645σ = 75 - (1.645)(8) = 75 - 13.16 = <strong>61.84</strong></p><p><strong>Upper bound:</strong> μ + 1.645σ = 75 + (1.645)(8) = 75 + 13.16 = <strong>88.16</strong></p><h4>Interpretation:</h4><p>About 10.56% of students score above 85, and the middle 90% of scores fall between 61.84 and 88.16.</p>`
            },
            {
                number: 59,
                difficulty: "hard",
                question: "Example 4 - Confidence Intervals: A sample of 36 random students has a mean math score of 82 with standard deviation 12. Construct a 95% confidence interval for the population mean.",
                context: "Worked example from statistics library - confidence intervals",
                answer: `<h4>Solution - 95% Confidence Interval for Population Mean:</h4><p><strong>Given:</strong> n=36, x̄=82, s=12, Confidence level = 95%</p><h4>Step 1: Determine Critical Value</h4><p>Since n=36 > 30, use z-distribution (approximately normal)</p><p>For 95% confidence: z₀.₀₂₅ = <strong>1.96</strong></p><h4>Step 2: Calculate Standard Error</h4><p>SE = s / √n = 12 / √36 = 12 / 6 = <strong>2</strong></p><h4>Step 3: Calculate Margin of Error</h4><p>ME = z × SE = 1.96 × 2 = <strong>3.92</strong></p><h4>Step 4: Construct Confidence Interval</h4><p>CI = x̄ ± ME = 82 ± 3.92</p><p><strong>Lower bound:</strong> 82 - 3.92 = <strong>78.08</strong></p><p><strong>Upper bound:</strong> 82 + 3.92 = <strong>85.92</strong></p><p><strong>95% CI = [78.08, 85.92]</strong> or approximately <strong>[78.08, 86.06]</strong></p><h4>Interpretation:</h4><p>We are 95% confident that the true population mean math score lies between 78.08 and 85.92. If we repeated sampling 100 times, ~95 intervals would contain the true mean.</p>`
            },
            {
                number: 60,
                difficulty: "hard",
                question: "Example 5 - Hypothesis Testing: A battery manufacturer claims batteries last 200 hours. A sample of 16 batteries averaged 190 hours with SD=20. Test at α=0.05 whether the claim is valid (two-tailed).",
                context: "Worked example from statistics library - hypothesis testing",
                answer: `<h4>Solution - Two-Tailed Hypothesis Test:</h4><p><strong>Given:</strong> Claim: μ = 200 hours, n=16, x̄=190, s=20, α=0.05</p><h4>Step 1: Formulate Hypotheses</h4><ul><li>H₀: μ = 200 (manufacturer's claim is true)</li><li>H₁: μ ≠ 200 (claim is not valid) - Two-tailed test</li></ul><h4>Step 2: Identify Test Type and Critical Value</h4><p>Use t-test (population SD unknown, n < 30)</p><p>df = n - 1 = 15</p><p>Critical values (two-tailed, α=0.05): ±<strong>2.131</strong></p><h4>Step 3: Calculate Test Statistic</h4><p>SE = s / √n = 20 / √16 = 20 / 4 = 5</p><p>t = (x̄ - μ₀) / SE = (190 - 200) / 5 = -10 / 5 = <strong>-2.0</strong></p><h4>Step 4: Make Decision</h4><p>|t| = |-2.0| = 2.0 < 2.131 (critical value)</p><p><strong>Fail to reject H₀</strong></p><h4>Step 5: Conclusion</h4><p>At the 0.05 significance level, there is insufficient evidence to reject the manufacturer's claim. The sample evidence does not contradict the claim that batteries last 200 hours.</p>`
            },
            {
                number: 61,
                difficulty: "hard",
                question: "Example 6 - Correlation Analysis: Two variables X=[2,4,6,8,10] and Y=[1,3,5,7,9] have perfect linear relationship. Calculate and interpret the correlation coefficient.",
                context: "Worked example from statistics library - correlation analysis",
                answer: `<h4>Solution - Pearson Correlation Coefficient:</h4><p><strong>Given:</strong> X=[2,4,6,8,10], Y=[1,3,5,7,9]</p><h4>Step 1: Calculate Required Sums</h4><ul><li>n = 5</li><li>ΣX = 2+4+6+8+10 = 30</li><li>ΣY = 1+3+5+7+9 = 25</li><li>ΣXY = 2(1)+4(3)+6(5)+8(7)+10(9) = 2+12+30+56+90 = 190</li><li>ΣX² = 4+16+36+64+100 = 220</li><li>ΣY² = 1+9+25+49+81 = 165</li></ul><h4>Step 2: Apply Correlation Formula</h4><p>r = [nΣXY - ΣXΣY] / √{[nΣX² - (ΣX)²][nΣY² - (ΣY)²]}</p><h4>Step 3: Calculate Numerator</h4><p>nΣXY - ΣXΣY = 5(190) - (30)(25) = 950 - 750 = 200</p><h4>Step 4: Calculate Denominator</h4><p>[nΣX² - (ΣX)²] = 5(220) - (30)² = 1100 - 900 = 200</p><p>[nΣY² - (ΣY)²] = 5(165) - (25)² = 825 - 625 = 200</p><p>√(200 × 200) = √40000 = 200</p><h4>Step 5: Calculate r</h4><p>r = 200 / 200 = <strong>1.0</strong></p><h4>Interpretation:</h4><p>Perfect positive correlation (r = 1.0). For every unit increase in X, Y increases by exactly 1 unit. The relationship is perfectly linear with no scatter.</p>`
            },
            {
                number: 62,
                difficulty: "hard",
                question: "Example 7 - Quartiles and Outliers: Analyze the dataset [2,4,4,4,5,5,7,9] to find Q1, Q2, Q3, IQR, and identify any outliers using the 1.5×IQR rule.",
                context: "Worked example from statistics library - quartile analysis",
                answer: `<h4>Solution - Quartile Analysis and Outlier Detection:</h4><p><strong>Given:</strong> Dataset = [2,4,4,4,5,5,7,9] (already sorted, n=8)</p><h4>Step 1: Find Q2 (Median)</h4><p>Since n=8 (even), median = average of 4th and 5th values</p><p>Q2 = (4 + 5) / 2 = <strong>4.5</strong></p><h4>Step 2: Find Q1 (Median of Lower Half)</h4><p>Lower half: [2, 4, 4, 4] (n=4, even)</p><p>Q1 = (4 + 4) / 2 = <strong>4</strong></p><h4>Step 3: Find Q3 (Median of Upper Half)</h4><p>Upper half: [5, 5, 7, 9] (n=4, even)</p><p>Q3 = (5 + 7) / 2 = <strong>6</strong></p><h4>Step 4: Calculate IQR</h4><p>IQR = Q3 - Q1 = 6 - 4 = <strong>2</strong></p><h4>Step 5: Determine Outlier Boundaries (1.5×IQR Rule)</h4><p>Lower boundary = Q1 - 1.5(IQR) = 4 - 1.5(2) = 4 - 3 = <strong>1</strong></p><p>Upper boundary = Q3 + 1.5(IQR) = 6 + 1.5(2) = 6 + 3 = <strong>9</strong></p><h4>Step 6: Identify Outliers</h4><p>Any value < 1 or > 9 is an outlier</p><p>All values in [2,4,4,4,5,5,7,9] are within [1, 9]</p><p><strong>No outliers detected</strong></p><h4>Complete Summary:</h4><ul><li>Q1 = 4</li><li>Q2 (Median) = 4.5</li><li>Q3 = 6</li><li>IQR = 2</li><li>Outliers: None</li></ul>`
            }
        ]
};

if (typeof window !== "undefined") {
    window.statisticsData = statisticsData;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = statisticsData;
}
