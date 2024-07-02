import GetApplicationPath from '../utils/getApplicationPath'
import path from 'path'
import fs from 'fs'
import supabase from '../supabase'
import SaveBlobToLocalFileAsync from '../utils/saveBlobToLocalFileAsync'

export default async function FetchRecommendAsync() {
  const applicationDirectoryPath = GetApplicationPath()

  const recommendFileDirectoryPath = path.join(applicationDirectoryPath, 'recommend')

  try {
    if (!fs.existsSync(recommendFileDirectoryPath)) {
      fs.mkdirSync(recommendFileDirectoryPath)
    } else {
      await ClearAllContentsInFolder(recommendFileDirectoryPath)
    }

    const { data: maleRecommendDatas, error: recommendError } = await supabase.storage
      .from('recommends')
      .list('male', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })

    const { data: femaleRecommendDatas, error: recommendError2 } = await supabase.storage
      .from('recommends')
      .list('female', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })

    if (recommendError || recommendError2) {
      console.error(
        'Error fetching recommend:',
        recommendError?.message || recommendError2?.message
      )
      return []
    }

    // download and save to local
    const distMaleFolder = path.join(recommendFileDirectoryPath, 'male')
    const distFemaleFolder = path.join(recommendFileDirectoryPath, 'female')

    if (!fs.existsSync(distMaleFolder)) {
      fs.mkdirSync(distMaleFolder)

      for (const recommendData of maleRecommendDatas) {
        const fileName = recommendData.name
        const { data, error } = await supabase.storage
          .from('recommends')
          .download(`male/${fileName}`)
        if (error) {
          console.error('Error downloading recommend file:', error.message)
          continue
        }
        await SaveBlobToLocalFileAsync(data, fileName, distMaleFolder)
      }
    }
    if (!fs.existsSync(distFemaleFolder)) {
      fs.mkdirSync(distFemaleFolder)

      for (const recommendData of femaleRecommendDatas) {
        const fileName = recommendData.name
        const { data, error } = await supabase.storage
          .from('recommends')
          .download(`female/${fileName}`)
        if (error) {
          console.error('Error downloading recommend file:', error.message)
          continue
        }
        await SaveBlobToLocalFileAsync(data, fileName, distFemaleFolder)
      }

      // await ClearAllContentsInFolder(distMaleFolder)
      // await ClearAllContentsInFolder(distFemaleFolder)
    }
  } catch (error) {
    console.error('Error fetching recommend:', error.message)
  }
}

const ClearAllContentsInFolder = async (folderPath) => {
  fs.readdirSync(folderPath, (err, files) => {
    if (err) throw err
    for (const file of files) {
      fs.unlinkSync(path.join(folderPath, file))
    }
  })
}
