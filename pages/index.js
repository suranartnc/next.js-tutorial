import React from 'react'
import Head from 'next/head'

import page from '../hocs/page'
import { Link } from '../routes'
import fetchGQL from '../utils/fetchGQL'

function HomePage({ data }) {
  const { posts } = data

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

const QUERY_POSTS = `
  query($first: Int){
    posts(first: $first) {
      id
      title
      pubDate(format: "DD MM YYYY")
    }
  }
`

class HomePageContainer extends React.Component {
  static async getInitialProps() {
    return await fetchGQL(QUERY_POSTS, {
      first: 20
    })
  }
  render() {
    return <HomePage data={this.props.data} />
  }
}

export default page(HomePageContainer)
