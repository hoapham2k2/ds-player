import supabase from '../supabase'
import GetDeviceID from '../utils/getDeviceID'

export const IsAppAuthenBySupabaseAsync = async () => {
  try {
    // Add your code here
    const applicationDeviceID = GetDeviceID()
    const { data, error } = await supabase
      .from('players')
      .select('device_id')
      .eq('device_id', applicationDeviceID)

    if (error) {
      throw new Error(error.message)
    }
    console.log('Data after checking app authen:', data, error)
    return Boolean(data.length)
  } catch (error) {
    console.error('Error in IsAppAuthenBySupabaseAsync: ', error)
  }
}
