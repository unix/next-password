export { CONSTANTS, mergeOptions } from './utils-server'

export const getCookie = (name: string): string | undefined => {
  const cookies = `${document.cookie}`.split(';')
  const cookieItem = cookies.find(item => {
    const key = item.substring(0, item.indexOf('='))
    const safeKey = `${key}`.replace(/^\s+|\s+$/g, '')
    return safeKey === name
  })
  if (!cookieItem) return undefined
  const value = cookieItem.substring(cookieItem.indexOf('=') + 1)
  return decodeURIComponent(value)
}

export const setCookie = (name: string, value: string, expires: number) => {
  const date = new Date()
  date.setDate(date.getTime() + expires)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()}`
}
