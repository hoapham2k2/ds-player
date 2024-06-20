export const IsLocalFilePathExistAsync = async (filePath) => {
  try {
    const fs = require('fs')
    const path = require('path')

    const fullPath = path.join(__dirname, filePath)

    const isExist = fs.existsSync(fullPath)

    console.log('File path', fullPath, 'is exist:', isExist)

    return isExist
  } catch (error) {
    console.error('Error checking file path:', error)
  }

  return false
}

export default IsLocalFilePathExistAsync
