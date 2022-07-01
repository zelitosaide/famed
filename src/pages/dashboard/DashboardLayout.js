import { Outlet } from 'react-router-dom'

import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

const DashboardLayout = () => {

  return (
    <>
      <Sidebar />
      <Header />
      <Outlet />
    </>
  )
}

export default DashboardLayout