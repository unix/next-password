export const CONSTANTS = {
  COOKIE_NAME: 'NEXT_PASSWORD',
  HEADER_KEY: 'Authorization',
  MISSING_PD:
    '\n🔓 You are using "next-password", but didn\'t set any password.\n🔓 Refer here to fix -> https://pd.unix.bio/missing',
}

export const mergeOptions = <T extends Record<string, any>>(
  userOptions: Partial<T>,
  defaultOptions: T,
): Required<T> => {
  return Object.keys(defaultOptions).reduce<T>((pre, key) => {
    const userValue = userOptions[key as keyof T]
    const defaultValue = defaultOptions[key as keyof T]
    const value = typeof userValue !== 'undefined' ? userValue : defaultValue
    return {
      ...pre,
      [key]: value,
    }
  }, {} as T) as Required<T>
}
