require('isomorphic-fetch')

import React from 'react'

import MainLayout from '../components/layouts/MainLayout'

export default class EntryPage extends React.Component {
  static getInitialProps(context) {
    return fetch(`http://localhost:4000/posts/${context.query.id}`)
      .then(res => res.json())
      .then(json => {
        return {
          entry: json
        }
      })
  }

  render() {
    const { title, body } = this.props.entry

    return (
      <MainLayout>
        <article>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </article>
      </MainLayout>
    )
  }
}
