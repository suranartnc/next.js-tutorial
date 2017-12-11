import React from 'react'
import { Link } from '../routes'

export default function Header() {
  return (
    <nav>
      <Link route="home">
        <a>Home</a>
      </Link>
      <Link route="about">
        <a>About</a>
      </Link>
      <style jsx>{`
        nav {
          display: flex;
          border-top: 1px solid #eee;
        }
        a {
          padding: 10px 15px;
          color: #666;
          text-decoration: none;
        }
      `}</style>
    </nav>
  )
}
