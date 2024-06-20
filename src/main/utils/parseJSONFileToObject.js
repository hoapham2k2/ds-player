export const ParseJSONFileToObject = (filePath) => {
  try {
    const fs = require('fs')
    const path = require('path')

    const fullPath = path.join(__dirname, filePath)

    const isExist = fs.existsSync
    if (!isExist) {
      console.log('File path', fullPath, 'is not exist')
      return null
    }

    const data = fs.readFileSync(fullPath)
    const object = JSON.parse(data)

    console.log('JSON file parsed to object:', object)

    return object
  } catch (error) {
    console.error('Error parsing JSON file to object:', error)
  }
}

export default ParseJSONFileToObject
