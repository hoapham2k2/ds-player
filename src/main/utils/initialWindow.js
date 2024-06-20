import { BrowserWindow, app } from 'electron'
import CreateMainWindow from '../windows/mainWindow'
import DataChangeHandler from '../services/dataChangeHandler'
import { IsAppAuthenBySupabaseAsync } from '../services/IsAppAuthenBySupabaseAsync'
import SetFullScreenWindow, { SetUnFullScreenWindow } from './setFullScreenWindow'

export const InitialWindowAsync = async () => {
  const MainWindow = CreateMainWindow()
  const isApplicationAuthen = await IsAppAuthenBySupabaseAsync()

  if (!isApplicationAuthen) {
    SetFullScreenWindow(MainWindow.webContents)
  } else {
    SetUnFullScreenWindow(MainWindow.webContents)
  }
  app.on('activate', async function () {
    const isApplicationAuthen = await IsAppAuthenBySupabaseAsync()

    if (!isApplicationAuthen) {
      SetFullScreenWindow(MainWindow.webContents)
    } else {
      SetUnFullScreenWindow(MainWindow.webContents)
    }
    if (BrowserWindow.getAllWindows().length === 0) MainWindow = CreateMainWindow()
  })

  MainWindow.webContents.on('did-finish-load', () => {
    DataChangeHandler(MainWindow)
  })
}

export default InitialWindowAsync
