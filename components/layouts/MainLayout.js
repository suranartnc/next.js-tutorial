import React from 'react'

import LoadingIndicator from '../LoadingIndicator'
import Header from '../Header'
import Nav from '../Nav'

function MainLayout({ children }) {
  return (
    <div className="wrapper">
      <LoadingIndicator />
      <Header />
      <Nav />
      <div className="main">{children}</div>
      <style jsx>{`
        .wrapper {
          max-width: 1024px;
          margin: 0 auto;
        }
        .main {
          margin-top: 50px;
        }
      `}</style>
    </div>
  )
}

export default MainLayout
