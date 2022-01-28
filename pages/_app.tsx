import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GeistProvider, CssBaseline } from '@geist-ui/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <Head>
        <title>Next Password</title>
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default MyApp
