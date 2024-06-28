import fs from 'fs'
import path from 'path'

const SaveBlobToLocalFileAsync = async (blob, fileName, dirPath) => {
  try {
    const savePath = path.join(dirPath, fileName)
    const buffer = Buffer.from(await blob.arrayBuffer())

    const folderPath = path.dirname(savePath) ?? ''

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }
    fs.writeFileSync(savePath, buffer, { flag: 'w+' })
    return savePath
  } catch (error) {
    console.error('Error saving blob to local file:', error)
  }
}

export default SaveBlobToLocalFileAsync
