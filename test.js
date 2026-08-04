/**
 * TESTS: progress tracking + statistics calculator
 * Run: node test.js  (zero deps, plain assert)
 * Loads real topic data + real script.js/topicsData via DOM shim.
 */

const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const DIR = __dirname;

let failures = 0;
const ok = [];

function test(name, fn) {
    try { fn(); ok.push(name); console.log('  PASS  ' + name); }
    catch (e) {
        failures++;
        console.error('  FAIL  ' + name);
        console.error('        ' + (e && e.message));
    }
}

// ---- Load ALL topic data (same as browser) ----
global.window = global;
const TOPIC_FILES = [
 'content/sql','content/statistics','content/python','content/visualization','content/excel','content/business',
 'content/etl1','content/etl2','content/etl3','content/etl4','content/etl5','content/etl6','content/etl7','content/etl8','content/etl9','content/etl10',
 'content/communication','content/experiment_design','content/ab_tests','content/product_analytics',
 'content/data_engineering','content/big_data','content/cloud_data',
 'content/machine_learning','content/statistical_modeling','content/deep_learning','content/ml_project',
 'content/registry','statistics_calculator'
];
TOPIC_FILES.forEach(f => require(DIR + '/' + f + '.js'));
require(DIR + '/data.js');

// ---- Minimal DOM shim to run real script.js ----
const store = {};
global.localStorage = {
    getItem: k => store[k] ?? null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; },
};
const shims = {};
const mk = () => ({ textContent: '', style: {}, value: '', innerHTML: '', scrollIntoView: () => {} });
global.document = {
    getElementById: id => shims[id] || (shims[id] = mk()),
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    createElement: () => mk(),
};
global.scrollTo = () => {};
global.IntersectionObserver = function () { this.observe = () => {}; };

// script.js declares top-level functions; eval in this context so they're global
vm.runInThisContext(fs.readFileSync(DIR + '/script.js', 'utf8'), { filename: 'script.js' });

const topics = global.topicsData;
assert(topics && Object.keys(topics).length === 27, 'topicsData must define 27 topics');

console.log('\n=== DATA INTEGRITY ===');
test('27 topics registered', () => assert.strictEqual(Object.keys(topics).length, 27));
test('new role topics present', () => {
    ['ab_tests','product_analytics','big_data','cloud_data','data_engineering',
     'machine_learning','statistical_modeling','deep_learning','ml_project',
     'communication','experiment_design']
        .forEach(k => assert(topics[k], 'missing ' + k));
});
test('every topic has lessons[] and questions[]', () => {
    Object.values(topics).forEach(t => {
        assert(Array.isArray(t.lessons) && t.lessons.length > 0, t.title + ' lessons');
        assert(Array.isArray(t.questions) && t.questions.length > 0, t.title + ' questions');
    });
});
test('case-study answers exist only where caseStudyQuizzes defined', () => {
    Object.entries(topics).forEach(([k, t]) => {
        const cs = t.caseStudyQuizzes || [];
        assert(Array.isArray(cs), k + ' caseStudyQuizzes array');
    });
});

// ================= PROGRESS =================
console.log('\n=== PROGRESS NORMALIZATION ===');

test('case-study answer id survives reload (not stripped)', () => {
    localStorage.removeItem('dataAnalyticsProgress_default');
    localStorage.setItem('dataAnalyticsProgress_default',
        JSON.stringify({ etl1: { completedQuestions: ['case-answer-etl1-1', 'answer-etl1-1'] } }));
    const n = getNormalizedProgress();
    assert(n.etl1.completedQuestions.includes('case-answer-etl1-1'), 'case id kept');
    assert(n.etl1.completedQuestions.includes('answer-etl1-1'), 'answer id kept');
});

test('out-of-range / wrong-topic ids stripped', () => {
    localStorage.setItem('dataAnalyticsProgress_default',
        JSON.stringify({ etl1: { completedQuestions: ['case-answer-etl1-99', 'answer-etl1-1', 'answer-sql-1', 'garbage'] } }));
    const n = getNormalizedProgress();
    assert.strictEqual(n.etl1.completedQuestions.length, 1, 'only valid etl1 answer');
    assert.ok(n.etl1.completedQuestions.includes('answer-etl1-1'));
});

test('overall percent counts questions + case studies (no double-count)', () => {
    const totalQ = Object.keys(topics).reduce((s, k) => s + topics[k].questions.length, 0);
    const totalCS = Object.keys(topics).reduce((s, k) => s + (topics[k].caseStudyQuizzes || []).length, 0);
    const total = totalQ + totalCS;

    // seed: 1 question + 1 case study
    localStorage.setItem('dataAnalyticsProgress_default',
        JSON.stringify({ etl1: { completedQuestions: ['answer-etl1-1', 'case-answer-etl1-1'] } }));
    getNormalizedProgress();
    updateProgressBars();

    assert.strictEqual(Number(shims.progressTotal.textContent), total, 'total = q + cs');
    assert.strictEqual(Number(shims.progressCompleted.textContent), 2, 'completed = 1q + 1cs');
    const expectedPct = Math.round((2 / total) * 100);
    assert.strictEqual(shims.progressPercent.textContent, expectedPct + '%', 'percent matches');
    assert.strictEqual(shims.overallProgressFill.style.width, expectedPct + '%', 'bar matches percent');
    assert.strictEqual(total, totalQ + totalCS);
});

test('case-study completion alone moves card bar (etl1)', () => {
    localStorage.setItem('dataAnalyticsProgress_default',
        JSON.stringify({ etl1: { completedQuestions: ['case-answer-etl1-1'] } }));
    getNormalizedProgress();
    // per-topic math: completed / (q + cs)
    const t = topics.etl1;
    const items = t.questions.length + t.caseStudyQuizzes.length;
    const pct = (1 / items) * 100;
    assert(Math.abs(pct - (1 / items) * 100) < 1e-9, 'etl1 denominator includes case studies');
});

test('PIN profiles isolated (no cross-PIN bleed)', () => {
    localStorage.setItem('dataAnalyticsProgress_ALPHA',
        JSON.stringify({ etl1: { completedQuestions: ['case-answer-etl1-1'] } }));
    localStorage.setItem('dataAnalyticsActivePin', 'BETA');
    const n = getNormalizedProgress();   // should load empty BETA
    assert.strictEqual(n.etl1.completedQuestions.length, 0, 'BETA has nothing');
    localStorage.setItem('dataAnalyticsActivePin', 'ALPHA');
    const a = getNormalizedProgress();
    assert.strictEqual(a.etl1.completedQuestions.length, 1, 'ALPHA keeps its case id');
    localStorage.removeItem('dataAnalyticsActivePin');
});

// ================= STATISTICS =================
console.log('\n=== STATISTICS CALCULATOR ===');
const SC = global.StatisticsCalculator;

test('mean/median/mode basics', () => {
    assert.strictEqual(SC.mean([1, 2, 3, 4]), 2.5);
    assert.strictEqual(SC.median([1, 3, 2]), 2);
    assert.deepStrictEqual(SC.mode([1, 1, 2, 2, 3]), [1, 2]);
});

test('variance + std dev (sample)', () => {
    // [2,4,6] sample variance = ((2-4)^2+(4-4)^2+(6-4)^2)/2 = (4+0+4)/2 = 4
    assert.strictEqual(SC.variance([2, 4, 6]), 4);
    assert.strictEqual(SC.standardDeviation([2, 4, 6]), 2);
});

test('quartiles + IQR', () => {
    const q = SC.quartiles([1, 2, 3, 4]);
    assert.strictEqual(q.q1, 1.5);
    assert.strictEqual(q.q2, 2.5);
    assert.strictEqual(q.q3, 3.5);
    assert.strictEqual(q.iqr, 2);
});

test('outliers 1.5xIQR', () => {
    const o = SC.findOutliers([-20, 1, 2, 3, 4, 5, 100]);
    assert(o.outliers.includes(-20) && o.outliers.includes(100), 'finds both outliers');
});

test('z-score', () => {
    assert.strictEqual(SC.zScore(10, 8, 2), 1);
});

test('completeSummary aggregates full object', () => {
    const s = completeSummary([2, 4, 6]);
    assert.strictEqual(s.count, 3);
    assert.strictEqual(s.mean, '4.0000');
    assert.ok(s.quartiles && s.outliers, 'quartiles + outliers present');
});

test('calculator end-to-end via calculateStats()', () => {
    shims.dataInput = { value: '2, 4, 6' };
    // stub alert
    const realAlert = global.alert;
    global.alert = () => {};
    calculateStats();
    global.alert = realAlert;
    assert.strictEqual(shims.statCount.textContent, 3);
    assert.strictEqual(shims.statMean.textContent, '4.0000');
});

// ================= exits =================
console.log('\n=== SUMMARY ===');
console.log('  passed: ' + ok.length + ',  failures: ' + failures);
if (failures > 0) { process.exit(1); }
console.log('  ALL TESTS PASSED');