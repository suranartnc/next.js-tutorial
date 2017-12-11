require('isomorphic-fetch')

import React from 'react'
import { Link } from '../routes'

import MainLayout from '../components/layouts/MainLayout'

export default class HomePage extends React.Component {
  static getInitialProps() {
    return fetch('http://localhost:4000/posts')
      .then(res => res.json())
      .then(json => {
        return {
          entries: json
        }
      })
  }

  render() {
    return (
      <MainLayout>
        <div>
          {this.props.entries.map(function(entry) {
            return (
              <h2 key={entry.id}>
                <Link route="entry" params={{ id: entry.id }}>
                  <a>{entry.title}</a>
                </Link>
              </h2>
            )
          })}
        </div>
      </MainLayout>
    )
  }
}
