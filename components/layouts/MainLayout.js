import React from 'react'
import { Link } from '../../routes'

import LoadingIndicator from '../LoadingIndicator'

const styles = {
  wrapper: {
    maxWidth: '1024px',
    margin: '0 auto'
  },
  logo: {
    textAlign: 'center'
  },
  logoLink: {
    color: '#666',
    textDecoration: 'none'
  },
  nav: {
    display: 'flex',
    borderTop: '1px solid #eee'
  },
  navLink: {
    padding: '10px 15px',
    color: '#666',
    textDecoration: 'none'
  },
  main: {
    marginTop: '50px'
  }
}

function MainLayout({ children }) {
  return (
    <div style={styles.wrapper}>
      <LoadingIndicator />
      <div style={styles.logo}>
        <Link route="home">
          <a style={styles.logoLink}>
            <img src="/static/images/logo.png" alt="React" />
          </a>
        </Link>
      </div>
      <nav style={styles.nav}>
        <Link route="home">
          <a style={styles.navLink}>Home</a>
        </Link>
        <Link route="about">
          <a style={styles.navLink}>About</a>
        </Link>
      </nav>
      <div style={styles.main}>{children}</div>
    </div>
  )
}

export default MainLayout
