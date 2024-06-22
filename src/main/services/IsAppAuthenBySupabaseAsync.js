import supabase from '../supabase'
import GetDeviceID from '../utils/getDeviceID'

export const IsAppAuthenBySupabaseAsync = async () => {
  try {
    // Add your code here
    const applicationDeviceID = GetDeviceID()
    const { data, error } = await supabase
      .from('players')
      .select()
      .eq('device_id', applicationDeviceID)

    if (error) {
      throw new Error(error.message)
    }
    console.log('data when check authen: ', data)
    console.log('is app authen: ', data.length > 0)
    return Boolean(data.length > 0)
  } catch (error) {
    console.error('Error in IsAppAuthenBySupabaseAsync: ', error)
  }
}
