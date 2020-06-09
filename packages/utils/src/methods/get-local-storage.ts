const getLocalStorage = (key: string, isNeedParse = true) => {
  if (!localStorage) { throw new Error('localStorage is not found') }
  const str = localStorage.getItem(key)
  if (!str) { return isNeedParse ? null : '' }
  return isNeedParse ? JSON.parse(str) : str
}

export default getLocalStorage
