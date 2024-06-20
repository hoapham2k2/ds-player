import React from 'react'

const RunButton = () => {
  const run = () => {
    console.log('Run')
  }
  return (
    <button className="bg-green-500 px-5 py-2" onClick={run}>
      Run
    </button>
  )
}
export default RunButton
