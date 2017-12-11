require('isomorphic-fetch')

import React from 'react'
import Head from 'next/head'
import Error from '../pages/_error'

import MainLayout from '../components/layouts/MainLayout'

export default class EntryPage extends React.Component {
  static getInitialProps(context) {
    return fetch(`http://localhost:4000/posts/${context.query.id}`)
      .then(res => res.json())
      .then(json => {
        const statusCode = Object.keys(json).length === 0 ? 404 : 200

        return {
          statusCode,
          entry: json
        }
      })
  }

  render() {
    const { title, body } = this.props.entry

    if (this.props.statusCode !== 200) {
      return <Error statusCode={this.props.statusCode} />
    }

    return (
      <MainLayout>
        <Head>
          <title>{title}</title>
        </Head>
        <article>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </article>
      </MainLayout>
    )
  }
}
