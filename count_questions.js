// Simpler counting script
const fs = require('fs');
const content = fs.readFileSync('data.js', 'utf8');

// Split by topic sections
const sqlMatch = content.match(/sql:\s*{[\s\S]*?questions:\s*\[([\s\S]*?)\]\s*},\s*statistics:/);
const statsMatch = content.match(/statistics:\s*{[\s\S]*?questions:\s*\[([\s\S]*?)\]\s*},\s*python:/);
const pythonMatch = content.match(/python:\s*{[\s\S]*?questions:\s*\[([\s\S]*?)\]\s*},\s*visualization:/);
const vizMatch = content.match(/visualization:\s*{[\s\S]*?questions:\s*\[([\s\S]*?)\]\s*},\s*excel:/);
const excelMatch = content.match(/excel:\s*{[\s\S]*?questions:\s*\[([\s\S]*?)\]\s*},\s*business:/);
const businessMatch = content.match(/business:\s*{[\s\S]*?questions:\s*\[([\s\S]*?)\]\s*}\s*};/);

function countQuestions(match) {
    if (!match || !match[1]) return 0;
    return (match[1].match(/number:\s*\d+/g) || []).length;
}

console.log('=== Question Counts ===');
console.log(`SQL: ${countQuestions(sqlMatch)} (advertised: 45)`);
console.log(`Statistics: ${countQuestions(statsMatch)} (advertised: 35)`);
console.log(`Python: ${countQuestions(pythonMatch)} (advertised: 40)`);
console.log(`Visualization: ${countQuestions(vizMatch)} (advertised: 25)`);
console.log(`Excel: ${countQuestions(excelMatch)} (advertised: 30)`);
console.log(`Business: ${countQuestions(businessMatch)} (advertised: 35)`);
