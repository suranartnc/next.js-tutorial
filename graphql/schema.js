import { makeExecutableSchema } from 'graphql-tools'
import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
  type Query {
    hello: String
    posts(limit: Int!): [PostType]
    post(id: Int): PostType
  }
  type PostType {
    id: Int
    title: String
    body: String
    author: AuthorType
    relateEntries(limit: Int): [PostType]
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
    hello: (rootValue, args, context, info) => {
      return 'Hello world!'
    },
    posts: (_, args) => {
      return fetchAPI(`/posts/?_limit=${args.limit}`).then(({ data }) => data)
    },
    post: (_, args) => {
      return fetchAPI(`/posts/${args.id}`).then(({ data }) => data)
    }
  },
  PostType: {
    relateEntries: (_, { limit = 5 }) => {
      return fetchAPI(`/posts/?_limit=${limit}`).then(({ data }) => data)
    }
  },
  Mutation: {
    addPost: (_, args) => {
      return fetch(`http://localhost:4000/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      })
        .then(res => res.json())
        .then(data => {
          return data
        })
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export function getContext(headers) {
  return {
    myContext: 'contaxtValue'
  }
}

export function getRootValue(headers) {
  return {
    myRootValue: 'rootValue'
  }
}
