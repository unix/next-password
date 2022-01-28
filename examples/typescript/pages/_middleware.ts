import { initPasswordMiddleware } from 'next-password/middleware'

export default initPasswordMiddleware('/', { password: '123' })
