require('isomorphic-fetch')

import React from 'react'
import Head from 'next/head'
import { Link } from '../routes'

import MainLayout from '../components/layouts/MainLayout'

export default class EntryPage extends React.Component {
  static getInitialProps(context) {
    const entryPromise = fetch(
      `http://localhost:4000/posts/${context.query.id}`
    )
      .then(res => res.json())
      .then(json => {
        return {
          data: json
        }
      })

    const relateEntriesPromise = fetch(`http://localhost:4000/posts`)
      .then(res => res.json())
      .then(json => {
        return {
          data: json
        }
      })

    return Promise.all([entryPromise, relateEntriesPromise]).then(function(
      results
    ) {
      const [entryResult, relateEntriesResult] = results

      return {
        entry: entryResult.data,
        relateEntries: relateEntriesResult.data
      }
    })
  }

  render() {
    const { entry: { title, body }, relateEntries } = this.props

    return (
      <MainLayout>
        <Head>
          <title>{title}</title>
        </Head>
        <article>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </article>
        <div>
          {relateEntries.map(function(entry) {
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
