import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import IPCHandler from './ipcHandler'
import InitialWindowAsync from './utils/initialWindow'

try {
  app.whenReady().then(async () => {
    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    IPCHandler()
    await InitialWindowAsync()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
} catch (error) {
  console.error('Error in main process: ', error)
}
