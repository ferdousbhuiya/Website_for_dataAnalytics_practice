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
            title: "Linear Regression",
            content: "Linear regression models the relationship between a dependent variable and one or more independent variables by fitting a linear equation to the observed data."
        },
        {
            number: 2,
            title: "Logistic Regression",
            content: "Logistic regression is used for binary classification problems (e.g., spam vs. not spam). It models the probability of a discrete outcome given an input variable."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What type of problem is logistic regression used for?",
            answer: "Binary classification problems."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.statisticalModelingData = statisticalModelingData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = statisticalModelingData;
}