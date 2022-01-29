import Head from 'next/head'
import { Login } from '../libs'
import { Spacer } from '@geist-ui/core'

const Auth = () => (
  <Login serverFlush displayProvided>
    <Head>
      <title>next-password</title>
      <meta name="google" content="notranslate" />
      <meta name="referrer" content="strict-origin" />
      <meta
        name="description"
        content="Add password protection to your Next.js application"
      />
      <meta property="og:site_name" content="Next Password" />
      <meta
        property="og:description"
        content="Add password protection to your Next.js application"
      />
      <meta name="author" content="witt" />
      <meta name="og:title" content="next-password" />
      <meta property="og:url" content="https://pd.unix.bio" />
      <meta property="og:image" content="https://pd.unix.bio/logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@echo_unix" />
    </Head>
    <Spacer h={1.5} />
  </Login>
)

export default Auth
