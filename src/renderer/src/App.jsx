import { useState, useEffect } from 'react'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
function App() {
  // const [isAuthen, setIsAuthen] = useState(undefined)

  // const handleAuthen = (event, args) => {
  //   console.log('isAuthen: ', args)
  //   setIsAuthen(args)
  // }
  // useEffect(() => {
  //   window.api.deviceAuthen().then((res) => {setIsAuthen(res) ;console.log(res) })
  //   window.api.isAuthen(handleAuthen)
  //   return () => {
  //     window.api.removeListener('is-authen', handleAuthen)
  //   }
  // }, [])
  return (
    <div className="w-full h-full">
      <HomePage />
    </div>
  )
}

export default App
