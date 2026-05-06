import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard.jsx'
import MasterDataManager from './pages/MasterDataManager.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Layout from './components/Layout.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/master-data"
          element={
            <ProtectedRoute>
              <MasterDataManager />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
