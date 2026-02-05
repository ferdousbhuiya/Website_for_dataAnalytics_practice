// Excel topic data
// Depends on data.js (topicsData)

const excelData = topicsData.excel;

if (typeof window !== "undefined") {
    window.excelData = excelData;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = excelData;
}
