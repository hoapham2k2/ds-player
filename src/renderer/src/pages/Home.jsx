import { useEffect, useState } from 'react'
import SplashScreen from '../components/SplashScreen'

// import { ImageData, createCanvas } from 'canvas'
import SlideShow from '../components/SlideShow'
import { toast } from 'react-toastify'
const HomePage = () => {
  const [contentItems, setContentItems] = useState(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [peopleDetected, setPeopleDetected] = useState(false)
  const [lastDetectionTime, setLastDetectionTime] = useState(Date.now())

  const [femaleCount, setFemaleCount] = useState(0)
  const [maleCount, setMaleCount] = useState(0)
  useEffect(() => {
    window.api.getContentItems().then((res) => {
      setContentItems(res)
    })
  }, [])

  useEffect(() => {
    const checkForPeople = setInterval(() => {
      if (Date.now() - lastDetectionTime > 15000) {
        setPeopleDetected(false)
      }
    }, 1000)

    return () => clearInterval(checkForPeople)
  }, [lastDetectionTime])

  const handleDetection = (detected, maleCount, femaleCount) => {
    if (detected) {
      setLastDetectionTime(Date.now())
      setMaleCount(maleCount)
      setFemaleCount(femaleCount)
      setTimeout(() => {
        setPeopleDetected(true)
      }, 2000)
    }
  }

  return (
    <div className="w-full h-full">
      {/* {contentItems && contentItems.length > 0 && (
        <SlideShow
          handleDetection={handleDetection}
          isModelLoaded={isModelLoaded}
          peopleDetected={peopleDetected}
          maleCount={maleCount}
          femaleCount={femaleCount}
        />
      )} */}
    </div>
  )
}

export default HomePage
