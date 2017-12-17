import { makeExecutableSchema } from 'graphql-tools'
import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
  type Query {
    hello: String
    posts(limit: Int): [PostType]
    post(id: Int): PostType
  }
  type PostType {
    id: Int
    title: String
    body: String
    author: AuthorType
  }
  type AuthorType {
    name: String
    avatar: String
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
