import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import IPCHandler from './ipcHandler'
import createMainWindow from './windows/mainWindow'
import createSecondWindow from './windows/secondWindow'
import IsDeviceExistAsync from './services/isDeviceExist'
import getDeviceID from './utils/getDeviceID'

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  IPCHandler()

  const isDeviceExist = await IsDeviceExistAsync()

  if (isDeviceExist) {
    createMainWindow()
    console.log(`Device ID: ${getDeviceID()}`)
    //handle for MacOS
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
  } else {
    createSecondWindow()
    console.log(`Device ID: ${getDeviceID()}`)
    //handle for MacOS
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createSecondWindow()
    })
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
