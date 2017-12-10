import React from 'react'
import { Link } from '../routes'

export default function HomePage() {
  return (
    <div>
      <p>Home Page</p>
      <Link route="about">
        <a>Go to About page</a>
      </Link>
    </div>
  )
}
