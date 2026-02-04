/**
 * COMPREHENSIVE STATISTICS LIBRARY
 * Includes lessons, calculations, and examples
 * Usage: Import this file and use the functions as needed
 */

// ==================== PART 1: STATISTICS LESSONS ====================

const StatisticsLessons = {
    // Lesson 1: Basic Concepts
    basicConcepts: {
        population: "Entire group you want to study",
        sample: "Subset of the population",
        parameter: "Numerical measure describing a population characteristic",
        statistic: "Numerical measure describing a sample characteristic",
        
        dataTypes: {
            qualitative: "Non-numerical data (categories, names)",
            quantitative: {
                discrete: "Countable numbers (integers)",
                continuous: "Measurable numbers (decimals)"
            }
        }
    },

    // Lesson 2: Central Tendency
    centralTendency: {
        mean: {
            formula: "x̄ = Σx / n",
            description: "Average of all values"
        },
        median: {
            description: "Middle value when data is sorted"
        },
        mode: {
            description: "Most frequent value"
        },
        weightedMean: {
            formula: "x̄_w = Σ(wᵢ * xᵢ) / Σwᵢ"
        },
        geometricMean: {
            formula: "GM = (∏xᵢ)^(1/n)",
            description: "Used for growth rates"
        }
    },

    // Lesson 3: Dispersion
    dispersion: {
        range: "Max - Min",
        variance: {
            population: "σ² = Σ(x - μ)² / N",
            sample: "s² = Σ(x - x̄)² / (n-1)"
        },
        standardDeviation: "σ = √σ² or s = √s²",
        coefficientOfVariation: "CV = (σ/μ) × 100%",
        interquartileRange: "IQR = Q₃ - Q₁",
        quartiles: {
            q1: "25th percentile",
            q2: "50th percentile (median)",
            q3: "75th percentile"
        }
    },

    // Lesson 4: Probability
    probability: {
        rules: {
            addition: "P(A∪B) = P(A) + P(B) - P(A∩B)",
            multiplication: "P(A∩B) = P(A) × P(B|A)",
            complement: "P(A') = 1 - P(A)",
            conditional: "P(A|B) = P(A∩B) / P(B)"
        },
        bayesTheorem: "P(A|B) = [P(B|A) × P(A)] / P(B)"
    },

    // Lesson 5: Distributions
    distributions: {
        binomial: {
            formula: "P(X=k) = C(n,k) × p^k × (1-p)^(n-k)",
            mean: "μ = np",
            variance: "σ² = np(1-p)"
        },
        normal: {
            properties: "Bell-shaped, symmetric, mean=median=mode",
            empiricalRule: {
                oneSD: "68% within μ ± 1σ",
                twoSD: "95% within μ ± 2σ",
                threeSD: "99.7% within μ ± 3σ"
            },
            zScore: "z = (x - μ)/σ"
        }
    },

    // Lesson 6: Inferential Statistics
    inferential: {
        centralLimitTheorem: {
            description: "For large n, sampling distribution of means is approximately normal",
            mean: "μ_x̄ = μ",
            standardError: "σ_x̄ = σ/√n"
        },
        confidenceIntervals: {
            sigmaKnown: "CI = x̄ ± z*(σ/√n)",
            sigmaUnknown: "CI = x̄ ± t*(s/√n)"
        },
        hypothesisTesting: {
            steps: [
                "State H₀ and H₁",
                "Choose α (typically 0.05)",
                "Calculate test statistic",
                "Find p-value",
                "Make decision"
            ],
            errors: {
                type1: "Rejecting true H₀ (α)",
                type2: "Failing to reject false H₀ (β)"
            }
        }
    }
};

// ==================== PART 2: CALCULATION FUNCTIONS ====================

class StatisticsCalculator {
    
    // ========== DESCRIPTIVE STATISTICS ==========
    
    /**
     * Calculate mean (average)
     * @param {number[]} data - Array of numbers
     * @returns {number} Mean value
     */
    static mean(data) {
        if (!Array.isArray(data) || data.length === 0) return NaN;
        const sum = data.reduce((a, b) => a + b, 0);
        return sum / data.length;
    }

    /**
     * Calculate median
     * @param {number[]} data - Array of numbers
     * @returns {number} Median value
     */
    static median(data) {
        if (!Array.isArray(data) || data.length === 0) return NaN;
        const sorted = [...data].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[mid - 1] + sorted[mid]) / 2;
        } else {
            return sorted[mid];
        }
    }

    /**
     * Calculate mode(s)
     * @param {number[]} data - Array of numbers
     * @returns {number[]} Array of mode(s)
     */
    static mode(data) {
        if (!Array.isArray(data) || data.length === 0) return [];
        
        const frequency = {};
        let maxFreq = 0;
        const modes = [];
        
        // Count frequencies
        data.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            maxFreq = Math.max(maxFreq, frequency[num]);
        });
        
        // Find numbers with max frequency
        for (const num in frequency) {
            if (frequency[num] === maxFreq) {
                modes.push(Number(num));
            }
        }
        
        return modes;
    }

    /**
     * Calculate geometric mean
     * @param {number[]} data - Array of positive numbers
     * @returns {number} Geometric mean
     */
    static geometricMean(data) {
        if (!Array.isArray(data) || data.length === 0) return NaN;
        const product = data.reduce((a, b) => a * b, 1);
        return Math.pow(product, 1 / data.length);
    }

    /**
     * Calculate variance
     * @param {number[]} data - Array of numbers
     * @param {boolean} isSample - Whether data is a sample (default: true)
     * @returns {number} Variance
     */
    static variance(data, isSample = true) {
        if (!Array.isArray(data) || data.length < 2) return NaN;
        
        const mean = this.mean(data);
        const sumSquaredDiffs = data.reduce((sum, val) => {
            return sum + Math.pow(val - mean, 2);
        }, 0);
        
        return isSample ? sumSquaredDiffs / (data.length - 1) : sumSquaredDiffs / data.length;
    }

    /**
     * Calculate standard deviation
     * @param {number[]} data - Array of numbers
     * @param {boolean} isSample - Whether data is a sample
     * @returns {number} Standard deviation
     */
    static standardDeviation(data, isSample = true) {
        return Math.sqrt(this.variance(data, isSample));
    }

    /**
     * Calculate coefficient of variation
     * @param {number[]} data - Array of numbers
     * @returns {number} CV as percentage
     */
    static coefficientOfVariation(data) {
        const mean = this.mean(data);
        const sd = this.standardDeviation(data);
        return (sd / mean) * 100;
    }

    /**
     * Calculate quartiles
     * @param {number[]} data - Array of numbers
     * @returns {Object} Q1, Q2 (median), Q3
     */
    static quartiles(data) {
        if (!Array.isArray(data) || data.length === 0) return null;
        
        const sorted = [...data].sort((a, b) => a - b);
        
        const q2 = this.median(sorted);
        
        const mid = Math.floor(sorted.length / 2);
        const lowerHalf = sorted.length % 2 === 0 ? 
            sorted.slice(0, mid) : sorted.slice(0, mid);
        const upperHalf = sorted.length % 2 === 0 ? 
            sorted.slice(mid) : sorted.slice(mid + 1);
        
        const q1 = this.median(lowerHalf);
        const q3 = this.median(upperHalf);
        
        return { q1, q2, q3, iqr: q3 - q1 };
    }

    // ========== PROBABILITY DISTRIBUTIONS ==========
    
    /**
     * Calculate binomial probability
     * @param {number} n - Number of trials
     * @param {number} k - Number of successes
     * @param {number} p - Probability of success
     * @returns {number} Probability P(X = k)
     */
    static binomialProbability(n, k, p) {
        const combination = this.combination(n, k);
        return combination * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }

    /**
     * Calculate binomial cumulative probability
     * @param {number} n - Number of trials
     * @param {number} k - Maximum successes
     * @param {number} p - Probability of success
     * @param {boolean} lowerTail - P(X ≤ k) if true, P(X > k) if false
     * @returns {number} Cumulative probability
     */
    static binomialCumulative(n, k, p, lowerTail = true) {
        let sum = 0;
        if (lowerTail) {
            for (let i = 0; i <= k; i++) {
                sum += this.binomialProbability(n, i, p);
            }
        } else {
            for (let i = k + 1; i <= n; i++) {
                sum += this.binomialProbability(n, i, p);
            }
        }
        return sum;
    }

    /**
     * Calculate z-score
     * @param {number} x - Value
     * @param {number} mean - Population mean
     * @param {number} sd - Population standard deviation
     * @returns {number} Z-score
     */
    static zScore(x, mean, sd) {
        return (x - mean) / sd;
    }

    /**
     * Calculate factorial
     * @param {number} n - Number
     * @returns {number} Factorial
     */
    static factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    /**
     * Calculate combinations C(n, k)
     * @param {number} n - Total items
     * @param {number} k - Items to choose
     * @returns {number} Number of combinations
     */
    static combination(n, k) {
        if (k < 0 || k > n) return 0;
        if (k === 0 || k === n) return 1;
        
        // Use symmetry property
        k = Math.min(k, n - k);
        
        let result = 1;
        for (let i = 1; i <= k; i++) {
            result = (result * (n - i + 1)) / i;
        }
        return result;
    }

    // ========== INFERENTIAL STATISTICS ==========
    
    /**
     * Calculate confidence interval for mean
     * @param {number} mean - Sample mean
     * @param {number} sd - Standard deviation
     * @param {number} n - Sample size
     * @param {number} confidence - Confidence level (0.95 for 95%)
     * @param {boolean} sigmaKnown - Whether population SD is known
     * @returns {Object} {lower, upper, marginOfError}
     */
    static confidenceInterval(mean, sd, n, confidence = 0.95, sigmaKnown = false) {
        if (n <= 1) return null;
        
        const alpha = 1 - confidence;
        
        // Z-scores for common confidence levels
        const zScores = {
            0.90: 1.645,
            0.95: 1.96,
            0.99: 2.576
        };
        
        let criticalValue;
        if (sigmaKnown || n >= 30) {
            // Use z-distribution
            criticalValue = zScores[confidence] || 1.96;
        } else {
            // Use t-distribution (simplified - for exact values use stats table)
            criticalValue = 2.042; // Approximate for 95% CI, df=20
        }
        
        const standardError = sd / Math.sqrt(n);
        const marginOfError = criticalValue * standardError;
        
        return {
            lower: mean - marginOfError,
            upper: mean + marginOfError,
            marginOfError: marginOfError,
            confidence: confidence
        };
    }

    /**
     * Calculate correlation coefficient (Pearson's r)
     * @param {number[]} x - First variable
     * @param {number[]} y - Second variable
     * @returns {number} Correlation coefficient
     */
    static correlation(x, y) {
        if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length || x.length < 2) {
            return NaN;
        }
        
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
        const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
        const sumY2 = y.reduce((sum, val) => sum + val * val, 0);
        
        const numerator = (n * sumXY) - (sumX * sumY);
        const denominator = Math.sqrt(
            (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
        );
        
        return denominator === 0 ? 0 : numerator / denominator;
    }

    /**
     * Perform one-sample t-test
     * @param {number[]} sample - Sample data
     * @param {number} populationMean - Hypothesized population mean
     * @param {number} alpha - Significance level (default: 0.05)
     * @returns {Object} Test results
     */
    static tTestOneSample(sample, populationMean, alpha = 0.05) {
        if (!Array.isArray(sample) || sample.length < 2) return null;
        
        const n = sample.length;
        const sampleMean = this.mean(sample);
        const sampleSD = this.standardDeviation(sample, true);
        const standardError = sampleSD / Math.sqrt(n);
        const tStatistic = (sampleMean - populationMean) / standardError;
        const df = n - 1;
        
        // Simplified p-value calculation (for exact values use stats table)
        // This is an approximation for two-tailed test
        let pValue;
        if (Math.abs(tStatistic) < 1) pValue = 0.3;
        else if (Math.abs(tStatistic) < 2) pValue = 0.05;
        else pValue = 0.01;
        
        const rejectNull = pValue < alpha;
        
        return {
            tStatistic: tStatistic,
            degreesOfFreedom: df,
            pValue: pValue,
            sampleMean: sampleMean,
            hypothesizedMean: populationMean,
            rejectNull: rejectNull,
            conclusion: rejectNull ? 
                "Reject H₀: Means are significantly different" :
                "Fail to reject H₀: No significant difference"
        };
    }
}

// ==================== PART 3: EXAMPLE QUESTIONS & SOLUTIONS ====================

const StatisticsExamples = {
    
    // Example 1: Basic Calculations
    example1: {
        question: "Calculate mean, median, and mode for: [4, 8, 6, 5, 3, 8, 9]",
        solution: function() {
            const data = [4, 8, 6, 5, 3, 8, 9];
            return {
                data: data,
                mean: StatisticsCalculator.mean(data),
                median: StatisticsCalculator.median(data),
                mode: StatisticsCalculator.mode(data),
                variance: StatisticsCalculator.variance(data),
                standardDeviation: StatisticsCalculator.standardDeviation(data)
            };
        }
    },

    // Example 2: Binomial Distribution
    example2: {
        question: "Factory produces items with 2% defect rate. In 50 items, probability of: a) Exactly 2 defectives, b) At least 2 defectives",
        solution: function() {
            const n = 50;
            const p = 0.02;
            
            // a) Exactly 2 defectives
            const exactly2 = StatisticsCalculator.binomialProbability(n, 2, p);
            
            // b) At least 2 defectives
            const p0 = StatisticsCalculator.binomialProbability(n, 0, p);
            const p1 = StatisticsCalculator.binomialProbability(n, 1, p);
            const atLeast2 = 1 - p0 - p1;
            
            return {
                exactly2: exactly2,
                atLeast2: atLeast2,
                mean: n * p, // Expected number of defectives
                variance: n * p * (1 - p)
            };
        }
    },

    // Example 3: Normal Distribution
    example3: {
        question: "Test scores: μ=75, σ=8. a) Percentage above 85? b) Middle 90% range?",
        solution: function() {
            const mean = 75;
            const sd = 8;
            
            // a) Z-score for 85
            const z85 = StatisticsCalculator.zScore(85, mean, sd);
            // Percentage above 85 ≈ 10.56% (from z-table)
            
            // b) Middle 90% range
            // z for 95th percentile = 1.645
            const z95 = 1.645;
            const lower = mean - z95 * sd;
            const upper = mean + z95 * sd;
            
            return {
                zScore85: z85,
                percentageAbove85: "≈10.56%",
                middle90Range: {
                    lower: lower,
                    upper: upper
                }
            };
        }
    },

    // Example 4: Confidence Interval
    example4: {
        question: "Sample: n=36, x̄=82, s=12. Calculate 95% CI",
        solution: function() {
            const ci = StatisticsCalculator.confidenceInterval(82, 12, 36, 0.95, false);
            return ci;
        }
    },

    // Example 5: Hypothesis Test
    example5: {
        question: "Test if battery life < 100 hours. Sample: n=40, x̄=98, s=8, α=0.05",
        solution: function() {
            // Simulate sample data
            const sample = Array(40).fill(0).map(() => 98 + (Math.random() - 0.5) * 16);
            const testResult = StatisticsCalculator.tTestOneSample(sample, 100, 0.05);
            return testResult;
        }
    },

    // Example 6: Correlation
    example6: {
        question: "Calculate correlation for X:[2,4,6,8,10], Y:[1,3,5,7,9]",
        solution: function() {
            const x = [2, 4, 6, 8, 10];
            const y = [1, 3, 5, 7, 9];
            const r = StatisticsCalculator.correlation(x, y);
            return {
                correlation: r,
                interpretation: r === 1 ? "Perfect positive correlation" : 
                              r > 0.7 ? "Strong positive correlation" :
                              r > 0.3 ? "Moderate positive correlation" :
                              r > -0.3 ? "Weak correlation" :
                              "Negative correlation"
            };
        }
    },

    // Example 7: Quartiles
    example7: {
        question: "Calculate quartiles for: [2,4,4,4,5,5,7,9]",
        solution: function() {
            const data = [2, 4, 4, 4, 5, 5, 7, 9];
            const quartiles = StatisticsCalculator.quartiles(data);
            return {
                data: data,
                quartiles: quartiles,
                outliers: this.findOutliers(data, quartiles)
            };
        },
        
        findOutliers: function(data, quartiles) {
            if (!quartiles) return [];
            const iqr = quartiles.iqr;
            const lowerBound = quartiles.q1 - 1.5 * iqr;
            const upperBound = quartiles.q3 + 1.5 * iqr;
            
            return data.filter(x => x < lowerBound || x > upperBound);
        }
    }
};

// ==================== PART 4: PRACTICE TEST GENERATOR ====================

class PracticeTest {
    
    /**
     * Generate random dataset for practice
     * @param {number} size - Number of data points
     * @param {string} type - 'normal', 'uniform', 'skewed'
     * @returns {number[]} Generated dataset
     */
    static generateDataset(size = 10, type = 'normal') {
        let dataset = [];
        
        switch(type) {
            case 'normal':
                // Normal distribution: μ=50, σ=15
                for (let i = 0; i < size; i++) {
                    let u1 = Math.random();
                    let u2 = Math.random();
                    let z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                    dataset.push(50 + z * 15);
                }
                break;
                
            case 'uniform':
                // Uniform distribution: 0-100
                for (let i = 0; i < size; i++) {
                    dataset.push(Math.random() * 100);
                }
                break;
                
            case 'skewed':
                // Right-skewed distribution
                for (let i = 0; i < size; i++) {
                    dataset.push(Math.pow(Math.random(), 2) * 100);
                }
                break;
                
            default:
                dataset = Array(size).fill(0).map(() => Math.random() * 100);
        }
        
        return dataset.map(x => Math.round(x * 10) / 10); // Round to 1 decimal
    }
    
    /**
     * Generate practice questions
     * @param {number} count - Number of questions
     * @returns {Array} Array of question objects
     */
    static generateQuestions(count = 5) {
        const questions = [];
        const questionTypes = [
            'descriptive',
            'probability',
            'confidence',
            'hypothesis',
            'correlation'
        ];
        
        for (let i = 0; i < count; i++) {
            const type = questionTypes[i % questionTypes.length];
            
            switch(type) {
                case 'descriptive':
                    const dataset = this.generateDataset(15, 'normal');
                    questions.push({
                        id: i + 1,
                        type: 'descriptive',
                        question: `Given the dataset: [${dataset.slice(0, 5).join(', ')}...], calculate:
                        1. Mean
                        2. Median
                        3. Standard Deviation
                        4. Quartiles`,
                        dataset: dataset,
                        hint: "Sort the data before finding median and quartiles"
                    });
                    break;
                    
                case 'probability':
                    const n = Math.floor(Math.random() * 10) + 20;
                    const k = Math.floor(Math.random() * 5) + 1;
                    const p = (Math.floor(Math.random() * 10) + 1) / 100; // 1-10%
                    questions.push({
                        id: i + 1,
                        type: 'probability',
                        question: `In a batch of ${n} items with ${(p*100).toFixed(1)}% defect rate:
                        a) Probability of exactly ${k} defectives?
                        b) Probability of at least ${k} defectives?`,
                        parameters: { n, k, p },
                        hint: "Use binomial probability formula: C(n,k) * p^k * (1-p)^(n-k)"
                    });
                    break;
                    
                case 'confidence':
                    const mean = Math.floor(Math.random() * 50) + 50;
                    const sd = Math.floor(Math.random() * 10) + 5;
                    const sampleSize = Math.floor(Math.random() * 30) + 20;
                    const confidence = [0.90, 0.95, 0.99][Math.floor(Math.random() * 3)];
                    
                    questions.push({
                        id: i + 1,
                        type: 'confidence',
                        question: `Sample: n=${sampleSize}, x̄=${mean}, s=${sd.toFixed(1)}
                        Calculate the ${confidence*100}% confidence interval for the population mean.`,
                        parameters: { mean, sd, sampleSize, confidence },
                        hint: "Use: CI = x̄ ± t*(s/√n) for small samples, or z* for large samples"
                    });
                    break;
                    
                case 'correlation':
                    const size = 8;
                    const x = this.generateDataset(size, 'normal').map(v => v + 30);
                    const y = x.map(v => v * (0.5 + Math.random() * 0.5) + (Math.random() - 0.5) * 10);
                    
                    questions.push({
                        id: i + 1,
                        type: 'correlation',
                        question: `Calculate correlation coefficient for:
                        X: [${x.map(v => v.toFixed(1)).join(', ')}]
                        Y: [${y.map(v => v.toFixed(1)).join(', ')}]`,
                        datasets: { x, y },
                        hint: "Use formula: r = [nΣxy - ΣxΣy] / √{[nΣx²-(Σx)²][nΣy²-(Σy)²]}"
                    });
                    break;
            }
        }
        
        return questions;
    }
    
    /**
     * Check answer for a practice question
     * @param {Object} question - Question object
     * @param {Object} userAnswer - User's answer
     * @returns {Object} Result with score and feedback
     */
    static checkAnswer(question, userAnswer) {
        switch(question.type) {
            case 'descriptive':
                const stats = {
                    mean: StatisticsCalculator.mean(question.dataset),
                    median: StatisticsCalculator.median(question.dataset),
                    sd: StatisticsCalculator.standardDeviation(question.dataset),
                    quartiles: StatisticsCalculator.quartiles(question.dataset)
                };
                
                let score = 0;
                let feedback = [];
                
                if (Math.abs(userAnswer.mean - stats.mean) < 0.1) score++;
                else feedback.push(`Mean should be ${stats.mean.toFixed(2)}`);
                
                if (Math.abs(userAnswer.median - stats.median) < 0.1) score++;
                else feedback.push(`Median should be ${stats.median.toFixed(2)}`);
                
                if (Math.abs(userAnswer.sd - stats.sd) < 0.1) score++;
                else feedback.push(`SD should be ${stats.sd.toFixed(2)}`);
                
                return {
                    score: score,
                    total: 3,
                    feedback: feedback.length ? feedback : ["All correct!"],
                    correctAnswers: stats
                };
                
            case 'probability':
                const { n, k, p } = question.parameters;
                const correctExactly = StatisticsCalculator.binomialProbability(n, k, p);
                const correctAtLeast = StatisticsCalculator.binomialCumulative(n, k, p, false);
                
                const tolerance = 0.01;
                let probScore = 0;
                let probFeedback = [];
                
                if (Math.abs(userAnswer.exactly - correctExactly) < tolerance) probScore++;
                else probFeedback.push(`P(X=${k}) should be ${correctExactly.toFixed(4)}`);
                
                if (Math.abs(userAnswer.atLeast - correctAtLeast) < tolerance) probScore++;
                else probFeedback.push(`P(X≥${k}) should be ${correctAtLeast.toFixed(4)}`);
                
                return {
                    score: probScore,
                    total: 2,
                    feedback: probFeedback.length ? probFeedback : ["Both probabilities correct!"],
                    correctAnswers: {
                        exactly: correctExactly,
                        atLeast: correctAtLeast
                    }
                };
        }
        
        return { score: 0, total: 0, feedback: ["Answer checking not implemented for this type"] };
    }
}

// ==================== PART 5: EXPORT & USAGE EXAMPLES ====================

// Export everything for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
    // Node.js export
    module.exports = {
        Lessons: StatisticsLessons,
        Calculator: StatisticsCalculator,
        Examples: StatisticsExamples,
        PracticeTest: PracticeTest
    };
} else {
    // Browser export - attach to window
    window.Statistics = {
        Lessons: StatisticsLessons,
        Calculator: StatisticsCalculator,
        Examples: StatisticsExamples,
        PracticeTest: PracticeTest
    };
}

// ==================== USAGE EXAMPLES ====================

// Example usage (will run if loaded in browser)
if (typeof window !== 'undefined') {
    console.log("=== STATISTICS LIBRARY LOADED ===");
    console.log("Available objects: Statistics.Lessons, Statistics.Calculator, Statistics.Examples, Statistics.PracticeTest");
    
    // Quick demo
    console.log("\n=== QUICK DEMO ===");
    
    // Demo 1: Basic calculations
    const demoData = [4, 8, 6, 5, 3, 8, 9];
    console.log("Data:", demoData);
    console.log("Mean:", StatisticsCalculator.mean(demoData));
    console.log("Median:", StatisticsCalculator.median(demoData));
    console.log("Mode:", StatisticsCalculator.mode(demoData));
    console.log("Standard Deviation:", StatisticsCalculator.standardDeviation(demoData));
    
    // Demo 2: Run an example
    console.log("\n=== EXAMPLE 1 SOLUTION ===");
    console.log(StatisticsExamples.example1.solution());
    
    // Demo 3: Generate practice questions
    console.log("\n=== PRACTICE QUESTIONS ===");
    const questions = PracticeTest.generateQuestions(3);
    questions.forEach((q, i) => {
        console.log(`Q${i+1}: ${q.question}`);
    });
    
    console.log("\n=== LESSON: CENTRAL TENDENCY ===");
    console.log(StatisticsLessons.centralTendency);
}

// ==================== ADDITIONAL HELPER FUNCTIONS ====================

/**
 * Format statistical results for display
 * @param {Object} results - Statistical results
 * @returns {string} Formatted string
 */
function formatResults(results) {
    let output = "Statistical Analysis Results:\n";
    output += "=".repeat(40) + "\n";
    
    for (const [key, value] of Object.entries(results)) {
        if (typeof value === 'number') {
            output += `${key}: ${value.toFixed(4)}\n`;
        } else if (typeof value === 'object') {
            output += `${key}:\n`;
            for (const [subKey, subValue] of Object.entries(value)) {
                output += `  ${subKey}: ${typeof subValue === 'number' ? subValue.toFixed(4) : subValue}\n`;
            }
        } else {
            output += `${key}: ${value}\n`;
        }
    }
    
    return output;
}

/**
 * Create a summary statistics report
 * @param {number[]} data - Input data
 * @returns {Object} Complete statistical summary
 */
function completeSummary(data) {
    return {
        count: data.length,
        mean: StatisticsCalculator.mean(data),
        median: StatisticsCalculator.median(data),
        mode: StatisticsCalculator.mode(data),
        min: Math.min(...data),
        max: Math.max(...data),
        range: Math.max(...data) - Math.min(...data),
        variance: StatisticsCalculator.variance(data),
        standardDeviation: StatisticsCalculator.standardDeviation(data),
        coefficientOfVariation: StatisticsCalculator.coefficientOfVariation(data),
        quartiles: StatisticsCalculator.quartiles(data)
    };
}

// Add to Statistics object
if (typeof window !== 'undefined') {
    window.Statistics.formatResults = formatResults;
    window.Statistics.completeSummary = completeSummary;
}