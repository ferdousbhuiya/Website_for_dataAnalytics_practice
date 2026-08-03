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
            content: "Supervised learning uses labeled data to train a model (e.g., predicting house prices). Unsupervised learning finds patterns in unlabeled data (e.g., clustering customers into segments)."
        },
        {
            number: 2,
            title: "The Bias-Variance Tradeoff",
            content: "Bias is the error from erroneous assumptions in the learning algorithm. Variance is the error from sensitivity to small fluctuations in the training set. A simple model has high bias and low variance; a complex model has low bias and high variance. The goal is to find a balance."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "Is customer segmentation a supervised or unsupervised learning problem?",
            answer: "Unsupervised, because you are trying to discover the segments from the data, not predict a known label."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.machineLearningData = machineLearningData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = machineLearningData;
}