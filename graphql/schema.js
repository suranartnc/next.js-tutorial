import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  MockList
} from 'graphql-tools'
// import fetchAPI from '../utils/fetchAPI'
// import { format as formatDate } from 'date-fns'
import casual from 'casual'

const typeDefs = `
  type Query {
    hello: String
    posts(limit: Int!): [PostType]
    post(id: Int!): PostType
  }
  type PostType {
    id: Int
    title: String
    body: String
    author: AuthorType
    relateEntries(limit: Int): [PostType]
    pubDate(format: String): String
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
  // Query: {
  //   hello: (rootValue, args, context, info) => {
  //     return 'Hello world!'
  //   },
  //   posts: (_, args) => {
  //     return fetchAPI(`/posts/?_limit=${args.limit}`).then(({ data }) => data)
  //   },
  //   post: (_, args) => {
  //     return fetchAPI(`/posts/${args.id}`).then(({ data }) => data)
  //   }
  // },
  // PostType: {
  //   relateEntries: (_, { limit = 5 }) => {
  //     return fetchAPI(`/posts/?_limit=${limit}`).then(({ data }) => data)
  //   },
  //   pubDate: (_, { format = 'DD-MM-YYYY' }) => {
  //     return formatDate(_.pubDate, format)
  //   }
  // },
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

const mocks = {
  Query: () => ({
    posts: (_, { limit = 10 }) => new MockList(limit)
  }),
  PostType: () => ({
    id: casual.integer(0, 100000),
    title: casual.title,
    body: casual.words(100),
    author: {
      name: casual.first_name,
      avatar: `${casual.url}profile.jpg`
    },
    pubDate: (_, { format }) => casual.date(format)
  })
}

addMockFunctionsToSchema({ schema, mocks })

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
