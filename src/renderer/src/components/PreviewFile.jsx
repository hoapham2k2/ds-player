import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

// Install the Autoplay module

export const PreviewFilePage = () => {
  const navigate = useNavigate()
  const swiperRef = useRef(null)

  // Listen for the Escape key to navigate to the home page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  // Handle slide change and video playback
  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper

    const handleSlideChange = () => {
      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex]
      const video = activeSlide.querySelector('video')

      if (video) {
        if (swiperInstance.autoplay && swiperInstance.autoplay.stop) {
          swiperInstance.autoplay.stop() // Stop autoplay when video is present
        }
        video.play()
        video.onended = () => {
          swiperInstance.slideNext()
          if (swiperInstance.autoplay && swiperInstance.autoplay.start) {
            swiperInstance.autoplay.start() // Restart autoplay after video ends
          }
        }
      } else {
        if (swiperInstance.autoplay && swiperInstance.autoplay.start) {
          swiperInstance.autoplay.start() // Ensure autoplay is running if no video
        }
      }
    }

    swiperInstance.on('slideChange', handleSlideChange)

    // Initial slide check
    handleSlideChange()

    return () => {
      swiperInstance.off('slideChange', handleSlideChange)
    }
  }, [])

  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      className="w-full h-full flex flex-row bg-red-50"
      autoplay={{ delay: 1000, disableOnInteraction: false }} // Disable autoplay on interaction
    >
      <SwiperSlide>
        <video
          src="https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/default/SampleVideo_1280x720_5mb.mp4"
          controls
          style={{ width: '100%', height: '100%' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <video
          src="https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/default/SampleVideo_1280x720_5mb.mp4"
          controls
          style={{ width: '100%', height: '100%' }}
        />
      </SwiperSlide>
      <SwiperSlide>Slide 3: Some Text Content</SwiperSlide>
      <SwiperSlide>Slide 4: Some Other Content</SwiperSlide>
    </Swiper>
  )
}

export default PreviewFilePage
