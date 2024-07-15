import { useEffect, useState } from 'react'
import SlideShow from '../components/SlideShow'
import SplashScreen from '../components/SplashScreen'
const HomePage = () => {

  const [peopleDetected, setPeopleDetected] = useState(false)
  const [lastDetectionTime, setLastDetectionTime] = useState(Date.now())

  const [femaleCount, setFemaleCount] = useState(0)
  const [maleCount, setMaleCount] = useState(0)


  useEffect(() => {
    const checkForPeople = setInterval(() => {
      if (Date.now() - lastDetectionTime > 4000) {
        setPeopleDetected(false)
      }
    }, 100)

    return () => clearInterval(checkForPeople)
  }, [lastDetectionTime])

  const handleDetection = (detected, maleCount, femaleCount) => {
    if (detected) {
      setLastDetectionTime(Date.now())
      setMaleCount(maleCount)
      setFemaleCount(femaleCount)
      setTimeout(() => {
        setPeopleDetected(true)
      }, 100)
    }
  }

  return (
    <div className="w-full h-full">
        <SlideShow
          handleDetection={handleDetection}
          peopleDetected={peopleDetected}
          maleCount={maleCount}
          femaleCount={femaleCount}
        />
      
    </div>
  )
}

export default HomePage
