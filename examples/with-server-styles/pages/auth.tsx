import { Login } from 'next-password'
import Head from 'next/head'

const Auth = () => (
  <Login serverFlush>
    <Head>
      <title>my-title</title>
      <meta name="description" content="hello next-password." />
    </Head>
  </Login>
)

export default Auth
