import json
import re

# Read the extracted content
with open(r"g:\Website_for_dataAnalytics_practice\extracted_stats.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Split into lessons and questions sections
# Extract lesson content (Part 1 sections)
lesson_sections = {
    1: "Basic Concepts: Population, Sample, Measures of Central Tendency, Measures of Dispersion",
    2: "Probability Theory, Distributions, and Z-scores",
    3: "Inferential Statistics and Hypothesis Testing",
    4: "Advanced Topics: Binomial Distribution, Normal Distribution, Central Limit Theorem"
}

# Create JavaScript object
lessons = []
for i in range(1, 5):
    lesson = {
        "number": i + 10,  # 11, 12, 13, 14
        "title": f"Advanced Statistics Topic {i + 10}",
        "content": f"<h4>{lesson_sections.get(i, 'Topic')}</h4><p>This lesson covers advanced statistical concepts including probability distributions, hypothesis testing, and inferential statistics.</p>"
    }
    lessons.append(lesson)

# Create questions from the docx content
questions = []
q_num = 37  # Start after existing 36 questions

# Question 1 from docx
questions.append({
    "number": q_num,
    "difficulty": "hard",
    "question": "A factory produces items with 2% defect rate. In a sample of 50 items, what is the probability of exactly 2 defectives?",
    "context": "Use binomial distribution",
    "answer": "<h4>Solution:</h4><p>Using binomial distribution with n=50, p=0.02:</p><p>P(X=2) = C(50,2) × (0.02)² × (0.98)⁴⁸</p><p>C(50,2) = 1225</p><p>P(X=2) ≈ 0.1858 or 18.58%</p>"
})
q_num += 1

# Question 2
questions.append({
    "number": q_num,
    "difficulty": "hard",
    "question": "Test scores are normally distributed with mean=75, standard deviation=8. What percentage of students scored above 85?",
    "context": "Use z-score and standard normal distribution",
    "answer": "<h4>Solution:</h4><p>z = (85-75)/8 = 1.25</p><p>P(Z>1.25) = 1 - 0.8944 = 0.1056</p><p>Answer: 10.56% of students scored above 85</p>"
})
q_num += 1

# Question 3
questions.append({
    "number": q_num,
    "difficulty": "hard",
    "question": "A sample of 36 students has mean score 82 with standard deviation 12. Construct a 95% confidence interval for the population mean.",
    "context": "Use t-distribution with n=36",
    "answer": "<h4>Solution:</h4><p>Using t-distribution with df=35, t₀.₀₂₅ ≈ 2.030</p><p>CI = 82 ± 2.030 × (12/√36) = 82 ± 2.030 × 2 = 82 ± 4.06</p><p>95% CI = [77.94, 86.06]</p>"
})
q_num += 1

# Question 4
questions.append({
    "number": q_num,
    "difficulty": "hard",
    "question": "A company claims average battery life ≥100 hours. A sample of 40 batteries has mean=98, std dev=8. Test at α=0.05 if the claim is valid.",
    "context": "One-tailed hypothesis test",
    "answer": "<h4>Solution:</h4><p>H₀: μ ≥ 100, H₁: μ < 100</p><p>t = (98-100)/(8/√40) ≈ -1.581</p><p>Critical value: t₀.₀₅,₃₉ ≈ -1.685</p><p>Since t > critical value, fail to reject H₀. Insufficient evidence to reject the company's claim.</p>"
})
q_num += 1

# Question 5
questions.append({
    "number": q_num,
    "difficulty": "hard",
    "question": "Two machines produce components. Machine A: n₁=50, mean=12.3mm, s₁=0.5mm. Machine B: n₂=60, mean=12.1mm, s₂=0.6mm. Test if means differ at α=0.01.",
    "context": "Two-sample t-test",
    "answer": "<h4>Solution:</h4><p>Testing H₀: μ₁ = μ₂ vs H₁: μ₁ ≠ μ₂</p><p>Pooled standard error ≈ 0.1066</p><p>t ≈ 1.876</p><p>Critical value ≈ ±2.624</p><p>Since |t| < critical value, fail to reject H₀. No significant difference in means.</p>"
})

# Output the JavaScript code
output = "New Lessons and Questions for Statistics Section:\n\n"
output += "LESSONS:\n"
output += json.dumps(lessons, indent=4, ensure_ascii=False)
output += "\n\nQUESTIONS:\n"
output += json.dumps(questions, indent=4, ensure_ascii=False)

with open(r"g:\Website_for_dataAnalytics_practice\statistics_content_js.txt", "w", encoding="utf-8") as f:
    f.write(output)

print(f"Generated {len(lessons)} lessons and {len(questions)} questions")
print("Output saved to statistics_content_js.txt")
