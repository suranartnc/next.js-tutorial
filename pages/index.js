import 'isomorphic-fetch'

import React from 'react'
import Head from 'next/head'

import page from '../hocs/page'

import fetchGQL from '../utils/fetchGQL'
import { Link } from '../routes'

function HomePage({ entries }) {
  return (
    <div>
      <Head>
        <title>Next.js Tutorial</title>
      </Head>
      <div>
        {entries.map(function(entry) {
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

class HomePageContainer extends React.Component {
  static async getInitialProps() {
    const query = `
      query($limit: Int!) { 
        posts(limit: $limit) { 
          id 
          title
        } 
      }
    `
    const { data } = await fetchGQL(query, {
      limit: 20
    })
    return { entries: data.posts }
  }
  render() {
    return <HomePage entries={this.props.entries} />
  }
}

export default page(HomePageContainer)
