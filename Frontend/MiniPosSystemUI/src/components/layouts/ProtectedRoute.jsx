import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const token = useSelector((state) => state.auth.token)
  const location = useLocation()

  if (!token) {
    // Remember the requested page so login can send the user back to it.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Render the nested routes when the user is logged in.
  return <Outlet />
}