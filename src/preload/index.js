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
  deviceAuthen: () => ipcRenderer.invoke('device-authen'),
  getProjectSourcePath: () => ipcRenderer.invoke('get-source-code-path'),
  getApplicationMediaPath: () => ipcRenderer.invoke('get-application-media-path'),
  getSeparatorChar: () => ipcRenderer.invoke('get-application-separator-char'),
  getDeviceID: () => ipcRenderer.invoke('get-device-id'),
  getMACAddress: () => ipcRenderer.invoke('get-mac'),
  getIP: () => ipcRenderer.invoke('get-ip'),
  getMediaFolder: () => ipcRenderer.invoke('get-media-folder')
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
