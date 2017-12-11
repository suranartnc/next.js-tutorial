import React from 'react'

import LoadingIndicator from '../LoadingIndicator'
import Header from '../Header'
import Nav from '../Nav'

import MainLayoutStyles from './MainLayoutStyles'

function MainLayout({ children }) {
  return (
    <div className="wrapper">
      <LoadingIndicator />
      <Header />
      <Nav />
      <div className="main">{children}</div>
      <style jsx global>
        {MainLayoutStyles}
      </style>
    </div>
  )
}

export default MainLayout
