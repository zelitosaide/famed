import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to='/signin' state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth