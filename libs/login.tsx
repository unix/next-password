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
import { CONSTANTS, getRandomString } from './utils-client'
import Head from 'next/head'
import Layout from './layout'
import { md5 } from 'pure-md5'

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
  const reload = (clearStorage?: boolean) => {
    if (clearStorage) {
      window.sessionStorage.removeItem(CONSTANTS.COOKIE_NAME)
    } else {
      setDirty(true)
      window.sessionStorage.setItem(CONSTANTS.COOKIE_NAME, '1')
    }
    setLoading(false)
    location.reload()
  }
  const login = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setLoading(true)
    const req = new XMLHttpRequest()
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        const value = `${req.getResponseHeader(CONSTANTS.HEADER_KEY.toLowerCase())}`
        const needClean = value.toUpperCase() === CONSTANTS.HEADER_KEY.toUpperCase()
        reload(needClean)
      }
    }
    req.onerror = () => reload()
    req.onabort = () => reload()
    req.ontimeout = () => reload()
    req.open('GET', `${location.origin}?q=${getRandomString()}`, false)
    req.setRequestHeader(CONSTANTS.HEADER_KEY, md5(state))
    req.send(null)
  }

  useEffect(() => {
    const isDirty = window.sessionStorage.getItem(CONSTANTS.COOKIE_NAME)
    if (!ref.current || !isDirty) return
    setDirty(true)
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
