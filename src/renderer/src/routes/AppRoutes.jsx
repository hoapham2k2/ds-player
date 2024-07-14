import { HashRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import PreviewFilePage from '../components/PreviewFile'
import App from '../App'
import TestHome from '../pages/TestHome'

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/preview" element={<PreviewFilePage />} />
        <Route path="/" element={<App />} />
        {/* <Route path='/testhome' element={<TestHome />} /> */}
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes
