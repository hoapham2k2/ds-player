// fullscreen window

import { BrowserWindow } from 'electron'

export const SetFullScreenWindow = (eventSender) => {
  const window = BrowserWindow.fromWebContents(eventSender)
  if (window) {
    window.setFullScreen(true)
  }
}

export const SetUnFullScreenWindow = (eventSender) => {
  const window = BrowserWindow.fromWebContents(eventSender)
  if (window) {
    window.setFullScreen(false)
  }
}

//using the function:
// import SetFullScreenWindow from './setFullScreenWindow'
//
// event.sender = mainWindow.webContents
// SetFullScreenWindow(event)
//
// // Output:
// // The window will be set to fullscreen

export default SetFullScreenWindow
