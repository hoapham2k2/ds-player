const SaveBlobToLocalFileAsync = async (blob, fileName, dirPath) => {
  try {
    const fs = require('fs')
    const path = require('path')

    const savePath = path.join(dirPath, fileName)
    const buffer = Buffer.from(await blob.arrayBuffer())

    // check if the folder exists, if not, create it
    const folderPath = path.dirname(savePath) ?? ''

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    fs.writeFileSync(savePath, buffer)

    console.log('File saved to', savePath)

    return savePath
  } catch (error) {
    console.error('Error saving blob to local file:', error)
  }
}

export default SaveBlobToLocalFileAsync
