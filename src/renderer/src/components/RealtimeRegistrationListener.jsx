import { useEffect, useState } from 'react'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import supabase from '../../../main/supabase'
import { useNavigate } from 'react-router-dom'

const Realtimeregistrationlistener = () => {
  const [isRegistered, setIsRegistered] = useState(null)
  const navigate = useNavigate()
  const [deviceID, setDeviceID] = useState('')


  useEffect(() => {


    window.api.getDeviceID().then((res) => {
      setDeviceID(res)
    })
    const checkRegistrationStatus = async () => {
      const { data, error } = await supabase.from('players').select().eq('device_id', deviceID)
      console.log(`data: ${data}, error: ${error}, deviceID: ${deviceID}`)
      if (error) {
        console.error('Error fetching player:', error)
        return
      }

      console.log('Player:', data)
      if (data.length === 0) {
        console.log('Player not found')
        return
      }

      setIsRegistered('IS REGISTERED')
    }

    checkRegistrationStatus()

    const subscription = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players'
        },
        (payload) => {
          console.log('Table players changes with payload:', payload)
          if (payload.new.device_id === deviceID) {
            console.log('Device ID matches')
            setIsRegistered('IS REGISTERED')
          }
       }
      )
      .subscribe()

    console.log('subscription:', subscription)

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [deviceID, navigate])

  return (
    <div className='w-full h-full'>{isRegistered && isRegistered === 'IS REGISTERED' ? <HomePage /> : <LoginPage />}</div>
  )
}

export default Realtimeregistrationlistener
