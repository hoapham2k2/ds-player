import { useEffect } from "react"

export const AppCamera = () => {
    useEffect(() => {
        const video = document.getElementById('video')
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream
                video.play()
            })
            .catch((err) => {
                console.log('An error occurred: ' + err)
            })
    }, [])

    
    return (
        <div className='w-full h-full flex flex-row '>
            <div className='flex-1 flex flex-col h-full'>
                <div className='flex-1 flex flex-col justify-center items-center'>
                    <video id='video' className='w-full h-auto max-h-screen max-w-full object-contain'
                    autoPlay></video>
                </div>
            </div>
        </div>
    )

}

export default AppCamera
