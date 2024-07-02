import React, { useState, useEffect } from 'react'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import PreviewFilePage from './components/PreviewFile'
import supabase from '../../main/supabase'

const App = () => {
  // const [isAuthen, setIsAuthen] = useState(null)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   const updateFirst = async () =>
  //     await window.api
  //       .deviceAuthen()
  //       .then((res) => {
  //         console.log('res: ', res)
  //         if (res === true) {
  //           setIsAuthen(true)
  //         } else {
  //           setIsAuthen(false)
  //         }
  //       })
  //       .then(() => {
  //         console.log('first time: ', isAuthen)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })

  //   updateFirst()
  // }, [])

  // useEffect(() => {
  //   const callback = (event, args) => {
  //     setIsAuthen(args)
  //   }

  //   window.api.isAuthen(callback)
  //   return () => {
  //     window.api.removeListener('isAuthen', callback)
  //   }
  // }, [])

  // return <div className='w-full h-full'>{isAuthen !== null && isAuthen ? <HomePage /> : <LoginPage />}</div>

 
  return (
    <div className='w-full h-full'>
   <HomePage />
    </div>
  )
}

export default App
