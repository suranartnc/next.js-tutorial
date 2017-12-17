import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { schema, getRootValue, getContext } from './schema'

const PORT = 5000
const server = express()

server.use(cors())

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(request => {
    return {
      schema,
      rootValue: getRootValue(request),
      context: getContext(request)
    }
  })
)

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    query: ``
  })
)

server.listen(PORT, () => {
  console.log(
    `GraphQL Server is now running on http://localhost:${PORT}/graphql`
  )
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`)
})
