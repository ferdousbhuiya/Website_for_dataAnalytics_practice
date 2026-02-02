const fs = require('fs');
const path = require('path');

// 1. Get New Content
const lessonsData = require('./lessons_data.js');
const newQuestionsData = require('./new_questions_data.js');

// 2. Extract Existing Questions
const existingFileContent = fs.readFileSync('data.js', 'utf8');

function extractQuestionsBlock(topic) {
    // Regex to find 'questions: [' and matching closing bracket is hard with regex alone due to nesting.
    // So we use a parser approach.
    const startMarker = `${topic}:`;
    const startIdx = existingFileContent.indexOf(startMarker);
    if (startIdx === -1) return "[]";

    const qMarker = "questions: [";
    const qStartIdx = existingFileContent.indexOf(qMarker, startIdx);
    if (qStartIdx === -1) return "[]";

    // Start counting brackets from the '[' of questions: [
    let openCount = 0;
    let foundStart = false;
    let endIdx = -1;

    // We start looking from qStartIdx + "questions: ".length
    const arrayStartIdx = qStartIdx + "questions: ".length;

    for (let i = arrayStartIdx; i < existingFileContent.length; i++) {
        if (existingFileContent[i] === '[') {
            openCount++;
            foundStart = true;
        } else if (existingFileContent[i] === ']') {
            openCount--;
        }

        if (foundStart && openCount === 0) {
            endIdx = i + 1; // Include the closing ']'
            break;
        }
    }

    if (endIdx !== -1) {
        return existingFileContent.substring(arrayStartIdx, endIdx);
    }
    return "[]";
}

const existingSqlQuestions = extractQuestionsBlock('sql'); // String "[...]"
const existingStatsQuestions = extractQuestionsBlock('statistics');
const existingPythonQuestions = extractQuestionsBlock('python');

// 3. Construct new file content
// We need to format objects manually or use JSON.stringify but keep existing raw chunks
// Since existing chunks are strings of code, we can just inject them.

function formatLessons(lessons) {
    return JSON.stringify(lessons, null, 4);
}

function formatQuestions(questions) {
    return JSON.stringify(questions, null, 4);
}

let fileContent = `// ===== Data Structure for All Topics =====

const topicsData = {
    sql: {
        title: "SQL Fundamentals",
        lessons: ${formatLessons(lessonsData.sql)},
        questions: ${existingSqlQuestions}
    },

    statistics: {
        title: "Statistics & Probability",
        lessons: ${formatLessons(lessonsData.statistics)},
        questions: ${existingStatsQuestions}
    },

    python: {
        title: "Python for Data Analysis",
        lessons: ${formatLessons(lessonsData.python)},
        questions: ${existingPythonQuestions}
    },

    visualization: {
        title: "Data Visualization",
        lessons: ${formatLessons(lessonsData.visualization)},
        questions: ${formatQuestions(newQuestionsData.visualization)}
    },

    excel: {
        title: "Excel & Spreadsheets",
        lessons: ${formatLessons(lessonsData.excel)},
        questions: ${formatQuestions(newQuestionsData.excel)}
    },

    business: {
        title: "Business Intelligence",
        lessons: ${formatLessons(lessonsData.business)},
        questions: ${formatQuestions(newQuestionsData.business)}
    }
};
`;

fs.writeFileSync('data.js', fileContent);
console.log("Successfully rebuilt data.js with all lessons and questions.");
