const communicationData = {
    title: "Communication & Stakeholder Management",
    metadata: {
        track: 'core',
        category: 'Soft Skills',
        icon: '💬',
        description: "Translate data into business impact. Present findings, manage expectations, and build trust with non-technical stakeholders."
    },
    lessons: [
        {
            number: 1,
            title: "The Pyramid Principle: Structuring Your Narrative",
            content: "Start with the answer first. Then, group and summarize your supporting arguments. Finally, explain your supporting ideas in a logical order."
        },
        {
            number: 2,
            title: "Visual Storytelling: Beyond the Chart",
            content: "A great chart isn't enough. You need to build a narrative around it. What is the key takeaway? What action should be taken? Use annotations, callouts, and a clear title to guide your audience."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the core idea of the Pyramid Principle?",
            answer: "Start with your conclusion, then provide supporting arguments."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.communicationData = communicationData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = communicationData;
}