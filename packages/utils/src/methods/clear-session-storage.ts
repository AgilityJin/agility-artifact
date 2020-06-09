const clearSessionStorage = (key: string) => {
  if (!sessionStorage) { throw new Error('sessionStorage is not found') }
  return sessionStorage.removeItem(key)
}

export default clearSessionStorage
