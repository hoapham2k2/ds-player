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
      // await ClearAllContentsInFolder(recommendFileDirectoryPath)

      // clear all contents in recommend folder
      await fs.promises.rmdir(recommendFileDirectoryPath, { recursive: true })
      fs.mkdirSync(recommendFileDirectoryPath)
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

    const { data: unisexRecommendDatas, error: recommendError3 } = await supabase.storage
      .from('recommends')
      .list('unisex', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })

    if (recommendError || recommendError2 || recommendError3) {
      console.error(
        'Error fetching recommend:',
        recommendError?.message || recommendError2?.message || recommendError3?.message
      )
      return []
    }

    // clear all contents in recommend folder

    // download and save to local
    const distMaleFolder = path.join(recommendFileDirectoryPath, 'male')
    const distFemaleFolder = path.join(recommendFileDirectoryPath, 'female')
    const distUnisexFolder = path.join(recommendFileDirectoryPath, 'unisex')

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
    }

    if (!fs.existsSync(distUnisexFolder)) {
      fs.mkdirSync(distUnisexFolder)

      for (const recommendData of unisexRecommendDatas) {
        const fileName = recommendData.name
        const { data, error } = await supabase.storage
          .from('recommends')
          .download(`unisex/${fileName}`)
        if (error) {
          console.error('Error downloading recommend file:', error.message)
          continue
        }
        await SaveBlobToLocalFileAsync(data, fileName, distUnisexFolder)
      }
    }
  } catch (error) {
    console.error('Error fetching recommend:', error.message)
  }
}

