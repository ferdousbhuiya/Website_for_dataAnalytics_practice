const fs = require('fs');

try {
    const data = fs.readFileSync('data.js', 'utf8');

    // Define the expected counts based on index.html
    const expected = {
        sql: { lessons: 12, questions: 45 },
        statistics: { lessons: 10, questions: 35 },
        python: { lessons: 14, questions: 40 },
        visualization: { lessons: 8, questions: 25 },
        excel: { lessons: 9, questions: 30 },
        business: { lessons: 11, questions: 35 }
    };

    const topics = Object.keys(expected);

    console.log("Current Content Counts:");
    console.log("-----------------------");

    topics.forEach(topic => {
        // Extract the section for the topic
        const topicRegex = new RegExp(`${topic}\\s*:\\s*{[\\s\\S]*?lessons:\\s*\\[([\\s\\S]*?)\\]\\s*,\\s*questions:`, 'i');
        const match = data.match(topicRegex);

        let lessonCount = 0;
        if (match && match[1]) {
            // Count "number:" occurrences in the overview/lessons array
            const lessons = match[1].match(/number:\s*\d+/g);
            lessonCount = lessons ? lessons.length : 0;
        }

        // Also check questions count again to be sure
        const qRegex = new RegExp(`${topic}\\s*:\\s*{[\\s\\S]*?questions:\\s*\\[([\\s\\S]*?)\\]\\s*`, 'i');
        // This regex is tricky because of nested brackets, but let's try a simple approach since we know the structure
        // actually looking for the 'questions' array specific to the topic is better done by finding the topic start and then the next 'questions: ['

        // Simplified approach: Split the file by topic keys to isolate sections
        const topicStart = data.indexOf(`${topic}: {`);
        if (topicStart === -1) return;

        // Find end of topic (roughly - next topic or end of object)
        // This is a rough heuristic
    });

    // innovative solution: load the data.js as a module? 
    // It's a JS file with `const topicsData = ...`. I can append `module.exports = topicsData;` and require it.
    // much more reliable.
} catch (e) {
    console.error(e);
}
