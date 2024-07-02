import { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'

export const WebCamRecord = ({ onDetection }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream
        })
        .catch((err) => console.error(err))
    }
    startVideo()

    return () => {
      const stream = videoRef.current.srcObject
      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      if (videoRef.current) {
        setDimensions({
          width: videoRef.current.clientWidth,
          height: videoRef.current.clientHeight
        })
      }
    }
    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => window.removeEventListener('resize', updateDimensions)
  }, [videoRef])

  const handleVideoOnPlay = async () => {
    const video = videoRef.current

    if (video) {
      const { width, height } = dimensions
      faceapi.matchDimensions(canvasRef.current, { width, height})

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withAgeAndGender()

        if (detections.length > 0) {
          const maleCount = detections.filter(d => d.gender === 'male').length
          const femaleCount = detections.filter(d =>d.gender === 'female').length
          onDetection(true, maleCount, femaleCount)
        } else {
          onDetection(false, 0, 0)
        }

        const resizedDetections = faceapi.resizeResults(detections, { width, height })

        canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, width, height)
        canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
        
      }, 100)
    }
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        onPlay={handleVideoOnPlay}
        className="w-full h-full"
        style={{ transform: 'scaleX(-1)' }} // Mirror the video display
      ></video>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>
    </div>
  )
}

export default WebCamRecord

// class CustomDrawBox extends draw.DrawBox {
//   constructor(box, options) {
//     super(box, options)
//     this.fontSize = options.fontSize || '10px' // Set default font size
//     this.lineHeight = options.lineHeight || 16 // Set default line height for multiline text
//   }

//   draw(canvas) {
//     const { x, y, width, height } = this.box
//     const ctx = canvas.getContext('2d')

//     // Draw the box
//     ctx.strokeStyle = this.options.boxColor || 'red'
//     ctx.lineWidth = this.options.lineWidth || 2
//     ctx.strokeRect(x, y, width, height)

//     if (this.options.label) {
//       ctx.font = `${this.fontSize} Arial`
//       ctx.fillStyle = this.options.labelColor || 'red'

//       // Split text into lines
//       const lines = this.options.label.split('\n')
//       lines.forEach((line, index) => {
//         ctx.fillText(line, x, y > 10 ? y - 5 + index * this.lineHeight : 10 + index * this.lineHeight)
//       })
//     }
//   }
// }