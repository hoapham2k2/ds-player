import supabase from '../supabase'

// return Promise<boolean>
export const IsDeviceExistAsync = async (deviceID) => {
  try {
    const { data, error } = await supabase
      .from('device_otp')
      .select('device_id')
      .eq('device_id', deviceID)

    if (error) {
      throw new Error(error.message)
    }

    return Boolean(data)
  } catch (error) {
    console.error('Error in IsDeviceExistAsync: ', error)
  }
}

export default IsDeviceExistAsync
