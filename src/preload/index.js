import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  isAuthen: (callback) => ipcRenderer.on('is-authen', callback),
  removeListener: (channel, callback) => ipcRenderer.removeListener(channel, callback),
  getOTP: () => ipcRenderer.invoke('get-otp'),
  getContentItems: () => ipcRenderer.invoke('get-content-items'),
  downloadFile: (filePath) => ipcRenderer.invoke('download-file', filePath),
  listBuckets: () => ipcRenderer.invoke('list-buckets'),
  getOSInfo: () => ipcRenderer.invoke('get-os-info'),
  RunApplication: () => ipcRenderer.invoke('run-application'),
  deviceAuthen: () => ipcRenderer.invoke('device-authen')
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
