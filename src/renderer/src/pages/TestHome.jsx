import { useEffect, useState } from 'react'
import supabase from '../../../main/supabase'
import { toast } from 'react-toastify'
import SplashScreen from '../components/SplashScreen'

const TestHome = () => {
  const [deviceID, setDeviceID] = useState('')
  const [contentItems, setContentItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    window.api.getDeviceID().then((res) => {
      setDeviceID(res)
    })
    const getContentItemsByDeviceAsync = async () => {
      const { data, error } = await supabase.rpc('get_playlist_content_items', {
        deviceid: deviceID
      })
      if (error) {
        console.error('Error fetching content items:', error)
        toast.error('Error fetching content items' + JSON.stringify(error))
        return
      }
      setContentItems(data)
    }

    const subscription = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'playlist_content_items'
        },
        (payload) => {
          console.log('Table content_items changes with payload:', payload)
          getContentItemsByDeviceAsync()
        }
      )
      .subscribe()

    getContentItemsByDeviceAsync()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [deviceID])

  useEffect(() => {
    if (!contentItems || contentItems.length === 0) return
    let interval

    if (contentItems?.[currentIndex]?.content_item?.resource_type === 'Image') {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems?.length)
      }, contentItems[currentIndex].duration * 1000)
    }

    return () => clearInterval(interval)
  }, [currentIndex, contentItems])

  // if (contentItems?.length === 0) {
  //   return <SplashScreen />
  // }

  const handleVideoEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems?.length)
  }

  return (
    <div className="h-full w-full">
      {contentItems?.length > 0 ? (
        <div className="flex-1 h-screen  flex flex-row items-center justify-center ">
          {contentItems?.[currentIndex]?.content_item.resource_type === 'Video' ? (
            <video
              className=" w-full h-full object-fill "
              src={`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${contentItems?.[currentIndex]?.content_item.file_path}`}
              alt={`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${contentItems?.[currentIndex]?.content_item.file_path}`}
              autoPlay
              onEnded={handleVideoEnded}
              onError={handleVideoEnded}
              //if paused, play next video
              onPause={() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems?.length)
              }}
            />
          ) : (
            <img
              //center image
              className="w-full h-full object-cover "
              src={`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${contentItems?.[currentIndex]?.content_item.file_path}`}
              alt={`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${contentItems?.[currentIndex]?.content_item.file_path}`}
            />
          )}
        </div>
      ) : (
        <SplashScreen />
      )}
    </div>
  )
}

export default TestHome
