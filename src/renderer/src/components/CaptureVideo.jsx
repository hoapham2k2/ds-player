import React from 'react'
import * as faceapi from 'face-api.js'

const startVideo = () => {
    // setCaptureVideo(true)
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.error('error:', err)
      })
  }

  const closeWebcam = () => {
    videoRef.current.pause()
    videoRef.current.srcObject.getTracks()[0].stop()
    // setCaptureVideo(false)
  }

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current)
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize)
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withAgeAndGender()

        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        if (detections.length > 0) {
          const maleCount = detections.filter((d) => d.gender === 'male').length
          const femaleCount = detections.filter((d) => d.gender === 'female').length

          onDetection(true, maleCount, femaleCount)
        } else {
          onDetection(false, 0, 0)
        }

        canvasRef &&
          canvasRef.current &&
          canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight)
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
      }
    }, 100)
  }
export const CaptureVideo = ({ onDetection }) => {
//   const [captureVideo, setCaptureVideo] = React.useState(false)
  const videoRef = React.useRef()
  const canvasRef = React.useRef()

  const videoHeight = 480
  const videoWidth = 640


    React.useEffect(() => {
        startVideo()
        
        return () => {
            closeWebcam()
        }
    }
    , [])

    React.useEffect(() => {
        handleVideoOnPlay()
    }, [videoRef])

    

  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-center items-center">
          <video
            id="video"
            ref={videoRef}
            className="w-full h-auto max-h-screen max-w-full object-contain"
            autoPlay
          ></video>
          <canvas
            ref={canvasRef}
            className="hidden"
            width={videoWidth}
            height={videoHeight}
          ></canvas>
          <button
            onClick={startVideo}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Start Webcam
          </button>
          <button
            onClick={closeWebcam}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Close Webcam
          </button>
        </div>
      </div>
    </div>
  )
}
