import React from 'react'
import { Link } from '../routes'

export default function HomePage() {
  return (
    <div>
      <p>Home Page</p>
      <p>
        <Link route="about">
          <a>Go to About page</a>
        </Link>
      </p>
      <p>
        <Link route="entry" params={{ id: 1234 }}>
          <a>Go to Entry: 1234</a>
        </Link>
      </p>
    </div>
  )
}
