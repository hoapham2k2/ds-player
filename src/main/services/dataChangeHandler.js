import supabase from '../supabase'
import GetDeviceID from '../utils/getDeviceID'
import { SetFullScreenWindow, SetUnFullScreenWindow } from '../windows/mainWindow'

export const DataChangeHandler = async (window) => {
  const deviceId = GetDeviceID()
  try {
    await supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players'
        },
        (payload) => {
          console.log('Table players  changes with payload:', payload)
          if (payload.new.device_id === deviceId) {
            console.log('Device ID matches')
            SetUnFullScreenWindow(window.webContents)
            window.webContents.send('is-authen', true)
          } else {
            console.log('Device ID does not match')
            SetFullScreenWindow(window.webContents)
            window.webContents.send('is-authen', false)
          }
        }
      )
      .subscribe()
  } catch (error) {
    console.error('Error in DataChangeHandler: ', error)
  }
}

export default DataChangeHandler
