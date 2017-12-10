import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <p>Home Page</p>
      <Link href="/about">
        <a>Go to About page</a>
      </Link>
    </div>
  )
}
