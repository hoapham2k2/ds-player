import React, { useState, useEffect, useRef } from 'react'
import SplashScreen from './SplashScreen'

// [
//     {
//       "file_path": "C:\\Users\\phamq\\AppData\\Roaming\\HoaPhamDigitalSignage\\recommend\\male\\01.jpg",
//       "file_name": "01.jpg",
//       "resource_type": "Image"
//     },
//     {
//       "file_path": "C:\\Users\\phamq\\AppData\\Roaming\\HoaPhamDigitalSignage\\recommend\\male\\02.jpg",
//       "file_name": "02.jpg",
//       "resource_type": "Image"
//     },
//     {
//       "file_path": "C:\\Users\\phamq\\AppData\\Roaming\\HoaPhamDigitalSignage\\recommend\\male\\03.jpg",
//       "file_name": "03.jpg",
//       "resource_type": "Image"
//     },
//     {
//       "file_path": "C:\\Users\\phamq\\AppData\\Roaming\\HoaPhamDigitalSignage\\recommend\\male\\04.mp4",
//       "file_name": "04.mp4",
//       "resource_type": "Video"
//     },
//     {
//       "file_path": "C:\\Users\\phamq\\AppData\\Roaming\\HoaPhamDigitalSignage\\recommend\\male\\05.mp4",
//       "file_name": "05.mp4",
//       "resource_type": "Video"
//     }
//   ]

export const RecommendPreview = ({ gender }) => {
  const [datas, setDatas] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentItem = datas?.[currentIndex]
  const videoRef = useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  
  useEffect(() => {
    window.api.getMediaFilesBasedOnGender(gender).then((data) => {
      setDatas(data)
    })
    window.api.setFullScreen(true)

  }, [gender])

  useEffect(() => {
    if (!datas || datas.length === 0) return
    let interval

    if (datas[currentIndex].resource_type === 'Image') {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % datas?.length)
      }, datas[currentIndex].duration * 1000)
    }

    return () => clearInterval(interval)
  }, [currentIndex, datas])

  if (datas?.length === 0) {
    return <SplashScreen />
  }

  const handleVideoEnded = () => {
    setIsVideoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % datas?.length)
  }
  return (
    <div className="relative h-full w-full">
      {datas?.length > 0 && (
        <div className="flex-1 h-screen  flex flex-row items-center justify-center ">
          {datas?.[currentIndex]?.resource_type === 'Video' ? (
            <video
              className=" w-full h-full object-fill "
              ref={videoRef}
              src={currentItem?.file_path}
              alt={currentItem?.file_path}
              autoPlay
              onPlay={() => setIsVideoPlaying(true)}
              onEnded={handleVideoEnded}
              onError={handleVideoEnded}
              onStalled={handleVideoEnded}
              onSuspend={handleVideoEnded}
              //if paused, play next video
              onPause={() => {
                setIsVideoPlaying(false)
                setCurrentIndex((prevIndex) => (prevIndex + 1) % datas?.length)
              }}
            ></video>
          ) : (
            <img
              //center image
              className="w-full h-full object-cover "
              src={currentItem?.file_path}
              alt={currentItem?.file_path}
            />
          )}
        </div>
      )}

      {/* {
        datas && <pre className='absolute top-0 left-0 bg-white p-2'>{JSON.stringify(currentItem, null, 2)}</pre>
      } */}
    </div>
  )
}

export default RecommendPreview
