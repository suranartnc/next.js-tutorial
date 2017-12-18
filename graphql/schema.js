import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!'
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
