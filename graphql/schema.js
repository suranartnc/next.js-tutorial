import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: (rootValue, args, context, info) => {
      return 'Hello world!'
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
