import 'isomorphic-fetch'

import React from 'react'
import { compose } from 'recompose'
import Head from 'next/head'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'

import { Link } from '../routes'

function HomePage({ data }) {
  if (data.loading) return 'Loading...'

  return (
    <div>
      <Head>
        <title>Next.js Tutorial</title>
      </Head>
      <div>
        {data.posts.map(function(entry) {
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
  query($limit: Int!) {
    posts(limit: $limit) {
      id
      title
    }
  }
`

export default compose(
  page,
  graphql(QUERY, {
    options: () => ({
      variables: {
        limit: 20
      }
    })
  })
)(HomePage)
