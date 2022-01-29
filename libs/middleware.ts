import { md5 } from 'pure-md5'
import { CONSTANTS, mergeOptions } from './utils-server'
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server'

export type NextPasswordOptions = {
  password?: string
  maxAge?: number
  authComponentName?: string
  exactMatch?: boolean
  logoutPath?: string
  salt?: string
}

export const defaultOptions: Required<NextPasswordOptions> = {
  password: '',
  maxAge: 1000 * 60 * 60,
  authComponentName: 'auth',
  exactMatch: false,
  logoutPath: '/logout',
  salt: 'NEXT_PASSWORD',
}

const toRelative = (req: NextRequest, pathname: string) => {
  const url = req.nextUrl.clone()
  url.pathname = pathname
  return url
}
const clearCookie = (req: NextRequest, res: NextResponse) =>
  res.clearCookie(CONSTANTS.COOKIE_NAME, {
    domain: req.nextUrl.hostname,
    path: '/',
    httpOnly: true,
  })

export const initPasswordMiddleware = (
  path: string | string[] = '/',
  options: NextPasswordOptions = {},
) => {
  const paths = Array.isArray(path) ? path : [path]
  const op = mergeOptions(options, defaultOptions)

  const rewrite = (req: NextRequest) => {
    const res = NextResponse.rewrite(
      toRelative(req, `/${op.authComponentName.toLowerCase()}`),
    )
    return clearCookie(req, res)
  }

  const password = op.password || (() => process.env.PASSWORD)()
  const ignored = (() => process.env.IGNORE_PASSWORD)()
  if (!ignored && typeof password === 'undefined') {
    throw new Error(CONSTANTS.MISSING_PD)
  }
  const saltHash = md5(op.salt)
  const validateHash = md5(`${password}`)
  const passwordHash = md5(`${password}${saltHash}`)

  return async (req: NextRequest) => {
    if (ignored) return
    const pathname = req.nextUrl.pathname
    const requestHash = req.headers.get(CONSTANTS.HEADER_KEY)
    const clientHash = req.cookies[CONSTANTS.COOKIE_NAME]

    // return authenticated users ASAP
    if (pathname === op.logoutPath) {
      const res = NextResponse.redirect(toRelative(req, path[0]))
      return clearCookie(req, res)
    }
    if (clientHash === passwordHash) return

    const hasPath = op.exactMatch
      ? paths.find(p => p === pathname)
      : paths.find(p => pathname.startsWith(p))
    const isRequiredAuth = hasPath && !!password
    if (!isRequiredAuth) return

    if (!requestHash) return rewrite(req)
    if (requestHash !== validateHash) return NextResponse.json(null)

    const res = NextResponse.json(null)
    res.cookie(CONSTANTS.COOKIE_NAME, passwordHash, {
      domain: req.nextUrl.hostname,
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: op.maxAge,
    })
    res.headers.set(CONSTANTS.HEADER_KEY, CONSTANTS.HEADER_KEY)
    return res
  }
}
