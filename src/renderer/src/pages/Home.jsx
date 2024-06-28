import { useEffect, useState } from 'react'
import PreviewFilePage from '../components/PreviewFile'

const HomePage = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    window.api.getMediaFolder().then((res) => {
      console.log('Media folder:', res)
      setData(res)
    })
  }, [])
  if (data) {
    return (
     <PreviewFilePage/>
    )
  }
}

export default HomePage
