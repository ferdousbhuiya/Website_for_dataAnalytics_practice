const dataEngineeringData = {
    title: "Data Engineering Fundamentals",
    metadata: {
        track: 'data-engineer',
        category: 'Pipelines',
        icon: '🔄',
        description: "Learn the principles of building and maintaining reliable, scalable data pipelines. Covers orchestration, data quality, and testing."
    },
    lessons: [
        {
            number: 1,
            title: "Orchestration with Airflow",
            content: "Airflow is a platform to programmatically author, schedule, and monitor workflows. It represents pipelines as Directed Acyclic Graphs (DAGs) of tasks."
        },
        {
            number: 2,
            title: "Data Warehousing vs. Data Lakes",
            content: "A data warehouse stores structured, filtered data for a specific purpose. A data lake is a vast pool of raw data in its native format. Modern architectures often use a 'lakehouse' approach, combining the benefits of both."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is a DAG in the context of Airflow?",
            answer: "A Directed Acyclic Graph, which defines the set of tasks in a workflow and their dependencies."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.dataEngineeringData = dataEngineeringData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dataEngineeringData;
}