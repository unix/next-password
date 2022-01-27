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

export const initPasswordMiddleware = (
  path: string | string[] = '/',
  options: NextPasswordOptions = {},
) => {
  const paths = Array.isArray(path) ? path : [path]
  const op = mergeOptions(options, defaultOptions)

  const rewrite = () => {
    return NextResponse.rewrite(`/${op.authComponentName.toLowerCase()}`)
  }
  const logout = () => {
    const res = NextResponse.redirect(paths[0])
    res.clearCookie(CONSTANTS.COOKIE_NAME)
    res.clearCookie(CONSTANTS.SAVED_COOKIE_NAME)
    return res
  }

  const password = op.password || (() => process.env.PASSWORD)()
  const ignore = (() => process.env.IGNORE_PASSWORD)()
  const saltHash = md5(op.salt)
  if (!ignore && typeof password === 'undefined') {
    throw new Error(CONSTANTS.MISSING_PD)
  }
  const hash = md5(`${password}${saltHash}`)

  return async (req: NextRequest) => {
    if (ignore) return
    const pathname = req.nextUrl.pathname
    if (pathname === op.logoutPath) return logout()

    const hasPath = op.exactMatch
      ? paths.find(p => p === pathname)
      : paths.find(p => pathname.startsWith(p))
    const isRequiredAuth = hasPath && !!password
    if (!isRequiredAuth) return

    // Confirmed authorizations should be closed ASAP.
    const saved = req.cookies[CONSTANTS.SAVED_COOKIE_NAME]
    if (saved === hash) return

    const auth = req.cookies[CONSTANTS.COOKIE_NAME]
    if (!auth) return rewrite()

    const authHash = md5(`${auth}${saltHash}`)
    if (authHash !== hash) return rewrite()

    const res = NextResponse.next()
    if (auth && !saved) {
      res.cookie(CONSTANTS.SAVED_COOKIE_NAME, authHash, {
        maxAge: op.maxAge,
        httpOnly: true,
        sameSite: 'strict',
      })
      res.clearCookie(CONSTANTS.COOKIE_NAME)
    }
    return res
  }
}
