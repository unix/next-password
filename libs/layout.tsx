import React from 'react'
import { Card, Grid, Page, Text } from '@geist-ui/core'
import Provided from './provided'

type LayoutProps = {
  displayProvided: boolean
  shadow: boolean
  title: string
  serverFlush: boolean
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  shadow,
  title,
  displayProvided,
  children,
  serverFlush,
}) => {
  return (
    <Page
      render={serverFlush ? 'default' : 'effect'}
      dotBackdrop
      width="100%"
      style={{ boxSizing: 'border-box' }}>
      <form>
        <Grid.Container xs={0} sm={24} height="20vh" />
        <Card
          shadow={shadow}
          width="400px"
          px="20px"
          py="10px"
          style={{
            margin: '0 auto',
            maxWidth: '90%',
            borderRadius: '20px',
          }}>
          <Card.Content pb={0}>
            <Text h1 font="23px">
              {title}
            </Text>
          </Card.Content>
          <Card.Content pt={0}>{children}</Card.Content>
        </Card>
      </form>
      <Provided visible={displayProvided} />
    </Page>
  )
}

Layout.displayName = 'NextPasswordLayout'

export default Layout
