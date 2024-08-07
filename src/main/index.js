import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import IPCHandler from './ipcHandler'
import FetchContentsAsync from './services/fetchContentsAsync'
import CreateMainWindow from './windows/mainWindow'
import LoadConfigurationFile from './utils/loadConfigurationFile'
import IsNetworkAvailable from './services/IsNetworkAvailable'
import FetchRecommendAsync from './services/fetchRecommendAsync'

let isNetworkAvailable = true

try {
  app.whenReady().then(async () => {
    electronApp.setAppUserModelId('com.electron')
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    IPCHandler()

    await LoadConfigurationFile()
    ;(async () => {
      isNetworkAvailable = await IsNetworkAvailable()
      console.log('Network status:', isNetworkAvailable)
    })()

    if (isNetworkAvailable) {
      await FetchContentsAsync()
    } else {
      setInterval(async () => {
        isNetworkAvailable = await IsNetworkAvailable()
        if (isNetworkAvailable) {
          await FetchContentsAsync()
        }
      }, 5000)
    }

    await FetchRecommendAsync()

    await CreateMainWindow()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      CreateMainWindow()
    }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
} catch (error) {
  // dialog.showErrorBox('Error while starting the app', error.message)
}
