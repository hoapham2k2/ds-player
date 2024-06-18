import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

export const createSecondWindow = () => {
  const secondWindow = new BrowserWindow({
    width: 300,
    height: 200,
    show: false,
    frame: false,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  secondWindow.on('ready-to-show', () => {
    secondWindow.show()
  })

  secondWindow.loadURL('http://localhost:5173/versions')
}

export default createSecondWindow
