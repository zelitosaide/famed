import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, [location])

  return children
}

export default ScrollToTop