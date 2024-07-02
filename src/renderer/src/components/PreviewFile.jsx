import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import SplashScreen from './SplashScreen'

export const PreviewFilePage = ({ gender }) => {
  const videoRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [contentItems, setContentItems] = useState(null)
  const [mediaPath, setMediaPath] = useState(null)
  const currentItem = contentItems?.[currentIndex]

  useEffect(() => {
    window.api.getMediaFolder().then((data) => {
      setMediaPath(data)
    })
    window.api.getContentItems().then((data) => {
      setContentItems(data)
    })
    window.api.setFullScreen(true)
  }, [])

  
  useEffect(() => {
    if (!contentItems || contentItems.length === 0) return

    let timeout = 0

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length)
    }
    const currentItem = contentItems[currentIndex]

    if (currentItem?.resource_type === 'Video') {
      videoRef.current?.play()
      videoRef.current?.addEventListener('ended', handleNext)
      videoRef.current?.addEventListener('pause', handleNext)
      videoRef.current?.addEventListener('seeked', handleNext)
      videoRef.current?.addEventListener('stalled', handleNext)
      videoRef.current?.addEventListener('error', handleNext)


    } else {
      timeout = setTimeout(() => {
        handleNext()
      }, 10000) // 10 seconds
    }

    return () => {
      if (timeout) clearTimeout(timeout)
      // if (videoRef.current) {
      //   videoRef.current.onended = null
      //   videoRef.current.onpause = null
      //   videoRef.current.onseeked = null
      //   videoRef.current.onstalled = null
      //   videoRef.current.onerror = null

      //   videoRef.current.pause()
      // }

      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleNext)
        videoRef.current.removeEventListener('pause', handleNext)
        videoRef.current.removeEventListener('seeked', handleNext)
        videoRef.current.removeEventListener('stalled', handleNext)
        videoRef.current.removeEventListener('error', handleNext)
      }
      
    }
  }, [currentIndex, contentItems])

  if (!contentItems || !mediaPath) {
    return <div>Loading...</div>
  }

  if (contentItems.length === 0) {
    return <SplashScreen />
  }

  if (gender) {
    return (
      <div className="h-full w-full bg-blue-500 flex items-center justify-center">
        <h1 className="text-4xl text-white">{gender}</h1>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      {contentItems?.length > 0 && (
        <div className="flex-1 h-screen  flex flex-row items-center justify-center ">
          {currentItem && currentItem?.resource_type === 'Video' ? (
            <video
              className=" w-full h-full object-fill "
              ref={videoRef}
              src={`${mediaPath}/${currentItem?.file_path.split('/').pop()}`}
              // controls
              alt={`${mediaPath}/${currentItem?.file_path.split('/').pop()}`}
              autoPlay
              onEnded={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length)}
              onPause={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length)}
              onSeeked={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length)}
              onStalled={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length)}
              onError={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length)}

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
      )}
    </div>
  )
}

export default PreviewFilePage
