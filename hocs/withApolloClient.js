import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'

import initClient from '../apollo/initClient'

export default WrappedComponent =>
  class WithApolloClient extends React.Component {
    static async getInitialProps(ctx) {
      let serverState = {
        apollo: {
          data: {}
        }
      }

      let composedInitialProps = {}
      if (WrappedComponent.getInitialProps) {
        composedInitialProps = await WrappedComponent.getInitialProps(ctx)
      }

      if (!process.browser) {
        const apollo = initClient()
        const url = { query: ctx.query, pathname: ctx.pathname }

        try {
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <WrappedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (err) {
          console.log(err)
        }

        serverState = {
          apollo: {
            data: apollo.cache.extract()
          }
        }
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor(props) {
      super(props)
      this.apolloClient = initClient(this.props.serverState.apollo.data)
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
