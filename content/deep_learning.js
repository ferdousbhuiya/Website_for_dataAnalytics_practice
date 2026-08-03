const deepLearningData = {
    title: "Deep Learning",
    metadata: {
        track: 'data-scientist',
        category: 'ML',
        icon: '🧠',
        description: "An introduction to neural networks, their architectures, and their applications."
    },
    lessons: [
        {
            number: 1,
            title: "What is a Neural Network?",
            content: "A neural network is a series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates."
        },
        {
            number: 2,
            title: "Activation Functions",
            content: "Activation functions introduce non-linearity into the network, allowing it to learn complex patterns. Common activation functions include ReLU, Sigmoid, and Tanh."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the purpose of an activation function?",
            answer: "To introduce non-linearity into the neural network."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.deepLearningData = deepLearningData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = deepLearningData;
}