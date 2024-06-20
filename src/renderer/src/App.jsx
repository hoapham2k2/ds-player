import { useState, useEffect } from 'react'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthen, setIsAuthen] = useState(undefined)

  useEffect(() => {
    window.api.isAuthen().then((isAuthen) => {
      setIsAuthen(isAuthen)
      setIsLoading(false)
    })
  }, [])
  return (
    <div className="w-full h-full">
      {isLoading ? <div>Loading...</div> : isAuthen ? <HomePage /> : <LoginPage />}
    </div>
  )
}

export default App
