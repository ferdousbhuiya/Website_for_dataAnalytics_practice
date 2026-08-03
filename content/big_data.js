const bigDataData = {
    title: "Big Data Technologies",
    metadata: {
        track: 'data-engineer',
        category: 'Big Data',
        icon: '🐘',
        description: "Understand the landscape of distributed systems. Learn the fundamentals of Spark for large-scale data processing."
    },
    lessons: [
        {
            number: 1,
            title: "Introduction to Spark",
            content: "Apache Spark is a unified analytics engine for large-scale data processing. Its core abstraction is the Resilient Distributed Dataset (RDD), an immutable distributed collection of objects."
        },
        {
            number: 2,
            title: "MapReduce Paradigm",
            content: "MapReduce is a programming model for processing large data sets with a parallel, distributed algorithm on a cluster. The 'map' step filters and sorts, and the 'reduce' step performs a summary operation."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the core data structure in Spark?",
            answer: "The Resilient Distributed Dataset (RDD)."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.bigDataData = bigDataData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bigDataData;
}