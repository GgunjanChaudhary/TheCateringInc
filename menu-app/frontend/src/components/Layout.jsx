import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import ServerStatus from './ServerStatus.jsx'

function Layout() {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-base font-semibold text-gray-900">
              MenuCraft
            </Link>
            <Link to="/admin" className="text-sm text-gray-700 hover:text-gray-900">
              Admin
            </Link>
            <Link to="/master-data" className="text-sm text-gray-700 hover:text-gray-900">
              Master Data
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ServerStatus />
            {token ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout
