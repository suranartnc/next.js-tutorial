import 'isomorphic-fetch'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

let apolloClient = null

function create(initialState) {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:5000/graphql',
      credentials: 'same-origin'
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    ssrMode: !process.browser
  })
}

export default function initClient(initialState) {
  if (!process.browser) {
    return create(initialState)
  }

  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
