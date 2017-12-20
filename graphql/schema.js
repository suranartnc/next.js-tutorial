import { makeExecutableSchema } from 'graphql-tools'
import 'isomorphic-fetch'

const typeDefs = `
  type Query {
    greet(name: String): String!
		sum(numbers: [Int!]!): Int
    categories(first: Int = 3): [CategoryType]
  }
	type CategoryType {
		cat_id: String
    cat_name: String
    subCats: [CategoryType]
  }
`

const resolvers = {
  Query: {
    greet: (_, { name = 'World' }) => {
      return `Hello ${name}!`
    },
    sum: (_, { numbers }) => {
      return numbers.reduce(function(prev, cur) {
        return prev + cur
      }, 0)
    },
    categories: async (_, { first }) => {
      const res = await fetch('http://myaday.net/pop/api.php')
      const json = await res.json()

      return json.data
    }
  },
  CategoryType: {
    subCats: (_, args) => {
      console.log('parent', _)
      // do something with parent data
      return []
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
