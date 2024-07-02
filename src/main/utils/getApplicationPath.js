import path from 'path'
import fs from 'fs'
export const GetApplicationPath = () => {
  // get local wokring path base on operating system

  let baseDir = ''

  switch (process.platform) {
    case 'win32':
      baseDir = process.env.APPDATA // for windows
      break
    case 'darwin':
      baseDir = path.join(process.env.HOME, 'Library', 'Application Support') // for mac
      break
    default:
      baseDir = process.env.HOME // for linux and others
      break
  }

  const applicatonPath = path.join(baseDir, 'HoaPhamDigitalSignage')
  if (!fs.existsSync(applicatonPath)) {
    fs.mkdirSync(applicatonPath)
  }

  console.log('Application path:', applicatonPath)

  return applicatonPath
}

export const GetApplicationMediaPath = () => {
  if (!fs.existsSync(path.join(GetApplicationPath(), 'media'))) {
    fs.mkdirSync(path.join(GetApplicationPath(), 'media'))
  }
  return path.join(GetApplicationPath(), 'media')
}

export const GetApplicationConfigPath = () => {
  if (!fs.existsSync(path.join(GetApplicationPath(), 'config'))) {
    fs.mkdirSync(path.join(GetApplicationPath(), 'config'))
  }
  return path.join(GetApplicationPath(), 'config')
}

export default GetApplicationPath
