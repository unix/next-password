import { initPasswordMiddleware } from '../libs/middleware'

export default initPasswordMiddleware(['/', '/test'], {
  password: '123',
  exactMatch: true,
})
