// DataPrep Pro curriculum bridge v22
// Split topic files are loaded before this file by index.html.
// Build the public topic map directly from those files so Intermediate ML/statistical-modeling content is not lost.
const TOPIC_KEY_MAP = {
 sql:'sqlData',statistics:'statisticsData',python_setup:'pythonSetupData',python:'pythonData',visualization:'visualizationData',excel:'excelData',business:'businessData',
 etl1:'etl1Data',etl2:'etl2Data',etl3:'etl3Data',etl4:'etl4Data',etl5:'etl5Data',etl6:'etl6Data',etl7:'etl7Data',etl8:'etl8Data',etl9:'etl9Data',etl10:'etl10Data',
 communication:'communicationData',experiment_design:'experimentDesignData',ab_tests:'abTestsData',product_analytics:'productAnalyticsData',pandas_project:'pandasProjectData',sql_project:'sqlProjectData',viz_project:'vizProjectData',product_project:'productProjectData',
 data_engineering:'dataEngineeringData',big_data:'bigDataData',cloud_data:'cloudDataData',etl_project:'etlProjectData',cloud_project:'cloudProjectData',machine_learning:'machineLearningData',statistical_modeling:'statisticalModelingData',deep_learning:'deepLearningData',ml_project:'mlProjectData',stats_project:'statsProjectData',oop_project:'oopProjectData'
};
const topicsData={};
if(typeof window!=='undefined'){
 Object.entries(TOPIC_KEY_MAP).forEach(([key,varName])=>{if(window[varName]) topicsData[key]=window[varName];});
 window.topicsData=topicsData;
}
if(typeof module!=='undefined'&&module.exports)module.exports=topicsData;
