import path from 'path'
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

  console.log('Application path:', path.join(baseDir, 'HoaPhamDigitalSignage'))

  return path.join(baseDir, 'HoaPhamDigitalSignage')
}

export default GetApplicationPath
