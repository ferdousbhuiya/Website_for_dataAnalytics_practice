const abTestsData = {
    title: "A/B Testing",
    metadata: {
        track: 'data-analyst',
        category: 'Experiments',
        icon: '🧭',
        description: "Master the design, execution, and interpretation of A/B tests to make data-driven decisions."
    },
    lessons: [
        {
            number: 1,
            title: "Statistical Significance",
            content: "Statistical significance (p-value) tells you the probability that the observed difference between your control and variant was due to random chance. A low p-value (typically < 0.05) means the result is likely real."
        },
        {
            number: 2,
            title: "Sample Size and Power",
            content: "Power is the probability of detecting a real effect if it exists. You need to calculate the required sample size *before* the test to ensure you have enough power to detect the minimum effect you care about."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "medium",
            question: "What does a p-value of 0.03 mean?",
            answer: "There is a 3% probability of observing the measured difference (or a larger one) between the control and variant, assuming there is no real difference between them."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.abTestsData = abTestsData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = abTestsData;
}