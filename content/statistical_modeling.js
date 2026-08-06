const statisticalModelingData = {
    title: "Statistical Modeling",
    metadata: {
        track: 'data-scientist',
        category: 'Statistics',
        icon: '📐',
        description: "Dive deep into regression, classification, and model evaluation techniques."
    },
    lessons: [
        {
            number: 1,
            title: "Linear Regression: The Workhorse of Modeling",
            content: `Linear regression fits a line (or hyperplane) that best predicts a continuous outcome \`y\` from one or more predictors \`x\`.

**The model:** \`y = β₀ + β₁·x₁ + ... + βₚ·xₚ + ε\`

- **β₀ (intercept):** the expected value of \`y\` when all predictors are 0.
- **βᵢ (coefficients):** the expected change in \`y\` for a one-unit increase in \`xᵢ\`, holding others constant (with OLS simply the slope that minimizes squared errors).
- **ε (error):** the part of \`y\` not explained by the model.

**The fitting flow:**

\`\`\`mermaid
graph LR
    A[Data] --> B[Specify predictors]
    B --> C[Fit OLS / estimate β]
    C --> D[Check assumptions]
    D --> E{Assumptions OK?}
    E -->|Yes| F[Interpret & predict]
    E -->|No| G[Transform / add terms / fix]
    G --> C
\`\`\`

**The 4 core assumptions (LINE):**
1. **Linearity** — the relationship is linear in parameters.
2. **Independence** — errors are independent (no autocorrelation).
3. **Normality** — errors are roughly normally distributed.
4. **Equal variance (homoscedasticity)** — error spread is constant across predictors.
Models violate assumptions every day in practice; the goal is to assess *how much it matters* rather than achieve perfection.`
        },
        {
            number: 2,
            title: "Interpreting Regression Output: R² and Significant Coefficients",
            content: `Reading a fitted model is a core interview and on-the-job skill.

- **R² (coefficient of determination):** the proportion of variance in \`y\` explained by the model. \`R² = 1 - SS_res/SS_tot\`. Values near 1 mean the model explains almost everything; near 0 means it explains almost nothing.
- **Adjusted R²:** penalizes adding predictors that don't help, so it's better for comparing models with different numbers of variables.
- **Coefficient p-value:** the probability of observing a coefficient this large by chance *if the true coefficient were 0*. p < 0.05 is the common "statistically significant" bar.
- **Interpretation in context:** a significant coefficient for \`ads_spend\` by \$1 → expect \`sales\` to rise by \`β\` dollars, *holding other predictors fixed*.

**The causal caution:** a significant, large coefficient is an *association*, not a causal claim. Watch for confounding and reverse causality before you advise a business to spend more.`
        },
        {
            number: 3,
            title: "Logistic Regression for Binary Outcomes",
            content: `When the outcome is a Yes/No, churn/not-churn, or buy/don't-buy, linear regression leaks probabilities below 0 and above 1. Logistic regression fixes that by modeling the **log-odds** with a latent decision process.

**The model:** \`logit(p) = β₀ + β₁·x\`, and \`p = 1 / (1 + e^(-z))\` where \`z = β₀ + β₁·x₁\`.

\`\`\`mermaid
graph LR
    A[Features x] --> Z[Linear combo z = Σ βᵢ xᵢ]
    Z --> S[Sigmoid squashes to 0..1]
    S --> P[Predicted probability p̂]
    P --> D{Threshold 0.5}
    D -->|p̂ ≥ 0.5| C[Class 1]
    D -->|p̂ < 0.5| N[Class 0]
\`\`\`

- **Coefficients here are on the log-odds scale.** Exponentiate (\`e^β\`) to get the **odds ratio**: a one-unit change in the odds of the event.
- The decision boundary (0.5) is arbitrary — tune it toward **precision vs recall** depending on the cost of each error type.
- Evaluate with **log-loss (cross-entropy)**, **AUC-ROC**, and precision/recall, not accuracy alone (especially on imbalanced data).`
        },
        {
            number: 4,
            title: "Hypothesis Testing Review: t-test and Chi-Square",
            content: `Before fitting models, you assess whether differences are real or noise.

**The t-test** compares a sample mean against a benchmark or two groups. In regression, the coefficient's own t-statistic tests whether that predictor matters:
- \`t = (estimate - 0) / standard error\`.
- A large \`|t|\` → small p-value → the predictor is statistically distinguishable from zero.

**The chi-square test** compares *observed counts* against *expected counts* across categorical variables (e.g., is churn independent of plan type?).
- \`χ² = Σ (observed - expected)² / expected\`.

**Which test when?**

\`\`\`mermaid
flowchart TD
    A[Question] --> B{Outcome type?}
    B -->|Continuous mean| C{Compare to?}
    B -->|Categorical counts| D[Chi-square test]
    C -->|Two groups| E[t-test]
    C -->|> 2 groups| F[ANOVA]
\`\`\`

Always report a **confidence interval** alongside the p-value so stakeholders see the *size* of the effect, not just that it "isn't zero."`
        },
        {
            number: 5,
            title: "ANOVA: Comparing Means Across Many Groups",
            content: `**ANOVA** (Analysis of Variance) tests whether the means of three or more groups differ, using a single overall F-test instead of many pairwise t-tests (which inflate the false-positive rate).

- **Null:** all group means are equal. **Alternative:** at least one differs.
- **F-statistic** = \`variance between groups / variance within groups\`. A large F → groups differ more than they differ internally.

**Typical regression use:** ANOVA output also appears when you add a categorical predictor to a regression — the overall F-test sanity-checks whether the model as a whole explains significant variation.

**Limitations:**
- ANOVA tells you *that* groups differ, not *which* ones. That requires **post-hoc tests** (e.g., Tukey HSD).
- Assumes roughly normal residuals and equal variance across groups.

**When to avoid:** heavily skewed counts or very unequal group sizes are better handled by a non-parametric test (Kruskal–Wallis).`
        },
        {
            number: 6,
            title: "Correlation vs. Causation: The #1 Trap",
            content: `Two variables moving together (ice cream sales and drownings both rise in summer) do not mean one causes the other. The conflation of correlation with causation is the most common analytical error — and the easiest to catch in interviews.

**Three reasons two variables are correlated but not causally linked:**
1. **Chance** — random coin-flip style coincidence, more common with many data.
2. **Confounding** — a third variable drives both (temperature drives ice cream *and* swimming).
3. **Reverse causality** — the effect and the cause run in the other direction than you assumed.

**What moving you toward causation:** randomized experiments (A/B tests), natural experiments, and careful control of confounders. Regression alone — with observed data — shows association, not causal effect.

\`\`\`mermaid
graph LR
    X[Correlation Observed] --> C{Is there a confounder Z?}
    C -->|Yes / uncontrolled| T[Association ≠ Causation]
    C -->|No / controlled| R{Can we randomize?}
    R -->|Yes| EXP[Randomized experiment → causal]
    R -->|No| OBS[Careful observational study → weak causal evidence]
\`\`\``
        },
        {
            number: 7,
            title: "Multicollinearity and Interaction Terms",
            content: `**Multicollinearity** — two or more predictors are highly correlated with each other, so the model can't cleanly separate their unique contributions.

- **Symptoms:** large, unstable coefficients; high standard errors; coefficients that look nonsensical or flip signs when a variable is added/removed.
- **Detection:** check **VIF (variance inflation factor)**. A VIF above ~10 is a strong red flag; above ~5 warrants attention.
- **Fix:** drop one of the redundant variables, combine them, or apply regularization (ridge). Rarely do you need to keep two redundant math-correlated predictors.

**Interaction terms** capture when the effect of one variable *depends on* the value of another (e.g., return rate depends on both the device and the marketing channel). You model it by multiplying the two predictors into \`xₓ = x₁ · x₂\`.

\`\`\`mermaid
flowchart LR
    A[x₁] --> M[Model]
    B[x₂] --> M[Model]
    M --> Y[ y ]
    A -->|├ product term x₁·x₂| I[Interaction]
    I --> M[Model]
\`\`\`

An interaction becomes essential when a main-effect-only model hides the real story.`
        },
        {
            number: 8,
            title: "Residual Analysis: How to Know Your Model Is Wrong",
            content: `Residuals are the differences between the observed \`y\` and the fitted \`ŷ\`. Plotting them is the fastest way to diagnose breakage in any regression.

**The four-pattern diagnostic:**

| Pattern in residuals | Indicates | Fix |
|---|---|---|
| Funnel shape (spread grows) | Heteroscedasticity | Log / weight / robust SEs |
| Curve / bending trend | Nonlinear relationship | Add polynomial or transform |
| Missing points one side | Outliers / influencer | Cap, log, remove checked-outliers |
| Serial pattern over time | Autocorrelation | Add lag / time structure |

\`\`\`mermaid
graph TD
    P1[Residuals vs. fitted: spread constant?] -->|No, growing| HET[Fix hetero: transform y, robust errors]
    P1 -->|Looks fine| P2[Residuals vs. each predictor]
    P2 --> P3{Structure / curve?}
    P3 -->|Yes| NL[Add interaction or polynomial]
    P3 -->|No| P4[QQ plot: normality]
    P4 --> P5[Normalish] --> OK[Messages sound]
    P4 -->|Heavy tails| TRANS[Consider robust model]
\`\`\`

Rule of thumb: when you spot a clear pattern in the residuals, you're looking at signal the model missed.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What does the R² of a linear regression measure?",
            answer: "R² is the proportion of variance in the dependent variable (y) explained by the model: R² = 1 - SS_res/SS_tot. A value of 0.8 means roughly 80% of the variation in y is explained by the predictors."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "Describe the key difference between a t-test and a chi-square test.",
            answer: "A t-test compares group means (continuous outcomes, two groups). A chi-square test compares observed vs. expected counts (categorical outcomes). Use a t-test for whether average spend differs by two regions; use chi-square for whether defects are independent of a shift."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "Your regression has R² = 0.95 but residual plots show a strong curved pattern. What do you conclude and fix?",
            answer: "A high R² with a curved pattern means a serious bias folded into the model — a sign of a non-linear relationship or missing interactions. Fix: transform a predictor (log, square), add a polynomial or interaction term, then re-check residuals. Never trust R² alone."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "Explain the exact meaning these values in a logistic regression results table: a coefficient of 0.7 with p-value 0.01.",
            answer: "The coefficient is on the log-odds scale. exp(0.7) ≈ 2.01 is the odds ratio: a one-unit increase increases the odds of the event by about 2×, holding others fixed. A p-value of 0.01 means the probability of seeing a coefficient this large by chance if the true one were 0 is 1% — statistically significant at the 5% level."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "Why is ANOVA preferred over running many pairwise t-tests to compare 5 group means?",
            answer: "Running many pairwise t-tests, abusing — each at α=0.05 — inflates the family-wise error rate; with 5 groups (10 pairs) your chance of at least one false positive is much higher than 5%. ANOVA does a single F-test of the null that all means are equal, controlling the overall error. Post-hoc tests after a significant ANOVA locate which differ."
        },
        {
            number: 6,
            difficulty: "medium",
            question: "Your model adds advertising as a predictor. What three reasons might explain why ad spend and sales are correlated without advertising causing sales?",
            answer: "(1) Confounding — a third variable (e.g., seasonality or brand health) drives both. (2) Reverse causality — high sales/estimated budget causes more ad spend, not the reverse. (3) Spurious association — pure by chance, more likely when scanning many variables. Only a randomized experiment or careful identification lets you claim causation."
        },
        {
            number: 7,
            difficulty: "hard",
            question: "Explain multicollinearity, how to detect it, and why it makes individual coefficient interpretation dangerous.",
            answer: "Multicollinearity: two or more predictors are nearly linearly dependent, so the model can't attribute variation uniquely. Detect it with VIF > 10 (or high pairwise, bivariate correlation). Dangers: coefficients become unstable and unreliably estimate, standard errors and p-values balloon, and signs can flip when a small change occurs. You can still predict well but cannot interpret the individual coefficient. Fix by dropping a redundant predictor, combining/building a composite, or using ridge regression."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "If your model fails the homoscedasticity (equal variance) assumption, what are the consequence and two concrete remedies?",
            answer: "If residuals have a funnel shape (spread grows with fitted), standard errors are wrong — so p-values and confidence intervals are unreliable, even though coefficients may be unbiased. Remedies: transform the outcome (e.g., log y) to stabilize variance, or fit the model with robust (White) standard errors. Each fixes inference without changing the point predictions."
        },
        {
            number: 9,
            difficulty: "hard",
            question: "Describe the purpose of an interaction term and what the small non-significant standalone 'device' interaction says when the product term is significant.",
            answer: "An interaction term x₁·x₂ models that the effect of x₁ on y often depends on the level of x₂ (moderation). If the interaction is significant but the main effects are not, it means the effect mainly exists through the combination: e.g., home usage but only in the new customer segment. You'd interpret the conditional effects at specific values of the other variable."
        },
        {
            number: 10,
            difficulty: "easy",
            question: "When comparing two nested models, why would you prefer lower AIC or BIC?",
            answer: "AIC and BIC penalize a model for extra parameters while rewarding fit — they balance goodness-of-fit against complexity. Lower IC is preferred because it signals better fit-per-complexity; IC/BIC also penalize complexity more heavily, so it favors even simpler models. They prevent you from always preferring the model with more variables."
        }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "A pricing analyst fits a linear regression of house prices on square footage and location. The residual-versus-fitted plot shows a clear funnel: residual spread widens sharply as fitted prices increase.",
            question: "What assumption is violated, and what is the safest next step?",
            options: [
                "Linearity — add a polynomial term",
                "Normality — the errors are skewed, so nothing needs fixing",
                "Homoscedasticity — log-transform the outcome or use robust standard errors",
                "Independence — the data was collected in a cluster"
            ],
            answer: "Correct Option: Homoscedasticity — log-transform the outcome or use robust standard errors"
        },
        {
            case: 2,
            scenario: "A marketing analyst regresses weekly sales on ad spend and finds a large, highly significant coefficient. The CMO plans to double the ad budget based on this result.",
            question: "What should the analyst flag before the budget decision?",
            options: [
                "Nothing — a significant coefficient proves the ads caused the sales lift",
                "The regression shows association only; confounding (e.g., seasonality) or reverse causality may drive the effect",
                "The coefficient should be divided by the p-value",
                "R² is high, so the causal claim is safe"
            ],
            answer: "Correct Option: The regression shows association only; confounding (e.g., seasonality) or reverse causality may drive the effect"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.statisticalModelingData = statisticalModelingData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = statisticalModelingData;
}