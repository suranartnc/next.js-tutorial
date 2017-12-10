import React from 'react'
import { Link } from '../routes'

export default function AboutPage() {
  return (
    <div>
      <p>About Page</p>
      <Link route="home">
        <a>Go to Home page</a>
      </Link>
    </div>
  )
}
