import React from 'react'
import Head from 'next/head'
import { Link } from '../routes'

import fetchAPI from '../utils/fetchAPI'

import MainLayout from '../components/layouts/MainLayout'

export default class EntryPage extends React.Component {
  static async getInitialProps(context) {
    const entryPromise = fetchAPI(`/posts/${context.query.id}`)
    const relateEntriesPromise = fetchAPI(`/posts`)

    const [entryResult, relateEntriesResult] = await Promise.all([
      entryPromise,
      relateEntriesPromise
    ])

    return {
      entry: entryResult.data,
      relateEntries: relateEntriesResult.data
    }
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
