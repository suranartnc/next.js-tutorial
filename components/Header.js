import React from 'react'
import { Link } from '../routes'

const styles = {
  logo: {
    padding: '20px 15px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  logoLink: {
    color: '#666',
    textDecoration: 'none'
  }
}

export default function Header() {
  return (
    <header style={styles.logo}>
      <Link route="home">
        <a style={styles.logoLink}>
          <img src="/static/images/reactjs_grande.png" alt="" />
        </a>
      </Link>
    </header>
  )
}
