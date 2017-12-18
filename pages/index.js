import React from 'react'
import Head from 'next/head'

import page from '../hocs/page'
import { Link } from '../routes'
import fetchAPI from '../utils/fetchAPI'

function HomePage({ data }) {
  const { entries } = data

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
    const entries = await fetchAPI('/posts')

    return {
      data: {
        entries: entries.data
      }
    }
  }
  render() {
    return <HomePage data={this.props.data} />
  }
}

export default page(HomePageContainer)
