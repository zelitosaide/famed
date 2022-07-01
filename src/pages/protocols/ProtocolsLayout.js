import { Outlet } from 'react-router-dom'

import Footer from '../../components/footer/Footer'
import Header from './header/Header'

const ProtocolsLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default ProtocolsLayout