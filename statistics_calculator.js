/**
 * STATISTICS CALCULATOR UTILITY
 * Comprehensive statistical functions extracted from statistics_lesson_question_answer.js
 * Includes descriptive statistics, probability distributions, and inferential statistics
 */

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
        
        data.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            maxFreq = Math.max(maxFreq, frequency[num]);
        });
        
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
        
        const meanVal = this.mean(data);
        const sumSquaredDiffs = data.reduce((sum, val) => {
            return sum + Math.pow(val - meanVal, 2);
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
        const meanVal = this.mean(data);
        const sd = this.standardDeviation(data);
        return (sd / meanVal) * 100;
    }

    /**
     * Calculate quartiles
     * @param {number[]} data - Array of numbers
     * @returns {Object} Q1, Q2 (median), Q3, IQR
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

    /**
     * Find outliers using 1.5×IQR rule
     * @param {number[]} data - Array of numbers
     * @returns {Object} Outliers and bounds
     */
    static findOutliers(data) {
        const q = this.quartiles(data);
        if (!q) return null;
        
        const lowerBound = q.q1 - 1.5 * q.iqr;
        const upperBound = q.q3 + 1.5 * q.iqr;
        
        const outliers = data.filter(x => x < lowerBound || x > upperBound);
        
        return {
            outliers,
            lowerBound,
            upperBound,
            count: outliers.length
        };
    }

    // ========== PROBABILITY & DISTRIBUTIONS ==========
    
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
        
        k = Math.min(k, n - k);
        
        let result = 1;
        for (let i = 1; i <= k; i++) {
            result = (result * (n - i + 1)) / i;
        }
        return result;
    }

    /**
     * Calculate binomial probability P(X = k)
     * @param {number} n - Number of trials
     * @param {number} k - Number of successes
     * @param {number} p - Probability of success
     * @returns {number} Probability
     */
    static binomialProbability(n, k, p) {
        const comb = this.combination(n, k);
        return comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }

    /**
     * Calculate binomial cumulative probability
     * @param {number} n - Number of trials
     * @param {number} k - Maximum successes
     * @param {number} p - Probability of success
     * @param {boolean} lowerTail - P(X <= k) if true, P(X > k) if false
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
        if (sd === 0) return NaN;
        return (x - mean) / sd;
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
        
        const zScores = {
            0.90: 1.645,
            0.95: 1.96,
            0.99: 2.576
        };
        
        let criticalValue;
        if (sigmaKnown || n >= 30) {
            criticalValue = zScores[confidence] || 1.96;
        } else {
            criticalValue = 2.042;
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
     * Calculate Pearson correlation coefficient
     * @param {number[]} x - First variable
     * @param {number[]} y - Second variable
     * @returns {number} Correlation coefficient (-1 to 1)
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
        
        let pValue;
        if (Math.abs(tStatistic) < 1) pValue = 0.3;
        else if (Math.abs(tStatistic) < 2) pValue = 0.05;
        else pValue = 0.01;
        
        const rejectNull = pValue < alpha;
        
        return {
            tStatistic: tStatistic.toFixed(4),
            degreesOfFreedom: df,
            pValue: pValue,
            sampleMean: sampleMean.toFixed(2),
            hypothesizedMean: populationMean,
            rejectNull: rejectNull,
            conclusion: rejectNull ? 
                "Reject H₀: Means are significantly different" :
                "Fail to reject H₀: No significant difference"
        };
    }
}

// ========== SUMMARY STATISTICS FUNCTION ==========

/**
 * Generate complete statistical summary for a dataset
 * @param {number[]} data - Input data
 * @returns {Object} Complete statistical summary
 */
function completeSummary(data) {
    if (!Array.isArray(data) || data.length === 0) return null;
    
    return {
        count: data.length,
        mean: StatisticsCalculator.mean(data).toFixed(4),
        median: StatisticsCalculator.median(data).toFixed(4),
        mode: StatisticsCalculator.mode(data),
        min: Math.min(...data),
        max: Math.max(...data),
        range: Math.max(...data) - Math.min(...data),
        variance: StatisticsCalculator.variance(data).toFixed(4),
        standardDeviation: StatisticsCalculator.standardDeviation(data).toFixed(4),
        coefficientOfVariation: StatisticsCalculator.coefficientOfVariation(data).toFixed(2) + "%",
        quartiles: StatisticsCalculator.quartiles(data),
        outliers: StatisticsCalculator.findOutliers(data)
    };
}

/**
 * Format statistical results for display
 * @param {Object} results - Statistical results
 * @returns {string} Formatted string
 */
function formatResults(results) {
    let output = "Statistical Analysis Results:\n";
    output += "=".repeat(50) + "\n";
    
    for (const [key, value] of Object.entries(results)) {
        if (typeof value === 'number') {
            output += `${key}: ${value.toFixed(4)}\n`;
        } else if (typeof value === 'object' && value !== null) {
            output += `${key}:\n`;
            if (Array.isArray(value)) {
                output += `  [${value.join(', ')}]\n`;
            } else {
                for (const [subKey, subValue] of Object.entries(value)) {
                    output += `  ${subKey}: ${typeof subValue === 'number' ? subValue.toFixed(4) : subValue}\n`;
                }
            }
        } else {
            output += `${key}: ${value}\n`;
        }
    }
    
    return output;
}

// Export for browser use
if (typeof window !== 'undefined') {
    window.StatisticsCalculator = StatisticsCalculator;
    window.completeSummary = completeSummary;
    window.formatResults = formatResults;
    
    console.log("=== STATISTICS CALCULATOR LOADED ===");
    console.log("Available: StatisticsCalculator, completeSummary(), formatResults()");
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StatisticsCalculator,
        completeSummary,
        formatResults
    };
}
