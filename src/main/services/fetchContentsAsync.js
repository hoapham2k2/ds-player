import { supabase } from '../supabase'
import ClearContentsInFolder from '../utils/clearContentsInFolder'
import { GetApplicationConfigPath, GetApplicationMediaPath } from '../utils/getApplicationPath'
import GetDeviceID from '../utils/getDeviceID'
import SaveBlobToLocalFileAsync from '../utils/saveBlobToLocalFileAsync'
import path from 'path'
import SaveJSONToFileAsync from '../utils/saveJSONToFileAsync'

export default async function FetchContentsAndSaveToLocalAsync() {
  try {
    const { data, error } = await supabase.rpc('get_content_items', {
      deviceid: GetDeviceID()
    })
    if (error) {
      console.error('Error fetching contents:', error.message)
      return []
    }
    console.log('Content Items belong to the device:', data)

    //saving to local media path
    const mediaSavePath = GetApplicationMediaPath()
    const configSavePath = GetApplicationConfigPath()
    let savedFiles = []

    const configFilePath = path.join(configSavePath, 'content_items.json')
    await SaveJSONToFileAsync(configFilePath, data).then(() =>
      console.log('Content items saved to:', configFilePath)
    )
    // await ClearContentsInFolder(mediaSavePath).then(() => console.log('Media folder cleared'))

    if (data.length === 0) {
      return []
    }

    for (const item of data) {
      const filePath = item.file_path
      const bucketName = filePath.split('/')[0].trim()
      const fileName = filePath.slice(bucketName.length + 1).trim()
      const { data, error } = await supabase.storage.from(bucketName).download(fileName)
      if (error) {
        console.error('Error downloading file from Supabase Storage:', error)
        continue
      }
      const savedPath = await SaveBlobToLocalFileAsync(data, fileName, mediaSavePath)
      savedFiles.push(savedPath)
    }
    return savedFiles
  } catch (error) {
    console.error('Error fetching contents and saving to local: ', error)
    return []
  }
}
