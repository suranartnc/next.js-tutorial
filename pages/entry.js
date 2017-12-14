import 'isomorphic-fetch'

import React from 'react'
import { Link } from '../routes'

import MainLayout from '../components/layouts/MainLayout'

function EntryPage({ entry }) {
  return (
    <MainLayout>
      <h1>{entry.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: entry.body }} />
      <p>
        <Link route="home">
          <a>Go to Home page</a>
        </Link>
      </p>
    </MainLayout>
  )
}

export default class EntryPageContainer extends React.Component {
  static getInitialProps(context) {
    return fetch(`http://localhost:4000/posts/${context.query.id}`)
      .then(res => res.json())
      .then(json => {
        return {
          entry: json
        }
      })
  }

  render() {
    return <EntryPage entry={this.props.entry} />
  }
}
