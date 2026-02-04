import json

# Extract the 7 examples from statistics_lesson_question_answer.js as detailed questions

examples_as_questions = [
    {
        "number": 56,
        "difficulty": "medium",
        "question": "Calculate mean, median, mode, variance, and standard deviation for: [4, 8, 6, 5, 3, 8, 9]",
        "context": "Basic calculations using descriptive statistics",
        "answer": "<h4>Solution:</h4><p><strong>Data (sorted):</strong> [3, 4, 5, 6, 8, 8, 9]</p><ul><li><strong>Mean:</strong> (4+8+6+5+3+8+9)/7 = 43/7 ≈ 6.14</li><li><strong>Median:</strong> 6 (middle value)</li><li><strong>Mode:</strong> 8 (appears twice)</li><li><strong>Variance:</strong> Σ(x-6.14)² / 6 ≈ 4.81</li><li><strong>Standard Deviation:</strong> √4.81 ≈ 2.19</li></ul><p><strong>Interpretation:</strong> Data is centered around 6.14 with moderate spread (SD=2.19).</p>"
    },
    {
        "number": 57,
        "difficulty": "hard",
        "question": "Factory produces items with 2% defect rate. In a sample of 50 items: a) Probability of exactly 2 defectives? b) Probability of at least 2 defectives?",
        "context": "Binomial distribution with n=50, p=0.02",
        "answer": "<h4>Solution:</h4><p><strong>Part a) P(X=2):</strong></p><p>Using binomial formula: P(X=k) = C(n,k) × p^k × (1-p)^(n-k)</p><p>P(X=2) = C(50,2) × 0.02² × 0.98⁴⁸ = 1225 × 0.0004 × 0.3812 ≈ <strong>0.1858 or 18.58%</strong></p><p><strong>Part b) P(X≥2):</strong></p><p>P(X≥2) = 1 - P(X=0) - P(X=1)</p><ul><li>P(X=0) = 0.98⁵⁰ ≈ 0.3642</li><li>P(X=1) = 50 × 0.02 × 0.98⁴⁹ ≈ 0.3716</li><li>P(X≥2) = 1 - 0.3642 - 0.3716 ≈ <strong>0.2642 or 26.42%</strong></li></ul><p><strong>Key Insight:</strong> There's about 1 in 4 chance of 2+ defects in a batch of 50 at this defect rate.</p>"
    },
    {
        "number": 58,
        "difficulty": "medium",
        "question": "Test scores: μ=75, σ=8. a) What percentage scored above 85? b) What range contains the middle 90%?",
        "context": "Normal distribution, z-scores, and percentiles",
        "answer": "<h4>Solution:</h4><p><strong>Part a) P(X > 85):</strong></p><p>z = (85-75)/8 = 1.25</p><p>From z-table: P(Z ≤ 1.25) ≈ 0.8944</p><p>P(X > 85) = 1 - 0.8944 ≈ <strong>10.56%</strong></p><p><strong>Part b) Middle 90% range:</strong></p><p>For 90% in middle, need 5% in each tail → z₀.₉₅ ≈ 1.645</p><ul><li>Lower bound: 75 - 1.645×8 = 75 - 13.16 = <strong>61.84</strong></li><li>Upper bound: 75 + 1.645×8 = 75 + 13.16 = <strong>88.16</strong></li></ul><p><strong>Answer:</strong> 90% of scores fall between 61.84 and 88.16</p>"
    },
    {
        "number": 59,
        "difficulty": "hard",
        "question": "Sample: n=36, x̄=82, s=12. Construct a 95% confidence interval for the population mean.",
        "context": "Confidence interval estimation using t-distribution",
        "answer": "<h4>Solution:</h4><p><strong>Given:</strong> n=36, x̄=82, s=12, confidence=95%</p><p><strong>Standard Error:</strong> SE = s/√n = 12/√36 = 12/6 = 2</p><p><strong>Critical Value:</strong> t₀.₀₂₅,₃₅ ≈ 2.030 (from t-table)</p><p><strong>Margin of Error:</strong> ME = 2.030 × 2 = 4.06</p><p><strong>95% Confidence Interval:</strong></p><p>CI = 82 ± 4.06 = [<strong>77.94</strong>, <strong>86.06</strong>]</p><p><strong>Interpretation:</strong> We are 95% confident that the true population mean lies between 77.94 and 86.06.</p>"
    },
    {
        "number": 60,
        "difficulty": "hard",
        "question": "Battery claim: average life ≥ 100 hours. Sample: n=40, x̄=98, s=8, α=0.05. Test the claim.",
        "context": "One-sample t-test (left-tailed hypothesis test)",
        "answer": "<h4>Solution:</h4><p><strong>Step 1 - Hypotheses:</strong> H₀: μ ≥ 100, H₁: μ < 100 (left-tailed)</p><p><strong>Step 2 - Significance:</strong> α = 0.05, df = 39</p><p><strong>Step 3 - Test Statistic:</strong></p><p>t = (x̄ - μ) / (s/√n) = (98 - 100) / (8/√40) = -2 / 1.265 ≈ <strong>-1.581</strong></p><p><strong>Step 4 - Critical Value:</strong> t₀.₀₅,₃₉ ≈ -1.685</p><p><strong>Step 5 - Decision:</strong> Since -1.581 > -1.685, <strong>fail to reject H₀</strong></p><p><strong>Conclusion:</strong> At α=0.05, insufficient evidence that battery life is less than 100 hours. Company's claim appears valid.</p>"
    },
    {
        "number": 61,
        "difficulty": "medium",
        "question": "Calculate correlation coefficient for: X=[2,4,6,8,10], Y=[1,3,5,7,9]",
        "context": "Pearson's correlation coefficient (relationship between variables)",
        "answer": "<h4>Solution Using Correlation Formula:</h4><p>r = [nΣxy - ΣxΣy] / √{[nΣx²-(Σx)²][nΣy²-(Σy)²]}</p><p><strong>Calculations:</strong></p><ul><li>n=5, ΣX=30, ΣY=25</li><li>ΣX²=220, ΣY²=165</li><li>ΣXY = 2×1 + 4×3 + 6×5 + 8×7 + 10×9 = 2+12+30+56+90 = 190</li><li>Numerator: 5(190) - 30(25) = 950 - 750 = 200</li><li>Denominator: √{[5(220)-(30)²][5(165)-(25)²]} = √{[1100-900][825-625]} = √{200×200} = 200</li><li>r = 200/200 = <strong>1.0</strong></li></ul><p><strong>Interpretation:</strong> Perfect positive linear correlation. Y increases exactly linearly with X.</p>"
    },
    {
        "number": 62,
        "difficulty": "hard",
        "question": "Dataset: [2,4,4,4,5,5,7,9]. Find Q1, Q2, Q3, IQR, and identify outliers using 1.5×IQR rule.",
        "context": "Quartile analysis and outlier detection",
        "answer": "<h4>Solution:</h4><p><strong>Ordered Data:</strong> [2, 4, 4, 4, 5, 5, 7, 9]</p><p><strong>Quartiles:</strong></p><ul><li><strong>Q2 (Median):</strong> (4+5)/2 = 4.5 (average of middle two values at positions 4,5)</li><li><strong>Lower Half:</strong> [2, 4, 4, 4] → Q1 = (4+4)/2 = 4</li><li><strong>Upper Half:</strong> [5, 5, 7, 9] → Q3 = (5+7)/2 = 6</li></ul><p><strong>IQR:</strong> Q3 - Q1 = 6 - 4 = 2</p><p><strong>Outlier Bounds:</strong></p><ul><li>Lower bound: Q1 - 1.5×IQR = 4 - 1.5(2) = 4 - 3 = 1</li><li>Upper bound: Q3 + 1.5×IQR = 6 + 1.5(2) = 6 + 3 = 9</li></ul><p><strong>Outliers:</strong> Any value < 1 or > 9. Value 9 is at the boundary but included as not an outlier.</p>"
    }
]

output = {
    "examples_as_questions": examples_as_questions,
    "summary": {
        "total_new_questions": len(examples_as_questions),
        "question_numbers": "56-62",
        "note": "These are the 7 detailed examples from statistics_lesson_question_answer.js converted to practice questions"
    }
}

with open(r"g:\Website_for_dataAnalytics_practice\extracted_lesson_questions.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"Generated {len(examples_as_questions)} detailed example questions")
print("Output saved to extracted_lesson_questions.json")
