const getSessionStorage = (key: string, isNeedParse = true) => {
  if (!sessionStorage) { throw new Error('sessionStorage is not found') }
  const str = sessionStorage.getItem(key)
  if (!str) { return isNeedParse ? null : '' }
  return isNeedParse ? JSON.parse(str) : str
}

export default getSessionStorage
