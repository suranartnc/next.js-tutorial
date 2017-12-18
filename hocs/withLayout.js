import React from 'react'
import MainLayout from '../components/layouts/MainLayout'

export default WrappedComponent =>
  class WithLayout extends React.Component {
    static async getInitialProps(context) {
      return WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(context)
        : {}
    }
    render() {
      return (
        <MainLayout>
          <WrappedComponent {...this.props} />
        </MainLayout>
      )
    }
  }
