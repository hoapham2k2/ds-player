export default function GetDeviceLocalIP() {
  // Get the local IP address of the device
  // This function will be used to get the local IP address of the device

  // Import the os module
  const os = require('os')

  // Get the network interfaces
  const networkInterfaces = os.networkInterfaces()

  // Initialize the IP address
  let ipAddress = ''

  // Loop through the network interfaces
  for (const key in networkInterfaces) {
    // Get the network interface
    const networkInterface = networkInterfaces[key]

    // Find the IP address
    const ip = networkInterface.find((item) => item.family === 'IPv4')

    // If the IP address is found
    if (ip) {
      // Set the IP address
      ipAddress = ip.address
      break
    }
  }
  // Return the IP address
  return ipAddress
}
