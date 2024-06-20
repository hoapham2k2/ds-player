import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import IPCHandler from './ipcHandler'
import createMainWindow from './windows/mainWindow'
import createSecondWindow from './windows/secondWindow'
import IsDeviceExistAsync from './services/isDeviceExist'
import supabase from './supabase'
import GetDeviceID from './utils/getDeviceID'

export let MainWindow = null
export let LoginWindow = null
export let isDeviceExist = false
const deviceID = GetDeviceID()

export const SetIsDeviceExist = (value) => {
  isDeviceExist = value
}

const firstInitialWindow = async () => {
  // handle first time open app
  const { data, error } = await supabase
    .from('players')
    .select('device_id')
    .eq('device_id', deviceID)

  if (error) {
    throw new Error(error.message)
  }

  if (data.length > 0) {
    MainWindow = createMainWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) MainWindow = createMainWindow()
    })
    MainWindow.webContents.on('did-finish-load', () => {
      MainWindow.webContents.send('is-authen', true)
    })
  } else {
    LoginWindow = createSecondWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) LoginWindow = createSecondWindow()
    })
    LoginWindow.webContents.on('did-finish-load', () => {
      LoginWindow.webContents.send('is-authen', false)
    })
  }
}

const listenUpdateWindow = async () => {
  await supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'players'
      },
      (payload) => {
        console.log('Table players  changes with payload:', payload)

        if (payload.new.device_id === deviceID) {
          if (!MainWindow) {
            MainWindow = createMainWindow()
            app.on('activate', function () {
              if (BrowserWindow.getAllWindows().length === 0) MainWindow = createMainWindow()
            })
          }
          if (LoginWindow) {
            LoginWindow.close()

            LoginWindow = null
          }
          MainWindow.webContents.on('did-finish-load', () => {
            MainWindow.webContents.send('is-authen', true)
          })
        } else {
          if (!LoginWindow) {
            LoginWindow = createSecondWindow()
            app.on('activate', function () {
              if (BrowserWindow.getAllWindows().length === 0) LoginWindow = createSecondWindow()
            })
          }
          if (MainWindow) {
            MainWindow.close()
            MainWindow = null
          }
          LoginWindow.webContents.on('did-finish-load', () => {
            LoginWindow.webContents.send('is-authen', false)
          })
        }
      }
    )
    .subscribe()
}

try {
  app.whenReady().then(async () => {
    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    IPCHandler()

    await firstInitialWindow()
    await listenUpdateWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
} catch (error) {
  console.error('Error in main process: ', error)
}
