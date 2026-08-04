const fs = require('fs'), vm = require('vm');
const DIR = "G:/Website_for_dataAnalytics_practice";
global.window = global;
const ALL = ['content/sql','content/statistics','content/python','content/visualization','content/excel','content/business','content/etl1','content/etl2','content/etl3','content/etl4','content/etl5','content/etl6','content/etl7','content/etl8','content/etl9','content/etl10','content/communication','content/experiment_design','content/ab_tests','content/product_analytics','content/data_engineering','content/big_data','content/cloud_data','content/machine_learning','content/statistical_modeling','content/deep_learning','content/registry'];
ALL.forEach(f => require(DIR + '/' + f + '.js'));
require(DIR + '/data.js');
const store = {};
global.localStorage = { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
function el() {
    return {
        textContent: '', value: '', style: {}, innerHTML: '', dataset: {}, className: '',
        children: [],
        appendChild(c) { this.children.push(c); },
        hasChildNodes() { return this.children.length > 0; },
        setAttribute() {}, getAttribute: () => null,
        classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
        addEventListener() {}, querySelector: () => null, querySelectorAll: () => [],
        remove() {}, replaceWith() {}
    };
}
const nodes = {};
global.document = {
    getElementById: id => nodes[id] || (nodes[id] = el()),
    querySelectorAll: () => [], querySelector: () => null, createElement: () => el(),
    addEventListener: () => {}, head: { appendChild() {} },
};
global.scrollTo = () => {};
global.IntersectionObserver = function () { this.observe = () => {}; };
vm.runInThisContext(fs.readFileSync(DIR + '/script.js', 'utf8'), { filename: 'script.js' });

global.renderTopics();
global.renderTrackFilters();
console.log('cards rendered:', nodes.topicsGrid.children.length);
console.log('filter buttons rendered:', nodes.topicFilters.children.length);
global.openTopic('sql');
console.log('LESSONS rendered for sql:', nodes.lessonsContainer.children.length);
console.log('QUESTIONS rendered for sql:', nodes.questionsContainer.children.length);
console.log('breadcrumb:', nodes.breadcrumb.textContent);
console.log('learningView hidden class:', nodes.learningView.className);
