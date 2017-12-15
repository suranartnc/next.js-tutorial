import React from 'react'
import Head from 'next/head'

import fetchAPI from '../utils/fetchAPI'
import { Link } from '../routes'

import MainLayout from '../components/layouts/MainLayout'

function EntryPage({ entry, relateEntries }) {
  return (
    <MainLayout>
      <Head>
        <title>{entry.title}</title>
      </Head>
      <h1>{entry.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: entry.body }} />
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

export default class EntryPageContainer extends React.Component {
  static async getInitialProps(context) {
    return Promise.all([
      fetchAPI(`/posts/${context.query.id}`, 'entry'),
      fetchAPI('/posts/', 'relateEntries')
    ]).then(([{ entry }, { relateEntries }]) => ({ entry, relateEntries }))

    // Optional #1 - Promise.all() with reduce()
    // return Promise.all([
    //   fetchAPI(`/posts/${context.query.id}`, 'entry'),
    //   fetchAPI('/posts/', 'relateEntries')
    // ]).then(results => results.reduce((prev, cur) => ({ ...prev, ...cur }), {}))

    // Optional #2 - Async / Await
    // return (await Promise.all([
    //   fetchAPI(`/posts/${context.query.id}`, 'entry'),
    //   fetchAPI('/posts/', 'relateEntries')
    // ])).reduce(function(previousValue, currentValue) {
    //   return {
    //     ...previousValue,
    //     ...currentValue
    //   }
    // }, {})
  }

  render() {
    return (
      <EntryPage
        entry={this.props.entry}
        relateEntries={this.props.relateEntries}
      />
    )
  }
}
