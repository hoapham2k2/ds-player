import { ipcMain } from 'electron'
import createSecondWindow from './windows/secondWindow'
import { UpdateOTPAsync } from './services/updateOTPAsync'
import GetDeviceID from './utils/getDeviceID'
import supabase from './supabase'
import DownloadFileSupabaseStorageAsync from './services/downloadFileSupabaseStorageAsync'
import ListAllSupabaseBucketAsync from './services/listAllSupabaseBucketAsync'
import os from 'os'
import GetContentItemsByDeviceAsync from './services/getContentItemsByDeviceAsync'
import { IsAppAuthenBySupabaseAsync } from './services/IsAppAuthenBySupabaseAsync'
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

  ipcMain.handle('get-content-items', async () => await GetContentItemsByDeviceAsync())

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

  ipcMain.handle('is-authen', async () => await IsAppAuthenBySupabaseAsync())
}
