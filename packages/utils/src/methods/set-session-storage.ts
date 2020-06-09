const setSessionStorage = (key: string, data: any, isNeedStringify = true) => {
  if (!sessionStorage) { throw new Error('sessionStorage is not found') }
  const d = isNeedStringify ? JSON.stringify(data) : data
  sessionStorage.setItem(key, d)
}

export default setSessionStorage
