import React from 'react'
import NProgress from 'nprogress'
import Head from 'next/head'

import { Router } from '../routes'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default function LoadingIndicator() {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
        />
      </Head>
    </div>
  )
}
