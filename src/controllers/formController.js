function getUpdatedData(requestBody) {
    const updatedData = {}
    
    for (const [key, value] of Object.entries(requestBody)) {
        if (value && value.trim()) {
            updatedData[key] = value.trim()
        }
    }
    
    return updatedData
  }
  
  module.exports = { getUpdatedData }