import React from 'react'
import { Link } from '../routes'

export default function HomePage(props) {
  return (
    <div>
      <p>Entry Page</p>
      <p>ID: {props.url.query.id}</p>
      <p>
        <Link route="home">
          <a>Go to Home page</a>
        </Link>
      </p>
    </div>
  )
}
