import React from 'react'

export default WrappedComponent =>
  class WithApolloClient extends React.Component {
    static async getInitialProps(context) {
      return WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(context)
        : {}
    }
    render() {
      return (
        <div>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
