import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'

import { Link } from '../routes'

function EntryPage({ data }) {
  if (data.loading) return 'Loading...'

  const { post } = data

  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <div>
        {post.relateEntries.map(function(post) {
          return (
            <h2 key={post.id}>
              <Link route="entry" params={{ id: post.id }}>
                <a>{post.title}</a>
              </Link>
            </h2>
          )
        })}
      </div>
    </div>
  )
}

const QUERY = gql`
  query($id: Int!) {
    post(id: $id) {
      id
      title
      body
      relateEntries {
        id
        title
      }
    }
  }
`

export default compose(
  page,
  graphql(QUERY, {
    options: props => ({
      variables: {
        id: props.url.query.id
      }
    })
  })
)(EntryPage)
