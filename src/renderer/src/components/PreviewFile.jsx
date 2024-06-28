import React, { useState } from 'react'
import PreviewItem from './PreviewItem'
import { useRef } from 'react'
import { useEffect } from 'react'
import AppCamera from './AppCamera'

// // Handle slide change and video playback
// const contentItems =[
//   {
//     "id": 1,
//     "title": "Default item 1",
//     "duration": 10,
//     "file_path": "default/default01.jfif",
//     "created_at": "2024-06-27T09:16:57.367408+00:00",
//     "dimensions": null,
//     "updated_at": "2024-06-27T06:20:37.825536+00:00",
//     "description": null,
//     "resource_type": "Image",
//     "thumbnail_url": null
//   },
//   {
//     "id": 2,
//     "title": "Default item 2",
//     "duration": 10,
//     "file_path": "default/default02.jfif",
//     "created_at": "2024-06-27T09:16:57.367409+00:00",
//     "dimensions": null,
//     "updated_at": "2024-06-27T06:20:37.825536+00:00",
//     "description": null,
//     "resource_type": "Image",
//     "thumbnail_url": null
//   },
// ]

export const PreviewFilePage = () => {
  // const [projectSourcePath, setProjectSourcePath] = useState('')
  // const [separatorChar, setSeparatorChar] = useState('')
  const [mediaPath, setMediaPath] = useState('')
  const [contentItems, setContentItems] = useState([])
  const videoRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // window.api.getProjectSourcePath().then((res) => {
    //   console.log('Project source directory path:', res)
    //   setProjectSourcePath(res)
    // })

    // window.api.getSeparatorChar().then((res) => {
    //   console.log('Separator character:', res)
    //   setSeparatorChar(res)
    // })

    window.api.getMediaFolder().then((res) => {
      console.log('Media path:', res)
      setMediaPath(res)
    })

    window.api.getContentItems().then((res) => {
      console.log('Content items:', res)
      setContentItems(res)
    })
  }, [])

  useEffect(() => {
    const currentItem = contentItems[currentSlide]
    let timeout = 0
    if(!currentItem) return

    if (currentItem?.resource_type === 'Video' && videoRef.current) {
      videoRef.current.play()
      videoRef.current.onended = () => {
        handleNext()
      }
    } else {
      timeout = setTimeout(() => {
        handleNext()
      }, 10000) // 10000ms for images
    }

    return () => {
      if (timeout) clearTimeout(timeout)
      if (videoRef.current) videoRef.current.onended = null
    }
  }, [currentSlide])

  const handleNext = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % contentItems.length)
  }

  const currentItem = contentItems[currentSlide]
  

  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1 h-screen  flex flex-row items-center justify-center ">
        {currentItem && currentItem?.resource_type === 'Video' ? (
          <video
            className=" max-h-screen max-w-full object-contain "
            ref={videoRef}
            src={`${mediaPath}/${currentItem?.file_path.split('/').pop() }`} // if default/default01.jfif is the file path, then it will be default01.jfif
            // controls
            autoPlay
          ></video>
        ) : (
          <img
            //center image
            className="max-h-screen max-w-full object-contain "
            src={`${mediaPath}/${currentItem?.file_path.split('/').pop()    } `} // if default/default01.jfif is the file path, then it will be default01.jfif
            alt="Preview" 
          />
        )}
      </div>
      <div className="w-3/12 flex flex-col gap-2">
        <AppCamera />
      </div>
    </div>
    
  )
}

export default PreviewFilePage
