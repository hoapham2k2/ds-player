import fs from 'fs'
import path from 'path'

export const SaveJSONToFileAsync = async (desPath, data) => {
  try {
    const folderPath = path.dirname(desPath) ?? ''
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }
    fs.writeFileSync(desPath, JSON.stringify(data, null, 2), { flag: 'w+' }) // write file with pretty print
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
