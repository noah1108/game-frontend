import * as React from 'react'
import Head from 'next/head'

export default ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
      {/* <meta name="mobile-web-app-capable" content="yes" /> */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
    </Head>
  )
}
