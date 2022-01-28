import type { NextPage } from 'next'
import { Page, Button, Text, Card, Grid, Spacer } from '@geist-ui/core'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Page width="100%">
      <Card width="400px" style={{ margin: '0 auto', maxWidth: '90%' }}>
        <Text h1 font="16px">
          Welcome,
        </Text>
        <Text>This is the content of your page.</Text>
        <Spacer h={3} />
        <Grid.Container gap={2}>
          <Grid xs={24} sm={12} justify="center">
            <Button
              type="error-light"
              width="100%"
              onClick={() => router.push('/logout')}>
              Logout
            </Button>
          </Grid>
          <Grid xs={24} sm={12} justify="center">
            <Button
              width="100%"
              onClick={() => window.open('https://github.com/unix/next-password')}>
              GitHub
            </Button>
          </Grid>
        </Grid.Container>
      </Card>
    </Page>
  )
}

export default Home
