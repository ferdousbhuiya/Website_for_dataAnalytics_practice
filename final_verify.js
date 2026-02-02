const fs = require('fs');

const fileContent = fs.readFileSync('data.js', 'utf8');

// We need to parse the file to get the object
// Since it's a JS file with `const topicsData = ...`, we can strip the variable decl and eval it
// or just modify it to export
let content = fileContent.replace('const topicsData =', 'module.exports =');
// remove the last semi-colon if strictly needed, or just append
// wait, the file has comments. 
// Let's use the temp file approach again which worked nicely with node -e

fs.writeFileSync('temp_verify.js', content);

const topicsData = require('./temp_verify.js');

const expected = {
    sql: { lessons: 12, questions: 45 },
    statistics: { lessons: 10, questions: 35 },
    python: { lessons: 14, questions: 40 },
    visualization: { lessons: 8, questions: 25 },
    excel: { lessons: 9, questions: 30 },
    business: { lessons: 11, questions: 35 }
};

let allPass = true;

console.log("FINAL VERIFICATION REPORT");
console.log("=========================");

Object.keys(expected).forEach(topic => {
    const actualL = topicsData[topic].lessons.length;
    const actualQ = topicsData[topic].questions.length;
    const expL = expected[topic].lessons;
    const expQ = expected[topic].questions;

    const lStatus = actualL === expL ? "✅ PASS" : `❌ FAIL (Exp: ${expL})`;
    const qStatus = actualQ === expQ ? "✅ PASS" : `❌ FAIL (Exp: ${expQ})`;

    console.log(`${topic.toUpperCase()}:`);
    console.log(`  Lessons:   ${actualL} ${lStatus}`);
    console.log(`  Questions: ${actualQ} ${qStatus}`);

    if (actualL !== expL || actualQ !== expQ) allPass = false;
});

if (allPass) {
    console.log("\nALL CHECKS PASSED: Website content matches advertisement exactly.");
} else {
    console.log("\nERRORS FOUND: Discrepancies exist.");
}

fs.unlinkSync('temp_verify.js');
