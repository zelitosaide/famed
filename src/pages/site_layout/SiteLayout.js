import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
// import Header from '../protocols/header/Header'

const SiteLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default SiteLayout