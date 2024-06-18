import supabase from '../supabase'

export const IsDeviceExistAsync = async (deviceID) => {
  return new Promise((resolve, reject) => {
    try {
      const { data, error } = supabase
        .from('device_otp')
        .select('device_id')
        .eq('device_id', deviceID)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export default IsDeviceExistAsync
