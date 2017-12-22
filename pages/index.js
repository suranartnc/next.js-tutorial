import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function HomePage({ data }) {
  const { loading, posts } = data

  if (loading === true) return 'Loading...'

  return (
    <div>
      <Head>
        <title>Next.js Tutorial</title>
      </Head>
      <div>
        {posts.map(function(entry) {
          return (
            <h2 key={entry.id}>
              <Link route="entry" params={{ id: entry.id }}>
                <a>
                  {entry.pubDate}: {entry.title}
                </a>
              </Link>
            </h2>
          )
        })}
      </div>
    </div>
  )
}

const QUERY_POSTS = gql`
  query($first: Int) {
    posts(first: $first) {
      id
      title
      pubDate
    }
  }
`

export default compose(
  page,
  graphql(QUERY_POSTS, {
    options: () => ({
      variables: {
        first: 20
      }
    })
  })
)(HomePage)
