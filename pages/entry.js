import React from 'react'
import Head from 'next/head'

import page from '../hocs/page'
import { Link } from '../routes'
import fetchAPI from '../utils/fetchAPI'

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

class EntryPageContainer extends React.Component {
  static async getInitialProps(ctx) {
    const [{ entry }, { relateEntries }] = await Promise.all([
      fetchAPI(`/posts/${ctx.query.id}`, 'entry'),
      fetchAPI('/posts/', 'relateEntries')
    ])

    return {
      data: {
        entry,
        relateEntries
      }
    }
  }
  render() {
    return <EntryPage data={this.props.data} />
  }
}

export default page(EntryPageContainer)
