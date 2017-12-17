import 'isomorphic-fetch'

import React from 'react'
import Head from 'next/head'

import fetchGQL from '../utils/fetchGQL'
import { Link } from '../routes'

import MainLayout from '../components/layouts/MainLayout'

function HomePage({ entries }) {
  return (
    <MainLayout>
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
    </MainLayout>
  )
}

export default class HomePageContainer extends React.Component {
  static async getInitialProps() {
    const query = `
      { 
        posts(limit: 20) { 
          id 
          title
        } 
      }
    `
    const { data } = await fetchGQL(query)
    return { entries: data.posts }
  }
  render() {
    return <HomePage entries={this.props.entries} />
  }
}
