export default async function ClearContentsInFolder(folderPath) {
  // Keep folder but recurse remove all file in folder
  const fs = require('fs')
  const path = require('path')

  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file)
      fs.unlinkSync(curPath)
    })
  }

  console.log('Folder is cleared')
}
