const experimentDesignData = {
    title: "Experiment Design & Analysis",
    metadata: {
        track: 'core',
        category: 'Experiments',
        icon: '🧪',
        description: "Learn to design, run, and analyze rigorous experiments to drive product and business decisions."
    },
    lessons: [
        {
            number: 1,
            title: "Formulating a Hypothesis",
            content: "A good hypothesis is a clear, testable statement about the expected outcome of an experiment. It should include the change you are making, the metric you expect to improve, and the reason why."
        },
        {
            number: 2,
            title: "Choosing Your Metrics",
            content: "Select a primary metric (the one you are trying to move) and several secondary metrics (to monitor for unintended side effects). Your primary metric should be directly related to your hypothesis."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What are the three components of a good hypothesis?",
            answer: "The change, the expected outcome (metric), and the rationale."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.experimentDesignData = experimentDesignData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = experimentDesignData;
}