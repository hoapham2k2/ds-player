import { ipcMain } from 'electron'
import createSecondWindow from './windows/secondWindow'
import { UpdateOTPAsync } from './services/updateOTP'
import GetDeviceID from './utils/getDeviceID'
import supabase from './supabase'
import DownloadFileSupabaseStorageAsync from './services/downloadFileSupabaseStorageAsync'
import ListAllSupabaseBucketAsync from './services/listAllSupabaseBucketAsync'
import os from 'os'
export default function IPCHandler() {
  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('open-second-window', () => {
    createSecondWindow()
  })
  ipcMain.handle('get-otp', async () => {
    // 6 digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000)
    const deviceID = GetDeviceID()
    const isUpdateOTPSuccessful = await UpdateOTPAsync(deviceID, otpCode)
    if (isUpdateOTPSuccessful === true) {
      return otpCode
    }
    return null
  })

  ipcMain.handle('get-content-items', async () => {
    let { data, error } = await supabase.rpc('get_content_items', {
      deviceid: GetDeviceID()
    })
    if (error) console.error(error)
    else {
      console.log(data)

      // reduce the items which have the same id
      let uniqueItems = data.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id)
        if (!x) {
          return acc.concat([current])
        } else {
          return acc
        }
      }, [])

      return uniqueItems
    }
  })

  ipcMain.handle('download-file', async (event, filePath) => {
    const responsePath = await DownloadFileSupabaseStorageAsync(filePath)
    return responsePath
  })

  ipcMain.handle('list-buckets', async () => {
    let allBuckets = await ListAllSupabaseBucketAsync()
    return allBuckets
  })

  ipcMain.handle('get-os-info', async () => {
    return {
      platform: os.platform(),
      release: os.release(),
      type: os.type(),
      arch: os.arch(),
      cpus: os.cpus(),
      totalmem: os.totalmem(),
      homedir: os.homedir(),
      hostname: os.hostname()
    }
  })
}
