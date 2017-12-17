import React from 'react'
import { Link } from '../routes'
import NavStyles from './NavStyles'

export default function Nav() {
  return (
    <nav>
      <Link route="home">
        <a>Home</a>
      </Link>
      <Link route="about">
        <a>About</a>
      </Link>
      <style jsx>{NavStyles}</style>
    </nav>
  )
}
