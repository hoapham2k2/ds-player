import { BrowserWindow, app } from 'electron'
import CreateMainWindow, { SetFullScreenWindow, SetUnFullScreenWindow } from '../windows/mainWindow'
import DataChangeHandler from '../services/dataChangeHandler'
import { IsAppAuthenBySupabaseAsync } from '../services/IsAppAuthenBySupabaseAsync'

export const InitialWindowAsync = async () => {
  const MainWindow = CreateMainWindow()
  const isApplicationAuthen = await IsAppAuthenBySupabaseAsync()
  console.log('isApplicationAuthen: ', isApplicationAuthen)

  if (isApplicationAuthen) {
    MainWindow.webContents.send('is-authen', true)
    SetUnFullScreenWindow(MainWindow.webContents)
  } else {
    SetFullScreenWindow(MainWindow.webContents)
    MainWindow.webContents.send('is-authen', false)
  }

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      MainWindow = CreateMainWindow()
      if (isApplicationAuthen) {
        SetUnFullScreenWindow(MainWindow.webContents)
        MainWindow.webContents.send('is-authen', true)
      } else {
        SetFullScreenWindow(MainWindow.webContents)
        MainWindow.webContents.send('is-authen', false)
      }
    }
  })

  MainWindow.webContents.on('did-finish-load', () => {
    DataChangeHandler(MainWindow)
  })
}

export default InitialWindowAsync
