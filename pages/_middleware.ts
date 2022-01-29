import { initPasswordMiddleware } from '../libs/middleware'
import { NextRequest, NextResponse } from 'next/server'

const myMiddleware = initPasswordMiddleware(['/', '/test'], {
  password: '123',
  exactMatch: true,
})

export default async (req: NextRequest) => {
  if (req.nextUrl.pathname === '/missing') {
    return NextResponse.redirect(
      'https://github.com/unix/next-password/wiki/Missing-password',
    )
  }
  return myMiddleware(req)
}
