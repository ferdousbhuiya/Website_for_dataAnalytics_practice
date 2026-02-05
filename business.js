// Business Intelligence topic data
// Depends on data.js (topicsData)

const businessData = topicsData.business;

if (typeof window !== "undefined") {
    window.businessData = businessData;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = businessData;
}
