const machineLearningData = {
    title: "Machine Learning Foundations",
    metadata: {
        track: 'data-scientist',
        category: 'ML',
        icon: '🤖',
        description: "Learn the core concepts of supervised and unsupervised learning, model evaluation, and feature engineering."
    },
    lessons: [
        {
            number: 1,
            title: "Supervised vs. Unsupervised Learning",
            content: `Supervised learning uses labeled data to train a model (e.g., predicting house prices from historical sales). Unsupervised learning finds patterns in unlabeled data (e.g., clustering customers into segments).

**How they fit in the ML landscape:**

\`\`\`mermaid
graph LR
    A[Raw Data] --> B{Has Labels?}
    B -->|Yes| C[Supervised Learning]
    B -->|No| D[Unsupervised Learning]
    C --> E[Regression: price, revenue]
    C --> F[Classification: churn, spam]
    D --> G[Clustering: segments]
    D --> H[Dimensionality Reduction]
\`\`\`

- **Regression:** predicts a continuous value (price, salary).
- **Classification:** predicts a discrete label (churn yes/no, spam).
- **Clustering:** groups similar observations (customer segments).
- **Dimensionality reduction:** compresses features while keeping signal (PCA).`
        },
        {
            number: 2,
            title: "The Bias-Variance Tradeoff",
            content: `Bias is the error from erroneous assumptions in the learning algorithm. Variance is the error from sensitivity to small fluctuations in the training set.

- **High bias + low variance:** underfitting — too simple, misses patterns.
- **Low bias + high variance:** overfitting — too complex, memorizes noise.

**The tradeoff curve:**

\`\`\`mermaid
graph LR
    A[Model Complexity] -->|increases| B[Variance up]
    A -->|increases| C[Bias down]
    B --> D[Total Error]
    C --> D
    D --> E[Sweet Spot: low total error]
\`\`\`

The goal is the sweet spot where total error (bias + variance + irreducible noise) is minimized.`
        },
        {
            number: 3,
            title: "Train / Validation / Test Split",
            content: `Never evaluate a model on the data it trained on — it will look artificially good.

\`\`\`mermaid
graph LR
    A[Full Dataset] --> B[Train 70-80%]
    A --> C[Validation 10-15%]
    A --> D[Test 10-15%]
    B --> E[Fit Model]
    E --> F[Tune on Validation]
    F --> G[Final Check on Test]
\`\`\`

- **Train:** fit the model.
- **Validation:** tune hyperparameters, compare candidates.
- **Test:** evaluate the final model once, never touch it during tuning.`
        },
        {
            number: 4,
            title: "Classification Metrics: Accuracy, Precision, Recall, F1",
            content: `For a churn model, accuracy alone misleads when classes are imbalanced (e.g., 95% don't churn).

\`\`\`mermaid
flowchart LR
    subgraph Actual
        A1[Churn Yes] --- A2[Churn No]
    end
    subgraph Predicted
        P1[Churn Yes] --- P2[Churn No]
    end
\`\`\`

- **Precision = TP / (TP + FP):** of the ones you flagged as churn, how many actually churned.
- **Recall = TP / (TP + FN):** of the actual churners, how many you caught.
- **F1 = harmonic mean of precision and recall:** balances both.

When false negatives are costly (missing a real churner), prioritize recall. When false positives are costly (harassing loyal customers), prioritize precision.`
        },
        {
            number: 5,
            title: "Overfitting, Regularization, and Cross-Validation",
            content: `Overfitting happens when a model learns noise. Defenses:

1. **More data** — the most reliable fix.
2. **Regularization** (L1/Lasso, L2/Ridge) — penalizes large coefficients.
3. **Simplify the model** — fewer features, shallower trees.
4. **Cross-validation** — repeatedly split data to get stable performance estimates.

\`\`\`mermaid
flowchart TD
    A[Model too complex] --> B[Learns noise]
    B --> C[Great on train, bad on test]
    C --> D{Regularize / simplify / more data}
    D --> A
    D --> E[Generalizes well]
\`\`\``
        },
        {
            number: 6,
            title: "Feature Engineering Fundamentals",
            content: `Features drive model performance more than the choice of algorithm. Common techniques:

- **Encoding:** one-hot for categories, label encoding for ordinal.
- **Scaling:** standardize (z-score) or normalize (min-max) for distance-based models.
- **Feature creation:** date → day of week, text → word counts.
- **Handling missing data:** impute with mean/median/mode, or flag the absence.
- **Feature selection:** drop correlated or low-information features to reduce overfitting.`
        },
        {
            number: 7,
            title: "Common ML Algorithms Cheat Sheet",
            content: `Match the algorithm to the problem:

\`\`\`mermaid
graph TD
    A[Problem] --> B{Type?}
    B -->|Continuous target| C[Linear Regression / Random Forest Regressor]
    B -->|Binary/Multi class| D[Logistic Regression / SVM / Random Forest]
    B -->|Time series| E[ARIMA / Prophet]
    B -->|Find groups| F[K-Means / DBSCAN]
    B -->|Recommend| G[Collaborative Filtering / Matrix Factorization]
\`\`\`

Start simple (linear/logistic), then move to ensembles (random forest, gradient boosting) only if needed.`
        },
        {
            number: 8,
            title: "Interview Problem: Churn Prediction End-to-End",
            content: `A realistic interview scenario:

1. **Business goal:** reduce customer churn by 10%.
2. **Define the label:** churned = no purchase in 90 days.
3. **Engineer features:** recency, frequency, monetary value (RFM), support tickets, tenure.
4. **Choose a baseline:** logistic regression — interpretable, fast.
5. **Evaluate:** precision/recall at a chosen threshold, ROC-AUC.
6. **Communicate:** the model flags high-risk customers; retention team intervenes.

**The full ML pipeline:**

\`\`\`mermaid
flowchart LR
    A[Data Collection] --> B[Cleaning]
    B --> C[Feature Engineering]
    C --> D[Train/Test Split]
    D --> E[Model Training]
    E --> F[Evaluation]
    F -->|tune| E
    F --> G[Deploy & Monitor]
    G --> H[Feedback Loop]
    H --> C
\`\`\``
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "Is customer segmentation a supervised or unsupervised learning problem?",
            answer: "Unsupervised, because you are trying to discover the segments from the data, not predict a known label."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "What type of ML problem is predicting house prices?",
            answer: "Supervised regression, because the target (price) is a continuous value and labels are known."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "You have a churn model with 95% accuracy but churn is only 5% of the population. Why is accuracy misleading?",
            answer: "A model that always predicts 'no churn' gets 95% accuracy but catches zero churners. Use precision, recall, and F1 instead — they measure actual identification quality."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "What is the difference between precision and recall? Give an example where recall matters more.",
            answer: "Precision = TP/(TP+FP): how many flagged positives are real. Recall = TP/(TP+FN): how many real positives were caught. Recall matters more when missing a positive is costly — e.g., catching fraudulent transactions or cancer screening."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "A model scores 99% on training data but 70% on test data. What is happening and how do you fix it?",
            answer: "Overfitting — the model memorized the training noise. Fixes: more data, regularization (L1/L2), simplify the model, feature selection, and cross-validation."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "Explain the bias-variance tradeoff in the context of decision trees with different depths.",
            answer: "A shallow tree has high bias (underfits, misses patterns) but low variance. A very deep tree has low bias but high variance (overfits noise). Depth that minimizes total error = bias + variance is optimal, found via cross-validation."
        },
        {
            number: 7,
            difficulty: "hard",
            question: "Why use cross-validation instead of a single train/test split?",
            answer: "A single split gives a noisy estimate that depends on which rows landed in each set. K-fold cross-validation trains on K different subsets and averages the scores, giving a more stable, less biased estimate of generalization."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "How would you handle a highly imbalanced dataset (e.g., 1% positive class)?",
            answer: "Options: resample (SMOTE/undersampling), class weights in the loss function, choose threshold via precision-recall curve, use metrics like AUC-PR instead of accuracy, and consider anomaly detection approaches. Always evaluate on the actual class distribution."
        },
        {
            number: 9,
            difficulty: "medium",
            question: "What is the difference between L1 and L2 regularization?",
            answer: "L1 (Lasso) adds the absolute value of coefficients — it shrinks some to exactly zero, performing feature selection. L2 (Ridge) adds the squared magnitude — it shrinks coefficients but rarely to zero, keeping all features."
        },
        {
            number: 10,
            difficulty: "easy",
            question: "Why must the test set never be used during model tuning?",
            answer: "If you tune on the test set, the model learns its quirks and test accuracy becomes optimistic — you lose an honest measure of generalization. Test is reserved for a single final evaluation."
        }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "A regional retailer has 15,000 customer records (tabular: age, income, recency, frequency) and needs to predict purchase probability. Compliance requires the marketing team to explain to regulators why each customer was flagged.",
            question: "Which model should the data scientist choose first?",
            options: [
                "A deep neural network with 6 hidden layers",
                "Logistic regression or a shallow decision tree",
                "A convolutional neural network",
                "K-Means clustering"
            ],
            answer: "Correct Option: Logistic regression or a shallow decision tree"
        },
        {
            case: 2,
            scenario: "A marketplace uploads 2 million product photos daily and needs to auto-assign each item to one of 40 category labels.",
            question: "Which modeling approach fits this problem best?",
            options: [
                "Linear regression on tabular features",
                "Logistic regression on hand-engineered pixel counts",
                "A convolutional neural network (CNN)",
                "DBSCAN clustering"
            ],
            answer: "Correct Option: A convolutional neural network (CNN)"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.machineLearningData = machineLearningData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = machineLearningData;
}
