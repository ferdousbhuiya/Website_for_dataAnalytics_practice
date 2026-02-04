import json

# Extract comprehensive content from statistics_lesson_question_answer.js
lessons = [
    {
        "number": 17,
        "title": "Basic Statistical Concepts: Populations, Samples, and Data Types",
        "content": "<h4>Core Definitions</h4><ul><li><strong>Population:</strong> The entire group you want to study</li><li><strong>Sample:</strong> A subset of the population</li><li><strong>Parameter:</strong> A numerical measure describing a population characteristic</li><li><strong>Statistic:</strong> A numerical measure describing a sample characteristic</li></ul><h4>Types of Data</h4><ul><li><strong>Qualitative/Categorical:</strong> Non-numerical data (e.g., colors, brands, regions)</li><li><strong>Quantitative:</strong> Numerical data<ul><li><strong>Discrete:</strong> Countable numbers (e.g., number of students, defects)</li><li><strong>Continuous:</strong> Measurable numbers with decimals (e.g., height, weight, time)</li></ul></li></ul><h4>Why This Matters</h4><p>Understanding whether you're working with populations or samples, and the type of data you have, determines which statistical methods are appropriate.</p>"
    },
    {
        "number": 18,
        "title": "Central Tendency: Mean, Median, Mode, and Weighted Mean",
        "content": "<h4>Key Formulas</h4><ul><li><strong>Mean (Average):</strong> x̄ = Σx / n</li><li><strong>Weighted Mean:</strong> x̄_w = Σ(wᵢ × xᵢ) / Σwᵢ (useful when some values are more important)</li><li><strong>Geometric Mean:</strong> GM = (∏xᵢ)^(1/n) (used for growth rates and percentage changes)</li></ul><h4>When to Use Each</h4><ul><li><strong>Mean:</strong> Most common, but sensitive to outliers</li><li><strong>Median:</strong> Better for skewed data; robust to outliers</li><li><strong>Mode:</strong> Best for categorical data and identifying the most frequent value</li></ul><h4>Real-World Example</h4><p>Salary data with mean=$60k but median=$48k suggests right-skewed data (executives pulling mean higher).</p>"
    },
    {
        "number": 19,
        "title": "Measures of Dispersion: Spread, Variability, and Outliers",
        "content": "<h4>Key Formulas</h4><ul><li><strong>Range:</strong> Max - Min (simple but rough)</li><li><strong>Variance (Population):</strong> σ² = Σ(x - μ)² / N</li><li><strong>Variance (Sample):</strong> s² = Σ(x - x̄)² / (n-1) (Bessel's correction)</li><li><strong>Standard Deviation:</strong> σ = √σ² (more interpretable than variance)</li><li><strong>Coefficient of Variation:</strong> CV = (σ/μ) × 100% (compare variability across different scales)</li><li><strong>Interquartile Range (IQR):</strong> IQR = Q₃ - Q₁ (middle 50% of data)</li></ul><h4>Quartiles</h4><ul><li>Q1 = 25th percentile</li><li>Q2 = 50th percentile (median)</li><li>Q3 = 75th percentile</li></ul><h4>Identifying Outliers</h4><p>Use 1.5×IQR rule: Data points below (Q1 - 1.5×IQR) or above (Q3 + 1.5×IQR) are outliers.</p>"
    },
    {
        "number": 20,
        "title": "Probability: Rules, Conditional Probability, and Bayes' Theorem",
        "content": "<h4>Fundamental Rules</h4><ul><li><strong>Addition Rule:</strong> P(A∪B) = P(A) + P(B) - P(A∩B)</li><li><strong>Multiplication Rule:</strong> P(A∩B) = P(A) × P(B|A)</li><li><strong>Complement Rule:</strong> P(A') = 1 - P(A)</li><li><strong>Conditional Probability:</strong> P(A|B) = P(A∩B) / P(B), provided P(B) > 0</li></ul><h4>Bayes' Theorem</h4><p>P(A|B) = [P(B|A) × P(A)] / P(B)</p><p>Used to update probabilities based on new evidence. Example: medical test accuracy given positive result.</p><h4>Key Insight</h4><p>Probability ranges from 0 (impossible) to 1 (certain). Sum of all possible outcomes = 1.</p>"
    },
    {
        "number": 21,
        "title": "Probability Distributions: Binomial and Normal",
        "content": "<h4>Binomial Distribution</h4><ul><li><strong>Conditions:</strong> Fixed number of trials, independent trials, two outcomes (success/failure)</li><li><strong>Formula:</strong> P(X=k) = C(n,k) × p^k × (1-p)^(n-k)</li><li><strong>Mean:</strong> μ = np</li><li><strong>Variance:</strong> σ² = np(1-p)</li><li><strong>Example:</strong> Probability of exactly 3 defects in 50 items (2% defect rate)</li></ul><h4>Normal Distribution</h4><ul><li><strong>Properties:</strong> Bell-shaped, symmetric, mean=median=mode</li><li><strong>Empirical Rule (68-95-99.7):</strong><ul><li>68% within μ ± 1σ</li><li>95% within μ ± 2σ</li><li>99.7% within μ ± 3σ</li></ul></li><li><strong>Z-score:</strong> z = (x - μ)/σ (standardize to normal distribution)</li></ul><h4>Why Normal Distribution Matters</h4><p>Many natural phenomena follow normal distribution. Used as basis for hypothesis testing and confidence intervals.</p>"
    },
    {
        "number": 22,
        "title": "Inferential Statistics: CLT, Confidence Intervals, and Hypothesis Testing",
        "content": "<h4>Central Limit Theorem</h4><p>For large samples (n ≥ 30), the sampling distribution of the sample mean is approximately normal, regardless of the original population distribution.</p><ul><li><strong>Mean of sampling distribution:</strong> μ_x̄ = μ</li><li><strong>Standard Error:</strong> σ_x̄ = σ/√n</li></ul><h4>Confidence Intervals</h4><ul><li><strong>For mean (σ known):</strong> CI = x̄ ± z*(σ/√n)</li><li><strong>For mean (σ unknown):</strong> CI = x̄ ± t*(s/√n) (uses t-distribution with n-1 df)</li></ul><h4>Hypothesis Testing (5 Steps)</h4><ol><li>State H₀ (null) and H₁ (alternative)</li><li>Choose α (significance level, typically 0.05)</li><li>Calculate test statistic (t-test, z-test, chi-square, etc.)</li><li>Find p-value</li><li>Make decision: if p-value < α, reject H₀</li></ol><h4>Type I and Type II Errors</h4><ul><li><strong>Type I (α):</strong> Rejecting true H₀ (false positive)</li><li><strong>Type II (β):</strong> Failing to reject false H₀ (false negative)</li></ul>"
    }
]

questions = [
    {
        "number": 46,
        "difficulty": "medium",
        "question": "A researcher wants to estimate the average height of college students. Define the population, sample, parameter, and statistic for this study.",
        "context": "Statistical terminology and concepts",
        "answer": "<h4>Solution:</h4><ul><li><strong>Population:</strong> All college students (entire group of interest)</li><li><strong>Sample:</strong> The subset of college students actually measured</li><li><strong>Parameter:</strong> The true average height of all college students (unknown)</li><li><strong>Statistic:</strong> The average height calculated from the sample (known, computed value)</li></ul><p><strong>Key Point:</strong> We use the statistic to estimate the parameter.</p>"
    },
    {
        "number": 47,
        "difficulty": "medium",
        "question": "Compare the geometric mean and arithmetic mean for growth rates: 1.05, 1.08, 1.12 (representing 5%, 8%, 12% growth over 3 years)",
        "context": "Geometric mean for compound growth",
        "answer": "<h4>Solution:</h4><p><strong>Geometric Mean:</strong> GM = (1.05 × 1.08 × 1.12)^(1/3) = (1.2668)^(1/3) ≈ 1.0814 or 8.14% average annual growth</p><p><strong>Arithmetic Mean:</strong> (1.05 + 1.08 + 1.12) / 3 = 1.0833 or 8.33%</p><p><strong>Key Insight:</strong> For compound growth rates, use geometric mean (it's lower and more accurate). The difference becomes significant with more extreme values.</p>"
    },
    {
        "number": 48,
        "difficulty": "hard",
        "question": "Dataset: [2, 4, 4, 4, 5, 5, 7, 9]. Identify the mean, median, mode, range, variance, SD, and quartiles. Identify any outliers.",
        "context": "Complete descriptive statistics analysis",
        "answer": "<h4>Calculations:</h4><ul><li><strong>Mean:</strong> (2+4+4+4+5+5+7+9)/8 = 40/8 = 5</li><li><strong>Median:</strong> (4+5)/2 = 4.5 (average of middle two values)</li><li><strong>Mode:</strong> 4 (appears 3 times)</li><li><strong>Range:</strong> 9 - 2 = 7</li><li><strong>Variance:</strong> Σ(x-5)² / 7 = 40/7 ≈ 5.71</li><li><strong>Standard Deviation:</strong> √5.71 ≈ 2.39</li><li><strong>Quartiles:</strong> Q1=4, Q2=4.5, Q3=6, IQR=2</li><li><strong>Outlier bounds:</strong> Below 4-1.5(2)=1 or above 6+1.5(2)=9. Value 9 is borderline but included.</li></ul>"
    },
    {
        "number": 49,
        "difficulty": "medium",
        "question": "A card is drawn from a standard deck. What is P(Red or Face Card)?",
        "context": "Addition rule of probability",
        "answer": "<h4>Solution:</h4><p><strong>Method 1 (Addition Rule):</strong> P(A∪B) = P(A) + P(B) - P(A∩B)</p><ul><li>P(Red) = 26/52 = 0.5</li><li>P(Face Card) = 12/52 (3 face cards per suit × 4 suits)</li><li>P(Red AND Face Card) = 6/52 (3 face cards × 2 red suits)</li><li>P(Red OR Face) = 26/52 + 12/52 - 6/52 = 32/52 = 8/13 ≈ 0.615</li></ul><p><strong>Method 2 (Counting):</strong> Red cards (26) + Black Face cards (6) = 32/52 = 8/13</p>"
    },
    {
        "number": 50,
        "difficulty": "hard",
        "question": "A disease affects 1% of the population. A test is 99% accurate (sensitivity and specificity). If someone tests positive, what's the probability they actually have the disease? (Use Bayes' Theorem)",
        "context": "Bayes' theorem application in medical testing",
        "answer": "<h4>Solution (Bayes' Theorem):</h4><p>P(Disease|Positive) = [P(Positive|Disease) × P(Disease)] / P(Positive)</p><ul><li>P(Disease) = 0.01</li><li>P(No Disease) = 0.99</li><li>P(Positive|Disease) = 0.99 (sensitivity)</li><li>P(Positive|No Disease) = 0.01 (1-specificity)</li><li>P(Positive) = 0.99×0.01 + 0.01×0.99 = 0.0198</li><li>P(Disease|Positive) = (0.99 × 0.01) / 0.0198 ≈ 0.50 or 50%</li></ul><p><strong>Surprising Result:</strong> Only 50% probability despite 99% accurate test! This is because the disease is rare.</p>"
    },
    {
        "number": 51,
        "difficulty": "hard",
        "question": "A manufacturer finds defects at 3% rate. In a batch of 100 items, what's the probability of at least 5 defects? (Binomial distribution)",
        "context": "Binomial cumulative probability",
        "answer": "<h4>Solution:</h4><p>n=100, p=0.03, find P(X ≥ 5)</p><p><strong>Method:</strong> P(X ≥ 5) = 1 - P(X ≤ 4) = 1 - [P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)]</p><p><strong>Using Binomial:</strong></p><ul><li>P(X=0) = C(100,0) × 0.03⁰ × 0.97¹⁰⁰ ≈ 0.0476</li><li>P(X=1) ≈ 0.1471</li><li>P(X=2) ≈ 0.2252</li><li>P(X=3) ≈ 0.2274</li><li>P(X=4) ≈ 0.1704</li><li>P(X ≤ 4) ≈ 0.7777</li></ul><p><strong>Answer:</strong> P(X ≥ 5) ≈ 0.2223 or 22.23%</p>"
    },
    {
        "number": 52,
        "difficulty": "medium",
        "question": "Test scores follow normal distribution with μ=75, σ=10. What score represents the 90th percentile?",
        "context": "Normal distribution inverse calculation",
        "answer": "<h4>Solution:</h4><p>Find x where P(X ≤ x) = 0.90</p><p><strong>Using z-scores:</strong> From z-table, z₀.₉₀ ≈ 1.28</p><p><strong>Transform back to original scale:</strong> x = μ + z×σ = 75 + 1.28×10 = 75 + 12.8 = <strong>87.8</strong></p><p><strong>Interpretation:</strong> A score of 87.8 is at the 90th percentile, meaning 90% of students scored at or below this.</p>"
    },
    {
        "number": 53,
        "difficulty": "hard",
        "question": "A random sample of 64 students has average GPA of 3.2 with SD=0.8. Construct a 99% CI for the population mean GPA.",
        "context": "Confidence interval with t-distribution or z-distribution",
        "answer": "<h4>Solution:</h4><p>n=64 (large sample, can use z), x̄=3.2, s=0.8, confidence=99%</p><p><strong>For 99% CI:</strong> z₀.₀₀₅ ≈ 2.576</p><p><strong>Standard Error:</strong> SE = 0.8 / √64 = 0.8 / 8 = 0.1</p><p><strong>Margin of Error:</strong> ME = 2.576 × 0.1 = 0.2576</p><p><strong>CI:</strong> 3.2 ± 0.2576 = [2.94, 3.46]</p><p><strong>Interpretation:</strong> We are 99% confident the true population mean GPA is between 2.94 and 3.46.</p>"
    },
    {
        "number": 54,
        "difficulty": "hard",
        "question": "A manufacturer claims light bulbs last 1000 hours. A sample of 25 bulbs averages 950 hours with SD=100. Test at α=0.05 if the claim is accurate (two-tailed).",
        "context": "Two-sample t-test hypothesis testing",
        "answer": "<h4>Solution:</h4><p><strong>Step 1:</strong> H₀: μ = 1000, H₁: μ ≠ 1000</p><p><strong>Step 2:</strong> α = 0.05, df = 24</p><p><strong>Step 3:</strong> t = (950 - 1000) / (100 / √25) = -50 / 20 = <strong>-2.5</strong></p><p><strong>Step 4:</strong> Critical values (two-tailed, df=24): ±2.064</p><p><strong>Step 5:</strong> Since |−2.5| > 2.064, <strong>reject H₀</strong></p><p><strong>Conclusion:</strong> At the 0.05 level, there is significant evidence that bulbs do not last 1000 hours on average; they last less.</p>"
    },
    {
        "number": 55,
        "difficulty": "hard",
        "question": "Calculate Pearson's correlation coefficient for: X=[1,2,3,4,5], Y=[2,4,5,4,6]",
        "context": "Correlation analysis and relationship strength",
        "answer": "<h4>Solution Using Correlation Formula:</h4><p>r = [nΣxy - ΣxΣy] / √{[nΣx²-(Σx)²][nΣy²-(Σy)²]}</p><p><strong>Calculations:</strong></p><ul><li>n=5, ΣX=15, ΣY=21</li><li>ΣX²=55, ΣY²=93, ΣXY=75</li><li>Numerator: 5(75) - 15(21) = 375 - 315 = 60</li><li>Denominator: √{[5(55)-225][5(93)-441]} = √{[50][24]} = √1200 ≈ 34.64</li><li>r ≈ 60 / 34.64 ≈ <strong>1.73</strong> ERROR! Should be between -1 and 1. Recalculate:</li><li>ΣXY = 1×2 + 2×4 + 3×5 + 4×4 + 5×6 = 2+8+15+16+30 = 71</li><li>Numerator: 5(71) - 15(21) = 355 - 315 = 40</li><li>r ≈ 40 / 34.64 ≈ <strong>1.16</strong> STILL ERROR. Let me recalculate ΣY²:</li><li>ΣY² = 4+16+25+16+36 = 97</li><li>Denominator: √{[50][485-441]} = √{50×44} = √2200 ≈ 46.9</li><li>r ≈ 40 / 46.9 ≈ <strong>0.85</strong></li></ul><p><strong>Interpretation:</strong> Strong positive correlation (0.85). As X increases, Y tends to increase.</p>"
    }
]

output = {
    "lessons": lessons,
    "questions": questions,
    "summary": {
        "total_lessons": len(lessons),
        "total_questions": len(questions),
        "note": "These are comprehensive extractions from statistics_lesson_question_answer.js covering all major statistical topics with formulas, examples, and practice problems"
    }
}

with open(r"g:\Website_for_dataAnalytics_practice\comprehensive_stats_extraction.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"Generated {len(lessons)} comprehensive lessons and {len(questions)} detailed questions")
print("Output saved to comprehensive_stats_extraction.json")
