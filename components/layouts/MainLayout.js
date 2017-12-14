import React from 'react'

import LoadingIndicator from '../LoadingIndicator'
import Header from '../Header'
import Nav from '../Nav'

function Layout({ children }) {
  return (
    <div className="wrapper">
      <LoadingIndicator />
      <Header />
      <Nav />
      <main>{children}</main>
      <style jsx global>{`
        .wrapper {
          max-width: 1024px;
          margin: 0 auto;
        }
        main {
          margin-top: 50px;
        }
      `}</style>
    </div>
  )
}

export default Layout
