import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import SplashScreen from './SplashScreen'

export const PreviewFilePage = () => {
  const videoRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [contentItems, setContentItems] = useState(null)
  const [mediaPath, setMediaPath] = useState(null)
  const currentItem = contentItems?.[currentIndex]
  const [deviceID, setDeviceID] = useState('')

  // useEffect(() => {
  //   window.api.getMediaFolder().then((data) => {
  //     setMediaPath(data)
  //   })
  //   window.api.getContentItems().then((data) => {
  //     setContentItems(data)
  //   })
  //   window.api.setFullScreen(true)
  // }, [])

  useEffect(() => {
    window.parseInt.getDeviceId().then((res)=> setDeviceID(res))

    // const fetchContentItemsBelongToDeviceAsync = async () => {

    //   const {data,error} = await n
      
    // }
  }, [])

  useEffect(() => {
    if (!contentItems || contentItems.length === 0) return
    let interval

    if (contentItems[currentIndex].resource_type === 'Image') {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems?.length)
      }, contentItems[currentIndex].duration * 1000)
    }

    return () => clearInterval(interval)
  }, [currentIndex, contentItems])

  if (contentItems?.length === 0) {
    return <SplashScreen />
  }

  const handleVideoEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems?.length)
  }

  return (
    <div className="h-full w-full">
      {contentItems?.length > 0 ? (
        <div className="flex-1 h-screen  flex flex-row items-center justify-center ">
          {contentItems?.[currentIndex]?.resource_type === 'Video' ? (
            <video
              className=" w-full h-full object-fill "
              ref={videoRef}
              src={`${mediaPath}/${currentItem?.file_path.split('/').pop()}`}
              alt={`${mediaPath}/${currentItem?.file_path.split('/').pop()}`}
              autoPlay
              onEnded={handleVideoEnded}
              onError={handleVideoEnded}
              //if paused, play next video
              onPause={() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems?.length)
              }}
            ></video>
          ) : (
            <img
              //center image
              className="w-full h-full object-cover "
              src={`${mediaPath}/${currentItem?.file_path.split('/').pop()} `}
              alt={`${mediaPath}/${currentItem?.file_path}`}
            />
          )}
        </div>
      ) : (
        <SplashScreen />
      )}
    </div>
  )
}

export default PreviewFilePage
