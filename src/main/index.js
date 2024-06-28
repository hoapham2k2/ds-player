import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import InitialWindowAsync from './utils/initialWindow'
import IPCHandler from './ipcHandler'
import FetchContentsAsync from './services/fetchContentsAsync'
import DataChangeHandler from './services/dataChangeHandler'
import UpdateDeviceStatusAsync from './services/updateDeviceStatusAsync'

try {
  app.whenReady().then(async () => {
    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
    await FetchContentsAsync().then((data) => console.log('Fetched contents:', data))
    const mainWindow = await InitialWindowAsync()
    IPCHandler()
    DataChangeHandler(mainWindow)
    UpdateDeviceStatusAsync()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
} catch (error) {
  console.error('Error in main process: ', error)
}
