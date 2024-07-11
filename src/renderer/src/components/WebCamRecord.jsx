import { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'
import Webcam from 'react-webcam'
import { toast } from 'react-toastify'

export const WebCamRecord = ({ onDetection }) => {
  const videoRef = useRef(null)
  const [MaleCount, setMaleCount] = useState(0)
  const [FemaleCount, setFemaleCount] = useState(0)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [modelPath, setModelPath] = useState('')

  useEffect(() => {
    const loadModels = async () => {
     
      await window.api.getModelsPath().then(async(res) => {
        setModelPath(res)
     
      // Promise.all([
      //   faceapi.nets.ssdMobilenetv1.loadFromUri(modelsPath),
      //   faceapi.nets.faceRecognitionNet.loadFromUri(modelsPath),
      //   faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath),
      //   faceapi.nets.ageGenderNet.loadFromUri(modelsPath)
      // ])
      //   .then(() => {
      //     toast.success('Models loaded successfully')
      //   })
      //   .catch((err) => {
      //     toast.error('Error loading models: ' + err.message)
      //   })

      await faceapi.nets.ssdMobilenetv1.loadFromUri(res)
      await faceapi.nets.tinyFaceDetector.loadFromUri(res)
      await faceapi.nets.faceRecognitionNet.loadFromUri(res)
      await faceapi.nets.faceLandmark68Net.loadFromUri(res)
      await faceapi.nets.ageGenderNet.loadFromUri(res)
      toast.success('Models loaded successfully')
      setIsModelLoaded(true)
    })}

    loadModels()
  }, [modelPath])

  const handleVideoOnPlay = async () => {
    const video = videoRef.current.video

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video).withAgeAndGender()
      console.log(detections)

      if (detections.length > 0) {
        const maleCount = detections.filter((d) => d.gender === 'male').length
        const femaleCount = detections.filter((d) => d.gender === 'female').length
        onDetection(true, maleCount, femaleCount)
        setMaleCount(maleCount)
        setFemaleCount(femaleCount)
      } else {
        onDetection(false, 0, 0)
        setMaleCount(0)
        setFemaleCount(0)
      }
    }, 100)
  }

  return (
    <div className="relative  w-full h-full">
      {isModelLoaded ? (
        <div>
          <Webcam
            audio={false}
            ref={videoRef}
            screenshotFormat="image/jpeg"
            onPlay={handleVideoOnPlay}
            style={{ transform: 'scaleX(-1)' }}
            width={640}
            height={480}
          />

          <div className="absolute top-0 left-0 w-full h-full flex flex-col">
            <p className="text-blue-500 text-4xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Male: {MaleCount}
            </p>
            <p className="text-pink-500 text-4xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Female: {FemaleCount}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">Loading models...{modelPath}</div>
      )}
    </div>
  )
}

export default WebCamRecord
