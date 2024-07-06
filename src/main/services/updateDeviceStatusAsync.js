import supabase from '../supabase'
import GetDeviceID from '../utils/getDeviceID'
import GetDeviceLocalIP from '../utils/getDeviceLocalIP'
import GetDeviceName from '../utils/getDeviceName'

export const UpdateDeviceStatusAsync = async () => {
  const deviceID = GetDeviceID()
  const deviceLocalIP = GetDeviceLocalIP()
  const deviceName = GetDeviceName()

  return await new Promise((resolve) => {
    setInterval(async () => {
      const { data, error } = await supabase
        .from('players')
        .update({
          ip_address: deviceLocalIP?.IP,
          status: 'ONLINE',
          last_ping: new Date().toISOString()
        })
        .eq('device_id', deviceID)
      if (error) {
        throw new Error(error.message)
      }
      console.log('Device status updated successfully with response: ', data)
      resolve(data)
    }, 30000)
  })
}

export default UpdateDeviceStatusAsync
