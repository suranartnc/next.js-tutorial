import React from 'react'
import Head from 'next/head'

import fetchGQL from '../utils/fetchGQL'
import { Link } from '../routes'

import MainLayout from '../components/layouts/MainLayout'

function EntryPage({ entry }) {
  return (
    <MainLayout>
      <Head>
        <title>{entry.title}</title>
      </Head>
      <h1>{entry.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: entry.body }} />
      <div>
        {entry.relateEntries.map(function(entry) {
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
    const query = `
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
    const { data } = await fetchGQL(query, {
      id: context.query.id
    })
    return {
      entry: data.post
    }
  }

  render() {
    return <EntryPage entry={this.props.entry} />
  }
}
