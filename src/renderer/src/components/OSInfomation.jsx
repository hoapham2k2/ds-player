import { useEffect, useState } from 'react'

export const OSInfomation = () => {
  const [osInfo, setOsInfo] = useState('')
  useEffect(() => {
    window.api.getOSInfo().then((res) => {
      setOsInfo(res)
    })
  }, [])

  const handlePlatform = (platform) => {
    switch (platform) {
        case 'aix':
            return 'AIX'
        case 'darwin':
            return 'macOS'
        case 'freebsd':
            return 'FreeBSD'
        case 'linux':
            return 'Linux'
        case 'openbsd':
            return 'OpenBSD'
        case 'sunos':
            return 'SunOS'
        case 'win32':
            return 'Windows'
        default:
            return 'Unknown'
        }
    }
    
    const handleMemory = (totalmem) => {
        return (totalmem / 1024 / 1024 / 1024).toFixed(2) + ' GB'
    }


  return (
    <div>
      <div> OS Information</div>
      {osInfo && (
        <div>
            <div>Platform: {handlePlatform(osInfo.platform)}</div>
            <div>Type: {osInfo.type}</div>
            <div>Arch: {osInfo.arch}</div>
            <div>Total RAM: {handleMemory(osInfo.totalmem)}</div>
            <div>Computer Name: {osInfo.hostname}</div>
        </div>
      )}
    </div>
  )
}

export default OSInfomation
