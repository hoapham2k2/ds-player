import { net } from 'electron'

export const IsNetworkAvailable = async () => {
  let isConnected = true

  try {
    const request = net.request('https://www.google.com')
    request.on('response', () => {
      isConnected = true
    })
    request.on('error', () => {
      isConnected = false
    })
    request.end()
  } catch (error) {
    console.error('Error in IsNetworkAvailable: ', error)
  }

  return isConnected
}

export default IsNetworkAvailable
