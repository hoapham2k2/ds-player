import supabase from '../supabase'
import ClearContentsInFolder from '../utils/clearContentsInFolder'
import { GetApplicationConfigPath, GetApplicationMediaPath } from '../utils/getApplicationPath'
import GetDeviceID from '../utils/getDeviceID'
import SaveBlobToLocalFileAsync from '../utils/saveBlobToLocalFileAsync'
import path from 'path'
import SaveJSONToFileAsync from '../utils/saveJSONToFileAsync'
import LoadConfigurationFile from '../utils/loadConfigurationFile'

export default async function FetchContentsAndSaveToLocalAsync() {
  const appConfig = await LoadConfigurationFile()
  let latestFetchingTime = ''
  if (appConfig.latestFetchingTime === undefined) {
    latestFetchingTime = '1970-12-07T10:16:40.000Z'
  } else {
    latestFetchingTime = appConfig.latestFetchingTime
  }

  try {
    const { data, error } = await supabase.rpc('get_content_items', {
      deviceid: GetDeviceID(),
      previoustime: latestFetchingTime
    })
    if (error) {
      console.error('Error fetching contents:', error.message)
      return []
    }
    console.log('Content Items belong to the device:', data)

    //saving to local media path
    const mediaSavePath = GetApplicationMediaPath()
    const configSavePath = GetApplicationConfigPath()
    const appConfigFilePath = path.join(configSavePath, 'config.json')
    let savedFiles = []

    const contentItemsConfigFilePath = path.join(configSavePath, 'content_items.json')

    if (data === null) {
      return []
    }
    await SaveJSONToFileAsync(contentItemsConfigFilePath, data).then(() =>
      console.log('Content items saved to:', contentItemsConfigFilePath)
    )

    if (data.length === 0) {
      return []
    }

    for (const item of data) {
      const filePath = item.file_path
      const bucketName = filePath.split('/')[0].trim()
      const fileName = filePath.slice(bucketName.length + 1).trim()
      console.log(`is downloading ${fileName} from ${bucketName} bucket`)
      const { data, error } = await supabase.storage.from('content').download(filePath)
      if (error) {
        console.error('Error downloading file from Supabase Storage:', error)
        continue
      }
      const savedPath = await SaveBlobToLocalFileAsync(data, fileName, mediaSavePath)
      savedFiles.push(savedPath)
    }

    appConfig.latestFetchingTime = new Date().toISOString()
    await SaveJSONToFileAsync(appConfigFilePath, appConfig).then(() =>
      console.log('Latest fetching time saved to:', appConfigFilePath)
    )

    return savedFiles
  } catch (error) {
    console.error('Error fetching contents and saving to local: ', error)
    return []
  }
}

const isContentItemConfigFileExist = async () => {
  const configSavePath = GetApplicationConfigPath()
  const configFilePath = path.join(configSavePath, 'content_items.json')
  return await fs.promises
    .access(configFilePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

  // explanation:
  // fs.promises.access(configFilePath, fs.constants.F_OK) checks if the file exists, if it does, it resolves the promise, otherwise it rejects the promise.
  // .then(() => true) if the file exists, it returns true
  // .catch(() => false) if the file does not exist, it returns false
  // the whole expression returns a promise that resolves to true if the file exists, otherwise it resolves to false
}
