import React, { useState } from 'react'
import PreviewItem from './PreviewItem'
import { useRef } from 'react'
import { useEffect } from 'react'

// Handle slide change and video playback
const datas = [
  {
    url: 'video1.mp4',
    type: 'video'
  },
  {
    url: 'video2.mp4',
    type: 'video'
  },
  {
    url: 'video3.mp4',
    type: 'video'
  },
  {
    url: 'image1.jpg',
    type: 'image'
  },
  {
    url: 'image2.jpg',
    type: 'image'
  },
  {
    url: 'image3.jpg',
    type: 'image'
  }
]

export const PreviewFilePage = () => {
  const [projectSourcePath, setProjectSourcePath] = useState('')
  const [separatorChar, setSeparatorChar] = useState('')
  const videoRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    window.api.getProjectSourcePath().then((res) => {
      console.log('Project source directory path:', res)
      setProjectSourcePath(res)
    })

    window.api.getSeparatorChar().then((res) => {
      console.log('Separator character:', res)
      setSeparatorChar(res)
    })
  }, [])


  useEffect(() => {
    const currentItem = datas[currentSlide]
    let timeout = 0

    if (currentItem.type === 'video' && videoRef.current) {
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
    setCurrentSlide((prevIndex) => (prevIndex + 1) % datas.length)
  }

  const currentItem = datas[currentSlide]

  return (
    <div className='w-screen h-screen overflow-hidden'>
      {currentItem.type === 'video' ? (
        <video
        className='w-full h-full object-cover'
          ref={videoRef}
          src={`${projectSourcePath}${separatorChar}sample${separatorChar}${currentItem.url}`}
          // controls
          autoPlay
        ></video>
      ) : (
        <img
        className='w-full h-full object-cover'
          src={`${projectSourcePath}${separatorChar}sample${separatorChar}${currentItem.url}`}
          alt=""
        />
      )}
    </div>
  )
}

export default PreviewFilePage
