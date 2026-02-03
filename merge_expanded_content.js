const fs = require('fs');

// 1. Load the new lessons
const part1 = require('./expanded_part1.js');
const part2 = require('./expanded_part2.js');
const etlFullArr = require('./etl_full_content.js');
const etlAdvArr = require('./etl_advanced_content.js');

const etlData = {};
etlFullArr.forEach(item => etlData[item.id] = item);
etlAdvArr.forEach(item => etlData[item.id] = item);

const newLessons = {
    ...part1,
    ...part2,
    ...etlData
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

// Extract questions for ALL topics including new ETL ones
// For the new ETL series, questions are inside etl_full_content.js, so we grab them from there.
const questions = {
    sql: extractQuestionsBlock('sql'),
    statistics: extractQuestionsBlock('statistics'),
    python: extractQuestionsBlock('python'),
    visualization: extractQuestionsBlock('visualization'),
    excel: extractQuestionsBlock('excel'),
    business: extractQuestionsBlock('business'),
};

// Generate question strings for ETL
const etlQuestionUpdates = {};
['etl1', 'etl2', 'etl3', 'etl4', 'etl5', 'etl6', 'etl7', 'etl8', 'etl9', 'etl10'].forEach(id => {
    if (etlData[id] && etlData[id].questions) {
        // Standardize questions (ensure they have number, question, answer etc if needed by script.js)
        // But script.js uses question.question, question.difficulty, question.answer
        // WAIT - script.js (lines 94-160) uses:
        // question.number, question.difficulty, question.question, question.context, question.answer
        // Our ETL questions use: id, text, options, correct.

        // WE MUST CONVERT ETL QUESTIONS TO THE FORMAT SCRIPT.JS EXPECTS
        const standardizedQuestions = etlData[id].questions.map((q, idx) => {
            const optionsText = q.options.map((opt, i) => `${i + 1}. ${opt}`).join('\\n');
            return {
                number: idx + 1,
                difficulty: etlData[id].level ? etlData[id].level.toLowerCase() : 'beginner',
                question: `${q.text || q.question}\\n\\n**Options:**\\n${optionsText}`,
                context: "Select the correct option:",
                answer: `**Correct Option: ${q.correct + 1}** - ${q.options[q.correct]}`
            };
        });
        etlQuestionUpdates[id] = JSON.stringify(standardizedQuestions, null, 4);
    } else {
        etlQuestionUpdates[id] = '[]';
    }
});

const finalQuestions = {
    ...questions,
    ...etlQuestionUpdates
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
        questions: ${finalQuestions.sql}
    },

    statistics: {
        title: "Statistics & Probability",
        lessons: ${formatLessons(newLessons.statistics)},
        questions: ${finalQuestions.statistics}
    },

    python: {
        title: "Python for Data Analysis",
        lessons: ${formatLessons(newLessons.python)},
        questions: ${finalQuestions.python}
    },

    visualization: {
        title: "Data Visualization",
        lessons: ${formatLessons(newLessons.visualization)},
        questions: ${finalQuestions.visualization}
    },

    excel: {
        title: "Excel & Spreadsheets",
        lessons: ${formatLessons(newLessons.excel)},
        questions: ${finalQuestions.excel}
    },

    business: {
        title: "Business Intelligence",
        lessons: ${formatLessons(newLessons.business)},
        questions: ${finalQuestions.business}
    },

    etl1: {
        title: "ETL 1: Foundations",
        lessons: ${formatLessons(newLessons.etl1.lessons)},
        questions: ${finalQuestions.etl1}
    },

    etl2: {
        title: "ETL 2: Python Core",
        lessons: ${formatLessons(newLessons.etl2.lessons)},
        questions: ${finalQuestions.etl2}
    },

    etl3: {
        title: "ETL 3: Data Structures",
        lessons: ${formatLessons(newLessons.etl3.lessons)},
        questions: ${finalQuestions.etl3}
    },

    etl4: {
        title: "ETL 4: Files & Functions",
        lessons: ${formatLessons(newLessons.etl4.lessons)},
        questions: ${finalQuestions.etl4}
    },

    etl5: {
        title: "ETL 5: Advanced Automation",
        lessons: ${formatLessons(newLessons.etl5.lessons)},
        questions: ${finalQuestions.etl5}
    },

    etl6: {
        title: "ETL 6: OOP for ETL",
        lessons: ${formatLessons(newLessons.etl6.lessons)},
        questions: ${finalQuestions.etl6}
    },

    etl7: {
        title: "ETL 7: Advanced OOP",
        lessons: ${formatLessons(newLessons.etl7.lessons)},
        questions: ${finalQuestions.etl7}
    },

    etl8: {
        title: "ETL 8: Debugging",
        lessons: ${formatLessons(newLessons.etl8.lessons)},
        questions: ${finalQuestions.etl8}
    },

    etl9: {
        title: "ETL 9: API Automation",
        lessons: ${formatLessons(newLessons.etl9.lessons)},
        questions: ${finalQuestions.etl9}
    },

    etl10: {
        title: "ETL 10: Databases & SQL",
        lessons: ${formatLessons(newLessons.etl10.lessons)},
        questions: ${finalQuestions.etl10}
    }
};
`;

fs.writeFileSync('data.js', finalContent);
console.log("Success: data.js updated with expanded lessons.");
