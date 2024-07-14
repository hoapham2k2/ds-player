import supabase from '../supabase'
import GetDeviceID from '../utils/getDeviceID'

export const GetSupabaseSchedulesByDevice = async () => {
  try {
    const { data, error } = await supabase.rpc('get_schedules_by_device', {
      deviceid: GetDeviceID()
    })

    if (error) {
      throw new Error(error.message)
    }

    console.log('Data after get schedules by device', data)
    return data
  } catch (error) {
    console.error('Error in GetSupabaseSchedulesByDevice: ', error)
  }
}

export default GetSupabaseSchedulesByDevice
