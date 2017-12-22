import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import withPreloader from '../hocs/withPreloader'
import page from '../hocs/page'
import { Link } from '../routes'

function EntryPage({ data }) {
  const { entry } = data

  return (
    <div>
      <Head>
        <title>{entry.title}</title>
      </Head>
      <h1>{entry.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: entry.body }} />
      <div>
        {entry.relatePosts.map(function(entry) {
          return (
            <h2 key={entry.id}>
              <Link route="entry" params={{ id: entry.id }}>
                <a>{entry.title}</a>
              </Link>
            </h2>
          )
        })}
      </div>
    </div>
  )
}

const QUERY = gql`
  query($entryId: Int!, $first: Int) {
    entry: post(id: $entryId) {
      id
      title
      body
      relatePosts(first: $first) {
        id
        title
      }
    }
  }
`

export default compose(
  page,
  graphql(QUERY, {
    options: ({ url: { query: { id } } }) => ({
      variables: {
        entryId: id,
        first: 5
      }
    })
  }),
  withPreloader
)(EntryPage)
