import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import SplashScreen from './SplashScreen'
import { useQuery } from 'react-query'
import { useGetContentItems, useGetMediaFolder } from '../../services/test'

export const PreviewFilePage = () => {
  const videoRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: mediaPath } = useQuery({
    queryKey: 'mediaPath',
    queryFn: () => {
      return useGetMediaFolder()
    }
  })

  const { data: contentItems } = useQuery({
    queryKey: 'contentItems',
    queryFn: () => {
      return useGetContentItems()
    }
  })

  useEffect(() => {
    if (!contentItems) return

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length)
    }

    const currentItem = contentItems[currentIndex]
    let timeout = 0

    // prevent error The play() request was interrupted by a new load request
    if (currentItem?.resource_type === 'Video' && videoRef.current) {
      videoRef.current.play()
      videoRef.current.onended = () => {
        handleNext()
      }
    } else {
      timeout = setTimeout(() => {
        handleNext()
      }, 10000) // 10 seconds
    }

    return () => {
      if (timeout) clearTimeout(timeout)
      if (videoRef.current) videoRef.current.onended = null
    }
  }, [currentIndex])

  return (
    // <div>
    //   {contentItems === null ? (
    //     <SplashScreen />
    //   ) : contentItems.length > 0 ? (
    //     <div className="flex flex-row gap-4">
    //       <div className="flex-1 h-screen  flex flex-row items-center justify-center ">
    //         {currentItem && currentItem?.resource_type === 'Video' ? (
    //           <video
    //             className=" max-h-screen max-w-full object-contain "
    //             ref={videoRef}
    //             src={`${mediaPath}/${currentItem?.file_path.split('/').pop()}`}
    //             // controls
    //             alt={`${mediaPath}/${currentItem?.file_path.split('/').pop()}`}
    //             autoPlay
    //           ></video>
    //         ) : (
    //           <img
    //             //center image
    //             className="max-h-screen max-w-full object-contain "
    //             src={`${mediaPath}/${currentItem?.file_path.split('/').pop()} `}
    //             alt={`${mediaPath}/${currentItem?.file_path}`}
    //           />
    //         )}
    //         <pre>{JSON.stringify(currentItem, null, 2)}</pre>
    //       </div>
    //       <div className="w-3/12 flex flex-col gap-2">{/* <AppCamera /> */}</div>
    //     </div>
    //   ) : null}
    // </div>
    <div>
      {
        contentItems.length
      }
    </div>
  )
}

export default PreviewFilePage
