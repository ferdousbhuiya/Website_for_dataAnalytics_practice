const fs = require('fs');
const path = require('path');

// Read existing data
const existingData = fs.readFileSync('data.js', 'utf8');

// Helper to extract a section
function extractSection(topicName) {
    const regex = new RegExp(`${topicName}:\\s*\\{[\\s\\S]*?questions:\\s*\\[([\\s\\S]*?)\\]\\s*\\n\\s*\\},`, 'i');
    const match = existingData.match(regex);
    if (match) {
        return match[1]; // Returns the content inside questions: [...]
    }
    return null;
}

const sqlQuestions = extractSection('sql');
const statsQuestions = extractSection('statistics');
const pythonQuestions = extractSection('python');

// We need to generate the rest
console.log("SQL Questions extracted length: " + (sqlQuestions ? sqlQuestions.length : 0));
console.log("Stats Questions extracted length: " + (statsQuestions ? statsQuestions.length : 0));
console.log("Python Questions extracted length: " + (pythonQuestions ? pythonQuestions.length : 0));
