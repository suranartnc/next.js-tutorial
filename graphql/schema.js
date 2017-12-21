import { makeExecutableSchema } from 'graphql-tools'
import 'isomorphic-fetch'

import { format as formatDate } from 'date-fns'

import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
  type Query {
    posts(first: Int = 20): [PostType]
    post(id: Int!): PostType
  }
  type PostType {
    id: Int
    title: String
    body: String
    author: AuthorType
    pubDate(format: String = "DD-MM-YYYY"): String
    relatePosts(first: Int = 5): [PostType]
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
  },
  PostType: {
    pubDate: (_, { format }) => {
      return formatDate(_.pubDate, format)
    },
    relatePosts: async (_, { first }) => {
      const { data } = await fetchAPI(`/posts?_limit=${first}`)
      return data
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
