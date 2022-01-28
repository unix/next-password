import { ReactElement } from 'react'
import { CssBaseline } from '@geist-ui/core'
import { default as Login } from './login'

export type FlushToReact = <T>(opts?: { nonce?: string }) => Array<ReactElement<T>>

const loginServerFlush: FlushToReact = CssBaseline.flush as FlushToReact

export type { LoginProps } from './login'
export type { NextPasswordOptions } from './middleware'
export { Login, loginServerFlush }
export default Login
