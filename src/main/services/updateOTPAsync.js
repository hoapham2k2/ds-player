import supabase from '../supabase'

export const UpdateOTPAsync = async (deviceID, otp) => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .upsert({ id: deviceID, otp_code: otp }, { onConflict: ['id'] }) // upsert is used to insert if not exist, update if exist based on device_id

    if (error) {
      throw new Error(error.message)
    }
    return true
  } catch (error) {
    console.error('Error upserting OTP code:', error)
    return false
  }
}
