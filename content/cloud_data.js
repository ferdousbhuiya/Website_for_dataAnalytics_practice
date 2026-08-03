const cloudDataData = {
    title: "Cloud Data Platforms",
    metadata: {
        track: 'data-engineer',
        category: 'Cloud',
        icon: '☁️',
        description: "An overview of data warehousing and processing services on major cloud platforms like AWS, GCP, and Azure."
    },
    lessons: [
        {
            number: 1,
            title: "AWS: Redshift and S3",
            content: "Amazon Redshift is a petabyte-scale data warehouse service. S3 (Simple Storage Service) is a highly scalable object storage service, often used as a data lake."
        },
        {
            number: 2,
            title: "GCP: BigQuery and Cloud Storage",
            content: "Google BigQuery is a serverless, highly scalable data warehouse. Google Cloud Storage is a unified object storage service."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "Which AWS service is commonly used as a data lake?",
            answer: "Amazon S3 (Simple Storage Service)."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.cloudDataData = cloudDataData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cloudDataData;
}