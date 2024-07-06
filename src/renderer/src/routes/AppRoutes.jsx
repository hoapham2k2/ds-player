import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import PreviewFilePage from '../components/PreviewFile'
import ProtectedRoute from './PrivateRoutes'
import { AuthProvider } from '../context/AuthContext'

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/preview" element={<PreviewFilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

export default AppRoutes
