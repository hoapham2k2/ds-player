import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

export const createSecondWindow = () => {
  const secondWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    frame: false,
    fullscreen: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  secondWindow.on('ready-to-show', () => {
    secondWindow.show()
  })

  secondWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    secondWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    secondWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return secondWindow // Return the window object to be used in the main process.
}

export default createSecondWindow
