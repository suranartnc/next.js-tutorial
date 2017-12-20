import { makeExecutableSchema } from 'graphql-tools'
import 'isomorphic-fetch'

import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
  type Query {
    posts(first: Int = 5): [PostType]
    post(id: Int!): PostType
  }
  type PostType {
    id: Int
    title: String
    body: String
    author: AuthorType
    pubDate: Float
  }
  type AuthorType {
    name: String
    avatar: String
  }
`

const resolvers = {
  Query: {
    posts: async (_, { first }) => {
      const { data } = await fetchAPI(`/posts?_limit=${first}`)
      return data
    },
    post: async (_, { id }) => {
      const { data } = await fetchAPI(`/posts/${id}`)
      return data
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
