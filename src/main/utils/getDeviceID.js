import crypto from 'crypto'
import os from 'os'

export default function GetDeviceID() {
  // Get essential OS information
  const osInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    cpus: os
      .cpus()
      .map((cpu) => cpu.model)
      .join(),
    totalmem: os.totalmem()
  }

  // Generate a secret key based on unique device information
  const secretKey = `supersecretkey${osInfo.hostname}${osInfo.platform}${osInfo.arch}${osInfo.release}${osInfo.cpus}${osInfo.totalmem}_concatenated`

  // Create the device ID using SHA256
  const deviceID = crypto
    .createHmac('sha256', secretKey)
    .update(JSON.stringify(osInfo))
    .digest('hex')

  return deviceID
}
