import { useEffect, useState } from 'react'
import SplashScreen from '../components/SplashScreen'

import * as faceapi from 'face-api.js'
// import { ImageData, createCanvas } from 'canvas'
import SlideShow from '../components/SlideShow'
import { toast } from 'react-toastify'
const HomePage = () => {
  const [contentItems, setContentItems] = useState(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [peopleDetected, setPeopleDetected] = useState(false)
  const [lastDetectionTime, setLastDetectionTime] = useState(Date.now())
  const [modelsPath, setModelsPath] = useState(null)

  const [femaleCount, setFemaleCount] = useState(0)
  const [maleCount, setMaleCount] = useState(0)

  useEffect(() => {
    const callback = (event, args) => {
      toast(args)
      setModelsPath(args)
    }
    window.api.onModelsLoaded(callback)
    return () => {
      window.api.removeListener('models-loaded', callback)
    }
  }, [])
  useEffect(() => {
    window.api.getContentItems().then((res) => {
      setContentItems(res)
    })

    const loadModels = async () => {
      // faceapi.env.monkeyPatch({
      //   ImageData: ImageData,
      //   createCanvasElement: () => createCanvas()
      // // })
      // await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath)
      // await faceapi.nets.ageGenderNet.loadFromUri(modelsPath)
      // setIsModelLoaded(true)

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath),
        faceapi.nets.ageGenderNet.loadFromUri(modelsPath)
      ]).then(() => {
        setIsModelLoaded(true)
        toast.success('Models loaded successfully')
      })
    }
    if (modelsPath) loadModels()
  }, [modelsPath])

  useEffect(() => {
    const checkForPeople = setInterval(() => {
      if (Date.now() - lastDetectionTime > 5000) {
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
      }, 5000)
    }
  }

  return (
    <div className="w-full h-full">
      {contentItems && contentItems.length > 0 ? (
        <SlideShow
          handleDetection={handleDetection}
          isModelLoaded={isModelLoaded}
          peopleDetected={peopleDetected}
          maleCount={maleCount}
          femaleCount={femaleCount}
        />
      ) : (
        <SplashScreen />
      )}
    </div>
  )
}

export default HomePage
