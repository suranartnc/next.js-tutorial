import React from 'react'
import Head from 'next/head'

import page from '../hocs/page'
import { Link } from '../routes'
import fetchGQL from '../utils/fetchGQL'

function EntryPage({ data }) {
  const { entry, relateEntries } = data

  return (
    <div>
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
    </div>
  )
}

const QUERY = `
  query($entryId: Int!, $first: Int) {
    entry: post(id: $entryId) {
      id
      title
      body
    }
    relateEntries: posts(first: $first) {
      id
      title
    }
  }
`

class EntryPageContainer extends React.Component {
  static async getInitialProps(ctx) {
    return await fetchGQL(QUERY, {
      entryId: ctx.query.id,
      first: 5
    })
  }
  render() {
    return <EntryPage data={this.props.data} />
  }
}

export default page(EntryPageContainer)
