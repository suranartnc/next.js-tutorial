import { makeExecutableSchema } from 'graphql-tools'
import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
  type Query {
    hello: String
    posts: [PostType]
  }
  type PostType {
    id: Int,
    title: String,
    body: String
  }
`

const resolvers = {
  Query: {
    hello: (rootValue, args, context, info) => {
      return 'Hello world!'
    },
    posts: () => {
      return fetchAPI('/posts/').then(({ data }) => data)
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
