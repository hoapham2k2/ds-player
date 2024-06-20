import { useState, useEffect } from 'react'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
function App() {

  const [isAuthen, setIsAuthen] = useState(undefined)

  

  useEffect(() => {
   const handleAuthen = (event, args) => {
    console.log('isAuthen: ', args)
      setIsAuthen(args)
   }
    window.api.isAuthen(handleAuthen)

    return () => {
      window.api.removeListener('is-authen', handleAuthen)
    }
  }
  , [])


  return (
    <div className='w-full h-full'>
      {isAuthen === undefined ? (
        <div>Loading...</div>
      ) : isAuthen ? (
       <HomePage/>
      ) : (
        <LoginPage/>
      )}
    </div >
  )
}

export default App
