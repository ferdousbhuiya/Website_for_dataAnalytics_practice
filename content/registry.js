// ============================================================
// TOPIC REGISTRY — naming, ordering, role-track, and level metadata
// ============================================================

const TRACKS = {
    'data-analyst': { id: 'data-analyst', label: 'Data Analyst', subtitle: 'Query, visualize, and communicate with data', color: '#667eea' },
    'data-engineer': { id: 'data-engineer', label: 'Data Engineer', subtitle: 'Build reliable pipelines, warehouses, and data infrastructure', color: '#f5576c' },
    'data-scientist': { id: 'data-scientist', label: 'Data Scientist', subtitle: 'Model, experiment, and drive decisions with statistics & ML', color: '#00d4aa' },
    'core': { id: 'core', label: 'Core Foundations', subtitle: 'Shared skills every data professional needs', color: '#f59e0b' }
};

const topicRegistry = {
    levels: {
        Beginner: { label: 'Beginner', subtitle: 'Build core analytics foundations' },
        Intermediate: { label: 'Intermediate', subtitle: 'Work with real data and business problems' },
        Advanced: { label: 'Advanced', subtitle: 'Engineer, model, optimize, and build portfolio work' }
    },
    order: [
        'excel', 'sql', 'statistics', 'visualization', 'business', 'communication', 'python_setup',
        'etl1', 'etl2', 'etl3', 'etl4',
        'python', 'experiment_design', 'ab_tests', 'product_analytics',
        'pandas_project', 'sql_project', 'viz_project', 'product_project',
        'etl5', 'etl6', 'etl8', 'etl9', 'etl10', 'machine_learning', 'statistical_modeling',
        'etl7', 'data_engineering', 'big_data', 'cloud_data',
        'etl_project', 'cloud_project', 'deep_learning', 'ml_project', 'stats_project', 'oop_project'
    ],
    tracks: TRACKS,
    topics: {
        excel:             { level: 'Beginner', track: 'data-analyst', category: 'Excel', color: '#30cfd0', icon: '📗', description: 'Formulas, pivot tables, lookups, data cleaning, and spreadsheet analysis' },
        sql:               { level: 'Beginner', track: 'data-analyst', category: 'SQL', color: '#667eea', icon: '🗄️', description: 'Queries, filtering, joins, aggregations, and core SQL analysis' },
        statistics:        { level: 'Beginner', track: 'core', category: 'Statistics', color: '#f093fb', icon: '📊', description: 'Descriptive statistics, probability, distributions, and inference foundations' },
        visualization:     { level: 'Beginner', track: 'data-analyst', category: 'Visualization', color: '#fa709a', icon: '📈', description: 'Chart selection, dashboard basics, and storytelling with data' },
        business:          { level: 'Beginner', track: 'data-analyst', category: 'Business', color: '#a8edea', icon: '💼', description: 'KPIs, metrics, business questions, and analytical thinking' },
        communication:     { level: 'Beginner', track: 'core', category: 'Soft Skills', color: '#fb923c', icon: '💬', description: 'Stakeholder communication and presenting analytical findings clearly' },
        python_setup:      { level: 'Beginner', track: 'core', category: 'Setup', color: '#4facfe', icon: '🚀', description: 'Start Python with Colab, VS Code, environments, and first code' },
        etl1:              { level: 'Beginner', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🏗️', description: 'ETL concepts, mindset, and workflow' },
        etl2:              { level: 'Beginner', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🐍', description: 'Python core skills for ETL' },
        etl3:              { level: 'Beginner', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '📊', description: 'Data structures and validation fundamentals' },
        etl4:              { level: 'Beginner', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '📂', description: 'File handling and modular code' },

        python:            { level: 'Intermediate', track: 'core', category: 'Python', color: '#4facfe', icon: '🐍', description: 'Pandas, NumPy, data manipulation, cleaning, and analysis techniques' },
        experiment_design: { level: 'Intermediate', track: 'core', category: 'Experiments', color: '#a5f3fc', icon: '🧪', description: 'Designing rigorous experiments and choosing useful metrics' },
        ab_tests:          { level: 'Intermediate', track: 'data-analyst', category: 'Experiments', color: '#6366f1', icon: '🧭', description: 'A/B testing design, significance, interpretation, and pitfalls' },
        product_analytics: { level: 'Intermediate', track: 'data-analyst', category: 'Product', color: '#14b8a6', icon: '🚀', description: 'Funnels, retention, cohorts, and product metrics' },
        pandas_project:    { level: 'Intermediate', track: 'data-analyst', category: 'Project', color: '#667eea', icon: '🐼', description: 'End-to-end pandas wrangling: load, clean, reshape, and export' },
        sql_project:       { level: 'Intermediate', track: 'data-analyst', category: 'Project', color: '#667eea', icon: '📊', description: 'E-commerce sales analytics case study from schema to dashboard queries' },
        viz_project:       { level: 'Intermediate', track: 'data-analyst', category: 'Project', color: '#667eea', icon: '📈', description: 'Design and build a sales dashboard from KPIs to narrative' },
        product_project:   { level: 'Intermediate', track: 'data-analyst', category: 'Project', color: '#667eea', icon: '🚀', description: 'Product analytics deep dive with funnels, cohorts, and aha moments' },
        etl5:              { level: 'Intermediate', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '⚙️', description: 'Logging, configuration, and automation' },
        etl6:              { level: 'Intermediate', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🧩', description: 'Object-oriented programming for ETL' },
        etl8:              { level: 'Intermediate', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🐞', description: 'Debugging with PDB, tracing, and case studies' },
        etl9:              { level: 'Intermediate', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🌐', description: 'APIs, JSON, pagination, retries, and resilient extraction' },
        etl10:             { level: 'Intermediate', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🗄️', description: 'Databases and SQL from Python' },
        machine_learning:  { level: 'Intermediate', track: 'data-scientist', category: 'ML', color: '#22d3ee', icon: '🤖', description: 'Supervised and unsupervised machine-learning fundamentals' },
        statistical_modeling:{ level: 'Intermediate', track: 'data-scientist', category: 'Statistics', color: '#a78bfa', icon: '📐', description: 'Regression, inference, and model evaluation' },

        etl7:              { level: 'Advanced', track: 'data-engineer', category: 'ETL', color: '#FF9966', icon: '🎓', description: 'Advanced OOP including encapsulation and polymorphism' },
        data_engineering:  { level: 'Advanced', track: 'data-engineer', category: 'Pipelines', color: '#f43f5e', icon: '🔄', description: 'Airflow, orchestration, reliability, testing, and production pipelines' },
        big_data:          { level: 'Advanced', track: 'data-engineer', category: 'Big Data', color: '#fb923c', icon: '🐘', description: 'Distributed systems, Spark, and analytics at scale' },
        cloud_data:        { level: 'Advanced', track: 'data-engineer', category: 'Cloud', color: '#38bdf8', icon: '☁️', description: 'Cloud warehouses and data platforms across AWS, GCP, and Azure' },
        etl_project:       { level: 'Advanced', track: 'data-engineer', category: 'Project', color: '#f43f5e', icon: '🏭', description: 'Build a complete ETL pipeline: extract, validate, load, and orchestrate' },
        cloud_project:     { level: 'Advanced', track: 'data-engineer', category: 'Project', color: '#f43f5e', icon: '☁️', description: 'Cloud data warehouse migration project' },
        deep_learning:     { level: 'Advanced', track: 'data-scientist', category: 'ML', color: '#f472b6', icon: '🧠', description: 'Neural networks and deep-learning concepts' },
        ml_project:        { level: 'Advanced', track: 'data-scientist', category: 'Project', color: '#f472b6', icon: '🎯', description: 'End-to-end churn-prediction project from data to model' },
        stats_project:     { level: 'Advanced', track: 'data-scientist', category: 'Project', color: '#f472b6', icon: '🔬', description: 'A/B test analysis project from hypothesis to decision' },
        oop_project:       { level: 'Advanced', track: 'data-scientist', category: 'Project', color: '#f472b6', icon: '⚙️', description: 'Python OOP data-pipeline library project' }
    }
};

if (typeof window !== 'undefined') {
    window.topicRegistry = topicRegistry;
    window.TRACKS = TRACKS;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { topicRegistry, TRACKS };
}
