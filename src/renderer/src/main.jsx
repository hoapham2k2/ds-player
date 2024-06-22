import './assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter, Route, Routes } from 'react-router-dom'
import PreviewFilePage from './components/PreviewFile'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <HashRouter>

     <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/"
              element={<App/>}
            />
            <Route path="/preview" element={<PreviewFilePage />} />
          </Routes>
     </HashRouter>
  
  </React.StrictMode>
)
