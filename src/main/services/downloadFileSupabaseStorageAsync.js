import supabase from '../supabase'
import GetApplicationPath from '../utils/getApplicationPath'
import SaveBlobToLocalFileAsync from '../utils/saveBlobToLocalFileAsync'

const DownloadFileSupabaseStorageAsync = async (filePath) => {
  try {
    const bucketName = filePath.split('/')[0].trim()
    //fileName is the rest of the path after the bucket name and the slash, because the file path is in the format of bucketName/fileName (include the slash) in the database
    const fileName = filePath.slice(bucketName.length + 1).trim()

    console.log('Downloading file', fileName, 'from bucket', bucketName)

    const { data, error } = await supabase.storage.from(bucketName).download(fileName)

    if (error) {
      throw new Error(error.message)
    }

    console.log('Data after download', data)
    const savePath = GetApplicationPath()
    // save to disk
    const savedPath = await SaveBlobToLocalFileAsync(data, fileName, savePath)

    console.log('File saved to', savedPath)

    return savedPath
  } catch (error) {
    console.error('Error downloading file from Supabase Storage:', error)
  }
}

export default DownloadFileSupabaseStorageAsync
