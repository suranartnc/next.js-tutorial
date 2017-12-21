import { makeExecutableSchema } from 'graphql-tools'
import 'isomorphic-fetch'
import { format as formatDate } from 'date-fns'

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
    pubDate(format: String = "Do MMM YY"): String
    relatePosts(first: Int = 5): [PostType]
  }
  type AuthorType {
    name: String
    avatar: String
  }
  type Mutation {
    addPost(title: String!, body: String!): PostType
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
  },
  Mutation: {
    addPost: async () => {
      const res = await fetch(`http://localhost:4000/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'My awesome title',
          body: 'This is a message.'
        })
      })
      const json = await res.json()

      return json
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
