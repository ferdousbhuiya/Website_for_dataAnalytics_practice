import re
import json

# Read the statistics_lesson_question_answer.js file
with open(r"g:\Website_for_dataAnalytics_practice\statistics_lesson_question_answer.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract lessons from StatisticsLessons object
lessons_to_add = [
    {
        "number": 15,
        "title": "Quartiles and Outlier Detection",
        "content": "<h4>Understanding Data Distribution</h4><p>Quartiles divide data into four equal parts. Q1 (25th percentile), Q2 (median, 50th), Q3 (75th percentile).</p><h4>Interquartile Range (IQR)</h4><p>IQR = Q3 - Q1. Data points outside [Q1 - 1.5×IQR, Q3 + 1.5×IQR] are considered outliers.</p><h4>Why It Matters</h4><p>Quartiles are robust to outliers, unlike mean. Use them when data has extreme values.</p>"
    },
    {
        "number": 16,
        "title": "Coefficient of Variation",
        "content": "<h4>Comparing Variability Across Different Scales</h4><p>CV = (SD / Mean) × 100%. Allows comparison of spread in different datasets.</p><h4>Example</h4><p>Stock A: Mean=$100, SD=$10 → CV=10%. Stock B: Mean=$50, SD=$3 → CV=6%. Stock B is more stable.</p><h4>Application</h4><p>Use CV when comparing datasets with different units or scales (e.g., comparing salary variability across countries).</p>"
    }
]

questions_to_add = [
    {
        "number": 41,
        "difficulty": "medium",
        "question": "Calculate mean, median, mode, and standard deviation for: [4, 8, 6, 5, 3, 8, 9]",
        "context": "Basic descriptive statistics calculation",
        "answer": "<h4>Solution:</h4><p>Sorted: [3, 4, 5, 6, 8, 8, 9]</p><p><strong>Mean</strong> = (4+8+6+5+3+8+9)/7 = 43/7 ≈ 6.14</p><p><strong>Median</strong> = 6 (middle value)</p><p><strong>Mode</strong> = 8 (appears twice)</p><p><strong>Variance</strong> = Σ(x-x̄)²/(n-1) ≈ 5.48</p><p><strong>Standard Deviation</strong> = √5.48 ≈ 2.34</p>"
    },
    {
        "number": 42,
        "difficulty": "medium",
        "question": "Find Q1, Q2 (median), Q3, and IQR for: [10, 12, 14, 16, 18, 20, 22, 24, 26]",
        "context": "Quartile analysis",
        "answer": "<h4>Solution:</h4><p>Ordered data: [10, 12, 14, 16, 18, 20, 22, 24, 26]</p><p><strong>Q2 (Median)</strong> = 18 (middle value, position 5)</p><p><strong>Lower half</strong> = [10, 12, 14, 16] → <strong>Q1</strong> = (12+14)/2 = 13</p><p><strong>Upper half</strong> = [20, 22, 24, 26] → <strong>Q3</strong> = (22+24)/2 = 23</p><p><strong>IQR</strong> = Q3 - Q1 = 23 - 13 = 10</p><p><strong>Outlier range:</strong> Below 13 - 1.5(10) = -2 or above 23 + 1.5(10) = 38 (no outliers here)</p>"
    },
    {
        "number": 43,
        "difficulty": "hard",
        "question": "Compare variability: Stock A has mean=$100, SD=$15. Stock B has mean=$50, SD=$5. Which is more stable?",
        "context": "Use coefficient of variation (CV)",
        "answer": "<h4>Solution:</h4><p><strong>Stock A:</strong> CV = (15/100) × 100% = 15%</p><p><strong>Stock B:</strong> CV = (5/50) × 100% = 10%</p><p><strong>Conclusion:</strong> Stock B is more stable (lower CV) despite smaller absolute standard deviation.</p><p><strong>Key Insight:</strong> Always use CV when comparing variability across different scales or units.</p>"
    },
    {
        "number": 44,
        "difficulty": "medium",
        "question": "A dataset has mean=50, SD=10. Using the empirical rule, what percentage of data lies between 40 and 60?",
        "context": "Normal distribution empirical rule",
        "answer": "<h4>Solution:</h4><p>Range [40, 60] represents [μ - 1σ, μ + 1σ].</p><p>According to the 68-95-99.7 rule: <strong>68% of data</strong> falls within 1 standard deviation of the mean.</p><p>This is true for approximately normally distributed data.</p>"
    },
    {
        "number": 45,
        "difficulty": "hard",
        "question": "A one-sample t-test on a sample of 25 items against a hypothesized mean of 100 yields t=2.5. At α=0.05, what is your conclusion?",
        "context": "Degrees of freedom = 24, critical t ≈ 2.064 (two-tailed)",
        "answer": "<h4>Solution:</h4><p>t-statistic = 2.5, Critical value ≈ 2.064 (df=24, α=0.05, two-tailed)</p><p>Since |2.5| > 2.064, we <strong>reject H₀</strong>.</p><p><strong>Conclusion:</strong> The sample mean is significantly different from 100 at the 0.05 significance level.</p>"
    }
]

# Output the JSON
output = {}
output['lessons'] = lessons_to_add
output['questions'] = questions_to_add

with open(r"g:\Website_for_dataAnalytics_practice\extracted_lesson_questions.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"Generated {len(lessons_to_add)} lessons and {len(questions_to_add)} questions")
print("Output saved to extracted_lesson_questions.json")
