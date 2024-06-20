import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  getOTP: () => ipcRenderer.invoke('get-otp'),
  // isAuthen: () => ipcRenderer.on('is-authen', (event, arg) => {}),
  // isAuthen: (callback) => ipcRenderer.on('is-authen', callback),
  // removeListener: (channel, callback) => ipcRenderer.removeListener(channel, callback),
  getContentItems: () => ipcRenderer.invoke('get-content-items'),
  downloadFile: (filePath) => ipcRenderer.invoke('download-file', filePath),
  listBuckets: () => ipcRenderer.invoke('list-buckets'),
  getOSInfo: () => ipcRenderer.invoke('get-os-info'),
  isAuthen: () => ipcRenderer.invoke('is-authen')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
