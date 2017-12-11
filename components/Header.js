import React from 'react'
import { Link } from '../routes'

export default function Header() {
  return (
    <header>
      <Link route="home">
        <a>
          <img src="/static/images/logo.png" alt="React" />
        </a>
      </Link>
      <style jsx>{`
        header {
          text-align: center;
        }
        a {
          color: #666;
          text-decoration: none;
        }
      `}</style>
    </header>
  )
}
