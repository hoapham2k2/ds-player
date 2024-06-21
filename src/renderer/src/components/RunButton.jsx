import React from 'react'
import { useNavigate } from 'react-router-dom'

const RunButton =  () => {
  const navigate = useNavigate()
  const handleClickRunApp = async () => {
    await window.api.RunApplication()
    navigate('/preview')

  }

  return (
    <button className="bg-green-500 px-5 py-2" onClick={handleClickRunApp}>
      Run
    </button>
  )
}
export default RunButton
