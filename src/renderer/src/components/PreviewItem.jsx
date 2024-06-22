import React, { useState, useEffect } from 'react'

const PreviewItem = ({ item }) => {
  const [projectSourcePath, setProjectSourcePath] = useState('')
  const [separatorChar, setSeparatorChar] = useState('')
  useEffect(() => {
    window.api.getProjectSourcePath().then((res) => {
        console.log('Project source directory path:', res)
      setProjectSourcePath(res)
    })

    window.api.getSeparatorChar().then((res) => {
      console.log('Separator character:', res)
      setSeparatorChar(res)
    })

  }, [])

  console.log(`${projectSourcePath}${separatorChar}sample${separatorChar}${item.url}`)

    if (item.type === 'video') {
      return (
        <div>
          <video controls>
            <source src={`${projectSourcePath}${separatorChar}sample${separatorChar}${item.url}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    } else if (item.type === 'image') {
      return (
        <div>
          <img src={`${projectSourcePath}${separatorChar}sample${separatorChar}${item.url}`} alt="Preview" style={{ width: '100%', height: 'auto' }} />
        </div>
      )
    } else {
      return null // Handle other types or unexpected cases
    }
 
}

export default PreviewItem
