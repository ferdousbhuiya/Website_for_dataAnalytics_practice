// ============================================================
// TOPIC REGISTRY — naming, ordering, and role-track metadata
// Central place assigning each topic: role track, category,
// gradient colors, icon, and description. Keeping this OUT of
// the per-topic data files means existing topics need zero edits.
// Load after content/*.js, before data.js.
// ============================================================

const TRACKS = {
    'data-analyst': {
        id: 'data-analyst',
        label: 'Data Analyst',
        subtitle: 'Query, visualize, and communicate with data',
        color: '#667eea'
    },
    'data-engineer': {
        id: 'data-engineer',
        label: 'Data Engineer',
        subtitle: 'Build reliable pipelines, warehouses, and data infrastructure',
        color: '#f5576c'
    },
    'data-scientist': {
        id: 'data-scientist',
        label: 'Data Scientist',
        subtitle: 'Model, experiment, and drive decisions with statistics & ML',
        color: '#00d4aa'
    },
    'core': {
        id: 'core',
        label: 'Core Foundations',
        subtitle: 'Shared skills every data professional needs',
        color: '#f59e0b'
    }
};

const topicRegistry = {
    order: [
        // Core
        'python', 'statistics', 'communication', 'experiment_design',
        // Data Analyst
        'sql', 'visualization', 'excel', 'business', 'ab_tests', 'product_analytics',
        // Data Engineer
        'etl1', 'etl2', 'etl3', 'etl4', 'etl5', 'etl6', 'etl7', 'etl8', 'etl9', 'etl10',
        'data_engineering', 'big_data', 'cloud_data',
        // Data Scientist
        'machine_learning', 'statistical_modeling', 'deep_learning'
    ],
    tracks,
    topics: {
        // ---- Core ----
        python:            { track: 'core', category: 'Python',   color: '#4facfe', icon: '🐍', description: 'Pandas, NumPy, data manipulation, and analysis techniques' },
        statistics:        { track: 'core', category: 'Statistics', color: '#f093fb', icon: '📊', description: 'Distributions, hypothesis testing, and statistical inference' },
        communication:     { track: 'core', category: 'Soft Skills', color: '#fb923c', icon: '💬', description: 'Stakeholder communication and presenting with data' },
        experiment_design: { track: 'core', category: 'Experiments', color: '#a5f3fc', icon: '🧪', description: 'Designing and running rigorous experiments' },

        // ---- Data Analyst ----
        sql:               { track: 'data-analyst', category: 'SQL', color: '#667eea', icon: '🗄️', description: 'Queries, joins, aggregations, and window functions' },
        visualization:     { track: 'data-analyst', category: 'Visualization', color: '#fa709a', icon: '📈', description: 'Chart selection, dashboard design, storytelling with data' },
        excel:             { track: 'data-analyst', category: 'Excel', color: '#30cfd0', icon: '📗', description: 'Formulas, pivot tables, VLOOKUP, and advanced functions' },
        business:          { track: 'data-analyst', category: 'Business', color: '#a8edea', icon: '💼', description: 'KPIs, metrics, business cases, and analytical thinking' },
        ab_tests:          { track: 'data-analyst', category: 'Experiments', color: '#6366f1', icon: '🧭', description: 'A/B testing: design, metrics, significance, and pitfalls' },
        product_analytics: { track: 'data-analyst', category: 'Product', color: '#14b8a6', icon: '🚀', description: 'Funnels, retention, cohorts, and product metrics' },

        // ---- Data Engineer ----
        etl1:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🏗️', description: 'ETL concepts, mindset, and workflow' },
        etl2:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🐍', description: 'Python core for ETL' },
        etl3:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '📊', description: 'Data structures and validation' },
        etl4:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '📂', description: 'File handling and modular code' },
        etl5:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '⚙️', description: 'Logging, config, automation' },
        etl6:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🧩', description: 'OOP for ETL' },
        etl7:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🎓', description: 'Advanced OOP: encapsulation, polymorphism' },
        etl8:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🐞', description: 'Debugging: PDB, tracing, case studies' },
        etl9:  { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🌐', description: 'APIs, JSON, pagination, retries' },
        etl10: { track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🗄️', description: 'Databases & SQL from Python' },
        data_engineering:  { track: 'data-engineer', category: 'Pipelines', color: '#f43f5e', icon: '🔄', description: 'Airflow, orchestration, reliability, testing' },
        big_data:          { track: 'data-engineer', category: 'Big Data', color: '#fb923c', icon: '🐘', description: 'Distributed systems, Spark, and scale' },
        cloud_data:        { track: 'data-engineer', category: 'Cloud', color: '#38bdf8', icon: '☁️', description: 'Cloud warehouses & platforms (AWS/GCP/Azure)' },

        // ---- Data Scientist ----
        machine_learning:    { track: 'data-scientist', category: 'ML', color: '#22d3ee', icon: '🤖', description: 'Supervised & unsupervised learning foundations' },
        statistical_modeling:{ track: 'data-scientist', category: 'Statistics', color: '#a78bfa', icon: '📐', description: 'Regression, inference, and model evaluation' },
        deep_learning:       { track: 'data-scientist', category: 'ML', color: '#f472b6', icon: '🧠', description: 'Neural networks and deep learning' }
    }
};

if (typeof window !== 'undefined') {
    window.topicRegistry = topicRegistry;
    window.TRACKS = TRACKS;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { topicRegistry, TRACKS };
}