const productAnalyticsData = {
    title: "Product Analytics",
    metadata: {
        track: 'data-analyst',
        category: 'Product',
        icon: '🚀',
        description: "Analyze user behavior to understand engagement, retention, and conversion. Learn to build funnels, cohorts, and product dashboards."
    },
    lessons: [
        {
            number: 1,
            title: "Conversion Funnels",
            content: "A funnel tracks the steps a user takes to complete a goal (e.g., signup, purchase). Analyzing drop-off at each step helps identify friction points in the user journey."
        },
        {
            number: 2,
            title: "Cohort Analysis",
            content: "A cohort is a group of users who share a common characteristic (e.g., signed up in the same week). Cohort analysis tracks the behavior of these groups over time to understand retention and long-term engagement."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "medium",
            question: "You see a 50% drop-off between the 'Add to Cart' and 'Checkout' steps in your purchase funnel. What is a likely cause?",
            answer: "High shipping costs, a required login, a long or confusing checkout form, or a lack of trust signals (e.g., security badges)."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.productAnalyticsData = productAnalyticsData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productAnalyticsData;
}