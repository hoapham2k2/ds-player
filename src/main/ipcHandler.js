import { ipcMain } from 'electron'
import createSecondWindow from './windows/secondWindow'

export default function IPCHandler() {
  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('open-second-window', () => {
    createSecondWindow()
  })
}
