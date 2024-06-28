export default function GetDeviceName() {
  // Get the device name of the device
  // This function will be used to get the device name of the device

  // Import the os module
  const os = require('os')

  // Get the hostname
  const hostname = os.hostname()

  // Return the hostname
  return hostname
}
