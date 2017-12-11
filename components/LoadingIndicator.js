import React from 'react'
import Head from 'next/head'
import NProgress from 'nprogress'

import { Router } from '../routes'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function LoadingIndicator() {
  return (
    <Head>
      <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css" />
    </Head>
  )
}

export default LoadingIndicator
