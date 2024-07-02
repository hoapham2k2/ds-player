import { shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import IsNetworkAvailable from '../services/IsNetworkAvailable'

let mainWindow = null
export const CreateMainWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    show: false,
    autoHideMenuBar: true,
    fullscreen: true,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      webSecurity: false
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.on('did-finish-load', () => {
    ;(async () => {
      mainWindow.webContents.send('network-status', await IsNetworkAvailable())
    })()

    setInterval(async () => {
      mainWindow.webContents.send('network-status', await IsNetworkAvailable())
    }, 5000)
  })

  return mainWindow // Return the window object to be used in the main process.
}

export const SetFullScreenWindow = () => {
  if (mainWindow) {
    mainWindow.setFullScreen(true)
  }
}

export const SetUnFullScreenWindow = () => {
  if (mainWindow) {
    mainWindow.setFullScreen(false)
  }
}

export default CreateMainWindow
