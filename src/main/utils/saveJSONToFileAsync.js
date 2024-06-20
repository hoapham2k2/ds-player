export const SaveJSONToFileAsync = async (desPath, data) => {
  try {
    const fs = require('fs')
    const path = require('path')

    //check if the folder exists, if not, create it
    const folderPath = path.dirname(desPath) ?? ''
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    fs.writeFileSync(desPath, JSON.stringify(data, null, 2))

    console.log('JSON saved to', desPath)

    return desPath
  } catch (error) {
    console.error('Error saving JSON to file:', error)
  }
}

export default SaveJSONToFileAsync

// using the function:
// import SaveJSONToFileAsync from './saveJSONToFileAsync'
//
// const data = { name: 'John Doe', age: 30 }
// const desPath = 'data.json'
//
// SaveJSONToFileAsync(desPath, data)
//   .then((path) => {
//     console.log('JSON saved to:', path)
//   })
//   .catch((error) => {
//     console.error('Error saving JSON to file:', error)
//   })
//
// // Output:
// // JSON saved to: data.json
