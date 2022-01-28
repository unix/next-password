import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Grid,
  Input,
  Text,
  useInput,
  GeistProvider,
  CssBaseline,
} from '@geist-ui/core'
import { setCookie, getCookie, CONSTANTS } from './utils-client'
import Head from 'next/head'
import Layout from './layout'

export type LoginProps = {
  displayProvided?: boolean
  shadow?: boolean
  dark?: boolean
  warningText?: string
  forbiddenText?: string
  cardTitle?: string
  pageTitle?: string
  buttonText?: string
  serverFlush?: boolean
}

const defaultProps = {
  displayProvided: false,
  shadow: true,
  dark: false,
  cardTitle: 'Authentication',
  pageTitle: 'Auth',
  warningText: 'Password is required for login.',
  forbiddenText: 'Password verification failed, please re-enter.',
  buttonText: 'login',
  serverFlush: false,
}

const Login: React.FC<React.PropsWithChildren<LoginProps> & typeof defaultProps> = ({
  children,
  displayProvided,
  shadow,
  dark,
  cardTitle,
  pageTitle,
  forbiddenText,
  warningText,
  buttonText,
  serverFlush,
}) => {
  const { bindings, state } = useInput('')
  const ref = useRef<HTMLInputElement | null>(null)
  const [dirty, setDirty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const hasChildren = React.Children.count(children) > 0
  const login = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setLoading(true)
    setCookie(CONSTANTS.COOKIE_NAME, state, 1000 * 60)
    location.reload()
  }

  useEffect(() => {
    const isDirty = !!getCookie(CONSTANTS.COOKIE_NAME)
    setDirty(isDirty)
    if (!ref.current || !isDirty) return
    ref.current?.focus()
  }, [])

  return (
    <GeistProvider themeType={dark ? 'dark' : 'light'}>
      {pageTitle && (
        <Head>
          <title>{pageTitle}</title>
        </Head>
      )}
      <CssBaseline />
      <Layout
        serverFlush={serverFlush}
        title={cardTitle}
        displayProvided={displayProvided}
        shadow={shadow}>
        <Grid.Container gap={2}>
          {hasChildren && (
            <Grid xs={24} py={0}>
              {children}
            </Grid>
          )}
          <Grid xs={24} mt={hasChildren ? 0 : '22px'}>
            <Input
              ref={ref}
              htmlType="password"
              type={dirty ? 'error' : 'warning'}
              width="100%"
              {...bindings}
              title="password"
              label="Password"
              autoFocus
              placeholder="Enter here"
            />
          </Grid>
          <Grid py={0} xs={24}>
            <Text b font="13px" my={0} type={dirty ? 'error' : 'warning'}>
              {dirty ? forbiddenText : warningText}
            </Text>
          </Grid>
          <Grid xs={24} mt="25px">
            <Button
              htmlType="submit"
              width="100%"
              onClick={login}
              loading={loading}
              disabled={!state}
              title={!state ? 'You need to enter password first' : 'Enter to login'}>
              {buttonText}
            </Button>
          </Grid>
        </Grid.Container>
      </Layout>
    </GeistProvider>
  )
}

Login.defaultProps = defaultProps
Login.displayName = 'NextPasswordLogin'

export default Login as React.FC<React.PropsWithChildren<LoginProps>>
