const fs = require('fs');

// 1. Load the new lessons
const part1 = require('./expanded_part1.js');
const part2 = require('./expanded_part2.js');

const newLessons = {
    ...part1,
    ...part2
};

// 2. Load existing data.js to get the questions
// We'll use the extraction logic again because it's robust
const existingFileContent = fs.readFileSync('data.js', 'utf8');

function extractQuestionsBlock(topic) {
    const startMarker = `${topic}:`;
    const startIdx = existingFileContent.indexOf(startMarker);
    if (startIdx === -1) return "[]";

    const qMarker = "questions: [";
    const qStartIdx = existingFileContent.indexOf(qMarker, startIdx);
    if (qStartIdx === -1) return "[]";

    let openCount = 0;
    let foundStart = false;
    let endIdx = -1;
    const arrayStartIdx = qStartIdx + "questions: ".length;

    for (let i = arrayStartIdx; i < existingFileContent.length; i++) {
        if (existingFileContent[i] === '[') {
            openCount++;
            foundStart = true;
        } else if (existingFileContent[i] === ']') {
            openCount--;
        }

        if (foundStart && openCount === 0) {
            endIdx = i + 1;
            break;
        }
    }

    if (endIdx !== -1) {
        return existingFileContent.substring(arrayStartIdx, endIdx);
    }
    return "[]";
}

// Extract questions for ALL topics
const questions = {
    sql: extractQuestionsBlock('sql'),
    statistics: extractQuestionsBlock('statistics'),
    python: extractQuestionsBlock('python'),
    visualization: extractQuestionsBlock('visualization'),
    excel: extractQuestionsBlock('excel'),
    business: extractQuestionsBlock('business')
};

// 3. Format lessons to string
function formatLessons(lessonsArr) {
    return JSON.stringify(lessonsArr, null, 4);
}

// 4. Build final file
const finalContent = `// ===== Data Structure for All Topics =====

const topicsData = {
    sql: {
        title: "SQL Fundamentals",
        lessons: ${formatLessons(newLessons.sql)},
        questions: ${questions.sql}
    },

    statistics: {
        title: "Statistics & Probability",
        lessons: ${formatLessons(newLessons.statistics)},
        questions: ${questions.statistics}
    },

    python: {
        title: "Python for Data Analysis",
        lessons: ${formatLessons(newLessons.python)},
        questions: ${questions.python}
    },

    visualization: {
        title: "Data Visualization",
        lessons: ${formatLessons(newLessons.visualization)},
        questions: ${questions.visualization}
    },

    excel: {
        title: "Excel & Spreadsheets",
        lessons: ${formatLessons(newLessons.excel)},
        questions: ${questions.excel}
    },

    business: {
        title: "Business Intelligence",
        lessons: ${formatLessons(newLessons.business)},
        questions: ${questions.business}
    }
};
`;

fs.writeFileSync('data.js', finalContent);
console.log("Success: data.js updated with expanded lessons.");
