import { useEffect, useState } from 'react'
import OSInfomation from '../components/OSInfomation'
import RunButton from '../components/RunButton'

const HomePage = () => {
  const [contentItems, setContentItems] = useState('')
  const [buckets, setBuckets] = useState()
  useEffect(() => {
    window.api.getContentItems().then((res) => {
      setContentItems(res)
    })
  }, [])





  
  return (
    <div className='w-full h-full flex flex-row bg-red-50'>

      <div className='flex-1 flex flex-col'>
        <div className='flex-1'>
          <OSInfomation/>
          <ul>
            {contentItems && contentItems.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className='h-20'>
            <RunButton/>
        </div>
      </div>

      <div className='w-4/12'>
      </div>
    </div>
  )
}

export default HomePage
