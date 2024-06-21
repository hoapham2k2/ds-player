import './assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import PreviewFilePage from './components/PreviewFile'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App/> */}
    <HashRouter>
      {/* <App /> */}
      <Routes>
        <Route
          path="/"
          exact
          element={
              <App/>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/preview' element={<PreviewFilePage/>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
