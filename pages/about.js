import React from 'react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div>
      <p>About Page</p>
      <Link href="/">
        <a>Go to Home page</a>
      </Link>
    </div>
  )
}
